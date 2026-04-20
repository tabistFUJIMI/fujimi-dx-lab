import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";
import ContactForm from "../components/ContactForm";

const PRODUCTS = [
  {
    name: "ReserveNavi",
    tagline: "LINE予約管理",
    description:
      "LINE経由の予約を自動管理。電話対応を減らし、予約の取りこぼしをゼロに。顧客管理・AI分析機能付き。",
    price: "無料〜¥3,980/月",
    href: "/products/reserve-navi",
    color: "#f97316",
    featured: true,
  },
  {
    name: "AskNavi",
    tagline: "AI自動応答",
    description:
      "LINE・Webの問い合わせにAIが24時間対応。施術中でもお客様をお待たせしません。",
    price: "¥550〜¥5,500/月",
    href: "/products/ask-navi",
    color: "#14b8a6",
    featured: false,
  },
  {
    name: "ShiftNavi",
    tagline: "AIシフト管理",
    description:
      "AIがシフトを自動作成。スタッフの休み希望をスマホで収集。Excel作業を大幅短縮。",
    price: "フリー¥0 / スタンダード¥550",
    href: "/products/shift-navi",
    color: "#3b82f6",
    featured: false,
  },
  {
    name: "RuleNavi",
    tagline: "社内規則AI検索",
    description:
      "就業規則や社内マニュアルをAIが検索・回答。スタッフからの「これどうだっけ？」を即解決。",
    price: "¥550〜¥5,500/月",
    href: "/products/rule-navi",
    color: "#8b5cf6",
    featured: false,
  },
];

