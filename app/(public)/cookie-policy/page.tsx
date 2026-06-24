import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/marketing/legal";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import { cookieList } from "@/config/cookies";

export const metadata: Metadata = pageMetadata({ title: "Cookie Policy", path: "/cookie-policy" });

export default function CookiePolicyPage() {
  return (
    <LegalShell title="Cookie Policy" updated="June 1, 2026">
      <p>This Cookie Policy explains how {brand.company.legalName} (&quot;{brand.name}&quot;) uses cookies and similar technologies on our website, and how you can manage your choices.</p>

      <h2>What are cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help the site work, remember your preferences and, with your consent, measure how the site is used.</p>

      <h2>How we use cookies</h2>
      <p>We use essential cookies that are required to run the site (these are always active), and analytics cookies that load only after you accept them in our cookie banner. You can decline non-essential cookies without affecting core functionality, and you can change your choice at any time by clearing the cookie in your browser.</p>

      <h2>Cookies we use</h2>
      <ul>
        {cookieList.map((c) => (
          <li key={c.name}>
            <strong>{c.name}</strong> — {c.purpose} <em>({c.provider}, {c.duration}, {c.category})</em>
          </li>
        ))}
      </ul>

      <h2>Managing cookies</h2>
      <p>Most browsers let you block or delete cookies through their settings. Note that blocking essential cookies may affect how the site works. For more on how we handle personal data, see our <Link href="/privacy">Privacy Policy</Link>.</p>

      <h2>Questions</h2>
      <p>If you have any questions about our use of cookies, contact us at {brand.email.support}.</p>
    </LegalShell>
  );
}
