import "server-only";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getProvider } from "@/lib/providers";
import { encryptJson } from "@/lib/crypto";
import { sendEmail } from "@/lib/email";
import { audit } from "@/lib/audit";
import { absoluteUrl, slugify } from "@/lib/utils";

/** Process a single provisioning job through its provider. */
export async function processJob(jobId: string): Promise<void> {
  const job = await prisma.provisioningJob.findUnique({
    where: { id: jobId },
    include: { serviceInstance: { include: { product: true, plan: true, location: true, user: true } } },
  });
  if (!job || job.status === "SUCCEEDED") return;

  const service = job.serviceInstance;
  await prisma.provisioningJob.update({ where: { id: job.id }, data: { status: "RUNNING", startedAt: new Date(), attempts: { increment: 1 } } });
  await prisma.serviceInstance.update({ where: { id: service.id }, data: { status: "PROVISIONING" } });

  // Provisioning-started email (only on first attempt).
  if (job.attempts === 0) {
    await sendEmail({ to: service.user.email, template: { type: "service_provisioning", name: service.user.name ?? "there", serviceLabel: service.label } });
  }

  try {
    const provider = getProvider(service.providerKey);

    if (job.type === "PROVISION") {
      const result = await provider.provision({
        serviceInstanceId: service.id,
        productType: service.product.type,
        planName: service.plan.name,
        planSlug: service.plan.slug,
        hostnameHint: slugify(`${service.plan.slug}-${service.id.slice(-6)}`),
        locationSlug: service.location?.slug ?? null,
        specs: (service.specsSnapshot as Record<string, unknown>) ?? null,
        addons: ((service.addonsSnapshot as { name: string }[] | null) ?? []).map((a) => a.name),
      });

      await prisma.serviceInstance.update({
        where: { id: service.id },
        data: {
          status: "ACTIVE",
          providerRef: result.providerRef,
          primaryIp: result.primaryIp,
          hostname: result.hostname,
          credentialsEncrypted: encryptJson(result.credentials),
        },
      });
      await prisma.provisioningJob.update({ where: { id: job.id }, data: { status: "SUCCEEDED", finishedAt: new Date(), result: (result.raw ?? {}) as Prisma.InputJsonValue } });

      await sendEmail({
        to: service.user.email,
        template: { type: "service_activated", name: service.user.name ?? "there", serviceLabel: service.label, url: absoluteUrl(`/dashboard/services/${service.id}`) },
      });
      await audit({ actorId: service.userId, action: "service.provisioned", entityType: "ServiceInstance", entityId: service.id });
    } else {
      // SUSPEND / RESUME / CANCEL / UPGRADE
      const ref = service.providerRef ?? "";
      if (job.type === "SUSPEND") await provider.suspend(ref);
      if (job.type === "RESUME") await provider.resume(ref);
      if (job.type === "CANCEL") await provider.cancel(ref);
      await prisma.provisioningJob.update({ where: { id: job.id }, data: { status: "SUCCEEDED", finishedAt: new Date() } });
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Provisioning failed";
    const failed = job.attempts + 1 >= job.maxAttempts;
    await prisma.provisioningJob.update({
      where: { id: job.id },
      data: { status: failed ? "FAILED" : "RETRYING", lastError: message, finishedAt: failed ? new Date() : null },
    });
    if (failed) {
      await prisma.serviceInstance.update({ where: { id: service.id }, data: { status: "FAILED" } });
    }
    console.error(`[provisioning] job ${job.id} ${failed ? "failed" : "will retry"}: ${message}`);
  }
}

/** Process all queued/retrying jobs (worker tick). */
export async function processPendingJobs(limit = 20): Promise<{ processed: number }> {
  const jobs = await prisma.provisioningJob.findMany({
    where: { status: { in: ["QUEUED", "RETRYING"] } },
    orderBy: { scheduledAt: "asc" },
    take: limit,
    select: { id: true },
  });
  for (const j of jobs) await processJob(j.id);
  return { processed: jobs.length };
}

/** Enqueue a lifecycle job for a service (suspend/resume/cancel/upgrade). */
export async function enqueueJob(serviceInstanceId: string, type: "SUSPEND" | "RESUME" | "CANCEL" | "UPGRADE") {
  return prisma.provisioningJob.create({ data: { serviceInstanceId, type, status: "QUEUED" } });
}
