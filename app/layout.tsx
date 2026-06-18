import type { Metadata } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { brand } from "@/config/brand";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });
// Monospace for ALL technical data: prices, specs, regions, plan codes, resource values.
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

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
  // Favicon (app/icon.svg) and social preview (app/opengraph-image.tsx) are
  // wired automatically via Next.js file-based metadata conventions.
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider>
          <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
