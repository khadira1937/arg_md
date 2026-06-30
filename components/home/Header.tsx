"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

/**
 * Header component for DigiPlus homepage — sticky nav bar with logo,
 * navigation links, and CTA button. Implements DESIGN.md glass-border styling
 * and accent colour on hover.
 */

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 w-full z-50"
      style={{
        backgroundColor: "rgba(17, 19, 24, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div
        className="flex justify-between items-center max-w-[1240px] mx-auto px-8 py-4"
        style={{ maxWidth: "var(--digiplus-container-max)" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="digiplus-button"
            style={{
              color: "var(--digiplus-primary-container)",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            DigiPlus
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {["Home", "Services", "Projects", "Blog", "Contact"].map((label) => (
            <Link
              key={label}
              href={`#${label.toLowerCase()}`}
              className="digiplus-label-lg transition-colors"
              style={{
                color: label === "Home" ? "var(--digiplus-primary-container)" : "var(--digiplus-on-surface)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--digiplus-primary-container)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  label === "Home" ? "var(--digiplus-primary-container)" : "var(--digiplus-on-surface)";
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <button
          className="digiplus-button px-6 py-2 rounded-full text-white transition-all"
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
          DISCOVER MORE
        </button>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <X size={24} style={{ color: "var(--digiplus-on-surface)" }} />
          ) : (
            <Menu size={24} style={{ color: "var(--digiplus-on-surface)" }} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: "var(--digiplus-surface-container)",
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="px-8 py-4 space-y-4">
            {["Home", "Services", "Projects", "Blog", "Contact"].map((label) => (
              <Link
                key={label}
                href={`#${label.toLowerCase()}`}
                className="digiplus-label-lg block"
                style={{ color: "var(--digiplus-on-surface)" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
