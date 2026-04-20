import Link from "next/link";
import { CalendarCheck, Bot, Users, KanbanSquare } from "lucide-react";
import FadeIn from "../FadeIn";

export default function SolutionBentoSection() {
  return (
    <section id="products" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#5A67D8] font-[family-name:var(--font-quicksand)]">
                Our Products
              </p>
              <h2 className="mt-2 text-3xl font-bold leading-tight text-[#3E362E] md:text-4xl">
                お店にフィットする、
                <br />
                いろんなツール。
              </h2>
            </div>
            <p className="inline-block rounded-full border border-[#E8E2D9] bg-white px-4 py-2 text-sm font-medium text-[#52483F]">
              必要なものだけを選んで使えます。
            </p>
          </div>
        </FadeIn>

        {/* Bento Grid */}
        <div className="mt-14 grid auto-rows-[auto] grid-cols-1 gap-6 md:grid-cols-3">
          {/* ReserveNavi — 2col */}
          <FadeIn delay={0.05} className="md:col-span-2">
            <Link
              href="/products/reserve-navi"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-indigo-100 bg-[#F0F4FF] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:p-10"
            >
              <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <CalendarCheck className="h-7 w-7 text-[#5A67D8]" />
                  </div>
                  <span className="rounded-full border border-white/50 bg-white/80 px-4 py-1.5 text-sm shadow-sm backdrop-blur">
                    <span className="font-bold text-[#52483F]">スターター </span>
                    <span className="font-[family-name:var(--font-quicksand)] text-lg font-bold text-[#5A67D8]">¥0</span>
                    <span className="text-xs">~</span>
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#3E362E]">ReserveNavi</h3>
                <p className="mt-2 max-w-sm font-medium text-indigo-900/70">
                  24時間受付。ダブルブッキングを防ぐ、誰でも使える直感的な予約管理。
                </p>
              </div>
              <div className="relative z-10 mt-6">
                <span className="inline-flex items-center gap-2 font-bold text-[#5A67D8] transition-all group-hover:gap-3">
                  詳しく見る →
                </span>
              </div>
              <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-white opacity-40 blur-2xl" />
            </Link>
          </FadeIn>

          {/* AskNavi */}
          <FadeIn delay={0.1}>
            <Link
              href="/products/ask-navi"
              className="group flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-orange-100 bg-[#FFF3E0] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:p-10"
            >
              <div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Bot className="h-7 w-7 text-[#F97316]" />
                </div>
                <h3 className="text-2xl font-bold text-[#3E362E]">AskNavi</h3>
                <p className="mt-2 font-medium text-orange-900/70">
                  LINEの問い合わせにAIが24時間代行返信。
                </p>
                <span className="mt-4 inline-block rounded-full border border-white/50 bg-white/60 px-3 py-1">
                  <span className="text-xs font-bold text-[#52483F]">月額 </span>
                  <span className="font-[family-name:var(--font-quicksand)] font-bold text-[#F97316]">¥550</span>
                  <span className="text-xs">~</span>
                </span>
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center gap-2 font-bold text-[#F97316] transition-all group-hover:gap-3">
                  詳しく見る →
                </span>
              </div>
            </Link>
          </FadeIn>

          {/* ShiftNavi */}
          <FadeIn delay={0.15}>
            <Link
              href="/products/shift-navi"
              className="group flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-teal-100 bg-[#E6FFFA] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Users className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-[#3E362E]">ShiftNavi</h3>
                <p className="mt-2 text-sm font-medium text-teal-900/70">
                  紙のシフト表から卒業。スマホでピピッと提出・作成。
                </p>
                <span className="mt-4 inline-block rounded-full border border-white/50 bg-white/60 px-3 py-1">
                  <span className="font-[family-name:var(--font-quicksand)] font-bold text-teal-700">¥0</span>
                  <span className="text-xs">~</span>
                </span>
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 transition-all group-hover:gap-3">
                  詳しく見る →
                </span>
              </div>
            </Link>
          </FadeIn>

          {/* ForProject — 2col */}
          <FadeIn delay={0.2} className="md:col-span-2">
            <Link
              href="/products/forproject"
              className="group flex h-full flex-col items-center gap-6 overflow-hidden rounded-[2rem] border border-[#E8E2D9] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-row"
            >
              <div className="w-full sm:w-2/3">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5EFE6]">
                    <KanbanSquare className="h-6 w-6 text-[#3E362E]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#3E362E]">ForProject</h3>
                </div>
                <p className="text-sm font-medium text-[#52483F]">
                  付箋感覚で使えるタスク管理。スタッフ間の引き継ぎを、もっとシンプルに。
                </p>
                <span className="mt-4 inline-flex items-center gap-2 font-bold text-[#3E362E] transition-all group-hover:gap-3">
                  詳しく見る →
                </span>
              </div>
              <div className="flex w-full flex-col items-end justify-center border-t border-[#F5EFE6] pt-4 sm:w-1/3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                <span className="text-xs font-bold text-[#8A7F74]">フリープランあり</span>
                <span className="font-[family-name:var(--font-quicksand)] text-3xl font-bold text-[#3E362E]">
                  ¥0<span className="text-sm font-normal">/月</span>
                </span>
              </div>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
