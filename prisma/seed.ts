import { PrismaClient, type AddonBillingType, type BillingCycle } from "@prisma/client";
import bcrypt from "bcryptjs";
import { catalog } from "./seed-catalog";

const prisma = new PrismaClient();

const categories = [
  { slug: "website-app", name: "Website & App", description: "Websites, online stores and web apps", icon: "Globe", sortOrder: 1 },
  { slug: "marketing", name: "Digital Marketing", description: "SEO, social, content and paid ads", icon: "Megaphone", sortOrder: 2 },
  { slug: "design", name: "Design", description: "Brand identity, logos and visuals", icon: "Palette", sortOrder: 3 },
  { slug: "content", name: "Digital Media & Content", description: "Copy, blogs, photo and video", icon: "PenLine", sortOrder: 4 },
  { slug: "care", name: "Hosting & Website Care", description: "Hosting support, care plans, domains & email", icon: "ServerCog", sortOrder: 5 },
  { slug: "it-support", name: "Business IT Support", description: "Helpdesk, email, security and backups", icon: "LifeBuoy", sortOrder: 6 },
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
  { slug: "website-care-plan", name: "Website Care Plan", description: "Ongoing updates, backups, security and monitoring for your website.", billingType: "RECURRING", amount: 4900, billingCycle: "MONTHLY" },
  { slug: "priority-support", name: "Priority Support", description: "Front-of-queue support with faster response times.", billingType: "RECURRING", amount: 1500, billingCycle: "MONTHLY" },
  { slug: "extra-content", name: "Extra Content (per article)", description: "An additional written, SEO-friendly article.", billingType: "ONE_TIME", amount: 6000 },
  { slug: "business-email", name: "Business Email Setup", description: "Professional mailboxes on your own domain, set up for you.", billingType: "ONE_TIME", amount: 4900 },
  { slug: "domain-registration", name: "Domain Registration & Setup", description: "Register a domain and connect it to your website and email.", billingType: "ONE_TIME", amount: 2900 },
  { slug: "ssl-setup", name: "SSL Setup", description: "Secure every page of your site with SSL.", billingType: "ONE_TIME", amount: 1900 },
];

async function main() {
  console.log("🌱 Seeding ARGANA MEDIA...");

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
  console.log(`  ✓ ${catalog.length} services with packages, features and add-ons`);

  // Deactivate any products no longer in the catalog (e.g. legacy hosting/server
  // products from the previous brand) so they disappear from the public site,
  // pricing and admin active lists. Non-destructive — rows are kept, just hidden.
  const activeSlugs = catalog.map((p) => p.slug);
  const deactivated = await prisma.product.updateMany({
    where: { slug: { notIn: activeSlugs } },
    data: { isActive: false, featured: false },
  });
  if (deactivated.count > 0) console.log(`  ✓ deactivated ${deactivated.count} legacy product(s)`);

  // Users
  const adminPass = await bcrypt.hash("Admin123!", 12);
  const supportPass = await bcrypt.hash("Support123!", 12);
  const customerPass = await bcrypt.hash("Customer123!", 12);

  await prisma.user.upsert({
    where: { email: "admin@arganamedia.co.uk" },
    update: {},
    create: { email: "admin@arganamedia.co.uk", name: "Argana Admin", role: "ADMIN", hashedPassword: adminPass, emailVerified: new Date(), profile: { create: { company: "ARGANA MEDIA" } } },
  });
  await prisma.user.upsert({
    where: { email: "support@arganamedia.co.uk" },
    update: {},
    create: { email: "support@arganamedia.co.uk", name: "Argana Support", role: "SUPPORT", hashedPassword: supportPass, emailVerified: new Date() },
  });
  await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: { email: "client@example.com", name: "Sample Client", role: "CUSTOMER", hashedPassword: customerPass, emailVerified: new Date(), profile: { create: { company: "Sample Client Ltd", country: "United Kingdom", city: "London" } } },
  });
  console.log("  ✓ admin / support / client users");

  // Coupon
  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: { code: "WELCOME10", description: "10% off your first project", type: "PERCENT", value: 10, scope: "ALL", perUserLimit: 1, isActive: true },
  });
  await prisma.coupon.upsert({
    where: { code: "CARE10" },
    update: {},
    create: { code: "CARE10", description: "£10 off your first care plan", type: "FIXED", value: 1000, scope: "ALL", perUserLimit: 3, isActive: true },
  });
  console.log("  ✓ coupons");

  // Knowledge base
  const kbCat = await prisma.knowledgeBaseCategory.upsert({
    where: { slug: "getting-started" },
    update: { name: "Getting Started", description: "Working with ARGANA MEDIA" },
    create: { slug: "getting-started", name: "Getting Started", description: "Working with ARGANA MEDIA", icon: "Rocket", sortOrder: 1 },
  });
  const kbArticles = [
    { slug: "what-to-expect-on-your-first-call", title: "What to expect on your first call", excerpt: "How a discovery call works.", body: "# Your first call\n\nWe'll ask about your business, your goals and your timeline, then suggest the best next step. There's no obligation and no jargon — just helpful advice." },
    { slug: "how-we-quote-projects", title: "How we quote your project", excerpt: "Clear, fixed quotes — no surprises.", body: "# How we quote\n\nAfter your discovery call we send a written proposal with the scope, timeline and a fixed price. Once you approve it, we begin." },
    { slug: "using-your-client-portal", title: "Using your client portal", excerpt: "Manage projects, invoices and support.", body: "# Your client portal\n\nFrom your portal you can view your projects, invoices, care plans and support tickets, and request new services any time." },
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
  const admin = await prisma.user.findUnique({ where: { email: "admin@arganamedia.co.uk" } });
  const posts = [
    { slug: "what-makes-a-website-convert", title: "What actually makes a website convert", excerpt: "The fundamentals of a site that wins business.", body: "A high-converting website is clear, fast and trustworthy. It tells visitors what you do, why it matters, and exactly what to do next..." },
    { slug: "local-seo-basics-for-small-business", title: "Local SEO basics every small business should get right", excerpt: "Show up when nearby customers search.", body: "Local SEO is about being found by people near you. Start with an optimised Google Business Profile, consistent contact details, and reviews..." },
    { slug: "why-website-care-matters", title: "Why a website care plan is worth it", excerpt: "Keep your site secure, fast and online.", body: "Websites need looking after. Regular updates, backups and monitoring prevent problems, keep you secure and protect the investment you've made..." },
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
    data: { title: "ARGANA MEDIA is open for new projects", body: "Book a free discovery call to talk through your website, marketing or support needs.", level: "INFO", audience: "ALL" },
  }).catch(() => {});
  console.log("  ✓ announcement");

  console.log("✅ Seed complete.\n");
  console.log("   Admin:    admin@arganamedia.co.uk / Admin123!");
  console.log("   Support:  support@arganamedia.co.uk / Support123!");
  console.log("   Client:   client@example.com / Customer123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
