import { PrismaClient, type AddonBillingType, type BillingCycle } from "@prisma/client";
import bcrypt from "bcryptjs";
import { catalog } from "./seed-catalog";

const prisma = new PrismaClient();

const categories = [
  { slug: "web-hosting", name: "Web Hosting", description: "Shared, WordPress, WooCommerce and cloud hosting", icon: "Globe", sortOrder: 1 },
  { slug: "servers", name: "Servers", description: "VPS, dedicated, GPU and storage servers", icon: "Server", sortOrder: 2 },
  { slug: "domains-email", name: "Domains & Email", description: "Domains and business email", icon: "Mail", sortOrder: 3 },
  { slug: "security", name: "Security", description: "SSL, DDoS protection and backups", icon: "ShieldCheck", sortOrder: 4 },
  { slug: "services", name: "Services", description: "Migration, managed cloud, DevOps and Kubernetes", icon: "Workflow", sortOrder: 5 },
];

const locations = [
  { slug: "us-east", name: "US East", city: "Ashburn", country: "United States", countryCode: "US", region: "North America", flagEmoji: "🇺🇸", latitude: 39.04, longitude: -77.49, sortOrder: 1 },
  { slug: "us-west", name: "US West", city: "Los Angeles", country: "United States", countryCode: "US", region: "North America", flagEmoji: "🇺🇸", latitude: 34.05, longitude: -118.24, sortOrder: 2 },
  { slug: "eu-frankfurt", name: "EU Frankfurt", city: "Frankfurt", country: "Germany", countryCode: "DE", region: "Europe", flagEmoji: "🇩🇪", latitude: 50.11, longitude: 8.68, sortOrder: 3 },
  { slug: "eu-amsterdam", name: "EU Amsterdam", city: "Amsterdam", country: "Netherlands", countryCode: "NL", region: "Europe", flagEmoji: "🇳🇱", latitude: 52.37, longitude: 4.9, sortOrder: 4 },
  { slug: "uk-london", name: "UK London", city: "London", country: "United Kingdom", countryCode: "GB", region: "Europe", flagEmoji: "🇬🇧", latitude: 51.51, longitude: -0.13, sortOrder: 5 },
  { slug: "sg-singapore", name: "Singapore", city: "Singapore", country: "Singapore", countryCode: "SG", region: "Asia Pacific", flagEmoji: "🇸🇬", latitude: 1.35, longitude: 103.82, sortOrder: 6 },
  { slug: "br-saopaulo", name: "Brazil", city: "São Paulo", country: "Brazil", countryCode: "BR", region: "South America", flagEmoji: "🇧🇷", latitude: -23.55, longitude: -46.63, sortOrder: 7 },
  { slug: "au-sydney", name: "Australia", city: "Sydney", country: "Australia", countryCode: "AU", region: "Asia Pacific", flagEmoji: "🇦🇺", latitude: -33.87, longitude: 151.21, sortOrder: 8 },
];

type AddonSeed = { slug: string; name: string; description: string; billingType: AddonBillingType; amount: number; renewal?: number; billingCycle?: BillingCycle };
const addons: AddonSeed[] = [
  { slug: "daily-backups", name: "Daily Backups", description: "Automated daily off-site backups with 30-day retention.", billingType: "RECURRING", amount: 299, billingCycle: "MONTHLY" },
  { slug: "weekly-backups", name: "Weekly Backups", description: "Automated weekly off-site backups.", billingType: "RECURRING", amount: 149, billingCycle: "MONTHLY" },
  { slug: "extra-ipv4", name: "Extra IPv4 Address", description: "Additional dedicated IPv4 address.", billingType: "RECURRING", amount: 300, billingCycle: "MONTHLY" },
  { slug: "ddos-protection", name: "DDoS Protection", description: "Always-on L3/L4 DDoS mitigation add-on.", billingType: "RECURRING", amount: 1900, billingCycle: "MONTHLY" },
  { slug: "server-management", name: "Server Management", description: "Fully managed OS, updates and monitoring.", billingType: "RECURRING", amount: 2500, billingCycle: "MONTHLY" },
  { slug: "priority-support", name: "Priority Support", description: "Front-of-queue support with faster SLAs.", billingType: "RECURRING", amount: 1500, billingCycle: "MONTHLY" },
  { slug: "website-migration", name: "Website Migration", description: "One-time expert migration of a site + database.", billingType: "ONE_TIME", amount: 2900 },
  { slug: "ssl-certificate", name: "SSL Certificate", description: "Premium SSL certificate, billed yearly.", billingType: "RECURRING", amount: 1200, billingCycle: "ANNUAL" },
  { slug: "control-panel-license", name: "Control Panel License", description: "cPanel/Plesk style control panel license.", billingType: "RECURRING", amount: 1400, billingCycle: "MONTHLY" },
  { slug: "extra-storage", name: "Extra Storage (50 GB)", description: "Add 50 GB of NVMe storage.", billingType: "RECURRING", amount: 500, billingCycle: "MONTHLY" },
  { slug: "extra-bandwidth", name: "Extra Bandwidth (1 TB)", description: "Add 1 TB of monthly bandwidth.", billingType: "RECURRING", amount: 900, billingCycle: "MONTHLY" },
  { slug: "malware-scanner", name: "Malware Scanner", description: "Daily malware scanning and removal.", billingType: "RECURRING", amount: 400, billingCycle: "MONTHLY" },
  { slug: "cdn", name: "Global CDN", description: "Edge caching across 100+ PoPs.", billingType: "RECURRING", amount: 600, billingCycle: "MONTHLY" },
  { slug: "domain-privacy", name: "Domain Privacy", description: "WHOIS privacy protection, billed yearly.", billingType: "RECURRING", amount: 999, billingCycle: "ANNUAL" },
];

