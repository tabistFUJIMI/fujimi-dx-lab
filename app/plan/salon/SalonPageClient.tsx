"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";
import EarlyBirdBanner from "../../components/EarlyBirdBanner";
import SalonMockCalendar from "../components/salon/SalonMockCalendar";
import SalonMockLineBooking from "../components/salon/SalonMockLineBooking";
import SalonMockCustomerCard from "../components/salon/SalonMockCustomerCard";
import SalonMockAiAnalysis from "../components/salon/SalonMockAiAnalysis";

/* ── Data ── */

const PAIN_POINTS = [
  {
    emoji: "💅",
    title: "施術中にInstagramのDMが溜まって予約を見落とす",
    text: "「ジェルネイルの施術中にDMが10件以上。終わって確認したら予約の問い合わせを見逃していた。」",
  },
  {
    emoji: "💬",
    title: "「ジェルネイルって何分かかりますか？」に毎回手動返信",
    text: "「同じ質問にDMやLINEで何度も手動返信。施術後の疲れた時間帯に返信するのがつらい。」",
  },
  {
    emoji: "📋",
    title: "施術者のシフトと予約枠の管理がExcelで限界",
    text: "「誰がいつ出勤で、どの枠が空いているか。Excelで管理していたけどもう限界。」",
  },
];

const SOLUTIONS = [
  {
    emoji: "📱",
    label: "予約管理",
    name: "ReserveNavi",
    text: "LINE24時間受付。ジェルネイル90分、フェイシャル60分…メニューごとの時間管理も自動。",
    free: false,
  },
  {
    emoji: "🤖",
    label: "AI自動応答",
    name: "AskNavi",
    text: "営業時間外もAIが即回答。メニュー・料金・駐車場…同じ質問への対応から解放。",
    free: false,
  },
  {
    emoji: "📊",
    label: "シフト管理",
    name: "ShiftNavi",
    text: "施術者のシフトをスマホで管理。予約枠と連動するから空き時間が一目瞭然。",
    free: true,
  },
];

const STEPS = [
  {
    step: "1",
    emoji: "\u{1F4F2}",
    title: "LINE公式アカウントを連携",
    desc: "3分で完了",
  },
  {
    step: "2",
    emoji: "\u{1F3F7}\uFE0F",
    title: "初期設定ウィザードでメニュー登録",
    desc: "10分で完了",
  },
  {
    step: "3",
    emoji: "\u2705",
    title: "明日から自動受付スタート！",
    desc: "すぐに使い始められます",
  },
];

const FAQS = [
  {
    q: "一番安いプランはいくらですか？",
    a: "ReserveNaviはライトプラン月¥980から、AskNavi・RuleNavi・ShiftNaviは月¥550から始められます。必要なアプリだけを選んでご契約いただけます。",
  },
  {
    q: "初期費用はかかりますか？",
    a: "いいえ。初期費用は一切かかりません。月額費用のみのシンプルな料金体系です。",
  },
  {
    q: "契約期間の縛りはありますか？",
    a: "ありません。いつでも解約OKです。もちろん解約手数料もかかりません。",
  },
  {
    q: "ホットペッパービューティーと併用できますか？",
    a: "はい。ホットペッパービューティー経由の予約はそのまま、LINE直接予約をReserveNaviで管理する併用が可能です。",
  },
  {
    q: "メニューごとに施術時間を変えられますか？",
    a: "はい。ジェルネイル90分、フェイシャル60分など個別に設定できます。",
  },
  {
    q: "ITに詳しくないのですが？",
    a: "ご安心ください。3分で設定完了。スマホだけで使えます。初期設定のサポートもいたします。",
  },
  {
    q: "お客様にアプリのダウンロードは必要？",
    a: "不要です。LINEだけで完結します。お客様に新しいアプリを入れてもらう必要はありません。",
  },
  {
    q: "支払い方法は？",
    a: "クレジットカード決済です。月額¥3,000以上のプランは銀行振込にも対応しています。",
  },
];

