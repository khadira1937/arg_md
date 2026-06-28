"use client";

/**
 * ARGANA MEDIA — Landing Page
 * Premium dark digital-agency homepage. Self-contained client component.
 *
 * Drop-in: app/(public)/page.tsx renders <ArganaLanding />.
 * Requires: /public/hero_home1.5x.webp  (already in your project)
 * Fonts (Clash Display + General Sans) are loaded from Fontshare at runtime.
 *
 * Navbar, CTAs, cart, client portal and footer links are wired to the real
 * project routes (/services, /book-a-call, /contact, /cart, /dashboard, the
 * six service pages and the legal pages). The only in-page anchor kept is
 * "#top" (logo + Home → scroll back to the hero). The Services dropdown is a
 * dark mega-menu populated from the real service taxonomy (see config/nav.ts).
 */

import { useEffect, useRef } from "react";

// Every "Book a Call" CTA opens Calendly in a new tab (override with NEXT_PUBLIC_CALENDLY_URL).
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/mbenzakatako/30min";

/* ----------------------------- icons ----------------------------- */
const ICON: Record<string, string> = {
  globe: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  mega: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
  palette: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
  pen: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  server: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01M6 17h.01"/></svg>',
  life: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24m0-14.14-4.24 4.24m-5.66 5.66-4.24 4.24"/></svg>',
  users: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  badge: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>',
  heart: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 15 6 6"/></svg>',
  shield: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/><path d="m9 12 2 2 4-4"/></svg>',
  clock: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  msg: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>',
};

/* ----------------------------- data ----------------------------- */
// Services mega-menu — categories + sub-services wired to the real service
// routes (matches the project's existing two-pane mega menu in config/nav.ts).
const megaMenu: { title: string; href: string; icon: string; links: [string, string][] }[] = [
  { title: "Website & App", href: "/website-app", icon: ICON.globe, links: [
    ["Website Development", "/website-app#development"],
    ["WordPress Websites", "/website-app#wordpress"],
    ["E-commerce Stores", "/website-app#ecommerce"],
    ["Landing Pages", "/website-app#landing"],
    ["Website Maintenance", "/website-app#maintenance"],
  ] },
  { title: "Digital Marketing", href: "/digital-marketing", icon: ICON.mega, links: [
    ["SEO", "/digital-marketing#seo"],
    ["Local SEO", "/digital-marketing#local-seo"],
    ["Content Marketing", "/digital-marketing#content"],
    ["Social Media Marketing", "/digital-marketing#social"],
    ["Paid Ads (Google & Meta)", "/digital-marketing#ads"],
  ] },
  { title: "Design", href: "/design", icon: ICON.palette, links: [
    ["Brand Identity", "/design#brand"],
    ["Logo Design", "/design#logo"],
    ["Web & UI/UX Design", "/design#web-ui"],
    ["Landing Page Design", "/design#landing"],
    ["Social Media Graphics", "/design#social"],
  ] },
  { title: "Digital Media & Content", href: "/digital-media-content", icon: ICON.pen, links: [
    ["Website Copywriting", "/digital-media-content#copy"],
    ["Blog & Article Writing", "/digital-media-content#blog"],
    ["SEO Content", "/digital-media-content#seo-content"],
    ["Social Media Content", "/digital-media-content#social"],
    ["Content Strategy", "/digital-media-content#strategy"],
  ] },
  { title: "Hosting & Website Care", href: "/hosting-website-care", icon: ICON.server, links: [
    ["Managed Hosting Support", "/hosting-website-care#hosting"],
    ["Website Care Plans", "/hosting-website-care#care"],
    ["Domain Setup", "/hosting-website-care#domains"],
    ["Business Email Setup", "/hosting-website-care#email"],
    ["SSL Setup", "/hosting-website-care#ssl"],
  ] },
  { title: "Business IT Support", href: "/business-it-support", icon: ICON.life, links: [
    ["IT Helpdesk Support", "/business-it-support#helpdesk"],
    ["Email & Microsoft 365", "/business-it-support#email"],
    ["Device & Account Setup", "/business-it-support#setup"],
    ["Security Essentials", "/business-it-support#security"],
    ["Backup & Recovery", "/business-it-support#backup"],
  ] },
];

const serviceGroups = [
  { title: "Website & App", icon: ICON.globe, color: "#35E0E8", tint: "rgba(53,224,232,0.12)",
    blurb: "Fast, modern websites, online stores and web apps designed to turn visitors into customers.",
    items: ["Website Development", "Web Design", "WordPress Websites", "Landing Pages", "E-commerce Websites", "Website Maintenance", "Hosting & Website Care", "Domain & Email Setup"] },
  { title: "Marketing", icon: ICON.mega, color: "#7CC6F0", tint: "rgba(124,198,240,0.12)",
    blurb: "Get found where your customers are searching, and turn that attention into real enquiries.",
    items: ["SEO", "Local SEO", "Content Marketing", "Social Media Marketing", "Google Business Profile", "Email Marketing", "Digital PR", "Campaign Planning", "Lead Generation"] },
  { title: "Design", icon: ICON.palette, color: "#F3CD86", tint: "rgba(243,205,134,0.12)",
    blurb: "Brand identity and visuals that make your business look established, credible and unmistakably you.",
    items: ["UI/UX Design", "Landing Page Design", "Brand Identity", "Logo Design", "Social Media Graphics", "Marketing Graphics", "Website Visuals"] },
  { title: "Content", icon: ICON.pen, color: "#34D399", tint: "rgba(52,211,153,0.12)",
    blurb: "Copy, articles and media that tell your story clearly and keep people reading, watching and buying.",
    items: ["Website Copywriting", "Blog Writing", "Service Page Content", "Social Media Content", "Business Profile Content", "Content Strategy", "SEO Content Support"] },
];

const heroCaps = ["Content", "Marketing", "Websites", "Design", "Hosting", "IT Support"];

const whyUs = [
  { icon: ICON.users, title: "One team, everything covered", body: "Marketing, content, design, websites and support under one roof — no juggling multiple freelancers." },
  { icon: ICON.badge, title: "Clear, fixed quotes", body: "You always know what you're paying and what you're getting before any work begins." },
  { icon: ICON.heart, title: "We stay with you", body: "We don't disappear after launch — care plans and support keep your presence healthy long term." },
  { icon: ICON.shield, title: "A registered UK company", body: "ARGANA MEDIA is a real, registered UK business you can rely on for the long term." },
  { icon: ICON.clock, title: "Responsive & reliable", body: "Friendly people who reply, keep their word and hit the timelines we agree together." },
  { icon: ICON.msg, title: "Plain-English advice", body: "We explain the why behind every recommendation so you can make confident decisions." },
];

const processSteps = [
  { n: "01", title: "Book a call", body: "Start with a free, no-pressure call. We get to know your business and what you want to achieve online." },
  { n: "02", title: "Tell us about your business", body: "Share your goals, audience and any existing website or brand. The more we know, the sharper the plan." },
  { n: "03", title: "Receive a clear proposal", body: "You get a written proposal with scope, timeline and a fixed quote — in plain English, no surprises." },
  { n: "04", title: "We create, build & improve", body: "Our team designs, writes, builds and sets everything up — keeping you in the loop at every stage." },
  { n: "05", title: "Manage it all in your portal", body: "Track projects, invoices, requests and support tickets in your client portal, long after launch." },
];

const packages = [
  { name: "Digital Presence", price: "from £750", period: "project", popular: false, accent: "#35E0E8",
    bestFor: "New & small businesses getting online", cta: "Request a Quote",
    specs: ["Professional multi-page website", "Mobile-friendly, fast design", "Contact form & basic SEO", "Connected to your domain"] },
  { name: "Website & Content", price: "from £1,800", period: "project", popular: true, accent: "#F3CD86",
    bestFor: "Growing businesses that want it done properly", cta: "Start a Project",
    specs: ["Custom design & copywriting", "Up to ~12 pages of content", "On-page SEO setup", "Care plan ready from launch"] },
  { name: "Digital Growth Support", price: "from £900", period: "month", popular: false, accent: "#7CC6F0",
    bestFor: "Brands ready to grow their reach", cta: "Book a Call",
    specs: ["SEO & content marketing", "Social media management", "Email campaigns", "Monthly strategy call & reporting"] },
  { name: "Website Care & Hosting", price: "from £49", period: "month", popular: false, accent: "#34D399",
    bestFor: "Keeping your site fast, secure & online", cta: "Request a Quote",
    specs: ["Managed hosting support", "Updates, backups & SSL", "Uptime monitoring", "Small edits included"] },
  { name: "Custom Project", price: "Let's talk", period: "", popular: false, accent: "#C9B6F0",
    bestFor: "Web apps, portals & bespoke scope", cta: "Book a Call",
    specs: ["Discovery & scoping workshop", "Tailored design & build", "Integrations & automation", "Ongoing partnership"] },
];

