import type { Metadata } from "next";
import { Users, BadgeCheck, HeartHandshake, ShieldCheck, Clock, MessagesSquare } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";
import { company } from "@/config/company";
import {
  Hero, HeroActions, Band, Head, Card, Grid, Feature, Cta, DISPLAY, TEAL, GOLD,
} from "@/components/marketing/amx-ui";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `Learn about ${brand.name} — a digital media, marketing and web development agency serving the UK and Europe, helping growing businesses build and manage their online presence.`,
  path: "/about",
});

const VALUES = [
  { icon: Users, title: "One team, everything covered", body: "Marketing, content, design, websites and support under one roof — so your online presence is joined-up, not scattered across freelancers." },
  { icon: BadgeCheck, title: "Honest and transparent", body: "Clear scope, fixed quotes and plain-English advice. We tell you what will help — and what won't." },
  { icon: HeartHandshake, title: "In it for the long run", body: "We build relationships, not just projects. Care plans and support keep your business supported well after launch." },
  { icon: ShieldCheck, title: "A real, registered business", body: "ARGANA MEDIA is a real, registered UK business — accountable, contactable and here to stay." },
  { icon: Clock, title: "Responsive and reliable", body: "Friendly people who reply, keep their word and hit the timelines we agree together." },
  { icon: MessagesSquare, title: "Creative meets technical", body: "We pair strategy and design with solid engineering, so the work both looks great and performs." },
];

const FACTS = [
  { label: "Founded", value: company.foundingYear },
  { label: "Headquarters", value: company.headquarters },
  { label: "Legal entity", value: company.legalEntity },
  { label: "Company number", value: company.companyNumber },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      <Hero
        eyebrow="About ARGANA MEDIA"
        title={<>Helping businesses <span style={{ color: TEAL }}>grow online</span>, without the hassle</>}
        sub={`${brand.name} is a digital media and marketing agency serving the UK and Europe, with real technical capability. We help growing businesses build, improve and manage their online presence — marketing, content, design, web development, hosting support and business IT, all from one dependable team.`}
        actions={<HeroActions secondaryHref="/services" secondaryLabel="View Services" />}
      />

      {/* Story */}
      <Band max={1100}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: 44, alignItems: "center" }}>
          <div>
            <Head eyebrow="Who we are" title="One business, every part of your online presence handled" />
            <p style={{ margin: "20px 0 0", fontSize: 16.5, lineHeight: 1.7, color: "#A7B0C2" }}>
              Most small and growing businesses end up juggling a separate web developer, a marketer, a designer and an IT person — none of whom talk to each other. The result is wasted time, mixed messages and a brand that never quite feels joined-up. We started {brand.name} to fix exactly that.
            </p>
            <p style={{ margin: "16px 0 0", fontSize: 16.5, lineHeight: 1.7, color: "#A7B0C2" }}>
              We bring strategy, creativity and technical delivery together under one roof. Whether you need a brand-new website, more customers coming through the door, sharper design, fresh content or simply someone reliable to keep everything running, you have one team that already knows your business and one point of contact who actually answers.
            </p>
            <p style={{ margin: "16px 0 0", fontSize: 16.5, lineHeight: 1.7, color: "#A7B0C2" }}>
              We&apos;re proud to be a properly registered UK company. {company.legalEntity} (company number {company.companyNumber}) is a real, accountable business you can build a long-term relationship with, not a faceless freelancer who disappears after launch.
            </p>
          </div>
          <Card hover={false} style={{ padding: "30px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { k: "6", l: "Connected services", c: TEAL },
                { k: "UK", l: "Registered company", c: GOLD },
                { k: "1", l: "Accountable team", c: "#7CC6F0" },
                { k: "Fixed", l: "Quotes, no surprises", c: "#34D399" },
              ].map((x) => (
                <div key={x.l} style={{ padding: 18, borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.022)" }}>
                  <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 26, color: x.c }}>{x.k}</div>
                  <div style={{ fontSize: 12.5, color: "#8A93A6", marginTop: 4 }}>{x.l}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Band>

      {/* How we're different */}
      <Band max={860} borderTop pad="clamp(48px,7vh,80px)">
        <Head eyebrow="How we're different" eyebrowColor={TEAL} title="Trust, earned the honest way" center />
        <p style={{ margin: "22px auto 0", maxWidth: 720, textAlign: "center", fontSize: 16.5, lineHeight: 1.7, color: "#A7B0C2" }}>
          We earn trust the slow, honest way: clear scope, fixed quotes, plain-English advice and work we&apos;re genuinely proud to put our name to. We&apos;d rather tell you &ldquo;you don&apos;t need that yet&rdquo; than sell you something that won&apos;t move the needle. And we don&apos;t vanish once a project ships — our care plans and ongoing support mean your website and marketing keep improving long after launch.
        </p>
      </Band>

      {/* Values */}
      <Band borderTop bg="linear-gradient(180deg, rgba(255,255,255,0.012), transparent)">
        <Head eyebrow="What we stand for" title="Our values" center />
        <div style={{ marginTop: 44 }}>
          <Grid min={280} gap={16}>
            {VALUES.map((v) => <Feature key={v.title} icon={v.icon} title={v.title} body={v.body} />)}
          </Grid>
        </div>
      </Band>

      {/* Company facts */}
      <Band borderTop>
        <Head eyebrow="Company" title="The essentials" center sub="Real, verifiable details for a business you can trust." />
        <div style={{ marginTop: 40 }}>
          <Grid min={220} gap={14}>
            {FACTS.map((f) => (
              <Card key={f.label} hover={false} style={{ padding: 22 }}>
                <p style={{ margin: 0, fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "#54607A" }}>{f.label}</p>
                <p style={{ margin: "8px 0 0", fontFamily: DISPLAY, fontWeight: 600, fontSize: 17, color: "#F4F7FC" }}>{f.value}</p>
              </Card>
            ))}
          </Grid>
          <p style={{ margin: "26px auto 0", maxWidth: 760, textAlign: "center", fontSize: 13.5, color: "#8A93A6" }}>
            {company.legalEntity}. Registered office: {company.registeredOffice}.
          </p>
        </div>
      </Band>

      <Cta title={`Work with ${brand.name}`} sub="Tell us where you'd like your business to be online, and we'll help you get there. Start with a free, no-pressure call." secondaryHref="/services" secondaryLabel="View Services" />
    </>
  );
}
