import { NextResponse } from "next/server";
import { getAdminSession } from "./admin-session";

export async function requireAdmin(): Promise<NextResponse | null> {
  const isAuthenticated = await getAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "認証が必要です。/login からログインしてください。" },
      { status: 401 }
    );
  }
  return null;
}
