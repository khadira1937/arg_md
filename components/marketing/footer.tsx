import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { footerNav } from "@/config/nav";
import { brand } from "@/config/brand";

/**
 * Shared ARGANA MEDIA footer — a React port of the landing page's own footer so
 * every public page ends the same way (deep-navy band, gradient "A" mark, brand
 * blurb + contact, Services / Company / Legal columns and the registered-company
 * line). Content reads from config so it stays in sync site-wide. Styling lives
 * under the isolated `amx-` prefix in globals.css.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.07)", background: "#060912" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 28px 32px" }}>
        <div className="amx-footgrid">
          <div className="amx-footbrand">
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", marginBottom: 18 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/argana_media_logo_concept_2.png" alt="ARGANA MEDIA" width={40} height={40} style={{ display: "block", flexShrink: 0, objectFit: "contain" }} />
              <span style={{ fontFamily: "'Clash Display'", fontWeight: 600, fontSize: 18, letterSpacing: "0.14em", color: "#F4F7FC" }}>
                ARGANA<span style={{ color: "#8A93A6", fontWeight: 500 }}> MEDIA</span>
              </span>
            </Link>
            <p style={{ margin: "0 0 18px", fontSize: 14, lineHeight: 1.6, color: "#8A93A6" }}>
              Digital media, marketing and IT for growing businesses — content, websites, design, hosting support and everyday tech, from one trusted team across the UK and Europe.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 13.5 }}>
              <a href={`mailto:${brand.email.hello}`} style={{ color: "#A7B0C2", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9 }}>
                <Mail size={15} color="#35E0E8" strokeWidth={1.8} /> {brand.email.hello}
              </a>
              <a href={`tel:${brand.phoneHref}`} style={{ color: "#A7B0C2", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 9 }}>
                <Phone size={15} color="#35E0E8" strokeWidth={1.8} /> {brand.phone}
              </a>
            </div>
          </div>

          {(["Services", "Company", "Legal"] as const).map((heading) => (
            <div key={heading}>
              <h4 style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7E8AA3", fontWeight: 600, margin: "0 0 16px" }}>{heading}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {footerNav[heading].map((l) => (
                  <Link key={l.href} href={l.href} className="amx-footlink">{l.title}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, paddingTop: 26, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p style={{ margin: "0 0 6px", fontSize: 13, color: "#8A93A6" }}>
            <strong style={{ color: "#C7CEDC", fontWeight: 600 }}>{brand.company.legalName}</strong> · Company number {brand.company.number}
          </p>
          <p style={{ margin: "0 0 18px", fontSize: 13, color: "#7E8AA3" }}>Registered office: {brand.company.registeredOffice}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12.5, color: "#7E8AA3" }}>© {year} {brand.company.legalName}. All rights reserved.</span>
            <span style={{ fontSize: 12.5, color: "#7E8AA3" }}>Made with care in the UK.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
