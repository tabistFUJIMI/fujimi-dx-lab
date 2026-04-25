import type { Metadata } from "next";
import { PlanServiceJsonLd } from "@/app/components/JsonLd";
import SejutsuPageClient from "./SejutsuPageClient";

export const metadata: Metadata = {
  title:
    "整体・マッサージ院の予約管理+AI応答+シフト管理｜施術プラン | FUJIMI DX Lab",
  description:
    "施術の手を止めるたび、お客様は離れていく。LINE予約受付・AI自動応答・シフト管理をひとまとめに。月額¥550〜。",
  alternates: {
    canonical: "https://www.fujimi-dx-lab.com/plan/sejutsu",
  },
  openGraph: {
    title:
      "整体・マッサージ院の予約管理+AI応答+シフト管理｜施術プラン | FUJIMI DX Lab",
    description:
      "LINE予約受付・AI自動応答・シフト管理をひとまとめに。月額¥550〜。",
    images: [
      {
        url: "/images/plan/sejutsu-hero.jpg",
        width: 1200,
        height: 630,
        alt: "施術プラン - FUJIMI DX Lab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "施術プラン | FUJIMI DX Lab",
    description:
      "LINE予約受付・AI自動応答・シフト管理をひとまとめに。月額¥550〜。",
    images: ["/images/plan/sejutsu-hero.jpg"],
  },
};

export default function SejutsuPlanPage() {
  return (
    <>
      <PlanServiceJsonLd
        slug="sejutsu"
        name="施術プラン（整体・マッサージ院向けDXツール導入支援）"
        description="整体・マッサージ院向けのLINE予約受付・AI自動応答・シフト管理をひとまとめに導入。月額¥550〜。"
        serviceType="DXツール導入支援"
      />
      <SejutsuPageClient />
    </>
  );
}
