import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CYCLE_LABEL } from "@/lib/pricing";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/ui";
import { PlanFlag, PriceEditForm } from "@/components/admin/controls";

export default async function AdminPricingPage() {
  await requireStaff();
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: { plans: { orderBy: { sortOrder: "asc" }, include: { prices: { orderBy: { billingCycle: "asc" } } } } },
  });

  return (
    <div>
      <PageHeader title="Pricing" description="Edit prices, renewals and discounts. Changes reflect site-wide instantly; run Stripe sync to mirror to Stripe." />
      <div className="space-y-8">
        {products.map((product) => (
          <Card key={product.id} className="p-6">
            <h2 className="font-semibold">{product.name}</h2>
            <div className="mt-4 space-y-6">
              {product.plans.map((plan) => (
                <div key={plan.id} className="rounded-xl border p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{plan.name}</p>
                    <div className="flex flex-wrap gap-1.5">
                      <PlanFlag planId={plan.id} field="isActive" on={plan.isActive} label="Active" />
                      <PlanFlag planId={plan.id} field="popular" on={plan.popular} label="Popular" />
                      <PlanFlag planId={plan.id} field="recommended" on={plan.recommended} label="Recommended" />
                      <PlanFlag planId={plan.id} field="onSale" on={plan.onSale} label="Sale" />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-muted-foreground">
                          <th className="py-1 font-medium">Cycle</th>
                          <th className="py-1 font-medium">Price ($)</th>
                          <th className="py-1 font-medium">Renewal ($)</th>
                          <th className="py-1 font-medium">Disc %</th>
                          <th className="py-1" />
                        </tr>
                      </thead>
                      <tbody>
                        {plan.prices.map((price) => (
                          <tr key={price.id}>
                            <td className="py-1.5 pr-4 text-muted-foreground">{CYCLE_LABEL[price.billingCycle]}</td>
                            <td colSpan={4} className="py-1.5">
                              <PriceEditForm priceId={price.id} amount={price.amount} renewalAmount={price.renewalAmount} discountPercentage={price.discountPercentage} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
