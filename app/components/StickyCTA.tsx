"use client";

import { useEffect, useState } from "react";
import SignupFlowButton from "./SignupFlowButton";

type Props = {
  /** 主CTAリンク（相談フォーム or 無料登録） */
  primaryHref?: string;
  /** 主CTAラベル */
  primaryLabel?: string;
  /** 副CTAリンク（LINE追加 or 電話など） */
  secondaryHref?: string;
  /** 副CTAラベル */
  secondaryLabel?: string;
  /** 小さい注釈（注釈テキストなど） */
  caption?: string;
  /** スクロール何pxで表示するか */
  showAfter?: number;
  /** 主CTAをサービス開始日ゲート付きのSignupFlowButtonにする */
  primaryGated?: boolean;
};

/**
 * モバイル下部固定 + デスクトップ右下フローティング CTA。
 * Instagram広告等のコールド流入で「次に押す場所」を常時提示する。
 */
export default function StickyCTA({
  primaryHref = "#contact",
  primaryLabel = "無料で相談する",
  secondaryHref,
  secondaryLabel,
  caption = "1分で送信・いつでも解約OK",
  showAfter = 400,
  primaryGated = false,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      {/* gradient mask for readability */}
      <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-b from-transparent to-white/80" />

      <div className="relative bg-white/95 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          {secondaryHref && secondaryLabel ? (
            <a
              href={secondaryHref}
              className="flex h-12 min-w-[44px] items-center justify-center gap-1.5 rounded-full border-2 border-[#06C755] bg-white px-4 text-sm font-bold text-[#06C755] transition-colors hover:bg-[#F0FDF4]"
              aria-label={secondaryLabel}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.282.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.286-.63-.63V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              <span className="hidden xs:inline">{secondaryLabel}</span>
            </a>
          ) : null}
          {primaryGated ? (
            <SignupFlowButton
              label={primaryLabel}
              href={primaryHref}
              accentColor="#F97316"
              className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#F97316] text-sm font-bold text-white shadow-[0_4px_14px_rgba(249,115,22,0.35)] transition-all hover:bg-[#EA580C]"
            />
          ) : (
            <a
              href={primaryHref}
              className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#F97316] text-sm font-bold text-white shadow-[0_4px_14px_rgba(249,115,22,0.35)] transition-all hover:bg-[#EA580C]"
            >
              {primaryLabel}
            </a>
          )}
        </div>
        {caption ? (
          <p className="mx-auto mt-1.5 max-w-3xl text-center text-[10px] text-[#8A7F74]">
            {caption}
          </p>
        ) : null}
      </div>
    </div>
  );
}
