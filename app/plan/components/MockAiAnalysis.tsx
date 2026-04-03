"use client";

const CANDIDATES = [
  { label: "来週月曜", date: "4月6日（月）", time: "10:30 - 10:50", recommended: true },
  { label: "再来週月曜", date: "4月13日（月）", time: "10:30 - 10:50", recommended: false },
  { label: "3週後月曜", date: "4月20日（月）", time: "10:30 - 10:50", recommended: false },
  { label: "4週後月曜", date: "4月27日（月）", time: "10:30 - 10:50", recommended: false },
];

export default function MockAiAnalysis() {
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
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-600">
                  佐
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">佐野 弘明</p>
                  <p className="text-xs text-gray-500">090-0000-5678</p>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div>
              <label className="text-xs font-semibold text-gray-500">メニュー</label>
              <div className="mt-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-800">ヘッドスパ 20分</span>
                  <span className="text-sm font-semibold text-gray-800">¥2,500</span>
                </div>
                <p className="text-[10px] text-violet-500">前回と同じ</p>
              </div>
            </div>

            {/* Staff */}
            <div>
              <label className="text-xs font-semibold text-gray-500">担当者</label>
              <div className="mt-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800">
                指定なし（自動割当）
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
                        ? "border-violet-300 bg-violet-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div>
                      <p className="text-xs text-gray-500">{c.label}</p>
                      <p className="text-sm font-semibold text-gray-800">{c.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-700">{c.time}</span>
                      {c.recommended && (
                        <span className="rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white">
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
            <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-5">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤖</span>
                <h4 className="text-sm font-bold text-violet-800">AI分析レポート</h4>
              </div>

              <div className="mt-4 space-y-3">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-white/70 p-3 text-center">
                    <p className="text-[10px] text-gray-500">来店間隔</p>
                    <p className="text-lg font-extrabold text-violet-700">約8.6日</p>
                  </div>
                  <div className="rounded-xl bg-white/70 p-3 text-center">
                    <p className="text-[10px] text-gray-500">よく来る曜日</p>
                    <p className="text-sm font-bold text-violet-700">月曜日・水曜日</p>
                  </div>
                </div>

                <div className="rounded-xl bg-white/70 p-3 text-center">
                  <p className="text-[10px] text-gray-500">よく来る時間帯</p>
                  <p className="text-sm font-bold text-violet-700">10:00 - 14:30（午前〜早午後）</p>
                </div>

                {/* Analysis text */}
                <div className="rounded-xl bg-white/80 p-4">
                  <p className="text-xs leading-relaxed text-gray-700">
                    <span className="font-semibold text-violet-700">分析結果：</span>
                    平均8-9日間隔で月・水曜日の午前〜早午後に来店するパターンが顕著なため、
                    <strong>4月6日（月）</strong>と<strong>4月8日（水）</strong>を基本とし、
                    その次の来店パターンとして<strong>4月13日（月）</strong>を提案しました。
                  </p>
                </div>

                {/* Visual pattern */}
                <div className="rounded-xl bg-white/70 p-3">
                  <p className="mb-2 text-[10px] font-semibold text-gray-500">直近の来店パターン</p>
                  <div className="flex items-end gap-1">
                    {[3, 5, 2, 6, 4, 7, 3, 5, 4, 6].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${h * 6}px`,
                          backgroundColor: i >= 8 ? "#c4b5fd" : "#7c3aed",
                          opacity: i >= 8 ? 0.5 : 1,
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-1 flex justify-between text-[8px] text-gray-400">
                    <span>1月</span>
                    <span>2月</span>
                    <span>3月</span>
                    <span className="text-violet-400">4月(予測)</span>
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
