"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav } from "@/data/home";

/**
 * Argana homepage navigation (dark, fixed top). Flat 5-link bar + Client Portal
 * (outlined) + Book a Call (burnt-orange — accent #1). Active link uses the
 * burnt-orange underline indicator (accent #2). Mobile drawer mirrors desktop.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname?.startsWith(`${href}/`);

  const isExternal = (href: string) => /^https?:\/\//i.test(href);

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
            {nav.links.map((link) => (
              <li key={link.label} role="none">
                <Link
                  href={link.href}
                  className="am-nav-link inline-flex items-center text-sm font-medium"
                  data-active={isActive(link.href) ? "true" : "false"}
                  role="menuitem"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href={nav.portal.href} className="am-cta-ghost-dark">
            {nav.portal.label}
          </Link>
          <a
            href={nav.cta.href}
            className="am-cta"
            {...(isExternal(nav.cta.href)
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {nav.cta.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
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
                className="rounded-md px-3 py-3 text-sm font-medium text-white/85 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              <Link
                href={nav.portal.href}
                className="am-cta-ghost-dark justify-center"
                onClick={() => setOpen(false)}
              >
                {nav.portal.label}
              </Link>
              <a
                href={nav.cta.href}
                className="am-cta justify-center"
                {...(isExternal(nav.cta.href)
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                onClick={() => setOpen(false)}
              >
                {nav.cta.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
