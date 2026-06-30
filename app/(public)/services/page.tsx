import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SERVICES, PROCESS_STEPS, WHY_US } from "@/config/marketing";
import {
  Hero, HeroActions, Band, Head, Card, Grid, Feature, Cta, DISPLAY, TEAL, GOLD,
} from "@/components/marketing/amx-ui";
import { ForwardDeployed } from "@/components/home/forward-deployed";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Explore ARGANA MEDIA's services: website & app development, digital marketing, design, content, hosting & website care and business IT support — one team for your whole online presence.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />

      <Hero
        eyebrow="Our Services"
        title={<>One team for your whole <span style={{ background: "linear-gradient(110deg,#35E0E8,#9BD4F2 45%,#F3CD86)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>online presence</span></>}
        sub="From the first website to long-term marketing and support, our services connect together so you get a joined-up result — not six separate suppliers to manage."
        actions={<HeroActions secondaryHref="/pricing" secondaryLabel="View Pricing" />}
      />

      <Band>
        <Head eyebrow="What we do" title="Six services, one accountable team" center
          sub="Each area works on its own or together. Most clients start with one and grow into the rest." />
        <div style={{ marginTop: 44 }}>
          <Grid min={300} gap={18}>
            {SERVICES.map((s) => (
              <Link key={s.title} href={s.href} className="amx-card" style={{ display: "flex", flexDirection: "column", height: "100%", padding: 26, borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", textDecoration: "none" }}>
                <span style={{ display: "grid", placeItems: "center", width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#35E0E8,#4DA8F5 60%,#F3CD86)", color: "#0A0E18", marginBottom: 18 }}>
                  <s.icon size={22} strokeWidth={1.9} />
                </span>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 20, margin: "0 0 9px", color: "#F4F7FC" }}>{s.title}</h3>
                <p style={{ margin: "0 0 16px", fontSize: 14.5, lineHeight: 1.55, color: "#A7B0C2" }}>{s.blurb}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                  {s.points.map((p) => (
                    <span key={p} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13.5, color: "#8A93A6" }}>
                      <Check size={15} strokeWidth={2.4} color={TEAL} /> {p}
                    </span>
                  ))}
                </div>
                <span style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 600, color: GOLD }}>
                  Explore {s.title} <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </Grid>
        </div>
      </Band>

      <Band borderTop bg="linear-gradient(180deg, rgba(255,255,255,0.012), transparent)">
        <Head eyebrow="How it works" eyebrowColor={TEAL} title="Simple, transparent, joined-up" center />
        <div style={{ marginTop: 44 }}>
          <Grid min={230} gap={16}>
            {PROCESS_STEPS.map((s, i) => (
              <Card key={s.title} style={{ height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 13, background: "rgba(53,224,232,0.1)", color: TEAL }}>
                    <s.icon size={20} strokeWidth={1.8} />
                  </span>
                  <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 15, color: "rgba(255,255,255,0.2)" }}>0{i + 1}</span>
                </div>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 18, margin: "0 0 8px", color: "#EEF2F9" }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#8A93A6" }}>{s.body}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </Band>

      <Band borderTop>
        <Head eyebrow="Why ARGANA MEDIA" title="A partner you can rely on" center
          sub="We keep things clear, honest and joined-up — so working with us feels easy from the first call onwards." />
        <div style={{ marginTop: 44 }}>
          <Grid min={280} gap={16}>
            {WHY_US.map((w) => <Feature key={w.title} icon={w.icon} title={w.title} body={w.body} />)}
          </Grid>
        </div>
      </Band>

      <Cta />

      <ForwardDeployed />
    </>
  );
}