const careFeatures = [
  { icon: ICON.server, title: "Managed hosting support", body: "We handle the technical side of getting your site online and keeping it fast and stable." },
  { icon: ICON.shield, title: "Security & SSL", body: "Free SSL, sensible security settings and monitoring so every page stays protected." },
  { icon: ICON.clock, title: "Updates & backups", body: "Regular updates and off-site backups mean issues are prevented — and quickly recovered." },
  { icon: ICON.life, title: "A real person to call", body: "When something needs changing or fixing, you have a team who already knows your site." },
];

const portfolio = [
  { label: "Brand Website", cat: "Website & Design", body: "A custom multi-page site with brand identity, copy and on-page SEO, built to convert.", g: "linear-gradient(135deg,#0E2233,#123B4A 60%,#1C5563)", img: "/service_brand_website.png" },
  { label: "Content Campaign", cat: "Digital Media & Content", body: "A planned run of articles, social content and visuals that build authority over time.", g: "linear-gradient(135deg,#241B0E,#3A2C12 60%,#5A4520)", img: "/service_digital_media.png" },
  { label: "Local SEO Project", cat: "Digital Marketing", body: "Local pages, Google Business Profile and citations to win nearby customer searches.", g: "linear-gradient(135deg,#0E2A22,#103A2C 60%,#1A5141)", img: "/service_digital_marketing.png" },
  { label: "Website Care Setup", cat: "Hosting & Website Care", body: "Hosting, SSL, backups and monitoring configured for reliable, worry-free uptime.", g: "linear-gradient(135deg,#161B2E,#1E2647 60%,#2B3566)", img: "/service_hosting_care.png" },
];

const footerServices: [string, string][] = [
  ["Digital Media & Content", "/digital-media-content"],
  ["Digital Marketing", "/digital-marketing"],
  ["Website & App", "/website-app"],
  ["Design", "/design"],
  ["Hosting & Website Care", "/hosting-website-care"],
  ["Business IT Support", "/business-it-support"],
];
const footerCompany: [string, string][] = [
  ["About", "/about"],
  ["What We Build", "/what-we-build"],
  ["Knowledge Hub", "/knowledge-hub"],
  ["Case Studies", "/case-studies"],
  ["Contact", "/contact"],
  ["Book a Call", "/book-a-call"],
  ["Client Portal", "/dashboard"],
];
const footerLegal: [string, string][] = [
  ["Terms & Conditions", "/terms"],
  ["Privacy Policy", "/privacy"],
  ["Cookie Policy", "/cookie-policy"],
  ["Refund Policy", "/refund-policy"],
  ["Acceptable Use Policy", "/acceptable-use-policy"],
];

/* ----------------------------- css ----------------------------- */
const CSS = `
  .am-root *, .am-root *::before, .am-root *::after { box-sizing: border-box; }
  .am-root { background:#070B14; color:#EEF2F9; font-family:"General Sans", system-ui, sans-serif; -webkit-font-smoothing:antialiased; position:relative; width:100%; overflow-x:hidden; }
  .am-root ::selection { background: rgba(243,205,134,0.28); color:#fff; }
  @keyframes am-aurora { 0%,100% { transform: translate3d(0,0,0) scale(1); opacity:.75; } 50% { transform: translate3d(4%,-3%,0) scale(1.12); opacity:1; } }
  @keyframes am-pulse { 0%,100% { transform: scale(1); opacity:.9; } 50% { transform: scale(1.06); opacity:1; } }
  .am-link { position: relative; }
  .am-link::after { content:""; position:absolute; left:0; right:100%; bottom:-4px; height:1.5px; background:linear-gradient(90deg,#35E0E8,#F3CD86); transition:right .32s cubic-bezier(.4,0,.2,1); }
  .am-link:hover::after { right:0; }
  .am-dd { opacity:0; visibility:hidden; transform:translateY(8px); transition:opacity .22s ease, transform .22s ease, visibility .22s; }
  .am-dd-wrap:hover .am-dd { opacity:1; visibility:visible; transform:translateY(0); }
  .am-card-svc { transition: transform .4s cubic-bezier(.22,1,.36,1), border-color .4s, background .4s; }
  .am-card-svc:hover { transform: translateY(-6px); border-color: rgba(243,205,134,0.45) !important; background: rgba(255,255,255,0.05) !important; }
  .am-sub:hover { color:#EEF2F9 !important; border-color: rgba(53,224,232,0.5) !important; background: rgba(53,224,232,0.08) !important; }
  .am-pkg { transition: transform .4s cubic-bezier(.22,1,.36,1), border-color .4s, box-shadow .4s; }
  .am-pkg:hover { transform: translateY(-8px); border-color: rgba(255,255,255,0.18) !important; box-shadow: 0 30px 70px -30px rgba(0,0,0,.8); }
  .am-btn-gold:hover { box-shadow: 0 12px 40px -8px rgba(243,205,134,.5); transform: translateY(-2px); }
  .am-btn-ghost:hover { background: rgba(255,255,255,.07) !important; border-color: rgba(255,255,255,.28) !important; }
  .am-port:hover .am-port-img { transform: scale(1.06); }
  .am-port:hover .am-port-arrow { transform: translate(4px,-4px); opacity:1; }
  .am-why-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
  @media (max-width: 900px) { .am-why-cards { grid-template-columns:repeat(2,1fr); } }
  @media (max-width: 560px) { .am-why-cards { grid-template-columns:1fr; } }
  @media (max-width: 980px) {
    .am-root [data-desktopnav] { display: none !important; }
    .am-root [data-burger] { display: inline-flex !important; }
  }
  /* Services two-pane → single column on tablet & mobile */
  @media (max-width: 900px) {
    .am-svc-grid { grid-template-columns: 1fr !important; }
  }
  /* Tablet nav spacing */
  @media (max-width: 980px) {
    #am-nav nav { padding-top: 15px !important; padding-bottom: 15px !important; }
  }
  /* Phones: tighten hero, sections & nav so everything fits and looks intentional */
  @media (max-width: 640px) {
    .am-root [data-herofloor] { opacity: .42 !important; bottom: -50% !important; width: 172vw !important; }
    .am-hero { padding: 108px 18px 50px !important; min-height: auto !important; }
    .am-root #services, .am-root #process, .am-root #packages,
    .am-root #portal, .am-root #contact { padding-left: 18px !important; padding-right: 18px !important; }
    #am-nav nav { padding: 14px 18px !important; gap: 14px !important; }
  }
  @media (max-width: 430px) {
    .am-nav-cta { display: none !important; }
    .am-hero { padding-top: 98px !important; }
  }
  /* Footer: brand on the left, then Services / Company / Legal columns to its
     right (mirrors the rest of the site's footer placement). */
  .am-foot-grid { display:grid; grid-template-columns:1.8fr 1fr 1fr 1fr; gap:48px 32px; }
  .am-foot-brand { max-width:340px; }
  @media (max-width: 860px) {
    .am-foot-grid { grid-template-columns:1fr 1fr; }
    .am-foot-brand { grid-column:1 / -1; }
  }
  @media (max-width: 520px) {
    .am-foot-grid { grid-template-columns:1fr; }
  }
`;

