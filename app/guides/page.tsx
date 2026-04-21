import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PRODUCT_GUIDES, listGuidesForProduct } from "../../lib/guides";

export const metadata: Metadata = {
  title: "使い方ガイド",
  description:
    "FUJIMI DX Lab が提供する各製品（Reserve Navi / Shift Navi / Ask Navi / Rule Navi / FUJIMIN PASS / ForProject）の概要・導入・機能別ガイド一覧。",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  const productsWithGuides = PRODUCT_GUIDES.map((product) => ({
    ...product,
    articleCount: listGuidesForProduct(product.productSlug).length,
  }));

  return (
    <>
      <section className="bg-gradient-to-b from-[#faf8ff] to-white py-14 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold text-[#004ac6] tracking-widest mb-3 uppercase">
            Guides
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#191b23] mb-4 leading-tight tracking-tight">
            使い方ガイド
          </h1>
          <p className="text-[15px] sm:text-base text-[#434655] max-w-xl mx-auto leading-[1.9]">
            各製品の概要・初期設定・機能別の使い方をまとめています。
            <br className="hidden md:block" />
            お探しの製品カードをお選びください。
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14 px-4">
        <div className="max-w-5xl mx-auto grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {productsWithGuides.map((product) => {
            const disabled = product.articleCount === 0;
            const heroImage = `/images/guides/${product.productSlug}.jpg`;
            const baseCls =
              "block rounded-2xl bg-white transition-all overflow-hidden border";
            const stateCls = disabled
              ? "border-neutral-100 opacity-60 cursor-not-allowed pointer-events-none"
              : "border-neutral-200 hover:border-[#004ac6]/40 hover:shadow-lg hover:-translate-y-0.5 duration-200";

            return (
              <Link
                key={product.productSlug}
                href={`/guides/${product.productSlug}`}
                className={`${baseCls} ${stateCls}`}
              >
                <div className="relative w-full aspect-[4/3] bg-neutral-100">
                  <Image
                    src={heroImage}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="text-base font-bold text-[#191b23] leading-snug">
                      {product.productLabel}
                    </h2>
                    <span className="text-[11px] text-[#737686] whitespace-nowrap mt-0.5">
                      {product.articleCount}記事
                    </span>
                  </div>
                  <p className="text-[13px] text-[#434655] leading-relaxed">
                    {product.description}
                  </p>
                  {disabled && (
                    <p className="mt-3 text-xs text-[#737686]">ガイドを準備中です</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
