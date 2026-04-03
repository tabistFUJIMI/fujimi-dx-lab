"use client";

const CANDIDATES = [
  { label: "4週後火曜", date: "4月28日（火）", time: "10:00 - 12:00", recommended: true },
  { label: "5週後火曜", date: "5月5日（火）", time: "10:00 - 12:00", note: "祝日注意", recommended: false },
  { label: "6週後火曜", date: "5月12日（火）", time: "10:00 - 12:00", recommended: false },
  { label: "8週後火曜", date: "5月26日（火）", time: "10:00 - 12:00", recommended: false },
];

export default function SalonMockAiAnalysis() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h3 className="text-base font-bold text-gray-900">次回予約を作成</h3>
        <p className="text-xs text-gray-500">AIが来店パターンを分析し、最適な候補日時を提案します</p>
      </div>

      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left: Booking form */}
          <div className="space-y-4">
            {/* Customer info */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600">
                  山
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">山田 花子</p>
                  <p className="text-xs text-gray-500">090-0000-7890</p>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div>
              <label className="text-xs font-semibold text-gray-500">メニュー</label>
              <div className="mt-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-800">カット＋カラー 120分</span>
                  <span className="text-sm font-semibold text-gray-800">¥11,000</span>
                </div>
                <p className="text-[10px] text-rose-500">前回と同じ</p>
              </div>
            </div>

            {/* Staff */}
            <div>
              <label className="text-xs font-semibold text-gray-500">担当者</label>
              <div className="mt-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800">
                スタイリスト山田
              </div>
            </div>

            {/* Candidate times */}
            <div>
              <label className="text-xs font-semibold text-gray-500">AIおすすめ日時</label>
              <div className="mt-2 space-y-2">
                {CANDIDATES.map((c) => (
                  <div
                    key={c.date}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                      c.recommended
                        ? "border-rose-300 bg-rose-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div>
                      <p className="text-xs text-gray-500">
                        {c.label}
                        {"note" in c && c.note && (
                          <span className="ml-1 text-[10px] text-orange-500">({c.note})</span>
                        )}
                      </p>
                      <p className="text-sm font-semibold text-gray-800">{c.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">{c.time}</span>
                      {c.recommended && (
                        <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white">
                          推奨
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: AI Analysis */}
          <div>
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 p-5">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤖</span>
                <h4 className="text-sm font-bold text-rose-800">AI分析レポート</h4>
              </div>

              <div className="mt-4 space-y-3">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-white/70 p-3 text-center">
                    <p className="text-[10px] text-gray-500">来店間隔</p>
                    <p className="text-lg font-extrabold text-rose-700">約28日</p>
                  </div>
                  <div className="rounded-xl bg-white/70 p-3 text-center">
                    <p className="text-[10px] text-gray-500">よく来る曜日</p>
                    <p className="text-sm font-bold text-rose-700">火曜日</p>
                  </div>
                </div>

                <div className="rounded-xl bg-white/70 p-3 text-center">
                  <p className="text-[10px] text-gray-500">よく来る時間帯</p>
                  <p className="text-sm font-bold text-rose-700">10:00 - 11:00（午前）</p>
                </div>

                {/* Analysis text */}
                <div className="rounded-xl bg-white/80 p-4">
                  <p className="text-xs leading-relaxed text-gray-700">
                    <span className="font-semibold text-rose-700">分析結果：</span>
                    約4週間間隔で火曜日の午前に来店するパターンが安定しています。
                    次回の来店は<strong>4月28日（火）</strong>と<strong>5月26日（火）</strong>を提案しました。
                  </p>
                </div>

                {/* Visual pattern */}
                <div className="rounded-xl bg-white/70 p-3">
                  <p className="mb-2 text-[10px] font-semibold text-gray-500">直近の来店パターン</p>
                  <div className="flex items-end gap-1">
                    {[4, 3, 4, 4, 3, 4, 4, 3, 4, 4].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${h * 6}px`,
                          backgroundColor: i >= 8 ? "#fda4af" : "#e11d48",
                          opacity: i >= 8 ? 0.5 : 1,
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-1 flex justify-between text-[8px] text-gray-400">
                    <span>1月</span>
                    <span>2月</span>
                    <span>3月</span>
                    <span className="text-rose-400">4月(予測)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
