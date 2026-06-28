# PHASE 2 — PART 2 COMPLETED (UI / architecture only)
### Knowledge Hub & Case Studies

**Status:** ✅ Built, `tsc` clean, `npm run build` green (119 pages, incl. all new routes).
Placeholder content only — no real articles, no invented case studies, no fake metrics/people.
Not committed to `main` / not pushed for the live site (checkpointed to the `desing` branch).

## Routes created
- `/knowledge-hub` — hub homepage (hero, search, category pills, featured article, 18 latest
  article cards, popular guides, 12-category grid, newsletter, Book-a-Discovery-Call CTA).
- `/knowledge-hub/category/[slug]` — 12 category pages (hero, breadcrumb, pills, article grid,
  pagination, sticky sidebar). `generateStaticParams` for all 12.
- `/knowledge-hub/article/[slug]` — full article template (breadcrumb, hero image placeholder,
  title/subtitle, meta, 3-column layout = sticky ToC + body + sidebar). Body demonstrates every
  block: headings, lede, body placeholders, image placeholder, checklist, callouts (info/tip/
  warning), code block, comparison table, pull-quote, FAQ accordion, share row, related articles,
  prev/next, newsletter, CTA.
- `/knowledge-hub/search` — empty state, results state, no-results state (category-keyword filter).
- `/case-studies` — index (hero, search, service filter chips, featured case study, 12-card grid,
  pagination, newsletter, CTA). Separate from the blog.
- `/case-studies/[slug]` — full case-study template (breadcrumb, hero, project meta strip, sticky
  ToC + body: overview, challenge, objectives, research, discovery, solution, process, technologies,
  accessibility, performance, SEO, security, results [labelled `[Metric]` placeholders — no fake
  numbers], gallery, timeline, key takeaways, related, CTA).

## Components & data
- `config/knowledge-hub.ts` — typed placeholder model: 12 categories, 18 articles + featured,
  6 guides, 12 case studies + featured, helpers. Author byline = "ARGANA MEDIA" (company, not a
  fabricated person). Titles/excerpts/summaries are clearly-labelled placeholders.
- `components/marketing/knowledge-hub/kh-ui.tsx` — shared, server-rendered toolkit: `KhStyles`,
  `ImagePlaceholder`, `Pill`, `ArticleCard`, `FeaturedArticleCard`, `GuideCard`, `CategoryCard`,
  `CaseStudyCard`, `FeaturedCaseStudyCard`, `SearchBar`, `CategoryPills`, `Pagination`,
  `NewsletterCard`, `BookCallCard`, `KhSidebar` (search, categories, popular, latest, related
  services, book-a-call, newsletter, resources), and article blocks (`Toc`, `ProseHeading`,
  `TextPlaceholder`, `Quote`, `Callout`, `ComparisonTable`, `CodeBlock`, `Checklist`,
  `FaqAccordion`, `GalleryPlaceholders`, `ShareRow`, `PrevNextNav`, `RelatedArticles`).

## Navigation
- Shared navbar: "Blog" → **Knowledge Hub** premium dropdown (Insights, Case Studies, Categories,
  Guides, Search) + mobile entries for Knowledge Hub & Case Studies.
- Homepage inline navbar: matching CSS-hover Knowledge Hub dropdown + mobile + footer.
- `config/nav.ts` (mainNav + footer Company) and footer updated; `.amx-khitem` hover style added.

## SEO
- `lib/seo`: added `articleJsonLd` + `itemListJsonLd`; fixed `websiteJsonLd` SearchAction to
  `/knowledge-hub/search`. Each page emits `pageMetadata` + breadcrumb/itemList/article JSON-LD.
  Dynamic routes use `generateMetadata` + `generateStaticParams`.

## Design / a11y
- Reuses the existing `amx-ui` dark teal/gold system, generous whitespace, elegant hover, sticky
  ToC/sidebar, accessible `<details>` FAQ, `prefers-reduced-motion`, responsive grids. Every image
  slot is a clearly-labelled placeholder (no AI imagery).

## Remaining (content phase — separate)
- Real, original article/guide/category copy; real (own) case studies; licensed (non-AI) images
  wired via `next/image`; per-page metadata/OG; sitemap entries; optional newsletter backend.
