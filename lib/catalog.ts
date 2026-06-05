import { prisma } from "@/lib/db";
import type { BillingCycle } from "@prisma/client";

export const planInclude = {
  prices: { where: { isActive: true } },
  features: { orderBy: { sortOrder: "asc" } },
  planAddons: { include: { addon: true } },
  locationPrices: { include: { location: true }, where: { isAvailable: true } },
} as const;

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { isActive: true, featured: true },
    orderBy: { sortOrder: "asc" },
    include: { category: true, plans: { where: { isActive: true }, include: { prices: true } } },
  });
}

export async function getAllProducts() {
  return prisma.product.findMany({
    where: { isActive: true },
    orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
    include: { category: true, plans: { where: { isActive: true }, include: { prices: true } } },
  });
}

export async function getCategoriesWithProducts() {
  return prisma.productCategory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      products: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        include: { plans: { where: { isActive: true }, include: { prices: true } } },
      },
    },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      plans: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        include: planInclude,
      },
    },
  });
}

export async function getLocations() {
  return prisma.serverLocation.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
}

/** Lowest monthly-equivalent price (cents) across a product's plans for a cycle. */
export function lowestPrice(
  plans: { prices: { billingCycle: BillingCycle; amount: number }[] }[],
  cycle: BillingCycle = "MONTHLY",
): number | null {
  let min: number | null = null;
  for (const plan of plans) {
    const price = plan.prices.find((p) => p.billingCycle === cycle);
    if (price && (min === null || price.amount < min)) min = price.amount;
  }
  return min;
}

export type ProductWithPlans = Awaited<ReturnType<typeof getProductBySlug>>;
