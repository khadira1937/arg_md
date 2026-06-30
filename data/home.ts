/**
 * Argana Media homepage content — single source of truth for the planhat-
 * inspired homepage. Each section (nav, hero, trust, services, workflow,
 * service-intensive, stats) exports its own const so components pull only
 * what they need. The site-wide footer is the shared `components/marketing/
 * footer.tsx` and is no longer authored here.
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
  eyebrow: "The agentic customer platform",
  heading: "Deploy AI with confidence across the customer lifecycle",
  body: "Argana Media provides B2B enterprises with forward-deployed software and services that deliver lifelong revenue growth.",
  cta: { label: "Book a Call", href: "https://calendly.com/arganamedia" },
  secondaryCta: { label: "What we build", href: "/what-we-build" },
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
  heading: "Drive real-world outcomes by automating commercial processes",
  body: "A comprehensive platform that empowers artificial and human intelligence to collaborate seamlessly across the entire marketing funnel.",
  cards: [
    {
      title: "Assemble your GTM under one roof",
      body: "Arm your go-to-market agents, teams and tools with rich context that turns post-sale truth into pre-sales intelligence.",
      mockup: "agent" as const,
    },
    {
      title: "Deploy agents with confidence",
      body: "Delegate processes to governed agents which execute with greater speed and precision than humanly possible.",
      mockup: "handover" as const,
    },
    {
      title: "Stay in the loop",
      body: "Give your team the capability to leverage, supervise and enhance organic search outputs at scale.",
      mockup: "notify" as const,
    },
  ],
} as const;

export const workflow = {
  eyebrow: "Platform",
  heading: "Deploy with confidence",
  body: "Argana Media is architected to equip agents and humans with everything they need to execute with clarity and control.",
  hubLabel: "Argana engine",
  nodes: ["Context", "Training", "Input", "Collaboration", "Agents", "Execution"] as const,
  contextBox: {
    label: "Context",
    body: "Argana constructs a comprehensive living model of your customers and commercial operations spanning traditional CRM data, rich time series data, SOPs and external telemetry.",
  },
} as const;

export const serviceIntensive = {
  heading: "Built for service-intensive teams",
  body: "Argana is a system of action that empowers you to define customer outcomes, run cross-functional workflows and report on real, measurable ROI. Pick the industry closest to yours below.",
  reviews: [
    {
      quote: "A perfect fit for our company and how we want to support our clients",
      cite: "Casey, VP Strategic Initiatives",
    },
    {
      quote: "Amazing CSP for agile teams",
      cite: "Melanie, Global Customer Success Director",
    },
    {
      quote: "Unlocked levels of data visibility and automation I didn't think were possible in our environment.",
      cite: "Jarret, Senior Director of Customer Success Automation",
    },
    {
      quote: "Success for your customer success team",
      cite: "Brenda, Customer Success",
    },
  ],
} as const;

export const stats = {
  eyebrow: "Services",
  heading: ["Don't buy hypotheticals.", "Buy outcomes."],
  body: "Argana Media dispatches forward-deployed teams that work shoulder-to-shoulder with you to deliver real-world outcomes.",
  items: [
    { value: "34%", label: "More customers per CSM" },
    { value: "+300", label: "Hours saved annually per person" },
    { value: "900%", label: "Seat expansion" },
    { value: "21%", label: "Less churn" },
  ],
} as const;

