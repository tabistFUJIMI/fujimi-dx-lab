import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";

export const metadata: Metadata = {
  title: "AskNavi | LINE AI応答・公式LINE運用 - FUJIMI DX Lab",
  description:
    "公式LINEの運用をAIでスマートに。顧客セグメント配信、AI自動応答、予約連動で接客中でも安心。",
};

const FEATURES = [
  {
    icon: "🤖",
    title: "AI自動応答",
    description:
      "Claude Haiku搭載。お客様からの質問にAIが公式LINEで自動返信。営業時間外も安心。",
  },
  {
    icon: "🎯",
    title: "セグメント配信",
    description:
      "「3ヶ月来店なし」「先月予約した方」など、条件を指定してピンポイントにメッセージ送信。",
  },
  {
    icon: "🔗",
    title: "Reserve Navi連携",
    description:
      "予約データと連動。来店履歴をもとにした配信や、予約に関する質問にもAIが回答。",
  },
  {
    icon: "📊",
    title: "配信分析",
    description:
      "開封率・クリック率を可視化。どんなメッセージが効果的かデータで確認。",
  },
  {
    icon: "❓",
    title: "未回答検知",
    description:
      "AIが答えられなかった質問を自動検知。管理者が知識を追加してどんどん賢くなる。",
  },
  {
    icon: "💰",
    title: "FUJIMIN Points",
    description:
      "AI応答にはFUJIMIN Pointsを使用。従量課金で無駄なコストゼロ。",
  },
];

const IDEAL_CUSTOMERS = [
  {
    icon: "💇",
    title: "サロン・美容室",
    description: "施術中の問い合わせ対応に困っているお店に。AIが代わりに答えます。",
  },
  {
    icon: "🏨",
    title: "宿泊施設",
    description: "チェックイン方法やアメニティの問い合わせを自動化したい施設に。",
  },
  {
    icon: "🍽️",
    title: "飲食店",
    description: "営業時間や予約状況の問い合わせが多いお店に。",
  },
  {
    icon: "🏋️",
    title: "フィットネス",
    description: "レッスンスケジュールや料金の問い合わせ対応を効率化したい方に。",
  },
];

export default function AskNaviPage() {
  return (
    <>
      <Header />
      <main>
        {/* ═══ Hero ═══ */}
        <section className="noise relative min-h-[70vh] overflow-hidden bg-mesh-amber px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <FadeIn>
                  <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-amber-200 backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    ← FUJIMI DX Lab トップ
                  </Link>
                </FadeIn>
                <FadeIn delay={0.05}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-2xl">
                      💬
                    </span>
                    <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold tracking-wider text-amber-200 uppercase">
                      LINE AI応答
                    </span>
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1
                    className="text-gradient text-4xl font-extrabold tracking-tight md:text-5xl"
                    style={{ lineHeight: 1.15 }}
                  >
                    AskNavi
                  </h1>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <p className="mt-6 text-xl font-medium text-amber-100">
                    公式LINEの運用をしたい！
                    <br />
                    可能なら最近予約してくれた人とか、、、
                    <br />
                    <strong>3ヶ月いらっしゃっていない方にだけ送れないかな？</strong>
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="mt-4 max-w-lg leading-relaxed text-slate-300">
                    予約システムと連動した公式LINE運用を、手軽に、お得に。
                    <br />
                    接客中のお問い合わせにも、AIが代わりに答えてくれる。
                  </p>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <div className="mt-8">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-[0_0_20px_rgba(245,158,11,0.3),0_0_60px_rgba(245,158,11,0.1)] transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                    >
                      導入のご相談はこちら
                    </a>
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={0.15} className="hidden lg:block">
                <div className="relative">
                  <Image
                    src="/images/ask-navi.jpg"
                    alt="AskNavi LINE AI応答イメージ"
                    width={560}
                    height={560}
                    className="rounded-2xl"
                    priority
                  />
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-amber-500/20 blur-3xl" />
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="pointer-events-none absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[120px]" />
        </section>

        {/* ═══ Pain → Solution ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-amber-600 uppercase">
                  Before → After
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  AskNaviで、こう変わる
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
                      施術中に電話が鳴っても出られない
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      公式LINEはあるけど一斉配信しかできない
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      同じ質問に何度も手動で答えている
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      しばらく来ていないお客様のフォローができていない
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      配信ツールは高額で小規模には合わない
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="h-full rounded-2xl border border-amber-200/60 bg-amber-50 p-7">
                  <p className="mb-4 text-xs font-bold tracking-wider text-amber-600 uppercase">
                    After — AskNaviなら
                  </p>
                  <ul className="space-y-3 text-[15px] leading-relaxed text-gray-700">
                    <li className="flex gap-2">
                      <span className="shrink-0 text-amber-500">◎</span>
                      接客中でもAIが公式LINEで自動応答
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-amber-500">◎</span>
                      「3ヶ月来店なし」の方にだけ配信できる
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-amber-500">◎</span>
                      よくある質問はAIが学習して自動回答
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-amber-500">◎</span>
                      予約データ連動でリピーター育成が自動化
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-amber-500">◎</span>
                      使った分だけのポイント制で低コスト
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
                <p className="text-sm font-semibold tracking-[0.15em] text-amber-600 uppercase">
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

        {/* ═══ AI応答フロー ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-amber-600 uppercase">
                  How it works
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  AIが公式LINEで自動応答
                </h2>
              </div>
            </FadeIn>

            <div className="mt-14">
              <FadeIn>
                <div className="rounded-2xl border border-gray-200/60 bg-white p-8">
                  <div className="grid gap-8 md:grid-cols-3">
                    {[
                      {
                        step: "1",
                        title: "お客様がLINEで質問",
                        desc: "「営業時間は？」「駐車場ある？」など自然な言葉で質問",
                      },
                      {
                        step: "2",
                        title: "AIが即座に回答",
                        desc: "あなたのお店の情報をもとに、AIが的確に回答",
                      },
                      {
                        step: "3",
                        title: "答えられない場合は通知",
                        desc: "AIが回答できなかった質問は管理者に通知。知識を追加して成長",
                      },
                    ].map((s) => (
                      <div key={s.step} className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-lg font-bold text-white">
                          {s.step}
                        </div>
                        <h3 className="mt-4 text-base font-bold">{s.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-500">
                          {s.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ═══ Ideal Customers ═══ */}
        <section className="bg-slate-50 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-amber-600 uppercase">
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
          className="noise relative overflow-hidden bg-mesh-amber px-4 py-24 text-white md:py-32"
        >
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                まずは気軽にご相談ください
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-amber-100/80">
                「AIの応答精度は？」「うちでも使える？」
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
