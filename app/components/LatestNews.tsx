"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FadeIn from "./FadeIn";

type Announcement = {
  id: string;
  title: string;
  category: string;
  publishedAt: string;
};

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  info: { label: "お知らせ", color: "bg-blue-100 text-blue-700" },
  event: { label: "イベント", color: "bg-green-100 text-green-700" },
  important: { label: "重要", color: "bg-red-100 text-red-700" },
  campaign: { label: "キャンペーン", color: "bg-purple-100 text-purple-700" },
};

export default function LatestNews() {
  const [items, setItems] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch("/api/announcements?limit=3")
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
      .catch(() => {});
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">お知らせ</h2>
            <Link href="/news" className="text-sm text-gray-400 hover:text-gray-600">
              すべて見る →
            </Link>
          </div>
        </FadeIn>
        <div className="space-y-3">
          {items.map((item, i) => {
            const cat = CATEGORY_LABELS[item.category] || CATEGORY_LABELS.info;
            return (
              <FadeIn key={item.id} delay={i * 0.05}>
                <Link
                  href={`/news/${item.id}`}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <span className="text-xs text-gray-400 shrink-0">
                    {new Date(item.publishedAt).toLocaleDateString("ja-JP")}
                  </span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${cat.color}`}>
                    {cat.label}
                  </span>
                  <span className="truncate text-sm font-medium text-gray-900">{item.title}</span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
