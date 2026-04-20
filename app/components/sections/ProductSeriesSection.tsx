import Link from "next/link";
import {
  CalendarCheck,
  Bot,
  Users,
  BookOpen,
  Megaphone,
  Presentation,
  Contact,
  LineChart,
} from "lucide-react";
import FadeIn from "../FadeIn";

type ProductCard = {
  name: string;
  tagline: string;
  description: string;
  href: string | null;
  color: string;
  bg: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
};

const RELEASED: ProductCard[] = [
  {
    name: "ReserveNavi",
    tagline: "LINE予約管理",
    description:
      "スマホで完結。お客様はLINEから24時間予約OK。施術中の電話対応からも解放されます。",
    href: "/lp/reserve-navi",
    color: "#F97316",
    bg: "#FFF3E0",
    Icon: CalendarCheck,
  },
  {
    name: "AskNavi",
    tagline: "AI自動応答",
    description:
      "お客様からの「何時まで営業？」「料金は？」などの疑問に、AIが24時間自動で回答。",
    href: "/products/ask-navi",
    color: "#14B8A6",
    bg: "#E6FFFA",
    Icon: Bot,
  },
  {
    name: "ShiftNavi",
    tagline: "AIシフト管理",
    description:
      "毎月のシフト調整・作成をDX。希望はスマホで集約、AIがシフト案を自動作成。",
    href: "/products/shift-navi",
    color: "#3B82F6",
    bg: "#DBEAFE",
    Icon: Users,
  },
  {
    name: "RuleNavi",
    tagline: "社内ルール検索AI",
    description:
      "就業規則・マニュアルをAIが即回答。スタッフからの「これどうだっけ？」を解消。",
    href: "/products/rule-navi",
    color: "#8B5CF6",
    bg: "#EDE9FE",
    Icon: BookOpen,
  },
];

const COMING_SOON: ProductCard[] = [
  {
    name: "SocialNavi",
    tagline: "SNS一元管理",
    description: "複数SNSの投稿・分析を1画面で。発信業務をシンプルに。",
    href: null,
    color: "#EC4899",
    bg: "#FCE7F3",
    Icon: Megaphone,
  },
  {
    name: "SlideHub",
    tagline: "AI資料作成",
    description: "テーマと要点を入れるだけで、プレゼン資料の下書きをAIが自動生成。",
    href: null,
    color: "#06B6D4",
    bg: "#CFFAFE",
    Icon: Presentation,
  },
  {
    name: "GoenHub",
    tagline: "AI名刺管理",
    description: "名刺を撮影→AIがDB化。人脈の検索・関係性管理をスマートに。",
    href: null,
    color: "#84CC16",
    bg: "#ECFCCB",
    Icon: Contact,
  },
  {
    name: "AEO Monitor",
    tagline: "AI検索ブランド計測",
    description:
      "ChatGPT・Gemini・Perplexity・Claudeで自社がどう紹介されるかを週次でモニタリング。",
    href: null,
    color: "#F59E0B",
    bg: "#FEF3C7",
    Icon: LineChart,
  },
];

function ProductBox({ p, soon = false }: { p: ProductCard; soon?: boolean }) {
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: p.bg }}
        >
          <p.Icon className="h-6 w-6" style={{ color: p.color }} />
        </span>
        {soon ? (
          <span className="rounded-full border border-[#E8E2D9] bg-[#FFFCFA] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8A7F74]">
            Coming Soon
          </span>
        ) : (
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: p.color }}
          >
            利用可能
          </span>
        )}
      </div>
      <div className="mt-5">
        <h3
          className="text-lg font-extrabold md:text-xl"
          style={{ color: soon ? "#8A7F74" : p.color }}
        >
          {p.name}
        </h3>
        <p className="mt-0.5 text-xs font-medium text-[#8A7F74]">{p.tagline}</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#52483F]">
        {p.description}
      </p>
      {!soon && p.href && (
        <span
          className="mt-4 inline-flex items-center gap-1 text-sm font-bold transition-transform group-hover:gap-2"
          style={{ color: p.color }}
        >
          詳しく見る →
        </span>
      )}
    </>
  );

  const cardClass = `group relative h-full rounded-3xl border bg-white p-6 transition-all duration-300 ${
    soon
      ? "border-[#F0EBE3] opacity-90"
      : "border-[#F0EBE3] hover:-translate-y-1 hover:shadow-lg"
  }`;

  return p.href ? (
    <Link href={p.href} className={`block ${cardClass}`}>
      {inner}
    </Link>
  ) : (
    <div className={cardClass}>{inner}</div>
  );
}

