import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight, CheckCircle2, ShieldCheck, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading } from "@/components/marketing/section";
import { Reveal } from "@/components/marketing/reveal";
import { ProductCard } from "@/components/marketing/product-card";
import { HeroServerPanel } from "@/components/marketing/hero-server-panel";
import { DomainSearch } from "@/components/marketing/domain-search";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { getFeaturedProducts, getLocations, lowestPrice } from "@/lib/catalog";
import { brand } from "@/config/brand";
import { pageMetadata } from "@/lib/seo";
import {
  PRODUCT_SPECS, INFRA_TRUST, REGION_ROW, SETUP_STEPS, CATEGORY_TILES,
} from "@/config/marketing";

export const metadata: Metadata = pageMetadata({
  title: "Web Hosting, VPS & Cloud Servers",
  description:
    "HostynCloud offers fast NVMe web hosting, VPS and cloud servers with transparent pricing, free SSL, secure Stripe checkout and real support after payment. Find a domain and launch today.",
  path: "/",
});

const HERO_BADGES = [
  "Free SSL included",
  "NVMe storage",
  "Secure Stripe checkout",
  "Setup after payment",
  "Cancel anytime",
  "Support tickets",
];

const HOME_FAQ = [
  { question: "How fast is my service ready after I pay?", answer: "Most services are set up shortly after checkout. You'll receive an email and a management link in your dashboard as soon as it's ready. Some products are provisioned manually after payment for accuracy." },
  { question: "What payment methods do you accept?", answer: "All major credit and debit cards through Stripe's secure, encrypted checkout. We never see or store your full card details." },
  { question: "Do you register domains automatically?", answer: "Domain registration is completed after payment once availability is confirmed by the registrar. You can search and shortlist domains on our domains page." },
  { question: "Can I upgrade or cancel later?", answer: "Yes. You can manage and cancel your services from your dashboard at any time. Renewal prices are always shown before you buy." },
];

export default async function HomePage() {
  const [featured, locations] = await Promise.all([getFeaturedProducts(), getLocations()]);

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 bg-mesh" />
        <div className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 animate-aurora rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -top-20 right-1/4 h-72 w-72 animate-aurora rounded-full bg-secondary/20 blur-3xl [animation-delay:-7s]" />
        <div className="container relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <Reveal>
              <Badge variant="muted" className="mb-5 gap-1.5 px-3 py-1">
                <span className="flex h-2 w-2 rounded-full bg-success" />
                {brand.stats.uptime} uptime target · NVMe-powered infrastructure
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                Fast Web Hosting, <span className="text-gradient">VPS &amp; Cloud Servers</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
                Launch websites, apps and online stores on NVMe-powered infrastructure with transparent pricing,
                secure Stripe checkout, and support after payment.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="xl" variant="gradient">
                  <Link href="/web-hosting">Start with Web Hosting <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <Link href="/vps-hosting">View VPS Plans</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-2.5 sm:grid-cols-3">
                {HERO_BADGES.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> {t}
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

      {/* ----------------------------------------------------- Domain search */}
      <section className="border-b bg-muted/30">
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

      {/* -------------------------------------------------- Featured products */}
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
                  badge={p.featured ? "Popular" : undefined}
                  bestFor={spec?.bestFor}
                  specs={spec?.specs}
                />
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">See all products &amp; pricing <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      {/* ------------------------------------------------ Category quick links */}
      <Section className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_TILES.map((c) => (
            <Link key={c.href} href={c.href} className="group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------ Pricing preview */}
      <Section className="bg-muted/30">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent plans"
          description="Compare starting plans across web hosting, VPS and cloud servers. The renewal price is always shown before you buy."
        />
        <div className="mt-12"><PricingPreview /></div>
      </Section>

      {/* ------------------------------------------------------ Infrastructure */}
      <Section>
        <SectionHeading
          eyebrow="Reliability"
          title="Built on reliable infrastructure"
          description="Performance and protection built in — not sold as endless add-ons."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INFRA_TRUST.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 0.04}>
              <div className="h-full rounded-2xl border bg-card p-6 transition-colors hover:border-primary/30">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Region row */}
        <div className="mt-12 rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex flex-col items-center gap-5 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Deploy close to your users</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {REGION_ROW.map((r) => (
                <span key={r} className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium">
                  <Globe className="h-4 w-4 text-primary" /> {r}
                </span>
              ))}
            </div>
            <p className="max-w-xl text-xs text-muted-foreground">
              Server region availability depends on the selected product. See each product page for current locations.
            </p>
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------- How setup works */}
      <Section className="bg-muted/30">
        <SectionHeading
          eyebrow="Getting started"
          title="How setup works"
          description="A clear path from checkout to a service you can manage — with no surprises."
        />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {SETUP_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <li className="relative h-full rounded-2xl border bg-card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-sm font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Some services are provisioned manually after payment to ensure everything is configured correctly.
        </p>
      </Section>

      {/* ------------------------------------------------------------- Data centers */}
      <Section>
        <SectionHeading eyebrow="Global network" title="A network that scales with you" />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {locations.map((l) => (
            <div key={l.id} className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/30">
              <span className="text-2xl">{l.flagEmoji}</span>
              <div>
                <p className="text-sm font-medium">{l.city}</p>
                <p className="text-xs text-muted-foreground">{l.region}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="link"><Link href="/data-centers">View all data centers <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </Section>

      {/* ----------------------------------------------------------------- FAQ */}
      <Section className="bg-muted/30">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-10"><FaqSection faqs={HOME_FAQ} /></div>
      </Section>

      <CtaSection />
    </>
  );
}
