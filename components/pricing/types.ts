import type { BillingCycle } from "@prisma/client";

export type ClientPrice = {
  billingCycle: BillingCycle;
  amount: number;
  renewalAmount: number;
  setupFee: number;
  discountPercentage: number;
};

export type ClientFeature = {
  label: string;
  value?: string | null;
  included: boolean;
  highlight: boolean;
};

export type ClientAddon = {
  id: string;
  name: string;
  amount: number;
  billingType: "ONE_TIME" | "RECURRING";
};

export type ClientPlan = {
  id: string;
  name: string;
  slug: string;
  popular: boolean;
  recommended: boolean;
  onSale: boolean;
  supportLevel?: string | null;
  specs: Record<string, string>;
  features: ClientFeature[];
  prices: ClientPrice[];
  addons: ClientAddon[];
};

export type ClientLocation = {
  id: string;
  name: string;
  city: string;
  region: string;
  flagEmoji?: string | null;
};
