"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { profileSchema } from "@/lib/validators";
import { createOrderFromCart, fulfillOrder } from "@/lib/orders";
import { isPlaceholderMode } from "@/lib/stripe/client";
import { createCheckoutSession } from "@/lib/stripe/checkout";
import { validateCoupon } from "@/lib/coupons";
import { getCart } from "@/lib/cart";

export type CheckoutState = { error?: string } | null;

export async function startCheckoutAction(_prev: CheckoutState, formData: FormData): Promise<CheckoutState> {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/checkout");

  // Persist billing details to the user's profile.
  const profile = profileSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company") ?? "",
    phone: formData.get("phone") ?? "",
    address: formData.get("address") ?? "",
    city: formData.get("city") ?? "",
    state: formData.get("state") ?? "",
    country: formData.get("country") ?? "",
    postalCode: formData.get("postalCode") ?? "",
    taxId: formData.get("taxId") ?? "",
  });
  if (!profile.success) return { error: profile.error.errors[0]?.message ?? "Check your billing details." };

  const { name, ...address } = profile.data;
  await prisma.user.update({ where: { id: user.id }, data: { name } });
  await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: address,
    create: { userId: user.id, ...address },
  });

  const couponCode = (formData.get("couponCode") as string | null)?.trim() || null;

  const created = await createOrderFromCart(user.id, couponCode);
  if (!created.ok) return { error: created.error };

  // Placeholder mode: simulate instant successful payment + fulfillment.
  if (isPlaceholderMode()) {
    await fulfillOrder(created.orderId);
    const order = await prisma.order.findUnique({ where: { id: created.orderId } });
    revalidatePath("/dashboard");
    redirect(`/checkout/success?order=${order?.number ?? ""}`);
  }

  // Real Stripe: redirect to hosted Checkout.
  try {
    const url = await createCheckoutSession(created.orderId);
    redirect(url);
  } catch (err) {
    if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) throw err;
    return { error: err instanceof Error ? err.message : "Could not start checkout." };
  }
}

export async function applyCouponAction(code: string): Promise<{ ok: boolean; message: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, message: "Please log in." };
  const cart = await getCart();
  const subtotal = (cart?.items ?? []).reduce((s, i) => s + i.unitAmount * i.quantity, 0);
  const result = await validateCoupon(code, user.id, subtotal);
  return result.ok
    ? { ok: true, message: `Coupon ${result.coupon.code} applied.` }
    : { ok: false, message: result.error };
}
