"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { BillingCycle } from "@prisma/client";
import { Check, Loader2, Sparkles, MapPin, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  formatMoney,
  effectiveMonthly,
  savingsPercent,
  CYCLE_LABEL,
  CYCLE_MONTHS,
} from "@/lib/pricing";
import { addToCartAction } from "@/app/actions/cart";
import type { ClientPlan, ClientLocation } from "./types";

const CYCLE_ORDER: BillingCycle[] = ["MONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL", "BIENNIAL"];

export function PricingSection({
  plans,
  locations,
  inquiryOnly,
  productSlug,
}: {
  plans: ClientPlan[];
  locations: ClientLocation[];
  inquiryOnly?: boolean;
  productSlug: string;
}) {
  const router = useRouter();
  const availableCycles = React.useMemo(() => {
    const set = new Set<BillingCycle>();
    plans.forEach((p) => p.prices.forEach((pr) => set.add(pr.billingCycle)));
    return CYCLE_ORDER.filter((c) => set.has(c));
  }, [plans]);

  const [cycle, setCycle] = React.useState<BillingCycle>(
    availableCycles.includes("ANNUAL") ? "ANNUAL" : availableCycles[0] ?? "MONTHLY",
  );
  const [locationId, setLocationId] = React.useState<string | undefined>(locations[0]?.id);
  const [pending, setPending] = React.useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = React.useState<Record<string, Set<string>>>({});
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const toggleAddon = (planId: string, addonId: string) => {
    setSelectedAddons((prev) => {
      const next = new Set(prev[planId] ?? []);
      next.has(addonId) ? next.delete(addonId) : next.add(addonId);
      return { ...prev, [planId]: next };
    });
  };

  async function handleAdd(plan: ClientPlan) {
    setPending(plan.id);
    const res = await addToCartAction({
      planId: plan.id,
      billingCycle: cycle,
      locationId: locations.length ? locationId : null,
      quantity: 1,
      addonIds: Array.from(selectedAddons[plan.id] ?? []),
    });
    setPending(null);
    if (res.ok) router.push("/cart");
    else alert(res.error);
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col items-center gap-5">
        <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border bg-muted/50 p-1">
          {availableCycles.map((c) => {
            const isAnnualPlus = CYCLE_MONTHS[c] >= 12;
            return (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                  cycle === c ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {CYCLE_LABEL[c]}
                {isAnnualPlus && cycle !== c && (
                  <span className="ml-1 hidden text-[10px] font-bold text-success sm:inline">save</span>
                )}
              </button>
            );
          })}
        </div>

        {locations.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="rounded-lg border bg-background px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.flagEmoji} {l.city} — {l.region}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Cards */}
      <div
        className={cn(
          "mt-12 grid gap-6",
          plans.length >= 4 ? "lg:grid-cols-4" : plans.length === 3 ? "lg:grid-cols-3" : "sm:grid-cols-2",
          "sm:grid-cols-2",
        )}
      >
        {plans.map((plan) => {
          const price = plan.prices.find((p) => p.billingCycle === cycle) ?? plan.prices[0];
          if (!price) return null;
          const perMonth = effectiveMonthly(price.amount, price.billingCycle);
          const renewalMonth = effectiveMonthly(price.renewalAmount, price.billingCycle);
          const save = savingsPercent(perMonth, renewalMonth);
          const isOpen = expanded[plan.id];
          const planAddons = plan.addons;

          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all",
                plan.popular ? "border-primary/50 shadow-lg shadow-primary/10 ring-1 ring-primary/20" : "hover:border-primary/30",
              )}
            >
              {plan.popular && (
                <Badge variant="gradient" className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1">
                  <Sparkles className="h-3 w-3" /> Most popular
                </Badge>
              )}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                {plan.recommended && <Badge variant="success">Recommended</Badge>}
                {plan.onSale && <Badge variant="warning">Sale</Badge>}
              </div>
              {plan.supportLevel && <p className="mt-1 text-xs text-muted-foreground">{plan.supportLevel} support</p>}

              <div className="mt-5">
                {inquiryOnly ? (
                  <p className="text-2xl font-bold">Custom</p>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold">{formatMoney(perMonth)}</span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                    {save > 0 && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        <span className="text-success font-semibold">Save {save}%</span> · renews at{" "}
                        {formatMoney(renewalMonth)}/mo
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      Billed {formatMoney(price.amount)} {CYCLE_LABEL[price.billingCycle].toLowerCase()}
                      {price.setupFee > 0 && ` · ${formatMoney(price.setupFee)} setup`}
                    </p>
                  </>
                )}
              </div>

              {inquiryOnly ? (
                <Button asChild variant="gradient" className="mt-5 w-full">
                  <Link href={`/contact?product=${productSlug}`}>Contact sales</Link>
                </Button>
              ) : (
                <Button
                  variant={plan.popular ? "gradient" : "default"}
                  className="mt-5 w-full"
                  disabled={pending === plan.id}
                  onClick={() => handleAdd(plan)}
                >
                  {pending === plan.id ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to cart"}
                </Button>
              )}

              <ul className="mt-6 space-y-2.5 text-sm">
                {plan.features.map((f, i) => (
                  <li key={i} className={cn("flex items-start gap-2", !f.included && "opacity-40")}>
                    <Check className={cn("mt-0.5 h-4 w-4 shrink-0", f.highlight ? "text-primary" : "text-success")} />
                    <span>
                      {f.value ? <span className="font-medium">{f.value}</span> : null} {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              {planAddons.length > 0 && !inquiryOnly && (
                <div className="mt-5 border-t pt-4">
                  <button
                    onClick={() => setExpanded((e) => ({ ...e, [plan.id]: !e[plan.id] }))}
                    className="flex w-full items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Add-ons ({planAddons.length})
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </button>
                  {isOpen && (
                    <div className="mt-3 space-y-2">
                      {planAddons.map((a) => {
                        const checked = selectedAddons[plan.id]?.has(a.id) ?? false;
                        return (
                          <label key={a.id} className="flex cursor-pointer items-center justify-between gap-2 text-sm">
                            <span className="flex items-center gap-2">
                              <input type="checkbox" checked={checked} onChange={() => toggleAddon(plan.id, a.id)} className="h-4 w-4 rounded border-input" />
                              {a.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              +{formatMoney(a.amount)}{a.billingType === "RECURRING" ? "/mo" : ""}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
