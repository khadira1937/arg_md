/**
 * DigiPlus Homepage Content & Data
 *
 * Single source of truth for all repeatable content on the new homepage.
 * Pulled from the DESIGN.md HTML export; structured for component reuse.
 */

export const homepage = {
  meta: {
    title: "DigiPlus | Your Vision, Our Digital Expertise",
    description: "Award-winning digital agency specializing in web design, corporate websites, and digital marketing.",
  },

  hero: {
    label: "Solution for your Digital Products",
    headline: "Your Vision, Our Digital Expertise",
    accentWord: "Future-Proof.",
    subheading:
      "An award-winning agency led by visionary CEO. Specializing in digital marketing design and website development understanding you.",
    phoneLabel: "Feel free to Contact with us",
    phoneNumber: "+012 345 6789",
    cta: "DISCOVER MORE",
  },

  services: [
    {
      id: 1,
      number: "01",
      title: "Website Design (UI/UX)",
      description: "Creating intuitive and visually stunning user experiences tailored to your brand identity.",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLtM0MEzzuWwo9YmwmcjOo-yVOseqVgJkdZm9mOLHfLsUg27Ib9bAQ5UFxnssdmtunPRP6qKQDGFD6ugipZKloK_3lM-iL77tFMfn7uigrDqU6zomeUZxrn91QMlR7nTZdf8K1l3ktZJFrysecqnSnWk0gImLV7F1Nk4axMcioABHC3858Q4ciC1-3JA3BUAIwp-5mLd1jecI3dMKezBNa76R0l5ytB5rTxGUmXJbS1yJBi312Hnrv6-Cg",
      link: "/services/web-design",
    },
    {
      id: 2,
      number: "02",
      title: "Corporate/Portfolio Websites",
      description: "High-performance corporate sites that establish authority and showcase your best work.",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLvRYERHaJJxexLmIAJbvAjIlHYRnQnW7YUV4VbD-_BT1SYe3HU--3-R2WZjAuxUFUaGdq2TJSiy1ZHSfx67d9o4fK48BB3kMMI2DoCDaW86KztfUVO6R91Q4ou0oHJ_q1juFk0Q77OPGW43Dalf_swwj3wrNbAehV0nGn0WglVTSm5uhp8ae-4n1yKUKrPtr-LCzig2kw-iP502Kkgfph2TPIJF-UjKGKENec0VoRXsh8DUj01rT-vjTJg",
      link: "/services/corporate-websites",
    },
    {
      id: 3,
      number: "03",
      title: "Maintenance & Support",
      description: "Reliable ongoing support to ensure your digital assets stay secure and peak-performing.",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLttccS3B3f4u-WjEG11wMD20jzUf8ok7VooWbt8mTW0Fcu9Tny-CmX-0alhTJ4hqZNiga39rUdKsVE37kR7s51apqmXDQ_GSDMrbZKyy8eLBZIqLQQY9rB5gWp7GMimIt0-d7bGZm0V1Bno6hcG-Wxbn3LZvTwQ-Qe9vDa6_Yj3n_4lZCQucDvghe_AQ82xG9FcazR8oyaPYmWYibPgr3Es_JJUqBMJwOZq9mpUIaSjQLM_VsAM0Kk-I0E",
      link: "/services/maintenance",
    },
  ],

  about: {
    label: "About Us",
    headline: "Welcome to Our Smart Digital Agency",
    description:
      "We provide a diverse array of systems, each tailored to streamline your operations and enhance productivity. Whether you require assistance with data process automation or any other specialized need.",
    features: [
      "Deliver Perfect Solution for business",
      "Readily Work With Global Brands solutions.",
      "Residential Business Installation",
    ],
    statLabel: "Digital Marketing",
    statValue: "85%",
    cta: "DISCOVER MORE",
    image: "https://lh3.googleusercontent.com/aida/AP1WRLt0ifUbiCA3rlCm5I2ztUf0yuiQXZFOtN04A_QVaFZK_EgYx2VxUWm7zr4NgQ7Gvz17G0cbx4_RjRXl9q0Msz_EKlVpOQjq8rr92fKnZGMc1d_38P4IwIQlCnuflHkpT7Lr3t2EpxKKQMhVbUHHybScNyyv0G4wFAoTVUrXzw719jXh_FT3lFn38nzgco8Cskdqu31Kc93VIWOThJeJooRsNUUw9kPQZx1qm7xkZB1ldx1Dc0QUhWPFRg",
    clientImage: "https://lh3.googleusercontent.com/aida/AP1WRLsBP2lAwEByKXFqCbrOZE11q35SGH0fUa73H-V_e42QhF0QqBGRBpdXJyNdGW_VkaD4xNiqRNGu2X0YdR081AUGCsl-4rOiD7V1ATPV6Vy5sMbLvjEYprWm5LTBBEpnYERqbv7DcXu8Plq9wIwfIRty6iM1UzgO6OeOPRWhE9M7NlkvHtDrA6CIpMUCChPUUGx1bdT55Fj9M9E07lSiAyhy8SQLhnlBJUu0OP44WtTrvCpnx3VOoPTBT7k",
    clientCount: "5000+",
  },

  stats: [
    { label: "Worldwide business Grow", value: "1M" },
    { label: "Best Business Awards", value: "52+", highlighted: true },
    { label: "Satisfied Clients", value: "6k+" },
  ],

  whyChoose: [
    {
      id: 1,
      icon: "trending_up",
      title: "Digital Growths",
      description: "Good knowledge because you done something many times.",
    },
    {
      id: 2,
      icon: "brush",
      title: "Website Design",
      description: "Good knowledge because you done something many times.",
    },
    {
      id: 3,
      icon: "code",
      title: "Expert Developers",
      description: "Good knowledge because you done something many times.",
    },
    {
      id: 4,
      icon: "support_agent",
      title: "Professional Experts",
      description: "Good knowledge because you done something many times.",
    },
  ],

  workShowcase: [
    {
      id: 1,
      category: "BRANDING",
      title: "Creative Branding Agency",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLtuuXl_DbhEqcjbgYK64khhN-0glBsqGa3nQgCtWXcaSgKM0P1L6omEWCwE_KNumAZR3Y6L5M7nyWmFDKwjGxjUAZ93ZvNCXrOy-nW13FCtr5nLaXfasESBuG6xXlNUa2NWFKZduMmPS-i47nW7RxUBqyE5o1lbbfw9BTE9j-7iwInPOnucaJ93RfhCD9Mub9jIMmNm_rrAJdOI9N1eepXC6dd56eFPHEb3Rd4OV2EAPg2HBimOmHC08m4",
      featured: true,
      rowSpan: 2,
      colSpan: 2,
    },
    {
      id: 2,
      category: "MARKETING",
      title: "SEO & Marketing Tools",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLsnRmpGD8RR1Aeow6Nquwt-qsK_Pbyea3dfoeNQs2fjD9C5u_qYLc0-Kmqq9Vh1uJIt_e3-EDOmpzT9PkWsA6pYNmN2b2gczNaClDp10hmWJu79XfMGVKV1JSBsijbAPbqMkbbfb_PtGqkcsLpBe2MwX50Mo1VcPh_8qpV2gRKgrBJml1wMWfpqA8py_LF02Mc_rhzEGGEQllmka_WL2UO6LVmYFROr4plQvmA4EEWFUrPTMqD7pUfRPhI",
      colSpan: 2,
    },
    {
      id: 3,
      title: "Content Strategy",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLucVXcq2Vc9vjgVJNl5_Jg79KSu31I6X1q21XCBHxfEHaBMKAkC7dU56itEPdZQFGpgRPWWwikq9IY0O9cop4YzBCC5koZZzzierIOrLIqqCtJtwSNTiA1PordxCzPWycclf035lbjqUEVXg5zXb14i2TMAD5s9UC4zcqpY40yKQLGZbaEcOJiCGqtsqwjS0vgOy96wunoeopvjzH1yPVEFFxVycOa0GZd3J7oAr4TFdjyQXzt5Gku8tqc",
    },
    {
      id: 4,
      title: "Video Production",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLtQIi8kst3xl7RCG8YdN9peeJxFb5akfWmfgEobUI5gruWzwcqYYlZ3F2lBtqlPmn8RypoQ7pH6zT2bVm8VUAoG-sO2cMXsElSEOUGCfaID7oMf_zzayhjW3D21-Xt9q2vPNhJEW4tjQcCdTcOF9E_xHOnzR3uVrsoSiTvX2v9BH2FNWzRd6_IMOdVir2kaZg8-duHbCg-CDontF_yrzZkdGZG9ofMXGHYVTba192cwvPKWWpb1dzw0xkc",
    },
  ],

  faqs: [
    {
      id: 1,
      question: "How Can Business Consulting Benefit My Company?",
      answer:
        "Nam egestas suscipit magna, vel ultricies massa laoreet at. This is Vivamus leo massa, porttitor non vulputate non, rhoncus sed ex. Vestibulum tempor leo at ipsum Nam egestas suscipit magna.",
      open: true,
    },
    {
      id: 2,
      question: "What Are the Costs of Your Consulting Services?",
      answer:
        "Pricing is tailored to project scope and goals. We provide transparent, value-driven quotes after an initial consultation session.",
    },
    {
      id: 3,
      question: "Do You Provide Remote Consulting Services?",
      answer:
        "Yes, we work with clients worldwide using advanced collaboration tools to ensure seamless project execution regardless of location.",
    },
  ],

  cta: {
    headline: "DigiPlus is ready to protect your Digital Agency",
    buttonText: "DISCOVER MORE",
  },

  contact: {
    label: "Contact us",
    headline: "Get in Touch",
    form: {
      placeholders: {
        name: "Your Name",
        email: "Your Email",
        subject: "Subject",
        message: "Your Message",
      },
      button: "SEND MESSAGE",
    },
    info: {
      headline: "Contact Info",
      items: [
        {
          icon: "location_on",
          label: "Address",
          value: "4517 Washington Ave. Newyork 39495",
        },
        {
          icon: "mail",
          label: "Mail Us",
          value: "support@digiplus.com",
        },
        {
          icon: "call",
          label: "Phone",
          value: "(123) 456-7890",
        },
      ],
    },
  },

  footer: {
    tagline:
      "Welcome to our web design agency. High-performance solutions tailored to transform your digital presence.",
    links: {
      Explore: [
        { title: "About", href: "/about" },
        { title: "Company", href: "/company" },
        { title: "Meet the Team", href: "/team" },
        { title: "News & Media", href: "/news" },
        { title: "Contact", href: "/contact" },
      ],
      Services: [
        { title: "Web Development", href: "/services/web-dev" },
        { title: "UI/UX Design", href: "/services/design" },
        { title: "Mobile Application", href: "/services/mobile" },
        { title: "Cloud Service", href: "/services/cloud" },
        { title: "Cyber Security", href: "/services/security" },
      ],
    },
    newsletter: {
      label: "Newsletter",
      description: "Subscribe to our newsletter for weekly updates.",
      placeholder: "Email Address",
    },
    copyright: "© 2024 DigiPlus Digital Agency. All rights reserved.",
    legal: [
      { title: "Cookies", href: "/cookies" },
      { title: "Privacy", href: "/privacy" },
      { title: "Terms", href: "/terms" },
    ],
  },
};

