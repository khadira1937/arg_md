import type { Metadata } from "next";
import { PhoneCall, Mail, Clock, CheckCircle2, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/marketing/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/config/brand";

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
    <div className="container py-16">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Book a Call", path: "/book-a-call" }])} />

      <div className="mx-auto max-w-2xl text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
          <PhoneCall className="h-3.5 w-3.5 text-primary" /> Free discovery call
        </span>
        <h1 className="font-display text-4xl font-bold tracking-tight">Let&apos;s talk about your project</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Whether you need a new website, more customers, better design or reliable support, the best place to start
          is a quick, free conversation. Tell us a bit about your business and we&apos;ll take it from there.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-5">
        {/* Left: what to expect */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="p-6">
            <h2 className="font-semibold">How it works</h2>
            <ol className="mt-4 space-y-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium">{s.title}</p>
                    <p className="text-sm text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold">What to expect</h2>
            <ul className="mt-3 space-y-2">
              {EXPECT.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {e}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="space-y-3 p-6 text-sm">
            <a href={`mailto:${brand.email.hello}`} className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Mail className="h-4 w-4" /></span>
              {brand.email.hello}
            </a>
            <a href={`tel:${brand.phoneHref}`} className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><PhoneCall className="h-4 w-4" /></span>
              {brand.phone}
            </a>
            <p className="flex items-center gap-3 text-muted-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Clock className="h-4 w-4" /></span>
              Mon–Fri, UK business hours
            </p>
          </Card>
        </div>

        {/* Right: form */}
        <Card className="p-6 lg:col-span-3">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Request your free call</h2>
          </div>
          <ContactForm
            submitLabel="Request my call"
            subjectLabel="What do you need help with?"
            messageLabel="Tell us about your business & goals"
          />
        </Card>
      </div>
    </div>
  );
}
