import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "料金プラン | FUJIMI DX Lab",
  description:
    "ReserveNavi・AskNavi・ShiftNaviの料金プラン一覧。ShiftNaviは完全無料。1つから始められます。業種別パッケージならさらにお得。",
  alternates: {
    canonical: "https://fujimi-dx-lab.com/pricing",
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const RESERVE_PLANS = [
  {
    name: "フリー",
    price: "¥0",
    period: "/月",
    features: ["月100件まで予約受付", "LINE通知", "基本カレンダー表示", "メールサポート"],
    recommended: false,
  },
  {
    name: "ライト",
    price: "¥980",
    period: "/月",
    features: ["月100件まで予約受付", "リマインド通知", "Googleカレンダー連携", "メールサポート"],
    recommended: false,
  },
  {
    name: "スタンダード",
    price: "¥2,980",
    period: "/月",
    features: ["予約件数無制限", "スタッフ指名予約", "自動リマインド", "チャットサポート"],
    recommended: true,
  },
  {
    name: "プロ",
    price: "¥5,500",
    period: "/月",
    features: ["予約件数無制限", "複数店舗対応", "売上レポート", "優先サポート"],
    recommended: false,
  },
];

/* ReserveNavi 機能比較表 */
const RESERVE_COMPARISON = {
  headers: ["機能", "フリー", "ライト", "スタンダード", "プロ"],
  rows: [
    ["月間予約件数", "100件", "100件", "無制限", "無制限"],
    ["LINE通知", true, true, true, true],
    ["リマインド通知", false, true, true, true],
    ["自動リマインド", false, false, true, true],
    ["Googleカレンダー連携", false, true, true, true],
    ["スタッフ指名予約", false, false, true, true],
    ["複数店舗対応", false, false, false, true],
    ["売上レポート", false, false, false, true],
    ["サポート", "メール", "メール", "チャット", "優先"],
  ],
};

/* AskNavi・RuleNavi 機能比較表 */
const AI_COMPARISON = {
  headers: ["機能", "ライト", "スタンダード", "プロ", "エンタープライズ"],
  rows: [
    ["月間応答数", "100回", "500回", "2,000回", "無制限"],
    ["ナレッジ登録数", "100件", "200件", "無制限", "無制限"],
    ["チャンネル数", "1", "2", "5", "無制限"],
    ["7日間無料トライアル", true, true, true, true],
    ["サポート", "メール", "チャット", "優先", "専任"],
  ],
};

const AI_PLANS = [
  {
    name: "ライト",
    price: "¥550",
    period: "/月",
    features: ["月100回まで応答", "ナレッジ100件", "1チャンネル", "メールサポート"],
    recommended: false,
  },
  {
    name: "スタンダード",
    price: "¥1,100",
    period: "/月",
    features: ["月500回まで応答", "ナレッジ200件", "2チャンネル", "チャットサポート"],
    recommended: true,
  },
  {
    name: "プロ",
    price: "¥2,200",
    period: "/月",
    features: ["月2,000回まで応答", "ナレッジ無制限", "5チャンネル", "優先サポート"],
    recommended: false,
  },
  {
    name: "エンタープライズ",
    price: "¥5,500",
    period: "/月",
    features: ["応答数無制限", "ナレッジ無制限", "チャンネル無制限", "専任サポート"],
    recommended: false,
  },
];

const SHIFT_FEATURES = [
  "休み希望のスマホ収集",
  "AIシフト自動作成",
  "シフト共有・通知",
  "3店舗まで利用可能",
];

const INDUSTRY_PACKAGES = [
  { icon: "💇", label: "美容室・理容室", href: "/plan/hair" },
  { icon: "💅", label: "ネイル・エステサロン", href: "/plan/salon" },
  { icon: "💆", label: "整体・鍼灸・接骨院", href: "/plan/sejutsu" },
  { icon: "🏋️", label: "パーソナルジム", href: "/plan/gym" },
  { icon: "📷", label: "フォトスタジオ", href: "/plan/photo" },
  { icon: "🐾", label: "ペットサロン", href: "/plan/pet" },
  { icon: "🧘", label: "カウンセリング", href: "/plan/counseling" },
];

const POINT_PLANS = [
  { name: "S", price: "¥550", points: "100pt", description: "お試しに" },
  { name: "M", price: "¥1,650", points: "500pt", description: "一番人気", recommended: true },
  { name: "L", price: "¥3,850", points: "1,500pt", description: "ヘビーユーザーに" },
];

const FAQS = [
  {
    q: "最低利用期間はありますか？",
    a: "最低利用期間はありません。いつでも解約できます。日割り返金はございませんので、月末までご利用いただけます。",
  },
  {
    q: "支払い方法は何がありますか？",
    a: "クレジットカード（Visa / Mastercard / JCB / AMEX）に対応しています。Stripeによる安全な決済です。",
  },
  {
    q: "途中でプラン変更できますか？",
    a: "はい、いつでもアップグレード・ダウングレードが可能です。アップグレードは即時反映、ダウングレードは次の更新日から適用されます。",
  },
  {
    q: "無料トライアルはありますか？",
    a: "ShiftNaviは完全無料です。ReserveNaviはフリープラン（月100件）をご用意しています。AskNavi・RuleNaviは7日間の無料トライアルがあります。",
  },
  {
    q: "FUJIMINポイントとは何ですか？",
    a: "FUJIMINポイントはAI機能の従量課金に使えるポイントです。月額プランの上限を超えた場合や、SlideNaviなどのAIツールで消費します。1pt = 1円相当です。有効期限はありません。",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://fujimi-dx-lab.com" },
      { "@type": "ListItem", position: 2, name: "料金プラン", item: "https://fujimi-dx-lab.com/pricing" },
    ],
  };

  const faqPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <Header />
      <main>
        {/* ========== Hero ========== */}
        <section
          className="relative overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28"
          style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)" }}
        >
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <FadeIn>
              <p className="mb-4 text-sm font-semibold tracking-widest text-slate-400 uppercase">
                Pricing
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                料金プラン
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
                1つのツールから始められます。必要になったら追加するだけ。
                <br className="hidden sm:block" />
                業種別パッケージならセットでお得に。
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ページ内ナビ */}
        <nav className="sticky top-16 z-30 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-4xl gap-1 overflow-x-auto px-4 py-2 text-xs font-medium text-gray-500 md:justify-center md:gap-2 md:text-sm">
            {[
              { id: "shift-navi", label: "ShiftNavi" },
              { id: "reserve-navi", label: "ReserveNavi" },
              { id: "ask-rule-navi", label: "AskNavi / RuleNavi" },
              { id: "packages", label: "業種別" },
              { id: "points", label: "ポイント" },
              { id: "faq", label: "FAQ" },
              { id: "contact", label: "お問い合わせ" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 rounded-full px-3 py-1.5 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* ========== 1. ShiftNavi — 無料 ========== */}
        <section id="shift-navi" className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-2 text-center text-sm font-semibold tracking-widest text-orange-500 uppercase">
                Free
              </p>
              <h2 className="text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
                ShiftNavi — ずっと無料
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mx-auto mt-10 max-w-lg rounded-2xl border-2 border-orange-300 bg-white p-8 shadow-xl md:p-10">
                <div className="text-center">
                  <p className="text-5xl font-extrabold text-orange-600 md:text-6xl">¥0</p>
                  <p className="mt-1 text-sm text-gray-500">永年無料・クレジットカード不要</p>
                </div>
                <ul className="mt-8 space-y-3">
                  {SHIFT_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-gray-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs text-orange-600">
                        &#10003;
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/products/shift-navi"
                  className="mt-8 block w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  今すぐ無料で始める
                </a>
                <p className="mt-3 text-center text-xs text-gray-400">
                  FUJIMIN PASSアカウントだけで即利用開始 / クレジットカード不要
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ========== 2. ReserveNavi ========== */}
        <section id="reserve-navi" className="bg-white px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-2 text-center text-sm font-semibold tracking-widest uppercase" style={{ color: "#7c3aed" }}>
                Reservation
              </p>
              <h2 className="text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
                ReserveNavi
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-gray-500">
                LINE予約管理。無料プランから始められます。
              </p>
            </FadeIn>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {RESERVE_PLANS.map((plan, i) => (
                <FadeIn key={plan.name} delay={i * 0.08}>
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 transition-shadow ${
                      plan.recommended
                        ? "border-2 shadow-xl"
                        : "border-gray-200 shadow-sm hover:shadow-md"
                    }`}
                    style={plan.recommended ? { borderColor: "#7c3aed" } : undefined}
                  >
                    {plan.recommended && (
                      <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
                        style={{ backgroundColor: "#7c3aed" }}
                      >
                        おすすめ
                      </span>
                    )}
                    <p className="text-sm font-semibold text-gray-500">{plan.name}</p>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900">
                      {plan.price}
                      <span className="text-base font-medium text-gray-400">{plan.period}</span>
                    </p>
                    <ul className="mt-6 flex-1 space-y-2.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-0.5 text-xs" style={{ color: "#7c3aed" }}>&#10003;</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/products/reserve-navi"
                      className={`mt-6 block rounded-xl px-4 py-3 text-center text-sm font-bold transition-all hover:scale-[1.02] ${
                        plan.recommended
                          ? "text-white shadow-lg"
                          : "border border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                      style={plan.recommended ? { backgroundColor: "#7c3aed" } : undefined}
                    >
                      {plan.price === "¥0" ? "無料で始める" : "このプランで始める"}
                    </a>
                    <p className="mt-2 text-center text-xs text-gray-400">
                      {plan.price === "¥0" ? "クレジットカード不要" : "縛りなし・いつでも解約OK"}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* 機能比較表 */}
            <FadeIn delay={0.3}>
              <div className="mt-16">
                <h3 className="mb-6 text-center text-xl font-bold text-gray-900">機能比較</h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        {RESERVE_COMPARISON.headers.map((h, i) => (
                          <th
                            key={h}
                            className={`px-4 py-3 font-semibold ${i === 0 ? "text-left text-gray-500" : "text-center text-gray-900"} ${
                              h === "スタンダード" ? "bg-purple-50" : ""
                            }`}
                          >
                            {h}
                            {h === "スタンダード" && (
                              <span className="ml-1 text-xs font-normal text-purple-500">推奨</span>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {RESERVE_COMPARISON.rows.map((row, ri) => (
                        <tr key={ri} className="border-b border-gray-100">
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={`px-4 py-3 ${ci === 0 ? "text-left font-medium text-gray-700" : "text-center"} ${
                                ci === 3 ? "bg-purple-50" : ""
                              }`}
                            >
                              {cell === true ? (
                                <span className="inline-block text-base" style={{ color: "#7c3aed" }}>&#10003;</span>
                              ) : cell === false ? (
                                <span className="text-gray-300">&mdash;</span>
                              ) : (
                                <span className="text-gray-600">{cell}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ========== 3. AskNavi・RuleNavi 共通 ========== */}
        <section id="ask-rule-navi" className="bg-[#f9fafb] px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-2 text-center text-sm font-semibold tracking-widest uppercase" style={{ color: "#e94560" }}>
                AI
              </p>
              <h2 className="text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
                AskNavi・RuleNavi 共通プラン
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-gray-500">
                AI自動応答（AskNavi）と社内規則AI検索（RuleNavi）は同じ料金体系です。
              </p>
            </FadeIn>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {AI_PLANS.map((plan, i) => (
                <FadeIn key={plan.name} delay={i * 0.08}>
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 transition-shadow ${
                      plan.recommended
                        ? "border-2 shadow-xl"
                        : "border-gray-200 shadow-sm hover:shadow-md"
                    }`}
                    style={plan.recommended ? { borderColor: "#e94560" } : undefined}
                  >
                    {plan.recommended && (
                      <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
                        style={{ backgroundColor: "#e94560" }}
                      >
                        おすすめ
                      </span>
                    )}
                    <p className="text-sm font-semibold text-gray-500">{plan.name}</p>
                    <p className="mt-2 text-3xl font-extrabold text-gray-900">
                      {plan.price}
                      <span className="text-base font-medium text-gray-400">{plan.period}</span>
                    </p>
                    <ul className="mt-6 flex-1 space-y-2.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-0.5 text-xs" style={{ color: "#e94560" }}>&#10003;</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/products/ask-navi"
                      className={`mt-6 block rounded-xl px-4 py-3 text-center text-sm font-bold transition-all hover:scale-[1.02] ${
                        plan.recommended
                          ? "text-white shadow-lg"
                          : "border border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                      style={plan.recommended ? { backgroundColor: "#e94560" } : undefined}
                    >
                      7日間無料で試す
                    </a>
                    <p className="mt-2 text-center text-xs text-gray-400">
                      縛りなし・いつでも解約OK
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* 機能比較表 */}
            <FadeIn delay={0.3}>
              <div className="mt-16">
                <h3 className="mb-6 text-center text-xl font-bold text-gray-900">機能比較</h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        {AI_COMPARISON.headers.map((h, i) => (
                          <th
                            key={h}
                            className={`px-4 py-3 font-semibold ${i === 0 ? "text-left text-gray-500" : "text-center text-gray-900"} ${
                              h === "スタンダード" ? "bg-red-50" : ""
                            }`}
                          >
                            {h}
                            {h === "スタンダード" && (
                              <span className="ml-1 text-xs font-normal text-red-400">推奨</span>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {AI_COMPARISON.rows.map((row, ri) => (
                        <tr key={ri} className="border-b border-gray-100">
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={`px-4 py-3 ${ci === 0 ? "text-left font-medium text-gray-700" : "text-center"} ${
                                ci === 2 ? "bg-red-50" : ""
                              }`}
                            >
                              {cell === true ? (
                                <span className="inline-block text-base" style={{ color: "#e94560" }}>&#10003;</span>
                              ) : cell === false ? (
                                <span className="text-gray-300">&mdash;</span>
                              ) : (
                                <span className="text-gray-600">{cell}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ========== 4. 業種別パッケージ ========== */}
        <section id="packages" className="bg-white px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-2 text-center text-sm font-semibold tracking-widest text-gray-400 uppercase">
                Packages
              </p>
              <h2 className="text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
                業種別パッケージ
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-gray-500">
                あなたの業種に合わせた最適な組み合わせをご提案。セットならさらにお得。
              </p>
            </FadeIn>
            <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRY_PACKAGES.map((pkg, i) => (
                <FadeIn key={pkg.label} delay={i * 0.06}>
                  <a
                    href={pkg.href}
                    className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-gray-300"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl">
                      {pkg.icon}
                    </span>
                    <div>
                      <p className="font-bold text-gray-900">{pkg.label}</p>
                      <p className="mt-0.5 text-xs text-gray-400">パッケージを見る &rarr;</p>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ========== 5. FUJIMINポイント ========== */}
        <section id="points" className="bg-[#f9fafb] px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-2 text-center text-sm font-semibold tracking-widest text-gray-400 uppercase">
                Points
              </p>
              <h2 className="text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
                FUJIMINポイント
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-gray-500">
                AI機能の従量課金に使えるポイント。必要な分だけチャージできます。
                <br />
                <span className="text-xs text-gray-400">有効期限なし・1pt = 1円相当</span>
              </p>
            </FadeIn>
            <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
              {POINT_PLANS.map((p, i) => (
                <FadeIn key={p.name} delay={i * 0.08}>
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                    <p className="text-sm font-semibold text-gray-400">{p.description}</p>
                    <p className="mt-3 text-lg font-extrabold text-gray-900">{p.name} パック</p>
                    <p className="mt-2 text-3xl font-extrabold text-blue-600">{p.price}</p>
                    <p className="mt-1 text-sm text-gray-500">{p.points}付与</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ========== 6. FAQ ========== */}
        <section id="faq" className="bg-white px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
                よくあるご質問
              </h2>
            </FadeIn>
            <div className="mt-12 divide-y divide-gray-200">
              {FAQS.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="py-6">
                    <p className="font-bold text-gray-900">Q. {faq.q}</p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">A. {faq.a}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ========== 7. CTA — Contact ========== */}
        <section
          id="contact"
          className="px-4 py-20 text-white md:py-28"
          style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)" }}
        >
          <div className="mx-auto max-w-4xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-extrabold md:text-4xl">
                まずはお気軽にご相談ください
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-300">
                導入のご相談・デモのご依頼・お見積もりなど、何でもお気軽にどうぞ。
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="mt-10">
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
