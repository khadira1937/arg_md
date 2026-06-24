import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Globe, ShoppingCart, Megaphone, Palette, PenLine, ServerCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/marketing/section";
import { Reveal } from "@/components/marketing/reveal";
import { CtaSection } from "@/components/marketing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  description:
    "The kinds of projects ARGANA MEDIA delivers — websites, online stores, branding, marketing campaigns, content and ongoing website care for growing businesses.",
  path: "/portfolio",
});

const WORK = [
  { icon: Globe, type: "Business Website", body: "A clean, modern website with clear messaging, on-page SEO and a care plan to keep it healthy after launch.", tags: ["Web design", "Copywriting", "SEO setup"] },
  { icon: ShoppingCart, type: "Online Store", body: "An e-commerce build with product pages, secure payments and the integrations a small retailer needs to start selling.", tags: ["E-commerce", "Payments", "Training"] },
  { icon: Palette, type: "Brand Identity", body: "A complete visual identity — logo, colours, type and guidelines — that makes a new business look established from day one.", tags: ["Logo", "Brand kit", "Guidelines"] },
  { icon: Megaphone, type: "Local Marketing Campaign", body: "Local SEO, a Google Business Profile refresh and a content plan designed to bring in nearby customers.", tags: ["Local SEO", "Content", "GBP"] },
  { icon: PenLine, type: "Content & Social", body: "An ongoing content programme — blog articles and social posts — that keeps a brand visible and consistent.", tags: ["Blog", "Social", "Strategy"] },
  { icon: ServerCog, type: "Website Care & Hosting", body: "Managed hosting support with backups, updates, security and monitoring for a business that wanted peace of mind.", tags: ["Hosting", "Backups", "Care plan"] },
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

      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 bg-mesh" />
        <div className="container relative py-16 text-center sm:py-20">
          <Reveal>
            <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              The work we love to do
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Here are the kinds of projects we deliver for growing businesses. We're building our public case-study
              library as projects go live — if you'd like to see examples relevant to your sector, just ask.
            </p>
            <div className="mt-8">
              <Button asChild size="xl" variant="gradient"><Link href="/book-a-call">Start your project <ArrowRight className="h-4 w-4" /></Link></Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="What we deliver" title="Projects across every service" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WORK.map((w, i) => (
            <Reveal key={w.type} delay={(i % 3) * 0.05}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card hover-lift">
                <div className="relative flex h-36 items-center justify-center bg-brand-gradient">
                  <div className="pointer-events-none absolute inset-0 bg-grid-band opacity-40" />
                  <w.icon className="relative h-10 w-10 text-white" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold">{w.type}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <span key={t} className="rounded-full border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading eyebrow="Our approach" title="How we make work that lasts" />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {APPROACH.map((a) => (
            <div key={a.title} className="rounded-2xl border bg-card p-6">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection
        title="Imagine your project here"
        description="Tell us what you're trying to achieve and we'll show you how we'd approach it — and share relevant examples."
        primaryHref="/book-a-call"
        primaryLabel="Book a Call"
        secondaryHref="/contact"
        secondaryLabel="Request a Quote"
      />
    </>
  );
}
