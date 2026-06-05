import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/marketing/section";
import { CtaSection } from "@/components/marketing/cta-section";
import { Card } from "@/components/ui/card";
import { getLocations } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Data Centers & Server Locations",
  description: "Deploy across our global network of data centers in North America, Europe, Asia-Pacific and South America.",
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
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0 bg-brand-glow" />
        <div className="container relative py-20 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">A global network, <span className="text-gradient">close to everyone</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">Choose a region at checkout for low-latency performance wherever your users are.</p>
        </div>
      </section>

      {Object.entries(byRegion).map(([region, locs]) => (
        <Section key={region} className="border-b last:border-0">
          <SectionHeading center={false} eyebrow="Region" title={region} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locs.map((l) => (
              <Card key={l.id} className="flex items-center gap-4 p-5">
                <span className="text-3xl">{l.flagEmoji}</span>
                <div>
                  <p className="font-semibold">{l.city}</p>
                  <p className="text-sm text-muted-foreground">{l.country} · {l.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      ))}

      <CtaSection title="Pick your region and deploy" primaryLabel="View VPS plans" primaryHref="/vps-hosting" />
    </>
  );
}
