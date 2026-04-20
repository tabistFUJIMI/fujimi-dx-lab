"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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
                <h3 className="text-lg font-bold text-gray-900">お申し込みの流れ</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none px-2"
                  aria-label="閉じる"
                >
                  &times;
                </button>
              </div>

              {/* Body */}
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

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 rounded-b-2xl flex gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  閉じる
                </button>
                <button
                  onClick={handleProceed}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ backgroundColor: accentColor }}
                >
                  登録に進む →
                </button>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
