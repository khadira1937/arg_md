import Link from "next/link";
import type { ReactNode } from "react";
import {
  Image as ImageIcon, ArrowRight, ArrowUpRight, Clock, Calendar, ChevronRight,
  Quote as QuoteIcon, Lightbulb, AlertTriangle, Check, Info, Mail, PhoneCall,
  BookOpen, Layers, FileText, Linkedin, Twitter, Link2, Search,
} from "lucide-react";
import { Btn, DISPLAY, TEAL, GOLD } from "@/components/marketing/amx-ui";
import { CALENDLY_URL } from "@/config/cta";
import { brand } from "@/config/brand";
import {
  KH_CATEGORIES, KH_ARTICLES, KH_GUIDES, type KhArticle, type KhGuide,
  type KhCategory, type KhCaseStudy, categoryName, categoryAccent,
} from "@/config/knowledge-hub";

const INK = "#F4F7FC";
const BODY = "#A7B0C2";
const MUTE = "#8A93A6";
const FAINT = "#7E8AA3";

/* ============================================================ Scoped styles */
export function KhStyles() {
  return <style dangerouslySetInnerHTML={{ __html: CSS }} />;
}

/* ============================================================ Primitives */
export function ImagePlaceholder({
  label = "Image placeholder", ratio = "16 / 9", accent = TEAL, minH, rounded = 16, zoom = false,
}: { label?: string; ratio?: string; accent?: string; minH?: number; rounded?: number; zoom?: boolean }) {
  return (
    <div className="kh-imgph" style={{ aspectRatio: minH ? undefined : ratio, minHeight: minH, borderRadius: rounded }}>
      <div className={zoom ? "kh-imgph-bg kh-zoom" : "kh-imgph-bg"} style={{ background: `radial-gradient(120% 100% at 18% 0%, ${accent}26, transparent 55%), linear-gradient(135deg,#0E1626,#0A111F)` }} />
      <div style={{ position: "relative", display: "grid", placeItems: "center", gap: 9, textAlign: "center", padding: 18 }}>
        <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 11, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: accent }}>
          <ImageIcon size={18} strokeWidth={1.8} />
        </span>
        <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: FAINT, fontWeight: 600 }}>{label}</span>
      </div>
    </div>
  );
}

export function Pill({ children, color = TEAL, filled = false }: { children: ReactNode; color?: string; filled?: boolean }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600,
      letterSpacing: "0.04em", textTransform: "uppercase", padding: "5px 11px", borderRadius: 100,
      color: filled ? "#0A0E18" : color,
      background: filled ? color : `${color}1A`,
      border: `1px solid ${color}${filled ? "" : "33"}`,
    }}>{children}</span>
  );
}

function Meta({ a }: { a: KhArticle }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 14px", fontSize: 12.5, color: MUTE }}>
      <span>{a.author}</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Calendar size={13} /> {a.date}</span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Clock size={13} /> {a.readingTime}</span>
    </div>
  );
}

/* ============================================================ Article cards */
export function ArticleCard({ a }: { a: KhArticle }) {
  const accent = categoryAccent(a.category);
  return (
    <Link href={`/knowledge-hub/article/${a.slug}`} className="kh-card" style={cardShell}>
      <div style={{ position: "relative" }}>
        <ImagePlaceholder accent={accent} rounded={0} zoom label="Article image placeholder" />
        <span style={{ position: "absolute", left: 14, top: 14 }}><Pill color={accent}>{categoryName(a.category)}</Pill></span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: 22, gap: 12 }}>
        <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 18.5, lineHeight: 1.25, margin: 0, color: INK }}>{a.title}</h3>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: MUTE, flex: 1 }}>{a.excerpt}</p>
        <Meta a={a} />
        <span className="kh-readmore" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600, color: accent, marginTop: 2 }}>
          Read article <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}

