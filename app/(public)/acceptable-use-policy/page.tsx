import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/legal";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({ title: "Acceptable Use Policy", path: "/acceptable-use-policy" });

export default function AupPage() {
  return (
    <LegalShell title="Acceptable Use Policy" updated="June 1, 2026">
      <p>This Acceptable Use Policy (&quot;AUP&quot;) helps keep the websites, hosting and services provided by {brand.company.legalName} (&quot;{brand.name}&quot;) safe, lawful and reliable. It applies to all clients and to any website or service we host, manage or support on your behalf.</p>

      <h2>Prohibited content &amp; activity</h2>
      <ul>
        <li>Illegal content, or content that infringes intellectual property, privacy or other rights.</li>
        <li>Malware distribution, phishing, spam or unsolicited bulk messaging.</li>
        <li>Fraud, deceptive practices or content intended to mislead or harm others.</li>
        <li>Network abuse, including denial-of-service attacks, scanning or intrusion attempts.</li>
        <li>Child sexual abuse material (CSAM) — reported to the authorities immediately and without exception.</li>
      </ul>

      <h2>Hosted &amp; managed websites</h2>
      <p>Where we host or manage your website, you remain responsible for the content you publish and for ensuring it complies with applicable law. Reasonable fair-use limits may apply to managed hosting resources; sustained excessive usage may require an upgraded plan.</p>

      <h2>Your account</h2>
      <p>Keep your login credentials secure and do not share access with unauthorised people. You are responsible for activity carried out under your account.</p>

      <h2>Enforcement</h2>
      <p>We may investigate suspected violations and, where necessary, suspend or remove offending content or services. Severe or repeated violations may result in termination of services without refund.</p>

      <h2>Reporting abuse</h2>
      <p>Report suspected abuse to {brand.email.abuse}. We review every report and act promptly.</p>
    </LegalShell>
  );
}
