import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/ui";

export default async function AdminAuditPage() {
  await requireStaff();
  const logs = await prisma.adminLog.findMany({ orderBy: { createdAt: "desc" }, take: 200, include: { actor: { select: { email: true } } } });

  return (
    <div>
      <PageHeader title="Audit log" description="Every privileged action, recorded." />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-muted-foreground">
              <th className="p-4 font-medium">Action</th><th className="p-4 font-medium">Actor</th>
              <th className="p-4 font-medium">Entity</th><th className="p-4 font-medium">When</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id} className="border-b last:border-0">
                <td className="p-4 font-mono text-xs">{l.action}</td>
                <td className="p-4 text-muted-foreground">{l.actor?.email ?? "system"}</td>
                <td className="p-4 text-muted-foreground">{l.entityType ? `${l.entityType}` : "—"}</td>
                <td className="p-4 text-muted-foreground">{l.createdAt.toLocaleString()}</td>
              </tr>
            ))}
            {logs.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No activity yet.</td></tr>}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
