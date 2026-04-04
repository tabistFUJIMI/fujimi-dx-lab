import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FadeIn from "./components/FadeIn";
import ContactForm from "./components/ContactForm";
import LatestNews from "./components/LatestNews";

const INDUSTRIES = [
  {
    label: "マッサージ・整体・鍼灸",
    description: "施術の手を止めずに予約受付・問い合わせ対応を自動化",
    href: "/plan/sejutsu",
    image: "/images/industry/sejutsu.png",
    color: "#f97316",
  },
  {
    label: "ネイル・エステサロン",
    description: "LINE予約でリピート率UP。AI応答で施術中も安心",
    href: "/plan/salon",
    image: "/images/industry/salon.png",
    color: "#e11d48",
  },
  {
    label: "美容室・ヘアサロン",
    description: "予約・シフト・問い合わせをまとめて管理",
    href: "/plan/hair",
    image: "/images/industry/hair.png",
    color: "#7c3aed",
  },
  {
    label: "パーソナルジム",
    description: "体験予約の取りこぼしゼロ。AIが24時間対応",
    href: "/plan/gym",
    image: "/images/industry/gym.png",
    color: "#059669",
  },
  {
    label: "ペットサロン",
    description: "トリミング中でもLINE予約を自動受付",
    href: "/plan/pet",
    image: "/images/industry/pet.png",
    color: "#d97706",
  },
  {
    label: "カウンセリング・相談",
    description: "繊細な問い合わせにもAIが丁寧に一次対応",
    href: "/plan/counseling",
    image: "/images/industry/counseling.png",
    color: "#0891b2",
  },
  {
    label: "写真スタジオ",
    description: "撮影プラン案内・空き状況をAIが自動回答",
    href: "/plan/photo",
    image: "/images/industry/photo.png",
    color: "#4f46e5",
  },
];

const SERVICES = [
  {
    name: "ReserveNavi",
    tagline: "LINE予約管理",
    color: "#f97316",
    href: "/products/reserve-navi",
    image: "/images/services/reserve-navi.png",
    features: "LINE予約受付・顧客管理・AI分析",
    price: "無料〜¥4,980/月",
    badge: "まずはここから",
    cta: "無料で予約管理を始める",
  },
  {
    name: "AskNavi",
    tagline: "AI自動応答",
    color: "#14b8a6",
    href: "/products/ask-navi",
    image: "/images/services/ask-navi.png",
    features: "LINE・Webの問い合わせにAIが24時間対応",
    price: "¥550〜¥5,500/月",
    cta: "AI応答を体験する",
  },
  {
    name: "ShiftNavi",
    tagline: "AIシフト管理",
    color: "#ea580c",
    href: "/products/shift-navi",
    image: "/images/services/shift-navi.png",
    features: "AIシフト自動作成・休み希望スマホ収集",
    price: "フリー¥0 / スタンダード¥550",
    badge: "フリー¥0〜",
    cta: "シフト管理を始める",
  },
];

