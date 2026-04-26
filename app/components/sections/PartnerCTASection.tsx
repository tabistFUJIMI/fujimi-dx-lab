import FadeIn from "../FadeIn";
import ContactForm from "../ContactForm";

export default function PartnerCTASection() {
  return (
    <section
      id="partner"
      className="relative overflow-hidden bg-[#FFF7ED] px-4 py-24 md:py-32"
    >
      {/* 装飾ブロブ */}
      <div className="pointer-events-none absolute -left-[10%] top-[10%] h-[400px] w-[400px] rounded-full bg-[#FFE4CC] opacity-50 blur-[100px]" />
      <div className="pointer-events-none absolute -right-[10%] bottom-[5%] h-[350px] w-[350px] rounded-full bg-[#FFD9B3] opacity-50 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <FadeIn>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1.5 text-xs font-bold text-[#F97316] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
              </span>
              数社限定｜PARTNER PROGRAM
            </span>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#3E362E] md:text-4xl">
              ReserveNavi 共創パートナー募集
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#52483F]">
              一緒に、本当に使いやすい予約管理を作りませんか？
              <br />
              現場の声を直接聞いて、必要な機能だけを磨いていきたい。
              <br />
              私たちはまだ小さなチームだからこそ、
              <strong className="text-[#3E362E]">
                パートナー様と二人三脚で進みたい
              </strong>
              のです。
            </p>
          </div>
        </FadeIn>

        {/* 条件カード */}
        <FadeIn delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
            {/* 提供内容 */}
            <div className="rounded-3xl border border-orange-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#F97316]">
                ご提供内容
              </p>
              <p className="mt-3 text-2xl font-extrabold text-[#3E362E]">
                スタンダードプラン
                <span className="ml-1 text-[#F97316]">無料</span>
              </p>
              <p className="mt-1 text-sm text-[#8A7F74]">
                通常 ¥2,480/月相当 → 2027/11/30まで無料
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-[#52483F]">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#F97316]">✓</span>
                  ReserveNavi の全機能をご利用いただけます
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#F97316]">✓</span>
                  導入サポート・初期設定のお手伝い付き
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#F97316]">✓</span>
                  期間終了後はスタンダード継続 or ライト¥980に変更可
                </li>
              </ul>
            </div>

            {/* お願いしたいこと */}
            <div className="rounded-3xl border border-orange-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#F97316]">
                お願いしたいこと
              </p>
              <ul className="mt-5 space-y-4">
                <li>
                  <p className="text-sm font-bold text-[#3E362E]">
                    🏪 ReserveNaviを実際の店舗運営でご利用
                  </p>
                  <p className="mt-1 text-xs text-[#8A7F74]">
                    日常の予約管理でお使いください
                  </p>
                </li>
                <li>
                  <p className="text-sm font-bold text-[#3E362E]">
                    💬 月2回程度の定期ヒアリング
                  </p>
                  <p className="mt-1 text-xs text-[#8A7F74]">
                    使い心地や改善要望をお聞かせください
                  </p>
                </li>
                <li>
                  <p className="text-sm font-bold text-[#3E362E]">
                    📱 LINEでの随時フィードバック
                  </p>
                  <p className="mt-1 text-xs text-[#8A7F74]">
                    気づいた時に一言お送りいただければ
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* 安心要素 */}
        <FadeIn delay={0.15}>
          <p className="mt-8 text-center text-sm text-[#8A7F74]">
            ✓ いつでも辞退OK ・ ✓ 無理な引き止めはしません ・ ✓ 初期費用¥0
          </p>
        </FadeIn>

        {/* フォーム */}
        <FadeIn delay={0.2}>
          <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-orange-100 bg-white p-6 shadow-xl md:p-8">
            <p className="mb-6 text-center text-sm font-bold text-[#3E362E]">
              ✉️ パートナー応募・ご質問はこちらから
            </p>
            <ContactForm variant="light" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
