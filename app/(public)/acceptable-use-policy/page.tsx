import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/legal";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({ title: "Acceptable Use Policy", path: "/acceptable-use-policy" });

export default function AupPage() {
  return (
    <LegalShell title="Acceptable Use Policy" updated="June 1, 2026">
      <p>This Acceptable Use Policy (&quot;AUP&quot;) helps keep {brand.name} safe and reliable for everyone. It applies to all customers and services.</p>
      <h2>Prohibited content & activity</h2>
      <ul>
        <li>Illegal content, or content that infringes intellectual property or privacy rights.</li>
        <li>Malware distribution, phishing, spam, or unsolicited bulk messaging.</li>
        <li>Network abuse, including denial-of-service attacks, port scanning or intrusion attempts.</li>
        <li>Cryptocurrency mining on shared plans, or any activity that degrades service for others.</li>
        <li>Child sexual abuse material (CSAM) — reported to authorities immediately and without exception.</li>
      </ul>
      <h2>Resource usage</h2>
      <p>Shared environments enforce fair-use limits on CPU, memory, I/O and bandwidth. Sustained excessive usage may require upgrading to a VPS or dedicated server.</p>
      <h2>Enforcement</h2>
      <p>We may investigate suspected violations and suspend or terminate offending services. Severe or repeated violations may result in account termination without refund.</p>
      <h2>Reporting abuse</h2>
      <p>Report suspected abuse to {brand.email.abuse}. We review every report and act promptly.</p>
    </LegalShell>
  );
}