async function main() {
  console.log("🌱 Seeding Aethon Cloud...");

  // Categories
  const categoryMap = new Map<string, string>();
  for (const c of categories) {
    const row = await prisma.productCategory.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description, icon: c.icon, sortOrder: c.sortOrder },
      create: c,
    });
    categoryMap.set(c.slug, row.id);
  }
  console.log(`  ✓ ${categories.length} categories`);

  // Locations
  for (const l of locations) {
    await prisma.serverLocation.upsert({ where: { slug: l.slug }, update: l, create: l });
  }
  console.log(`  ✓ ${locations.length} locations`);

  // Add-ons
  const addonMap = new Map<string, string>();
  for (const a of addons) {
    const row = await prisma.addon.upsert({
      where: { slug: a.slug },
      update: { name: a.name, description: a.description, billingType: a.billingType, amount: a.amount, billingCycle: a.billingCycle ?? null },
      create: { slug: a.slug, name: a.name, description: a.description, billingType: a.billingType, amount: a.amount, billingCycle: a.billingCycle ?? null },
    });
    addonMap.set(a.slug, row.id);
  }
  console.log(`  ✓ ${addons.length} add-ons`);

  // Products + plans + prices + features + plan-addons + location prices
  const allLocations = await prisma.serverLocation.findMany();
  const serverTypes = new Set(["VPS", "DEDICATED", "STORAGE", "GPU"]);

  for (const p of catalog) {
    const categoryId = categoryMap.get(p.categorySlug)!;
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name, type: p.type, categoryId, providerKey: p.providerKey ?? "mock",
        shortDescription: p.shortDescription, description: p.description, heroHeadline: p.heroHeadline,
        heroSubheadline: p.heroSubheadline, featured: p.featured ?? false, inquiryOnly: p.inquiryOnly ?? false,
        sortOrder: p.sortOrder ?? 0, seoTitle: p.seoTitle, seoDescription: p.seoDescription, faq: p.faq ?? undefined,
      },
      create: {
        name: p.name, slug: p.slug, type: p.type, categoryId, providerKey: p.providerKey ?? "mock",
        shortDescription: p.shortDescription, description: p.description, heroHeadline: p.heroHeadline,
        heroSubheadline: p.heroSubheadline, featured: p.featured ?? false, inquiryOnly: p.inquiryOnly ?? false,
        sortOrder: p.sortOrder ?? 0, seoTitle: p.seoTitle, seoDescription: p.seoDescription, faq: p.faq ?? undefined,
      },
    });

    let planIndex = 0;
    for (const plan of p.plans) {
      const planRow = await prisma.plan.upsert({
        where: { productId_slug: { productId: product.id, slug: plan.slug } },
        update: {
          name: plan.name, popular: plan.popular ?? false, recommended: plan.recommended ?? false,
          onSale: plan.onSale ?? false, supportLevel: plan.supportLevel, specs: plan.specs, sortOrder: planIndex,
        },
        create: {
          productId: product.id, name: plan.name, slug: plan.slug, popular: plan.popular ?? false,
          recommended: plan.recommended ?? false, onSale: plan.onSale ?? false, supportLevel: plan.supportLevel,
          specs: plan.specs, sortOrder: planIndex,
        },
      });
      planIndex++;

      // Prices
      for (const pr of plan.prices) {
        await prisma.planPrice.upsert({
          where: { planId_billingCycle_currency: { planId: planRow.id, billingCycle: pr.billingCycle, currency: "USD" } },
          update: { amount: pr.amount, renewalAmount: pr.renewalAmount, setupFee: pr.setupFee, discountPercentage: pr.discountPercentage },
          create: { planId: planRow.id, billingCycle: pr.billingCycle, currency: "USD", amount: pr.amount, renewalAmount: pr.renewalAmount, setupFee: pr.setupFee, discountPercentage: pr.discountPercentage },
        });
      }

      // Features (replace)
      await prisma.planFeature.deleteMany({ where: { planId: planRow.id } });
      const feats = plan.features ?? [];
      for (let i = 0; i < feats.length; i++) {
        const f = feats[i];
        await prisma.planFeature.create({
          data: { planId: planRow.id, label: f.label, value: f.value, included: f.included ?? true, highlight: f.highlight ?? false, sortOrder: i },
        });
      }

      // Plan add-ons
      for (const slug of plan.addons ?? []) {
        const addonId = addonMap.get(slug);
        if (!addonId) continue;
        await prisma.planAddon.upsert({
          where: { planId_addonId: { planId: planRow.id, addonId } },
          update: {},
          create: { planId: planRow.id, addonId, defaultSelected: false },
        });
      }

      // Location prices for server-type products
      if (serverTypes.has(p.type)) {
        for (const loc of allLocations) {
          await prisma.planLocationPrice.upsert({
            where: { planId_locationId: { planId: planRow.id, locationId: loc.id } },
            update: {},
            create: { planId: planRow.id, locationId: loc.id, priceModifier: 0, isAvailable: true },
          });
        }
      }
    }
  }
  console.log(`  ✓ ${catalog.length} products with plans, prices, features, add-ons`);

  // Users
  const adminPass = await bcrypt.hash("Admin123!", 12);
  const supportPass = await bcrypt.hash("Support123!", 12);
  const customerPass = await bcrypt.hash("Customer123!", 12);

  await prisma.user.upsert({
    where: { email: "admin@aethon.cloud" },
    update: {},
    create: { email: "admin@aethon.cloud", name: "Ada Admin", role: "ADMIN", hashedPassword: adminPass, emailVerified: new Date(), profile: { create: { company: "Aethon Cloud, Inc." } } },
  });
  await prisma.user.upsert({
    where: { email: "support@aethon.cloud" },
    update: {},
    create: { email: "support@aethon.cloud", name: "Sam Support", role: "SUPPORT", hashedPassword: supportPass, emailVerified: new Date() },
  });
  await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: { email: "customer@example.com", name: "Casey Customer", role: "CUSTOMER", hashedPassword: customerPass, emailVerified: new Date(), profile: { create: { company: "Casey Co", country: "United States", city: "Austin" } } },
  });
  console.log("  ✓ admin / support / customer users");

  // Coupon
  await prisma.coupon.upsert({
    where: { code: "WELCOME20" },
    update: {},
    create: { code: "WELCOME20", description: "20% off your first order", type: "PERCENT", value: 20, scope: "ALL", perUserLimit: 1, isActive: true },
  });
  await prisma.coupon.upsert({
    where: { code: "CLOUD10" },
    update: {},
    create: { code: "CLOUD10", description: "$10 off cloud plans", type: "FIXED", value: 1000, scope: "ALL", perUserLimit: 3, isActive: true },
  });
  console.log("  ✓ coupons");

  // Knowledge base
  const kbCat = await prisma.knowledgeBaseCategory.upsert({
    where: { slug: "getting-started" },
    update: {},
    create: { slug: "getting-started", name: "Getting Started", description: "Set up your first service", icon: "Rocket", sortOrder: 1 },
  });
  const kbArticles = [
    { slug: "how-to-deploy-your-first-vps", title: "How to deploy your first VPS", excerpt: "Spin up a KVM VPS in minutes.", body: "# Deploy your first VPS\n\nChoose a plan, pick a location, and check out. Your credentials appear in the dashboard once provisioning completes." },
    { slug: "connecting-a-domain", title: "Connecting a domain to your hosting", excerpt: "Point your domain at Aethon.", body: "# Connecting a domain\n\nUpdate your domain's A record to your service IP, or use our nameservers." },
    { slug: "enabling-free-ssl", title: "Enabling free SSL", excerpt: "Secure your site with one click.", body: "# Enabling free SSL\n\nSSL is automatically provisioned for active domains. Force HTTPS from the panel." },
  ];
  for (const a of kbArticles) {
    await prisma.knowledgeBaseArticle.upsert({
      where: { slug: a.slug },
      update: {},
      create: { ...a, categoryId: kbCat.id, published: true },
    });
  }
  console.log("  ✓ knowledge base");

  // Blog
  const admin = await prisma.user.findUnique({ where: { email: "admin@aethon.cloud" } });
  const posts = [
    { slug: "why-nvme-storage-matters", title: "Why NVMe storage makes your site feel instant", excerpt: "The performance case for NVMe.", body: "NVMe storage delivers dramatically lower latency than SATA SSDs..." },
    { slug: "choosing-vps-vs-cloud", title: "VPS vs Cloud Hosting: which should you pick?", excerpt: "A practical comparison.", body: "Both give you dedicated resources. Cloud hosting is managed; a VPS gives you full root control..." },
    { slug: "ddos-protection-explained", title: "DDoS protection explained for non-engineers", excerpt: "What it is and why you need it.", body: "DDoS attacks flood your service with traffic. Always-on mitigation filters it at the edge..." },
  ];
  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: { ...post, authorId: admin?.id, published: true, publishedAt: new Date() },
    });
  }
  console.log("  ✓ blog posts");

  // Announcement
  await prisma.announcement.create({
    data: { title: "New Singapore region is live", body: "Deploy VPS and dedicated servers in our new Singapore data center.", level: "INFO", audience: "ALL" },
  }).catch(() => {});
  console.log("  ✓ announcement");

  console.log("✅ Seed complete.\n");
  console.log("   Admin:    admin@aethon.cloud / Admin123!");
  console.log("   Support:  support@aethon.cloud / Support123!");
  console.log("   Customer: customer@example.com / Customer123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
