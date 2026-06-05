import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/legal";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({ title: "Terms of Service", path: "/terms" });

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="June 1, 2026">
      <p>These Terms of Service (&quot;Terms&quot;) govern your access to and use of {brand.name}&apos;s websites, products and services (the &quot;Services&quot;). By creating an account or using the Services, you agree to these Terms.</p>
      <h2>1. Accounts</h2>
      <p>You are responsible for safeguarding your account credentials and for all activity under your account. You must provide accurate information and be at least 18 years old or have the authority to enter into these Terms on behalf of an organization.</p>
      <h2>2. Subscriptions & billing</h2>
      <p>Paid Services are billed in advance on the billing cycle you select and renew automatically at the then-current renewal price until cancelled. You authorize us to charge your payment method via our payment processor, Stripe.</p>
      <h2>3. Acceptable use</h2>
      <p>Your use of the Services must comply with our <a href="/acceptable-use-policy">Acceptable Use Policy</a>. We may suspend or terminate Services that violate it.</p>
      <h2>4. Cancellation & refunds</h2>
      <p>You may cancel at any time from your dashboard. Refund eligibility is described in our <a href="/refund-policy">Refund Policy</a>.</p>
      <h2>5. Service levels</h2>
      <p>Availability commitments are described in our <a href="/sla">SLA</a>. Except as expressly stated there, the Services are provided &quot;as is&quot;.</p>
      <h2>6. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, {brand.name} will not be liable for indirect, incidental or consequential damages, and our aggregate liability is limited to the amounts you paid in the prior twelve months.</p>
      <h2>7. Changes</h2>
      <p>We may update these Terms; material changes will be communicated by email or in-product notice. Continued use after changes constitutes acceptance.</p>
    </LegalShell>
  );
}
