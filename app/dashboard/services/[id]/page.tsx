import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Globe, MapPin, Calendar, RefreshCw, Cpu, Clock, ExternalLink, ShieldCheck } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { decryptJson } from "@/lib/crypto";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PageHeader, StatusBadge } from "@/components/dashboard/ui";
import { CredentialsCard, CancelServiceButton } from "@/components/dashboard/service-actions";

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  const service = await prisma.serviceInstance.findFirst({
    where: { id, userId: user.id },
    include: { product: true, plan: true, location: true, subscription: true, jobs: { orderBy: { createdAt: "desc" } } },
  });
  if (!service) notFound();

  const specs = (service.specsSnapshot as Record<string, string> | null) ?? {};
  const addons = (service.addonsSnapshot as { name: string }[] | null) ?? [];
  let credentials: Record<string, unknown> | null = null;
  if (service.credentialsEncrypted && service.status === "ACTIVE") {
    try { credentials = decryptJson(service.credentialsEncrypted); } catch { credentials = null; }
  }

  return (
    <div>
      <Link href="/dashboard/services" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to services
      </Link>
      <PageHeader
        title={service.label}
        description={`${service.product.name} · ${service.plan.name}`}
        action={<div className="flex items-center gap-3"><StatusBadge status={service.status} /><CancelServiceButton serviceId={service.id} disabled={["CANCELLED", "EXPIRED", "FAILED"].includes(service.status)} /></div>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {["AWAITING_SETUP", "PENDING", "PROVISIONING"].includes(service.status) && (
            <Card className="flex items-start gap-3 border-amber-300 bg-amber-50/50 p-6">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <div>
                <p className="font-medium text-amber-900">We&apos;re setting up your service</p>
                <p className="mt-1 text-sm text-amber-800">
                  Your payment was received and our team is preparing <strong>{service.label}</strong>.
                  You&apos;ll get an email with your management link as soon as it&apos;s ready — usually within a few hours.
                </p>
              </div>
            </Card>
          )}

          {service.status === "ACTIVE" && service.externalManagementUrl && (
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Manage your service</h2>
                {service.externalProviderName && <span className="text-xs text-muted-foreground">{service.externalProviderName}</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Open your control panel to manage, deploy and monitor your service.</p>
              <Button asChild variant="gradient" className="mt-4">
                <a href={service.externalManagementUrl} target="_blank" rel="noreferrer">Manage Service <ExternalLink className="h-4 w-4" /></a>
              </Button>
              {service.externalUsername && (
                <p className="mt-3 text-sm"><span className="text-muted-foreground">Username:</span> <span className="font-mono font-medium">{service.externalUsername}</span></p>
              )}
              {service.customerInstructions && (
                <div className="mt-4 rounded-lg border bg-muted/30 p-3 text-sm">
                  <p className="mb-1 font-medium">Getting started</p>
                  <p className="whitespace-pre-wrap text-muted-foreground">{service.customerInstructions}</p>
                </div>
              )}
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" /> For your security we never email passwords — set or reset credentials inside the panel.
              </p>
            </Card>
          )}

          {credentials && <CredentialsCard credentials={credentials} />}

          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Specifications</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              {Object.entries(specs).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2 text-sm">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize text-muted-foreground">{k}:</span> <span className="font-medium">{v}</span>
                </div>
              ))}
            </dl>
            {addons.length > 0 && (
              <>
                <Separator className="my-4" />
                <p className="text-sm font-medium">Add-ons</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {addons.map((a, i) => <span key={i} className="rounded-full bg-muted px-2.5 py-0.5 text-xs">{a.name}</span>)}
                </div>
              </>
            )}
          </Card>

          {service.jobs.length > 0 && (
          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Provisioning history</h2>
            <div className="space-y-2">
              {service.jobs.map((j) => (
                <div key={j.id} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                  <span className="font-medium">{j.type}</span>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {j.lastError && <span className="text-destructive">{j.lastError}</span>}
                    <StatusBadge status={j.status} />
                    <span>{j.createdAt.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          )}
        </div>

        <div>
          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Details</h2>
            <dl className="space-y-3 text-sm">
              {service.hostname && <Row icon={Globe} label="Hostname" value={service.hostname} />}
              {service.primaryIp && <Row icon={Globe} label="IP address" value={service.primaryIp} />}
              {service.location && <Row icon={MapPin} label="Location" value={`${service.location.flagEmoji} ${service.location.city}`} />}
              {service.renewsAt && <Row icon={Calendar} label="Renews" value={service.renewsAt.toLocaleDateString()} />}
              {service.subscription && <Row icon={RefreshCw} label="Subscription" value={service.subscription.status} />}
            </dl>
            <Separator className="my-4" />
            <Button asChild variant="outline" className="w-full"><Link href="/dashboard/support">Need help? Open a ticket</Link></Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="flex items-center gap-1.5 text-muted-foreground"><Icon className="h-4 w-4" /> {label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
