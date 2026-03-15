import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FadeIn from "../../components/FadeIn";

export const metadata: Metadata = {
  title: "FUJIMIN PASS | 統合DXプラットフォーム - FUJIMI DX Lab",
  description:
    "ひとつのアカウントで、予約・シフト・LINE運用・社内規則・SNS管理をまるごとカバー。小規模事業者のための統合DXプラットフォーム。",
};

const PRODUCTS = [
  {
    name: "Reserve Navi",
    tagline: "予約管理",
    icon: "📅",
    color: "blue",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-600",
    borderClass: "border-blue-200/60",
    href: "/products/reserve-navi",
    description: "LINEから簡単予約。業種別テンプレートで現場にフィット。",
  },
  {
    name: "AskNavi",
    tagline: "LINE AI応答",
    icon: "💬",
    color: "amber",
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-600",
    borderClass: "border-amber-200/60",
    href: "/products/ask-navi",
    description: "AIが公式LINEで自動応答。セグメント配信で再来店を促進。",
  },
  {
    name: "ShiftNavi",
    tagline: "シフト管理",
    icon: "⏰",
    color: "emerald",
    bgClass: "bg-emerald-500/10",
    textClass: "text-emerald-600",
    borderClass: "border-emerald-200/60",
    href: "/products/shift-navi",
    description: "AIがシフト自動作成。休み希望もスマホで完結。",
  },
  {
    name: "RuleNavi",
    tagline: "社内規則AI検索",
    icon: "📋",
    color: "violet",
    bgClass: "bg-violet-500/10",
    textClass: "text-violet-600",
    borderClass: "border-violet-200/60",
    href: "/products/rule-navi",
    description: "就業規則やマニュアルをAIがわかりやすく回答。",
  },
  {
    name: "SocialNavi",
    tagline: "SNS一元管理",
    icon: "📣",
    color: "pink",
    bgClass: "bg-pink-500/10",
    textClass: "text-pink-600",
    borderClass: "border-pink-200/60",
    href: "/products/social-navi",
    description: "X・Instagram・TikTok・Facebookをまとめて管理。",
  },
];

const BENEFITS = [
  {
    icon: "🔑",
    title: "ひとつのアカウント",
    description:
      "FUJIMIN PASSのアカウントひとつで、すべてのNaviツールにログイン。IDやパスワードをバラバラに管理する必要なし。",
  },
  {
    icon: "🧩",
    title: "ひとつから始められる",
    description:
      "「予約管理だけ」「シフト管理だけ」でOK。必要になったら追加するだけ。無理なく、自分のペースで。",
  },
  {
    icon: "🔗",
    title: "つなげるともっと便利",
    description:
      "Reserve NaviとAskNaviを連携すれば、予約データをもとにしたLINE配信が可能。組み合わせるほど効果が広がる。",
  },
  {
    icon: "💰",
    title: "シンプルな料金体系",
    description:
      "使うNaviの数だけ。大規模システムのように「全部入りで高額」ではありません。小さく始めて、必要に応じて拡張。",
  },
  {
    icon: "📱",
    title: "スマホでどこからでも",
    description:
      "すべてのNaviツールはスマホ対応。お店にいなくても、移動中でも確認・操作できます。",
  },
  {
    icon: "🛡️",
    title: "安心のセキュリティ",
    description:
      "統合認証基盤だからこそ、セキュリティも一元管理。お客様の大切なデータをしっかり守ります。",
  },
];

