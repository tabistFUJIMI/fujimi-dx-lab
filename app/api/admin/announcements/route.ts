import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/admin-auth";

/**
 * 本文（HTML/Markdown混在）からプレーンテキストのexcerptを生成する。
 * 以前は `<[^>]*>` のみを除去していたため、Markdown記法（**bold**, [link](url) 等）が
 * そのまま残ってしまい、検索結果・OG descriptionで読みにくい文字列になっていた。
 */
function buildExcerpt(content: string, length = 100): string {
  return content
    .replace(/<[^>]*>/g, " ")                       // HTMLタグ除去
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")          // Markdown画像 ![alt](src)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")        // Markdownリンク [text](url) → text
    .replace(/^#{1,6}\s+/gm, "")                     // 見出し ### などの # を除去
    .replace(/(\*\*|__)(.*?)\1/g, "$2")             // **bold** / __bold__
    .replace(/(\*|_)(.*?)\1/g, "$2")                 // *italic* / _italic_
    .replace(/`{1,3}([^`]+)`{1,3}/g, "$1")          // `inline code` / ```code```
    .replace(/^\s*[-*+>]\s+/gm, "")                  // リスト記号・引用
    .replace(/\s+/g, " ")                            // 連続空白を単一化
    .trim()
    .slice(0, length);
}

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const items = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { title, content, category, eventDate, isPublished } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "タイトルと本文は必須です" }, { status: 400 });
    }

    const excerpt = buildExcerpt(content);
    const item = await prisma.announcement.create({
      data: {
        title,
        content,
        excerpt,
        category: category || "info",
        eventDate: eventDate ? new Date(eventDate) : null,
        isPublished: isPublished ?? false,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "作成に失敗しました" }, { status: 500 });
  }
}
