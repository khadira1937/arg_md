"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SERVICE_PACKAGES } from "@/config/marketing";

export function PricingPreview() {
  const [active, setActive] = React.useState(SERVICE_PACKAGES[0].key);
  const group = SERVICE_PACKAGES.find((g) => g.key === active) ?? SERVICE_PACKAGES[0];

  return (
    <div>
      {/* Tabs */}
      <div className="mx-auto flex w-fit flex-wrap justify-center gap-1 rounded-xl border bg-card p-1">
        {SERVICE_PACKAGES.map((g) => (
          <button
            key={g.key}
            type="button"
            onClick={() => setActive(g.key)}
            aria-pressed={active === g.key}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              active === g.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Packages — exactly one "Most popular" per group */}
      <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
        {group.packages.map((p) => (
          <div
            key={p.name}
            className={cn(
              "relative flex flex-col rounded-xl border bg-card p-6",
              p.popular ? "border-primary shadow-[0_0_0_1px_hsl(var(--primary))]" : "",
            )}
          >
            {p.popular && <Badge variant="gradient" className="absolute -top-3 left-6 rounded-md">Most popular</Badge>}
            <h3 className="font-display text-base font-semibold">{p.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{p.bestFor}</p>

            {/* Starting price (mono) — a starting point, not a checkout price */}
            <p className="mt-4 flex items-baseline gap-1 font-mono tnum">
              <span className="text-3xl font-bold tracking-tight">{p.price}</span>
              <span className="text-sm text-muted-foreground">{p.period}</span>
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">final quote agreed with you</p>

            <ul className="mt-5 space-y-2.5 border-t pt-5 text-sm">
              {p.specs.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-success" />
                  <span className="text-[13px] text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-1 flex-col justify-end gap-2">
              <Button asChild variant={p.popular ? "gradient" : "outline"} className="w-full">
                <Link href="/book-a-call">
                  Get a quote <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href={p.href}>Learn more</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Prices are starting points for a quote, not a checkout. We agree a clear, fixed scope and price with you before
        any work begins.
      </p>
    </div>
  );
}
