import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI対策チェッカー - SEOの基本とAI検索対応を無料診断",
  description:
    "URLを入力するだけでSEOの基本ができているかを無料診断。良いSEOはAI検索対策の土台になります。構造的に足りないものをやさしい言葉でお伝えします。完全無料・登録不要。",
  openGraph: {
    title: "AI対策チェッカー | SEOの基本とAI検索対応を無料診断",
    description:
      "良いSEO=AI対策の土台。URLを入力するだけで、サイトの構造に足りないものを無料で確認できます。",
    type: "website",
    url: "/tools/ai-checker",
  },
  alternates: { canonical: "/tools/ai-checker" },
};

export default function AICheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
