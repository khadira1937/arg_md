import {
  Globe, Megaphone, Palette, PenLine, ServerCog, LifeBuoy,
  Compass, PencilRuler, Rocket, LineChart, ShieldCheck, HeartHandshake,
  Users, Clock, BadgeCheck, MessagesSquare,
  type LucideIcon,
} from "lucide-react";

/**
 * Marketing presentation data for the ARGANA MEDIA homepage and service pages.
 * Editorial content only — no live pricing. "From" figures are starting points
 * for a quote, never a checkout. Real scope and price are agreed per project.
 */

/** The six core service lines shown on the homepage + services hub. */
export type ServiceCard = {
  icon: LucideIcon;
  title: string;
  href: string;
  blurb: string;
  points: string[];
};

export const SERVICES: ServiceCard[] = [
  {
    icon: Globe,
    title: "Website & App",
    href: "/website-app",
    blurb: "Fast, modern websites, online stores and web apps designed to turn visitors into customers.",
    points: ["Website development", "E-commerce stores", "Web apps & portals"],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    href: "/digital-marketing",
    blurb: "Get found on Google and social media, and turn that attention into real enquiries and sales.",
    points: ["SEO & local SEO", "Social media & content", "Google & Meta ads"],
  },
  {
    icon: Palette,
    title: "Design",
    href: "/design",
    blurb: "Brand identity, logos and on-brand visuals that make your business look established and trustworthy.",
    points: ["Brand identity & logos", "Web & UI/UX design", "Marketing graphics"],
  },
  {
    icon: PenLine,
    title: "Digital Media & Content",
    href: "/digital-media-content",
    blurb: "Copy, blogs, photography and video that tell your story clearly and keep people engaged.",
    points: ["Website copywriting", "Blogs & SEO content", "Photo & video content"],
  },
  {
    icon: ServerCog,
    title: "Hosting & Website Care",
    href: "/hosting-website-care",
    blurb: "We keep your website online, secure, backed up and up to date — so you never have to worry about it.",
    points: ["Managed hosting support", "Care & maintenance plans", "Domains, email & SSL"],
  },
  {
    icon: LifeBuoy,
    title: "Business IT Support",
    href: "/business-it-support",
    blurb: "Friendly, dependable tech support for small businesses — from email and devices to everyday security.",
    points: ["IT helpdesk support", "Email & Microsoft 365", "Security & backups"],
  },
];

/** How we work — a clear, reassuring process. */
export const PROCESS_STEPS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Compass, title: "Discover", body: "We start with a free call to understand your business, goals and where you want to be." },
  { icon: PencilRuler, title: "Plan", body: "You get a clear proposal with scope, timeline and a fixed quote — no jargon, no surprises." },
  { icon: Rocket, title: "Build", body: "Our team designs, writes, builds and sets everything up, keeping you in the loop throughout." },
  { icon: LineChart, title: "Grow", body: "After launch we support, maintain and market — helping your online presence improve over time." },
];

/** Why businesses choose ARGANA MEDIA — honest, defensible reasons. */
export const WHY_US: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Users, title: "One team, everything covered", body: "Marketing, content, design, websites and support under one roof — no juggling multiple freelancers." },
  { icon: BadgeCheck, title: "Clear, fixed quotes", body: "You always know what you're paying and what you're getting before any work begins." },
  { icon: HeartHandshake, title: "We stay with you", body: "We don't disappear after launch. Care plans and support keep your website healthy long term." },
  { icon: ShieldCheck, title: "A registered UK company", body: "ARGANA MEDIA is a real, registered UK business you can rely on for the long term." },
  { icon: Clock, title: "Responsive & reliable", body: "Friendly people who reply, keep their word and hit the timelines we agree together." },
  { icon: MessagesSquare, title: "Plain-English advice", body: "We explain the why behind every recommendation so you can make confident decisions." },
];

/** Hosting & website-care highlights (paired with the domain search). */
export const CARE_FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: ServerCog, title: "Managed hosting support", body: "We handle the technical side of getting your site online and keeping it fast and stable." },
  { icon: ShieldCheck, title: "Security & SSL", body: "Free SSL, sensible security settings and monitoring so every page stays protected." },
  { icon: Clock, title: "Updates & backups", body: "Regular updates and off-site backups mean issues are prevented — and quickly recovered." },
  { icon: LifeBuoy, title: "A real person to call", body: "When something needs changing or fixing, you have a team who knows your site." },
];

/**
 * Service package previews — three tabs, three packages each. These are starting
 * points for a conversation, shown as "from" prices with a quote CTA (no public
 * checkout). Replace the figures with your own commercial numbers any time.
 */
export type PreviewPackage = {
  name: string;
  price: string;
  period: string;
  bestFor: string;
  specs: string[];
  href: string;
  popular?: boolean;
};

export const SERVICE_PACKAGES: { key: string; label: string; packages: PreviewPackage[] }[] = [
  {
    key: "websites",
    label: "Websites",
    packages: [
      {
        name: "Starter Website", price: "from £750", period: "/project", bestFor: "New & small businesses", href: "/website-app",
        specs: ["Up to 5 pages", "Mobile-friendly design", "Contact form & basic SEO", "Connected to your domain"],
      },
      {
        name: "Business Website", price: "from £1,800", period: "/project", popular: true, bestFor: "Growing businesses", href: "/website-app",
        specs: ["Custom design & copy", "Up to ~12 pages", "On-page SEO setup", "Care plan ready"],
      },
      {
        name: "E-commerce / Web App", price: "from £3,500", period: "/project", bestFor: "Stores & custom tools", href: "/website-app",
        specs: ["Online store or web app", "Payments & integrations", "Training & handover", "Ongoing support"],
      },
    ],
  },
  {
    key: "marketing",
    label: "Marketing",
    packages: [
      {
        name: "Marketing Essentials", price: "from £450", period: "/mo", bestFor: "Building momentum", href: "/digital-marketing",
        specs: ["SEO foundations", "Google Business Profile", "Monthly content", "Simple reporting"],
      },
      {
        name: "Growth", price: "from £900", period: "/mo", popular: true, bestFor: "Ready to scale", href: "/digital-marketing",
        specs: ["SEO + content marketing", "Social media management", "Email campaigns", "Monthly strategy call"],
      },
      {
        name: "Performance", price: "from £1,800", period: "/mo", bestFor: "Maximising results", href: "/digital-marketing",
        specs: ["SEO, content & social", "Google & Meta ads", "Landing pages & CRO", "Detailed reporting"],
      },
    ],
  },
  {
    key: "care",
    label: "Care & Hosting",
    packages: [
      {
        name: "Care Lite", price: "from £19", period: "/mo", bestFor: "Simple sites", href: "/hosting-website-care",
        specs: ["Hosting support", "Software updates", "Weekly backups", "Uptime monitoring"],
      },
      {
        name: "Care Plus", price: "from £49", period: "/mo", popular: true, bestFor: "Most businesses", href: "/hosting-website-care",
        specs: ["Everything in Lite", "Daily backups", "Security & SSL care", "Small edits included"],
      },
      {
        name: "Care Pro", price: "from £99", period: "/mo", bestFor: "Busy & critical sites", href: "/hosting-website-care",
        specs: ["Everything in Plus", "Priority support", "Performance tuning", "Monthly check-in"],
      },
    ],
  },
];
