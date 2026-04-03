"use client";

export default function MockCustomerCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-lg font-bold text-violet-600">
            佐
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">佐野 弘明</h3>
            <p className="text-xs text-gray-500">顧客ID: C-00042</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            LINE送信
          </button>
          <button className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white">
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
                  { label: "電話番号", value: "090-0000-5678" },
                  { label: "生年月日", value: "1985年12月18日（40歳）" },
                  { label: "性別", value: "男性" },
                  { label: "来店回数", value: "6回" },
                  { label: "最終来店日", value: "2026/3/23" },
                  { label: "登録日", value: "2026/1/15" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <dt className="text-gray-500">{item.label}</dt>
                    <dd className="font-medium text-gray-800">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Allergy / Contraindications */}
            <div>
              <h4 className="text-sm font-bold text-gray-700">アレルギー・禁忌事項</h4>
              <div className="mt-2 rounded-xl border border-orange-100 bg-orange-50 p-3">
                <div className="flex items-start gap-2">
                  <span className="text-sm">⚠️</span>
                  <p className="text-xs text-orange-700">
                    右肩に古傷あり（強圧注意）。アロマオイルのラベンダーにアレルギー反応の既往あり。
                  </p>
                </div>
              </div>
            </div>

            {/* Memo */}
            <div>
              <h4 className="text-sm font-bold text-gray-700">管理メモ</h4>
              <div className="mt-2 rounded-xl border border-gray-100 bg-gray-50 p-3">
                <p className="text-xs text-gray-600">
                  常連のお客様。土曜午前が多い。仕事はデスクワーク中心で肩こりが主訴。ヘッドスパを最近気に入っている様子。紹介で奥様（佐野智子様）も来店歴あり。
                </p>
              </div>
            </div>
          </div>

          {/* Right: Karte */}
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-700">施術カルテ</h4>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500">
                全6件中 最新1件を表示
              </span>
            </div>

            <div className="mt-3 space-y-3">
              <div className="rounded-xl border border-violet-100 bg-violet-50/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-semibold text-violet-700">
                    2026/3/23（土）
                  </span>
                  <span className="text-[10px] text-gray-400">担当: セラピスト佐野</span>
                </div>

                <div className="mt-3 space-y-2">
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500">施術メニュー</p>
                    <p className="text-xs text-gray-800">ヘッドスパ 20分 + 全身もみほぐし 40分</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500">主訴・症状</p>
                    <p className="text-xs text-gray-800">
                      肩こり（右側が特にひどい）、眼精疲労、首のハリ
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500">施術内容</p>
                    <p className="text-xs text-gray-800">
                      ヘッドスパ後、右肩〜首にかけて重点的にほぐし。右肩の古傷周辺は中圧で対応。肩甲骨はがしを追加で実施。
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-500">個人メモ</p>
                    <p className="text-xs text-gray-600">
                      施術後「右肩がだいぶ楽になった」とのこと。ヘッドスパの気持ちよさに感動されていた。
                    </p>
                  </div>
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-2">
                    <p className="text-[10px] font-semibold text-blue-600">次回への申し送り</p>
                    <p className="text-xs text-blue-700">
                      右肩は改善傾向。次回もヘッドスパ希望。肩甲骨はがしの継続を提案予定。
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