/* ----------------------------- builders ----------------------------- */
function groupButtonHTML(g: typeof serviceGroups[number], i: number, active: boolean) {
  const border = active ? "rgba(243,205,134,0.45)" : "rgba(255,255,255,0.08)";
  const bg = active ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)";
  const arrow = active ? "#F3CD86" : "#7E8AA3";
  return `<button data-group="${i}" style="text-align:left; cursor:pointer; display:flex; align-items:center; gap:14px; padding:20px 20px; border-radius:16px; border:1px solid ${border}; background:${bg}; transition:.3s;">
    <span style="display:grid; place-items:center; width:42px; height:42px; border-radius:12px; background:rgba(255,255,255,0.05); color:${g.color}; flex-shrink:0;">${g.icon}</span>
    <span style="font-family:'Clash Display'; font-weight:500; font-size:19px; color:#EEF2F9;">${g.title}</span>
    <span style="margin-left:auto; color:${arrow};"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></span>
  </button>`;
}
function groupNavHTML(active: number) {
  return serviceGroups.map((g, i) => groupButtonHTML(g, i, i === active)).join("");
}
function detailHTML(g: typeof serviceGroups[number]) {
  return `<div style="position:absolute; top:-40px; right:-40px; width:240px; height:240px; border-radius:50%; background:radial-gradient(circle, ${g.tint}, transparent 70%); pointer-events:none;"></div>
    <div style="position:relative;">
      <div style="display:flex; align-items:center; gap:14px;">
        <span style="display:grid; place-items:center; width:54px; height:54px; border-radius:15px; background:${g.tint}; color:${g.color};">${g.icon}</span>
        <h3 style="font-family:'Clash Display'; font-weight:600; font-size:clamp(24px,3vw,34px); margin:0; color:#F4F7FC;">${g.title}</h3>
      </div>
      <p style="margin:18px 0 26px; font-size:16px; line-height:1.6; color:#A7B0C2; max-width:520px;">${g.blurb}</p>
      <div style="display:flex; flex-wrap:wrap; gap:10px;">
        ${g.items.map((it) => `<span class="am-sub" style="display:inline-flex; align-items:center; gap:8px; padding:9px 15px; border-radius:100px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.02); color:#C7CEDC; font-size:13.5px; font-weight:500; transition:.25s; cursor:default;"><span style="width:5px; height:5px; border-radius:50%; background:${g.color};"></span>${it}</span>`).join("")}
      </div>
      <a href="/contact" style="display:inline-flex; align-items:center; gap:8px; margin-top:30px; text-decoration:none; color:#070B14; font-weight:600; font-size:14px; padding:12px 22px; border-radius:11px; background:linear-gradient(135deg,#F6D79A,#E3A94E);" class="am-btn-gold">Discuss your project<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
    </div>`;
}
const domainNoResult = `<div style="margin-top:20px; display:flex; align-items:center; gap:10px; padding:14px 16px; border-radius:13px; border:1px dashed rgba(255,255,255,0.12); background:rgba(255,255,255,0.015);">
  <span style="color:#7E8AA3;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></span>
  <span style="font-size:13px; color:#8A93A6;">Already have a domain? We'll connect it and set up business email + SSL for you.</span>
</div>`;
// Loading + error states for the live domain search (same visual language as
// the result rows; the dot reuses the existing am-pulse keyframe).
const domainLoadingHTML = `<div style="margin-top:22px; display:flex; align-items:center; gap:10px; padding:14px 16px; border-radius:13px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.025);">
  <span style="width:8px; height:8px; border-radius:50%; background:#35E0E8; animation:am-pulse 1s ease-in-out infinite;"></span>
  <span style="font-size:13px; color:#8A93A6;">Checking availability…</span>
</div>`;
function domainErrorHTML(msg: string) {
  return `<div style="margin-top:22px; display:flex; align-items:center; gap:10px; padding:14px 16px; border-radius:13px; border:1px solid rgba(224,138,138,0.3); background:rgba(224,138,138,0.08);">
    <span style="color:#E08A8A;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg></span>
    <span style="font-size:13px; color:#E08A8A;">${msg}</span>
  </div>`;
}
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] ?? c));
}
// Renders the real results from /api/domains/search using the exact same row
// design as before (only the data source changed: fake → live API).
function domainResultsHTML(results: { domain: string; available: boolean }[]) {
  if (!results.length) {
    return `<div style="margin-top:22px; display:flex; align-items:center; gap:10px; padding:14px 16px; border-radius:13px; border:1px dashed rgba(255,255,255,0.12); background:rgba(255,255,255,0.015);"><span style="font-size:13px; color:#8A93A6;">No results — try another name.</span></div>`;
  }
  const rowHTML = results.map((r) => {
    const label = r.available ? "Available" : "Taken";
    const color = r.available ? "#34D399" : "#E08A8A";
    const bg = r.available ? "rgba(52,211,153,0.12)" : "rgba(224,138,138,0.12)";
    return `<div style="display:flex; align-items:center; gap:12px; padding:14px 16px; border-radius:13px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.025);">
      <span style="font-family:'General Sans'; font-weight:600; font-size:15px; color:#EEF2F9;">${escapeHtml(r.domain)}</span>
      <span style="margin-left:auto; display:inline-flex; align-items:center; gap:6px; font-size:12px; font-weight:600; padding:5px 11px; border-radius:100px; color:${color}; background:${bg};"><span style="width:6px; height:6px; border-radius:50%; background:currentColor;"></span>${label}</span>
    </div>`;
  }).join("");
  return `<div style="margin-top:22px; display:flex; flex-direction:column; gap:10px;">${rowHTML}<a href="/contact" style="margin-top:6px; text-align:center; text-decoration:none; font-size:13.5px; font-weight:600; color:#35E0E8;">Ask us to set this up →</a></div>`;
}