const COMING_SOON = [
  { name: "SocialNavi", tagline: "SNS一元管理", icon: "📣" },
  { name: "SlideNavi", tagline: "AI資料作成", icon: "📑" },
  { name: "MeishiNavi", tagline: "AI名刺管理", icon: "🤝" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ─── Hero ─── */}
        <section
          className="relative min-h-[100vh] overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, #1e3a5f 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, #2d1b4e 0%, transparent 50%), linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)",
          }}
        >
          <h1 className="sr-only">FUJIMI DX Lab — 小規模事業者のためのDXツール</h1>
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <FadeIn>
                  <p className="mb-5 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur-sm">
                    ひとつからはじめられるDX
                  </p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl" style={{ lineHeight: 1.1 }}>
                    「この時間、もっと
                    <br />
                    お客様に使えないかな？」
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="mt-8 max-w-lg text-lg leading-relaxed text-slate-300">
                    予約の電話、シフト調整、問い合わせ対応——
                    <br />
                    <strong className="text-white">あなたの業種に合わせて、ひとつずつ解決できます。</strong>
                  </p>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <p className="mt-3 text-base text-slate-400">
                    あなたの業種を選んでください。最適なプランをご提案します。
                  </p>
                  <p className="mt-2 inline-block rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-300">
                    2026年4月中旬 サービス開始予定｜事前相談受付中
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <a href="#industry" className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600">
                      業種を選んで始める ↓
                    </a>
                    <a href="#contact" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                      無料で相談する
                    </a>
                  </div>
                  <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
                    <span>✓ 初期費用¥0</span>
                    <span>✓ いつでも解約OK</span>
                    <span>✓ クレカ登録不要</span>
                  </p>
                </FadeIn>
              </div>
              <FadeIn delay={0.2} className="mt-8 w-full max-w-md mx-auto lg:mt-0 lg:max-w-none">
                <div className="relative">
                  <Image src="/images/hero-illustration.jpg" alt="FUJIMI DX Labの業務改善ツールで予約・シフト・問い合わせを効率化するイメージ" width={600} height={400} className="rounded-2xl" priority />
                </div>
                {/* 社会的証明 */}
                <div className="mt-6 flex items-center gap-6 rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-orange-400">3</p>
                    <p className="text-xs text-slate-400">ツール運用中</p>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-orange-400">毎日</p>
                    <p className="text-xs text-slate-400">自社旅館で実証</p>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="text-center">
                    <p className="text-2xl font-extrabold text-orange-400">¥0</p>
                    <p className="text-xs text-slate-400">から始められる</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ─── 業種選択 ─── */}
        <section id="industry" className="bg-white px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-500">INDUSTRY</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  あなたの業種に合ったプランをご提案
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  業種ごとに最適なツールの組み合わせをご用意しています。
                </p>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRIES.map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.05}>
                  <a
                    href={item.href}
                    className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <h3 className="absolute bottom-3 left-4 text-lg font-bold text-white drop-shadow-lg">
                        {item.label}
                      </h3>
                    </div>
                    <div className="p-5">
                      <p className="text-sm leading-relaxed text-gray-500">{item.description}</p>
                      <span
                        className="mt-3 inline-block text-sm font-semibold transition-transform group-hover:translate-x-1"
                        style={{ color: item.color }}
                      >
                        最適なプランを確認 →
                      </span>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── サービス一覧 ─── */}
        <section id="solutions" style={{ backgroundColor: "#f9fafb" }} className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-500">SERVICES</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  必要なものだけ、1つから使えます
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  全部入りではなく、あなたに必要なツールだけ選べます。
                  <br />
                  <strong className="text-gray-700">成長に合わせて、いつでも追加OK。</strong>
                </p>
              </div>
            </FadeIn>

            {/* メインサービス */}
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {SERVICES.map((s, i) => (
                <FadeIn key={s.name} delay={i * 0.1}>
                  <a
                    href={s.href}
                    className="group relative block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    {s.badge && (
                      <span
                        className="absolute top-3 right-3 z-10 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg"
                        style={{ backgroundColor: s.color }}
                      >
                        {s.badge}
                      </span>
                    )}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <h3 className="text-lg font-bold text-white drop-shadow-lg">
                          {s.name}
                        </h3>
                        <p className="text-xs text-white/80">{s.tagline}</p>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm leading-relaxed text-gray-600">{s.features}</p>
                      <p className="mt-3 text-base font-bold" style={{ color: s.color }}>
                        {s.price}
                      </p>
                      <span className="mt-2 inline-block text-sm font-semibold text-gray-400 group-hover:translate-x-1 transition-transform">
                        {s.cta} →
                      </span>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>

            {/* Coming Soon */}
            <FadeIn delay={0.3}>
              <div className="mt-10 rounded-2xl border border-dashed border-gray-200 bg-white/50 p-6">
                <p className="mb-4 text-center text-sm font-bold text-gray-400">Coming Soon — 続々登場予定</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {COMING_SOON.map((item) => (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-500"
                    >
                      <span>{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xs text-gray-400">{item.tagline}</span>
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-400">
                    + その他続々…
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── 競合比較 ─── */}
        <section className="bg-white px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">COMPARISON</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  一般的なツールの組合せと比べてください
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-14 grid gap-6 md:grid-cols-2">
                {/* 一般的な組合せ */}
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
                  <p className="text-sm font-bold text-gray-400">一般的な組合せ</p>
                  <p className="mt-2 text-3xl font-extrabold text-gray-800">
                    ¥17,340<span className="text-base font-normal text-gray-400">/月〜</span>
                  </p>
                  <div className="mt-6 space-y-4">
                    {[
                      ["予約管理ツール", "¥9,790"],
                      ["LINE公式 + 拡張ツール", "+¥4,400"],
                      ["AI問い合わせ対応", "+¥1,500〜"],
                      ["シフト管理ツール", "+¥1,650〜"],
                    ].map(([label, price]) => (
                      <div key={label} className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-0">
                        <span className="text-sm text-gray-600">{label}</span>
                        <span className="text-sm font-semibold text-gray-700">{price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* FUJIMIN PASS */}
                <div className="relative rounded-2xl border-2 border-orange-400 bg-orange-50 p-6 md:p-8">
                  <span className="absolute -top-3 left-6 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">
                    おすすめ
                  </span>
                  <p className="text-sm font-bold text-orange-600">FUJIMIN PASS</p>
                  <p className="mt-2 text-3xl font-extrabold text-gray-800">
                    ¥550<span className="text-base font-normal text-gray-400">/月〜</span>
                  </p>
                  <div className="mt-6 space-y-4">
                    {[
                      ["予約管理（ReserveNavi）", "¥0〜¥4,980"],
                      ["AI自動応答（AskNavi）", "¥550〜"],
                      ["AI問い合わせ対応", "標準搭載"],
                      ["シフト管理（ShiftNavi）", "¥0〜¥550"],
                    ].map(([label, price]) => (
                      <div key={label} className="flex items-center justify-between border-b border-orange-200 pb-3 last:border-0">
                        <span className="text-sm text-gray-700">{label}</span>
                        <span className="text-sm font-bold text-orange-600">{price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 text-center text-sm text-gray-500">
                ※ 一般的な組合せの価格は主要サービスの公開価格を参考にした概算です
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ─── 導入実績 ─── */}
        <section style={{ backgroundColor: "#f9fafb" }} className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">CASE STUDY</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">開発者自身が、毎日使っています</h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  自社旅館で毎日運用し、改善を重ねたツールだけを提供しています。
                </p>
                <div className="mx-auto mt-6 flex items-center justify-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg" style={{ backgroundColor: "#eef2ff" }}>🏨</div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-800">Tabist ゆ縁の宿ふじみ</p>
                    <p className="text-xs text-gray-500">静岡県富士市のビジネスホテル</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "💬",
                  name: "AskNavi",
                  color: "#14b8a6",
                  text: "お客様からの問い合わせにAIが24時間対応。スタッフは接客に集中できるようになりました",
                },
                {
                  icon: "📊",
                  name: "ShiftNavi",
                  color: "#3b82f6",
                  text: "Excel作業が大幅に短縮。AIがシフトを自動作成し、スタッフの休み希望もスマホで収集",
                },
                {
                  icon: "📅",
                  name: "ReserveNavi",
                  color: "#f97316",
                  text: "LINE経由の予約を自動管理。電話対応が減り、予約の取りこぼしもなくなりました",
                },
              ].map((item, i) => (
                <FadeIn key={item.name} delay={i * 0.1}>
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className="font-bold" style={{ color: item.color }}>{item.name}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">{item.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.3}>
              <p className="mt-12 text-center text-[15px] font-medium text-gray-800">
                同じ悩みを持つお店に、この仕組みを届けたい。それがFUJIMI DX Labの原点です。
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ─── 選ばれる理由 ─── */}
        <section className="bg-white px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-500">WHY US</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">選ばれる3つの理由</h2>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  num: "01",
                  emoji: "🏨",
                  title: "現場が作った、現場のためのツール",
                  description:
                    "自分たちのホテルで毎日使っているから、本当に必要な機能だけを搭載。大企業向けの複雑さはありません。",
                },
                {
                  num: "02",
                  emoji: "🧩",
                  title: "1つから始めて、必要な時にだけ追加",
                  description:
                    "全部入りパッケージではなく、必要なツールだけ選べます。使わない機能に払う無駄はゼロ。",
                },
                {
                  num: "03",
                  emoji: "💰",
                  title: "請求書を見て5秒で理解できる料金",
                  description:
                    "複雑な従量課金や隠れたオプション料金はありません。選んだツールの月額だけ。ShiftNaviはフリープラン¥0から。",
                },
              ].map((item, i) => (
                <FadeIn key={item.num} delay={i * 0.1}>
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="text-xs font-bold text-gray-300">{item.num}</span>
                    <span className="mt-2 block text-3xl">{item.emoji}</span>
                    <h3 className="mt-3 text-base font-bold text-gray-800">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 料金ざっくり ─── */}
        <section style={{ backgroundColor: "#f9fafb" }} className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-500">PRICING</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">料金のめやす</h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  使うツールだけお支払い。初期費用・解約金は一切ありません。
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-14 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="px-6 py-4 text-sm font-bold text-gray-600">サービス</th>
                      <th className="px-6 py-4 text-sm font-bold text-gray-600 text-right">月額</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "ReserveNavi（予約管理）", price: "無料〜¥4,980", color: "#f97316" },
                      { name: "AskNavi（AI自動応答）", price: "¥550〜¥5,500", color: "#14b8a6" },
                      { name: "ShiftNavi（シフト管理）", price: "フリー¥0 / スタンダード¥550", color: "#3b82f6" },
                    ].map((row) => (
                      <tr key={row.name} className="border-b border-gray-50 last:border-0">
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium" style={{ color: row.color }}>
                            {row.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-bold text-gray-800">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-8 text-center">
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  料金の詳細を見る →
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── お知らせ ─── */}
        <LatestNews />

        {/* ─── CTA（お問い合わせ） ─── */}
        <section id="contact" className="relative overflow-hidden px-4 py-24 text-white md:py-32" style={{ background: "radial-gradient(ellipse at 20% 0%, #1e3a5f 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, #2d1b4e 0%, transparent 50%), linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)" }}>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">CONTACT</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                「うちでも使えるかな？」
                <br />
                <span className="text-slate-300">まずは気軽にご相談ください</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-slate-400">
                「1つだけ試したい」「まずは話を聞きたい」<br />なんでもお気軽にどうぞ。
              </p>
              <p className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-slate-500">
                <span>✓ 初期費用¥0</span>
                <span>✓ いつでも解約OK</span>
                <span>✓ 無理な勧誘は一切なし</span>
              </p>
              <div className="mt-10"><ContactForm /></div>
            </FadeIn>
          </div>
        </section>

        {/* ─── FUJIMI DX Labとは ─── */}
        <section className="bg-white px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">ABOUT</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">FUJIMI DX Labとは</h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-8 text-center text-[15px] leading-relaxed text-gray-600">
                ふじみ企業有限会社が運営するDX事業部です。<br />
                静岡県富士市でビジネスホテルを運営する中で生まれた、小さなお店のための業務改善ツールを開発・提供しています。
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <dl className="divide-y divide-gray-100">
                  {([
                    ["会社名", "ふじみ企業有限会社"],
                    ["事業部", "FUJIMI DX Lab事業部"],
                    ["所在地", "〒417-0043 静岡県富士市新田島町3-20"],
                    ["事業内容", "小規模事業者向けDXツールの開発・提供"],
                    ["運営施設", <a key="f" href="https://fujimi-ryokan.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#4f46e5" }}>Tabist ゆ縁の宿ふじみ（ビジネスホテル）</a>],
                    ["メール", <a key="e" href="mailto:support@mail.fujimin-pass.com" className="hover:underline" style={{ color: "#4f46e5" }}>support@mail.fujimin-pass.com</a>],
                  ] as [string, React.ReactNode][]).map(([dt, dd]) => (
                    <div key={dt} className="flex flex-col py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4">
                      <dt className="w-28 shrink-0 text-sm font-medium text-gray-400">{dt}</dt>
                      <dd className="text-sm text-gray-800">{dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
