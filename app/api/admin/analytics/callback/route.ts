import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getOAuth2Client } from "../../../../../lib/ga-auth";
import { requireAdmin } from "../../../../../lib/admin-auth";

export async function GET(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const code = req.nextUrl.searchParams.get("code");
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

    return NextResponse.redirect(new URL("/admin/analytics?connected=true", req.url));
  } catch (error) {
    console.error("GA OAuth error:", error);
    return NextResponse.redirect(new URL("/admin/analytics?error=oauth_failed", req.url));
  }
}
