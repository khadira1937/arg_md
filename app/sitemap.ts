import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { siteConfig } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticPaths = [
    "", "/about", "/services", "/portfolio", "/blog", "/contact", "/book-a-call", "/pricing", "/support",
    "/website-app", "/digital-marketing", "/design", "/digital-media-content", "/hosting-website-care", "/business-it-support",
    "/terms", "/privacy", "/cookie-policy", "/refund-policy", "/acceptable-use-policy",
  ];

  const posts = await prisma.blogPost.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });

  const now = new Date();

  return [
    ...staticPaths.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
