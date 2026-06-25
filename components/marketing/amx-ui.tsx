import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, PhoneCall, Check } from "lucide-react";

/**
 * ARGANA MEDIA shared UI primitives — a server-safe toolkit that recreates the
 * landing page's premium dark look (Clash Display headings, gradient eyebrows,
 * glassy cards, gold/ghost buttons). Built with inline styles + clamp() + CSS
 * `auto-fit` grids so every page is fully responsive on mobile without extra
 * media queries. Used by the service pages, About, Portfolio, Contact, etc.
 */

export const DISPLAY = "'Clash Display', ui-sans-serif, sans-serif";
export const TEAL = "#35E0E8";
export const GOLD = "#F3CD86";
export const SKY = "#7CC6F0";
export const GREEN = "#34D399";
const INK = "#F4F7FC";
const BODY = "#A7B0C2";
const MUTE = "#8A93A6";

/* ----------------------------------------------------------------- Eyebrow */
export function Eyebrow({ children, color = GOLD, center = false }: { children: ReactNode; color?: string; center?: boolean }) {
  return (
    <div style={{ display: center ? "inline-flex" : "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
      <span style={{ width: 28, height: 1.5, background: `linear-gradient(90deg, ${TEAL}, ${GOLD})` }} />
      <span style={{ fontSize: 12.5, letterSpacing: "0.18em", textTransform: "uppercase", color, fontWeight: 600 }}>{children}</span>
      {center && <span style={{ width: 28, height: 1.5, background: `linear-gradient(90deg, ${GOLD}, ${TEAL})` }} />}
    </div>
  );
}

/* ------------------------------------------------------------------ Buttons */
export function Btn({
  href, children, variant = "gold", icon = true,
}: { href: string; children: ReactNode; variant?: "gold" | "ghost" | "link"; icon?: boolean }) {
  const base: CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none",
    fontSize: 15, fontWeight: 600, borderRadius: 12, transition: "0.3s", whiteSpace: "nowrap",
  };
  if (variant === "link") {
    return (
      <Link href={href} className="amx-arrowlink" style={{ ...base, color: TEAL, fontSize: 14.5 }}>
        {children}{icon && <ArrowRight size={16} />}
      </Link>
    );
  }
  const styles: CSSProperties = variant === "gold"
    ? { ...base, color: "#0A0E18", padding: "15px 28px", background: "linear-gradient(135deg,#F6D79A,#E3A94E)" }
    : { ...base, color: "#EEF2F9", padding: "15px 28px", border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.03)" };
  return (
    <Link href={href} className={variant === "gold" ? "amx-gold" : "amx-ghost"} style={styles}>
      {children}{icon && <ArrowRight size={16} />}
    </Link>
  );
}

/* --------------------------------------------------------------------- Hero */
export function Hero({
  eyebrow, eyebrowColor = GOLD, title, sub, badge, align = "center", actions,
}: {
  eyebrow: string; eyebrowColor?: string; title: ReactNode; sub?: ReactNode;
  badge?: ReactNode; align?: "center" | "left"; actions?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div className="bg-mesh" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)", width: "min(820px,92vw)", height: 420, background: "radial-gradient(ellipse at center, rgba(53,224,232,0.12), transparent 62%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "clamp(64px,9vh,104px) 24px clamp(52px,7vh,84px)", textAlign: centered ? "center" : "left" }}>
        <div style={{ maxWidth: centered ? 800 : 760, marginLeft: centered ? "auto" : 0, marginRight: centered ? "auto" : 0, display: "flex", flexDirection: "column", alignItems: centered ? "center" : "flex-start" }}>
          {badge}
          <Eyebrow color={eyebrowColor} center={centered}>{eyebrow}</Eyebrow>
          <h1 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(33px,5vw,58px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0, color: INK }}>{title}</h1>
          {sub && <p style={{ margin: "22px 0 0", maxWidth: 600, fontSize: "clamp(15px,1.7vw,17.5px)", lineHeight: 1.62, color: BODY }}>{sub}</p>}
          {actions && <div style={{ display: "flex", flexWrap: "wrap", gap: 13, justifyContent: centered ? "center" : "flex-start", marginTop: 34 }}>{actions}</div>}
        </div>
      </div>
    </section>
  );
}

/* The standard pair of hero CTAs (Book a Call + a secondary). */
export function HeroActions({ secondaryHref = "/services", secondaryLabel = "View Services" }: { secondaryHref?: string; secondaryLabel?: string }) {
  return (
    <>
      <Btn href="/book-a-call" variant="gold" icon={false}><PhoneCall size={16} /> Book a Call</Btn>
      <Btn href={secondaryHref} variant="ghost">{secondaryLabel}</Btn>
    </>
  );
}

