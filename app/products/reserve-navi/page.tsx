import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";

export const metadata: Metadata = {
  title: "Reserve Navi | LINE予約管理",
  description:
    "LINEから簡単予約。シンプルで低コスト、業種別テンプレートで現場にフィットする予約管理システム。無料プランあり。月額¥1,980〜。",
  openGraph: {
    title: "Reserve Navi | LINE予約管理 - FUJIMI DX Lab",
    description: "LINEから簡単予約。無料プランあり。月額¥1,980〜で始められる予約管理システム。",
    images: [{ url: "/images/reserve-navi.jpg", width: 1200, height: 630, alt: "Reserve Navi LINE予約管理" }],
  },
};

const FEATURES = [
  {
    icon: "📱",
    title: "LINEでかんたん予約",
    description:
      "お客様はLINEミニアプリから4ステップで予約完了。アプリのダウンロード不要です。",
  },
  {
    icon: "🔔",
    title: "自動リマインダー",
    description:
      "予約確認・前日リマインドをLINEで自動送信。無断キャンセルがぐっと減ります。",
  },
  {
    icon: "📅",
    title: "見やすいカレンダー",
    description:
      "日・週・月のカレンダービューで予約をパッと確認。スマホでもPCでもOK。",
  },
  {
    icon: "👥",
    title: "お客様をしっかり記録",
    description:
      "予約履歴・来店回数を自動で記録。「あのお客様、前回何のコースだっけ？」がすぐ分かります。",
  },
  {
    icon: "🤖",
    title: "AIがお手伝い",
    description:
      "顧客カルテの自動要約、来店前ブリーフィング、次回予約の提案まで。AIが接客をサポートします。",
  },
  {
    icon: "💰",
    title: "無料からスタート",
    description:
      "まずは無料プランでお試し。月50件まで使えるので、小さなお店ならこれで十分です。",
  },
];

const PAIN_POINTS = {
  before: [
    "電話で予約を受けて、紙のノートに書いている",
    "施術中に電話が鳴って出られない…",
    "ダブルブッキングしたことがある",
    "予約システムは月額が高くて手が出せない",
    "無断キャンセルに悩んでいる",
    "お客様の情報をうまく管理できていない",
  ],
  after: [
    "LINEで24時間いつでも予約を受付",
    "施術に集中できる。予約はLINEにお任せ",
    "リアルタイム空き状況でダブルブッキングゼロ",
    "無料プランあり。月額¥1,980〜で始められる",
    "自動リマインダーで無断キャンセルが激減",
    "来店履歴・カルテが自動で蓄積される",
  ],
};

const STEPS = [
  { step: "1", title: "LINEを開く", desc: "お店の公式LINEからポチッと起動", emoji: "📲" },
  { step: "2", title: "メニューを選ぶ", desc: "やりたいメニューをタップ", emoji: "🏷️" },
  { step: "3", title: "日時を選ぶ", desc: "空いてる日時がひと目で分かる", emoji: "🗓️" },
  { step: "4", title: "予約完了！", desc: "LINEに確認メッセージが届く", emoji: "✅" },
];

const IDEAL_CUSTOMERS = [
  { icon: "💆", title: "マッサージ・整体", description: "施術メニューごとの予約枠管理に。1人運営でもラクラク。" },
  { icon: "💇", title: "サロン・美容室", description: "スタイリスト指名、メニュー別の時間設定もバッチリ。" },
  { icon: "💅", title: "ネイル・まつエク", description: "施術時間が違うメニューも柔軟に対応。写真付きメニュー表示も。" },
  { icon: "🍽️", title: "カフェ・飲食店", description: "席数管理、コース予約。少人数〜団体まで。" },
];

