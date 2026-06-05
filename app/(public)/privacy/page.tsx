import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/legal";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({ title: "Privacy Policy", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="June 1, 2026">
      <p>{brand.name} respects your privacy. This policy explains what we collect, why, and your rights.</p>
      <h2>Information we collect</h2>
      <ul>
        <li>Account data: name, email, and billing details you provide.</li>
        <li>Usage data: logs, IP address and device information to operate and secure the Services.</li>
        <li>Payment data: processed by Stripe; we do not store full card numbers.</li>
      </ul>
      <h2>How we use it</h2>
      <p>To provide and improve the Services, process payments, provision infrastructure, prevent abuse, and send transactional and (with consent) marketing communications.</p>
      <h2>Sharing</h2>
      <p>We share data with sub-processors such as our payment processor and infrastructure providers solely to deliver the Services. We do not sell your personal data.</p>
      <h2>Data retention & security</h2>
      <p>We retain data for as long as your account is active or as needed to comply with legal obligations. Sensitive credentials are encrypted at rest.</p>
      <h2>Your rights</h2>
      <p>Subject to applicable law (including GDPR/CCPA), you may access, correct, export or delete your personal data by contacting {brand.email.support}.</p>
      <h2>International transfers</h2>
      <p>We may process data in regions where our data centers operate, using appropriate safeguards for cross-border transfers.</p>
    </LegalShell>
  );
}
