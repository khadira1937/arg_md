import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Megaphone,
  Palette,
  PenLine,
  ServerCog,
  LifeBuoy,
  Code2,
  ShoppingCart,
  LayoutTemplate,
  Smartphone,
  ArrowRightLeft,
  Gauge,
  Search,
  MapPin,
  Share2,
  Mail,
  Target,
  BadgeDollarSign,
  Sparkles,
  PenTool,
  Image as ImageIcon,
  Presentation,
  FileText,
  Newspaper,
  Camera,
  Lightbulb,
  Server,
  ShieldCheck,
  HardDriveDownload,
  AtSign,
  Lock,
  MonitorSmartphone,
  Wrench,
} from "lucide-react";

export type NavLink = {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
};

export type MegaMenuColumn = {
  title: string;
  links: NavLink[];
};

export type NavCta = {
  title: string;
  description: string;
  href: string;
  label: string;
};

/** A service category card (left pane) + its sub-services (right pane). */
export type ServiceCategory = {
  title: string;
  href: string;
  icon: LucideIcon;
  tagline: string;
  links: { title: string; href: string; description?: string }[];
};

export type NavItem = {
  title: string;
  href?: string;
  columns?: MegaMenuColumn[];
  /** Two-pane Nautilus-style services panel. */
  services?: ServiceCategory[];
  /** Accent call-to-action shown at the end of a mega panel. */
  cta?: NavCta;
};

/** The Services mega menu — left category cards, right sub-services. */
export const serviceMenu: ServiceCategory[] = [
  {
    title: "Website & App",
    href: "/website-app",
    icon: Globe,
    tagline: "Websites, stores and apps that work hard for your business.",
    links: [
      { title: "Website Development", href: "/website-app#development", description: "Custom, fast, built to convert" },
      { title: "WordPress Websites", href: "/website-app#wordpress", description: "Easy to edit and maintain" },
      { title: "E-commerce Stores", href: "/website-app#ecommerce", description: "Sell online with confidence" },
      { title: "Landing Pages", href: "/website-app#landing", description: "Focused pages for campaigns" },
      { title: "Web Apps & Portals", href: "/website-app#apps", description: "Custom tools and dashboards" },
      { title: "Website Migration", href: "/website-app#migration", description: "Move platforms safely" },
      { title: "Website Maintenance", href: "/website-app#maintenance", description: "Updates, fixes and edits" },
      { title: "Speed & Performance", href: "/website-app#performance", description: "Faster loads, better scores" },
    ],
  },
  {
    title: "Digital Marketing",
    href: "/digital-marketing",
    icon: Megaphone,
    tagline: "Get found, get clicks and turn visitors into customers.",
    links: [
      { title: "SEO", href: "/digital-marketing#seo", description: "Rank for what matters" },
      { title: "Local SEO", href: "/digital-marketing#local-seo", description: "Win your local market" },
      { title: "Google Business Profile", href: "/digital-marketing#gbp", description: "Maps & local visibility" },
      { title: "Content Marketing", href: "/digital-marketing#content", description: "Content that attracts" },
      { title: "Social Media Marketing", href: "/digital-marketing#social", description: "Grow and engage" },
      { title: "Email Marketing", href: "/digital-marketing#email", description: "Nurture and retain" },
      { title: "Paid Ads (Google & Meta)", href: "/digital-marketing#ads", description: "Campaigns that pay back" },
      { title: "Lead Generation", href: "/digital-marketing#leads", description: "Fill your pipeline" },
    ],
  },
  {
    title: "Design",
    href: "/design",
    icon: Palette,
    tagline: "Brand, web and marketing design that earns trust.",
    links: [
      { title: "Brand Identity", href: "/design#brand", description: "A look that feels you" },
      { title: "Logo Design", href: "/design#logo", description: "Memorable and versatile" },
      { title: "Web & UI/UX Design", href: "/design#web-ui", description: "Clear, modern interfaces" },
      { title: "Landing Page Design", href: "/design#landing", description: "Designed to convert" },
      { title: "Social Media Graphics", href: "/design#social", description: "Scroll-stopping visuals" },
      { title: "Marketing & Print Graphics", href: "/design#marketing", description: "On-brand collateral" },
      { title: "Presentation Design", href: "/design#presentations", description: "Pitch with polish" },
    ],
  },
  {
    title: "Digital Media & Content",
    href: "/digital-media-content",
    icon: PenLine,
    tagline: "Words, photos and video that tell your story.",
    links: [
      { title: "Website Copywriting", href: "/digital-media-content#copy", description: "Clear, persuasive pages" },
      { title: "Blog & Article Writing", href: "/digital-media-content#blog", description: "Helpful, on-brand articles" },
      { title: "SEO Content", href: "/digital-media-content#seo-content", description: "Written to rank and read" },
      { title: "Social Media Content", href: "/digital-media-content#social", description: "Posts and captions" },
      { title: "Photography & Video", href: "/digital-media-content#media", description: "Original visual content" },
      { title: "Content Strategy", href: "/digital-media-content#strategy", description: "A plan that compounds" },
      { title: "Content Refresh", href: "/digital-media-content#refresh", description: "Update and reuse" },
    ],
  },
  {
    title: "Hosting & Website Care",
    href: "/hosting-website-care",
    icon: ServerCog,
    tagline: "Keep your website online, secure and up to date.",
    links: [
      { title: "Managed Hosting Support", href: "/hosting-website-care#hosting", description: "We handle the technical side" },
      { title: "Website Care Plans", href: "/hosting-website-care#care", description: "Updates, backups, monitoring" },
      { title: "Domain Setup", href: "/hosting-website-care#domains", description: "Register and connect domains" },
      { title: "Business Email Setup", href: "/hosting-website-care#email", description: "Professional mailboxes" },
      { title: "SSL Setup", href: "/hosting-website-care#ssl", description: "Secure every page" },
      { title: "Backups & Monitoring", href: "/hosting-website-care#backups", description: "Recover quickly, sleep easy" },
    ],
  },
  {
    title: "Business IT Support",
    href: "/business-it-support",
    icon: LifeBuoy,
    tagline: "Friendly, reliable tech support for small businesses.",
    links: [
      { title: "IT Helpdesk Support", href: "/business-it-support#helpdesk", description: "Help when you need it" },
      { title: "Email & Microsoft 365", href: "/business-it-support#email", description: "Setup and admin" },
      { title: "Device & Account Setup", href: "/business-it-support#setup", description: "New starters, sorted" },
      { title: "Security Essentials", href: "/business-it-support#security", description: "Protect your business" },
      { title: "Backup & Recovery", href: "/business-it-support#backup", description: "Never lose your data" },
      { title: "Tech Consulting", href: "/business-it-support#consulting", description: "Practical advice" },
    ],
  },
];

