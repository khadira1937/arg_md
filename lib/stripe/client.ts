import "server-only";
import Stripe from "stripe";
import { env } from "@/config/env";

/** Lazily constructed Stripe client. Null when no secret key is configured. */
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add Stripe test keys to .env, or keep " +
        "STRIPE_PLACEHOLDER_MODE=true to use seeded placeholder prices.",
    );
  }
  if (!_stripe) {
    _stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      // Use the SDK's pinned API version to avoid type drift across upgrades.
      typescript: true,
      appInfo: { name: "ARGANA MEDIA" },
    });
  }
  return _stripe;
}

export function stripeConfigured(): boolean {
  return Boolean(env.STRIPE_SECRET_KEY);
}

export function isPlaceholderMode(): boolean {
  return env.STRIPE_PLACEHOLDER_MODE || !env.STRIPE_SECRET_KEY;
}
