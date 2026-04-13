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

    await prisma.gaToken.upsert({
      where: { id: "ga_oauth" },
      create: {
        id: "ga_oauth",
        accessToken: tokens.access_token!,
        refreshToken: tokens.refresh_token!,
        expiresAt: new Date(tokens.expiry_date!),
      },
      update: {
        accessToken: tokens.access_token!,
        refreshToken: tokens.refresh_token || undefined,
        expiresAt: new Date(tokens.expiry_date!),
      },
    });

    return NextResponse.redirect(new URL("/admin/analytics?success=true", req.url));
  } catch (e) {
    console.error("GA OAuth callback error:", e);
    return NextResponse.redirect(new URL("/admin/analytics?error=token_exchange", req.url));
  }
}
