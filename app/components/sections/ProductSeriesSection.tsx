import Link from "next/link";
import FadeIn from "../FadeIn";

const SERIES = [
  {
    name: "FUJIMIN PASS",
    tagline: "小規模店舗向けDXシリーズ",
    description:
      "予約管理・AI自動応答・シフト管理——小さなお店が必要なツールを月額¥0から。ReserveNavi、AskNavi、ShiftNaviなど必要なものだけ選べます。",
    href: "/fujimin-pass",
    color: "#4f46e5",
    status: "提供中",
    featured: true,
  },
  {
    name: "ForProject",
    tagline: "個人・チーム向けプロジェクト管理",
    description:
      "イベント企画・懇親会・結婚式準備をスマホで完結管理。AIアシスタントが幹事業務をサポート。",
    href: "/products/forproject",
    color: "#FF6B4A",
    status: "リリース済",
    featured: false,
  },
  {
    name: "TASUKI PASS",
    tagline: "非営利団体向け運営支援",
    description: "会計・議案管理など、非営利団体の運営をシンプルにするツール群。",
    href: null,
    color: "#059669",
    status: "開発中",
    featured: false,
  },
  {
    name: "宿泊業向けシリーズ",
    tagline: "宿泊施設の業務改善",
    description:
      "OTA連携・清掃管理・チェックイン効率化など、宿泊業に特化したツールを準備中。",
    href: null,
    color: "#0891b2",
    status: "準備中",
    featured: false,
  },
];

function StatusBadge({
  status,
  color,
}: {
  status: string;
  color: string;
}) {
  if (status === "提供中" || status === "リリース済") {
    return (
      <span
        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
      {status}
    </span>
  );
}

export default function ProductSeriesSection() {
  return (
    <section id="products" className="bg-white px-4 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">
              PRODUCTS
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              4つのシリーズで、あらゆる組織をサポート
            </h2>
          </div>
        </FadeIn>

        {/* Bento Grid */}
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {SERIES.map((s, i) => {
            const inner = (
              <>
                <div className="flex items-center justify-between">
                  <StatusBadge status={s.status} color={s.color} />
                  {s.href && (
                    <span className="text-sm text-slate-400 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </div>
                <h3
                  className="mt-4 text-xl font-extrabold md:text-2xl"
                  style={{ color: s.color }}
                >
                  {s.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {s.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {s.description}
                </p>
              </>
            );

            const cardClass = `group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 md:p-8 ${
              s.featured ? "md:col-span-2" : ""
            } ${s.href ? "hover:-translate-y-1 hover:shadow-lg" : ""}`;

            return (
              <FadeIn key={s.name} delay={i * 0.08}>
                {s.href ? (
                  <Link href={s.href} className={`block ${cardClass}`}>
                    <div
                      className="absolute inset-y-0 left-0 w-1 rounded-l-2xl"
                      style={{ backgroundColor: s.color }}
                    />
                    {inner}
                  </Link>
                ) : (
                  <div className={cardClass}>
                    <div
                      className="absolute inset-y-0 left-0 w-1 rounded-l-2xl opacity-30"
                      style={{ backgroundColor: s.color }}
                    />
                    {inner}
                  </div>
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
