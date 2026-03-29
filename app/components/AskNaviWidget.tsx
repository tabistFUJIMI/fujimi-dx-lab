"use client";

import Script from "next/script";

interface AskNaviWidgetProps {
  /** AskNaviに登録した店舗のslug */
  storeSlug: string;
  /** AskNaviのベースURL（デフォルト: 本番） */
  baseUrl?: string;
}

/**
 * AskNavi Webウィジェット埋め込みコンポーネント
 *
 * 使用例:
 * ```tsx
 * <AskNaviWidget storeSlug="demo-store" />
 * ```
 *
 * 右下にチャットアイコンが表示され、クリックでチャットウィンドウが開きます。
 */
export default function AskNaviWidget({
  storeSlug,
  baseUrl = "https://ask-navi.fujimin-pass.com",
}: AskNaviWidgetProps) {
  return (
    <Script
      src={`${baseUrl}/widget.js`}
      data-store-slug={storeSlug}
      strategy="lazyOnload"
    />
  );
}
