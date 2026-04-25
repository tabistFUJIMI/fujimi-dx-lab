import type { Metadata } from "next";
import { PlanServiceJsonLd } from "@/app/components/JsonLd";
import HairPageClient from "./HairPageClient";

export const metadata: Metadata = {
  title:
    "美容室・ヘアサロンの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
  description:
    "カット・カラー・パーマの予約をLINEで自動管理。スタイリスト指名予約にも対応。AI応答でDM対応を自動化。月額¥550〜。",
  alternates: {
    canonical: "https://www.fujimi-dx-lab.com/plan/hair",
  },
  openGraph: {
    title:
      "美容室・ヘアサロンの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
    description:
      "カット・カラー・パーマの予約をLINEで自動管理。スタイリスト指名予約にも対応。AI応答でDM対応を自動化。月額¥550〜。",
    images: [
      {
        url: "/images/plan/hair-ogp.jpg",
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
      "カット・カラー・パーマの予約をLINEで自動管理。スタイリスト指名予約にも対応。月額¥550〜。",
    images: ["/images/plan/hair-ogp.jpg"],
  },
};

export default function HairPlanPage() {
  return (
    <>
      <PlanServiceJsonLd
        slug="hair"
        name="美容室・ヘアサロン向けDXツール導入支援"
        description="カット・カラー・パーマの予約をLINEで自動管理。スタイリスト指名予約にも対応。AI応答でDM対応を自動化。月額¥550〜。"
        serviceType="DXツール導入支援"
      />
      <HairPageClient />
    </>
  );
}
