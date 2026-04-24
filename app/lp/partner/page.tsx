import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";

export const metadata: Metadata = {
  title: "ReserveNavi 共創パートナー募集 | FUJIMI DX Lab",
  description:
    "ReserveNaviのスタンダードプラン（通常¥2,980/月）を2027年11月30日まで無料でご利用いただけるパートナープログラム。2026/5/1〜7/31の期間、各業種3社・計9社を募集中。",
  alternates: { canonical: "https://www.fujimi-dx-lab.com/lp/partner" },
  openGraph: {
    title: "ReserveNavi 共創パートナー募集 | FUJIMI DX Lab",
    description:
      "スタンダードプラン最大1年間無料。一緒に使いやすい予約管理を作りませんか？",
  },
};

export default function PartnerLPPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section
          className="relative overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, #1e3a5f 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, #2d1b4e 0%, transparent 50%), linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)",
          }}
        >
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
                </span>
                各業種3社・計9社限定｜2026/5/1〜7/31 募集
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1
                className="mt-8 text-4xl font-extrabold tracking-tight md:text-5xl"
                style={{ lineHeight: 1.1 }}
              >
                一緒に、本当に使いやすい
                <br />
                予約管理を作りませんか？
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-300">
                現場の声を直接聞いて、必要な機能だけを磨いていきたい。
                <br />
                私たちはまだ小さなチームだからこそ、
                <strong className="text-white">
                  パートナー様と二人三脚で進みたい
                </strong>
                のです。
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <a
                href="#apply"
                className="mt-10 inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600"
              >
                パートナーに応募する ↓
              </a>
            </FadeIn>
          </div>
        </section>

        {/* What you get / What we ask */}
        <section className="bg-white px-4 py-24">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                パートナープログラムの内容
              </h2>
            </FadeIn>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {/* Offer */}
              <FadeIn delay={0.05}>
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-sm font-bold text-orange-500">
                    ご提供内容
                  </p>
                  <p className="mt-4 text-2xl font-extrabold text-slate-900">
                    スタンダードプラン
                    <span className="ml-2 text-orange-500">1年無料</span>
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    通常 ¥2,980/月相当 → 2027/11/30 まで無料（最大約19ヶ月）
                  </p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-700">
                    {[
                      "ReserveNavi の全機能をご利用いただけます",
                      "導入サポート・初期設定のお手伝い付き",
                      "2027/12/1 以降はスタンダード（¥2,980/月）で継続 or ライト¥980に変更可",
                    ].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Ask */}
              <FadeIn delay={0.1}>
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-sm font-bold text-orange-500">
                    お願いしたいこと
                  </p>
                  <ul className="mt-6 space-y-5">
                    {[
                      {
                        title: "ReserveNaviを実際の店舗運営でご利用",
                        desc: "日常の予約管理でお使いください",
                      },
                      {
                        title: "月2回程度の定期ヒアリング",
                        desc: "使い心地や改善要望をお聞かせください",
                      },
                      {
                        title: "LINEでの随時フィードバック",
                        desc: "気づいた時に一言お送りいただければ",
                      },
                    ].map((item) => (
                      <li key={item.title}>
                        <p className="text-sm font-bold text-slate-800">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.15}>
              <p className="mt-8 text-center text-sm text-slate-500">
                いつでも辞退OK・無理な引き止めはしません
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Form */}
        <section
          id="apply"
          className="px-4 py-24"
          style={{ backgroundColor: "#f8fafc" }}
        >
          <div className="mx-auto max-w-xl">
            <FadeIn>
              <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
                パートナー応募・ご質問
              </h2>
              <p className="mt-4 text-center text-sm text-slate-500">
                以下のフォームからお気軽にどうぞ。
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-8">
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
