"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, ArrowRight, ChevronDown } from "lucide-react";
import { nav } from "@/data/home";
import { serviceMenu } from "@/config/nav";

/**
 * Argana site navigation (dark, fixed top). Flat link bar + Client Portal
 * (outlined) + Book a Call (burnt-orange — accent #1). Active link uses the
 * burnt-orange underline indicator (accent #2). Hovering "Services" opens a
 * 3x2 mega panel of service categories; closes on leave with a 200ms delay
 * so the cursor can travel into the panel without it snapping shut.
 *
 * Background behaviour: on the homepage the nav is fully transparent while
 * within 80px of the top, then slides to a solid dark band with a hairline
 * border (200ms ease). On non-homepage routes the nav is always solid so it
 * never disappears against light page surfaces.
 */
export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [open, setOpen] = useState(false);
  // Initialize from pathname so non-home routes don't flash transparent on first
  // paint before the scroll effect runs.
  const [solid, setSolid] = useState(!isHome);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setMegaOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname?.startsWith(`${href}/`);

  const isExternal = (href: string) => /^https?:\/\//i.test(href);

  const openMega = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <nav
      className={`fixed h-20 inset-x-0 top-0 z-50 border-b text-white transition-[background-color,border-color,backdrop-filter] duration-200 ease-out ${
        solid || megaOpen
          ? "border-white/10 bg-black/95 backdrop-blur-md"
          : "border-transparent bg-transparent backdrop-blur-none"
      }`}
      aria-label="Primary"
      onMouseLeave={scheduleCloseMega}
    >
      <div className="am-container flex h-20 items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-base font-bold tracking-[0.18em]" aria-label={nav.brand}>
            {nav.brand}
          </Link>
          <ul className="hidden items-center gap-8 md:flex" role="menubar">
            {nav.links.map((link) => {
              const isServices = link.href === "/services";
              return (
                <li
                  key={link.label}
                  role="none"
                  className="relative"
                  onMouseEnter={isServices ? openMega : scheduleCloseMega}
                  onFocus={isServices ? openMega : undefined}
                >
                  <Link
                    href={link.href}
                    className="am-nav-link inline-flex items-center gap-1 text-sm font-medium"
                    data-active={isActive(link.href) ? "true" : "false"}
                    role="menuitem"
                    aria-haspopup={isServices ? "true" : undefined}
                    aria-expanded={isServices ? megaOpen : undefined}
                  >
                    {link.label}
                    {isServices ? (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          megaOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
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

      {/* Desktop Services mega panel */}
      <div
        className={`hidden border-t border-white/10 bg-black/95 backdrop-blur-md transition-[opacity,transform,visibility] duration-200 ease-out md:block ${
          megaOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0"
        }`}
        role="region"
        aria-label="Services menu"
        onMouseEnter={openMega}
        onMouseLeave={scheduleCloseMega}
      >
        <div className="am-container py-10">
          <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {serviceMenu.map((cat) => {
              const Icon = cat.icon;
              return (
                <li key={cat.title} className="border-l border-white/10 pl-5">
                  <Link
                    href={cat.href}
                    className="group/cat inline-flex items-center gap-2 text-sm font-semibold text-white"
                  >
                    <Icon className="h-4 w-4 text-white/70" aria-hidden />
                    {cat.title}
                    <ArrowRight
                      className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/cat:translate-x-0 group-hover/cat:opacity-100"
                      aria-hidden
                    />
                  </Link>
                  <ul className="mt-3 space-y-1.5">
                    {cat.links.slice(0, 5).map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block rounded-sm px-1 py-0.5 text-[13px] text-white/65 transition-colors hover:text-white"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
            <p className="text-sm text-white/65">
              Not sure where to start? Book a free, no-pressure call.
            </p>
            <a
              href={nav.cta.href}
              {...(isExternal(nav.cta.href)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              Book a Call
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
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
