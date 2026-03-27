import { NextRequest, NextResponse } from "next/server";
import { createAdminSession } from "../../../lib/admin-session";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ error: "管理者アカウントが未設定です" }, { status: 500 });
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
    }

    await createAdminSession();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "ログインに失敗しました" }, { status: 500 });
  }
}