const PLANS = [
  {
    name: "無料",
    price: "¥0",
    period: "",
    description: "まずはお試し",
    color: "#6b7280",
    bgColor: "#f9fafb",
    features: [
      { label: "店舗数", value: "1店舗" },
      { label: "スタッフ", value: "1名" },
      { label: "予約件数", value: "月50件" },
      { label: "予約履歴", value: "1ヶ月" },
      { label: "LINE通知", value: true },
      { label: "カルテ", value: "手入力" },
      { label: "AI機能", value: false },
      { label: "FUJIMINポイント", value: "—" },
      { label: "サポート", value: "—" },
    ],
  },
  {
    name: "ライト",
    price: "¥1,980",
    period: "/月",
    description: "1人運営のお店に",
    color: "#0284c7",
    bgColor: "#f0f9ff",
    features: [
      { label: "店舗数", value: "1店舗" },
      { label: "スタッフ", value: "1名" },
      { label: "予約件数", value: "無制限" },
      { label: "予約履歴", value: "12ヶ月" },
      { label: "LINE通知", value: true },
      { label: "カルテ", value: "手入力" },
      { label: "AI機能", value: false },
      { label: "FUJIMINポイント", value: "—" },
      { label: "サポート", value: "チャット・メール" },
    ],
  },
  {
    name: "スタンダード",
    price: "¥3,300",
    period: "/月",
    description: "AI機能で接客力アップ",
    recommended: true,
    color: "#f97316",
    bgColor: "#fff7ed",
    features: [
      { label: "店舗数", value: "1店舗" },
      { label: "スタッフ", value: "無制限" },
      { label: "予約件数", value: "無制限" },
      { label: "予約履歴", value: "無制限" },
      { label: "LINE通知", value: true },
      { label: "カルテ", value: "AI自動要約" },
      { label: "AI機能", value: "フル搭載" },
      { label: "FUJIMINポイント", value: "月700pt" },
      { label: "サポート", value: "チャット・メール" },
    ],
  },
  {
    name: "プロ",
    price: "¥5,500",
    period: "/月",
    description: "複数店舗のオーナーに",
    color: "#7c3aed",
    bgColor: "#f5f3ff",
    features: [
      { label: "店舗数", value: "最大3店舗" },
      { label: "スタッフ", value: "無制限" },
      { label: "予約件数", value: "無制限" },
      { label: "予約履歴", value: "無制限" },
      { label: "LINE通知", value: true },
      { label: "カルテ", value: "AI自動要約" },
      { label: "AI機能", value: "フル搭載" },
      { label: "FUJIMINポイント", value: "月2,500pt" },
      { label: "サポート", value: "優先サポート" },
    ],
  },
];

const AI_FEATURES = [
  { icon: "📋", title: "AIカルテ", desc: "施術メモをAIが構造化・要約。次回の接客がスムーズに。" },
  { icon: "🔍", title: "来店前ブリーフィング", desc: "予約のお客様の過去情報をAIが事前にまとめてくれます。" },
  { icon: "💡", title: "次回予約の提案", desc: "お客様の来店パターンから、次の予約タイミングをAIが提案。" },
  { icon: "⚠️", title: "リピート離脱アラート", desc: "来店が途切れたお客様をAIが検知。フォローのタイミングを逃しません。" },
  { icon: "📊", title: "売上レポート", desc: "日次・月次の売上サマリーと翌日の予約通知を自動でお届け。" },
  { icon: "🕳️", title: "空き枠スマート埋め", desc: "空いている枠をAIが分析。効率的な予約の入れ方を提案します。" },
];