export default function FujiminPassPage() {
  const fujiminPassJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FUJIMIN PASS",
    applicationCategory: "BusinessApplication",
    description:
      "FUJIMIN PASSは小規模店舗向けDXシリーズ。LINE予約管理（ReserveNavi）、AI自動応答（AskNavi）、シフト管理（ShiftNavi）、社内規則検索（RuleNavi）を月額¥0から提供。施術院・サロン・美容室など予約制の小規模店舗に最適。",
    url: "https://fujimi-dx-lab.com/fujimin-pass",
    provider: {
      "@type": "Organization",
      name: "FUJIMI DX Lab",
      url: "https://fujimi-dx-lab.com",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "3980",
      priceCurrency: "JPY",
      offerCount: "4",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "FUJIMIN PASSとは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FUJIMIN PASSは施術院・サロンなど小規模店舗向けのDXツールシリーズです。LINE予約管理（ReserveNavi）、AI自動応答（AskNavi）、シフト管理（ShiftNavi・無料）、社内規則AI検索（RuleNavi）の4つを、必要なものだけ選んで月額¥0から始められます。",
        },
      },
      {
        "@type": "Question",
        name: "共創パートナーとは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ReserveNaviのスタンダードプラン（通常¥2,480/月）を最大1年間無料でご利用いただき、月2回のヒアリングとLINEでの随時フィードバックにご協力いただくプログラムです。数社限定で募集しています。",
        },
      },
      {
        "@type": "Question",
        name: "1つのツールだけでも使えますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい。全部入りパッケージではなく、必要なツールだけ選んで使えます。1つから始めて、成長に合わせていつでも追加できます。",
        },
      },
      {
        "@type": "Question",
        name: "初期費用はかかりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "初期費用は一切かかりません。月額料金のみで、いつでも解約できます。ShiftNaviのフリープランは永久無料です。",
        },
      },
      {
        "@type": "Question",
        name: "パートナー期間終了後はどうなりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "スタンダードプラン（¥2,480/月）を継続するか、ライトプラン（¥980/月）にダウングレードするかを選択できます。いつでも辞退も可能です。",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: "https://fujimi-dx-lab.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FUJIMIN PASS",
        item: "https://fujimi-dx-lab.com/fujimin-pass",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fujiminPassJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <Header />
      <main>
        {/* ─── Hero ─── */}
        <section
          className="relative overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, #312e81 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, #1e3a5f 0%, transparent 50%), linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #020617 100%)",
          }}
        >
          <h1 className="sr-only">
            FUJIMIN PASS — 小規模店舗向けDXツールシリーズ
          </h1>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <FadeIn>
              <a
                href="#partner"
                className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-300 backdrop-blur-sm transition-all hover:bg-orange-500/20"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
                </span>
                数社限定｜共創パートナー募集中
              </a>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p
                className="mt-8 text-4xl font-extrabold tracking-tight md:text-5xl"
                style={{ lineHeight: 1.1 }}
              >
                FUJIMIN PASS
              </p>
              <p className="mt-4 text-xl text-indigo-200">
                小さなお店の予約・問い合わせ・シフトを
                <br />
                1つずつ解決するDXシリーズ
              </p>
            </FadeIn>
            {/* LLMO対策: 冒頭要約 */}
            <FadeIn delay={0.2}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
                FUJIMIN
                PASSは施術院・サロン・美容室など小規模店舗向けのDXツールシリーズです。
                LINE予約管理（ReserveNavi）、AI自動応答（AskNavi）、シフト管理（ShiftNavi・無料）の3つを中心に、
                月額¥0から必要なものだけ選んで始められます。
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="#partner"
                  className="inline-flex items-center rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-orange-600"
                >
                  パートナーに応募する
                </a>
                <a
                  href="#products"
                  className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  ツール一覧を見る ↓
                </a>
              </div>
              <p className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-slate-400">
                <span>✓ 初期費用¥0</span>
                <span>✓ いつでも解約OK</span>
                <span>✓ いつでも解約OK</span>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ─── ツール一覧 ─── */}
        <section id="products" className="bg-white px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">
                  TOOLS
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  必要なものだけ、1つから使えます
                </h2>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {PRODUCTS.map((p, i) => (
                <FadeIn key={p.name} delay={i * 0.08}>
                  <Link
                    href={p.href}
                    className={`group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8 ${
                      p.featured ? "md:col-span-2 ring-2 ring-orange-200" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          className="text-xl font-extrabold"
                          style={{ color: p.color }}
                        >
                          {p.name}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-slate-400">
                          {p.tagline}
                        </p>
                      </div>
                      {p.featured && (
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600 border border-orange-200">
                          パートナー対象
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {p.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <p
                        className="text-base font-bold"
                        style={{ color: p.color }}
                      >
                        {p.price}
                      </p>
                      <span className="text-sm text-slate-400 transition-transform group-hover:translate-x-1">
                        詳しく見る →
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── パートナー募集 ─── */}
        <section
          id="partner"
          className="relative overflow-hidden px-4 py-24 text-white md:py-32"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, #1e3a5f 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, #2d1b4e 0%, transparent 50%), linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)",
          }}
        >
          <div className="relative z-10 mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
                  </span>
                  数社限定
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
                  ReserveNavi 共創パートナー募集
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
                  一緒に、本当に使いやすい予約管理を作りませんか？
                  <br />
                  私たちはまだ小さなチームだからこそ、
                  <strong className="text-white">
                    パートナー様と二人三脚で進みたい
                  </strong>
                  のです。
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <p className="text-sm font-bold text-orange-400">
                    ご提供内容
                  </p>
                  <p className="mt-3 text-2xl font-extrabold text-white">
                    スタンダードプラン
                    <span className="text-orange-400"> 無料</span>
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    通常 ¥2,480/月相当 → 最大1年間無料
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-orange-400">✓</span>
                      ReserveNavi の全機能をご利用いただけます
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-orange-400">✓</span>
                      導入サポート・初期設定のお手伝い付き
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-orange-400">✓</span>
                      期間終了後はスタンダード継続 or ライト¥980に変更可
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <p className="text-sm font-bold text-orange-400">
                    お願いしたいこと
                  </p>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <p className="text-sm font-bold text-white">
                        ReserveNaviを実際の店舗運営でご利用
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        日常の予約管理でお使いください
                      </p>
                    </li>
                    <li>
                      <p className="text-sm font-bold text-white">
                        月2回程度の定期ヒアリング
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        使い心地や改善要望をお聞かせください
                      </p>
                    </li>
                    <li>
                      <p className="text-sm font-bold text-white">
                        LINEでの随時フィードバック
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        気づいた時に一言お送りいただければ
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="mt-8 text-center text-sm text-slate-500">
                いつでも辞退OK・無理な引き止めはしません
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mx-auto mt-12 max-w-xl">
                <p className="mb-6 text-center text-sm text-slate-400">
                  パートナー応募・ご質問はこちらから
                </p>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="bg-white px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  FAQ
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  よくある質問
                </h2>
              </div>
            </FadeIn>
            <div className="mt-12 space-y-6">
              {[
                {
                  q: "1つのツールだけでも使えますか？",
                  a: "はい。全部入りパッケージではなく、必要なツールだけ選んで使えます。1つから始めて、成長に合わせていつでも追加できます。",
                },
                {
                  q: "初期費用はかかりますか？",
                  a: "初期費用は一切かかりません。月額料金のみで、いつでも解約できます。ShiftNaviのフリープランは永久無料です。",
                },
                {
                  q: "パートナー期間終了後はどうなりますか？",
                  a: "スタンダードプラン（¥2,480/月）を継続するか、ライトプラン（¥980/月）にダウングレードするかを選択できます。いつでも辞退も可能です。",
                },
                {
                  q: "対象業種は決まっていますか？",
                  a: "予約管理を必要とする小規模店舗（施術院・サロン・美容室・パーソナルジム等）が主な対象です。「うちでも使えるかな？」と思ったらお気軽にご相談ください。",
                },
                {
                  q: "支払い方法は？",
                  a: "クレジットカード決済です。パートナー期間中はお支払い不要です。",
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="text-base font-bold text-slate-900">
                      Q. {item.q}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.a}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
