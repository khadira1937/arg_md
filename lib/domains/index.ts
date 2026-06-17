import "server-only";
import { env } from "@/config/env";
import type {
  DomainResult,
  DomainSearchResponse,
  DomainStatus,
} from "./types";

export class DomainSearchError extends Error {
  code: "invalid_input" | "provider_not_configured" | "provider_error";
  status: number;
  constructor(
    code: DomainSearchError["code"],
    message: string,
    status = 400,
  ) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

/**
 * TLDs the search UI offers. Used to build candidate domains and to validate
 * client-supplied TLDs (never trust the client to pass arbitrary strings).
 */
export const SUPPORTED_TLDS = [
  ".com",
  ".net",
  ".org",
  ".co.uk",
  ".cloud",
  ".host",
  ".io",
  ".dev",
  ".co",
  ".store",
] as const;

export const DEFAULT_TLDS = [".com", ".net", ".org", ".co.uk", ".cloud", ".host"];

/**
 * Fallback yearly prices (USD) used ONLY when a provider does not return a
 * live price for an available domain. Always surfaced to the user as an
 * estimate — never presented as an exact quote. Keep conservative.
 */
const ESTIMATED_PRICE: Record<string, number> = {
  ".com": 12.99,
  ".net": 14.99,
  ".org": 12.99,
  ".co.uk": 8.99,
  ".cloud": 19.99,
  ".host": 49.99,
  ".io": 39.99,
  ".dev": 14.99,
  ".co": 24.99,
  ".store": 9.99,
};

const LABEL_RE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

/** Extract a clean second-level label from raw user input. */
export function normalizeQuery(raw: string): string {
  const trimmed = (raw ?? "").trim().toLowerCase();
  if (!trimmed) return "";
  // If the user typed a full domain, keep only the left-most label.
  const firstLabel = trimmed.replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[./\s]/)[0] ?? "";
  return firstLabel.replace(/[^a-z0-9-]/g, "");
}

export function isValidLabel(label: string): boolean {
  return LABEL_RE.test(label) && label.length >= 1 && label.length <= 63;
}

function tldFor(domain: string): string {
  // Longest matching supported suffix (so ".co.uk" wins over ".uk").
  const matches = SUPPORTED_TLDS.filter((t) => domain.endsWith(t)).sort((a, b) => b.length - a.length);
  return matches[0] ?? "." + domain.split(".").slice(1).join(".");
}

function estimatedPrice(domain: string): number | null {
  return ESTIMATED_PRICE[tldFor(domain)] ?? null;
}

export type SearchInput = {
  query: string;
  tlds?: string[];
};

/** Build the list of fully-qualified candidate domains to look up. */
export function buildCandidates(label: string, tlds: string[]): string[] {
  const safe = tlds.filter((t) => (SUPPORTED_TLDS as readonly string[]).includes(t));
  const chosen = safe.length ? safe : DEFAULT_TLDS;
  // Preserve order + de-dupe.
  return Array.from(new Set(chosen.map((t) => `${label}${t}`)));
}

/** Public entry point. Validates input and dispatches to the active provider. */
export async function searchDomains(input: SearchInput): Promise<DomainSearchResponse> {
  const label = normalizeQuery(input.query);
  if (!isValidLabel(label)) {
    throw new DomainSearchError(
      "invalid_input",
      "Enter a valid domain name using letters, numbers and hyphens.",
    );
  }

  const candidates = buildCandidates(label, input.tlds ?? DEFAULT_TLDS);
  const currency = env.DOMAIN_SEARCH_CURRENCY || "USD";
  const provider = env.DOMAIN_PROVIDER;

  switch (provider) {
    case "dynadot":
      return dynadotSearch(candidates, currency);
    case "mock":
      return mockSearch(candidates, currency);
    case "namecheap":
      // Reserved for a future Namecheap implementation; fail loudly rather
      // than silently returning fake data.
      throw new DomainSearchError(
        "provider_not_configured",
        "Namecheap provider is selected but not implemented yet. Use DOMAIN_PROVIDER=dynadot.",
        501,
      );
    default:
      throw new DomainSearchError(
        "provider_not_configured",
        env.NODE_ENV === "production"
          ? "Domain search is not available right now."
          : "Domain search is not configured. Set DOMAIN_PROVIDER (e.g. dynadot or mock) and the matching API key in .env. See .env.example.",
        503,
      );
  }
}

// ---------------------------------------------------------------------------
// Dynadot provider (https://www.dynadot.com/domain/api3.html — command=search)
// ---------------------------------------------------------------------------

