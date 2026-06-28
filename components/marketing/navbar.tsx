"use client";

import * as React from "react";
import Link from "next/link";
import { CALENDLY_URL } from "@/config/cta";
import {
  Globe,
  Megaphone,
  Palette,
  PenLine,
  ServerCog,
  LifeBuoy,
  ChevronDown,
  ShoppingCart,
  LayoutDashboard,
  Menu,
  X,
  ArrowRight,
  Phone,
  Newspaper,
  FolderOpen,
  LayoutGrid,
  BookOpen,
  Search,
  type LucideIcon,
} from "lucide-react";

/**
 * Shared ARGANA MEDIA navbar — a React port of the landing page's own navbar so
 * every non-home public page uses the exact same look (dark glass bar, gradient
 * "A" mark, underline-on-hover links, 3-column Services mega-menu, cart, Client
 * Portal and the gold "Book a Call" CTA). Wired to the real session, cart count
 * and routes. Styling lives under the isolated `amx-` prefix in globals.css.
 */

type NavUser = { name?: string | null; role: string } | null;

type MegaCol = { title: string; href: string; Icon: LucideIcon; links: [string, string][] };

const MEGA: MegaCol[] = [
  { title: "Website & App", href: "/website-app", Icon: Globe, links: [
    ["Website Development", "/website-app#development"],
    ["WordPress Websites", "/website-app#wordpress"],
    ["E-commerce Stores", "/website-app#ecommerce"],
    ["Landing Pages", "/website-app#landing"],
    ["Website Maintenance", "/website-app#maintenance"],
  ] },
  { title: "Digital Marketing", href: "/digital-marketing", Icon: Megaphone, links: [
    ["SEO", "/digital-marketing#seo"],
    ["Local SEO", "/digital-marketing#local-seo"],
    ["Content Marketing", "/digital-marketing#content"],
    ["Social Media Marketing", "/digital-marketing#social"],
    ["Paid Ads (Google & Meta)", "/digital-marketing#ads"],
  ] },
  { title: "Design", href: "/design", Icon: Palette, links: [
    ["Brand Identity", "/design#brand"],
    ["Logo Design", "/design#logo"],
    ["Web & UI/UX Design", "/design#web-ui"],
    ["Landing Page Design", "/design#landing"],
    ["Social Media Graphics", "/design#social"],
  ] },
  { title: "Digital Media & Content", href: "/digital-media-content", Icon: PenLine, links: [
    ["Website Copywriting", "/digital-media-content#copy"],
    ["Blog & Article Writing", "/digital-media-content#blog"],
    ["SEO Content", "/digital-media-content#seo-content"],
    ["Social Media Content", "/digital-media-content#social"],
    ["Content Strategy", "/digital-media-content#strategy"],
  ] },
  { title: "Hosting & Website Care", href: "/hosting-website-care", Icon: ServerCog, links: [
    ["Managed Hosting Support", "/hosting-website-care#hosting"],
    ["Website Care Plans", "/hosting-website-care#care"],
    ["Domain Setup", "/hosting-website-care#domains"],
    ["Business Email Setup", "/hosting-website-care#email"],
    ["SSL Setup", "/hosting-website-care#ssl"],
  ] },
  { title: "Business IT Support", href: "/business-it-support", Icon: LifeBuoy, links: [
    ["IT Helpdesk Support", "/business-it-support#helpdesk"],
    ["Email & Microsoft 365", "/business-it-support#email"],
    ["Device & Account Setup", "/business-it-support#setup"],
    ["Security Essentials", "/business-it-support#security"],
    ["Backup & Recovery", "/business-it-support#backup"],
  ] },
];

