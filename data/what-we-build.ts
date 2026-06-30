// TODO: Replace placeholder Unsplash URLs with custom mini-mockup illustrations once design assets are commissioned. Target visual treatment: abstract UI mockups matching homepage AI Signals / Project live card aesthetic.

/**
 * What We Build — content data for /what-we-build.
 *
 * Per-service imagery is centralised here so it can be swapped without touching
 * the page component.
 */

import {
  Building2, ShoppingCart, CalendarClock, Megaphone, Boxes, BookOpenText,
  Feather, Accessibility, Gauge, Expand, Wrench, Target, MousePointerClick, Search, Smartphone,
  Compass, SearchCheck, PenTool, Code2, ShieldCheck, Rocket, LifeBuoy,
  MessagesSquare, Layers, Users, Landmark, Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { brand } from "@/config/brand";

const COMPANIES_HOUSE = `https://find-and-update.company-information.service.gov.uk/company/${brand.company.number}`;

export interface Solution {
  icon: LucideIcon;
  title: string;
  img: string;
  alt: string;
  desc: string;
  features: string[];
  tech: string[];
}

export const SOLUTIONS: Solution[] = [
  {
    icon: Building2,
    title: "Corporate Websites",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop",
    alt: "A modern corporate workspace seen through a glass partition",
    desc: "The website most established businesses actually need: a clear structure, fast pages, and content your team can keep current without calling a developer. We focus on the things that move the needle — credibility, findability and a confident first impression.",
    features: ["Clear information architecture", "A CMS your team can edit", "Accessible, standards-based markup", "On-page technical SEO", "Multilingual-ready when needed"],
    tech: ["Next.js", "TypeScript", "WordPress", "Tailwind CSS", "Vercel"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    img: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1600&q=80&auto=format&fit=crop",
    alt: "Curated product flatlay with packaging on a neutral surface",
    desc: "Online stores built to sell and to scale — clean product journeys, dependable checkout, and the integrations your operations rely on. Whether you're on an established platform or need something bespoke, we build for conversion and for the people running the shop day to day.",
    features: ["Optimised product & checkout flows", "Payments, tax & shipping integrations", "Inventory and order workflows", "Performance at catalogue scale", "Analytics & conversion tracking"],
    tech: ["Shopify", "Next.js", "Stripe", "PostgreSQL", "Node.js"],
  },
  {
    icon: CalendarClock,
    title: "Booking Platforms",
    img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1600&q=80&auto=format&fit=crop",
    alt: "An open planner and pen on a desk, capturing scheduling and bookings",
    desc: "Appointment and reservation systems that respect both sides of the calendar — your availability and your customer's time. We build scheduling that prevents double-bookings, sends the right reminders, and fits the way your business actually operates.",
    features: ["Real-time availability", "Automated reminders & confirmations", "Calendar and payment integrations", "Staff and resource management", "Timezone-aware logic"],
    tech: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Stripe"],
  },
  {
    icon: Megaphone,
    title: "Marketing Websites",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&auto=format&fit=crop",
    alt: "Analytics dashboard glowing on a laptop screen in a dim workspace",
    desc: "Campaign and product sites designed to convert: a sharp narrative, fast load times, and measurement built in from day one. Made to launch quickly and to iterate on as you learn what genuinely works for your audience.",
    features: ["Conversion-focused layouts", "Built for A/B testing", "Fast LCP and Core Web Vitals", "A CMS for rapid updates", "Analytics & event tracking included"],
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel", "Cloudflare"],
  },
  {
    icon: Boxes,
    title: "Custom Web Applications",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80&auto=format&fit=crop",
    alt: "Code editor open on a dark monitor with a typed function in view",
    desc: "When off-the-shelf won't do, we build software around your process — dashboards, client portals, internal tools and customer-facing apps. Typed end to end, tested, and documented so it stays maintainable long after launch.",
    features: ["Authentication, roles & permissions", "APIs and third-party integrations", "Real-time data and dashboards", "Type-safe, tested codebase", "Architected to scale"],
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Rust"],
  },
  {
    icon: BookOpenText,
    title: "Developer Documentation",
    img: "https://images.unsplash.com/photo-1488272690691-50c93e64eee9?w=1600&q=80&auto=format&fit=crop",
    alt: "An open book with crisp typography, editorial photography style for technical documentation",
    desc: "Docs that developers actually want to read — clear structure, working examples, and search that finds the right page. We treat documentation as a product: versioned, maintainable, and part of how good software gets adopted.",
    features: ["Structured navigation & search", "Versioned content", "Code samples & SDK references", "Fast, accessible reading experience", "Easy for the team to keep current"],
    tech: ["Next.js", "TypeScript", "MDX", "Rust", "Solana"],
  },
];

export const PRINCIPLES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Feather, title: "Simplicity", body: "Complexity is easy; clarity is hard. We remove whatever doesn't earn its place, so visitors — and your team — always know what to do next." },
  { icon: Accessibility, title: "Accessibility", body: "An accessible site reaches more people and reduces legal risk. We build to WCAG principles by default, not as an afterthought." },
  { icon: Gauge, title: "Performance", body: "Speed affects both ranking and revenue. We set a performance budget early and defend it all the way to launch." },
  { icon: Expand, title: "Scalability", body: "We architect so that more traffic, products or features doesn't mean starting again from scratch." },
  { icon: Wrench, title: "Maintainability", body: "Typed, tested and documented code means a lower cost of change — and no lock-in to us." },
  { icon: Target, title: "Conversion", body: "A beautiful site that doesn't convert is decoration. We design around the actions that matter to your business." },
  { icon: MousePointerClick, title: "User Experience", body: "Every interaction is considered from the visitor's point of view, not the internal org chart's." },
  { icon: Search, title: "Technical SEO", body: "Clean markup, structured data and fast pages, so search engines can find, understand and trust your content." },
  { icon: Smartphone, title: "Mobile-first", body: "Most of your visitors arrive on a phone. We design for that screen first, then scale up to desktop." },
];

