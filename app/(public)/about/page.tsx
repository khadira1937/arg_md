import type { Metadata } from "next";
import Link from "next/link";
import { Users, BadgeCheck, HeartHandshake, ShieldCheck, ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/marketing/section";
import { CtaSection } from "@/components/marketing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";
import { company } from "@/config/company";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `Learn about ${brand.name} — a UK digital media, marketing and web development agency helping growing businesses build and manage their online presence.`,
  path: "/about",
});

const VALUES = [
  { icon: Users, title: "One team, everything covered", body: "Marketing, content, design, websites and support under one roof — so your online presence is joined-up, not scattered across freelancers." },
  { icon: BadgeCheck, title: "Honest and transparent", body: "Clear scope, fixed quotes and plain-English advice. We tell you what will help — and what won't." },
  { icon: HeartHandshake, title: "In it for the long run", body: "We build relationships, not just projects. Care plans and support keep your business supported well after launch." },
  { icon: ShieldCheck, title: "A real, registered business", body: "ARGANA MEDIA LTD is registered in England and Wales — accountable, contactable and here to stay." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-mesh" />
        <div className="pointer-events-none absolute inset-0 bg-brand-glow" />
        <div className="container relative py-20 text-center">
          <h1 className="mx-auto max-w-3xl text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Helping businesses <span className="text-primary">grow online</span>, without the hassle
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            {brand.name} is a UK digital media and marketing agency with real technical capability. We help growing
            businesses build, improve and manage their online presence — combining marketing, content, design, web
            development, hosting support and business IT support in one dependable team.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="xl" variant="gradient"><Link href="/book-a-call"><PhoneCall className="h-4 w-4" /> Book a Call</Link></Button>
            <Button asChild size="xl" variant="outline"><Link href="/services">View Services <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        </div>
      </section>

      {/* Story */}
      <Section>
        <div className="mx-auto max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Too many small businesses are left juggling a separate web developer, a marketer, a designer and an IT
            person — none of whom talk to each other. We started {brand.name} to fix that: a single team that can take
            you from a great-looking website to being found on Google, then keep everything running smoothly.
          </p>
          <p>
            We believe technology and marketing should be approachable. That means clear advice, fixed quotes and no
            jargon — and a genuine commitment to your results, not just ticking off a task list. Whether you&apos;re
            launching something new or improving what you already have, we&apos;re here for the long term.
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-muted/30">
        <SectionHeading eyebrow="What we stand for" title="Our values" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="h-full rounded-2xl border bg-card p-6 transition-colors hover:border-primary/30">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white"><v.icon className="h-5 w-5" /></span>
              <h3 className="mt-4 font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Company facts */}
      <Section>
        <SectionHeading eyebrow="Company" title="The essentials" description="Real, verifiable details for a business you can trust." />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Founded", value: company.foundingYear },
            { label: "Headquarters", value: company.headquarters },
            { label: "Legal entity", value: company.legalEntity },
            { label: "Company number", value: company.companyNumber },
          ].map((f) => (
            <div key={f.label} className="rounded-2xl border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</p>
              <p className="mt-1 font-semibold">{f.value}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-4xl text-center text-sm text-muted-foreground">
          {company.legalEntity} is registered in {company.jurisdiction}. Registered office: {company.registeredOffice}.
        </p>
      </Section>

      <CtaSection
        title={`Work with ${brand.name}`}
        description="Tell us where you'd like your business to be online, and we'll help you get there. Start with a free, no-pressure call."
        primaryHref="/book-a-call"
        primaryLabel="Book a Call"
        secondaryHref="/services"
        secondaryLabel="View Services"
      />
    </>
  );
}
