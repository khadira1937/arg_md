import type { Metadata } from "next";
import { Globe, ShoppingCart, Palette, Megaphone, PenLine, ServerCog, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Hero, HeroActions, Band, Head, Card, Grid, Cta, DISPLAY, TEAL } from "@/components/marketing/amx-ui";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  description:
    "The kinds of projects ARGANA MEDIA delivers — websites, online stores, branding, marketing campaigns, content and ongoing website care for growing businesses.",
  path: "/portfolio",
});

const WORK = [
  { icon: Globe, type: "Business Website", cat: "Website & Design", body: "A clean, modern website with clear messaging, on-page SEO and a care plan to keep it healthy after launch.", g: "linear-gradient(135deg,#0E2233,#123B4A 60%,#1C5563)", img: "/portfolio/portfolio_business_website.png", tags: ["Web design", "Copywriting", "SEO setup"] },
  { icon: ShoppingCart, type: "Online Store", cat: "E-commerce", body: "An e-commerce build with product pages, secure payments and the integrations a small retailer needs to start selling.", g: "linear-gradient(135deg,#161B2E,#1E2647 60%,#2B3566)", img: "/portfolio/portfolio_online_store.png", tags: ["E-commerce", "Payments", "Training"] },
  { icon: Palette, type: "Brand Identity", cat: "Design", body: "A complete visual identity — logo, colours, type and guidelines — that makes a new business look established from day one.", g: "linear-gradient(135deg,#241B0E,#3A2C12 60%,#5A4520)", img: "/portfolio/portfolio_brand_identity.png", tags: ["Logo", "Brand kit", "Guidelines"] },
  { icon: Megaphone, type: "Local Marketing Campaign", cat: "Digital Marketing", body: "Local SEO, a Google Business Profile refresh and a content plan designed to bring in nearby customers.", g: "linear-gradient(135deg,#0E2A22,#103A2C 60%,#1A5141)", img: "/portfolio/portfolio_marketing_campaign.png", tags: ["Local SEO", "Content", "GBP"] },
  { icon: PenLine, type: "Content & Social", cat: "Digital Media & Content", body: "An ongoing content programme — blog articles and social posts — that keeps a brand visible and consistent.", g: "linear-gradient(135deg,#2A1430,#3A1B45 60%,#4E2659)", img: "/portfolio/portfolio_content_social.png", tags: ["Blog", "Social", "Strategy"] },
  { icon: ServerCog, type: "Website Care & Hosting", cat: "Hosting & Website Care", body: "Managed hosting support with backups, updates, security and monitoring for a business that wanted peace of mind.", g: "linear-gradient(135deg,#0E2233,#14323F 60%,#1C5563)", img: "/portfolio/portfolio_hosting_care.png", tags: ["Hosting", "Backups", "Care plan"] },
];

const APPROACH = [
  { title: "Discovery first", body: "Every project starts by understanding your business, audience and goals — so the work is built around results, not guesswork." },
  { title: "Designed and built with care", body: "We sweat the details: clear structure, quality content, accessible design and reliable technology." },
  { title: "Supported after launch", body: "We don't disappear. Care plans, marketing and support keep your online presence improving over time." },
];

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }])} />

      <Hero
        eyebrow="Our Work"
        title="Built across media, marketing & the web"
        sub="You've probably seen the kind of work we do. Here's a snapshot of the projects we deliver for growing businesses — we're building our public case-study library as projects go live, and we're always happy to share examples relevant to your sector on a call."
        actions={<HeroActions secondaryHref="/contact" secondaryLabel="Request a Quote" />}
      />

      <Band>
        <Head eyebrow="What we deliver" title="Projects across every service" center
          sub="A snapshot of the work we take on. Real case studies are shared on request." />
        <div style={{ marginTop: 44 }}>
          <Grid min={280} gap={18}>
            {WORK.map((w) => (
              <div key={w.type} className="amx-card amx-port" style={{ display: "flex", flexDirection: "column", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.022)" }}>
                <div style={{ position: "relative", height: 150, overflow: "hidden" }}>
                  <div className="amx-port-img" style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 90% at 28% 12%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(80% 120% at 100% 100%, rgba(53,224,232,0.10), transparent 60%), ${w.g}`, transition: "transform .5s cubic-bezier(.22,1,.36,1)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 20%, rgba(255,255,255,0.08), transparent 60%)" }} />
                  <span style={{ position: "absolute", left: 16, top: 16, display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#F4F7FC", background: "rgba(7,11,20,0.5)", backdropFilter: "blur(6px)", padding: "6px 11px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.12)" }}>{w.cat}</span>
                  <span style={{ position: "absolute", right: 16, bottom: 16, display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 12, background: "rgba(7,11,20,0.45)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.14)", color: "#fff" }}><w.icon size={18} strokeWidth={1.9} /></span>
                </div>
                <div style={{ padding: 22, display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 19, margin: "0 0 8px", color: "#EEF2F9" }}>{w.type}</h3>
                  <p style={{ margin: "0 0 16px", fontSize: 13.5, lineHeight: 1.55, color: "#8A93A6", flex: 1 }}>{w.body}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {w.tags.map((t) => <span key={t} style={{ fontSize: 12, color: "#9AA4B8", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", padding: "4px 11px", borderRadius: 100 }}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </Grid>
        </div>
      </Band>

      <Band borderTop bg="linear-gradient(180deg, rgba(255,255,255,0.012), transparent)">
        <Head eyebrow="Our approach" eyebrowColor={TEAL} title="How we make work that lasts" center />
        <div style={{ marginTop: 44 }}>
          <Grid min={280} gap={18}>
            {APPROACH.map((a, i) => (
              <Card key={a.title}>
                <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 12, background: "rgba(243,205,134,0.12)", color: "#F3CD86", fontFamily: DISPLAY, fontWeight: 600, marginBottom: 16 }}>0{i + 1}</span>
                <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 18, margin: "0 0 8px", color: "#EEF2F9" }}>{a.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "#8A93A6" }}>{a.body}</p>
              </Card>
            ))}
          </Grid>
        </div>
        <div style={{ marginTop: 36, display: "flex", justifyContent: "center", alignItems: "center", gap: 8, color: "#7E8AA3", fontSize: 13 }}>
          <ArrowUpRight size={15} /> Real case studies are shared on request — just ask on your call.
        </div>
      </Band>

      <Cta title="Imagine your project here" sub="Tell us what you're trying to achieve and we'll show you how we'd approach it — and share relevant examples." secondaryLabel="Request a Quote" />
    </>
  );
}
