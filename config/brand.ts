/**
 * Central brand configuration. Rename / recolor the whole product here.
 * Nothing in the UI hardcodes the brand name — it all reads from this file.
 */
export const brand = {
  name: "HostynCloud",
  shortName: "HostynCloud",
  domain: "hostyncloud.com",
  legalName: "HostynCloud",
  tagline: "Fast web hosting, VPS & cloud servers.",
  description:
    "Launch websites, apps and online stores on NVMe-powered web hosting, VPS and cloud servers — with transparent pricing, free SSL, secure Stripe checkout and real support after payment.",
  email: {
    support: "support@hostyncloud.com",
    sales: "sales@hostyncloud.com",
    billing: "billing@hostyncloud.com",
    abuse: "abuse@hostyncloud.com",
  },
  // Social links. Leave a value as "" to hide that link everywhere.
  // TODO: replace with real data source — your actual profile URLs.
  social: {
    x: "https://x.com/hostyncloud",
    github: "https://github.com/hostyncloud",
    linkedin: "https://www.linkedin.com/company/hostyncloud",
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
