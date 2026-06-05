import type { BillingCycle, ProductType } from "@prisma/client";

/** Term-discount curves applied to the promo monthly rate. */
const MANAGED_CURVE: Record<BillingCycle, number> = {
  MONTHLY: 1,
  QUARTERLY: 0.95,
  SEMIANNUAL: 0.9,
  ANNUAL: 0.75,
  BIENNIAL: 0.6,
};
const INFRA_CURVE: Record<BillingCycle, number> = {
  MONTHLY: 1,
  QUARTERLY: 0.95,
  SEMIANNUAL: 0.92,
  ANNUAL: 0.88,
  BIENNIAL: 0.82,
};
const MONTHS: Record<BillingCycle, number> = {
  MONTHLY: 1,
  QUARTERLY: 3,
  SEMIANNUAL: 6,
  ANNUAL: 12,
  BIENNIAL: 24,
};
const CYCLES: BillingCycle[] = ["MONTHLY", "QUARTERLY", "SEMIANNUAL", "ANNUAL", "BIENNIAL"];

export type PriceRow = {
  billingCycle: BillingCycle;
  amount: number;
  renewalAmount: number;
  setupFee: number;
  discountPercentage: number;
};

/** Build PlanPrice rows from a promo monthly + renewal monthly (in dollars). */
export function priceRows(
  monthly: number,
  renewalMonthly: number,
  model: "managed" | "infra" = "managed",
  setupFeeDollars = 0,
): PriceRow[] {
  const m = Math.round(monthly * 100);
  const r = Math.round(renewalMonthly * 100);
  const curve = model === "managed" ? MANAGED_CURVE : INFRA_CURVE;
  return CYCLES.map((cycle) => {
    const rate = Math.round(m * curve[cycle]);
    const months = MONTHS[cycle];
    const discountPercentage = r > 0 ? Math.max(0, Math.round((1 - rate / r) * 100)) : 0;
    return {
      billingCycle: cycle,
      amount: rate * months,
      renewalAmount: r * months,
      setupFee: cycle === "MONTHLY" ? Math.round(setupFeeDollars * 100) : 0,
      discountPercentage,
    };
  });
}

export type SeedFeature = { label: string; value?: string; included?: boolean; highlight?: boolean };

export type SeedPlan = {
  name: string;
  slug: string;
  popular?: boolean;
  recommended?: boolean;
  onSale?: boolean;
  supportLevel?: string;
  specs: Record<string, string>;
  features?: SeedFeature[];
  prices: PriceRow[];
  addons?: string[];
};

export type SeedProduct = {
  name: string;
  slug: string;
  type: ProductType;
  categorySlug: string;
  providerKey?: string;
  shortDescription: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  featured?: boolean;
  inquiryOnly?: boolean;
  sortOrder?: number;
  seoTitle?: string;
  seoDescription?: string;
  faq?: { question: string; answer: string }[];
  plans: SeedPlan[];
};

/** Turn a specs map into included feature rows + merge explicit features. */
export function featuresFromSpecs(specs: Record<string, string>, extra: SeedFeature[] = []): SeedFeature[] {
  const labels: Record<string, string> = {
    cpu: "vCPU / Cores",
    ram: "Memory",
    storage: "Storage",
    bandwidth: "Bandwidth",
    websites: "Websites",
    email: "Email accounts",
    ssl: "SSL",
    backups: "Backups",
    ddos: "DDoS protection",
    uplink: "Network uplink",
    gpu: "GPU",
  };
  const base: SeedFeature[] = Object.entries(specs).map(([k, v]) => ({
    label: labels[k] ?? k,
    value: v,
    included: true,
  }));
  return [...base, ...extra];
}
