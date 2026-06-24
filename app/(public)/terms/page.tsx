import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/marketing/legal";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({ title: "Terms & Conditions", path: "/terms" });

export default function TermsPage() {
  return (
    <LegalShell title="Terms & Conditions" updated="June 1, 2026">
      <p>These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the website and services provided by {brand.company.legalName} (&quot;{brand.name}&quot;, &quot;we&quot;, &quot;us&quot;), a company registered in {brand.company.jurisdiction} under company number {brand.company.number}, with its registered office at {brand.company.registeredOffice}. By engaging our services or using our website, you agree to these Terms.</p>

      <h2>1. Our services</h2>
      <p>We provide digital media, marketing, design, content, website and app development, hosting support and business IT support services (the &quot;Services&quot;). The specific scope, deliverables, timeline and price for your project are set out in the proposal or quote we agree with you, which forms part of these Terms.</p>

      <h2>2. Quotes, proposals & changes</h2>
      <p>Quotes are based on the scope discussed and are valid for 30 days unless stated otherwise. Work outside the agreed scope (&quot;change requests&quot;) may affect the price and timeline and will be agreed before we proceed.</p>

      <h2>3. Fees & payment</h2>
      <p>Unless agreed otherwise, project work requires a deposit before we begin, with the balance due on completion or at agreed milestones. Ongoing plans (such as website care, hosting support and marketing retainers) are billed in advance each month or term. Payments are processed securely by our payment processor, Stripe. Late payments may result in work being paused.</p>

      <h2>4. Your responsibilities</h2>
      <p>To deliver on time we rely on you providing content, access, approvals and feedback promptly. You confirm that any materials you supply (text, images, logos, data) are accurate and that you have the rights to use them.</p>

      <h2>5. Intellectual property</h2>
      <p>On full payment, ownership of the final deliverables created specifically for you transfers to you, except for third-party assets, open-source components and our own pre-existing tools and templates, which are provided under licence. We may reference completed work in our portfolio unless you ask us not to.</p>

      <h2>6. Third-party services</h2>
      <p>Some Services rely on third parties (for example hosting providers, domain registrars, email platforms and advertising networks). Their own terms apply, and we are not responsible for outages or changes outside our reasonable control.</p>

      <h2>7. Cancellation</h2>
      <p>You may cancel ongoing monthly plans with reasonable notice as set out in your agreement. Refund eligibility for project work is described in our <Link href="/refund-policy">Refund Policy</Link>. Your use of our Services must also comply with our <Link href="/acceptable-use-policy">Acceptable Use Policy</Link>.</p>

      <h2>8. Limitation of liability</h2>
      <p>To the maximum extent permitted by law, {brand.name} will not be liable for indirect, incidental or consequential losses, and our total liability for any claim is limited to the fees you paid us for the work giving rise to the claim. Nothing in these Terms limits liability that cannot be limited by law.</p>

      <h2>9. Governing law</h2>
      <p>These Terms are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction.</p>

      <h2>10. Changes</h2>
      <p>We may update these Terms from time to time; material changes will be communicated by email or a notice on our website. Continued use of our Services after changes constitutes acceptance.</p>
    </LegalShell>
  );
}
