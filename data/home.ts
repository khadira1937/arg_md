/**
 * Argana Media homepage content — single source of truth for the homepage.
 * Each section (nav, hero, trust, services, workflow, service-intensive,
 * stats) exports its own const so components pull only what they need. The
 * site-wide footer is the shared `components/marketing/footer.tsx` and is no
 * longer authored here.
 */

export const nav = {
  brand: "ARGANA MEDIA",
  links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "What we build", href: "/what-we-build" },
    { label: "Contact", href: "/contact" },
  ],
  portal: { label: "Client Portal", href: "/client-portal" },
  cta: { label: "Book a Call", href: "https://calendly.com/arganamedia" },
} as const;

export const hero = {
  eyebrow: "DIGITAL AGENCY · UK",
  heading: "Websites, brands, and growth — built to be judged on.",
  body: "Argana Media is a boutique digital studio helping UK businesses ship sites that convert, brands that hold up, and content that earns attention. Strategy, design, and engineering under one roof.",
  cta: { label: "BOOK A CALL", href: "https://calendly.com/arganamedia" },
  secondaryCta: { label: "SEE WHAT WE BUILD", href: "/what-we-build" },
  image: {
    src: "https://framerusercontent.com/images/ySowSd1AhLEKVSDhrToFAfbaI.webp?width=2678&height=1494",
    alt: "Argana Media — premium digital workspace",
  },
  cookies: {
    body: "We use cookies to improve your experience and for analytics. Learn more in our",
    policyLabel: "Cookie Policy",
    policyHref: "/cookies",
    manageLabel: "Manage Preferences",
    acceptLabel: "Accept Cookies",
  },
} as const;

export const trust = {
  eyebrow: "Trusted by leading companies worldwide",
  cta: { label: "Discover our impact", href: "/portfolio" },
  cellCount: 6,
  hoverLabel: "Discover",
} as const;

export const services = {
  heading: "Four crafts. One team. No handoffs.",
  body: "Strategy, design, engineering and content live in the same room — so what we ship is consistent, fast, and accountable from first brief to live site.",
  cards: [
    {
      eyebrow: "STUDIO",
      title: "Sites that earn the click.",
      body: "Marketing sites, product pages and bespoke web apps — designed for clarity, built for speed, owned by you.",
      mockup: "agent" as const,
    },
    {
      eyebrow: "GROWTH",
      title: "Traffic that compounds.",
      body: "SEO, content and on-page CRO grounded in evidence, not vanity metrics. We publish what moves the needle and prove it.",
      mockup: "handover" as const,
    },
    {
      eyebrow: "CARE",
      title: "Live sites, looked after.",
      body: "Hosting, monitoring and ongoing improvements. We treat your site like a product, not a deliverable — and stay on call.",
      mockup: "notify" as const,
    },
  ],
} as const;

export const workflow = {
  eyebrow: "HOW WE WORK",
  heading: "From first call to live site.",
  body: "A short, honest process. No discovery deck theatre, no surprise scope creep — every phase has a deliverable you can review.",
  hubLabel: "ARGANA STUDIO",
  nodes: ["DISCOVERY", "STRATEGY", "DESIGN", "BUILD", "LAUNCH", "GROW"] as const,
  contextBox: {
    label: "DISCOVERY",
    body: "We start with a working session — your goals, your audience, the constraints we'll work inside. You leave with a one-page brief, a fixed timeline and a fixed quote before we write a line of code.",
  },
} as const;

export const serviceIntensive = {
  heading: "Who we work with",
  body: "Five sectors we know well. Pick the one closest to yours — the brief, the budget and the build will look different depending on where you sit.",
} as const;

export const stats = {
  eyebrow: "WHAT WE BELIEVE",
  heading: ["Built to ship.", "Built to last."],
  body: "We don't sell hours. We don't sell decks. We sell shipped work that earns its keep.",
  items: [
    {
      number: "01",
      label: "Senior hands only",
      sub: "The people who pitch the work are the people who build it. No juniors learning on your project.",
    },
    {
      number: "02",
      label: "Plain English",
      sub: "We explain SEO, ads, and code in words you can repeat to your team. No jargon firewall.",
    },
    {
      number: "03",
      label: "Honest scope",
      sub: "Fixed-price where we can, transparent rates where we can't. You always know what you're paying for.",
    },
    {
      number: "04",
      label: "Shipped, not finished",
      sub: "Launch is week one, not week last. We stay close after the site goes live.",
    },
  ],
} as const;
