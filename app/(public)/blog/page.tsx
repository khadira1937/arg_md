import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/marketing/section";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({ title: "Blog", description: "Practical guides and insights on websites, marketing, design and growing your business online.", path: "/blog" });
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.blogPost
    .findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } })
    .catch(() => []);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <section className="relative overflow-hidden border-b py-16 text-center">
        <div className="pointer-events-none absolute inset-0 bg-mesh" />
        <div className="container relative">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">The {brand.name} Blog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Practical guides and insights on websites, marketing, design, content and growing your business online.</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="group h-full overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-md">
                <p className="text-xs text-muted-foreground">{post.publishedAt?.toLocaleDateString()}</p>
                <h2 className="mt-2 text-lg font-semibold group-hover:text-primary">{post.title}</h2>
                {post.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>}
                <span className="mt-4 inline-block text-sm font-medium text-primary">Read more →</span>
              </Card>
            </Link>
          ))}
          {posts.length === 0 && <p className="text-muted-foreground">No posts yet — check back soon.</p>}
        </div>
      </Section>
    </>
  );
}
