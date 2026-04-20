import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getOAuth2Client } from "../../../../../lib/ga-auth";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const error = req.nextUrl.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL("/admin/analytics?error=auth_denied", req.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/admin/analytics?error=no_code", req.url));
  }

  try {
    const client = getOAuth2Client();
    const { tokens } = await client.getToken(code);

    // token exchange失敗時でも tokens 自体はオブジェクトで返るため、必要なフィールドを明示検証
    if (!tokens?.access_token || !tokens.expiry_date) {
      console.error("[ga-callback] missing access_token or expiry_date");
      return NextResponse.redirect(new URL("/admin/analytics?error=invalid_tokens", req.url));
    }

    // refresh_token は初回認可時のみ返る。既存レコード update 時は既存値を維持する。
    const existing = await prisma.gaToken.findUnique({ where: { id: "ga_oauth" } });

    if (!existing && !tokens.refresh_token) {
      // 初回認可なのに refresh_token が取れない場合は access_type=offline の指定漏れ等の設定ミス
      console.error("[ga-callback] first auth without refresh_token");
      return NextResponse.redirect(new URL("/admin/analytics?error=no_refresh_token", req.url));
    }

    await prisma.gaToken.upsert({
      where: { id: "ga_oauth" },
      create: {
        id: "ga_oauth",
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token!, // 初回認可時は必ず存在することを上記で確認済み
        expiresAt: new Date(tokens.expiry_date),
      },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || undefined, // なければ既存維持
        expiresAt: new Date(tokens.expiry_date),
      },
    });

    return NextResponse.redirect(new URL("/admin/analytics?success=true", req.url));
  } catch (e) {
    console.error(
      "[ga-callback] error:",
      e instanceof Error ? e.message : "unknown"
    );
    return NextResponse.redirect(new URL("/admin/analytics?error=token_exchange", req.url));
  }
}
