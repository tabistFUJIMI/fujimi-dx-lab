"use client";

import { useState, useEffect, useCallback } from "react";

interface Summary {
  totalCost: number;
  totalCostJpy: number;
  totalCalls: number;
  totalErrors: number;
  period: string;
}

interface DailyData {
  date: string;
  calls: number;
  cost: number;
  inputTokens: number;
  outputTokens: number;
}

interface FeatureData {
  feature: string;
  calls: number;
  cost: number;
  errors: number;
}

interface ModelData {
  model: string;
  calls: number;
  cost: number;
  avgDuration: number;
}

interface LogEntry {
  id: string;
  feature: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  targetUrl: string | null;
  durationMs: number | null;
  success: boolean;
  errorMessage: string | null;
  createdAt: string;
}

interface CostData {
  summary: Summary;
  daily: DailyData[];
  byFeature: FeatureData[];
  byModel: ModelData[];
  recentLogs: LogEntry[];
}

const FEATURE_LABELS: Record<string, string> = {
  "geo-checker": "AI対策チェッカー",
  analytics: "アクセス解析AI",
};

const MODEL_LABELS: Record<string, string> = {
  "claude-haiku-4-5-20251001": "Haiku 4.5",
  "claude-sonnet-4-6": "Sonnet 4.6",
  "claude-opus-4-6": "Opus 4.6",
};

