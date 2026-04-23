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
  ogImage: string | null;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
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

  // Filter state
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Form state
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("ai-geo-llmo");
  const [tagsInput, setTagsInput] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [excerptOverride, setExcerptOverride] = useState("");
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
    setOgImage("");
    setExcerptOverride("");
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
    setOgImage(item.ogImage || "");
    setExcerptOverride(item.excerpt || "");
    setIsPublished(item.isPublished);
    setEditingItem(item);
    setShowForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Quick toggle publish/draft status from list
  const togglePublish = async (item: Column) => {
    const next = !item.isPublished;
    const verb = next ? "公開" : "下書きに戻す";
    if (!confirm(`この記事を${verb}しますか？\n\n${item.title}`)) return;

    try {
      const res = await fetch(`/api/admin/columns/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: next }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "切り替えに失敗しました");
        return;
      }
      fetchItems();
    } catch {
      alert("切り替えに失敗しました");
    }
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
        body: JSON.stringify({
          slug,
          title,
          content,
          category,
          tags,
          ogImage: ogImage || null,
          excerpt: excerptOverride || undefined, // undefined で API の自動生成にまかせる
          isPublished,
        }),
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  OG画像URL
                  <span className="ml-2 text-xs text-gray-400">（SNS共有時に表示）</span>
                </label>
                <input
                  type="text"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder="/images/column/xxx.png"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  抜粋（120字）
                  <span className="ml-2 text-xs text-gray-400">（空なら本文先頭から自動）</span>
                </label>
                <input
                  type="text"
                  value={excerptOverride}
                  onChange={(e) => setExcerptOverride(e.target.value.slice(0, 160))}
                  placeholder="検索結果・SNS共有で表示される説明文"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">本文（Markdown対応） *</span>
                <span className="text-xs text-gray-400">
                  {content.length.toLocaleString()} 文字
                </span>
              </label>
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

      {/* Filters */}
      {!showForm && items.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 p-3 bg-white border rounded-lg">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 タイトル・スラッグ・タグで検索..."
            className="flex-1 min-w-[200px] px-3 py-1.5 border rounded-lg text-sm"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 border rounded-lg text-sm"
          >
            <option value="all">全カテゴリ</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-3 py-1.5 border rounded-lg text-sm"
          >
            <option value="all">全ステータス</option>
            <option value="published">公開のみ</option>
            <option value="draft">下書きのみ</option>
          </select>
          <span className="text-xs text-gray-500 ml-auto">
            {
              items.filter((it) => {
                if (categoryFilter !== "all" && resolveCategory(it.category) !== categoryFilter) return false;
                if (statusFilter === "published" && !it.isPublished) return false;
                if (statusFilter === "draft" && it.isPublished) return false;
                if (searchQuery) {
                  const q = searchQuery.toLowerCase();
                  const hay = (it.title + " " + it.slug + " " + it.tags.join(" ")).toLowerCase();
                  if (!hay.includes(q)) return false;
                }
                return true;
              }).length
            }{" "}
            件表示中 / 全 {items.length} 件
          </span>
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <p className="text-gray-500 text-center py-8">読み込み中...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">記事がありません</p>
      ) : (
        <div className="space-y-2">
          {items
            .filter((it) => {
              if (categoryFilter !== "all" && resolveCategory(it.category) !== categoryFilter) return false;
              if (statusFilter === "published" && !it.isPublished) return false;
              if (statusFilter === "draft" && it.isPublished) return false;
              if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const hay = (it.title + " " + it.slug + " " + it.tags.join(" ")).toLowerCase();
                if (!hay.includes(q)) return false;
              }
              return true;
            })
            .map((item) => {
              const cat = getCategoryStyle(item.category);
              const updatedAt = new Date(item.updatedAt).toLocaleString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 bg-white border rounded-lg hover:bg-gray-50 ${
                    item.isPublished ? "border-l-4 border-l-green-500" : "border-l-4 border-l-gray-300"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${cat.color}`}>
                        {cat.label}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          item.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.isPublished ? "✓ 公開" : "📝 下書き"}
                      </span>
                      <span className="text-xs text-gray-400 truncate">/column/{item.slug}</span>
                      <span className="text-xs text-gray-400 ml-auto">
                        更新: {updatedAt}
                      </span>
                    </div>
                    <p className="font-medium text-sm truncate">{item.title}</p>
                    {item.tags.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {item.tags.slice(0, 8).map((tag) => (
                          <span key={tag} className="text-xs text-gray-400">
                            #{tag}
                          </span>
                        ))}
                        {item.tags.length > 8 && (
                          <span className="text-xs text-gray-400">+{item.tags.length - 8}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <button
                      onClick={() => togglePublish(item)}
                      title={item.isPublished ? "下書きに戻す" : "公開する"}
                      className={`px-3 py-1.5 text-xs font-semibold rounded ${
                        item.isPublished
                          ? "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      {item.isPublished ? "下書きに戻す" : "公開する"}
                    </button>
                    <a
                      href={`/column/${item.slug}${item.isPublished ? "" : "?preview=1"}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={item.isPublished ? "公開ページを開く" : "下書きプレビューを開く（管理者のみ閲覧可）"}
                      className="px-3 py-1.5 text-xs border rounded hover:bg-gray-100"
                    >
                      プレビュー
                    </a>
                    <button
                      onClick={() => startEdit(item)}
                      className="px-3 py-1.5 text-xs border rounded hover:bg-gray-100"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50"
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
