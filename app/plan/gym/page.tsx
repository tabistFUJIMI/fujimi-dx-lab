import type { Metadata } from "next";
import GymPageClient from "./GymPageClient";

export const metadata: Metadata = {
  title:
    "パーソナルジムの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
  description:
    "トレーニングセッション予約をLINEで自動管理。トレーナー指名・体験予約にも対応。AI応答で問い合わせ自動化。ShiftNavi無料。",
  alternates: {
    canonical: "https://fujimi-dx-lab.com/plan/gym",
  },
  openGraph: {
    title:
      "パーソナルジムの予約管理+AI応答+シフト管理 | FUJIMI DX Lab",
    description:
      "トレーニングセッション予約をLINEで自動管理。トレーナー指名・体験予約にも対応。AI応答で問い合わせ自動化。ShiftNavi無料。",
    images: [
      {
        url: "/images/plan/gym-ogp.png",
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
      "トレーニングセッション予約をLINEで自動管理。トレーナー指名・体験予約にも対応。ShiftNavi無料。",
    images: ["/images/plan/gym-ogp.png"],
  },
};

export default function GymPlanPage() {
  return <GymPageClient />;
}
