import FadeIn from "../FadeIn";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="px-4 py-24 md:py-32"
      style={{ backgroundColor: "#f8fafc" }}
    >
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              ABOUT
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              私たちについて
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <p className="text-base leading-relaxed text-slate-600">
              静岡県富士市でビジネスホテルを経営しています。
              <br />
              小さな組織を回す大変さは、自分たちがよくわかります。
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              「こんなツールがあれば」——そう思って作り始めたのがFUJIMI DX
              Labです。最初に完成したのは施術院やサロン向けの予約管理ツールでした。
              宿の経営で感じた&quot;小さな組織の困りごと&quot;は、業種を超えて共通していた。
              それが私たちの出発点です。
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <dl className="divide-y divide-slate-100">
              {(
                [
                  ["会社名", "ふじみ企業有限会社"],
                  ["事業部", "FUJIMI DX Lab事業部"],
                  ["サービス開始", "2026年4月"],
                  ["所在地", "〒417-0043 静岡県富士市荒田島町3-20"],
                  ["事業内容", "小さな組織向けDXツールの企画・開発・提供"],
                  [
                    "運営施設",
                    <a
                      key="f"
                      href="https://fujimi-ryokan.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      Tabist ゆ縁の宿ふじみ（ビジネスホテル）
                    </a>,
                  ],
                  [
                    "メール",
                    <a
                      key="e"
                      href="mailto:support@mail.fujimin-pass.com"
                      className="text-indigo-600 hover:underline"
                    >
                      support@mail.fujimin-pass.com
                    </a>,
                  ],
                ] as [string, React.ReactNode][]
              ).map(([dt, dd]) => (
                <div
                  key={dt}
                  className="flex flex-col py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4"
                >
                  <dt className="w-28 shrink-0 text-sm font-medium text-slate-400">
                    {dt}
                  </dt>
                  <dd className="text-sm text-slate-800">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
