"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Check, X, Loader2, Sparkles, AlertCircle, ShoppingCart, Info, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { DomainResult, DomainSearchResponse } from "@/lib/domains/types";
import { addDomainToShortlist, isDomainShortlisted, getDomainShortlist } from "@/lib/domains/shortlist";

const CHIP_TLDS = [".com", ".net", ".org", ".co.uk", ".cloud", ".host"];

function formatPrice(price: number | null, currency: string): string {
  if (price == null) return "—";
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
  } catch {
    return `${currency} ${price.toFixed(2)}`;
  }
}

export function DomainSearch({ className }: { className?: string }) {
  const [query, setQuery] = React.useState("");
  const [tlds, setTlds] = React.useState<string[]>(CHIP_TLDS);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState<string | null>(null);
  const [data, setData] = React.useState<DomainSearchResponse | null>(null);
  const [added, setAdded] = React.useState<Record<string, boolean>>({});
  const [shortlistCount, setShortlistCount] = React.useState(0);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    setShortlistCount(getDomainShortlist().length);
  }, []);

  const runSearch = React.useCallback(async (raw: string, selectedTlds: string[]) => {
    const q = raw.trim();
    if (q.length < 2) return;
    setLoading(true);
    setError(null);
    setSubmitted(q.replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[./\s]/)[0] ?? q);
    try {
      const res = await fetch("/api/domains/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, tlds: selectedTlds.length ? selectedTlds : CHIP_TLDS }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Domain search failed. Please try again.");
        setData(null);
        return;
      }
      setData(json as DomainSearchResponse);
      setAdded(Object.fromEntries((json.results as DomainResult[]).map((r) => [r.domain, isDomainShortlisted(r.domain)])));
    } catch {
      setError("Network error. Please check your connection and try again.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced auto-search as the user types.
  React.useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) return;
    debounceRef.current = setTimeout(() => runSearch(query, tlds), 650);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, tlds, runSearch]);

  function toggleTld(tld: string) {
    setTlds((prev) => (prev.includes(tld) ? prev.filter((t) => t !== tld) : [...prev, tld]));
  }

  function addToCart(r: DomainResult) {
    addDomainToShortlist({ domain: r.domain, price: r.price, currency: r.currency, premium: r.premium });
    setAdded((prev) => ({ ...prev, [r.domain]: true }));
    setShortlistCount(getDomainShortlist().length);
  }

  const invalid = query.trim().length > 0 && query.trim().length < 2;

  // Split results: the searched/.com result is pinned; the rest grouped by availability.
  const results = data?.results ?? [];
  const primary = results.find((r) => r.domain.endsWith(".com")) ?? results[0];
  const alternatives = results.filter((r) => r !== primary && r.available);
  const taken = results.filter((r) => r !== primary && !r.available);

  return (
    <div className={cn("mx-auto w-full max-w-2xl text-left", className)}>
      {/* Search bar — sticky on mobile */}
      <form
        onSubmit={(e) => { e.preventDefault(); runSearch(query, tlds); }}
        className="sticky top-16 z-10 flex flex-col gap-2 rounded-xl bg-background/80 backdrop-blur sm:static sm:flex-row sm:bg-transparent sm:p-0"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="example.com"
            aria-label="Domain name"
            autoComplete="off"
            spellCheck={false}
            className="h-12 pl-11 font-mono text-base"
          />
        </div>
        <Button type="submit" variant="gradient" size="lg" disabled={loading} className="h-12 shrink-0">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-4 w-4" />}
          Search domain
        </Button>
      </form>

      {/* TLD chips — horizontally scrollable on mobile */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CHIP_TLDS.map((tld) => {
          const activeChip = tlds.includes(tld);
          return (
            <button
              key={tld}
              type="button"
              onClick={() => toggleTld(tld)}
              aria-pressed={activeChip}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 font-mono text-xs font-medium transition-colors",
                activeChip ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {tld}
            </button>
          );
        })}
      </div>

      {invalid && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-warning">
          <AlertCircle className="h-3.5 w-3.5" /> Enter at least 2 characters to search.
        </p>
      )}

      {/* Error / timeout — inline retry */}
      {error && (
        <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <span className="flex items-start gap-2.5 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
          </span>
          <Button size="sm" variant="outline" onClick={() => runSearch(query, tlds)} className="shrink-0">
            <RefreshCw className="h-3.5 w-3.5" /> Retry
          </Button>
        </div>
      )}

      {/* Loading — show searched term + skeleton rows */}
      {loading && (
        <div className="mt-5 space-y-2">
          {submitted && (
            <p className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Checking availability for “{submitted}”…
            </p>
          )}
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-[60px] animate-pulse rounded-xl border bg-muted/40" />
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && data && (
        <div className="mt-5 space-y-4">
          {data.simulated && (
            <div className="flex items-center gap-2 rounded-lg border border-warning/40 bg-warning/10 px-3 py-2 text-xs font-medium text-warning">
              <Info className="h-3.5 w-3.5" /> Demo data — set a real registrar API key to show live availability.
            </div>
          )}

          {/* Pinned "Your search" */}
          {primary && (
            <div>
              <p className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your search</p>
              <ResultRow r={primary} added={!!added[primary.domain]} onAdd={() => addToCart(primary)} emphasize />
            </div>
          )}

          {/* Available alternatives */}
          {alternatives.length > 0 && (
            <div>
              <p className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Available alternatives
              </p>
              <div className="space-y-2">
                {alternatives.map((r) => (
                  <ResultRow key={r.domain} r={r} added={!!added[r.domain]} onAdd={() => addToCart(r)} />
                ))}
              </div>
            </div>
          )}

          {/* Taken */}
          {taken.length > 0 && (
            <div>
              <p className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-muted-foreground">Taken</p>
              <div className="space-y-2">
                {taken.map((r) => (
                  <ResultRow key={r.domain} r={r} added={false} onAdd={() => {}} />
                ))}
              </div>
            </div>
          )}

          {shortlistCount > 0 && (
            <div className="flex items-center justify-between rounded-lg border bg-card px-3 py-2 text-sm">
              <span className="font-mono text-muted-foreground">{shortlistCount} domain{shortlistCount > 1 ? "s" : ""} shortlisted</span>
              <Link href="/cart" className="font-medium text-primary hover:underline">View cart →</Link>
            </div>
          )}

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

function ResultRow({
  r,
  added,
  onAdd,
  emphasize = false,
}: {
  r: DomainResult;
  added: boolean;
  onAdd: () => void;
  emphasize?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-4 transition-colors",
        emphasize ? "border-primary/40 ring-1 ring-primary/10" : "hover:border-primary/30",
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        {r.available ? (
          r.premium ? <Sparkles className="h-4 w-4 shrink-0 text-warning" /> : <Check className="h-4 w-4 shrink-0 text-success" />
        ) : (
          <X className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
        <span className={cn("truncate font-mono font-medium", emphasize && "text-base")}>{r.domain}</span>
        {r.premium && (
          <span
            title="Premium domain — priced by the registry, not standard registration."
            className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warning"
          >
            Premium
          </span>
        )}
      </span>

      {r.available ? (
        <span className="flex items-center gap-3">
          <span className="text-right font-mono leading-tight">
            <span className="block text-sm font-semibold tnum">
              {formatPrice(r.price, r.currency)}
              <span className="font-normal text-muted-foreground">/1st yr</span>
              {r.priceEstimated && <span className="ml-1 text-[11px] text-muted-foreground" title="Estimated — confirmed at registration">est.</span>}
            </span>
            <span className="block text-[11px] text-muted-foreground">renews yearly</span>
          </span>
          <Button size="sm" variant={added ? "outline" : "gradient"} onClick={onAdd} disabled={added} className="min-w-[88px]">
            {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingCart className="h-4 w-4" /> Add</>}
          </Button>
        </span>
      ) : (
        <Button size="sm" variant="outline" disabled>Unavailable</Button>
      )}
    </div>
  );
}
