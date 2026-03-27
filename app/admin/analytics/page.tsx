"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

type DailyRow = { dimensionValues: { value: string }[]; metricValues: { value: string }[] };
type PageRow = { dimensionValues: { value: string }[]; metricValues: { value: string }[] };
type SourceRow = { dimensionValues: { value: string }[]; metricValues: { value: string }[] };

export default function AnalyticsAdmin() {
  const [period, setPeriod] = useState("7");
  const [daily, setDaily] = useState<DailyRow[]>([]);
  const [pages, setPages] = useState<PageRow[]>([]);
  const [sources, setSources] = useState<SourceRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/analytics?period=${period}`);
      if (res.status === 401) {
        const data = await res.json();
        if (data.needsAuth) {
          setNeedsAuth(true);
        } else {
          window.location.href = "/login";
        }
        return;
      }
      const data = await res.json();
      setDaily(data.daily || []);
      setPages(data.pages || []);
      setSources(data.sources || []);
      setNeedsAuth(false);
    } catch {
      setError("データの取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  }, [period]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleConnect = async () => {
    const res = await fetch("/api/admin/analytics/auth");
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  // 合計値の計算
  const totals = daily.reduce(
    (acc, row) => ({
      users: acc.users + parseInt(row.metricValues[0]?.value || "0"),
      sessions: acc.sessions + parseInt(row.metricValues[1]?.value || "0"),
      pageviews: acc.pageviews + parseInt(row.metricValues[2]?.value || "0"),
    }),
    { users: 0, sessions: 0, pageviews: 0 }
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-600">← 戻る</Link>
          <h1 className="text-xl font-bold text-gray-900">アクセス解析</h1>
        </div>
        {!needsAuth && (
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none"
          >
            <option value="7">過去7日</option>
            <option value="14">過去14日</option>
            <option value="30">過去30日</option>
          </select>
        )}
      </div>

      {needsAuth ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <p className="mb-2 text-4xl">📊</p>
          <h2 className="mb-2 text-lg font-bold text-gray-900">Google Analytics 4 と連携する</h2>
          <p className="mb-6 text-sm text-gray-500">
            GA4アカウントを連携すると、アクセスデータを管理画面から確認できます。
          </p>
          <button
            onClick={handleConnect}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Googleアカウントで連携
          </button>
        </div>
      ) : isLoading ? (
        <div className="py-12 text-center text-gray-400">読み込み中...</div>
      ) : error ? (
        <div className="py-12 text-center text-red-400">{error}</div>
      ) : (
        <>
          {/* サマリーカード */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "ユーザー数", value: totals.users.toLocaleString(), color: "text-blue-600" },
              { label: "セッション数", value: totals.sessions.toLocaleString(), color: "text-emerald-600" },
              { label: "ページビュー", value: totals.pageviews.toLocaleString(), color: "text-orange-600" },
            ].map((card) => (
              <div key={card.label} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-xs text-gray-500">{card.label}</p>
                <p className={`mt-1 text-2xl font-bold ${card.color}`}>{card.value}</p>
              </div>
            ))}
          </div>

          {/* 日別推移テーブル */}
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-gray-900">日別推移</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs text-gray-400">
                    <th className="pb-2">日付</th>
                    <th className="pb-2 text-right">ユーザー</th>
                    <th className="pb-2 text-right">セッション</th>
                    <th className="pb-2 text-right">PV</th>
                  </tr>
                </thead>
                <tbody>
                  {daily.map((row, i) => {
                    const d = row.dimensionValues[0]?.value || "";
                    const date = d ? `${d.slice(0, 4)}/${d.slice(4, 6)}/${d.slice(6, 8)}` : "";
                    return (
                      <tr key={i} className="border-b border-gray-50">
                        <td className="py-2 text-gray-700">{date}</td>
                        <td className="py-2 text-right text-gray-700">{parseInt(row.metricValues[0]?.value || "0").toLocaleString()}</td>
                        <td className="py-2 text-right text-gray-700">{parseInt(row.metricValues[1]?.value || "0").toLocaleString()}</td>
                        <td className="py-2 text-right text-gray-700">{parseInt(row.metricValues[2]?.value || "0").toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ページ別 & 流入元 */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-bold text-gray-900">ページ別PV</h2>
              <div className="space-y-2">
                {pages.slice(0, 10).map((row, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="max-w-[200px] truncate text-gray-600">{row.dimensionValues[0]?.value}</span>
                    <span className="font-medium text-gray-900">{parseInt(row.metricValues[0]?.value || "0").toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-bold text-gray-900">流入元</h2>
              <div className="space-y-2">
                {sources.map((row, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{row.dimensionValues[0]?.value || "(direct)"}</span>
                    <span className="font-medium text-gray-900">{parseInt(row.metricValues[0]?.value || "0").toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
