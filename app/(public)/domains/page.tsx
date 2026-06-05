import type { Metadata } from "next";
import { Shield, RefreshCw, Globe } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/section";
import { DomainSearch } from "@/components/marketing/domain-search";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Domain Registration & Search",
  description: "Search and register the perfect domain with free WHOIS privacy and easy DNS management.",
  path: "/domains",
});

export default function DomainsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Domains", path: "/domains" }])} />
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-brand-glow" />
        <div className="container relative py-20 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Find the domain your idea deserves</h1>
          <p className="mx-auto mt-5 mb-10 max-w-2xl text-lg text-muted-foreground">Hundreds of TLDs, free WHOIS privacy and instant DNS management.</p>
          <DomainSearch />
        </div>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: Shield, title: "Free WHOIS privacy", body: "Keep your personal details private at no extra cost." },
            { icon: RefreshCw, title: "Easy transfers", body: "Move existing domains to us with a few clicks." },
            { icon: Globe, title: "Instant DNS", body: "Manage records and connect hosting in seconds." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border bg-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white"><f.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading eyebrow="FAQ" title="Domain questions" />
        <div className="mt-10">
          <FaqSection faqs={[
            { question: "Is WHOIS privacy really free?", answer: "Yes — WHOIS privacy is included free for all eligible TLDs." },
            { question: "Can I transfer my domain in?", answer: "Absolutely. Unlock your domain at your current registrar, grab the EPP code and start a transfer." },
            { question: "Do you support auto-renew?", answer: "Yes, domains can auto-renew so you never lose them; you can disable it any time." },
          ]} />
        </div>
      </Section>

      <CtaSection title="Pair your domain with hosting" primaryLabel="See hosting plans" primaryHref="/web-hosting" />
    </>
  );
}
