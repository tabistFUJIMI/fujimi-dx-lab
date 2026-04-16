import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { searchParams } = req.nextUrl;
  const period = searchParams.get("period") || "30";
  const tier = searchParams.get("tier") || "all";
  const format = searchParams.get("format");

  const days = period === "all" ? 3650 : parseInt(period) || 30;
  const since = new Date();
  since.setDate(since.getDate() - days);
  since.setHours(0, 0, 0, 0);

  const tierFilter = tier !== "all" ? { botTier: tier } : {};

  try {
    const dailyStats = await prisma.botDailyStats.findMany({
      where: { date: { gte: since }, ...tierFilter },
      orderBy: { date: "desc" },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayLogs = await prisma.botAccessLog.findMany({
      where: { createdAt: { gte: today }, ...tierFilter },
      orderBy: { createdAt: "desc" },
    });

    const summary = {
      totalAccess:
        dailyStats.reduce((sum, s) => sum + s.accessCount, 0) +
        todayLogs.length,
      todayAccess: todayLogs.length,
      aiBotsToday: todayLogs.filter((l) => l.botTier === "ai").length,
      searchBotsToday: todayLogs.filter((l) => l.botTier === "search").length,
      uniqueBots: new Set([
        ...dailyStats.map((s) => s.botName),
        ...todayLogs.map((l) => l.botName),
      ]).size,
    };

    const dailyMap = new Map<string, Record<string, number>>();
    for (const stat of dailyStats) {
      const dateKey = stat.date.toISOString().split("T")[0];
      if (!dailyMap.has(dateKey)) {
        dailyMap.set(dateKey, {
          search: 0, ai: 0, sns: 0, seo: 0, other: 0, total: 0,
        });
      }
      const entry = dailyMap.get(dateKey)!;
      entry[stat.botTier] = (entry[stat.botTier] || 0) + stat.accessCount;
      entry.total += stat.accessCount;
    }

    const todayKey = new Date().toISOString().split("T")[0];
    if (todayLogs.length > 0) {
      const todayEntry = { search: 0, ai: 0, sns: 0, seo: 0, other: 0, total: 0 };
      for (const log of todayLogs) {
        todayEntry[log.botTier as keyof typeof todayEntry] =
          (todayEntry[log.botTier as keyof typeof todayEntry] || 0) + 1;
        todayEntry.total++;
      }
      dailyMap.set(todayKey, todayEntry);
    }

    const dailyTrend = Array.from(dailyMap.entries())
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const botRankMap = new Map<string, { tier: string; count: number }>();
    for (const stat of dailyStats) {
      const existing = botRankMap.get(stat.botName);
      if (existing) existing.count += stat.accessCount;
      else botRankMap.set(stat.botName, { tier: stat.botTier, count: stat.accessCount });
    }
    for (const log of todayLogs) {
      const existing = botRankMap.get(log.botName);
      if (existing) existing.count++;
      else botRankMap.set(log.botName, { tier: log.botTier, count: 1 });
    }
    const botRanking = Array.from(botRankMap.entries())
      .map(([name, data]) => ({ name, tier: data.tier, count: data.count }))
      .sort((a, b) => b.count - a.count);

    const pageMap = new Map<string, number>();
    for (const stat of dailyStats) {
      pageMap.set(stat.url, (pageMap.get(stat.url) || 0) + stat.accessCount);
    }
    for (const log of todayLogs) {
      pageMap.set(log.url, (pageMap.get(log.url) || 0) + 1);
    }
    const pageRanking = Array.from(pageMap.entries())
      .map(([url, count]) => ({ url, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 30);

    if (format === "csv") {
      const csvRows = ["date,botName,botTier,url,accessCount"];
      for (const stat of dailyStats) {
        csvRows.push(
          `${stat.date.toISOString().split("T")[0]},${stat.botName},${stat.botTier},${stat.url},${stat.accessCount}`
        );
      }
      return new Response(csvRows.join("\n"), {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="bot-analytics-${days}d.csv"`,
        },
      });
    }

    return Response.json({ summary, dailyTrend, botRanking, pageRanking });
  } catch (error) {
    console.error("Bot analytics error:", error);
    return Response.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
