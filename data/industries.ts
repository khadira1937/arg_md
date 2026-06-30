/**
 * Sector tab content for the homepage "Who we work with" band. Each entry
 * supplies a label, hero image (poster), a short headline that appears in
 * the image overlay, and a longer body paragraph that swaps top-right.
 *
 * Images are Unsplash workspace/team photography (free licence). Drop
 * licensed photography into `public/industries/*.jpg` and update `image.src`
 * to the local path when ready — see public/industries/README.md.
 */
export type Industry = {
  id: string;
  label: string;
  headline: string;
  body: string;
  image: { src: string; alt: string };
};

export const industries: readonly Industry[] = [
  {
    id: "professional-services",
    label: "Professional Services",
    headline: "A site that earns trust before the first call.",
    body: "Law firms, accountants, clinics and consultancies — we build sites that signal credibility on first impression and turn researchers into enquiries. Clean copy, fast pages, the right proof in the right places.",
    image: {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80&auto=format&fit=crop",
      alt: "Professional team meeting in a modern office",
    },
  },
  {
    id: "saas-b2b",
    label: "SaaS & B2B Tech",
    headline: "Marketing sites that make the product obvious.",
    body: "Landing pages, pricing, docs and growth pages built for B2B buyers who skim. We take a complex product and make the value land in one screen — then back it up with the depth a serious evaluator needs.",
    image: {
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80&auto=format&fit=crop",
      alt: "Developer working at a screen with code editor open",
    },
  },
  {
    id: "ecommerce",
    label: "E-commerce & DTC",
    headline: "Stores that convert without the bloat.",
    body: "Storefronts, product pages and checkout flows built for speed and conversion. We strip the plugin sprawl, fix the page-speed score, and design product detail pages people actually buy from.",
    image: {
      src: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1920&q=80&auto=format&fit=crop",
      alt: "Curated product flatlay shot from above",
    },
  },
  {
    id: "hospitality-lifestyle",
    label: "Hospitality & Lifestyle",
    headline: "Brands that feel as good as the place itself.",
    body: "Restaurants, hotels, studios and lifestyle brands — sites that match the room. Photography-first design, frictionless bookings, and a brand identity that holds up across menu, signage and Instagram.",
    image: {
      src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80&auto=format&fit=crop",
      alt: "Warm interior of a boutique hospitality space",
    },
  },
  {
    id: "property-trades",
    label: "Property & Trades",
    headline: "Lead-generation sites built to fill the diary.",
    body: "Estate agents, builders, contractors and specialist trades. Clear service pages, real project galleries, and quote forms that route straight to the people who answer the phone — so the calendar stays full.",
    image: {
      src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80&auto=format&fit=crop",
      alt: "Construction site at dusk with cranes against the skyline",
    },
  },
] as const;
