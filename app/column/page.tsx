import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "../../lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "GEO/LLMO対策コラム - AI検索最適化の実践ノウハウ",
  description:
    "ChatGPT・Gemini・Perplexity・ClaudeなどのAI検索エンジンに自社サイトが引用されるための対策を、FUJIMI DX Labが実践的に解説します。GEO、LLMO、構造化データ、llms.txtなどのノウハウを発信。",
  alternates: { canonical: "/column" },
};

const categoryColors: Record<string, string> = {
  basics: "bg-blue-100 text-blue-700",
  "ai-strategy": "bg-purple-100 text-purple-700",
  practice: "bg-emerald-100 text-emerald-700",
  "case-study": "bg-amber-100 text-amber-700",
};

const categoryLabels: Record<string, string> = {
  basics: "基礎知識",
  "ai-strategy": "AI別対策",
  practice: "実践ガイド",
  "case-study": "事例",
};

export default async function ColumnListPage() {
  const columns = await prisma.column.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      tags: true,
      publishedAt: true,
    },
  });

  return (
    <>
      <section className="bg-gradient-to-b from-[#faf8ff] to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-[#004ac6] tracking-widest mb-3">COLUMN</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#191b23] mb-4">GEO/LLMO対策コラム</h1>
          <p className="text-[#434655] max-w-xl mx-auto">
            AI検索時代に自社サイトが引用されるための実践的なノウハウを、FUJIMI DX Labが発信します。
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {columns.length === 0 ? (
            <p className="text-center text-gray-500 py-12">記事を準備中です</p>
          ) : (
            <div className="space-y-4">
              {columns.map((col) => (
                <Link
                  key={col.slug}
                  href={`/column/${col.slug}`}
                  className="block p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#004ac6]/30 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColors[col.category] || "bg-gray-100 text-gray-700"}`}>
                      {categoryLabels[col.category] || col.category}
                    </span>
                    {col.publishedAt && (
                      <time className="text-xs text-gray-400">
                        {new Date(col.publishedAt).toISOString().slice(0, 10)}
                      </time>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-[#191b23] group-hover:text-[#004ac6] transition-colors mb-2">
                    {col.title}
                  </h2>
                  {col.excerpt && (
                    <p className="text-sm text-[#434655] leading-relaxed">{col.excerpt}</p>
                  )}
                  {col.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {col.tags.map((tag) => (
                        <span key={tag} className="text-xs text-[#737686]">#{tag}</span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Checker CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#004ac6] to-[#06b6d4] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">あなたのサイトをAI対策チェッカーで診断</h2>
          <p className="text-white/80 mb-6">URLを入力するだけ。登録不要・完全無料です。</p>
          <Link href="/tools/ai-checker" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#004ac6] rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">
            AI対策チェッカーを使う →
          </Link>
        </div>
      </section>
    </>
  );
}