export default function FujiminPassPage() {
  return (
    <>
      <Header />
      <main>
        {/* ═══ Hero ═══ */}
        <section className="noise relative min-h-[70vh] overflow-hidden bg-mesh-hero px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <FadeIn>
                <Link
                  href="/"
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-blue-200 backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  ← FUJIMI DX Lab トップ
                </Link>
              </FadeIn>
              <FadeIn delay={0.05}>
                <p className="mb-5 inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 backdrop-blur-sm">
                  統合DXプラットフォーム
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1
                  className="text-gradient text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
                  style={{ lineHeight: 1.15 }}
                >
                  FUJIMIN PASS
                </h1>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mt-8 text-xl leading-relaxed text-slate-300 md:text-2xl">
                  ひとつのアカウントで、
                  <br />
                  <strong className="text-white">お店のDXをまるごとカバー。</strong>
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mx-auto mt-4 max-w-lg text-base text-slate-400">
                  予約・LINE運用・シフト・社内規則・SNS——
                  <br />
                  必要なものだけ、1つから。あなたのペースではじめるDX。
                </p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <div className="mt-10">
                  <a
                    href="#contact"
                    className="glow-blue glow-blue-hover inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                  >
                    お問い合わせはこちら
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="pointer-events-none absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
        </section>

        {/* ═══ エコシステム図 ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-primary uppercase">
                  Ecosystem
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  FUJIMIN PASSでつながる5つのNaviツール
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  ひとつのアカウントで、必要なツールを自由に組み合わせ。
                  <br />
                  もちろん<strong className="text-gray-700">1つだけ</strong>でもOKです。
                </p>
              </div>
            </FadeIn>

            {/* FUJIMIN PASS中心のハブ図 */}
            <FadeIn>
              <div className="relative mt-16">
                {/* 中央: FUJIMIN PASS */}
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/5 md:h-36 md:w-36">
                  <div className="text-center">
                    <p className="text-xs font-bold text-primary md:text-sm">FUJIMIN</p>
                    <p className="text-xs font-bold text-primary md:text-sm">PASS</p>
                    <p className="mt-0.5 text-[10px] text-gray-400">SSO認証</p>
                  </div>
                </div>

                {/* 接続線（装飾的） */}
                <div className="mx-auto mt-4 flex items-center justify-center gap-1">
                  <div className="h-px w-8 bg-gray-200" />
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/30" />
                  <div className="h-px w-8 bg-gray-200" />
                </div>
              </div>
            </FadeIn>

            {/* プロダクトカード */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.map((p, i) => (
                <FadeIn key={p.name} delay={i * 0.06}>
                  <Link
                    href={p.href}
                    className={`group block h-full rounded-2xl border ${p.borderClass} bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${p.bgClass} text-xl`}
                      >
                        {p.icon}
                      </span>
                      <div>
                        <p className="text-base font-bold">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.tagline}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-gray-500">
                      {p.description}
                    </p>
                    <p
                      className={`mt-3 text-sm font-semibold ${p.textClass} transition-transform group-hover:translate-x-1`}
                    >
                      詳しく見る →
                    </p>
                  </Link>
                </FadeIn>
              ))}

              {/* 追加予定カード */}
              <FadeIn delay={0.35}>
                <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center">
                  <div>
                    <span className="text-3xl">🚀</span>
                    <p className="mt-3 text-sm font-bold text-gray-400">
                      さらに拡張予定
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      現場の声から、新しいNaviツールを開発中。
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ═══ Benefits ═══ */}
        <section className="bg-slate-50 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-primary uppercase">
                  Benefits
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  FUJIMIN PASSだからできること
                </h2>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BENEFITS.map((b, i) => (
                <FadeIn key={b.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-gray-200/60 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <span className="text-3xl">{b.icon}</span>
                    <h3 className="mt-4 text-base font-bold">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      {b.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 始め方 ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-primary uppercase">
                  Getting Started
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  はじめ方はかんたん
                </h2>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "1",
                  title: "ご相談",
                  desc: "お店の課題をヒアリング。最適なNaviをご提案。",
                },
                {
                  step: "2",
                  title: "アカウント作成",
                  desc: "FUJIMIN PASSアカウントを発行。すぐに使い始められます。",
                },
                {
                  step: "3",
                  title: "Naviを選ぶ",
                  desc: "まずは1つから。必要なNaviだけ有効化。",
                },
                {
                  step: "4",
                  title: "運用開始！",
                  desc: "困ったことがあればいつでもサポート。",
                },
              ].map((s, i) => (
                <FadeIn key={s.step} delay={i * 0.08}>
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                      {s.step}
                    </div>
                    <h3 className="mt-4 text-base font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Before → After ═══ */}
        <section className="bg-slate-50 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-primary uppercase">
                  Before → After
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  FUJIMIN PASSで、こう変わる
                </h2>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <FadeIn>
                <div className="h-full rounded-2xl border border-orange-200/60 bg-orange-50 p-7">
                  <p className="mb-4 text-xs font-bold tracking-wider text-orange-500 uppercase">
                    Before — バラバラなツール
                  </p>
                  <ul className="space-y-3 text-[15px] leading-relaxed text-gray-700">
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      予約はA社、シフトはExcel、SNSは各アプリ…
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      ツールごとにID/パスワードが違う
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      データが連携しないから二重入力
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      ツールの合計費用がかさむ
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      「結局アナログに戻る」の繰り返し
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="h-full rounded-2xl border border-blue-200/60 bg-blue-50 p-7">
                  <p className="mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase">
                    After — FUJIMIN PASSなら
                  </p>
                  <ul className="space-y-3 text-[15px] leading-relaxed text-gray-700">
                    <li className="flex gap-2">
                      <span className="shrink-0 text-blue-500">◎</span>
                      ひとつのアカウントで全部使える
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-blue-500">◎</span>
                      ログイン1回ですべてのNaviにアクセス
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-blue-500">◎</span>
                      予約データ×LINE配信など、ツール間連携
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-blue-500">◎</span>
                      必要なNaviだけ選べるから無駄なコストゼロ
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-blue-500">◎</span>
                      シンプルだから定着する。現場で使い続けられる
                    </li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section
          id="contact"
          className="noise relative overflow-hidden bg-gradient-cta px-4 py-24 text-white md:py-32"
        >
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                「うちでも使えるかな？」
                <br />
                <span className="text-blue-200">まずは気軽にご相談ください</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-blue-100/80">
                「1つだけ試したい」「まずは話を聞きたい」
                <br />
                なんでもお気軽にどうぞ。
              </p>
              <div className="mt-10">
                <a
                  href="mailto:support@mail.fujimin-pass.com"
                  className="glow-blue inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                >
                  メールで問い合わせ →
                </a>
              </div>
              <p className="mt-8 text-sm text-blue-200/70">
                support@mail.fujimin-pass.com | 平日 10:00〜17:00
              </p>
            </FadeIn>
          </div>
          <div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-gradient-to-b from-black/10 to-transparent" />
        </section>
      </main>
      <Footer />
    </>
  );
}