// Legacy Argana content below — kept for reference/migration
export const nav = {
  brand: "ARGANA MEDIA",
  links: [
    { label: "Solutions", href: "#solutions", hasMenu: true },
    { label: "Platform", href: "#platform", hasMenu: true },
    { label: "Customers", href: "#customers", hasMenu: true },
    { label: "Explore", href: "#explore", hasMenu: true },
    { label: "Pricing", href: "#pricing", hasMenu: false },
  ],
  login: { label: "Log in", href: "/login" },
  cta: { label: "Request a demo", href: "/contact" },
} as const;

export const hero = {
  eyebrow: "The agentic customer platform",
  heading: "Deploy AI with confidence across the customer lifecycle",
  body: "Argana Media provides B2B enterprises with forward-deployed software and services that deliver lifelong revenue growth.",
  cta: { label: "Request a demo", href: "/contact" },
  // Atmospheric workspace image. Sourced from Unsplash (free licence) so we
  // own the rights and don't hotlink Stitch's CDN.
  image: {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format&fit=crop",
    alt: "Modern office workspace seen through a glass partition, warm afternoon light",
  },
  cookies: {
    body: "We use cookies to improve your experience and for analytics. Learn more in our",
    policyLabel: "Cookie Policy",
    policyHref: "/cookies",
    manageLabel: "Manage Preferences",
    acceptLabel: "Accept Cookies",
  },
} as const;

