import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "../../lib/prisma";
import {
  COLUMN_CATEGORIES,
  CATEGORY_COLOR_MAP,
  CATEGORY_LABEL_MAP,
  resolveCategory,
} from "../../lib/column-categories";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category } = await searchParams;
  const baseTitle = "コラム";
  const baseDesc =
    "AI検索・DX推進・時事IT・地方中小事業者向けの実践ノウハウを、FUJIMI DX Labが発信。ChatGPT・Gemini・Perplexity・ClaudeなどのAI検索対策からDX活用事例まで。";

  if (category) {
    const found = COLUMN_CATEGORIES.find((c) => c.value === category);
    if (found) {
      return {
        title: `${found.label} | ${baseTitle}`,
        description: found.description,
        alternates: { canonical: `/column?category=${found.value}` },
      };
    }
  }

  return {
    title: baseTitle,
    description: baseDesc,
    alternates: { canonical: "/column" },
  };
}

export default async function ColumnListPage({ searchParams }: Props) {
  const { category: rawCategory } = await searchParams;
  const selectedCategory = rawCategory
    ? COLUMN_CATEGORIES.find((c) => c.value === rawCategory)?.value
    : undefined;

  const columns = await prisma.column.findMany({
    where: {
      isPublished: true,
      // 旧カテゴリ値が混在している可能性があるので、選択時はDB側でフィルタせず
      // 後段で resolveCategory() 経由で判定する（DB未マイグレーションの環境でも動くように）
    },
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

  const visibleColumns = selectedCategory
    ? columns.filter((c) => resolveCategory(c.category) === selectedCategory)
    : columns;

  return (
    <>
      <section className="bg-gradient-to-b from-[#faf8ff] to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-[#004ac6] tracking-widest mb-3">COLUMN</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#191b23] mb-4">コラム</h1>
          <p className="text-[#434655] max-w-2xl mx-auto leading-relaxed">
            AI検索対策・DX推進・時事IT・地方中小事業者向けの実践ノウハウを、
            <br className="hidden md:block" />
            FUJIMI DX Labが発信します。
          </p>
        </div>
      </section>

      {/* カテゴリフィルタ */}
      <section className="px-4 pt-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/column"
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ring-1 ${
                !selectedCategory
                  ? "bg-[#191b23] text-white ring-[#191b23]"
                  : "bg-white text-[#434655] ring-[#e1e2ed] hover:ring-[#c3c6d7]"
              }`}
            >
              すべて
            </Link>
            {COLUMN_CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/column?category=${cat.value}`}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ring-1 ${
                  selectedCategory === cat.value
                    ? "bg-[#191b23] text-white ring-[#191b23]"
                    : "bg-white text-[#434655] ring-[#e1e2ed] hover:ring-[#c3c6d7]"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
          {selectedCategory && (
            <p className="mt-4 text-center text-sm text-[#737686]">
              {COLUMN_CATEGORIES.find((c) => c.value === selectedCategory)?.description}
            </p>
          )}
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {visibleColumns.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              {selectedCategory ? "このカテゴリの記事を準備中です" : "記事を準備中です"}
            </p>
          ) : (
            <div className="space-y-4">
              {visibleColumns.map((col) => {
                const resolved = resolveCategory(col.category);
                return (
                  <Link
                    key={col.slug}
                    href={`/column/${col.slug}`}
                    className="block p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#004ac6]/30 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          CATEGORY_COLOR_MAP[resolved] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {CATEGORY_LABEL_MAP[resolved] || resolved}
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
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Checker CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#004ac6] to-[#06b6d4] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">あなたのサイトをAI対策チェッカーで診断</h2>
          <p className="text-white/80 mb-6">URLを入力するだけ。登録不要・完全無料です。</p>
          <Link
            href="/tools/ai-checker"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#004ac6] rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
          >
            AI対策チェッカーを使う →
          </Link>
        </div>
      </section>
    </>
  );
}
