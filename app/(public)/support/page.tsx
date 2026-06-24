import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, MessageSquare, PhoneCall, LifeBuoy, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/marketing/section";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";

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
      <section className="border-b py-16 text-center">
        <div className="container">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">How can we help?</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Whether you&apos;re an existing client or just exploring, we&apos;re here to help. Choose the option that
            suits you best.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OPTIONS.map((c) => (
            <Link key={c.title} href={c.href}>
              <Card className="group h-full p-6 transition-all hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><c.icon className="h-5 w-5" /></span>
                <h3 className="mt-4 flex items-center gap-1 font-semibold">{c.title} <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" /></h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-muted/30 pt-0">
        <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">Existing clients</h2>
          <p className="mt-3 text-muted-foreground">
            Sign in to your client portal to view projects, invoices and care plans, and to raise a support ticket.
          </p>
          <div className="mt-6">
            <Link href="/dashboard" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
              Go to your Client Portal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
