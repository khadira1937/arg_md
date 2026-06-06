import type { Metadata } from "next";
import { Mail, MessageSquare, LifeBuoy } from "lucide-react";
import { Card } from "@/components/ui/card";
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
        <h1 className="font-display text-4xl font-bold tracking-tight">Talk to us</h1>
        <p className="mt-4 text-lg text-muted-foreground">Questions about plans, migrations or custom infrastructure? We&apos;d love to help.</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          {[
            { icon: Mail, title: "Sales", value: brand.email.sales },
            { icon: LifeBuoy, title: "Support", value: brand.email.support },
            { icon: MessageSquare, title: "Billing", value: brand.email.billing },
          ].map((c) => (
            <Card key={c.title} className="flex items-center gap-3 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><c.icon className="h-5 w-5" /></span>
              <div><p className="text-sm font-medium">{c.title}</p><p className="text-xs text-muted-foreground">{c.value}</p></div>
            </Card>
          ))}
        </div>
        <Card className="p-6 lg:col-span-2"><ContactForm /></Card>
      </div>
    </div>
  );
}