export function FeaturedArticleCard({ a }: { a: KhArticle }) {
  const accent = categoryAccent(a.category);
  return (
    <Link href={`/knowledge-hub/article/${a.slug}`} className="kh-card kh-featured" style={{ ...cardShell, display: "grid" }}>
      <div style={{ position: "relative" }}>
        <ImagePlaceholder accent={accent} minH={300} rounded={0} zoom label="Featured image placeholder" />
        <span style={{ position: "absolute", left: 18, top: 18 }}><Pill color={GOLD} filled>Featured</Pill></span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16, padding: "clamp(26px,3.5vw,42px)" }}>
        <Pill color={accent}>{categoryName(a.category)}</Pill>
        <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.1, letterSpacing: "-0.01em", margin: 0, color: INK }}>{a.title}</h2>
        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: BODY }}>{a.excerpt}</p>
        <Meta a={a} />
        <span style={{ marginTop: 6 }}>
          <span className="kh-fakebtn" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#0A0E18", background: "linear-gradient(135deg,#F6D79A,#E3A94E)", fontWeight: 600, fontSize: 14, padding: "12px 22px", borderRadius: 11 }}>
            Read the article <ArrowRight size={16} />
          </span>
        </span>
      </div>
    </Link>
  );
}

export function GuideCard({ g, i }: { g: KhGuide; i: number }) {
  const accent = KH_CATEGORIES[i % KH_CATEGORIES.length].accent;
  return (
    <Link href={`/knowledge-hub/article/${g.slug}`} className="kh-card" style={{ ...cardShell, flexDirection: "row", alignItems: "center", gap: 16, padding: 18 }}>
      <span style={{ display: "grid", placeItems: "center", flexShrink: 0, width: 50, height: 50, borderRadius: 13, background: `${accent}1A`, border: `1px solid ${accent}33`, color: accent }}>
        <BookOpen size={22} strokeWidth={1.7} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
        <span style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 16, color: INK }}>{g.title}</span>
        <span style={{ fontSize: 12.5, color: MUTE }}>{g.parts} · {g.readingTime}</span>
      </span>
      <ArrowUpRight size={18} style={{ marginLeft: "auto", color: FAINT, flexShrink: 0 }} />
    </Link>
  );
}

export function CategoryCard({ c }: { c: KhCategory }) {
  const count = KH_ARTICLES.filter((a) => a.category === c.slug).length;
  return (
    <Link href={`/knowledge-hub/category/${c.slug}`} className="kh-card" style={{ ...cardShell, padding: 24 }}>
      <span style={{ display: "grid", placeItems: "center", width: 48, height: 48, borderRadius: 13, background: `${c.accent}1A`, border: `1px solid ${c.accent}33`, color: c.accent, marginBottom: 16 }}>
        <c.Icon size={22} strokeWidth={1.7} />
      </span>
      <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 17.5, margin: "0 0 6px", color: INK }}>{c.name}</h3>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: MUTE, flex: 1 }}>{c.blurb}</p>
      <span style={{ marginTop: 14, fontSize: 12.5, color: FAINT }}>{count} article{count === 1 ? "" : "s"}</span>
    </Link>
  );
}

const cardShell = {
  display: "flex", flexDirection: "column", textDecoration: "none", overflow: "hidden",
  borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.022)", height: "100%",
} as const;

