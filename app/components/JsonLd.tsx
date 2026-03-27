export function ProductBreadcrumb({ name, slug }: { name: string; slug: string }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://fujimi-dx-lab.com" },
      { "@type": "ListItem", position: 2, name, item: `https://fujimi-dx-lab.com/products/${slug}` },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />;
}

export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FUJIMI DX Lab",
    legalName: "ふじみ企業有限会社",
    description: "小規模事業者向けDXプラットフォーム「FUJIMIN PASS」の開発・提供",
    url: "https://fujimi-dx-lab.com",
    email: "support@mail.fujimin-pass.com",
    address: {
      "@type": "PostalAddress",
      postalCode: "416-0909",
      streetAddress: "中里2586-16",
      addressLocality: "富士市",
      addressRegion: "静岡県",
      addressCountry: "JP",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "FUJIMIN PASSエコシステム",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "Reserve Navi",
            applicationCategory: "BusinessApplication",
            description: "LINEから簡単予約。小規模店舗向け予約管理システム",
            url: "https://fujimi-dx-lab.com/products/reserve-navi",
            offers: { "@type": "Offer", price: "0", priceCurrency: "JPY", description: "無料プランあり。月額¥1,980〜" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "Ask Navi",
            applicationCategory: "BusinessApplication",
            description: "公式LINEの問い合わせにAIが自動応答",
            url: "https://fujimi-dx-lab.com/products/ask-navi",
            offers: { "@type": "Offer", price: "550", priceCurrency: "JPY", description: "月額¥550〜" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "Rule Navi",
            applicationCategory: "BusinessApplication",
            description: "就業規則・マニュアルをAIが検索",
            url: "https://fujimi-dx-lab.com/products/rule-navi",
            offers: { "@type": "Offer", price: "550", priceCurrency: "JPY", description: "月額¥550〜" },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "Shift Navi",
            applicationCategory: "BusinessApplication",
            description: "AIがシフトをワンタッチで自動作成",
            url: "https://fujimi-dx-lab.com/products/shift-navi",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "Social Navi",
            applicationCategory: "BusinessApplication",
            description: "X・Instagram・TikTok・Facebookを一元管理",
            url: "https://fujimi-dx-lab.com/products/social-navi",
          },
        },
      ],
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ふじみ企業有限会社",
    description: "静岡県富士市のビジネスホテル運営・DXツール開発",
    address: {
      "@type": "PostalAddress",
      postalCode: "416-0909",
      streetAddress: "中里2586-16",
      addressLocality: "富士市",
      addressRegion: "静岡県",
      addressCountry: "JP",
    },
    email: "support@mail.fujimin-pass.com",
    url: "https://fujimi-dx-lab.com",
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "FUJIMIN PASSとは何ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FUJIMIN PASSは小規模事業者向けの統合DXプラットフォームです。予約管理（Reserve Navi）、AI自動応答（Ask Navi）、シフト管理（Shift Navi）、社内規則検索（Rule Navi）、SNS管理（Social Navi）の5つのサービスを、1つのアカウントで利用できます。",
        },
      },
      {
        "@type": "Question",
        name: "どのような業種が対象ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "宿泊施設、サロン・美容室、飲食店、リラクゼーション、クリニック、フィットネスなど、小規模〜中規模の店舗を主な対象としています。",
        },
      },
      {
        "@type": "Question",
        name: "1つのサービスだけでも利用できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、必要なサービスだけを選んで利用できます。1つから始めて、お店の成長に合わせて追加できます。",
        },
      },
      {
        "@type": "Question",
        name: "料金はいくらですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Reserve Naviは無料プランあり（月額¥1,980〜）、Ask NaviとRule Naviは月額¥550〜です。すべて税込価格です。",
        },
      },
      {
        "@type": "Question",
        name: "無料で相談できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、導入のご相談は無料です。お問い合わせフォームからお気軽にご連絡ください。",
        },
      },
    ],
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://fujimi-dx-lab.com" },
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
