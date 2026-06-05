import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/legal";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({ title: "Service Level Agreement", path: "/sla" });

export default function SlaPage() {
  return (
    <LegalShell title="Service Level Agreement (SLA)" updated="June 1, 2026">
      <p>This SLA describes the availability commitment for paid {brand.name} services and the credits available if we fall short.</p>
      <h2>Uptime commitment</h2>
      <p>We target {brand.stats.uptime} monthly network and infrastructure availability for production services, measured as the percentage of minutes in a calendar month the service is reachable, excluding scheduled maintenance.</p>
      <h2>Service credits</h2>
      <ul>
        <li>99.9%–99.99%: 10% of the affected service&apos;s monthly fee.</li>
        <li>99.0%–99.9%: 25% of the affected service&apos;s monthly fee.</li>
        <li>Below 99.0%: 50% of the affected service&apos;s monthly fee.</li>
      </ul>
      <h2>Exclusions</h2>
      <p>Scheduled maintenance (announced in advance), force majeure, customer-caused issues, and abuse-related suspensions are excluded from availability calculations.</p>
      <h2>Claiming credits</h2>
      <p>Submit a credit request via a support ticket within 30 days of the incident. Approved credits are applied to a future invoice and are the sole remedy for availability shortfalls.</p>
    </LegalShell>
  );
}
