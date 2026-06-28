import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { Hero, Band, Head, Cta, DISPLAY, TEAL, GOLD, SKY } from "@/components/marketing/amx-ui";
import {
  KhStyles, SearchBar, CategoryPills, FeaturedArticleCard, ArticleCard,
  GuideCard, CategoryCard, NewsletterCard, Pagination,
} from "@/components/marketing/knowledge-hub/kh-ui";
import { KH_ARTICLES, KH_GUIDES, KH_CATEGORIES, KH_FEATURED } from "@/config/knowledge-hub";

export const metadata: Metadata = pageMetadata({
  title: "Knowledge Hub",
  description:
    "Practical resources on building, growing and maintaining modern websites and web applications — insights, guides and case studies from the ARGANA MEDIA team.",
  path: "/knowledge-hub",
});

const grid = (min = 300) => ({ display: "grid", gridTemplateColumns: `repeat(auto-fit,minmax(min(${min}px,100%),1fr))`, gap: 18 } as const);

export default function KnowledgeHubPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Knowledge Hub", path: "/knowledge-hub" }]),
          itemListJsonLd(KH_ARTICLES.map((a) => ({ name: a.title, path: `/knowledge-hub/article/${a.slug}` }))),
        ]}
      />
      <KhStyles />

      <Hero
        eyebrow="Knowledge Hub"
        title={<>Resources for building a <span style={{ background: `linear-gradient(110deg, ${TEAL}, ${SKY} 45%, ${GOLD})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>better web presence</span></>}
        sub="Insights, in-depth guides and real case studies on web design, development, performance, SEO and the decisions behind great digital products."
      />

      <Band pad="clamp(24px,4vh,40px)">
        <div style={{ maxWidth: 600, margin: "0 auto 26px" }}><SearchBar /></div>
        <CategoryPills />
      </Band>

      <Band pad="clamp(8px,2vh,24px)">
        <FeaturedArticleCard a={KH_FEATURED} />
      </Band>

      <Band>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 32 }}>
          <Head title="Latest articles" sub="The newest writing from our team. Content is being added — these are placeholders." />
        </div>
        <div style={grid(300)}>
          {KH_ARTICLES.map((a) => <ArticleCard key={a.slug} a={a} />)}
        </div>
        <Pagination current={1} totalPages={3} basePath="/knowledge-hub" />
      </Band>

      <Band id="guides" borderTop bg="linear-gradient(180deg, rgba(53,224,232,0.02), transparent 45%)">
        <Head center eyebrow="Go deeper" eyebrowColor={TEAL} title="Popular guides"
          sub="Longer, structured walkthroughs of the topics clients ask about most." />
        <div style={{ marginTop: 40, ...grid(320) }}>
          {KH_GUIDES.map((g, i) => <GuideCard key={g.slug} g={g} i={i} />)}
        </div>
      </Band>

      <Band id="categories">
        <Head center eyebrow="Browse by topic" eyebrowColor={GOLD} title="Categories"
          sub="Every article is organised by topic so you can find exactly what you need." />
        <div style={{ marginTop: 40, ...grid(260) }}>
          {KH_CATEGORIES.map((c) => <CategoryCard key={c.slug} c={c} />)}
        </div>
      </Band>

      <Band borderTop>
        <NewsletterCard />
      </Band>

      <Cta
        title="Have a project in mind?"
        sub="Reading is a good start — but the fastest way forward is a short, no-pressure conversation about what you are trying to build."
        primaryLabel="Book a Discovery Call"
      />
    </>
  );
}
