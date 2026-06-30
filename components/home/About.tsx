"use client";

import { homepage } from "@/data/home";

/**
 * About Us section — 2-column layout with image + floating client card on left,
 * heading + description + feature checklist + progress bar on right.
 */

export function About() {
  const a = homepage.about;

  return (
    <section
      style={{
        backgroundColor: "var(--digiplus-surface-container-lowest)",
        paddingTop: "var(--digiplus-section-padding-desktop)",
        paddingBottom: "var(--digiplus-section-padding-desktop)",
      }}
    >
      <div
        className="max-w-container-max mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        style={{ maxWidth: "var(--digiplus-container-max)" }}
      >
        {/* Left: Image + Floating Card */}
        <div className="relative">
          <div className="relative z-10 rounded-2xl overflow-hidden border-8" style={{ borderColor: "var(--digiplus-surface-container)" }}>
            <img
              alt="Smart Digital Agency Visual"
              className="w-full aspect-[4/5] object-cover"
              src={a.image}
              loading="lazy"
            />
          </div>
          {/* Floating Card */}
          <div
            className="absolute -bottom-10 -right-10 z-20 p-6 rounded-2xl max-w-[280px] shadow-2xl border"
            style={{
              backgroundColor: "var(--digiplus-surface-container)",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <img
              alt="Satisfied Client Group"
              className="w-full rounded-lg mb-3"
              src={a.clientImage}
              loading="lazy"
            />
            <p
              className="digiplus-label-lg"
              style={{ color: "var(--digiplus-on-surface)" }}
            >
              Join our <span style={{ color: "var(--digiplus-primary-container)", fontWeight: "bold" }}>{a.clientCount}</span> satisfied
              clients worldwide
            </p>
          </div>
          {/* Decorative Blur */}
          <div
            className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: "var(--digiplus-primary-container)" }}
          />
        </div>

        {/* Right: Content */}
        <div className="space-y-6">
          <span
            className="digiplus-label-lg uppercase tracking-widest block"
            style={{ color: "var(--digiplus-primary-container)" }}
          >
            {a.label}
          </span>
          <h2
            className="digiplus-headline-xl"
            style={{ color: "var(--digiplus-on-surface)" }}
          >
            {a.headline}
          </h2>
          <p
            className="digiplus-body-lg"
            style={{ color: "var(--digiplus-on-surface-variant)" }}
          >
            {a.description}
          </p>

          {/* Features */}
          <ul className="space-y-3">
            {a.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3"
                style={{ color: "var(--digiplus-on-surface)" }}
              >
                <span
                  style={{ color: "var(--digiplus-primary-container)", marginTop: "2px" }}
                >
                  ✓
                </span>
                <span className="digiplus-body-md">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Progress Bar */}
          <div className="space-y-2 pt-4">
            <div className="flex justify-between digiplus-label-lg">
              <span style={{ color: "var(--digiplus-on-surface)" }}>{a.statLabel}</span>
              <span style={{ color: "var(--digiplus-primary-container)" }}>{a.statValue}</span>
            </div>
            <div
              className="w-full h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: "var(--digiplus-surface-variant)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #ffaa17 0%, #ffcc33 100%)",
                  width: a.statValue,
                }}
              />
            </div>
          </div>

          {/* CTA Button */}
          <button
            className="digiplus-button px-8 py-3 rounded-full text-white transition-all mt-6"
            style={{
              background: "linear-gradient(90deg, #ffaa17 0%, #ffcc33 100%)",
              color: "var(--digiplus-on-primary)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            {a.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
