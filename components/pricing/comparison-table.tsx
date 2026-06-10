import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Plan = { id: string; name: string; specs: Record<string, string>; popular: boolean };

const SPEC_LABELS: Record<string, string> = {
  cpu: "vCPU / Cores",
  ram: "Memory",
  storage: "Storage",
  bandwidth: "Bandwidth",
  websites: "Websites",
  email: "Email",
  ssl: "SSL",
  backups: "Backups",
  ddos: "DDoS protection",
  uplink: "Network uplink",
  gpu: "GPU",
};

export function ComparisonTable({ plans }: { plans: Plan[] }) {
  if (plans.length < 2) return null;
  const keys = Array.from(new Set(plans.flatMap((p) => Object.keys(p.specs))));
  const orderedKeys = Object.keys(SPEC_LABELS)
    .filter((k) => keys.includes(k))
    .concat(keys.filter((k) => !SPEC_LABELS[k]));

  return (
    <div className="overflow-x-auto rounded-2xl border shadow-sm">
      {/* First column stays put while specs scroll horizontally on mobile. */}
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="sticky left-0 z-10 bg-muted/50 p-4 text-left font-medium text-muted-foreground">
              Specification
            </th>
            {plans.map((p) => (
              <th
                key={p.id}
                className={cn("p-4 text-left font-semibold", p.popular && "text-primary")}
              >
                <span className="inline-flex items-center gap-2">
                  {p.name}
                  {p.popular && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                      Popular
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orderedKeys.map((key, rowIdx) => {
            const zebra = rowIdx % 2 === 0 ? "bg-card" : "bg-muted/10";
            return (
              <tr
                key={key}
                className={cn("group border-b transition-colors last:border-0 hover:bg-primary/[0.03]", zebra)}
              >
                <td
                  className={cn(
                    "sticky left-0 z-10 p-4 font-medium text-muted-foreground transition-colors group-hover:text-foreground",
                    zebra,
                  )}
                >
                  {SPEC_LABELS[key] ?? key}
                </td>
                {plans.map((p) => (
                  <td key={p.id} className={cn("p-4", p.popular && "font-medium")}>
                    {p.specs[key] ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="h-4 w-4 shrink-0 text-success" />
                        <span className="font-mono text-[13px] tabular-nums">{p.specs[key]}</span>
                      </span>
                    ) : (
                      <Minus className="h-4 w-4 text-muted-foreground/40" />
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