/* ============================================================ Case study cards */
export function CaseStudyCard({ c }: { c: KhCaseStudy }) {
  return (
    <Link href={`/case-studies/${c.slug}`} className="kh-card" style={cardShell}>
      <div style={{ position: "relative" }}>
        <ImagePlaceholder accent={TEAL} rounded={0} zoom label="Case study image placeholder" />
        <span style={{ position: "absolute", left: 14, top: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Pill color={GOLD}>{c.industry}</Pill>
          <Pill color={TEAL}>{c.service}</Pill>
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: 22, gap: 12 }}>
        <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 18.5, lineHeight: 1.25, margin: 0, color: INK }}>{c.title}</h3>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: MUTE, flex: 1 }}>{c.summary}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {c.technologies.map((t) => (
            <span key={t} style={{ fontSize: 11.5, color: "#9AA4B8", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.025)", padding: "3px 9px", borderRadius: 100 }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ fontSize: 12.5, color: FAINT, display: "inline-flex", alignItems: "center", gap: 6 }}><Clock size={13} /> {c.duration}</span>
          <span className="kh-readmore" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: TEAL }}>Read case study <ArrowRight size={14} /></span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedCaseStudyCard({ c }: { c: KhCaseStudy }) {
  return (
    <Link href={`/case-studies/${c.slug}`} className="kh-card kh-featured" style={{ ...cardShell, display: "grid" }}>
      <div style={{ position: "relative" }}>
        <ImagePlaceholder accent={TEAL} minH={320} rounded={0} zoom label="Featured case study image placeholder" />
        <span style={{ position: "absolute", left: 18, top: 18 }}><Pill color={GOLD} filled>Featured project</Pill></span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16, padding: "clamp(26px,3.5vw,42px)" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Pill color={GOLD}>{c.industry}</Pill><Pill color={TEAL}>{c.service}</Pill>
        </div>
        <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(24px,3vw,34px)", lineHeight: 1.1, letterSpacing: "-0.01em", margin: 0, color: INK }}>{c.title}</h2>
        <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: BODY }}>{c.summary}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {c.technologies.map((t) => (
            <span key={t} style={{ fontSize: 12, color: "#9AA4B8", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.025)", padding: "4px 11px", borderRadius: 100 }}>{t}</span>
          ))}
        </div>
        <span style={{ marginTop: 6 }}>
          <span className="kh-fakebtn" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#0A0E18", background: "linear-gradient(135deg,#F6D79A,#E3A94E)", fontWeight: 600, fontSize: 14, padding: "12px 22px", borderRadius: 11 }}>
            View case study <ArrowRight size={16} />
          </span>
        </span>
      </div>
    </Link>
  );
}

/* ============================================================ Search + filters */
export function SearchBar({ action = "/knowledge-hub/search", defaultValue = "", placeholder = "Search articles, guides and topics…" }: { action?: string; defaultValue?: string; placeholder?: string }) {
  return (
    <form action={action} method="get" className="kh-search" role="search">
      <Search size={18} style={{ color: FAINT, flexShrink: 0 }} />
      <input name="q" defaultValue={defaultValue} placeholder={placeholder} aria-label="Search the Knowledge Hub" autoComplete="off" />
      <button type="submit" className="kh-search-btn">Search</button>
    </form>
  );
}

export function CategoryPills({ activeSlug }: { activeSlug?: string }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 9, justifyContent: "center" }}>
      <Link href="/knowledge-hub" className="kh-chip" data-active={!activeSlug ? "1" : undefined}>All</Link>
      {KH_CATEGORIES.map((c) => (
        <Link key={c.slug} href={`/knowledge-hub/category/${c.slug}`} className="kh-chip" data-active={activeSlug === c.slug ? "1" : undefined}>{c.name}</Link>
      ))}
    </div>
  );
}

export function Pagination({ current = 1, totalPages = 1, basePath }: { current?: number; totalPages?: number; basePath: string }) {
  const pages = Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1);
  const href = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);
  return (
    <nav aria-label="Pagination" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 44 }}>
      <Link href={href(Math.max(1, current - 1))} className="kh-page" aria-label="Previous page">←</Link>
      {pages.map((p) => (
        <Link key={p} href={href(p)} className="kh-page" data-active={p === current ? "1" : undefined}>{p}</Link>
      ))}
      <Link href={href(Math.min(totalPages, current + 1))} className="kh-page" aria-label="Next page">→</Link>
    </nav>
  );
}

