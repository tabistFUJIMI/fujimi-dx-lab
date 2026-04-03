"use client";

const MENU_ITEMS = [
  { icon: "🏠", label: "ホーム", active: false },
  { icon: "📅", label: "予約", active: true },
  { icon: "👥", label: "顧客", active: false },
  { icon: "📤", label: "LINE配信", active: false },
  { icon: "📊", label: "AI経営分析", active: false },
  { icon: "⚙️", label: "設定", active: false },
];

const DAYS = [
  { date: "3/30", day: "月" },
  { date: "3/31", day: "火" },
  { date: "4/1", day: "水" },
  { date: "4/2", day: "木" },
  { date: "4/3", day: "金" },
  { date: "4/4", day: "土" },
  { date: "4/5", day: "日" },
];

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

interface Booking {
  dayIndex: number;
  startHour: number;
  startMin: number;
  durationMin: number;
  name: string;
  menu: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const BOOKINGS: Booking[] = [
  {
    dayIndex: 1, startHour: 10, startMin: 30, durationMin: 20,
    name: "佐野弘明", menu: "ヘッドスパ20分",
    color: "#7c3aed", bgColor: "#ede9fe", borderColor: "#c4b5fd",
  },
  {
    dayIndex: 1, startHour: 12, startMin: 30, durationMin: 20,
    name: "佐野弘明", menu: "ヘッドスパ20分",
    color: "#059669", bgColor: "#d1fae5", borderColor: "#6ee7b7",
  },
  {
    dayIndex: 1, startHour: 13, startMin: 0, durationMin: 60,
    name: "小林結衣", menu: "全身もみほぐし60分",
    color: "#db2777", bgColor: "#fce7f3", borderColor: "#f9a8d4",
  },
  {
    dayIndex: 1, startHour: 14, startMin: 30, durationMin: 40,
    name: "佐野弘明", menu: "全身もみほぐし40分",
    color: "#dc2626", bgColor: "#fee2e2", borderColor: "#fca5a5",
  },
  {
    dayIndex: 2, startHour: 11, startMin: 30, durationMin: 60,
    name: "佐野弘明", menu: "全身もみほぐし60分",
    color: "#059669", bgColor: "#d1fae5", borderColor: "#6ee7b7",
  },
  {
    dayIndex: 2, startHour: 13, startMin: 30, durationMin: 60,
    name: "伊藤さくら", menu: "アロマトリートメント",
    color: "#059669", bgColor: "#d1fae5", borderColor: "#6ee7b7",
  },
  {
    dayIndex: 3, startHour: 10, startMin: 0, durationMin: 30,
    name: "吉田陽菜", menu: "足つぼリフレクソロジー",
    color: "#059669", bgColor: "#d1fae5", borderColor: "#6ee7b7",
  },
  {
    dayIndex: 3, startHour: 11, startMin: 30, durationMin: 20,
    name: "田中美咲", menu: "ヘッドスパ20分",
    color: "#ca8a04", bgColor: "#fef9c3", borderColor: "#fde047",
  },
  {
    dayIndex: 3, startHour: 13, startMin: 30, durationMin: 20,
    name: "吉田陽菜", menu: "ヘッドスパ20分",
    color: "#ca8a04", bgColor: "#fef9c3", borderColor: "#fde047",
  },
];

export default function MockCalendar() {
  const ROW_HEIGHT = 48;
  const HEADER_HEIGHT = 40;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="flex min-h-[520px]">
        {/* Sidebar */}
        <div className="hidden w-48 shrink-0 flex-col bg-violet-900 text-white md:flex">
          <div className="border-b border-violet-700 px-4 py-4">
            <p className="text-xs font-bold tracking-wider text-violet-300">Reserve Navi</p>
            <p className="mt-1 text-[11px] text-violet-400">テナントDEMO</p>
            <p className="text-[10px] text-violet-500">&lt;マッサージ店&gt;</p>
          </div>
          <nav className="flex-1 py-2">
            {MENU_ITEMS.map((m) => (
              <div
                key={m.label}
                className={`flex items-center gap-2.5 px-4 py-2.5 text-xs ${
                  m.active
                    ? "bg-violet-700/50 font-semibold text-white"
                    : "text-violet-300 hover:bg-violet-800"
                }`}
              >
                <span className="text-sm">{m.icon}</span>
                {m.label}
              </div>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top bar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3">
            <div className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700">
              デモリラクゼーションサロン ▾
            </div>
            <div className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700">
              2026年3月31日 〜 4月6日
            </div>
            <div className="flex gap-1">
              {["日", "週", "月"].map((v) => (
                <span
                  key={v}
                  className={`rounded px-2.5 py-1 text-xs ${
                    v === "週"
                      ? "bg-violet-600 font-semibold text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Tab */}
          <div className="border-b border-gray-200 px-4">
            <span className="inline-block border-b-2 border-violet-600 px-3 py-2 text-xs font-semibold text-violet-700">
              確定済み（承認待ち含む）
            </span>
          </div>

          {/* Calendar grid */}
          <div className="flex-1 overflow-x-auto overflow-y-auto">
            <div className="min-w-[600px]">
              {/* Day headers */}
              <div className="sticky top-0 z-10 flex border-b border-gray-200 bg-white">
                <div className="w-14 shrink-0" />
                {DAYS.map((d, i) => (
                  <div
                    key={d.date}
                    className={`flex-1 border-l border-gray-100 py-2 text-center text-xs ${
                      i === 1 ? "bg-violet-50 font-semibold text-violet-700" : "text-gray-500"
                    }`}
                  >
                    <div>{d.date}</div>
                    <div className="text-[10px]">({d.day})</div>
                  </div>
                ))}
              </div>

              {/* Time rows */}
              <div className="relative">
                {HOURS.map((h) => (
                  <div key={h} className="flex" style={{ height: ROW_HEIGHT }}>
                    <div className="flex w-14 shrink-0 items-start justify-end pr-2 pt-0.5 text-[10px] text-gray-400">
                      {h}:00
                    </div>
                    {DAYS.map((d) => (
                      <div
                        key={`${h}-${d.date}`}
                        className="flex-1 border-l border-b border-gray-100"
                      />
                    ))}
                  </div>
                ))}

                {/* Booking blocks */}
                {BOOKINGS.map((b, idx) => {
                  const top =
                    HEADER_HEIGHT * 0 +
                    (b.startHour - 9) * ROW_HEIGHT +
                    (b.startMin / 60) * ROW_HEIGHT;
                  const height = (b.durationMin / 60) * ROW_HEIGHT;
                  const left = `calc(56px + ${b.dayIndex} * ((100% - 56px) / 7))`;
                  const width = `calc((100% - 56px) / 7 - 4px)`;

                  return (
                    <div
                      key={idx}
                      className="absolute overflow-hidden rounded px-1.5 py-0.5"
                      style={{
                        top: `${top}px`,
                        height: `${Math.max(height, 18)}px`,
                        left,
                        width,
                        marginLeft: "2px",
                        backgroundColor: b.bgColor,
                        borderLeft: `3px solid ${b.borderColor}`,
                        color: b.color,
                      }}
                    >
                      <p className="truncate text-[9px] font-semibold leading-tight">
                        {b.name}
                      </p>
                      <p className="truncate text-[8px] leading-tight opacity-80">
                        {b.menu}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
