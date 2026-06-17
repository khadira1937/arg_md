"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Server, Activity, Inbox } from "lucide-react";
import { CountUp } from "./count-up";
import { STATUS_META } from "@/components/status/status-meta";
import { regionLatency } from "@/config/infrastructure";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";
import type { ServiceStatus } from "@/lib/status";

type ServiceRow = {
  id: string;
  name: string;
  city: string;
  flag: string;
  status: ServiceStatus;
};

type DashboardPreview = {
  metrics: {
    activeServices: number;
    uptime30: number;
    /** Daily uptime % for the sparkline — slight wobble + dips, not a flat line. */
    uptimeSeries: number[];
    openTickets: number;
  };
  services: ServiceRow[];
};

/**
 * Mock data for the homepage dashboard preview. Everything the section renders
 * comes from here.
 *
 * // TODO: swap with real data source — fetch the signed-in account's services
 * // and metrics from your control-plane API and map them into this shape.
 */
function getDashboardPreview(): DashboardPreview {
  return {
    metrics: {
      activeServices: 3,
      uptime30: Number(brand.stats.uptime.replace("%", "")),
      uptimeSeries: [99.98, 100, 99.95, 99.88, 99.9, 100, 99.97, 99.8, 99.93, 100, 99.99, 99.95, 100, 99.96, 99.92, 100],
      openTickets: 0,
    },
    services: [
      { id: "production-web-01", name: "production-web-01", city: "Ashburn", flag: "🇺🇸", status: "operational" },
      { id: "eu-postgres-db", name: "eu-postgres-db", city: "Frankfurt", flag: "🇩🇪", status: "operational" },
      { id: "gpu-inference-node", name: "gpu-inference-node", city: "Singapore", flag: "🇸🇬", status: "operational" },
    ],
  };
}

/** Honest little uptime sparkline built from the series (no chart dependency). */
function Sparkline({ data, animate }: { data: number[]; animate: boolean }) {
  const w = 120;
  const h = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 3 - ((v - min) / range) * (h - 6);
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-8 w-full" aria-hidden="true">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark-fill)" />
      <motion.path
        d={line}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={animate ? { pathLength: 0 } : false}
        whileInView={animate ? { pathLength: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.35 }}
      />
    </svg>
  );
}

/** Pulsing "live" status dot; the ping ring is suppressed under reduced motion. */
function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-2 w-2", className)}>
      <span className="absolute inline-flex h-full w-full rounded-full bg-success/60 animate-ping motion-reduce:hidden" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
    </span>
  );
}

export function DashboardPreview({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { metrics, services } = getDashboardPreview();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: reduce ? 0 : 0.12 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const tiles = [
    { icon: Server, label: "Active services", value: metrics.activeServices, accent: "text-primary", chip: "bg-primary/10 text-primary" },
    { icon: Activity, label: "Uptime (30d)", value: metrics.uptime30, accent: "text-success", chip: "bg-success/10 text-success", suffix: "%", decimals: 1, spark: true },
    { icon: Inbox, label: "Open tickets", value: metrics.openTickets, accent: "text-foreground", chip: "bg-muted text-muted-foreground" },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("overflow-hidden rounded-2xl border bg-card/80 shadow-premium glass", className)}
      role="group"
      aria-label="HostynCloud dashboard preview"
    >
      {/* Console chrome */}
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-destructive/60" />
        <span className="h-3 w-3 rounded-full bg-amber-400/70" />
        <span className="h-3 w-3 rounded-full bg-success/60" />
        <span className="ml-3 flex-1 truncate rounded-md bg-background/70 px-3 py-1 text-xs text-muted-foreground">
          app.{brand.domain}/dashboard
        </span>
        <span className="hidden items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:inline-flex">
          <LiveDot /> Live
        </span>
      </div>

      <div className="p-4 sm:p-5">
        {/* Metric tiles */}
        <div className="grid gap-3 sm:grid-cols-3">
          {tiles.map((t) => (
            <motion.div
              key={t.label}
              variants={item}
              className="group rounded-xl border bg-background/60 p-4 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center gap-2">
                <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg", t.chip)}>
                  <t.icon className="h-3.5 w-3.5" />
                </span>
                <p className="text-xs text-muted-foreground">{t.label}</p>
              </div>
              <p className={cn("mt-2 font-display text-2xl font-bold tabular-nums", t.accent)}>
                <CountUp value={t.value} suffix={t.suffix ?? ""} decimals={t.decimals ?? 0} />
              </p>
              {t.spark && <div className="mt-1"><Sparkline data={metrics.uptimeSeries} animate={!reduce} /></div>}
            </motion.div>
          ))}
        </div>

        {/* Service rows */}
        <ul className="mt-3 space-y-2">
          {services.map((s) => {
            const meta = STATUS_META[s.status];
            const latency = regionLatency(s.city);
            return (
              <motion.li
                key={s.id}
                variants={item}
                className="flex items-center gap-3 rounded-lg border bg-background/40 px-3 py-2.5 text-sm transition-colors hover:border-primary/30 hover:bg-background/70"
              >
                <span className="flex min-w-0 items-center gap-2 font-medium">
                  <LiveDot />
                  <span className="truncate font-mono text-[13px]">{s.name}</span>
                </span>
                <span className="ml-auto hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                  <span aria-hidden="true">{s.flag}</span>
                  {s.city}
                  {latency != null && (
                    <span className="rounded-md bg-muted px-1.5 py-0.5 tabular-nums">~{latency} ms</span>
                  )}
                </span>
                <span className={cn("ml-auto rounded-full px-2 py-0.5 text-xs font-medium sm:ml-0", meta.soft)}>
                  {meta.label}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}
