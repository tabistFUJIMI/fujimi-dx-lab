import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.column.findUnique({
    where: { slug },
    select: { title: true, excerpt: true, slug: true },
  });
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt || undefined,
    alternates: { canonical: `/column/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      type: "article",
      url: `/column/${article.slug}`,
    },
  };
}

const categoryLabels: Record<string, string> = {
  basics: "基礎知識",
  "ai-strategy": "AI別対策",
  practice: "実践ガイド",
  "case-study": "事例",
};

const categoryColors: Record<string, string> = {
  basics: "bg-blue-100 text-blue-700",
  "ai-strategy": "bg-purple-100 text-purple-700",
  practice: "bg-emerald-100 text-emerald-700",
  "case-study": "bg-amber-100 text-amber-700",
};

// Simple Markdown to HTML converter (headings, bold, lists, links, paragraphs)
function markdownToHtml(md: string): string {
  return md
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      // Headings
      if (trimmed.startsWith("### ")) return `<h3>${inline(trimmed.slice(4))}</h3>`;
      if (trimmed.startsWith("## ")) return `<h2>${inline(trimmed.slice(3))}</h2>`;
      if (trimmed.startsWith("# ")) return `<h1>${inline(trimmed.slice(2))}</h1>`;
      // Unordered list
      if (trimmed.match(/^[-*] /m)) {
        const items = trimmed.split("\n").filter((l) => l.match(/^[-*] /));
        return `<ul>${items.map((l) => `<li>${inline(l.replace(/^[-*] /, ""))}</li>`).join("")}</ul>`;
      }
      // Ordered list
      if (trimmed.match(/^\d+\. /m)) {
        const items = trimmed.split("\n").filter((l) => l.match(/^\d+\. /));
        return `<ol>${items.map((l) => `<li>${inline(l.replace(/^\d+\. /, ""))}</li>`).join("")}</ol>`;
      }
      // Table
      if (trimmed.includes("|") && trimmed.includes("---")) {
        const rows = trimmed.split("\n").filter((l) => l.includes("|") && !l.match(/^\|[\s-|]+\|$/));
        if (rows.length >= 1) {
          const headerCells = rows[0].split("|").filter(Boolean).map((c) => c.trim());
          const bodyRows = rows.slice(1);
          const thead = `<thead><tr>${headerCells.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>`;
          const tbody = bodyRows.length > 0
            ? `<tbody>${bodyRows.map((r) => `<tr>${r.split("|").filter(Boolean).map((c) => `<td>${inline(c.trim())}</td>`).join("")}</tr>`).join("")}</tbody>`
            : "";
          return `<table>${thead}${tbody}</table>`;
        }
      }
      // Blockquote
      if (trimmed.startsWith("> ")) {
        return `<blockquote>${inline(trimmed.replace(/^> /gm, ""))}</blockquote>`;
      }
      return `<p>${inline(trimmed)}</p>`;
    })
    .join("\n");
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

export default async function ColumnArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.column.findUnique({ where: { slug } });

  if (!article || !article.isPublished) notFound();

  const htmlContent = markdownToHtml(article.content);
  const publishDate = article.publishedAt
    ? new Date(article.publishedAt).toISOString().slice(0, 10)
    : null;

  // JSON-LD Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: { "@type": "Organization", name: "FUJIMI DX Lab", url: "https://fujimi-dx-lab.com" },
    publisher: { "@type": "Organization", name: "FUJIMI DX Lab", url: "https://fujimi-dx-lab.com" },
    mainEntityOfPage: `https://fujimi-dx-lab.com/column/${article.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/column" className="text-sm text-[#004ac6] hover:underline">
              ← コラム一覧
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColors[article.category] || "bg-gray-100 text-gray-700"}`}>
              {categoryLabels[article.category] || article.category}
            </span>
            {publishDate && <time className="text-xs text-[#737686]">{publishDate}</time>}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#191b23] leading-tight mb-4">
            {article.title}
          </h1>
          {article.tags.length > 0 && (
            <div className="flex gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs text-[#737686] bg-[#f3f3fe] px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:text-[#191b23] prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-[#e1e2ed]
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[#434655] prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-[#004ac6] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#191b23]
            prose-li:text-[#434655]
            prose-table:text-sm prose-th:bg-[#f3f3fe] prose-th:px-4 prose-th:py-2 prose-th:text-left
            prose-td:px-4 prose-td:py-2 prose-td:border-t prose-td:border-[#e1e2ed]
            prose-blockquote:border-l-4 prose-blockquote:border-[#004ac6] prose-blockquote:bg-[#f3f3fe] prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl
            prose-code:bg-[#f3f3fe] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-[#eef4ff] to-[#e8fffe] rounded-2xl text-center">
          <h3 className="text-xl font-bold text-[#191b23] mb-2">あなたのサイトを今すぐ診断</h3>
          <p className="text-sm text-[#434655] mb-4">AI対策チェッカーでSEO・GEO/LLMOスコアを無料チェック</p>
          <Link
            href="/tools/ai-checker"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#004ac6] text-white rounded-xl font-bold hover:bg-[#003ea8] transition-all"
          >
            AI対策チェッカーを使う →
          </Link>
        </div>

        {/* Back to list */}
        <div className="mt-8 text-center">
          <Link href="/column" className="text-sm text-[#004ac6] hover:underline">
            ← コラム一覧に戻る
          </Link>
        </div>
      </article>
    </>
  );
}
