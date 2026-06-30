import type { Metadata } from "next";
import Image from "next/image";
import { PhoneCall, Mail, Clock, Plus, ExternalLink } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";
import { CALENDLY_URL } from "@/config/cta";
import { Hero, Band, Head, Btn, DISPLAY, TEAL, GOLD, SKY } from "@/components/marketing/amx-ui";
import TechBalls from "@/components/marketing/tech-balls";
import { SOLUTIONS, PRINCIPLES, PROCESS, REASONS, FAQS } from "@/data/what-we-build";

export const metadata: Metadata = pageMetadata({
  title: "What We Build",
  description:
    "The websites and web applications ARGANA MEDIA designs and develops — corporate sites, e-commerce, booking platforms, marketing sites, custom applications and developer documentation. See our approach, process and technology.",
  path: "/what-we-build",
});

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
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(23px,3vw,30px)", lineHeight: 1.1, letterSpacing: "-0.01em", margin: "16px 0 0", color: "var(--argana-on-surface)" }}>{s.title}</h3>
                <p style={{ margin: "14px 0 0", fontSize: 15.5, lineHeight: 1.62, color: "var(--argana-on-surface-muted)" }}>{s.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "10px 22px", margin: "22px 0 0" }}>
                  {s.features.map((f) => (
                    <span key={f} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 14, lineHeight: 1.45, color: "var(--argana-on-surface)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.4" style={{ flexShrink: 0, marginTop: 2 }}><path d="M20 6 9 17l-5-5" /></svg>{f}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "22px 0 0" }}>
                  {s.tech.map((t) => (
                    <span key={t} style={{ fontSize: 12, fontWeight: 500, color: "var(--argana-outline)", border: "1px solid var(--argana-outline-variant)", background: "transparent", padding: "5px 12px", borderRadius: 100 }}>{t}</span>
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
            <div key={p.title} className="amx-card" style={{ padding: 26, borderRadius: 18, border: "1px solid var(--argana-outline-variant)", background: "transparent" }}>
              <span style={{ display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: 13, background: "rgba(53,224,232,0.1)", color: TEAL, marginBottom: 18 }}><p.icon size={21} strokeWidth={1.8} /></span>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 18.5, margin: "0 0 9px", color: "var(--argana-on-surface)" }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--argana-on-surface-muted)" }}>{p.body}</p>
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
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 17.5, margin: "0 0 7px", color: "var(--argana-on-surface)" }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: "var(--argana-on-surface-muted)" }}>{p.body}</p>
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
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 18, margin: "0 0 9px", color: "var(--argana-on-surface)", display: "flex", alignItems: "center", gap: 7 }}>
                  {r.title}{r.href && <ExternalLink size={14} style={{ color: "var(--argana-outline)" }} />}
                </h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--argana-on-surface-muted)" }}>{r.body}</p>
              </>
            );
            return r.href ? (
              <a key={r.title} href={r.href} target="_blank" rel="noopener noreferrer" className="amx-card" style={{ display: "block", padding: 26, borderRadius: 18, border: "1px solid var(--argana-outline-variant)", background: "transparent", textDecoration: "none" }}>{inner}</a>
            ) : (
              <div key={r.title} className="amx-card" style={{ padding: 26, borderRadius: 18, border: "1px solid var(--argana-outline-variant)", background: "transparent" }}>{inner}</div>
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
          <span className="wwb-book-eyebrow">Free discovery call</span>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(28px,4.4vw,46px)", lineHeight: 1.06, letterSpacing: "-0.02em", margin: "0 auto", maxWidth: 620, color: "var(--argana-on-surface)" }}>Start with a conversation</h2>
          <p style={{ margin: "20px auto 0", maxWidth: 540, fontSize: 16.5, lineHeight: 1.6, color: "var(--argana-on-surface-muted)" }}>
            Tell us what you&apos;re trying to build. We&apos;ll talk it through, suggest the right approach, and send a clear proposal with scope, timeline and a fixed quote. No pressure, no obligation — just useful advice.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 13, justifyContent: "center", marginTop: 32 }}>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="am-cta"><PhoneCall size={16} /> Book a Call</a>
            <Btn href="/contact" variant="ghost" icon={false}>Send a message</Btn>
          </div>
          <div className="wwb-book-meta">
            <a href={`tel:${brand.phoneHref}`} className="wwb-book-link"><PhoneCall size={15} /> {brand.phone}</a>
            <a href={`mailto:${brand.email.hello}`} className="wwb-book-link"><Mail size={15} /> {brand.email.hello}</a>
            <span className="wwb-book-link wwb-book-link--muted"><Clock size={15} /> Mon–Fri · 9am–6pm UK time</span>
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
.wwb-media { position:relative; aspect-ratio:4/3; border-radius:22px; overflow:hidden; border:1px solid var(--argana-outline-variant); box-shadow:0 24px 60px -36px rgba(0,0,0,.25); }
.wwb-media img { transition:transform .6s cubic-bezier(.22,1,.36,1); }
.wwb-block:hover .wwb-media img { transform:scale(1.04); }
.wwb-soltag { display:inline-flex; align-items:center; gap:8px; font-weight:600; font-size:13px; letter-spacing:0.04em; color:var(--argana-on-surface); border:1px solid var(--argana-outline-variant); background:transparent; padding:6px 12px; border-radius:100px; }
@media (max-width:900px){ .wwb-block{ grid-template-columns:1fr; gap:24px; } .wwb-block--rev .wwb-media,.wwb-block--rev .wwb-body{ order:0; } }

