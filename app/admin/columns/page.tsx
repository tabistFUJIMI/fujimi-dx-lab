"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

type Column = {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
};

// コラムカテゴリーは lib/column-categories.ts で単一ソース管理。
// 管理画面もそこから参照することでラベル/色/値を公開側と完全一致させる。
import { COLUMN_CATEGORIES, resolveCategory } from "../../../lib/column-categories";

const CATEGORIES = COLUMN_CATEGORIES;

function getCategoryStyle(cat: string) {
  const resolved = resolveCategory(cat);
  return CATEGORIES.find((c) => c.value === resolved) || CATEGORIES[0];
}

export default function ColumnsAdmin() {
  const [items, setItems] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Column | null>(null);

  // Form state
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("ai-geo-llmo");
  const [tagsInput, setTagsInput] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/columns");
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      alert("データの取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const resetForm = () => {
    setSlug("");
    setTitle("");
    setContent("");
    setCategory("ai-geo-llmo");
    setTagsInput("");
    setIsPublished(false);
    setEditingItem(null);
    setShowForm(false);
  };

  const startEdit = (item: Column) => {
    setSlug(item.slug);
    setTitle(item.title);
    setContent(item.content);
    setCategory(item.category);
    setTagsInput(item.tags.join(", "));
    setIsPublished(item.isPublished);
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug.trim() || !title.trim() || !content.trim()) {
      alert("スラッグ・タイトル・本文は必須です");
      return;
    }

    const method = editingItem ? "PUT" : "POST";
    const url = editingItem
      ? `/api/admin/columns/${editingItem.id}`
      : "/api/admin/columns";

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, title, content, category, tags, isPublished }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "保存に失敗しました");
        return;
      }

      resetForm();
      fetchItems();
    } catch {
      alert("保存に失敗しました");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("この記事を削除しますか？")) return;
    try {
      await fetch(`/api/admin/columns/${id}`, { method: "DELETE" });
      fetchItems();
    } catch {
      alert("削除に失敗しました");
    }
  };

  // Auto-generate slug from title
  const generateSlug = () => {
    if (slug) return;
    const generated = title
      .toLowerCase()
      .replace(/[^a-z0-9\u3000-\u9fff]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60);
    setSlug(generated);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">コラム管理</h1>
          <p className="text-sm text-gray-500">
            AI検索/DX推進/時事IT/地方ビジネス コラムの管理
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/column"
            target="_blank"
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
          >
            公開ページを見る
          </Link>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            新規作成
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 p-6 bg-white border rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            {editingItem ? "記事を編集" : "新規記事"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">タイトル *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={generateSlug}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">スラッグ（URL） *</label>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-400">/column/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                    pattern="[a-z0-9\-]+"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">カテゴリ</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  タグ（カンマ区切り）
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="LLMO, GEO, ChatGPT"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">本文（Markdown対応） *</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="w-full px-3 py-2 border rounded-lg text-sm font-mono"
                required
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">公開する</span>
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                {editingItem ? "更新" : "作成"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border rounded-lg text-sm hover:bg-gray-50"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <p className="text-gray-500 text-center py-8">読み込み中...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">記事がありません</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => {
            const cat = getCategoryStyle(item.category);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${cat.color}`}>
                      {cat.label}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        item.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.isPublished ? "公開" : "下書き"}
                    </span>
                    <span className="text-xs text-gray-400">/column/{item.slug}</span>
                  </div>
                  <p className="font-medium text-sm truncate">{item.title}</p>
                  {item.tags.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs text-gray-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => startEdit(item)}
                    className="px-3 py-1 text-xs border rounded hover:bg-gray-100"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50"
                  >
                    削除
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
