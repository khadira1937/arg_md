import {
  Globe, Megaphone, Palette, PenLine, ServerCog, LifeBuoy,
  type LucideIcon,
} from "lucide-react";

export type ServiceOffering = { title: string; body: string };

/** A rich, long-form narrative section (title + paragraphs). */
export type ServiceSection = { title: string; body: string[] };

/** A priced package card (only used on the priced services). */
export type PackageTier = {
  name: string;
  bestFor: string;
  price: string;
  popular?: boolean;
  specs?: string[];
};

export type ServiceDetail = {
  slug: string;
  category: string;
  icon: LucideIcon;
  eyebrow: string;
  heroHeadline: string;
  heroSub: string;
  intro: string;
  /** Optional rich content sections rendered after the intro. */
  sections?: ServiceSection[];
  offerings: ServiceOffering[];
  /** Priced services: package cards + heading/disclaimer. */
  packages?: PackageTier[];
  packagesTitle?: string;
  packagesSub?: string;
  packagesNote?: string;
  /** Quote-only services: a "how we price" paragraph (no numbers) + heading. */
  pricingTitle?: string;
  pricingNote?: string;
  outcomes: string[];
  faq: { question: string; answer: string }[];
  related: { title: string; href: string }[];
  /** Optional override for the closing CTA title. */
  ctaTitle?: string;
};

