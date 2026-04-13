import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FUJIMIN PASS | 小さなお店の予約・AI応答・シフト管理",
  description:
    "FUJIMIN PASSは小規模店舗向けDXシリーズ。LINE予約管理（ReserveNavi）、AI自動応答（AskNavi）、シフト管理（ShiftNavi・無料）を月額¥0から。数社限定の共創パートナーも募集中。",
  openGraph: {
    title: "FUJIMIN PASS | 小さなお店の予約・AI応答・シフト管理",
    description:
      "施術院・サロン向け。LINE予約管理・AI自動応答・シフト管理を月額¥0から。共創パートナー募集中。",
    url: "https://fujimi-dx-lab.com/fujimin-pass",
  },
  alternates: {
    canonical: "https://fujimi-dx-lab.com/fujimin-pass",
  },
};

export default function FujiminPassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
