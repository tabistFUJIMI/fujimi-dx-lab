import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";
import { ProductBreadcrumb } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "ForProject | AIプロジェクト管理PWA",
  description:
    "ForProject — イベント企画・懇親会・結婚式準備をスマホで完結管理。AIアシスタント・タスク管理・予算管理・日程調整を搭載。500円から始められるポイント制。FUJIMI DX Lab",
  alternates: { canonical: "https://fujimi-dx-lab.com/products/forproject" },
  openGraph: {
    title: "ForProject | AIプロジェクト管理PWA - FUJIMI DX Lab",
    description:
      "イベント企画・懇親会・結婚式準備をスマホで完結管理。AIアシスタント搭載。500円から始められるポイント制。",
    images: [
      {
        url: "/images/ogp.jpg",
        width: 1200,
        height: 630,
        alt: "ForProject AIプロジェクト管理",
      },
    ],
  },
};

const FEATURES = [
  { icon: "🤖", title: "AIアシスタント", description: "タスク管理・予算計算・案内文作成など、幹事業務をAIがサポート。何でも相談できます。" },
  { icon: "✅", title: "タスク管理", description: "カンバン＆リスト形式でタスクを管理。担当者・期限・チェックリストも設定可能。" },
  { icon: "💰", title: "予算管理", description: "カテゴリ別の予算設定・支出記録・精算計算。AIによる予算妥当性チェックも。" },
  { icon: "📅", title: "日程調整", description: "出欠確認・日程投票・タイムライン管理。LINEでメンバーに共有。" },
  { icon: "💡", title: "ブレインストーミング", description: "メンバーのアイデアをAIが自動分類・優先度判定。タスク・予算案として構造化。" },
  { icon: "📝", title: "完了報告書", description: "プロジェクト完了後、AIがタスク・予算・KPTを分析して報告書を自動生成。" },
];

const PACKS = [
  {
    name: "スタートパック",
    price: "¥500",
    points: "500pt",
    description: "飲み会・小イベントに",
    perPoint: "1.0円/pt",
    color: "#f59e0b",
  },
  {
    name: "たっぷりパック",
    price: "¥980",
    points: "1,200pt",
    description: "複数PJ・中規模イベントに",
    perPoint: "0.82円/pt",
    color: "#7c3aed",
    badge: "おすすめ",
  },
  {
    name: "プレミアムパック",
    price: "¥1,980",
    points: "3,000pt",
    description: "結婚式・祝賀会に",
    perPoint: "0.66円/pt",
    color: "#ef4444",
  },
];

export default function ForProjectPage() {
  return (
    <>
      <ProductBreadcrumb name="ForProject" slug="forproject" />
      <Header />

      <main className="bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
          <div className="mx-auto max-w-5xl px-4 py-20 lg:py-28 text-center">
            <FadeIn>
              <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700 mb-6">
                個人向けプロジェクト管理
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                ForProject
              </h1>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                イベント企画・懇親会・結婚式準備をスマホで完結管理。
                <br className="hidden sm:inline" />
                AIアシスタントが幹事業務をサポートします。
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://forproject.fujimin-pass.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-3.5 text-base font-bold text-white shadow-lg hover:bg-orange-600 transition-colors"
                >
                  無料で始める
                </a>
                <Link
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-slate-200 px-8 py-3.5 text-base font-bold text-slate-700 hover:border-slate-300 transition-colors"
                >
                  料金を見る
                </Link>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                基本機能は完全無料。月額ではなく買い切りのポイント制。
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-5xl px-4">
            <FadeIn>
              <h2 className="text-2xl font-bold text-center mb-10">こんなプロジェクトに</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["飲み会の幹事", "忘年会・新年会", "懇親会", "結婚式準備", "旅行企画", "歓送迎会", "サプライズ企画", "チームイベント"].map((item) => (
                  <div key={item} className="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-100">
                    <p className="text-sm font-medium text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4">
            <FadeIn>
              <h2 className="text-2xl font-bold text-center mb-10">主な機能</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {FEATURES.map((f) => (
                  <div key={f.title} className="rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow">
                    <span className="text-3xl">{f.icon}</span>
                    <h3 className="mt-3 text-lg font-bold text-slate-900">{f.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-16 bg-slate-50">
          <div className="mx-auto max-w-5xl px-4">
            <FadeIn>
              <h2 className="text-2xl font-bold text-center mb-2">ポイントパック</h2>
              <p className="text-sm text-slate-500 text-center mb-10">
                基本機能は無料。AI機能はポイント制（買い切り・有効期限1年）
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {PACKS.map((pack) => (
                  <div
                    key={pack.name}
                    className={`relative rounded-2xl border-2 p-6 bg-white text-center ${
                      pack.badge ? "border-purple-300 shadow-lg" : "border-slate-200"
                    }`}
                  >
                    {pack.badge && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                        {pack.badge}
                      </span>
                    )}
                    <p className="text-sm font-bold text-slate-700 mt-1">{pack.name}</p>
                    <p className="text-3xl font-extrabold mt-2" style={{ color: pack.color }}>
                      {pack.price}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">{pack.points}</p>
                    <p className="text-xs text-slate-400 mt-1">1ptあたり{pack.perPoint}</p>
                    <p className="mt-3 text-xs text-slate-500">{pack.description}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <a
                  href="https://forproject.fujimin-pass.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-3.5 text-base font-bold text-white shadow-lg hover:bg-orange-600 transition-colors"
                >
                  ForProjectを始める
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <FadeIn>
              <h2 className="text-2xl font-bold mb-4">
                次の幹事はAIと一緒に。
              </h2>
              <p className="text-slate-600 mb-8">
                ForProjectは完全無料で始められます。
                <br />
                AI機能はワンコイン500円から。
              </p>
              <a
                href="https://forproject.fujimin-pass.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-10 py-4 text-lg font-bold text-white shadow-lg hover:bg-orange-600 transition-colors"
              >
                無料で始める
              </a>
            </FadeIn>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-5xl px-4">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
