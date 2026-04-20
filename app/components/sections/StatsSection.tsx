import FadeIn from "../FadeIn";

export default function StatsSection() {
  return (
    <section className="border-y border-[#E8E2D9] bg-white px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#F97316] font-[family-name:var(--font-quicksand)]">
              How it works
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#3E362E]">
              マニュアル不要。3ステップで開始。
            </h2>
          </div>
        </FadeIn>

        <div className="relative mt-14 flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Connecting line */}
          <div className="absolute left-10 right-10 top-[50%] -z-10 hidden h-0.5 border-t-2 border-dashed border-[#E8E2D9] md:block" />

          {[
            { num: "1", title: "アカウント登録", desc: "メールアドレスだけで完了。\nクレカ登録は不要です。", time: "30秒", color: "border-[#5A67D8] text-[#5A67D8]" },
            { num: "2", title: "お店に合わせて設定", desc: "メニューやスタッフ情報を入力。\nスマホからでもポチポチ設定。", color: "border-[#F97316] text-[#F97316]" },
            { num: "3", title: "今日からスタート！", desc: "すぐにお店で使い始められます。\n共有もURLを送るだけ。", color: "border-white bg-[#5A67D8] text-white" },
          ].map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.1}>
              <div className="flex w-full flex-col items-center rounded-3xl bg-white p-6 md:w-auto">
                <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 font-[family-name:var(--font-quicksand)] text-2xl font-bold shadow-sm ${step.color}`}>
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-[#3E362E]">{step.title}</h3>
                <p className="mt-2 whitespace-pre-line text-center text-sm text-[#52483F]">{step.desc}</p>
                {step.time && (
                  <span className="mt-3 rounded bg-[#F5EFE6] px-2 py-1 text-xs font-bold text-[#52483F]">
                    所要時間: {step.time}
                  </span>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
