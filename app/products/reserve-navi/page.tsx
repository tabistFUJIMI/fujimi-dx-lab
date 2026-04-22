import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";
import RelatedProducts from "../../components/RelatedProducts";
import { ProductBreadcrumb } from "../../components/JsonLd";
import SignupFlowButton from "../../components/SignupFlowButton";

export const metadata: Metadata = {
  title: "Reserve Navi | LINE予約管理",
  description:
    "LINE予約管理システム Reserve Navi。サロン・整体・ジム・ペットサロン向け。無料プランあり、月額980円から。LINEミニアプリで24時間予約受付。FUJIMI DX Lab",
  alternates: { canonical: "https://www.fujimi-dx-lab.com/products/reserve-navi" },
  openGraph: {
    title: "Reserve Navi | LINE予約管理 - FUJIMI DX Lab",
    description: "LINE予約管理システム Reserve Navi。サロン・整体・ジム・ペットサロン向け。無料プランあり、月額980円から。LINEミニアプリで24時間予約受付。FUJIMI DX Lab",
    images: [{ url: "/images/reserve-navi.jpg", width: 1200, height: 630, alt: "Reserve Navi LINE予約管理" }],
  },
};

const FEATURES = [
  {
    icon: "📱",
    title: "LINEでかんたん予約",
    description:
      "お客様はLINEから4ステップで予約完了。アプリのダウンロード不要。予約後の通知もLINE内で届くので離脱を防ぎます。",
  },
  {
    icon: "🔔",
    title: "自動リマインダー＆フォロー",
    description:
      "予約確認・前日リマインドに加え、施術翌日のお礼やN日後のフォローメッセージまで自動生成。",
  },
  {
    icon: "📅",
    title: "リソース別カレンダー",
    description:
      "施術者・ベッドごとのタイムグリッド表示。未割当予約のアラートやブロック管理もラクラク。",
  },
  {
    icon: "👥",
    title: "顧客管理＆自動タグ付け",
    description:
      "来店履歴・カルテを自動記録。来店頻度や利用メニューでタグを自動分類し、セグメント配信にも活用。",
  },
  {
    icon: "🏷️",
    title: "9業種テンプレート対応",
    description:
      "マッサージ・美容室・ネイル・ジム・ペットサロン・写真スタジオなど、業種別のカルテラベルやメニューを自動設定。",
  },
  {
    icon: "💰",
    title: "無料からスタート",
    description:
      "無料プランをご提供。月50件まで使えるので、小さなお店ならこれで十分です。",
  },
];

const PAIN_POINTS = {
  before: [
    "電話で予約を受けて、紙のノートに書いている",
    "接客中・レッスン中に電話が鳴って出られない…",
    "ダブルブッキングしたことがある",
    "予約システムは月額が高くて手が出せない",
    "無断キャンセルに悩んでいる",
    "お客様の情報をうまく管理できていない",
  ],
  after: [
    "LINEで24時間いつでも予約を受付",
    "目の前のお客様に集中できる。予約はLINEにお任せ",
    "リアルタイム空き状況でダブルブッキングゼロ",
    "無料プラン（月50件）あり。月額¥980〜で始められる",
    "自動リマインダーで無断キャンセルが激減",
    "来店履歴・カルテが自動で蓄積される",
  ],
};

const STEPS = [
  { step: "1", title: "LINEを開く", desc: "お店の公式LINEからポチッと起動", emoji: "📲" },
  { step: "2", title: "メニューを選ぶ", desc: "受けたいメニューやコースをタップ", emoji: "🏷️" },
  { step: "3", title: "日時を選ぶ", desc: "空いてる日時がひと目で分かる", emoji: "🗓️" },
  { step: "4", title: "予約完了！", desc: "LINEに確認メッセージが届く", emoji: "✅" },
];

