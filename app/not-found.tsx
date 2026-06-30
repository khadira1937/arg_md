import Link from "next/link";
import { Nav } from "@/components/home/nav";
import { Footer } from "@/components/marketing/footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--argana-ink, #000)" }}>
      <Nav />
      <main className="am-band-dark" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px" }}>
        <div style={{ maxWidth: 720, width: "100%", textAlign: "center", color: "#fff" }}>
          <p
            style={{
              fontFamily: "var(--font-hanken), ui-sans-serif, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(120px, 22vw, 240px)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              margin: 0,
              color: "#fff",
            }}
          >
            404
          </p>
          <h1
            style={{
              fontFamily: "var(--font-hanken), ui-sans-serif, system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: "24px 0 0",
              color: "#fff",
            }}
          >
            This page took a wrong turn.
          </h1>
          <p
            style={{
              margin: "20px auto 0",
              maxWidth: 520,
              fontSize: 17,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            The page you&apos;re looking for has moved, been renamed, or never existed. Let&apos;s get you somewhere useful.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 36 }}>
            <Link href="/" className="am-cta">Back to home</Link>
            <Link href="/contact" className="am-cta-ghost-dark">Talk to us</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
