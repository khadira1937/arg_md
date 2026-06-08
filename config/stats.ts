import { brand } from "./brand";

/**
 * Headline marketing stats. Keep these specific and defensible — uptime is
 * framed as a *target* (linked to the SLA), not a claimed historical fact.
 *
 * // TODO: replace with real data source — once you have measured figures,
 * // wire these to your monitor/billing instead of brand.stats.
 */
export type MarketingStat = {
  /** Display value; a leading number is animated (count-up). e.g. "99.9%". */
  value: string;
  label: string;
  /** Optional small accent after the label, e.g. "see SLA". */
  sub?: string;
  /** Optional link target for the stat. */
  href?: string;
};

export const marketingStats: MarketingStat[] = [
  { value: brand.stats.uptime, label: "Uptime target", sub: "see SLA", href: "/sla" },
  { value: brand.stats.regions, label: "Global regions", href: "/data-centers" },
  { value: brand.stats.support, label: "Support" },
  { value: "Stripe", label: "Secure payments" },
];
