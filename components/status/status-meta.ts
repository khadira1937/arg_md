import { CheckCircle2, AlertTriangle, XCircle, type LucideIcon } from "lucide-react";
import type { ServiceStatus } from "@/lib/status";

/** Presentation metadata for a status value. Reuses the site's color tokens. */
export const STATUS_META: Record<
  ServiceStatus,
  { label: string; icon: LucideIcon; text: string; bar: string; dot: string; soft: string; band: string }
> = {
  operational: {
    label: "Operational",
    icon: CheckCircle2,
    text: "text-success",
    bar: "bg-success",
    dot: "bg-success",
    soft: "bg-success/10 text-success",
    band: "bg-success/5",
  },
  degraded: {
    label: "Degraded",
    icon: AlertTriangle,
    text: "text-amber-500",
    bar: "bg-amber-400",
    dot: "bg-amber-400",
    soft: "bg-amber-400/10 text-amber-500",
    band: "bg-amber-400/5",
  },
  down: {
    label: "Down",
    icon: XCircle,
    text: "text-destructive",
    bar: "bg-destructive",
    dot: "bg-destructive",
    soft: "bg-destructive/10 text-destructive",
    band: "bg-destructive/5",
  },
};

export const OVERALL_HEADLINE: Record<ServiceStatus, string> = {
  operational: "All systems operational",
  degraded: "Some systems degraded",
  down: "Major service disruption",
};
