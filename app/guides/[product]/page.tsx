import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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

export default async function ProductGuideIndexPage({ params }: Props) {
  const { product: productSlug } = await params;
  const product = PRODUCT_GUIDES.find((p) => p.productSlug === productSlug);
  if (!product) notFound();

  const guides = listGuidesForProduct(productSlug);

  return (
    <>
      <section className="bg-gradient-to-b from-[#faf8ff] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <Link href="/guides" className="text-sm text-[#004ac6] hover:underline">
              ← 使い方ガイド一覧
            </Link>
          </div>
          <p className="text-sm font-semibold text-[#004ac6] tracking-widest mb-2">
            {product.productLabel.toUpperCase()}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#191b23] mb-3">
            {product.productLabel} 使い方ガイド
          </h1>
          <p className="text-[#434655] leading-relaxed">{product.description}</p>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {guides.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#737686]">ガイドを準備中です</p>
              <Link
                href={`/products/${productSlug}`}
                className="inline-block mt-6 text-sm text-[#004ac6] hover:underline"
              >
                製品ページへ →
              </Link>
            </div>
          ) : (
            <ol className="space-y-3">
              {guides.map((g, i) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${productSlug}/${g.slug}`}
                    className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover:border-[#004ac6]/30 hover:shadow-md transition-all group"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-[#eef4ff] text-[#004ac6] rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <h2 className="font-semibold text-[#191b23] group-hover:text-[#004ac6] transition-colors">
                        {g.title}
                      </h2>
                      {g.description && (
                        <p className="mt-1 text-sm text-[#434655] leading-relaxed">
                          {g.description}
                        </p>
                      )}
                      {g.updatedAt && (
                        <p className="mt-2 text-xs text-[#737686]">
                          最終更新: {g.updatedAt}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}