const PRICING_PLANS = [
  {
    name: "ライトパッケージ",
    price: "2,080",
    bonus: "100",
    bonusValue: "330",
    recommended: false,
    services: [
      "ReserveNavi ライト（¥980/月）",
      "AskNavi ライト（¥550/月）",
      "ShiftNavi スタンダード（¥550/月）",
    ],
  },
  {
    name: "スタンダードパッケージ",
    price: "3,580",
    bonus: "200",
    bonusValue: "660",
    recommended: true,
    services: [
      "ReserveNavi スタンダード（¥2,480/月）",
      "AskNavi スタンダード（¥1,100/月）",
      "ShiftNavi（バンドル無料同梱）",
    ],
  },
  {
    name: "プロパッケージ",
    price: "6,180",
    bonus: "500",
    bonusValue: "1,650",
    recommended: false,
    services: [
      "ReserveNavi プロ（¥3,980/月）",
      "AskNavi プロ（¥2,200/月）",
      "ShiftNavi（バンドル無料同梱）",
    ],
  },
];

const SINGLE_PRICES = [
  {
    name: "ReserveNavi",
    plans: [
      { name: "ライト", price: "¥980/月" },
      { name: "スタンダード", price: "¥2,480/月" },
      { name: "プロ", price: "¥3,980/月" },
    ],
  },
  {
    name: "AskNavi",
    plans: [
      { name: "ライト", price: "¥550/月" },
      { name: "スタンダード", price: "¥1,100/月" },
      { name: "プロ", price: "¥2,200/月" },
      { name: "エンタープライズ", price: "¥5,500/月" },
    ],
  },
  {
    name: "ShiftNavi",
    plans: [{ name: "スタンダード", price: "¥550/月" }, { name: "バンドル", price: "¥0 (RN Std/Pro契約時に自動付帯)" }],
  },
];

/* ── Mock Tabs ── */

const MOCK_TABS = [
  { id: "calendar", label: "予約カレンダー", icon: "\u{1F4C5}" },
  { id: "line", label: "LINE予約体験", icon: "\u{1F4F1}" },
  { id: "customer", label: "顧客カルテ", icon: "\u{1F465}" },
  { id: "ai", label: "AI分析", icon: "\u{1F916}" },
] as const;

const MOCK_DESCRIPTIONS: Record<string, string> = {
  calendar:
    "週間タイムグリッドで予約状況を一目で把握。施術者ごとの空き枠がリアルタイムで更新され、ダブルブッキングを完全に防止します。",
  line:
    "お客様はLINEからメニュー選択・担当者指名・日時選択・予約確定まで4ステップで完了。アプリのダウンロードは一切不要です。",
  customer:
    "来店ごとの施術カルテを自動記録。アレルギー・禁忌事項・次回への申し送りまで、お客様の情報をチーム全員で共有できます。",
  ai:
    "来店パターンをAIが自動分析し、最適な次回予約の候補日時を提案。リピート率の向上と離脱防止に貢献します。",
};