const VAT_NOTE = "Prices exclude VAT for UK clients. Every project is unique — your final quote is tailored to you.";

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "website-app": {
    slug: "website-app",
    category: "Website & App",
    icon: Globe,
    eyebrow: "Website & App",
    heroHeadline: "Websites & apps built to win you business",
    heroSub:
      "Your website is the digital front door to your business — let's make it one of a kind. From a simple brochure site to a full online store or custom web app, we design and build fast, modern websites that look the part and turn visitors into customers.",
    intro:
      "Your website is often the first impression a customer has of your business. We make sure it's a great one — clean design, clear messaging and reliable technology, all built around your goals. Whether you're starting from scratch or replacing an ageing site, we handle the design, build, content and launch, then stay on to keep it running smoothly.",
    sections: [
      {
        title: "Websites that work as hard as you do",
        body: [
          "A website is far more than an online business card. For most of your customers it's the very first impression they get of your business — and most of them will see it on their phone first. That means a site that looks brilliant and works flawlessly on every device isn't a nice-to-have, it's the foundation everything else is built on.",
          "We design and build hand-crafted, user-friendly websites that do a real job: explaining what you do, building trust and guiding visitors towards getting in touch or buying. Every site is structured around how people actually read and use the web, with clear messaging, intuitive navigation and strong calls to action in the right places.",
          "Whether you need a cost-effective, beautifully themed website or a fully bespoke build designed from scratch, our team has you covered. We work with the right technology for the job — WordPress, WooCommerce, Shopify, Wix or custom code — and we'll recommend the option that fits your goals and budget, not ours.",
        ],
      },
      {
        title: "Design and development, done properly",
        body: [
          "Web design and web development aren't the same thing, and both matter. Great design is the difference between a website that converts and one that quietly turns people away. Development is what happens under the bonnet — the speed, the stability and the functionality that make the whole thing actually work.",
          "Skimp on either and you close the door in the faces of potential customers. People rarely remember the brand behind a website that simply works; they never forget the one that frustrated them. We obsess over the details — layout, grid systems, load speed, accessibility and the small interactions that make a site feel effortless — so your visitors are guided smoothly along every step of their journey.",
          "Every site we build is responsive by default, search-engine friendly from day one and engineered with room to grow as your business does.",
        ],
      },
      {
        title: "From discovery to long-term partnership",
        body: [
          "Great websites are built on great communication. We start with a friendly discovery call where we ask about your goals, your customers and what makes your business tick. We then combine what we've learned with proven design and development craft to create something that's unmistakably yours.",
          "Throughout the build you'll never be left in the dark. We share previews, ask for your feedback, explain the technical bits in plain English and refine until it's just right. And once your site is live, we're still on hand — whether that's adding a new feature, launching a campaign or providing ongoing care. We're in it for the long term, and our clients tend to stick around.",
        ],
      },
    ],
    offerings: [
      { title: "Website Development", body: "Custom-built, mobile-friendly websites designed around your brand and customers, with solid SEO foundations." },
      { title: "Web Design", body: "Clean, modern, on-brand interfaces designed to build trust and convert visitors into enquiries." },
      { title: "WordPress Websites", body: "Flexible, editor-friendly sites you can manage yourself, with training and care to match." },
      { title: "E-commerce Stores", body: "Online stores on WooCommerce or Shopify — product pages, secure payments, shipping and the integrations you need to sell." },
      { title: "Landing Pages", body: "Focused, fast-loading pages built for a specific campaign or offer, designed to convert clicks into enquiries." },
      { title: "Web Apps & Portals", body: "Custom tools, booking systems, dashboards and client portals when an off-the-shelf site isn't enough." },
      { title: "Website Migration", body: "Move platform, host or design without losing content, rankings or email — handled carefully, with backups." },
      { title: "Website Maintenance", body: "Ongoing edits, fixes and improvements so your site keeps pace with your business." },
      { title: "Speed & Performance", body: "Audits and optimisation to improve load times, Core Web Vitals and the experience on every device." },
    ],
    packages: [
      { name: "Starter Website", bestFor: "New & small businesses getting online", price: "from £1,500", specs: ["A polished multi-page brochure site", "Up to 5 pages on a premium theme", "Mobile-friendly & responsive", "Contact form & basic SEO"] },
      { name: "Business Website", bestFor: "Growing businesses that want it done properly", price: "from £3,800", popular: true, specs: ["Fully custom design from scratch", "Up to ~12 pages with custom copy", "On-page SEO built in", "Care-plan ready from launch"] },
      { name: "E-commerce Website", bestFor: "Retailers & product businesses", price: "from £4,500", specs: ["End-to-end online store", "Secure payments & checkout", "Shipping & product management", "Built to scale as you grow"] },
      { name: "Landing Page", bestFor: "Campaigns & lead generation", price: "from £650", specs: ["A single high-converting page", "Bespoke design & build", "Structured around your offer", "Fast-loading & responsive"] },
      { name: "Web App / Bespoke", bestFor: "Bespoke & complex projects", price: "Custom quote", specs: ["Custom tools, portals & apps", "Scoped to your requirements", "Integrations & automation", "An ongoing partnership"] },
    ],
    packagesTitle: "Our website packages",
    packagesSub: "Every website is bespoke — these are starting points. We'll ask a few questions and give you a clear, fixed quote before any work begins.",
    packagesNote: VAT_NOTE,
    outcomes: [
      "A professional site that builds instant trust",
      "Clear structure that guides visitors to act",
      "Built-in SEO foundations from day one",
      "Easy to update — with our help or your own",
      "Looked after long-term with a care plan",
    ],
    faq: [
      { question: "How much does a website cost?", answer: "Every website is bespoke, so the right price depends on your needs. The packages above are starting points — we'll ask a few questions, understand what you need and give you a clear, fixed quote before any work begins." },
      { question: "How long does it take?", answer: "A simple site typically takes 2–4 weeks; larger sites, stores and web apps take longer. You'll get a realistic timeline in your proposal." },
      { question: "Will I be able to edit it myself?", answer: "Yes, where it makes sense. We build on editor-friendly platforms and provide training, and our care plans cover edits if you'd rather we handle them." },
      { question: "Will my website work on mobile?", answer: "Always. Most visitors browse on mobile, so every site we build is fully responsive and looks great on any device." },
      { question: "Is SEO included in the build?", answer: "Your site is built on solid SEO foundations, but ongoing ranking takes continuous work. Our marketing team can handle SEO as a separate, ongoing service." },
      { question: "What happens after launch?", answer: "We can part ways, or — far more popular — keep your site secure, updated and improving with one of our Hosting & Website Care plans." },
    ],
    related: [
      { title: "Design", href: "/design" },
      { title: "Digital Media & Content", href: "/digital-media-content" },
      { title: "Hosting & Website Care", href: "/hosting-website-care" },
    ],
    ctaTitle: "Let's build something that wins you business",
  },

  "digital-marketing": {
    slug: "digital-marketing",
    category: "Digital Marketing",
    icon: Megaphone,
    eyebrow: "Digital Marketing",
    heroHeadline: "Get found, get clicks, get customers",
    heroSub:
      "Promote your business with marketing that actually brings in leads. We help you show up where your customers are searching — and turn that attention into real enquiries and sales.",
    intro:
      "Great marketing isn't about doing everything — it's about doing the right things consistently. We build a practical plan around your goals and budget, focus on the channels that work for your business, and report on what actually matters: visibility, enquiries and growth.",
    sections: [
      {
        title: "Marketing that's built around results",
        body: [
          "Great marketing isn't about doing everything at once — it's about doing the right things, consistently, and measuring what matters. Too many businesses pour money into scattered tactics and never really know what's working. We take a calmer, sharper approach: we learn your goals, choose the channels that genuinely suit your business and budget, and report honestly on the numbers that count — visibility, enquiries and growth.",
          "As a full-service agency, we can handle your entire digital marketing programme while you focus on running your business. SEO improves your visibility and drives steady, qualified traffic. Regular content and blogging build your authority over time. Paid ads put you in front of the right people quickly. Social media keeps you visible and builds your audience. Whatever combination your business needs, we have a solution — and one team to deliver it.",
        ],
      },
      {
        title: "Get found on Google",
        body: [
          "Most buying journeys start with a search. Our SEO work helps you rank for the terms your customers actually use, through a mix of technical fixes, on-page optimisation, content and authority-building. For businesses that serve a local area, our local SEO sharpens your Google Business Profile, local landing pages, citations and reviews so you win the customers right on your doorstep.",
          "SEO is a long game, and we're honest about that — but done properly it becomes one of the most cost-effective sources of customers a business can have.",
        ],
      },
      {
        title: "Get results faster with paid ads",
        body: [
          "When you need traffic and leads quickly, paid advertising delivers. We plan, build and manage campaigns on Google and Meta (Facebook & Instagram) that target the right people with the right message, then optimise continuously to make every pound work harder. We pair ads with focused landing pages and clear tracking, so you can see exactly what your budget is bringing back.",
        ],
      },
      {
        title: "Stay visible with content & social",
        body: [
          "Visibility compounds. A steady stream of helpful content and consistent, on-brand social media keeps your business front of mind, builds trust and supports everything else you do online. We can plan and run your social channels, produce engaging content, manage email campaigns that nurture and retain customers, and handle digital PR that earns coverage and authority.",
        ],
      },
    ],
    offerings: [
      { title: "SEO", body: "Technical, on-page and content SEO to help you rank for what matters." },
      { title: "Local SEO", body: "Local pages, Google Business Profile and citations to win nearby customers." },
      { title: "Content Marketing", body: "Helpful content that attracts the right audience and builds authority." },
      { title: "Social Media Marketing", body: "Consistent, on-brand social content and management that grows your audience." },
      { title: "Google Business Profile", body: "Set up and optimised so you stand out on Maps and local search." },
      { title: "Email Marketing", body: "Newsletters and automated campaigns that nurture leads and bring customers back." },
      { title: "Digital PR", body: "Coverage and authority-building that strengthens your brand and your rankings." },
      { title: "Paid Ads (Google & Meta)", body: "Targeted, well-managed campaigns that pay back." },
      { title: "Lead Generation", body: "Landing pages, offers and funnels designed to capture and convert enquiries." },
    ],
    pricingTitle: "How we price marketing",
    pricingNote:
      "Every marketing programme is bespoke, because every business is starting from a different place with different goals. Rather than force you into a one-size-fits-all package, we build a plan around your priorities and budget, then agree a clear monthly scope and price before we begin. There's no lock-in and no jargon — just a sensible plan and honest reporting. Book a free call for a tailored quote.",
    outcomes: [
      "More visibility on Google and social media",
      "A steady flow of qualified enquiries",
      "A clear plan instead of scattered tactics",
      "Honest reporting you can understand",
      "Marketing that grows with your business",
    ],
    faq: [
      { question: "How quickly will I see results?", answer: "Paid ads can drive traffic almost immediately; SEO and content build momentum over a few months. We set realistic expectations and focus on steady, lasting growth." },
      { question: "Do I have to commit long-term?", answer: "Our marketing plans run on a flexible monthly basis. We earn your business each month rather than locking you into long contracts." },
      { question: "Can you work with my budget?", answer: "Yes. We'll recommend the highest-impact activities for your budget and scale up as results come in." },
      { question: "Which channels do I actually need?", answer: "That depends on your audience and goals — we'll advise honestly, and we'd rather you spend on what works than spread yourself too thin." },
      { question: "Will I know what's working?", answer: "Always. You'll get clear, plain-English reporting focused on the numbers that matter to your business." },
    ],
    related: [
      { title: "Digital Media & Content", href: "/digital-media-content" },
      { title: "Design", href: "/design" },
      { title: "Website & App", href: "/website-app" },
    ],
    ctaTitle: "Ready to bring in more leads?",
  },

  "design": {
    slug: "design",
    category: "Design",
    icon: Palette,
    eyebrow: "Design",
    heroHeadline: "Design that makes you look the part",
    heroSub:
      "All the visuals your business needs to communicate clearly and build your brand — logos, brand identity, web design, graphics and more. A strong, consistent look earns trust before a single word is read.",
    intro:
      "Design is more than looking nice — it's how your business communicates quality and builds confidence. We create cohesive brand identities and visuals that work everywhere your customers see you, from your logo and website to your social posts and printed materials.",
    sections: [
      {
        title: "Branding that sets you apart",
        body: [
          "Your brand is how your business is recognised and remembered. We create stunning logos and visual identities you won't find anywhere else — because we believe in an entirely custom approach. We don't use templates. Everything is created from scratch and starts with a proper briefing session, so the result genuinely reflects your business, your values and the customers you want to attract.",
          "We've worked with businesses, startups and freelancers across many industries to craft identities that stand out from the competition. From a single standout logo to a complete visual identity system, our team designs the assets that make your business look established and credible from day one.",
        ],
      },
      {
        title: "More than a logo",
        body: [
          "Effective branding doesn't begin and end with a logo. Design is the silent ambassador of your brand, and a brand is far more than a mark on a page. We make sure your business has everything it needs to look consistent and professional everywhere your customers see you — your website, your social media, your marketing materials and your printed collateral.",
          "Get the foundations right and everything else becomes easier: your marketing looks sharper, your website converts better and new customers trust you faster.",
        ],
      },
      {
        title: "Our design process",
        body: [
          "Every project starts with a thorough discovery phase, where we get to know your business and what you want your brand to say. We then explore creative options, refine the strongest directions with you and deliver final, ready-to-use files in every format you need. If you'd like, we can extend into a full brand identity and provide ongoing support for on-brand marketing materials — so your look stays consistent as you grow.",
        ],
      },
    ],
    offerings: [
      { title: "Logo Design", body: "Memorable, versatile logos that work across screens, print and signage at any size." },
      { title: "Brand Identity", body: "A complete visual system — colours, type, logo and guidelines — so everything you produce feels consistent." },
      { title: "Web & UI/UX Design", body: "Clean, modern interface design focused on clarity, ease of use and conversion." },
      { title: "Landing Page Design", body: "High-converting page designs built around a single goal and audience." },
      { title: "Social Media Graphics", body: "Scroll-stopping templates and post designs that keep your social presence sharp and on-brand." },
      { title: "Marketing & Print Graphics", body: "Brochures, flyers, signage and ad creative that carry your brand into the real world." },
      { title: "Website Visuals", body: "Original imagery and graphics that elevate your website and content." },
    ],
    packages: [
      { name: "Starter Logo", bestFor: "Startups & small businesses with a concept in mind", price: "£450", specs: ["Primary logo design", "Core file formats", "2 initial concepts", "2 revision rounds"] },
      { name: "Standard Logo", bestFor: "Businesses needing expert creative input", price: "£750", specs: ["A small logo suite", "All file formats", "3 initial concepts", "3 revision rounds", "Mini style sheet"] },
      { name: "Premium Logo & Brand", bestFor: "A complete, bespoke brand from scratch", price: "£1,500", popular: true, specs: ["Full logo suite", "Brand colours & typography", "Brand guidelines", "Social & stationery templates"] },
      { name: "Full Brand Identity", bestFor: "Look unmistakably yourself, everywhere", price: "from £1,400", specs: ["Discovery workshop", "Complete identity system", "Brand guidelines", "Launch assets"] },
      { name: "Social Media Graphics", bestFor: "Keep your channels looking sharp", price: "from £250 / month", specs: ["On-brand post templates", "Monthly design retainer", "Consistent, scroll-stopping visuals"] },
    ],
    packagesTitle: "Our logo & brand packages",
    packagesSub: "Custom design from scratch — never templates. Pick a starting point and we'll tailor it to you.",
    packagesNote:
      "Additional concepts beyond those in your package are £85 (excl. VAT) each. " + VAT_NOTE,
    outcomes: [
      "A consistent, professional brand everywhere",
      "Instant credibility with new customers",
      "Designs that are easy to reuse and extend",
      "Clear brand guidelines for your team",
      "Visuals built to convert, not just decorate",
    ],
    faq: [
      { question: "Do you use templates?", answer: "Never. Every logo and identity is designed from scratch, starting with a briefing session so the result is truly yours." },
      { question: "Can you refresh my existing brand?", answer: "Definitely. We can evolve what you have while keeping the recognition you've built, or start fresh if that's the right call." },
      { question: "Will I own the files?", answer: "Yes. On completion you receive your final logo and brand assets in all the formats you need, plus guidelines for using them." },
      { question: "What if I need extra concepts or revisions?", answer: "Additional concepts are £85 (excl. VAT) each. If you need revisions beyond those in your package, we'll agree a fixed fee with you before starting." },
      { question: "Do you design for print as well as web?", answer: "We do — from business cards and signage to brochures and ad creative, all consistent with your brand." },
    ],
    related: [
      { title: "Website & App", href: "/website-app" },
      { title: "Digital Media & Content", href: "/digital-media-content" },
      { title: "Digital Marketing", href: "/digital-marketing" },
    ],
    ctaTitle: "Let's design something you're proud of",
  },

  "digital-media-content": {
    slug: "digital-media-content",
    category: "Digital Media & Content",
    icon: PenLine,
    eyebrow: "Digital Media & Content",
    heroHeadline: "Content is king — let's build your kingdom",
    heroSub:
      "We create content that converts and establishes you as an authority. From the words on your homepage to a steady stream of blogs, social posts, photography and video — on-brand, written for real people and built to support your marketing.",
    intro:
      "Content connects your business to its audience. Whether it's the words on your homepage, a steady stream of helpful blog posts, or photo and video that show your work at its best, we produce content that's on-brand, written for real people and built to support your marketing and SEO.",
    sections: [
      {
        title: "Content that connects",
        body: [
          "Content is what turns a visitor into a customer. It's the words that explain why you're worth choosing, the articles that answer the questions people are searching for, and the photos and videos that show your business at its best. Done well, content builds trust, supports your SEO and gives every other part of your marketing something valuable to share.",
          "We take the time to learn your business, your audience and your tone before we write a word. Then we produce clear, engaging, on-brand content that sounds like you — and that's built to perform. You always approve everything before it goes live.",
        ],
      },
      {
        title: "Words that work harder",
        body: [
          "Your website copy has one of the most important jobs in your business: turning interest into action. We write clear, persuasive pages that explain what you do, why it matters and exactly what to do next. Beyond the website, regular blogs and articles answer your customers' real questions, build your authority and quietly bring in search traffic month after month — all written to read naturally and rank well.",
        ],
      },
      {
        title: "Show your story with photo & video",
        body: [
          "Some things are better shown than told. For businesses that want original visual content, we produce photography and video that showcase your products, your team and your premises authentically — content you can use across your website, social media and campaigns. We'll scope this around your location, needs and budget.",
        ],
      },
      {
        title: "A plan that compounds",
        body: [
          "Content works best when it's consistent. We help you build a practical content strategy — what to publish, where and when — and then keep it running so your library of useful, on-brand material grows over time. Many clients have us plan and produce a set number of pieces each month as part of an ongoing content or marketing programme.",
        ],
      },
    ],
    offerings: [
      { title: "Website Copywriting", body: "Clear, persuasive page copy that explains what you do and guides people to act." },
      { title: "Blog & Article Writing", body: "Regular, well-researched articles that answer your customers' questions and build authority." },
      { title: "SEO Content", body: "Content written to rank and to read, naturally optimised around the terms your customers search for." },
      { title: "Service Page Content", body: "Pages that sell, structured to convert visitors into enquiries." },
      { title: "Social Media Content", body: "Posts, captions and content calendars that keep your channels active and consistent." },
      { title: "Business Profile Content", body: "Polished profiles and listings that represent you well everywhere." },
      { title: "Photography & Video", body: "Original visual content that shows your real business at its best." },
      { title: "Content Strategy", body: "A practical plan for what to publish, where and when, so your content compounds." },
    ],
    pricingTitle: "How we price content",
    pricingNote:
      "Content needs vary hugely — a one-off set of website pages is very different from an ongoing monthly programme of blogs, social and video. So rather than list fixed prices, we scope content around what you actually need and agree a clear quote before we start. Most clients work with us either on a per-project basis or as a simple monthly content plan. Book a free call and we'll put together the right plan for you.",
    outcomes: [
      "A clear, consistent brand voice",
      "Content that supports SEO and sales",
      "A steady publishing rhythm without the stress",
      "Original media that reflects your real business",
      "Less time writing, more time running your business",
    ],
    faq: [
      { question: "Do you understand my industry?", answer: "We take time to learn your business, audience and tone before writing, and we refine based on your feedback. You always approve content before it goes live." },
      { question: "Can you manage our blog ongoing?", answer: "Yes. Many clients have us plan and produce a set number of pieces each month as part of a content or marketing plan." },
      { question: "Do you offer photography and video?", answer: "We do, for businesses that want original visual content. We'll scope this based on your location, needs and budget." },
      { question: "Will the content be good for SEO?", answer: "Yes — our content is written to read naturally for people and to be found by search engines, and it works hand-in-hand with our SEO service." },
      { question: "Can you refresh our existing content?", answer: "Absolutely. We can update, rewrite and repurpose what you already have so it keeps performing and stays accurate." },
    ],
    related: [
      { title: "Digital Marketing", href: "/digital-marketing" },
      { title: "Design", href: "/design" },
      { title: "Website & App", href: "/website-app" },
    ],
    ctaTitle: "Let's tell your story properly",
  },

  "hosting-website-care": {
    slug: "hosting-website-care",
    category: "Hosting & Website Care",
    icon: ServerCog,
    eyebrow: "Hosting & Website Care",
    heroHeadline: "Your website, online and looked after",
    heroSub:
      "A website isn't a launch-and-forget-it project. Once it's live it needs to stay fast, secure and up to date. Our hosting support and care plans take the technical worry off your plate — so you can focus on your business.",
    intro:
      "We provide managed hosting support and ongoing website care so your site keeps running beautifully long after launch. We handle updates, backups, security and monitoring, set up your domain, email and SSL, and we're a real team you can call when something needs changing or fixing. We present hosting as a support service — a dependable foundation under everything else we do.",
    sections: [
      {
        title: "Why website care matters",
        body: [
          "Website maintenance is one of those things that's easily overlooked but genuinely important. Ignore it and you risk security holes, broken features, slow pages and out-of-date information — all of which quietly cost you customers. A website that breaks isn't just an inconvenience; for the visitors who hit a faulty link or a frozen page, it becomes their entire impression of your business.",
          "Looking after a website isn't only about security updates, either. It's also about taking the hassle of routine changes off your hands — updating text, swapping images, adding pages and publishing blog posts — the time-consuming, fiddly jobs that always seem to slip down the to-do list. Our care plans cover all of it, so your site stays healthy and current without you having to think about it.",
        ],
      },
      {
        title: "Hosting made simple",
        body: [
          "Hosting your website doesn't need to be stressful or complicated. We arrange and manage reliable, secure, appropriately-sized hosting for your site and handle the technical setup — connecting your domain, setting up a professional business email on request, and configuring SSL so every page is secure. As your business grows, we can easily upgrade your plan to handle more traffic and storage.",
          "The point of hosting is simple: it keeps your website available to your customers 24/7, with built-in security and backups so your site can never simply vanish. We handle the lot, with minimal downtime and no control panels for you to wrestle with.",
        ],
      },
      {
        title: "What's included in a care plan",
        body: [
          "Our plans bundle the essentials into a simple monthly subscription: regular software, theme and plugin updates, security checks and monitoring, off-site backups, uptime monitoring and a set amount of development time each month for small edits and content changes. Higher tiers include more development time and faster, priority support. We'll recommend the right level for your site.",
        ],
      },
    ],
    offerings: [
      { title: "Managed Hosting Support", body: "We arrange and manage reliable hosting and handle the technical side for you." },
      { title: "Website Care Plans", body: "Updates, backups, security, monitoring and small edits in one simple monthly plan." },
      { title: "Domain Setup", body: "Register a new domain or connect an existing one, configured correctly first time." },
      { title: "Business Email Setup", body: "Professional mailboxes on your own domain, connected to your devices." },
      { title: "SSL Setup", body: "Secure every page of your site so visitors and search engines trust you." },
      { title: "Backups & Monitoring", body: "Automated off-site backups and monitoring so problems are prevented and quickly recovered." },
      { title: "Website Edits", body: "Small content and design changes, handled for you." },
      { title: "Technical Support", body: "A real person who already knows your site, when you need them." },
    ],
    packages: [
      { name: "Essential", bestFor: "Simple brochure sites", price: "£49 / month", specs: ["Software, theme & plugin updates", "Security checks & monitoring", "Weekly off-site backups", "Uptime monitoring"] },
      { name: "Growth", bestFor: "Most growing businesses", price: "£99 / month", popular: true, specs: ["Everything in Essential", "1 hour development / month", "Daily off-site backups", "Small content edits within hours"] },
      { name: "Premium", bestFor: "Busy & business-critical sites", price: "£179 / month", specs: ["Everything in Growth", "2 hours development / month", "Priority support", "Monthly check-in"] },
    ],
    packagesTitle: "Our website care packages",
    packagesSub: "Simple monthly plans that keep your site secure, current and online. Most growing businesses choose Growth.",
    packagesNote:
      "Managed Hosting is available from £180 / year and can be added to any care plan, or arranged on its own. Care plans run on a flexible 1-month rolling basis with 30 days' notice — no long contracts. Unused development hours can't be carried over; any extra hours are £70 (excl. VAT) per hour. " + VAT_NOTE,
    outcomes: [
      "A site that stays fast, secure and online",
      "No servers or technical jargon to deal with",
      "Backups and monitoring as standard",
      "Domain, email and SSL handled for you",
      "A real person to call when you need changes",
    ],
    faq: [
      { question: "What is website maintenance?", answer: "It's the ongoing work of keeping your website secure, up to date and performing well — updates, backups, monitoring and small content changes — so your site stays healthy and current." },
      { question: "Do you host the website yourselves?", answer: "We arrange and manage reliable, appropriate hosting on your behalf and handle the technical side, so you get the benefit of managed hosting without dealing with the infrastructure." },
      { question: "Am I tied into a contract?", answer: "No. Our plans run on a flexible 1-month rolling basis — we just ask for 30 days' notice from your billing date if you'd like to cancel." },
      { question: "What's included in the development hours?", answer: "They can be used for content updates such as text, images and blog posts, or building a new page. Hours can't be carried over, and any extra hours are billed at a reduced rate." },
      { question: "Can you look after a site you didn't build?", answer: "Often, yes. We'll review your current site and let you know what we can support and any improvements worth making first." },
      { question: "What security do you provide?", answer: "Regular security checks, updates, monitoring and off-site backups, plus SSL — and we stay informed about the latest threats to keep your site protected proactively." },
    ],
    related: [
      { title: "Website & App", href: "/website-app" },
      { title: "Business IT Support", href: "/business-it-support" },
      { title: "Design", href: "/design" },
    ],
    ctaTitle: "Your website called — it needs looking after",
  },

  "business-it-support": {
    slug: "business-it-support",
    category: "Business IT Support",
    icon: LifeBuoy,
    eyebrow: "Business IT Support",
    heroHeadline: "Friendly IT support for small businesses",
    heroSub:
      "Technology should help your business, not hold it back. We provide practical, jargon-free IT support — from email and devices to security and backups — so your day-to-day just works.",
    intro:
      "Not every business needs a full IT department, but everyone needs things to work. We help small businesses with the everyday technology that keeps you productive: email and Microsoft 365, setting up devices and accounts, sensible security, backups and straightforward advice when you're not sure what to do next.",
    sections: [
      {
        title: "Tech that just works",
        body: [
          "Not every business needs a full IT department, but everyone needs things to work. When email goes down, a laptop won't behave or a new starter needs setting up, you need a friendly, reliable team you can call — one that fixes the problem and explains it in plain English, without the jargon or the drama.",
          "We help small businesses with the everyday technology that keeps them productive: email and Microsoft 365 or Google Workspace, setting up devices and accounts securely, sensible everyday security, dependable backups and straightforward advice when you're not sure what to do next. Think of us as your outsourced IT team — there when you need us, invisible when you don't.",
        ],
      },
      {
        title: "Security and backups, sorted",
        body: [
          "Most everyday risk comes down to a few basics done well: strong passwords, multi-factor authentication, up-to-date devices and reliable backups. We put those foundations in place and keep them maintained, so a lost laptop, a dodgy email or a simple mistake doesn't turn into a disaster. If something does go wrong, your important files and accounts are backed up and recoverable.",
        ],
      },
      {
        title: "Advice that saves money",
        body: [
          "Technology should be an investment, not a money pit. We give honest, plain-English advice on the tools, subscriptions and systems your business actually needs — and the ones it doesn't. Often the most valuable thing we do is help you stop paying for things that don't help, and set up the things that do.",
        ],
      },
    ],
    offerings: [
      { title: "IT Helpdesk Support", body: "A friendly point of contact for everyday tech problems, by email, phone or remote session." },
      { title: "Email & Microsoft 365", body: "Set up, migrate and manage business email and Microsoft 365 or Google Workspace." },
      { title: "Device & Account Setup", body: "Get new starters and new equipment up and running quickly and securely." },
      { title: "Security Essentials", body: "Practical protection — passwords, MFA, updates and anti-malware — to reduce everyday risk." },
      { title: "Backup & Recovery", body: "Make sure your important files and accounts are backed up and recoverable." },
      { title: "Online Tools Setup", body: "The right tools, configured properly, so your team can work smoothly." },
      { title: "Website Troubleshooting", body: "When something on your site breaks, we'll find and fix it." },
      { title: "Tech Consulting", body: "Plain-English advice on tools, subscriptions and systems so you spend on what helps." },
    ],
    packages: [
      { name: "Pay-as-you-go", bestFor: "Occasional support", price: "from £65 / hour", specs: ["Friendly help when you need it", "Billed by the session", "Perfect for fixes & setup", "No commitment"] },
      { name: "Essential IT Care", bestFor: "Most small businesses", price: "from £99 / month", popular: true, specs: ["Ongoing helpdesk support", "Email & Microsoft 365 management", "Everyday security essentials", "Flexible monthly basis"] },
      { name: "Managed IT", bestFor: "Busier teams that depend on tech", price: "from £249 / month", specs: ["Priority helpdesk", "Proactive security & backups", "Device management", "Regular check-ins"] },
    ],
    packagesTitle: "Our IT support plans",
    packagesSub: "From occasional help to a fully outsourced IT department — pick the level of cover that suits your team.",
    packagesNote:
      "Plans run on a flexible monthly basis. " + VAT_NOTE,
    outcomes: [
      "Less time lost to tech problems",
      "Secure email, devices and accounts",
      "Backups so you never lose critical data",
      "A go-to team for questions and setup",
      "Advice that saves money, not just spends it",
    ],
    faq: [
      { question: "Do you offer ongoing support or one-off help?", answer: "Both. We can help with a specific setup or problem, or provide ongoing support on a simple monthly basis — whatever suits your business." },
      { question: "Can you support remote and hybrid teams?", answer: "Yes. Most of what we do can be handled remotely, and we can advise on tools that keep distributed teams secure and connected." },
      { question: "We're very small — is this overkill?", answer: "Not at all. We tailor support to your size and only recommend what genuinely helps. Even tiny businesses benefit from secure email and reliable backups." },
      { question: "How quickly do you respond?", answer: "Response times depend on your plan — Managed IT clients get priority — but we're known for being friendly, fast and human." },
      { question: "Can you work with our existing systems?", answer: "Almost always. We'll review what you have, keep what works and improve what doesn't." },
    ],
    related: [
      { title: "Hosting & Website Care", href: "/hosting-website-care" },
      { title: "Website & App", href: "/website-app" },
      { title: "Digital Marketing", href: "/digital-marketing" },
    ],
    ctaTitle: "Let's take the tech worry off your plate",
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_DETAILS);
