"use client";

/**
 * Lightweight client-side domain shortlist.
 *
 * The main cart is plan/Prisma-backed and provisioned automatically. Domain
 * registration is a manual, post-payment step (availability must be confirmed
 * by the registrar), so domains are kept in a separate browser-local shortlist
 * rather than injected into the automated checkout. This keeps the UX honest
 * and avoids touching the existing cart/checkout/Stripe flow.
 */

const KEY = "hostyncloud_domain_shortlist";
export const DOMAIN_SHORTLIST_EVENT = "hostyncloud:domains-changed";

export type ShortlistedDomain = {
  domain: string;
  price: number | null;
  currency: string;
  premium: boolean;
  addedAt: number;
};

function read(): ShortlistedDomain[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items: ShortlistedDomain[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(DOMAIN_SHORTLIST_EVENT));
}

export function getDomainShortlist(): ShortlistedDomain[] {
  return read();
}

export function isDomainShortlisted(domain: string): boolean {
  return read().some((d) => d.domain === domain);
}

export function addDomainToShortlist(input: Omit<ShortlistedDomain, "addedAt">): ShortlistedDomain[] {
  const items = read();
  if (!items.some((d) => d.domain === input.domain)) {
    items.push({ ...input, addedAt: Date.now() });
    write(items);
  }
  return items;
}

export function removeDomainFromShortlist(domain: string): ShortlistedDomain[] {
  const items = read().filter((d) => d.domain !== domain);
  write(items);
  return items;
}