export default function AiCostsPage() {
  const [data, setData] = useState<CostData | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/ai-costs?days=${days}`);
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      </div>
    );
  }

  if (!data) {
    return <p className="py-10 text-center text-gray-500">データの取得に失敗しました</p>;
  }

  const { summary, daily, byFeature, byModel, recentLogs } = data;
  const maxDailyCost = Math.max(...daily.map((d) => d.cost), 0.001);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">AIコストモニター</h1>
        <div className="flex gap-2">
          {[7, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                days === d
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {d}日
            </button>
          ))}
        </div>
      </div>

      {/* サマリーカード */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="合計コスト"
          value={`$${summary.totalCost.toFixed(4)}`}
          sub={`約${summary.totalCostJpy.toFixed(0)}円`}
          color="blue"
        />
        <SummaryCard
          label="API呼び出し回数"
          value={`${summary.totalCalls}回`}
          sub={summary.period}
          color="emerald"
        />
        <SummaryCard
          label="エラー"
          value={`${summary.totalErrors}回`}
          sub={
            summary.totalCalls > 0
              ? `成功率 ${Math.round(((summary.totalCalls - summary.totalErrors) / summary.totalCalls) * 100)}%`
              : ""
          }
          color={summary.totalErrors > 0 ? "red" : "emerald"}
        />
        <SummaryCard
          label="1回あたり平均"
          value={
            summary.totalCalls > 0
              ? `$${(summary.totalCost / summary.totalCalls).toFixed(4)}`
              : "-"
          }
          sub={
            summary.totalCalls > 0
              ? `約${((summary.totalCostJpy) / summary.totalCalls).toFixed(1)}円`
              : ""
          }
          color="violet"
        />
      </div>

      {/* 日別コスト推移（バーチャート） */}
      {daily.length > 0 && (
        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-bold text-gray-900">日別コスト推移</h2>
          <div className="flex items-end gap-1" style={{ height: 120 }}>
            {daily.map((d) => (
              <div key={d.date} className="group relative flex-1" title={`${d.date}: $${d.cost.toFixed(4)} (${d.calls}回)`}>
                <div
                  className="mx-auto w-full max-w-[24px] rounded-t bg-blue-400 transition-colors group-hover:bg-blue-600"
                  style={{
                    height: `${Math.max(4, (d.cost / maxDailyCost) * 100)}%`,
                  }}
                />
                {/* ホバー時のツールチップ */}
                <div className="pointer-events-none absolute -top-14 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
                  {d.date.slice(5)}: ${d.cost.toFixed(4)}
                  <br />
                  {d.calls}回
                </div>
              </div>
            ))}
          </div>
          <div className="mt-1 flex justify-between text-xs text-gray-400">
            <span>{daily[0]?.date.slice(5)}</span>
            <span>{daily[daily.length - 1]?.date.slice(5)}</span>
          </div>
        </section>
      )}

      {/* 機能別 / モデル別 */}
      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        {/* 機能別 */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-bold text-gray-900">機能別</h2>
          {byFeature.length === 0 ? (
            <p className="text-sm text-gray-400">データなし</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-gray-400">
                  <th className="pb-2">機能</th>
                  <th className="pb-2 text-right">回数</th>
                  <th className="pb-2 text-right">コスト</th>
                  <th className="pb-2 text-right">エラー</th>
                </tr>
              </thead>
              <tbody>
                {byFeature.map((f) => (
                  <tr key={f.feature} className="border-b border-gray-50">
                    <td className="py-2 font-medium">
                      {FEATURE_LABELS[f.feature] ?? f.feature}
                    </td>
                    <td className="py-2 text-right text-gray-600">{f.calls}</td>
                    <td className="py-2 text-right font-mono text-gray-600">
                      ${f.cost.toFixed(4)}
                    </td>
                    <td className="py-2 text-right">
                      {f.errors > 0 ? (
                        <span className="text-red-500">{f.errors}</span>
                      ) : (
                        <span className="text-gray-300">0</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* モデル別 */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-bold text-gray-900">モデル別</h2>
          {byModel.length === 0 ? (
            <p className="text-sm text-gray-400">データなし</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-gray-400">
                  <th className="pb-2">モデル</th>
                  <th className="pb-2 text-right">回数</th>
                  <th className="pb-2 text-right">コスト</th>
                  <th className="pb-2 text-right">平均応答</th>
                </tr>
              </thead>
              <tbody>
                {byModel.map((m) => (
                  <tr key={m.model} className="border-b border-gray-50">
                    <td className="py-2 font-medium">
                      {MODEL_LABELS[m.model] ?? m.model}
                    </td>
                    <td className="py-2 text-right text-gray-600">{m.calls}</td>
                    <td className="py-2 text-right font-mono text-gray-600">
                      ${m.cost.toFixed(4)}
                    </td>
                    <td className="py-2 text-right text-gray-600">
                      {m.avgDuration > 0 ? `${(m.avgDuration / 1000).toFixed(1)}s` : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      {/* 最近のログ */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-bold text-gray-900">最近のAPI呼び出し</h2>
        {recentLogs.length === 0 ? (
          <p className="text-sm text-gray-400">まだAPI呼び出しの記録がありません</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-gray-400">
                  <th className="pb-2">日時</th>
                  <th className="pb-2">機能</th>
                  <th className="pb-2">モデル</th>
                  <th className="pb-2 text-right">トークン</th>
                  <th className="pb-2 text-right">コスト</th>
                  <th className="pb-2 text-right">応答時間</th>
                  <th className="pb-2">対象</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((log) => (
                  <tr
                    key={log.id}
                    className={`border-b border-gray-50 ${!log.success ? "bg-red-50" : ""}`}
                  >
                    <td className="py-2 text-xs text-gray-500">
                      {new Date(log.createdAt).toLocaleString("ja-JP", {
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-2">
                      {FEATURE_LABELS[log.feature] ?? log.feature}
                    </td>
                    <td className="py-2 text-gray-600">
                      {MODEL_LABELS[log.model] ?? log.model}
                    </td>
                    <td className="py-2 text-right font-mono text-xs text-gray-500">
                      {log.inputTokens.toLocaleString()}→{log.outputTokens.toLocaleString()}
                    </td>
                    <td className="py-2 text-right font-mono text-gray-600">
                      ${log.costUsd.toFixed(4)}
                    </td>
                    <td className="py-2 text-right text-gray-500">
                      {log.durationMs ? `${(log.durationMs / 1000).toFixed(1)}s` : "-"}
                    </td>
                    <td className="max-w-[200px] truncate py-2 text-xs text-gray-400">
                      {log.success ? (
                        log.targetUrl || "-"
                      ) : (
                        <span className="text-red-500">{log.errorMessage}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  const bgClass: Record<string, string> = {
    blue: "from-blue-400 to-blue-500",
    emerald: "from-emerald-400 to-emerald-500",
    red: "from-red-400 to-red-500",
    violet: "from-violet-400 to-violet-500",
  };
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div
        className={`mb-3 inline-block rounded-lg bg-gradient-to-br ${bgClass[color] ?? bgClass.blue} px-2.5 py-1 text-xs font-medium text-white`}
      >
        {label}
      </div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}
