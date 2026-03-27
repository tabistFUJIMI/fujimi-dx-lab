import { NextResponse } from "next/server";
import { requireAdmin } from "../../../../../lib/admin-auth";
import { getAuthUrl } from "../../../../../lib/ga-auth";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  const url = getAuthUrl();
  return NextResponse.json({ url });
}
