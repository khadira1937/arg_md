"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { hero } from "@/data/home";

// Key is versioned. Bumping the suffix invalidates any value left in a
// visitor's localStorage from earlier iterations, so everyone sees the
// banner once after a key change — exactly as if they had cleared storage.
const STORAGE_KEY = "argana-cookie-consent-v2";

/**
 * Bottom-right cookie consent panel. Compact card pinned to the viewport
 * corner on desktop; expands to a full-width-with-margins strip below 640px.
 *
 * Render gate: emits nothing on the server / first client paint, then after
 * the mount-time effect resolves either keeps emitting nothing (visitor has
 * already chosen) or renders the panel. No animation — the element is
 * visible at its natural CSS state, so it cannot get stuck invisible.
 */
export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [hasConsent, setHasConsent] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setHasConsent(stored === "accepted" || stored === "declined");
    } catch {
      setHasConsent(false);
    }
  }, []);

  const dismiss = (decision: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, decision);
    } catch {
      // ignore — banner just won't persist this session.
    }
    setHasConsent(true);
  };

  if (!mounted || hasConsent) return null;

  return (
    <aside
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      data-testid="cookie-banner"
      className="fixed bottom-4 left-4 right-4 z-[100] rounded-lg border border-white/10 bg-black/95 text-white shadow-2xl backdrop-blur-xl sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-[420px]"
    >
      <div className="flex flex-col gap-4 p-5">
        <p className="text-xs leading-relaxed text-white/75 sm:text-[13px]">
          {hero.cookies.body}{" "}
          <Link href={hero.cookies.policyHref} className="underline underline-offset-2 hover:text-white">
            {hero.cookies.policyLabel}
          </Link>
          .
        </p>
        <div className="flex flex-wrap items-center gap-3">
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
