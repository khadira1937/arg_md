import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Refund Policy", path: "/refund-policy" });

export default function RefundPage() {
  return (
    <LegalShell title="Refund Policy" updated="June 1, 2026">
      <p>We want you to be confident in your purchase. This policy describes when refunds are available.</p>
      <h2>30-day money-back guarantee</h2>
      <p>Eligible shared, WordPress, WooCommerce and cloud hosting plans include a 30-day money-back guarantee for first-time purchases. Request a refund within 30 days of your initial order for a full refund of the plan fee.</p>
      <h2>Exclusions</h2>
      <ul>
        <li>Domain registrations and renewals (non-refundable once registered).</li>
        <li>Setup fees, add-ons and one-time professional services.</li>
        <li>Dedicated servers, GPU servers and custom/enterprise configurations.</li>
        <li>Renewal charges (cancel before renewal to avoid them).</li>
        <li>Accounts terminated for violations of the Acceptable Use Policy.</li>
      </ul>
      <h2>How to request</h2>
      <p>Open a ticket from your dashboard or contact billing. Approved refunds are returned to your original payment method via Stripe, typically within 5–10 business days.</p>
    </LegalShell>
  );
}
