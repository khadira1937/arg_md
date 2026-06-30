"use client";

import { homepage } from "@/data/home";

/**
 * CTA Section — full-width orange banner with headline and CTA button.
 * One of the five rationed uses of the accent colour (primary-container).
 */

export function CTA() {
  const c = homepage.cta;

  return (
    <section
      className="py-20 flex items-center justify-between gap-8"
      style={{
        backgroundColor: "var(--digiplus-primary-container)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div
        className="max-w-container-max mx-auto px-8 w-full flex flex-col md:flex-row justify-between items-center gap-8"
        style={{ maxWidth: "var(--digiplus-container-max)" }}
      >
        <h2
          className="digiplus-headline-xl max-w-xl text-center md:text-left"
          style={{ color: "var(--digiplus-on-primary-container)" }}
        >
          {c.headline}
        </h2>
        <button
          className="digiplus-button px-8 py-3 rounded-full text-white transition-all flex-shrink-0"
          style={{
            backgroundColor: "var(--digiplus-on-primary-container)",
            color: "var(--digiplus-primary-container)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
          }}
        >
          {c.buttonText}
        </button>
      </div>
    </section>
  );
}
