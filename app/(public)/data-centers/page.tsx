import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/marketing/section";
import { CtaSection } from "@/components/marketing/cta-section";
import { Card } from "@/components/ui/card";
import { Gauge } from "lucide-react";
import { getLocations } from "@/lib/catalog";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { infrastructure, regionLatency } from "@/config/infrastructure";

export const metadata: Metadata = pageMetadata({
  title: "Infrastructure & Server Locations",
  description: "Hosting built on enterprise-grade Tier III partner data centers in North America, Europe, Asia-Pacific and South America.",
  path: "/data-centers",
});

export default async function DataCentersPage() {
  const locations = await getLocations();
  const byRegion = locations.reduce<Record<string, typeof locations>>((acc, l) => {
    (acc[l.region] ??= []).push(l);
    return acc;
  }, {});

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Data Centers", path: "/data-centers" }])} />
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-brand-glow" />
        <div className="container relative py-20 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">A global network, <span className="text-gradient">close to everyone</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">{infrastructure.summary}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {infrastructure.badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {Object.entries(byRegion).map(([region, locs]) => (
        <Section key={region} className="border-b last:border-0">
          <SectionHeading center={false} eyebrow="Region" title={region} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locs.map((l) => {
              const latency = regionLatency(l.city);
              return (
                <Card key={l.id} className="flex items-center gap-4 p-5">
                  <span className="text-3xl">{l.flagEmoji}</span>
                  <div className="min-w-0">
                    <p className="font-semibold">{l.city}</p>
                    <p className="text-sm text-muted-foreground">{l.country} · {l.name}</p>
                    {latency != null && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <Gauge className="h-3.5 w-3.5 text-primary" /> ~{latency} ms regional latency
                      </p>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>
      ))}

      <CtaSection title="Pick your region and deploy" primaryLabel="View VPS plans" primaryHref="/vps-hosting" />
    </>
  );
}
