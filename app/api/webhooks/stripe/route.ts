import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe/client";
import { env } from "@/config/env";
import { prisma } from "@/lib/db";
import { fulfillOrder } from "@/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Stripe webhook receiver with signature verification + idempotent handlers. */
export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig || !env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = (session.metadata?.orderId as string) ?? session.client_reference_id ?? undefined;
        if (orderId) {
          await fulfillOrder(orderId, {
            stripeSubscriptionId: (session.subscription as string) ?? undefined,
            paymentIntentId: (session.payment_intent as string) ?? undefined,
          });
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = invoice.subscription as string | null;
        if (subId) {
          await prisma.subscription.updateMany({ where: { stripeSubscriptionId: subId }, data: { status: "PAST_DUE" } });
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const statusMap: Record<string, "ACTIVE" | "PAST_DUE" | "CANCELED" | "UNPAID" | "PAUSED" | "TRIALING" | "INCOMPLETE"> = {
          active: "ACTIVE", past_due: "PAST_DUE", canceled: "CANCELED", unpaid: "UNPAID",
          paused: "PAUSED", trialing: "TRIALING", incomplete: "INCOMPLETE", incomplete_expired: "CANCELED",
        };
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: {
            status: statusMap[sub.status] ?? "ACTIVE",
            cancelAtPeriodEnd: sub.cancel_at_period_end,
            currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : undefined,
          },
        });
        break;
      }

      default:
        break;
    }
  } catch (err) {
    // A unique-constraint violation means a concurrent/duplicate delivery already
    // wrote the rows. Treat it as idempotent success so Stripe stops retrying.
    const code = (err as { code?: string })?.code;
    if (code === "P2002") {
      console.log(`[stripe] duplicate delivery for ${event.type} (${event.id}) — already processed, returning 200.`);
      return NextResponse.json({ received: true, duplicate: true });
    }
    console.error(`[stripe] handler error for ${event.type}`, err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
