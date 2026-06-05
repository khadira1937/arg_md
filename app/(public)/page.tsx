import Link from "next/link";
import {
  Server, Cloud, Cpu, Gauge, Globe, Rocket,
  Zap, Lock, Headphones, GitBranch, CheckCircle2, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading } from "@/components/marketing/section";
import { Reveal } from "@/components/marketing/reveal";
import { ProductCard } from "@/components/marketing/product-card";
import { Testimonials } from "@/components/marketing/testimonials";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { getFeaturedProducts, getLocations, lowestPrice } from "@/lib/catalog";
import { brand } from "@/config/brand";

const WHY = [
  { icon: Zap, title: "NVMe everywhere", body: "Every plan runs on NVMe SSD storage for dramatically faster reads and writes." },
  { icon: Lock, title: "Free SSL & security", body: "Automatic SSL, DDoS filtering and isolated resources keep you protected by default." },
  { icon: Gauge, title: "99.99% uptime SLA", body: "Redundant power, network and storage backed by a financially-guaranteed SLA." },
  { icon: Headphones, title: "24/7 expert support", body: "Real engineers, not scripts — available any time of day, every day of the year." },
  { icon: GitBranch, title: "Scale on demand", body: "Upgrade CPU, RAM and storage instantly as your traffic grows. No migrations." },
  { icon: Rocket, title: "Deploy in minutes", body: "Shared and cloud plans go live within minutes of checkout. No waiting around." },
];

const HOME_FAQ = [
  { question: "Do you offer a money-back guarantee?", answer: "Yes — eligible plans include a 30-day money-back guarantee. See our Refund Policy for details." },
  { question: "Can I upgrade my plan later?", answer: "Absolutely. Upgrade or downgrade any time from your dashboard; we prorate the difference automatically." },
  { question: "Where are your data centers?", answer: "We operate in 8 regions across North America, Europe, Asia-Pacific and South America, with more on the way." },
  { question: "Is migration really free?", answer: "Our team migrates your sites and databases for free on annual plans, with zero downtime." },
];

export default async function HomePage() {
  const [featured, locations] = await Promise.all([getFeaturedProducts(), getLocations()]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-brand-glow" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" />
        <div className="container relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Badge variant="muted" className="mb-5 gap-1.5 px-3 py-1">
                <span className="flex h-2 w-2 rounded-full bg-success" />
                {brand.stats.uptime} uptime · {brand.stats.dataCenters} global regions
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">
                Cloud hosting that <span className="text-gradient">lifts your business</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Web hosting, VPS, dedicated and GPU servers, managed cloud and more — engineered for
                speed, reliability and scale, backed by 24/7 expert support.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="xl" variant="gradient">
                  <Link href="/pricing">Explore plans <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <Link href="/vps-hosting">Deploy a VPS</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {["No setup fees", "30-day guarantee", "Free migration", "Cancel anytime"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-success" /> {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Stats strip */}
          <Reveal delay={0.25}>
            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Uptime SLA", value: brand.stats.uptime },
                { label: "Customers", value: brand.stats.customers },
                { label: "Global regions", value: brand.stats.dataCenters },
                { label: "Support", value: brand.stats.support },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border bg-card/60 p-5 text-center backdrop-blur">
                  <p className="font-display text-2xl font-bold sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured products */}
      <Section>
        <SectionHeading
          eyebrow="Products"
          title="Everything you need to run online"
          description="From your first website to GPU clusters — pick the infrastructure that fits, and scale when you're ready."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <ProductCard
                name={p.name}
                slug={p.slug}
                shortDescription={p.shortDescription}
                inquiryOnly={p.inquiryOnly}
                fromPrice={lowestPrice(p.plans)}
                badge={p.featured ? "Popular" : undefined}
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">See all products & pricing <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>

      {/* Category quick links */}
      <Section className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Globe, title: "Web & WordPress", href: "/web-hosting", desc: "Fast managed hosting" },
            { icon: Server, title: "VPS & Dedicated", href: "/vps-hosting", desc: "Full root performance" },
            { icon: Cpu, title: "GPU Servers", href: "/gpu-servers", desc: "AI & rendering compute" },
            { icon: Cloud, title: "Managed Cloud", href: "/managed-private-cloud", desc: "Enterprise platforms" },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Why us */}
      <Section className="bg-muted/30">
        <SectionHeading eyebrow="Why Aethon" title="Built for performance and peace of mind" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.04}>
              <div className="rounded-2xl border bg-card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  <w.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Data centers */}
      <Section>
        <SectionHeading eyebrow="Global network" title="Deploy close to your users" description="Choose from data centers across four continents for low-latency performance worldwide." />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {locations.map((l) => (
            <div key={l.id} className="flex items-center gap-3 rounded-xl border bg-card p-4">
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

      {/* Testimonials */}
      <Section className="bg-muted/30">
        <SectionHeading eyebrow="Loved by builders" title="Trusted by thousands of teams" />
        <div className="mt-12"><Testimonials /></div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-10"><FaqSection faqs={HOME_FAQ} /></div>
      </Section>

      <CtaSection />
    </>
  );
}
