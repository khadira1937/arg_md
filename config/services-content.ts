import {
  Globe, Megaphone, Palette, PenLine, ServerCog, LifeBuoy,
  type LucideIcon,
} from "lucide-react";

export type ServiceOffering = { title: string; body: string };

export type ServiceDetail = {
  slug: string;
  category: string;
  icon: LucideIcon;
  eyebrow: string;
  heroHeadline: string;
  heroSub: string;
  intro: string;
  offerings: ServiceOffering[];
  outcomes: string[];
  faq: { question: string; answer: string }[];
  related: { title: string; href: string }[];
};

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "website-app": {
    slug: "website-app",
    category: "Website & App",
    icon: Globe,
    eyebrow: "Website & App",
    heroHeadline: "Websites & apps built to win you business",
    heroSub:
      "From a simple brochure site to a full online store or custom web app, we design and build fast, modern websites that look the part and turn visitors into customers.",
    intro:
      "Your website is often the first impression a customer has of your business. We make sure it's a great one — clean design, clear messaging and reliable technology, all built around your goals. Whether you're starting from scratch or replacing an ageing site, we handle the design, build, content and launch, then stay on to keep it running smoothly.",
    offerings: [
      { title: "Website Development", body: "Custom-built, mobile-friendly websites designed around your brand and your customers, with clear calls to action and solid foundations for SEO." },
      { title: "WordPress Websites", body: "Flexible WordPress sites you can edit yourself, with the training and care plan to keep everything secure and up to date." },
      { title: "E-commerce Stores", body: "Online stores on platforms like WooCommerce and Shopify — product pages, secure payments, shipping and the integrations you need to sell." },
      { title: "Landing Pages", body: "Focused, fast-loading pages built for a specific campaign, offer or audience, designed to convert clicks into enquiries." },
      { title: "Web Apps & Portals", body: "Custom tools, booking systems, dashboards and client portals when an off-the-shelf website isn't enough." },
      { title: "Website Migration", body: "Move to a new platform, host or design without losing your content, rankings or email — handled carefully, with backups." },
      { title: "Website Maintenance", body: "Ongoing edits, fixes and improvements so your site keeps pace with your business." },
      { title: "Speed & Performance", body: "Audits and optimisation to improve load times, Core Web Vitals and the experience on every device." },
    ],
    outcomes: [
      "A professional site that builds instant trust",
      "Clear structure that guides visitors to act",
      "Built-in SEO foundations from day one",
      "Easy to update — with our help or your own",
      "Looked after long-term with a care plan",
    ],
    faq: [
      { question: "How long does a website take?", answer: "A simple site typically takes 2–4 weeks; larger sites, stores and web apps take longer. We'll give you a realistic timeline in your proposal." },
      { question: "Will I be able to edit it myself?", answer: "Yes, where it makes sense. We build on editor-friendly platforms and provide training, and our care plans cover edits if you'd rather we handle them." },
      { question: "Do you write the content too?", answer: "We can. Our content team writes clear, on-brand copy, or we work with material you provide — whatever suits your budget and timeline." },
    ],
    related: [
      { title: "Design", href: "/design" },
      { title: "Digital Media & Content", href: "/digital-media-content" },
      { title: "Hosting & Website Care", href: "/hosting-website-care" },
    ],
  },

  "digital-marketing": {
    slug: "digital-marketing",
    category: "Digital Marketing",
    icon: Megaphone,
    eyebrow: "Digital Marketing",
    heroHeadline: "Get found, get clicks, get customers",
    heroSub:
      "We help your business show up where your customers are searching — and turn that attention into real enquiries and sales through SEO, content, social media and paid advertising.",
    intro:
      "Great marketing isn't about doing everything — it's about doing the right things consistently. We build a practical plan around your goals and budget, focus on the channels that work for your business, and report on what actually matters: visibility, enquiries and growth.",
    offerings: [
      { title: "SEO", body: "Technical, on-page and content SEO to help you rank for the terms your customers actually search for." },
      { title: "Local SEO", body: "Show up in your area with optimised local pages, citations and reviews that bring in nearby customers." },
      { title: "Google Business Profile", body: "Set up and optimise your Google Business Profile so you stand out on Maps and local search." },
      { title: "Content Marketing", body: "Helpful articles and resources that attract the right audience and build authority over time." },
      { title: "Social Media Marketing", body: "Consistent, on-brand social content and management that grows your audience and keeps you visible." },
      { title: "Email Marketing", body: "Newsletters and automated campaigns that nurture leads and bring customers back." },
      { title: "Paid Ads (Google & Meta)", body: "Targeted Google and Meta ad campaigns, set up and managed to make every pound work harder." },
      { title: "Lead Generation", body: "Landing pages, offers and funnels designed to capture and convert enquiries." },
    ],
    outcomes: [
      "More visibility on Google and social media",
      "A steady flow of qualified enquiries",
      "A clear plan instead of scattered tactics",
      "Honest reporting you can understand",
      "Marketing that grows with your business",
    ],
    faq: [
      { question: "How quickly will I see results?", answer: "Paid ads can drive traffic almost immediately; SEO and content build momentum over a few months. We set realistic expectations and focus on steady, lasting growth." },
      { question: "Do I have to commit long-term?", answer: "Our marketing plans are monthly and flexible. We earn your business each month rather than locking you into long contracts." },
      { question: "Can you work with my budget?", answer: "Yes. We'll recommend the highest-impact activities for your budget and scale up as results come in." },
    ],
    related: [
      { title: "Digital Media & Content", href: "/digital-media-content" },
      { title: "Design", href: "/design" },
      { title: "Website & App", href: "/website-app" },
    ],
  },

  "design": {
    slug: "design",
    category: "Design",
    icon: Palette,
    eyebrow: "Design",
    heroHeadline: "Design that makes you look the part",
    heroSub:
      "A strong, consistent brand earns trust before a word is read. We design identities, websites and marketing visuals that make your business look established, credible and unmistakably you.",
    intro:
      "Design is more than looking nice — it's how your business communicates quality and builds confidence. We create cohesive brand identities and visuals that work everywhere your customers see you, from your logo and website to your social posts and printed materials.",
    offerings: [
      { title: "Brand Identity", body: "A complete visual identity — colours, type, logo and guidelines — so everything you produce feels consistent and professional." },
      { title: "Logo Design", body: "Memorable, versatile logos that work across screens, print and signage in any size." },
      { title: "Web & UI/UX Design", body: "Clean, modern interface design focused on clarity and ease of use, so visitors find what they need and act." },
      { title: "Landing Page Design", body: "High-converting page designs built around a single goal, message and audience." },
      { title: "Social Media Graphics", body: "Scroll-stopping templates and post designs that keep your social presence sharp and on-brand." },
      { title: "Marketing & Print Graphics", body: "Brochures, flyers, signage and ad creative that carry your brand into the real world." },
      { title: "Presentation Design", body: "Polished pitch decks and presentations that help you win the room." },
    ],
    outcomes: [
      "A consistent, professional brand everywhere",
      "Instant credibility with new customers",
      "Designs that are easy to reuse and extend",
      "Clear brand guidelines for your team",
      "Visuals built to convert, not just decorate",
    ],
    faq: [
      { question: "Can you refresh my existing brand?", answer: "Definitely. We can evolve what you have while keeping the recognition you've built, or start fresh if that's the right call." },
      { question: "Will I own the files?", answer: "Yes. On completion you receive your final logo and brand assets in the formats you need, plus guidelines for using them." },
      { question: "Do you design for print as well as web?", answer: "We do — from business cards and signage to brochures and ad creative, all consistent with your brand." },
    ],
    related: [
      { title: "Website & App", href: "/website-app" },
      { title: "Digital Media & Content", href: "/digital-media-content" },
      { title: "Digital Marketing", href: "/digital-marketing" },
    ],
  },

  "digital-media-content": {
    slug: "digital-media-content",
    category: "Digital Media & Content",
    icon: PenLine,
    eyebrow: "Digital Media & Content",
    heroHeadline: "Words and media that tell your story",
    heroSub:
      "Clear, engaging content is what keeps people reading, watching and buying. We create the copy, articles, photography and video that bring your brand to life across your website and social channels.",
    intro:
      "Content connects your business to its audience. Whether it's the words on your homepage, a steady stream of helpful blog posts, or photo and video that show your work at its best, we produce content that's on-brand, written for real people and built to support your marketing and SEO.",
    offerings: [
      { title: "Website Copywriting", body: "Clear, persuasive page copy that explains what you do and why it matters — and gently guides people to act." },
      { title: "Blog & Article Writing", body: "Regular, well-researched articles that answer your customers' questions and build authority over time." },
      { title: "SEO Content", body: "Content written to rank and to read — naturally optimised around the terms your customers search for." },
      { title: "Social Media Content", body: "Posts, captions and content calendars that keep your channels active and consistent." },
      { title: "Photography & Video", body: "Original photo and video content that showcases your products, team and premises authentically." },
      { title: "Content Strategy", body: "A practical plan for what to publish, where and when — so your content compounds instead of fizzling out." },
      { title: "Content Refresh", body: "Update, rewrite and repurpose existing content so it keeps performing and stays accurate." },
    ],
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
    ],
    related: [
      { title: "Digital Marketing", href: "/digital-marketing" },
      { title: "Design", href: "/design" },
      { title: "Website & App", href: "/website-app" },
    ],
  },

  "hosting-website-care": {
    slug: "hosting-website-care",
    category: "Hosting & Website Care",
    icon: ServerCog,
    eyebrow: "Hosting & Website Care",
    heroHeadline: "Your website, online and looked after",
    heroSub:
      "Once your site is live, it needs to stay fast, secure and up to date. Our hosting support and care plans take the technical worry off your plate so you can focus on your business.",
    intro:
      "We provide managed hosting support and ongoing website care so your site keeps running beautifully long after launch. We handle updates, backups, security and monitoring, set up your domain, email and SSL, and we're a real team you can call when something needs changing or fixing. We present hosting as a support service — a dependable foundation under everything else we do.",
    offerings: [
      { title: "Managed Hosting Support", body: "We arrange and manage reliable hosting for your website and handle the technical setup, so you don't have to deal with servers or control panels." },
      { title: "Website Care Plans", body: "Regular software updates, off-site backups, uptime monitoring and small content edits, bundled into a simple monthly plan." },
      { title: "Domain Setup", body: "Register a new domain or connect an existing one, with DNS configured correctly the first time." },
      { title: "Business Email Setup", body: "Professional mailboxes on your own domain, set up and connected to your devices." },
      { title: "SSL Setup", body: "Secure every page with SSL so visitors and search engines trust your site." },
      { title: "Backups & Monitoring", body: "Automated backups and monitoring mean problems are prevented where possible and quickly recovered when they're not." },
    ],
    outcomes: [
      "A site that stays fast, secure and online",
      "No servers or technical jargon to deal with",
      "Backups and monitoring as standard",
      "Domain, email and SSL handled for you",
      "A real person to call when you need changes",
    ],
    faq: [
      { question: "Do you host the website yourselves?", answer: "We arrange and manage reliable, appropriate hosting on your behalf and handle the technical side. You get the benefit of managed hosting without dealing with the infrastructure." },
      { question: "What's included in a care plan?", answer: "Typically updates, backups, security checks, uptime monitoring and a set amount of small edits each month. We'll recommend the right level for your site." },
      { question: "Can you look after a site you didn't build?", answer: "Often, yes. We'll review your current site and let you know what we can support and any improvements worth making first." },
    ],
    related: [
      { title: "Website & App", href: "/website-app" },
      { title: "Business IT Support", href: "/business-it-support" },
      { title: "Design", href: "/design" },
    ],
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
    offerings: [
      { title: "IT Helpdesk Support", body: "A friendly point of contact for everyday tech problems, with help by email, phone or remote session." },
      { title: "Email & Microsoft 365", body: "Set up, migrate and manage business email and Microsoft 365 or Google Workspace, including users and permissions." },
      { title: "Device & Account Setup", body: "Get new starters and new equipment up and running quickly, configured securely and consistently." },
      { title: "Security Essentials", body: "Practical protection — strong passwords, multi-factor authentication, updates and anti-malware — to reduce everyday risk." },
      { title: "Backup & Recovery", body: "Make sure your important files and accounts are backed up and recoverable if something goes wrong." },
      { title: "Tech Consulting", body: "Plain-English advice on tools, subscriptions and systems so you spend on what helps and skip what doesn't." },
    ],
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
    ],
    related: [
      { title: "Hosting & Website Care", href: "/hosting-website-care" },
      { title: "Website & App", href: "/website-app" },
      { title: "Digital Marketing", href: "/digital-marketing" },
    ],
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_DETAILS);
