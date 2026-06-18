import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * HostynCloud brand logo — an inline, theme-aware wordmark: a gradient "cloud +
 * bolt" mark (mirrors app/icon.svg) followed by "Hostyn" (ink) + "Cloud" (sky).
 *
 * Rendered as vector + tokenized text instead of a PNG so it stays crisp and
 * adapts to light/dark automatically (no brittle CSS color-inversion). On
 * surfaces that are ALWAYS dark regardless of theme (e.g. the footer band) pass
 * `onDark` so "Hostyn" uses white rather than the (navy) foreground token.
 */
export function Logo({
  className,
  href = "/",
  /** When false, the link is omitted and a bare wordmark is returned. */
  asLink = true,
  /** Display height in pixels; the wordmark scales to it. */
  height = 32,
  /** Force light text for always-dark surfaces (footer). */
  onDark = false,
  // Accepted for API compatibility with previous callers; the inline wordmark
  // adapts to the theme on its own, so these are no-ops.
  priority: _priority,
  invertOnDark: _invertOnDark,
}: {
  className?: string;
  href?: string;
  asLink?: boolean;
  height?: number;
  onDark?: boolean;
  priority?: boolean;
  invertOnDark?: boolean;
}) {
  const fontSize = Math.round(height * 0.62);

  const content = (
    <span className="inline-flex select-none items-center gap-2" style={{ height }}>
      <svg width={height} height={height} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="hc-logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#06B6D4" />
            <stop offset="0.5" stopColor="#0EA5E9" />
            <stop offset="1" stopColor="#6366F1" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="7" fill="url(#hc-logo-grad)" />
        <path
          d="M9.5 22a5 5 0 0 1 .6-9.95A6.9 6.9 0 0 1 23 11.5a4.1 4.1 0 0 1 .3 7.9"
          stroke="#fff"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M16 10.5l-3 5.2h2.6l-1.2 4.1 4.5-5.7h-2.7l1.4-3.6z" fill="#fff" />
      </svg>
      <span
        className="font-display font-bold leading-none tracking-tight"
        style={{ fontSize }}
      >
        <span className={onDark ? "text-white" : "text-foreground"}>Hostyn</span>
        <span className="text-primary">Cloud</span>
      </span>
    </span>
  );

  if (!asLink) return <span className={cn("inline-flex items-center", className)}>{content}</span>;

  return (
    <Link
      href={href}
      aria-label="HostynCloud home"
      className={cn("inline-flex shrink-0 items-center transition-opacity hover:opacity-90", className)}
    >
      {content}
    </Link>
  );
}
