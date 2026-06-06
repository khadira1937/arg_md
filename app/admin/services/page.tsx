import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge, TableEmpty } from "@/components/dashboard/ui";
import { ServiceOps } from "@/components/admin/controls";

export default async function AdminServicesPage() {
  await requireStaff();
  const services = await prisma.serviceInstance.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { user: true, product: true, plan: true } });

  return (
    <div>
      <PageHeader title="Services" description="Manage all provisioned service instances." />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-muted-foreground">
              <th className="p-4 font-medium">Service</th><th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">IP</th><th className="p-4 font-medium">Status</th><th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="p-4"><a href={`/admin/services/${s.id}`} className="font-medium hover:text-primary">{s.label}</a><p className="text-xs text-muted-foreground">{s.plan.name}</p></td>
                <td className="p-4 text-muted-foreground">{s.user.email}</td>
                <td className="p-4 font-mono text-xs text-muted-foreground">{s.primaryIp ?? "—"}</td>
                <td className="p-4"><StatusBadge status={s.status} /></td>
                <td className="p-4"><ServiceOps serviceId={s.id} status={s.status} /></td>
              </tr>
            ))}
            {services.length === 0 && <TableEmpty colSpan={5} label="No services have been provisioned yet." />}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
