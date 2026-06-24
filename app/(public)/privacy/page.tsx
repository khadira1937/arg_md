import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/marketing/legal";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({ title: "Privacy Policy", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="June 1, 2026">
      <p>{brand.company.legalName} (&quot;{brand.name}&quot;, &quot;we&quot;, &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This policy explains what we collect, why, and your rights under UK data protection law (the UK GDPR and the Data Protection Act 2018). We are the data controller for the information described here.</p>

      <h2>Who we are</h2>
      <p>{brand.company.legalName}, registered in {brand.company.jurisdiction} (company number {brand.company.number}), registered office {brand.company.registeredOffice}. For any privacy question, contact us at {brand.email.support}.</p>

      <h2>Information we collect</h2>
      <ul>
        <li>Contact &amp; account data: name, email, phone, company and billing details you provide.</li>
        <li>Project data: information, files and access you share so we can deliver your services.</li>
        <li>Usage data: logs, IP address and device information to operate and secure our website.</li>
        <li>Payment data: processed by Stripe; we do not store full card numbers.</li>
      </ul>

      <h2>How we use it</h2>
      <p>To provide and improve our services, prepare quotes and invoices, process payments, communicate with you, meet legal obligations, and (with your consent) send marketing. Our lawful bases include performance of a contract, legitimate interests, consent and legal obligation.</p>

      <h2>Sharing</h2>
      <p>We share data only with trusted sub-processors that help us deliver our services — for example our payment processor (Stripe), hosting and email providers, and analytics tools — and only as needed. We do not sell your personal data.</p>

      <h2>Data retention &amp; security</h2>
      <p>We keep personal data only as long as necessary for the purposes above or to meet legal and accounting obligations, then delete or anonymise it. We use appropriate technical and organisational measures to protect your data.</p>

      <h2>Your rights</h2>
      <p>Subject to UK GDPR, you may access, correct, export, restrict or delete your personal data, and object to certain processing, by contacting {brand.email.support}. You also have the right to complain to the Information Commissioner&apos;s Office (ICO) at ico.org.uk.</p>

      <h2>Cookies</h2>
      <p>We use essential cookies to run the website and analytics cookies only with your consent. For full details and how to manage your choices, see our <Link href="/cookie-policy">Cookie Policy</Link>.</p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time. The latest version will always be available on this page.</p>
    </LegalShell>
  );
}
