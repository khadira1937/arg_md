import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/marketing/section";
import { DomainSearch } from "@/components/marketing/domain-search";
import { CtaSection } from "@/components/marketing/cta-section";
import { Card } from "@/components/ui/card";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Domain Transfer",
  description: "Transfer your domain to us in minutes — free privacy, free year extension, zero downtime.",
  path: "/domains/transfer",
});

const STEPS = [
  { n: 1, title: "Unlock your domain", body: "Disable the transfer lock at your current registrar." },
  { n: 2, title: "Get your EPP code", body: "Request the authorization (EPP) code from your registrar." },
  { n: 3, title: "Start the transfer", body: "Enter your domain and EPP code with us and confirm." },
  { n: 4, title: "Approve & relax", body: "Approve the email confirmation — we handle the rest with zero downtime." },
];

export default function DomainTransferPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-brand-glow" />
        <div className="container relative py-20 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Transfer your domain in minutes</h1>
          <p className="mx-auto mt-5 mb-10 max-w-2xl text-lg text-muted-foreground">Free WHOIS privacy and a bonus year added to your registration.</p>
          <DomainSearch />
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="How it works" title="Four simple steps" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <Card key={s.n} className="p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-white">{s.n}</span>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaSection title="Need a hand transferring?" primaryLabel="Contact support" primaryHref="/contact" secondaryLabel="Browse hosting" secondaryHref="/web-hosting" />
    </>
  );
}
