import Image from "next/image";
import Link from "next/link";
import FadeIn from "../FadeIn";
import SignupFlowButton from "../SignupFlowButton";

const INDUSTRIES = [
  { label: "美容室", emoji: "💇", href: "/plan/hair" },
  { label: "ネイル・エステ", emoji: "💅", href: "/plan/salon" },
  { label: "整体・鍼灸", emoji: "💆", href: "/plan/sejutsu" },
  { label: "パーソナルジム", emoji: "🏋️", href: "/plan/gym" },
  { label: "ペットサロン", emoji: "🐾", href: "/plan/pet" },
  { label: "フォトスタジオ", emoji: "📷", href: "/plan/photo" },
  { label: "カウンセリング", emoji: "🧘", href: "/plan/counseling" },
];

const STEPS = [
  {
    num: "1",
    image: "/images/generated/step1-line-open.png",
    title: "LINEを開くだけ",
    desc: "お客様はお店の公式LINEから予約スタート。アプリのダウンロードは不要。",
  },
  {
    num: "2",
    image: "/images/generated/step2-select-menu.png",
    title: "メニューを選ぶ",
    desc: "施術メニューや所要時間を分かりやすく表示。指名予約にも対応。",
  },
  {
    num: "3",
    image: "/images/generated/step3-confirm-booking.png",
    title: "日時を選んで予約完了",
    desc: "空き状況がリアルタイムで反映。ダブルブッキングはゼロに。",
  },
];

export default function ReserveNaviSpotlightSection() {
  return (
    <section
      id="reserve-navi"
      className="relative overflow-hidden bg-white px-4 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* ─── ヘッダー ─── */}
        <FadeIn>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#F97316]">
              Featured Product
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#3E362E] md:text-5xl">
              まずは、得意分野の
              <br className="md:hidden" />
              <span className="relative inline-block">
                <span className="relative z-10 text-[#F97316]">予約</span>
                <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-[#FFE4CC] md:h-4" />
              </span>
              から。
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#52483F] md:text-lg">
              <strong className="text-[#3E362E]">ReserveNavi</strong>
              は、LINEで予約受付ができる小規模店舗向けシステム。
              <br className="hidden md:block" />
              施術中も、お休みの日も、24時間お客様の予約を逃しません。
            </p>
          </div>
        </FadeIn>

        {/* ─── メインビジュアル + 業種チップ ─── */}
        <div className="mt-14 grid items-center gap-10 md:grid-cols-2">
          <FadeIn delay={0.1}>
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border-8 border-white bg-[#FFF7ED] shadow-[0_15px_40px_-10px_rgba(249,115,22,0.2)]">
                <Image
                  src="/images/services/reserve-navi.png"
                  alt="ReserveNavi の画面イメージ"
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover"
                />
              </div>
              {/* バッジ */}
              <div className="absolute -top-4 -left-4 rounded-2xl border-4 border-white bg-[#F97316] px-4 py-3 text-white shadow-xl">
                <p className="font-[family-name:var(--font-quicksand)] text-2xl font-extrabold">
                  ¥0~
                </p>
                <p className="text-[10px] font-bold opacity-90">月額</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <p className="mb-4 text-sm font-bold text-[#8A7F74]">
                こんな業種の方が使っています
              </p>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.map((ind) => (
                  <Link
                    key={ind.label}
                    href={ind.href}
                    className="inline-flex items-center gap-2 rounded-full border border-[#F5EFE6] bg-[#FFFCFA] px-4 py-2 text-sm font-medium text-[#52483F] transition-all hover:-translate-y-0.5 hover:border-[#F97316] hover:bg-white hover:text-[#F97316] hover:shadow-sm"
                  >
                    <span className="text-base">{ind.emoji}</span>
                    {ind.label}
                  </Link>
                ))}
              </div>

              {/* 価格まとめ */}
              <div className="mt-8 rounded-2xl border border-[#F5EFE6] bg-[#FFFCFA] p-5">
                <p className="text-sm font-bold text-[#3E362E]">
                  料金プラン
                </p>
                <ul className="mt-3 space-y-2 text-sm text-[#52483F]">
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-[#5A67D8]">無料</span>
                    <span className="text-xs text-[#8A7F74]">月50件まで・1人運営に</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-[#F97316]">¥980〜</span>
                    <span className="text-xs text-[#8A7F74]">予約件数無制限</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-[#F97316]">¥2,980〜</span>
                    <span className="text-xs text-[#8A7F74]">AIレポートで経営見える化</span>
                  </li>
                </ul>
                <Link
                  href="/lp/reserve-navi#pricing"
                  className="mt-4 inline-block text-sm font-bold text-[#F97316] underline-offset-4 hover:underline"
                >
                  全プラン詳細を見る →
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ─── 3ステップ ─── */}
        <div className="mt-20">
          <FadeIn>
            <h3 className="text-center text-2xl font-bold text-[#3E362E] md:text-3xl">
              お客様の予約は、たった3ステップ
            </h3>
            <p className="mt-3 text-center text-sm text-[#8A7F74]">
              アプリ不要・LINEだけで完結します
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-[#F5EFE6] bg-[#FFFCFA] transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-[#FFF7ED]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white font-[family-name:var(--font-quicksand)] text-lg font-extrabold text-[#F97316] shadow-md">
                      {step.num}
                    </span>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-[#3E362E]">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#52483F]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ─── CTA ─── */}
        <FadeIn delay={0.3}>
          <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <SignupFlowButton
              label="無料で始める →"
              appName="ReserveNavi"
              accentColor="#F97316"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F97316] px-8 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EA580C] sm:w-auto"
            />
            <Link
              href="/lp/reserve-navi"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#F97316] bg-white px-8 py-4 text-base font-bold text-[#F97316] transition-all duration-300 hover:bg-[#FFF7ED] sm:w-auto"
            >
              ReserveNavi の詳細
            </Link>
          </div>
          <p className="mt-4 text-center text-xs text-[#8A7F74]">
            1分で登録・いつでも解約OK ／ FUJIMIN PASS への登録で利用開始
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
