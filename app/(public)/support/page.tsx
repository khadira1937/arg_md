import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, MessageSquare, LifeBuoy, Activity, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/marketing/section";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({ title: "Support", description: `Get help from ${brand.name} — knowledge base, tickets and 24/7 expert support.`, path: "/support" });

export default async function SupportPage() {
  const categories = await prisma.knowledgeBaseCategory.findMany({ include: { _count: { select: { articles: true } } }, orderBy: { sortOrder: "asc" } });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Support", path: "/support" }])} />
      <section className="border-b py-16 text-center" id="monitoring">
        <div className="container">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">How can we help?</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Browse the knowledge base, open a ticket, or reach our team 24/7.</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { icon: BookOpen, title: "Knowledge base", desc: "Guides and how-tos", href: "/knowledge-base" },
            { icon: MessageSquare, title: "Open a ticket", desc: "Get personal help", href: "/dashboard/support/new" },
            { icon: Activity, title: "System status", desc: "Live uptime & monitoring", href: "/data-centers" },
          ].map((c) => (
            <Link key={c.title} href={c.href}>
              <Card className="group h-full p-6 transition-all hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><c.icon className="h-5 w-5" /></span>
                <h3 className="mt-4 flex items-center gap-1 font-semibold">{c.title} <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" /></h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30 pt-0">
        <SectionHeading eyebrow="Knowledge base" title="Popular help topics" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.id} href="/knowledge-base">
              <Card className="flex items-center justify-between p-5 hover:border-primary/40">
                <div className="flex items-center gap-3"><LifeBuoy className="h-5 w-5 text-primary" /><span className="font-medium">{c.name}</span></div>
                <span className="text-xs text-muted-foreground">{c._count.articles} articles</span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
