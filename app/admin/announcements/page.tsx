"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

type Announcement = {
  id: string;
  title: string;
  content: string;
  category: string;
  isPublished: boolean;
  publishedAt: string | null;
  eventDate: string | null;
  createdAt: string;
};

const CATEGORIES = [
  { value: "info", label: "お知らせ", color: "bg-blue-100 text-blue-700" },
  { value: "event", label: "イベント", color: "bg-green-100 text-green-700" },
  { value: "important", label: "重要", color: "bg-red-100 text-red-700" },
  { value: "campaign", label: "キャンペーン", color: "bg-purple-100 text-purple-700" },
];

function getCategoryStyle(cat: string) {
  return CATEGORIES.find((c) => c.value === cat) || CATEGORIES[0];
}

export default function AnnouncementsAdmin() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);
  const [form, setForm] = useState({ title: "", content: "", category: "info", eventDate: "", isPublished: false });
  const [isSaving, setIsSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/announcements");
      if (res.status === 401) { window.location.href = "/login"; return; }
      const data = await res.json();
      setItems(data.items || []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem
        ? `/api/admin/announcements/${editingItem.id}`
        : "/api/admin/announcements";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setShowForm(false);
      setEditingItem(null);
      setForm({ title: "", content: "", category: "info", eventDate: "", isPublished: false });
      fetchItems();
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item: Announcement) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      content: item.content,
      category: item.category,
      eventDate: item.eventDate ? item.eventDate.split("T")[0] : "",
      isPublished: item.isPublished,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("削除しますか？")) return;
    await fetch(`/api/admin/announcements/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const handleNew = () => {
    setEditingItem(null);
    setForm({ title: "", content: "", category: "info", eventDate: "", isPublished: false });
    setShowForm(true);
  };

  if (isLoading) return <div className="py-12 text-center text-gray-400">読み込み中...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-sm text-gray-400 hover:text-gray-600">← 戻る</Link>
          <h1 className="text-xl font-bold text-gray-900">お知らせ管理</h1>
        </div>
        <button onClick={handleNew} className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
          新規作成
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-bold">{editingItem ? "編集" : "新規作成"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">タイトル</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">本文</label>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={6} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">カテゴリ</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                  {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">イベント日</label>
                <input type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="rounded" />
                  公開する
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={isSaving} className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50">
                {isSaving ? "保存中..." : "保存"}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingItem(null); }} className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200">
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="py-12 text-center text-gray-400">お知らせはありません</p>
        ) : (
          items.map((item) => {
            const cat = getCategoryStyle(item.category);
            return (
              <div key={item.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cat.color}`}>{cat.label}</span>
                    {!item.isPublished && <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">下書き</span>}
                  </div>
                  <h3 className="truncate text-sm font-bold text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString("ja-JP")}</p>
                </div>
                <div className="ml-4 flex shrink-0 gap-2">
                  <button onClick={() => handleEdit(item)} className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-200">編集</button>
                  <button onClick={() => handleDelete(item.id)} className="rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-500 hover:bg-red-100">削除</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
