import FadeIn from "../FadeIn";
import ContactForm from "../ContactForm";

export default function PartnerCTASection() {
  return (
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
            <p className="text-xs font-bold uppercase tracking-widest text-orange-400">
              PARTNER PROGRAM
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              【数社限定】ReserveNavi 共創パートナー募集
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
              一緒に、本当に使いやすい予約管理を作りませんか？
              <br />
              現場の声を直接聞いて、必要な機能だけを磨いていきたい。
              <br />
              私たちはまだ小さなチームだからこそ、
              <strong className="text-white">
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
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-sm font-bold text-orange-400">ご提供内容</p>
              <p className="mt-3 text-2xl font-extrabold text-white">
                スタンダードプラン
                <span className="text-orange-400">無料</span>
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

            {/* お願いしたいこと */}
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

        {/* 安心要素 */}
        <FadeIn delay={0.15}>
          <p className="mt-8 text-center text-sm text-slate-500">
            いつでも辞退OK・無理な引き止めはしません
          </p>
        </FadeIn>

        {/* フォーム */}
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
  );
}
