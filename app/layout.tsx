import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fujimi-dx-lab.com"),
  title: {
    default: "FUJIMI DX Lab | 小さな組織の困ったをテクノロジーで解決する",
    template: "%s - FUJIMI DX Lab",
  },
  description:
    "FUJIMI DX Labは静岡県富士市発のDX事業部。施術院・サロン向けFUJIMIN PASS（予約管理・AI応答・シフト管理）、個人向けForProject等、小さな組織が必要なツールを月額¥0から提供。共創パートナー募集中。",
  keywords: [
    "FUJIMI DX Lab", "DX", "小規模事業者", "FUJIMIN PASS",
    "ForProject", "TASUKI PASS", "予約管理", "AI自動応答",
    "シフト管理", "LINE予約", "静岡県富士市",
    "Reserve Navi", "Ask Navi", "Shift Navi",
  ],
  authors: [{ name: "FUJIMI DX Lab", url: "https://fujimi-dx-lab.com" }],
  creator: "ふじみ企業有限会社 FUJIMI DX Lab事業部",
  openGraph: {
    title: "FUJIMI DX Lab | 小さな組織の困ったをテクノロジーで解決する",
    description:
      "静岡県富士市発のDX事業部。施術院・サロン向けFUJIMIN PASS、個人向けForProject等、小さな組織が必要なツールを月額¥0から提供。",
    type: "website",
    locale: "ja_JP",
    siteName: "FUJIMI DX Lab",
    url: "https://fujimi-dx-lab.com",
    images: [
      {
        url: "/images/ogp-main.png",
        width: 1200,
        height: 630,
        alt: "FUJIMI DX Lab — 小さな組織の困ったをテクノロジーで解決する",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FUJIMI DX Lab | 小さな組織の困ったをテクノロジーで解決する",
    description: "静岡県富士市発のDX事業部。施術院・サロン向けFUJIMIN PASS、個人向けForProject等、小さな組織が必要なツールを月額¥0から提供。",
    images: ["/images/ogp-main.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://fujimi-dx-lab.com",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head />
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                if (!/^\\/(admin|login|api)/.test(window.location.pathname)) {
                  gtag('config', '${GA_ID}');
                }
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
