import type { Metadata } from "next";
import { PhoneCall, Mail, Clock, Check, MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/marketing/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";
import { Hero, Band, Card, DISPLAY, TEAL } from "@/components/marketing/amx-ui";

export const metadata: Metadata = pageMetadata({
  title: "Book a Call",
  description:
    "Book a free, no-pressure discovery call with ARGANA MEDIA. We'll learn about your business and suggest the right next step for your website, marketing or support.",
  path: "/book-a-call",
});

const STEPS = [
  { title: "Tell us a little", body: "Share a few details below about your business and what you're hoping to achieve." },
  { title: "We'll get in touch", body: "We'll reply to arrange a free call at a time that suits you — by phone or video." },
  { title: "Get a clear plan", body: "After the call we send a simple proposal with scope, timeline and a fixed quote." },
];

const EXPECT = [
  "A friendly, jargon-free conversation",
  "Honest advice — even if that's 'not yet'",
  "No obligation and no pushy sales",
  "A clear next step you can act on",
];

export default function BookACallPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Book a Call", path: "/book-a-call" }])} />

      <Hero
        eyebrow="Free Discovery Call"
        eyebrowColor={TEAL}
        title="Let's talk about your project"
        sub="Whether you need a new website, more customers, better design or reliable support, the best place to start is a quick, free conversation. Tell us a bit about your business and we'll take it from there."
      />

      <Band>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))", gap: 36, alignItems: "start" }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card hover={false} style={{ padding: 26 }}>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 19, margin: "0 0 18px", color: "#F4F7FC" }}>How it works</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {STEPS.map((s, i) => (
                  <div key={s.title} style={{ display: "flex", gap: 14 }}>
                    <span style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 9, fontFamily: DISPLAY, fontWeight: 600, fontSize: 13, color: "#0A0E18", background: "linear-gradient(135deg,#F6D79A,#E3A94E)" }}>{i + 1}</span>
                    <div>
                      <p style={{ margin: 0, fontSize: 14.5, fontWeight: 600, color: "#EEF2F9" }}>{s.title}</p>
                      <p style={{ margin: "3px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "#8A93A6" }}>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card hover={false} style={{ padding: 26 }}>
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 19, margin: "0 0 14px", color: "#F4F7FC" }}>What to expect</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {EXPECT.map((e) => (
                  <span key={e} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#C7CEDC" }}>
                    <Check size={17} strokeWidth={2.4} color="#34D399" style={{ flexShrink: 0, marginTop: 1 }} /> {e}
                  </span>
                ))}
              </div>
            </Card>

            <Card hover={false} style={{ padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
              <a href={`mailto:${brand.email.hello}`} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#A7B0C2", textDecoration: "none" }}>
                <span style={{ display: "grid", placeItems: "center", width: 36, height: 36, borderRadius: 10, background: "rgba(53,224,232,0.1)", color: TEAL }}><Mail size={16} /></span>{brand.email.hello}
              </a>
              <a href={`tel:${brand.phoneHref}`} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#A7B0C2", textDecoration: "none" }}>
                <span style={{ display: "grid", placeItems: "center", width: 36, height: 36, borderRadius: 10, background: "rgba(53,224,232,0.1)", color: TEAL }}><PhoneCall size={16} /></span>{brand.phone}
              </a>
              <span style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#8A93A6" }}>
                <span style={{ display: "grid", placeItems: "center", width: 36, height: 36, borderRadius: 10, background: "rgba(243,205,134,0.12)", color: "#F3CD86" }}><Clock size={16} /></span>Mon–Fri, UK business hours
              </span>
            </Card>
          </div>

          {/* Right: form */}
          <Card hover={false} style={{ padding: "28px 26px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <MessageSquare size={20} color={TEAL} />
              <h2 style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: 20, margin: 0, color: "#F4F7FC" }}>Request your free call</h2>
            </div>
            <ContactForm submitLabel="Request my call" subjectLabel="What do you need help with?" messageLabel="Tell us about your business & goals" />
          </Card>
        </div>
      </Band>
    </>
  );
}
