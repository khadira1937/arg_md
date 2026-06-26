/**
 * Primary booking link. Every "Book a Call" / "Schedule a discovery call" CTA
 * opens this Calendly in a new tab. Override per-environment with
 * NEXT_PUBLIC_CALENDLY_URL; the fallback is the live ARGANA MEDIA Calendly.
 */
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/mbenzakatako/30min";

/** True for absolute http(s) links (Calendly, external) → render a real <a target="_blank">. */
export const isExternal = (href: string) => /^https?:\/\//.test(href);
