import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FadeIn from "../../components/FadeIn";

export const metadata: Metadata = {
  title: "ShiftNavi | AIシフト管理 - FUJIMI DX Lab",
  description:
    "シフト調整をまるごとデジタルに。休み希望はスマホから、シフト作成はAIでワンタッチ。印刷もOK。",
};

const FEATURES = [
  {
    icon: "🤖",
    title: "AIワンタッチ作成",
    description:
      "自然な言葉で指示するだけ。「木曜は2人体制で」「田中さんは夜勤NG」をAIが理解してシフト生成。",
  },
  {
    icon: "📱",
    title: "スマホで休み希望",
    description:
      "従業員さんがスマホから休み希望を簡単に提出。手書き→転記の手間ゼロ。",
  },
  {
    icon: "🖱️",
    title: "ドラッグ&ドロップ編集",
    description:
      "AIが作ったシフトをカレンダー上でドラッグ&ドロップで微調整。",
  },
  {
    icon: "📄",
    title: "A4印刷対応",
    description:
      "PDF出力でキレイにA4印刷。デジタルが苦手なスタッフにも配慮。",
  },
  {
    icon: "📸",
    title: "バージョン管理",
    description:
      "月3回までスナップショット保存。「あのパターンに戻したい」にも対応。",
  },
  {
    icon: "🎨",
    title: "リーダー設定",
    description:
      "部門ごとにリーダーを設定。カラーテーマで視覚的に区別。",
  },
];

const IDEAL_CUSTOMERS = [
  {
    icon: "🏨",
    title: "宿泊施設",
    description: "早番・遅番・夜勤など複雑なシフトパターンがある施設に。",
  },
  {
    icon: "🍽️",
    title: "飲食店",
    description: "パート・アルバイトが多く、毎月のシフト調整が大変なお店に。",
  },
  {
    icon: "💇",
    title: "サロン",
    description: "スタイリストの出勤日管理、指名予約との連携を考えているお店に。",
  },
  {
    icon: "🏥",
    title: "クリニック",
    description: "看護師・受付スタッフのシフト管理を効率化したい医院に。",
  },
];

export default function ShiftNaviPage() {
  return (
    <>
      <Header />
      <main>
        {/* ═══ Hero ═══ */}
        <section className="noise relative min-h-[70vh] overflow-hidden bg-mesh-emerald px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <FadeIn>
                  <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-emerald-200 backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    ← FUJIMI DX Lab トップ
                  </Link>
                </FadeIn>
                <FadeIn delay={0.05}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-2xl">
                      ⏰
                    </span>
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold tracking-wider text-emerald-200 uppercase">
                      シフト管理
                    </span>
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1
                    className="text-gradient text-4xl font-extrabold tracking-tight md:text-5xl"
                    style={{ lineHeight: 1.15 }}
                  >
                    ShiftNavi
                  </h1>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <p className="mt-6 text-xl font-medium text-emerald-100">
                    シフト調整ってすごく時間かかる。
                    <br />
                    従業員さんの休み希望も手書きでもらって、
                    <br />
                    転記して、Excelで、、、
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="mt-4 max-w-lg leading-relaxed text-slate-300">
                    まるごとデジタルに！休み希望はスマホで簡単に。
                    <br />
                    シフト作成もまずはAIでワンタッチ作成！
                  </p>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <div className="mt-8">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-[0_0_20px_rgba(16,185,129,0.3),0_0_60px_rgba(16,185,129,0.1)] transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                    >
                      導入のご相談はこちら
                    </a>
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={0.15} className="hidden lg:block">
                <div className="relative">
                  <Image
                    src="/images/shift-navi.jpg"
                    alt="ShiftNavi AIシフト管理イメージ"
                    width={560}
                    height={560}
                    className="rounded-2xl"
                    priority
                  />
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-emerald-500/20 blur-3xl" />
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="pointer-events-none absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />
        </section>

        {/* ═══ Pain → Solution ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-emerald-600 uppercase">
                  Before → After
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  ShiftNaviで、こう変わる
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
                      休み希望を紙で集めて、Excelに手入力
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      シフト作成に毎月何時間もかかる
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      「この人とこの人は同じ日は避けて」の調整が複雑
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      急な欠勤で代わりを探すのに一苦労
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      シフト表の共有が面倒（LINE写真で送る等）
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="h-full rounded-2xl border border-emerald-200/60 bg-emerald-50 p-7">
                  <p className="mb-4 text-xs font-bold tracking-wider text-emerald-600 uppercase">
                    After — ShiftNaviなら
                  </p>
                  <ul className="space-y-3 text-[15px] leading-relaxed text-gray-700">
                    <li className="flex gap-2">
                      <span className="shrink-0 text-emerald-500">◎</span>
                      従業員がスマホから直接休み希望を入力
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-emerald-500">◎</span>
                      AIがワンタッチでシフト案を自動生成
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-emerald-500">◎</span>
                      条件を自然な言葉で指示するだけでOK
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-emerald-500">◎</span>
                      ドラッグ&ドロップで簡単微調整
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-emerald-500">◎</span>
                      公開ボタンひとつでスタッフに共有。印刷もOK
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
                <p className="text-sm font-semibold tracking-[0.15em] text-emerald-600 uppercase">
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

        {/* ═══ AI シフト作成デモ ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-emerald-600 uppercase">
                  AI Shift Generation
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  AIに話しかけるだけ
                </h2>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="mt-14 rounded-2xl border border-gray-200/60 bg-white p-8">
                <div className="space-y-6">
                  <div className="rounded-xl bg-emerald-50 p-5">
                    <p className="mb-2 text-xs font-bold text-emerald-600">あなたの指示</p>
                    <p className="text-[15px] text-gray-700">
                      &quot;月〜金は必ず3人以上。土日は4人。田中さんは水曜固定休み。佐藤さんと鈴木さんは同じ日にしないで。&quot;
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                      ↓
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-5">
                    <p className="mb-2 text-xs font-bold text-slate-500">AIの結果</p>
                    <p className="text-[15px] text-gray-700">
                      条件を満たすシフト案を自動生成。ドラッグ&ドロップで微調整も自由自在。
                      納得がいかなければ、追加指示で再生成もOK！
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ Ideal Customers ═══ */}
        <section className="bg-slate-50 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-emerald-600 uppercase">
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
          className="noise relative overflow-hidden bg-mesh-emerald px-4 py-24 text-white md:py-32"
        >
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                まずは気軽にご相談ください
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-emerald-100/80">
                「何人くらいから使える？」「まずは試してみたい」
                <br />
                なんでもお気軽にどうぞ。
              </p>
              <div className="mt-10">
                <a
                  href="mailto:support@mail.fujimin-pass.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                >
                  メールで問い合わせ →
                </a>
              </div>
              <p className="mt-6 text-sm text-emerald-200/70">
                support@mail.fujimin-pass.com | 平日 10:00〜17:00
              </p>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
