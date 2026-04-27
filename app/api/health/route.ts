import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type CheckResult = {
  name: string;
  status: "ok" | "error" | "skip";
  latencyMs?: number;
  message?: string;
};

/**
 * 軽量ヘルスチェック（外形監視向け）
 * GET /api/health → 200 ok / 503 degraded
 *
 * proxy.ts の matcher で /api/* は素通り。
 */
export async function GET() {
  const startedAt = Date.now();
  const checks: CheckResult[] = [];

  const dbStart = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.push({ name: "database", status: "ok", latencyMs: Date.now() - dbStart });
  } catch (error) {
    checks.push({
      name: "database",
      status: "error",
      latencyMs: Date.now() - dbStart,
      message: error instanceof Error ? error.message.slice(0, 120) : "unknown",
    });
  }

  const requiredEnv = ["DATABASE_URL"];
  const missing = requiredEnv.filter((key) => !process.env[key]);
  checks.push({
    name: "env",
    status: missing.length === 0 ? "ok" : "error",
    message: missing.length > 0 ? `missing: ${missing.join(",")}` : undefined,
  });

  checks.push({
    name: "sentry",
    status: process.env.NEXT_PUBLIC_SENTRY_DSN ? "ok" : "skip",
  });

  const allOk = checks.every((c) => c.status === "ok" || c.status === "skip");
  return NextResponse.json(
    {
      status: allOk ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
      totalLatencyMs: Date.now() - startedAt,
      checks,
    },
    { status: allOk ? 200 : 503 },
  );
}
