"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

type Inquiry = {
  id: string;
  type: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  status: string;
  createdAt: string;
};

const STATUS_OPTIONS = [
  { value: "new", label: "未対応", color: "bg-red-100 text-red-700" },
  { value: "replied", label: "対応済み", color: "bg-blue-100 text-blue-700" },
  { value: "closed", label: "完了", color: "bg-gray-100 text-gray-500" },
];

export default function InquiriesAdmin() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.status === 401) { window.location.href = "/login"; return; }
      const data = await res.json();
      setItems(data.items || []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchItems();
  };

  const newCount = items.filter((i) => i.status === "new").length;

  if (isLoading) return <div className="py-12 text-center text-gray-400">読み込み中...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-600">← 戻る</Link>
        <h1 className="text-xl font-bold text-gray-900">お問い合わせ</h1>
        {newCount > 0 && (
          <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">{newCount}</span>
        )}
      </div>

      {items.length === 0 ? (
        <p className="py-12 text-center text-gray-400">お問い合わせはありません</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const statusOpt = STATUS_OPTIONS.find((s) => s.value === item.status) || STATUS_OPTIONS[0];
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="rounded-xl bg-white shadow-sm">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusOpt.color}`}>{statusOpt.label}</span>
                      <span className="text-xs text-gray-400">{item.type}</span>
                    </div>
                    <p className="truncate text-sm font-bold text-gray-900">{item.name}（{item.email}）</p>
                    <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString("ja-JP")}</p>
                  </div>
                  <span className="ml-2 text-gray-300">{isExpanded ? "▲" : "▼"}</span>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 px-4 pb-4 pt-3">
                    {item.company && <p className="mb-2 text-xs text-gray-500">会社名: {item.company}</p>}
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">{item.message}</p>
                    <div className="mt-4 flex gap-2">
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => handleStatusChange(item.id, s.value)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                            item.status === s.value
                              ? "bg-slate-800 text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
