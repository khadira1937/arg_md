import type { LucideIcon } from "lucide-react";
import {
  PenTool, Building2, Boxes, Search, Gauge, Accessibility, ShieldCheck,
  Code2, Server, ShoppingCart, BookOpenText, Lightbulb,
} from "lucide-react";

/**
 * Knowledge Hub & Case Studies — placeholder content model (Phase 2 Part 2, UI only).
 * Every title/excerpt/summary is a clearly-labelled placeholder; real content is
 * inserted later. Metadata fields (category, author byline, dates, reading time,
 * service type, technologies) are structural scaffolding, not invented claims.
 */

export const KH_TEAL = "#35E0E8";
export const KH_GOLD = "#F3CD86";
export const KH_SKY = "#7CC6F0";
export const KH_GREEN = "#34D399";
export const KH_VIOLET = "#B08CFF";
const ACCENTS = [KH_TEAL, KH_GOLD, KH_SKY, KH_GREEN, KH_VIOLET];

export type KhCategory = { slug: string; name: string; blurb: string; Icon: LucideIcon; accent: string };
export type KhArticle = { slug: string; title: string; excerpt: string; category: string; author: string; date: string; readingTime: string };
export type KhGuide = { slug: string; title: string; readingTime: string; parts: string };
export type KhCaseStudy = { slug: string; title: string; summary: string; industry: string; service: string; technologies: string[]; duration: string };

const CATEGORY_DEFS: [string, string, LucideIcon][] = [
  ["website-design", "Website Design", PenTool],
  ["corporate-websites", "Corporate Websites", Building2],
  ["web-applications", "Web Applications", Boxes],
  ["technical-seo", "Technical SEO", Search],
  ["performance", "Performance", Gauge],
  ["accessibility", "Accessibility", Accessibility],
  ["security", "Security", ShieldCheck],
  ["nextjs", "Next.js", Code2],
  ["laravel", "Laravel", Server],
  ["ecommerce", "E-commerce", ShoppingCart],
  ["developer-documentation", "Developer Documentation", BookOpenText],
  ["business-strategy", "Business Strategy", Lightbulb],
];

export const KH_CATEGORIES: KhCategory[] = CATEGORY_DEFS.map(([slug, name, Icon], i) => ({
  slug,
  name,
  Icon,
  accent: ACCENTS[i % ACCENTS.length],
  blurb: "[Category description placeholder — a short, human-written introduction to this topic will go here.]",
}));

export const ARTICLE_TITLE_PLACEHOLDER = "[Article title placeholder]";
export const ARTICLE_EXCERPT_PLACEHOLDER =
  "[Article summary placeholder — a one or two line preview of the article will appear here once the real content is written.]";

const DATES = ["14 Jan 2026", "28 Jan 2026", "09 Feb 2026", "23 Feb 2026", "08 Mar 2026", "21 Mar 2026", "06 Apr 2026", "19 Apr 2026", "04 May 2026"];
const READ_TIMES = ["5 min read", "7 min read", "9 min read", "6 min read", "11 min read", "8 min read"];

export const KH_ARTICLES: KhArticle[] = Array.from({ length: 18 }, (_, i) => ({
  slug: `placeholder-article-${String(i + 1).padStart(2, "0")}`,
  title: ARTICLE_TITLE_PLACEHOLDER,
  excerpt: ARTICLE_EXCERPT_PLACEHOLDER,
  category: KH_CATEGORIES[i % KH_CATEGORIES.length].slug,
  author: "ARGANA MEDIA",
  date: DATES[i % DATES.length],
  readingTime: READ_TIMES[i % READ_TIMES.length],
}));

export const KH_FEATURED: KhArticle = {
  slug: "placeholder-featured-article",
  title: "[Featured article title placeholder]",
  excerpt: "[Featured article summary placeholder — two or three lines introducing the flagship piece of the Knowledge Hub will sit here.]",
  category: "business-strategy",
  author: "ARGANA MEDIA",
  date: "12 May 2026",
  readingTime: "12 min read",
};

export const KH_GUIDES: KhGuide[] = Array.from({ length: 6 }, (_, i) => ({
  slug: `placeholder-guide-${String(i + 1).padStart(2, "0")}`,
  title: "[Guide title placeholder]",
  readingTime: ["20 min read", "35 min read", "15 min read"][i % 3],
  parts: `${4 + i} parts`,
}));

const CS_SERVICES = ["Corporate Website", "E-commerce", "Web Application", "Booking Platform", "Marketing Website", "Developer Documentation"];
const CS_TECH: string[][] = [
  ["Next.js", "TypeScript", "Tailwind CSS"],
  ["Shopify", "Stripe", "Node.js"],
  ["Next.js", "PostgreSQL", "Prisma"],
  ["Laravel", "MySQL", "Vue"],
  ["Next.js", "MDX", "Vercel"],
  ["Rust", "Solana", "Next.js"],
];

export const KH_CASE_STUDIES: KhCaseStudy[] = Array.from({ length: 12 }, (_, i) => ({
  slug: `placeholder-case-study-${String(i + 1).padStart(2, "0")}`,
  title: "[Case study title placeholder]",
  summary: "[Short project summary placeholder — one or two lines describing the engagement will appear here.]",
  industry: "[Industry]",
  service: CS_SERVICES[i % CS_SERVICES.length],
  technologies: CS_TECH[i % CS_TECH.length],
  duration: "[Duration]",
}));

export const KH_FEATURED_CASE_STUDY: KhCaseStudy = {
  slug: "placeholder-featured-case-study",
  title: "[Featured case study title placeholder]",
  summary: "[Featured case study summary placeholder — a short, outcome-focused introduction to the flagship project will sit here once written.]",
  industry: "[Industry]",
  service: "Web Application",
  technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
  duration: "[Duration]",
};

/* ---- helpers ---- */
export const getCategory = (slug: string) => KH_CATEGORIES.find((c) => c.slug === slug);
export const getArticle = (slug: string) => KH_ARTICLES.find((a) => a.slug === slug) ?? (slug === KH_FEATURED.slug ? KH_FEATURED : undefined);
export const getCaseStudy = (slug: string) =>
  KH_CASE_STUDIES.find((c) => c.slug === slug) ?? (slug === KH_FEATURED_CASE_STUDY.slug ? KH_FEATURED_CASE_STUDY : undefined);
export const articlesByCategory = (slug: string) => KH_ARTICLES.filter((a) => a.category === slug);
export const categoryName = (slug: string) => getCategory(slug)?.name ?? slug;
export const categoryAccent = (slug: string) => getCategory(slug)?.accent ?? KH_TEAL;

/** Case-study template section anchors (used for the in-page table of contents). */
export const CASE_STUDY_SECTIONS = [
  "Project overview", "Challenge", "Objectives", "Research", "Discovery", "Solution",
  "Process", "Technologies", "Accessibility", "Performance", "SEO", "Security",
  "Results", "Gallery", "Timeline", "Key takeaways",
];
