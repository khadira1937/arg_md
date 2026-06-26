import { PrismaClient } from "@prisma/client";

// On Vercel with the Supabase/Postgres integration, the pooled connection string
// is exposed as POSTGRES_PRISMA_URL. Map it to DATABASE_URL (the name the Prisma
// schema reads) before the client is created. No-op locally, where DATABASE_URL
// is already set to the local database.
if (!process.env.DATABASE_URL && process.env.POSTGRES_PRISMA_URL) {
  process.env.DATABASE_URL = process.env.POSTGRES_PRISMA_URL;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
