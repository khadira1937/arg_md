import type { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon, SearchX } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Band, DISPLAY, TEAL } from "@/components/marketing/amx-ui";
import { KhStyles, SearchBar, ArticleCard, CategoryPills } from "@/components/marketing/knowledge-hub/kh-ui";
import { KH_ARTICLES, categoryName } from "@/config/knowledge-hub";

export const metadata: Metadata = pageMetadata({
  title: "Search — Knowledge Hub",
  description: "Search articles, guides and resources across the ARGANA MEDIA Knowledge Hub.",
  path: "/knowledge-hub/search",
  noIndex: true,
});

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query
    ? KH_ARTICLES.filter((a) => {
        const cat = categoryName(a.category).toLowerCase();
        const term = query.toLowerCase();
        return cat.includes(term) || term.includes(cat);
      })
    : [];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Knowledge Hub", path: "/knowledge-hub" }, { name: "Search", path: "/knowledge-hub/search" }])} />
      <KhStyles />

      <section style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "clamp(44px,7vh,84px) clamp(18px,4vw,28px) clamp(28px,4vh,44px)", textAlign: "center" }}>
          <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(30px,4.4vw,46px)", lineHeight: 1.06, letterSpacing: "-0.02em", margin: "0 0 22px", color: "#F4F7FC" }}>Search the Knowledge Hub</h1>
          <SearchBar defaultValue={query} />
        </div>
      </section>

      <Band>
        {!query ? (
          // Empty state
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", padding: "clamp(20px,4vh,48px) 0" }}>
            <span style={{ display: "grid", placeItems: "center", width: 72, height: 72, margin: "0 auto 22px", borderRadius: 20, background: "rgba(53,224,232,0.08)", border: "1px solid rgba(53,224,232,0.2)", color: TEAL }}><SearchIcon size={30} strokeWidth={1.6} /></span>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 22, margin: "0 0 10px", color: "#EEF2F9" }}>Find what you need</h2>
            <p style={{ margin: "0 0 28px", fontSize: 15, lineHeight: 1.6, color: "#A7B0C2" }}>Search by topic, technology or question. Try a category name to see how results will look.</p>
            <CategoryPills />
          </div>
        ) : results.length === 0 ? (
          // No-results state
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto", padding: "clamp(20px,4vh,48px) 0" }}>
            <span style={{ display: "grid", placeItems: "center", width: 72, height: 72, margin: "0 auto 22px", borderRadius: 20, background: "rgba(243,205,134,0.08)", border: "1px solid rgba(243,205,134,0.22)", color: "#F3CD86" }}><SearchX size={30} strokeWidth={1.6} /></span>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 22, margin: "0 0 10px", color: "#EEF2F9" }}>No results for &ldquo;{query}&rdquo;</h2>
            <p style={{ margin: "0 0 28px", fontSize: 15, lineHeight: 1.6, color: "#A7B0C2" }}>We could not find anything matching that. Try a broader term, or browse by topic below.</p>
            <CategoryPills />
            <div style={{ marginTop: 28 }}><Link href="/knowledge-hub" style={{ color: TEAL, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>← Back to the Knowledge Hub</Link></div>
          </div>
        ) : (
          // Results
          <div>
            <p style={{ fontSize: 14.5, color: "#A7B0C2", margin: "0 0 26px" }}>
              <strong style={{ color: "#EEF2F9" }}>{results.length}</strong> result{results.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: 18 }}>
              {results.map((a) => <ArticleCard key={a.slug} a={a} />)}
            </div>
          </div>
        )}
      </Band>
    </>
  );
}
