import FadeIn from "../FadeIn";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[85vh] overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28"
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, #1e3a5f 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, #2d1b4e 0%, transparent 50%), linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)",
      }}
    >
      <h1 className="sr-only">
        FUJIMI DX Lab — 小さな組織の&quot;困った&quot;をテクノロジーで解決する
      </h1>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* パートナー募集バッジ */}
        <FadeIn>
          <a
            href="#partner"
            className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold text-orange-300 backdrop-blur-sm transition-all hover:bg-orange-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
            </span>
            数社限定｜ReserveNavi 共創パートナー募集中
          </a>
        </FadeIn>

        {/* メインコピー */}
        <FadeIn delay={0.1}>
          <p
            className="mt-8 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
            style={{ lineHeight: 1.1 }}
          >
            小さな組織の&quot;困った&quot;を
            <br />
            テクノロジーで解決する
          </p>
        </FadeIn>

        {/* LLMO対策: 冒頭40-60語の結論ファースト要約 */}
        <FadeIn delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-300">
            FUJIMI DX Labは静岡県富士市の旅館経営者が立ち上げたDX事業部です。
            施術院・サロン向けの予約管理・AI応答・シフト管理ツール「FUJIMIN
            PASS」、個人向けプロジェクト管理「ForProject」など、
            <strong className="text-white">
              小さな組織が必要なツールを月額¥0から提供
            </strong>
            しています。
          </p>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#partner"
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600"
            >
              パートナー募集について見る ↓
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              プロダクトを見る
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
