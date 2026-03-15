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
  title: "FUJIMI DX Lab | 宿泊業のDXを、現場から。",
  description:
    "ゆ縁の宿ふじみが自ら開発した宿泊業向けDXプラットフォーム。予約管理・シフト管理・社内規則検索・SNS運用・LINE活用を、FUJIMIN PASSエコシステムでまるごと支援します。",
  openGraph: {
    title: "FUJIMI DX Lab | 宿泊業のDXを、現場から。",
    description:
      "ゆ縁の宿ふじみが自ら開発した宿泊業向けDXプラットフォーム。FUJIMIN PASSエコシステムで業務をまるごとDX。",
    type: "website",
    locale: "ja_JP",
    siteName: "FUJIMI DX Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "FUJIMI DX Lab | 宿泊業のDXを、現場から。",
    description:
      "ゆ縁の宿ふじみが自ら開発した宿泊業向けDXプラットフォーム。",
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
