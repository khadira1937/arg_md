"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { enqueueJob, processPendingJobs } from "@/lib/provisioning";
import { audit } from "@/lib/audit";

export type ServiceActionResult = { ok: boolean; error?: string };

/** Customer-initiated cancellation: schedule at period end + enqueue provider cancel. */
export async function cancelServiceAction(serviceId: string): Promise<ServiceActionResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Not authenticated" };

  const service = await prisma.serviceInstance.findFirst({ where: { id: serviceId, userId: user.id } });
  if (!service) return { ok: false, error: "Service not found" };
  if (service.status === "CANCELLED") return { ok: true };

  await prisma.serviceInstance.update({ where: { id: service.id }, data: { status: "CANCELLED", cancelledAt: new Date() } });
  if (service.subscriptionId) {
    await prisma.subscription.update({ where: { id: service.subscriptionId }, data: { status: "CANCELED", cancelAtPeriodEnd: true, canceledAt: new Date() } });
  }
  await enqueueJob(service.id, "CANCEL");
  await processPendingJobs();
  await audit({ actorId: user.id, action: "service.cancelled", entityType: "ServiceInstance", entityId: service.id });

  revalidatePath("/dashboard/services");
  revalidatePath(`/dashboard/services/${service.id}`);
  return { ok: true };
}
