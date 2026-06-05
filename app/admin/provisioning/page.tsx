import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge } from "@/components/dashboard/ui";
import { RetryButton } from "@/components/admin/controls";

export default async function AdminProvisioningPage() {
  await requireStaff();
  const jobs = await prisma.provisioningJob.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { serviceInstance: { include: { user: true } } } });

  return (
    <div>
      <PageHeader title="Provisioning jobs" description="Background jobs that fulfill services via the provider layer." />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-muted-foreground">
              <th className="p-4 font-medium">Service</th><th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Attempts</th><th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Error</th><th className="p-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} className="border-b last:border-0">
                <td className="p-4"><p className="font-medium">{j.serviceInstance.label}</p><p className="text-xs text-muted-foreground">{j.serviceInstance.user.email}</p></td>
                <td className="p-4 text-muted-foreground">{j.type}</td>
                <td className="p-4 text-muted-foreground">{j.attempts}/{j.maxAttempts}</td>
                <td className="p-4"><StatusBadge status={j.status} /></td>
                <td className="p-4 max-w-[200px] truncate text-xs text-destructive">{j.lastError ?? ""}</td>
                <td className="p-4">{(j.status === "FAILED" || j.status === "RETRYING") && <RetryButton jobId={j.id} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
