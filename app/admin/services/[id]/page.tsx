import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, User, Package, MapPin, Calendar, ExternalLink } from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageHeader, StatusBadge } from "@/components/dashboard/ui";
import { ServiceOps } from "@/components/admin/controls";
import { DeliveryForm } from "@/components/admin/delivery-form";

export default async function AdminServiceDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const { id } = await params;
  const service = await prisma.serviceInstance.findUnique({
    where: { id },
    include: { user: true, product: true, plan: true, location: true, order: true, subscription: true },
  });
  if (!service) notFound();

  const specs = (service.specsSnapshot as Record<string, string> | null) ?? {};
  const delivered = Boolean(service.deliveredAt);

  return (
    <div>
      <Link href="/admin/services" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to services</Link>
      <PageHeader
        title={service.label}
        description={`${service.product.name} · ${service.plan.name}`}
        action={<div className="flex items-center gap-3"><StatusBadge status={service.status} /><ServiceOps serviceId={service.id} status={service.status} /></div>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {service.status === "AWAITING_SETUP" && (
            <Card className="border-amber-300 bg-amber-50/50 p-4 text-sm text-amber-800">
              This service is paid and <strong>awaiting setup</strong>. Prepare it with your provider, then deliver the management link below.
            </Card>
          )}

          <Card className="p-6">
            <h2 className="mb-4 font-semibold">{delivered ? "Delivery details" : "Deliver this service"}</h2>
            <DeliveryForm
              serviceId={service.id}
              delivered={delivered}
              defaults={{
                externalManagementUrl: service.externalManagementUrl,
                externalProviderName: service.externalProviderName,
                externalServiceId: service.externalServiceId,
                externalUsername: service.externalUsername,
                customerInstructions: service.customerInstructions,
                internalAdminNotes: service.internalAdminNotes,
              }}
            />
            {delivered && (
              <p className="mt-4 border-t pt-4 text-xs text-muted-foreground">
                Delivered {service.deliveredAt?.toLocaleString()} by {service.deliveredBy ?? "admin"}.
              </p>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Plan specifications</h2>
            <dl className="grid gap-2 sm:grid-cols-2">
              {Object.entries(specs).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2 text-sm"><Package className="h-4 w-4 text-muted-foreground" /><span className="capitalize text-muted-foreground">{k}:</span> <span className="font-medium">{v}</span></div>
              ))}
              {Object.keys(specs).length === 0 && <p className="text-sm text-muted-foreground">No specs snapshot.</p>}
            </dl>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="mb-4 font-semibold">Customer & order</h2>
            <dl className="space-y-3 text-sm">
              <Row icon={User} label="Customer" value={service.user.email} />
              {service.order && <Row icon={Package} label="Order" value={service.order.number} href={`/admin/orders/${service.order.id}`} />}
              {service.location && <Row icon={MapPin} label="Location" value={`${service.location.flagEmoji} ${service.location.city}`} />}
              {service.renewsAt && <Row icon={Calendar} label="Renews" value={service.renewsAt.toLocaleDateString()} />}
              {service.externalManagementUrl && <Row icon={ExternalLink} label="Manage URL" value={service.externalProviderName ?? "Open"} href={service.externalManagementUrl} external />}
            </dl>
            <Separator className="my-4" />
            <p className="text-xs text-muted-foreground">Use the actions above to suspend, resume or cancel this service.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value, href, external }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string; external?: boolean }) {
  const content = <span className="font-medium">{value}</span>;
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="flex items-center gap-1.5 text-muted-foreground"><Icon className="h-4 w-4" /> {label}</dt>
      <dd>{href ? <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="font-medium text-primary hover:underline">{value}</a> : content}</dd>
    </div>
  );
}
