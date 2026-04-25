import type { Metadata } from "next";
import { PlanServiceJsonLd } from "@/app/components/JsonLd";
import GymPageClient from "./GymPageClient";

export const metadata: Metadata = {
  title:
    "パーソナルジムの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
  description:
    "トレーニングセッション予約をLINEで自動管理。トレーナー指名・体験予約にも対応。AI応答で問い合わせ自動化。月額¥550〜。",
  alternates: {
    canonical: "https://www.fujimi-dx-lab.com/plan/gym",
  },
  openGraph: {
    title:
      "パーソナルジムの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
    description:
      "トレーニングセッション予約をLINEで自動管理。トレーナー指名・体験予約にも対応。AI応答で問い合わせ自動化。月額¥550〜。",
    images: [
      {
        url: "/images/plan/gym-ogp.jpg",
        width: 1200,
        height: 630,
        alt: "パーソナルジムプラン - FUJIMI DX Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "パーソナルジムプラン | FUJIMI DX Lab",
    description:
      "トレーニングセッション予約をLINEで自動管理。トレーナー指名・体験予約にも対応。月額¥550〜。",
    images: ["/images/plan/gym-ogp.jpg"],
  },
};

export default function GymPlanPage() {
  return (
    <>
      <PlanServiceJsonLd
        slug="gym"
        name="パーソナルジム向けDXツール導入支援"
        description="トレーニングセッション予約をLINEで自動管理。トレーナー指名・体験予約にも対応。AI応答で問い合わせ自動化。月額¥550〜。"
        serviceType="DXツール導入支援"
      />
      <GymPageClient />
    </>
  );
}
