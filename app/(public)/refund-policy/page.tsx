import type { Metadata } from "next";
import { LegalShell } from "@/components/marketing/legal";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({ title: "Refund Policy", path: "/refund-policy" });

export default function RefundPage() {
  return (
    <LegalShell title="Refund Policy" updated="June 1, 2026">
      <p>This Refund Policy explains how refunds work for services provided by {brand.company.legalName}. We want you to be happy with our work, so we aim to be fair and clear about what is and isn&apos;t refundable.</p>

      <h2>Project work</h2>
      <p>Project work (such as websites, design and content) is quoted and booked with a deposit. Because we commit time and resources from the moment work begins, deposits are non-refundable once we have started. If you cancel partway through a project, you are charged for the work completed up to that point, and any amounts paid beyond that may be refunded.</p>

      <h2>Monthly plans</h2>
      <p>Ongoing plans such as website care, hosting support, IT support and marketing retainers are billed in advance. You can cancel future renewals with reasonable notice as set out in your agreement. We do not provide partial refunds for the current month once it has started, but you will continue to receive the service until the end of the paid period.</p>

      <h2>Third-party costs</h2>
      <p>Costs we pay on your behalf to third parties — such as domain registrations, premium plugins, stock assets, advertising spend and software licences — are non-refundable once purchased.</p>

      <h2>Your consumer rights</h2>
      <p>If you are a consumer, nothing in this policy affects your statutory rights, including any applicable right to cancel within a cooling-off period. Where you ask us to begin work during a cooling-off period, you may be charged for work performed up to the point of cancellation.</p>

      <h2>How to request a refund</h2>
      <p>Contact us at {brand.email.billing} or raise it from your client portal. Approved refunds are returned to your original payment method via Stripe, typically within 5–10 business days.</p>
    </LegalShell>
  );
}
