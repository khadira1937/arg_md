import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/pricing";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge } from "@/components/dashboard/ui";

export default async function AdminOrdersPage() {
  await requireStaff();
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { user: true, _count: { select: { items: true } } } });

  return (
    <div>
      <PageHeader title="Orders" description="All customer orders." />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-muted-foreground">
              <th className="p-4 font-medium">Order</th><th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Items</th><th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium">Status</th><th className="p-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b last:border-0 hover:bg-muted/30">
                <td className="p-4 font-medium"><Link href={`/admin/orders/${o.id}`} className="hover:text-primary">{o.number}</Link></td>
                <td className="p-4 text-muted-foreground">{o.user.email}</td>
                <td className="p-4 text-muted-foreground">{o._count.items}</td>
                <td className="p-4">{formatMoney(o.total)}</td>
                <td className="p-4"><StatusBadge status={o.status} /></td>
                <td className="p-4 text-muted-foreground">{o.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
