import { priceRows, featuresFromSpecs, type SeedProduct } from "./seed-data";

/**
 * ARGANA MEDIA service catalog.
 *
 * The six core service lines are "inquiry only" — they show package previews and
 * a "Get a quote" call to action instead of a public checkout. The public
 * marketing pages for each category are rendered by dedicated static routes
 * (e.g. /website-app); these DB records power the admin catalog, the client
 * portal and structured data. The cart + Stripe checkout remain available for
 * any fixed-price products you add later.
 */

const agencyFaq = (name: string) => [
  {
    question: `How does a ${name} project work?`,
    answer:
      "It starts with a free discovery call. We learn about your business and goals, then send a clear proposal with scope, timeline and a fixed quote. Once approved, we get to work and keep you updated throughout.",
  },
  {
    question: "How much will it cost?",
    answer:
      "Every business is different, so we tailor scope to you. The packages shown are starting points — your final, fixed quote is agreed before any work begins, with no surprises.",
  },
  {
    question: "Do you support us after delivery?",
    answer:
      "Yes. We're here for the long term with care plans, ongoing marketing and friendly support, so your online presence keeps improving over time.",
  },
];

/** Build a quote-style "package" plan (price is hidden on inquiry products). */
function pkg(
  name: string,
  slug: string,
  specs: Record<string, string>,
  extras: { label: string; included?: boolean; highlight?: boolean }[] = [],
  opts: { popular?: boolean; recommended?: boolean; supportLevel?: string } = {},
) {
  return {
    name,
    slug,
    popular: opts.popular,
    recommended: opts.recommended,
    supportLevel: opts.supportLevel ?? "Included",
    specs,
    features: featuresFromSpecs(specs, extras),
    prices: priceRows(1, 1, "managed"),
    addons: [] as string[],
  };
}