export default function ProductSeriesSection() {
  return (
    <section
      id="products"
      className="relative overflow-hidden bg-[#FFFCFA] px-4 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* ─── ヘッダー ─── */}
        <FadeIn>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#5A67D8]">
              FUJIMIN PASS Series
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#3E362E] md:text-4xl">
              小規模組織を、
              <br className="md:hidden" />
              <span className="relative inline-block">
                <span className="relative z-10 text-[#F97316]">手厚く・お得に</span>
                <span className="absolute bottom-1 left-0 -z-0 h-2.5 w-full bg-[#FFE4CC] md:h-3" />
              </span>
              サポート。
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#52483F]">
              <strong className="text-[#3E362E]">FUJIMIN PASS</strong>
              は、小さなお店・小さなチームに必要な道具をひとまとめにしたシリーズです。
              <br className="hidden md:block" />
              予約・問い合わせ・シフト・社内ルール…必要なものから1つずつ、月額¥0からはじめられます。
            </p>
          </div>
        </FadeIn>

        {/* ─── 公開中 ─── */}
        <FadeIn delay={0.1}>
          <div className="mt-16 flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-[#F97316]" />
            <p className="text-sm font-bold tracking-wider text-[#3E362E]">
              公開中（4プロダクト）
            </p>
            <div className="h-px flex-1 bg-[#E8E2D9]" />
          </div>
        </FadeIn>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RELEASED.map((p, i) => (
            <FadeIn key={p.name} delay={0.15 + i * 0.05}>
              <ProductBox p={p} />
            </FadeIn>
          ))}
        </div>

        {/* ─── 近日公開 ─── */}
        <FadeIn delay={0.4}>
          <div className="mt-20 flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-[#8A7F74]" />
            <p className="text-sm font-bold tracking-wider text-[#3E362E]">
              近日公開予定（4プロダクト）
            </p>
            <div className="h-px flex-1 bg-[#E8E2D9]" />
          </div>
        </FadeIn>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COMING_SOON.map((p, i) => (
            <FadeIn key={p.name} delay={0.45 + i * 0.05}>
              <ProductBox p={p} soon />
            </FadeIn>
          ))}
        </div>

        {/* ─── 全体CTA ─── */}
        <FadeIn delay={0.7}>
          <div className="mt-16 rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-sm md:p-10">
            <h3 className="text-xl font-bold text-[#3E362E] md:text-2xl">
              ひとつのアカウントで、必要なものだけ。
            </h3>
            <p className="mt-3 text-sm text-[#52483F] md:text-base">
              FUJIMIN PASSに登録すれば、すべてのプロダクトが追加料金なしですぐに使えます。
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://www.fujimin-pass.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#F97316] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(249,115,22,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#EA580C] sm:w-auto"
              >
                FUJIMIN PASS に無料登録 →
              </a>
              <Link
                href="/fujimin-pass"
                className="inline-flex w-full items-center justify-center rounded-full border-2 border-[#E8E2D9] bg-white px-7 py-3.5 text-sm font-bold text-[#52483F] transition-all hover:border-[#F97316] hover:text-[#F97316] sm:w-auto"
              >
                FUJIMIN PASS の詳細
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
