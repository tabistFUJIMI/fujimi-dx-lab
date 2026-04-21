import type { Metadata } from "next";
import { PlanServiceJsonLd } from "@/app/components/JsonLd";
import PetPageClient from "./PetPageClient";

export const metadata: Metadata = {
  title:
    "ペットサロン・トリミングの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
  description:
    "トリミング・シャンプーの予約をLINEで自動管理。ペット情報の事前収集にも対応。AI応答で飼い主様の問い合わせを自動化。",
  alternates: {
    canonical: "https://www.fujimi-dx-lab.com/plan/pet",
  },
  openGraph: {
    title:
      "ペットサロン・トリミングの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
    description:
      "トリミング・シャンプーの予約をLINEで自動管理。ペット情報の事前収集にも対応。AI応答で飼い主様の問い合わせを自動化。",
    images: [
      {
        url: "/images/plan/pet-hero.jpg",
        width: 1200,
        height: 630,
        alt: "ペットサロンプラン - FUJIMI DX Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ペットサロンプラン | FUJIMI DX Lab",
    description:
      "トリミング・シャンプーの予約をLINEで自動管理。ペット情報の事前収集にも対応。AI応答で飼い主様の問い合わせを自動化。",
    images: ["/images/plan/pet-hero.jpg"],
  },
};

export default function PetPlanPage() {
  return (
    <>
      <PlanServiceJsonLd
        slug="pet"
        name="ペットサロン・トリミング向けDXツール導入支援"
        description="トリミング・シャンプーの予約をLINEで自動管理。ペット情報の事前収集にも対応。AI応答で飼い主様の問い合わせを自動化。"
        serviceType="DXツール導入支援"
      />
      <PetPageClient />
    </>
  );
}
