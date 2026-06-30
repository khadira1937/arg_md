"use client";

import { homepage } from "@/data/home";

/**
 * Work Showcase section — masonry-style portfolio grid with featured + regular cards.
 */

export function WorkShowcase() {
  return (
    <section
      className="py-section-padding-desktop"
      style={{
        backgroundColor: "var(--digiplus-background)",
        paddingTop: "var(--digiplus-section-padding-desktop)",
        paddingBottom: "var(--digiplus-section-padding-desktop)",
      }}
    >
      <div
        className="max-w-container-max mx-auto px-8"
        style={{ maxWidth: "var(--digiplus-container-max)" }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span
              className="digiplus-label-lg uppercase tracking-widest block mb-2"
              style={{ color: "var(--digiplus-primary-container)" }}
            >
              Work showcase
            </span>
            <h2
              className="digiplus-headline-xl"
              style={{ color: "var(--digiplus-on-surface)" }}
            >
              Check Your Latest Work Showcase
            </h2>
          </div>
          <a
            href="/portfolio"
            className="digiplus-label-lg flex items-center gap-2 hover:translate-x-2 transition-transform"
            style={{ color: "var(--digiplus-primary-container)" }}
          >
            VIEW ALL PROJECTS →
          </a>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          {homepage.workShowcase.map((work) => (
            <div
              key={work.id}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer`}
              style={{
                gridColumn: work.colSpan ? `span ${work.colSpan}` : "span 1",
                gridRow: work.rowSpan ? `span ${work.rowSpan}` : "span 1",
              }}
            >
              <img
                alt={work.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={work.image}
                loading="lazy"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6"
                style={{
                  background: "linear-gradient(to top, var(--digiplus-background), transparent)",
                }}
              >
                {work.category && (
                  <p
                    className="digiplus-label-lg mb-2"
                    style={{ color: "var(--digiplus-primary-container)" }}
                  >
                    {work.category}
                  </p>
                )}
                <h4
                  className="digiplus-headline-lg"
                  style={{ color: "var(--digiplus-on-surface)" }}
                >
                  {work.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