.wwb-steps { list-style:none; margin:clamp(40px,6vh,60px) 0 0; padding:0; display:grid; grid-template-columns:repeat(auto-fit,minmax(min(230px,100%),1fr)); gap:18px; }
.wwb-step { position:relative; padding:26px 22px 24px; border-radius:18px; border:1px solid var(--argana-outline-variant); background:transparent; overflow:hidden; transition:border-color .35s, transform .35s; }
.wwb-step:hover { border-color:var(--argana-burnt); transform:translateY(-4px); }
.wwb-step-bar { position:absolute; top:0; left:0; right:0; height:3px; background:var(--argana-burnt); opacity:.6; }
.wwb-step-n { display:grid; place-items:center; width:38px; height:38px; border-radius:11px; font-weight:600; font-size:16px; color:#fff; background:var(--argana-on-surface); }

.wwb-faq { border:1px solid var(--argana-outline-variant); border-radius:16px; background:transparent; overflow:hidden; transition:border-color .3s; }
.wwb-faq + .wwb-faq { margin-top:12px; }
.wwb-faq[open] { border-color:var(--argana-burnt); }
.wwb-faq summary { list-style:none; cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:18px; padding:19px 22px; font-weight:500; font-size:16.5px; color:var(--argana-on-surface); }
.wwb-faq summary::-webkit-details-marker { display:none; }
.wwb-faq summary:hover { color:var(--argana-burnt); }
.wwb-faq-ico { flex-shrink:0; color:var(--argana-on-surface); transition:transform .3s ease; }
.wwb-faq[open] .wwb-faq-ico { transform:rotate(135deg); color:var(--argana-burnt); }
.wwb-faq-body { margin:0; padding:0 22px 20px; font-size:14.5px; line-height:1.65; color:var(--argana-on-surface-muted); }

.wwb-book { position:relative; border-radius:24px; border:1px solid var(--argana-outline-variant); background:transparent; padding:clamp(44px,7vw,80px) clamp(24px,5vw,56px); text-align:center; }
.wwb-book-eyebrow { display:inline-block; font-size:12.5px; letter-spacing:0.1em; text-transform:uppercase; color:var(--argana-burnt); font-weight:600; margin-bottom:18px; padding:6px 14px; border:1px solid var(--argana-outline-variant); border-radius:100px; }
.wwb-book-meta { display:flex; flex-wrap:wrap; justify-content:center; gap:14px 26px; margin-top:30px; padding-top:26px; border-top:1px solid var(--argana-outline-variant); }
.wwb-book-link { display:inline-flex; align-items:center; gap:8px; font-size:14.5px; color:var(--argana-on-surface); text-decoration:none; transition:color .25s; }
.wwb-book-link--muted { color:var(--argana-on-surface-muted); }
a.wwb-book-link:hover { color:var(--argana-burnt); }

.tb-wrap { position:relative; max-width:980px; margin:clamp(38px,5vh,58px) auto 0; }
.tb-fallback { position:absolute; inset:0; display:grid; place-items:center; transition:opacity .5s ease; pointer-events:none; z-index:1; }
.tb-fcell { display:grid; place-items:center; }
.tb-fcell img { width:58px; height:58px; object-fit:contain; filter:drop-shadow(0 8px 16px rgba(0,0,0,.18)); }

@media (prefers-reduced-motion: reduce){
  .wwb-media img, .wwb-step, .wwb-faq-ico { transition:none !important; }
  .wwb-block:hover .wwb-media img, .wwb-step:hover { transform:none !important; }
}
`;
