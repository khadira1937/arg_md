import Link from "next/link";
import { Server, ShoppingBag, FileText, Plus, ArrowRight, Rocket } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/pricing";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, StatCard, StatusBadge, EmptyState } from "@/components/dashboard/ui";

export default async function DashboardOverview() {
  const user = await requireUser();

  const [activeServices, openInvoices, recentOrders, recentServices, unpaidTotal] = await Promise.all([
    prisma.serviceInstance.count({ where: { userId: user.id, status: "ACTIVE" } }),
    prisma.invoice.count({ where: { userId: user.id, status: "OPEN" } }),
    prisma.order.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.serviceInstance.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 5, include: { product: true, plan: true } }),
    prisma.invoice.aggregate({ where: { userId: user.id, status: "OPEN" }, _sum: { total: true } }),
  ]);

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user.name?.split(" ")[0] ?? "there"}`}
        description="Here's an overview of your projects and account."
        action={<Button asChild variant="gradient"><Link href="/services"><Plus className="h-4 w-4" /> Request service</Link></Button>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active projects" value={activeServices} icon={Server} />
        <StatCard label="Open invoices" value={openInvoices} icon={FileText} hint={openInvoices > 0 ? `${formatMoney(unpaidTotal._sum.total ?? 0)} due` : "All paid"} />
        <StatCard label="Project orders" value={recentOrders.length} icon={ShoppingBag} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Recent projects</h2>
            <Link href="/dashboard/services" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          {recentServices.length === 0 ? (
            <EmptyState icon={Rocket} title="No projects yet" description="Request a service to get your first project started." actionLabel="View services" actionHref="/services" />
          ) : (
            <div className="space-y-3">
              {recentServices.map((s) => (
                <Link key={s.id} href={`/dashboard/services/${s.id}`} className="flex items-center justify-between rounded-xl border p-3 hover:bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.product.name} · {s.plan.name}</p>
                  </div>
                  <StatusBadge status={s.status} />
                </Link>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Recent orders</h2>
            <Link href="/dashboard/orders" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          {recentOrders.length === 0 ? (
            <EmptyState icon={ShoppingBag} title="No orders yet" />
          ) : (
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div key={o.id} className="flex items-center justify-between rounded-xl border p-3">
                  <div>
                    <p className="text-sm font-medium">{o.number}</p>
                    <p className="text-xs text-muted-foreground">{o.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{formatMoney(o.total)}</span>
                    <StatusBadge status={o.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
