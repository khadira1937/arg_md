import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/marketing/section";
import { Reveal } from "@/components/marketing/reveal";
import { ProductCard } from "@/components/marketing/product-card";
import { HeroServerPanel } from "@/components/marketing/hero-server-panel";
import { DomainSearch } from "@/components/marketing/domain-search";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { getFeaturedProducts, lowestPrice } from "@/lib/catalog";
import { brand } from "@/config/brand";
import { pageMetadata } from "@/lib/seo";
import {
  PRODUCT_SPECS, INFRA_TRUST, INFRA_SPECS, REGIONS, SETUP_STEPS, CATEGORY_TILES,
} from "@/config/marketing";

export const metadata: Metadata = pageMetadata({
  title: "Web Hosting, VPS & Cloud Servers",
  description:
    "HostynCloud runs fast NVMe web hosting, VPS and cloud servers with transparent pricing, free SSL, secure Stripe checkout and automated provisioning. Find a domain and launch today.",
  path: "/",
});

const HERO_BADGES = [
  "Free SSL included", "NVMe storage", "Secure Stripe checkout",
  "Automated provisioning", "Cancel anytime", "Support tickets",
];

const HOME_FAQ = [
  { question: "How fast is my service ready after I pay?", answer: "Hosting services are provisioned automatically right after your Stripe payment is confirmed. You'll get an email and a management link in your dashboard within minutes." },
  { question: "What payment methods do you accept?", answer: "All major credit and debit cards through Stripe's secure, encrypted checkout. We never see or store your full card details." },
  { question: "Do you register domains automatically?", answer: "Domain registration completes after payment once the registrar confirms availability. You can search live availability and shortlist domains on our domains page." },
  { question: "Can I upgrade or cancel later?", answer: "Yes. You can manage and cancel your services from your dashboard at any time. Renewal prices are always shown before you buy." },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      {/* ============================================================ Hero (light) */}
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" />
        <div className="container relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <Reveal>
              <span className="mb-5 inline-flex items-center gap-2 rounded-md border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {brand.stats.uptime} uptime SLA · NVMe · KVM
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                Fast Web Hosting, <span className="text-gradient">VPS &amp; Cloud Servers</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
                Launch websites, apps and online stores on NVMe-powered infrastructure with transparent pricing,
                secure Stripe checkout, and automated provisioning after payment.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="xl" variant="gradient">
                  <Link href="/web-hosting">Start with Web Hosting <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild size="xl" variant="ghost" className="border">
                  <Link href="/vps-hosting">View VPS Plans</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-2.5 sm:grid-cols-3">
                {HERO_BADGES.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-success" /> {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <HeroServerPanel className="mx-auto w-full max-w-md lg:max-w-none" />
          </Reveal>
        </div>
      </section>

      {/* ===================================================== Domain search (light) */}
      <section className="border-b bg-muted/40">
        <div className="container py-14 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Find your perfect domain name</h2>
            <p className="mt-3 text-muted-foreground">
              Search live availability across popular extensions and shortlist the one that fits your brand.
            </p>
          </div>
          <DomainSearch className="mt-8" />
        </div>
      </section>

      {/* ================================================= Featured products (light) */}
      <Section>
        <SectionHeading
          eyebrow="Products"
          title="Hosting for every stage of growth"
          description="From your first website to GPU compute — pick the infrastructure that fits, with real specs and transparent pricing."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => {
            const spec = PRODUCT_SPECS[p.slug];
            return (
              <Reveal key={p.id} delay={i * 0.05}>
                <ProductCard
                  name={p.name}
                  slug={p.slug}
                  shortDescription={p.shortDescription}
                  inquiryOnly={p.inquiryOnly}
                  fromPrice={lowestPrice(p.plans)}
                  bestFor={spec?.bestFor}
                  specs={spec?.specs}
                  trustNote={p.inquiryOnly ? undefined : "Automated setup · cancel anytime"}
                />
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">Compare all plans <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      {/* ================================================== Categories (DARK band) */}
      <section className="border-y border-band-border bg-band text-band-foreground">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid-band opacity-60" />
          <div className="container relative py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-primary">
                <span className="h-1 w-1 rounded-full bg-primary" /> Product lines
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Built for the whole stack</h2>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORY_TILES.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group rounded-xl border border-band-border bg-band-card p-6 transition-colors hover:border-primary/50"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-band-border bg-band text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-band-muted">{c.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-primary">
                    Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== Pricing preview (light) */}
      <Section className="bg-muted/40">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent plans"
          description="Compare starting plans across web hosting, VPS and cloud servers. The renewal price is always shown before you buy."
        />
        <div className="mt-12"><PricingPreview /></div>
      </Section>

      {/* ================================================ Infrastructure (DARK band) */}
      <section className="border-y border-band-border bg-band text-band-foreground">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid-band opacity-60" />
          <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="container relative py-16 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-primary">
                <span className="h-1 w-1 rounded-full bg-primary" /> Infrastructure
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Engineered for performance</h2>
              <p className="mt-4 text-band-muted">Real, verifiable building blocks — no buzzwords, no upsell-only “features.”</p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INFRA_SPECS.map((s) => (
                <div key={s.label} className="rounded-xl border border-band-border bg-band-card p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-band-muted">
                      <s.icon className="h-4 w-4 text-primary" /> {s.label}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-lg font-semibold">{s.value}</p>
                  <p className="mt-1 text-sm text-band-muted">{s.note}</p>
                </div>
              ))}
            </div>

            {/* Region chips — US + EU live, others rolling out */}
            <div className="mt-10 flex flex-col items-center gap-4 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {REGIONS.live.map((r) => (
                  <span key={r} className="inline-flex items-center gap-2 rounded-md border border-band-border bg-band-card px-3.5 py-1.5 font-mono text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" /> {r}
                  </span>
                ))}
                {REGIONS.soon.map((r) => (
                  <span key={r} className="inline-flex items-center gap-2 rounded-md border border-dashed border-band-border px-3.5 py-1.5 font-mono text-sm text-band-muted">
                    {r} <span className="text-[10px] uppercase">soon</span>
                  </span>
                ))}
              </div>
              <p className="max-w-xl font-mono text-xs text-band-muted">
                Live regions: United States &amp; Europe. Region availability depends on the selected product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================== How setup works (light) */}
      <Section>
        <SectionHeading
          eyebrow="Getting started"
          title="How setup works"
          description="A clear path from checkout to a service you can manage — with no surprises."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SETUP_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <li className="relative h-full rounded-xl border bg-card p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient font-mono text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-sm font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <Zap className="h-4 w-4 text-primary" />
          Hosting is provisioned automatically right after payment. Domain registration completes once the registrar
          confirms availability.
        </p>
      </Section>

      {/* ===================================================== Security / trust (light) */}
      <Section className="bg-muted/40">
        <SectionHeading
          eyebrow="Reliability"
          title="Security & trust, built in"
          description="Performance and protection come standard — not sold as endless add-ons."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INFRA_TRUST.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.04}>
              <div className="h-full rounded-xl border bg-card p-6 transition-colors hover:border-primary/30 hover-lift">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-sm">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ================================================================= FAQ (light) */}
      <Section>
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-10"><FaqSection faqs={HOME_FAQ} /></div>
      </Section>

      <CtaSection />
    </>
  );
}
