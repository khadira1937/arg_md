/**
 * Central brand configuration. Rename / recolor the whole product here.
 * Nothing in the UI hardcodes the brand name — it all reads from this file.
 *
 * Public-facing brand: "ARGANA MEDIA".
 * Legal entity (footer / legal pages / invoices only): "ARGANA MEDIA".
 */
export const brand = {
  name: "ARGANA MEDIA",
  shortName: "ARGANA",
  domain: "arganamedia.co.uk",
  legalName: "ARGANA MEDIA",
  tagline: "Digital media, marketing & web development for growing businesses.",
  description:
    "ARGANA MEDIA helps businesses build, grow and manage their online presence — digital content, marketing, website and app development, design, hosting support and business IT support, delivered by one dependable UK team.",

  // Contact details shown across the site. Placeholders you can update any time.
  // TODO: confirm the live mailbox + phone number before launch.
  email: {
    hello: "hello@arganamedia.co.uk",
    support: "support@arganamedia.co.uk",
    sales: "hello@arganamedia.co.uk",
    billing: "billing@arganamedia.co.uk",
    abuse: "abuse@arganamedia.co.uk",
  },
  phone: "+44 7882 737419",
  phoneHref: "+447882737419",

  // Registered company information (England & Wales).
  company: {
    legalName: "ARGANA MEDIA",
    number: "17296255",
    jurisdiction: "England and Wales",
    registeredOffice: "2nd Floor College House, 17 King Edwards Road, Ruislip, London",
  },

  // Social links. Leave a value as "" to hide that link everywhere.
  // TODO: replace with your real profile URLs.
  social: {
    x: "",
    github: "",
    linkedin: "https://www.linkedin.com/company/argana-media",
  },

  // Honest, verifiable highlights only — no invented client counts or reviews.
  stats: {
    registered: "UK-registered",
    services: "6 core services",
    support: "Dedicated support",
    quotes: "Fixed quotes",
  },
} as const;

export type Brand = typeof brand;
