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
import { getAdminSession } from "../../../lib/admin-session";
import { getRelatedServices } from "../../../lib/service-mapping";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.column.findUnique({
    where: { slug },
    select: { title: true, excerpt: true, slug: true, isPublished: true },
  });
  if (!article) return {};

  // 下書きは検索エンジンにインデックスさせない
  return {
    title: article.title,
    description: article.excerpt || undefined,
    alternates: { canonical: `/column/${article.slug}` },
    robots: article.isPublished ? undefined : { index: false, follow: false },
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      type: "article",
      url: `/column/${article.slug}`,
    },
  };
}

export default async function ColumnArticlePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const article = await prisma.column.findUnique({ where: { slug } });

  if (!article) notFound();

  // 下書きは管理者ログイン中かつ ?preview=1 でのみ閲覧可能
  const isPreviewMode = preview === "1";
  const isAdmin = isPreviewMode ? await getAdminSession() : false;
  const canViewDraft = isAdmin && isPreviewMode;

  if (!article.isPublished && !canViewDraft) notFound();

  // 関連記事（同カテゴリ or タグ重複で3件、公開済みのみ）
  const relatedArticles = await prisma.column.findMany({
    where: {
      isPublished: true,
      slug: { not: article.slug },
      OR: [
        { category: article.category },
        { tags: { hasSome: article.tags } },
      ],
    },
    orderBy: [{ publishedAt: "desc" }],
    take: 3,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      tags: true,
      publishedAt: true,
    },
  });

  // 関連サービス（タグから自動選出、最大2件）
  const relatedServices = getRelatedServices(article.tags, 2);

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
        {/* Draft preview banner */}
        {!article.isPublished && canViewDraft && (
          <div className="mb-8 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <div>
                <div className="text-sm font-semibold text-amber-900">これは下書きプレビューです</div>
                <div className="text-xs text-amber-800 mt-0.5">
                  一般公開されていません（管理者のみ閲覧可能）
                </div>
              </div>
            </div>
            <Link
              href="/admin/columns"
              className="whitespace-nowrap text-xs px-4 py-2 bg-amber-900 text-amber-50 rounded-lg hover:bg-amber-800"
            >
              管理画面で公開 →
            </Link>
          </div>
        )}

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

        {/* 関連サービス（タグから自動選出） */}
        {relatedServices.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-lg font-bold text-[#191b23]">
                この記事に関連するサービス
              </h2>
              <span className="text-xs text-[#737686] tracking-wider">
                FUJIMI DX LAB
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedServices.map((s) => (
                <Link
                  key={s.id}
                  href={s.href}
                  className="group block p-6 rounded-2xl border border-[#e1e2ed] bg-white hover:border-[#004ac6] hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{s.emoji}</span>
                    <h3 className="text-base font-bold text-[#191b23] group-hover:text-[#004ac6]">
                      {s.name}
                    </h3>
                  </div>
                  <p className="text-sm font-semibold text-[#004ac6] mb-2">
                    {s.tagline}
                  </p>
                  <p className="text-sm text-[#434655] leading-relaxed mb-3">
                    {s.pitch}
                  </p>
                  <span className="text-xs text-[#004ac6] font-medium inline-flex items-center gap-1">
                    詳しく見る →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 関連記事（同カテゴリ or タグ重複） */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-lg font-bold text-[#191b23]">
                この記事と関連するコラム
              </h2>
              <Link
                href="/column"
                className="text-xs text-[#004ac6] hover:underline"
              >
                すべて見る →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((rel) => {
                const relCat = resolveCategory(rel.category);
                return (
                  <Link
                    key={rel.slug}
                    href={`/column/${rel.slug}`}
                    className="group block p-5 rounded-2xl border border-[#e1e2ed] bg-white hover:border-[#004ac6] hover:shadow-md transition-all"
                  >
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium mb-3 ${
                        CATEGORY_COLOR_MAP[relCat] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {CATEGORY_LABEL_MAP[relCat] || relCat}
                    </span>
                    <h3 className="text-sm font-bold text-[#191b23] leading-snug mb-2 group-hover:text-[#004ac6] line-clamp-2">
                      {rel.title}
                    </h3>
                    {rel.excerpt && (
                      <p className="text-xs text-[#737686] line-clamp-3 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Back to list */}
        <div className="mt-16 text-center">
          <Link href="/column" className="text-sm text-[#004ac6] hover:underline">
            ← コラム一覧に戻る
          </Link>
        </div>
      </article>
    </>
  );
}
