import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const expected = process.env.INTERNAL_API_SECRET;
  // 環境変数が未設定または空文字列の場合、ヘッダー側も空にすれば一致してしまう。
  // サーバー側で設定されていなければ常に拒否。
  if (!expected || expected.length < 16) {
    console.error("[internal/bot-log] INTERNAL_API_SECRET is not configured");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const secret = request.headers.get("x-internal-secret");
  if (secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { botName, botTier, url, method, userAgent, ip, referer } =
      await request.json();

    await prisma.botAccessLog.create({
      data: {
        botName: botName || "unknown",
        botTier: botTier || "other",
        url: (url || "/").split("?")[0],
        method: method || "GET",
        userAgent: userAgent?.slice(0, 500),
        ipAddress: ip,
        referer,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Bot log error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
