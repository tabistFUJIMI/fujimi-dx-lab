import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/admin-auth";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const items = await prisma.column.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { slug, title, content, category, tags, ogImage, isPublished } = body;

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: "スラッグ・タイトル・本文は必須です" },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await prisma.column.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: "このスラッグは既に使用されています" },
        { status: 400 }
      );
    }

    const excerpt = content.replace(/<[^>]*>/g, "").replace(/[#*_\->\[\]()]/g, "").slice(0, 120);
    const item = await prisma.column.create({
      data: {
        slug,
        title,
        content,
        excerpt,
        category: category || "basics",
        tags: tags || [],
        ogImage: ogImage || null,
        isPublished: isPublished ?? false,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "作成に失敗しました" }, { status: 500 });
  }
}
