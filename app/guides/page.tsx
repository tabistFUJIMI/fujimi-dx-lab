import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCT_GUIDES, listGuidesForProduct } from "../../lib/guides";

export const metadata: Metadata = {
  title: "使い方ガイド",
  description:
    "FUJIMI DX Lab が提供する各製品（Reserve Navi / Shift Navi / Ask Navi / Rule Navi / Social Navi / FUJIMIN PASS / ForProject）の設定方法・使い方・機能解説ガイド一覧。",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  const productsWithGuides = PRODUCT_GUIDES.map((product) => ({
    ...product,
    articleCount: listGuidesForProduct(product.productSlug).length,
  }));

  return (
    <>
      <section className="bg-gradient-to-b from-[#faf8ff] to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-[#004ac6] tracking-widest mb-3">
            GUIDES
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#191b23] mb-4">
            使い方ガイド
          </h1>
          <p className="text-[#434655] max-w-2xl mx-auto leading-relaxed">
            各製品の設定方法・機能解説・よくある質問をまとめています。
            <br className="hidden md:block" />
            お探しの製品を選んでください。
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {productsWithGuides.map((product) => (
            <Link
              key={product.productSlug}
              href={`/guides/${product.productSlug}`}
              className={`block p-6 bg-white rounded-2xl border transition-all ${
                product.articleCount > 0
                  ? "border-gray-200 hover:border-[#004ac6]/40 hover:shadow-lg"
                  : "border-gray-100 opacity-60 cursor-not-allowed pointer-events-none"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-[#191b23]">
                  {product.productLabel}
                </h2>
                <span className="text-xs text-[#737686]">
                  {product.articleCount}記事
                </span>
              </div>
              <p className="text-sm text-[#434655] leading-relaxed">
                {product.description}
              </p>
              {product.articleCount === 0 && (
                <p className="mt-3 text-xs text-[#737686]">
                  ガイドを準備中です
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
