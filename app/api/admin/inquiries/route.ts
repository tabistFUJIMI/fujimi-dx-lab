import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/admin-auth";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const items = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ items });
}
