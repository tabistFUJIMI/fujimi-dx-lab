import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import JsonLd from "./components/JsonLd";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fujimi-dx-lab.com"),
  title: {
    default: "FUJIMI DX Lab | 小さなお店のDXを、現場から。",
    template: "%s - FUJIMI DX Lab",
  },
  description:
    "小規模事業者のための統合DXプラットフォーム「FUJIMIN PASS」。予約管理・シフト管理・社内規則検索・SNS運用・LINE活用を、ひとつのアカウントでまるごとカバーします。",
  keywords: [
    "DX", "小規模事業者", "予約管理", "シフト管理", "LINE予約",
    "AI", "社内規則", "SNS管理", "FUJIMIN PASS", "FUJIMI DX Lab",
    "Reserve Navi", "Ask Navi", "Rule Navi", "Shift Navi",
  ],
  authors: [{ name: "FUJIMI DX Lab", url: "https://fujimi-dx-lab.com" }],
  creator: "ふじみ企業有限会社 FUJIMI DX Lab事業部",
  openGraph: {
    title: "FUJIMI DX Lab | 小さなお店のDXを、現場から。",
    description:
      "小規模事業者のための統合DXプラットフォーム。予約管理・AI応答・シフト管理・社内規則検索をひとつに。",
    type: "website",
    locale: "ja_JP",
    siteName: "FUJIMI DX Lab",
    url: "https://fujimi-dx-lab.com",
    images: [
      {
        url: "/images/ogp.jpg",
        width: 1200,
        height: 630,
        alt: "FUJIMI DX Lab — 小さなお店のDXを、現場から。",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FUJIMI DX Lab | 小さなお店のDXを、現場から。",
    description: "小規模事業者のための統合DXプラットフォーム「FUJIMIN PASS」。",
    images: ["/images/ogp.jpg"],
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
      <head>
        <JsonLd />
      </head>
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
