import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/marketing/section";
import { Reveal } from "@/components/marketing/reveal";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { CtaSection } from "@/components/marketing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SERVICES, PROCESS_STEPS } from "@/config/marketing";

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

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 bg-mesh" />
        <div className="container relative py-16 text-center sm:py-20">
          <Reveal>
            <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              One team for your whole <span className="text-gradient">online presence</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              From the first website to long-term marketing and support, our services connect together so you get a
              joined-up result — not six separate suppliers to manage.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="xl" variant="gradient"><Link href="/book-a-call"><PhoneCall className="h-4 w-4" /> Book a Call</Link></Button>
              <Button asChild size="xl" variant="outline"><Link href="/contact">Request a Quote</Link></Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Service cards */}
      <Section>
        <SectionHeading eyebrow="Our services" title="Six services, one accountable team" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.05}>
              <Link href={s.href} className="group flex h-full flex-col rounded-2xl border bg-card p-6 hover-lift hover:border-primary/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-sm">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-3.5 w-3.5 shrink-0 text-success" /> {p}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Explore {s.title} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-muted/30">
        <SectionHeading eyebrow="How we work" title="Simple, transparent, joined-up" />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className="relative h-full rounded-2xl border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white"><s.icon className="h-5 w-5" /></span>
                <span className="font-mono text-sm font-bold text-muted-foreground/50">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Packages */}
      <Section>
        <SectionHeading
          eyebrow="Packages"
          title="Starting points, tailored to you"
          description="A few common ways to work with us. Every quote is shaped around your goals — these are just a place to begin."
        />
        <div className="mt-12"><PricingPreview /></div>
      </Section>

      <CtaSection />
    </>
  );
}
