import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.planPrice.updateMany({
    where: {
      OR: [
        { stripePriceId: { startsWith: "price_placeholder" } },
        { stripeProductId: { startsWith: "prod_placeholder" } },
      ],
    },
    data: {
      stripePriceId: null,
      stripeProductId: null,
    },
  });

  await prisma.product.updateMany({
    where: {
      stripeProductId: { startsWith: "prod_placeholder" },
    },
    data: {
      stripeProductId: null,
    },
  });

  console.log("✅ Cleared placeholder Stripe IDs");
}

main().finally(() => prisma.$disconnect());
