import { RefreshCw } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMoney, CYCLE_LABEL } from "@/lib/pricing";
import { Card } from "@/components/ui/card";
import { PageHeader, StatusBadge, EmptyState } from "@/components/dashboard/ui";

export default async function SubscriptionsPage() {
  const user = await requireUser();
  const subs = await prisma.subscription.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { plan: { include: { product: true } } },
  });

  return (
    <div>
      <PageHeader title="Subscriptions" description="Recurring plans and renewal dates." />
      {subs.length === 0 ? (
        <EmptyState icon={RefreshCw} title="No subscriptions yet" actionLabel="Browse plans" actionHref="/pricing" />
      ) : (
        <div className="space-y-3">
          {subs.map((s) => (
            <Card key={s.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <p className="font-medium">{s.plan.product.name} — {s.plan.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatMoney(s.amount)} · {CYCLE_LABEL[s.billingCycle]}
                  {s.currentPeriodEnd ? ` · renews ${s.currentPeriodEnd.toLocaleDateString()}` : ""}
                  {s.cancelAtPeriodEnd ? " · cancels at period end" : ""}
                </p>
              </div>
              <StatusBadge status={s.status} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
