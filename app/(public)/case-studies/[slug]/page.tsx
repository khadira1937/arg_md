import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd, articleJsonLd } from "@/lib/seo";
import { Band, Cta, DISPLAY, TEAL, GOLD } from "@/components/marketing/amx-ui";
import {
  KhStyles, ImagePlaceholder, Pill, Toc, ProseHeading, TextPlaceholder,
  Checklist, Callout, GalleryPlaceholders, CaseStudyCard,
} from "@/components/marketing/knowledge-hub/kh-ui";
import {
  KH_CASE_STUDIES, KH_FEATURED_CASE_STUDY, getCaseStudy, CASE_STUDY_SECTIONS,
} from "@/config/knowledge-hub";

export function generateStaticParams() {
  return [...KH_CASE_STUDIES, KH_FEATURED_CASE_STUDY].map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return pageMetadata({
    title: "Case Study",
    description: "A detailed ARGANA MEDIA project case study — approach, process and results. Full write-up coming soon.",
    path: `/case-studies/${slug}`,
  });
}

const TIMELINE = ["Discovery", "Research", "Design", "Development", "QA", "Launch", "Support"];

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug) ?? KH_CASE_STUDIES[0];
  const related = KH_CASE_STUDIES.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }, { name: "Case Study", path: `/case-studies/${slug}` }]),
          articleJsonLd({ title: "[Case study title placeholder]", description: "An ARGANA MEDIA project case study.", path: `/case-studies/${slug}`, section: c.service }),
        ]}
      />
      <KhStyles />

      {/* Hero */}
      <section style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "clamp(36px,6vh,72px) clamp(18px,4vw,28px) clamp(20px,3vh,32px)" }}>
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#7E8AA3", marginBottom: 20, flexWrap: "wrap" }}>
            <Link href="/" style={crumb}>Home</Link><ChevronRight size={13} />
            <Link href="/case-studies" style={crumb}>Case Studies</Link><ChevronRight size={13} />
            <span style={{ color: "#C7CEDC" }}>{c.service}</span>
          </nav>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            <Pill color={GOLD}>{c.industry}</Pill><Pill color={TEAL}>{c.service}</Pill>
          </div>
          <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(30px,4.6vw,52px)", lineHeight: 1.06, letterSpacing: "-0.02em", margin: 0, maxWidth: 880, color: "#F4F7FC" }}>[Case study title placeholder]</h1>
          <p style={{ margin: "18px 0 0", maxWidth: 700, fontSize: 17.5, lineHeight: 1.6, color: "#A7B0C2" }}>[Case study subtitle placeholder — a one-line outcome-focused summary will sit here.]</p>
        </div>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 clamp(18px,4vw,28px) clamp(8px,2vh,20px)" }}>
          <ImagePlaceholder label="Case study hero image placeholder" accent={TEAL} minH={380} rounded={22} />
        </div>
      </section>

      {/* Project meta strip */}
      <Band pad="clamp(24px,4vh,40px)">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(200px,100%),1fr))", gap: 16 }}>
          {[["Industry", c.industry], ["Service", c.service], ["Duration", c.duration], ["Technologies", c.technologies.join(" · ")]].map(([k, v]) => (
            <div key={k} style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.022)", padding: "16px 18px" }}>
              <p style={{ margin: "0 0 6px", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7E8AA3", fontWeight: 600 }}>{k}</p>
              <p style={{ margin: 0, fontSize: 14, color: "#EEF2F9" }}>{v}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* Body + ToC */}
      <Band pad="clamp(32px,5vh,72px)">
        <div className="kh-article-layout" style={{ gridTemplateColumns: "240px minmax(0,1fr)" }}>
          <Toc items={CASE_STUDY_SECTIONS} />
          <article className="kh-prose" style={{ maxWidth: 820 }}>
            <ProseHeading>Project overview</ProseHeading>
            <p className="kh-lede" style={{ margin: "0 0 26px" }}>[Project overview placeholder — a short framing of the client, the goal and why the project mattered.]</p>

            <ProseHeading>Challenge</ProseHeading>
            <TextPlaceholder lines={3} />

            <ProseHeading>Objectives</ProseHeading>
            <Checklist />

            <ProseHeading>Research</ProseHeading>
            <TextPlaceholder lines={3} />
            <div style={{ margin: "26px 0" }}><ImagePlaceholder label="Research artefact placeholder" accent={TEAL} /></div>

            <ProseHeading>Discovery</ProseHeading>
            <TextPlaceholder lines={3} />

            <ProseHeading>Solution</ProseHeading>
            <TextPlaceholder lines={3} />
            <div style={{ margin: "26px 0" }}><ImagePlaceholder label="Solution screenshot placeholder" accent={GOLD} /></div>

            <ProseHeading>Process</ProseHeading>
            <TextPlaceholder lines={2} />

            <ProseHeading>Technologies</ProseHeading>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "4px 0 26px" }}>
              {c.technologies.map((t) => (
                <span key={t} style={{ fontSize: 12.5, color: "#9AA4B8", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.025)", padding: "5px 12px", borderRadius: 100 }}>{t}</span>
              ))}
            </div>

            <ProseHeading>Accessibility</ProseHeading>
            <TextPlaceholder lines={2} /><Callout tone="info" />

            <ProseHeading>Performance</ProseHeading>
            <TextPlaceholder lines={2} />

            <ProseHeading>SEO</ProseHeading>
            <TextPlaceholder lines={2} />

            <ProseHeading>Security</ProseHeading>
            <TextPlaceholder lines={2} />

            <ProseHeading>Results</ProseHeading>
            <p style={{ margin: "0 0 18px", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7E8AA3", fontWeight: 600 }}>Outcome placeholders — real, verifiable results added later</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(150px,100%),1fr))", gap: 14, margin: "0 0 24px" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ borderRadius: 14, border: "1px dashed rgba(255,255,255,0.16)", background: "rgba(255,255,255,0.02)", padding: 20, textAlign: "center" }}>
                  <p style={{ margin: "0 0 6px", fontFamily: DISPLAY, fontWeight: 600, fontSize: 26, color: "#EEF2F9" }}>[Metric]</p>
                  <p style={{ margin: 0, fontSize: 12.5, color: "#8A93A6" }}>[Result context placeholder]</p>
                </div>
              ))}
            </div>
            <TextPlaceholder lines={2} />

            <ProseHeading>Gallery</ProseHeading>
            <div style={{ margin: "4px 0 26px" }}><GalleryPlaceholders count={3} /></div>

            <ProseHeading>Timeline</ProseHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, margin: "8px 0 26px" }}>
              {TIMELINE.map((phase, i) => (
                <div key={phase} style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingBottom: i === TIMELINE.length - 1 ? 0 : 18 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: "linear-gradient(135deg,#35E0E8,#F3CD86)" }} />
                    {i < TIMELINE.length - 1 && <span style={{ width: 2, flex: 1, minHeight: 30, background: "rgba(255,255,255,0.1)", marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingBottom: 4 }}>
                    <p style={{ margin: 0, fontFamily: DISPLAY, fontWeight: 500, fontSize: 15.5, color: "#EEF2F9" }}>{phase}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 13, color: "#8A93A6" }}>[Phase date &amp; detail placeholder]</p>
                  </div>
                </div>
              ))}
            </div>

            <ProseHeading>Key takeaways</ProseHeading>
            <Checklist />
          </article>
        </div>
      </Band>

      {/* Related */}
      <Band borderTop bg="linear-gradient(180deg, rgba(255,255,255,0.012), transparent 45%)">
        <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(22px,3vw,30px)", margin: "0 0 24px", color: "#F4F7FC" }}>Related case studies</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: 18 }}>
          {related.map((r) => <CaseStudyCard key={r.slug} c={r} />)}
        </div>
      </Band>

      <Cta title="Let's talk about your project" sub="Tell us what you are trying to achieve. We will show you how we would approach it and share relevant work on the call." primaryLabel="Book a Discovery Call" />
    </>
  );
}

const crumb = { color: "#7E8AA3", textDecoration: "none" } as const;
