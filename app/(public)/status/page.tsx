import type { Metadata } from "next";
import Link from "next/link";
import { fetchStatus } from "@/lib/status";
import { StatusBoard } from "@/components/status/status-board";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({
  title: "System Status",
  description: `Live operational status and uptime history for ${brand.name} hosting, VPS, dedicated, GPU and API services.`,
  path: "/status",
});

export const dynamic = "force-dynamic";

export default async function StatusPage() {
  // Single data source — see lib/status.ts. Swap fetchStatus() for a real monitor later.
  const report = await fetchStatus();

  return (
    <>
      <StatusBoard report={report} />
      <div className="container pb-16">
        <p className="text-sm text-muted-foreground">
          Uptime reflects our{" "}
          <Link href="/sla" className="text-primary hover:underline">SLA</Link>{" "}
          measurement. Scheduled maintenance is announced in advance and excluded from availability.
          For incident history or status subscriptions, contact{" "}
          <Link href="/support" className="text-primary hover:underline">support</Link>.
        </p>
      </div>
    </>
  );
}