export const trust = {
  eyebrow: "Trusted by leading companies worldwide",
  cta: { label: "Discover our impact", href: "/customers" },
  // Wordmark placeholders rendered as inline SVG so the section never depends
  // on a third-party logo CDN (the Stitch HTML hot-links AIDA URLs that 404).
  logos: [
    { name: "Northwind" },
    { name: "Stripe" },
    { name: "Matillion" },
    { name: "Vercel" },
    { name: "Linear" },
  ] as const,
};

export const services = {
  heading: "Drive real-world outcomes by automating commercial processes",
  body: "A comprehensive platform that empowers artificial and human intelligence to collaborate seamlessly across the entire marketing funnel.",
  cards: [
    {
      title: "Assemble your GTM under one roof",
      body: "Arm your go-to-market agents, teams and tools with rich context that turns post-sale truth into pre-sales intelligence.",
      mockup: "agent" as const,
    },
    {
      title: "Deploy agents with confidence",
      body: "Delegate processes to governed agents which execute with greater speed and precision than humanly possible.",
      mockup: "handover" as const,
    },
    {
      title: "Stay in the loop",
      body: "Give your team the capability to leverage, supervise and enhance organic search outputs at scale.",
      mockup: "notify" as const,
    },
  ],
} as const;

export const workflow = {
  eyebrow: "Platform",
  heading: "Deploy with confidence",
  body: "Argana Media is architected to equip agents and humans with everything they need to execute with clarity and control.",
  hubLabel: "Argana engine",
  nodes: ["Context", "Training", "Input", "Collaboration", "Agents", "Execution"] as const,
  contextBox: {
    label: "Context",
    body: "Argana constructs a comprehensive living model of your customers and commercial operations spanning traditional CRM data, rich time series data, SOPs and external telemetry.",
  },
} as const;

