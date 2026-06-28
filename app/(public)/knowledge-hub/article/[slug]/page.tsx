import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd, articleJsonLd } from "@/lib/seo";
import { Band, Cta, DISPLAY, TEAL } from "@/components/marketing/amx-ui";
import {
  KhStyles, ImagePlaceholder, Pill, KhSidebar, Toc, ProseHeading, TextPlaceholder,
  Quote, Callout, ComparisonTable, CodeBlock, Checklist, FaqAccordion, GalleryPlaceholders,
  ShareRow, PrevNextNav, RelatedArticles, NewsletterCard,
} from "@/components/marketing/knowledge-hub/kh-ui";
import {
  KH_ARTICLES, KH_GUIDES, KH_FEATURED, getArticle, categoryName, categoryAccent,
} from "@/config/knowledge-hub";

export function generateStaticParams() {
  return [...KH_ARTICLES, KH_FEATURED, ...KH_GUIDES].map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  return pageMetadata({
    title: a ? "Article — Knowledge Hub" : "Article",
    description: "An in-depth article from the ARGANA MEDIA Knowledge Hub. Full content coming soon.",
    path: `/knowledge-hub/article/${slug}`,
  });
}

const SECTIONS = ["Introduction", "Background", "Key considerations", "A worked example", "Comparing the options", "Common questions", "Conclusion"];

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  const category = a?.category ?? "business-strategy";
  const accent = categoryAccent(category);
  const date = a?.date ?? "12 May 2026";
  const readingTime = a?.readingTime ?? "9 min read";

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Knowledge Hub", path: "/knowledge-hub" },
            { name: categoryName(category), path: `/knowledge-hub/category/${category}` },
            { name: "Article", path: `/knowledge-hub/article/${slug}` },
          ]),
          articleJsonLd({
            title: "[Article title placeholder]",
            description: "An in-depth article from the ARGANA MEDIA Knowledge Hub.",
            path: `/knowledge-hub/article/${slug}`,
            datePublished: "2026-05-12",
            section: categoryName(category),
          }),
        ]}
      />
      <KhStyles />

      {/* Hero */}
      <section style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(36px,6vh,72px) clamp(18px,4vw,28px) clamp(24px,4vh,40px)", textAlign: "center" }}>
          <nav aria-label="Breadcrumb" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 7, fontSize: 13, color: "#7E8AA3", marginBottom: 20, flexWrap: "wrap" }}>
            <Link href="/" style={crumb}>Home</Link><ChevronRight size={13} />
            <Link href="/knowledge-hub" style={crumb}>Knowledge Hub</Link><ChevronRight size={13} />
            <Link href={`/knowledge-hub/category/${category}`} style={crumb}>{categoryName(category)}</Link>
          </nav>
          <span style={{ display: "inline-flex", marginBottom: 18 }}><Pill color={accent}>{categoryName(category)}</Pill></span>
          <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(30px,4.6vw,50px)", lineHeight: 1.08, letterSpacing: "-0.02em", margin: 0, color: "#F4F7FC" }}>[Article title placeholder]</h1>
          <p style={{ margin: "20px auto 0", maxWidth: 620, fontSize: 17.5, lineHeight: 1.6, color: "#A7B0C2" }}>[Article subtitle placeholder — a one-line summary of the piece will sit here.]</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "6px 16px", marginTop: 22, fontSize: 13.5, color: "#8A93A6" }}>
            <span>By ARGANA MEDIA</span><span>·</span><span>{date}</span><span>·</span><span>{readingTime}</span>
          </div>
        </div>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 clamp(18px,4vw,28px) clamp(8px,2vh,20px)" }}>
          <ImagePlaceholder label="Hero image placeholder" accent={accent} minH={360} rounded={22} />
        </div>
      </section>

      <Band pad="clamp(36px,6vh,72px)">
        <div className="kh-article-layout">
          {/* ToC */}
          <Toc items={SECTIONS} />

          {/* Body */}
          <article className="kh-prose">
            <ProseHeading>Introduction</ProseHeading>
            <p className="kh-lede" style={{ margin: "0 0 26px" }}>[Article lede placeholder — the opening paragraph that frames the topic will appear here once written.]</p>

            <ProseHeading>Background</ProseHeading>
            <TextPlaceholder lines={4} />
            <div style={{ margin: "26px 0" }}><ImagePlaceholder label="In-article image placeholder" accent={accent} /></div>

            <ProseHeading>Key considerations</ProseHeading>
            <TextPlaceholder lines={3} />
            <Checklist />
            <Callout tone="tip" />

            <ProseHeading>A worked example</ProseHeading>
            <TextPlaceholder lines={3} />
            <CodeBlock />
            <Callout tone="warning" />

            <ProseHeading>Comparing the options</ProseHeading>
            <TextPlaceholder lines={2} />
            <ComparisonTable />
            <Quote />

            <ProseHeading>Common questions</ProseHeading>
            <FaqAccordion count={4} />

            <ProseHeading>Conclusion</ProseHeading>
            <TextPlaceholder lines={3} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 36, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <ShareRow />
              <Link href="/knowledge-hub" style={{ fontSize: 13.5, color: TEAL, textDecoration: "none", fontWeight: 600 }}>← Back to Knowledge Hub</Link>
            </div>
          </article>

          {/* Sidebar */}
          <KhSidebar activeCategory={category} />
        </div>
      </Band>

      <Band borderTop bg="linear-gradient(180deg, rgba(255,255,255,0.012), transparent 45%)">
        <PrevNextNav />
        <div style={{ marginTop: 56 }}><RelatedArticles /></div>
      </Band>

      <Band><NewsletterCard /></Band>

      <Cta title="Ready to put this into practice?" sub="Tell us what you are working on and we will help you map the right next step — no pressure, no obligation." primaryLabel="Book a Discovery Call" />
    </>
  );
}

const crumb = { color: "#7E8AA3", textDecoration: "none" } as const;
