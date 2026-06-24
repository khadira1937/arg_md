import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, PhoneCall } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/section";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { SERVICES } from "@/config/marketing";

export const metadata: Metadata = pageMetadata({
  title: "Plans & Packages",
  description:
    "Clear starting points for working with ARGANA MEDIA — websites, marketing and website care. Every project is quoted to fit your goals and budget.",
  path: "/pricing",
});

const PRICING_FAQ = [
  { question: "Why don't you list fixed prices for everything?", answer: "Because good work depends on what you actually need. We share starting points here, then agree a clear, fixed quote with you after a short call — so you never overpay for things that don't help." },
  { question: "Do I pay upfront?", answer: "For projects we usually take a deposit to begin and the balance on completion. Monthly plans like care and marketing are billed simply each month. Everything is agreed in writing first." },
  { question: "Can I start small and grow?", answer: "Absolutely. Many clients start with a website or a care plan and add marketing, content or support as their business grows." },
  { question: "How do payments work?", answer: "We send a secure payment link or invoice (processed by Stripe). For ongoing plans you can manage everything from your client portal." },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Plans & Packages", path: "/pricing" }])} />
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 bg-mesh" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 animate-aurora rounded-full bg-secondary/15 blur-3xl" />
        <div className="container relative py-16 text-center sm:py-20">
          <h1 className="text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Clear, <span className="text-gradient">fair pricing</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
            Every business is different, so we tailor scope to you. Below are common starting points — your final quote
            is always agreed before any work begins. No surprises, no lock-in.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="gradient"><Link href="/book-a-call"><PhoneCall className="h-4 w-4" /> Book a Call</Link></Button>
            <Button asChild variant="outline"><Link href="/contact">Request a Quote</Link></Button>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Packages" title="Starting points by service" />
        <div className="mt-12"><PricingPreview /></div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading eyebrow="Explore services" title="See what's included" description="Browse each service for the full detail, then book a call for a tailored quote." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link key={s.title} href={s.href} className="group flex h-full flex-col rounded-2xl border bg-card p-6 hover-lift hover:border-primary/40">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-sm"><s.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
              <ul className="mt-4 space-y-1.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="h-3.5 w-3.5 shrink-0 text-success" /> {p}</li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Explore {s.title} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQ" title="Pricing questions" />
        <div className="mt-10"><FaqSection faqs={PRICING_FAQ} /></div>
      </Section>

      <CtaSection />
    </>
  );
}
