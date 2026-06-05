import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, icon: Icon, hint }: { label: string; value: string | number; icon: LucideIcon; hint?: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" /></span>
      </div>
      <p className="mt-3 font-display text-3xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </Card>
  );
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: { icon: LucideIcon; title: string; description?: string; actionLabel?: string; actionHref?: string }) {
  return (
    <Card className="flex flex-col items-center justify-center p-12 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground"><Icon className="h-7 w-7" /></span>
      <h3 className="mt-4 font-semibold">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {actionLabel && actionHref && (
        <Button asChild variant="gradient" className="mt-5"><Link href={actionHref}>{actionLabel}</Link></Button>
      )}
    </Card>
  );
}

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-success/15 text-success",
  PAID: "bg-success/15 text-success",
  SUCCEEDED: "bg-success/15 text-success",
  PENDING: "bg-amber-500/15 text-amber-600",
  PROVISIONING: "bg-amber-500/15 text-amber-600",
  OPEN: "bg-amber-500/15 text-amber-600",
  PROCESSING: "bg-blue-500/15 text-blue-600",
  DRAFT: "bg-muted text-muted-foreground",
  SUSPENDED: "bg-destructive/15 text-destructive",
  FAILED: "bg-destructive/15 text-destructive",
  CANCELLED: "bg-muted text-muted-foreground",
  CANCELED: "bg-muted text-muted-foreground",
  REFUNDED: "bg-muted text-muted-foreground",
  EXPIRED: "bg-muted text-muted-foreground",
  VOID: "bg-muted text-muted-foreground",
};

/** Empty-row fallback for admin tables so they never render as a blank box. */
export function TableEmpty({ colSpan, label }: { colSpan: number; label: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="p-10 text-center text-sm text-muted-foreground">{label}</td>
    </tr>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize", STATUS_STYLES[status] ?? "bg-muted text-muted-foreground")}>
      {status.toLowerCase()}
    </span>
  );
}
