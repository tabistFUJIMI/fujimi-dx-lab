import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";
import { BASE_URL } from "../lib/base-url";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// preload: false — CJKフォントは多数サブセットに分割されるため、preload=trueだと
// 初回ロードで多数のpreloadタグが生成されLCPを悪化させる。
// preload=false でブラウザが必要なサブセットだけを遅延取得する。
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "FUJIMI DX Lab | 小さな組織の困ったをテクノロジーで解決する",
    template: "%s - FUJIMI DX Lab",
  },
  description:
    "FUJIMI DX Labは静岡県富士市発のDX事業部。施術院・サロン向けFUJIMIN PASS（予約管理・AI応答・シフト管理）、個人向けForProject等、小さな組織が必要なツールを月額¥980から提供。共創パートナー募集中。",
  keywords: [
    // ブランド名のバリエーション（検索時の打鍵ゆらぎ対策）
    "FUJIMI DX Lab", "fujimidxlab", "fujimi-dx-lab", "fujimi dx lab",
    "ふじみDXラボ", "フジミDXラボ", "ふじみディーエックスラボ",
    // 製品・業態
    "DX", "小規模事業者", "FUJIMIN PASS", "ForProject", "TASUKI PASS",
    "予約管理", "AI自動応答", "シフト管理", "LINE予約",
    "Reserve Navi", "Ask Navi", "Shift Navi", "Rule Navi",
    // 地域
    "静岡県富士市", "富士市DX", "静岡DX",
  ],
  authors: [{ name: "FUJIMI DX Lab", url: BASE_URL }],
  creator: "ふじみ企業有限会社 FUJIMI DX Lab事業部",
  openGraph: {
    title: "FUJIMI DX Lab | 小さな組織の困ったをテクノロジーで解決する",
    description:
      "静岡県富士市発のDX事業部。施術院・サロン向けFUJIMIN PASS、個人向けForProject等、小さな組織が必要なツールを月額¥980から提供。",
    type: "website",
    locale: "ja_JP",
    siteName: "FUJIMI DX Lab",
    url: BASE_URL,
    images: [
      {
        url: "/images/ogp-main.jpg",
        width: 1200,
        height: 630,
        alt: "FUJIMI DX Lab — 小さな組織の困ったをテクノロジーで解決する",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FUJIMI DX Lab | 小さな組織の困ったをテクノロジーで解決する",
    description: "静岡県富士市発のDX事業部。施術院・サロン向けFUJIMIN PASS、個人向けForProject等、小さな組織が必要なツールを月額¥980から提供。",
    images: ["/images/ogp-main.jpg"],
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
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // proxy.ts (middleware) が設定した per-request nonce を取得
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? undefined;

  return (
    <html lang="ja">
      <head />
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
              nonce={nonce}
            />
            <Script id="google-analytics" strategy="afterInteractive" nonce={nonce}>
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
