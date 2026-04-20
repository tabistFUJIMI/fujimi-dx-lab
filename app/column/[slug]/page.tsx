import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { markdownToHtml } from "../../../lib/markdown";
import {
  CATEGORY_COLOR_MAP,
  CATEGORY_LABEL_MAP,
  resolveCategory,
} from "../../../lib/column-categories";
import { BASE_URL } from "../../../lib/base-url";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.column.findUnique({
    where: { slug },
    select: { title: true, excerpt: true, slug: true },
  });
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt || undefined,
    alternates: { canonical: `/column/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      type: "article",
      url: `/column/${article.slug}`,
    },
  };
}

export default async function ColumnArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.column.findUnique({ where: { slug } });

  if (!article || !article.isPublished) notFound();

  const htmlContent = markdownToHtml(article.content);
  const publishDate = article.publishedAt
    ? new Date(article.publishedAt).toISOString().slice(0, 10)
    : null;

  const resolvedCategory = resolveCategory(article.category);

  // JSON-LD Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: { "@type": "Organization", name: "FUJIMI DX Lab", url: BASE_URL },
    publisher: { "@type": "Organization", name: "FUJIMI DX Lab", url: BASE_URL },
    mainEntityOfPage: `${BASE_URL}/column/${article.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/column" className="text-sm text-[#004ac6] hover:underline">
              ← コラム一覧
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                CATEGORY_COLOR_MAP[resolvedCategory] || "bg-gray-100 text-gray-700"
              }`}
            >
              {CATEGORY_LABEL_MAP[resolvedCategory] || resolvedCategory}
            </span>
            {publishDate && <time className="text-xs text-[#737686]">{publishDate}</time>}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#191b23] leading-tight mb-4">
            {article.title}
          </h1>
          {article.tags.length > 0 && (
            <div className="flex gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs text-[#737686] bg-[#f3f3fe] px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:text-[#191b23] prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-[#e1e2ed]
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[#434655] prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-[#004ac6] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#191b23]
            prose-li:text-[#434655]
            prose-table:text-sm prose-th:bg-[#f3f3fe] prose-th:px-4 prose-th:py-2 prose-th:text-left
            prose-td:px-4 prose-td:py-2 prose-td:border-t prose-td:border-[#e1e2ed]
            prose-blockquote:border-l-4 prose-blockquote:border-[#004ac6] prose-blockquote:bg-[#f3f3fe] prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl
            prose-code:bg-[#f3f3fe] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-[#eef4ff] to-[#e8fffe] rounded-2xl text-center">
          <h3 className="text-xl font-bold text-[#191b23] mb-2">あなたのサイトを今すぐ診断</h3>
          <p className="text-sm text-[#434655] mb-4">AI対策チェッカーでSEO・GEO/LLMOスコアを無料チェック</p>
          <Link
            href="/tools/ai-checker"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#004ac6] text-white rounded-xl font-bold hover:bg-[#003ea8] transition-all"
          >
            AI対策チェッカーを使う →
          </Link>
        </div>

        {/* Back to list */}
        <div className="mt-8 text-center">
          <Link href="/column" className="text-sm text-[#004ac6] hover:underline">
            ← コラム一覧に戻る
          </Link>
        </div>
      </article>
    </>
  );
}
