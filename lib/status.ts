/**
 * Single source of truth for the public status page.
 *
 * Everything the /status page renders comes from `fetchStatus()`. To go live,
 * replace ONLY the body of `fetchStatus()` with a real monitor/API call (e.g.
 * UptimeRobot, Better Stack, Statuspage) that returns the same `StatusReport`
 * shape — no component or page changes are required.
 */

export type ServiceStatus = "operational" | "degraded" | "down";

export interface ServiceState {
  /** Stable key for the service (use as React key / API id). */
  key: string;
  name: string;
  status: ServiceStatus;
  /** Rolling 90-day availability as a percentage, e.g. 99.94. */
  uptime90: number;
}

export interface UptimeDay {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Availability for that day as a percentage 0–100. */
  uptime: number;
  status: ServiceStatus;
}

export interface StatusReport {
  overall: ServiceStatus;
  /** ISO timestamp the report was generated. */
  updatedAt: string;
  services: ServiceState[];
  /** Daily uptime, oldest → newest, up to 90 entries. */
  history: UptimeDay[];
}

/** The services we publish status for. Edit here to add/remove rows. */
const SERVICES = [
  { key: "web", name: "Web Hosting" },
  { key: "vps", name: "VPS" },
  { key: "dedicated", name: "Dedicated" },
  { key: "gpu", name: "GPU" },
  { key: "api", name: "API" },
] as const;

/**
 * A few realistic historical incidents (days ago → that day's availability).
 * Keeps the timeline honest instead of a suspiciously perfect green line.
 */
const INCIDENTS: Record<number, number> = {
  11: 99.21, // brief network blip
  38: 98.74, // partial degradation during maintenance window
  63: 99.62, // short API latency incident
};

function uptimeToStatus(uptime: number): ServiceStatus {
  if (uptime >= 99.9) return "operational";
  if (uptime >= 99.0) return "degraded";
  return "down";
}

/**
 * Build 90 days of mostly-operational daily uptime, oldest first.
 * Deterministic (no Math.random) so server renders stay stable.
 */
function buildHistory(days = 90): UptimeDay[] {
  const today = new Date();
  const out: UptimeDay[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(today.getUTCDate() - i);
    const iso = d.toISOString().slice(0, 10);
    // Baseline hovers just under perfect with a gentle deterministic wobble.
    const wobble = ((i * 37) % 5) * 0.01; // 0.00–0.04
    const uptime = INCIDENTS[i] ?? Number((99.96 - wobble).toFixed(2));
    out.push({ date: iso, uptime, status: uptimeToStatus(uptime) });
  }
  return out;
}

function average(nums: number[]): number {
  if (nums.length === 0) return 100;
  return Number((nums.reduce((s, n) => s + n, 0) / nums.length).toFixed(2));
}

/**
 * Returns the current status report.
 *
 * // TODO: replace with real data source — swap the mock below for a call to
 * // your uptime monitor and map its response into a `StatusReport`.
 */
export async function fetchStatus(): Promise<StatusReport> {
  const history = buildHistory(90);
  const overallUptime = average(history.map((h) => h.uptime));

  // Give each service a small, stable offset so they aren't identical.
  const services: ServiceState[] = SERVICES.map((s, idx) => {
    const offset = (idx % 3) * 0.03;
    const uptime90 = Number((overallUptime - offset).toFixed(2));
    return { key: s.key, name: s.name, status: uptimeToStatus(uptime90), uptime90 };
  });

  const overall: ServiceStatus = services.some((s) => s.status === "down")
    ? "down"
    : services.some((s) => s.status === "degraded")
      ? "degraded"
      : "operational";

  return {
    overall,
    updatedAt: new Date().toISOString(),
    services,
    history,
  };
}
