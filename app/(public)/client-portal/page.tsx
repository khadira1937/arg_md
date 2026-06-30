import type { Metadata } from "next";
import Link from "next/link";
import { LogIn, Mail } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";
import { Hero, Band, Card, Btn, DISPLAY, TEAL } from "@/components/marketing/amx-ui";

export const metadata: Metadata = pageMetadata({
  title: "Client Portal",
  description: `Sign in to the ${brand.name} client portal to manage projects, billing and support tickets.`,
  path: "/client-portal",
});

export default function ClientPortalPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Client Portal", path: "/client-portal" }])} />

      <Hero
        eyebrow="Client Portal"
        eyebrowColor={TEAL}
        title="Sign in to your workspace"
        sub="Manage your projects, review invoices, raise support tickets and download deliverables — all from one secure place."
        actions={<Btn href={`mailto:${brand.email.hello}`} variant="gold" icon={false}><LogIn size={16} /> Request access</Btn>}
      />

      <Band>
        <Card hover={false} style={{ padding: 28, maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 20, margin: "0 0 14px", color: "var(--argana-on-surface)" }}>
            Portal coming soon
          </h2>
          <p style={{ margin: "0 0 18px", fontSize: 14.5, lineHeight: 1.6, color: "var(--argana-on-surface-muted)" }}>
            We&apos;re rolling out the client portal to active customers in stages. If you&apos;re an existing client and would like early access, drop us a line and we&apos;ll send you an invite.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href={`mailto:${brand.email.hello}`} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--argana-on-surface-muted)", textDecoration: "none" }}>
              <Mail size={16} color={TEAL} /> {brand.email.hello}
            </a>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, color: TEAL, textDecoration: "none" }}>
              Or send us a message →
            </Link>
          </div>
        </Card>
      </Band>
    </>
  );
}
