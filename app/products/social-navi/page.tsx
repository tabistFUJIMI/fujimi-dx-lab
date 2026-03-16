import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";

export const metadata: Metadata = {
  title: "SocialNavi | SNS一元管理 - FUJIMI DX Lab",
  description:
    "X、Instagram、TikTok、Facebookをまとめて管理。AI投稿文生成、予約投稿、コメント返信も一画面で。",
};

const FEATURES = [
  {
    icon: "📱",
    title: "マルチSNS一元管理",
    description:
      "X（Twitter）、Instagram、TikTok、Facebookをひとつの画面でまとめて管理。",
  },
  {
    icon: "🤖",
    title: "AI投稿文生成",
    description:
      "写真をアップするだけでAIがキャプションを生成。カジュアル・ビジネス・ポップの3トーンから選択。",
  },
  {
    icon: "📅",
    title: "予約投稿",
    description:
      "投稿を事前にスケジュール。「毎週月曜にお知らせ」も設定しておけば自動投稿。",
  },
  {
    icon: "💬",
    title: "統合受信トレイ",
    description:
      "全SNSのコメント・DMを一画面で確認・返信。自動化ルールで定型返信も可能。",
  },
  {
    icon: "📊",
    title: "AI週次レポート",
    description:
      "フォロワー数、エンゲージメント率をAIが分析。週次レポートで改善ポイントを提案。",
  },
  {
    icon: "#️⃣",
    title: "ハッシュタグ管理",
    description:
      "業種別・テーマ別のハッシュタググループを作成。ワンタッチで投稿に追加。",
  },
];

const IDEAL_CUSTOMERS = [
  {
    icon: "💇",
    title: "サロン・美容室",
    description: "ビフォーアフター写真の投稿、スタイル紹介をもっと効率的にしたいお店に。",
  },
  {
    icon: "🍽️",
    title: "飲食店・カフェ",
    description: "新メニューや日替わり情報をSNSで発信したいけど手が回らないお店に。",
  },
  {
    icon: "🏨",
    title: "宿泊施設",
    description: "客室紹介や周辺観光情報を複数SNSで発信したい施設に。",
  },
  {
    icon: "🏋️",
    title: "フィットネス・スクール",
    description: "レッスン風景やイベント告知を効率よく発信したいスタジオに。",
  },
];

const SUPPORTED_SNS = [
  { name: "X (Twitter)", color: "bg-gray-900" },
  { name: "Instagram", color: "bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400" },
  { name: "TikTok", color: "bg-gray-900" },
  { name: "Facebook", color: "bg-blue-600" },
];

export default function SocialNaviPage() {
  return (
    <>
      <Header />
      <main>
        {/* ═══ Hero ═══ */}
        <section className="noise relative min-h-[70vh] overflow-hidden bg-mesh-pink px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <FadeIn>
                  <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-pink-200 backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    ← FUJIMI DX Lab トップ
                  </Link>
                </FadeIn>
                <FadeIn delay={0.05}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20 text-2xl">
                      📣
                    </span>
                    <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-semibold tracking-wider text-pink-200 uppercase">
                      SNS一元管理
                    </span>
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1
                    className="text-gradient text-4xl font-extrabold tracking-tight md:text-5xl"
                    style={{ lineHeight: 1.15 }}
                  >
                    SocialNavi
                  </h1>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <p className="mt-6 text-xl font-medium text-pink-100">
                    SNSは大切！更新も返信もしっかりやらなくちゃ！
                    <br />
                    <strong>やらなきゃいけないってことはわかるんです。</strong>
                    <br />
                    でもなかなか手が動かない。
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="mt-4 max-w-lg leading-relaxed text-slate-300">
                    だからこそDX。
                    X、Instagram、TikTok、Facebookをまとめて管理。
                    <br />
                    AIの力で投稿も返信もかんたんに。
                  </p>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <div className="mt-8">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-[0_0_20px_rgba(236,72,153,0.3),0_0_60px_rgba(236,72,153,0.1)] transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                    >
                      導入のご相談はこちら
                    </a>
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={0.15} className="hidden lg:block">
                <div className="relative">
                  <Image
                    src="/images/social-navi.jpg"
                    alt="SocialNavi SNS一元管理イメージ"
                    width={560}
                    height={560}
                    className="rounded-2xl"
                    priority
                  />
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-pink-500/20 blur-3xl" />
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="pointer-events-none absolute top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[120px]" />
        </section>

        {/* ═══ 対応SNS ═══ */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {SUPPORTED_SNS.map((sns) => (
                  <span
                    key={sns.name}
                    className={`${sns.color} rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-md`}
                  >
                    {sns.name}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ Pain → Solution ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-pink-600 uppercase">
                  Before → After
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  SocialNaviで、こう変わる
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
                      各SNSを個別にログインして投稿している
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      投稿の文章を考えるのに時間がかかる
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      コメントやDMの返信が追いつかない
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      SNS担当者を専任で置く余裕がない
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-orange-400">✕</span>
                      効果がわからないから続かない
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="h-full rounded-2xl border border-pink-200/60 bg-pink-50 p-7">
                  <p className="mb-4 text-xs font-bold tracking-wider text-pink-600 uppercase">
                    After — SocialNaviなら
                  </p>
                  <ul className="space-y-3 text-[15px] leading-relaxed text-gray-700">
                    <li className="flex gap-2">
                      <span className="shrink-0 text-pink-500">◎</span>
                      ひとつの画面から全SNSに一括投稿
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-pink-500">◎</span>
                      AIが写真からキャプションを自動生成
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-pink-500">◎</span>
                      全SNSのコメント・DMを統合受信トレイで一元管理
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-pink-500">◎</span>
                      予約投稿で「空いた時間にまとめて作成」が可能
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-pink-500">◎</span>
                      AI週次レポートで効果を見える化
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
                <p className="text-sm font-semibold tracking-[0.15em] text-pink-600 uppercase">
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

        {/* ═══ AI投稿ワークフロー ═══ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-pink-600 uppercase">
                  How it works
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  写真を撮ったら、あとはAIにおまかせ
                </h2>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="mt-14 rounded-2xl border border-gray-200/60 bg-white p-8">
                <div className="grid gap-8 md:grid-cols-4">
                  {[
                    { step: "1", title: "写真をアップ", desc: "スマホで撮った写真をそのままアップロード" },
                    { step: "2", title: "AIがキャプション生成", desc: "3つのトーンから好みを選ぶだけ" },
                    { step: "3", title: "SNSを選択", desc: "投稿先のSNSをチェックボックスで選択" },
                    { step: "4", title: "投稿 or 予約", desc: "すぐ投稿 or スケジュール設定" },
                  ].map((s) => (
                    <div key={s.step} className="text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-lg font-bold text-white">
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
        </section>

        {/* ═══ Ideal Customers ═══ */}
        <section className="bg-slate-50 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-pink-600 uppercase">
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
          className="noise relative overflow-hidden bg-mesh-pink px-4 py-24 text-white md:py-32"
        >
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                まずは気軽にご相談ください
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-pink-100/80">
                「うちのSNSも任せられる？」「どのSNSから始めたらいい？」
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
