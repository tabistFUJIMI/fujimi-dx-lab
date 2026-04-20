import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  PRODUCT_GUIDES,
  getGuide,
  getAllGuidePaths,
  listGuidesForProduct,
} from "../../../../lib/guides";
import { markdownToHtml } from "../../../../lib/markdown";
import { BASE_URL } from "../../../../lib/base-url";

type Props = { params: Promise<{ product: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product, slug } = await params;
  const guide = getGuide(product, slug);
  if (!guide) return {};

  return {
    title: `${guide.title} | ${guide.productLabel} 使い方ガイド`,
    description: guide.description,
    alternates: { canonical: `/guides/${product}/${slug}` },
    openGraph: {
      title: `${guide.title} | ${guide.productLabel} 使い方ガイド`,
      description: guide.description,
      type: "article",
      url: `/guides/${product}/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return getAllGuidePaths();
}

export default async function GuideArticlePage({ params }: Props) {
  const { product, slug } = await params;
  const guide = getGuide(product, slug);
  if (!guide) notFound();

  const htmlContent = markdownToHtml(guide.content);
  const siblings = listGuidesForProduct(product);
  const currentIdx = siblings.findIndex((g) => g.slug === slug);
  const prev = currentIdx > 0 ? siblings[currentIdx - 1] : null;
  const next =
    currentIdx >= 0 && currentIdx < siblings.length - 1
      ? siblings[currentIdx + 1]
      : null;

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.description,
    author: { "@type": "Organization", name: "FUJIMI DX Lab", url: BASE_URL },
    publisher: { "@type": "Organization", name: "FUJIMI DX Lab", url: BASE_URL },
    datePublished: guide.updatedAt,
    dateModified: guide.updatedAt,
    inLanguage: "ja-JP",
    mainEntityOfPage: `${BASE_URL}/guides/${product}/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/guides" className="text-[#004ac6] hover:underline">
            使い方ガイド
          </Link>
          <span className="text-[#737686]">/</span>
          <Link
            href={`/guides/${product}`}
            className="text-[#004ac6] hover:underline"
          >
            {guide.productLabel}
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#191b23] leading-tight mb-3">
          {guide.title}
        </h1>
        {guide.description && (
          <p className="text-[#434655] leading-relaxed mb-4">
            {guide.description}
          </p>
        )}
        {guide.updatedAt && (
          <p className="text-xs text-[#737686] mb-10">
            最終更新: {guide.updatedAt}
          </p>
        )}

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

        {/* Prev / Next */}
        {(prev || next) && (
          <nav className="mt-16 pt-8 border-t border-[#e1e2ed] grid grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/guides/${product}/${prev.slug}`}
                className="block p-4 border border-[#e1e2ed] rounded-xl hover:border-[#004ac6]/40 transition-colors"
              >
                <span className="text-xs text-[#737686]">← 前の記事</span>
                <p className="mt-1 text-sm font-semibold text-[#191b23]">{prev.title}</p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/guides/${product}/${next.slug}`}
                className="block p-4 border border-[#e1e2ed] rounded-xl hover:border-[#004ac6]/40 transition-colors text-right"
              >
                <span className="text-xs text-[#737686]">次の記事 →</span>
                <p className="mt-1 text-sm font-semibold text-[#191b23]">{next.title}</p>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}

        {/* Back to product guides */}
        <div className="mt-10 text-center">
          <Link
            href={`/guides/${product}`}
            className="text-sm text-[#004ac6] hover:underline"
          >
            ← {guide.productLabel} 使い方ガイド一覧に戻る
          </Link>
        </div>
      </article>
    </>
  );
}
