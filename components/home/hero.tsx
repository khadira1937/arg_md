"use client";

import { homepage } from "@/data/home";

/**
 * Hero section — dual-stacked headline (H1 Display XL + H2 Display L @ 60% opacity),
 * subheading, phone contact card, and CTA button. Background image with gradient overlay.
 * Implements DESIGN.md spacing and type scales.
 */

export function Hero() {
  const h = homepage.hero;

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "var(--digiplus-background)" }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(to right, var(--digiplus-background) via-transparent to-transparent)",
          }}
        />
        <img
          alt="Agency Workspace Hero Background"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida/AP1WRLsoI5XsQH6UIBOeAzXpUeAI4RJHGW6hGu2WKBDdeuIMzpB6QVvlfY5oeTbNpKHcoHVb5bLPiCGOskRcVfYvK6n37YXFTEKNoHKHDaXThGkHNaeuNDxJC6-rKpYeTItlQfjFWAISt0MWHjGy8hFZRpHTgxI3mk3272toDLcPmRHtNY3JKM0-SBrzcge7FpsxKpTGtnbyEDfR8sr8Fa4dWjesl-4IanQD8f95SQ_Q9yNwHz1yhuk-OC0mPrU"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div
        className="relative z-20 mx-auto px-8 w-full"
        style={{ maxWidth: "var(--digiplus-container-max)" }}
      >
        <div className="max-w-2xl">
          {/* Label */}
          <span
            className="digiplus-label-lg block mb-2 uppercase tracking-widest"
            style={{ color: "var(--digiplus-primary-container)" }}
          >
            {h.label}
          </span>

          {/* Dual-stacked headline */}
          <div className="mb-4">
            <h1
              className="digiplus-display-lg md:text-[72px] text-[40px]"
              style={{ color: "var(--digiplus-on-surface)" }}
            >
              {h.headline} <span style={{ color: "var(--digiplus-primary-container)" }}>{h.accentWord}</span>
            </h1>
          </div>

          {/* Subheading */}
          <p
            className="digiplus-body-lg mb-6"
            style={{ color: "var(--digiplus-on-surface-variant)" }}
          >
            {h.subheading}
          </p>

          {/* Contact Card + CTA */}
          <div className="flex flex-wrap gap-6 items-center">
            {/* Phone Card */}
            <div
              className="flex items-center gap-4 p-4 rounded-lg border"
              style={{
                backgroundColor: "rgba(40, 42, 47, 0.5)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-on-primary-container"
                style={{
                  backgroundColor: "var(--digiplus-primary-container)",
                  color: "var(--digiplus-on-primary-container)",
                }}
              >
                📞
              </div>
              <div>
                <p
                  className="text-sm"
                  style={{ color: "var(--digiplus-on-surface-variant)" }}
                >
                  {h.phoneLabel}
                </p>
                <p
                  className="font-bold text-lg"
                  style={{ color: "var(--digiplus-on-surface)" }}
                >
                  {h.phoneNumber}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              className="digiplus-button px-8 py-3 rounded-full text-white transition-all"
              style={{
                background: "linear-gradient(90deg, #ffaa17 0%, #ffcc33 100%)",
                color: "var(--digiplus-on-primary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(255, 170, 23, 0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              {h.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
