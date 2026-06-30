import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ArrowUpRight, PhoneCall, Check } from "lucide-react";
import { CALENDLY_URL, isExternal } from "@/config/cta";

/**
 * ARGANA MEDIA shared UI primitives — Argana-themed (monochrome surface,
 * Hanken Grotesk, burnt-orange accent budget). This file preserves the
 * historical export API (Hero, HeroActions, Band, Head, Card, Feature,
 * CheckRow, Grid, Cta, Btn, Eyebrow + colour constants) so the existing
 * service / about / portfolio / contact pages keep compiling unchanged.
 *
 * The colour constants (TEAL/GOLD/SKY/GREEN) are remapped to neutral ink
 * values so any caller that passes them as decorative colours stays inside
 * the Argana accent budget. Use Tailwind classes directly for new code.
 */

// Legacy display-font constant kept for callers that still spread it.
// Argana uses Hanken Grotesk site-wide via the body font, so this resolves
// to the inherited font when applied as `fontFamily: DISPLAY`.
export const DISPLAY = "inherit";

// Neutral remap of the legacy accent constants — keeps callers safe inside
// the rationed Argana accent budget. Burnt orange is reserved for primary
// CTAs and active indicators only; passing it from a content card is wrong.
export const TEAL = "#1b1c1c"; // argana on-surface (ink)
export const GOLD = "#1b1c1c";
export const SKY = "#4c4546";  // argana on-surface-variant
export const GREEN = "#1b1c1c";

const INK = "var(--argana-on-surface)";
const BODY = "var(--argana-on-surface-variant)";
const MUTE = "var(--argana-outline)";
const HAIR = "var(--argana-outline-variant)";
const SURFACE = "var(--argana-surface)";

