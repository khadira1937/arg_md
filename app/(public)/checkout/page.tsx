import Link from "next/link";
import type { Metadata } from "next";
import { ShoppingCart, ShieldCheck, ArrowLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getCart } from "@/lib/cart";
import { computeTotals, formatMoney, CYCLE_LABEL } from "@/lib/pricing";
import { isPlaceholderMode } from "@/lib/stripe/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { TrustBar } from "@/components/marketing/trust-bar";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Checkout", path: "/checkout", noIndex: true });
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const user = await getCurrentUser();
  const cart = await getCart();
  const items = cart?.items ?? [];

  if (items.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground"><ShoppingCart className="h-8 w-8" /></span>
        <h1 className="mt-6 font-display text-2xl font-bold">Nothing to check out</h1>
        <Button asChild variant="gradient" className="mt-6"><Link href="/pricing">Browse plans</Link></Button>
      </div>
    );
  }

  const totals = computeTotals(items.map((i) => ({ unitAmount: i.unitAmount, quantity: i.quantity })));
  const profile = user?.profile;

  return (
    <div className="container py-12">
      <Link href="/cart" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </Link>
      <h1 className="font-display text-3xl font-bold">Checkout</h1>
      {isPlaceholderMode() && (
        <Badge variant="warning" className="mt-3">Test mode — no real payment will be charged</Badge>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="mb-5 font-semibold">Billing details</h2>
            <CheckoutForm
              defaults={{
                name: user?.name ?? "",
                company: profile?.company, phone: profile?.phone, address: profile?.address,
                city: profile?.city, state: profile?.state, country: profile?.country, postalCode: profile?.postalCode,
              }}
            />
          </Card>
        </div>

        <div>
          <Card className="sticky top-24 p-6">
            <h2 className="font-semibold">Order summary</h2>
            <div className="mt-4 space-y-3">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between gap-3 text-sm">
                  <span>
                    {i.plan.product.name} — {i.plan.name}
                    <span className="block text-xs text-muted-foreground">{CYCLE_LABEL[i.billingCycle]}{i.location ? ` · ${i.location.city}` : ""}</span>
                  </span>
                  <span className="font-medium">{formatMoney(i.unitAmount * i.quantity)}</span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatMoney(totals.subtotal)}</span></div>
              {totals.setupTotal > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Setup</span><span>{formatMoney(totals.setupTotal)}</span></div>}
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-semibold"><span>Total due today</span><span>{formatMoney(totals.total)}</span></div>
              <p className="text-xs text-muted-foreground">Coupons are validated and applied when you complete the order.</p>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" /> Secured by Stripe</p>

            {/* What happens next — honest provisioning timing */}
            <div className="mt-4 rounded-lg border bg-muted/40 p-3">
              <p className="text-xs font-semibold">What happens next</p>
              <ol className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                <li className="flex gap-2"><span className="font-mono text-primary">1.</span> Pay securely — Stripe processes your card.</li>
                <li className="flex gap-2"><span className="font-mono text-primary">2.</span> Your service is provisioned automatically, right after payment.</li>
                <li className="flex gap-2"><span className="font-mono text-primary">3.</span> Access details arrive by email and in your dashboard.</li>
              </ol>
            </div>
          </Card>
        </div>
      </div>

      <TrustBar className="mt-10" />
    </div>
  );
}
