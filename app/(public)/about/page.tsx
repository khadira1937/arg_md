import type { Metadata } from "next";
import { Rocket, Globe, ShieldCheck, Heart } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/section";
import { CtaSection } from "@/components/marketing/cta-section";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({ title: "About", description: `Learn about ${brand.name} and our mission.`, path: "/about" });

const VALUES = [
  { icon: Rocket, title: "Performance first", body: "We obsess over speed — NVMe storage, tuned stacks and modern networking everywhere." },
  { icon: ShieldCheck, title: "Secure by default", body: "Free SSL, DDoS filtering and encrypted credentials come standard, not as upsells." },
  { icon: Globe, title: "Global reach", body: "Data centers across four continents put your services close to your users." },
  { icon: Heart, title: "Real support", body: "Actual engineers, available 24/7 — because infrastructure shouldn't be lonely." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-brand-glow" />
        <div className="container relative py-20 text-center">
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            We build the infrastructure that <span className="text-gradient">lifts ambitious teams</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {brand.name} started with a simple belief: world-class hosting shouldn&apos;t be complicated or
            expensive. Today we power {brand.stats.customers} websites and applications across {brand.stats.dataCenters} global regions.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Our values" title="What we stand for" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border bg-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white"><v.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid gap-6 sm:grid-cols-4">
          {[
            { label: "Uptime SLA", value: brand.stats.uptime },
            { label: "Customers", value: brand.stats.customers },
            { label: "Data centers", value: brand.stats.dataCenters },
            { label: "Support", value: brand.stats.support },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-bold text-gradient">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection title="Join thousands of teams" primaryLabel="Get started" primaryHref="/register" />
    </>
  );
}
