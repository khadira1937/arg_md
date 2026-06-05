import "server-only";
import { prisma } from "@/lib/db";
import type { CouponInput } from "@/lib/pricing";

export type CouponValidation =
  | { ok: true; coupon: CouponInput & { id: string; code: string } }
  | { ok: false; error: string };

/** Validate a coupon code for a user + subtotal. Does not record redemption. */
export async function validateCoupon(
  code: string,
  userId: string,
  subtotal: number,
): Promise<CouponValidation> {
  const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });
  if (!coupon || !coupon.isActive) return { ok: false, error: "Invalid coupon code." };

  const now = new Date();
  if (coupon.startsAt && coupon.startsAt > now) return { ok: false, error: "This coupon isn't active yet." };
  if (coupon.endsAt && coupon.endsAt < now) return { ok: false, error: "This coupon has expired." };
  if (coupon.maxRedemptions && coupon.timesRedeemed >= coupon.maxRedemptions)
    return { ok: false, error: "This coupon has reached its redemption limit." };
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal)
    return { ok: false, error: "Your order doesn't meet this coupon's minimum." };

  const usedByUser = await prisma.couponRedemption.count({ where: { couponId: coupon.id, userId } });
  if (usedByUser >= coupon.perUserLimit) return { ok: false, error: "You've already used this coupon." };

  return {
    ok: true,
    coupon: { id: coupon.id, code: coupon.code, type: coupon.type, value: coupon.value, minSubtotal: coupon.minSubtotal },
  };
}
