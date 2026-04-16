import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "../../../../lib/admin-auth";
import { prisma } from "../../../../lib/prisma";

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const searchParams = request.nextUrl.searchParams;
  const days = parseInt(searchParams.get("days") || "30", 10);

  const since = new Date();
  since.setDate(since.getDate() - days);

  // 全ログ取得（期間内）
  const logs = await prisma.aiUsageLog.findMany({
    where: { createdAt: { gte: since } },
    orderBy: { createdAt: "desc" },
  });

  // 日別集計
  const dailyMap = new Map<
    string,
    { date: string; calls: number; cost: number; inputTokens: number; outputTokens: number }
  >();
  for (const log of logs) {
    const date = log.createdAt.toISOString().slice(0, 10);
    const entry = dailyMap.get(date) ?? {
      date,
      calls: 0,
      cost: 0,
      inputTokens: 0,
      outputTokens: 0,
    };
    entry.calls++;
    entry.cost += log.costUsd;
    entry.inputTokens += log.inputTokens;
    entry.outputTokens += log.outputTokens;
    dailyMap.set(date, entry);
  }

  // 機能別集計
  const featureMap = new Map<
    string,
    { feature: string; calls: number; cost: number; errors: number }
  >();
  for (const log of logs) {
    const entry = featureMap.get(log.feature) ?? {
      feature: log.feature,
      calls: 0,
      cost: 0,
      errors: 0,
    };
    entry.calls++;
    entry.cost += log.costUsd;
    if (!log.success) entry.errors++;
    featureMap.set(log.feature, entry);
  }

  // モデル別集計
  const modelMap = new Map<
    string,
    { model: string; calls: number; cost: number; avgDuration: number; totalDuration: number }
  >();
  for (const log of logs) {
    const entry = modelMap.get(log.model) ?? {
      model: log.model,
      calls: 0,
      cost: 0,
      avgDuration: 0,
      totalDuration: 0,
    };
    entry.calls++;
    entry.cost += log.costUsd;
    entry.totalDuration += log.durationMs ?? 0;
    entry.avgDuration = Math.round(entry.totalDuration / entry.calls);
    modelMap.set(log.model, entry);
  }

  const totalCost = logs.reduce((sum, l) => sum + l.costUsd, 0);
  const totalCalls = logs.length;
  const totalErrors = logs.filter((l) => !l.success).length;

  return NextResponse.json({
    summary: {
      totalCost: Math.round(totalCost * 10000) / 10000,
      totalCostJpy: Math.round(totalCost * 150 * 100) / 100, // 概算レート
      totalCalls,
      totalErrors,
      period: `${days}日間`,
    },
    daily: [...dailyMap.values()].sort((a, b) => a.date.localeCompare(b.date)),
    byFeature: [...featureMap.values()].sort((a, b) => b.cost - a.cost),
    byModel: [...modelMap.values()].sort((a, b) => b.cost - a.cost),
    recentLogs: logs.slice(0, 50).map((l) => ({
      id: l.id,
      feature: l.feature,
      model: l.model,
      inputTokens: l.inputTokens,
      outputTokens: l.outputTokens,
      costUsd: Math.round(l.costUsd * 10000) / 10000,
      targetUrl: l.targetUrl,
      durationMs: l.durationMs,
      success: l.success,
      errorMessage: l.errorMessage,
      createdAt: l.createdAt.toISOString(),
    })),
  });
}
