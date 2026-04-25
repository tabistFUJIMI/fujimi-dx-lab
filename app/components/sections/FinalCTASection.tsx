import Link from "next/link";
import { CalendarCheck, Bot, LayoutGrid } from "lucide-react";
import FadeIn from "../FadeIn";

export default function FinalCTASection() {
  return (
    <section className="relative mt-12 overflow-hidden bg-[#F97316] px-4 py-24">
      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">
            さあ、あなたのお店に合う
            <br />
            ツールを探しましょう。
          </h2>
          <p className="mt-6 font-medium text-orange-100">
            予約管理は月¥980から、AI応答・シフト管理・社内規則検索は月¥550から。必要なツールだけ選んで始められます。
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/products/reserve-navi"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-4 font-bold text-[#F97316] shadow-lg transition-colors hover:bg-[#FAF7F2]"
            >
              <CalendarCheck className="h-5 w-5" />
              予約管理を見る
            </Link>
            <Link
              href="/products/ask-navi"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-4 font-bold text-[#F97316] shadow-lg transition-colors hover:bg-[#FAF7F2]"
            >
              <Bot className="h-5 w-5" />
              AI応答を見る
            </Link>
            <Link
              href="/fujimin-pass"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-4 font-bold text-[#F97316] shadow-lg transition-colors hover:bg-[#FAF7F2]"
            >
              <LayoutGrid className="h-5 w-5" />
              全プロダクト一覧
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
