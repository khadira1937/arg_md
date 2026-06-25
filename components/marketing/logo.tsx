import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * ARGANA MEDIA brand logo — an inline, theme-aware wordmark: a gradient rounded
 * "A" monogram mark followed by "ARGANA" (ink) + "MEDIA" (sky). Rendered as
 * vector + tokenized text so it stays crisp and adapts to light/dark
 * automatically. On always-dark surfaces (e.g. the footer band) pass `onDark`
 * so "ARGANA" uses white rather than the dark foreground token.
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
  const fontSize = Math.round(height * 0.5);

  const content = (
    <span className="inline-flex select-none items-center gap-2.5" style={{ height }}>
      <svg width={height} height={height} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="am-logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#35E0E8" />
            <stop offset="0.5" stopColor="#4DA8F5" />
            <stop offset="1" stopColor="#F3CD86" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#am-logo-grad)" />
        {/* Stylised "A" monogram */}
        <path
          d="M16 7.5l6.4 17h-3.5l-1.2-3.4h-3.4l-1.2 3.4H9.6L16 7.5z"
          fill="#fff"
        />
        <path d="M15.1 18.3h1.8L16 15.6l-0.9 2.7z" fill="url(#am-logo-grad)" />
      </svg>
      <span
        className="font-display font-bold leading-none"
        style={{ fontSize, letterSpacing: "0.06em" }}
      >
        <span className={onDark ? "text-white" : "text-foreground"}>ARGANA</span>
        <span className="text-primary"> MEDIA</span>
      </span>
    </span>
  );

  if (!asLink) return <span className={cn("inline-flex items-center", className)}>{content}</span>;

  return (
    <Link
      href={href}
      aria-label={`${"ARGANA MEDIA"} home`}
      className={cn("inline-flex shrink-0 items-center transition-opacity hover:opacity-90", className)}
    >
      {content}
    </Link>
  );
}
