import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";
import StickyCTA from "../../components/StickyCTA";

export const metadata: Metadata = {
  title: "Reserve Navi | LINE予約管理システム｜無料から始められる予約管理",
  description:
    "LINEで24時間予約受付。無料プランあり、月額980円から。サロン・整体・ジム・ペットサロン向けのシンプルな予約管理システム。宿泊施設が自社で使うために作った、続けられる価格の予約管理。",
  alternates: { canonical: "https://fujimi-dx-lab.com/lp/reserve-navi" },
  openGraph: {
    title: "Reserve Navi | 無料から始められるLINE予約管理",
    description:
      "LINEで24時間予約受付。無料プランあり。小さなお店のために、宿が作った予約管理システム。",
    images: [{ url: "/images/reserve-navi.jpg", width: 1200, height: 630, alt: "Reserve Navi LINE予約管理" }],
  },
};

const PAIN_POINTS = [
  { emoji: "📞", text: "接客中に予約の電話が鳴って出られない" },
  { emoji: "📓", text: "紙のノートでダブルブッキングが起きた" },
  { emoji: "💸", text: "予約システムは月額が高すぎて手が出せない" },
  { emoji: "😔", text: "無断キャンセルが多くて困っている" },
  { emoji: "🔁", text: "LINEで同じ質問に何度も手動で返信している" },
];

const STEPS = [
  { num: "1", title: "LINEを開く", desc: "お店の公式LINEからポチッと起動", emoji: "📲" },
  { num: "2", title: "メニューを選ぶ", desc: "受けたいメニューやコースをタップ", emoji: "🏷️" },
  { num: "3", title: "日時を選ぶ", desc: "空いてる日時がひと目で分かる", emoji: "🗓️" },
  { num: "4", title: "予約完了！", desc: "LINEに確認メッセージが届く", emoji: "✅" },
];

const PLANS = [
  {
    name: "無料", price: "¥0", period: "", description: "まずはお試し",
    color: "#6b7280", bgColor: "#f9fafb",
    highlights: ["月100件まで", "スタッフ1名", "LINE通知・リマインド"],
  },
  {
    name: "ライト", price: "¥980", period: "/月", description: "1人運営のお店に",
    color: "#0284c7", bgColor: "#f0f9ff",
    highlights: ["予約件数 無制限", "CSV入出力", "AI機能は購入ポイントで利用"],
  },
  {
    name: "スタンダード", price: "¥2,480", period: "/月", description: "AI機能＋自動レポートで経営をサポート",
    color: "#f97316", bgColor: "#fff7ed", recommended: true,
    highlights: ["スタッフ無制限", "AI機能用 月500pt", "週次・月次AIレポート（専用枠500pt）", "店舗向けAIチャットボット"],
  },
  {
    name: "プロ", price: "¥3,980", period: "/月", description: "月800件規模の店舗に",
    color: "#7c3aed", bgColor: "#f5f3ff",
    highlights: ["月予約800件まで", "AI機能用 月1,500pt", "優先サポート"],
  },
];

const WHY_CHEAP = [
  {
    icon: "💬",
    title: "電話サポートなし。AIとメールで対応",
    description:
      "お問い合わせや導入サポートはメールとAIチャットで対応しています。電話対応の人件費をカットすることで、その分を価格に還元しています。",
  },
  {
    icon: "🤖",
    title: "AIで開発。だからメンテナンスも速い",
    description:
      "開発にAIを活用し、開発期間を徹底的に短縮。新機能の追加やバグ修正も素早く行えるため、運用コストを最小限に抑えています。",
  },
  {
    icon: "🏨",
    title: "宿が作った、ボトムアップ型システム",
    description:
      "私たちは24時間稼働のビジネスホテルを運営する会社です。もともとある人的資源と運営ノウハウを活かして、システムの開発・サポートを行っています。",
  },
];

const OTHER_NAVIS = [
  {
    name: "Ask Navi", tagline: "LINE AI自動応答", icon: "💬", color: "#14b8a6",
    description: "よくある質問にAIが24時間自動応答。施術中のLINE返信から解放されます。",
    price: "¥550〜/月", href: "/products/ask-navi",
  },
  {
    name: "Shift Navi", tagline: "AIシフト管理", icon: "📊", color: "#3b82f6",
    description: "スタッフの休み希望をスマホで収集、AIがシフトを自動作成。",
    price: "お問い合わせ", href: "/products/shift-navi",
  },
  {
    name: "Rule Navi", tagline: "社内規則AI検索", icon: "📖", color: "#a855f7",
    description: "PDFをアップするだけ。マニュアルや規則をAIがチャットで即回答。",
    price: "¥550〜/月", href: "/products/rule-navi",
  },
];

