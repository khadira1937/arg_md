import "server-only";
import type Stripe from "stripe";
import { prisma } from "@/lib/db";
import { getStripe } from "./client";
import { absoluteUrl } from "@/lib/utils";

/** Ensure the user has a Stripe customer; returns the customer id. */
async function ensureCustomer(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");
  if (user.stripeCustomerId) return user.stripeCustomerId;

  const stripe = getStripe();
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name ?? undefined,
    metadata: { userId: user.id },
  });
  await prisma.user.update({ where: { id: user.id }, data: { stripeCustomerId: customer.id } });
  return customer.id;
}

/**
 * Build a Stripe Checkout Session (subscription mode) for an order. Requires
 * every recurring line to have a synced stripePriceId — otherwise checkout is
 * blocked with a clear error (run `npm run stripe:sync`).
 *
 * NOTE: one-time setup fees / one-time add-ons are recorded in our order/invoice
 * but are not added as separate Stripe line items in this MVP (subscription mode).
 */
export async function createCheckoutSession(orderId: string): Promise<string> {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { plan: { include: { prices: true } }, addon: true } } },
  });
  if (!order) throw new Error("Order not found");

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const item of order.items) {
    if (item.planId && !item.addonId) {
      const price = item.plan?.prices.find((p) => p.billingCycle === item.billingCycle && p.currency === "USD");
      if (!price?.stripePriceId) {
        throw new Error(`Stripe price missing for "${item.description}". Run the Stripe sync before checkout.`);
      }
      lineItems.push({ price: price.stripePriceId, quantity: item.quantity });
    } else if (item.addonId && item.addon?.billingType === "RECURRING") {
      if (!item.addon.stripePriceId) throw new Error(`Stripe price missing for add-on "${item.addon.name}".`);
      lineItems.push({ price: item.addon.stripePriceId, quantity: item.quantity });
    }
  }

  if (lineItems.length === 0) throw new Error("No billable recurring items in order.");

  const stripe = getStripe();
  const customer = await ensureCustomer(order.userId);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer,
    line_items: lineItems,
    success_url: absoluteUrl(`/checkout/success?order=${order.number}&session_id={CHECKOUT_SESSION_ID}`),
    cancel_url: absoluteUrl(`/checkout?canceled=1`),
    client_reference_id: order.id,
    metadata: { orderId: order.id, orderNumber: order.number },
    subscription_data: { metadata: { orderId: order.id } },
  });

  await prisma.order.update({ where: { id: order.id }, data: { stripeCheckoutSessionId: session.id } });
  return session.url!;
}
