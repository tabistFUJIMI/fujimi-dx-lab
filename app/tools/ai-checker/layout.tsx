import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI対策チェッカー - SEO・GEO/LLMO無料診断ツール",
  description:
    "URLを入力するだけでSEOスコアとGEO/LLMOスコアを無料診断。ChatGPT・Gemini・Perplexity・ClaudeなどのAI検索エンジンにあなたのサイトが引用されるか、具体的な改善提案付きでチェックできます。",
  openGraph: {
    title: "AI対策チェッカー | あなたのサイトはAI検索に引用される？",
    description:
      "URLを入力するだけでSEO・GEO/LLMOを無料診断。AI検索エンジンでの引用されやすさをスコア化し、改善提案を提示します。",
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
