import {
  Server, Globe, ShoppingCart, Cloud, Cpu, Mail,
  HardDrive, ShieldCheck, DatabaseBackup, Activity, CreditCard, Network,
  type LucideIcon,
} from "lucide-react";

/**
 * Marketing presentation data for the homepage + product pages.
 *
 * These are static, editorial "starting at / typical spec" values used for the
 * marketing preview only. Exact, configurable pricing is always rendered from
 * the database on /pricing and each product page — links point there.
 */

/** Per-product spec sheets, keyed by product slug. Rendered on product cards. */
export const PRODUCT_SPECS: Record<string, { bestFor: string; specs: string[] }> = {
  "web-hosting": {
    bestFor: "Best for personal sites & small business",
    specs: ["1 website", "NVMe SSD storage", "Free SSL certificate", "Email mailboxes included", "Weekly backups", "Support tickets"],
  },
  "wordpress-hosting": {
    bestFor: "Best for blogs, portfolios & WP sites",
    specs: ["Managed WordPress", "NVMe SSD storage", "Free SSL + CDN-ready", "Automatic core updates", "Daily backups", "1-click staging"],
  },
  "woocommerce-hosting": {
    bestFor: "Best for online stores",
    specs: ["Store-tuned stack", "NVMe SSD storage", "Free SSL checkout", "Object caching", "Daily backups", "Priority support"],
  },
  "cloud-hosting": {
    bestFor: "Best for growing, high-traffic sites",
    specs: ["Dedicated resources", "NVMe SSD storage", "Free SSL", "Isolated environment", "Daily backups", "Scalable plans"],
  },
  "vps-hosting": {
    bestFor: "Best for developers & full control",
    specs: ["KVM virtualization", "Full root access", "Dedicated CPU & RAM", "Linux OS templates", "Scalable resources", "Snapshots & backups"],
  },
  "dedicated-servers": {
    bestFor: "Best for demanding, single-tenant workloads",
    specs: ["Bare-metal performance", "Dedicated CPU & RAM", "Enterprise NVMe", "Full hardware isolation", "IPMI access", "Custom configurations"],
  },
  "gpu-servers": {
    bestFor: "Best for AI, ML & rendering",
    specs: ["Dedicated GPU", "High-core CPU", "Large RAM pools", "NVMe scratch storage", "CUDA-ready images", "Hourly or monthly terms"],
  },
  "business-email": {
    bestFor: "Best for professional inboxes",
    specs: ["Mailboxes on your domain", "Anti-spam & anti-virus", "Webmail + IMAP/SMTP", "Calendars & contacts", "Mobile sync", "Admin controls"],
  },
};

/** Pricing preview — three categories, three plans each. */
export type PreviewPlan = {
  name: string;
  price: string;
  period: string;
  bestFor: string;
  specs: string[];
  href: string;
  popular?: boolean;
  renewalNote?: string;
};

