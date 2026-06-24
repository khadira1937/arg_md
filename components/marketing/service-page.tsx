import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading } from "@/components/marketing/section";
import { Reveal } from "@/components/marketing/reveal";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { PROCESS_STEPS } from "@/config/marketing";
import { SERVICE_DETAILS } from "@/config/services-content";

export function ServicePage({ slug }: { slug: string }) {
  const detail = SERVICE_DETAILS[slug];
  if (!detail) notFound();
  const Icon = detail.icon;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: detail.category, path: `/${detail.slug}` },
          ]),
          serviceJsonLd({ name: detail.category, description: detail.heroSub, path: `/${detail.slug}` }),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 bg-mesh" />
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 animate-aurora rounded-full bg-accent/15 blur-3xl" />
        <div className="container relative py-16 sm:py-20">
          <Reveal>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand-gradient text-white">
                <Icon className="h-3 w-3" />
              </span>
              {detail.eyebrow}
            </span>
            <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {detail.heroHeadline}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{detail.heroSub}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl" variant="gradient">
                <Link href="/book-a-call"><PhoneCall className="h-4 w-4" /> Book a Call</Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/contact">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <Section className="pb-0">
        <div className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted-foreground">
          {detail.intro}
        </div>
      </Section>

      {/* Offerings */}
      <Section>
        <SectionHeading eyebrow="What we offer" title={`${detail.category} services`} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {detail.offerings.map((o, i) => (
            <Reveal key={o.title} delay={(i % 3) * 0.05}>
              <div className="h-full rounded-2xl border bg-card p-6 hover-lift hover:border-primary/30">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Check className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{o.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Outcomes */}
      <Section className="bg-muted/30">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge variant="muted" className="mb-3">Why it matters</Badge>
            <h2 className="font-display text-3xl font-bold tracking-tight">What you can expect</h2>
            <p className="mt-4 text-muted-foreground">
              We focus on outcomes, not buzzwords. Here's what working with {`ARGANA MEDIA`} on {detail.category.toLowerCase()} typically means for your business.
            </p>
            <div className="mt-7">
              <Button asChild variant="gradient"><Link href="/book-a-call">Start a conversation <ArrowRight className="h-4 w-4" /></Link></Button>
            </div>
          </div>
          <ul className="grid gap-3">
            {detail.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-3 rounded-xl border bg-card p-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeading eyebrow="How we work" title="A clear path from idea to results" />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.title} className="relative h-full rounded-2xl border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-sm font-bold text-muted-foreground/50">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* FAQ */}
      {detail.faq.length > 0 && (
        <Section className="bg-muted/30">
          <SectionHeading eyebrow="FAQ" title={`${detail.category} questions`} />
          <div className="mt-10"><FaqSection faqs={detail.faq} /></div>
        </Section>
      )}

      {/* Related */}
      {detail.related.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Explore more" title="Related services" />
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {detail.related.map((r) => (
              <Link key={r.href} href={r.href} className="group flex items-center justify-between rounded-2xl border bg-card p-6 hover-lift hover:border-primary/40">
                <span className="font-semibold">{r.title}</span>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaSection
        title={`Let's talk about your ${detail.category.toLowerCase()} project`}
        description="Book a free, no-pressure call or request a quote. We'll listen first, then suggest the right next step for your business."
        primaryHref="/book-a-call"
        primaryLabel="Book a Call"
        secondaryHref="/contact"
        secondaryLabel="Request a Quote"
      />
    </>
  );
}
