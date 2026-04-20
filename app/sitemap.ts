import type { MetadataRoute } from "next";
import { prisma } from "../lib/prisma";

const BASE_URL = "https://fujimi-dx-lab.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/fujimin-pass`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/products/reserve-navi`, lastModified: new Date("2026-03-18"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/products/ask-navi`, lastModified: new Date("2026-03-18"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/products/rule-navi`, lastModified: new Date("2026-03-18"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/products/shift-navi`, lastModified: new Date("2026-03-18"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/products/social-navi`, lastModified: new Date("2026-03-18"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/products/forproject`, lastModified: new Date("2026-04-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/ai-checker`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/column`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date("2026-04-20"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/lp/partner`, lastModified: new Date("2026-04-20"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/lp/reserve-navi`, lastModified: new Date("2026-04-20"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/plan/hair`, lastModified: new Date("2026-04-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/plan/salon`, lastModified: new Date("2026-04-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/plan/sejutsu`, lastModified: new Date("2026-04-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/plan/gym`, lastModified: new Date("2026-04-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/plan/photo`, lastModified: new Date("2026-04-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/plan/pet`, lastModified: new Date("2026-04-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/plan/counseling`, lastModified: new Date("2026-04-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date("2026-03-20"), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/tokusho`, lastModified: new Date("2026-04-20"), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/security`, lastModified: new Date("2026-04-04"), changeFrequency: "yearly" as const, priority: 0.5 },
  ];

  let columnPages: MetadataRoute.Sitemap = [];
  try {
    const columns = await prisma.column.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });
    columnPages = columns.map((col) => ({
      url: `${BASE_URL}/column/${col.slug}`,
      lastModified: col.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // DB unavailable — skip dynamic pages
  }

  return [...staticPages, ...columnPages];
}
