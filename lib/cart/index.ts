import "server-only";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import type { BillingCycle } from "@prisma/client";
import { prisma } from "@/lib/db";
import { readSession } from "@/lib/auth/session";

const CART_COOKIE = "argana_cart";

/** Resolve the cart cookie token, creating one if needed (guest carts). */
async function getCartToken(create = false): Promise<string | null> {
  const store = await cookies();
  let token = store.get(CART_COOKIE)?.value ?? null;
  if (!token && create) {
    token = crypto.randomBytes(16).toString("hex");
    store.set(CART_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return token;
}

/** Find the active cart for the current user or guest session (read-only). */
export async function getCart() {
  const session = await readSession();
  const token = await getCartToken(false);
  if (!session && !token) return null;

  const cart = await prisma.cart.findFirst({
    where: session ? { userId: session.userId } : { sessionToken: token! },
    include: {
      items: {
        include: { plan: { include: { product: true } }, location: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });
  return cart;
}

/** Get or create a cart for the current identity (mutating helper). */
export async function getOrCreateCart() {
  const session = await readSession();
  if (session) {
    const existing = await prisma.cart.findFirst({ where: { userId: session.userId } });
    if (existing) return existing;
    return prisma.cart.create({ data: { userId: session.userId } });
  }
  const token = await getCartToken(true);
  const existing = await prisma.cart.findFirst({ where: { sessionToken: token! } });
  if (existing) return existing;
  return prisma.cart.create({ data: { sessionToken: token! } });
}

export async function getCartCount(): Promise<number> {
  const cart = await getCart();
  if (!cart) return 0;
  return cart.items.reduce((n, i) => n + i.quantity, 0);
}

export type AddCartItemInput = {
  planId: string;
  billingCycle: BillingCycle;
  locationId?: string | null;
  quantity?: number;
  addonIds?: string[];
};

/** Add an item to the cart, snapshotting the current unit price from the DB. */
export async function addCartItem(input: AddCartItemInput) {
  const cart = await getOrCreateCart();
  const price = await prisma.planPrice.findUnique({
    where: {
      planId_billingCycle_currency: {
        planId: input.planId,
        billingCycle: input.billingCycle,
        currency: "USD",
      },
    },
  });
  if (!price) throw new Error("Selected billing cycle is not available for this plan.");

  let unitAmount = price.amount;
  if (input.locationId) {
    const loc = await prisma.planLocationPrice.findUnique({
      where: { planId_locationId: { planId: input.planId, locationId: input.locationId } },
    });
    if (loc) unitAmount = Math.max(0, unitAmount + loc.priceModifier);
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      planId: input.planId,
      billingCycle: input.billingCycle,
      locationId: input.locationId ?? null,
      quantity: input.quantity ?? 1,
      unitAmount,
      selectedAddons: input.addonIds ?? [],
    },
  });
}

export async function removeCartItem(itemId: string) {
  const cart = await getCart();
  if (!cart) return;
  await prisma.cartItem.deleteMany({ where: { id: itemId, cartId: cart.id } });
}

export async function clearCart() {
  const cart = await getCart();
  if (!cart) return;
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
}

/** Merge a guest cart into the user's cart after login. */
export async function mergeGuestCart(userId: string) {
  const token = await getCartToken(false);
  if (!token) return;
  const guestCart = await prisma.cart.findFirst({ where: { sessionToken: token } });
  if (!guestCart) return;
  const userCart = await prisma.cart.findFirst({ where: { userId } });
  if (!userCart) {
    await prisma.cart.update({ where: { id: guestCart.id }, data: { userId, sessionToken: null } });
    return;
  }
  await prisma.cartItem.updateMany({ where: { cartId: guestCart.id }, data: { cartId: userCart.id } });
  await prisma.cart.delete({ where: { id: guestCart.id } });
}
