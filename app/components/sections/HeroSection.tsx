import Image from "next/image";
import FadeIn from "../FadeIn";
import SignupFlowButton from "../SignupFlowButton";
import { SERVICE_LAUNCH_BANNER } from "@/lib/service-launch";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFFBF5] px-4 pt-28 pb-16 md:pt-36 md:pb-24">
      {/* 装飾ブロブ */}
      <div className="pointer-events-none absolute -left-[8%] -top-[10%] h-[420px] w-[420px] animate-pulse rounded-full bg-[#FFE4CC] opacity-70 blur-[80px]" />
      <div
        className="pointer-events-none absolute -right-[8%] bottom-[5%] h-[360px] w-[360px] animate-pulse rounded-full bg-[#FFF3E0] opacity-70 blur-[80px]"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* ─── 左：コピー ─── */}
        <div className="text-center lg:text-left">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-1.5 text-xs font-bold text-[#3E362E] shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" />
              </span>
              {SERVICE_LAUNCH_BANNER.replace("｜お気軽にご相談ください", "")}｜旅館経営者がAIと一緒に作っています
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-[#3E362E] md:text-5xl lg:text-6xl"
            >
              LINEで、
              <br />
              予約も問い合わせも、
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-[#F97316]">ぜんぶラクに。</span>
                <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-[#FFE4CC] md:h-4" />
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#52483F] md:mx-0 md:text-lg">
              施術中に電話を取れない、ダブルブッキング、シフト作成で徹夜——
              <br className="hidden md:block" />
              小さなお店の悩みを、
              <strong className="text-[#3E362E]">月¥980から</strong>
              はじめられるツールで。
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:justify-start justify-center">
              <SignupFlowButton
                label="無料で始める →"
                accentColor="#F97316"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F97316] px-7 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EA580C]"
              />
              <a
                href="https://lin.ee/UPArZn9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#06C755] px-7 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(6,199,85,0.3)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.282.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.286-.63-.63V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINEで相談
              </a>
            </div>
            <p className="mt-4 text-center text-xs text-[#8A7F74] lg:text-left">
              ✓ 1分で登録 ・ ✓ 初期費用¥0 ・ ✓ いつでも解約OK
            </p>
          </FadeIn>
        </div>

        {/* ─── 右：写真コラージュ ─── */}
        <FadeIn delay={0.4}>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* メイン画像 */}
            <div
              className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-[0_20px_50px_-10px_rgba(249,115,22,0.25)]"
              style={{ transform: "rotate(-2deg)" }}
            >
              <Image
                src="/images/generated/hero-photo-high.jpg"
                alt="サロンオーナーがスマホで笑顔でLINE予約を確認している様子"
                width={1200}
                height={800}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-72 w-full object-cover md:h-96"
              />
            </div>

            {/* 装飾カード：価格 */}
            <div
              className="absolute -bottom-4 -left-4 rounded-2xl border-4 border-white bg-[#5A67D8] px-5 py-4 text-white shadow-xl md:-bottom-6 md:-left-8 md:px-7 md:py-5"
              style={{ transform: "rotate(-4deg)" }}
            >
              <p className="font-[family-name:var(--font-quicksand)] text-3xl font-extrabold md:text-4xl">
                ¥980~
              </p>
              <p className="text-xs font-bold opacity-90">月額料金</p>
            </div>

            {/* 装飾カード：LINE */}
            <div
              className="absolute -top-4 -right-2 flex items-center gap-2 rounded-2xl border-4 border-white bg-white px-4 py-3 shadow-xl md:-top-6 md:-right-4 md:px-5 md:py-4"
              style={{ transform: "rotate(5deg)" }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#06C755] text-white md:h-10 md:w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 md:h-6 md:w-6"
                  aria-hidden="true"
                >
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.282.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.286-.63-.63V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-bold text-[#3E362E]">LINEで予約受付</p>
                <p className="text-[10px] text-[#8A7F74]">24時間自動対応</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
