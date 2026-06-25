import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";

export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0b1220 0%, #0f172a 55%, #111a33 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #06B6D4 0%, #0EA5E9 50%, #6366F1 100%)",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#e2e8f0", letterSpacing: "0.04em" }}>
            {brand.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 700,
              color: "#f8fafc",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            Build, grow &amp; manage your online presence
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 27, color: "#94a3b8", maxWidth: 960 }}>
            Digital media, marketing, websites, design, hosting support and business IT — from one team across the UK and Europe.
          </div>
        </div>

        <div style={{ display: "flex", gap: 30, fontSize: 22, color: "#94a3b8" }}>
          <div style={{ display: "flex" }}>Marketing &amp; SEO</div>
          <div style={{ display: "flex", color: "#334155" }}>•</div>
          <div style={{ display: "flex" }}>Web &amp; app development</div>
          <div style={{ display: "flex", color: "#334155" }}>•</div>
          <div style={{ display: "flex" }}>{brand.domain}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
