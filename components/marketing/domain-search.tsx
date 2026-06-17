"use client";

import * as React from "react";
import { Search, Check, X, Loader2, Sparkles, AlertCircle, ShoppingCart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { DomainResult, DomainSearchResponse } from "@/lib/domains/types";
import { addDomainToShortlist, isDomainShortlisted } from "@/lib/domains/shortlist";

const CHIP_TLDS = [".com", ".net", ".org", ".co.uk", ".cloud", ".host"];

type Money = { price: number | null; currency: string };

function formatPrice({ price, currency }: Money): string {
  if (price == null) return "—";
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
  } catch {
    return `${currency} ${price.toFixed(2)}`;
  }
}

const STATUS_META: Record<DomainResult["status"], { label: string; tone: string }> = {
  available: { label: "Available", tone: "text-success" },
  premium: { label: "Premium", tone: "text-amber-600" },
  taken: { label: "Taken", tone: "text-muted-foreground" },
  unavailable: { label: "Unavailable", tone: "text-muted-foreground" },
  invalid: { label: "Invalid", tone: "text-destructive" },
  error: { label: "Unknown", tone: "text-muted-foreground" },
};

export function DomainSearch({ className }: { className?: string }) {
  const [query, setQuery] = React.useState("");
  const [tlds, setTlds] = React.useState<string[]>(CHIP_TLDS);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<DomainSearchResponse | null>(null);
  const [added, setAdded] = React.useState<Record<string, boolean>>({});

  function toggleTld(tld: string) {
    setTlds((prev) => (prev.includes(tld) ? prev.filter((t) => t !== tld) : [...prev, tld]));
  }

  async function search(e?: React.FormEvent) {
    e?.preventDefault();
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/domains/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, tlds: tlds.length ? tlds : CHIP_TLDS }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Domain search failed. Please try again.");
        return;
      }
      setData(json as DomainSearchResponse);
      setAdded(
        Object.fromEntries((json.results as DomainResult[]).map((r) => [r.domain, isDomainShortlisted(r.domain)])),
      );
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function addToCart(r: DomainResult) {
    addDomainToShortlist({ domain: r.domain, price: r.price, currency: r.currency, premium: r.premium });
    setAdded((prev) => ({ ...prev, [r.domain]: true }));
  }

  return (
    <div className={cn("mx-auto w-full max-w-2xl text-left", className)}>
      <form onSubmit={search} className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="example.com"
            aria-label="Domain name"
            autoComplete="off"
            spellCheck={false}
            className="h-12 pl-11 text-base"
          />
        </div>
        <Button type="submit" variant="gradient" size="lg" disabled={loading} className="h-12 shrink-0">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-4 w-4" />}
          Search domain
        </Button>
      </form>

      {/* TLD chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {CHIP_TLDS.map((tld) => {
          const active = tlds.includes(tld);
          return (
            <button
              key={tld}
              type="button"
              onClick={() => toggleTld(tld)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                active
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {tld}
            </button>
          );
        })}
      </div>

      {/* Error state */}
      {error && (
        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !data && (
        <div className="mt-5 space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-[58px] animate-pulse rounded-xl border bg-muted/40" />
          ))}
        </div>
      )}

      {/* Results */}
      {data && (
        <div className="mt-5 space-y-2">
          {data.simulated && (
            <div className="flex items-center gap-2 rounded-lg border border-amber-300/50 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
              <Info className="h-3.5 w-3.5" /> Demo data — set a real registrar API key to show live availability.
            </div>
          )}
          {data.results.map((r) => {
            const meta = STATUS_META[r.status];
            const isAdded = added[r.domain];
            return (
              <div
                key={r.domain}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/30"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  {r.available ? (
                    r.premium ? (
                      <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
                    ) : (
                      <Check className="h-4 w-4 shrink-0 text-success" />
                    )
                  ) : (
                    <X className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className="truncate font-medium">{r.domain}</span>
                  <span className={cn("text-xs font-semibold uppercase tracking-wide", meta.tone)}>{meta.label}</span>
                </span>

                {r.available ? (
                  <span className="flex items-center gap-3">
                    <span className="text-right text-sm">
                      <span className="font-semibold">{formatPrice(r)}</span>
                      <span className="text-muted-foreground">/yr</span>
                      {r.priceEstimated && (
                        <span className="ml-1 text-[11px] text-muted-foreground" title="Estimated price — confirmed at registration">
                          est.
                        </span>
                      )}
                    </span>
                    <Button
                      size="sm"
                      variant={isAdded ? "outline" : "gradient"}
                      onClick={() => addToCart(r)}
                      disabled={isAdded}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-4 w-4" /> Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" /> Add
                        </>
                      )}
                    </Button>
                  </span>
                ) : (
                  <Button size="sm" variant="outline" disabled>
                    Unavailable
                  </Button>
                )}
              </div>
            );
          })}

          {/* Honest provisioning disclosure */}
          <p className="flex items-start gap-1.5 pt-1 text-xs text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Domain registration is completed after payment once availability is confirmed by the registrar. Prices
            marked “est.” are estimates and finalized at checkout.
          </p>
        </div>
      )}
    </div>
  );
}
