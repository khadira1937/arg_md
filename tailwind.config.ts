import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        // Dark "infra" band surfaces for alternating dark sections.
        band: {
          DEFAULT: "hsl(var(--band))",
          raised: "hsl(var(--band-raised))",
          card: "hsl(var(--band-card))",
          border: "hsl(var(--band-border))",
          foreground: "hsl(var(--band-foreground))",
          muted: "hsl(var(--band-muted))",
        },

        // ── planhat-inspired homepage palette ──────────────────────────────
        // Warm editorial system, scoped to the new homepage. Flat hex (not the
        // forced-dark CSS vars) so these stay constant regardless of theme.
        // Off-white canvas, near-black ink, warm amber accent.
        canvas: {
          DEFAULT: "#F5F4F0", // warm off-white background
          raised: "#FBFAF7", // lifted cards / panels
          sunk: "#EDEBE4", // subtle inset wells
        },
        ink: {
          DEFAULT: "#0E0D0B", // near-black (hero, headings, dark sections)
          soft: "#2A2824", // body copy on light
          muted: "#6B675F", // secondary / captions
        },
        amber: {
          DEFAULT: "#C4874A", // warm amber accent
          soft: "#D9A66E", // hover / lighter fills
          deep: "#A66E36", // pressed / on-light text
          wash: "#EFE4D5", // tinted backgrounds
        },

        // ── Argana homepage palette (DESIGN.md, soft-geometric) ────────────
        // Monochrome base + single burnt-orange accent. Scoped to the new
        // homepage tree; other pages keep their existing palettes.
        argana: {
          surface: "#fbf9f8",
          "surface-dim": "#dbdad9",
          "surface-low": "#f5f3f3",
          "surface-container": "#efeded",
          "surface-high": "#e9e8e7",
          "on-surface": "#1b1c1c",
          "on-surface-variant": "#4c4546",
          inverse: "#303031",
          "inverse-on": "#f2f0f0",
          outline: "#7e7576",
          "outline-variant": "#cfc4c5",
          ink: "#000000", // primary (DESIGN.md)
          "on-ink": "#ffffff",
          // Burnt-orange accent — used in exactly 5 places (primary CTA,
          // active nav indicator, active tab underline, form focus, ::selection).
          burnt: "#ae3200",
          "burnt-light": "#fe6a3a",
          "on-burnt": "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        // Hanken Grotesk — single typeface for the Argana homepage (DESIGN.md).
        hanken: ["var(--font-hanken)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      backgroundImage: {
        // Premium gold CTA gradient (landing-page "Book a Call" button).
        "gold-gradient": "linear-gradient(135deg, #F6D79A 0%, #E3A94E 100%)",
        "brand-gradient":
          "linear-gradient(135deg, hsl(183 74% 56%) 0%, hsl(205 84% 64%) 45%, hsl(39 82% 74%) 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, hsl(183 74% 56% / 0.12) 0%, hsl(39 82% 74% / 0.12) 100%)",
        "brand-glow":
          "radial-gradient(60% 60% at 50% 0%, hsl(183 74% 56% / 0.16) 0%, transparent 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px hsl(183 74% 56% / 0.20), 0 20px 60px -24px hsl(183 74% 50% / 0.40)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
