import { CreditCard, AlertTriangle, CheckCircle2 } from "lucide-react";
import { requireStaff } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isPlaceholderMode, stripeConfigured } from "@/lib/stripe/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader, StatCard } from "@/components/dashboard/ui";
import { StripeSyncButton } from "@/components/admin/controls";

export default async function AdminStripePage() {
  await requireStaff();
  const [products, syncedProducts, prices, syncedPrices] = await Promise.all([
    prisma.product.count({ where: { isActive: true, inquiryOnly: false } }),
    prisma.product.count({ where: { stripeProductId: { not: null } } }),
    prisma.planPrice.count({ where: { isActive: true } }),
    prisma.planPrice.count({ where: { stripePriceId: { not: null } } }),
  ]);

  return (
    <div>
      <PageHeader title="Stripe sync" description="Mirror the database catalog into Stripe products and prices." action={<StripeSyncButton />} />

      <Card className={`mb-6 flex items-center gap-3 p-4 ${isPlaceholderMode() ? "border-amber-300 bg-amber-50/50" : "border-success/40 bg-success/5"}`}>
        {isPlaceholderMode() ? <AlertTriangle className="h-5 w-5 text-amber-600" /> : <CheckCircle2 className="h-5 w-5 text-success" />}
        <div>
          <p className="text-sm font-medium">
            {isPlaceholderMode() ? "Placeholder mode" : "Live Stripe mode"}
            <Badge variant={stripeConfigured() ? "success" : "warning"} className="ml-2">{stripeConfigured() ? "Keys set" : "No keys"}</Badge>
          </p>
          <p className="text-xs text-muted-foreground">
            {isPlaceholderMode()
              ? "Checkout uses seeded placeholder price ids. Set STRIPE_PLACEHOLDER_MODE=false with real keys, then sync."
              : "Checkout uses real Stripe prices. Re-sync after pricing changes."}
          </p>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Products" value={products} icon={CreditCard} />
        <StatCard label="Synced products" value={`${syncedProducts}/${products}`} icon={CheckCircle2} />
        <StatCard label="Prices" value={prices} icon={CreditCard} />
        <StatCard label="Synced prices" value={`${syncedPrices}/${prices}`} icon={CheckCircle2} />
      </div>
    </div>
  );
}
