import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const DATABASE_URL = process.env.DATABASE_URL || "";
const connectionUrl = DATABASE_URL.includes("?")
  ? `${DATABASE_URL}&connection_limit=2&pool_timeout=10`
  : `${DATABASE_URL}?connection_limit=2&pool_timeout=10`;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: connectionUrl } },
  });

globalForPrisma.prisma = prisma;
