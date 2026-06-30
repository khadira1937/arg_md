import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, PhoneCall } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { SERVICE_DETAILS } from "@/config/services-content";
import { CALENDLY_URL } from "@/config/cta";
import {
  Hero, Band, Head, Card, CheckRow, Grid, Cta, Btn, Eyebrow,
  DISPLAY, TEAL, GOLD,
} from "@/components/marketing/amx-ui";

const PROCESS = [
  { n: "01", title: "Discover", body: "A free, no-pressure call to understand your business, goals and audience." },
  { n: "02", title: "Plan", body: "A written proposal with clear scope, timeline and a fixed quote — no jargon." },
  { n: "03", title: "Create", body: "We design, write, build and set everything up, keeping you in the loop." },
  { n: "04", title: "Support", body: "After launch we support, maintain and improve — your presence keeps getting better." },
];

export function ServicePage({ slug }: { slug: string }) {
  const d = SERVICE_DETAILS[slug];
  if (!d) notFound();
  const Icon = d.icon;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: d.category, path: `/${d.slug}` },
          ]),
          serviceJsonLd({ name: d.category, description: d.heroSub, path: `/${d.slug}` }),
        ]}
      />

      <Hero
        eyebrow={d.eyebrow}
        eyebrowColor={TEAL}
        title={d.heroHeadline}
        sub={d.heroSub}
        badge={
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 14px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", marginBottom: 22 }}>
            <span style={{ display: "grid", placeItems: "center", width: 22, height: 22, borderRadius: 7, background: "linear-gradient(135deg,#35E0E8,#F3CD86)", color: "#0A0E18" }}>
              <Icon size={13} strokeWidth={2} />
            </span>
            <span style={{ fontSize: 12.5, letterSpacing: "0.05em", color: "var(--argana-on-surface)", fontWeight: 500 }}>ARGANA MEDIA Service</span>
          </span>
        }
        actions={
          <>
            <Btn href={CALENDLY_URL} variant="gold" icon={false}><PhoneCall size={16} /> Book a Call</Btn>
            <Btn href="/contact" variant="ghost">Request a Quote</Btn>
          </>
        }
      />

      {/* Intro */}
      <Band max={860} pad="clamp(48px,7vh,80px)">
        <p style={{ margin: 0, textAlign: "center", fontSize: "clamp(16px,1.8vw,19px)", lineHeight: 1.65, color: "var(--argana-on-surface-muted)" }}>{d.intro}</p>
      </Band>

      {/* Rich content sections */}
      {d.sections && d.sections.length > 0 && (
        <Band max={900} pad="clamp(8px,2vh,28px)">
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(40px,6vh,64px)" }}>
            {d.sections.map((s) => (
              <div key={s.title}>
                <span style={{ display: "inline-block", width: 34, height: 3, borderRadius: 3, background: `linear-gradient(90deg, ${TEAL}, ${GOLD})`, marginBottom: 18 }} />
                <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(24px,3.4vw,34px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0, color: "var(--argana-on-surface)" }}>{s.title}</h2>
                {s.body.map((p, i) => (
                  <p key={i} style={{ margin: "16px 0 0", fontSize: 16.5, lineHeight: 1.7, color: "var(--argana-on-surface-muted)" }}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </Band>
      )}

      {/* What's included */}
      <Band borderTop bg="linear-gradient(180deg, rgba(255,255,255,0.012), transparent)">
        <Head eyebrow="What's included" title={`Our ${d.category.toLowerCase()} services`} center
          sub="Pick exactly what you need now and grow into the rest when you're ready — it's all delivered by one team." />
        <div style={{ marginTop: 44 }}>
          <Grid min={300} gap={18}>
            {d.offerings.map((o) => (
              <Card key={o.title} style={{ height: "100%" }}>
                <span style={{ display: "inline-block", width: 34, height: 3, borderRadius: 3, background: `linear-gradient(90deg, ${TEAL}, ${GOLD})`, marginBottom: 16 }} />
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 18.5, margin: "0 0 8px", color: "var(--argana-on-surface)" }}>{o.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--argana-on-surface-muted)" }}>{o.body}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </Band>

      {/* Packages (priced services) */}
      {d.packages && d.packages.length > 0 && (
        <Band id="packages" borderTop>
          <Head eyebrow="Packages" title={d.packagesTitle ?? `Our ${d.category.toLowerCase()} packages`} center sub={d.packagesSub} />
          <div style={{ marginTop: 44 }}>
            <Grid min={270} gap={18}>
              {d.packages.map((p) => (
                <Card
                  key={p.name}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    ...(p.popular
                      ? { border: "1px solid rgba(243,205,134,0.4)", background: "linear-gradient(165deg, rgba(243,205,134,0.07), rgba(255,255,255,0.02))" }
                      : {}),
                  }}
                >
                  {p.popular && (
                    <span style={{ position: "absolute", top: 16, right: 16, fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, color: "#0A0E18", background: "linear-gradient(135deg,#F6D79A,#E3A94E)", padding: "5px 10px", borderRadius: 100 }}>Most popular</span>
                  )}
                  <span style={{ display: "inline-block", width: 36, height: 3, borderRadius: 3, background: p.popular ? "linear-gradient(90deg,#F6D79A,#E3A94E)" : `linear-gradient(90deg, ${TEAL}, ${GOLD})`, marginBottom: 18 }} />
                  <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 21, margin: "0 0 6px", color: "var(--argana-on-surface)" }}>{p.name}</h3>
                  <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--argana-on-surface-muted)", minHeight: 34 }}>{p.bestFor}</p>
                  <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 26, color: "var(--argana-on-surface)", marginBottom: 20 }}>{p.price}</div>
                  {p.specs && p.specs.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 24, flex: 1 }}>
                      {p.specs.map((s) => <CheckRow key={s}>{s}</CheckRow>)}
                    </div>
                  )}
                  <Btn href="/contact" variant={p.popular ? "gold" : "ghost"} icon={false}>Get a Quote</Btn>
                </Card>
              ))}
            </Grid>
            {d.packagesNote && (
              <p style={{ margin: "28px auto 0", maxWidth: 780, textAlign: "center", fontSize: 13, color: "var(--argana-on-surface-muted)", lineHeight: 1.65 }}>{d.packagesNote}</p>
            )}
          </div>
        </Band>
      )}

      {/* Pricing note (quote-only services) */}
      {!d.packages && d.pricingNote && (
        <Band id="packages" borderTop bg="linear-gradient(180deg, rgba(243,205,134,0.03), transparent 40%)">
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <Head eyebrow="Pricing" eyebrowColor={GOLD} title={d.pricingTitle ?? "Every project is bespoke"} center />
            <p style={{ margin: "20px auto 0", maxWidth: 680, fontSize: 16.5, lineHeight: 1.7, color: "var(--argana-on-surface-muted)" }}>{d.pricingNote}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 13, justifyContent: "center", marginTop: 30 }}>
              <Btn href={CALENDLY_URL} variant="gold" icon={false}><PhoneCall size={16} /> Book a Call</Btn>
              <Btn href="/contact" variant="ghost">Request a Quote</Btn>
            </div>
          </div>
        </Band>
      )}

      {/* Outcomes */}
      <Band>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: 44, alignItems: "center" }}>
          <div>
            <Eyebrow color={GOLD}>Why it matters</Eyebrow>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(26px,3.6vw,40px)", lineHeight: 1.08, letterSpacing: "-0.02em", margin: 0, color: "var(--argana-on-surface)" }}>What you can expect</h2>
            <p style={{ margin: "18px 0 28px", fontSize: 16.5, lineHeight: 1.6, color: "var(--argana-on-surface-muted)", maxWidth: 480 }}>
              We focus on outcomes, not buzzwords. Here&apos;s what working with us on {d.category.toLowerCase()} typically means for your business.
            </p>
            <Btn href={CALENDLY_URL} variant="gold" icon={false}><PhoneCall size={16} /> Start a conversation</Btn>
          </div>
          <Card hover={false} style={{ padding: "28px 26px", display: "flex", flexDirection: "column", gap: 16 }}>
            {d.outcomes.map((o) => <CheckRow key={o}>{o}</CheckRow>)}
          </Card>
        </div>
      </Band>

      {/* Process */}
      <Band borderTop bg="linear-gradient(180deg, rgba(53,224,232,0.02), transparent 40%)">
        <Head eyebrow="How we work" eyebrowColor={TEAL} title="A clear path from idea to results" center
          sub="From first hello to long-term growth, you'll always know what's happening and what comes next." />
        <div style={{ marginTop: 44 }}>
          <Grid min={230} gap={16}>
            {PROCESS.map((p) => (
              <Card key={p.n} style={{ height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 13, fontFamily: DISPLAY, fontWeight: 600, fontSize: 16, color: "#0A0E18", background: "linear-gradient(135deg,#F6D79A,#E3A94E)" }}>{p.n}</span>
                </div>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 18, margin: "0 0 8px", color: "var(--argana-on-surface)" }}>{p.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--argana-on-surface-muted)" }}>{p.body}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </Band>

      {/* FAQ */}
      {d.faq.length > 0 && (
        <Band>
          <Head eyebrow="FAQ" title={`${d.category} questions`} center />
          <div style={{ maxWidth: 760, margin: "40px auto 0" }}>
            {d.faq.map((f) => (
              <details key={f.question} className="amx-faq">
                <summary>{f.question}</summary>
                <div>{f.answer}</div>
              </details>
            ))}
          </div>
        </Band>
      )}

      {/* Related */}
      {d.related.length > 0 && (
        <Band borderTop>
          <Head eyebrow="Explore more" title="Related services" center />
          <div style={{ marginTop: 40 }}>
            <Grid min={260} gap={18}>
              {d.related.map((r) => (
                <Link key={r.href} href={r.href} className="amx-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: 24, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", textDecoration: "none" }}>
                  <span style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 17, color: "var(--argana-on-surface)" }}>{r.title}</span>
                  <ArrowRight size={18} color={TEAL} />
                </Link>
              ))}
            </Grid>
          </div>
        </Band>
      )}

      <Cta
        title={d.ctaTitle ?? `Let's talk about your ${d.category.toLowerCase()} project`}
        sub="Book a free, no-pressure call or request a quote. We'll listen first, then suggest the right next step for your business."
      />
    </>
  );
}