/* -------------------------------------------------------------------- Band */
export function Band({
  children, id, max = 1180, bg, borderTop = false, pad = "clamp(64px,9vh,120px)",
}: { children: ReactNode; id?: string; max?: number; bg?: string; borderTop?: boolean; pad?: string }) {
  return (
    <section id={id} style={{ position: "relative", borderTop: borderTop ? "1px solid rgba(255,255,255,0.06)" : undefined, background: bg }}>
      <div style={{ maxWidth: max, margin: "0 auto", padding: `${pad} clamp(18px,4vw,28px)` }}>{children}</div>
    </section>
  );
}

/* ----------------------------------------------------------------- Heading */
export function Head({
  eyebrow, eyebrowColor = GOLD, title, sub, center = false, max = 680,
}: { eyebrow?: string; eyebrowColor?: string; title: ReactNode; sub?: ReactNode; center?: boolean; max?: number }) {
  return (
    <div style={{ maxWidth: center ? max : max, margin: center ? "0 auto" : undefined, textAlign: center ? "center" : "left" }}>
      {eyebrow && <Eyebrow color={eyebrowColor} center={center}>{eyebrow}</Eyebrow>}
      <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(28px,4.4vw,46px)", lineHeight: 1.07, letterSpacing: "-0.02em", margin: 0, color: INK }}>{title}</h2>
      {sub && <p style={{ margin: "18px auto 0", maxWidth: center ? 640 : 760, fontSize: 16.5, lineHeight: 1.6, color: BODY }}>{sub}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------- Card */
export function Card({ children, style, hover = true }: { children: ReactNode; style?: CSSProperties; hover?: boolean }) {
  return (
    <div className={hover ? "amx-card" : undefined} style={{ padding: 24, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", ...style }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ Feature card */
export function Feature({ icon: Icon, title, body, color = TEAL }: { icon?: LucideIcon; title: string; body: string; color?: string }) {
  return (
    <Card style={{ height: "100%" }}>
      {Icon && (
        <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 13, background: "rgba(53,224,232,0.1)", color, marginBottom: 16 }}>
          <Icon size={20} strokeWidth={1.8} />
        </span>
      )}
      <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 18, margin: "0 0 8px", color: "#EEF2F9" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: MUTE }}>{body}</p>
    </Card>
  );
}

/* ----------------------------------------------------------------- Checks */
export function CheckRow({ children, color = TEAL }: { children: ReactNode; color?: string }) {
  return (
    <span style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 15, lineHeight: 1.5, color: "#C7CEDC" }}>
      <Check size={18} strokeWidth={2.4} color={color} style={{ flexShrink: 0, marginTop: 1 }} /> {children}
    </span>
  );
}

/* -------------------------------------------------------- Responsive grid */
export function Grid({ children, min = 260, gap = 18 }: { children: ReactNode; min?: number; gap?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit,minmax(min(${min}px,100%),1fr))`, gap }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- Final CTA */
export function Cta({
  title = "Ready to build a stronger digital presence?",
  sub = "Tell us where you want your business to be online. We'll bring the strategy, creativity and technical delivery to get you there.",
  primaryHref = "/book-a-call", primaryLabel = "Book a Call",
  secondaryHref = "/contact", secondaryLabel = "Contact Us",
}: { title?: string; sub?: string; primaryHref?: string; primaryLabel?: string; secondaryHref?: string; secondaryLabel?: string }) {
  return (
    <section style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "clamp(56px,8vh,110px) clamp(18px,4vw,28px)" }}>
      <div style={{ position: "relative", borderRadius: 30, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", padding: "clamp(44px,7vw,84px) clamp(24px,5vw,64px)", textAlign: "center", background: "linear-gradient(150deg,#0C1426,#0A1120)" }}>
        <div style={{ position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)", width: "120%", height: "140%", background: "radial-gradient(ellipse at center top, rgba(53,224,232,0.16), transparent 55%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "7px 15px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, background: "rgba(255,255,255,0.03)", marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: GREEN, boxShadow: `0 0 10px ${GREEN}` }} />
            <span style={{ fontSize: 12.5, letterSpacing: "0.1em", textTransform: "uppercase", color: BODY, fontWeight: 500 }}>Free, no-pressure call</span>
          </div>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(30px,5vw,56px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 auto", maxWidth: 720, color: INK }}>{title}</h2>
          <p style={{ margin: "22px auto 0", maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: BODY }}>{sub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 34 }}>
            <Btn href={primaryHref} variant="gold" icon={false}><PhoneCall size={16} /> {primaryLabel}</Btn>
            <Btn href={secondaryHref} variant="ghost" icon={false}>{secondaryLabel}</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}
