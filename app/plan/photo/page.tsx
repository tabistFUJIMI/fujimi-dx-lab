import type { Metadata } from "next";
import { PlanServiceJsonLd } from "@/app/components/JsonLd";
import PhotoPageClient from "./PhotoPageClient";

export const metadata: Metadata = {
  title:
    "写真スタジオの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
  description:
    "スタジオ撮影の予約をLINEで自動管理。撮影種類・人数の事前収集にも対応。AI応答で問い合わせ自動化。",
  alternates: {
    canonical: "https://www.fujimi-dx-lab.com/plan/photo",
  },
  openGraph: {
    title:
      "写真スタジオの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
    description:
      "スタジオ撮影の予約をLINEで自動管理。撮影種類・人数の事前収集にも対応。AI応答で問い合わせ自動化。",
    images: [
      {
        url: "/images/plan/photo-hero.png",
        width: 1200,
        height: 630,
        alt: "写真スタジオプラン - FUJIMI DX Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "写真スタジオプラン | FUJIMI DX Lab",
    description:
      "スタジオ撮影の予約をLINEで自動管理。撮影種類・人数の事前収集にも対応。AI応答で問い合わせ自動化。",
    images: ["/images/plan/photo-hero.png"],
  },
};

export default function PhotoPlanPage() {
  return (
    <>
      <PlanServiceJsonLd
        slug="photo"
        name="写真スタジオ向けDXツール導入支援"
        description="スタジオ撮影の予約をLINEで自動管理。撮影種類・人数の事前収集にも対応。AI応答で問い合わせ自動化。"
        serviceType="DXツール導入支援"
      />
      <PhotoPageClient />
    </>
  );
}
