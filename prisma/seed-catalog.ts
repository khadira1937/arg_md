import { priceRows, featuresFromSpecs, type SeedProduct } from "./seed-data";

const genericFaq = (name: string) => [
  {
    question: `What makes ${name} different?`,
    answer: `Every ${name} plan runs on NVMe-backed infrastructure with free SSL, automated backups options, DDoS filtering and 24/7 expert support, all backed by our 99.99% uptime SLA.`,
  },
  {
    question: "Can I upgrade or downgrade later?",
    answer:
      "Yes. You can change plans at any time from your dashboard — we prorate the difference automatically and your data moves with you.",
  },
  {
    question: "Do you offer a money-back guarantee?",
    answer:
      "Eligible plans include a 30-day money-back guarantee. See our Refund Policy for full details and exclusions.",
  },
  {
    question: "How fast is provisioning?",
    answer:
      "Shared and cloud plans activate within minutes of payment. Bare-metal and GPU servers are provisioned shortly after order verification.",
  },
];

export const catalog: SeedProduct[] = [
  // ---------------------------------------------------------------- Web Hosting
  {
    name: "Web Hosting",
    slug: "web-hosting",
    type: "SHARED",
    categorySlug: "web-hosting",
    featured: true,
    sortOrder: 1,
    shortDescription: "Fast, affordable shared hosting for any website.",
    description:
      "Launch your website on NVMe SSD storage with free SSL, a global CDN and an intuitive control panel. Perfect for blogs, portfolios and growing businesses.",
    heroHeadline: "Web hosting that feels instant",
    heroSubheadline:
      "NVMe storage, free SSL, free CDN and a control panel anyone can use — from your first site to your hundredth.",
    seoTitle: "Web Hosting — Fast NVMe Shared Hosting | Aethon Cloud",
    seoDescription:
      "Affordable, lightning-fast web hosting on NVMe SSD with free SSL, CDN and 24/7 support. Plans from $2.79/mo.",
    faq: genericFaq("Web Hosting"),
    plans: [
      {
        name: "Launch", slug: "launch", supportLevel: "Standard",
        specs: { websites: "1 website", storage: "50 GB NVMe", bandwidth: "~10k visits/mo", email: "1 mailbox", ssl: "Free SSL", backups: "Weekly" },
        features: featuresFromSpecs({ websites: "1 website", storage: "50 GB NVMe", bandwidth: "~10k visits/mo", email: "1 mailbox", ssl: "Free SSL", backups: "Weekly" }, [{ label: "Free CDN", included: true }, { label: "Free domain", included: false }]),
        prices: priceRows(2.79, 7.99, "managed"),
        addons: ["daily-backups", "website-migration", "ssl-certificate", "cdn"],
      },
      {
        name: "Grow", slug: "grow", popular: true, supportLevel: "Priority",
        specs: { websites: "100 websites", storage: "100 GB NVMe", bandwidth: "~25k visits/mo", email: "Free email", ssl: "Free SSL", backups: "Daily" },
        features: featuresFromSpecs({ websites: "100 websites", storage: "100 GB NVMe", bandwidth: "~25k visits/mo", email: "Free email", ssl: "Free SSL", backups: "Daily" }, [{ label: "Free domain (1 yr)", included: true, highlight: true }, { label: "Free CDN", included: true }]),
        prices: priceRows(3.49, 8.99, "managed"),
        addons: ["daily-backups", "website-migration", "cdn", "malware-scanner"],
      },
      {
        name: "Scale", slug: "scale", recommended: true, supportLevel: "Priority",
        specs: { websites: "200 websites", storage: "200 GB NVMe", bandwidth: "~100k visits/mo", email: "Free email", ssl: "Free SSL", backups: "Daily" },
        features: featuresFromSpecs({ websites: "200 websites", storage: "200 GB NVMe", bandwidth: "~100k visits/mo", email: "Free email", ssl: "Free SSL", backups: "Daily" }, [{ label: "Free domain (1 yr)", included: true }, { label: "Priority CPU", included: true, highlight: true }, { label: "Daily backups", included: true }]),
        prices: priceRows(4.99, 11.99, "managed"),
        addons: ["daily-backups", "cdn", "malware-scanner", "priority-support"],
      },
    ],
  },
  // ------------------------------------------------------------ WordPress
  {
    name: "WordPress Hosting",
    slug: "wordpress-hosting",
    type: "WORDPRESS",
    categorySlug: "web-hosting",
    featured: true,
    sortOrder: 2,
    shortDescription: "Managed WordPress, tuned for speed and security.",
    description:
      "Managed WordPress hosting with automatic core updates, staging, server-level caching and WP-CLI. We handle the infrastructure so you can focus on content.",
    heroHeadline: "WordPress, fully managed and blazing fast",
    heroSubheadline:
      "Automatic updates, one-click staging, object caching and expert WP support on NVMe infrastructure.",
    seoTitle: "Managed WordPress Hosting | Aethon Cloud",
    seoDescription:
      "Managed WordPress hosting with staging, caching, auto-updates and WP-CLI. Plans from $3.49/mo.",
    faq: genericFaq("WordPress Hosting"),
    plans: [
      {
        name: "WP Start", slug: "wp-start", supportLevel: "Standard",
        specs: { websites: "1 site", storage: "100 GB NVMe", ram: "Shared", ssl: "Free SSL", backups: "Daily" },
        prices: priceRows(3.49, 8.99, "managed"),
        addons: ["daily-backups", "website-migration", "cdn"],
        features: featuresFromSpecs({ websites: "1 site", storage: "100 GB NVMe", ssl: "Free SSL", backups: "Daily" }, [{ label: "Managed updates", included: true }, { label: "Staging", included: true }]),
      },
      {
        name: "WP Business", slug: "wp-business", popular: true, supportLevel: "Priority",
        specs: { websites: "50 sites", storage: "200 GB NVMe", ram: "Shared+", ssl: "Free SSL", backups: "Daily" },
        prices: priceRows(4.99, 11.99, "managed"),
        addons: ["daily-backups", "cdn", "malware-scanner"],
        features: featuresFromSpecs({ websites: "50 sites", storage: "200 GB NVMe", ssl: "Free SSL", backups: "Daily" }, [{ label: "Object cache", included: true, highlight: true }, { label: "WP-CLI", included: true }]),
      },
      {
        name: "WP Pro", slug: "wp-pro", recommended: true, supportLevel: "Priority",
        specs: { cpu: "2 vCPU", ram: "3 GB", storage: "200 GB NVMe", ssl: "Free SSL", backups: "Daily" },
        prices: priceRows(9.99, 19.99, "managed"),
        addons: ["daily-backups", "cdn", "priority-support", "server-management"],
        features: featuresFromSpecs({ cpu: "2 vCPU", ram: "3 GB", storage: "200 GB NVMe", ssl: "Free SSL", backups: "Daily" }, [{ label: "Dedicated resources", included: true, highlight: true }]),
      },
    ],
  },
  // ------------------------------------------------------------ WooCommerce
  {
    name: "WooCommerce Hosting",
    slug: "woocommerce-hosting",
    type: "WOOCOMMERCE",
    categorySlug: "web-hosting",
    sortOrder: 3,
    shortDescription: "Store-ready hosting tuned for WooCommerce.",
    description:
      "A WooCommerce-optimized stack with dedicated resources, full-page caching and PCI-ready SSL so your store stays fast during peak sales.",
    heroHeadline: "Sell more with a store that never slows down",
    heroSubheadline: "WooCommerce-tuned performance, dedicated resources and free SSL out of the box.",
    seoTitle: "WooCommerce Hosting | Aethon Cloud",
    seoDescription: "Fast, store-ready WooCommerce hosting with dedicated resources and caching. From $4.49/mo.",
    faq: genericFaq("WooCommerce Hosting"),
    plans: [
      { name: "Store Start", slug: "store-start", supportLevel: "Standard", specs: { storage: "100 GB NVMe", websites: "1 store", ssl: "Free SSL", backups: "Daily" }, prices: priceRows(4.49, 9.99, "managed"), addons: ["daily-backups", "cdn", "website-migration"], features: featuresFromSpecs({ storage: "100 GB NVMe", websites: "1 store", ssl: "Free SSL", backups: "Daily" }, [{ label: "WooCommerce preinstalled", included: true }]) },
      { name: "Store Growth", slug: "store-growth", popular: true, supportLevel: "Priority", specs: { cpu: "2 vCPU", ram: "3 GB", storage: "200 GB NVMe", ssl: "Free SSL", backups: "Daily" }, prices: priceRows(6.99, 13.99, "managed"), addons: ["daily-backups", "cdn", "malware-scanner"], features: featuresFromSpecs({ cpu: "2 vCPU", ram: "3 GB", storage: "200 GB NVMe", ssl: "Free SSL" }, [{ label: "Dedicated resources", included: true, highlight: true }]) },
      { name: "Store Pro", slug: "store-pro", recommended: true, supportLevel: "Priority", specs: { cpu: "4 vCPU", ram: "6 GB", storage: "250 GB NVMe", ssl: "Free SSL", backups: "Daily" }, prices: priceRows(12.99, 22.99, "managed"), addons: ["daily-backups", "cdn", "priority-support"], features: featuresFromSpecs({ cpu: "4 vCPU", ram: "6 GB", storage: "250 GB NVMe", ssl: "Free SSL" }, [{ label: "Priority checkout caching", included: true }]) },
    ],
  },
  // ------------------------------------------------------------ Cloud
  {
    name: "Cloud Hosting",
    slug: "cloud-hosting",
    type: "CLOUD",
    categorySlug: "web-hosting",
    featured: true,
    sortOrder: 4,
    shortDescription: "Dedicated, isolated resources without the sysadmin.",
    description:
      "Managed cloud hosting with dedicated CPU/RAM, a dedicated IP and isolated resources — the power of a VPS with the simplicity of a control panel.",
    heroHeadline: "Dedicated cloud power, zero server management",
    heroSubheadline: "Isolated resources, dedicated IP and instant scaling — fully managed for you.",
    seoTitle: "Managed Cloud Hosting | Aethon Cloud",
    seoDescription: "Managed cloud hosting with dedicated resources and dedicated IP. From $9.99/mo.",
    faq: genericFaq("Cloud Hosting"),
    plans: [
      { name: "Cloud Start", slug: "cloud-start", supportLevel: "Priority", specs: { cpu: "2 vCPU", ram: "3 GB", storage: "200 GB NVMe", bandwidth: "~200k visits", ssl: "Free SSL" }, prices: priceRows(9.99, 19.99, "managed"), addons: ["daily-backups", "cdn", "ddos-protection"], features: featuresFromSpecs({ cpu: "2 vCPU", ram: "3 GB", storage: "200 GB NVMe", ssl: "Free SSL" }, [{ label: "Dedicated IP", included: true, highlight: true }]) },
      { name: "Cloud Pro", slug: "cloud-pro", popular: true, supportLevel: "Priority", specs: { cpu: "4 vCPU", ram: "6 GB", storage: "250 GB NVMe", bandwidth: "~300k visits", ssl: "Free SSL" }, prices: priceRows(14.99, 29.99, "managed"), addons: ["daily-backups", "cdn", "ddos-protection", "priority-support"], features: featuresFromSpecs({ cpu: "4 vCPU", ram: "6 GB", storage: "250 GB NVMe", ssl: "Free SSL" }, [{ label: "Dedicated IP", included: true }, { label: "Isolated resources", included: true, highlight: true }]) },
      { name: "Cloud Enterprise", slug: "cloud-enterprise", recommended: true, supportLevel: "Dedicated", specs: { cpu: "6 vCPU", ram: "12 GB", storage: "300 GB NVMe", bandwidth: "~400k visits", ssl: "Free SSL" }, prices: priceRows(29.99, 49.99, "managed"), addons: ["daily-backups", "cdn", "ddos-protection", "priority-support", "server-management"], features: featuresFromSpecs({ cpu: "6 vCPU", ram: "12 GB", storage: "300 GB NVMe", ssl: "Free SSL" }, [{ label: "Priority support", included: true }]) },
    ],
  },
  // ------------------------------------------------------------ Agency
  {
    name: "Agency Hosting",
    slug: "agency-hosting",
    type: "AGENCY",
    categorySlug: "web-hosting",
    sortOrder: 5,
    shortDescription: "Manage client sites at scale with white-label tools.",
    description:
      "Built for agencies and freelancers: manage dozens of client sites, white-label the panel, and bill clients — all from one dashboard.",
    heroHeadline: "Run your agency on one powerful dashboard",
    heroSubheadline: "White-label hosting, client billing and bulk site management built for teams.",
    seoTitle: "Agency Hosting | Aethon Cloud",
    seoDescription: "White-label agency hosting with client management and seats. From $24.99/mo.",
    faq: genericFaq("Agency Hosting"),
    plans: [
      { name: "Agency 10", slug: "agency-10", supportLevel: "Priority", specs: { websites: "10 client sites", storage: "200 GB NVMe", ssl: "Free SSL", backups: "Daily" }, prices: priceRows(24.99, 44.99, "managed"), addons: ["priority-support", "cdn", "daily-backups"], features: featuresFromSpecs({ websites: "10 client sites", storage: "200 GB NVMe", ssl: "Free SSL" }, [{ label: "Client billing", included: true }, { label: "Team seats", included: true }]) },
      { name: "Agency 25", slug: "agency-25", popular: true, supportLevel: "Priority", specs: { websites: "25 client sites", storage: "400 GB NVMe", ssl: "Free SSL", backups: "Daily" }, prices: priceRows(49.99, 79.99, "managed"), addons: ["priority-support", "cdn", "daily-backups"], features: featuresFromSpecs({ websites: "25 client sites", storage: "400 GB NVMe", ssl: "Free SSL" }, [{ label: "White-label panel", included: true, highlight: true }]) },
      { name: "Agency Unlimited", slug: "agency-unlimited", recommended: true, supportLevel: "Dedicated", specs: { websites: "Unlimited sites", storage: "1 TB NVMe", ssl: "Free SSL", backups: "Daily" }, prices: priceRows(99.99, 149.99, "managed"), addons: ["priority-support", "cdn", "daily-backups", "server-management"], features: featuresFromSpecs({ websites: "Unlimited sites", storage: "1 TB NVMe", ssl: "Free SSL" }, [{ label: "Dedicated account manager", included: true }]) },
    ],
  },
  // ------------------------------------------------------------ Node.js (display under cloud category)
  {
    name: "Node.js App Hosting",
    slug: "nodejs-hosting",
    type: "CLOUD",
    categorySlug: "web-hosting",
    sortOrder: 6,
    shortDescription: "Deploy Node.js apps with zero-config builds.",
    description:
      "Git-push deploys, automatic builds, environment variables and instant rollbacks for Node.js, Next.js and Express apps on managed cloud containers.",
    heroHeadline: "Ship Node.js apps in seconds",
    heroSubheadline: "Git-push deploys, autoscaling containers and managed runtimes for modern JavaScript.",
    seoTitle: "Node.js App Hosting | Aethon Cloud",
    seoDescription: "Deploy Node.js, Next.js and Express apps with git-push builds and autoscaling. From $7.99/mo.",
    faq: genericFaq("Node.js Hosting"),
    plans: [
      { name: "Node Start", slug: "node-start", supportLevel: "Standard", specs: { cpu: "1 vCPU", ram: "1 GB", storage: "25 GB NVMe", bandwidth: "1 TB" }, prices: priceRows(7.99, 12.99, "infra"), addons: ["daily-backups", "ddos-protection"], features: featuresFromSpecs({ cpu: "1 vCPU", ram: "1 GB", storage: "25 GB NVMe", bandwidth: "1 TB" }, [{ label: "Git-push deploys", included: true }]) },
      { name: "Node Pro", slug: "node-pro", popular: true, supportLevel: "Priority", specs: { cpu: "2 vCPU", ram: "4 GB", storage: "60 GB NVMe", bandwidth: "3 TB" }, prices: priceRows(15.99, 22.99, "infra"), addons: ["daily-backups", "ddos-protection", "priority-support"], features: featuresFromSpecs({ cpu: "2 vCPU", ram: "4 GB", storage: "60 GB NVMe", bandwidth: "3 TB" }, [{ label: "Autoscaling", included: true, highlight: true }]) },
      { name: "Node Scale", slug: "node-scale", recommended: true, supportLevel: "Priority", specs: { cpu: "4 vCPU", ram: "8 GB", storage: "120 GB NVMe", bandwidth: "6 TB" }, prices: priceRows(29.99, 39.99, "infra"), addons: ["daily-backups", "ddos-protection", "priority-support"], features: featuresFromSpecs({ cpu: "4 vCPU", ram: "8 GB", storage: "120 GB NVMe", bandwidth: "6 TB" }, [{ label: "Zero-downtime deploys", included: true }]) },
    ],
  },
  // ------------------------------------------------------------ VPS
  {
    name: "VPS Hosting",
    slug: "vps-hosting",
    type: "VPS",
    categorySlug: "servers",
    featured: true,
    sortOrder: 1,
    shortDescription: "KVM virtual servers with full root access.",
    description:
      "High-performance KVM VPS with dedicated vCPU, NVMe storage, full root access and multiple OS templates. Scale resources whenever you need.",
    heroHeadline: "KVM VPS built for performance",
    heroSubheadline: "Dedicated vCPU, NVMe storage and full root access across 8 global regions.",
    seoTitle: "VPS Hosting — KVM Virtual Servers | Aethon Cloud",
    seoDescription: "Fast KVM VPS with dedicated vCPU, NVMe storage and full root access. From $4.99/mo.",
    faq: genericFaq("VPS Hosting"),
    plans: [
      { name: "KVM Nano", slug: "kvm-nano", supportLevel: "Self-managed", specs: { cpu: "1 vCPU", ram: "4 GB", storage: "50 GB NVMe", bandwidth: "4 TB" }, prices: priceRows(4.99, 8.99, "infra"), addons: ["extra-ipv4", "ddos-protection", "server-management", "weekly-backups"], features: featuresFromSpecs({ cpu: "1 vCPU", ram: "4 GB", storage: "50 GB NVMe", bandwidth: "4 TB" }, [{ label: "Full root access", included: true }]) },
      { name: "KVM Core", slug: "kvm-core", popular: true, supportLevel: "Self-managed", specs: { cpu: "2 vCPU", ram: "8 GB", storage: "100 GB NVMe", bandwidth: "8 TB" }, prices: priceRows(7.99, 12.99, "infra"), addons: ["extra-ipv4", "ddos-protection", "server-management", "weekly-backups"], features: featuresFromSpecs({ cpu: "2 vCPU", ram: "8 GB", storage: "100 GB NVMe", bandwidth: "8 TB" }, [{ label: "Free snapshots", included: true, highlight: true }]) },
      { name: "KVM Plus", slug: "kvm-plus", recommended: true, supportLevel: "Self-managed", specs: { cpu: "4 vCPU", ram: "16 GB", storage: "200 GB NVMe", bandwidth: "16 TB" }, prices: priceRows(11.99, 18.99, "infra"), addons: ["extra-ipv4", "ddos-protection", "server-management", "weekly-backups"], features: featuresFromSpecs({ cpu: "4 vCPU", ram: "16 GB", storage: "200 GB NVMe", bandwidth: "16 TB" }) },
      { name: "KVM Max", slug: "kvm-max", supportLevel: "Self-managed", specs: { cpu: "8 vCPU", ram: "32 GB", storage: "400 GB NVMe", bandwidth: "32 TB" }, prices: priceRows(22.99, 32.99, "infra"), addons: ["extra-ipv4", "ddos-protection", "server-management"], features: featuresFromSpecs({ cpu: "8 vCPU", ram: "32 GB", storage: "400 GB NVMe", bandwidth: "32 TB" }) },
    ],
  },
  // ------------------------------------------------------------ Dedicated
  {
    name: "Dedicated Servers",
    slug: "dedicated-servers",
    type: "DEDICATED",
    categorySlug: "servers",
    sortOrder: 2,
    shortDescription: "Single-tenant bare-metal performance.",
    description:
      "Enterprise bare-metal servers with the latest Xeon CPUs, ECC memory and NVMe storage. Full hardware isolation, IPMI access and 1–10 Gbps uplinks.",
    heroHeadline: "Raw bare-metal power, all yours",
    heroSubheadline: "Latest-gen Xeon CPUs, ECC RAM and NVMe storage with full hardware isolation.",
    seoTitle: "Dedicated Servers — Bare Metal | Aethon Cloud",
    seoDescription: "Single-tenant dedicated bare-metal servers with Xeon CPUs and NVMe. From $89/mo.",
    faq: genericFaq("Dedicated Servers"),
    plans: [
      { name: "Metal Start", slug: "metal-start", supportLevel: "Managed option", specs: { cpu: "4-core Xeon", ram: "32 GB ECC", storage: "2×1 TB SSD", bandwidth: "20 TB" }, prices: priceRows(89, 89, "infra"), addons: ["extra-ipv4", "ddos-protection", "server-management"], features: featuresFromSpecs({ cpu: "4-core Xeon", ram: "32 GB ECC", storage: "2×1 TB SSD", bandwidth: "20 TB" }, [{ label: "IPMI access", included: true }]) },
      { name: "Metal Pro", slug: "metal-pro", popular: true, supportLevel: "Managed option", specs: { cpu: "8-core Xeon", ram: "64 GB ECC", storage: "2×2 TB NVMe", bandwidth: "30 TB" }, prices: priceRows(139, 139, "infra"), addons: ["extra-ipv4", "ddos-protection", "server-management"], features: featuresFromSpecs({ cpu: "8-core Xeon", ram: "64 GB ECC", storage: "2×2 TB NVMe", bandwidth: "30 TB" }, [{ label: "IPMI access", included: true }]) },
      { name: "Metal Performance", slug: "metal-performance", recommended: true, supportLevel: "Managed option", specs: { cpu: "16-core dual Xeon", ram: "128 GB ECC", storage: "4×2 TB NVMe", bandwidth: "1-10 Gbps" }, prices: priceRows(229, 229, "infra", 49), addons: ["extra-ipv4", "ddos-protection", "server-management"], features: featuresFromSpecs({ cpu: "16-core dual Xeon", ram: "128 GB ECC", storage: "4×2 TB NVMe", bandwidth: "1-10 Gbps" }, [{ label: "Hardware RAID", included: true, highlight: true }]) },
    ],
  },
  // ------------------------------------------------------------ USA Dedicated
  {
    name: "USA Dedicated Servers",
    slug: "usa-dedicated-servers",
    type: "DEDICATED",
    categorySlug: "servers",
    sortOrder: 3,
    shortDescription: "Bare metal in US-East & US-West data centers.",
    description:
      "Low-latency dedicated servers hosted in Ashburn and Los Angeles, with up to 10 Gbps uplinks — ideal for North American audiences.",
    heroHeadline: "US-based bare metal, low latency coast to coast",
    heroSubheadline: "Ashburn & Los Angeles data centers with up to 10 Gbps uplinks.",
    seoTitle: "USA Dedicated Servers | Aethon Cloud",
    seoDescription: "US dedicated servers in Ashburn and Los Angeles with up to 10 Gbps. From $99/mo.",
    faq: genericFaq("USA Dedicated Servers"),
    plans: [
      { name: "US Start", slug: "us-start", supportLevel: "Managed option", specs: { cpu: "8-core", ram: "32 GB", storage: "2×1 TB NVMe", bandwidth: "1 Gbps", uplink: "1 Gbps" }, prices: priceRows(99, 99, "infra"), addons: ["extra-ipv4", "ddos-protection"], features: featuresFromSpecs({ cpu: "8-core", ram: "32 GB", storage: "2×1 TB NVMe", uplink: "1 Gbps" }, [{ label: "Ashburn / LA", included: true }]) },
      { name: "US Business", slug: "us-business", popular: true, supportLevel: "Managed option", specs: { cpu: "16-core", ram: "64 GB", storage: "2×2 TB NVMe", uplink: "1 Gbps" }, prices: priceRows(159, 159, "infra"), addons: ["extra-ipv4", "ddos-protection", "server-management"], features: featuresFromSpecs({ cpu: "16-core", ram: "64 GB", storage: "2×2 TB NVMe", uplink: "1 Gbps" }) },
      { name: "US 10Gbps Pro", slug: "us-10gbps-pro", recommended: true, supportLevel: "Managed option", specs: { cpu: "16-core", ram: "128 GB", storage: "4×2 TB NVMe", uplink: "10 Gbps" }, prices: priceRows(239, 239, "infra"), addons: ["extra-ipv4", "ddos-protection", "server-management"], features: featuresFromSpecs({ cpu: "16-core", ram: "128 GB", storage: "4×2 TB NVMe", uplink: "10 Gbps" }, [{ label: "10 Gbps uplink", included: true, highlight: true }]) },
    ],
  },
  // ------------------------------------------------------------ EU Dedicated
  {
    name: "Europe Dedicated Servers",
    slug: "europe-dedicated-servers",
    type: "DEDICATED",
    categorySlug: "servers",
    sortOrder: 4,
    shortDescription: "GDPR-ready bare metal in EU data centers.",
    description:
      "Dedicated servers in Frankfurt and Amsterdam with EU data residency and GDPR-aligned operations for European audiences.",
    heroHeadline: "European bare metal, GDPR-ready",
    heroSubheadline: "Frankfurt & Amsterdam data centers with EU data residency.",
    seoTitle: "Europe Dedicated Servers | Aethon Cloud",
    seoDescription: "EU dedicated servers in Frankfurt and Amsterdam, GDPR-ready. From $89/mo.",
    faq: genericFaq("Europe Dedicated Servers"),
    plans: [
      { name: "EU Start", slug: "eu-start", supportLevel: "Managed option", specs: { cpu: "8-core", ram: "32 GB", storage: "2×1 TB NVMe", uplink: "1 Gbps" }, prices: priceRows(89, 89, "infra"), addons: ["extra-ipv4", "ddos-protection"], features: featuresFromSpecs({ cpu: "8-core", ram: "32 GB", storage: "2×1 TB NVMe", uplink: "1 Gbps" }, [{ label: "Frankfurt / Amsterdam", included: true }]) },
      { name: "EU Performance", slug: "eu-performance", popular: true, supportLevel: "Managed option", specs: { cpu: "16-core", ram: "64 GB", storage: "2×2 TB NVMe", uplink: "1 Gbps" }, prices: priceRows(149, 149, "infra"), addons: ["extra-ipv4", "ddos-protection", "server-management"], features: featuresFromSpecs({ cpu: "16-core", ram: "64 GB", storage: "2×2 TB NVMe", uplink: "1 Gbps" }) },
      { name: "EU Enterprise", slug: "eu-enterprise", recommended: true, supportLevel: "Managed option", specs: { cpu: "dual Xeon", ram: "128 GB", storage: "4×2 TB NVMe", uplink: "10 Gbps" }, prices: priceRows(239, 239, "infra"), addons: ["extra-ipv4", "ddos-protection", "server-management"], features: featuresFromSpecs({ cpu: "dual Xeon", ram: "128 GB", storage: "4×2 TB NVMe", uplink: "10 Gbps" }) },
    ],
  },
  // ------------------------------------------------------------ GPU
  {
    name: "GPU Servers",
    slug: "gpu-servers",
    type: "GPU",
    categorySlug: "servers",
    featured: true,
    sortOrder: 5,
    shortDescription: "Accelerated compute for AI, ML and rendering.",
    description:
      "Dedicated GPU servers for training, inference, rendering and simulation, with high-core CPUs, large memory and fast NVMe scratch storage.",
    heroHeadline: "GPU compute for AI at scale",
    heroSubheadline: "Dedicated GPUs, high-core CPUs and NVMe scratch for training, inference and rendering.",
    seoTitle: "GPU Servers for AI & Rendering | Aethon Cloud",
    seoDescription: "Dedicated GPU servers for AI/ML training, inference and rendering. From $349/mo.",
    faq: genericFaq("GPU Servers"),
    plans: [
      { name: "GPU Start", slug: "gpu-start", supportLevel: "Managed option", specs: { gpu: "1× mid-range GPU", cpu: "8-core", ram: "64 GB", storage: "1 TB NVMe", uplink: "1 Gbps" }, prices: priceRows(349, 349, "infra"), addons: ["extra-ipv4", "ddos-protection", "server-management"], features: featuresFromSpecs({ gpu: "1× mid-range GPU", cpu: "8-core", ram: "64 GB", storage: "1 TB NVMe" }) },
      { name: "GPU Pro", slug: "gpu-pro", popular: true, supportLevel: "Managed option", specs: { gpu: "1× high-end GPU", cpu: "16-core", ram: "128 GB", storage: "2 TB NVMe", uplink: "10 Gbps" }, prices: priceRows(899, 899, "infra"), addons: ["extra-ipv4", "ddos-protection", "server-management"], features: featuresFromSpecs({ gpu: "1× high-end GPU", cpu: "16-core", ram: "128 GB", storage: "2 TB NVMe", uplink: "10 Gbps" }, [{ label: "NVLink ready", included: true, highlight: true }]) },
      { name: "GPU Enterprise", slug: "gpu-enterprise", recommended: true, supportLevel: "Managed", specs: { gpu: "2× high-end GPU", cpu: "32-core", ram: "256 GB", storage: "4 TB NVMe", uplink: "10 Gbps" }, prices: priceRows(1799, 1799, "infra"), addons: ["extra-ipv4", "ddos-protection", "server-management"], features: featuresFromSpecs({ gpu: "2× high-end GPU", cpu: "32-core", ram: "256 GB", storage: "4 TB NVMe", uplink: "10 Gbps" }) },
    ],
  },
  // ------------------------------------------------------------ Storage Servers
  {
    name: "Storage Servers",
    slug: "storage-servers",
    type: "STORAGE",
    categorySlug: "servers",
    sortOrder: 6,
    shortDescription: "High-capacity storage at the best $/TB.",
    description:
      "Dense HDD storage servers for backups, media libraries and archives — up to ~96 TB raw with great cost efficiency.",
    heroHeadline: "Massive storage, tiny price per terabyte",
    heroSubheadline: "Dense HDD arrays for backups, media and archives — up to ~96 TB raw.",
    seoTitle: "Storage Servers — High Capacity | Aethon Cloud",
    seoDescription: "High-capacity storage servers for backup and media. From $49/mo.",
    faq: genericFaq("Storage Servers"),
    plans: [
      { name: "Storage Slim", slug: "storage-slim", supportLevel: "Self-managed", specs: { cpu: "4-core", ram: "16 GB", storage: "2×4 TB HDD (~8 TB)", uplink: "1 Gbps" }, prices: priceRows(49, 49, "infra"), addons: ["extra-ipv4", "ddos-protection"], features: featuresFromSpecs({ storage: "2×4 TB HDD (~8 TB)", cpu: "4-core", ram: "16 GB" }) },
      { name: "Storage Thick", slug: "storage-thick", popular: true, supportLevel: "Self-managed", specs: { cpu: "4-core", ram: "16 GB", storage: "4×4 TB HDD (~16 TB)", uplink: "1 Gbps" }, prices: priceRows(89, 89, "infra"), addons: ["extra-ipv4", "ddos-protection"], features: featuresFromSpecs({ storage: "4×4 TB HDD (~16 TB)", cpu: "4-core", ram: "16 GB" }) },
      { name: "Storage Big", slug: "storage-big", supportLevel: "Self-managed", specs: { cpu: "8-core", ram: "32 GB", storage: "6×8 TB HDD (~48 TB)", uplink: "1 Gbps" }, prices: priceRows(139, 139, "infra"), addons: ["extra-ipv4", "ddos-protection"], features: featuresFromSpecs({ storage: "6×8 TB HDD (~48 TB)", cpu: "8-core", ram: "32 GB" }) },
      { name: "Storage Massive", slug: "storage-massive", recommended: true, supportLevel: "Self-managed", specs: { cpu: "8-core", ram: "32 GB", storage: "12×8 TB HDD (~96 TB)", uplink: "1 Gbps" }, prices: priceRows(199, 199, "infra"), addons: ["extra-ipv4", "ddos-protection"], features: featuresFromSpecs({ storage: "12×8 TB HDD (~96 TB)", cpu: "8-core", ram: "32 GB" }, [{ label: "Hardware RAID", included: true }]) },
    ],
  },
  // ------------------------------------------------------------ 10Gbps Servers
  {
    name: "10Gbps Servers",
    slug: "10gbps-servers",
    type: "DEDICATED",
    categorySlug: "servers",
    sortOrder: 7,
    shortDescription: "Premium high-bandwidth dedicated servers.",
    description:
      "Dedicated servers with 10 Gbps uplinks for streaming, CDN edge, large file delivery and high-throughput workloads.",
    heroHeadline: "10 Gbps of unstoppable throughput",
    heroSubheadline: "Premium high-bandwidth servers for streaming, CDN and large-scale delivery.",
    seoTitle: "10Gbps Dedicated Servers | Aethon Cloud",
    seoDescription: "High-bandwidth 10 Gbps dedicated servers for streaming and CDN. From $199/mo.",
    faq: genericFaq("10Gbps Servers"),
    plans: [
      { name: "10G Core", slug: "10g-core", popular: false, supportLevel: "Self-managed", specs: { cpu: "8-core", ram: "64 GB", storage: "2×2 TB NVMe", uplink: "10 Gbps" }, prices: priceRows(199, 199, "infra"), addons: ["extra-ipv4", "ddos-protection", "extra-bandwidth"], features: featuresFromSpecs({ cpu: "8-core", ram: "64 GB", storage: "2×2 TB NVMe", uplink: "10 Gbps" }) },
      { name: "10G Pro", slug: "10g-pro", popular: true, supportLevel: "Self-managed", specs: { cpu: "16-core", ram: "128 GB", storage: "4×2 TB NVMe", uplink: "10 Gbps" }, prices: priceRows(329, 329, "infra"), addons: ["extra-ipv4", "ddos-protection", "extra-bandwidth"], features: featuresFromSpecs({ cpu: "16-core", ram: "128 GB", storage: "4×2 TB NVMe", uplink: "10 Gbps" }) },
      { name: "10G Max", slug: "10g-max", recommended: true, supportLevel: "Self-managed", specs: { cpu: "dual Xeon", ram: "256 GB", storage: "4×4 TB NVMe", uplink: "10 Gbps" }, prices: priceRows(499, 499, "infra"), addons: ["extra-ipv4", "ddos-protection", "extra-bandwidth"], features: featuresFromSpecs({ cpu: "dual Xeon", ram: "256 GB", storage: "4×4 TB NVMe", uplink: "10 Gbps" }) },
    ],
  },
  // ------------------------------------------------------------ Business Email
  {
    name: "Business Email",
    slug: "business-email",
    type: "EMAIL",
    categorySlug: "domains-email",
    providerKey: "email",
    sortOrder: 1,
    shortDescription: "Professional email on your own domain.",
    description:
      "Secure, ad-free business email with your domain, generous storage, spam filtering and mobile sync. Priced per mailbox.",
    heroHeadline: "Professional email that builds trust",
    heroSubheadline: "Ad-free mailboxes on your domain with spam filtering and mobile sync.",
    seoTitle: "Business Email Hosting | Aethon Cloud",
    seoDescription: "Professional business email on your domain. From $0.99/mailbox/mo.",
    faq: genericFaq("Business Email"),
    plans: [
      { name: "Mail Basic", slug: "mail-basic", supportLevel: "Standard", specs: { storage: "10 GB / mailbox", email: "Per mailbox" }, prices: priceRows(0.99, 1.59, "managed"), addons: ["domain-privacy"], features: featuresFromSpecs({ storage: "10 GB / mailbox" }, [{ label: "Spam & virus filter", included: true }, { label: "Mobile sync", included: true }]) },
      { name: "Mail Pro", slug: "mail-pro", popular: true, supportLevel: "Priority", specs: { storage: "50 GB / mailbox", email: "Per mailbox" }, prices: priceRows(2.49, 3.49, "managed"), addons: ["domain-privacy"], features: featuresFromSpecs({ storage: "50 GB / mailbox" }, [{ label: "Larger attachments", included: true }, { label: "Priority delivery", included: true, highlight: true }]) },
    ],
  },
  // ------------------------------------------------------------ Domains (inquiry/search)
  {
    name: "Domains",
    slug: "domains",
    type: "DOMAIN",
    categorySlug: "domains-email",
    providerKey: "registrar",
    inquiryOnly: false,
    sortOrder: 2,
    shortDescription: "Search, register and transfer domains.",
    description:
      "Register the perfect domain with free WHOIS privacy, easy DNS management and one-click connection to your hosting.",
    heroHeadline: "Find the domain your idea deserves",
    heroSubheadline: "Hundreds of TLDs, free WHOIS privacy and instant DNS management.",
    seoTitle: "Domain Registration & Transfer | Aethon Cloud",
    seoDescription: "Search and register domains with free WHOIS privacy. .com from $9.99/yr.",
    faq: genericFaq("Domains"),
    plans: [
      { name: "Domain Registration", slug: "domain-registration", supportLevel: "Standard", specs: { ssl: "Free WHOIS privacy", storage: "Free DNS" }, prices: priceRows(0.83, 1.33, "managed"), addons: ["domain-privacy", "ssl-certificate"], features: [{ label: "Free WHOIS privacy", included: true }, { label: "Free DNS management", included: true }, { label: "Auto-renew", included: true }] },
    ],
  },
  // ------------------------------------------------------------ SSL
  {
    name: "SSL Certificates",
    slug: "ssl-certificates",
    type: "SSL",
    categorySlug: "security",
    sortOrder: 1,
    shortDescription: "Encrypt every site with trusted SSL.",
    description:
      "From free domain-validated certificates to wildcard and EV, secure your sites with trusted SSL and automatic renewal.",
    heroHeadline: "Trusted SSL for every site",
    heroSubheadline: "Free DV, wildcard and EV certificates with automatic installation and renewal.",
    seoTitle: "SSL Certificates | Aethon Cloud",
    seoDescription: "Free and premium SSL certificates with auto-renewal. Wildcard from $59/yr.",
    faq: genericFaq("SSL Certificates"),
    plans: [
      { name: "SSL DV", slug: "ssl-dv", supportLevel: "Standard", specs: { ssl: "Domain validated" }, prices: priceRows(1.0, 1.0, "managed"), addons: [], features: [{ label: "Domain validated", included: true }, { label: "Auto-renew", included: true }, { label: "256-bit encryption", included: true }] },
      { name: "SSL Wildcard", slug: "ssl-wildcard", popular: true, supportLevel: "Priority", specs: { ssl: "*.yourdomain" }, prices: priceRows(4.92, 4.92, "managed"), addons: [], features: [{ label: "Unlimited subdomains", included: true, highlight: true }, { label: "256-bit encryption", included: true }] },
      { name: "SSL EV", slug: "ssl-ev", supportLevel: "Priority", specs: { ssl: "Extended validation" }, prices: priceRows(10.75, 10.75, "managed"), addons: [], features: [{ label: "Green-bar EV", included: true }, { label: "$1M warranty", included: true }] },
    ],
  },
  // ------------------------------------------------------------ DDoS Protection
  {
    name: "DDoS Protection",
    slug: "ddos-protection",
    type: "SECURITY",
    categorySlug: "security",
    sortOrder: 2,
    shortDescription: "Always-on network attack mitigation.",
    description:
      "Multi-layer DDoS protection that filters volumetric and application attacks at the edge, keeping your services online under pressure.",
    heroHeadline: "Stay online through any attack",
    heroSubheadline: "Always-on L3/L4/L7 mitigation with automatic traffic scrubbing.",
    seoTitle: "DDoS Protection | Aethon Cloud",
    seoDescription: "Always-on DDoS protection with L3/L4/L7 mitigation. From $19/mo.",
    faq: genericFaq("DDoS Protection"),
    plans: [
      { name: "Shield Standard", slug: "shield-standard", supportLevel: "Standard", specs: { ddos: "L3/L4 always-on", bandwidth: "Up to 20 Gbps" }, prices: priceRows(19, 19, "infra"), addons: [], features: featuresFromSpecs({ ddos: "L3/L4 always-on", bandwidth: "Up to 20 Gbps" }) },
      { name: "Shield Advanced", slug: "shield-advanced", popular: true, supportLevel: "Priority", specs: { ddos: "L3/L4/L7", bandwidth: "Up to 100 Gbps" }, prices: priceRows(79, 79, "infra"), addons: [], features: featuresFromSpecs({ ddos: "L3/L4/L7", bandwidth: "Up to 100 Gbps" }, [{ label: "WAF rules", included: true, highlight: true }]) },
      { name: "Shield Enterprise", slug: "shield-enterprise", supportLevel: "Dedicated", specs: { ddos: "Custom scrubbing", bandwidth: "Custom capacity" }, prices: priceRows(199, 199, "infra"), addons: [], features: featuresFromSpecs({ ddos: "Custom scrubbing", bandwidth: "Custom capacity" }) },
    ],
  },
  // ------------------------------------------------------------ Backup Storage
  {
    name: "Backup Storage",
    slug: "backup-storage",
    type: "BACKUP",
    categorySlug: "security",
    sortOrder: 3,
    shortDescription: "Offsite, encrypted backup space.",
    description:
      "Secure offsite backup storage with encryption at rest, flexible retention and S3-compatible access. Flat, predictable pricing per terabyte.",
    heroHeadline: "Backups you can actually count on",
    heroSubheadline: "Encrypted, offsite, S3-compatible backup storage at a flat price per TB.",
    seoTitle: "Backup Storage | Aethon Cloud",
    seoDescription: "Encrypted offsite backup storage, S3-compatible. From $5/TB/mo.",
    faq: genericFaq("Backup Storage"),
    plans: [
      { name: "Backup 1TB", slug: "backup-1tb", supportLevel: "Standard", specs: { storage: "1 TB", ssl: "Encrypted at rest" }, prices: priceRows(5, 5, "infra"), addons: [], features: featuresFromSpecs({ storage: "1 TB" }, [{ label: "S3-compatible", included: true }]) },
      { name: "Backup 5TB", slug: "backup-5tb", popular: true, supportLevel: "Standard", specs: { storage: "5 TB", ssl: "Encrypted at rest" }, prices: priceRows(22, 22, "infra"), addons: [], features: featuresFromSpecs({ storage: "5 TB" }, [{ label: "S3-compatible", included: true }]) },
      { name: "Backup 10TB", slug: "backup-10tb", supportLevel: "Standard", specs: { storage: "10 TB", ssl: "Encrypted at rest" }, prices: priceRows(40, 40, "infra"), addons: [], features: featuresFromSpecs({ storage: "10 TB" }) },
      { name: "Backup 50TB", slug: "backup-50tb", recommended: true, supportLevel: "Priority", specs: { storage: "50 TB", ssl: "Encrypted at rest" }, prices: priceRows(180, 180, "infra"), addons: [], features: featuresFromSpecs({ storage: "50 TB" }, [{ label: "Priority restore", included: true }]) },
    ],
  },
  // ------------------------------------------------------------ Website Migration
  {
    name: "Website Migration",
    slug: "website-migration",
    type: "MIGRATION",
    categorySlug: "services",
    sortOrder: 1,
    shortDescription: "Free, done-for-you website migration.",
    description:
      "Our engineers move your sites, databases and email to Aethon with zero downtime — free with annual plans, or as a standalone service.",
    heroHeadline: "Switch to Aethon with zero downtime",
    heroSubheadline: "Our team migrates your sites, databases and email for you — for free on annual plans.",
    seoTitle: "Free Website Migration | Aethon Cloud",
    seoDescription: "Free, expert website migration with zero downtime. Standalone from $29.",
    faq: genericFaq("Website Migration"),
    plans: [
      { name: "Standard Migration", slug: "standard-migration", supportLevel: "Priority", specs: { websites: "1 site + DB", ssl: "Zero downtime" }, prices: priceRows(2.42, 2.42, "managed"), addons: [], features: [{ label: "Site + database move", included: true }, { label: "Zero downtime cutover", included: true }, { label: "Free on annual plans", included: true, highlight: true }] },
    ],
  },
  // ------------------------------------------------------------ Managed Private Cloud (inquiry)
  {
    name: "Managed Private Cloud",
    slug: "managed-private-cloud",
    type: "MANAGED_CLOUD",
    categorySlug: "services",
    inquiryOnly: true,
    sortOrder: 2,
    shortDescription: "Dedicated virtualization, fully managed.",
    description:
      "A private cloud built for your workloads — dedicated hypervisors, custom networking, and a fully managed operations team. Quote-based.",
    heroHeadline: "Your own cloud, run by our engineers",
    heroSubheadline: "Dedicated hypervisors, custom networking and 24/7 managed operations.",
    seoTitle: "Managed Private Cloud | Aethon Cloud",
    seoDescription: "Fully managed private cloud with dedicated virtualization. Contact sales for a quote.",
    faq: genericFaq("Managed Private Cloud"),
    plans: [
      { name: "Private Cloud", slug: "private-cloud", supportLevel: "Dedicated", specs: { cpu: "Custom", ram: "Custom", storage: "Custom" }, prices: priceRows(1500, 1500, "infra"), addons: [], features: [{ label: "Dedicated hypervisors", included: true }, { label: "Custom networking", included: true }, { label: "24/7 managed ops", included: true, highlight: true }] },
    ],
  },
  // ------------------------------------------------------------ DevOps (inquiry)
  {
    name: "DevOps Services",
    slug: "devops-services",
    type: "DEVOPS",
    categorySlug: "services",
    inquiryOnly: true,
    sortOrder: 3,
    shortDescription: "Senior DevOps expertise on demand.",
    description:
      "CI/CD pipelines, infrastructure-as-code, observability and on-call — our DevOps engineers extend your team on a flexible retainer.",
    heroHeadline: "DevOps muscle without the hiring",
    heroSubheadline: "CI/CD, IaC, observability and on-call from senior engineers on a flexible retainer.",
    seoTitle: "DevOps Services | Aethon Cloud",
    seoDescription: "Senior DevOps engineering on a flexible retainer. From $1,500/mo. Contact sales.",
    faq: genericFaq("DevOps Services"),
    plans: [
      { name: "DevOps Retainer", slug: "devops-retainer", supportLevel: "Dedicated", specs: { cpu: "Flexible hours", ram: "Senior engineers" }, prices: priceRows(1500, 1500, "infra"), addons: [], features: [{ label: "CI/CD pipelines", included: true }, { label: "Infrastructure as code", included: true }, { label: "On-call coverage", included: true, highlight: true }] },
    ],
  },
  // ------------------------------------------------------------ Kubernetes (inquiry)
  {
    name: "Kubernetes Solutions",
    slug: "kubernetes-hosting",
    type: "KUBERNETES",
    categorySlug: "services",
    inquiryOnly: true,
    sortOrder: 4,
    shortDescription: "Managed Kubernetes clusters.",
    description:
      "Production-grade managed Kubernetes with autoscaling node pools, managed control plane, ingress, observability and GitOps delivery.",
    heroHeadline: "Managed Kubernetes, production-ready",
    heroSubheadline: "Autoscaling node pools, managed control plane and GitOps delivery.",
    seoTitle: "Managed Kubernetes Hosting | Aethon Cloud",
    seoDescription: "Production-grade managed Kubernetes clusters. From $99/node. Contact sales.",
    faq: genericFaq("Kubernetes Solutions"),
    plans: [
      { name: "Managed K8s", slug: "managed-k8s", supportLevel: "Dedicated", specs: { cpu: "Per node", ram: "Autoscaling", storage: "Managed control plane" }, prices: priceRows(99, 99, "infra"), addons: [], features: [{ label: "Managed control plane", included: true }, { label: "Autoscaling node pools", included: true, highlight: true }, { label: "GitOps delivery", included: true }] },
    ],
  },
  // ------------------------------------------------------------ Website Builder
  {
    name: "Website Builder",
    slug: "website-builder",
    type: "BUILDER",
    categorySlug: "web-hosting",
    sortOrder: 7,
    shortDescription: "Drag-and-drop site builder with hosting included.",
    description:
      "Build a professional website without code — drag-and-drop sections, AI copy, templates and hosting, all in one place.",
    heroHeadline: "Build a beautiful site, no code required",
    heroSubheadline: "Drag-and-drop builder, AI copywriting and hosting included.",
    seoTitle: "Website Builder | Aethon Cloud",
    seoDescription: "Drag-and-drop website builder with hosting included. From $2.99/mo.",
    faq: genericFaq("Website Builder"),
    plans: [
      { name: "Builder Basic", slug: "builder-basic", supportLevel: "Standard", specs: { websites: "1 site", storage: "100 GB", ssl: "Free SSL" }, prices: priceRows(2.99, 5.99, "managed"), addons: ["website-migration"], features: featuresFromSpecs({ websites: "1 site", storage: "100 GB", ssl: "Free SSL" }, [{ label: "Drag & drop", included: true }]) },
      { name: "Builder Pro", slug: "builder-pro", popular: true, supportLevel: "Priority", specs: { websites: "5 sites", storage: "200 GB", ssl: "Free SSL" }, prices: priceRows(5.99, 9.99, "managed"), addons: ["website-migration", "priority-support"], features: featuresFromSpecs({ websites: "5 sites", storage: "200 GB", ssl: "Free SSL" }, [{ label: "AI copywriting", included: true, highlight: true }]) },
    ],
  },
];
