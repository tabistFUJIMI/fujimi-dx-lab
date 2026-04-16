import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-internal-secret");
  if (secret !== process.env.INTERNAL_API_SECRET) {
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
