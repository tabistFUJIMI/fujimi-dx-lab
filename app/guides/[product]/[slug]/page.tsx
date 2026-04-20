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

      <article className="max-w-2xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 text-xs sm:text-sm text-[#737686]">
          <Link href="/guides" className="text-[#004ac6] hover:underline">
            使い方ガイド
          </Link>
          <span>/</span>
          <Link href={`/guides/${product}`} className="text-[#004ac6] hover:underline">
            {guide.productLabel}
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-8 pb-6 border-b border-neutral-200">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#191b23] leading-tight tracking-tight mb-3">
            {guide.title}
          </h1>
          {guide.description && (
            <p className="text-[15px] sm:text-base text-[#434655] leading-[1.9]">
              {guide.description}
            </p>
          )}
          {guide.updatedAt && (
            <p className="text-xs text-[#737686] mt-4">
              最終更新: {guide.updatedAt}
            </p>
          )}
        </header>

        {/* Content */}
        <div
          className="guide-prose text-[#2a2c38]
            [&>h2]:text-xl sm:[&>h2]:text-[22px] [&>h2]:font-bold [&>h2]:text-[#191b23] [&>h2]:mt-14 [&>h2]:mb-5 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-neutral-200 [&>h2]:leading-snug [&>h2]:tracking-tight
            [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-[#191b23] [&>h3]:mt-10 [&>h3]:mb-3 [&>h3]:leading-snug
            [&>p]:text-[15px] sm:[&>p]:text-base [&>p]:text-[#2a2c38] [&>p]:leading-[1.95] [&>p]:my-4
            [&_a]:text-[#004ac6] [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-[#004ac6]/30 hover:[&_a]:decoration-[#004ac6]
            [&_strong]:text-[#191b23] [&_strong]:font-semibold
            [&_code]:bg-neutral-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[13px] [&_code]:text-[#c41e3a] [&_code]:font-mono
            [&>ul]:my-5 [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul>li]:list-disc [&>ul>li]:marker:text-[#004ac6] [&>ul>li]:text-[15px] sm:[&>ul>li]:text-base [&>ul>li]:leading-[1.85] [&>ul>li]:text-[#2a2c38]
            [&>ol]:my-5 [&>ol]:space-y-2 [&>ol]:pl-5 [&>ol>li]:list-decimal [&>ol>li]:marker:text-[#004ac6] [&>ol>li]:marker:font-bold [&>ol>li]:text-[15px] sm:[&>ol>li]:text-base [&>ol>li]:leading-[1.85] [&>ol>li]:text-[#2a2c38] [&>ol>li]:pl-1
            [&>blockquote]:border-l-4 [&>blockquote]:border-[#004ac6] [&>blockquote]:bg-[#f3f3fe] [&>blockquote]:px-5 [&>blockquote]:py-4 [&>blockquote]:my-6 [&>blockquote]:rounded-r-xl [&>blockquote]:text-[#434655] [&>blockquote]:italic
            [&_table]:w-full [&_table]:text-sm
            [&_thead_th]:px-4 [&_thead_th]:py-3 [&_thead_th]:text-left [&_thead_th]:font-semibold [&_thead_th]:text-[#191b23] [&_thead_th]:border-b [&_thead_th]:border-neutral-200
            [&_tbody_td]:px-4 [&_tbody_td]:py-3 [&_tbody_td]:align-top [&_tbody_td]:border-b [&_tbody_td]:border-neutral-100 [&_tbody_td]:text-[#2a2c38]
            [&_tbody_tr:hover]:bg-neutral-50/50"
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
