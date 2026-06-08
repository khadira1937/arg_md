import Link from "next/link";
import {
  Server, Cloud, Cpu, Gauge, Globe, Rocket,
  Zap, Lock, ShieldCheck, GitBranch, CheckCircle2, ArrowRight,
  CreditCard, PackageCheck, MousePointerClick, Code2, Building2, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section, SectionHeading } from "@/components/marketing/section";
import { Reveal } from "@/components/marketing/reveal";
import { ProductCard } from "@/components/marketing/product-card";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { getFeaturedProducts, getLocations, lowestPrice } from "@/lib/catalog";
import { brand } from "@/config/brand";
import { infrastructure, regionLatency } from "@/config/infrastructure";
import { marketingStats } from "@/config/stats";
import { StatsStrip } from "@/components/marketing/stats-strip";

const WHY = [
  { icon: Zap, title: "NVMe-backed performance", body: "Plans run on fast NVMe SSD storage and tuned stacks for snappy reads, writes and page loads." },
  { icon: Lock, title: "Secure by default", body: "Free SSL, isolated resources and encrypted credential storage come standard — not paid upsells." },
  { icon: Gauge, title: "99.9% uptime SLA", body: "Production services are backed by a clear, published availability commitment. See our SLA." },
  { icon: ShieldCheck, title: "Honest, transparent pricing", body: "The renewal price is shown before you buy. No surprise hikes, no hidden setup fees on most plans." },
  { icon: GitBranch, title: "Room to scale", body: "Start small and move up as you grow — from shared hosting to VPS, dedicated and GPU servers." },
  { icon: Cloud, title: "Support-focused service", body: "Open a ticket any time. Real people read it, and we keep you posted until it's resolved." },
];

const HOW = [
  { icon: MousePointerClick, title: "1 · Choose your plan", body: "Pick the product and term that fit. Configure location and add-ons, then add it to your cart." },
  { icon: CreditCard, title: "2 · Pay securely", body: "Check out with Stripe. Your card details never touch our servers — payment is fully encrypted." },
  { icon: PackageCheck, title: "3 · We set it up", body: "We provision and deliver your service, then send the management link and details to your dashboard." },
];

const AUDIENCE = [
  { icon: Code2, title: "Developers", body: "Full root VPS, Node.js hosting and dedicated servers with the control you need to ship." },
  { icon: Rocket, title: "Startups", body: "Affordable, scalable hosting that grows with you — without enterprise lock-in or surprise bills." },
  { icon: Building2, title: "Businesses", body: "Reliable web, WordPress and WooCommerce hosting with secure checkout and clear invoicing." },
];

const HOME_FAQ = [
  { question: "How fast is my service ready after I pay?", answer: "Most services are set up quickly after checkout. You'll receive an email and a management link in your dashboard as soon as it's ready — typically within a few hours." },
  { question: "What payment methods do you accept?", answer: "All major credit and debit cards through Stripe's secure, encrypted checkout. We never see or store your full card details." },
  { question: "Can I upgrade or cancel later?", answer: "Yes. You can manage and cancel your services from your dashboard at any time. Renewal prices are always shown before you buy." },
  { question: "Where are your data centers?", answer: `We offer ${brand.stats.regions} regions across North America, Europe, Asia-Pacific and South America, so you can host close to your users.` },
];

