import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/ui";
import { RoleSelect, BlockToggle } from "@/components/admin/controls";

export default async function AdminUsersPage() {
  await requireStaff();
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 200, include: { _count: { select: { orders: true, services: true } } } });

  return (
    <div>
      <PageHeader title="Users" description="Manage customers and staff roles." />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-muted-foreground">
              <th className="p-4 font-medium">User</th><th className="p-4 font-medium">Verified</th>
              <th className="p-4 font-medium">Orders</th><th className="p-4 font-medium">Services</th>
              <th className="p-4 font-medium">Role</th><th className="p-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b last:border-0">
                <td className="p-4"><p className="font-medium">{u.name ?? "—"}</p><p className="text-xs text-muted-foreground">{u.email}</p></td>
                <td className="p-4">{u.emailVerified ? <Badge variant="success">Verified</Badge> : <Badge variant="muted">No</Badge>}{u.isBlocked && <Badge variant="destructive" className="ml-1">Blocked</Badge>}</td>
                <td className="p-4 text-muted-foreground">{u._count.orders}</td>
                <td className="p-4 text-muted-foreground">{u._count.services}</td>
                <td className="p-4"><RoleSelect userId={u.id} role={u.role} /></td>
                <td className="p-4"><BlockToggle userId={u.id} blocked={u.isBlocked} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
