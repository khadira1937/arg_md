import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { Band, DISPLAY } from "@/components/marketing/amx-ui";
import {
  KhStyles, ArticleCard, KhSidebar, Pagination, Pill, CategoryPills,
} from "@/components/marketing/knowledge-hub/kh-ui";
import { KH_CATEGORIES, getCategory, articlesByCategory } from "@/config/knowledge-hub";

export function generateStaticParams() {
  return KH_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return pageMetadata({ title: "Category", path: `/knowledge-hub/category/${slug}` });
  return pageMetadata({
    title: `${cat.name} — Knowledge Hub`,
    description: `Articles and guides on ${cat.name} from the ARGANA MEDIA Knowledge Hub.`,
    path: `/knowledge-hub/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const articles = articlesByCategory(slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Knowledge Hub", path: "/knowledge-hub" },
            { name: cat.name, path: `/knowledge-hub/category/${slug}` },
          ]),
          itemListJsonLd(articles.map((a) => ({ name: a.title, path: `/knowledge-hub/article/${a.slug}` }))),
        ]}
      />
      <KhStyles />

      {/* Hero */}
      <section style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "linear-gradient(180deg, rgba(53,224,232,0.03), transparent 55%)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(40px,7vh,80px) clamp(18px,4vw,28px) clamp(32px,5vh,52px)" }}>
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#7E8AA3", marginBottom: 22, flexWrap: "wrap" }}>
            <Link href="/" style={crumb}>Home</Link><ChevronRight size={13} />
            <Link href="/knowledge-hub" style={crumb}>Knowledge Hub</Link><ChevronRight size={13} />
            <span style={{ color: "#C7CEDC" }}>{cat.name}</span>
          </nav>
          <span style={{ marginBottom: 16, display: "inline-flex" }}><Pill color={cat.accent}>Category</Pill></span>
          <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "12px 0 0", color: "#F4F7FC" }}>{cat.name}</h1>
          <p style={{ margin: "18px 0 0", maxWidth: 640, fontSize: 16.5, lineHeight: 1.6, color: "#A7B0C2" }}>{cat.blurb}</p>
        </div>
      </section>

      <Band pad="clamp(20px,3vh,32px)"><CategoryPills activeSlug={slug} /></Band>

      <Band pad="clamp(32px,5vh,72px)">
        <div className="kh-layout">
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: 18 }}>
              {articles.length > 0
                ? articles.map((a) => <ArticleCard key={a.slug} a={a} />)
                : <p style={{ color: "#8A93A6", fontSize: 14.5 }}>Articles for this category are on the way.</p>}
            </div>
            <Pagination current={1} totalPages={2} basePath={`/knowledge-hub/category/${slug}`} />
          </div>
          <KhSidebar activeCategory={slug} />
        </div>
      </Band>
    </>
  );
}

const crumb = { color: "#7E8AA3", textDecoration: "none" } as const;
