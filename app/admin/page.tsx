import Link from "next/link";
import { Users, ShoppingBag, Server, DollarSign, Package, LifeBuoy } from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/pricing";
import { Card } from "@/components/ui/card";
import { PageHeader, StatCard, StatusBadge } from "@/components/dashboard/ui";

export default async function AdminOverview() {
  await requireStaff();

  const [users, orders, services, products, openTickets, revenue, recentOrders] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.serviceInstance.count({ where: { status: "ACTIVE" } }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.supportTicket.count({ where: { status: { in: ["OPEN", "PENDING"] } } }),
    prisma.payment.aggregate({ where: { status: "SUCCEEDED" }, _sum: { amount: true } }),
    prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 8, include: { user: true } }),
  ]);

  return (
    <div>
      <PageHeader title="Admin overview" description="Platform health at a glance." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Revenue (paid)" value={formatMoney(revenue._sum.amount ?? 0)} icon={DollarSign} />
        <StatCard label="Total orders" value={orders} icon={ShoppingBag} />
        <StatCard label="Active services" value={services} icon={Server} />
        <StatCard label="Customers" value={users} icon={Users} />
        <StatCard label="Active products" value={products} icon={Package} />
        <StatCard label="Open tickets" value={openTickets} icon={LifeBuoy} />
      </div>

      <Card className="mt-6 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Recent orders</h2>
          <Link href="/admin/orders" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Total</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b last:border-0">
                    <td className="py-3 font-medium"><Link href={`/admin/orders/${o.id}`} className="hover:text-primary">{o.number}</Link></td>
                    <td className="py-3 text-muted-foreground">{o.user.email}</td>
                    <td className="py-3">{formatMoney(o.total)}</td>
                    <td className="py-3"><StatusBadge status={o.status} /></td>
                    <td className="py-3 text-muted-foreground">{o.createdAt.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
