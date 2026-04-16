"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Download,
  RefreshCw,
  Brain,
  Sparkles,
} from "lucide-react";

type Summary = {
  totalAccess: number;
  todayAccess: number;
  aiBotsToday: number;
  searchBotsToday: number;
  uniqueBots: number;
};

type DailyTrend = {
  date: string;
  search: number;
  ai: number;
  sns: number;
  seo: number;
  other: number;
  total: number;
};

type BotRank = { name: string; tier: string; count: number };
type PageRank = { url: string; count: number };

type AnalyticsData = {
  summary: Summary;
  dailyTrend: DailyTrend[];
  botRanking: BotRank[];
  pageRanking: PageRank[];
};

type AiAnalysis = {
  analysis: string;
  dataSnapshot: {
    totalBots: number;
    totalAiAccess: number;
    totalSearchAccess: number;
    llmsAccess: number;
    period: string;
    analyzedAt: string;
  };
};

const TIER_COLORS: Record<string, string> = {
  search: "#3b82f6",
  ai: "#8b5cf6",
  sns: "#ec4899",
  seo: "#f59e0b",
  other: "#6b7280",
};

const TIER_LABELS: Record<string, string> = {
  search: "検索エンジン",
  ai: "AI検索",
  sns: "SNS",
  seo: "SEOツール",
  other: "その他",
};

const PERIODS = [
  { value: "7", label: "7日" },
  { value: "30", label: "30日" },
  { value: "90", label: "90日" },
  { value: "all", label: "全期間" },
];

const TIERS = [
  { value: "all", label: "全て" },
  { value: "search", label: "検索" },
  { value: "ai", label: "AI" },
  { value: "sns", label: "SNS" },
  { value: "seo", label: "SEO" },
];

