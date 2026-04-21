"use client";
import Image from "next/image";

import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";
import MockCalendar from "../components/MockCalendar";
import MockLineBooking from "../components/MockLineBooking";
import MockCustomerCard from "../components/MockCustomerCard";
import MockAiAnalysis from "../components/MockAiAnalysis";

/* ── Data ── */

const PAIN_POINTS = [
  {
    emoji: "🏋️",
    title: "セッション中に電話が鳴って集中できない",
    text: "「トレーニング指導中に電話が鳴る。中断するとお客様の集中も切れるし、出なければ体験予約を逃してしまう。」",
  },
  {
    emoji: "💬",
    title: "「体験セッションの予約方法は？」「料金プランを教えて」に毎回返信",
    text: "「同じ質問にLINEやDMで何度も手動返信。セッション後の疲れた時間帯に返信するのがつらい。」",
  },
  {
    emoji: "📋",
    title: "トレーナーのシフトとセッション枠の管理が手作業",
    text: "「誰がいつ出勤で、どの枠が空いているか。Excelやメモで管理していたけどもう限界。」",
  },
];

const SOLUTIONS = [
  {
    emoji: "📱",
    label: "予約管理",
    name: "ReserveNavi",
    text: "LINE24時間受付。トレーナー指名・体験セッション予約にも対応。",
    free: false,
  },
  {
    emoji: "🤖",
    label: "AI自動応答",
    name: "AskNavi",
    text: "営業時間外もAIが即回答。料金プラン・設備・入会方法…同じ質問への対応から解放。",
    free: false,
  },
  {
    emoji: "📊",
    label: "シフト管理",
    name: "ShiftNavi",
    text: "トレーナーのシフトをスマホで管理。セッション枠と連動。",
    free: true,
  },
];

const STEPS = [
  {
    step: "1",
    emoji: "📲",
    title: "LINE公式アカウントを連携",
    desc: "3分で完了",
  },
  {
    step: "2",
    emoji: "🏷️",
    title: "初期設定ウィザードでメニュー登録",
    desc: "10分で完了",
  },
  {
    step: "3",
    emoji: "✅",
    title: "明日から自動受付スタート！",
    desc: "すぐに使い始められます",
  },
];

const FAQS = [
  {
    q: "本当に無料で使えますか？",
    a: "ShiftNaviはフリープラン（¥0・スタッフ5名まで）があります。ReserveNaviにも無料プラン（月50件）があります。まずは無料でお試しいただけます。",
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
    q: "他の予約システムと併用できますか？",
    a: "はい。既存の予約システム経由の予約はそのまま、LINE直接予約をReserveNaviで管理する併用が可能です。",
  },
  {
    q: "トレーナーの指名予約に対応していますか？",
    a: "はい。トレーナーごとの予約枠を設定でき、会員がLINEから指名して予約できます。",
  },
  {
    q: "お客様にアプリのダウンロードは必要？",
    a: "不要です。LINEだけで完結します。お客様に新しいアプリを入れてもらう必要はありません。",
  },
  {
    q: "ShiftNaviにフリープランがあるのはなぜ？",
    a: "シフト管理は全店舗の基本機能だと考えています。まず使っていただき、価値を実感していただくためにフリープラン（スタッフ5名まで）を提供しています。AI機能はスタンダード（¥550/月）からご利用いただけます。",
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
    price: "4,630",
    bonus: "200",
    bonusValue: "660",
    recommended: true,
    services: [
      "ReserveNavi スタンダード（¥2,480/月）",
      "AskNavi スタンダード（¥1,100/月）",
      "ShiftNavi スタンダード（¥550/月）",
    ],
  },
  {
    name: "プロパッケージ",
    price: "7,730",
    bonus: "500",
    bonusValue: "1,650",
    recommended: false,
    services: [
      "ReserveNavi プロ（¥3,980/月）",
      "AskNavi プロ（¥2,200/月）",
      "ShiftNavi スタンダード（¥550/月）",
    ],
  },
];

