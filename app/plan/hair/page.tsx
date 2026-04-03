import type { Metadata } from "next";
import HairPageClient from "./HairPageClient";

export const metadata: Metadata = {
  title:
    "美容室・ヘアサロンの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
  description:
    "カット・カラー・パーマの予約をLINEで自動管理。スタイリスト指名予約にも対応。AI応答でDM対応を自動化。ShiftNavi無料。",
  alternates: {
    canonical: "https://fujimi-dx-lab.com/plan/hair",
  },
  openGraph: {
    title:
      "美容室・ヘアサロンの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
    description:
      "カット・カラー・パーマの予約をLINEで自動管理。スタイリスト指名予約にも対応。AI応答でDM対応を自動化。ShiftNavi無料。",
    images: [
      {
        url: "/images/plan/hair-ogp.png",
        width: 1200,
        height: 630,
        alt: "美容室・ヘアサロンプラン - FUJIMI DX Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "美容室・ヘアサロンプラン | FUJIMI DX Lab",
    description:
      "カット・カラー・パーマの予約をLINEで自動管理。スタイリスト指名予約にも対応。ShiftNavi無料。",
    images: ["/images/plan/hair-ogp.png"],
  },
};

export default function HairPlanPage() {
  return <HairPageClient />;
}
