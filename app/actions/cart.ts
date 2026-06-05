"use server";

import { revalidatePath } from "next/cache";
import { addToCartSchema } from "@/lib/validators";
import { addCartItem, removeCartItem, clearCart } from "@/lib/cart";

export type ActionResult = { ok: boolean; error?: string };

export async function addToCartAction(input: unknown): Promise<ActionResult> {
  const parsed = addToCartSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.errors[0]?.message ?? "Invalid selection" };
  }
  try {
    await addCartItem({
      planId: parsed.data.planId,
      billingCycle: parsed.data.billingCycle,
      locationId: parsed.data.locationId ?? null,
      quantity: parsed.data.quantity,
      addonIds: parsed.data.addonIds,
    });
    revalidatePath("/cart");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Could not add to cart" };
  }
}

export async function removeFromCartAction(itemId: string): Promise<ActionResult> {
  try {
    await removeCartItem(itemId);
    revalidatePath("/cart");
    return { ok: true };
  } catch {
    return { ok: false, error: "Could not remove item" };
  }
}

export async function clearCartAction(): Promise<ActionResult> {
  await clearCart();
  revalidatePath("/cart");
  return { ok: true };
}

/** Form-action wrapper so cart items can be removed with a plain <form>. */
export async function removeCartItemForm(formData: FormData): Promise<void> {
  const itemId = String(formData.get("itemId") ?? "");
  if (itemId) {
    await removeCartItem(itemId);
    revalidatePath("/cart");
  }
}
