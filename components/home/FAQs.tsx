"use client";

import { homepage } from "@/data/home";
import { useState } from "react";

/**
 * FAQs section — 2-column layout with quality metrics on left,
 * accordion on right.
 */

export function FAQs() {
  const [openId, setOpenId] = useState(homepage.faqs[0]?.id || null);

  return (
    <section
      className="py-section-padding-desktop"
      style={{
        backgroundColor: "var(--digiplus-surface-container-low)",
        paddingTop: "var(--digiplus-section-padding-desktop)",
        paddingBottom: "var(--digiplus-section-padding-desktop)",
      }}
    >
      <div
        className="max-w-container-max mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12"
        style={{ maxWidth: "var(--digiplus-container-max)" }}
      >
        {/* Left: Metrics */}
        <div>
          <span
            className="digiplus-label-lg uppercase tracking-widest block mb-2"
            style={{ color: "var(--digiplus-primary-container)" }}
          >
            our faqs
          </span>
          <h2
            className="digiplus-headline-xl mb-8"
            style={{ color: "var(--digiplus-on-surface)" }}
          >
            Leading The Best Digital Agency In Our Town
          </h2>

          <div className="space-y-4">
            {[
              { icon: "✓", title: "Quality Services", desc: "Consistent high-quality work tailored to your needs." },
              { icon: "★", title: "99% Success Rates", desc: "Consistent high-impact results for global brands." },
            ].map((metric, i) => (
              <div
                key={i}
                className="flex gap-4 p-3 rounded-lg border"
                style={{
                  backgroundColor: "var(--digiplus-surface-container)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
                  style={{
                    backgroundColor: "rgba(255, 170, 23, 0.2)",
                    color: "var(--digiplus-primary-container)",
                  }}
                >
                  {metric.icon}
                </div>
                <div>
                  <h4
                    className="font-bold text-lg"
                    style={{ color: "var(--digiplus-on-surface)" }}
                  >
                    {metric.title}
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--digiplus-on-surface-variant)" }}
                  >
                    {metric.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Accordion */}
        <div className="space-y-4">
          {homepage.faqs.map((faq) => (
            <details
              key={faq.id}
              className="group rounded-lg overflow-hidden border"
              style={{
                backgroundColor: "var(--digiplus-surface-container)",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
              open={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            >
              <summary
                className="flex justify-between items-center p-6 cursor-pointer font-bold list-none"
                style={{ color: "var(--digiplus-on-surface)" }}
              >
                {faq.question}
                <span
                  className="transition-transform"
                  style={{
                    transform: openId === faq.id ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ▼
                </span>
              </summary>
              <div
                className="p-6 pt-0 border-t"
                style={{
                  color: "var(--digiplus-on-surface-variant)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