export default function BotAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30");
  const [tier, setTier] = useState("all");
  const [aiAnalysis, setAiAnalysis] = useState<AiAnalysis | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/bot-analytics?period=${period}&tier=${tier}`
      );
      if (res.ok) setData(await res.json());
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [period, tier]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExport = () => {
    window.open(
      `/api/admin/bot-analytics?period=${period}&tier=${tier}&format=csv`,
      "_blank"
    );
  };

  const handleAiAnalysis = async () => {
    setAiLoading(true);
    setShowAiPanel(true);
    try {
      const res = await fetch("/api/admin/bot-analytics/ai-analysis", {
        method: "POST",
      });
      if (res.ok) setAiAnalysis(await res.json());
    } catch {
      /* ignore */
    } finally {
      setAiLoading(false);
    }
  };

  const maxDaily =
    data?.dailyTrend.reduce((max, d) => Math.max(max, d.total), 0) || 1;

  return (
    <div>
      {/* ヘッダー */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin"
            className="mb-2 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <ChevronLeft size={14} /> ダッシュボードに戻る
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Bot Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            検索エンジン・AIボットのクロール状況
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAiAnalysis}
            disabled={aiLoading}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-3 py-2 text-sm font-medium text-white shadow transition hover:shadow-md disabled:opacity-50"
            title="AI分析（LLMO効果測定）"
          >
            <Brain size={16} className={aiLoading ? "animate-pulse" : ""} />
            <span className="hidden md:inline">AI分析</span>
          </button>
          <button
            onClick={fetchData}
            className="rounded-lg bg-white p-2 shadow transition hover:shadow-md"
            title="更新"
          >
            <RefreshCw
              size={18}
              className={`text-gray-600 ${loading ? "animate-spin" : ""}`}
            />
          </button>
          <button
            onClick={handleExport}
            className="rounded-lg bg-white p-2 shadow transition hover:shadow-md"
            title="CSVエクスポート"
          >
            <Download size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* フィルター */}
      <div className="mb-6 flex flex-wrap gap-2">
        <div className="flex overflow-hidden rounded-lg bg-white shadow">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-3 py-1.5 text-sm font-medium transition ${
                period === p.value
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="flex overflow-hidden rounded-lg bg-white shadow">
          {TIERS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTier(t.value)}
              className={`px-3 py-1.5 text-sm font-medium transition ${
                tier === t.value
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {loading && !data ? (
        <div className="py-20 text-center text-gray-500">読み込み中...</div>
      ) : !data ? (
        <div className="py-20 text-center text-gray-500">
          データの取得に失敗しました
        </div>
      ) : (
        <>
          {/* サマリーカード */}
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <SummaryCard label="期間合計" value={data.summary.totalAccess} />
            <SummaryCard label="今日" value={data.summary.todayAccess} />
            <SummaryCard
              label="AI検索(今日)"
              value={data.summary.aiBotsToday}
              color="#8b5cf6"
            />
            <SummaryCard label="ボット種類" value={data.summary.uniqueBots} />
          </div>

          {/* 日別推移 */}
          <div className="mb-6 rounded-2xl bg-white p-4 shadow md:p-6">
            <h2 className="mb-4 text-lg font-bold text-gray-900">日別推移</h2>
            {data.dailyTrend.length === 0 ? (
              <p className="py-8 text-center text-gray-500">
                データがありません
              </p>
            ) : (
              <>
                <div className="mb-4 flex flex-wrap gap-3">
                  {Object.entries(TIER_LABELS).map(([key, label]) => (
                    <div
                      key={key}
                      className="flex items-center gap-1.5 text-xs"
                    >
                      <div
                        className="h-3 w-3 rounded"
                        style={{ backgroundColor: TIER_COLORS[key] }}
                      />
                      <span className="text-gray-600">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="max-h-[400px] space-y-1.5 overflow-y-auto">
                  {data.dailyTrend.map((day) => (
                    <div
                      key={day.date}
                      className="flex items-center gap-2 text-xs"
                    >
                      <span className="w-20 flex-shrink-0 text-gray-500">
                        {day.date.slice(5)}
                      </span>
                      <div className="flex h-5 flex-1 overflow-hidden rounded bg-gray-100">
                        {(
                          ["search", "ai", "sns", "seo", "other"] as const
                        ).map((t) => {
                          const val = day[t];
                          if (!val) return null;
                          return (
                            <div
                              key={t}
                              style={{
                                width: `${(val / maxDaily) * 100}%`,
                                backgroundColor: TIER_COLORS[t],
                              }}
                              className="h-full transition-all"
                              title={`${TIER_LABELS[t]}: ${val}`}
                            />
                          );
                        })}
                      </div>
                      <span className="w-8 flex-shrink-0 text-right text-gray-600">
                        {day.total}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ボット別 + ページ別 */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 shadow md:p-6">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                ボット別ランキング
              </h2>
              {data.botRanking.length === 0 ? (
                <p className="py-4 text-center text-gray-500">
                  データがありません
                </p>
              ) : (
                <div className="space-y-2">
                  {data.botRanking.slice(0, 20).map((bot, i) => (
                    <div
                      key={bot.name}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="w-5 text-right text-gray-400">
                        {i + 1}
                      </span>
                      <div
                        className="h-2 w-2 flex-shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            TIER_COLORS[bot.tier] || TIER_COLORS.other,
                        }}
                      />
                      <span className="flex-1 truncate text-gray-800">
                        {bot.name}
                      </span>
                      <span className="font-medium text-gray-600">
                        {bot.count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-white p-4 shadow md:p-6">
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                ページ別クロール頻度
              </h2>
              {data.pageRanking.length === 0 ? (
                <p className="py-4 text-center text-gray-500">
                  データがありません
                </p>
              ) : (
                <div className="space-y-2">
                  {data.pageRanking.slice(0, 20).map((page, i) => (
                    <div
                      key={page.url}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="w-5 text-right text-gray-400">
                        {i + 1}
                      </span>
                      <span className="flex-1 truncate font-mono text-xs text-gray-800">
                        {page.url}
                      </span>
                      <span className="font-medium text-gray-600">
                        {page.count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI分析パネル */}
          {showAiPanel && (
            <div className="mt-6 rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 p-4 shadow-lg md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={20} className="text-purple-600" />
                  <h2 className="text-lg font-bold text-purple-800">
                    LLMO AI分析レポート
                  </h2>
                </div>
                <button
                  onClick={() => setShowAiPanel(false)}
                  className="text-sm text-gray-400 hover:text-gray-600"
                >
                  閉じる
                </button>
              </div>

              {aiLoading ? (
                <div className="py-12 text-center">
                  <Brain
                    size={32}
                    className="mx-auto mb-3 animate-pulse text-purple-500"
                  />
                  <p className="font-medium text-purple-700">
                    AIが90日分のクロールデータを分析中...
                  </p>
                  <p className="mt-1 text-sm text-purple-500">
                    20〜30秒ほどお待ちください
                  </p>
                </div>
              ) : aiAnalysis ? (
                <>
                  <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                    <div className="rounded-xl bg-white/70 p-3">
                      <p className="text-xs text-purple-500">AIボット合計</p>
                      <p className="text-xl font-bold text-purple-700">
                        {aiAnalysis.dataSnapshot.totalAiAccess.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/70 p-3">
                      <p className="text-xs text-blue-500">検索ボット合計</p>
                      <p className="text-xl font-bold text-blue-700">
                        {aiAnalysis.dataSnapshot.totalSearchAccess.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/70 p-3">
                      <p className="text-xs text-green-500">
                        llms.txtアクセス
                      </p>
                      <p className="text-xl font-bold text-green-700">
                        {aiAnalysis.dataSnapshot.llmsAccess.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/70 p-3">
                      <p className="text-xs text-gray-500">分析日時</p>
                      <p className="text-sm font-bold text-gray-700">
                        {new Date(
                          aiAnalysis.dataSnapshot.analyzedAt
                        ).toLocaleString("ja-JP")}
                      </p>
                    </div>
                  </div>
                  <div className="max-h-[600px] overflow-auto rounded-xl bg-white/80 p-4 md:p-6">
                    <MarkdownRenderer content={aiAnalysis.analysis} />
                  </div>
                </>
              ) : (
                <p className="py-8 text-center text-gray-500">
                  分析データの取得に失敗しました
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <p className="text-xs text-gray-500">{label}</p>
      <p
        className="mt-1 text-2xl font-bold"
        style={{ color: color || "#1f2937" }}
      >
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const html = content
    .replace(
      /^## (.*$)/gm,
      '<h2 class="text-xl font-bold text-purple-800 mt-6 mb-3 pb-2 border-b border-purple-200">$1</h2>'
    )
    .replace(
      /^### (.*$)/gm,
      '<h3 class="text-lg font-semibold text-purple-700 mt-4 mb-2">$1</h3>'
    )
    .replace(
      /^# (.*$)/gm,
      '<h1 class="text-2xl font-bold text-purple-900 mb-4">$1</h1>'
    )
    .replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="text-purple-900 font-semibold">$1</strong>'
    )
    .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1 text-gray-700">$1</li>')
    .replace(
      /^\d+\. (.*$)/gm,
      '<li class="ml-4 mb-1 text-gray-700">$1</li>'
    )
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split("|").filter((c) => c.trim());
      if (cells.every((c) => c.trim().match(/^-+$/))) return "";
      return `<tr>${cells.map((c) => `<td class="px-3 py-1.5 border border-purple-100 text-sm">${c.trim()}</td>`).join("")}</tr>`;
    });
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
