"use client";

import Link from "next/link";
import { useState } from "react";
import { homepage } from "@/data/home";

/**
 * Footer section — 4-column layout with brand/tagline + socials,
 * Explore links, Services links, Newsletter signup + copyright.
 */

export function Footer() {
  const f = homepage.footer;
  const [email, setEmail] = useState("");

  return (
    <footer
      style={{
        backgroundColor: "var(--digiplus-surface-container-lowest)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        paddingTop: "var(--digiplus-section-padding-desktop)",
        paddingBottom: "32px",
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 max-w-container-max mx-auto mb-8"
        style={{ maxWidth: "var(--digiplus-container-max)" }}
      >
        {/* Brand Column */}
        <div className="space-y-4">
          <div>
            <span
              style={{
                color: "var(--digiplus-on-surface)",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              DigiPlus
            </span>
          </div>
          <p
            className="digiplus-body-md"
            style={{ color: "var(--digiplus-on-surface-variant)" }}
          >
            {f.tagline}
          </p>
          <div className="flex gap-3">
            {["🌐", "📤", "🔗"].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors"
                style={{
                  backgroundColor: "var(--digiplus-surface-container)",
                  color: "var(--digiplus-on-surface-variant)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "var(--digiplus-primary-container)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--digiplus-on-primary-container)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "var(--digiplus-surface-container)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--digiplus-on-surface-variant)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h4
            className="digiplus-label-lg uppercase tracking-widest mb-4"
            style={{ color: "var(--digiplus-on-surface-variant)" }}
          >
            Explore
          </h4>
          <ul className="space-y-2">
            {f.links.Explore.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="digiplus-body-md transition-all inline-block hover:translate-x-1"
                  style={{ color: "var(--digiplus-on-surface-variant)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--digiplus-primary-container)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--digiplus-on-surface-variant)";
                  }}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Links */}
        <div>
          <h4
            className="digiplus-label-lg uppercase tracking-widest mb-4"
            style={{ color: "var(--digiplus-on-surface-variant)" }}
          >
            Services
          </h4>
          <ul className="space-y-2">
            {f.links.Services.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="digiplus-body-md transition-all inline-block hover:translate-x-1"
                  style={{ color: "var(--digiplus-on-surface-variant)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--digiplus-primary-container)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--digiplus-on-surface-variant)";
                  }}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4
            className="digiplus-label-lg uppercase tracking-widest mb-4"
            style={{ color: "var(--digiplus-on-surface-variant)" }}
          >
            {f.newsletter.label}
          </h4>
          <p
            className="digiplus-body-md mb-4"
            style={{ color: "var(--digiplus-on-surface-variant)" }}
          >
            {f.newsletter.description}
          </p>
          <div className="flex">
            <input
              className="bg-surface-container border-none text-on-surface rounded-l-lg w-full p-2 focus:ring-0"
              style={{
                backgroundColor: "var(--digiplus-surface-container)",
                color: "var(--digiplus-on-surface)",
              }}
              placeholder={f.newsletter.placeholder}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="text-on-primary px-4 rounded-r-lg transition-all"
              style={{
                backgroundColor: "var(--digiplus-primary-container)",
                color: "var(--digiplus-on-primary-container)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              }}
            >
              📧
            </button>
          </div>
        </div>
      </div>

      {/* Copyright & Legal */}
      <div
        className="max-w-container-max mx-auto px-8 mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-sm gap-4"
        style={{
          maxWidth: "var(--digiplus-container-max)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          color: "var(--digiplus-on-surface-variant)",
        }}
      >
        <p>{f.copyright}</p>
        <div className="flex gap-6">
          {f.legal.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: "var(--digiplus-on-surface-variant)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--digiplus-primary-container)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--digiplus-on-surface-variant)";
              }}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;