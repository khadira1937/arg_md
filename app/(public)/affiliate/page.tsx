import type { Metadata } from "next";
import Link from "next/link";
import { DollarSign, Users, BarChart3, Gift, ArrowRight, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/marketing/section";
import { CtaSection } from "@/components/marketing/cta-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({
  title: "Affiliate Program — Earn up to 40% per referral",
  description: `Join the ${brand.name} affiliate program and earn recurring commissions for every customer you refer. Free to join, real-time tracking, reliable payouts.`,
  path: "/affiliate",
});

const STEPS = [
  { icon: Users, title: "Sign up free", body: "Create your affiliate account in minutes — no cost, no commitment." },
  { icon: BarChart3, title: "Share your link", body: "Promote your unique referral link across your site, blog or social channels." },
  { icon: DollarSign, title: "Get paid", body: "Earn a commission on every qualifying sale, tracked in real time." },
];

const TIERS = [
  { name: "Starter", rate: "20%", detail: "1–5 referrals / month" },
  { name: "Growth", rate: "30%", detail: "6–20 referrals / month", popular: true },
  { name: "Partner", rate: "40%", detail: "21+ referrals / month" },
];

const FAQ = [
  { question: "How much can I earn?", answer: "Commissions start at 20% and scale to 40% as your monthly referrals grow. Many products pay recurring commissions for the lifetime of the customer." },
  { question: "When and how do I get paid?", answer: "Payouts are issued monthly once your balance passes the minimum threshold, via your preferred payout method, after the 30-day refund window closes." },
  { question: "Is there a cost to join?", answer: "No. The affiliate program is completely free to join and there are no minimum sales requirements to stay active." },
  { question: "How are referrals tracked?", answer: "We use a 60-day cookie window and a real-time dashboard so you always know exactly what you've earned." },
];

export default function AffiliatePage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Affiliate Program", path: "/affiliate" }]),
        serviceJsonLd({ name: `${brand.name} Affiliate Program`, description: "Earn recurring commissions referring customers to premium cloud hosting.", path: "/affiliate" }),
      ]} />

      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-brand-glow" />
        <div className="container relative py-20 text-center">
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Turn your audience into <span className="text-gradient">recurring income</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Recommend hosting people actually love, and earn up to 40% commission on every referral — with transparent tracking and dependable payouts.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="xl" variant="gradient"><Link href="/register">Become an affiliate <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild size="xl" variant="outline"><Link href="/contact">Talk to our team</Link></Button>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="How it works" title="Start earning in three steps" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s) => (
            <Card key={s.title} className="p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white"><s.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading eyebrow="Commission tiers" title="The more you refer, the more you earn" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {TIERS.map((t) => (
            <Card key={t.name} className={`relative p-6 text-center ${t.popular ? "border-primary/50 ring-1 ring-primary/20" : ""}`}>
              <h3 className="font-semibold">{t.name}</h3>
              <p className="mt-3 font-display text-4xl font-bold text-gradient">{t.rate}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading center={false} eyebrow="Why partner with us" title="Built for serious creators" />
            <ul className="mt-6 space-y-3">
              {[
                "High conversion rates from premium, well-reviewed products",
                "Recurring commissions on hosting subscriptions",
                "60-day tracking cookie and real-time reporting",
                "Marketing assets, banners and dedicated affiliate support",
                "Reliable, on-time monthly payouts",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {b}</li>
              ))}
            </ul>
          </div>
          <Card className="flex flex-col items-center p-10 text-center">
            <Gift className="h-10 w-10 text-primary" />
            <p className="mt-4 font-display text-2xl font-bold">Ready to start?</p>
            <p className="mt-2 text-sm text-muted-foreground">Join free and get your referral link instantly.</p>
            <Button asChild variant="gradient" className="mt-6"><Link href="/register">Join the program</Link></Button>
          </Card>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading eyebrow="FAQ" title="Affiliate questions" />
        <div className="mt-10"><FaqSection faqs={FAQ} /></div>
      </Section>

      <CtaSection title="Start earning today" primaryLabel="Become an affiliate" primaryHref="/register" secondaryLabel="Contact us" secondaryHref="/contact" />
    </>
  );
}