/* ============================================================ Newsletter + CTAs */
export function NewsletterCard({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 18, border: "1px solid rgba(255,255,255,0.1)", background: "linear-gradient(150deg, rgba(53,224,232,0.06), rgba(243,205,134,0.04))", padding: compact ? 22 : "clamp(28px,4vw,44px)", textAlign: compact ? "left" : "center" }}>
      <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: compact ? 18 : "clamp(22px,3vw,30px)", margin: "0 0 8px", color: INK }}>Get new resources by email</h3>
      <p style={{ margin: "0 auto", maxWidth: compact ? undefined : 460, fontSize: 14, lineHeight: 1.55, color: BODY }}>
        Occasional, practical notes on building better websites. No spam — unsubscribe any time.
      </p>
      <form action="/knowledge-hub" method="get" className="kh-news-form" data-compact={compact ? "1" : undefined} aria-label="Newsletter signup (UI placeholder)">
        <input type="email" name="email" placeholder="you@company.com" aria-label="Email address" autoComplete="email" />
        <button type="submit" className="kh-gold-btn">Subscribe</button>
      </form>
      <p style={{ margin: "10px 0 0", fontSize: 11.5, color: FAINT }}>Newsletter delivery is wired up later — this is the UI only.</p>
    </div>
  );
}

export function BookCallCard() {
  return (
    <div style={{ borderRadius: 18, border: "1px solid rgba(243,205,134,0.25)", background: "linear-gradient(150deg, rgba(243,205,134,0.08), rgba(53,224,232,0.04))", padding: 22 }}>
      <span style={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 12, background: "rgba(243,205,134,0.14)", color: GOLD, marginBottom: 14 }}><PhoneCall size={19} /></span>
      <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 17, margin: "0 0 6px", color: INK }}>Book a discovery call</h3>
      <p style={{ margin: "0 0 16px", fontSize: 13.5, lineHeight: 1.55, color: BODY }}>Have a project in mind? Talk it through with our team — free and no-pressure.</p>
      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="kh-gold-btn" style={{ display: "flex", justifyContent: "center", textDecoration: "none" }}>Book a Call</a>
    </div>
  );
}

/* ============================================================ Sidebar */
function SideBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.022)", padding: 20 }}>
      <h3 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 14, letterSpacing: "0.04em", textTransform: "uppercase", color: FAINT, margin: "0 0 14px" }}>{title}</h3>
      {children}
    </div>
  );
}

export function KhSidebar({ activeCategory }: { activeCategory?: string }) {
  const popular = KH_ARTICLES.slice(0, 4);
  const latest = KH_ARTICLES.slice(4, 8);
  const services: [string, string][] = [
    ["Corporate Websites", "/what-we-build"], ["Web Applications", "/what-we-build"],
    ["E-commerce", "/what-we-build"], ["Developer Documentation", "/what-we-build"],
  ];
  const resources: [string, string][] = [
    ["Case Studies", "/case-studies"], ["All Categories", "/knowledge-hub#categories"],
    ["Popular Guides", "/knowledge-hub#guides"], ["Services", "/services"],
  ];
  return (
    <aside className="kh-sidebar">
      <SideBlock title="Search"><SearchBar placeholder="Search the hub…" /></SideBlock>
      <SideBlock title="Categories">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {KH_CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/knowledge-hub/category/${c.slug}`} className="kh-chip" data-active={activeCategory === c.slug ? "1" : undefined} style={{ fontSize: 12 }}>{c.name}</Link>
          ))}
        </div>
      </SideBlock>
      <SideBlock title="Popular articles"><SideList items={popular} /></SideBlock>
      <SideBlock title="Latest articles"><SideList items={latest} /></SideBlock>
      <SideBlock title="Related services">
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {services.map(([t, h]) => <Link key={t} href={h} className="kh-sidelink"><Layers size={14} /> {t}</Link>)}
        </div>
      </SideBlock>
      <BookCallCard />
      <NewsletterCard compact />
      <SideBlock title="Resources">
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {resources.map(([t, h]) => <Link key={t} href={h} className="kh-sidelink"><FileText size={14} /> {t}</Link>)}
        </div>
      </SideBlock>
    </aside>
  );
}

function SideList({ items }: { items: KhArticle[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((a) => (
        <Link key={a.slug} href={`/knowledge-hub/article/${a.slug}`} style={{ display: "flex", gap: 12, textDecoration: "none", alignItems: "center" }}>
          <span style={{ flexShrink: 0, width: 54, height: 44, borderRadius: 9, border: "1px dashed rgba(255,255,255,0.16)", background: "linear-gradient(135deg,#0E1626,#0A111F)", display: "grid", placeItems: "center", color: FAINT }}><ImageIcon size={14} /></span>
          <span style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
            <span className="kh-clamp2" style={{ fontSize: 13, lineHeight: 1.35, color: "#D4DAE6" }}>{a.title}</span>
            <span style={{ fontSize: 11.5, color: FAINT }}>{a.readingTime}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

/* ============================================================ Article body blocks */
export function Toc({ items }: { items: string[] }) {
  return (
    <nav className="kh-toc" aria-label="Table of contents">
      <span style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", color: FAINT }}>On this page</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 12 }}>
        {items.map((t) => <a key={t} href={`#${slug(t)}`}>{t}</a>)}
      </div>
    </nav>
  );
}

export function ProseHeading({ children }: { children: string }) {
  return <h2 id={slug(children)} style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(22px,3vw,30px)", lineHeight: 1.15, letterSpacing: "-0.01em", margin: "0 0 16px", color: INK, scrollMarginTop: 100 }}>{children}</h2>;
}

export function TextPlaceholder({ lines = 4 }: { lines?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "0 0 26px" }}>
      <p style={{ margin: 0, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: FAINT, fontWeight: 600 }}>Body copy placeholder</p>
      {Array.from({ length: lines }).map((_, i) => (
        <span key={i} className="kh-skel" style={{ width: i === lines - 1 ? "62%" : "100%" }} />
      ))}
    </div>
  );
}