export const PRICING_PREVIEW: { key: string; label: string; plans: PreviewPlan[] }[] = [
  {
    key: "web",
    label: "Web Hosting",
    plans: [
      { name: "Starter", price: "$2.79", period: "/mo", bestFor: "One simple website", href: "/web-hosting",
        specs: ["1 website", "10 GB NVMe storage", "Free SSL", "1 mailbox"] },
      { name: "Business", price: "$4.99", period: "/mo", popular: true, bestFor: "Growing sites & stores", href: "/web-hosting",
        specs: ["25 websites", "100 GB NVMe storage", "Free SSL + CDN-ready", "Daily backups"], renewalNote: "Billed on the term you choose. Renewal price shown at checkout." },
      { name: "Cloud", price: "$9.99", period: "/mo", bestFor: "High-traffic projects", href: "/cloud-hosting",
        specs: ["100 websites", "200 GB NVMe storage", "Dedicated resources", "Priority support"] },
    ],
  },
  {
    key: "vps",
    label: "VPS Hosting",
    plans: [
      { name: "VPS 1", price: "$4.99", period: "/mo", bestFor: "Dev & small apps", href: "/vps-hosting",
        specs: ["1 vCPU", "2 GB RAM", "40 GB NVMe", "Full root access"] },
      { name: "VPS 2", price: "$9.99", period: "/mo", popular: true, bestFor: "Production workloads", href: "/vps-hosting",
        specs: ["2 vCPU", "4 GB RAM", "80 GB NVMe", "Snapshots & backups"], renewalNote: "Monthly billing. Cancel anytime from your dashboard." },
      { name: "VPS 4", price: "$19.99", period: "/mo", bestFor: "Scaling teams", href: "/vps-hosting",
        specs: ["4 vCPU", "8 GB RAM", "160 GB NVMe", "Priority network"] },
    ],
  },
  {
    key: "cloud",
    label: "Cloud Servers",
    plans: [
      { name: "Cloud S", price: "$14.99", period: "/mo", bestFor: "Isolated single app", href: "/cloud-hosting",
        specs: ["2 vCPU dedicated", "4 GB RAM", "80 GB NVMe", "1 dedicated IPv4"] },
      { name: "Cloud M", price: "$29.99", period: "/mo", popular: true, bestFor: "Business platforms", href: "/cloud-hosting",
        specs: ["4 vCPU dedicated", "8 GB RAM", "160 GB NVMe", "Auto backups"], renewalNote: "Scale up or down as your traffic changes." },
      { name: "Cloud L", price: "$59.99", period: "/mo", bestFor: "Mission-critical apps", href: "/cloud-hosting",
        specs: ["8 vCPU dedicated", "16 GB RAM", "320 GB NVMe", "Priority support"] },
    ],
  },
];

/** "Built on reliable infrastructure" trust cards. */
export const INFRA_TRUST: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: HardDrive, title: "NVMe SSD storage", body: "Fast NVMe-backed storage on every plan for quick reads, writes and page loads." },
  { icon: ShieldCheck, title: "SSL security", body: "Free SSL certificates so every site you host is encrypted by default." },
  { icon: Network, title: "DDoS protection", body: "Network-level mitigation helps keep your services reachable under attack." },
  { icon: DatabaseBackup, title: "Backups", body: "Scheduled backups on supported plans so you can recover quickly." },
  { icon: Activity, title: "Server monitoring", body: "Health and uptime monitoring with alerting on production services." },
  { icon: Mail, title: "Support tickets", body: "Open a ticket any time — real people read it and follow up until it's resolved." },
  { icon: CreditCard, title: "Secure Stripe checkout", body: "Payments are processed by Stripe. Your full card details never touch our servers." },
  { icon: Cloud, title: "Scalable VPS resources", body: "Start small and scale CPU, RAM and storage as your project grows." },
];

/** Region row — careful wording: availability depends on the chosen product. */
export const REGION_ROW = ["United States", "Europe", "United Kingdom", "Canada", "Asia"];

/** "How setup works" — 5 honest steps. */
export const SETUP_STEPS: { title: string; body: string }[] = [
  { title: "Choose a hosting plan", body: "Pick the product and term that fit your project, then add it to your cart." },
  { title: "Pay securely with Stripe", body: "Check out with Stripe's encrypted payment flow — we never see your card details." },
  { title: "We prepare your service", body: "Your service is provisioned after payment. Some products are set up manually for accuracy." },
  { title: "Get your access details by email", body: "Login and connection details are emailed to you and saved in your dashboard." },
  { title: "Manage & get support", body: "Control your services and open support tickets any time from your dashboard." },
];

/** Quick-link category tiles. */
export const CATEGORY_TILES: { icon: LucideIcon; title: string; href: string; desc: string }[] = [
  { icon: Globe, title: "Web & WordPress", href: "/web-hosting", desc: "Fast managed hosting" },
  { icon: Server, title: "VPS & Dedicated", href: "/vps-hosting", desc: "Full root performance" },
  { icon: ShoppingCart, title: "WooCommerce", href: "/woocommerce-hosting", desc: "Store-ready stacks" },
  { icon: Cpu, title: "GPU Servers", href: "/gpu-servers", desc: "AI & rendering compute" },
];
