import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMoney, CYCLE_LABEL } from "@/lib/pricing";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge } from "@/components/dashboard/ui";

export default async function AdminSubscriptionsPage() {
  await requireStaff();
  const subs = await prisma.subscription.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { user: true, plan: { include: { product: true } } } });

  return (
    <div>
      <PageHeader title="Subscriptions" description="All recurring subscriptions." />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left text-muted-foreground">
              <th className="p-4 font-medium">Plan</th><th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Amount</th><th className="p-4 font-medium">Renews</th><th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="p-4"><p className="font-medium">{s.plan.product.name}</p><p className="text-xs text-muted-foreground">{s.plan.name}</p></td>
                <td className="p-4 text-muted-foreground">{s.user.email}</td>
                <td className="p-4">{formatMoney(s.amount)} <span className="text-xs text-muted-foreground">{CYCLE_LABEL[s.billingCycle]}</span></td>
                <td className="p-4 text-muted-foreground">{s.currentPeriodEnd?.toLocaleDateString() ?? "—"}</td>
                <td className="p-4"><StatusBadge status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
