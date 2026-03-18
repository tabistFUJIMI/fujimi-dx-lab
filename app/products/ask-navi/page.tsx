import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";

export const metadata: Metadata = {
  title: "Ask Navi | LINE AI自動応答",
  description:
    "公式LINEの問い合わせにAIが自動応答。ナレッジを登録するだけで、よくある質問を24時間自動で回答します。月額¥550〜。",
  openGraph: {
    title: "Ask Navi | LINE AI自動応答 - FUJIMI DX Lab",
    description: "AIが公式LINEやWebサイトで24時間自動応答。月額¥550〜。",
    images: [{ url: "/images/ask-navi.jpg", width: 1200, height: 630, alt: "Ask Navi LINE AI自動応答" }],
  },
};

const FEATURES = [
  { icon: "🤖", title: "AI自動応答", description: "お客様からの質問にAIが即座に回答。営業時間外でも24時間対応できます。" },
  { icon: "📚", title: "かんたんナレッジ管理", description: "PDFやCSV、HPのURLを登録するだけ。AIが自動で整理・分類してくれます。" },
  { icon: "🌐", title: "Webウィジェット", description: "ホームページにチャットウィジェットを設置。サイト訪問者の疑問をその場で解決。" },
  { icon: "💬", title: "LINE連携", description: "公式LINEのトーク画面でそのまま使えます。お客様は普段通りLINEするだけ。" },
  { icon: "📊", title: "会話履歴・分析", description: "どんな質問が多いか一目で分かる。未回答の質問も自動で検知してお知らせ。" },
  { icon: "🏷️", title: "業種別テンプレート", description: "サロン・飲食店・宿泊施設など、業種ごとのナレッジテンプレートですぐに始められます。" },
];

const PLANS = [
  {
    name: "ライト", price: "¥550", period: "/月", description: "まずはお試し",
    color: "#0d9488", bgColor: "#f0fdfa",
    features: [
      { label: "ナレッジ件数", value: "100件" },
      { label: "FUJIMINポイント", value: "月200pt" },
      { label: "AI応答", value: "✓" },
      { label: "Webウィジェット", value: "✓" },
      { label: "LINE連携", value: "✓" },
      { label: "会話履歴", value: "未回答のみ・1ヶ月" },
      { label: "CSVエクスポート", value: "—" },
      { label: "多言語対応", value: "—" },
      { label: "店舗数", value: "1" },
    ],
  },
  {
    name: "スタンダード", price: "¥1,100", period: "/月", description: "しっかり活用",
    recommended: true, color: "#14b8a6", bgColor: "#f0fdfa",
    features: [
      { label: "ナレッジ件数", value: "無制限" },
      { label: "FUJIMINポイント", value: "月500pt" },
      { label: "AI応答", value: "✓" },
      { label: "Webウィジェット", value: "✓" },
      { label: "LINE連携", value: "✓" },
      { label: "会話履歴", value: "全履歴・無制限" },
      { label: "CSVエクスポート", value: "✓" },
      { label: "多言語対応", value: "—" },
      { label: "店舗数", value: "1" },
    ],
  },
  {
    name: "プロ", price: "¥2,200", period: "/月", description: "複数店舗に",
    color: "#0f766e", bgColor: "#f0fdfa",
    features: [
      { label: "ナレッジ件数", value: "無制限" },
      { label: "FUJIMINポイント", value: "月1,500pt" },
      { label: "AI応答", value: "✓" },
      { label: "Webウィジェット", value: "✓" },
      { label: "LINE連携", value: "✓" },
      { label: "会話履歴", value: "全履歴・無制限" },
      { label: "CSVエクスポート", value: "✓" },
      { label: "多言語対応", value: "✓" },
      { label: "店舗数", value: "3" },
    ],
  },
  {
    name: "エンタープライズ", price: "¥5,500", period: "/月", description: "大規模運用に",
    color: "#134e4a", bgColor: "#f0fdfa",
    features: [
      { label: "ナレッジ件数", value: "無制限" },
      { label: "FUJIMINポイント", value: "月5,000pt" },
      { label: "AI応答", value: "✓" },
      { label: "Webウィジェット", value: "✓" },
      { label: "LINE連携", value: "✓" },
      { label: "会話履歴", value: "全履歴・無制限" },
      { label: "CSVエクスポート", value: "✓" },
      { label: "多言語対応", value: "✓" },
      { label: "店舗数", value: "無制限" },
    ],
  },
];

