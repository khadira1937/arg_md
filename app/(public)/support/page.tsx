import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, PhoneCall, LifeBuoy, BookOpen, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";
import { Hero, Band, Grid, Card, DISPLAY, TEAL } from "@/components/marketing/amx-ui";

export const metadata: Metadata = pageMetadata({ title: "Support", description: `Get help from ${brand.name} — contact us, book a call or open a support ticket in your client portal.`, path: "/support" });

const OPTIONS = [
  { icon: MessageSquare, title: "Contact us", desc: "Send us a message and we'll reply", href: "/contact" },
  { icon: PhoneCall, title: "Book a call", desc: "Talk it through with our team", href: "/book-a-call" },
  { icon: LifeBuoy, title: "Open a ticket", desc: "Existing clients — via your portal", href: "/dashboard/support" },
  { icon: BookOpen, title: "Read the blog", desc: "Guides, tips and how-tos", href: "/blog" },
];

export default function SupportPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Support", path: "/support" }])} />

      <Hero
        eyebrow="Help & Support"
        title="How can we help?"
        sub="Whether you're an existing client or just exploring, we're here to help. Choose the option that suits you best."
      />

      <Band>
        <Grid min={240} gap={18}>
          {OPTIONS.map((o) => (
            <Link key={o.title} href={o.href} className="amx-card" style={{ display: "flex", flexDirection: "column", height: "100%", padding: 26, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", textDecoration: "none" }}>
              <span style={{ display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: 13, background: "rgba(53,224,232,0.1)", color: TEAL, marginBottom: 16 }}><o.icon size={20} strokeWidth={1.8} /></span>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: 18, margin: "0 0 6px", color: "#EEF2F9" }}>{o.title}</h3>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "#8A93A6" }}>{o.desc}</p>
            </Link>
          ))}
        </Grid>
      </Band>

      <Band borderTop bg="linear-gradient(180deg, rgba(255,255,255,0.012), transparent)">
        <Card hover={false} style={{ maxWidth: 640, margin: "0 auto", padding: "36px 32px", textAlign: "center" }}>
          <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 24, margin: 0, color: "#F4F7FC" }}>Existing clients</h2>
          <p style={{ margin: "14px 0 22px", fontSize: 16, lineHeight: 1.6, color: "#A7B0C2" }}>
            Sign in to your client portal to view projects, invoices and care plans, and to raise a support ticket.
          </p>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, color: TEAL, textDecoration: "none" }}>
            Go to your Client Portal <ArrowRight size={16} />
          </Link>
        </Card>
      </Band>
    </>
  );
}