export function Quote() {
  return (
    <blockquote className="kh-quote">
      <QuoteIcon size={26} style={{ color: GOLD, opacity: 0.7 }} />
      <p style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(18px,2.4vw,24px)", lineHeight: 1.4, color: INK, margin: "10px 0 0" }}>[Pull-quote placeholder — a short, memorable line from the article will appear here.]</p>
      <footer style={{ marginTop: 14, fontSize: 13.5, color: MUTE }}>[Attribution placeholder]</footer>
    </blockquote>
  );
}

export function Callout({ tone = "info" }: { tone?: "info" | "tip" | "warning" }) {
  const map = { info: { c: TEAL, Icon: Info, label: "Note" }, tip: { c: "#34D399", Icon: Lightbulb, label: "Tip" }, warning: { c: GOLD, Icon: AlertTriangle, label: "Important" } } as const;
  const { c, Icon, label } = map[tone];
  return (
    <div className="kh-callout" style={{ borderColor: `${c}40`, background: `${c}12` }}>
      <span style={{ display: "grid", placeItems: "center", width: 34, height: 34, borderRadius: 10, background: `${c}1F`, color: c, flexShrink: 0 }}><Icon size={18} /></span>
      <div>
        <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 14, color: INK }}>{label}</p>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: BODY }}>[Callout placeholder — a highlighted note, tip or warning will sit here.]</p>
      </div>
    </div>
  );
}

export function ComparisonTable() {
  return (
    <div className="kh-tablewrap">
      <table className="kh-table">
        <thead><tr><th>[Column A]</th><th>[Column B]</th><th>[Column C]</th></tr></thead>
        <tbody>
          {Array.from({ length: 3 }).map((_, r) => (
            <tr key={r}><td>[Row label]</td><td>[Value placeholder]</td><td>[Value placeholder]</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CodeBlock() {
  return (
    <div className="kh-code">
      <div className="kh-code-bar"><span /><span /><span /><em>example.tsx</em></div>
      <pre><code>{`// [Code sample placeholder]
// Real, runnable examples will be inserted here.
export function example() {
  return "placeholder";
}`}</code></pre>
    </div>
  );
}

export function Checklist() {
  return (
    <ul className="kh-checklist">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i}><Check size={16} style={{ color: TEAL, flexShrink: 0, marginTop: 2 }} /> [Checklist item placeholder]</li>
      ))}
    </ul>
  );
}

export function FaqAccordion({ count = 4 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <details key={i} className="kh-faq">
          <summary>[FAQ question placeholder {i + 1}]<span className="kh-faq-ico">+</span></summary>
          <p className="kh-faq-body">[FAQ answer placeholder — a clear, honest answer will be written here.]</p>
        </details>
      ))}
    </div>
  );
}

