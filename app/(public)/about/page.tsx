import type { Metadata } from "next";
import { Rocket, Globe, ShieldCheck, Heart } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/section";
import { CtaSection } from "@/components/marketing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";
import { marketingStats } from "@/config/stats";
import { StatsStrip } from "@/components/marketing/stats-strip";
import { company, isPlaceholder } from "@/config/company";

export const metadata: Metadata = pageMetadata({ title: "About", description: `Learn about ${brand.name} and our mission.`, path: "/about" });

const VALUES = [
  { icon: Rocket, title: "Performance first", body: "We build on fast NVMe storage and tuned stacks so your sites and apps feel quick." },
  { icon: ShieldCheck, title: "Secure by default", body: "Free SSL, isolated resources and encrypted credentials come standard, not as upsells." },
  { icon: Globe, title: "Global reach", body: "Enterprise-grade Tier III partner data centers across four continents put your services close to your users." },
  { icon: Heart, title: "Honest support", body: "Clear pricing, no fake guarantees, and real people answering your tickets." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-mesh" />
        <div className="pointer-events-none absolute inset-0 bg-brand-glow" />
        <div className="container relative py-20 text-center">
          <h1 className="mx-auto max-w-3xl text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Hosting that <span className="text-gradient">respects your time and budget</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            {brand.name} started with a simple belief: reliable hosting shouldn&apos;t be complicated,
            opaque or overpriced. We offer fast infrastructure, transparent pricing and secure Stripe
            checkout across {brand.stats.regions} global regions — for developers, startups and businesses.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Our values" title="What we stand for" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="h-full rounded-2xl border bg-card p-6 transition-colors hover:border-primary/30">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white"><v.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <StatsStrip variant="plain" stats={marketingStats.slice(0, 3)} />
      </Section>

      {/* Company facts — placeholders until real, verified details are added. No invented facts. */}
      <Section>
        <SectionHeading eyebrow="Company" title="The essentials" description="We'll fill these in with verified details as we grow — no fabricated history here." />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Founded", value: company.foundingYear },
            { label: "Headquarters", value: company.headquarters },
            { label: "Legal entity", value: company.legalEntity },
            { label: "Team size", value: company.teamSize },
          ].map((f) => {
            const placeholder = isPlaceholder(f.value);
            return (
              <div
                key={f.label}
                className={`rounded-2xl border bg-card p-5 ${placeholder ? "border-dashed" : ""}`}
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</p>
                {placeholder ? (
                  <p className="mt-1 font-mono text-sm text-muted-foreground/70">{f.value}<span className="ml-1 text-[10px] uppercase">to add</span></p>
                ) : (
                  <p className="mt-1 font-semibold">{f.value}</p>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      <CtaSection title="Start hosting with HostynCloud" primaryLabel="Get started" primaryHref="/register" />
    </>
  );
}
