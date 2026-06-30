import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { brand } from "@/config/brand";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "var(--argana-surface)",
        color: "var(--argana-on-surface)",
        fontFamily: "var(--font-hanken), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Top bar — wordmark + back link */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px clamp(20px, 5vw, 48px)",
        }}
      >
        <Link
          href="/"
          aria-label="ARGANA MEDIA home"
          style={{
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: "0.14em",
            color: "var(--argana-on-surface)",
            textDecoration: "none",
          }}
        >
          ARGANA <span style={{ color: "var(--argana-burnt)" }}>MEDIA</span>
        </Link>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13.5,
            color: "var(--argana-on-surface-muted)",
            textDecoration: "none",
          }}
        >
          <ArrowLeft style={{ width: 14, height: 14 }} /> Back to {brand.domain}
        </Link>
      </header>

      {/* Centred card */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 20px 48px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 440,
            padding: "36px clamp(24px, 4vw, 40px)",
            border: "1px solid var(--argana-outline-variant)",
            borderRadius: 12,
            background: "transparent",
          }}
        >
          {children}
        </div>
      </main>

      {/* Minimal copyright footer */}
      <footer
        style={{
          padding: "20px clamp(20px, 5vw, 48px)",
          textAlign: "center",
          fontSize: 12.5,
          color: "var(--argana-on-surface-muted)",
        }}
      >
        © {new Date().getFullYear()} {brand.name} · {" "}
        <Link href="/terms" style={{ color: "var(--argana-on-surface-muted)", textDecoration: "underline" }}>Terms</Link>
        {" · "}
        <Link href="/privacy" style={{ color: "var(--argana-on-surface-muted)", textDecoration: "underline" }}>Privacy</Link>
      </footer>
    </div>
  );
}