/* ----------------------------------------------------------------- Eyebrow */
export function Eyebrow({
  children,
  color,
  center = false,
}: {
  children: ReactNode;
  color?: string;
  center?: boolean;
}) {
  return (
    <div
      style={{
        display: center ? "inline-flex" : "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 18,
        color: color ?? MUTE,
      }}
    >
      <span style={{ width: 24, height: 1, background: "currentColor", opacity: 0.5 }} />
      <span
        style={{
          fontSize: 12,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {children}
      </span>
      {center && <span style={{ width: 24, height: 1, background: "currentColor", opacity: 0.5 }} />}
    </div>
  );
}

/* ------------------------------------------------------------------ Buttons */
export function Btn({
  href,
  children,
  variant = "gold",
  icon = true,
}: {
  href: string;
  children: ReactNode;
  variant?: "gold" | "ghost" | "link";
  icon?: boolean;
}) {
  const ext = isExternal(href);
  const extProps = ext ? { target: "_blank", rel: "noopener noreferrer" } : {};

  if (variant === "link") {
    return (
      <Link
        href={href}
        {...extProps}
        className="group inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--argana-on-surface)] no-underline"
      >
        {children}
        {icon && (
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        )}
      </Link>
    );
  }

  // "gold" → Argana primary CTA (burnt orange); "ghost" → outlined ink CTA.
  if (variant === "gold") {
    return (
      <Link href={href} {...extProps} className="am-cta">
        {children}
        {icon && <ArrowUpRight size={16} aria-hidden />}
      </Link>
    );
  }

  return (
    <Link href={href} {...extProps} className="am-cta-ghost-light">
      {children}
      {icon && <ArrowUpRight size={16} aria-hidden />}
    </Link>
  );
}

/* --------------------------------------------------------------------- Hero */
export function Hero({
  eyebrow,
  eyebrowColor,
  title,
  sub,
  badge,
  align = "center",
  actions,
}: {
  eyebrow: string;
  eyebrowColor?: string;
  title: ReactNode;
  sub?: ReactNode;
  badge?: ReactNode;
  align?: "center" | "left";
  actions?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <section className="am-band-light border-b border-[color:var(--argana-outline-variant)]">
      <div
        className="am-container"
        style={{
          paddingTop: "clamp(64px,9vh,104px)",
          paddingBottom: "clamp(52px,7vh,84px)",
          textAlign: centered ? "center" : "left",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            marginLeft: centered ? "auto" : 0,
            marginRight: centered ? "auto" : 0,
            display: "flex",
            flexDirection: "column",
            alignItems: centered ? "center" : "flex-start",
          }}
        >
          {badge}
          <Eyebrow color={eyebrowColor} center={centered}>
            {eyebrow}
          </Eyebrow>
          <h1 className="am-display" style={{ margin: 0, color: INK }}>
            {title}
          </h1>
          {sub && (
            <p
              className="am-body-lg"
              style={{ margin: "22px 0 0", maxWidth: 640, color: BODY }}
            >
              {sub}
            </p>
          )}
          {actions && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                justifyContent: centered ? "center" : "flex-start",
                marginTop: 34,
              }}
            >
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* The standard pair of hero CTAs (Book a Call + a secondary). */
export function HeroActions({
  secondaryHref = "/services",
  secondaryLabel = "View Services",
}: {
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <>
      <Btn href={CALENDLY_URL} variant="gold" icon={false}>
        <PhoneCall size={16} /> Book a Call
      </Btn>
      <Btn href={secondaryHref} variant="ghost">
        {secondaryLabel}
      </Btn>
    </>
  );
}

/* -------------------------------------------------------------------- Band */
export function Band({
  children,
  id,
  bg,
  borderTop = false,
}: {
  children: ReactNode;
  id?: string;
  max?: number;
  bg?: string;
  borderTop?: boolean;
  pad?: string;
}) {
  return (
    <section
      id={id}
      className={`am-band-light am-section ${borderTop ? "border-t border-[color:var(--argana-outline-variant)]" : ""}`}
      style={bg ? { background: bg } : undefined}
    >
      <div className="am-container">{children}</div>
    </section>
  );
}

/* ----------------------------------------------------------------- Heading */
export function Head({
  eyebrow,
  eyebrowColor,
  title,
  sub,
  center = false,
  max = 680,
}: {
  eyebrow?: string;
  eyebrowColor?: string;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
  max?: number;
}) {
  return (
    <div
      style={{
        maxWidth: max,
        margin: center ? "0 auto" : undefined,
        textAlign: center ? "center" : "left",
      }}
    >
      {eyebrow && (
        <Eyebrow color={eyebrowColor} center={center}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="am-headline-md" style={{ margin: 0, color: INK }}>
        {title}
      </h2>
      {sub && (
        <p
          className="am-body-md"
          style={{
            margin: "18px auto 0",
            maxWidth: center ? 640 : 760,
            color: BODY,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------- Card */
export function Card({
  children,
  style,
  hover = true,
}: {
  children: ReactNode;
  style?: CSSProperties;
  hover?: boolean;
}) {
  return (
    <div
      className={`am-card ${hover ? "transition-colors duration-200 hover:border-[color:var(--argana-on-surface-variant)]" : ""}`}
      style={{ padding: 24, ...style }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ Feature card */
export function Feature({
  icon: Icon,
  title,
  body,
}: {
  icon?: LucideIcon;
  title: string;
  body: string;
  color?: string;
}) {
  return (
    <Card style={{ height: "100%" }}>
      {Icon && (
        <span
          style={{
            display: "grid",
            placeItems: "center",
            width: 44,
            height: 44,
            borderRadius: 8,
            background: SURFACE,
            border: `1px solid ${HAIR}`,
            color: INK,
            marginBottom: 16,
          }}
        >
          <Icon size={20} strokeWidth={1.8} />
        </span>
      )}
      <h3
        className="am-headline-sm"
        style={{ margin: "0 0 8px", fontSize: 18, color: INK }}
      >
        {title}
      </h3>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: BODY }}>{body}</p>
    </Card>
  );
}

/* ----------------------------------------------------------------- Checks */
export function CheckRow({ children }: { children: ReactNode; color?: string }) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        fontSize: 15,
        lineHeight: 1.5,
        color: INK,
      }}
    >
      <Check
        size={18}
        strokeWidth={2.4}
        color="var(--argana-on-surface)"
        style={{ flexShrink: 0, marginTop: 1 }}
      />{" "}
      {children}
    </span>
  );
}

/* -------------------------------------------------------- Responsive grid */
export function Grid({
  children,
  min = 260,
  gap = 18,
}: {
  children: ReactNode;
  min?: number;
  gap?: number;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit,minmax(min(${min}px,100%),1fr))`,
        gap,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- Final CTA */
export function Cta({
  title = "Ready to build a stronger digital presence?",
  sub = "Tell us where you want your business to be online. We'll bring the strategy, creativity and technical delivery to get you there.",
  primaryHref = CALENDLY_URL,
  primaryLabel = "Book a Call",
  secondaryHref = "/contact",
  secondaryLabel = "Contact Us",
}: {
  title?: string;
  sub?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="am-band-dark am-section border-t border-white/10">
      <div className="am-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="am-label-caps text-white/55">Free, no-pressure call</p>
          <h2 className="am-headline-md mt-6 text-white">{title}</h2>
          <p className="am-body-lg mx-auto mt-6 max-w-xl text-white/70">{sub}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={primaryHref}
              {...(isExternal(primaryHref)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="am-cta"
            >
              <PhoneCall className="h-4 w-4" aria-hidden /> {primaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <Link href={secondaryHref} className="am-cta-ghost-dark">
              {secondaryLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
