"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section, SectionHeading } from "@/components/marketing/section";
import { cn } from "@/lib/utils";
import type { StatusReport, UptimeDay } from "@/lib/status";
import { STATUS_META, OVERALL_HEADLINE } from "./status-meta";

const RANGES = [30, 90] as const;
type Range = (typeof RANGES)[number];

/** Vertical bar strip — one bar per day, colored by that day's status. */
function UptimeBars({ history }: { history: UptimeDay[] }) {
  const avg = history.length
    ? (history.reduce((s, d) => s + d.uptime, 0) / history.length).toFixed(2)
    : "100.00";
  return (
    <div>
      <div className="flex items-end gap-[3px]" role="img" aria-label={`Daily uptime for the last ${history.length} days`}>
        {history.map((d, i) => {
          const meta = STATUS_META[d.status];
          // Subtle height variation so dips read visually, full bars stay tall.
          const height = 60 + Math.max(0, Math.min(40, (d.uptime - 98.5) * 26));
          return (
            <motion.span
              key={d.date}
              title={`${d.date} · ${d.uptime.toFixed(2)}% · ${meta.label}`}
              initial={{ opacity: 0, scaleY: 0.4 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.004, 0.4), ease: "easeOut" }}
              style={{ height: `${height}px` }}
              className={cn("w-full min-w-[3px] origin-bottom rounded-sm", meta.bar)}
            />
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{history.length} days ago</span>
        <span className="font-medium text-foreground">{avg}% avg uptime</span>
        <span>Today</span>
      </div>
    </div>
  );
}

export function StatusBoard({ report }: { report: StatusReport }) {
  const [range, setRange] = React.useState<Range>(90);
  const history = report.history.slice(-range);
  const overall = STATUS_META[report.overall];
  const OverallIcon = overall.icon;

  return (
    <>
      {/* Overall banner */}
      <section className={cn("border-b py-12", overall.band)}>
        <div className="container flex flex-col items-center gap-3 text-center">
          <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", overall.soft)}>
            <Activity className="h-6 w-6" />
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {OVERALL_HEADLINE[report.overall]}
          </h1>
          <p className={cn("flex items-center gap-1.5 text-sm font-medium", overall.text)}>
            <OverallIcon className="h-4 w-4" /> {overall.label}
          </p>
          <p className="text-xs text-muted-foreground">
            Updated {new Date(report.updatedAt).toLocaleString()}
          </p>
        </div>
      </section>

      {/* Uptime history */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading center={false} eyebrow="Uptime" title="Availability history" />
          <div className="inline-flex items-center gap-1 rounded-full border bg-muted/50 p-1">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                  range === r ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {r} days
              </button>
            ))}
          </div>
        </div>
        <Card className="mt-6 p-6">
          <UptimeBars history={history} />
        </Card>
      </Section>

      {/* Per-service rows */}
      <Section className="pt-0">
        <SectionHeading center={false} eyebrow="Services" title="Component status" />
        <Card className="mt-6 p-6">
          {report.services.map((s) => {
            const meta = STATUS_META[s.status];
            const Icon = meta.icon;
            return (
              <div key={s.key} className="flex items-center justify-between border-b py-3.5 last:border-0">
                <div className="flex items-center gap-2.5">
                  <span className={cn("h-2 w-2 rounded-full", meta.dot)} />
                  <span className="text-sm font-medium">{s.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden text-xs text-muted-foreground sm:inline">{s.uptime90.toFixed(2)}% (90d)</span>
                  <span className={cn("flex items-center gap-1.5 text-sm", meta.text)}>
                    <Icon className="h-4 w-4" /> {meta.label}
                  </span>
                </div>
              </div>
            );
          })}
        </Card>
      </Section>
    </>
  );
}
