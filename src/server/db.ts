import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalDb = globalThis as unknown as { prisma?: PrismaClient };

/** Lazy initialization keeps sample pages and builds independent of PostgreSQL. */
export function getDb(): PrismaClient {
  if (globalDb.prisma) return globalDb.prisma;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString)
    throw new Error("DATABASE_URL is required for database operations.");
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });
  globalDb.prisma = prisma;
  return prisma;
}
