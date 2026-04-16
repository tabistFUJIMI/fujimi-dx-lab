import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const endOfYesterday = new Date(yesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    // 前日の生ログを集約
    const grouped = await prisma.botAccessLog.groupBy({
      by: ["botName", "botTier", "url"],
      where: {
        createdAt: { gte: yesterday, lte: endOfYesterday },
      },
      _count: { id: true },
    });

    // 日別サマリーにUPSERT
    for (const row of grouped) {
      await prisma.botDailyStats.upsert({
        where: {
          date_botName_url: {
            date: yesterday,
            botName: row.botName,
            url: row.url,
          },
        },
        update: { accessCount: row._count.id, botTier: row.botTier },
        create: {
          date: yesterday,
          botName: row.botName,
          botTier: row.botTier,
          url: row.url,
          accessCount: row._count.id,
        },
      });
    }

    // 90日以上前の生ログを削除
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 90);
    const deleted = await prisma.botAccessLog.deleteMany({
      where: { createdAt: { lt: cutoff } },
    });

    return NextResponse.json({
      aggregated: grouped.length,
      deletedOldLogs: deleted.count,
      date: yesterday.toISOString().split("T")[0],
    });
  } catch (e) {
    console.error("Bot stats cron error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
