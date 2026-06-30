import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Hero, Band, Grid, Cta, DISPLAY, GOLD } from "@/components/marketing/amx-ui";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "Practical guides and insights on websites, marketing, design, content and growing your business online.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />

      <Hero
        eyebrow="Insights & Guides"
        title="The ARGANA MEDIA Blog"
        sub="Practical guides and insights on websites, marketing, design, content and growing your business online."
      />

      <Band>
        {posts.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--argana-on-surface-muted)" }}>No posts yet — check back soon.</p>
        ) : (
          <Grid min={300} gap={18}>
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="amx-card" style={{ display: "flex", flexDirection: "column", height: "100%", padding: 26, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", textDecoration: "none" }}>
                <p style={{ margin: 0, fontSize: 12, color: "var(--argana-outline)" }}>{post.publishedAt?.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 19, margin: "10px 0 0", color: "var(--argana-on-surface)" }}>{post.title}</h2>
                {post.excerpt && <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.55, color: "var(--argana-on-surface-muted)", flex: 1 }}>{post.excerpt}</p>}
                <span style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 600, color: GOLD }}>Read more <ArrowRight size={15} /></span>
              </Link>
            ))}
          </Grid>
        )}
      </Band>

      <Cta title="Want this kind of content for your business?" sub="Our team can plan, write and publish articles and social content that build your authority over time." primaryLabel="Book a Call" secondaryHref="/digital-media-content" secondaryLabel="Content services" />
    </>
  );
}
