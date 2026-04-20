import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";

export const metadata: Metadata = {
  title: "マッサージ・整体院のための予約管理 | FUJIMI DX Lab",
  description:
    "施術中に鳴る電話、もう気にしなくていい。LINEで24時間予約受付+AIが質問に自動応答。マッサージ・整体・鍼灸院向け。無料プランあり、月額1,980円から。",
  openGraph: {
    title: "マッサージ・整体院のための予約管理 | FUJIMI DX Lab",
    description:
      "施術中の電話対応から解放。LINE予約+AI自動応答で、施術に集中できる環境を。無料プランあり。",
    images: [
      {
        url: "/images/lp/massage-ogp.jpg",
        width: 1200,
        height: 630,
        alt: "マッサージ・整体院向け LINE予約管理",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "マッサージ・整体院のための予約管理 | FUJIMI DX Lab",
    description: "施術中の電話対応から解放。LINE予約+AI自動応答。無料プランあり。",
    images: ["/images/lp/massage-ogp.jpg"],
  },
  alternates: {
    canonical: "https://fujimi-dx-lab.com/lp/massage",
  },
};

const PAIN_POINTS = [
  {
    emoji: "📞",
    title: "施術中に電話が鳴る",
    text: "手が離せないのに電話が鳴る。中断するとお客様にも申し訳ないし、出なければ予約を逃してしまう。",
  },
  {
    emoji: "📓",
    title: "紙のノートで予約管理",
    text: "ノートに書いた予約を見落としてダブルブッキング。「あれ、この時間もう入ってたっけ？」が何度も。",
  },
  {
    emoji: "💸",
    title: "予約システムは高すぎる",
    text: "大手の予約システムは月額数万円。1人で運営しているお店には手が出せない。",
  },
  {
    emoji: "🔁",
    title: "同じ質問に何度も回答",
    text: "「メニューの違いは？」「駐車場ありますか？」同じ質問にLINEで何度も手動で返信。",
  },
];

const AFTER_ITEMS = [
  {
    emoji: "📱",
    title: "LINEで24時間予約受付",
    text: "お客様はLINEから好きな時間に予約。施術中でも予約が入る。電話対応ゼロに。",
  },
  {
    emoji: "🤖",
    title: "AIが質問に自動応答",
    text: "メニュー・料金・駐車場の質問はAIが即座に回答。あなたが返信する必要はありません。",
  },
  {
    emoji: "🔔",
    title: "リマインドで無断キャンセル防止",
    text: "予約前日にLINEで自動リマインド。「忘れてた」をなくして、無断キャンセルが激減。",
  },
  {
    emoji: "🎯",
    title: "施術に集中できる",
    text: "予約管理はLINEとAIに任せて、あなたは目の前のお客様に集中できます。",
  },
];

const STEPS = [
  {
    step: "1",
    emoji: "📲",
    title: "お客様がLINEを開く",
    desc: "お店の公式LINEからポチッと起動するだけ",
  },
  {
    step: "2",
    emoji: "🏷️",
    title: "メニューを選ぶ",
    desc: "整体60分、もみほぐし90分…タップで選択",
  },
  {
    step: "3",
    emoji: "🗓️",
    title: "空いてる日時を選ぶ",
    desc: "リアルタイムの空き状況がひと目で分かる",
  },
  {
    step: "4",
    emoji: "✅",
    title: "予約完了！",
    desc: "LINEに確認メッセージが届く。電話は不要",
  },
];

export default function MassageLPPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative min-h-[90vh] overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28"
          style={{
            background:
              "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)",
          }}
        >
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <FadeIn>
                  <p className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur-sm">
                    マッサージ・整体・鍼灸院のオーナー様へ
                  </p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1
                    className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl"
                    style={{ lineHeight: 1.15 }}
                  >
                    施術中に鳴る電話、
                    <br />
                    <span style={{ color: "#f97316" }}>
                      もう気にしなくていい。
                    </span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">
                    LINEで24時間予約を受付。
                    <br />
                    お客様からの質問にはAIが自動で応答。
                    <br />
                    <strong className="text-white">
                      あなたは、施術に集中するだけ。
                    </strong>
                  </p>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <p className="mt-3 text-sm text-slate-400">
                    無料プランあり。1人運営のお店でもすぐに始められます。
                  </p>
                <p className="mt-2 inline-block rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-300">
                    2026年4月中旬 サービス開始｜事前相談受付中
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600"
                    >
                      無料で相談する
                    </a>
                    <a
                      href="#how"
                      className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                    >
                      使い方を見る
                    </a>
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={0.2} className="mt-8 lg:mt-0">
                <div className="relative">
                  <Image
                    src="/images/lp/massage-hero.jpg"
                    alt="マッサージ施術に集中するセラピスト"
                    width={600}
                    height={400}
                    className="mx-auto w-full max-w-md rounded-2xl shadow-2xl lg:max-w-none"
                    priority
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  こんなこと、ありませんか？
                </h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  1人で運営していると、全部自分でやるしかない。
                  <br />
                  でも、施術中は手が離せない…
                </p>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {PAIN_POINTS.map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-red-100 bg-red-50/50 p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-2xl">{p.emoji}</span>
                      <h3 className="font-bold text-red-500">{p.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {p.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section
          style={{ backgroundColor: "#fff7ed" }}
          className="px-4 py-24 md:py-32"
        >
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p
                  className="text-sm font-bold tracking-wider uppercase"
                  style={{ color: "#f97316" }}
                >
                  Reserve Navi + Ask Navi
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  LINE予約 × AI応答で、ぜんぶ解決
                </h2>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {AFTER_ITEMS.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <h3
                        className="font-bold"
                        style={{ color: "#f97316" }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  お客様の予約は、たった4ステップ
                </h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  アプリのダウンロード不要。LINEだけで完結します。
                </p>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <FadeIn key={s.step} delay={i * 0.08}>
                  <div className="rounded-2xl bg-white p-6 text-center shadow-sm border border-gray-100">
                    <div className="mb-2 text-4xl">{s.emoji}</div>
                    <div
                      className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: "#f97316" }}
                    >
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

        {/* Before / After */}
        <section
          style={{ backgroundColor: "#f8fafc" }}
          className="px-4 py-24 md:py-32"
        >
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  導入前と導入後、こう変わります
                </h2>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <FadeIn>
                <div className="h-full rounded-2xl border border-red-100 bg-red-50/50 p-7">
                  <p className="mb-5 text-sm font-bold tracking-wider text-red-400 uppercase">
                    😥 導入前の1日
                  </p>
                  <ul className="space-y-3 text-[15px] leading-relaxed text-gray-700">
                    {[
                      "09:00 開店。予約ノートを確認",
                      "09:30 施術開始。電話が鳴るが出られない",
                      "10:15 施術の合間にLINEの返信3件",
                      "12:00 昼休みに不在着信に折り返し（2件つながらず）",
                      "14:00 施術中にまた電話。お客様に「すみません」",
                      "18:00 閉店後、明日の予約確認に30分",
                    ].map((item, i) => (
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
                    😊 導入後の1日
                  </p>
                  <ul className="space-y-3 text-[15px] leading-relaxed text-gray-700">
                    {[
                      "09:00 開店。LINEに昨夜の予約3件が自動で入っている",
                      "09:30 施術に集中。電話は鳴らない",
                      "10:15 AIが「駐車場ありますか？」に自動回答済み",
                      "12:00 昼休みはゆっくり休憩",
                      "14:00 施術に集中。予約は全てLINEで管理",
                      "18:00 閉店。明日のリマインドは自動送信済み",
                    ].map((item, i) => (
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

        {/* Story */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  なぜ私たちが作っているのか
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-12 rounded-2xl border border-gray-100 bg-white p-8 md:p-10 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl" style={{ backgroundColor: "#eef2ff" }}>🏨</div>
                  <div>
                    <h3 className="text-lg font-bold">Tabist ゆ縁の宿ふじみ</h3>
                    <p className="mt-1 text-sm text-gray-500">静岡県富士市のビジネスホテル</p>
                  </div>
                </div>
                <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-gray-600">
                  <p>
                    私たちは静岡県富士市で小さなビジネスホテルを運営しています。
                    <strong className="text-gray-800">宿泊業も「予約」が命。</strong>
                    電話が鳴っても接客中で出られない、同じ質問に何度も答える——マッサージ・整体院のオーナー様と、まったく同じ課題を抱えていました。
                  </p>
                  <p>
                    既存の予約システムを探しましたが、大企業向けで高すぎたり、機能が多すぎて使いこなせなかったり。
                    <strong className="text-gray-800">「ちょうどいい」がなかった</strong>んです。
                  </p>
                  <p>
                    だから、自分たちで作りました。
                  </p>
                  <p className="text-gray-800 font-medium">
                    同じ悩みを持つお店に、この仕組みを届けたい。それが Reserve Navi の原点です。
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mx-auto mt-8 grid max-w-3xl gap-4 md:grid-cols-3">
                {[
                  { emoji: "🎯", title: "ちょうどいい機能", description: "大手のような機能過多ではなく、小さなお店に本当に必要な機能だけ。" },
                  { emoji: "🔧", title: "細やかな修正対応", description: "お店ごとに業務は違います。ご要望に応じて、きめ細かくカスタマイズ・修正します。" },
                  { emoji: "💬", title: "現場を知る開発者", description: "自分たちも現場で毎日使っているから、困りごとがすぐ分かります。" },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
                    <span className="text-3xl">{item.emoji}</span>
                    <p className="mt-3 text-sm font-bold">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  まずは無料ではじめる
                </h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  まずは無料プランでお試しもOK。
                  <br />
                  <strong className="text-gray-700">契約期間の縛りなし。いつでも解約できます。</strong>
                </p>
              </div>
            </FadeIn>

            {/* プランカード */}
            <FadeIn delay={0.1}>
              <div className="mt-14 grid gap-6 md:grid-cols-2">
                {/* 無料プラン */}
                <div className="rounded-2xl border-2 border-gray-200 bg-white p-8">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-500">無料プラン</p>
                    <p className="mt-2 text-4xl font-extrabold text-gray-900">¥0</p>
                    <p className="mt-1 text-xs text-gray-500">ずっと無料・クレカ登録不要</p>
                  </div>
                  <div className="mt-6">
                    <a href="#contact" className="block w-full rounded-lg bg-gray-100 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200">
                      無料プランについて相談する
                    </a>
                  </div>
                </div>
                {/* おすすめプラン */}
                <div className="relative rounded-2xl border-2 p-8 shadow-md" style={{ borderColor: "#f97316", backgroundColor: "#fff7ed" }}>
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white" style={{ backgroundColor: "#f97316" }}>おすすめ</span>
                  <div className="text-center">
                    <p className="text-sm font-semibold" style={{ color: "#f97316" }}>スタンダードプラン</p>
                    <p className="mt-2 text-4xl font-extrabold text-gray-900">¥2,480<span className="text-base font-normal text-gray-500">/月</span></p>
                    <p className="mt-1 text-xs text-gray-500">LINE予約 + AI応答がセット</p>
                  </div>
                  <div className="mt-6">
                    <a href="#contact" className="block w-full rounded-lg py-3 text-center text-sm font-semibold text-white transition-colors hover:opacity-90" style={{ backgroundColor: "#f97316" }}>
                      スタンダードプランについて相談する
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* 機能比較テーブル */}
            <FadeIn delay={0.15}>
              <div className="mt-12 overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="px-5 py-4 text-left font-semibold text-gray-700">機能</th>
                      <th className="px-5 py-4 text-center font-semibold text-gray-500">無料</th>
                      <th className="px-5 py-4 text-center font-semibold text-gray-500">ライト<br /><span className="text-xs font-normal">¥980/月</span></th>
                      <th className="px-5 py-4 text-center font-semibold" style={{ color: "#f97316" }}>スタンダード<br /><span className="text-xs font-normal">¥2,480/月</span></th>
                      <th className="px-5 py-4 text-center font-semibold text-gray-500">プロ<br /><span className="text-xs font-normal">¥3,980/月</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { feature: "予約受付", free: "月50件", lite: "無制限", std: "無制限", pro: "無制限" },
                      { feature: "予約カレンダー", free: "✓", lite: "✓", std: "✓", pro: "✓" },
                      { feature: "自動リマインド", free: "✓", lite: "✓", std: "✓", pro: "✓" },
                      { feature: "LINE通知", free: "✓", lite: "✓", std: "✓", pro: "✓" },
                      { feature: "予約履歴", free: "3ヶ月", lite: "無制限", std: "無制限", pro: "無制限" },
                      { feature: "スタッフ数", free: "1名", lite: "1名", std: "5名まで", pro: "15名まで" },
                      { feature: "顧客カルテ", free: "—", lite: "手入力", std: "AI自動要約", pro: "AI自動要約" },
                      { feature: "リピート離脱アラート", free: "—", lite: "—", std: "✓", pro: "✓" },
                      { feature: "週次・月次AIレポート", free: "—", lite: "—", std: "✓", pro: "✓" },
                      { feature: "FUJIMINポイント", free: "—", lite: "購入", std: "月500pt", pro: "月1,500pt" },
                      { feature: "サポート", free: "—", lite: "チャット・メール", std: "チャット・メール", pro: "チャット・メール" },
                    ].map((row) => (
                      <tr key={row.feature} className="hover:bg-gray-50/50">
                        <td className="px-5 py-3 font-medium text-gray-700">{row.feature}</td>
                        <td className="px-5 py-3 text-center text-gray-500">{row.free}</td>
                        <td className="px-5 py-3 text-center text-gray-500">{row.lite}</td>
                        <td className="px-5 py-3 text-center font-medium text-gray-900">{row.std}</td>
                        <td className="px-5 py-3 text-center text-gray-500">{row.pro}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>

            {/* 安心ポイント */}
            <FadeIn delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> 契約期間の縛りなし</span>
                <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> いつでも解約OK</span>
                <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> プラン変更も自由</span>
                <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> すべて税込価格</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="mt-6 text-center text-xs text-gray-400">
                <Link href="/products/reserve-navi" className="underline hover:text-gray-600">
                  全プランの詳細を見る →
                </Link>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* FAQ */}
        <section
          style={{ backgroundColor: "#f8fafc" }}
          className="px-4 py-24 md:py-32"
        >
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
                {
                  q: "1人で運営していますが使えますか？",
                  a: "はい、むしろ1人運営のお店にこそおすすめです。施術中の電話対応や予約管理をすべてLINEとAIに任せられます。",
                },
                {
                  q: "LINE公式アカウントが必要ですか？",
                  a: "はい。LINE公式アカウント（無料で作成可能）が必要です。初期設定はサポートがお手伝いします。",
                },
                {
                  q: "お客様はアプリをダウンロードする必要がありますか？",
                  a: "不要です。LINEさえあれば予約できます。お客様に新しいアプリを入れてもらう必要はありません。",
                },
                {
                  q: "メニューごとに施術時間を変えられますか？",
                  a: "はい。「整体60分」「もみほぐし90分」など、メニューごとに所要時間を設定できます。",
                },
                {
                  q: "機械に詳しくなくても大丈夫？",
                  a: "大丈夫です。画面はとてもシンプルに作られています。初期設定もサポートがお手伝いします。",
                },
                {
                  q: "途中でプランを変更できますか？",
                  a: "はい、いつでもプランの変更・アップグレードが可能です。まずは無料プランでお試しください。",
                },
              ].map((faq, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900">Q. {faq.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      A. {faq.a}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="contact"
          className="relative overflow-hidden px-4 py-24 pb-36 text-white md:py-32 md:pb-32"
          style={{
            background:
              "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
          }}
        >
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                施術に集中できる毎日、
                <br />
                はじめませんか？
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-orange-100/80">
                「うちでも使える？」「設定を手伝ってほしい」
                <br />
                なんでもお気軽にどうぞ。無料でご相談いただけます。
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "1人で運営していますが使えますか？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "はい、むしろ1人運営のお店にこそおすすめです。施術中の電話対応や予約管理をすべてLINEとAIに任せられます。",
                  },
                },
                {
                  "@type": "Question",
                  name: "お客様はアプリをダウンロードする必要がありますか？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "不要です。LINEさえあれば予約できます。",
                  },
                },
                {
                  "@type": "Question",
                  name: "無料で使えますか？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "はい。無料プランは月100件まで、ずっと無料です。クレジットカードの登録も不要です。",
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "ホーム",
                  item: "https://fujimi-dx-lab.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "マッサージ・整体院向け",
                  item: "https://fujimi-dx-lab.com/lp/massage",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Reserve Navi",
              applicationCategory: "BusinessApplication",
              description: "マッサージ・整体院向けLINE予約管理+AI自動応答システム",
              url: "https://fujimi-dx-lab.com/lp/massage",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "JPY",
                description: "無料プランあり。月額¥980〜",
              },
              provider: {
                "@type": "Organization",
                name: "FUJIMI DX Lab",
                legalName: "ふじみ企業有限会社",
                url: "https://fujimi-dx-lab.com",
                address: {
                  "@type": "PostalAddress",
                  postalCode: "417-0043",
                  streetAddress: "新田島町3-20",
                  addressLocality: "富士市",
                  addressRegion: "静岡県",
                  addressCountry: "JP",
                },
              },
            }),
          }}
        />
      </main>
      <Footer />

      {/* モバイル固定CTAバー */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-orange-200 bg-white/95 p-3 backdrop-blur-sm md:hidden">
        <a
          href="#contact"
          className="block w-full rounded-xl py-3 text-center text-sm font-bold text-white shadow-lg"
          style={{ backgroundColor: "#f97316" }}
        >
          無料で相談する
        </a>
      </div>
    </>
  );
}
