import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FadeIn from "../../components/FadeIn";

export const metadata: Metadata = {
  title: "RuleNavi | 社内規則AI検索 - FUJIMI DX Lab",
  description:
    "就業規則やマニュアルをAIがわかりやすく回答。PDF取り込み、FAQ自動生成で、社内の知識をまるごとデジタル化。",
};

const FEATURES = [
  {
    icon: "📄",
    title: "PDF自動取り込み",
    description:
      "就業規則やマニュアルのPDFをアップロードするだけ。AIが条文を自動で分割・整理。",
  },
  {
    icon: "🤖",
    title: "AIチャット検索",
    description:
      "「有給って何日残ってる？」「遅刻の届け出はどうする？」自然な言葉で質問するだけ。",
  },
  {
    icon: "❓",
    title: "FAQ自動生成",
    description:
      "取り込んだ規則からよくある質問を自動生成。2タップで答えにたどり着ける。",
  },
  {
    icon: "🔄",
    title: "ハイブリッド検索",
    description:
      "FAQ一覧から選ぶことも、AIに直接聞くこともOK。FAQで解決しなければAIチャットへ。",
  },
  {
    icon: "📊",
    title: "未回答検知",
    description:
      "AIが答えられなかった質問を自動検知。管理者が知識を追加して、どんどん頼れる存在に。",
  },
  {
    icon: "🏢",
    title: "マルチテナント",
    description:
      "部門ごとにロゴ・カラー・ナレッジを分離。複数部門でも安心して運用可能。",
  },
];

const IDEAL_CUSTOMERS = [
  {
    icon: "🏨",
    title: "宿泊施設",
    description: "フロント・客室・厨房、部門ごとのマニュアルが多い施設に。",
  },
  {
    icon: "🏥",
    title: "クリニック",
    description: "医療安全マニュアル、感染対策、就業規則など文書が多い医院に。",
  },
  {
    icon: "🏢",
    title: "中小企業全般",
    description: "就業規則はあるけど誰も読まない、聞かれるたびに調べる…という会社に。",
  },
  {
    icon: "🏋️",
    title: "フランチャイズ",
    description: "オペレーションマニュアルを全店舗で共有・検索したいチェーン店に。",
  },
];

export default function RuleNaviPage() {
  return (
    <>
      <Header />
      <main>
        {/* ═══ Hero ═══ */}
        <section className="noise relative min-h-[70vh] overflow-hidden bg-mesh-violet px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <FadeIn>
                  <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-violet-200 backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    ← FUJIMI DX Lab トップ
                  </Link>
                </FadeIn>
                <FadeIn delay={0.05}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-2xl">
                      📋
                    </span>
                    <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-semibold tracking-wider text-violet-200 uppercase">
                      社内規則AI検索
                    </span>
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1
                    className="text-gradient text-4xl font-extrabold tracking-tight md:text-5xl"
                    style={{ lineHeight: 1.15 }}
                  >
                    RuleNavi
                  </h1>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <p className="mt-6 text-xl font-medium text-violet-100">
                    就業規則。マニュアル。
                    <br />
                    紙やPDFではあるけど、
                    <br />
                    <strong>
                      私だってそんなに完璧に
                      <br />
                      把握しているわけじゃない。
                    </strong>
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="mt-4 max-w-lg leading-relaxed text-slate-300">
                    AIがあなたの会社の規則やマニュアルをわかりやすく答えます。
                    <br />
                    答えられなかった質問は、どんどん知識追加。
                  </p>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <div className="mt-8">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-[0_0_20px_rgba(139,92,246,0.3),0_0_60px_rgba(139,92,246,0.1)] transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                    >
                      導入のご相談はこちら
                    </a>
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={0.15} className="hidden lg:block">
                <div className="relative">
                  <Image
                    src="/images/rule-navi.jpg"
                    alt="RuleNavi 社内規則AI検索イメージ"
                    width={560}
                    height={560}
                    className="rounded-2xl"
                    priority
                  />
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-violet-500/20 blur-3xl" />
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="pointer-events-none absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[120px]" />
        </section>

        {/* ═══ Pain → Solution ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-violet-600 uppercase">
                  Before → After
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  RuleNaviで、こう変わる
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
                      就業規則を聞かれるたびにPDFを開いて確認
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      管理者でさえ全部の規則を把握しきれていない
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      新人が入るたびに同じことを何度も説明
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      マニュアルがあちこちに散在している
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      「これって規則上どうなの？」の確認に時間がかかる
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="h-full rounded-2xl border border-violet-200/60 bg-violet-50 p-7">
                  <p className="mb-4 text-xs font-bold tracking-wider text-violet-600 uppercase">
                    After — RuleNaviなら
                  </p>
                  <ul className="space-y-3 text-[15px] leading-relaxed text-gray-700">
                    <li className="flex gap-2">
                      <span className="shrink-0 text-violet-500">◎</span>
                      AIに聞くだけ。該当する規則をわかりやすく回答
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-violet-500">◎</span>
                      PDFをアップロードするだけで即使える
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-violet-500">◎</span>
                      新人も自分で調べられる。質問対応の負担激減
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-violet-500">◎</span>
                      全てのマニュアルをひとつに集約
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-violet-500">◎</span>
                      答えられなかった質問を管理者がフォロー → 成長するAI
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
                <p className="text-sm font-semibold tracking-[0.15em] text-violet-600 uppercase">
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

        {/* ═══ 知識の成長サイクル ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-violet-600 uppercase">
                  Growth Cycle
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  使うほど賢くなるAI
                </h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  RuleNaviは使えば使うほど、あなたの会社の頼れる相棒になります。
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { step: "1", title: "PDFを取り込む", desc: "就業規則・マニュアルをアップロード", color: "bg-violet-500" },
                  { step: "2", title: "スタッフが質問", desc: "AIが規則をもとに自然な言葉で回答", color: "bg-violet-500" },
                  { step: "3", title: "未回答を検知", desc: "答えられなかった質問を管理者に通知", color: "bg-violet-500" },
                  { step: "4", title: "知識を追加", desc: "管理者が回答を登録→次回からAIが回答", color: "bg-violet-500" },
                ].map((s) => (
                  <div key={s.step} className="text-center">
                    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${s.color} text-lg font-bold text-white`}>
                      {s.step}
                    </div>
                    <h3 className="mt-4 text-base font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ Ideal Customers ═══ */}
        <section className="bg-slate-50 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-violet-600 uppercase">
                  Best for
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  こんな組織に最適です
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
          className="noise relative overflow-hidden bg-mesh-violet px-4 py-24 text-white md:py-32"
        >
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                まずは気軽にご相談ください
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-violet-100/80">
                「うちのマニュアルでも使える？」「セキュリティは？」
                <br />
                なんでもお気軽にどうぞ。
              </p>
              <div className="mt-10">
                <a
                  href="mailto:support@mail.fujimin-pass.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                >
                  メールで問い合わせ →
                </a>
              </div>
              <p className="mt-6 text-sm text-violet-200/70">
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