export default function AskNaviPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28" style={{ background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)" }}>
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <FadeIn>
                <Link href="/" className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-teal-100 backdrop-blur-sm transition-colors hover:bg-white/20">
                  ← FUJIMI DX Lab トップ
                </Link>
              </FadeIn>
              <FadeIn delay={0.05}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl">💬</span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wider text-teal-100 uppercase">LINE AI自動応答</span>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl" style={{ lineHeight: 1.15 }}>Ask Navi</h1>
              </FadeIn>
              <FadeIn delay={0.15}>
                <p className="mt-6 text-xl font-medium text-teal-100">よくある質問、まだ手動で返してますか？</p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="mt-4 max-w-lg leading-relaxed text-teal-100/80">
                  お店のナレッジを登録するだけで、AIが公式LINEやWebサイトで自動応答。
                  <br /><span className="font-semibold text-white">月額¥550〜。今日から使えます。</span>
                </p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="#pricing" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold shadow-lg transition-all duration-300 hover:scale-105" style={{ color: "#0d9488" }}>料金プランを見る</a>
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20">無料で相談する</a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Pain → Solution */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">こんなお悩み、ありませんか？</h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">Ask Naviなら、ぜんぶ解決します。</p>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <FadeIn>
                <div className="h-full rounded-2xl border border-red-100 bg-red-50/50 p-7">
                  <p className="mb-5 text-sm font-bold tracking-wider text-red-400 uppercase">😥 いまの困りごと</p>
                  <ul className="space-y-3.5 text-[15px] leading-relaxed text-gray-700">
                    {["同じ質問に何度も手動で返信している", "施術中・接客中にLINEの返信ができない", "営業時間外の問い合わせに対応できない", "HPのFAQを見てもらえず、結局LINEで聞かれる", "スタッフによって回答の質がバラバラ"].map((item, i) => (
                      <li key={i} className="flex gap-2.5"><span className="shrink-0 text-red-300">✕</span>{item}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="h-full rounded-2xl border p-7" style={{ borderColor: "#ccfbf1", backgroundColor: "#f0fdfa" }}>
                  <p className="mb-5 text-sm font-bold tracking-wider uppercase" style={{ color: "#14b8a6" }}>😊 Ask Naviなら</p>
                  <ul className="space-y-3.5 text-[15px] leading-relaxed text-gray-700">
                    {["AIが自動で回答。同じ質問は何度でもOK", "接客に集中できる。返信はAIにおまかせ", "24時間365日、お客様の質問に自動対応", "LINEでもWebでも、同じナレッジで即回答", "統一された正確な回答をAIが自動生成"].map((item, i) => (
                      <li key={i} className="flex gap-2.5"><span className="shrink-0" style={{ color: "#14b8a6" }}>◎</span>{item}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-4 py-24 md:py-32" style={{ backgroundColor: "#f0fdfa" }}>
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">かんたん3ステップで始められます</h2>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                { emoji: "📄", step: "1", title: "ナレッジを登録", desc: "PDF・CSV・HPのURLをアップするだけ。AIが自動で整理します。" },
                { emoji: "🤖", step: "2", title: "AIが自動応答", desc: "お客様がLINEやWebで質問すると、AIが登録ナレッジから回答。" },
                { emoji: "📈", step: "3", title: "どんどん賢くなる", desc: "未回答の質問を検知→ナレッジ追加→AIの回答精度がアップ。" },
              ].map((s, i) => (
                <FadeIn key={s.step} delay={i * 0.08}>
                  <div className="text-center rounded-2xl bg-white p-6 shadow-sm">
                    <div className="text-4xl mb-2">{s.emoji}</div>
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: "#14b8a6" }}>{s.step}</div>
                    <h3 className="mt-3 text-base font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">登録するだけで、AIがお客様対応</h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">むずかしい設定は不要。ナレッジを入れたら、すぐ使えます。</p>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f, i) => (
                <FadeIn key={f.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="text-3xl">{f.icon}</span>
                    <h3 className="mt-4 text-base font-bold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">{f.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-4 py-24 md:py-32" style={{ backgroundColor: "#fafaf9" }}>
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">料金プラン</h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">月額¥550から。お店の規模に合わせて選べます。<br />すべて税込価格です。</p>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PLANS.map((plan, i) => (
                <FadeIn key={plan.name} delay={i * 0.06}>
                  <div className={`relative h-full rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${plan.recommended ? "shadow-md" : ""}`} style={{ borderColor: plan.recommended ? plan.color : "#e5e7eb", backgroundColor: plan.bgColor }}>
                    {plan.recommended && (<span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white" style={{ backgroundColor: plan.color }}>おすすめ</span>)}
                    <div className="text-center">
                      <p className="text-sm font-semibold" style={{ color: plan.color }}>{plan.name}</p>
                      <p className="mt-2 text-3xl font-extrabold text-gray-900">{plan.price}<span className="text-base font-normal text-gray-500">{plan.period}</span></p>
                      <p className="mt-1 text-xs text-gray-500">{plan.description}</p>
                    </div>
                    <div className="mt-6 space-y-2.5">
                      {plan.features.map((f) => (
                        <div key={f.label} className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{f.label}</span>
                          <span className="font-medium text-gray-900">{f.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <a href="#contact" className="block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors" style={plan.recommended ? { backgroundColor: plan.color, color: "#fff" } : { backgroundColor: "#f3f4f6", color: "#374151" }}>お問い合わせ</a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.3}>
              <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center">
                <p className="text-sm text-gray-600"><span className="font-semibold">FUJIMINポイントとは？</span>　AI機能を使うためのポイントです。プランに含まれるポイントで足りない場合は追加購入できます。</p>
                <p className="mt-2 text-xs text-gray-400">追加購入: 100pt / ¥550 ・ 500pt / ¥1,650 ・ 1,500pt / ¥3,850（購入から1年間有効）</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Best for */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">こんなお店に選ばれています</h2></div></FadeIn>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: "💆", title: "サロン・美容室", description: "メニューや料金の質問にAIが即回答。施術に集中できます。" },
                { icon: "🏨", title: "宿泊施設", description: "チェックイン時間やアメニティの質問に24時間自動対応。" },
                { icon: "🍽️", title: "飲食店・カフェ", description: "営業時間やメニューの問い合わせを自動化。予約もスムーズに。" },
                { icon: "🏋️", title: "フィットネス・スクール", description: "レッスン内容や料金の質問にAIが対応。入会率アップに。" },
              ].map((c, i) => (
                <FadeIn key={c.title} delay={i * 0.06}>
                  <div className="h-full rounded-2xl bg-white p-6 text-center shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="text-4xl">{c.icon}</span>
                    <h3 className="mt-4 text-base font-bold">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">{c.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-24 md:py-32" style={{ backgroundColor: "#f0fdfa" }}>
          <div className="mx-auto max-w-3xl">
            <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">よくある質問</h2></div></FadeIn>
            <div className="mt-14 space-y-6">
              {[
                { q: "ナレッジの登録はむずかしいですか？", a: "PDFやCSVをアップロードするだけです。HPのURLを入力すれば、AIが自動でページ内容を取り込みます。" },
                { q: "AIが答えられない質問はどうなりますか？", a: "「未回答」として記録され、管理画面に通知されます。回答を追加すれば、次回から自動応答できます。" },
                { q: "LINEの公式アカウントが必要ですか？", a: "LINE連携を使う場合は必要です。Webウィジェットだけなら、公式LINEなしでも使えます。" },

                { q: "多言語対応はどのプランから？", a: "プロプラン以上で多言語対応が可能です。英語・中国語・韓国語などに対応しています。" },
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

        {/* CTA */}
        <section id="contact" className="relative overflow-hidden px-4 py-24 text-white md:py-32" style={{ background: "linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)" }}>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">まずは気軽にご相談ください</h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-teal-100/80">「うちの業種でも使える？」「どのプランがいい？」<br />なんでもお気軽にどうぞ。無料でご相談いただけます。</p>
              <div className="mt-10"><ContactForm /></div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
