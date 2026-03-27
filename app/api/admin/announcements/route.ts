import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/admin-auth";

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

    const excerpt = content.replace(/<[^>]*>/g, "").slice(0, 100);
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
