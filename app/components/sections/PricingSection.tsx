import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import FadeIn from "../FadeIn";
import SignupFlowButton from "../SignupFlowButton";

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-white px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              月¥550からスタート。
            </h2>
            <p className="mt-4 text-slate-500">
              必要なアプリだけを選んで、いつでも追加・解約できます。予約管理は月¥980〜、AI応答・シフト管理は月¥550〜。
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* ¥550 plans (Ask/Rule/Shift) */}
          <FadeIn delay={0.05}>
            <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 transition-colors hover:border-slate-300">
              <div className="mb-8">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600">
                  Light
                </span>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">
                  シングル・アプリ
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  まずはひとつのアプリだけ試したい方に。
                </p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-black text-slate-900">¥550</span>
                <span className="ml-2 text-slate-500">〜 / 月</span>
              </div>
              <ul className="mb-10 flex-grow space-y-4 text-sm text-slate-600">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-slate-300" />
                  AskNavi（AI自動応答）
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-slate-300" />
                  RuleNavi（社内規則AI検索）
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-slate-300" />
                  ShiftNavi（AIシフト管理）
                </li>
              </ul>
              <SignupFlowButton
                label="¥550で始める"
                planName="ライトプラン"
                accentColor="#475569"
                className="block w-full rounded-xl bg-slate-100 py-3 text-center font-bold text-slate-800 transition-colors hover:bg-slate-200"
              />
            </div>
          </FadeIn>

          {/* Standard Plan */}
          <FadeIn delay={0.1}>
            <div className="relative flex h-full flex-col rounded-3xl border-2 border-indigo-500 bg-white p-8 shadow-2xl shadow-indigo-500/10 md:-translate-y-4">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 px-4 py-1 text-xs font-bold tracking-wider text-white">
                おすすめ
              </div>
              <div className="mb-8 mt-2">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Reserve
                </span>
                <h3 className="mt-4 text-2xl font-bold text-slate-900">
                  予約管理プラン
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  LINE予約で来店を増やしたいお店へ。
                </p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-black text-slate-900">
                  ¥980
                </span>
                <span className="ml-2 text-slate-500">〜 / 月</span>
              </div>
              <ul className="mb-10 flex-grow space-y-4 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-500" />
                  <span className="font-bold">ReserveNavi ライト（月¥980）</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-500" />
                  LINE予約・リマインド・自動管理
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-indigo-500" />
                  スタンダード・プロへアップグレード可能
                </li>
              </ul>
              <SignupFlowButton
                label="予約管理を始める"
                planName="予約管理プラン"
                accentColor="#4f46e5"
                className="block w-full rounded-xl bg-indigo-600 py-3 text-center font-bold text-white shadow-md transition-colors hover:bg-indigo-700"
              />
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-10 text-center">
            <Link
              href="/fujimin-pass"
              className="text-sm font-semibold text-indigo-600 hover:underline"
            >
              すべてのプランと料金を見る →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
