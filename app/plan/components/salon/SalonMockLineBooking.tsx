"use client";

import { useState } from "react";

const STEPS = ["メニュー選択", "担当者選択", "日時選択", "予約確認"];

const MENUS = [
  { name: "カット 45分", price: "4,500円", popular: false },
  { name: "カット＋カラー 120分", price: "11,000円", popular: true },
  { name: "パーマ 90分", price: "9,000円", popular: false },
  { name: "トリートメント 30分", price: "3,500円", popular: false },
  { name: "ヘッドスパ 20分", price: "2,500円", popular: false },
  { name: "縮毛矯正 180分", price: "15,000円", popular: false },
];

const STAFF = [
  { name: "指名なし（おまかせ）", extra: null, avatar: "👤" },
  { name: "スタイリスト山田", extra: null, avatar: "💇" },
  { name: "チーフスタイリスト佐藤", extra: "指名料 +550円", avatar: "⭐" },
];

const DATES = [
  { date: "3/31", day: "火" },
  { date: "4/1", day: "水" },
  { date: "4/2", day: "木" },
  { date: "4/3", day: "金" },
  { date: "4/4", day: "土" },
  { date: "4/5", day: "日" },
  { date: "4/6", day: "月" },
];

const TIME_SECTIONS = [
  {
    label: "午前",
    slots: ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30"],
  },
  {
    label: "午後",
    slots: ["13:00", "13:30", "14:00", "14:30", "15:00"],
  },
  {
    label: "夕方",
    slots: ["16:00", "16:30", "17:00"],
  },
];

function StepMenu() {
  return (
    <div className="space-y-2">
      <p className="mb-3 text-xs text-gray-500">施術メニューを選択してください</p>
      {MENUS.map((m) => (
        <div
          key={m.name}
          className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
            m.popular
              ? "border-rose-300 bg-rose-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <div>
            <p className="text-sm font-semibold text-gray-800">{m.name}</p>
            <p className="text-xs text-gray-500">{m.price}</p>
          </div>
          {m.popular && (
            <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white">
              人気
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function StepStaff() {
  return (
    <div className="space-y-2">
      <p className="mb-3 text-xs text-gray-500">スタイリストを選択してください</p>
      {STAFF.map((s) => (
        <div
          key={s.name}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
            s.name === "指名なし（おまかせ）"
              ? "border-rose-300 bg-rose-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <span className="text-2xl">{s.avatar}</span>
          <div>
            <p className="text-sm font-semibold text-gray-800">{s.name}</p>
            {s.extra && (
              <p className="text-xs text-orange-500">{s.extra}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function StepDateTime() {
  return (
    <div>
      <p className="mb-3 text-xs text-gray-500">ご希望の日時を選択してください</p>

      {/* Date horizontal scroll */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
        {DATES.map((d, i) => (
          <div
            key={d.date}
            className={`shrink-0 rounded-xl border px-3 py-2 text-center ${
              i === 2
                ? "border-rose-400 bg-rose-600 text-white"
                : "border-gray-200 bg-white text-gray-600"
            }`}
            style={{ minWidth: "52px" }}
          >
            <p className="text-[10px]">{d.day}</p>
            <p className="text-sm font-bold">{d.date}</p>
          </div>
        ))}
      </div>

      {/* Time sections */}
      {TIME_SECTIONS.map((sec) => (
        <div key={sec.label} className="mb-3">
          <p className="mb-1.5 text-xs font-semibold text-gray-500">{sec.label}</p>
          <div className="flex flex-wrap gap-1.5">
            {sec.slots.map((slot) => {
              const selected = slot === "13:00" && sec.label === "午後";
              const disabled = slot === "11:00" || slot === "14:30";
              return (
                <span
                  key={slot}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs ${
                    selected
                      ? "border-rose-400 bg-rose-600 font-bold text-white"
                      : disabled
                      ? "border-gray-100 bg-gray-50 text-gray-300 line-through"
                      : "border-gray-200 bg-white text-gray-700"
                  }`}
                >
                  {slot}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function StepConfirm() {
  return (
    <div className="space-y-4">
      <p className="mb-2 text-xs text-gray-500">以下の内容で予約します</p>

      <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
        {[
          { label: "メニュー", value: "カット＋カラー 120分" },
          { label: "料金", value: "¥11,000" },
          { label: "担当者", value: "スタイリスト山田" },
          { label: "日付", value: "2026年4月2日（木）" },
          { label: "時間", value: "13:00 〜 15:00" },
        ].map((r) => (
          <div key={r.label} className="flex justify-between text-sm">
            <span className="text-gray-500">{r.label}</span>
            <span className="font-semibold text-gray-800">{r.value}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 rounded-xl border border-gray-200 bg-white p-4">
        <div>
          <label className="text-[10px] text-gray-400">お名前</label>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
            伊藤 さくら
          </div>
        </div>
        <div>
          <label className="text-[10px] text-gray-400">電話番号</label>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
            090-0000-3456
          </div>
        </div>
      </div>

      <button className="w-full rounded-xl bg-rose-600 py-3 text-sm font-bold text-white">
        この内容で予約する
      </button>
    </div>
  );
}

export default function SalonMockLineBooking() {
  const [step, setStep] = useState(0);

  const STEP_COMPONENTS = [
    <StepMenu key="menu" />,
    <StepStaff key="staff" />,
    <StepDateTime key="datetime" />,
    <StepConfirm key="confirm" />,
  ];

  return (
    <div className="mx-auto max-w-sm">
      {/* Phone frame */}
      <div className="overflow-hidden rounded-[2.5rem] border-4 border-gray-800 bg-gray-800 shadow-2xl">
        {/* Notch */}
        <div className="mx-auto h-6 w-28 rounded-b-2xl bg-gray-800" />

        {/* Screen */}
        <div className="bg-white">
          {/* App header */}
          <div className="flex items-center justify-between bg-rose-700 px-4 py-3">
            <span className="text-xs font-bold text-white">ReserveNavi</span>
            <span className="text-[10px] text-rose-200">スマート予約管理</span>
          </div>

          {/* Step tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                className={`flex-1 py-2 text-center text-[10px] font-semibold transition-colors ${
                  i === step
                    ? "border-b-2 border-rose-600 text-rose-700"
                    : "text-gray-400"
                }`}
              >
                <span className="block text-sm">{i + 1}</span>
                {s}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="h-[420px] overflow-y-auto p-4">
            {STEP_COMPONENTS[step]}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 bg-gray-50 py-2 text-center">
            <div className="mx-auto h-1 w-28 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
