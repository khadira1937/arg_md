import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2, ShoppingCart, CalendarClock, Megaphone, Boxes, BookOpenText,
  Feather, Accessibility, Gauge, Expand, Wrench, Target, MousePointerClick, Search, Smartphone,
  Compass, SearchCheck, PenTool, Code2, ShieldCheck, Rocket, LifeBuoy,
  MessagesSquare, Layers, Users, Landmark, Lock,
  PhoneCall, Mail, Clock, Plus, ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";
import { CALENDLY_URL } from "@/config/cta";
import { Hero, Band, Head, Btn, DISPLAY, TEAL, GOLD, SKY, GREEN } from "@/components/marketing/amx-ui";
import TechBalls from "@/components/marketing/tech-balls";

export const metadata: Metadata = pageMetadata({
  title: "What We Build",
  description:
    "The websites and web applications ARGANA MEDIA designs and develops — corporate sites, e-commerce, booking platforms, marketing sites, custom applications and developer documentation. See our approach, process and technology.",
  path: "/what-we-build",
});

const COMPANIES_HOUSE = `https://find-and-update.company-information.service.gov.uk/company/${brand.company.number}`;

/* ------------------------------------------------------------- Section 2 data */
const SOLUTIONS = [
  {
    icon: Building2,
    title: "Corporate Websites",
    img: "/what-we-build/corporate-websites.webp",
    alt: "A team reviewing a corporate website project around a laptop in a modern office",
    desc: "The website most established businesses actually need: a clear structure, fast pages, and content your team can keep current without calling a developer. We focus on the things that move the needle — credibility, findability and a confident first impression.",
    features: ["Clear information architecture", "A CMS your team can edit", "Accessible, standards-based markup", "On-page technical SEO", "Multilingual-ready when needed"],
    tech: ["Next.js", "TypeScript", "WordPress", "Tailwind CSS", "Vercel"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    img: "/what-we-build/ecommerce.webp",
    alt: "An online store interface representing an e-commerce build",
    desc: "Online stores built to sell and to scale — clean product journeys, dependable checkout, and the integrations your operations rely on. Whether you're on an established platform or need something bespoke, we build for conversion and for the people running the shop day to day.",
    features: ["Optimised product & checkout flows", "Payments, tax & shipping integrations", "Inventory and order workflows", "Performance at catalogue scale", "Analytics & conversion tracking"],
    tech: ["Shopify", "Next.js", "Stripe", "PostgreSQL", "Node.js"],
  },
  {
    icon: CalendarClock,
    title: "Booking Platforms",
    img: "/what-we-build/booking-platforms.webp",
    alt: "A consultation being scheduled on a calendar on a laptop",
    desc: "Appointment and reservation systems that respect both sides of the calendar — your availability and your customer's time. We build scheduling that prevents double-bookings, sends the right reminders, and fits the way your business actually operates.",
    features: ["Real-time availability", "Automated reminders & confirmations", "Calendar and payment integrations", "Staff and resource management", "Timezone-aware logic"],
    tech: ["Next.js", "Node.js", "PostgreSQL", "TypeScript", "Stripe"],
  },
  {
    icon: Megaphone,
    title: "Marketing Websites",
    img: "/what-we-build/marketing-websites.webp",
    alt: "A creative team planning a marketing campaign website",
    desc: "Campaign and product sites designed to convert: a sharp narrative, fast load times, and measurement built in from day one. Made to launch quickly and to iterate on as you learn what genuinely works for your audience.",
    features: ["Conversion-focused layouts", "Built for A/B testing", "Fast LCP and Core Web Vitals", "A CMS for rapid updates", "Analytics & event tracking included"],
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel", "Cloudflare"],
  },
  {
    icon: Boxes,
    title: "Custom Web Applications",
    img: "/what-we-build/web-applications.webp",
    alt: "A software developer's workspace with code on screen",
    desc: "When off-the-shelf won't do, we build software around your process — dashboards, client portals, internal tools and customer-facing apps. Typed end to end, tested, and documented so it stays maintainable long after launch.",
    features: ["Authentication, roles & permissions", "APIs and third-party integrations", "Real-time data and dashboards", "Type-safe, tested codebase", "Architected to scale"],
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Rust"],
  },
  {
    icon: BookOpenText,
    title: "Developer Documentation",
    img: "/what-we-build/developer-docs.webp",
    alt: "A polished developer documentation site with a sidebar, search and code references",
    desc: "Docs that developers actually want to read — clear structure, working examples, and search that finds the right page. We treat documentation as a product: versioned, maintainable, and part of how good software gets adopted.",
    features: ["Structured navigation & search", "Versioned content", "Code samples & SDK references", "Fast, accessible reading experience", "Easy for the team to keep current"],
    tech: ["Next.js", "TypeScript", "MDX", "Rust", "Solana"],
  },
];

/* ------------------------------------------------------------- Section 3 data */
const PRINCIPLES = [
  { icon: Feather, title: "Simplicity", body: "Complexity is easy; clarity is hard. We remove whatever doesn't earn its place, so visitors — and your team — always know what to do next." },
  { icon: Accessibility, title: "Accessibility", body: "An accessible site reaches more people and reduces legal risk. We build to WCAG principles by default, not as an afterthought." },
  { icon: Gauge, title: "Performance", body: "Speed affects both ranking and revenue. We set a performance budget early and defend it all the way to launch." },
  { icon: Expand, title: "Scalability", body: "We architect so that more traffic, products or features doesn't mean starting again from scratch." },
  { icon: Wrench, title: "Maintainability", body: "Typed, tested and documented code means a lower cost of change — and no lock-in to us." },
  { icon: Target, title: "Conversion", body: "A beautiful site that doesn't convert is decoration. We design around the actions that matter to your business." },
  { icon: MousePointerClick, title: "User Experience", body: "Every interaction is considered from the visitor's point of view, not the internal org chart's." },
  { icon: Search, title: "Technical SEO", body: "Clean markup, structured data and fast pages, so search engines can find, understand and trust your content." },
  { icon: Smartphone, title: "Mobile-first", body: "Most of your visitors arrive on a phone. We design for that screen first, then scale up to desktop." },
];

/* ------------------------------------------------------------- Section 4 data */
const PROCESS = [
  { icon: Compass, title: "Discovery", body: "We learn your goals, audience and constraints, and agree what success looks like before any design begins." },
  { icon: SearchCheck, title: "Research", body: "Competitive and technical research grounds the work in evidence — what your market expects and where the gaps are." },
  { icon: PenTool, title: "Design", body: "Wireframes first, then polished UI, reviewed with you at each step so there are no surprises later." },
  { icon: Code2, title: "Development", body: "Clean, typed, version-controlled code, built in reviewable increments you can see progress on." },
  { icon: ShieldCheck, title: "Quality Assurance", body: "Cross-device, accessibility and performance testing before anything reaches your customers." },
  { icon: Rocket, title: "Launch", body: "A planned, low-risk release — redirects, analytics and monitoring in place from minute one." },
  { icon: LifeBuoy, title: "Long-term Support", body: "We stay on for updates, improvements and care, so your site keeps getting better after launch." },
];

/* ------------------------------------------------------------- Section 6 data */
const REASONS: { icon: LucideIcon; title: string; body: string; href?: string }[] = [
  { icon: MessagesSquare, title: "Transparent Communication", body: "Clear scope, fixed quotes and regular updates. You always know what's happening and what it costs." },
  { icon: Gauge, title: "Performance First", body: "We treat speed and Core Web Vitals as requirements, not nice-to-haves — because they affect ranking and revenue." },
  { icon: Layers, title: "Modern Technologies", body: "We build on current, well-supported tools, so your project stays secure and maintainable for years." },
  { icon: Accessibility, title: "Accessible Design", body: "We follow WCAG principles, so your site works for more people and stays on the right side of accessibility law." },
  { icon: Lock, title: "Security Focused", body: "Sensible defaults — secure headers, dependency hygiene, no secrets in the browser. We build with risk in mind." },
  { icon: LifeBuoy, title: "Long-term Support", body: "We don't disappear at launch. Care plans keep your site fast, secure and improving over time." },
  { icon: Users, title: "Collaborative Process", body: "You're involved at each milestone. We design and build with you, not behind a closed door." },
  { icon: Landmark, title: "UK Registered Company", body: `A registered UK company (No. ${brand.company.number}) — a real, accountable business you can verify on Companies House.`, href: COMPANIES_HOUSE },
];

/* ------------------------------------------------------------- Section 7 data */
const FAQS = [
  { question: "How long does a typical project take?", answer: "Most marketing and corporate sites take 3–6 weeks; e-commerce, booking systems and custom applications usually run 6–12 weeks depending on scope. We agree a realistic timeline during discovery and keep you updated against it." },
  { question: "Do you redesign existing websites?", answer: "Yes. A large part of our work is rebuilding sites that have outgrown their current setup — improving speed, structure and conversion while protecting your existing SEO and content." },
  { question: "Can you modernise legacy systems?", answer: "Often, yes. We assess what's worth keeping, plan a safe migration path, and modernise incrementally rather than forcing a risky big-bang rewrite." },
  { question: "Do you provide ongoing support?", answer: "Yes. We offer care plans covering updates, backups, security and small improvements, so your site stays healthy long after launch. Support is optional and never locked-in." },
  { question: "Can you build custom functionality?", answer: "Yes. When a plugin or template won't do, we build bespoke features — dashboards, integrations, booking logic, internal tools — on a typed, tested codebase." },
  { question: "Do you optimise for SEO and performance?", answer: "Always. Clean semantic markup, structured data and Core Web Vitals are part of the build, not an upsell. We hand over a site that search engines can read and rank." },
  { question: "What technologies do you recommend?", answer: "It depends on the job. We lean on Next.js, TypeScript and PostgreSQL for custom work, and WordPress or Shopify where a proven platform is the right fit. We recommend what suits your goals and team — not what's trendy." },
  { question: "How do projects usually begin?", answer: "With a short discovery call. We learn your goals and constraints, then send a clear proposal with scope, timeline and a fixed quote before any work starts." },
];

export default function WhatWeBuildPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "What We Build", path: "/what-we-build" }]),
          serviceJsonLd({ name: "Website & Web Application Development", description: metadata.description as string, path: "/what-we-build" }),
          faqJsonLd(FAQS),
        ]}
      />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* SECTION 1 — Hero */}
      <Hero
        eyebrow="What We Build"
        title={<>Modern websites &amp; applications, <span style={{ background: `linear-gradient(110deg, ${TEAL}, ${SKY} 45%, ${GOLD})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>built with intent</span></>}
        sub="ARGANA MEDIA designs and develops digital products around real business goals — built to perform, simple to maintain, and ready to grow. Here's what we build, how we work, and the thinking behind every project."
        actions={
          <>
            <Btn href={CALENDLY_URL} variant="gold" icon={false}><PhoneCall size={16} /> Book a Call</Btn>
            <Btn href="#process" variant="ghost">See how we work</Btn>
          </>
        }
      />

      {/* SECTION 2 — What we build */}
      <Band>
        <Head eyebrow="Areas of expertise" title="Where we focus"
          sub="Six kinds of project we build regularly. These are areas of expertise — not client logos — described the way we'd talk you through them on a call." />
        <div style={{ marginTop: "clamp(44px,7vh,72px)" }}>
          {SOLUTIONS.map((s, i) => (
            <article key={s.title} className={`wwb-block${i % 2 === 1 ? " wwb-block--rev" : ""}`}>
              <div className="wwb-media">
                <Image src={s.img} alt={s.alt} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              </div>
              <div className="wwb-body">
                <span className="wwb-soltag"><s.icon size={15} strokeWidth={2} /> 0{i + 1}</span>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(23px,3vw,30px)", lineHeight: 1.1, letterSpacing: "-0.01em", margin: "16px 0 0", color: "#F4F7FC" }}>{s.title}</h3>
                <p style={{ margin: "14px 0 0", fontSize: 15.5, lineHeight: 1.62, color: "#A7B0C2" }}>{s.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "10px 22px", margin: "22px 0 0" }}>
                  {s.features.map((f) => (
                    <span key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 14, lineHeight: 1.45, color: "#C7CEDC" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.4" style={{ flexShrink: 0, marginTop: 2 }}><path d="M20 6 9 17l-5-5" /></svg>{f}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "22px 0 0" }}>
                  {s.tech.map((t) => (
                    <span key={t} style={{ fontSize: 12, fontWeight: 500, color: "#9AA4B8", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.025)", padding: "5px 12px", borderRadius: 100 }}>{t}</span>
                  ))}
                </div>
                <div style={{ marginTop: 24 }}>
                  <Btn href="#book" variant="link">Discuss a project like this</Btn>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Band>

      {/* SECTION 3 — Design philosophy */}
      <Band borderTop bg="linear-gradient(180deg, rgba(53,224,232,0.022), transparent 45%)">
        <Head center eyebrow="How we think" eyebrowColor={TEAL} title="The principles behind every build"
          sub="The same standards apply whether we're building a five-page site or a custom platform. Here's what we hold ourselves to — and why each one matters to you." />
        <div style={{ marginTop: "clamp(40px,6vh,60px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(290px,100%),1fr))", gap: 18 }}>
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="amx-card" style={{ padding: 26, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)" }}>
              <span style={{ display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: 13, background: "rgba(53,224,232,0.1)", color: TEAL, marginBottom: 18 }}><p.icon size={21} strokeWidth={1.8} /></span>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 18.5, margin: "0 0 9px", color: "#EEF2F9" }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#8A93A6" }}>{p.body}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* SECTION 4 — How we work */}
      <Band id="process">
        <Head center eyebrow="How we work" title="A clear path from idea to launch — and beyond"
          sub="A process we've refined to keep projects predictable, collaborative and on schedule. No black boxes, no surprises." />
        <ol className="wwb-steps">
          {PROCESS.map((p, i) => (
            <li key={p.title} className="wwb-step">
              <span className="wwb-step-bar" />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <span className="wwb-step-n">{i + 1}</span>
                <span style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 11, background: "rgba(243,205,134,0.12)", color: GOLD }}><p.icon size={18} strokeWidth={1.9} /></span>
              </div>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 17.5, margin: "0 0 7px", color: "#EEF2F9" }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "#8A93A6" }}>{p.body}</p>
            </li>
          ))}
        </ol>
      </Band>

      {/* SECTION 5 — Technology */}
      <Band borderTop bg="linear-gradient(180deg, rgba(255,255,255,0.012), transparent 45%)">
        <Head center eyebrow="Technology" eyebrowColor={SKY} title="Technologies we work with"
          sub="We choose tools to fit the project, not the other way round — here's the stack we draw on across the work above. Grab any badge and give it a spin." />
        <TechBalls />
      </Band>

      {/* SECTION 6 — Why Argana */}
      <Band>
        <Head center eyebrow="Why Argana" eyebrowColor={GOLD} title="What you can count on"
          sub="No testimonials to quote yet — so here are the factual qualities you can hold us to from day one." />
        <div style={{ marginTop: "clamp(40px,6vh,60px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: 18 }}>
          {REASONS.map((r) => {
            const inner = (
              <>
                <span style={{ display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: 13, background: "rgba(243,205,134,0.12)", color: GOLD, marginBottom: 18 }}><r.icon size={21} strokeWidth={1.8} /></span>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 18, margin: "0 0 9px", color: "#EEF2F9", display: "flex", alignItems: "center", gap: 7 }}>
                  {r.title}{r.href && <ExternalLink size={14} style={{ color: "#7E8AA3" }} />}
                </h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#8A93A6" }}>{r.body}</p>
              </>
            );
            return r.href ? (
              <a key={r.title} href={r.href} target="_blank" rel="noopener noreferrer" className="amx-card" style={{ display: "block", padding: 26, borderRadius: 18, border: "1px solid rgba(243,205,134,0.25)", background: "rgba(243,205,134,0.04)", textDecoration: "none" }}>{inner}</a>
            ) : (
              <div key={r.title} className="amx-card" style={{ padding: 26, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)" }}>{inner}</div>
            );
          })}
        </div>
      </Band>

      {/* SECTION 7 — FAQ */}
      <Band borderTop bg="linear-gradient(180deg, rgba(53,224,232,0.022), transparent 45%)" max={860}>
        <Head center eyebrow="FAQ" eyebrowColor={TEAL} title="Common questions" />
        <div style={{ marginTop: "clamp(36px,5vh,52px)" }}>
          {FAQS.map((f) => (
            <details key={f.question} className="wwb-faq">
              <summary>{f.question}<Plus className="wwb-faq-ico" size={20} strokeWidth={2} /></summary>
              <p className="wwb-faq-body">{f.answer}</p>
            </details>
          ))}
        </div>
      </Band>

      {/* SECTION 8 — Book a discovery call */}
      <Band id="book">
        <div className="wwb-book">
          <div className="wwb-book-glow" />
          <div style={{ position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 15px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, background: "rgba(255,255,255,0.03)", marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN, boxShadow: `0 0 10px ${GREEN}` }} />
              <span style={{ fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#A7B0C2", fontWeight: 500 }}>Free discovery call</span>
            </div>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(28px,4.4vw,46px)", lineHeight: 1.06, letterSpacing: "-0.02em", margin: "0 auto", maxWidth: 620, color: "#F4F7FC" }}>Start with a conversation</h2>
            <p style={{ margin: "20px auto 0", maxWidth: 540, fontSize: 16.5, lineHeight: 1.6, color: "#A7B0C2" }}>
              Tell us what you're trying to build. We'll talk it through, suggest the right approach, and send a clear proposal with scope, timeline and a fixed quote. No pressure, no obligation — just useful advice.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 13, justifyContent: "center", marginTop: 32 }}>
              <Btn href={CALENDLY_URL} variant="gold" icon={false}><PhoneCall size={16} /> Book a Call</Btn>
              <Btn href="/contact" variant="ghost" icon={false}>Send a message</Btn>
            </div>
            <div className="wwb-book-meta">
              <a href={`tel:${brand.phoneHref}`} className="wwb-book-link"><PhoneCall size={15} color={TEAL} /> {brand.phone}</a>
              <a href={`mailto:${brand.email.hello}`} className="wwb-book-link"><Mail size={15} color={TEAL} /> {brand.email.hello}</a>
              <span className="wwb-book-link" style={{ color: "#7E8AA3" }}><Clock size={15} color={GOLD} /> Mon–Fri · 9am–6pm UK time</span>
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}

/* --------------------------------------------------------------- Scoped CSS */
const CSS = `
.wwb-block { display:grid; grid-template-columns:1fr 1fr; gap:clamp(28px,5vw,60px); align-items:center; }
.wwb-block + .wwb-block { margin-top:clamp(52px,9vh,104px); }
.wwb-block--rev .wwb-media { order:2; }
.wwb-block--rev .wwb-body { order:1; }
.wwb-media { position:relative; aspect-ratio:4/3; border-radius:22px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); box-shadow:0 40px 90px -50px rgba(0,0,0,.9); }
.wwb-media img { transition:transform .6s cubic-bezier(.22,1,.36,1); }
.wwb-block:hover .wwb-media img { transform:scale(1.04); }
.wwb-soltag { display:inline-flex; align-items:center; gap:8px; font-family:${DISPLAY}; font-weight:600; font-size:13px; letter-spacing:0.04em; color:${TEAL}; border:1px solid rgba(53,224,232,0.25); background:rgba(53,224,232,0.07); padding:6px 12px; border-radius:100px; }
@media (max-width:900px){ .wwb-block{ grid-template-columns:1fr; gap:24px; } .wwb-block--rev .wwb-media,.wwb-block--rev .wwb-body{ order:0; } }

.wwb-steps { list-style:none; margin:clamp(40px,6vh,60px) 0 0; padding:0; display:grid; grid-template-columns:repeat(auto-fit,minmax(min(230px,100%),1fr)); gap:18px; }
.wwb-step { position:relative; padding:26px 22px 24px; border-radius:18px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.022); overflow:hidden; transition:border-color .35s, transform .35s; }
.wwb-step:hover { border-color:rgba(243,205,134,0.4); transform:translateY(-4px); }
.wwb-step-bar { position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg, ${TEAL}, ${GOLD}); opacity:.55; }
.wwb-step-n { display:grid; place-items:center; width:38px; height:38px; border-radius:11px; font-family:${DISPLAY}; font-weight:600; font-size:16px; color:#0A0E18; background:linear-gradient(135deg,#F6D79A,#E3A94E); }

.wwb-balls { display:flex; flex-wrap:wrap; gap:18px 20px; }
.wwb-ball { display:flex; flex-direction:column; align-items:center; gap:11px; width:80px; text-align:center; }
.wwb-ball-orb { display:grid; place-items:center; width:62px; height:62px; border-radius:50%; font-family:${DISPLAY}; font-weight:600; font-size:15px; color:#EAF1FA; background:radial-gradient(circle at 32% 26%, rgba(255,255,255,0.16), rgba(255,255,255,0.03) 62%), rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.12); box-shadow:inset 0 1px 1px rgba(255,255,255,0.2), 0 12px 26px -14px rgba(0,0,0,.85); transition:transform .3s cubic-bezier(.22,1,.36,1), border-color .3s, box-shadow .3s; }
.wwb-ball:hover .wwb-ball-orb { transform:translateY(-5px); border-color:rgba(53,224,232,0.55); box-shadow:inset 0 1px 1px rgba(255,255,255,0.26), 0 16px 32px -10px rgba(53,224,232,0.4); }
.wwb-ball-label { font-size:12px; color:#8A93A6; line-height:1.25; }

.wwb-faq { border:1px solid rgba(255,255,255,0.09); border-radius:16px; background:rgba(255,255,255,0.022); overflow:hidden; transition:border-color .3s; }
.wwb-faq + .wwb-faq { margin-top:12px; }
.wwb-faq[open] { border-color:rgba(53,224,232,0.3); }
.wwb-faq summary { list-style:none; cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:18px; padding:19px 22px; font-family:${DISPLAY}; font-weight:500; font-size:16.5px; color:#EEF2F9; }
.wwb-faq summary::-webkit-details-marker { display:none; }
.wwb-faq summary:hover { color:#fff; }
.wwb-faq-ico { flex-shrink:0; color:${TEAL}; transition:transform .3s ease; }
.wwb-faq[open] .wwb-faq-ico { transform:rotate(135deg); }
.wwb-faq-body { margin:0; padding:0 22px 20px; font-size:14.5px; line-height:1.65; color:#A7B0C2; }

.wwb-book { position:relative; border-radius:30px; border:1px solid rgba(255,255,255,0.1); overflow:hidden; padding:clamp(44px,7vw,80px) clamp(24px,5vw,56px); text-align:center; background:linear-gradient(150deg,#0C1426,#0A1120); }
.wwb-book-glow { position:absolute; top:-30%; left:50%; transform:translateX(-50%); width:120%; height:140%; background:radial-gradient(ellipse at center top, rgba(53,224,232,0.16), transparent 55%); pointer-events:none; }
.wwb-book-meta { display:flex; flex-wrap:wrap; justify-content:center; gap:14px 26px; margin-top:30px; padding-top:26px; border-top:1px solid rgba(255,255,255,0.08); }
.wwb-book-link { display:inline-flex; align-items:center; gap:8px; font-size:14.5px; color:#C7CEDC; text-decoration:none; transition:color .25s; }
a.wwb-book-link:hover { color:#fff; }

.tb-wrap { position:relative; max-width:980px; margin:clamp(38px,5vh,58px) auto 0; }
.tb-fallback { position:absolute; inset:0; display:grid; place-items:center; transition:opacity .5s ease; pointer-events:none; z-index:1; }
.tb-fcell { display:grid; place-items:center; }
.tb-fcell img { width:58px; height:58px; object-fit:contain; filter:drop-shadow(0 8px 16px rgba(0,0,0,.45)); }

@media (prefers-reduced-motion: reduce){
  .wwb-media img, .wwb-step, .wwb-ball-orb, .wwb-faq-ico { transition:none !important; }
  .wwb-block:hover .wwb-media img, .wwb-step:hover, .wwb-ball:hover .wwb-ball-orb { transform:none !important; }
}
`;
