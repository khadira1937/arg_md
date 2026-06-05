import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { Markdown } from "@/components/marketing/markdown";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const articles = await prisma.knowledgeBaseArticle.findMany({ where: { published: true }, select: { slug: true } });
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.knowledgeBaseArticle.findUnique({ where: { slug } });
  if (!article) return {};
  return pageMetadata({ title: article.seoTitle ?? article.title, description: article.seoDescription ?? article.excerpt ?? undefined, path: `/knowledge-base/${article.slug}` });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await prisma.knowledgeBaseArticle.findUnique({ where: { slug }, include: { category: true } });
  if (!article || !article.published) notFound();

  return (
    <div className="container max-w-3xl py-16">
      <JsonLd data={breadcrumbJsonLd([{ name: "Knowledge Base", path: "/knowledge-base" }, { name: article.title, path: `/knowledge-base/${article.slug}` }])} />
      <Link href="/knowledge-base" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> All articles</Link>
      <p className="mt-6 text-sm font-medium text-primary">{article.category.name}</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">{article.title}</h1>
      <div className="mt-8"><Markdown content={article.body} /></div>
    </div>
  );
}
