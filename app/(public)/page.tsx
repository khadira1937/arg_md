import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, PhoneCall, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/marketing/section";
import { Reveal } from "@/components/marketing/reveal";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { DomainSearch } from "@/components/marketing/domain-search";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { brand } from "@/config/brand";
import { pageMetadata } from "@/lib/seo";
import { SERVICES, WHY_US, PROCESS_STEPS, CARE_FEATURES } from "@/config/marketing";

export const metadata: Metadata = pageMetadata({
  title: "Digital Media, Marketing & Web Development Agency",
  description:
    "ARGANA MEDIA helps businesses build, grow and manage their online presence — websites, digital marketing, design, content, hosting support and business IT support, from one UK team.",
  path: "/",
});

const HERO_BADGES = ["One team for everything", "Clear fixed quotes", "UK-registered company"];

const HOME_FAQ = [
  { question: "What does ARGANA MEDIA actually do?", answer: "We help businesses build, grow and manage their online presence. That covers websites and apps, digital marketing, design, content, hosting and website care, and everyday business IT support — all from one team." },
  { question: "How do you price your work?", answer: "Most work is quoted per project or as a simple monthly plan. After a short discovery call we send a clear proposal with the scope, timeline and a fixed price, so you always know what you're paying before anything begins." },
  { question: "Do I have to buy online?", answer: "No. For most services we discuss your project first, then send a proposal and a secure payment link or invoice. There's no pressure and no surprise charges." },
  { question: "Do you look after the website after it launches?", answer: "Yes. Our hosting and website care plans keep your site online, secure, backed up and up to date, and we're on hand for edits and support whenever you need us." },
  { question: "Do you work with small and new businesses?", answer: "Absolutely. We work with new, small and growing businesses and tailor the scope to your goals and budget — starting small and building as you grow." },
];

export default function HomePage() {
  return (
    <>
      {/* ============================================================= Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 bg-mesh" />
        <div className="pointer-events-none absolute -top-28 left-1/4 h-72 w-[40rem] -translate-x-1/2 animate-aurora rounded-full bg-secondary/10 blur-3xl" />
        <div className="container relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Left: copy */}
            <div>
              <Reveal>
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Digital media &amp; marketing agency · United Kingdom
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                  Build, grow &amp; manage your <span className="text-gradient">online presence</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
                  {brand.name} is your one team for websites, digital marketing, design, content, hosting support
                  and business IT — helping growing businesses look professional, get found and stay supported.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="xl" variant="gradient">
                    <Link href="/book-a-call"><PhoneCall className="h-4 w-4" /> Book a Call</Link>
                  </Button>
                  <Button asChild size="xl" variant="outline">
                    <Link href="/services">View Services <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-4 text-sm text-muted-foreground">
                  Prefer to talk it through?{" "}
                  <Link href="/contact" className="font-medium text-primary hover:underline">Request a quote</Link> — no obligation.
                </p>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
                  {HERO_BADGES.map((t) => (
                    <span key={t} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 shrink-0 text-success" /> {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: animated visual */}
            <Reveal delay={0.15} className="order-first lg:order-last">
              <HeroVisual />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================== Services overview */}
      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Everything your online presence needs"
          description="Six connected services, one accountable team. Pick what you need now and grow into the rest when you're ready."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.05}>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl border bg-card p-6 hover-lift hover:border-primary/40"
              >
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

      {/* ======================================================= Why ARGANA */}
      <Section className="bg-muted/30">
        <SectionHeading
          eyebrow="Why ARGANA MEDIA"
          title="A partner you can actually rely on"
          description="We keep things clear, honest and joined-up — so working with us feels easy from the first call onwards."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.04}>
              <div className="h-full rounded-2xl border bg-card p-6 transition-colors hover:border-primary/30">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ========================================================= Process */}
      <Section>
        <SectionHeading
          eyebrow="How we work"
          title="A simple, reassuring process"
          description="From first hello to long-term growth, you'll always know what's happening and what comes next."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <li className="relative h-full rounded-2xl border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-sm font-bold text-muted-foreground/50">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ================================================= Packages preview */}
      <Section className="bg-muted/30">
        <SectionHeading
          eyebrow="Packages"
          title="Simple starting points"
          description="Every business is different, so we tailor scope to you. These packages are a starting point for your quote — never a checkout."
        />
        <div className="mt-12"><PricingPreview /></div>
      </Section>

      {/* =============================================== Hosting & website care */}
      <Section>
        <SectionHeading
          eyebrow="Hosting & Website Care"
          title="Your website, looked after"
          description="Already have a domain in mind, or need one? Search below — then we'll connect it to your website, email, SSL, hosting and ongoing care."
        />

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Search className="h-4 w-4 text-primary" /> Check a domain name
          </div>
          <DomainSearch />
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARE_FEATURES.map((f) => (
            <div key={f.title} className="h-full rounded-2xl border bg-card p-6 hover-lift">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/hosting-website-care">Explore Hosting &amp; Website Care <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      {/* ============================================================= FAQ */}
      <Section className="bg-muted/30">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-10"><FaqSection faqs={HOME_FAQ} /></div>
      </Section>

      <CtaSection />
    </>
  );
}
