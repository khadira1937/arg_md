import { Check, Minus } from "lucide-react";

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
  const orderedKeys = Object.keys(SPEC_LABELS).filter((k) => keys.includes(k)).concat(keys.filter((k) => !SPEC_LABELS[k]));

  return (
    <div className="overflow-x-auto rounded-2xl border">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="p-4 text-left font-medium text-muted-foreground">Specification</th>
            {plans.map((p) => (
              <th key={p.id} className="p-4 text-left font-semibold">
                {p.name}
                {p.popular && <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">POPULAR</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orderedKeys.map((key) => (
            <tr key={key} className="border-b last:border-0">
              <td className="p-4 font-medium text-muted-foreground">{SPEC_LABELS[key] ?? key}</td>
              {plans.map((p) => (
                <td key={p.id} className="p-4">
                  {p.specs[key] ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-success" /> {p.specs[key]}
                    </span>
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground/40" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