export default function ReserveNaviPage() {
  return (
    <>
      <Header />
      <main>
        {/* ═══ Hero ═══ */}
        <section className="relative min-h-[70vh] overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28" style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)" }}>
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <FadeIn>
                  <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-orange-100 backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    ← FUJIMI DX Lab トップ
                  </Link>
                </FadeIn>
                <FadeIn delay={0.05}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl">
                      📅
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wider text-orange-100 uppercase">
                      LINE予約管理
                    </span>
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl" style={{ lineHeight: 1.15 }}>
                    Reserve Navi
                  </h1>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <p className="mt-6 text-xl font-medium text-orange-100">
                    予約管理、もっとシンプルでいい。
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="mt-4 max-w-lg leading-relaxed text-orange-100/80">
                    LINEから予約 → 自動で管理 → リマインドも自動。
                    <br />
                    お店の「めんどくさい」をまるっと解決します。
                    <br />
                    <span className="font-semibold text-white">無料プランあり。今日から使えます。</span>
                  </p>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href="#pricing"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-orange-600 shadow-lg transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                    >
                      料金プランを見る
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    >
                      無料で相談する
                    </a>
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={0.15} className="hidden lg:block">
                <div className="relative">
                  <Image
                    src="/images/reserve-navi.jpg"
                    alt="Reserve Navi LINE予約管理イメージ"
                    width={560}
                    height={560}
                    className="rounded-2xl shadow-2xl"
                    priority
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ═══ Pain → Solution ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  こんなお悩み、ありませんか？
                </h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  Reserve Naviなら、ぜんぶ解決します。
                </p>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <FadeIn>
                <div className="h-full rounded-2xl border border-red-100 bg-red-50/50 p-7">
                  <p className="mb-5 text-sm font-bold tracking-wider text-red-400 uppercase">
                    😥 いまの困りごと
                  </p>
                  <ul className="space-y-3.5 text-[15px] leading-relaxed text-gray-700">
                    {PAIN_POINTS.before.map((item, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="shrink-0 text-red-300">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="h-full rounded-2xl border border-orange-100 bg-orange-50/50 p-7">
                  <p className="mb-5 text-sm font-bold tracking-wider text-orange-500 uppercase">
                    😊 Reserve Naviなら
                  </p>
                  <ul className="space-y-3.5 text-[15px] leading-relaxed text-gray-700">
                    {PAIN_POINTS.after.map((item, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="shrink-0 text-orange-400">◎</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ═══ How it works ═══ */}
        <section style={{ backgroundColor: "#fff7ed" }} className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  お客様の予約は、たった4ステップ
                </h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  LINEを開くだけ。アプリのダウンロードは不要です。
                </p>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <FadeIn key={s.step} delay={i * 0.08}>
                  <div className="text-center rounded-2xl bg-white p-6 shadow-sm">
                    <div className="text-4xl mb-2">{s.emoji}</div>
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: "#f97316" }}>
                      {s.step}
                    </div>
                    <h3 className="mt-3 text-base font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Features ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  シンプルだけど、しっかり使える
                </h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  小さなお店に必要な機能を、ちょうどよく。
                </p>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f, i) => (
                <FadeIn key={f.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="text-3xl">{f.icon}</span>
                    <h3 className="mt-4 text-base font-bold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      {f.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ AI Features（スタンダード以上） ═══ */}
        <section style={{ backgroundColor: "#fafaf9" }} className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <span className="inline-block rounded-full px-4 py-1 text-sm font-semibold text-orange-600" style={{ backgroundColor: "#fff7ed" }}>
                  スタンダード以上
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                  AIが、あなたの右腕になる
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  スタンダードプラン以上なら、AIがお店の接客・経営をサポート。
                  <br />
                  「もう1人スタッフがいたらなぁ」を叶えます。
                </p>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {AI_FEATURES.map((f, i) => (
                <FadeIn key={f.title} delay={i * 0.05}>
                  <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{f.icon}</span>
                      <h3 className="text-sm font-bold">{f.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-500">{f.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Pricing ═══ */}
        <section id="pricing" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  料金プラン
                </h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  無料プランからスタート。お店の成長に合わせてアップグレード。
                  <br />
                  すべて税込価格です。
                </p>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PLANS.map((plan, i) => (
                <FadeIn key={plan.name} delay={i * 0.06}>
                  <div
                    className={`relative h-full rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      plan.recommended ? "shadow-md" : ""
                    }`}
                    style={{
                      borderColor: plan.recommended ? plan.color : "#e5e7eb",
                      backgroundColor: plan.bgColor,
                    }}
                  >
                    {plan.recommended && (
                      <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
                        style={{ backgroundColor: plan.color }}
                      >
                        おすすめ
                      </span>
                    )}
                    <div className="text-center">
                      <p className="text-sm font-semibold" style={{ color: plan.color }}>{plan.name}</p>
                      <p className="mt-2 text-3xl font-extrabold text-gray-900">
                        {plan.price}
                        {plan.period && <span className="text-base font-normal text-gray-500">{plan.period}</span>}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">{plan.description}</p>
                    </div>

                    <div className="mt-6 space-y-2.5">
                      {plan.features.map((f) => (
                        <div key={f.label} className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{f.label}</span>
                          <span className="font-medium text-gray-900">
                            {f.value === true ? "✓" : f.value === false ? "—" : f.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <a
                        href="#contact"
                        className="block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors"
                        style={
                          plan.recommended
                            ? { backgroundColor: plan.color, color: "#fff" }
                            : { backgroundColor: "#f3f4f6", color: "#374151" }
                        }
                      >
                        {plan.price === "¥0" ? "無料で始める" : "お問い合わせ"}
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">FUJIMINポイントとは？</span>
                  　AI機能を使うためのポイントです。プランに含まれるポイントで足りない場合は追加購入できます。
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  追加購入: 100pt / ¥550 ・ 500pt / ¥1,650 ・ 1,500pt / ¥3,850（購入から1年間有効）
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ Ideal Customers ═══ */}
        <section style={{ backgroundColor: "#fff7ed" }} className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  こんなお店に選ばれています
                </h2>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {IDEAL_CUSTOMERS.map((c, i) => (
                <FadeIn key={c.title} delay={i * 0.06}>
                  <div className="h-full rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="text-4xl">{c.icon}</span>
                    <h3 className="mt-4 text-base font-bold">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      {c.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  よくある質問
                </h2>
              </div>
            </FadeIn>

            <div className="mt-14 space-y-6">
              {[
                { q: "本当に無料で使えますか？", a: "はい。無料プランは月50件まで、ずっと無料です。クレジットカードの登録も不要です。" },
                { q: "LINEの公式アカウントが必要ですか？", a: "はい。LINE公式アカウント（無料で作成可能）が必要です。設定方法はサポートがお手伝いします。" },
                { q: "途中でプランを変更できますか？", a: "はい。いつでもアップグレード・ダウングレードできます。日割り計算で差額を調整します。" },
                { q: "スタッフが機械に詳しくなくても大丈夫？", a: "大丈夫です。画面はとてもシンプルに作られています。初期設定もサポートがお手伝いします。" },
                { q: "お客様側にアプリのダウンロードは必要ですか？", a: "不要です。LINEさえあれば予約できます。" },
              ].map((faq, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900">Q. {faq.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">A. {faq.a}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section
          id="contact"
          className="relative overflow-hidden px-4 py-24 text-white md:py-32"
          style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)" }}
        >
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                まずは気軽にご相談ください
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-orange-100/80">
                「うちの業種でも使える？」「設定を手伝ってほしい」
                <br />
                なんでもお気軽にどうぞ。無料でご相談いただけます。
              </p>
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
