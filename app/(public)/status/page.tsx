import type { Metadata } from "next";
import { CheckCircle2, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/marketing/section";
import { getLocations } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({
  title: "System Status",
  description: `Live operational status for ${brand.name} hosting, network, control panel and regional data centers.`,
  path: "/status",
});

export const dynamic = "force-dynamic";

const SERVICES = [
  "Website & Control Panel",
  "Hosting Platform",
  "VPS & Cloud Compute",
  "Dedicated & GPU Servers",
  "Network & DNS",
  "Email Delivery",
  "Billing & Checkout",
  "API",
];

function OperationalRow({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between border-b py-3 last:border-0">
      <span className="text-sm font-medium">{name}</span>
      <span className="flex items-center gap-1.5 text-sm text-success"><CheckCircle2 className="h-4 w-4" /> Operational</span>
    </div>
  );
}

export default async function StatusPage() {
  const locations = await getLocations();

  return (
    <>
      <section className="border-b bg-success/5 py-12">
        <div className="container flex flex-col items-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success/15 text-success"><Activity className="h-6 w-6" /></span>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">All systems operational</h1>
          <p className="text-muted-foreground">Current uptime over the last 90 days: <strong className="text-foreground">{brand.stats.uptime}</strong></p>
        </div>
      </section>

      <Section>
        <SectionHeading center={false} eyebrow="Services" title="Platform components" />
        <Card className="mt-6 p-6">
          {SERVICES.map((s) => <OperationalRow key={s} name={s} />)}
        </Card>
      </Section>

      <Section className="pt-0">
        <SectionHeading center={false} eyebrow="Regions" title="Data center status" />
        <Card className="mt-6 p-6">
          {locations.map((l) => <OperationalRow key={l.id} name={`${l.flagEmoji} ${l.city}, ${l.country}`} />)}
        </Card>
        <p className="mt-6 text-sm text-muted-foreground">
          Scheduled maintenance is announced in advance. For incident history and subscriptions, contact{" "}
          <a href="/support" className="text-primary hover:underline">support</a>.
        </p>
      </Section>
    </>
  );
}
