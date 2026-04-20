/**
 * サイトのベースURL。
 *
 * 優先順位:
 *   1. NEXT_PUBLIC_BASE_URL（明示的に設定した値）
 *   2. NEXT_PUBLIC_VERCEL_URL（Vercelプレビュー環境で自動設定される）
 *   3. 本番URL（最終フォールバック）
 *
 * localhost を fallback に置くと、環境変数未設定のまま本番にデプロイされた場合
 * メール・OGP・sitemap のリンクが全部 localhost になってしまうため、
 * 本番URL をデフォルトにする。
 */
export const BASE_URL = (() => {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return "https://www.fujimi-dx-lab.com";
})();
