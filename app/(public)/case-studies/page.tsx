import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { Hero, Band, Head, Cta, TEAL, GOLD, SKY } from "@/components/marketing/amx-ui";
import {
  KhStyles, SearchBar, CaseStudyCard, FeaturedCaseStudyCard, NewsletterCard, Pagination,
} from "@/components/marketing/knowledge-hub/kh-ui";
import { KH_CASE_STUDIES, KH_FEATURED_CASE_STUDY } from "@/config/knowledge-hub";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Selected projects from ARGANA MEDIA — websites, e-commerce, web applications and developer documentation. Detailed write-ups of our approach, process and results.",
  path: "/case-studies",
});

const SERVICES = ["Corporate Website", "E-commerce", "Web Application", "Booking Platform", "Marketing Website", "Developer Documentation"];

export default async function CaseStudiesPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const studies = service ? KH_CASE_STUDIES.filter((c) => c.service === service) : KH_CASE_STUDIES;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }]),
          itemListJsonLd(KH_CASE_STUDIES.map((c) => ({ name: c.title, path: `/case-studies/${c.slug}` }))),
        ]}
      />
      <KhStyles />

      <Hero
        eyebrow="Case Studies"
        title={<>Selected work, told <span style={{ background: `linear-gradient(110deg, ${TEAL}, ${SKY} 45%, ${GOLD})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>in full</span></>}
        sub="In-depth write-ups of how we approach real projects — the brief, the constraints, the decisions and the outcome. New case studies are being published; the structure below is ready for them."
      />

      <Band pad="clamp(24px,4vh,40px)">
        <div style={{ maxWidth: 600, margin: "0 auto 26px" }}><SearchBar action="/case-studies" placeholder="Search case studies…" /></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9, justifyContent: "center" }}>
          <Link href="/case-studies" className="kh-chip" data-active={!service ? "1" : undefined}>All</Link>
          {SERVICES.map((s) => (
            <Link key={s} href={`/case-studies?service=${encodeURIComponent(s)}`} className="kh-chip" data-active={service === s ? "1" : undefined}>{s}</Link>
          ))}
        </div>
      </Band>

      {!service && (
        <Band pad="clamp(8px,2vh,24px)">
          <FeaturedCaseStudyCard c={KH_FEATURED_CASE_STUDY} />
        </Band>
      )}

      <Band>
        <Head title={service ? `${service} projects` : "All case studies"}
          sub="Every card is a placeholder — real projects, screenshots and write-ups are added here." />
        <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: 18 }}>
          {studies.length > 0
            ? studies.map((c) => <CaseStudyCard key={c.slug} c={c} />)
            : <p style={{ color: "#8A93A6" }}>No case studies for this filter yet.</p>}
        </div>
        <Pagination current={1} totalPages={2} basePath="/case-studies" />
      </Band>

      <Band borderTop><NewsletterCard /></Band>

      <Cta title="Could your project be next?" sub="Tell us what you are trying to build. We will walk you through how we would approach it — and share relevant examples on the call." primaryLabel="Book a Discovery Call" />
    </>
  );
}
