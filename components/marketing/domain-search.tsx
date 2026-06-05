"use client";

import * as React from "react";
import { Search, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TLDS = [
  { tld: ".com", price: 9.99 }, { tld: ".net", price: 12.99 }, { tld: ".io", price: 39.99 },
  { tld: ".dev", price: 14.99 }, { tld: ".co", price: 24.99 }, { tld: ".app", price: 16.99 },
];

/** Demo domain search. Availability is simulated client-side (deterministic). */
export function DomainSearch() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<{ domain: string; price: number; available: boolean }[] | null>(null);
  const [loading, setLoading] = React.useState(false);

  function search(e: React.FormEvent) {
    e.preventDefault();
    const base = query.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!base) return;
    setLoading(true);
    setTimeout(() => {
      setResults(
        TLDS.map((t, i) => ({
          domain: `${base}${t.tld}`,
          price: t.price,
          available: (base.length + i) % 3 !== 0, // deterministic pseudo-availability
        })),
      );
      setLoading(false);
    }, 500);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={search} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find your perfect domain…" className="h-12 pl-11 text-base" />
        </div>
        <Button type="submit" variant="gradient" size="lg" disabled={loading}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Search"}</Button>
      </form>

      {results && (
        <div className="mt-6 space-y-2">
          {results.map((r) => (
            <div key={r.domain} className="flex items-center justify-between rounded-xl border bg-card p-4">
              <span className="flex items-center gap-2 font-medium">
                {r.available ? <Check className="h-4 w-4 text-success" /> : <X className="h-4 w-4 text-muted-foreground" />}
                {r.domain}
              </span>
              {r.available ? (
                <span className="flex items-center gap-3">
                  <span className="text-sm">${r.price.toFixed(2)}<span className="text-muted-foreground">/yr</span></span>
                  <Button size="sm" variant="outline">Add</Button>
                </span>
              ) : (
                <span className="text-sm text-muted-foreground">Taken</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
