type PlanServiceJsonLdProps = {
  slug: string;
  name: string;
  description: string;
  serviceType: string;
};

export function PlanServiceJsonLd({ slug, name, description, serviceType }: PlanServiceJsonLdProps) {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: `https://www.fujimi-dx-lab.com/plan/${slug}`,
    provider: {
      "@type": "Organization",
      name: "FUJIMI DX Lab",
      legalName: "ふじみ企業有限会社",
      url: "https://www.fujimi-dx-lab.com",
    },
    areaServed: {
      "@type": "Country",
      name: "Japan",
    },
    offers: [
      {
        "@type": "Offer",
        name: "ShiftNavi（シフト管理）",
        price: "0",
        priceCurrency: "JPY",
        description: "無料",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "0",
          priceCurrency: "JPY",
          unitText: "月額",
        },
      },
      {
        "@type": "Offer",
        name: "Ask Navi（AI自動応答）",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "550",
          priceCurrency: "JPY",
          unitText: "月額",
          description: "月額550円〜（税込）",
        },
      },
      {
        "@type": "Offer",
        name: "Reserve Navi（LINE予約管理）",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "980",
          priceCurrency: "JPY",
          unitText: "月額",
          description: "無料プランあり。月額980円〜（税込）",
        },
      },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://www.fujimi-dx-lab.com" },
      { "@type": "ListItem", position: 2, name: "業種別プラン", item: "https://www.fujimi-dx-lab.com/plan" },
      { "@type": "ListItem", position: 3, name, item: `https://www.fujimi-dx-lab.com/plan/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}

export function ProductBreadcrumb({ name, slug }: { name: string; slug: string }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://www.fujimi-dx-lab.com" },
      { "@type": "ListItem", position: 2, name, item: `https://www.fujimi-dx-lab.com/products/${slug}` },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />;
}

export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FUJIMI DX Lab",
    // 検索エンジンにブランド表記のバリエーションを明示する。
    // スペースあり/なし、ハイフン有無、カタカナ/ひらがな等、ユーザーが打つ可能性のある表記を網羅
    alternateName: [
      "fujimidxlab",
      "fujimi-dx-lab",
      "fujimi dx lab",
      "FujiMiDXLab",
      "ふじみDXラボ",
      "フジミDXラボ",
      "フジミディーエックスラボ",
      "ふじみディーエックスラボ",
    ],
    legalName: "ふじみ企業有限会社",
    description: "小さな組織の困ったをテクノロジーで解決するDX事業部。施術院・サロン向けFUJIMIN PASS、個人向けForProject、非営利団体向けTASUKI PASSを開発・提供。2026年5月1日サービス開始。",
    url: "https://www.fujimi-dx-lab.com",
    email: "support@mail.fujimin-pass.com",
    foundingDate: "2026-05",
    address: {
      "@type": "PostalAddress",
      postalCode: "417-0043",
      streetAddress: "荒田島町3-20",
      addressLocality: "富士市",
      addressRegion: "静岡県",
      addressCountry: "JP",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "FUJIMI DX Lab プロダクト",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "FUJIMIN PASS",
            applicationCategory: "BusinessApplication",
            description: "小規模店舗向けDXシリーズ。LINE予約管理（ReserveNavi）、AI自動応答（AskNavi）、シフト管理（ShiftNavi）等を月額¥0から提供",
            url: "https://www.fujimi-dx-lab.com/fujimin-pass",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "ForProject",
            applicationCategory: "BusinessApplication",
            description: "個人・チーム向けプロジェクト管理。イベント企画・懇親会・結婚式準備をスマホで完結管理",
            url: "https://www.fujimi-dx-lab.com/products/forproject",
          },
        },
      ],
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ふじみ企業有限会社",
    description: "静岡県富士市の旅館経営者が立ち上げた、小さな組織向けDXツール開発事業部",
    address: {
      "@type": "PostalAddress",
      postalCode: "417-0043",
      streetAddress: "荒田島町3-20",
      addressLocality: "富士市",
      addressRegion: "静岡県",
      addressCountry: "JP",
    },
    email: "support@mail.fujimin-pass.com",
    url: "https://www.fujimi-dx-lab.com",
    areaServed: { "@type": "Country", name: "Japan" },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "FUJIMI DX Labとは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FUJIMI DX Labは静岡県富士市のふじみ企業有限会社が運営するDX事業部です。施術院・サロン向けのFUJIMIN PASS、個人向けのForProject、非営利団体向けのTASUKI PASSなど、小さな組織が必要なDXツールを開発・提供しています。",
        },
      },
      {
        "@type": "Question",
        name: "どのような製品がありますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "小規模店舗向けのFUJIMIN PASS（ReserveNavi・AskNavi・ShiftNavi等）、個人向けプロジェクト管理のForProject、非営利団体向けのTASUKI PASS（開発中）があります。",
        },
      },
      {
        "@type": "Question",
        name: "無料で始められますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい。ShiftNaviはずっと無料、ReserveNaviには無料プランがあります。ForProjectも基本無料です。現在、ReserveNaviの共創パートナーを数社限定で募集中（スタンダードプラン最大1年間無料）。",
        },
      },
      {
        "@type": "Question",
        name: "共創パートナーとは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ReserveNaviを実際の店舗運営でご利用いただき、月2回のヒアリングとLINEでのフィードバックにご協力いただけるパートナー店舗様です。スタンダードプラン（通常¥2,980/月）を2027年11月30日までの約19ヶ月間無料でご提供します。2026年5月1日〜7月31日の間で各業種3社・計9社を募集。",
        },
      },
      {
        "@type": "Question",
        name: "料金はいくらですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "シリーズによって異なります。FUJIMIN PASSはReserveNavi¥980〜¥4,980/月、AskNavi¥550〜/月、ShiftNavi無料〜¥550/月。ForProjectは基本無料・AI機能500円〜。すべて税込価格です。",
        },
      },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://www.fujimi-dx-lab.com" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
