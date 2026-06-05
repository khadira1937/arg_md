import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/marketing/section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Knowledge Base", description: "Guides, tutorials and documentation for getting the most out of your services.", path: "/knowledge-base" });

export default async function KnowledgeBasePage() {
  const categories = await prisma.knowledgeBaseCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { articles: { where: { published: true }, orderBy: { publishedAt: "desc" } } },
  });

  return (
    <>
      <section className="border-b py-16 text-center">
        <div className="container">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Knowledge Base</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Everything you need to set up and manage your services.</p>
        </div>
      </section>

      <Section>
        <div className="space-y-10">
          {categories.map((cat) => (
            <div key={cat.id}>
              <h2 className="flex items-center gap-2 text-xl font-semibold"><BookOpen className="h-5 w-5 text-primary" /> {cat.name}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {cat.articles.map((a) => (
                  <Link key={a.id} href={`/knowledge-base/${a.slug}`}>
                    <Card className="group flex items-center justify-between p-5 hover:border-primary/40">
                      <div><p className="font-medium">{a.title}</p>{a.excerpt && <p className="mt-1 text-sm text-muted-foreground">{a.excerpt}</p>}</div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
