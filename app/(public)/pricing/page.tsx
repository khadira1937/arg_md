import type { Metadata } from "next";
import Link from "next/link";
import { getCategoriesWithProducts, lowestPrice } from "@/lib/catalog";
import { Section, SectionHeading } from "@/components/marketing/section";
import { ProductCard } from "@/components/marketing/product-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing — Plans for every workload",
  description: "Transparent pricing across web hosting, VPS, dedicated, GPU, storage and managed cloud. All plans include free SSL and 24/7 support.",
  path: "/pricing",
});

const PRICING_FAQ = [
  { question: "Are prices shown per month?", answer: "Prices display the effective monthly cost on the selected billing term. Longer terms unlock bigger discounts; renewal prices are shown on each plan." },
  { question: "Do you charge setup fees?", answer: "Most plans have no setup fee. A small number of high-end bare-metal configurations include a one-time setup fee, always shown before checkout." },
  { question: "Can I pay monthly?", answer: "Yes. Every recurring product supports monthly billing, plus 3, 6, 12 and 24-month terms with increasing discounts." },
  { question: "What payment methods do you accept?", answer: "All major credit and debit cards via Stripe's secure checkout." },
];

export default async function PricingPage() {
  const categories = await getCategoriesWithProducts();

  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-brand-glow" />
        <div className="container relative py-16 text-center sm:py-20">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, <span className="text-gradient">transparent pricing</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Pick a product to see live plans and configure exactly what you need. No hidden fees, cancel any time.
          </p>
          <div className="mt-7">
            <Button asChild variant="outline"><Link href="/compare">Compare plans side by side</Link></Button>
          </div>
        </div>
      </section>

      {categories.map((cat) => {
        const products = cat.products.filter((p) => p.isActive);
        if (products.length === 0) return null;
        return (
          <Section key={cat.id} className="border-b last:border-0">
            <SectionHeading center={false} eyebrow={cat.name} title={cat.name} description={cat.description ?? undefined} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  name={p.name}
                  slug={p.slug}
                  shortDescription={p.shortDescription}
                  inquiryOnly={p.inquiryOnly}
                  fromPrice={lowestPrice(p.plans)}
                />
              ))}
            </div>
          </Section>
        );
      })}

      <Section>
        <SectionHeading eyebrow="FAQ" title="Pricing questions" />
        <div className="mt-10"><FaqSection faqs={PRICING_FAQ} /></div>
      </Section>

      <CtaSection />
    </>
  );
}
