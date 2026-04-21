/**
 * サイトのベースURL。
 *
 * 優先順位:
 *   1. NEXT_PUBLIC_BASE_URL（明示的に設定した値）
 *   2. NEXT_PUBLIC_VERCEL_URL（Vercelプレビュー環境で自動設定される）
 *   3. 本番URL（最終フォールバック）
 *
 * www正規化:
 *   本番の実配信URLは www 付きのため、canonical/OGP/sitemap すべて
 *   www 付きで統一する。環境変数で www なしを渡されても自動補完する。
 *
 * localhost/vercel.app 等の preview ドメインは正規化スキップ（本来の
 *   URL で動作させる）。
 */
function canonicalize(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    // 本番ドメインのみ www 正規化（preview・localhost はそのまま）
    if (url.hostname === "fujimi-dx-lab.com") {
      url.hostname = "www.fujimi-dx-lab.com";
    }
    // 末尾スラッシュ除去
    return url.toString().replace(/\/$/, "");
  } catch {
    return rawUrl.replace(/\/$/, "");
  }
}

export const BASE_URL = (() => {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return canonicalize(process.env.NEXT_PUBLIC_BASE_URL);
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return "https://www.fujimi-dx-lab.com";
})();
