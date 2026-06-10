import type { LucideIcon } from "lucide-react";
import {
  Server,
  Globe,
  ShoppingCart,
  Cloud,
  Boxes,
  Cpu,
  HardDrive,
  Gauge,
  Mail,
  ShieldCheck,
  Lock,
  Activity,
  ArrowRightLeft,
  Network,
  Workflow,
  Container,
  BookOpen,
  LifeBuoy,
  MessageSquare,
  Newspaper,
  DatabaseBackup,
  Layers,
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

export type NavItem = {
  title: string;
  href?: string;
  columns?: MegaMenuColumn[];
};

/** Primary navigation + mega menu definition (matches required IA). */
export const mainNav: NavItem[] = [
  {
    title: "Hosting",
    columns: [
      {
        title: "Web & Apps",
        links: [
          { title: "Web Hosting", href: "/web-hosting", description: "Fast shared hosting for any site", icon: Globe },
          { title: "WordPress Hosting", href: "/wordpress-hosting", description: "Managed WordPress, tuned", icon: Layers },
          { title: "WooCommerce Hosting", href: "/woocommerce-hosting", description: "Store-ready performance", icon: ShoppingCart },
          { title: "Cloud Hosting", href: "/cloud-hosting", description: "Isolated, dedicated resources", icon: Cloud },
          { title: "Agency Hosting", href: "/agency-hosting", description: "Manage client sites at scale", icon: Boxes },
          { title: "Node.js Hosting", href: "/nodejs-hosting", description: "Deploy Node apps fast", icon: Workflow },
        ],
      },
    ],
  },
  {
    title: "Servers",
    columns: [
      {
        title: "Compute",
        links: [
          { title: "VPS Hosting", href: "/vps-hosting", description: "KVM virtual servers, full root", icon: Server },
          { title: "Dedicated Servers", href: "/dedicated-servers", description: "Bare-metal performance", icon: Cpu },
          { title: "GPU Servers", href: "/gpu-servers", description: "Accelerated AI & rendering", icon: Cpu },
        ],
      },
      {
        title: "Specialized",
        links: [
          { title: "USA Dedicated Servers", href: "/usa-dedicated-servers", description: "US-East & US-West stock", icon: Server },
          { title: "Europe Dedicated Servers", href: "/europe-dedicated-servers", description: "EU regions, GDPR-ready", icon: Server },
          { title: "Storage Servers", href: "/storage-servers", description: "High-capacity $/TB", icon: HardDrive },
          { title: "10Gbps Servers", href: "/10gbps-servers", description: "Premium uplink", icon: Gauge },
        ],
      },
    ],
  },
  {
    title: "Domains & Email",
    columns: [
      {
        title: "Domains & Email",
        links: [
          { title: "Domain Search", href: "/domains", description: "Find & register a domain", icon: Globe },
          { title: "Domain Transfer", href: "/domains/transfer", description: "Move your domain to us", icon: ArrowRightLeft },
          { title: "Business Email", href: "/business-email", description: "Professional mailboxes", icon: Mail },
          { title: "SSL Certificates", href: "/ssl-certificates", description: "Encrypt every site", icon: Lock },
        ],
      },
    ],
  },
  {
    title: "Security",
    columns: [
      {
        title: "Protection",
        links: [
          { title: "DDoS Protection", href: "/ddos-protection", description: "Always-on mitigation", icon: ShieldCheck },
          { title: "Backups", href: "/backup-storage", description: "Offsite encrypted backups", icon: DatabaseBackup },
          { title: "SSL", href: "/ssl-certificates", description: "Free & premium certificates", icon: Lock },
          { title: "Server Monitoring", href: "/support#monitoring", description: "Uptime & health alerts", icon: Activity },
        ],
      },
    ],
  },
  {
    title: "Services",
    columns: [
      {
        title: "Managed services",
        links: [
          { title: "Website Migration", href: "/website-migration", description: "Done-for-you, free on annual plans", icon: ArrowRightLeft },
          { title: "Managed Private Cloud", href: "/managed-private-cloud", description: "Dedicated virtualization", icon: Cloud },
          { title: "DevOps Services", href: "/devops-services", description: "Ops expertise on tap", icon: Workflow },
          { title: "Kubernetes Solutions", href: "/kubernetes-hosting", description: "Managed clusters", icon: Container },
        ],
      },
    ],
  },
  {
    title: "Resources",
    columns: [
      {
        title: "Learn & get help",
        links: [
          { title: "Blog", href: "/blog", description: "Guides & product news", icon: Newspaper },
          { title: "Knowledge Base", href: "/knowledge-base", description: "How-tos & docs", icon: BookOpen },
          { title: "Support", href: "/support", description: "24/7 expert help", icon: LifeBuoy },
          { title: "Contact", href: "/contact", description: "Talk to our team", icon: MessageSquare },
        ],
      },
    ],
  },
  { title: "Pricing", href: "/pricing" },
];

export const footerNav = {
  Hosting: [
    { title: "Web Hosting", href: "/web-hosting" },
    { title: "WordPress Hosting", href: "/wordpress-hosting" },
    { title: "WooCommerce Hosting", href: "/woocommerce-hosting" },
    { title: "Cloud Hosting", href: "/cloud-hosting" },
    { title: "Agency Hosting", href: "/agency-hosting" },
  ],
  Servers: [
    { title: "VPS Hosting", href: "/vps-hosting" },
    { title: "Dedicated Servers", href: "/dedicated-servers" },
    { title: "GPU Servers", href: "/gpu-servers" },
    { title: "Storage Servers", href: "/storage-servers" },
    { title: "10Gbps Servers", href: "/10gbps-servers" },
  ],
  Company: [
    { title: "About", href: "/about" },
    { title: "Data Centers", href: "/data-centers" },
    { title: "Blog", href: "/blog" },
    { title: "Affiliate Program", href: "/affiliate" },
    { title: "System Status", href: "/status" },
    { title: "Contact", href: "/contact" },
  ],
  Legal: [
    { title: "Terms of Service", href: "/terms" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Refund Policy", href: "/refund-policy" },
    { title: "Acceptable Use", href: "/acceptable-use-policy" },
    { title: "DMCA", href: "/dmca" },
    { title: "Security", href: "/security" },
    { title: "SLA", href: "/sla" },
    { title: "Report Abuse", href: "/abuse" },
  ],
} as const;
