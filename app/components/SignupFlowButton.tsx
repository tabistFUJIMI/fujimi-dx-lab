"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useServiceLaunch } from "../hooks/useServiceLaunch";
import { SERVICE_LAUNCH_DATE_LABEL } from "@/lib/service-launch";

type SignupFlowButtonProps = {
  /** ボタンのテキスト（例: "まずはFUJIMIN PASSに登録"） */
  label?: string;
  /** モーダル内でハイライト表示するアプリ名（例: "ReserveNavi"） */
  appName?: string;
  /** モーダル内で表示するプラン名（例: "スタンダード"） */
  planName?: string;
  /** 確認後の遷移先（デフォルト: FUJIMIN PASS登録ページ） */
  href?: string;
  /** ボタンのclassName */
  className?: string;
  /** ボタンのstyle */
  style?: React.CSSProperties;
  /** アクセントカラー（モーダルのCTAボタン用） */
  accentColor?: string;
};

export default function SignupFlowButton({
  label = "申し込む",
  appName,
  planName,
  href = "https://www.fujimin-pass.com/register",
  className,
  style,
  accentColor = "#4f46e5",
}: SignupFlowButtonProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isOpen: signupOpen } = useServiceLaunch();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleProceed = () => {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        style={style}
      >
        {label}
      </button>

      {mounted && open && createPortal(
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                <h3 className="text-lg font-bold text-gray-900">
                  {signupOpen ? "お申し込みの流れ" : `お申し込み受付は${SERVICE_LAUNCH_DATE_LABEL}から`}
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none px-2"
                  aria-label="閉じる"
                >
                  &times;
                </button>
              </div>

              {/* Body */}
              {signupOpen ? (
                <div className="px-6 py-5 space-y-5">
                  {/* 選択したプラン */}
                  {(appName || planName) && (
                    <div className="rounded-xl border-2 p-4" style={{ borderColor: accentColor + "33", backgroundColor: accentColor + "08" }}>
                      <p className="text-xs font-semibold text-gray-500 mb-1">選択されたプラン</p>
                      <p className="font-bold text-gray-900">
                        {appName && <span>{appName}</span>}
                        {appName && planName && <span className="text-gray-400 mx-2">・</span>}
                        {planName && <span style={{ color: accentColor }}>{planName}</span>}
                      </p>
                    </div>
                  )}

                  {/* 3ステップ */}
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-3">3ステップで完了します</p>
                    <ol className="space-y-3">
                      <li className="flex gap-3">
                        <span
                          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: accentColor }}
                        >
                          1
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">FUJIMIN PASSにご登録</p>
                          <p className="text-xs text-gray-500 mt-0.5">メール認証のみ・クレジットカード不要（1分で完了）</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span
                          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: accentColor }}
                        >
                          2
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">管理画面からアプリ＆プランをお申し込み</p>
                          <p className="text-xs text-gray-500 mt-0.5">ひとつのアカウントで必要なアプリだけ選べます</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <span
                          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: accentColor }}
                        >
                          3
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">お支払い・ご利用開始</p>
                          <p className="text-xs text-gray-500 mt-0.5">クレジットカードなら即時、銀行振込は1〜3営業日後</p>
                        </div>
                      </li>
                    </ol>
                  </div>

                  {/* ボーナス訴求 */}
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
                    <p className="font-semibold mb-0.5">🎁 初回登録特典</p>
                    <p>FUJIMIN PASSに登録すると、<strong>500ポイントプレゼント</strong>（90日有効）。AI機能でご利用いただけます。</p>
                  </div>
                </div>
              ) : (
                <div className="px-6 py-5 space-y-5">
                  {/* 準備中バッジ */}
                  <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4">
                    <p className="text-xs font-semibold text-amber-700 mb-1">現在、サービス開始準備中です</p>
                    <p className="text-base font-bold text-amber-900">
                      {SERVICE_LAUNCH_DATE_LABEL}（金）より受付開始
                    </p>
                    <p className="text-xs text-amber-800 mt-1">
                      より良いサービスをお届けするため、全機能のブラッシュアップを行っています。
                    </p>
                  </div>

                  {/* 選択したプラン */}
                  {(appName || planName) && (
                    <div className="rounded-xl border-2 p-4" style={{ borderColor: accentColor + "33", backgroundColor: accentColor + "08" }}>
                      <p className="text-xs font-semibold text-gray-500 mb-1">ご興味のあるプラン</p>
                      <p className="font-bold text-gray-900">
                        {appName && <span>{appName}</span>}
                        {appName && planName && <span className="text-gray-400 mx-2">・</span>}
                        {planName && <span style={{ color: accentColor }}>{planName}</span>}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        開始時のご案内をご希望の場合は、下記よりお気軽にお問い合わせください。
                      </p>
                    </div>
                  )}

                  {/* 開始前の導線案内 */}
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-3">開始までにできること</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex gap-2">
                        <span className="shrink-0 text-green-500 font-bold">✓</span>
                        <span>LINE公式アカウントで最新情報を受け取る</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="shrink-0 text-green-500 font-bold">✓</span>
                        <span>お問い合わせフォームから開始案内を希望</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="shrink-0 text-green-500 font-bold">✓</span>
                        <span>各プラン・料金ページで詳細をチェック</span>
                      </li>
                    </ul>
                  </div>

                  {/* ボーナス訴求（予告） */}
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
                    <p className="font-semibold mb-0.5">🎁 開始日からの初回登録特典</p>
                    <p>開始日以降にご登録いただくと、<strong>500ポイントプレゼント</strong>（90日有効）。AI機能でご利用いただけます。</p>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-2xl flex gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  閉じる
                </button>
                {signupOpen ? (
                  <button
                    onClick={handleProceed}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ backgroundColor: accentColor }}
                  >
                    登録に進む →
                  </button>
                ) : (
                  <a
                    href="https://lin.ee/UPArZn9"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex-1 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
                    style={{ backgroundColor: "#06C755" }}
                  >
                    LINEで相談する
                  </a>
                )}
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