export function GalleryPlaceholders({ count = 3 }: { count?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))", gap: 16 }}>
      {Array.from({ length: count }).map((_, i) => <ImagePlaceholder key={i} label={`Gallery image ${i + 1}`} accent={i % 2 ? GOLD : TEAL} />)}
    </div>
  );
}

export function ShareRow() {
  const items: [string, typeof Linkedin][] = [["Share on LinkedIn", Linkedin], ["Share on X", Twitter], ["Copy link", Link2], ["Email", Mail]];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <span style={{ fontSize: 13, color: FAINT }}>Share</span>
      {items.map(([label, Icon]) => (
        <span key={label} className="kh-share" title={label} aria-label={label}><Icon size={16} /></span>
      ))}
    </div>
  );
}

export function PrevNextNav() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))", gap: 16 }}>
      <div className="kh-card" style={{ ...cardShell, flexDirection: "row", alignItems: "center", gap: 12, padding: 18 }}>
        <ChevronRight size={18} style={{ transform: "rotate(180deg)", color: FAINT, flexShrink: 0 }} />
        <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <span style={{ fontSize: 11.5, color: FAINT, textTransform: "uppercase", letterSpacing: "0.08em" }}>Previous</span>
          <span style={{ fontFamily: DISPLAY, fontSize: 15, color: INK }}>[Previous article placeholder]</span>
        </span>
      </div>
      <div className="kh-card" style={{ ...cardShell, flexDirection: "row", alignItems: "center", gap: 12, padding: 18, textAlign: "right" }}>
        <span style={{ display: "flex", flexDirection: "column", gap: 3, marginLeft: "auto" }}>
          <span style={{ fontSize: 11.5, color: FAINT, textTransform: "uppercase", letterSpacing: "0.08em" }}>Next</span>
          <span style={{ fontFamily: DISPLAY, fontSize: 15, color: INK }}>[Next article placeholder]</span>
        </span>
        <ChevronRight size={18} style={{ color: FAINT, flexShrink: 0 }} />
      </div>
    </div>
  );
}

export function RelatedArticles({ title = "Related articles" }: { title?: string }) {
  return (
    <div>
      <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(22px,3vw,30px)", margin: "0 0 24px", color: INK }}>{title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))", gap: 18 }}>
        {KH_ARTICLES.slice(0, 3).map((a) => <ArticleCard key={a.slug} a={a} />)}
      </div>
    </div>
  );
}

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export { CALENDLY_URL, brand };

