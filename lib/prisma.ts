import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const DATABASE_URL = process.env.DATABASE_URL || "";

/**
 * Supabase + PgBouncer 環境で prepared statement が衝突して
 * PrismaClientUnknownRequestError を起こす既知問題の対策として、
 * `pgbouncer=true` で prepared statement を無効化する。
 *
 * 併せて connection_limit=2, pool_timeout=10 で枯渇も防止。
 */
const baseParams = "pgbouncer=true&connection_limit=2&pool_timeout=10";
const connectionUrl = DATABASE_URL.includes("?")
  ? `${DATABASE_URL}&${baseParams}`
  : `${DATABASE_URL}?${baseParams}`;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: connectionUrl } },
  });

globalForPrisma.prisma = prisma;
