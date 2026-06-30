"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { nav } from "@/data/home";

/**
 * Argana homepage navigation (dark, fixed top). Mirrors the HTML structure:
 * brand wordmark + 5 nav links ("Solutions ▾"), LOG IN ghost, REQUEST A DEMO
 * accent CTA. The active link uses the burnt-orange indicator — one of the
 * five rationed accent uses (DESIGN.md).
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b text-white transition-colors duration-200 ${
        scrolled
          ? "border-white/10 bg-black/85 backdrop-blur-md"
          : "border-transparent bg-black/60 backdrop-blur-sm"
      }`}
      aria-label="Primary"
    >
      <div className="am-container flex h-20 items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-base font-bold tracking-[0.18em]" aria-label={nav.brand}>
            {nav.brand}
          </Link>
          <ul className="hidden items-center gap-8 md:flex" role="menubar">
            {nav.links.map((link, i) => (
              <li key={link.label} role="none">
                <Link
                  href={link.href}
                  className="am-nav-link inline-flex items-center gap-1 text-sm font-medium"
                  data-active={i === 0 ? "true" : "false"}
                  role="menuitem"
                >
                  {link.label}
                  {link.hasMenu ? <ChevronDown className="h-3.5 w-3.5" aria-hidden /> : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href={nav.login.href} className="am-cta-ghost-dark">
            {nav.login.label}
          </Link>
          <Link href={nav.cta.href} className="am-cta">
            {nav.cta.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-black md:hidden">
          <div className="am-container flex flex-col gap-2 py-6">
            {nav.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium text-white/85 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
                {link.hasMenu ? <ChevronDown className="h-4 w-4" aria-hidden /> : null}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              <Link href={nav.login.href} className="am-cta-ghost-dark justify-center">
                {nav.login.label}
              </Link>
              <Link href={nav.cta.href} className="am-cta justify-center">
                {nav.cta.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
