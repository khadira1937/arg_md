import "server-only";
import { prisma } from "@/lib/db";
import { CYCLE_MONTHS } from "@/lib/pricing";
import { getStripe, isPlaceholderMode } from "./client";

/** Map our billing cycle to a Stripe recurring interval. */
function recurringFor(cycleMonths: number): { interval: "month" | "year"; interval_count: number } {
  if (cycleMonths % 12 === 0) return { interval: "year", interval_count: cycleMonths / 12 };
  return { interval: "month", interval_count: cycleMonths };
}

export type SyncReport = {
  productsSynced: number;
  pricesSynced: number;
  skipped: number;
  placeholder: boolean;
  messages: string[];
};

/**
 * Sync DB products + plan prices into Stripe Products/Prices and persist the ids.
 * In placeholder mode it stamps deterministic fake ids so checkout UI works
 * without a real Stripe account.
 */
export async function syncCatalogToStripe(): Promise<SyncReport> {
  const report: SyncReport = {
    productsSynced: 0,
    pricesSynced: 0,
    skipped: 0,
    placeholder: isPlaceholderMode(),
    messages: [],
  };

  const products = await prisma.product.findMany({
    where: { isActive: true, inquiryOnly: false },
    include: { plans: { where: { isActive: true }, include: { prices: { where: { isActive: true } } } } },
  });

  if (report.placeholder) {
    for (const product of products) {
      const pid = product.stripeProductId ?? `prod_placeholder_${product.slug}`;
      if (product.stripeProductId !== pid) {
        await prisma.product.update({ where: { id: product.id }, data: { stripeProductId: pid } });
      }
      report.productsSynced++;
      for (const plan of product.plans) {
        for (const price of plan.prices) {
          const priceId = price.stripePriceId ?? `price_placeholder_${plan.slug}_${price.billingCycle}`.toLowerCase();
          if (price.stripePriceId !== priceId || price.stripeProductId !== pid) {
            await prisma.planPrice.update({
              where: { id: price.id },
              data: { stripePriceId: priceId, stripeProductId: pid },
            });
          }
          report.pricesSynced++;
        }
      }
    }
    report.messages.push(
      "Placeholder mode: seeded fake Stripe ids. Set STRIPE_PLACEHOLDER_MODE=false and real keys, then re-run to create real objects.",
    );
    return report;
  }

  const stripe = getStripe();
  for (const product of products) {
    let stripeProductId = product.stripeProductId ?? undefined;
    const stripeProduct = stripeProductId
      ? await stripe.products.update(stripeProductId, {
          name: product.name,
          description: product.shortDescription ?? undefined,
        })
      : await stripe.products.create({
          name: product.name,
          description: product.shortDescription ?? undefined,
          metadata: { slug: product.slug },
        });
    stripeProductId = stripeProduct.id;
    if (product.stripeProductId !== stripeProductId) {
      await prisma.product.update({ where: { id: product.id }, data: { stripeProductId } });
    }
    report.productsSynced++;

    for (const plan of product.plans) {
      for (const price of plan.prices) {
        // Stripe prices are immutable; create a new one when amount changes.
        const created = await stripe.prices.create({
          product: stripeProductId,
          currency: price.currency.toLowerCase(),
          unit_amount: price.amount,
          recurring: recurringFor(CYCLE_MONTHS[price.billingCycle]),
          nickname: `${plan.name} · ${price.billingCycle}`,
          metadata: { planSlug: plan.slug, billingCycle: price.billingCycle },
        });
        await prisma.planPrice.update({
          where: { id: price.id },
          data: { stripePriceId: created.id, stripeProductId },
        });
        report.pricesSynced++;
      }
    }
  }

  report.messages.push("Synced real Stripe products and prices.");
  return report;
}
