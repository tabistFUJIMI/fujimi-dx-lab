import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { detectBot } from "./lib/bot-detector";

const STATIC_PATTERN = /^\/_next\/|^\/favicon\.ico|^\/images\/|^\/fonts\//;

/**
 * 1リクエストごとにランダムなnonceを生成する。
 * crypto.randomUUID() はEdge Runtimeで利用可能。
 */
function generateNonce(): string {
  // base64エンコードして CSP で使える形式に
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

/**
 * nonce値を埋め込んだCSPヘッダー文字列を生成。
 *
 * script-src の設計:
 *   - 'nonce-xxx': サーバー発行nonce付きインラインスクリプトのみ許可
 *   - 'strict-dynamic': nonce付きスクリプトから動的ロードされたscriptは信頼される（CSP3）
 *   - 'unsafe-inline': CSP3非対応ブラウザ向けのフォールバック
 *     （CSP3対応ブラウザでは 'strict-dynamic' があるとき 'unsafe-inline' は無視されるため、
 *      モダンブラウザではnonceベースの厳格な制御が効く）
 *   - https: http:: 旧ブラウザ向けのフォールバック（strict-dynamic 非対応時に機能）
 *
 * この構成により JSON-LD 等の既存インラインスクリプトを壊さず、
 * かつ XSS 耐性は nonce + strict-dynamic で担保される。
 */
function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline' https: http:`,
    "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
    "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
    "font-src 'self' fonts.googleapis.com fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://*.googletagmanager.com",
    "frame-src https://ask-navi.fujimin-pass.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'",
  ].join("; ");
}

export function proxy(
  request: NextRequest,
  event: { waitUntil: (promise: Promise<unknown>) => void }
) {
  const pathname = request.nextUrl.pathname;

  // 静的アセットは nonce/CSP 不要
  if (STATIC_PATTERN.test(pathname)) {
    return NextResponse.next();
  }

  // --- nonce 生成と下流への伝搬 ---
  const nonce = generateNonce();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce); // layout.tsx から headers() 経由で読める

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // レスポンスヘッダーにもCSPを設定（ブラウザ側で適用される）
  response.headers.set("Content-Security-Policy", buildCsp(nonce));

  // --- ボット検知 & 非同期ログ記録（従来機能維持） ---
  const userAgent = request.headers.get("user-agent");
  const bot = detectBot(userAgent);

  if (bot) {
    const logData = {
      botName: bot.name,
      botTier: bot.tier,
      url: pathname,
      method: request.method,
      userAgent: userAgent?.slice(0, 500) || "",
      ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "",
      referer: request.headers.get("referer") || "",
    };

    const url = new URL("/api/internal/bot-log", request.url);
    const promise = fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-secret": process.env.INTERNAL_API_SECRET || "",
      },
      body: JSON.stringify(logData),
    }).catch(() => {
      // メイン処理をブロックしない fire-and-forget。
      // ログ失敗は許容（可観測性はサーバー側 bot-log API 自体のエラーログで担保）
    });

    if (event?.waitUntil) {
      event.waitUntil(promise);
    }
  }

  return response;
}

export const config = {
  // 静的アセット・API以外の全パスにマッチ（API側はnonce不要）
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)",
  ],
};
