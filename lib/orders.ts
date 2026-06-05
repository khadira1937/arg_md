import "server-only";
import { Prisma, type BillingCycle } from "@prisma/client";
import { prisma } from "@/lib/db";
import { computeTotals, formatMoney, CYCLE_MONTHS, type LineInput } from "@/lib/pricing";
import { validateCoupon } from "@/lib/coupons";
import { shortId } from "@/lib/utils";
import { sendEmail } from "@/lib/email";
import { audit } from "@/lib/audit";
import { brand } from "@/config/brand";

export function orderNumber() {
  return `ORD-${shortId(8)}`;
}
export function invoiceNumber() {
  return `INV-${shortId(8)}`;
}

function periodEnd(start: Date, cycle: BillingCycle): Date {
  const d = new Date(start);
  d.setMonth(d.getMonth() + CYCLE_MONTHS[cycle]);
  return d;
}

type BuildResult =
  | { ok: true; orderId: string }
  | { ok: false; error: string };

/**
 * Create a PENDING order (+ order items) from the user's cart, applying an
 * optional coupon. Pricing is recomputed server-side from the database.
 */
export async function createOrderFromCart(userId: string, couponCode?: string | null): Promise<BuildResult> {
  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: { include: { plan: { include: { product: true, prices: true } }, location: true } } },
  });
  if (!cart || cart.items.length === 0) return { ok: false, error: "Your cart is empty." };

  // Resolve add-on records referenced across the cart.
  const addonIds = new Set<string>();
  for (const item of cart.items) for (const id of (item.selectedAddons as string[] | null) ?? []) addonIds.add(id);
  const addonRecords = await prisma.addon.findMany({ where: { id: { in: [...addonIds] } } });
  const addonMap = new Map(addonRecords.map((a) => [a.id, a]));

  type Line = LineInput & {
    productId: string;
    planId: string;
    addonId?: string;
    description: string;
    billingCycle: BillingCycle;
    locationId?: string | null;
    configSnapshot?: Record<string, unknown>;
  };
  const lines: Line[] = [];

  for (const item of cart.items) {
    const price = item.plan.prices.find((p) => p.billingCycle === item.billingCycle && p.currency === "USD");
    const setupFee = price?.setupFee ?? 0;
    const selected = ((item.selectedAddons as string[] | null) ?? [])
      .map((id) => addonMap.get(id))
      .filter(Boolean)
      .map((a) => ({ id: a!.id, name: a!.name, amount: a!.amount, billingType: a!.billingType }));

    lines.push({
      productId: item.plan.productId,
      planId: item.planId,
      description: `${item.plan.product.name} — ${item.plan.name}`,
      billingCycle: item.billingCycle,
      locationId: item.locationId,
      unitAmount: item.unitAmount,
      quantity: item.quantity,
      setupFee,
      configSnapshot: {
        billingCycle: item.billingCycle,
        locationId: item.locationId,
        specs: item.plan.specs,
        addons: selected,
      },
    });

    for (const a of selected) {
      lines.push({
        productId: item.plan.productId,
        planId: item.planId,
        addonId: a.id,
        description: `Add-on: ${a.name}`,
        billingCycle: item.billingCycle,
        locationId: item.locationId,
        unitAmount: a.amount,
        quantity: item.quantity,
        setupFee: 0,
      });
    }
  }

  // Coupon
  const subtotalForCoupon = lines.reduce((s, l) => s + l.unitAmount * l.quantity, 0);
  let coupon = null as Awaited<ReturnType<typeof validateCoupon>> | null;
  if (couponCode) {
    coupon = await validateCoupon(couponCode, userId, subtotalForCoupon);
    if (!coupon.ok) return { ok: false, error: coupon.error };
  }

  const totals = computeTotals(
    lines.map((l) => ({ unitAmount: l.unitAmount, quantity: l.quantity, setupFee: l.setupFee })),
    coupon && coupon.ok ? coupon.coupon : null,
  );

  const order = await prisma.order.create({
    data: {
      number: orderNumber(),
      userId,
      status: "PENDING",
      currency: "USD",
      subtotal: totals.subtotal,
      discountTotal: totals.discountTotal,
      setupTotal: totals.setupTotal,
      taxTotal: totals.taxTotal,
      total: totals.total,
      couponCode: coupon && coupon.ok ? coupon.coupon.code : null,
      items: {
        create: lines.map((l) => ({
          productId: l.productId,
          planId: l.planId,
          addonId: l.addonId ?? null,
          description: l.description,
          billingCycle: l.billingCycle,
          locationId: l.locationId ?? null,
          quantity: l.quantity,
          unitAmount: l.unitAmount,
          setupFee: l.setupFee ?? 0,
          lineTotal: l.unitAmount * l.quantity,
          configSnapshot: (l.configSnapshot ?? undefined) as Prisma.InputJsonValue | undefined,
        })),
      },
    },
  });

  return { ok: true, orderId: order.id };
}