const SINGLE_PRICES = [
  {
    name: "ReserveNavi",
    plans: [
      { name: "無料", price: "¥0" },
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
    plans: [{ name: "フリー", price: "¥0" }, { name: "スタンダード", price: "¥550/月" }],
  },
];

/* ── Mock Tabs ── */

const MOCK_TABS = [
  { id: "calendar", label: "予約カレンダー", icon: "📅" },
  { id: "line", label: "LINE予約体験", icon: "📱" },
  { id: "customer", label: "顧客カルテ", icon: "👥" },
  { id: "ai", label: "AI分析", icon: "🤖" },
] as const;

const MOCK_DESCRIPTIONS: Record<string, string> = {
  calendar:
    "週間タイムグリッドで予約状況を一目で把握。トレーナーごとの空き枠がリアルタイムで更新され、ダブルブッキングを完全に防止します。",
  line:
    "会員はLINEからメニュー選択・トレーナー指名・日時選択・予約確定まで4ステップで完了。アプリのダウンロードは一切不要です。",
  customer:
    "セッションごとのトレーニング記録を自動保存。体組成データ・目標・次回への申し送りまで、会員の情報をチーム全員で共有できます。",
  ai:
    "来店パターンをAIが自動分析し、最適な次回セッションの候補日時を提案。継続率の向上と離脱防止に貢献します。",
};

/* ── ReserveNavi Mock Section ── */

function ReserveNaviMockSection() {
  const [activeTab, setActiveTab] = useState<string>("calendar");

  return (
    <section id="demo" className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center">
            <p className="text-xs font-bold tracking-widest uppercase text-emerald-500">
              Demo
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              LINE予約管理システム ReserveNaviの機能
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-gray-500">
              電話・紙ノート・Excelから卒業。LINEで予約受付から顧客管理、リピート促進まで。
            </p>
          </div>
        </FadeIn>

        {/* Tab bar */}
        <FadeIn delay={0.1}>
          <div className="mx-auto mt-12 flex max-w-2xl justify-center">
            <div className="inline-flex rounded-full bg-gray-100 p-1">
              {MOCK_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 min-h-[44px] text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Mock display */}
        <FadeIn delay={0.15}>
          <div className="mt-8">
            {activeTab === "calendar" && <MockCalendar />}
            {activeTab === "line" && <MockLineBooking />}
            {activeTab === "customer" && <MockCustomerCard />}
            {activeTab === "ai" && <MockAiAnalysis />}
          </div>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-gray-500">
            {MOCK_DESCRIPTIONS[activeTab]}
          </p>

          {/* Demo CTA */}
          <div className="mt-8 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-500 px-6 py-3 text-sm font-bold text-emerald-600 transition-all duration-300 hover:bg-emerald-50"
            >
              <span>💡</span>
              実際に触ってみたい方は → デモアカウントで体験する
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Hero Mock (ReserveNavi Dashboard) ── */

function HeroDashboardMock() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-800/80 p-5 shadow-2xl backdrop-blur-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-slate-400">ReserveNavi - ダッシュボード</span>
      </div>
      {/* Stats row */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { label: "今日のセッション", value: "6件", color: "text-emerald-400" },
          { label: "今月の来店", value: "98件", color: "text-green-400" },
          { label: "継続率", value: "78%", color: "text-orange-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/5 bg-slate-700/50 p-3 text-center"
          >
            <p className="text-[10px] text-slate-400">{stat.label}</p>
            <p className={`mt-1 text-lg font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      {/* Mini schedule */}
      <div className="mt-3 space-y-2">
        {[
          { time: "10:00", name: "山田様", menu: "パーソナル60分（指名）", status: "bg-green-400" },
          { time: "11:30", name: "佐藤様", menu: "体験セッション60分", status: "bg-emerald-400" },
          { time: "14:00", name: "田中様", menu: "パーソナル60分", status: "bg-orange-400" },
        ].map((slot) => (
          <div
            key={slot.time}
            className="flex items-center gap-3 rounded-lg border border-white/5 bg-slate-700/30 px-3 py-2"
          >
            <span className={`h-2 w-2 rounded-full ${slot.status}`} />
            <span className="text-xs font-medium text-slate-300">
              {slot.time}
            </span>
            <span className="text-xs text-slate-400">{slot.name}</span>
            <span className="ml-auto text-[10px] text-slate-500">
              {slot.menu}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Component ── */

export default function GymPageClient() {
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

        {/* ══════════════ Hero ══════════════ */}
        <section
          id="hero"
          className="relative min-h-[90vh] overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(5,150,105,0.18) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.1) 0%, transparent 50%),
              linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)
            `,
          }}
        >
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <FadeIn>
                  <p className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur-sm">
                    パーソナルジムのオーナー・トレーナー様へ
                  </p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1
                    className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl"
                    style={{ lineHeight: 1.15 }}
                  >
                    セッション中の電話対応、
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                      もう中断しなくていい。
                    </span>
                  </h1>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">
                    トレーニングセッション予約・トレーナー指名・シフト管理。全部LINEとAIにおまかせ。
                  </p>
                </FadeIn>

                {/* Trust badges */}
                <FadeIn delay={0.25}>
                  <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
                    <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
                      初期費用¥0
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
                      契約縛りなし
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
                      3分で導入
                    </span>
                  </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-emerald-700"
                      style={{
                        boxShadow: "0 0 30px rgba(5,150,105,0.3)",
                      }}
                    >
                      無料で始める
                    </a>
                    <a
                      href="#pricing"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                    >
                      料金プランを見る
                    </a>
                  </div>
                  <p className="mt-4 text-sm text-slate-400">
                    初期費用¥0・3分で開始・いつでも解約OK
                  </p>
                </FadeIn>
                <FadeIn delay={0.35}>
                  <p className="mt-6 inline-block rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-300">
                    2026年4月サービス開始｜お気軽にご相談ください
                  </p>
                </FadeIn>
              </div>

              {/* Hero右側: ダッシュボードモック */}
              <FadeIn delay={0.2} className="mt-8 lg:mt-0">
                <Image src="/images/plan/gym-hero.jpg" alt="gym" width={600} height={400} className="rounded-2xl shadow-2xl" priority />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ══════════════ Pain Points ══════════════ */}
        <section id="problems" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold tracking-widest uppercase text-red-400">
                  Problem
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  パーソナルジムでよくあるお悩み
                </h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  セッションに集中したいのに、予約対応に追われていませんか。
                </p>
              </div>
            </FadeIn>
            <div className="mt-14 space-y-0">
              {PAIN_POINTS.map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.08}>
                  <div
                    className={`flex items-start gap-5 py-7 ${
                      i < PAIN_POINTS.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <span
                      className="shrink-0 text-4xl font-extrabold text-gray-200"
                      style={{ lineHeight: 1 }}
                    >
                      {i + 1}.
                    </span>
                    <div className="border-l-2 border-emerald-300 pl-5">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{p.emoji}</span>
                        <h3 className="font-bold text-gray-800">{p.title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-500">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ Solution ══════════════ */}
        <section
          id="solution"
          className="px-4 py-24 md:py-32"
          style={{ backgroundColor: "#f9fafb" }}
        >
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold tracking-widest uppercase text-emerald-500">
                  Solution
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  3つのNaviが、あなたの代わりに対応します。
                </h2>
                <p className="mx-auto mt-4 max-w-md text-gray-500">
                  予約もシフトも問い合わせも。ぜんぶ、おまかせ。
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm font-medium text-emerald-600">
                  必要なものだけ1つから使えます。まとめて使うとポイント増量でお得に。
                </p>
              </div>
            </FadeIn>

            {/* Alternating layout */}
            <div className="mt-16 space-y-12">
              {SOLUTIONS.map((item, i) => (
                <FadeIn key={item.name} delay={i * 0.1}>
                  <div
                    className={`flex flex-col items-center gap-8 md:flex-row ${
                      i % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Icon side */}
                    <div className="flex shrink-0 items-center justify-center rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm md:h-40 md:w-40">
                      <span className="text-6xl">{item.emoji}</span>
                    </div>
                    {/* Text side */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="text-xs text-gray-400">{item.label}</p>
                        {item.free && (
                          <span className="rounded-full bg-green-500 px-3 py-0.5 text-xs font-bold text-white">
                            FREE
                          </span>
                        )}
                      </div>
                      <h3
                        className="mt-1 text-xl font-bold"
                        style={{ color: "#059669" }}
                      >
                        {item.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-gray-600">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ Feature Detail: ReserveNavi Mock Screens ══════════════ */}
        <ReserveNaviMockSection />

        {/* ══════════════ Feature Detail: AskNavi & ShiftNavi ══════════════ */}
        <section
          id="features"
          className="px-4 py-24 md:py-32"
          style={{ backgroundColor: "#f9fafb" }}
        >
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="mb-14 text-center">
                <p className="text-xs font-bold tracking-widest uppercase text-emerald-500">
                  Features
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  AI自動応答 & シフト管理
                </h2>
              </div>
            </FadeIn>

            <div className="grid gap-8 md:grid-cols-2">
              {/* AskNavi */}
              <FadeIn>
                <div className="group h-full rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <p className="text-xs font-bold tracking-widest uppercase text-emerald-500">
                    AskNavi
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-gray-800">
                    AI自動応答でできること
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {[
                      "LINEでの質問にAIが24時間自動回答",
                      "料金プラン・設備・入会方法・アクセスetc.",
                      "業種別テンプレートで初期設定かんたん",
                      "HPの情報を自動取り込み→ナレッジ化",
                      "未回答の質問→ワンタッチでナレッジ自動生成",
                      "応答トーンを設定可能（丁寧/カジュアル等）",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-gray-600"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-500">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs text-gray-400">
                    月額¥550〜 ｜ ポイント消費型
                  </p>
                </div>
              </FadeIn>

              {/* ShiftNavi */}
              <FadeIn delay={0.1}>
                <div className="group relative h-full rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span className="absolute -top-3 right-4 rounded-full bg-green-500 px-4 py-1 text-xs font-bold text-white shadow-sm">
                    フリー¥0〜
                  </span>
                  <p className="text-xs font-bold tracking-widest uppercase text-emerald-500">
                    ShiftNavi
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-gray-800">
                    シフト管理でできること
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {[
                      "スタッフがスマホで休み希望を申請",
                      "AIがワンタッチでシフト自動作成",
                      "月次カレンダー表示・印刷（PDF対応）",
                      "ドラッグ＆ドロップでかんたん編集",
                      "リーダー設定・バージョン管理（月3回まで）",
                      "祝日自動反映",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-gray-600"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs text-emerald-500">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      月額¥0 ｜ AI機能のみポイント消費
                    </p>
                    <a
                      href="/products/shiftnavi"
                      className="text-xs font-medium text-emerald-500 hover:text-emerald-600"
                    >
                      詳しく見る →
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* 他のアプリ紹介 */}
            <FadeIn delay={0.2}>
              <div className="mt-8 rounded-3xl border border-gray-100 bg-gradient-to-r from-slate-50 to-gray-50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <p className="text-lg font-bold text-gray-800">
                  他にもアプリが続々登場
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  業務ルール管理、AI資料作成、名刺管理、SNS管理など。
                  <br />
                  FUJIMIN PASSなら必要なアプリを1つずつ追加できます。
                </p>
                <a
                  href="/fujimin-pass"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  すべてのアプリを見る →
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════ Steps ══════════════ */}
        <section id="steps" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold tracking-widest uppercase text-green-500">
                  How to Start
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  はじめかた、かんたん3ステップ
                </h2>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <FadeIn key={s.step} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="mb-4 text-5xl">{s.emoji}</div>
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                      {s.step}
                    </div>
                    <h3 className="mt-4 text-base font-bold text-gray-800">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ Numbers / Impact ══════════════ */}
        <section
          className="px-4 py-24 md:py-32"
          style={{ backgroundColor: "#f9fafb" }}
        >
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold tracking-widest uppercase text-emerald-500">
                  Impact
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  もし1日5件の電話対応がなくなったら
                </h2>
              </div>
            </FadeIn>
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {[
                {
                  emoji: "📞",
                  label: "電話対応",
                  calc: "1回5分 × 5回",
                  result: "25分/日",
                },
                {
                  emoji: "📋",
                  label: "予約転記",
                  calc: "1件3分 × 5件",
                  result: "15分/日",
                },
                {
                  emoji: "🔄",
                  label: "シフト調整",
                  calc: "週30分",
                  result: "約4分/日",
                },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.08}>
                  <div className="rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm">
                    <span className="text-3xl">{item.emoji}</span>
                    <p className="mt-2 text-sm font-medium text-gray-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{item.calc}</p>
                    <p className="mt-2 text-2xl font-extrabold text-emerald-600">
                      {item.result}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <div className="mt-10 text-center">
                <p className="text-2xl font-extrabold text-emerald-600 md:text-3xl">
                  1日44分、月間約22時間をセッションに使える
                </p>
                <p className="mt-3 text-xs text-gray-400">
                  ※ トレーナー2名規模のパーソナルジムを想定した試算です
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-emerald-200 bg-white p-6">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 text-2xl">🏨</span>
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

        {/* ══════════════ Comparison ══════════════ */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold tracking-widest uppercase text-gray-400">
                  Comparison
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
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
                      <th className="px-5 py-4 text-center font-semibold text-emerald-600">
                        FUJIMIN PASS
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      {
                        feature: "予約管理",
                        general: "¥9,790/月",
                        ours: "ReserveNavi ¥0〜¥3,980",
                      },
                      {
                        feature: "LINE対応",
                        general: "+¥4,400/月",
                        ours: "標準搭載",
                      },
                      {
                        feature: "AI問い合わせ対応",
                        general: "+¥1,500/月〜",
                        ours: "AskNavi +¥550/月〜",
                      },
                      {
                        feature: "シフト管理",
                        general: "+¥1,650/月〜",
                        ours: "ShiftNavi ¥0〜¥550",
                      },
                    ].map((row) => (
                      <tr key={row.feature} className="hover:bg-emerald-50/30">
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
                    <tr className="border-t-2 border-emerald-200 bg-emerald-50/50">
                      <td className="px-5 py-4 font-bold text-gray-900">
                        合計
                      </td>
                      <td className="px-5 py-4 text-center font-bold text-gray-500">
                        ¥17,340/月〜
                      </td>
                      <td className="px-5 py-4 text-center text-lg font-extrabold text-emerald-600">
                        ¥550/月〜
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

        {/* ══════════════ Pricing ══════════════ */}
        <section
          id="pricing"
          className="px-4 py-24 md:py-32"
          style={{ backgroundColor: "#ecfdf5" }}
        >
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold tracking-widest uppercase text-emerald-500">
                  Pricing
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  パーソナルジム向け 料金プラン
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  ジムプランなら、毎月のFUJIMINポイントが増量でもらえます。
                </p>
                <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-2">
                  <span className="text-emerald-500 font-bold text-sm">ℹ️</span>
                  <p className="text-sm text-emerald-700">
                    <strong>1つのサービスだけでも申し込みOK。</strong>
                    プランはあくまでおすすめの組み合わせです。
                  </p>
                </div>
              </div>
            </FadeIn>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {PRICING_PLANS.map((plan, i) => (
                <FadeIn key={plan.name} delay={i * 0.08}>
                  <div
                    className={`relative h-full rounded-2xl border-2 bg-white p-8 ${
                      plan.recommended
                        ? "border-emerald-500 shadow-lg"
                        : "border-gray-200"
                    }`}
                  >
                    {plan.recommended && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1 text-xs font-bold text-white">
                        おすすめ
                      </span>
                    )}
                    <div className="text-center">
                      <p
                        className={`text-sm font-semibold ${
                          plan.recommended ? "text-emerald-600" : "text-gray-500"
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
                      <p className="mt-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
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
                          <span className="mt-0.5 text-green-500">✓</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <a
                        href="#contact"
                        className={`block w-full rounded-lg py-3 text-center text-sm font-semibold transition-colors ${
                          plan.recommended
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
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
                💡 ボーナスptでAI一括シフト生成やAI応答が追加で使えます
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                {["縛りなし", "いつでも解約", "税込", "営業電話なし", "¥3,000以上は銀行振込も対応"].map(
                  (item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <span className="text-green-500">✓</span> {item}
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
                    ? "▲ 閉じる"
                    : "▼ 各サービス単独の料金はこちら"}
                </button>
                {showSinglePrices && (
                  <div className="mx-auto mt-6 max-w-md space-y-4">
                    {SINGLE_PRICES.map((service) => (
                      <div key={service.name} className="rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-200">
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

        {/* ══════════════ FAQ ══════════════ */}
        <section id="faq" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-xs font-bold tracking-widest uppercase text-gray-400">
                  FAQ
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  よくある質問
                </h2>
              </div>
            </FadeIn>
            <div className="mt-14 space-y-4">
              {FAQS.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
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

        {/* ══════════════ CTA ══════════════ */}
        <section
          id="contact"
          className="relative overflow-hidden px-4 py-24 text-white md:py-32"
          style={{
            background:
              "linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)",
          }}
        >
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                セッションに集中できる毎日、
                <br />
                はじめませんか？
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-emerald-100/80">
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
                  name: "パーソナルジムプラン",
                  item: "https://www.fujimi-dx-lab.com/plan/gym",
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
              name: "FUJIMIN PASS パーソナルジムプラン",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "0",
                highPrice: "7700",
                priceCurrency: "JPY",
                offerCount: "3",
              },
              description:
                "パーソナルジム向けLINE予約管理・AI自動応答・シフト管理の統合プラットフォーム",
              url: "https://www.fujimi-dx-lab.com/plan/gym",
            }),
          }}
        />
      </main>
      <Footer />

      {/* ── モバイル固定CTAバー ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-emerald-200 bg-white/95 p-3 backdrop-blur-sm transition-transform duration-300 md:hidden ${
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
            className="flex-1 rounded-xl bg-emerald-600 py-3 text-center text-sm font-bold text-white shadow-lg"
          >
            無料で始める
          </a>
        </div>
      </div>
    </>
  );
}
