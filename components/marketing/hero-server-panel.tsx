import { Cpu, MemoryStick, HardDrive, Gauge, MapPin, ShieldCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Hosting-specific hero visual: a VPS resource / control-panel card with live
 * resource meters, region and status, plus a domain availability preview.
 * Static markup (no client JS) — crisp and fast.
 */
const RESOURCES = [
  { icon: Cpu, label: "vCPU", value: "4 cores", pct: 38 },
  { icon: MemoryStick, label: "Memory", value: "8 GB RAM", pct: 52 },
  { icon: HardDrive, label: "NVMe storage", value: "160 GB", pct: 27 },
  { icon: Gauge, label: "Bandwidth", value: "8 TB / mo", pct: 19 },
];

export function HeroServerPanel({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-brand-gradient opacity-10 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border bg-card/90 shadow-premium glass">
        {/* Header */}
        <div className="flex items-center gap-3 border-b bg-muted/40 px-5 py-3.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient text-white">
            <Cpu className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-mono text-[13px] font-semibold">vps-prod-01</p>
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPin className="h-3 w-3" /> Frankfurt · EU Central
            </p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success/60 animate-ping motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Online
          </span>
        </div>

        {/* Resource meters */}
        <div className="space-y-3.5 p-5">
          {RESOURCES.map((r) => (
            <div key={r.label}>
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <r.icon className="h-3.5 w-3.5 text-primary" /> {r.label}
                </span>
                <span className="font-medium tabular-nums">{r.value}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${r.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer: SSL + domain availability preview */}
        <div className="space-y-2.5 border-t bg-muted/30 px-5 py-4">
          <div className="flex items-center gap-2 text-[13px]">
            <ShieldCheck className="h-4 w-4 text-success" />
            <span className="font-medium">Free SSL</span>
            <span className="text-muted-foreground">issued &amp; auto-renewing</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border bg-card px-3 py-2 text-[13px]">
            <span className="flex items-center gap-2 font-medium">
              <Check className="h-4 w-4 text-success" /> yourbrand.com
            </span>
            <span className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-success">Available</span>
              <span className="tabular-nums">$12.99<span className="text-muted-foreground">/yr</span></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
