import type { Metadata } from "next";
import { Mail, Phone, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/marketing/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({ title: "Contact", description: `Get in touch with ${brand.name}.`, path: "/contact" });

export default function ContactPage() {
  return (
    <div className="container py-16">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight">Get in touch</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Questions about a website, marketing, design or support? Send us a message and we&apos;ll get back to you — or
          book a free discovery call and we&apos;ll talk it through.
        </p>
        <div className="mt-6">
          <Button asChild variant="gradient"><Link href="/book-a-call"><PhoneCall className="h-4 w-4" /> Book a free call</Link></Button>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          {[
            { icon: Mail, title: "Email", value: brand.email.hello, href: `mailto:${brand.email.hello}` },
            { icon: Phone, title: "Phone", value: brand.phone, href: `tel:${brand.phoneHref}` },
            { icon: Mail, title: "Support", value: brand.email.support, href: `mailto:${brand.email.support}` },
          ].map((c) => (
            <a key={c.title} href={c.href} className="block">
              <Card className="flex items-center gap-3 p-4 transition-colors hover:border-primary/40">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><c.icon className="h-5 w-5" /></span>
                <div><p className="text-sm font-medium">{c.title}</p><p className="text-xs text-muted-foreground">{c.value}</p></div>
              </Card>
            </a>
          ))}
          <Card className="flex items-start gap-3 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><MapPin className="h-5 w-5" /></span>
            <div>
              <p className="text-sm font-medium">Registered office</p>
              <p className="text-xs text-muted-foreground">{brand.company.registeredOffice}</p>
            </div>
          </Card>
        </div>
        <Card className="p-6 lg:col-span-2">
          <ContactForm subjectLabel="How can we help?" messageLabel="Your message" submitLabel="Send message" />
        </Card>
      </div>
    </div>
  );
}
