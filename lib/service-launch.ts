export const SERVICE_LAUNCH_ISO = "2026-05-01T00:00:00+09:00";
export const SERVICE_LAUNCH_DATE_LABEL = "2026年5月1日";
export const SERVICE_LAUNCH_DATE_SHORT = "5月1日";
export const SERVICE_LAUNCH_BANNER = "2026年5月1日サービス開始｜お気軽にご相談ください";
export const SERVICE_LAUNCH_NOTE = "2026年5月1日（金）よりサービス開始。お申し込み受付も同日スタートです。";

export function getLaunchTimestamp(): number {
  return new Date(SERVICE_LAUNCH_ISO).getTime();
}

export function isSignupOpen(now: Date | number = Date.now()): boolean {
  const current = typeof now === "number" ? now : now.getTime();
  return current >= getLaunchTimestamp();
}
