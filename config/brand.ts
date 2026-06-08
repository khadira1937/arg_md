/**
 * Central brand configuration. Rename / recolor the whole product here.
 * Nothing in the UI hardcodes the brand name — it all reads from this file.
 */
export const brand = {
  name: "CloudynHost",
  shortName: "CloudynHost",
  domain: "cloudynhost.com",
  legalName: "CloudynHost",
  tagline: "Cloud hosting built for builders.",
  description:
    "Fast, reliable cloud hosting, VPS and dedicated servers with transparent pricing, secure Stripe checkout and support-focused service — built for developers, startups and growing businesses.",
  email: {
    support: "support@cloudynhost.com",
    sales: "sales@cloudynhost.com",
    billing: "billing@cloudynhost.com",
    abuse: "abuse@cloudynhost.com",
  },
  // Social links. Leave a value as "" to hide that link everywhere.
  // TODO: replace with real data source — your actual profile URLs.
  social: {
    x: "https://x.com/cloudynhost",
    github: "https://github.com/cloudynhost",
    linkedin: "https://www.linkedin.com/company/cloudynhost",
  },
  // Honest, verifiable highlights only — no invented customer counts or reviews.
  stats: {
    uptime: "99.9%",
    regions: "8",
    setup: "Fast",
    support: "24/7",
  },
} as const;

export type Brand = typeof brand;
