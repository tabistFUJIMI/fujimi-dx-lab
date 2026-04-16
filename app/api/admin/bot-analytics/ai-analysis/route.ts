import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

const anthropic = new Anthropic();

export async function POST() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const since = new Date();
    since.setDate(since.getDate() - 90);
    since.setHours(0, 0, 0, 0);

    const dailyStats = await prisma.botDailyStats.findMany({
      where: { date: { gte: since } },
      orderBy: { date: "asc" },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayLogs = await prisma.botAccessLog.findMany({
      where: { createdAt: { gte: today } },
    });

    const aiStats = dailyStats.filter((s) => s.botTier === "ai");
    const searchStats = dailyStats.filter((s) => s.botTier === "search");

    // ボット別集計
    const botSummary: Record<string, { tier: string; total: number; pages: Record<string, number>; firstSeen: string; lastSeen: string }> = {};
    for (const stat of dailyStats) {
      if (!botSummary[stat.botName]) {
        botSummary[stat.botName] = {
          tier: stat.botTier, total: 0, pages: {},
          firstSeen: stat.date.toISOString().split("T")[0],
          lastSeen: stat.date.toISOString().split("T")[0],
        };
      }
      const bot = botSummary[stat.botName];
      bot.total += stat.accessCount;
      bot.pages[stat.url] = (bot.pages[stat.url] || 0) + stat.accessCount;
      const dateStr = stat.date.toISOString().split("T")[0];
      if (dateStr < bot.firstSeen) bot.firstSeen = dateStr;
      if (dateStr > bot.lastSeen) bot.lastSeen = dateStr;
    }

    // ページ別・ティア別
    const pageTierMap: Record<string, Record<string, number>> = {};
    for (const stat of dailyStats) {
      if (!pageTierMap[stat.url]) {
        pageTierMap[stat.url] = { search: 0, ai: 0, sns: 0, seo: 0, other: 0 };
      }
      pageTierMap[stat.url][stat.botTier] += stat.accessCount;
    }

    // 週別トレンド
    const weeklyTrend: Record<string, { ai: number; search: number }> = {};
    for (const stat of [...aiStats, ...searchStats]) {
      const d = stat.date;
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      const weekKey = weekStart.toISOString().split("T")[0];
      if (!weeklyTrend[weekKey]) weeklyTrend[weekKey] = { ai: 0, search: 0 };
      weeklyTrend[weekKey][stat.botTier as "ai" | "search"] += stat.accessCount;
    }

    const llmsAccess = dailyStats.filter((s) => s.url === "/llms.txt");
    const llmsTodayAccess = todayLogs.filter((l) => l.url === "/llms.txt");

    const analyticsPayload = {
      period: "90日間",
      totalRecords: dailyStats.length,
      todayLogs: todayLogs.length,
      botSummary: Object.entries(botSummary)
        .sort((a, b) => b[1].total - a[1].total)
        .map(([name, data]) => ({
          name, tier: data.tier, total: data.total,
          topPages: Object.entries(data.pages).sort((a, b) => b[1] - a[1]).slice(0, 5),
          firstSeen: data.firstSeen, lastSeen: data.lastSeen,
        })),
      pageCrawlByTier: Object.entries(pageTierMap)
        .sort((a, b) => (b[1].ai + b[1].search) - (a[1].ai + a[1].search))
        .slice(0, 30)
        .map(([url, tiers]) => ({ url, ...tiers })),
      weeklyAiVsSearch: Object.entries(weeklyTrend)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([week, data]) => ({ week, ...data })),
      llmsAccess: {
        total: llmsAccess.reduce((sum, s) => sum + s.accessCount, 0) + llmsTodayAccess.length,
        byBot: llmsAccess.reduce((acc, s) => {
          acc[s.botName] = (acc[s.botName] || 0) + s.accessCount;
          return acc;
        }, {} as Record<string, number>),
      },
    };

    const prompt = `あなたはLLMO（Large Language Model Optimization）の専門アナリストです。
以下は「FUJIMI DX Lab」（小規模事業者向けDXプラットフォーム）のWebサイトのAIクローラー・検索エンジンボットのアクセスデータです。

## サイト概要
- ドメイン: fujimi-dx-lab.com（Next.js 16 + Vercel）
- 業態: SaaS / DXプラットフォーム
- 主要サービス: FUJIMIN PASS（統合DXプラットフォーム）、各種Naviアプリ
- 特徴: AI対策チェッカー（無料ツール）、GEO/LLMOコラム記事
- LLMO施策: llms.txt設置、構造化データ（JSON-LD）、FAQ充実、AI検索ボット全許可（robots.txt）

## ボットアクセスデータ（過去90日間）
${JSON.stringify(analyticsPayload, null, 2)}

以下の構成で徹底的に分析してください。

## 1. AIクローラー行動分析
- どのAIボットが来ているか、頻度とトレンド
- 各AIボットの巡回パターン（どのページを重点的に見ているか）
- llms.txtへのアクセス状況と、読んでいるボットの特定
- 検索エンジンボットとAIボットのクロール比率の推移

## 2. ページ別LLMO効果分析
- AIボットに最もクロールされているページTOP10とその理由の推測
- クロールされていないが重要なページの特定
- コラム記事(/column)のクロール頻度評価
- llms.txt、sitemap.xml、robots.txtの被アクセス状況

## 3. LLMO施策の効果評価
- 現在のLLMO施策の効果を数値で評価
- AI検索（ChatGPT, Perplexity, Claude等）に引用される可能性の評価
- AI対策チェッカー(/tools/ai-checker)がSEO/LLMOに与える影響

## 4. 改善提案（優先度順・5〜7個）
各提案に以下を含める：
- 具体的な施策内容
- 期待される効果
- 実装難易度（低/中/高）

## 5. 重要な発見・インサイト

## 6. 次の30日間で追跡すべきKPI（3つ）

マークダウン形式、日本語で。数値は**太字**で強調してください。`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({
      analysis: text,
      dataSnapshot: {
        totalBots: Object.keys(botSummary).length,
        totalAiAccess: aiStats.reduce((sum, s) => sum + s.accessCount, 0),
        totalSearchAccess: searchStats.reduce((sum, s) => sum + s.accessCount, 0),
        llmsAccess: analyticsPayload.llmsAccess.total,
        period: "90日間",
        analyzedAt: new Date().toISOString(),
      },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error("LLMO AI Analysis error:", e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
