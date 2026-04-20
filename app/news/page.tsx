import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";
import { BASE_URL } from "../../lib/base-url";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "FUJIMI DX Labからのお知らせ・イベント情報。",
  alternates: { canonical: `${BASE_URL}/news` },
};

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  info: { label: "お知らせ", color: "bg-blue-100 text-blue-700" },
  event: { label: "イベント", color: "bg-green-100 text-green-700" },
  important: { label: "重要", color: "bg-red-100 text-red-700" },
  campaign: { label: "キャンペーン", color: "bg-purple-100 text-purple-700" },
};

type Announcement = {
  id: string;
  title: string;
  excerpt: string | null;
  category: string;
  publishedAt: string;
};

async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/announcements?limit=50`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const items = await getAnnouncements();

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 pt-32 pb-20">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">お知らせ</h1>
            <p className="mt-2 text-sm text-gray-500">FUJIMI DX Labからの最新情報</p>
          </FadeIn>

          <div className="mt-10 space-y-4">
            {items.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-400">お知らせはまだありません</p>
                <p className="mt-4 text-sm text-gray-400">サービスについてのご質問は<a href="/#contact" className="text-blue-600 underline hover:text-blue-800">お問い合わせフォーム</a>からお気軽にどうぞ。</p>
              </div>
            ) : (
              items.map((item, i) => {
                const cat = CATEGORY_LABELS[item.category] || CATEGORY_LABELS.info;
                return (
                  <FadeIn key={item.id} delay={i * 0.03}>
                    <Link
                      href={`/news/${item.id}`}
                      className="block rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cat.color}`}>
                          {cat.label}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(item.publishedAt).toLocaleDateString("ja-JP")}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                      {item.excerpt && (
                        <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.excerpt}</p>
                      )}
                    </Link>
                  </FadeIn>
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
