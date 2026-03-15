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
  title: "FUJIMI DX Lab | 小さなお店のDXを、現場から。",
  description:
    "小規模事業者のための統合DXプラットフォーム「FUJIMIN PASS」。予約管理・シフト管理・社内規則検索・SNS運用・LINE活用を、ひとつのアカウントでまるごとカバーします。",
  openGraph: {
    title: "FUJIMI DX Lab | 小さなお店のDXを、現場から。",
    description:
      "小規模事業者のための統合DXプラットフォーム。FUJIMIN PASSエコシステムで業務をまるごとDX。",
    type: "website",
    locale: "ja_JP",
    siteName: "FUJIMI DX Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "FUJIMI DX Lab | 小さなお店のDXを、現場から。",
    description:
      "小規模事業者のための統合DXプラットフォーム「FUJIMIN PASS」。",
  },
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
