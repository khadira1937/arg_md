import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { verifyEmailAction } from "@/app/actions/auth";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Verify email", path: "/verify", noIndex: true });

const headingStyle = {
  fontFamily: "var(--font-hanken), ui-sans-serif, system-ui, sans-serif",
  fontWeight: 600,
  fontSize: 24,
  letterSpacing: "-0.01em",
  margin: "16px 0 0",
  color: "var(--argana-on-surface)",
} as const;

const subStyle = {
  margin: "10px 0 0",
  fontSize: 14.5,
  lineHeight: 1.5,
  color: "var(--argana-on-surface-muted)",
} as const;

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const ok = token ? await verifyEmailAction(token) : false;

  return (
    <div style={{ textAlign: "center" }}>
      {ok ? (
        <>
          <CheckCircle2 style={{ width: 48, height: 48, margin: "0 auto", color: "var(--argana-burnt)" }} />
          <h1 style={headingStyle}>Email verified</h1>
          <p style={subStyle}>Your email address is confirmed. You&apos;re all set.</p>
          <Link href="/dashboard" className="am-cta" style={{ marginTop: 24 }}>Go to dashboard</Link>
        </>
      ) : (
        <>
          <XCircle style={{ width: 48, height: 48, margin: "0 auto", color: "var(--argana-burnt)" }} />
          <h1 style={headingStyle}>Verification failed</h1>
          <p style={subStyle}>This link is invalid or has expired.</p>
          <Link href="/dashboard" className="am-cta-ghost-light" style={{ marginTop: 24, display: "inline-flex" }}>Back to dashboard</Link>
        </>
      )}
    </div>
  );
}
