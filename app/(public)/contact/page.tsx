import type { Metadata } from "next";
import { Mail, Phone, MapPin, LifeBuoy, PhoneCall } from "lucide-react";
import { ContactForm } from "@/components/marketing/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";
import { Hero, Band, Card, Btn, DISPLAY, TEAL } from "@/components/marketing/amx-ui";

export const metadata: Metadata = pageMetadata({ title: "Contact", description: `Get in touch with ${brand.name}.`, path: "/contact" });

const METHODS = [
  { icon: Mail, title: "Email", value: brand.email.hello, href: `mailto:${brand.email.hello}` },
  { icon: Phone, title: "Phone", value: brand.phone, href: `tel:${brand.phoneHref}` },
  { icon: LifeBuoy, title: "Support", value: brand.email.support, href: `mailto:${brand.email.support}` },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />

      <Hero
        eyebrow="Contact"
        title="Get in touch"
        sub="Questions about a website, marketing, design or support? Send us a message and we'll get back to you — or book a free discovery call and we'll talk it through."
        actions={<Btn href="/book-a-call" variant="gold" icon={false}><PhoneCall size={16} /> Book a free call</Btn>}
      />

      <Band>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))", gap: 36, alignItems: "start" }}>
          {/* Left: methods */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {METHODS.map((m) => (
              <a key={m.title} href={m.href} className="amx-card" style={{ display: "flex", alignItems: "center", gap: 14, padding: 18, borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)", textDecoration: "none" }}>
                <span style={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 12, background: "rgba(53,224,232,0.1)", color: TEAL }}><m.icon size={19} strokeWidth={1.8} /></span>
                <span>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#EEF2F9" }}>{m.title}</span>
                  <span style={{ display: "block", fontSize: 13, color: "#8A93A6" }}>{m.value}</span>
                </span>
              </a>
            ))}
            <Card hover={false} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: 18 }}>
              <span style={{ display: "grid", placeItems: "center", width: 42, height: 42, flexShrink: 0, borderRadius: 12, background: "rgba(243,205,134,0.12)", color: "#F3CD86" }}><MapPin size={19} strokeWidth={1.8} /></span>
              <span>
                <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#EEF2F9" }}>Registered office</span>
                <span style={{ display: "block", fontSize: 13, lineHeight: 1.5, color: "#8A93A6" }}>{brand.company.registeredOffice}</span>
              </span>
            </Card>
          </div>

          {/* Right: form */}
          <Card hover={false} style={{ padding: "28px 26px", gridColumn: "span 1" }}>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 22, margin: "0 0 18px", color: "#F4F7FC" }}>Send us a message</h2>
            <ContactForm subjectLabel="How can we help?" messageLabel="Your message" submitLabel="Send message" />
          </Card>
        </div>
      </Band>
    </>
  );
}
