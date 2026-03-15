export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FUJIMI DX Lab",
    legalName: "ふじみ企業有限会社",
    description:
      "宿泊業向けDXプラットフォーム「FUJIMIN PASS」の開発・提供",
    email: "support@mail.fujimin-pass.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "静岡県",
      addressLocality: "富士市",
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
            description: "LINE Mini App対応の宿泊業向け予約管理システム",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "ShiftNavi",
            applicationCategory: "BusinessApplication",
            description: "AI搭載のシフト管理システム",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "RuleNavi",
            applicationCategory: "BusinessApplication",
            description: "AI搭載の社内規則・マニュアル検索システム",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "SocialNavi",
            applicationCategory: "BusinessApplication",
            description: "SNS投稿一元管理・AI分析システム",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: "AskNavi",
            applicationCategory: "BusinessApplication",
            description: "LINE AI応答・セグメント配信システム",
          },
        },
      ],
    },
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
          text: "FUJIMIN PASSは宿泊業向けの統合DXプラットフォームです。予約管理（Reserve Navi）、シフト管理（ShiftNavi）、社内規則検索（RuleNavi）、SNS管理（SocialNavi）、LINE活用（AskNavi）の5つのサービスを、1つのアカウントで利用できます。",
        },
      },
      {
        "@type": "Question",
        name: "どのような施設が対象ですか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ビジネスホテル、旅館、民宿など、少人数で運営する宿泊施設を主な対象としています。実際にビジネスホテル「ゆ縁の宿ふじみ」で運用しながら開発しています。",
        },
      },
      {
        "@type": "Question",
        name: "1つのサービスだけでも利用できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい、必要なサービスだけを選んで利用できます。FUJIMIN PASSアカウントを作成後、使いたいNaviを追加する形です。",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