const NAV_LEFT: [string, string][] = [["Home", "/"], ["About", "/about"]];
const KH_MENU: [string, string, LucideIcon, string][] = [
  ["Insights", "/knowledge-hub", Newspaper, "Articles & analysis"],
  ["Case Studies", "/case-studies", FolderOpen, "Real project write-ups"],
  ["Categories", "/knowledge-hub#categories", LayoutGrid, "Browse by topic"],
  ["Guides", "/knowledge-hub#guides", BookOpen, "In-depth walkthroughs"],
  ["Search", "/knowledge-hub/search", Search, "Find a resource"],
];
const MOBILE_LINKS: [string, string][] = [
  ["Home", "/"], ["About", "/about"], ["Services", "/services"],
  ["What We Build", "/what-we-build"], ["Knowledge Hub", "/knowledge-hub"], ["Case Studies", "/case-studies"], ["Contact", "/contact"],
];

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="ARGANA MEDIA home" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", flexShrink: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/argana_media_logo_concept_2.png" alt="ARGANA MEDIA" width={38} height={38} style={{ display: "block", flexShrink: 0, objectFit: "contain" }} />
      <span style={{ fontFamily: "'Clash Display'", fontWeight: 600, fontSize: 18, letterSpacing: "0.14em", color: "#F4F7FC" }}>
        ARGANA<span style={{ color: "#8A93A6", fontWeight: 500 }}> MEDIA</span>
      </span>
    </Link>
  );
}

