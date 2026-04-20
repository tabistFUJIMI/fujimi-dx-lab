import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { requireAdmin } from "../../../../../lib/admin-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  const item = await prisma.announcement.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  try {
    const body = await req.json();
    const { title, content, category, eventDate, isPublished } = body;

    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // eventDate の妥当性検証（不正な日付文字列で Invalid Date を保存しないため）
    let resolvedEventDate: Date | null | undefined;
    if (eventDate === undefined) {
      resolvedEventDate = existing.eventDate;
    } else if (eventDate === null || eventDate === "") {
      resolvedEventDate = null;
    } else {
      const d = new Date(eventDate);
      if (Number.isNaN(d.getTime())) {
        return NextResponse.json({ error: "eventDate の形式が不正です" }, { status: 400 });
      }
      resolvedEventDate = d;
    }

    const excerpt = content
      ? content
          .replace(/<[^>]*>/g, " ")
          .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
          .replace(/^#{1,6}\s+/gm, "")
          .replace(/(\*\*|__)(.*?)\1/g, "$2")
          .replace(/(\*|_)(.*?)\1/g, "$2")
          .replace(/`{1,3}([^`]+)`{1,3}/g, "$1")
          .replace(/^\s*[-*+>]\s+/gm, "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 100)
      : existing.excerpt;

    // 新たに公開する場合のみ publishedAt を設定
    const publishedAt =
      isPublished && !existing.isPublished ? new Date() : existing.publishedAt;

    const item = await prisma.announcement.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        content: content ?? existing.content,
        excerpt,
        category: category ?? existing.category,
        eventDate: resolvedEventDate,
        isPublished: isPublished ?? existing.isPublished,
        publishedAt,
      },
    });

    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  try {
    await prisma.announcement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}
