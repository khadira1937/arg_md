/** Shared domain-search types (safe to import from client and server). */

export type DomainStatus =
  | "available" // registrable now
  | "taken" // already registered
  | "premium" // available but premium-priced
  | "unavailable" // not offered / reserved / restricted TLD
  | "invalid" // failed validation
  | "error"; // lookup failed for this name

export type DomainResult = {
  domain: string;
  available: boolean;
  status: DomainStatus;
  /** Yearly registration price, or null when the registrar didn't return one. */
  price: number | null;
  currency: string;
  premium: boolean;
  /** True when `price` is a static estimate, not a live registrar quote. */
  priceEstimated?: boolean;
};

export type DomainSearchResponse = {
  query: string;
  provider: string;
  currency: string;
  /** True when results are simulated demo data (DOMAIN_PROVIDER=mock). */
  simulated?: boolean;
  results: DomainResult[];
};

export type DomainSearchErrorCode =
  | "invalid_input"
  | "provider_not_configured"
  | "rate_limited"
  | "provider_error";

export type DomainSearchError = {
  error: string;
  code: DomainSearchErrorCode;
};
