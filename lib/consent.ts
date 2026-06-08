import { trackingScripts } from "@/config/cookies";

/**
 * Client-side cookie-consent state. The `cookieConsent` flag is the single
 * gate for tracking/affiliate scripts — nothing tracking-related should load
 * unless `getConsent() === "accepted"`.
 */
export type ConsentValue = "accepted" | "rejected";

const KEY = "cookieConsent";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "accepted" || v === "rejected" ? v : null;
}

export function setConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, value);
  // Mirror to a cookie so the server/middleware can read it later if needed.
  document.cookie = `${KEY}=${value}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  if (value === "accepted") loadTrackingScripts();
}

/**
 * Injects tracking scripts defined in config/cookies.ts. Idempotent, and a
 * no-op until consent is granted. Safe to call on every page load.
 */
export function loadTrackingScripts(): void {
  if (typeof window === "undefined") return;
  if (getConsent() !== "accepted") return;
  const w = window as unknown as { __trackingLoaded?: boolean };
  if (w.__trackingLoaded) return;
  w.__trackingLoaded = true;

  // TODO: replace with real data source — these come from config/cookies.ts.
  for (const s of trackingScripts) {
    if (document.getElementById(`track-${s.id}`)) continue;
    const el = document.createElement("script");
    el.id = `track-${s.id}`;
    el.src = s.src;
    el.async = true;
    document.head.appendChild(el);
  }
}
