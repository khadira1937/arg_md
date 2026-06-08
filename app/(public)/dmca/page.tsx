import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/marketing/legal";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";

export const metadata: Metadata = pageMetadata({
  title: "DMCA & Copyright Policy",
  description: `How to file a copyright takedown notice or counter-notice with ${brand.name}, and how to reach our designated agent.`,
  path: "/dmca",
});

export default function DmcaPage() {
  return (
    <LegalShell title="DMCA & Copyright Policy" updated="June 1, 2026">
      <p>
        {brand.name} respects the intellectual property rights of others and responds to clear notices
        of alleged copyright infringement under the U.S. Digital Millennium Copyright Act (DMCA).
      </p>

      <h2>Designated agent</h2>
      <p>
        Send copyright notices to our designated agent:
      </p>
      <ul>
        {/* TODO: replace with real data source — registered DMCA agent name + mailing address. */}
        <li>Attn: DMCA Designated Agent, {brand.legalName}</li>
        <li>Email: <Link href={`mailto:${brand.email.abuse}`}>{brand.email.abuse}</Link></li>
        <li>Mailing address: {"{{REGISTERED_ADDRESS}}"} <em>(to be added)</em></li>
      </ul>

      <h2>Filing a takedown notice</h2>
      <p>To be effective, your written notice must include:</p>
      <ul>
        <li>Your physical or electronic signature.</li>
        <li>Identification of the copyrighted work you claim has been infringed.</li>
        <li>Identification of the infringing material and its URL, IP, or domain so we can locate it.</li>
        <li>Your name, address, telephone number, and email address.</li>
        <li>A statement that you have a good-faith belief the use is not authorized by the owner, its agent, or the law.</li>
        <li>A statement, under penalty of perjury, that the information is accurate and that you are the owner or authorized to act on the owner&apos;s behalf.</li>
      </ul>
      <p>
        On receipt of a valid notice we will promptly remove or disable access to the material and make a
        reasonable effort to notify the affected customer.
      </p>

      <h2>Filing a counter-notice</h2>
      <p>
        If you believe your material was removed in error or misidentification, you may submit a
        counter-notice to the designated agent that includes:
      </p>
      <ul>
        <li>Your physical or electronic signature.</li>
        <li>Identification of the material removed and the location where it appeared before removal.</li>
        <li>A statement, under penalty of perjury, that you have a good-faith belief the material was removed by mistake or misidentification.</li>
        <li>Your name, address, and telephone number, and a consent to the jurisdiction of the appropriate court.</li>
      </ul>
      <p>
        If we receive a valid counter-notice, we may restore the material in 10–14 business days unless the
        original complainant notifies us that they have filed a court action.
      </p>

      <h2>Repeat infringers</h2>
      <p>
        We may suspend or terminate, without refund, the accounts of customers who are determined to be
        repeat infringers, consistent with our{" "}
        <Link href="/acceptable-use-policy">Acceptable Use Policy</Link>.
      </p>
    </LegalShell>
  );
}
