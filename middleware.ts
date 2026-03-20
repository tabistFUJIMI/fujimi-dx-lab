import { NextRequest, NextResponse } from "next/server";

const BASIC_USER = process.env.BASIC_AUTH_USER || "admin";
const BASIC_PASS = process.env.BASIC_AUTH_PASSWORD || "fujimi2026";

export function middleware(req: NextRequest) {
  // APIとstaticファイルはスキップ
  if (
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname.startsWith("/_next/") ||
    req.nextUrl.pathname.startsWith("/images/") ||
    req.nextUrl.pathname === "/favicon.ico" ||
    req.nextUrl.pathname === "/robots.txt" ||
    req.nextUrl.pathname === "/sitemap.xml" ||
    req.nextUrl.pathname === "/llms.txt"
  ) {
    return NextResponse.next();
  }

  const auth = req.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");
      if (user === BASIC_USER && pass === BASIC_PASS) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("認証が必要です", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="FUJIMI DX Lab"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