export default async function HomePage() {
  const [featured, locations] = await Promise.all([getFeaturedProducts(), getLocations()]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 bg-mesh" />
        <div className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 animate-aurora rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -top-20 right-1/4 h-72 w-72 animate-aurora rounded-full bg-secondary/20 blur-3xl [animation-delay:-7s]" />
        <div className="container relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Badge variant="muted" className="mb-5 gap-1.5 px-3 py-1">
                <span className="flex h-2 w-2 rounded-full bg-success" />
                {brand.stats.uptime} uptime target · {brand.stats.regions} global regions
              </Badge>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance font-display text-4xl font-bold tracking-tight sm:text-6xl">
                Cloud hosting <span className="text-gradient">built for builders</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
                Web hosting, VPS, dedicated and GPU servers with transparent pricing, secure Stripe
                checkout and support-focused service — for developers, startups and growing businesses.
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
                {["No setup fees on most plans", "Secure Stripe checkout", "Cancel anytime"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-success" /> {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Product preview mockup */}
          <Reveal delay={0.25}>
            <div className="mx-auto mt-16 max-w-4xl">
              <div className="overflow-hidden rounded-2xl border bg-card/80 shadow-premium glass">
                <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-destructive/60" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                  <span className="h-3 w-3 rounded-full bg-success/60" />
                  <span className="ml-3 flex-1 truncate rounded-md bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                    app.{brand.domain}/dashboard
                  </span>
                  <span className="hidden text-[10px] uppercase tracking-wide text-muted-foreground sm:inline">Dashboard preview</span>
                </div>
                <div className="grid gap-4 p-5 sm:grid-cols-3">
                  {[
                    { k: "Active services", v: "3", c: "text-primary" },
                    { k: "Uptime (30d)", v: brand.stats.uptime, c: "text-success" },
                    { k: "Open tickets", v: "0", c: "text-foreground" },
                  ].map((m) => (
                    <div key={m.k} className="rounded-xl border bg-background/60 p-4">
                      <p className="text-xs text-muted-foreground">{m.k}</p>
                      <p className={`mt-1 font-display text-2xl font-bold ${m.c}`}>{m.v}</p>
                    </div>
                  ))}
                  <div className="sm:col-span-3">
                    <div className="space-y-2.5">
                      {[
                        { name: "production-web-01", region: "🇺🇸 Ashburn", status: "Active" },
                        { name: "eu-postgres-db", region: "🇩🇪 Frankfurt", status: "Active" },
                        { name: "gpu-inference-node", region: "🇸🇬 Singapore", status: "Active" },
                      ].map((row) => (
                        <div key={row.name} className="flex items-center justify-between rounded-lg border bg-background/40 px-3 py-2.5 text-sm">
                          <span className="flex items-center gap-2 font-medium"><span className="h-2 w-2 rounded-full bg-success" />{row.name}</span>
                          <span className="hidden text-xs text-muted-foreground sm:inline">{row.region}</span>
                          <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success">{row.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Stats strip — specific figures; uptime framed as a target (see SLA) */}
          <Reveal delay={0.3}>
            <StatsStrip stats={marketingStats} className="mx-auto mt-10 max-w-4xl" />
          </Reveal>
        </div>
      </section>

      {/* Featured products */}
      <Section>
        <SectionHeading
          eyebrow="Products"
          title="Everything you need to run online"
          description="From your first website to GPU compute — pick the infrastructure that fits, and scale when you're ready."
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
            { icon: Layers, title: "Managed Cloud", href: "/managed-private-cloud", desc: "Dedicated platforms" },
          ].map((c) => (
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

      {/* Why us */}
      <Section className="bg-muted/30">
        <SectionHeading eyebrow="Why CloudynHost" title="Built for performance and peace of mind" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.04}>
              <div className="h-full rounded-2xl border bg-card p-6 transition-colors hover:border-primary/30">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  <w.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <SectionHeading
          eyebrow="How it works"
          title="From checkout to live in three steps"
          description="No confusing setup. You buy, we provision, and your service details land in your dashboard."
        />
        <div className="relative mt-12 grid gap-6 md:grid-cols-3">
          {HOW.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="relative h-full rounded-2xl border bg-card p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Built for */}
      <Section className="bg-muted/30">
        <SectionHeading eyebrow="Who it's for" title="Hosting that fits how you build" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {AUDIENCE.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border bg-card p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  <a.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Data centers */}
      <Section>
        <SectionHeading eyebrow="Global network" title="Deploy close to your users" description={infrastructure.summary} />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {locations.map((l) => {
            const latency = regionLatency(l.city);
            return (
              <div key={l.id} className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/30">
                <span className="text-2xl">{l.flagEmoji}</span>
                <div>
                  <p className="text-sm font-medium">{l.city}</p>
                  <p className="text-xs text-muted-foreground">{l.region}{latency != null && ` · ~${latency} ms`}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="link"><Link href="/data-centers">View all data centers <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-muted/30">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-10"><FaqSection faqs={HOME_FAQ} /></div>
      </Section>

      <CtaSection />
    </>
  );
}
