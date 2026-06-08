"use client";

import Link from "next/link";
import { CountUp } from "./count-up";
import { cn } from "@/lib/utils";
import type { MarketingStat } from "@/config/stats";

/** Splits "99.9%" → { prefix:"", number:99.9, suffix:"%", decimals:1 }. */
function parseStat(value: string) {
  const m = /^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/.exec(value);
  if (!m) return null;
  const numStr = m[2].replace(/,/g, "");
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix: m[1], number: parseFloat(numStr), suffix: m[3], decimals };
}

function StatValue({ value }: { value: string }) {
  const parsed = parseStat(value);
  if (!parsed) return <>{value}</>;
  return (
    <CountUp
      value={parsed.number}
      prefix={parsed.prefix}
      suffix={parsed.suffix}
      decimals={parsed.decimals}
    />
  );
}

export function StatsStrip({ stats, className, variant = "card" }: { stats: MarketingStat[]; className?: string; variant?: "card" | "plain" }) {
  return (
    <div className={cn("grid gap-4", stats.length === 3 ? "sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4", className)}>
      {stats.map((s) => {
        const inner = (
          <>
            <p className="font-display text-2xl font-bold text-gradient sm:text-3xl">
              <StatValue value={s.value} />
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {s.label}
              {s.sub && <span className="text-primary"> · {s.sub}</span>}
            </p>
          </>
        );
        if (variant === "plain") {
          return (
            <div key={s.label} className="text-center">
              {s.href ? <Link href={s.href} className="block transition-opacity hover:opacity-80">{inner}</Link> : inner}
            </div>
          );
        }
        const card = "rounded-2xl border bg-card/60 p-5 text-center backdrop-blur transition-colors hover:border-primary/40";
        return s.href ? (
          <Link key={s.label} href={s.href} className={card}>{inner}</Link>
        ) : (
          <div key={s.label} className={card}>{inner}</div>
        );
      })}
    </div>
  );
}
