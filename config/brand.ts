/**
 * Central brand configuration. Rename / recolor the whole product here.
 * Nothing in the UI hardcodes the brand name — it all reads from this file.
 */
export const brand = {
  name: "Aethon Cloud",
  shortName: "Aethon",
  domain: "aethon.cloud",
  legalName: "Aethon Cloud, Inc.",
  tagline: "Infrastructure that lifts your business.",
  description:
    "Premium cloud hosting, VPS, dedicated servers, GPU compute and managed infrastructure — engineered for speed, reliability and scale.",
  email: {
    support: "support@aethon.cloud",
    sales: "sales@aethon.cloud",
    billing: "billing@aethon.cloud",
    abuse: "abuse@aethon.cloud",
  },
  social: {
    twitter: "https://twitter.com/aethoncloud",
    github: "https://github.com/aethoncloud",
    linkedin: "https://www.linkedin.com/company/aethoncloud",
  },
  // Marketing trust stats (display-only).
  stats: {
    uptime: "99.99%",
    customers: "40,000+",
    dataCenters: "8",
    support: "24/7/365",
  },
} as const;

export type Brand = typeof brand;