/* full page markup (built once) */
function pageHTML() {
  const year = new Date().getFullYear();
  return `
<!-- NAVBAR -->
<header id="am-nav" style="position:fixed; top:0; left:0; right:0; z-index:60; transition:background .35s ease, border-color .35s ease, backdrop-filter .35s; border-bottom:1px solid transparent;">
  <nav style="max-width:1280px; margin:0 auto; padding:18px 28px; display:flex; align-items:center; justify-content:space-between; gap:24px;">
    <a href="#top" style="display:flex; align-items:center; gap:11px; text-decoration:none; flex-shrink:0;">
      <img src="/argana_media_logo_concept_2.png" alt="ARGANA MEDIA" width="38" height="38" style="display:block; flex-shrink:0; object-fit:contain;" />
      <span style="font-family:'Clash Display'; font-weight:600; font-size:18px; letter-spacing:.14em; color:#F4F7FC;">ARGANA<span style="color:#8A93A6; font-weight:500;"> MEDIA</span></span>
    </a>
    <div data-desktopnav="1" style="display:flex; align-items:center; gap:30px;">
      <a href="#top" class="am-link" style="text-decoration:none; color:#C7CEDC; font-size:14.5px; font-weight:500;">Home</a>
      <a href="/about" class="am-link" style="text-decoration:none; color:#C7CEDC; font-size:14.5px; font-weight:500;">About</a>
      <div class="am-dd-wrap" style="position:relative;">
        <a href="/services" class="am-link" style="text-decoration:none; color:#C7CEDC; font-size:14.5px; font-weight:500; display:inline-flex; align-items:center; gap:5px;">Services<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg></a>
        <div class="am-dd" style="position:absolute; top:100%; left:50%; transform:translateX(-50%); padding-top:18px;">
          <div style="width:min(780px,94vw); background:rgba(13,18,30,0.94); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.09); border-radius:18px; padding:20px; box-shadow:0 30px 70px -24px rgba(0,0,0,.85);">
            <div style="display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:8px 24px;">
              ${megaMenu.map((c) => `<div style="padding:6px;">
                <a href="${c.href}" style="display:flex; align-items:center; gap:9px; text-decoration:none; margin-bottom:9px;" onmouseover="this.querySelector('[data-mm-title]').style.color='#fff'" onmouseout="this.querySelector('[data-mm-title]').style.color='#EEF2F9'">
                  <span style="display:grid; place-items:center; width:30px; height:30px; border-radius:9px; background:rgba(53,224,232,0.1); color:#35E0E8; flex-shrink:0;">${c.icon}</span>
                  <span data-mm-title style="color:#EEF2F9; font-size:14px; font-weight:600; font-family:'Clash Display'; transition:color .2s;">${c.title}</span>
                </a>
                <div style="display:flex; flex-direction:column;">
                  ${c.links.map((l) => `<a href="${l[1]}" style="display:block; padding:5px 9px; border-radius:8px; text-decoration:none; color:#9AA4B8; font-size:12.7px; transition:background .2s, color .2s;" onmouseover="this.style.background='rgba(255,255,255,.05)';this.style.color='#EEF2F9'" onmouseout="this.style.background='transparent';this.style.color='#9AA4B8'">${l[0]}</a>`).join("")}
                </div>
              </div>`).join("")}
            </div>
            <div style="margin-top:16px; padding-top:16px; border-top:1px solid rgba(255,255,255,0.07); display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
              <span style="font-size:12.5px; color:#7E8AA3;">Not sure where to start? Book a free, no-pressure call.</span>
              <a href="${CALENDLY}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:7px; text-decoration:none; color:#0A0E18; font-size:13px; font-weight:600; padding:9px 16px; border-radius:10px; background:linear-gradient(135deg,#F6D79A,#E3A94E); white-space:nowrap;">Book a Call<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
            </div>
          </div>
        </div>
      </div>
      <a href="/what-we-build" class="am-link" style="text-decoration:none; color:#C7CEDC; font-size:14.5px; font-weight:500;">What We Build</a>
      <div class="am-dd-wrap" style="position:relative;">
        <a href="/knowledge-hub" class="am-link" style="text-decoration:none; color:#C7CEDC; font-size:14.5px; font-weight:500; display:inline-flex; align-items:center; gap:5px;">Knowledge Hub<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg></a>
        <div class="am-dd" style="position:absolute; top:100%; right:0; padding-top:18px;">
          <div style="width:320px; background:rgba(13,18,30,0.94); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.09); border-radius:18px; padding:10px; box-shadow:0 30px 70px -24px rgba(0,0,0,.85);">
            ${[["Insights", "/knowledge-hub", "Articles & analysis", '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>'], ["Case Studies", "/case-studies", "Real project write-ups", '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/>'], ["Categories", "/knowledge-hub#categories", "Browse by topic", '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>'], ["Guides", "/knowledge-hub#guides", "In-depth walkthroughs", '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>'], ["Search", "/knowledge-hub/search", "Find a resource", '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>']].map((it) => `<a href="${it[1]}" style="display:flex; gap:12px; align-items:center; padding:11px 12px; border-radius:12px; text-decoration:none;" onmouseover="this.style.background='rgba(255,255,255,.05)'" onmouseout="this.style.background='transparent'"><span style="display:grid; place-items:center; width:36px; height:36px; border-radius:10px; background:rgba(53,224,232,0.1); color:#35E0E8; flex-shrink:0;"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${it[3]}</svg></span><span style="display:flex; flex-direction:column;"><span style="color:#EEF2F9; font-size:14px; font-weight:600; font-family:'Clash Display';">${it[0]}</span><span style="color:#8A93A6; font-size:12px;">${it[2]}</span></span></a>`).join("")}
          </div>
        </div>
      </div>
      <a href="/contact" class="am-link" style="text-decoration:none; color:#C7CEDC; font-size:14.5px; font-weight:500;">Contact</a>
    </div>
    <div style="display:flex; align-items:center; gap:14px; flex-shrink:0;">
      <a href="/cart" aria-label="Cart" data-desktopnav="1" style="position:relative; background:transparent; border:none; color:#C7CEDC; cursor:pointer; padding:6px; display:grid; place-items:center; text-decoration:none;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#C7CEDC'"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg></a>
      <a href="/dashboard" data-desktopnav="1" style="display:inline-flex; align-items:center; gap:7px; text-decoration:none; color:#C7CEDC; font-size:13.5px; font-weight:500; padding:8px 14px; border:1px solid rgba(255,255,255,0.12); border-radius:10px; transition:.25s;" onmouseover="this.style.borderColor='rgba(255,255,255,.28)';this.style.color='#fff'" onmouseout="this.style.borderColor='rgba(255,255,255,.12)';this.style.color='#C7CEDC'"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>Client Portal</a>
      <a href="${CALENDLY}" target="_blank" rel="noopener noreferrer" class="am-btn-gold am-nav-cta" style="display:inline-flex; align-items:center; gap:7px; text-decoration:none; color:#0A0E18; font-size:13.5px; font-weight:600; padding:10px 18px; border-radius:10px; background:linear-gradient(135deg,#F6D79A,#E3A94E); transition:.3s;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.05 2a9 9 0 0 1 8 7.94M14.05 6A5 5 0 0 1 18 10M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>Book a Call</a>
      <button data-burger="1" aria-label="Menu" style="display:none; background:transparent; border:1px solid rgba(255,255,255,0.14); border-radius:10px; width:42px; height:42px; cursor:pointer; flex-direction:column; align-items:center; justify-content:center; gap:5px; padding:0;">
        <span style="display:block; width:18px; height:2px; background:#EEF2F9; border-radius:2px;"></span>
        <span style="display:block; width:18px; height:2px; background:#EEF2F9; border-radius:2px;"></span>
        <span style="display:block; width:18px; height:2px; background:#EEF2F9; border-radius:2px;"></span>
      </button>
    </div>
  </nav>
</header>

<!-- MOBILE PANEL -->
<div id="am-mobile" style="position:fixed; inset:0; z-index:55; background:rgba(7,11,20,0.97); backdrop-filter:blur(18px); padding:96px 28px 40px; display:none; flex-direction:column; gap:6px;">
  ${[["Home", "#top"], ["About", "/about"], ["Services", "/services"], ["What We Build", "/what-we-build"], ["Knowledge Hub", "/knowledge-hub"], ["Case Studies", "/case-studies"], ["Contact", "/contact"]].map(([t, h]) => `<a href="${h}" data-close="1" style="text-decoration:none; color:#EEF2F9; font-family:'Clash Display'; font-weight:500; font-size:24px; padding:12px 0; border-bottom:1px solid rgba(255,255,255,.07);">${t}</a>`).join("")}
  <div style="display:flex; gap:12px; margin-top:22px;">
    <a href="/dashboard" data-close="1" style="flex:1; text-align:center; text-decoration:none; color:#EEF2F9; font-weight:600; padding:14px; border:1px solid rgba(255,255,255,.16); border-radius:12px;">Client Portal</a>
    <a href="${CALENDLY}" target="_blank" rel="noopener noreferrer" data-close="1" style="flex:1; text-align:center; text-decoration:none; color:#0A0E18; font-weight:600; padding:14px; border-radius:12px; background:linear-gradient(135deg,#F6D79A,#E3A94E);">Book a Call</a>
  </div>
</div>

<!-- HERO -->
<section id="top" class="am-hero" style="position:relative; min-height:100svh; display:flex; flex-direction:column; align-items:center; justify-content:flex-start; padding:130px 24px 60px; text-align:center; isolation:isolate;">
  <canvas id="am-canvas" style="position:absolute; inset:0; width:100%; height:100%; z-index:0;"></canvas>
  <div style="position:absolute; z-index:1; top:8%; left:50%; transform:translateX(-50%); width:min(900px,92vw); height:520px; background:radial-gradient(ellipse at center, rgba(53,224,232,0.16), transparent 62%); animation:am-aurora 14s ease-in-out infinite; pointer-events:none;"></div>
  <div style="position:absolute; z-index:1; bottom:2%; left:50%; transform:translateX(-50%); width:min(720px,86vw); height:420px; background:radial-gradient(ellipse at center, rgba(243,205,134,0.18), transparent 60%); animation:am-aurora 17s ease-in-out infinite reverse; pointer-events:none;"></div>
  <div data-herofloor="1" style="position:absolute; z-index:2; left:50%; bottom:-60%; transform:translateX(-50%); width:min(1560px,128vw); aspect-ratio:1920/1640; pointer-events:none;">
    <img src="/hero_home1.5x.webp" alt="" style="width:100%; height:100%; object-fit:contain; object-position:bottom; filter:grayscale(1) brightness(1.02) contrast(1.05);" />
    <div style="position:absolute; inset:0; background:radial-gradient(ellipse 86% 70% at 50% 66%, rgba(64,118,196,0.26), rgba(40,70,140,0.12) 50%, transparent 76%); mix-blend-mode:screen;"></div>
    <div style="position:absolute; inset:0; background:radial-gradient(ellipse 54% 42% at 50% 60%, rgba(53,224,232,0.3), rgba(77,168,245,0.14) 48%, transparent 70%); mix-blend-mode:screen;"></div>
    <div style="position:absolute; inset:0; background:radial-gradient(ellipse 30% 20% at 50% 60%, rgba(247,212,150,0.66), rgba(224,169,78,0.3) 44%, transparent 64%); mix-blend-mode:screen;"></div>
    <div style="position:absolute; inset:0; background:radial-gradient(ellipse 94% 80% at 50% 62%, transparent 64%, rgba(7,11,20,0.5) 98%); mix-blend-mode:multiply;"></div>
    <div style="position:absolute; inset:0; background:linear-gradient(to bottom, #070B14 0%, rgba(7,11,20,0.55) 16%, rgba(7,11,20,0.06) 34%, transparent 50%);"></div>
    <div style="position:absolute; left:0; right:0; bottom:0; height:12%; background:linear-gradient(to top, #070B14, transparent);"></div>
  </div>
  <div style="position:absolute; z-index:5; inset:0; pointer-events:none; background:linear-gradient(to bottom, rgba(7,11,20,0.7) 0%, rgba(7,11,20,0.42) 30%, rgba(7,11,20,0.12) 50%, transparent 66%);"></div>
  <div style="position:relative; z-index:10; max-width:780px; margin-top:0; display:flex; flex-direction:column; align-items:center;">
    <span style="font-size:11.5px; letter-spacing:.34em; text-transform:uppercase; color:#8FA0BC; font-weight:500; margin-bottom:20px;">ARGANA MEDIA · UK &amp; Europe Digital Agency</span>
    <h1 style="font-family:'Clash Display'; font-weight:600; font-size:clamp(33px,5vw,62px); line-height:1.05; letter-spacing:-0.02em; margin:0; color:#F4F7FC; text-shadow:0 2px 34px rgba(7,11,20,0.55);">Build, Grow &amp; Scale Your<br/><span style="background:linear-gradient(110deg,#35E0E8 5%,#9BD4F2 45%,#F3CD86 92%); -webkit-background-clip:text; background-clip:text; color:transparent;">Digital Presence</span></h1>
    <p style="max-width:528px; margin:22px 0 0; font-size:clamp(15px,1.7vw,17.5px); line-height:1.62; color:#C2CBDB; text-shadow:0 1px 18px rgba(7,11,20,0.75);">ARGANA MEDIA helps growing businesses thrive online — content, marketing, websites, design, hosting support and IT, all from one trusted team across the UK and Europe.</p>
    <div style="display:flex; flex-wrap:wrap; gap:13px; justify-content:center; margin-top:32px;">
      <a href="${CALENDLY}" target="_blank" rel="noopener noreferrer" class="am-btn-gold" style="display:inline-flex; align-items:center; gap:9px; text-decoration:none; color:#0A0E18; font-size:15px; font-weight:600; padding:15px 28px; border-radius:12px; background:linear-gradient(135deg,#F6D79A,#E3A94E); transition:.3s;">Book a Call<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
      <a href="/services" class="am-btn-ghost" style="display:inline-flex; align-items:center; gap:9px; text-decoration:none; color:#EEF2F9; font-size:15px; font-weight:600; padding:15px 28px; border-radius:12px; border:1px solid rgba(255,255,255,0.18); background:rgba(255,255,255,0.03); backdrop-filter:blur(8px); transition:.3s;">View Services</a>
    </div>
    <div style="display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:10px 18px; margin-top:28px;">
      ${heroCaps.map((c) => `<span style="display:inline-flex; align-items:center; gap:8px; font-size:11.5px; letter-spacing:.16em; text-transform:uppercase; color:#B4BFD4; font-weight:600; text-shadow:0 1px 3px #070B14, 0 2px 16px rgba(7,11,20,0.95);"><span style="width:5px; height:5px; border-radius:50%; background:linear-gradient(135deg,#35E0E8,#F3CD86); box-shadow:0 0 8px rgba(53,224,232,0.6);"></span>${c}</span>`).join("")}
    </div>
  </div>
</section>

<!-- SERVICES -->
<section id="services" style="position:relative; max-width:1280px; margin:0 auto; padding:clamp(80px,11vh,140px) 28px;">
  <div style="position:absolute; top:6%; right:-6%; width:420px; height:420px; background:radial-gradient(circle, rgba(53,224,232,0.08), transparent 70%); pointer-events:none;"></div>
  <div data-reveal="1" style="max-width:680px;">
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:18px;"><span style="width:28px; height:1.5px; background:linear-gradient(90deg,#35E0E8,#F3CD86);"></span><span style="font-size:12.5px; letter-spacing:.18em; text-transform:uppercase; color:#F3CD86; font-weight:600;">What we do</span></div>
    <h2 style="font-family:'Clash Display'; font-weight:600; font-size:clamp(30px,4.6vw,54px); line-height:1.06; letter-spacing:-0.02em; margin:0; color:#F4F7FC;">Everything your business needs to grow online</h2>
    <p style="margin:20px 0 0; font-size:17px; line-height:1.6; color:#A7B0C2;">Four connected areas of expertise — explored under one roof, delivered by one team. Pick an area to see what's included.</p>
  </div>
  <div class="am-svc-grid" data-reveal="1" data-reveal-delay="80" style="margin-top:46px; display:grid; grid-template-columns:minmax(0,0.92fr) minmax(0,1.4fr); gap:22px; align-items:stretch;">
    <div id="am-groupnav" style="display:flex; flex-direction:column; gap:12px;">${groupNavHTML(0)}</div>
    <div style="position:relative; border:1px solid rgba(255,255,255,0.09); border-radius:22px; padding:clamp(26px,3vw,40px); background:linear-gradient(160deg, rgba(255,255,255,0.045), rgba(255,255,255,0.015)); overflow:hidden;">
      <div id="am-detail">${detailHTML(serviceGroups[0])}</div>
    </div>
  </div>
</section>

<!-- WHY -->
<section id="why" style="position:relative; padding:clamp(70px,9vh,120px) 0; border-top:1px solid rgba(255,255,255,0.05); border-bottom:1px solid rgba(255,255,255,0.05); background:linear-gradient(180deg, rgba(255,255,255,0.012), transparent);">
  <div style="max-width:1280px; margin:0 auto; padding:0 28px;">
    <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(340px,1fr)); gap:52px; align-items:center; margin-bottom:60px;">
      <div data-reveal="1">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:18px;"><span style="width:28px; height:1.5px; background:linear-gradient(90deg,#35E0E8,#F3CD86);"></span><span style="font-size:12.5px; letter-spacing:.18em; text-transform:uppercase; color:#F3CD86; font-weight:600;">Why ARGANA MEDIA</span></div>
        <h2 style="font-family:'Clash Display'; font-weight:600; font-size:clamp(30px,4.4vw,50px); line-height:1.07; letter-spacing:-0.02em; margin:0; color:#F4F7FC;">A media-first partner that actually delivers</h2>
        <p style="margin:20px 0 0; font-size:16.5px; line-height:1.6; color:#A7B0C2; max-width:520px;">We combine creative thinking with technical delivery — strategy, content, design, build and support working together, not in silos. Built for small businesses, startups and growing brands.</p>
      </div>
      <div data-reveal="1" data-reveal-delay="100" style="position:relative;">
        <div style="position:absolute; inset:-24px; background:radial-gradient(circle at 65% 40%, rgba(53,224,232,0.14), transparent 65%); pointer-events:none;"></div>
        <img src="/why-argana-media.webp" alt="A creative team collaborating in a strategy meeting" width="1400" height="788" loading="lazy" decoding="async" style="position:relative; width:100%; aspect-ratio:3/2; object-fit:cover; display:block; border-radius:20px; border:1px solid rgba(255,255,255,0.1); box-shadow:0 40px 90px -45px rgba(0,0,0,.9);" />
      </div>
    </div>
    <div data-reveal="1" data-reveal-delay="80" class="am-why-cards">
      ${whyUs.map((w) => `<div class="am-card-svc" style="padding:24px 22px; border-radius:18px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.025);"><span style="display:grid; place-items:center; width:44px; height:44px; border-radius:13px; background:rgba(53,224,232,0.1); color:#35E0E8; margin-bottom:16px;">${w.icon}</span><h3 style="font-family:'Clash Display'; font-weight:500; font-size:18px; margin:0 0 8px; color:#EEF2F9;">${w.title}</h3><p style="margin:0; font-size:14px; line-height:1.55; color:#8A93A6;">${w.body}</p></div>`).join("")}
    </div>
  </div>
</section>

<!-- PROCESS -->
<section id="process" style="position:relative; max-width:920px; margin:0 auto; padding:clamp(80px,11vh,140px) 28px;">
  <div data-reveal="1" style="text-align:center; max-width:640px; margin:0 auto 56px;">
    <div style="display:inline-flex; align-items:center; gap:12px; margin-bottom:18px;"><span style="width:28px; height:1.5px; background:linear-gradient(90deg,#35E0E8,#F3CD86);"></span><span style="font-size:12.5px; letter-spacing:.18em; text-transform:uppercase; color:#F3CD86; font-weight:600;">How it works</span><span style="width:28px; height:1.5px; background:linear-gradient(90deg,#F3CD86,#35E0E8);"></span></div>
    <h2 style="font-family:'Clash Display'; font-weight:600; font-size:clamp(30px,4.6vw,52px); line-height:1.06; letter-spacing:-0.02em; margin:0; color:#F4F7FC;">A clear path from idea to impact</h2>
  </div>
  <div style="position:relative; display:flex; flex-direction:column; gap:8px;">
    <div style="position:absolute; left:27px; top:30px; bottom:30px; width:2px; background:linear-gradient(180deg, #35E0E8, #4DA8F5 40%, #F3CD86); opacity:.4;"></div>
    ${processSteps.map((p) => `<div data-reveal="1" style="position:relative; display:flex; gap:24px; align-items:flex-start; padding:14px 0;"><span style="position:relative; z-index:2; flex-shrink:0; width:56px; height:56px; border-radius:16px; display:grid; place-items:center; font-family:'Clash Display'; font-weight:600; font-size:18px; color:#0A0E18; background:linear-gradient(135deg,#F6D79A,#E3A94E); box-shadow:0 0 0 6px #070B14;">${p.n}</span><div style="flex:1; padding:18px 24px; border-radius:16px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.025);"><h3 style="font-family:'Clash Display'; font-weight:500; font-size:20px; margin:0 0 6px; color:#EEF2F9;">${p.title}</h3><p style="margin:0; font-size:14.5px; line-height:1.55; color:#8A93A6;">${p.body}</p></div></div>`).join("")}
  </div>
</section>

<!-- PACKAGES -->
<section id="packages" style="position:relative; max-width:1280px; margin:0 auto; padding:clamp(80px,11vh,130px) 28px;">
  <div data-reveal="1" style="text-align:center; max-width:680px; margin:0 auto 50px;">
    <div style="display:inline-flex; align-items:center; gap:12px; margin-bottom:18px;"><span style="width:28px; height:1.5px; background:linear-gradient(90deg,#35E0E8,#F3CD86);"></span><span style="font-size:12.5px; letter-spacing:.18em; text-transform:uppercase; color:#F3CD86; font-weight:600;">Ways to work together</span><span style="width:28px; height:1.5px; background:linear-gradient(90deg,#F3CD86,#35E0E8);"></span></div>
    <h2 style="font-family:'Clash Display'; font-weight:600; font-size:clamp(30px,4.6vw,52px); line-height:1.06; letter-spacing:-0.02em; margin:0; color:#F4F7FC;">Starting points, not fixed boxes</h2>
    <p style="margin:18px 0 0; font-size:16.5px; line-height:1.6; color:#A7B0C2;">Every business is different, so every quote is too. These are typical starting points — tell us your goals and we'll shape the right scope and price for you.</p>
  </div>
  <div data-reveal="1" data-reveal-delay="80" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(232px,1fr)); gap:18px;">
    ${packages.map((p) => {
      const cardBorder = p.popular ? "rgba(243,205,134,0.4)" : "rgba(255,255,255,0.08)";
      const cardBg = p.popular ? "linear-gradient(165deg, rgba(243,205,134,0.07), rgba(255,255,255,0.02))" : "rgba(255,255,255,0.022)";
      const btnClass = p.popular ? "am-btn-gold" : "am-btn-ghost";
      const btnStyle = p.popular ? "color:#0A0E18; background:linear-gradient(135deg,#F6D79A,#E3A94E); border:none;" : "color:#EEF2F9; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.16);";
      const periodLabel = p.period ? "/" + p.period : "";
      const badge = p.popular ? `<span style="position:absolute; top:16px; right:16px; font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; font-weight:600; color:#0A0E18; background:linear-gradient(135deg,#F6D79A,#E3A94E); padding:5px 10px; border-radius:100px;">Most popular</span>` : "";
      return `<div class="am-pkg" style="position:relative; display:flex; flex-direction:column; padding:28px 24px; border-radius:20px; border:1px solid ${cardBorder}; background:${cardBg}; overflow:hidden;">${badge}<span style="display:inline-block; width:36px; height:3px; border-radius:3px; background:${p.accent}; margin-bottom:18px;"></span><h3 style="font-family:'Clash Display'; font-weight:600; font-size:21px; margin:0 0 6px; color:#F4F7FC;">${p.name}</h3><p style="margin:0 0 22px; font-size:13.5px; line-height:1.5; color:#8A93A6; min-height:40px;">${p.bestFor}</p><div style="display:flex; flex-direction:column; gap:11px; margin-bottom:26px; flex:1;">${p.specs.map((s) => `<span style="display:flex; align-items:flex-start; gap:9px; font-size:13.5px; color:#C7CEDC; line-height:1.4;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#35E0E8" stroke-width="2.2" style="flex-shrink:0; margin-top:1px;"><path d="M20 6 9 17l-5-5"/></svg>${s}</span>`).join("")}</div><a href="${p.cta === "Book a Call" ? "/book-a-call" : "/contact"}" class="${btnClass}" style="display:inline-flex; align-items:center; justify-content:center; gap:7px; text-decoration:none; font-weight:600; font-size:14px; padding:13px 18px; border-radius:11px; ${btnStyle} transition:.3s;">${p.cta}</a></div>`;
    }).join("")}
  </div>
  <p style="text-align:center; margin:28px 0 0; font-size:13.5px; color:#7E8AA3;">Every project is unique, so every quote is too — no checkout, no pressure. Tell us your goals and we'll shape the right plan for your business.</p>
</section>

<!-- CARE + DOMAIN -->
<section id="care" style="position:relative; padding:clamp(70px,9vh,120px) 0; border-top:1px solid rgba(255,255,255,0.05); background:linear-gradient(180deg, rgba(53,224,232,0.025), transparent 40%);">
  <div style="max-width:1280px; margin:0 auto; padding:0 28px; display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:48px; align-items:center;">
    <div data-reveal="1">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:18px;"><span style="width:28px; height:1.5px; background:linear-gradient(90deg,#34D399,#35E0E8);"></span><span style="font-size:12.5px; letter-spacing:.18em; text-transform:uppercase; color:#34D399; font-weight:600;">Hosting &amp; Website Care</span></div>
      <h2 style="font-family:'Clash Display'; font-weight:600; font-size:clamp(28px,4vw,46px); line-height:1.07; letter-spacing:-0.02em; margin:0; color:#F4F7FC;">Need a domain, email or website care?</h2>
      <p style="margin:18px 0 28px; font-size:16.5px; line-height:1.6; color:#A7B0C2; max-width:520px;">Once your site is live it needs to stay fast, secure and looked after. We handle domain setup, business email, SSL, hosting, backups, maintenance and technical support — so you never have to worry about the technical side.</p>
      <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px;">
        ${careFeatures.map((c) => `<div style="display:flex; gap:12px; align-items:flex-start; padding:16px; border-radius:14px; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02);"><span style="flex-shrink:0; display:grid; place-items:center; width:38px; height:38px; border-radius:11px; background:rgba(52,211,153,0.1); color:#34D399;">${c.icon}</span><span><span style="display:block; font-weight:600; font-size:14.5px; color:#EEF2F9; margin-bottom:3px;">${c.title}</span><span style="display:block; font-size:12.5px; line-height:1.5; color:#8A93A6;">${c.body}</span></span></div>`).join("")}
      </div>
    </div>
    <div data-reveal="1" data-reveal-delay="100" style="position:relative; border:1px solid rgba(255,255,255,0.1); border-radius:24px; padding:clamp(26px,3vw,38px); background:linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015)); overflow:hidden; box-shadow:0 40px 90px -40px rgba(0,0,0,.8);">
      <div style="position:absolute; top:-60px; right:-40px; width:260px; height:260px; background:radial-gradient(circle, rgba(53,224,232,0.16), transparent 70%); pointer-events:none;"></div>
      <div style="position:relative;">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#35E0E8" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><span style="font-family:'Clash Display'; font-weight:500; font-size:20px; color:#F4F7FC;">Find your perfect domain</span></div>
        <p style="margin:0 0 20px; font-size:14px; color:#8A93A6;">Search for a name. If it's free, we'll register, connect and secure it for you — no control panels required.</p>
        <form id="am-domain-form" style="display:flex; gap:10px; flex-wrap:wrap;">
          <div style="flex:1; min-width:200px; display:flex; align-items:center; gap:8px; padding:0 16px; border-radius:12px; border:1px solid rgba(255,255,255,0.14); background:rgba(7,11,20,0.5);">
            <span style="color:#7E8AA3;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg></span>
            <input id="am-domain-input" placeholder="yourbusiness" style="flex:1; background:transparent; border:none; outline:none; color:#EEF2F9; font-size:15px; font-family:'General Sans',sans-serif; padding:14px 0;" />
          </div>
          <button type="submit" class="am-btn-gold" style="display:inline-flex; align-items:center; gap:8px; cursor:pointer; border:none; font-weight:600; font-size:14.5px; padding:0 22px; border-radius:12px; color:#0A0E18; background:linear-gradient(135deg,#F6D79A,#E3A94E); transition:.3s;">Search</button>
        </form>
        <div id="am-domain-out">${domainNoResult}</div>
      </div>
    </div>
  </div>
</section>

<!-- CLIENT PORTAL -->
<section id="portal" style="position:relative; max-width:1280px; margin:0 auto; padding:clamp(80px,11vh,130px) 28px;">
  <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(330px,1fr)); gap:52px; align-items:center;">
    <div data-reveal="1">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:18px;"><span style="width:28px; height:1.5px; background:linear-gradient(90deg,#7CC6F0,#35E0E8);"></span><span style="font-size:12.5px; letter-spacing:.18em; text-transform:uppercase; color:#7CC6F0; font-weight:600;">Client Portal</span></div>
      <h2 style="font-family:'Clash Display'; font-weight:600; font-size:clamp(28px,4.2vw,48px); line-height:1.06; letter-spacing:-0.02em; margin:0; color:#F4F7FC;">One calm place to run everything</h2>
      <p style="margin:18px 0 26px; font-size:16.5px; line-height:1.6; color:#A7B0C2; max-width:520px;">No chasing email threads. Track live projects, raise requests, view invoices and open support tickets — all in your own ARGANA MEDIA portal, available whenever you need it.</p>
      <div style="display:flex; flex-direction:column; gap:14px; margin-bottom:30px;">
        <span style="display:flex; align-items:center; gap:12px; font-size:15px; color:#C7CEDC;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#35E0E8" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>See active projects and their progress at a glance</span>
        <span style="display:flex; align-items:center; gap:12px; font-size:15px; color:#C7CEDC;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#35E0E8" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>Send requests and approvals without the email back-and-forth</span>
        <span style="display:flex; align-items:center; gap:12px; font-size:15px; color:#C7CEDC;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#35E0E8" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>Review invoices and open support tickets in seconds</span>
      </div>
      <a href="/dashboard" class="am-btn-ghost" style="display:inline-flex; align-items:center; gap:8px; text-decoration:none; color:#EEF2F9; font-weight:600; font-size:14.5px; padding:13px 24px; border-radius:12px; border:1px solid rgba(255,255,255,0.16); background:rgba(255,255,255,0.02); transition:.3s;">Explore the portal<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
    </div>
    <div data-reveal="1" data-reveal-delay="100" style="position:relative;">
      <div style="position:absolute; inset:-30px; background:radial-gradient(circle at 60% 35%, rgba(53,224,232,0.16), transparent 65%); pointer-events:none;"></div>
      <img src="/client-media-workspace.webp" alt="A professional managing projects on a laptop in a calm, modern workspace" width="1200" height="802" loading="lazy" decoding="async" style="position:relative; width:100%; height:auto; display:block; border-radius:24px; border:1px solid rgba(255,255,255,0.1); box-shadow:0 50px 100px -40px rgba(0,0,0,.9);" />
    </div>
  </div>
</section>

<!-- PORTFOLIO -->
<section id="portfolio" style="position:relative; padding:clamp(80px,11vh,130px) 0; border-top:1px solid rgba(255,255,255,0.05); background:linear-gradient(180deg, rgba(255,255,255,0.012), transparent);">
  <div style="max-width:1280px; margin:0 auto; padding:0 28px;">
    <div data-reveal="1" style="display:flex; flex-wrap:wrap; gap:24px; align-items:flex-end; justify-content:space-between; margin-bottom:44px;">
      <div style="max-width:600px;"><div style="display:flex; align-items:center; gap:12px; margin-bottom:18px;"><span style="width:28px; height:1.5px; background:linear-gradient(90deg,#35E0E8,#F3CD86);"></span><span style="font-size:12.5px; letter-spacing:.18em; text-transform:uppercase; color:#F3CD86; font-weight:600;">The kind of work we do</span></div><h2 style="font-family:'Clash Display'; font-weight:600; font-size:clamp(30px,4.6vw,52px); line-height:1.06; letter-spacing:-0.02em; margin:0; color:#F4F7FC;">Built across media, marketing &amp; the web</h2></div>
      <a href="/contact" style="display:inline-flex; align-items:center; gap:8px; text-decoration:none; color:#35E0E8; font-weight:600; font-size:14.5px;">Start your project<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
    </div>
    <div data-reveal="1" data-reveal-delay="80" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:18px;">
      ${portfolio.map((it) => `<a href="/portfolio" class="am-port" style="text-decoration:none; display:flex; flex-direction:column; border-radius:18px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.022);"><div style="position:relative; height:170px; overflow:hidden;"><div class="am-port-img" style="position:absolute; inset:0; background:radial-gradient(120% 90% at 28% 12%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(80% 120% at 100% 100%, rgba(53,224,232,0.10), transparent 60%), ${it.g}; transition:transform .5s cubic-bezier(.22,1,.36,1);"></div><div style="position:absolute; inset:0; background:radial-gradient(circle at 70% 20%, rgba(255,255,255,0.08), transparent 60%);"></div><span style="position:absolute; left:16px; top:16px; font-size:11px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:#F4F7FC; background:rgba(7,11,20,0.55); backdrop-filter:blur(6px); padding:6px 11px; border-radius:100px; border:1px solid rgba(255,255,255,0.12);">${it.cat}</span><span class="am-port-arrow" style="position:absolute; right:16px; bottom:16px; display:grid; place-items:center; width:34px; height:34px; border-radius:50%; background:rgba(7,11,20,0.5); backdrop-filter:blur(6px); border:1px solid rgba(255,255,255,0.14); color:#fff; opacity:.6; transition:.3s;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg></span></div><div style="padding:20px;"><h3 style="font-family:'Clash Display'; font-weight:500; font-size:19px; margin:0 0 8px; color:#EEF2F9;">${it.label}</h3><p style="margin:0; font-size:13.5px; line-height:1.55; color:#8A93A6;">${it.body}</p></div></a>`).join("")}
    </div>
    <p style="margin:26px 0 0; font-size:13px; color:#7E8AA3; text-align:center;">Sample project types — real case studies are shared on request.</p>
  </div>
</section>

<!-- FINAL CTA -->
<section id="contact" style="position:relative; max-width:1180px; margin:0 auto; padding:clamp(70px,9vh,120px) 28px;">
  <div data-reveal="1" style="position:relative; border-radius:30px; border:1px solid rgba(255,255,255,0.1); overflow:hidden; padding:clamp(48px,7vw,90px) clamp(28px,5vw,72px); text-align:center; background:linear-gradient(150deg, #0C1426, #0A1120);">
    <div style="position:absolute; top:-30%; left:50%; transform:translateX(-50%); width:120%; height:140%; background:radial-gradient(ellipse at center top, rgba(53,224,232,0.16), transparent 55%); pointer-events:none;"></div>
    <div style="position:absolute; bottom:-40%; left:50%; transform:translateX(-50%); width:80%; height:120%; background:radial-gradient(ellipse at center, rgba(243,205,134,0.12), transparent 60%); pointer-events:none;"></div>
    <div style="position:relative;">
      <div style="display:inline-flex; align-items:center; gap:9px; padding:7px 15px; border:1px solid rgba(255,255,255,0.12); border-radius:100px; background:rgba(255,255,255,0.03); margin-bottom:26px;"><span style="width:7px; height:7px; border-radius:50%; background:#34D399; box-shadow:0 0 10px #34D399;"></span><span style="font-size:12.5px; letter-spacing:.1em; text-transform:uppercase; color:#A7B0C2; font-weight:500;">Free, no-pressure call</span></div>
      <h2 style="font-family:'Clash Display'; font-weight:600; font-size:clamp(32px,5.5vw,64px); line-height:1.04; letter-spacing:-0.02em; margin:0 auto; max-width:760px; color:#F4F7FC;">Ready to build a stronger digital presence?</h2>
      <p style="margin:22px auto 0; max-width:560px; font-size:17px; line-height:1.6; color:#A7B0C2;">Tell us where you want your business to be online. We'll bring the strategy, creativity and technical delivery to get you there.</p>
      <div style="display:flex; flex-wrap:wrap; gap:14px; justify-content:center; margin-top:38px;">
        <a href="${CALENDLY}" target="_blank" rel="noopener noreferrer" class="am-btn-gold" style="display:inline-flex; align-items:center; gap:9px; text-decoration:none; color:#0A0E18; font-size:15px; font-weight:600; padding:16px 32px; border-radius:12px; background:linear-gradient(135deg,#F6D79A,#E3A94E); transition:.3s;">Book a Call<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.05 2a9 9 0 0 1 8 7.94M14.05 6A5 5 0 0 1 18 10M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
        <a href="/contact" class="am-btn-ghost" style="display:inline-flex; align-items:center; gap:9px; text-decoration:none; color:#EEF2F9; font-size:15px; font-weight:600; padding:16px 32px; border-radius:12px; border:1px solid rgba(255,255,255,0.18); background:rgba(255,255,255,0.02); transition:.3s;">Contact Us</a>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer style="position:relative; border-top:1px solid rgba(255,255,255,0.07); background:#060912;">
  <div style="max-width:1280px; margin:0 auto; padding:64px 28px 32px;">
    <div class="am-foot-grid">
      <div class="am-foot-brand">
        <a href="#top" style="display:flex; align-items:center; gap:11px; text-decoration:none; margin-bottom:18px;"><img src="/argana_media_logo_concept_2.png" alt="ARGANA MEDIA" width="40" height="40" style="display:block; flex-shrink:0; object-fit:contain;" /><span style="font-family:'Clash Display'; font-weight:600; font-size:18px; letter-spacing:.14em; color:#F4F7FC;">ARGANA<span style="color:#8A93A6; font-weight:500;"> MEDIA</span></span></a>
        <p style="margin:0 0 18px; font-size:14px; line-height:1.6; color:#8A93A6;">Digital media, marketing and IT for growing businesses — content, websites, design, hosting support and everyday tech, from one trusted team across the UK and Europe.</p>
        <div style="display:flex; flex-direction:column; gap:7px; font-size:13.5px; color:#A7B0C2;"><a href="mailto:hello@arganamedia.co.uk" style="color:#A7B0C2; text-decoration:none; display:inline-flex; align-items:center; gap:9px;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#35E0E8" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>hello@arganamedia.co.uk</a><a href="tel:+447882737419" style="color:#A7B0C2; text-decoration:none; display:inline-flex; align-items:center; gap:9px;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#35E0E8" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>+44 7882 737419</a></div>
      </div>
      <div><h4 style="font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:#7E8AA3; font-weight:600; margin:0 0 16px;">Services</h4><div style="display:flex; flex-direction:column; gap:11px;">${footerServices.map(([label, href]) => `<a href="${href}" style="text-decoration:none; color:#A7B0C2; font-size:14px; transition:color .2s;" onmouseover="this.style.color='#35E0E8'" onmouseout="this.style.color='#A7B0C2'">${label}</a>`).join("")}</div></div>
      <div><h4 style="font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:#7E8AA3; font-weight:600; margin:0 0 16px;">Company</h4><div style="display:flex; flex-direction:column; gap:11px;">${footerCompany.map(([label, href]) => `<a href="${href}" style="text-decoration:none; color:#A7B0C2; font-size:14px; transition:color .2s;" onmouseover="this.style.color='#35E0E8'" onmouseout="this.style.color='#A7B0C2'">${label}</a>`).join("")}</div></div>
      <div><h4 style="font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:#7E8AA3; font-weight:600; margin:0 0 16px;">Legal</h4><div style="display:flex; flex-direction:column; gap:11px;">${footerLegal.map(([label, href]) => `<a href="${href}" style="text-decoration:none; color:#A7B0C2; font-size:14px; transition:color .2s;" onmouseover="this.style.color='#35E0E8'" onmouseout="this.style.color='#A7B0C2'">${label}</a>`).join("")}</div></div>
    </div>
    <div style="margin-top:48px; padding-top:26px; border-top:1px solid rgba(255,255,255,0.07);">
      <p style="margin:0 0 6px; font-size:13px; color:#8A93A6;"><strong style="color:#C7CEDC; font-weight:600;">ARGANA MEDIA</strong> · Company number 17296255</p>
      <p style="margin:0 0 18px; font-size:13px; color:#7E8AA3;">Registered office: 2nd Floor College House, 17 King Edwards Road, Ruislip, London</p>
      <div style="display:flex; flex-wrap:wrap; gap:8px 16px; justify-content:space-between; align-items:center;"><span style="font-size:12.5px; color:#7E8AA3;">© ${year} ARGANA MEDIA. All rights reserved.</span><span style="font-size:12.5px; color:#7E8AA3;">Made with care in the UK.</span></div>
    </div>
  </div>
</footer>
`;
}

/* ----------------------------- component ----------------------------- */
export default function ArganaLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // 1) inject markup once
    root.innerHTML = pageHTML();

    // 2) load fonts
    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = "https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=general-sans@400,500,600,700&display=swap";
    document.head.appendChild(fontLink);

    let activeGroup = 0;

    // 3) service tabs
    const groupNav = root.querySelector("#am-groupnav");
    const detail = root.querySelector("#am-detail");
    const onGroupClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest("[data-group]");
      if (!btn) return;
      const i = Number(btn.getAttribute("data-group"));
      if (i === activeGroup) return;
      activeGroup = i;
      if (groupNav) groupNav.innerHTML = groupNavHTML(i);
      if (detail) detail.innerHTML = detailHTML(serviceGroups[i]);
    };
    groupNav?.addEventListener("click", onGroupClick);

    // 4) mobile menu
    const burger = root.querySelector("[data-burger]");
    const mobile = root.querySelector<HTMLElement>("#am-mobile");
    const openMobile = () => { if (mobile) mobile.style.display = "flex"; };
    const closeMobile = () => { if (mobile) mobile.style.display = "none"; };
    burger?.addEventListener("click", openMobile);
    mobile?.querySelectorAll("[data-close]").forEach((a) => a.addEventListener("click", closeMobile));

    // 5) domain search
    const form = root.querySelector<HTMLFormElement>("#am-domain-form");
    const input = root.querySelector<HTMLInputElement>("#am-domain-input");
    const out = root.querySelector("#am-domain-out");
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      const q = (input?.value ?? "").trim();
      if (q.length < 2) return;
      if (out) out.innerHTML = domainLoadingHTML;
      try {
        const res = await fetch("/api/domains/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q }),
        });
        const json = await res.json();
        if (!res.ok) {
          if (out) out.innerHTML = domainErrorHTML(json?.error ?? "Search failed. Please try again.");
          return;
        }
        if (out) out.innerHTML = domainResultsHTML(json.results ?? []);
      } catch {
        if (out) out.innerHTML = domainErrorHTML("Network error. Please check your connection and try again.");
      }
    };
    form?.addEventListener("submit", onSubmit);

    // 6) star-field canvas (ambient sky + sparks rising from the horizon)
    const canvas = root.querySelector<HTMLCanvasElement>("#am-canvas");
    let raf = 0;
    let mx = 0, my = 0;
    const ctx = canvas?.getContext("2d") ?? null;
    // Respect prefers-reduced-motion: render a single static frame, no rAF loop.
    const reduceMotion = typeof window !== "undefined" && typeof window.matchMedia === "function"
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1;
    type Spark = { x: number; y: number; vx: number; vy: number; size: number; life: number; max: number; color: string };
    type Sky = { x: number; y: number; r: number; base: number; tw: number; ph: number; gold: boolean; depth: number };
    let sky: Sky[] = [];
    let rising: Spark[] = [];
    const spawn = (p: Spark): Spark => {
      const cx = w * 0.5, spread = w * 0.34;
      p.x = cx + (Math.random() - 0.5) * spread * 2;
      p.y = h * (0.60 + Math.random() * 0.16);
      p.vy = -(h * 0.00038 + Math.random() * h * 0.0007);
      p.vx = (Math.random() - 0.5) * 0.22;
      p.size = Math.random() * 1.7 + 0.5;
      p.life = 0;
      p.max = 170 + Math.random() * 250;
      const d = Math.abs(p.x - cx) / spread;
      p.color = d < 0.55 ? (Math.random() < 0.6 ? "#F8D89A" : "#FFE9BE") : (Math.random() < 0.5 ? "#8FE9EE" : "#CFE8FF");
      return p;
    };
    const seed = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      const skyCount = Math.min(120, Math.floor((w * h) / 12000));
      sky = Array.from({ length: skyCount }, () => ({
        x: Math.random() * w, y: Math.random() * h * 0.6,
        r: Math.random() * 1.3 + 0.3, base: Math.random() * 0.45 + 0.18,
        tw: Math.random() * 0.6 + 0.2, ph: Math.random() * Math.PI * 2,
        gold: Math.random() > 0.84, depth: Math.random() * 0.5 + 0.2,
      }));
      const riseCount = Math.min(110, Math.floor(w / 12));
      rising = Array.from({ length: riseCount }, () => { const p = spawn({} as Spark); p.life = Math.random() * p.max; return p; });
    };
    let t = 0;
    const draw = () => {
      if (!ctx) return;
      t += 0.016; ctx.clearRect(0, 0, w, h);
      const px = mx * 16, py = my * 16;
      for (const s of sky) {
        const a = s.base + Math.sin(t * s.tw * 2 + s.ph) * 0.22;
        ctx.globalAlpha = Math.max(0, a);
        ctx.fillStyle = s.gold ? "#F3CD86" : "#CFE8FF";
        ctx.beginPath(); ctx.arc(s.x + px * s.depth, s.y + py * s.depth, s.r, 0, Math.PI * 2); ctx.fill();
      }
      for (const p of rising) {
        p.x += p.vx; p.y += p.vy; p.life++;
        if (p.life >= p.max || p.y < -12) spawn(p);
        const k = p.life / p.max;
        const fade = Math.sin(Math.min(k, 1) * Math.PI);
        const tw = 0.7 + Math.sin(t * 4 + p.x * 0.05) * 0.3;
        ctx.globalAlpha = Math.max(0, fade * tw * 0.95);
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x + px * 0.6, p.y + py * 0.6, p.size, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };
    if (canvas && ctx) { seed(); draw(); }

    // 7) pointer parallax
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", seed);

    // 8) sticky nav background on scroll
    const nav = root.querySelector<HTMLElement>("#am-nav");
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 24) {
        nav.style.background = "rgba(7,11,20,0.82)";
        nav.style.backdropFilter = "blur(18px)";
        nav.style.borderBottomColor = "rgba(255,255,255,0.07)";
      } else {
        nav.style.background = "transparent";
        nav.style.backdropFilter = "none";
        nav.style.borderBottomColor = "transparent";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // 9) scroll-reveal
    const revealEls = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    revealEls.forEach((el) => {
      if (reduceMotion) return; // no entrance animation for reduced-motion users
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = "opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)";
      const d = el.getAttribute("data-reveal-delay");
      if (d) el.style.transitionDelay = d + "ms";
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          (en.target as HTMLElement).style.opacity = "1";
          (en.target as HTMLElement).style.transform = "none";
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => io.observe(el));

    // cleanup
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", seed);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      groupNav?.removeEventListener("click", onGroupClick);
      burger?.removeEventListener("click", openMobile);
      form?.removeEventListener("submit", onSubmit);
      fontLink.remove();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div ref={rootRef} className="am-root">
        {/* Server-rendered hero fallback — visible to search engines, social
            unfurlers and no-JS users. Replaced by the full animated design on
            mount (root.innerHTML in the effect below). */}
        <section style={{ minHeight: "62vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 64px" }}>
          <span style={{ fontSize: 11.5, letterSpacing: "0.34em", textTransform: "uppercase", color: "#8FA0BC", fontWeight: 500, marginBottom: 20 }}>ARGANA MEDIA · UK &amp; Europe Digital Agency</span>
          <h1 style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 600, fontSize: "clamp(33px,5vw,62px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, color: "#F4F7FC", maxWidth: 780 }}>Build, Grow &amp; Scale Your Digital Presence</h1>
          <p style={{ maxWidth: 528, margin: "22px 0 0", fontSize: "clamp(15px,1.7vw,17.5px)", lineHeight: 1.62, color: "#C2CBDB" }}>ARGANA MEDIA helps growing businesses thrive online — content, marketing, websites, design, hosting support and IT, all from one trusted team across the UK and Europe.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 13, justifyContent: "center", marginTop: 32 }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", color: "#0A0E18", fontSize: 15, fontWeight: 600, padding: "15px 28px", borderRadius: 12, background: "linear-gradient(135deg,#F6D79A,#E3A94E)" }}>Book a Call</a>
            <a href="/services" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", color: "#EEF2F9", fontSize: 15, fontWeight: 600, padding: "15px 28px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.03)" }}>View Services</a>
          </div>
        </section>
      </div>
    </>
  );
}
