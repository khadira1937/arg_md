/**
 * Infrastructure marketing copy + per-region latency.
 *
 * Honest framing: we run on leased capacity in enterprise partner facilities —
 * we do NOT claim to own data centers. The authoritative region list lives in
 * the database (serverLocation, seeded in prisma/seed.ts); this file only adds
 * the marketing copy and display latency that isn't stored there.
 */

export const infrastructure = {
  headline: "Enterprise-grade partner infrastructure",
  // Keep this honest — partner facilities, not owned data centers.
  summary:
    "Built on enterprise-grade Tier III partner data centers across North America, Europe, Asia-Pacific and South America — low-latency hosting on proven infrastructure, without the markup of running our own.",
  badges: [
    "Tier III partner facilities",
    "ISO 27001-certified operators",
    "Redundant power & network",
  ],
} as const;

/**
 * Display latency per region city, in milliseconds (round-trip from a regional
 * peering point). These are illustrative placeholders.
 *
 * // TODO: replace with real data source — feed measured latency from your
 * // monitoring/looking-glass and map by location.
 */
const REGION_LATENCY_MS: Record<string, number> = {
  Ashburn: 11,
  "Los Angeles": 14,
  Frankfurt: 9,
  Amsterdam: 10,
  London: 12,
  Singapore: 15,
  "São Paulo": 22,
  Sydney: 18,
};

/** Latency (ms) for a region city, or null if unknown. */
export function regionLatency(city: string): number | null {
  return REGION_LATENCY_MS[city] ?? null;
}