/** Icons reused by service sub-links (kept here for typed access if needed). */
export const serviceIcons = {
  Code2, ShoppingCart, LayoutTemplate, Smartphone, ArrowRightLeft, Gauge, Search,
  MapPin, Share2, Mail, Target, BadgeDollarSign, Sparkles, PenTool, ImageIcon,
  Presentation, FileText, Newspaper, Camera, Lightbulb, Server, ShieldCheck,
  HardDriveDownload, AtSign, Lock, MonitorSmartphone, Wrench,
};

/** Primary navigation. "Services" uses the two-pane mega menu. */
export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  {
    title: "Services",
    href: "/services",
    services: serviceMenu,
    cta: {
      title: "Not sure where to start?",
      description: "Book a free, no-pressure call and we'll map out the right plan for your business.",
      href: "/book-a-call",
      label: "Book a call",
    },
  },
  { title: "Portfolio", href: "/portfolio" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

export const footerNav = {
  Services: [
    { title: "Website & App", href: "/website-app" },
    { title: "Digital Marketing", href: "/digital-marketing" },
    { title: "Design", href: "/design" },
    { title: "Digital Media & Content", href: "/digital-media-content" },
    { title: "Hosting & Website Care", href: "/hosting-website-care" },
    { title: "Business IT Support", href: "/business-it-support" },
  ],
  Company: [
    { title: "About", href: "/about" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
    { title: "Book a Call", href: "/book-a-call" },
    { title: "Client Portal", href: "/dashboard" },
  ],
  Legal: [
    { title: "Terms & Conditions", href: "/terms" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Cookie Policy", href: "/cookie-policy" },
    { title: "Refund Policy", href: "/refund-policy" },
    { title: "Acceptable Use Policy", href: "/acceptable-use-policy" },
  ],
} as const;
