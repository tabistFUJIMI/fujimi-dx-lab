import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const category = searchParams.get("category");

  const where: Record<string, unknown> = { isPublished: true };
  if (category) where.category = category;

  const items = await prisma.announcement.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  return NextResponse.json({ items });
}
