import Link from "next/link";
import type { Metadata } from "next";
import { Trash2, ShoppingCart, ArrowRight, ShieldCheck } from "lucide-react";
import { getCart } from "@/lib/cart";
import { computeTotals, formatMoney, CYCLE_LABEL } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { removeCartItemForm } from "@/app/actions/cart";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Your cart", path: "/cart", noIndex: true });
export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = await getCart();
  const items = cart?.items ?? [];

  if (items.length === 0) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <ShoppingCart className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 max-w-sm text-muted-foreground">Browse our plans and add a service to get started.</p>
        <Button asChild variant="gradient" className="mt-6"><Link href="/pricing">Explore plans</Link></Button>
      </div>
    );
  }

  const totals = computeTotals(
    items.map((i) => ({ unitAmount: i.unitAmount, quantity: i.quantity })),
  );

  return (
    <div className="container py-12">
      <h1 className="font-display text-3xl font-bold">Your cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <Card key={item.id} className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="font-semibold">{item.plan.product.name} — {item.plan.name}</p>
                <p className="text-sm text-muted-foreground">
                  {CYCLE_LABEL[item.billingCycle]}
                  {item.location ? ` · ${item.location.flagEmoji} ${item.location.city}` : ""}
                  {item.quantity > 1 ? ` · ×${item.quantity}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold">{formatMoney(item.unitAmount * item.quantity)}</span>
                <form action={removeCartItemForm}>
                  <input type="hidden" name="itemId" value={item.id} />
                  <Button type="submit" variant="ghost" size="icon" aria-label="Remove">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </form>
              </div>
            </Card>
          ))}
        </div>

        <div>
          <Card className="p-6">
            <h2 className="font-semibold">Order summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatMoney(totals.subtotal)}</span></div>
              {totals.setupTotal > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Setup fees</span><span>{formatMoney(totals.setupTotal)}</span></div>}
              <Separator className="my-3" />
              <div className="flex justify-between text-base font-semibold"><span>Total due today</span><span>{formatMoney(totals.total)}</span></div>
            </div>
            <Button asChild variant="gradient" className="mt-6 w-full">
              <Link href="/checkout">Proceed to checkout <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> Secure checkout via Stripe
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
