import { ShieldCheck, CreditCard, Zap, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Honest, defensible trust signals for conversion points (cart, checkout). */
const ITEMS = [
  { icon: CreditCard, title: "Secure checkout", body: "Payments processed by Stripe" },
  { icon: ShieldCheck, title: "", body: "ARGANA MEDIA" },
  { icon: Zap, title: "Clear, fixed quotes", body: "Agreed before work begins" },
  { icon: LifeBuoy, title: "Dedicated support", body: "Help via your client portal" },
];

export function TrustBar({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {ITEMS.map((i) => (
        <div
          key={i.title}
          className="flex items-start gap-3 rounded-xl border bg-card p-3.5 transition-colors hover:border-primary/30"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <i.icon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-medium leading-tight">{i.title}</p>
            <p className="text-xs text-muted-foreground">{i.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