const IDEAL_CUSTOMERS = [
  { icon: "💆", title: "マッサージ・整体・鍼灸", description: "承認制予約＆カルテ管理。1人運営でもAIがサポート。" },
  { icon: "💇", title: "美容室・ヘアサロン", description: "スタイリスト指名＆指名料設定。カテゴリ別メニューに対応。" },
  { icon: "💅", title: "ネイル・エステ", description: "業種別カルテラベル付き。メニューごとの所要時間も柔軟に。" },
  { icon: "🏋️", title: "パーソナルジム", description: "トレーナー指名＋時間枠。体験セッションの予約にも対応。" },
  { icon: "🐕", title: "ペットサロン・トリミング", description: "ペット情報のカスタムフィールド対応。リピーター管理も万全。" },
  { icon: "🧘", title: "ヨガ教室・スクール", description: "レッスン枠の管理に。生徒・保護者とのLINE連絡にも。" },
  { icon: "📸", title: "写真スタジオ", description: "利用人数・撮影種類の選択に対応。季節メニューの管理も。" },
  { icon: "🔮", title: "カウンセリング・相談", description: "承認制予約＆オンライン対応。1対1の時間枠予約に最適。" },
  { icon: "🏢", title: "貸出品・設備予約", description: "会議室・レンタルスペースなど、容量制限付きの時間枠管理に。" },
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
      { label: "スタッフ", value: "1名" },
      { label: "予約件数", value: "月50件" },
      { label: "予約履歴", value: "3ヶ月" },
      { label: "AI機能", value: "なし" },
      { label: "LINE通知・リマインド", value: true },
    ],
  },
  {
    name: "ライト",
    price: "¥980",
    period: "/月",
    description: "1人運営のお店に",
    color: "#0284c7",
    bgColor: "#f0f9ff",
    features: [
      { label: "スタッフ", value: "1名" },
      { label: "予約件数", value: "無制限" },
      { label: "予約履歴", value: "無制限" },
      { label: "AI機能", value: "あり（購入ptで）" },
      { label: "LINE拡張", value: true },
    ],
  },
  {
    name: "スタンダード",
    price: "¥2,480",
    period: "/月",
    description: "AI機能で接客力アップ",
    recommended: true,
    color: "#f97316",
    bgColor: "#fff7ed",
    features: [
      { label: "スタッフ", value: "5名まで" },
      { label: "予約件数", value: "無制限" },
      { label: "FUJIMINポイント", value: "月500pt" },
      { label: "週次・月次AIレポート", value: true },
      { label: "LINE拡張", value: true },
      { label: "顧客データAI移行", value: "無料" },
    ],
  },
  {
    name: "プロ",
    price: "¥3,980",
    period: "/月",
    description: "中規模店舗向け",
    color: "#7c3aed",
    bgColor: "#f5f3ff",
    features: [
      { label: "スタッフ", value: "15名まで" },
      { label: "予約件数", value: "無制限" },
      { label: "FUJIMINポイント", value: "月1,500pt" },
      { label: "週次・月次AIレポート", value: true },
      { label: "LINE拡張", value: true },
    ],
  },
];

const AI_FEATURES = [
  { icon: "📋", title: "AIカルテ分析", desc: "接客メモをAIが構造化・要約。アレルギーや注意事項も自動検出します。" },
  { icon: "🔍", title: "来店前ブリーフィング", desc: "予約のお客様の過去情報をダッシュボードに自動表示。誕生日検知にも対応。" },
  { icon: "💡", title: "次回予約の提案", desc: "来店パターンを分析し、メニュー・日時の候補を3つ提案します。" },
  { icon: "⚠️", title: "リピート離脱アラート", desc: "平均来店間隔の1.5倍を超えたら自動検知。フォローメッセージ案も生成。" },
  { icon: "📊", title: "日次・月次レポート", desc: "日次の売上サマリーに加え、月次のセグメント分析・トレンド分析を自動生成。" },
  { icon: "📤", title: "LINE配信＆AI下書き", desc: "顧客セグメントを絞って配信。AIがカルテを参照して下書きを自動生成します。" },
  { icon: "📄", title: "ペーパーレス移行", desc: "手書きカルテやスキャン文書をAIが読み取り。データ移行の手間を大幅削減。" },
  { icon: "💌", title: "施術後自動フォロー", desc: "施術翌日のお礼＆N日後のフォローメッセージをカルテ参照で自動生成。" },
];

