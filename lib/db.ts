import { PrismaClient } from "@prisma/client";

// On Vercel with the Supabase/Postgres integration, the pooled connection string
// is exposed as POSTGRES_PRISMA_URL. Use it as DATABASE_URL (the name the Prisma
// schema reads) when DATABASE_URL is missing OR still points at localhost (a
// leftover local value that can't be reached from Vercel). No-op locally, where
// only DATABASE_URL is set and POSTGRES_PRISMA_URL is absent.
const pooledDbUrl = process.env.POSTGRES_PRISMA_URL;
if (pooledDbUrl && (!process.env.DATABASE_URL || /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL))) {
  process.env.DATABASE_URL = pooledDbUrl;
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