/* ============================================================ CSS */
const CSS = `
.kh-imgph { position:relative; overflow:hidden; display:grid; place-items:center; border:1px dashed rgba(255,255,255,0.16); }
.kh-imgph-bg { position:absolute; inset:0; }
.kh-card { transition: transform .4s cubic-bezier(.22,1,.36,1), border-color .4s, box-shadow .4s; }
.kh-card:hover { transform: translateY(-6px); border-color: rgba(243,205,134,0.4) !important; box-shadow: 0 34px 80px -44px rgba(0,0,0,.9); }
.kh-card:hover .kh-zoom { transform: scale(1.05); }
.kh-zoom { transition: transform .6s cubic-bezier(.22,1,.36,1); }
.kh-card:hover .kh-readmore { gap: 11px; }
.kh-featured { grid-template-columns: 1.05fr 1fr; }
@media (max-width: 820px){ .kh-featured { grid-template-columns: 1fr; } }

.kh-chip { display:inline-flex; align-items:center; text-decoration:none; font-size:13px; font-weight:500; color:#C7CEDC; padding:8px 15px; border-radius:100px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.025); transition:.25s; white-space:nowrap; }
.kh-chip:hover { color:#fff; border-color:rgba(53,224,232,0.5); background:rgba(53,224,232,0.08); }
.kh-chip[data-active="1"] { color:#0A0E18; background:linear-gradient(135deg,#F6D79A,#E3A94E); border-color:transparent; font-weight:600; }

.kh-search { display:flex; align-items:center; gap:10px; padding:6px 6px 6px 16px; border-radius:14px; border:1px solid rgba(255,255,255,0.14); background:rgba(7,11,20,0.55); transition:border-color .25s; }
.kh-search:focus-within { border-color:rgba(53,224,232,0.55); }
.kh-search input { flex:1; min-width:0; background:transparent; border:none; outline:none; color:#EEF2F9; font-size:14.5px; font-family:'General Sans',sans-serif; padding:10px 0; }
.kh-search input::placeholder { color:#7E8AA3; }
.kh-search-btn { flex-shrink:0; cursor:pointer; border:none; font-weight:600; font-size:13.5px; padding:10px 18px; border-radius:10px; color:#0A0E18; background:linear-gradient(135deg,#F6D79A,#E3A94E); }

.kh-gold-btn { cursor:pointer; border:none; font-weight:600; font-size:14px; padding:12px 20px; border-radius:11px; color:#0A0E18; background:linear-gradient(135deg,#F6D79A,#E3A94E); transition:transform .25s, box-shadow .25s; }
.kh-gold-btn:hover { transform:translateY(-2px); box-shadow:0 12px 30px -10px rgba(243,205,134,.5); }

.kh-news-form { display:flex; gap:10px; margin:18px auto 0; max-width:440px; flex-wrap:wrap; }
.kh-news-form[data-compact="1"] { margin:16px 0 0; max-width:none; }
.kh-news-form input { flex:1; min-width:180px; background:rgba(7,11,20,0.5); border:1px solid rgba(255,255,255,0.14); border-radius:11px; padding:12px 16px; color:#EEF2F9; font-size:14px; outline:none; font-family:'General Sans',sans-serif; }
.kh-news-form input::placeholder { color:#7E8AA3; }

.kh-page { display:grid; place-items:center; min-width:40px; height:40px; padding:0 12px; border-radius:11px; text-decoration:none; color:#C7CEDC; font-size:14px; font-weight:500; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.022); transition:.25s; }
.kh-page:hover { border-color:rgba(53,224,232,0.5); color:#fff; }
.kh-page[data-active="1"] { color:#0A0E18; background:linear-gradient(135deg,#F6D79A,#E3A94E); border-color:transparent; font-weight:600; }

.kh-sidebar { display:flex; flex-direction:column; gap:18px; position:sticky; top:100px; }
@media (max-width: 1000px){ .kh-sidebar { position:static; } }
.kh-sidelink { display:inline-flex; align-items:center; gap:9px; text-decoration:none; color:#C7CEDC; font-size:13.5px; transition:color .2s; }
.kh-sidelink:hover { color:#35E0E8; }
.kh-clamp2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }

.kh-toc { position:sticky; top:100px; border-left:2px solid rgba(255,255,255,0.08); padding-left:18px; }
.kh-toc a { display:block; text-decoration:none; color:#8A93A6; font-size:13.5px; padding:5px 0; transition:color .2s, padding-left .2s; }
.kh-toc a:hover { color:#35E0E8; padding-left:4px; }

.kh-skel { height:13px; border-radius:6px; background:linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.09), rgba(255,255,255,0.05)); }
.kh-quote { margin:28px 0; padding:24px 28px; border-left:3px solid #F3CD86; background:rgba(243,205,134,0.05); border-radius:0 14px 14px 0; }
.kh-callout { display:flex; gap:14px; align-items:flex-start; margin:26px 0; padding:18px; border:1px solid; border-radius:14px; }
.kh-tablewrap { overflow-x:auto; margin:26px 0; border:1px solid rgba(255,255,255,0.1); border-radius:14px; }
.kh-table { width:100%; border-collapse:collapse; font-size:14px; min-width:480px; }
.kh-table th { text-align:left; padding:14px 18px; font-family:'Clash Display',sans-serif; font-weight:600; color:#EEF2F9; background:rgba(255,255,255,0.03); border-bottom:1px solid rgba(255,255,255,0.1); }
.kh-table td { padding:13px 18px; color:#A7B0C2; border-bottom:1px solid rgba(255,255,255,0.06); }
.kh-table tr:last-child td { border-bottom:none; }
.kh-code { margin:26px 0; border:1px solid rgba(255,255,255,0.1); border-radius:14px; overflow:hidden; background:#080C16; }
.kh-code-bar { display:flex; align-items:center; gap:7px; padding:11px 16px; border-bottom:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); }
.kh-code-bar span { width:11px; height:11px; border-radius:50%; background:rgba(255,255,255,0.16); }
.kh-code-bar em { margin-left:8px; font-style:normal; font-size:12px; color:#7E8AA3; font-family:'JetBrains Mono',monospace; }
.kh-code pre { margin:0; padding:18px; overflow-x:auto; font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.6; color:#C7CEDC; }
.kh-checklist { list-style:none; margin:22px 0; padding:0; display:flex; flex-direction:column; gap:12px; }
.kh-checklist li { display:flex; align-items:flex-start; gap:10px; font-size:14.5px; line-height:1.5; color:#C7CEDC; }
.kh-faq { border:1px solid rgba(255,255,255,0.09); border-radius:14px; background:rgba(255,255,255,0.022); overflow:hidden; }
.kh-faq + .kh-faq { margin-top:12px; }
.kh-faq[open] { border-color:rgba(53,224,232,0.3); }
.kh-faq summary { list-style:none; cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:18px; padding:18px 20px; font-family:'Clash Display',sans-serif; font-weight:500; font-size:16px; color:#EEF2F9; }
.kh-faq summary::-webkit-details-marker { display:none; }
.kh-faq-ico { flex-shrink:0; color:#35E0E8; font-size:22px; line-height:1; transition:transform .3s; }
.kh-faq[open] .kh-faq-ico { transform:rotate(45deg); }
.kh-faq-body { margin:0; padding:0 20px 18px; font-size:14px; line-height:1.6; color:#A7B0C2; }
.kh-share { display:grid; place-items:center; width:38px; height:38px; border-radius:10px; border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.025); color:#C7CEDC; cursor:pointer; transition:.25s; }
.kh-share:hover { color:#35E0E8; border-color:rgba(53,224,232,0.5); transform:translateY(-2px); }

.kh-layout { display:grid; grid-template-columns: minmax(0,1fr) 320px; gap:40px; align-items:start; }
@media (max-width: 1000px){ .kh-layout { grid-template-columns:1fr; } }
.kh-article-layout { display:grid; grid-template-columns: 210px minmax(0,1fr) 300px; gap:40px; align-items:start; }
@media (max-width: 1180px){ .kh-article-layout { grid-template-columns: minmax(0,1fr) 300px; } .kh-article-layout .kh-toc { display:none; } }
@media (max-width: 900px){ .kh-article-layout { grid-template-columns:1fr; } }
.kh-prose { max-width:760px; }
.kh-prose p.kh-lede { font-size:18.5px; line-height:1.6; color:#C7CEDC; }

@media (prefers-reduced-motion: reduce){
  .kh-card, .kh-zoom, .kh-readmore, .kh-gold-btn, .kh-share, .kh-faq-ico, .kh-toc a { transition:none !important; }
  .kh-card:hover, .kh-card:hover .kh-zoom, .kh-gold-btn:hover, .kh-share:hover { transform:none !important; }
}
`;
