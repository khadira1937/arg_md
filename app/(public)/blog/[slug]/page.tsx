import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { Markdown } from "@/components/marketing/markdown";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({ where: { published: true }, select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return {};
  return pageMetadata({ title: post.seoTitle ?? post.title, description: post.seoDescription ?? post.excerpt ?? undefined, path: `/blog/${post.slug}` });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug }, include: { author: { select: { name: true } } } });
  if (!post || !post.published) notFound();

  return (
    <div className="container max-w-3xl py-16">
      <JsonLd data={breadcrumbJsonLd([{ name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }])} />
      <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> All posts</Link>
      <p className="mt-6 text-sm text-muted-foreground">{post.publishedAt?.toLocaleDateString()}{post.author?.name ? ` · ${post.author.name}` : ""}</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">{post.title}</h1>
      <div className="mt-8"><Markdown content={post.body} /></div>
    </div>
  );
}
