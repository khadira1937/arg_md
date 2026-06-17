"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PRICING_PREVIEW } from "@/config/marketing";

export function PricingPreview() {
  const [active, setActive] = React.useState(PRICING_PREVIEW[0].key);
  const group = PRICING_PREVIEW.find((g) => g.key === active) ?? PRICING_PREVIEW[0];

  return (
    <div>
      {/* Tabs */}
      <div className="mx-auto flex w-fit flex-wrap justify-center gap-1 rounded-full border bg-card p-1">
        {PRICING_PREVIEW.map((g) => (
          <button
            key={g.key}
            type="button"
            onClick={() => setActive(g.key)}
            aria-pressed={active === g.key}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active === g.key ? "bg-brand-gradient text-white shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Plans */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {group.plans.map((p) => (
          <div
            key={p.name}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-card p-6",
              p.popular ? "border-primary/50 shadow-glow" : "",
            )}
          >
            {p.popular && (
              <Badge variant="gradient" className="absolute -top-3 left-6">Most popular</Badge>
            )}
            <h3 className="text-base font-semibold">{p.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{p.bestFor}</p>
            <p className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">{p.price}</span>
              <span className="text-sm text-muted-foreground">{p.period}</span>
            </p>
            <ul className="mt-5 space-y-2.5 border-t pt-5 text-sm">
              {p.specs.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-success" />
                  <span className="text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-1 flex-col justify-end">
              {p.renewalNote && <p className="mb-3 text-xs text-muted-foreground">{p.renewalNote}</p>}
              <Button asChild variant={p.popular ? "gradient" : "outline"} className="w-full">
                <Link href={p.href}>
                  Choose {p.name} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Starting prices shown. Exact, configurable pricing and renewal terms are confirmed on each product page and at
        secure Stripe checkout.
      </p>
    </div>
  );
}
