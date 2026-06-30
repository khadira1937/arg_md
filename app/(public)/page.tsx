import type { Metadata } from "next";
import PlanhatInspiredHome from "@/components/marketing/planhat-inspired-home";
import { pageMetadata } from "@/lib/seo";

// Homepage metadata. Uses a literal title (no template suffix) so the browser
// tab reads exactly the brand line. OG image override points at the future
// /og-image.png placeholder — until that asset ships, app/opengraph-image.tsx
// (Next.js convention file) generates the social preview.
// TODO: drop /public/og-image.png (1200x630) and the conventional file can be
// removed if a static asset is preferred.
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Argana Media · Digital agency for growing UK businesses",
    description:
      "Argana Media is a boutique digital studio helping UK businesses ship sites that convert, brands that hold up, and content that earns attention. Strategy, design, and engineering under one roof.",
    path: "/",
    ogImage: "/og-image.png",
  }),
  keywords: [
    "digital agency",
    "web design",
    "SEO",
    "brand identity",
    "UK agency",
    "boutique studio",
  ],
};

export default function HomePage() {
  return <PlanhatInspiredHome />;
}