// Opt-in raw-response logging for debugging (never logs the API key — only the
// XML body). Enable with DOMAIN_SEARCH_DEBUG=1; on by default outside production.
const DYNADOT_DEBUG = process.env.DOMAIN_SEARCH_DEBUG === "1" || env.NODE_ENV !== "production";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Outcome of a single parsed Dynadot response. */
type LookupOutcome =
  | { kind: "result"; result: DomainResult }
  | { kind: "busy" } // transient (system_busy / try again) — safe to retry
  | { kind: "fatal"; message: string }; // bad key / auth — stop the whole search

async function dynadotSearch(domains: string[], currency: string): Promise<DomainSearchResponse> {
  const key = env.DYNADOT_API_KEY;
  if (!key) {
    throw new DomainSearchError(
      "provider_not_configured",
      env.NODE_ENV === "production"
        ? "Domain search is not available right now."
        : "DOMAIN_PROVIDER=dynadot but DYNADOT_API_KEY is missing. Add it to .env (see .env.example).",
      503,
    );
  }

  // Dynadot's `search` command accepts only ONE domain per request, AND it
  // rate-limits bursts with `system_busy`. So we query SEQUENTIALLY (a small
  // gap between calls) with per-domain retry, instead of firing in parallel.
  const results: DomainResult[] = [];
  let okCount = 0;
  let fatal: DomainSearchError | null = null;

  for (let i = 0; i < domains.length; i++) {
    const domain = domains[i];
    try {
      const result = await dynadotSearchOne(domain, key, currency);
      results.push(result);
      if (result.status !== "error") okCount++;
    } catch (err) {
      if (err instanceof DomainSearchError && err.code === "provider_error") fatal = err;
      results.push(errorRow(domain, currency));
    }
    if (i < domains.length - 1) await sleep(250); // be gentle with the registrar
  }

  // If nothing resolved, surface a 502 with the registrar's own message.
  if (okCount === 0 && domains.length > 0) {
    throw fatal ?? new DomainSearchError("provider_error", "Could not reach the domain registrar. Please try again.", 502);
  }

  return { query: domains[0]?.split(".")[0] ?? "", provider: "dynadot", currency, results };
}

function errorRow(domain: string, currency: string): DomainResult {
  return { domain, available: false, status: "error", price: null, currency, premium: false };
}

/**
 * Look up a single domain (Dynadot allows one per `search` request). Retries a
 * couple of times on the transient `system_busy` response with backoff.
 */
async function dynadotSearchOne(domain: string, key: string, currency: string): Promise<DomainResult> {
  const MAX_ATTEMPTS = 3;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    if (attempt > 0) await sleep(400 * attempt);

    const xml = await fetchDynadotXml(domain, key, currency);
    if (DYNADOT_DEBUG) {
      // Logs the XML body only — the request URL (which contains the key) is never logged.
      console.log(`[dynadot] ${domain} (attempt ${attempt + 1}): ${xml.replace(/\s+/g, " ").trim()}`);
    }

    const outcome = parseDynadotDomain(xml, domain, currency);
    if (outcome.kind === "result") return outcome.result;
    if (outcome.kind === "fatal") {
      throw new DomainSearchError("provider_error", `Registrar error: ${outcome.message}`, 502);
    }
    // kind === "busy" → retry
  }
  // Exhausted retries on a transient error — return an error row for this TLD only.
  return errorRow(domain, currency);
}