export default function ReserveNaviPage() {
  return (
    <>
      <ProductBreadcrumb name="Reserve Navi" slug="reserve-navi" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Reserve Navi",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "LINEから簡単予約。小規模店舗向け予約管理システム",
        url: "https://www.fujimi-dx-lab.com/products/reserve-navi",
        offers: { "@type": "AggregateOffer", lowPrice: "0", highPrice: "3980", priceCurrency: "JPY" },
        provider: { "@type": "Organization", name: "FUJIMI DX Lab" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "本当に980円で使えるんですか？", acceptedAnswer: { "@type": "Answer", text: "はい。おひとり様で運営されている場合、AI機能は使用できませんが、基本的な予約とその管理は全て可能です。追加のコストはかかりません。" } },
          { "@type": "Question", name: "どんな業種で使えますか？", acceptedAnswer: { "@type": "Answer", text: "「予約制」のお店なら幅広く対応しています。サロン・整体はもちろん、パーソナルジム、ペットサロン、音楽教室、写真スタジオ、占い・カウンセリングなど、さまざまなお店でご利用いただいています。" } },
          { "@type": "Question", name: "LINEの公式アカウントが必要ですか？", acceptedAnswer: { "@type": "Answer", text: "はい。LINE公式アカウント（無料で作成可能）が必要です。設定方法はサポートがお手伝いします。" } },
          { "@type": "Question", name: "スタッフが機械に詳しくなくても大丈夫？", acceptedAnswer: { "@type": "Answer", text: "大丈夫です。画面はとてもシンプルに作られています。初期設定もサポートがお手伝いします。" } },
          { "@type": "Question", name: "お客様側にアプリのダウンロードは必要ですか？", acceptedAnswer: { "@type": "Answer", text: "不要です。LINEさえあれば予約できます。" } },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: "https://www.fujimi-dx-lab.com" },
          { "@type": "ListItem", position: 2, name: "Reserve Navi", item: "https://www.fujimi-dx-lab.com/products/reserve-navi" },
        ],
      }) }} />
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
                    <span className="mt-2 block text-lg font-medium text-orange-100 md:text-xl">LINE予約管理システム</span>
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
                <FadeIn delay={0.22}>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["マッサージ・整体", "美容室", "ネイル・エステ", "パーソナルジム", "ペットサロン", "ヨガ教室", "写真スタジオ", "カウンセリング", "設備予約"].map((label) => (
                      <span key={label} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-orange-100 backdrop-blur-sm">{label}</span>
                    ))}
                  </div>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <SignupFlowButton
                      label="申し込む"
                      appName="ReserveNavi"
                      accentColor="#f97316"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-orange-600 shadow-lg transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                    />
                    <a
                      href="#pricing"
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    >
                      料金プランを見る
                    </a>
                  </div>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <p className="mt-4 text-xs text-orange-100/80">
                    ※ ReserveNaviはFUJIMIN PASSの一員として提供されます。
                    まずFUJIMIN PASSにご登録後、ReserveNaviをお申し込みください。
                  </p>
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

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                  無料プランあり。お店の成長に合わせてアップグレード。
                  <br />
                  すべて税込価格です。
                </p>
              </div>
            </FadeIn>

            <div className="mt-14 flex gap-5 overflow-x-auto pb-4 snap-x lg:grid lg:grid-cols-4 lg:overflow-visible">
              {PLANS.map((plan, i) => (
                <FadeIn key={plan.name} delay={i * 0.06}>
                  <div
                    className={`relative h-full min-w-[260px] flex-shrink-0 lg:min-w-0 lg:flex-shrink rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
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
                      <SignupFlowButton
                        label={plan.price === "¥0" ? "無料で始める" : "申し込む"}
                        appName="ReserveNavi"
                        planName={plan.name}
                        accentColor={plan.color}
                        className="block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors"
                        style={
                          plan.recommended
                            ? { backgroundColor: plan.color, color: "#fff" }
                            : { backgroundColor: "#f3f4f6", color: "#374151" }
                        }
                      />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <div className="mt-8 rounded-xl border border-orange-200 bg-orange-50 p-5 text-sm text-orange-900">
                <p className="font-semibold mb-1 flex items-center gap-1.5">
                  <span>ℹ️</span>
                  <span>ご契約の流れ</span>
                </p>
                <ol className="ml-6 list-decimal space-y-1 text-xs">
                  <li>
                    まず <SignupFlowButton label="FUJIMIN PASS" accentColor="#4f46e5" className="font-semibold underline cursor-pointer" /> にご登録（無料・メール認証のみ）
                  </li>
                  <li>管理画面から ReserveNavi のプランをご選択＆お申し込み</li>
                  <li>クレジットカード決済の場合はすぐご利用開始（銀行振込は1〜3営業日）</li>
                </ol>
                <p className="mt-2 text-xs">
                  ReserveNavi単独でのご契約はできません。FUJIMIN PASSアカウント（無料）から、必要なアプリだけを選んでご契約いただく仕組みです。
                </p>
              </div>
            </FadeIn>

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
                  「予約制」のお店に、ぴったりです
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  たとえばこんなお店。
                  マッサージの予約も、トレーニングの予約も、トリミングの予約も、レッスンの予約も。
                  「時間を決めてお客様をお迎えする」お店なら、Reserve Naviが活躍します。
                </p>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                { q: "本当に980円で使えるんですか？", a: "はい。おひとり様で運営されている場合、AI機能は使用できませんが、基本的な予約とその管理は全て可能です。追加のコストはかかりません。" },
                { q: "どんな業種で使えますか？", a: "「予約制」のお店なら幅広く対応しています。サロン・整体はもちろん、パーソナルジム、ペットサロン、音楽教室、写真スタジオ、占い・カウンセリングなど、さまざまなお店でご利用いただいています。" },
                { q: "LINEの公式アカウントが必要ですか？", a: "はい。LINE公式アカウント（無料で作成可能）が必要です。設定方法はサポートがお手伝いします。" },

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

        <RelatedProducts currentSlug="reserve-navi" />

        {/* ═══ CTA ═══ */}
        <section
          id="contact"
          className="relative overflow-hidden px-4 py-24 text-white md:py-32"
          style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)" }}
        >
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                今すぐ無料で始められます
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-orange-100/80">
                メール認証のみ・クレジットカード不要。1分で登録が完了します。
              </p>

              {/* FUJIMIN PASS 案内カード */}
              <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-left">
                <p className="font-bold text-white text-base mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-xs">?</span>
                  <span>FUJIMIN PASSとは</span>
                </p>
                <p className="text-sm text-orange-100/90 leading-relaxed mb-3">
                  ReserveNaviを含む複数の業務アプリを「ひとつのアカウント」「ひとつのお支払い」で使えるプラットフォームです。
                </p>
                <ul className="space-y-1.5 text-xs text-orange-100/80">
                  <li className="flex items-start gap-2">
                    <span className="shrink-0">✓</span>
                    <span>登録・アカウント作成は<strong className="text-white">無料</strong>（メール認証のみ）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0">✓</span>
                    <span>必要なアプリだけを選んでご契約（ReserveNaviの無料プランならずっと¥0）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0">✓</span>
                    <span>初回登録で<strong className="text-white">500ポイントプレゼント</strong>（90日有効・AI機能で使える）</span>
                  </li>
                </ul>
              </div>

              {/* プライマリCTA */}
              <div className="mt-8">
                <SignupFlowButton
                  label="申し込む"
                  appName="ReserveNavi"
                  accentColor="#f97316"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-10 py-4 text-lg font-bold text-orange-600 shadow-xl transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                />
                <p className="mt-3 text-xs text-orange-100/80">
                  3ステップで完了（ボタンを押すと詳しい流れが表示されます）
                </p>
              </div>

              {/* セカンダリ: 相談 */}
              <div className="mt-14 pt-10 border-t border-white/20">
                <p className="text-sm text-orange-100/80 mb-4">
                  「うちの業種でも使える？」「設定を手伝ってほしい」などのご相談はこちら
                </p>
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
