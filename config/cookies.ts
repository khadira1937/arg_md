import { brand } from "./brand";

/**
 * Cookie inventory shown on the Privacy page and behind the consent banner.
 * "essential" cookies are always allowed; "tracking" cookies load only after
 * the visitor accepts (see components/marketing/cookie-consent.tsx).
 */
export type CookieCategory = "essential" | "tracking";

export type CookieEntry = {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  category: CookieCategory;
};

export const cookieList: CookieEntry[] = [
  { name: "session", provider: brand.name, purpose: "Keeps you signed in to your account.", duration: "30 days", category: "essential" },
  { name: "cookieConsent", provider: brand.name, purpose: "Remembers your cookie preference.", duration: "1 year", category: "essential" },
  { name: "cart", provider: brand.name, purpose: "Remembers items in your cart before checkout.", duration: "30 days", category: "essential" },
  { name: "_aff", provider: `${brand.name} Affiliate`, purpose: "Attributes referrals to the referring affiliate.", duration: "60 days", category: "tracking" },
  { name: "_ga", provider: "Google Analytics", purpose: "Anonymous, aggregated usage analytics.", duration: "2 years", category: "tracking" },
];

/**
 * Scripts that may only run AFTER the visitor accepts tracking cookies.
 *
 * // TODO: replace with real data source — add your analytics/affiliate tag
 * // URLs (or inline init ids) here. The consent banner injects these only on
 * // accept; nothing tracking-related should load before then.
 */
export const trackingScripts: { id: string; src: string }[] = [
  // { id: "ga", src: "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX" },
];