/** Fetch the raw XML for one domain. Throws DomainSearchError on transport errors. */
async function fetchDynadotXml(domain: string, key: string, currency: string): Promise<string> {
  const url = new URL(env.DYNADOT_API_BASE_URL);
  url.searchParams.set("key", key);
  url.searchParams.set("command", "search");
  url.searchParams.set("show_price", "1");
  url.searchParams.set("currency", currency);
  url.searchParams.set("domain0", domain);

  try {
    const res = await fetch(url.toString(), {
      cache: "no-store", // never cache registrar availability
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      throw new DomainSearchError("provider_error", `Registrar returned HTTP ${res.status}.`, 502);
    }
    return await res.text();
  } catch (err) {
    if (err instanceof DomainSearchError) throw err;
    throw new DomainSearchError("provider_error", "Could not reach the domain registrar. Please try again.", 502);
  }
}

/**
 * Parse a single-domain Dynadot response.
 *
 * Real response shapes (api3.xml, command=search, show_price=1):
 *   taken:     <SuccessCode>0</SuccessCode><DomainName>x.com</DomainName><Status>success</Status><Available>no</Available>
 *   available: ...<Available>yes</Available><Price>Registration Price: 12.52 in USD and Renewal price: ... and Domain is not a Premium Domain</Price>
 *   busy:      <SuccessCode>-1</SuccessCode><Status>system_busy</Status><Error>system_busy</Error>
 *
 * NOTE: <Status> is the REQUEST status (success/system_busy), NOT availability.
 * Availability comes only from <Available>.
 */
function parseDynadotDomain(xml: string, requested: string, currency: string): LookupOutcome {
  const errorTag = (matchTag(xml, "Error") ?? "").trim();
  const successCode = (matchTag(xml, "SuccessCode") ?? "").trim();

  // Transient vs fatal error handling.
  if (errorTag) {
    const e = errorTag.toLowerCase();
    if (e.includes("busy") || e.includes("try again") || e.includes("timeout") || e.includes("too many")) {
      return { kind: "busy" };
    }
    return { kind: "fatal", message: errorTag }; // e.g. invalid key, auth, IP not allowed
  }
  // Non-zero success code without a readable error → treat as transient.
  if (successCode && successCode !== "0") return { kind: "busy" };

  const domain = (matchTag(xml, "DomainName") ?? requested).trim().toLowerCase();
  const availRaw = (matchTag(xml, "Available") ?? "").trim().toLowerCase();

  // No availability field and no error → retry once (covers truncated responses).
  if (!availRaw) return { kind: "busy" };

  const available = availRaw === "yes" || availRaw === "true" || availRaw === "available";
  const taken = availRaw === "no" || availRaw === "false" || availRaw === "unavailable" || availRaw === "taken";

  // Genuinely unreadable availability value — only now do we return "error".
  if (!available && !taken) return { kind: "result", result: errorRow(domain, currency) };

  // Price text, e.g. "Registration Price: 12.52 in USD and Renewal price: 12.52 in USD
  // and Domain is not a Premium Domain". First number = registration price.
  const priceText = matchTag(xml, "Price") ?? matchTag(xml, "Registration") ?? "";
  const explicitPremium = (matchTag(xml, "IsPremium") ?? matchTag(xml, "Premium") ?? "").trim().toLowerCase();
  const premium =
    explicitPremium === "yes" ||
    explicitPremium === "true" ||
    (/premium/i.test(priceText) && !/not\s+a\s+premium/i.test(priceText));

  const blockCurrency = matchTag(xml, "Currency")?.trim() || extractCurrency(priceText) || currency;
  let price = extractPrice(priceText);
  let priceEstimated = false;
  if (available && price == null) {
    price = estimatedPrice(domain); // labelled estimate, only when the registrar gave none
    if (price != null) priceEstimated = true;
  }

  const status: DomainStatus = !available ? "taken" : premium ? "premium" : "available";

  return {
    kind: "result",
    result: {
      domain,
      available,
      status,
      price: available ? price : null,
      currency: blockCurrency,
      premium,
      ...(priceEstimated ? { priceEstimated: true } : {}),
    },
  };
}

// ---------------------------------------------------------------------------
// Mock provider — explicit opt-in (DOMAIN_PROVIDER=mock). Deterministic so the
// UI can be developed without a registrar key. NOT enabled by default.
// ---------------------------------------------------------------------------

function mockSearch(domains: string[], currency: string): DomainSearchResponse {
  const results: DomainResult[] = domains.map((domain) => {
    const h = [...domain].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
    const taken = h % 3 === 0;
    const premium = !taken && h % 7 === 0;
    const base = estimatedPrice(domain) ?? 14.99;
    return {
      domain,
      available: !taken,
      status: taken ? "taken" : premium ? "premium" : "available",
      price: taken ? null : premium ? Math.round(base * 8 * 100) / 100 : base,
      currency,
      premium,
      ...(taken ? {} : { priceEstimated: true }),
    };
  });
  return { query: domains[0]?.split(".")[0] ?? "", provider: "mock", currency, simulated: true, results };
}

// ---------------------------------------------------------------------------
// Tiny XML helpers (no dependency) — good enough for the flat Dynadot schema.
// ---------------------------------------------------------------------------

function matchTag(xml: string, tag: string): string | null {
  const m = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i"));
  return m ? decodeEntities(m[1]) : null;
}

function extractPrice(text: string): number | null {
  const m = text.match(/(\d+(?:\.\d{1,2})?)/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : null;
}

function extractCurrency(text: string): string | null {
  const m = text.match(/\b(USD|EUR|GBP|CAD|AUD|INR)\b/i);
  return m ? m[1].toUpperCase() : null;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}