function ReserveNaviMockSection() {
  const [activeTab, setActiveTab] = useState<string>("calendar");

  return (
    <section className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-bold tracking-wider uppercase text-rose-600">
              ReserveNavi
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
              LINE予約管理システム ReserveNaviの機能
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-gray-500">
              電話・紙ノート・Excelから卒業。LINEで予約受付から顧客管理、リピート促進まで。
            </p>
          </div>
        </FadeIn>

        {/* Tab bar */}
        <FadeIn delay={0.1}>
          <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-2">
            {MOCK_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-rose-600 text-white shadow-lg"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-rose-50"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Mock display */}
        <FadeIn delay={0.15}>
          <div className="mt-8">
            {activeTab === "calendar" && <SalonMockCalendar />}
            {activeTab === "line" && <SalonMockLineBooking />}
            {activeTab === "customer" && <SalonMockCustomerCard />}
            {activeTab === "ai" && <SalonMockAiAnalysis />}
          </div>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-gray-500">
            {MOCK_DESCRIPTIONS[activeTab]}
          </p>

          {/* Demo CTA */}
          <div className="mt-8 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-rose-500 px-6 py-3 text-sm font-bold text-rose-600 transition-all hover:bg-rose-50"
            >
              <span>{"\u{1F4A1}"}</span>
              実際に触ってみたい方は → デモアカウントで体験する
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Component ── */

export default function SalonPageClient() {
  const [showSinglePrices, setShowSinglePrices] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileCta(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* 30%深度の sentinel */}
        <div
          ref={sentinelRef}
          className="pointer-events-none absolute left-0 h-0 w-0"
          style={{ top: "30vh" }}
        />

        {/* ── Hero（ライト・エレガント） ── */}
        <section
          className="relative min-h-[90vh] overflow-hidden px-4 pt-32 pb-20 md:pt-40 md:pb-28"
          style={{
            background:
              "linear-gradient(135deg, #fff1f2 0%, #ffffff 40%, #fdf2f8 70%, #f5f3ff 100%)",
          }}
        >
          {/* メッシュグラデーション装飾 */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(225,29,72,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(139,92,246,0.06) 0%, transparent 50%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <FadeIn>
                  <p className="mb-4 inline-block rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm text-rose-600 font-medium">
                    ネイル・エステサロンのオーナー様へ
                  </p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1
                    className="text-3xl font-extrabold tracking-tight text-gray-800 md:text-4xl lg:text-5xl"
                    style={{ lineHeight: 1.15 }}
                  >
                    施術中にDMが溜まっていく。
                    <br />
                    <span className="text-rose-600">
                      もう抱え込まなくていい。
                    </span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500">
                    ジェルネイル・まつエク・フェイシャル。施術中の予約対応・問い合わせ返信を全て自動化。
                  </p>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-rose-700"
                    >
                      無料で始める
                    </a>
                    <a
                      href="#pricing"
                      className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-white px-8 py-4 text-base font-bold text-rose-600 transition-all duration-300 hover:bg-rose-50"
                    >
                      料金プランを見る
                    </a>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    初期費用¥0・3分で開始・いつでも解約OK
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <div className="mt-8 flex flex-wrap gap-4">
                    {[
                      { label: "初期費用", value: "¥0" },
                      { label: "契約縛り", value: "なし" },
                      { label: "導入", value: "3分" },
                    ].map((badge) => (
                      <div
                        key={badge.label}
                        className="rounded-xl border border-rose-200 bg-white/80 px-5 py-3 text-center backdrop-blur-sm"
                      >
                        <p className="text-xs text-gray-400">{badge.label}</p>
                        <p className="text-lg font-bold text-gray-800">
                          {badge.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </FadeIn>
                <FadeIn delay={0.35}>
                  <p className="mt-6 inline-block rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm font-semibold text-rose-600">
                    2026年5月1日サービス開始｜お気軽にご相談ください
                  </p>
                </FadeIn>
              </div>
              <FadeIn delay={0.2} className="mt-8 lg:mt-0">
                <div className="relative">
                  <Image
                    src="/images/plan/salon-hero.jpg"
                    alt="サロンでの施術イメージ"
                    width={600}
                    height={400}
                    className="mx-auto w-full max-w-md rounded-2xl shadow-2xl lg:max-w-none"
                    priority
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Pain Points ── */}
        <section className="bg-rose-50/50 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                  ネイル・エステサロンでよくあるお悩み
                </h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  少人数で運営していると、全部自分たちでやるしかない。
                </p>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {PAIN_POINTS.map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-2xl">{p.emoji}</span>
                      <h3 className="font-bold text-rose-600">{p.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {p.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Solution ── */}
        <section className="bg-white px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                  3つのNaviが、あなたの代わりに対応します。
                </h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  予約もシフトも問い合わせも。ぜんぶ、おまかせ。
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm text-rose-600 font-medium">
                  必要なものだけ1つから使えます。まとめて使うとポイント増量でお得に。
                </p>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {SOLUTIONS.map((item, i) => (
                <FadeIn key={item.name} delay={i * 0.08}>
                  <div className="relative h-full rounded-2xl border border-rose-100 bg-gradient-to-br from-white to-rose-50/30 p-6 shadow-sm">
                    {item.free && (
                      <span className="absolute -top-2.5 right-4 rounded-full bg-green-500 px-2 py-0.5 text-xs font-bold text-white">
                        FREE
                      </span>
                    )}
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <h3 className="font-bold text-rose-600">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature Detail: ReserveNavi Mock Screens ── */}
        <ReserveNaviMockSection />

        {/* ── Feature Detail: AskNavi & ShiftNavi ── */}
        <section className="bg-rose-50/30 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2">
              {/* AskNavi */}
              <FadeIn>
                <div className="h-full rounded-2xl border border-rose-200 bg-white p-8 shadow-sm">
                  <p className="text-xs font-bold tracking-wider uppercase text-rose-600">AskNavi</p>
                  <h3 className="mt-2 text-xl font-bold text-gray-800">AI自動応答でできること</h3>
                  <ul className="mt-6 space-y-3">
                    {[
                      "LINEでの質問にAIが24時間自動回答",
                      "メニュー・料金・営業時間・アクセスetc.",
                      "業種別テンプレートで初期設定かんたん",
                      "HPの情報を自動取り込み→ナレッジ化",
                      "未回答の質問→ワンタッチでナレッジ自動生成",
                      "応答トーンを設定可能（丁寧/カジュアル等）",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="mt-0.5 shrink-0 text-rose-400">{"\u2713"}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs text-gray-400">月額¥550〜 ｜ ポイント消費型</p>
                </div>
              </FadeIn>

              {/* ShiftNavi */}
              <FadeIn delay={0.1}>
                <div className="relative h-full rounded-2xl border border-orange-100 bg-white p-8 shadow-sm">
                  <span className="absolute -top-2.5 right-4 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                    フリー¥0〜
                  </span>
                  <p className="text-xs font-bold tracking-wider uppercase" style={{ color: "#ea580c" }}>ShiftNavi</p>
                  <h3 className="mt-2 text-xl font-bold text-gray-800">シフト管理でできること</h3>
                  <ul className="mt-6 space-y-3">
                    {[
                      "スタッフがスマホで休み希望を申請",
                      "AIがワンタッチでシフト自動作成",
                      "月次カレンダー表示・印刷（PDF対応）",
                      "ドラッグ＆ドロップでかんたん編集",
                      "リーダー設定・バージョン管理（月3回まで）",
                      "祝日自動反映",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="mt-0.5 shrink-0 text-orange-400">{"\u2713"}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs text-gray-400">月額¥550 ｜ AI機能はポイント消費</p>
                </div>
              </FadeIn>
            </div>

            {/* 他のアプリ紹介 */}
            <FadeIn delay={0.2}>
              <div className="mt-8 rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50/50 to-violet-50/50 p-8 text-center">
                <p className="text-lg font-bold text-gray-800">他にもアプリが続々登場</p>
                <p className="mt-2 text-sm text-gray-500">
                  業務ルール管理、AI資料作成、名刺管理、SNS管理など。<br />
                  FUJIMIN PASSなら必要なアプリを1つずつ追加できます。
                </p>
                <a
                  href="/fujimin-pass"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-rose-600 hover:text-rose-700"
                >
                  すべてのアプリを見る →
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Steps ── */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                  はじめかた、かんたん3ステップ
                </h2>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {STEPS.map((s, i) => (
                <FadeIn key={s.step} delay={i * 0.08}>
                  <div className="rounded-2xl border border-rose-100 bg-white p-6 text-center shadow-sm">
                    <div className="mb-2 text-4xl">{s.emoji}</div>
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-rose-600 text-sm font-bold text-white">
                      {s.step}
                    </div>
                    <h3 className="mt-3 text-base font-bold text-gray-800">{s.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Numbers / Impact ── */}
        <section className="bg-rose-50/30 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                  もし1日5件の電話対応がなくなったら
                </h2>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {[
                {
                  emoji: "\u{1F4DE}",
                  label: "電話対応",
                  calc: "1回5分 \u00D7 5回",
                  result: "25分/日",
                },
                {
                  emoji: "\u{1F4CB}",
                  label: "予約転記",
                  calc: "1件3分 \u00D7 5件",
                  result: "15分/日",
                },
                {
                  emoji: "\u{1F504}",
                  label: "シフト調整",
                  calc: "週30分",
                  result: "約4分/日",
                },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.08}>
                  <div className="rounded-2xl border border-rose-100 bg-white p-6 text-center shadow-sm">
                    <span className="text-3xl">{item.emoji}</span>
                    <p className="mt-2 text-sm font-medium text-gray-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{item.calc}</p>
                    <p className="mt-2 text-2xl font-extrabold text-rose-600">
                      {item.result}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <div className="mt-10 text-center">
                <p className="text-2xl font-extrabold text-rose-600 md:text-3xl">
                  1日44分、月間約22時間を施術に使える
                </p>
                <p className="mt-3 text-xs text-gray-400">
                  ※ 少人数運営の整体院を想定した試算です
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-rose-200 bg-white p-6">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 text-2xl">{"\u{1F3E8}"}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      開発元の実績
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      開発元のTabist
                      ゆ縁の宿ふじみでは、ShiftNaviとAskNaviの導入で業務時間を
                      <strong className="text-gray-800">約40%削減</strong>。
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Comparison ── */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                  「ちょうどいい」がなかったから、
                  <br className="hidden sm:block" />
                  自分たちで作りました
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-14 overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="px-5 py-4 text-left font-semibold text-gray-700">
                        機能
                      </th>
                      <th className="px-5 py-4 text-center font-semibold text-gray-500">
                        一般的な組合せ
                      </th>
                      <th className="px-5 py-4 text-center font-semibold text-rose-600">
                        FUJIMIN PASS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      {
                        feature: "予約管理",
                        general: "¥9,790/月",
                        ours: "ReserveNavi ¥980\u301C¥3,980",
                      },
                      {
                        feature: "LINE対応",
                        general: "+¥4,400/月",
                        ours: "標準搭載",
                      },
                      {
                        feature: "AI問い合わせ対応",
                        general: "+¥1,500/月\u301C",
                        ours: "AskNavi +¥550/月\u301C",
                      },
                      {
                        feature: "シフト管理",
                        general: "+¥1,650/月\u301C",
                        ours: "ShiftNavi ¥0〜¥550",
                      },
                    ].map((row) => (
                      <tr key={row.feature} className="hover:bg-rose-50/30">
                        <td className="px-5 py-3 font-medium text-gray-700">
                          {row.feature}
                        </td>
                        <td className="px-5 py-3 text-center text-gray-500">
                          {row.general}
                        </td>
                        <td className="px-5 py-3 text-center font-medium text-gray-900">
                          {row.ours}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-rose-200 bg-rose-50/50">
                      <td className="px-5 py-4 font-bold text-gray-900">
                        合計
                      </td>
                      <td className="px-5 py-4 text-center font-bold text-gray-500">
                        ¥17,340/月\u301C
                      </td>
                      <td className="px-5 py-4 text-center text-lg font-extrabold text-rose-600">
                        ¥550/月\u301C
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-center text-xs text-gray-400">
                ※ 2026年3月時点の各社公開情報に基づく比較です
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section
          id="pricing"
          className="bg-gradient-to-b from-rose-50/50 to-violet-50/30 px-4 py-24 md:py-32"
        >
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                  ネイル・エステサロン向け 料金プラン
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  サロンプランなら、毎月のFUJIMINポイントが増量でもらえます。
                </p>
                <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-5 py-2">
                  <span className="text-rose-500 font-bold text-sm">&#x2139;&#xFE0F;</span>
                  <p className="text-sm text-rose-700">
                    <strong>1つのサービスだけでも申し込みOK。</strong>
                    プランはあくまでおすすめの組み合わせです。
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mx-auto mt-6 max-w-3xl">
                <EarlyBirdBanner variant="compact" accentColor="#e11d48" productLabel="ReserveNavi" />
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {PRICING_PLANS.map((plan, i) => (
                <FadeIn key={plan.name} delay={i * 0.08}>
                  <div
                    className={`relative h-full rounded-2xl border-2 bg-white p-8 ${
                      plan.recommended
                        ? "border-rose-500 shadow-lg"
                        : "border-gray-200"
                    }`}
                  >
                    {plan.recommended && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rose-600 px-4 py-1 text-xs font-bold text-white">
                        おすすめ
                      </span>
                    )}
                    <div className="text-center">
                      <p
                        className={`text-sm font-semibold ${
                          plan.recommended ? "text-rose-600" : "text-gray-500"
                        }`}
                      >
                        {plan.name}
                      </p>
                      <p className="mt-2 text-4xl font-extrabold text-gray-900">
                        ¥{plan.price}
                        <span className="text-base font-normal text-gray-500">
                          /月
                        </span>
                      </p>
                      <p className="mt-2 inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600">
                        毎月{plan.bonus}ptボーナス（約¥{plan.bonusValue}
                        相当）
                      </p>
                    </div>
                    <ul className="mt-6 space-y-2">
                      {plan.services.map((s) => (
                        <li
                          key={s}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="mt-0.5 text-green-500">
                            {"\u2713"}
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <a
                        href="#contact"
                        className={`block w-full rounded-lg py-3 text-center text-sm font-semibold transition-colors ${
                          plan.recommended
                            ? "bg-rose-600 text-white hover:bg-rose-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {plan.name}について相談する
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <p className="mt-6 text-center text-sm text-gray-500">
                {"\u{1F4A1}"}{" "}
                ボーナスptでAI一括シフト生成やAI応答が追加で使えます
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                {["縛りなし", "いつでも解約", "税込", "営業電話なし", "¥3,000以上は銀行振込も対応"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <span className="text-green-500">{"\u2713"}</span> {item}
                    </span>
                  )
                )}
              </div>
            </FadeIn>

            {/* 折りたたみ: 単品料金 */}
            <FadeIn delay={0.4}>
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowSinglePrices(!showSinglePrices)}
                  className="text-sm font-medium text-gray-500 underline hover:text-gray-700"
                >
                  {showSinglePrices
                    ? "\u25B2 閉じる"
                    : "\u25BC 各サービス単独の料金はこちら"}
                </button>
                {showSinglePrices && (
                  <div className="mx-auto mt-6 max-w-md space-y-4">
                    {SINGLE_PRICES.map((service) => (
                      <div key={service.name} className="rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-rose-50 px-4 py-2 border-b border-rose-200">
                          <span className="font-bold text-sm text-gray-800">{service.name}</span>
                          {service.name === "ShiftNavi" && (
                            <span className="ml-2 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">FREE</span>
                          )}
                        </div>
                        <div className="divide-y divide-gray-100">
                          {service.plans.map((plan) => (
                            <div key={plan.name} className="flex items-center justify-between px-4 py-3">
                              <span className="text-sm text-gray-600">{plan.name}</span>
                              <span className="text-sm font-semibold text-gray-800">{plan.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">
                  よくある質問
                </h2>
              </div>
            </FadeIn>
            <div className="mt-14 space-y-6">
              {FAQS.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="rounded-xl border border-rose-100 bg-white p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900">Q. {faq.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                      A. {faq.a}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          id="contact"
          className="relative overflow-hidden px-4 py-24 text-white md:py-32"
          style={{
            background:
              "linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #be123c 100%)",
          }}
        >
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                施術に集中できる毎日、
                <br />
                はじめませんか？
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-rose-100/80">
                「うちでも使える？」「設定を手伝ってほしい」
                <br />
                なんでもお気軽にどうぞ。
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "ホーム",
                  item: "https://www.fujimi-dx-lab.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "業種別プラン",
                  item: "https://www.fujimi-dx-lab.com/pricing#packages",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "ネイル・エステサロンプラン",
                  item: "https://www.fujimi-dx-lab.com/plan/salon",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "FUJIMIN PASS ネイル・エステサロンプラン",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "550",
                highPrice: "7700",
                priceCurrency: "JPY",
                offerCount: "3",
              },
              description:
                "ネイル・エステサロン向けLINE予約管理・AI自動応答・シフト管理の統合プラットフォーム",
              url: "https://www.fujimi-dx-lab.com/plan/salon",
            }),
          }}
        />
      </main>
      <Footer />

      {/* ── モバイル固定CTAバー ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-rose-200 bg-white/95 p-3 backdrop-blur-sm transition-transform duration-300 md:hidden ${
          showMobileCta ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-gray-500">
            月額
            <span className="text-base font-bold text-gray-900">
              ¥0
            </span>
            から
          </p>
          <a
            href="#contact"
            className="flex-1 rounded-xl bg-rose-600 py-3 text-center text-sm font-bold text-white shadow-lg"
          >
            無料で始める
          </a>
        </div>
      </div>
    </>
  );
}
