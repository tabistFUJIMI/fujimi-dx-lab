import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import JsonLd from "./components/JsonLd";
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
    default: "FUJIMI DX Lab | 小さなお店のDXを、現場から。",
    template: "%s - FUJIMI DX Lab",
  },
  description:
    "宿泊施設・サロン・飲食店向けDXツール。LINE予約管理・AI自動応答・シフト管理を月額550円から。無料プランあり。FUJIMI DX Lab",
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
      "宿泊施設・サロン・飲食店向けDXツール。LINE予約管理・AI自動応答・シフト管理を月額550円から。無料プランあり。FUJIMI DX Lab",
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
    description: "宿泊施設・サロン・飲食店向けDXツール。LINE予約管理・AI自動応答・シフト管理を月額550円から。無料プランあり。FUJIMI DX Lab",
    images: ["/images/ogp.jpg"],
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
      <head>
        <JsonLd />
      </head>
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
