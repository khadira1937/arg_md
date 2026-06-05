import { brand } from "./brand";

export const siteConfig = {
  name: brand.name,
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ogImage: "/og.png",
  description: brand.description,
  keywords: [
    "cloud hosting",
    "vps hosting",
    "dedicated servers",
    "gpu servers",
    "wordpress hosting",
    "woocommerce hosting",
    "managed cloud",
    "kubernetes hosting",
    "ddos protection",
    "domain registration",
  ],
  // Currency defaults for display. Pricing values themselves come from the DB.
  currency: "USD",
  locale: "en-US",
} as const;

export type SiteConfig = typeof siteConfig;
