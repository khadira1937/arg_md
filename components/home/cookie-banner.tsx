"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { hero } from "@/data/home";

const STORAGE_KEY = "argana-cookie-consent";

/**
 * Fixed-bottom cookie consent banner. Visible while scrolling on every page
 * load until the visitor accepts or declines, at which point the decision is
 * persisted in localStorage so the banner stays dismissed.
 *
 * Lives outside the hero so it never overlaps the hero CTAs and is positioned
 * full-width across the bottom of the viewport.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = (decision: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, decision);
    } catch {
      // localStorage may be unavailable (private mode); banner just won't persist.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-black/95 text-white backdrop-blur-xl"
    >
      <div className="am-container flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p className="text-xs leading-relaxed text-white/75 sm:text-[13px]">
          {hero.cookies.body}{" "}
          <Link href={hero.cookies.policyHref} className="underline underline-offset-2 hover:text-white">
            {hero.cookies.policyLabel}
          </Link>
          .
        </p>
        <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:justify-end">
          <button
            type="button"
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/85 transition hover:bg-white/10"
            onClick={() => dismiss("declined")}
          >
            {hero.cookies.manageLabel}
          </button>
          <button
            type="button"
            className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-white/85"
            onClick={() => dismiss("accepted")}
          >
            {hero.cookies.acceptLabel}
          </button>
        </div>
      </div>
    </aside>
  );
}
