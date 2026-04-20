import { BookOpen, Clock, MessageCircle, Monitor, ArrowDown } from "lucide-react";
import FadeIn from "../FadeIn";

const PAIN_POINTS = [
  {
    icon: BookOpen,
    iconBg: "bg-red-50",
    iconColor: "text-red-400",
    title: "予約管理がアナログ",
    description: "紙の台帳やLINEのやり取りで、ダブルブッキングの不安が消えない。",
  },
  {
    icon: Clock,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
    title: "シフト作成で徹夜",
    description: "スタッフの希望をパズルするだけで、毎月数時間が消えていく。",
  },
  {
    icon: MessageCircle,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-400",
    title: "即レスできない",
    description: "接客中にDMが鳴り、返信が遅れてお客様を逃してしまう。",
  },
  {
    icon: Monitor,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
    title: "ITツールは難しそう",
    description: "高機能すぎて設定で挫折。もっとシンプルで誰でも使えるものが欲しい。",
  },
];

export default function PainPointsSection() {
  return (
    <section id="problems" className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#F97316] font-[family-name:var(--font-quicksand)]">
              Pain Points
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#3E362E]">
              こんなお悩み、ありませんか？
            </h2>
            <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-[#E8E2D9]" />
          </div>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PAIN_POINTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08}>
              <div className="rounded-3xl border border-[#F5EFE6] bg-[#FFFCFA] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)]">
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${p.iconBg}`}>
                  <p.icon className={`h-7 w-7 ${p.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-[#3E362E]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#52483F]">{p.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <ArrowDown className="mx-auto h-6 w-6 animate-bounce text-[#E8E2D9]" />
            <p className="mt-4 font-bold text-[#5A67D8]">
              その悩み、私たちが作ったツールで解決できます。
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
