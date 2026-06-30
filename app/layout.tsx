import type { Metadata } from "next";
import { JetBrains_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { brand } from "@/config/brand";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { ThemeProvider } from "@/components/theme-provider";

// Sans (General Sans) + display (Clash Display) match the landing page and are
// loaded globally via the Fontshare <link> below; the CSS variables are set in
// globals.css. Monospace (JetBrains) is kept for technical data (prices/specs).
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

// Hanken Grotesk — single typeface for the new Argana homepage (DESIGN.md).
// Exposed as --font-hanken (Tailwind `font-hanken`); scoped via class on the
// homepage tree so site-wide General Sans / Clash Display are untouched.
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: brand.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title: `${brand.name} — ${brand.tagline}`, description: siteConfig.description },
  // Favicon (app/icon.png) and social preview (app/opengraph-image.tsx) are
  // wired automatically via Next.js file-based metadata conventions.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect cuts the font handshake latency. TODO (Phase 2): self-host
            Clash Display + General Sans (woff2 in /public/fonts via next/font/local)
            to drop the third-party request entirely. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=general-sans@400,500,600,700&display=swap"
        />
      </head>
      <body className={`${jetbrainsMono.variable} ${hankenGrotesk.variable} font-sans`}>
        <ThemeProvider>
          <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