export const PROCESS: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Compass, title: "Discovery", body: "We learn your goals, audience and constraints, and agree what success looks like before any design begins." },
  { icon: SearchCheck, title: "Research", body: "Competitive and technical research grounds the work in evidence — what your market expects and where the gaps are." },
  { icon: PenTool, title: "Design", body: "Wireframes first, then polished UI, reviewed with you at each step so there are no surprises later." },
  { icon: Code2, title: "Development", body: "Clean, typed, version-controlled code, built in reviewable increments you can see progress on." },
  { icon: ShieldCheck, title: "Quality Assurance", body: "Cross-device, accessibility and performance testing before anything reaches your customers." },
  { icon: Rocket, title: "Launch", body: "A planned, low-risk release — redirects, analytics and monitoring in place from minute one." },
  { icon: LifeBuoy, title: "Long-term Support", body: "We stay on for updates, improvements and care, so your site keeps getting better after launch." },
];

export const REASONS: { icon: LucideIcon; title: string; body: string; href?: string }[] = [
  { icon: MessagesSquare, title: "Transparent Communication", body: "Clear scope, fixed quotes and regular updates. You always know what's happening and what it costs." },
  { icon: Gauge, title: "Performance First", body: "We treat speed and Core Web Vitals as requirements, not nice-to-haves — because they affect ranking and revenue." },
  { icon: Layers, title: "Modern Technologies", body: "We build on current, well-supported tools, so your project stays secure and maintainable for years." },
  { icon: Accessibility, title: "Accessible Design", body: "We follow WCAG principles, so your site works for more people and stays on the right side of accessibility law." },
  { icon: Lock, title: "Security Focused", body: "Sensible defaults — secure headers, dependency hygiene, no secrets in the browser. We build with risk in mind." },
  { icon: LifeBuoy, title: "Long-term Support", body: "We don't disappear at launch. Care plans keep your site fast, secure and improving over time." },
  { icon: Users, title: "Collaborative Process", body: "You're involved at each milestone. We design and build with you, not behind a closed door." },
  { icon: Landmark, title: "UK Registered Company", body: `A registered UK company (No. ${brand.company.number}) — a real, accountable business you can verify on Companies House.`, href: COMPANIES_HOUSE },
];

export const FAQS = [
  { question: "How long does a typical project take?", answer: "Most marketing and corporate sites take 3–6 weeks; e-commerce, booking systems and custom applications usually run 6–12 weeks depending on scope. We agree a realistic timeline during discovery and keep you updated against it." },
  { question: "Do you redesign existing websites?", answer: "Yes. A large part of our work is rebuilding sites that have outgrown their current setup — improving speed, structure and conversion while protecting your existing SEO and content." },
  { question: "Can you modernise legacy systems?", answer: "Often, yes. We assess what's worth keeping, plan a safe migration path, and modernise incrementally rather than forcing a risky big-bang rewrite." },
  { question: "Do you provide ongoing support?", answer: "Yes. We offer care plans covering updates, backups, security and small improvements, so your site stays healthy long after launch. Support is optional and never locked-in." },
  { question: "Can you build custom functionality?", answer: "Yes. When a plugin or template won't do, we build bespoke features — dashboards, integrations, booking logic, internal tools — on a typed, tested codebase." },
  { question: "Do you optimise for SEO and performance?", answer: "Always. Clean semantic markup, structured data and Core Web Vitals are part of the build, not an upsell. We hand over a site that search engines can read and rank." },
  { question: "What technologies do you recommend?", answer: "It depends on the job. We lean on Next.js, TypeScript and PostgreSQL for custom work, and WordPress or Shopify where a proven platform is the right fit. We recommend what suits your goals and team — not what's trendy." },
  { question: "How do projects usually begin?", answer: "With a short discovery call. We learn your goals and constraints, then send a clear proposal with scope, timeline and a fixed quote before any work starts." },
];
