import { brand } from "./brand";

/**
 * Headline trust signals. Kept honest and defensible for a UK-registered company
 * — no invented client counts, revenue figures or review scores.
 */
export type MarketingStat = {
  /** Display value; a leading number is animated (count-up). e.g. "6". */
  value: string;
  label: string;
  /** Optional small accent after the label. */
  sub?: string;
  /** Optional link target for the stat. */
  href?: string;
};

export const marketingStats: MarketingStat[] = [
  { value: brand.stats.services, label: "Service lines", sub: "one team", href: "/services" },
  { value: "UK", label: "Registered company", sub: "England & Wales", href: "/about" },
  { value: "Fixed", label: "Quotes & scope", sub: "no surprises" },
  { value: "Dedicated", label: "Support & care" },
];
