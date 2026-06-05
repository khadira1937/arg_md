import type { BillingCycle, CouponType } from "@prisma/client";

/** Months per billing cycle. */
export const CYCLE_MONTHS: Record<BillingCycle, number> = {
  MONTHLY: 1,
  QUARTERLY: 3,
  SEMIANNUAL: 6,
  ANNUAL: 12,
  BIENNIAL: 24,
};

export const CYCLE_LABEL: Record<BillingCycle, string> = {
  MONTHLY: "Monthly",
  QUARTERLY: "Every 3 months",
  SEMIANNUAL: "Every 6 months",
  ANNUAL: "Annually",
  BIENNIAL: "Every 2 years",
};

export const CYCLE_SHORT: Record<BillingCycle, string> = {
  MONTHLY: "/mo",
  QUARTERLY: "/3mo",
  SEMIANNUAL: "/6mo",
  ANNUAL: "/yr",
  BIENNIAL: "/2yr",
};

/** Format integer cents into a localized currency string. */
export function formatMoney(cents: number, currency = "USD", locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

/** Effective monthly price (cents) for an amount billed over a cycle. */
export function effectiveMonthly(amountCents: number, cycle: BillingCycle): number {
  return Math.round(amountCents / CYCLE_MONTHS[cycle]);
}

/** Discount percent derived from a promo vs renewal price. */
export function savingsPercent(promo: number, renewal: number): number {
  if (renewal <= 0 || promo >= renewal) return 0;
  return Math.round(((renewal - promo) / renewal) * 100);
}

export type LineInput = {
  unitAmount: number;
  quantity: number;
  setupFee?: number;
};

export type CouponInput = {
  type: CouponType;
  value: number; // percent (0-100) or fixed cents
  minSubtotal?: number | null;
};

export type PricingTotals = {
  subtotal: number;
  setupTotal: number;
  discountTotal: number;
  taxTotal: number;
  total: number;
};

/**
 * Compute order totals from line items + optional coupon.
 * Tax is left at 0 (pluggable); discount applies to recurring subtotal only.
 */
export function computeTotals(lines: LineInput[], coupon?: CouponInput | null): PricingTotals {
  const subtotal = lines.reduce((s, l) => s + l.unitAmount * l.quantity, 0);
  const setupTotal = lines.reduce((s, l) => s + (l.setupFee ?? 0), 0);

  let discountTotal = 0;
  if (coupon && (!coupon.minSubtotal || subtotal >= coupon.minSubtotal)) {
    discountTotal =
      coupon.type === "PERCENT"
        ? Math.round((subtotal * Math.min(coupon.value, 100)) / 100)
        : Math.min(coupon.value, subtotal);
  }

  const taxTotal = 0;
  const total = Math.max(0, subtotal - discountTotal) + setupTotal + taxTotal;
  return { subtotal, setupTotal, discountTotal, taxTotal, total };
}

/** Resolve the location-adjusted unit price. */
export function applyLocationModifier(base: number, modifier = 0): number {
  return Math.max(0, base + modifier);
}
