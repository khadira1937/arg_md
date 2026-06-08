import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Database, HardDriveDownload, KeyRound, ShieldAlert } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/section";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({
  title: "Security",
  description: `How ${brand.name} protects your data: encryption in transit, data handling, backups, access control and responsible disclosure.`,
  path: "/security",
});

const SECTIONS = [
  {
    icon: Lock,
    title: "Encryption in transit",
    body: "All traffic to our website, dashboard and APIs is served over HTTPS (TLS). Customer sites include free SSL certificates so data between your visitors and your services is encrypted by default.",
  },
  {
    icon: Database,
    title: "Data handling",
    body: "We collect only what we need to operate your account and services. Sensitive credentials are encrypted at rest, payment details are handled by Stripe (we never store full card numbers), and access to production data is limited to authorized personnel.",
  },
  {
    icon: HardDriveDownload,
    title: "Backups",
    body: "Eligible plans include automated backups stored on separate infrastructure from the primary service. Backup frequency and retention depend on your plan — check your product page for specifics.",
  },
  {
    icon: KeyRound,
    title: "Access control",
    body: "Accounts are protected by hashed passwords and signed session tokens. Administrative access to our systems follows least-privilege principles, and infrastructure runs in enterprise-grade Tier III partner facilities.",
  },
  {
    icon: ShieldAlert,
    title: "Responsible disclosure",
    body: "Found a vulnerability? We welcome reports and will work with you in good faith to investigate and fix issues. Please contact our team before any public disclosure.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Security", path: "/security" }])} />
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-brand-glow" />
        <div className="container relative py-20 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Security at <span className="text-gradient">{brand.name}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            A plain-language overview of how we protect your account, your data and your services.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <div key={s.title} className="h-full rounded-2xl border bg-card p-6 transition-colors hover:border-primary/30">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <s.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-4xl text-sm text-muted-foreground">
          Questions about security or to report an issue, contact{" "}
          <Link href={`mailto:${brand.email.support}`} className="text-primary hover:underline">{brand.email.support}</Link>.
          See also our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and{" "}
          <Link href="/dmca" className="text-primary hover:underline">DMCA Policy</Link>.
        </p>
      </Section>
    </>
  );
}
