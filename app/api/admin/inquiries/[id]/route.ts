import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { requireAdmin } from "../../../../../lib/admin-auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  try {
    const { status } = await req.json();
    if (!["new", "replied", "closed"].includes(status)) {
      return NextResponse.json({ error: "無効なステータスです" }, { status: 400 });
    }
    const item = await prisma.contact.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }
}
