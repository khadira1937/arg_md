import Link from "next/link";
import type { Metadata } from "next";
import { Check, ArrowRight, BadgeCheck, MessageSquare, Repeat } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SERVICE_PACKAGES } from "@/config/marketing";
import { Hero, HeroActions, Band, Head, Card, Grid, Feature, Cta, DISPLAY, TEAL, GOLD } from "@/components/marketing/amx-ui";

export const metadata: Metadata = pageMetadata({
  title: "How We Work & Pricing",
  description:
    "Every ARGANA MEDIA project is quoted to fit your goals and budget. See the ways we work together — websites, marketing and website care — then book a call for a tailored quote.",
  path: "/pricing",
});

const HOW = [
  { icon: MessageSquare, title: "We talk first", body: "A free discovery call to understand your business, goals and budget — no obligation, no pressure." },
  { icon: BadgeCheck, title: "You get a fixed quote", body: "A written proposal with clear scope, timeline and a fixed price agreed before any work begins." },
  { icon: Repeat, title: "Start small, grow later", body: "Begin with one project or plan and add services as your business grows. Cancel monthly plans anytime." },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])} />

      <Hero
        eyebrow="Ways to Work Together"
        title={<>Clear, fair &amp; <span style={{ color: TEAL }}>tailored to you</span></>}
        sub="Every business is different, so we don't sell fixed boxes. Below are common ways to work with us — your final quote is always shaped around your goals and agreed before any work starts."
        actions={<HeroActions secondaryHref="/services" secondaryLabel="View Services" />}
      />

      <Band>
        <Head eyebrow="How pricing works" title="Simple, honest and no surprises" center />
        <div style={{ marginTop: 44 }}>
          <Grid min={280} gap={18}>
            {HOW.map((h) => <Feature key={h.title} icon={h.icon} title={h.title} body={h.body} />)}
          </Grid>
        </div>
      </Band>

      <Band borderTop bg="linear-gradient(180deg, rgba(255,255,255,0.012), transparent)">
        <Head eyebrow="Packages" title="Starting points by service" center
          sub="A few common ways clients work with us. These are starting points for a conversation — tell us your goals and we'll shape the right plan." />
        <div style={{ marginTop: 44, display: "flex", flexDirection: "column", gap: 40 }}>
          {SERVICE_PACKAGES.map((group) => (
            <div key={group.key}>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 20, margin: "0 0 18px", color: "#F4F7FC", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 22, height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${TEAL}, ${GOLD})` }} />{group.label}
              </h3>
              <Grid min={250} gap={16}>
                {group.packages.map((p) => (
                  <Card key={p.name} style={{ height: "100%", display: "flex", flexDirection: "column", border: p.popular ? "1px solid rgba(243,205,134,0.4)" : undefined }}>
                    {p.popular && <span style={{ alignSelf: "flex-start", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, color: "#0A0E18", background: "linear-gradient(135deg,#F6D79A,#E3A94E)", padding: "4px 10px", borderRadius: 100, marginBottom: 12 }}>Most popular</span>}
                    <h4 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 18, margin: "0 0 4px", color: "#F4F7FC" }}>{p.name}</h4>
                    <p style={{ margin: "0 0 16px", fontSize: 13, color: "#8A93A6" }}>{p.bestFor}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22, flex: 1 }}>
                      {p.specs.map((s) => (
                        <span key={s} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13.5, color: "#C7CEDC" }}>
                          <Check size={16} strokeWidth={2.3} color={TEAL} style={{ flexShrink: 0, marginTop: 1 }} /> {s}
                        </span>
                      ))}
                    </div>
                    <Link href="/book-a-call" className={p.popular ? "amx-gold" : "amx-ghost"} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, textDecoration: "none", fontWeight: 600, fontSize: 14, padding: "12px 16px", borderRadius: 11, ...(p.popular ? { color: "#0A0E18", background: "linear-gradient(135deg,#F6D79A,#E3A94E)" } : { color: "#EEF2F9", border: "1px solid rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.02)" }) }}>
                      Get a quote
                    </Link>
                  </Card>
                ))}
              </Grid>
            </div>
          ))}
        </div>
        <p style={{ margin: "32px auto 0", maxWidth: 640, textAlign: "center", fontSize: 13.5, color: "#7E8AA3" }}>
          We keep prices off the page on purpose — every project is unique, so every quote is too. Book a call for a clear, fixed price tailored to you.
        </p>
      </Band>

      <Band borderTop>
        <Head eyebrow="Explore services" title="See what's included" center sub="Browse each service for the full detail, then book a call for a tailored quote." />
        <div style={{ marginTop: 36, display: "flex", justifyContent: "center" }}>
          <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, color: GOLD, textDecoration: "none" }}>
            View all services <ArrowRight size={16} />
          </Link>
        </div>
      </Band>

      <Cta />
    </>
  );
}
