import type { Metadata } from "next";
import { ShieldAlert, Mail, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/marketing/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { reportAbuseAction } from "@/app/actions/contact";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({
  title: "Report Abuse",
  description: `Report spam, phishing, malware, copyright or other abuse hosted on ${brand.name}. Our trust & safety team investigates every report.`,
  path: "/abuse",
});

export default function AbusePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Report Abuse", path: "/abuse" }])} />
      <div className="container max-w-4xl py-16">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive"><ShieldAlert className="h-7 w-7" /></span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">Report abuse</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We take abuse seriously. Use this form to report spam, phishing, malware, network attacks, copyright infringement or other violations of our{" "}
            <a href="/acceptable-use-policy" className="text-primary hover:underline">Acceptable Use Policy</a>.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <Card className="p-5">
              <Mail className="h-5 w-5 text-primary" />
              <p className="mt-2 text-sm font-medium">Abuse contact</p>
              <p className="text-xs text-muted-foreground">{brand.email.abuse}</p>
            </Card>
            <Card className="p-5">
              <Clock className="h-5 w-5 text-primary" />
              <p className="mt-2 text-sm font-medium">Response time</p>
              <p className="text-xs text-muted-foreground">Most reports are triaged within 24 hours. CSAM is actioned immediately and reported to authorities.</p>
            </Card>
            <Card className="p-5">
              <p className="text-sm font-medium">What to include</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                <li>The offending URL, IP or domain</li>
                <li>A description of the abuse</li>
                <li>Any supporting evidence or logs</li>
              </ul>
            </Card>
          </div>
          <Card className="p-6 lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Submit a report</h2>
            <ContactForm action={reportAbuseAction} submitLabel="Submit report" subjectLabel="Type of abuse (spam, phishing, malware…)" messageLabel="Details (URLs, IPs, evidence)" />
          </Card>
        </div>
      </div>
    </>
  );
}
