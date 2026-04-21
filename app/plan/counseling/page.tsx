import type { Metadata } from "next";
import { PlanServiceJsonLd } from "@/app/components/JsonLd";
import CounselingPageClient from "./CounselingPageClient";

export const metadata: Metadata = {
  title:
    "カウンセリング・相談の予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
  description:
    "初回相談・継続セッションの予約をLINEで自動管理。承認制予約でダブルブッキング防止。AI応答で問い合わせ自動化。",
  alternates: {
    canonical: "https://www.fujimi-dx-lab.com/plan/counseling",
  },
  openGraph: {
    title:
      "カウンセリング・相談の予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
    description:
      "初回相談・継続セッションの予約をLINEで自動管理。承認制予約でダブルブッキング防止。AI応答で問い合わせ自動化。",
    images: [
      {
        url: "/images/plan/counseling-hero.png",
        width: 1200,
        height: 630,
        alt: "カウンセリングプラン - FUJIMI DX Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "カウンセリングプラン | FUJIMI DX Lab",
    description:
      "初回相談・継続セッションの予約をLINEで自動管理。承認制予約でダブルブッキング防止。AI応答で問い合わせ自動化。",
    images: ["/images/plan/counseling-hero.png"],
  },
};

export default function CounselingPlanPage() {
  return (
    <>
      <PlanServiceJsonLd
        slug="counseling"
        name="カウンセリング・相談向けDXツール導入支援"
        description="初回相談・継続セッションの予約をLINEで自動管理。承認制予約でダブルブッキング防止。AI応答で問い合わせ自動化。"
        serviceType="DXツール導入支援"
      />
      <CounselingPageClient />
    </>
  );
}