export const catalog: SeedProduct[] = [
  // ----------------------------------------------------------- Website & App
  {
    name: "Website & App",
    slug: "website-app",
    type: "BUILDER",
    categorySlug: "website-app",
    featured: true,
    inquiryOnly: true,
    sortOrder: 1,
    shortDescription: "Websites, online stores and web apps that turn visitors into customers.",
    description:
      "We design and build fast, modern websites, e-commerce stores and custom web apps — then keep them running smoothly with ongoing care.",
    heroHeadline: "Websites & apps built to win you business",
    heroSubheadline: "From a simple brochure site to a full online store or custom web app, designed around your goals.",
    seoTitle: "Website & App Development — ARGANA MEDIA",
    seoDescription: "Custom websites, e-commerce stores and web apps for growing businesses. Get a quote from ARGANA MEDIA.",
    faq: agencyFaq("website"),
    plans: [
      pkg("Starter Website", "starter-website", { pages: "Up to 5 pages", design: "Mobile-friendly", seo: "Basic SEO setup", forms: "Contact form" }, [{ label: "Connected to your domain" }], { supportLevel: "Project" }),
      pkg("Business Website", "business-website", { pages: "Up to ~12 pages", design: "Custom design & copy", seo: "On-page SEO", care: "Care plan ready" }, [{ label: "Built to convert", highlight: true }], { popular: true, supportLevel: "Project" }),
      pkg("E-commerce / Web App", "ecommerce-web-app", { build: "Store or web app", payments: "Payments & integrations", training: "Training & handover" }, [{ label: "Ongoing support" }], { recommended: true, supportLevel: "Project" }),
    ],
  },

  // -------------------------------------------------------- Digital Marketing
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    type: "AGENCY",
    categorySlug: "marketing",
    featured: true,
    inquiryOnly: true,
    sortOrder: 2,
    shortDescription: "Get found on Google and social media and turn attention into enquiries.",
    description:
      "SEO, content, social media and paid advertising — a practical marketing plan focused on visibility, enquiries and growth.",
    heroHeadline: "Get found, get clicks, get customers",
    heroSubheadline: "A practical marketing plan built around your goals and budget, focused on real results.",
    seoTitle: "Digital Marketing — SEO, Social & Ads — ARGANA MEDIA",
    seoDescription: "SEO, content, social media and paid ads for growing businesses. Get a quote from ARGANA MEDIA.",
    faq: agencyFaq("marketing"),
    plans: [
      pkg("Marketing Essentials", "marketing-essentials", { seo: "SEO foundations", gbp: "Google Business Profile", content: "Monthly content", reporting: "Simple reporting" }, [], { supportLevel: "Monthly" }),
      pkg("Growth", "marketing-growth", { seo: "SEO + content", social: "Social media", email: "Email campaigns", strategy: "Monthly strategy call" }, [{ label: "Dedicated strategist", highlight: true }], { popular: true, supportLevel: "Monthly" }),
      pkg("Performance", "marketing-performance", { channels: "SEO, content & social", ads: "Google & Meta ads", cro: "Landing pages & CRO", reporting: "Detailed reporting" }, [], { recommended: true, supportLevel: "Monthly" }),
    ],
  },

  // ------------------------------------------------------------------- Design
  {
    name: "Design",
    slug: "design",
    type: "AGENCY",
    categorySlug: "design",
    featured: true,
    inquiryOnly: true,
    sortOrder: 3,
    shortDescription: "Brand identity, logos and visuals that make you look established.",
    description:
      "Cohesive brand identities, logos, web and marketing design that build instant trust everywhere your customers see you.",
    heroHeadline: "Design that makes you look the part",
    heroSubheadline: "Brand identity, websites and marketing visuals that earn trust before a word is read.",
    seoTitle: "Brand & Web Design — ARGANA MEDIA",
    seoDescription: "Brand identity, logo design, UI/UX and marketing graphics. Get a quote from ARGANA MEDIA.",
    faq: agencyFaq("design"),
    plans: [
      pkg("Logo & Essentials", "logo-essentials", { logo: "Logo design", palette: "Colours & fonts", files: "Core brand files" }, [], { supportLevel: "Project" }),
      pkg("Brand Identity", "brand-identity", { logo: "Logo suite", system: "Full visual system", guidelines: "Brand guidelines" }, [{ label: "Templates included", highlight: true }], { popular: true, supportLevel: "Project" }),
      pkg("Brand + Web Design", "brand-web-design", { brand: "Full brand identity", web: "Website UI/UX design", collateral: "Marketing graphics" }, [], { recommended: true, supportLevel: "Project" }),
    ],
  },

  // ------------------------------------------------- Digital Media & Content
  {
    name: "Digital Media & Content",
    slug: "digital-media-content",
    type: "AGENCY",
    categorySlug: "content",
    featured: true,
    inquiryOnly: true,
    sortOrder: 4,
    shortDescription: "Copy, blogs, photography and video that tell your story.",
    description:
      "On-brand copywriting, articles, social content and original photo and video that keep your audience engaged and support your SEO.",
    heroHeadline: "Words and media that tell your story",
    heroSubheadline: "Copy, blogs, photography and video — written and produced for real people.",
    seoTitle: "Content & Digital Media — ARGANA MEDIA",
    seoDescription: "Website copy, blogs, SEO content, social media and video for growing businesses. Get a quote.",
    faq: agencyFaq("content"),
    plans: [
      pkg("Website Copy", "website-copy", { copy: "Website copywriting", tone: "Brand voice", seo: "Naturally optimised" }, [], { supportLevel: "Project" }),
      pkg("Content Plan", "content-plan", { blog: "Monthly articles", social: "Social content", strategy: "Content calendar" }, [{ label: "Consistent publishing", highlight: true }], { popular: true, supportLevel: "Monthly" }),
      pkg("Content & Media", "content-media", { content: "Copy & articles", media: "Photo & video", strategy: "Full content strategy" }, [], { recommended: true, supportLevel: "Monthly" }),
    ],
  },

  // ------------------------------------------------ Hosting & Website Care
  {
    name: "Hosting & Website Care",
    slug: "hosting-website-care",
    type: "MANAGED_CLOUD",
    categorySlug: "care",
    featured: true,
    inquiryOnly: true,
    sortOrder: 5,
    shortDescription: "We keep your website online, secure, backed up and up to date.",
    description:
      "Managed hosting support and ongoing website care — updates, backups, security, monitoring, plus domain, email and SSL set-up handled for you.",
    heroHeadline: "Your website, online and looked after",
    heroSubheadline: "Managed hosting support and care plans that take the technical worry off your plate.",
    seoTitle: "Hosting Support & Website Care — ARGANA MEDIA",
    seoDescription: "Managed hosting support, website care plans, domains, email and SSL. Get a quote from ARGANA MEDIA.",
    faq: agencyFaq("website care"),
    plans: [
      pkg("Care Lite", "care-lite", { hosting: "Hosting support", updates: "Software updates", backups: "Weekly backups", monitoring: "Uptime monitoring" }, [], { supportLevel: "Monthly" }),
      pkg("Care Plus", "care-plus", { hosting: "Hosting support", backups: "Daily backups", security: "Security & SSL", edits: "Small edits included" }, [{ label: "Most popular choice", highlight: true }], { popular: true, supportLevel: "Monthly" }),
      pkg("Care Pro", "care-pro", { hosting: "Priority support", performance: "Performance tuning", backups: "Daily backups", checkin: "Monthly check-in" }, [], { recommended: true, supportLevel: "Monthly" }),
    ],
  },

  // -------------------------------------------------- Business IT Support
  {
    name: "Business IT Support",
    slug: "business-it-support",
    type: "DEVOPS",
    categorySlug: "it-support",
    featured: true,
    inquiryOnly: true,
    sortOrder: 6,
    shortDescription: "Friendly, reliable tech support for small businesses.",
    description:
      "Practical IT support — email and Microsoft 365, device and account setup, everyday security, backups and plain-English advice.",
    heroHeadline: "Friendly IT support for small businesses",
    heroSubheadline: "From email and devices to security and backups, we keep your day-to-day working.",
    seoTitle: "Business IT Support — ARGANA MEDIA",
    seoDescription: "IT helpdesk, Microsoft 365, device setup, security and backups for small businesses. Get a quote.",
    faq: agencyFaq("IT support"),
    plans: [
      pkg("Pay As You Go", "it-payg", { help: "Helpdesk support", setup: "Setup & fixes", billing: "Billed per session" }, [], { supportLevel: "As needed" }),
      pkg("IT Care", "it-care", { help: "Ongoing helpdesk", email: "Email & Microsoft 365", security: "Security essentials" }, [{ label: "Priority response", highlight: true }], { popular: true, supportLevel: "Monthly" }),
      pkg("IT Care Plus", "it-care-plus", { help: "Priority helpdesk", security: "Security & backups", consulting: "Tech consulting" }, [], { recommended: true, supportLevel: "Monthly" }),
    ],
  },
];
