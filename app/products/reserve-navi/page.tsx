import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";

export const metadata: Metadata = {
  title: "Reserve Navi | LINE予約管理 - FUJIMI DX Lab",
  description:
    "LINEから簡単予約。シンプルで低コスト、業種別テンプレートで現場にフィットする予約管理システム。",
};

const FEATURES = [
  {
    icon: "📱",
    title: "LINEでかんたん予約",
    description:
      "お客様はLINEミニアプリから4ステップで予約完了。アプリのダウンロード不要。",
  },
  {
    icon: "🏷️",
    title: "業種別テンプレート",
    description:
      "マッサージ・ネイル・レンタル・飲食店など、業種ごとの予約フォーマットを用意。",
  },
  {
    icon: "🔔",
    title: "無料通知メッセージ",
    description:
      "予約確認・リマインダー・変更通知をLINEのサービスメッセージで無料送信。",
  },
  {
    icon: "📅",
    title: "カレンダー管理",
    description:
      "管理画面で予約を一覧表示。日・週・月のカレンダービューで直感的に確認。",
  },
  {
    icon: "👥",
    title: "顧客管理",
    description:
      "予約履歴・来店回数を自動記録。リピーター管理もこれひとつ。",
  },
  {
    icon: "⚙️",
    title: "柔軟な設定",
    description:
      "キャンセル期限、指名料金、リソース管理など、お店に合わせて細かく設定可能。",
  },
];

const IDEAL_CUSTOMERS = [
  {
    icon: "💇",
    title: "サロン・美容室",
    description: "スタイリスト指名予約、メニュー別の所要時間設定が必要なお店に。",
  },
  {
    icon: "💆",
    title: "リラクゼーション",
    description: "施術メニューごとの予約枠管理、セラピスト指名に対応。",
  },
  {
    icon: "🍽️",
    title: "飲食店",
    description: "席数管理、コース予約、少人数〜団体まで柔軟に対応。",
  },
  {
    icon: "🏨",
    title: "宿泊施設",
    description: "客室タイプ別の在庫管理、チェックイン・アウト時間の設定に。",
  },
];

export default function ReserveNaviPage() {
  return (
    <>
      <Header />
      <main>
        {/* ═══ Hero ═══ */}
        <section className="noise relative min-h-[70vh] overflow-hidden bg-mesh-blue px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <FadeIn>
                  <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-blue-200 backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    ← FUJIMI DX Lab トップ
                  </Link>
                </FadeIn>
                <FadeIn delay={0.05}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-2xl">
                      📅
                    </span>
                    <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold tracking-wider text-blue-200 uppercase">
                      予約管理
                    </span>
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1
                    className="text-gradient text-4xl font-extrabold tracking-tight md:text-5xl"
                    style={{ lineHeight: 1.15 }}
                  >
                    Reserve Navi
                  </h1>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <p className="mt-6 text-xl font-medium text-blue-100">
                    予約システム、、、高すぎる。
                    <br />
                    こんなに機能いらないのに、、、
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="mt-4 max-w-lg leading-relaxed text-slate-300">
                    シンプルにLINEから予約。スマホで確認。
                    <br />
                    とにかくシンプル。そして徹底的に業界対応。
                  </p>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <div className="mt-8">
                    <a
                      href="#contact"
                      className="glow-blue glow-blue-hover inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                    >
                      導入のご相談はこちら
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
                    className="rounded-2xl"
                    priority
                  />
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-blue-500/20 blur-3xl" />
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="pointer-events-none absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />
        </section>

        {/* ═══ Pain → Solution ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-blue-600 uppercase">
                  Before → After
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Reserve Naviで、こう変わる
                </h2>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <FadeIn>
                <div className="h-full rounded-2xl border border-orange-200/60 bg-orange-50 p-7">
                  <p className="mb-4 text-xs font-bold tracking-wider text-orange-500 uppercase">
                    Before — いまの困りごと
                  </p>
                  <ul className="space-y-3 text-[15px] leading-relaxed text-gray-700">
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      電話で予約を受けて、紙のノートに書く
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      施術中・接客中に電話が鳴って対応できない
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      ダブルブッキングが怖い
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      予約システムは月額が高すぎて手が出ない
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      無断キャンセルに悩んでいる
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="h-full rounded-2xl border border-blue-200/60 bg-blue-50 p-7">
                  <p className="mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase">
                    After — Reserve Naviなら
                  </p>
                  <ul className="space-y-3 text-[15px] leading-relaxed text-gray-700">
                    <li className="flex gap-2">
                      <span className="shrink-0 text-blue-500">◎</span>
                      LINEから24時間いつでも予約受付
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-blue-500">◎</span>
                      電話に出られなくても予約が入る
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-blue-500">◎</span>
                      リアルタイム空き状況でダブルブッキングゼロ
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-blue-500">◎</span>
                      シンプルな料金で手軽に始められる
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-blue-500">◎</span>
                      自動リマインダーで無断キャンセル激減
                    </li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ═══ Features ═══ */}
        <section className="bg-slate-50 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-blue-600 uppercase">
                  Features
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  主な機能
                </h2>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f, i) => (
                <FadeIn key={f.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-gray-200/60 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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

        {/* ═══ LINE予約フロー ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-blue-600 uppercase">
                  How it works
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  たった4ステップで予約完了
                </h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  お客様はLINEを開くだけ。アプリのダウンロードは不要です。
                </p>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "1", title: "LINEを開く", desc: "公式LINEからミニアプリを起動" },
                { step: "2", title: "メニューを選ぶ", desc: "施術・コース・プランを選択" },
                { step: "3", title: "日時を選ぶ", desc: "空いている日時がリアルタイム表示" },
                { step: "4", title: "予約確定！", desc: "確認メッセージがLINEに届く" },
              ].map((s, i) => (
                <FadeIn key={s.step} delay={i * 0.08}>
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
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

        {/* ═══ Ideal Customers ═══ */}
        <section className="bg-slate-50 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-blue-600 uppercase">
                  Best for
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  こんなお店に最適です
                </h2>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {IDEAL_CUSTOMERS.map((c, i) => (
                <FadeIn key={c.title} delay={i * 0.06}>
                  <div className="h-full rounded-2xl border border-gray-200/60 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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

        {/* ═══ CTA ═══ */}
        <section
          id="contact"
          className="noise relative overflow-hidden bg-mesh-blue px-4 py-24 text-white md:py-32"
        >
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                まずは気軽にご相談ください
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-blue-100/80">
                「うちの業種でも使える？」「料金は？」
                <br />
                なんでもお気軽にどうぞ。
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