export default function ReserveNaviLP() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Reserve Navi",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "LINEから簡単予約。小規模店舗向け予約管理システム。無料プランあり。",
        url: "https://fujimi-dx-lab.com/lp/reserve-navi",
        offers: { "@type": "AggregateOffer", lowPrice: "0", highPrice: "5500", priceCurrency: "JPY" },
        provider: { "@type": "Organization", name: "FUJIMI DX Lab" },
      }) }} />
      <Header />
      <main>
        {/* ═══ Hero ═══ */}
        <section
          className="relative min-h-[90vh] overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28"
          style={{ background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)" }}
        >
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <FadeIn>
              <p className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-orange-100 backdrop-blur-sm">
                予約管理から始める、お店のDX
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl" style={{ lineHeight: 1.15 }}>
                「施術中に電話が鳴って、
                <br />
                <span className="text-orange-200">出られなかった」を、ゼロに。</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-orange-100">
                LINEで24時間予約受付。お客様はLINEから予約するだけ。
                <br />
                あなたは目の前のお客様に集中できます。
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["サロン", "整体・鍼灸", "ネイル・エステ", "パーソナルジム", "ペットサロン", "音楽教室"].map((label) => (
                  <span key={label} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-orange-100 backdrop-blur-sm">{label}</span>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="https://www.fujimin-pass.com/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-orange-600 shadow-lg transition-all duration-300 hover:scale-105 sm:w-auto"
                >
                  無料で始める →
                </a>
                <a
                  href="https://lin.ee/UPArZn9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#06C755] px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 sm:w-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.282.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.286-.63-.63V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  LINEで相談
                </a>
              </div>
              <a
                href="#contact"
                className="mt-4 inline-block text-sm text-orange-100 underline-offset-4 hover:underline"
              >
                フォームで相談したい方はこちら
              </a>
            </FadeIn>
            <FadeIn delay={0.35}>
              <p className="mt-6 text-sm text-orange-200/70">
                無料プランあり ・ クレジットカード不要 ・ いつでも解約OK
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ═══ Pain Points ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  こんな悩み、ありませんか？
                </h2>
              </div>
            </FadeIn>
            <div className="mt-12 space-y-4">
              {PAIN_POINTS.map((p, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex items-center gap-4 rounded-xl border border-red-100 bg-red-50/50 px-6 py-4">
                    <span className="text-2xl">{p.emoji}</span>
                    <p className="text-[15px] text-gray-700">{p.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.3}>
              <p className="mt-10 text-center text-lg font-bold text-orange-600">
                Reserve Naviなら、ぜんぶ解決します。
              </p>
            </FadeIn>
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
                <FadeIn key={s.num} delay={i * 0.08}>
                  <div className="text-center rounded-2xl bg-white p-6 shadow-sm">
                    <div className="text-4xl mb-2">{s.emoji}</div>
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: "#f97316" }}>
                      {s.num}
                    </div>
                    <h3 className="mt-3 text-base font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.35}>
              <div className="mt-12 text-center">
                <Link
                  href="/products/reserve-navi"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
                >
                  機能の詳細を見る →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ Pricing ═══ */}
        <section id="pricing" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">料金プラン</h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  無料プランからスタート。お店の成長に合わせてアップグレード。
                  <br />
                  すべて税込価格です。
                </p>
              </div>
            </FadeIn>

            <div className="mt-14 flex gap-5 overflow-x-auto pb-4 snap-x lg:grid lg:grid-cols-4 lg:overflow-visible">
              {PLANS.map((plan, i) => (
                <FadeIn key={plan.name} delay={i * 0.06}>
                  <div
                    className={`relative h-full min-w-[240px] flex-shrink-0 lg:min-w-0 lg:flex-shrink rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${plan.recommended ? "shadow-md" : ""}`}
                    style={{ borderColor: plan.recommended ? plan.color : "#e5e7eb", backgroundColor: plan.bgColor }}
                  >
                    {plan.recommended && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white" style={{ backgroundColor: plan.color }}>
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
                    <ul className="mt-6 space-y-2">
                      {plan.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="shrink-0 text-orange-400">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <a
                        href="https://www.fujimin-pass.com/register"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors"
                        style={plan.recommended ? { backgroundColor: plan.color, color: "#fff" } : { backgroundColor: "#f3f4f6", color: "#374151" }}
                      >
                        {plan.price === "¥0" ? "無料で始める" : "このプランで始める"}
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <div className="mt-8 text-center">
                <Link
                  href="/products/reserve-navi#pricing"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 transition-colors hover:text-orange-700"
                >
                  各プランの詳細を比較する →
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ Why this price? ═══ */}
        <section style={{ backgroundColor: "#f8fafc" }} className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  なぜ、この価格で提供できるのか
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  安すぎて不安？——ちゃんと理由があります。
                </p>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {WHY_CHEAP.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="h-full rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                    <span className="text-3xl">{item.icon}</span>
                    <h3 className="mt-4 text-base font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 想い ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg" style={{ backgroundColor: "#eef2ff" }}>🏨</div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">FUJIMI DX Lab の想い</p>
                    <p className="text-xs text-gray-500">ふじみ企業有限会社 — 静岡県富士市</p>
                  </div>
                </div>
                <div className="space-y-4 text-[15px] leading-relaxed text-gray-600">
                  <p>
                    1万円のシステム。1年間で12万円。
                  </p>
                  <p>
                    中規模以上の企業様には安いかもしれません。
                  </p>
                  <p>
                    でも、閑散期だってある。いろんな状況で厳しい時期もある。
                  </p>
                  <p className="text-base font-bold text-gray-800">
                    そんな時でも、持続し続けられる価格帯で提供したい。
                  </p>
                  <p>
                    私たちは静岡県富士市で小さなビジネスホテルを運営しています。自分たちが「こんなツールがほしかった」と思って作ったものを、同じ悩みを持つお店に届けたい。それがFUJIMI DX Labの原点です。
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ ひとつから始められる ═══ */}
        <section style={{ backgroundColor: "#f8fafc" }} className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  ひとつから始めて、必要な時に足す
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  Reserve Naviで予約管理を始めたら、必要に応じて他のツールも追加できます。
                  <br />
                  <strong className="text-gray-700">どれかひとつからでOK。全部入れる必要はありません。</strong>
                </p>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {OTHER_NAVIS.map((navi, i) => (
                <FadeIn key={navi.name} delay={i * 0.1}>
                  <Link href={navi.href} className="group block h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{navi.icon}</span>
                      <div>
                        <h3 className="font-bold" style={{ color: navi.color }}>{navi.name}</h3>
                        <p className="text-xs text-gray-400">{navi.tagline}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-500">{navi.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-semibold" style={{ color: navi.color }}>{navi.price}</span>
                      <span className="text-sm text-gray-400 group-hover:translate-x-1 transition-transform">詳細 →</span>
                    </div>
                  </Link>
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
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">よくある質問</h2>
              </div>
            </FadeIn>
            <div className="mt-14 space-y-6">
              {[
                { q: "本当に無料で使えますか？", a: "はい。無料プランは月100件まで、ずっと無料です。クレジットカードの登録も不要です。" },
                { q: "どんな業種で使えますか？", a: "「予約制」のお店なら幅広く対応しています。サロン・整体・パーソナルジム・ペットサロン・音楽教室・写真スタジオ・占いなど、さまざまなお店でご利用いただけます。" },
                { q: "LINEの公式アカウントが必要ですか？", a: "はい。LINE公式アカウント（無料で作成可能）が必要です。設定方法はサポートがお手伝いします。" },
                { q: "電話でのサポートはありますか？", a: "電話サポートは行っておりません。メールとAIチャットでのサポートとなります。その分、価格を抑えてご提供しています。" },
                { q: "途中でプラン変更はできますか？", a: "はい。いつでもアップグレード・ダウングレードが可能です。" },
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
                今日から、予約管理を変えませんか？
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-orange-100/80">
                3つの始め方から選べます。
                <br />
                クレジットカード登録は不要です。
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
                {/* 1. 無料登録 */}
                <a
                  href="https://www.fujimin-pass.com/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center rounded-2xl bg-white p-6 text-orange-600 shadow-xl transition-all hover:-translate-y-1"
                >
                  <span className="text-3xl">🚀</span>
                  <p className="mt-3 text-base font-extrabold">無料で始める</p>
                  <p className="mt-1 text-xs text-orange-500/80">FUJIMIN PASSに登録</p>
                  <span className="mt-3 text-sm font-bold underline-offset-4 group-hover:underline">
                    1分で完了 →
                  </span>
                </a>

                {/* 2. LINE相談 */}
                <a
                  href="https://lin.ee/UPArZn9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center rounded-2xl bg-[#06C755] p-6 text-white shadow-xl transition-all hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden="true">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.282.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.286-.63-.63V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                  <p className="mt-3 text-base font-extrabold">LINEで相談</p>
                  <p className="mt-1 text-xs text-white/80">気軽に質問</p>
                  <span className="mt-3 text-sm font-bold underline-offset-4 group-hover:underline">
                    友だち追加 →
                  </span>
                </a>

                {/* 3. フォーム */}
                <a
                  href="#form"
                  className="group flex flex-col items-center rounded-2xl border-2 border-white/40 bg-white/5 p-6 text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/10"
                >
                  <span className="text-3xl">✉️</span>
                  <p className="mt-3 text-base font-extrabold">フォームで相談</p>
                  <p className="mt-1 text-xs text-white/80">じっくり聞きたい方へ</p>
                  <span className="mt-3 text-sm font-bold underline-offset-4 group-hover:underline">
                    入力フォームへ ↓
                  </span>
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div id="form" className="mt-16 rounded-3xl bg-white/95 p-6 text-left shadow-2xl backdrop-blur-sm md:p-10">
                <p className="text-center text-sm font-bold text-gray-500">
                  ✉️ お問い合わせフォーム
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA
        primaryHref="https://www.fujimin-pass.com/register"
        primaryLabel="無料で始める"
        secondaryHref="https://lin.ee/UPArZn9"
        secondaryLabel="LINEで相談"
        caption="クレカ不要・1分で登録"
      />
    </>
  );
}
