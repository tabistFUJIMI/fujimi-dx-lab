import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FadeIn from "../../components/FadeIn";
import { prisma } from "../../../lib/prisma";

type Props = { params: Promise<{ id: string }> };

async function getAnnouncement(id: string) {
  return prisma.announcement.findFirst({
    where: { id, isPublished: true },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getAnnouncement(id);
  if (!item) return { title: "お知らせが見つかりません" };
  const description = item.excerpt || item.content.slice(0, 120);
  return {
    title: item.title,
    description,
    alternates: {
      canonical: `https://www.fujimi-dx-lab.com/news/${id}`,
    },
    openGraph: {
      title: item.title,
      description,
      type: "article",
      url: `https://www.fujimi-dx-lab.com/news/${id}`,
      siteName: "FUJIMI DX Lab",
      locale: "ja_JP",
      publishedTime: (item.publishedAt || item.createdAt).toISOString(),
      modifiedTime: item.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary",
      title: item.title,
      description,
    },
  };
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  info: { label: "お知らせ", color: "bg-blue-100 text-blue-700" },
  event: { label: "イベント", color: "bg-green-100 text-green-700" },
  important: { label: "重要", color: "bg-red-100 text-red-700" },
  campaign: { label: "キャンペーン", color: "bg-purple-100 text-purple-700" },
};

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getAnnouncement(id);
  if (!item) notFound();

  const cat = CATEGORY_LABELS[item.category] || CATEGORY_LABELS.info;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    datePublished: (item.publishedAt || item.createdAt).toISOString(),
    dateModified: item.updatedAt.toISOString(),
    author: { "@type": "Organization", name: "FUJIMI DX Lab" },
    publisher: { "@type": "Organization", name: "FUJIMI DX Lab", url: "https://www.fujimi-dx-lab.com" },
    mainEntityOfPage: `https://www.fujimi-dx-lab.com/news/${id}`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://www.fujimi-dx-lab.com" },
      { "@type": "ListItem", position: 2, name: "お知らせ", item: "https://www.fujimi-dx-lab.com/news" },
      { "@type": "ListItem", position: 3, name: item.title, item: `https://www.fujimi-dx-lab.com/news/${id}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Header />
      <main className="min-h-screen px-4 pt-32 pb-20">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <Link href="/news" className="mb-6 inline-block text-sm text-gray-400 hover:text-gray-600">
              ← お知らせ一覧に戻る
            </Link>
            <div className="mb-4 flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cat.color}`}>
                {cat.label}
              </span>
              <span className="text-xs text-gray-400">
                {item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString("ja-JP")
                  : new Date(item.createdAt).toLocaleDateString("ja-JP")}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              {item.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-8 whitespace-pre-wrap text-base leading-relaxed text-gray-700">
              {item.content}
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
