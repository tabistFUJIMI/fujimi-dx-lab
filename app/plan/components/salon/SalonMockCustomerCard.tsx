"use client";

export default function SalonMockCustomerCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-lg font-bold text-rose-600">
            山
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">山田 花子</h3>
            <p className="text-xs text-gray-500">顧客ID: C-00078</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            LINE送信
          </button>
          <button className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">
            予約を作成
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left: Basic info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-700">基本情報</h4>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <dl className="space-y-2.5 text-sm">
                {[
                  { label: "電話番号", value: "090-0000-7890" },
                  { label: "生年月日", value: "1992年5月15日（33歳）" },
                  { label: "性別", value: "女性" },
                  { label: "来店回数", value: "12回" },
                  { label: "最終来店日", value: "2026/3/25" },
                  { label: "登録日", value: "2025/4/10" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <dt className="text-gray-500">{item.label}</dt>
                    <dd className="font-medium text-gray-800">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Hair condition / concerns */}
            <div>
              <h4 className="text-sm font-bold text-gray-700">髪質・お悩み</h4>
              <div className="mt-2 rounded-xl border border-orange-100 bg-orange-50 p-3">
                <div className="flex items-start gap-2">
                  <span className="text-sm">💇</span>
                  <p className="text-xs text-orange-700">
                    毛先のダメージが気になる。カラーの色持ちを良くしたい。
                  </p>
                </div>
              </div>
            </div>

            {/* Memo */}
            <div>
              <h4 className="text-sm font-bold text-gray-700">個人メモ</h4>
              <div className="mt-2 rounded-xl border border-gray-100 bg-gray-50 p-3">
                <p className="text-xs text-gray-600">
                  ナチュラル系が好み。前髪は目にかからない長さ。火曜午前の来店が多い。お子様の送迎後に来店されることが多い。
                </p>
              </div>
            </div>
          </div>

          {/* Right: Karte */}
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-700">施術カルテ</h4>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
                全12件中 最新1件を表示
              </span>
            </div>

            <div className="mt-3 space-y-3">
              <div className="rounded-xl border border-rose-100 bg-rose-50/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-semibold text-rose-700">
                    2026/3/25（火）
                  </span>
                  <span className="text-[10px] text-gray-400">担当: スタイリスト山田</span>
                </div>

                <div className="mt-3 space-y-2">
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500">施術メニュー</p>
                    <p className="text-xs text-gray-800">カット＋カラー 120分</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500">施術内容</p>
                    <p className="text-xs text-gray-800">
                      カット＋カラー 120分、アッシュブラウン、毛先5cmカット
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500">個人メモ</p>
                    <p className="text-xs text-gray-600">
                      ナチュラル系が好み。前髪は目にかからない長さ。カラー後の仕上がりに満足されていた。
                    </p>
                  </div>
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-2">
                    <p className="text-[10px] font-semibold text-blue-600">次回への申し送り</p>
                    <p className="text-xs text-blue-700">
                      次回はトリートメントも追加提案。毛先のダメージケアを重点的に。
                    </p>
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