export const industries = [
  { label: "Service-Intensive Software", active: true },
  { label: "Security", active: false },
  { label: "IT Services", active: false },
  { label: "Healthcare & Life Sciences", active: false },
  { label: "Connected Businesses", active: false },
  { label: "Business Services", active: false },
] as const;

export const serviceIntensive = {
  heading: "Service-intensive software",
  body: "Continuously unlock the value your customers need. Argana is a system of action that empowers you to define and track customer objectives, identify value opportunities, run collaborative cross-functional workflows, and report on ROI.",
  testimonial: {
    quote:
      "We've grown from an initial base of 40 clients to just north of 280 clients that are managed digitally.",
    name: "William Riley",
    role: "Director of Digital Customer Success at Matillion",
    poster: {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80&auto=format&fit=crop",
      alt: "Team collaboration in a bright meeting room",
    },
  },
  reviews: [
    {
      quote: "A perfect fit for our company and how we want to support our clients",
      cite: "Casey, VP Strategic Initiatives",
    },
    {
      quote: "Amazing CSP for agile teams",
      cite: "Melanie, Global Customer Success Director",
    },
    {
      quote: "Unlocked levels of data visibility and automation I didn't think were possible in our environment.",
      cite: "Jarret, Senior Director of Customer Success Automation",
    },
    {
      quote: "Success for your customer success team",
      cite: "Brenda, Customer Success",
    },
  ],
} as const;

export const stats = {
  eyebrow: "Services",
  heading: ["Don't buy hypotheticals.", "Buy outcomes."],
  body: "Argana Media dispatches forward-deployed teams that work shoulder-to-shoulder with you to deliver real-world outcomes.",
  items: [
    { value: "34%", label: "More customers per CSM" },
    { value: "+300", label: "Hours saved annually per person" },
    { value: "900%", label: "Seat expansion" },
    { value: "21%", label: "Less churn" },
  ],
} as const;

export const footer = {
  columns: [
    {
      title: "Argana",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Contact", href: "/contact" },
        { label: "Legal", href: "/legal" },
        { label: "Security", href: "/security" },
      ],
    },
    {
      title: "Capabilities",
      links: [
        { label: "Data", href: "/capabilities/data" },
        { label: "Intelligence", href: "/capabilities/intelligence" },
        { label: "Collaboration", href: "/capabilities/collaboration" },
        { label: "Action", href: "/capabilities/action" },
        { label: "Governance", href: "/capabilities/governance" },
        { label: "Features", href: "/features" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Sales CRM Software", href: "/solutions/sales-crm" },
        { label: "Customer Success Platform", href: "/solutions/customer-success" },
        { label: "Professional Services Software", href: "/solutions/services" },
        { label: "Customer Success RFP Template", href: "/solutions/rfp" },
        { label: "AI Deployment", href: "/solutions/ai" },
        { label: "Argana 360", href: "/solutions/argana-360" },
        { label: "Processes", href: "/solutions/processes" },
      ],
    },
  ],
  recognized: {
    title: "Recognized as a world-leader by",
    rating: "800+ reviews",
    body: "Argana is built to keep your data safe. We put privacy and security front and centre, so you don't have to.",
    badges: ["ISO 27001", "SOC 2", "GDPR"],
  },
  newsletter: {
    title: "Newsletter",
    placeholder: "Email Address*",
    consent: "I agree to Argana processing my personal data in accordance with Privacy Policy.",
    submit: "Subscribe to our newsletter",
  },
  closer: "Know them. Grow them.",
  copyright: "© 2026 Argana Media Inc.",
  status: "Status",
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Brand Guidelines", href: "/brand" },
  ],
} as const;
