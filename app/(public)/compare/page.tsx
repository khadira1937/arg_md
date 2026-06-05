import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Section, SectionHeading } from "@/components/marketing/section";
import { ComparisonTable } from "@/components/pricing/comparison-table";
import { CtaSection } from "@/components/marketing/cta-section";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Compare Plans",
  description: "Compare hosting, VPS, cloud and dedicated server plans side by side to find the right fit.",
  path: "/compare",
});

const COMPARE_SLUGS = ["web-hosting", "cloud-hosting", "vps-hosting", "dedicated-servers"];

export default async function ComparePage() {
  const products = await prisma.product.findMany({
    where: { slug: { in: COMPARE_SLUGS }, isActive: true },
    include: { plans: { where: { isActive: true }, orderBy: { sortOrder: "asc" } } },
  });
  const ordered = COMPARE_SLUGS.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as typeof products;

  return (
    <>
      <section className="border-b py-16 text-center">
        <div className="container">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Compare plans</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">See specs side by side across our most popular product families.</p>
        </div>
      </section>

      {ordered.map((product) => (
        <Section key={product.id} className="border-b last:border-0">
          <div className="mb-8 flex items-center justify-between">
            <SectionHeading center={false} eyebrow="Compare" title={product.name} />
            <Button asChild variant="outline"><Link href={`/${product.slug}`}>View details</Link></Button>
          </div>
          <ComparisonTable plans={product.plans.map((p) => ({ id: p.id, name: p.name, popular: p.popular, specs: (p.specs as Record<string, string>) ?? {} }))} />
        </Section>
      ))}

      <CtaSection />
    </>
  );
}
