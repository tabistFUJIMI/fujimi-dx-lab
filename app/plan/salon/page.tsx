import type { Metadata } from "next";
import { PlanServiceJsonLd } from "@/app/components/JsonLd";
import SalonPageClient from "./SalonPageClient";

export const metadata: Metadata = {
  title:
    "ネイル・エステサロンの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
  description:
    "ジェルネイル・まつエク・フェイシャルの予約をLINEで自動管理。AI応答で問い合わせ対応も自動化。ShiftNavi無料。月額550円〜。",
  alternates: {
    canonical: "https://www.fujimi-dx-lab.com/plan/salon",
  },
  openGraph: {
    title:
      "ネイル・エステサロンの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
    description:
      "ジェルネイル・まつエク・フェイシャルの予約をLINEで自動管理。AI応答で問い合わせ対応も自動化。ShiftNavi無料。月額550円〜。",
    images: [
      {
        url: "/images/plan/salon-ogp.png",
        width: 1200,
        height: 630,
        alt: "ネイル・エステサロンプラン - FUJIMI DX Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ネイル・エステサロンプラン | FUJIMI DX Lab",
    description:
      "ジェルネイル・まつエク・フェイシャルの予約をLINEで自動管理。AI応答で問い合わせ対応も自動化。ShiftNavi無料。月額550円〜。",
    images: ["/images/plan/salon-ogp.png"],
  },
};

export default function SalonPlanPage() {
  return (
    <>
      <PlanServiceJsonLd
        slug="salon"
        name="ネイル・エステサロン向けDXツール導入支援"
        description="ジェルネイル・まつエク・フェイシャルの予約をLINEで自動管理。AI応答で問い合わせ対応も自動化。ShiftNavi無料。月額550円〜。"
        serviceType="DXツール導入支援"
      />
      <SalonPageClient />
    </>
  );
}
