"use client";

import { homepage } from "@/data/home";
import { useState } from "react";

/**
 * Contact section — 2-column layout with contact form on left,
 * contact info on right.
 */

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactInfo = homepage.contact;

  return (
    <section
      className="py-section-padding-desktop"
      style={{
        backgroundColor: "var(--digiplus-background)",
        paddingTop: "var(--digiplus-section-padding-desktop)",
        paddingBottom: "var(--digiplus-section-padding-desktop)",
      }}
      id="contact"
    >
      <div
        className="max-w-container-max mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12"
        style={{ maxWidth: "var(--digiplus-container-max)" }}
      >
        {/* Left: Form */}
        <div>
          <span
            className="digiplus-label-lg uppercase tracking-widest block mb-2"
            style={{ color: "var(--digiplus-primary-container)" }}
          >
            {contactInfo.label}
          </span>
          <h2
            className="digiplus-headline-xl mb-8"
            style={{ color: "var(--digiplus-on-surface)" }}
          >
            {contactInfo.headline}
          </h2>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                className="w-full p-4 rounded-lg border text-on-surface"
                style={{
                  backgroundColor: "var(--digiplus-surface-container)",
                  borderColor: "var(--digiplus-glass-border)",
                  color: "var(--digiplus-on-surface)",
                }}
                placeholder={contactInfo.form.placeholders.name}
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                className="w-full p-4 rounded-lg border text-on-surface"
                style={{
                  backgroundColor: "var(--digiplus-surface-container)",
                  borderColor: "var(--digiplus-glass-border)",
                  color: "var(--digiplus-on-surface)",
                }}
                placeholder={contactInfo.form.placeholders.email}
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <input
              className="w-full p-4 rounded-lg border"
              style={{
                backgroundColor: "var(--digiplus-surface-container)",
                borderColor: "var(--digiplus-glass-border)",
                color: "var(--digiplus-on-surface)",
              }}
              placeholder={contactInfo.form.placeholders.subject}
              type="text"
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subject: e.target.value }))
              }
            />
            <textarea
              className="w-full p-4 rounded-lg border"
              style={{
                backgroundColor: "var(--digiplus-surface-container)",
                borderColor: "var(--digiplus-glass-border)",
                color: "var(--digiplus-on-surface)",
              }}
              placeholder={contactInfo.form.placeholders.message}
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
            />
            <button
              className="digiplus-button w-full py-4 rounded-lg text-white transition-all"
              style={{
                background: "linear-gradient(90deg, #ffaa17 0%, #ffcc33 100%)",
                color: "var(--digiplus-on-primary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              {contactInfo.form.button}
            </button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="flex flex-col justify-center gap-8">
          <h3
            className="digiplus-headline-lg"
            style={{ color: "var(--digiplus-on-surface)" }}
          >
            {contactInfo.info.headline}
          </h3>

          <div className="space-y-6">
            {contactInfo.info.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    backgroundColor: "rgba(255, 170, 23, 0.1)",
                    color: "var(--digiplus-primary-container)",
                  }}
                >
                  {item.icon === "location_on" && "📍"}
                  {item.icon === "mail" && "✉️"}
                  {item.icon === "call" && "☎️"}
                </div>
                <div>
                  <p
                    className="text-sm"
                    style={{ color: "var(--digiplus-on-surface-variant)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-bold"
                    style={{ color: "var(--digiplus-on-surface)" }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