export function Navbar({ user, cartCount = 0 }: { user?: NavUser; cartCount?: number }) {
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [khOpen, setKhOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const portalHref = user ? "/dashboard" : "/login";

  return (
    <>
      <header style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(7,11,20,0.85)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <Brand />

          {/* Desktop nav */}
          <div className="amx-desktop" style={{ display: "flex", alignItems: "center", gap: 30 }}>
            {NAV_LEFT.map(([t, h]) => (
              <Link key={t} href={h} className="amx-navlink">{t}</Link>
            ))}

            <div style={{ position: "relative" }} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <Link href="/services" className="amx-navlink" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                Services
                <ChevronDown size={13} strokeWidth={2.5} style={{ transition: "transform .2s", transform: servicesOpen ? "rotate(180deg)" : "none" }} />
              </Link>
              <div
                style={{
                  position: "absolute", top: "100%", left: "50%", paddingTop: 18,
                  transform: `translateX(-50%) translateY(${servicesOpen ? "0" : "8px"})`,
                  opacity: servicesOpen ? 1 : 0,
                  visibility: servicesOpen ? "visible" : "hidden",
                  transition: "opacity .22s ease, transform .22s ease, visibility .22s",
                }}
              >
                <div style={{ width: "min(780px,94vw)", background: "rgba(13,18,30,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: 20, boxShadow: "0 30px 70px -24px rgba(0,0,0,.85)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "8px 24px" }}>
                    {MEGA.map((c) => (
                      <div key={c.title} style={{ padding: 6 }}>
                        <Link href={c.href} style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", marginBottom: 9 }}>
                          <span style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 9, background: "rgba(53,224,232,0.1)", color: "#35E0E8", flexShrink: 0 }}>
                            <c.Icon size={17} strokeWidth={1.8} />
                          </span>
                          <span style={{ color: "#EEF2F9", fontSize: 14, fontWeight: 600, fontFamily: "'Clash Display'" }}>{c.title}</span>
                        </Link>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {c.links.map(([lt, lh]) => (
                            <Link key={lh} href={lh} className="amx-subnav" onClick={() => setServicesOpen(false)}>{lt}</Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12.5, color: "#7E8AA3" }}>Not sure where to start? Book a free, no-pressure call.</span>
                    <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="amx-gold" style={{ display: "inline-flex", alignItems: "center", gap: 7, textDecoration: "none", color: "#0A0E18", fontSize: 13, fontWeight: 600, padding: "9px 16px", borderRadius: 10, whiteSpace: "nowrap" }} onClick={() => setServicesOpen(false)}>
                      Book a Call <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/what-we-build" className="amx-navlink">What We Build</Link>

            {/* Knowledge Hub dropdown */}
            <div style={{ position: "relative" }} onMouseEnter={() => setKhOpen(true)} onMouseLeave={() => setKhOpen(false)}>
              <Link href="/knowledge-hub" className="amx-navlink" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                Knowledge Hub
                <ChevronDown size={13} strokeWidth={2.5} style={{ transition: "transform .2s", transform: khOpen ? "rotate(180deg)" : "none" }} />
              </Link>
              <div
                style={{
                  position: "absolute", top: "100%", left: "50%", paddingTop: 18,
                  transform: `translateX(-50%) translateY(${khOpen ? "0" : "8px"})`,
                  opacity: khOpen ? 1 : 0, visibility: khOpen ? "visible" : "hidden",
                  transition: "opacity .22s ease, transform .22s ease, visibility .22s",
                }}
              >
                <div style={{ width: 320, background: "rgba(13,18,30,0.97)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: 10, boxShadow: "0 30px 70px -24px rgba(0,0,0,.85)" }}>
                  {KH_MENU.map(([label, href, Icon, desc]) => (
                    <Link key={href} href={href} className="amx-khitem" onClick={() => setKhOpen(false)} style={{ display: "flex", gap: 12, alignItems: "center", padding: "11px 12px", borderRadius: 12, textDecoration: "none" }}>
                      <span style={{ display: "grid", placeItems: "center", width: 36, height: 36, borderRadius: 10, background: "rgba(53,224,232,0.1)", color: "#35E0E8", flexShrink: 0 }}>
                        <Icon size={17} strokeWidth={1.8} />
                      </span>
                      <span style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ color: "#EEF2F9", fontSize: 14, fontWeight: 600, fontFamily: "'Clash Display'" }}>{label}</span>
                        <span style={{ color: "#8A93A6", fontSize: 12 }}>{desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/contact" className="amx-navlink">Contact</Link>
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <Link href="/cart" aria-label="Cart" className="amx-desktop amx-icon" style={{ position: "relative", color: "#C7CEDC", padding: 6, display: "grid", placeItems: "center", textDecoration: "none" }}>
              <ShoppingCart size={20} strokeWidth={1.7} />
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: -2, right: -2, minWidth: 16, height: 16, display: "grid", placeItems: "center", padding: "0 4px", borderRadius: 100, background: "linear-gradient(135deg,#F6D79A,#E3A94E)", color: "#0A0E18", fontSize: 10, fontWeight: 700 }}>{cartCount}</span>
              )}
            </Link>

            <Link href={portalHref} className="amx-desktop amx-portal" style={{ display: "inline-flex", alignItems: "center", gap: 7, textDecoration: "none", color: "#C7CEDC", fontSize: 13.5, fontWeight: 500, padding: "8px 14px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, transition: "border-color .25s, color .25s" }}>
              <LayoutDashboard size={15} strokeWidth={1.8} /> Client Portal
            </Link>

            <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="amx-desktop amx-gold" style={{ display: "inline-flex", alignItems: "center", gap: 7, textDecoration: "none", color: "#0A0E18", fontSize: 13.5, fontWeight: 600, padding: "10px 18px", borderRadius: 10 }}>
              <Phone size={15} /> Book a Call
            </Link>

            <button aria-label="Menu" className="amx-burger" onClick={() => setMobileOpen(true)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, width: 42, height: 42, cursor: "pointer", color: "#EEF2F9", placeItems: "center" }}>
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile panel */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 80, background: "rgba(7,11,20,0.98)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", padding: 28, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <Brand onClick={() => setMobileOpen(false)} />
            <button aria-label="Close menu" onClick={() => setMobileOpen(false)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, width: 42, height: 42, color: "#EEF2F9", display: "grid", placeItems: "center", cursor: "pointer" }}>
              <X size={18} />
            </button>
          </div>
          {MOBILE_LINKS.map(([t, h]) => (
            <Link key={t} href={h} onClick={() => setMobileOpen(false)} style={{ textDecoration: "none", color: "#EEF2F9", fontFamily: "'Clash Display'", fontWeight: 500, fontSize: 24, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,.07)" }}>{t}</Link>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
            <Link href={portalHref} onClick={() => setMobileOpen(false)} style={{ flex: 1, textAlign: "center", textDecoration: "none", color: "#EEF2F9", fontWeight: 600, padding: 14, border: "1px solid rgba(255,255,255,.16)", borderRadius: 12 }}>Client Portal</Link>
            <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="amx-gold" style={{ flex: 1, textAlign: "center", textDecoration: "none", color: "#0A0E18", fontWeight: 600, padding: 14, borderRadius: 12 }}>Book a Call</Link>
          </div>
        </div>
      )}
    </>
  );
}
