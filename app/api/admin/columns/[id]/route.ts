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
  const item = await prisma.column.findUnique({ where: { id } });
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
    const { slug, title, content, category, tags, ogImage, isPublished } = body;

    const existing = await prisma.column.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Check slug uniqueness if changed
    if (slug && slug !== existing.slug) {
      const slugExists = await prisma.column.findUnique({ where: { slug } });
      if (slugExists) {
        return NextResponse.json({ error: "このスラッグは既に使用されています" }, { status: 400 });
      }
    }

    const excerpt = content
      ? content.replace(/<[^>]*>/g, "").replace(/[#*_\->\[\]()]/g, "").slice(0, 120)
      : existing.excerpt;

    const publishedAt =
      isPublished && !existing.isPublished ? new Date() : existing.publishedAt;

    const item = await prisma.column.update({
      where: { id },
      data: {
        slug: slug ?? existing.slug,
        title: title ?? existing.title,
        content: content ?? existing.content,
        excerpt,
        category: category ?? existing.category,
        tags: tags !== undefined ? tags : existing.tags,
        ogImage: ogImage !== undefined ? ogImage : existing.ogImage,
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
    await prisma.column.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }
}
