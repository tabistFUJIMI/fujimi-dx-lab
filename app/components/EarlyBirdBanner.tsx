import Link from "next/link";

type Variant = "full" | "compact" | "inline";

type Props = {
  variant?: Variant;
  accentColor?: string;
  productLabel?: string;
};

/**
 * 早期メンバー募集バナー（シンプル版）。
 * タイムライン:
 *   - 2026/5/1 〜 7/31: 早期メンバー募集期間（3ヶ月）
 *   - 早期メンバー特典 = 登録時ウェルカムポイント 1,500pt（通常500pt・3倍）
 *   - 無料トライアルなし（即課金）
 *   - 共創パートナー9社のみ別枠で2027/11/30まで無料
 */
export default function EarlyBirdBanner({
  variant = "full",
  accentColor = "#7c3aed",
  productLabel = "ReserveNavi",
}: Props) {
  if (variant === "inline") {
    return (
      <div
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold"
        style={{ borderColor: accentColor, color: accentColor, backgroundColor: `${accentColor}0d` }}
      >
        <span>🎁</span>
        <span>早期メンバー募集 5/1〜7/31・登録で1,500pt進呈</span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className="rounded-xl border p-4 text-sm"
        style={{ borderColor: accentColor, backgroundColor: `${accentColor}0d` }}
      >
        <p className="font-bold" style={{ color: accentColor }}>
          🎁 早期メンバー募集（2026/5/1 〜 7/31）
        </p>
        <p className="mt-1 text-gray-700">
          期間中にご登録された方には、<strong>AIクレジット1,500pt進呈</strong>（通常500pt・3倍）。
          週次レポート・AIカルテ分析・AIデータ移行を試せる量です。
        </p>
      </div>
    );
  }

  // variant === "full"
  return (
    <div
      className="relative overflow-hidden rounded-2xl border-2 p-6 md:p-8"
      style={{ borderColor: accentColor, background: `linear-gradient(135deg, ${accentColor}14 0%, ${accentColor}08 100%)` }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white"
          style={{ backgroundColor: accentColor }}
        >
          3ヶ月限定募集
        </span>
        <span className="text-xs font-semibold text-gray-500">2026/5/1 〜 2026/7/31</span>
      </div>
      <h3 className="mt-3 text-xl font-extrabold text-gray-900 md:text-2xl">
        早期メンバー募集キャンペーン
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-700 md:text-base">
        {productLabel} 正式スタート記念。
        <strong>5/1〜7/31の3ヶ月間にご登録された方には、AIクレジット 1,500pt（通常500pt・3倍）</strong>
        をウェルカムポイントとして進呈。週次AIレポート・AIカルテ分析・AIデータ移行まで、じっくりお試しいただけます。
      </p>
      <ul className="mt-4 space-y-1.5 text-sm text-gray-700">
        <li className="flex items-start gap-2">
          <span style={{ color: accentColor }}>✓</span>
          <span>
            <strong>2026/5/1 〜 7/31</strong> 早期メンバー募集期間（3ヶ月）
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span style={{ color: accentColor }}>✓</span>
          <span>
            <strong>ウェルカムポイント 1,500pt</strong> 進呈（通常500pt・3倍、有効期限90日）
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span style={{ color: accentColor }}>✓</span>
          <span>
            <strong>共創パートナー9社</strong> 別枠で2027/11/30まで無料（選考制）
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span style={{ color: accentColor }}>✓</span>
          <span>
            <strong>2026/8/1 以降</strong> の新規登録は通常500pt進呈
          </span>
        </li>
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-gray-500">
        ※ 早期メンバー特典は2026/5/1〜7/31に新規登録された方が対象です。期間外の登録は通常ウェルカムポイント500ptの進呈となります。ポイントの有効期限は付与日から90日間です。
      </p>
    </div>
  );
}

/** プラン料金カード用: 早期価格と通常価格の二重表記を描画（旧デザイン・現在は未使用） */
export function DualPriceTag({
  earlyPrice,
  regularPrice,
  period = "/月",
  accentColor = "#7c3aed",
}: {
  earlyPrice: string;
  regularPrice?: string;
  period?: string;
  accentColor?: string;
}) {
  return (
    <div>
      {regularPrice && (
        <p className="text-sm text-gray-400">
          通常 <span className="line-through">{regularPrice}</span>
        </p>
      )}
      <p className="mt-1 flex items-baseline gap-1">
        <span className="text-3xl font-extrabold text-gray-900">{earlyPrice}</span>
        <span className="text-base font-medium text-gray-400">{period}</span>
      </p>
      {regularPrice && (
        <p className="mt-1 text-xs font-semibold" style={{ color: accentColor }}>
          早期メンバー価格（割引継続）
        </p>
      )}
    </div>
  );
}
