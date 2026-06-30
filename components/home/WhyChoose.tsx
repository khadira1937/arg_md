"use client";

import { homepage } from "@/data/home";

/**
 * Why Choose Us section — 2-column layout with 2x2 feature grid on left,
 * showcase image on right with overlay.
 */

export function WhyChoose() {
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
        {/* Left: Content */}
        <div>
          <span
            className="digiplus-label-lg uppercase tracking-widest block mb-2"
            style={{ color: "var(--digiplus-primary-container)" }}
          >
            WHY CHOOSE US
          </span>
          <h2
            className="digiplus-headline-xl mb-12"
            style={{ color: "var(--digiplus-on-surface)" }}
          >
            Why You Should Choose Our Agency
          </h2>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {homepage.whyChoose.map((feature) => (
              <div key={feature.id} className="flex gap-4">
                {/* Icon Container */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                  style={{
                    backgroundColor: "rgba(255, 170, 23, 0.1)",
                    color: "var(--digiplus-primary-container)",
                  }}
                >
                  {feature.icon === "trending_up" && "📈"}
                  {feature.icon === "brush" && "🎨"}
                  {feature.icon === "code" && "💻"}
                  {feature.icon === "support_agent" && "🤝"}
                </div>
                <div>
                  <h4
                    className="font-bold mb-1"
                    style={{ color: "var(--digiplus-on-surface)" }}
                  >
                    {feature.title}
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--digiplus-on-surface-variant)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative">
          <img
            alt="Project Selection Display"
            className="w-full rounded-2xl border"
            style={{
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
            src="https://lh3.googleusercontent.com/aida/AP1WRLvqHg4_sutNBL3jXZyzRZQupG2WhjVwyf3aT2c88uVzFK9jO7Pz8J97KqsO7W5UfyhMTHTGSuKv7lywPolXHIKiUfIDU14aZC6UcaPKNn-ksT6WuGNiJnVflzI2HT2EsiGJiVDDCLC6jAjbadbyH6cc9IP0itnmHox0Y3eXKNL9X0TwxcjJmvcLj1tEu5hBpVcefkLWSoHGRUOJfF_PpRlzoW8shaQM8TJjPZWGr7x9ICoD5RIFcXHd3D0"
            loading="lazy"
          />
          <div
            className="absolute inset-0 rounded-2xl opacity-20 mix-blend-overlay"
            style={{
              backgroundColor: "rgba(255, 170, 23, 0.1)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
