"use client";

import { homepage } from "@/data/home";

/**
 * Stats section — 3 centered stat cards with value + label. One has highlighted style.
 */

export function Stats() {
  return (
    <section
      className="py-section-padding-desktop relative overflow-hidden"
      style={{
        backgroundColor: "var(--digiplus-background)",
        paddingTop: "var(--digiplus-section-padding-desktop)",
        paddingBottom: "var(--digiplus-section-padding-desktop)",
      }}
    >
      <div
        className="max-w-container-max mx-auto px-8 relative z-10"
        style={{ maxWidth: "var(--digiplus-container-max)" }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="digiplus-label-lg uppercase tracking-widest block mb-2"
            style={{ color: "var(--digiplus-primary-container)" }}
          >
            Fun Facts
          </span>
          <h2
            className="digiplus-headline-xl max-w-2xl mx-auto"
            style={{ color: "var(--digiplus-on-surface)" }}
          >
            We Are Dedicated To Creating High-Tech Web Experiences
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {homepage.stats.map((stat, i) => (
            <div
              key={i}
              className="p-12 rounded-2xl border"
              style={{
                backgroundColor: stat.highlighted ? "rgba(255, 170, 23, 0.05)" : "var(--digiplus-surface-container)",
                borderColor: stat.highlighted ? "rgba(255, 170, 23, 0.3)" : "rgba(255, 255, 255, 0.1)",
              }}
            >
              <h3
                className="text-[72px] font-bold mb-2"
                style={{ color: "var(--digiplus-primary-container)" }}
              >
                {stat.value}
              </h3>
              <p
                className="digiplus-label-lg uppercase tracking-wider"
                style={{ color: "var(--digiplus-on-surface-variant)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Tech Graphic (subtle background) */}
      <img
        alt="Tech Floating Graphic"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none w-full max-w-4xl"
        src="https://lh3.googleusercontent.com/aida/AP1WRLscqD7E8IS5VdMJldt8yfmjg5-S2e3BxkJw_k1KO26tBcHb9pRskPCSGPeaLqh9UnZzeM0t0MRDpex2TxxH91NgNz_hGAG3mx9JTb8wnF333SmAebMEKxZuj5ySFG9CPIUXzRVE31-VvJnityExrD3AHgJzyysKKBg33EBYh_cjNaqktS244TaNfQEAndz1sjiYP1ZCnAEa8gS3N1pEbkVkFBB8emPaIUZwUMOgCR6XOWuhbmWJubv6Kds"
        loading="lazy"
      />
    </section>
  );
}
