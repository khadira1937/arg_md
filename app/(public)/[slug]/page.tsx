import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ShieldCheck, Headphones, Zap } from "lucide-react";
import { prisma } from "@/lib/db";
import { getProductBySlug, getLocations } from "@/lib/catalog";
import { Section, SectionHeading } from "@/components/marketing/section";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { PricingSection } from "@/components/pricing/pricing-section";
import { ComparisonTable } from "@/components/pricing/comparison-table";
import { ProductCard } from "@/components/marketing/product-card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/marketing/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import {
  pageMetadata, breadcrumbJsonLd, productJsonLd, serviceJsonLd,
} from "@/lib/seo";
import { lowestPrice } from "@/lib/catalog";
import type { ClientPlan, ClientLocation } from "@/components/pricing/types";

const SERVER_TYPES = new Set(["VPS", "DEDICATED", "STORAGE", "GPU"]);

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ where: { isActive: true }, select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return {};
  return pageMetadata({
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.shortDescription ?? undefined,
    path: `/${product.slug}`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || !product.isActive) notFound();

  const isServer = SERVER_TYPES.has(product.type);
  const locations: ClientLocation[] = isServer
    ? (await getLocations()).map((l) => ({ id: l.id, name: l.name, city: l.city, region: l.region, flagEmoji: l.flagEmoji }))
    : [];

  const plans: ClientPlan[] = product.plans.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    popular: p.popular,
    recommended: p.recommended,
    onSale: p.onSale,
    supportLevel: p.supportLevel,
    specs: (p.specs as Record<string, string>) ?? {},
    features: p.features.map((f) => ({ label: f.label, value: f.value, included: f.included, highlight: f.highlight })),
    prices: p.prices.map((pr) => ({
      billingCycle: pr.billingCycle,
      amount: pr.amount,
      renewalAmount: pr.renewalAmount,
      setupFee: pr.setupFee,
      discountPercentage: pr.discountPercentage,
    })),
    addons: p.planAddons.map((pa) => ({ id: pa.addon.id, name: pa.addon.name, amount: pa.addon.amount, billingType: pa.addon.billingType })),
  }));

  const faqs = (product.faq as { question: string; answer: string }[] | null) ?? [];
  const fromPrice = lowestPrice(product.plans);

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, isActive: true, id: { not: product.id } },
    take: 3,
    include: { plans: { where: { isActive: true }, include: { prices: true } } },
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: product.category.name, path: "/pricing" },
            { name: product.name, path: `/${product.slug}` },
          ]),
          product.inquiryOnly || fromPrice == null
            ? serviceJsonLd({ name: product.name, description: product.shortDescription ?? product.name, path: `/${product.slug}` })
            : productJsonLd({ name: product.name, description: product.shortDescription ?? product.name, path: `/${product.slug}`, lowPrice: fromPrice / 100 }),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="pointer-events-none absolute inset-0 bg-brand-glow" />
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 animate-aurora rounded-full bg-accent/15 blur-3xl" />
        <div className="container relative py-16 sm:py-20">
          <Reveal>
            <Badge variant="muted" className="mb-4">{product.category.name}</Badge>
            <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {product.heroHeadline ?? product.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              {product.heroSubheadline ?? product.shortDescription}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {[
                { icon: Zap, t: "Clear fixed quotes" },
                { icon: ShieldCheck, t: "UK-registered company" },
                { icon: Headphones, t: "Dedicated support" },
              ].map((b) => (
                <span key={b.t} className="flex items-center gap-1.5"><b.icon className="h-4 w-4 text-primary" /> {b.t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Description */}
      {product.description && (
        <Section className="pb-0">
          <div className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted-foreground">
            {product.description}
          </div>
        </Section>
      )}

      {/* Pricing */}
      <Section id="plans">
        <SectionHeading
          eyebrow="Plans & pricing"
          title={product.inquiryOnly ? "Tailored to your needs" : "Choose your plan"}
          description={product.inquiryOnly ? "Tell us what you need and our team will design the right solution." : "Transparent pricing. Upgrade, downgrade or cancel any time."}
        />
        <div className="mt-10">
          <PricingSection plans={plans} locations={locations} inquiryOnly={product.inquiryOnly} productSlug={product.slug} />
        </div>
      </Section>

      {/* Comparison */}
      {plans.length > 1 && !product.inquiryOnly && (
        <Section className="bg-muted/30">
          <SectionHeading eyebrow="Compare" title="Compare every plan" />
          <div className="mt-10">
            <ComparisonTable plans={product.plans.map((p) => ({ id: p.id, name: p.name, popular: p.popular, specs: (p.specs as Record<string, string>) ?? {} }))} />
          </div>
        </Section>
      )}

      {/* Architecture band (server products) — light, mono technical callouts */}
      {isServer && (
        <Section className="bg-muted/30">
          <SectionHeading
            eyebrow="Architecture"
            title="Under the hood"
            description={`The building blocks behind every ${product.name} instance.`}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Virtualization", value: "KVM", note: "Full hardware virtualization with isolated kernels." },
              { label: "Compute", value: "Dedicated vCPU", note: "Guaranteed cores — not oversold or shared." },
              { label: "Storage", value: "NVMe SSD", note: "Low-latency local NVMe on every instance." },
              { label: "Access", value: "Full root", note: "SSH root access and complete OS control." },
              { label: "Recovery", value: "Snapshots", note: "Point-in-time snapshots on supported plans." },
              { label: "Network", value: "DDoS-filtered", note: "Always-on network-level mitigation." },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border bg-card p-5 hover-lift">
                <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{s.label}</span>
                <p className="mt-2 font-mono text-lg font-semibold">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.note}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <Section>
          <SectionHeading eyebrow="FAQ" title={`${product.name} questions`} />
          <div className="mt-10"><FaqSection faqs={faqs} /></div>
        </Section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <Section className="bg-muted/30">
          <SectionHeading eyebrow="Explore more" title={`More in ${product.category.name}`} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ProductCard key={r.id} name={r.name} slug={r.slug} shortDescription={r.shortDescription} inquiryOnly={r.inquiryOnly} fromPrice={lowestPrice(r.plans)} />
            ))}
          </div>
        </Section>
      )}

      <CtaSection />
    </>
  );
}
