import { brand } from "./brand";

export const siteConfig = {
  name: brand.name,
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ogImage: "/og.png",
  description: brand.description,
  keywords: [
    "digital marketing agency",
    "website development",
    "web design",
    "content marketing",
    "SEO",
    "social media marketing",
    "brand design",
    "app development",
    "website hosting and care",
    "business IT support",
  ],
  // Currency defaults for display.
  currency: "GBP",
  locale: "en-GB",
} as const;

export type SiteConfig = typeof siteConfig;
