import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { trust } from "@/data/home";

/**
 * Logo cloud band — light, single row of muted wordmarks. Wordmarks are
 * rendered as inline SVG type so we never depend on a logo CDN. Per DESIGN.md
 * this band stays accent-free: the "Discover our impact" link is ink.
 */
export function TrustStrip() {
  return (
    <section className="am-band-light border-y border-[color:var(--argana-outline-variant)]">
      <div className="am-container flex flex-col items-center justify-between gap-8 py-10 md:flex-row md:gap-12">
        <p className="am-label-caps text-[color:var(--argana-outline)]">{trust.eyebrow}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {trust.logos.map((logo) => (
            <li key={logo.name}>
              <span
                aria-label={logo.name}
                className="select-none text-[15px] font-semibold tracking-[0.18em] text-[color:var(--argana-outline)] grayscale opacity-70"
              >
                {logo.name.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href={trust.cta.href}
          className="am-label-caps inline-flex items-center gap-1.5 text-[color:var(--argana-on-surface)] transition-opacity hover:opacity-70"
        >
          {trust.cta.label}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
