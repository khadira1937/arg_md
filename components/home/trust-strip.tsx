import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { trust } from "@/data/home";

/**
 * Trust strip — light band with a 6-cell hairline grid. Each cell is empty at
 * rest and reveals "Discover ↗" on hover. This intentionally reads as "case
 * studies coming" rather than fake logo credibility. The eyebrow + "Discover
 * our impact" link sit above the grid.
 */
export function TrustStrip() {
  return (
    <section className="am-band-light border-y border-[color:var(--argana-outline-variant)]">
      <div className="am-container py-14 sm:py-16">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <p className="am-label-caps text-[color:var(--argana-outline)]">{trust.eyebrow}</p>
          <Link
            href={trust.cta.href}
            className="am-label-caps inline-flex items-center gap-1.5 text-[color:var(--argana-on-surface)] transition-opacity hover:opacity-70"
          >
            {trust.cta.label}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-[color:var(--argana-outline-variant)] bg-[color:var(--argana-outline-variant)] sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: trust.cellCount }).map((_, i) => (
            <li
              key={i}
              className="group relative flex aspect-[4/3] items-center justify-center bg-[color:var(--argana-surface)] transition-colors hover:bg-white"
            >
              <span
                className="am-label-caps inline-flex items-center gap-1.5 text-[color:var(--argana-outline)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              >
                {trust.hoverLabel}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
