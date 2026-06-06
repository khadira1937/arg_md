import { ShieldCheck, RefreshCcw, Headphones, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { icon: Lock, title: "Secure payment", body: "256-bit encrypted checkout via Stripe" },
  { icon: RefreshCcw, title: "30-day guarantee", body: "Money-back on eligible plans" },
  { icon: ShieldCheck, title: "No setup fees", body: "Transparent, all-in pricing" },
  { icon: Headphones, title: "24/7 support", body: "Real engineers, any time" },
];

/** Compact trust signals for conversion points (cart, checkout). */
export function TrustBar({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {ITEMS.map((i) => (
        <div key={i.title} className="flex items-start gap-3 rounded-xl border bg-card p-3">
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
