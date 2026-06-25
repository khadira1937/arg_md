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
      { title: "Web Design", href: "/website-app#design", description: "Beautiful, on-brand interfaces" },
      { title: "WordPress Websites", href: "/website-app#wordpress", description: "Easy to edit and maintain" },
      { title: "E-commerce Stores", href: "/website-app#ecommerce", description: "Sell online with confidence" },
      { title: "Landing Pages", href: "/website-app#landing", description: "Focused pages for campaigns" },
      { title: "Web Apps & Portals", href: "/website-app#apps", description: "Custom tools and dashboards" },
      { title: "Website Migration", href: "/website-app#migration", description: "Move platforms safely" },
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
      { title: "Content Marketing", href: "/digital-marketing#content", description: "Content that attracts" },
      { title: "Social Media Marketing", href: "/digital-marketing#social", description: "Grow and engage" },
      { title: "Google Business Profile", href: "/digital-marketing#gbp", description: "Maps & local visibility" },
      { title: "Email Marketing", href: "/digital-marketing#email", description: "Nurture and retain" },
      { title: "Digital PR", href: "/digital-marketing#pr", description: "Coverage and authority" },
      { title: "Campaign Planning", href: "/digital-marketing#campaigns", description: "Plans that perform" },
      { title: "Lead Generation Support", href: "/digital-marketing#leads", description: "Fill your pipeline" },
    ],
  },
  {
    title: "Design",
    href: "/design",
    icon: Palette,
    tagline: "Brand, web and marketing design that earns trust.",
    links: [
      { title: "UI/UX Design", href: "/design#web-ui", description: "Clear, modern interfaces" },
      { title: "Landing Page Design", href: "/design#landing", description: "Designed to convert" },
      { title: "Brand Identity", href: "/design#brand", description: "A look that feels you" },
      { title: "Logo Design", href: "/design#logo", description: "Memorable and versatile" },
      { title: "Social Media Graphics", href: "/design#social", description: "Scroll-stopping visuals" },
      { title: "Marketing Graphics", href: "/design#marketing", description: "On-brand collateral" },
      { title: "Website Visuals", href: "/design#visuals", description: "Imagery that elevates" },
    ],
  },
  {
    title: "Digital Media & Content",
    href: "/digital-media-content",
    icon: PenLine,
    tagline: "Words, photos and video that tell your story.",
    links: [
      { title: "Website Copywriting", href: "/digital-media-content#copy", description: "Clear, persuasive pages" },
      { title: "Blog Writing", href: "/digital-media-content#blog", description: "Helpful, on-brand articles" },
      { title: "Service Page Content", href: "/digital-media-content#service-content", description: "Pages that sell" },
      { title: "Social Media Content", href: "/digital-media-content#social", description: "Posts and captions" },
      { title: "Business Profile Content", href: "/digital-media-content#profile", description: "Polished profiles" },
      { title: "Content Strategy", href: "/digital-media-content#strategy", description: "A plan that compounds" },
      { title: "SEO Content Support", href: "/digital-media-content#seo-content", description: "Written to rank and read" },
    ],
  },
  {
    title: "Hosting & Website Care",
    href: "/hosting-website-care",
    icon: ServerCog,
    tagline: "Keep your website online, secure and up to date.",
    links: [
      { title: "Website Maintenance", href: "/hosting-website-care#maintenance", description: "Updates, fixes and edits" },
      { title: "Hosting Support", href: "/hosting-website-care#hosting", description: "We handle the technical side" },
      { title: "Domain Setup", href: "/hosting-website-care#domains", description: "Register and connect domains" },
      { title: "Business Email Setup", href: "/hosting-website-care#email", description: "Professional mailboxes" },
      { title: "SSL Setup", href: "/hosting-website-care#ssl", description: "Secure every page" },
      { title: "Backups", href: "/hosting-website-care#backups", description: "Recover quickly, sleep easy" },
      { title: "Website Edits", href: "/hosting-website-care#edits", description: "Small changes, handled" },
      { title: "Technical Support", href: "/hosting-website-care#support", description: "A real person to call" },
    ],
  },
  {
    title: "Business IT Support",
    href: "/business-it-support",
    icon: LifeBuoy,
    tagline: "Friendly, reliable tech support for small businesses.",
    links: [
      { title: "Email Setup", href: "/business-it-support#email", description: "Mailboxes done right" },
      { title: "Workspace Setup", href: "/business-it-support#workspace", description: "Microsoft 365 / Google" },
      { title: "Website Troubleshooting", href: "/business-it-support#troubleshooting", description: "Fix what's broken" },
      { title: "Basic Technical Support", href: "/business-it-support#support", description: "Friendly helpdesk" },
      { title: "Online Tools Setup", href: "/business-it-support#tools", description: "The right tools, configured" },
      { title: "Client Portal Support", href: "/business-it-support#portal", description: "Help with your portal" },
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