/**
 * Fulfill a paid order: create invoice, payment, subscriptions, service
 * instances and provisioning jobs, then send emails. Idempotent on order id.
 */
export async function fulfillOrder(
  orderId: string,
  opts: { stripeSubscriptionId?: string; stripeInvoiceId?: string; paymentIntentId?: string } = {},
): Promise<void> {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { plan: true, product: true, addon: true } }, user: true, invoices: true },
  });
  if (!order) return;
  if (order.invoices.length > 0 && order.status !== "PENDING") return; // already fulfilled

  const now = new Date();

  await prisma.$transaction(async (tx) => {
    await tx.order.update({ where: { id: order.id }, data: { status: "PAID" } });

    const invoice = await tx.invoice.create({
      data: {
        number: invoiceNumber(),
        userId: order.userId,
        orderId: order.id,
        status: "PAID",
        currency: order.currency,
        subtotal: order.subtotal,
        discountTotal: order.discountTotal,
        taxTotal: order.taxTotal,
        total: order.total,
        amountPaid: order.total,
        paidAt: now,
        stripeInvoiceId: opts.stripeInvoiceId,
        items: {
          create: order.items.map((it) => ({
            description: it.description,
            quantity: it.quantity,
            unitAmount: it.unitAmount,
            lineTotal: it.lineTotal,
          })),
        },
      },
    });

    await tx.payment.create({
      data: {
        userId: order.userId,
        invoiceId: invoice.id,
        orderId: order.id,
        status: "SUCCEEDED",
        currency: order.currency,
        amount: order.total,
        method: "card",
        stripePaymentIntentId: opts.paymentIntentId,
      },
    });

    if (order.couponCode) {
      const coupon = await tx.coupon.findUnique({ where: { code: order.couponCode } });
      if (coupon) {
        await tx.coupon.update({ where: { id: coupon.id }, data: { timesRedeemed: { increment: 1 } } });
        await tx.couponRedemption.create({
          data: { couponId: coupon.id, userId: order.userId, orderId: order.id, amountDiscounted: order.discountTotal },
        });
      }
    }

    // One subscription + service per plan line (non-addon).
    for (const item of order.items.filter((i) => i.planId && !i.addonId)) {
      const cycle = item.billingCycle ?? "MONTHLY";
      const end = periodEnd(now, cycle);
      const config = (item.configSnapshot as Record<string, unknown> | null) ?? {};

      const subscription = await tx.subscription.create({
        data: {
          userId: order.userId,
          orderId: order.id,
          planId: item.planId!,
          status: "ACTIVE",
          billingCycle: cycle,
          currency: order.currency,
          amount: item.unitAmount,
          currentPeriodStart: now,
          currentPeriodEnd: end,
          stripeSubscriptionId: opts.stripeSubscriptionId,
        },
      });

      const service = await tx.serviceInstance.create({
        data: {
          userId: order.userId,
          orderId: order.id,
          subscriptionId: subscription.id,
          productId: item.productId!,
          planId: item.planId!,
          locationId: item.locationId ?? null,
          label: `${item.product?.name ?? "Service"} · ${item.plan?.name ?? ""}`.trim(),
          status: "PENDING",
          providerKey: item.product?.providerKey ?? "mock",
          specsSnapshot: (config.specs as object) ?? undefined,
          addonsSnapshot: (config.addons as object) ?? undefined,
          renewsAt: end,
        },
      });

      await tx.provisioningJob.create({
        data: { serviceInstanceId: service.id, type: "PROVISION", status: "QUEUED" },
      });
    }

    // Empty the cart.
    const cart = await tx.cart.findFirst({ where: { userId: order.userId } });
    if (cart) await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
  });

  await audit({ actorId: order.userId, action: "order.fulfilled", entityType: "Order", entityId: order.id, metadata: { total: order.total } });

  // Emails (best-effort).
  const name = order.user.name ?? "there";
  const total = formatMoney(order.total, order.currency);
  await sendEmail({ to: order.user.email, template: { type: "order_confirmation", name, orderNumber: order.number, total } });
  await sendEmail({ to: order.user.email, template: { type: "payment_confirmation", name, amount: total, invoiceNumber: "your invoice" } });
  await sendEmail({ to: brand.email.sales, template: { type: "admin_new_order", orderNumber: order.number, customer: order.user.email, total } });

  // Kick off provisioning immediately (local). In production a worker/queue does this.
  const { processPendingJobs } = await import("@/lib/provisioning");
  await processPendingJobs();
}
