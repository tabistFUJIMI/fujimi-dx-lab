import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "50");

  const where: Record<string, unknown> = { isPublished: true };
  if (category) where.category = category;

  const items = await prisma.column.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      tags: true,
      publishedAt: true,
    },
  });

  return NextResponse.json({ items });
}
