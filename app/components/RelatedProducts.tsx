import Link from "next/link";
import FadeIn from "./FadeIn";

const ALL_PRODUCTS = [
  { slug: "fujimin-pass", name: "FUJIMIN PASS", desc: "統合DXプラットフォーム", icon: "🔑", color: "#4f46e5" },
  { slug: "reserve-navi", name: "Reserve Navi", desc: "LINE予約管理", icon: "📅", color: "#f97316" },
  { slug: "ask-navi", name: "Ask Navi", desc: "LINE AI自動応答", icon: "💬", color: "#14b8a6" },
  { slug: "rule-navi", name: "Rule Navi", desc: "社内規則AI検索", icon: "📖", color: "#a855f7" },
  { slug: "shift-navi", name: "Shift Navi", desc: "AIシフト管理", icon: "📊", color: "#3b82f6" },
  { slug: "social-navi", name: "Social Navi", desc: "SNS一元管理", icon: "📣", color: "#f43f5e" },
];

interface Props {
  currentSlug: string;
}

export default function RelatedProducts({ currentSlug }: Props) {
  const others = ALL_PRODUCTS.filter((p) => p.slug !== currentSlug);
  return (
    <section className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">他のNaviツールも見る</h2>
            <p className="mx-auto mt-4 max-w-md text-gray-500">必要なツールだけ選んで、ひとつから始められます。</p>
          </div>
        </FadeIn>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.05}>
              <Link href={`/products/${p.slug}`} className="block rounded-2xl border-2 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ borderColor: p.color }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h3 className="font-bold" style={{ color: p.color }}>{p.name}</h3>
                    <p className="text-xs text-gray-500">{p.desc}</p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
