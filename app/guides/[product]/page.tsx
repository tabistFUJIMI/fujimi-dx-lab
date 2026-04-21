import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PRODUCT_GUIDES, listGuidesForProduct } from "../../../lib/guides";

type Props = { params: Promise<{ product: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product: productSlug } = await params;
  const product = PRODUCT_GUIDES.find((p) => p.productSlug === productSlug);
  if (!product) return {};

  return {
    title: `${product.productLabel} 使い方ガイド`,
    description: product.description,
    alternates: { canonical: `/guides/${productSlug}` },
  };
}

export function generateStaticParams() {
  return PRODUCT_GUIDES.map((p) => ({ product: p.productSlug }));
}

/**
 * slug や title から記事カテゴリを判定する。
 * - overview: "overview" slug or "概要" を含むタイトル
 * - getting-started: "getting-started" slug or "導入" を含むタイトル
 * - features: それ以外（機能別ガイド）
 */
function categorizeGuide(slug: string, title: string): "overview" | "setup" | "feature" {
  if (slug === "overview" || /概要|overview/i.test(title)) return "overview";
  if (slug === "getting-started" || /導入|はじめて|getting-started/i.test(title)) return "setup";
  return "feature";
}

export default async function ProductGuideIndexPage({ params }: Props) {
  const { product: productSlug } = await params;
  const product = PRODUCT_GUIDES.find((p) => p.productSlug === productSlug);
  if (!product) notFound();

  const guides = listGuidesForProduct(productSlug);
  const overview = guides.find((g) => categorizeGuide(g.slug, g.title) === "overview");
  const setup = guides.find((g) => categorizeGuide(g.slug, g.title) === "setup");
  const features = guides.filter((g) => categorizeGuide(g.slug, g.title) === "feature");

  const heroImage = `/images/guides/${productSlug}.jpg`;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#faf8ff] to-white py-10 sm:py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <Link href="/guides" className="text-sm text-[#004ac6] hover:underline">
              ← 使い方ガイド一覧
            </Link>
          </div>
          <div className="grid sm:grid-cols-[1fr_auto] gap-5 sm:gap-8 items-center">
            <div>
              <p className="text-xs font-semibold text-[#004ac6] tracking-widest mb-2 uppercase">
                {product.productLabel}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#191b23] mb-3 leading-tight tracking-tight">
                {product.productLabel} 使い方ガイド
              </h1>
              <p className="text-[15px] text-[#434655] leading-[1.9]">{product.description}</p>
            </div>
            <div className="hidden sm:block relative w-32 h-32 rounded-2xl overflow-hidden border border-neutral-200 shadow-sm">
              <Image src={heroImage} alt="" fill sizes="128px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-5 py-10 space-y-12">
        {guides.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#737686]">ガイドを準備中です</p>
            <Link
              href={`/products/${productSlug}`}
              className="inline-block mt-6 text-sm text-[#004ac6] hover:underline"
            >
              製品ページへ →
            </Link>
          </div>
        )}

        {/* 概要 */}
        {overview && (
          <section>
            <SectionHeading icon="🔎" label="まずはこれ" heading="概要・できること" />
            <GuideCard productSlug={productSlug} guide={overview} tone="primary" />
          </section>
        )}

        {/* 初期設定 */}
        {setup && (
          <section>
            <SectionHeading icon="🚀" label="Step 1" heading="初期設定（導入ガイド）" />
            <GuideCard productSlug={productSlug} guide={setup} tone="primary" />
          </section>
        )}

        {/* 機能別 */}
        {features.length > 0 && (
          <section>
            <SectionHeading icon="🛠" label="Step 2 以降" heading="機能別の使い方" />
            <ul className="space-y-3">
              {features.map((g) => (
                <li key={g.slug}>
                  <GuideCard productSlug={productSlug} guide={g} tone="default" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Product page CTA */}
      <section className="bg-neutral-50 py-10 px-4 border-t border-neutral-200">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-[#434655] mb-3">製品の詳細や料金プランは製品ページへ</p>
          <Link
            href={`/products/${productSlug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#004ac6] rounded-xl font-semibold text-sm hover:shadow-md transition-all border border-[#004ac6]/20"
          >
            {product.productLabel} 製品ページ →
          </Link>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  icon,
  label,
  heading,
}: {
  icon: string;
  label: string;
  heading: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 text-xs font-semibold text-[#004ac6] tracking-widest uppercase mb-1">
        <span className="text-base">{icon}</span>
        {label}
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-[#191b23] leading-snug">{heading}</h2>
    </div>
  );
}

function GuideCard({
  productSlug,
  guide,
  tone,
}: {
  productSlug: string;
  guide: { slug: string; title: string; description?: string; updatedAt?: string };
  tone: "primary" | "default";
}) {
  const base =
    "block p-5 sm:p-6 rounded-2xl border transition-all group";
  const toneClass =
    tone === "primary"
      ? "bg-gradient-to-br from-[#eef4ff] to-white border-[#004ac6]/20 hover:border-[#004ac6]/40 hover:shadow-md"
      : "bg-white border-neutral-200 hover:border-[#004ac6]/30 hover:shadow-md";

  return (
    <Link href={`/guides/${productSlug}/${guide.slug}`} className={`${base} ${toneClass}`}>
      <h3 className="font-bold text-[#191b23] group-hover:text-[#004ac6] transition-colors leading-snug">
        {guide.title}
        <span className="ml-2 inline-block text-[#004ac6] opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </span>
      </h3>
      {guide.description && (
        <p className="mt-2 text-sm text-[#434655] leading-relaxed">{guide.description}</p>
      )}
      {guide.updatedAt && (
        <p className="mt-2 text-xs text-[#737686]">最終更新: {guide.updatedAt}</p>
      )}
    </Link>
  );
}
