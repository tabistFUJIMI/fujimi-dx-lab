import type { MetadataRoute } from "next";

const BASE_URL = "https://fujimi-dx-lab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date("2026-03-20"), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/products/fujimin-pass`, lastModified: new Date("2026-03-18"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/products/reserve-navi`, lastModified: new Date("2026-03-18"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/products/ask-navi`, lastModified: new Date("2026-03-18"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/products/rule-navi`, lastModified: new Date("2026-03-18"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/products/shift-navi`, lastModified: new Date("2026-03-18"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/products/social-navi`, lastModified: new Date("2026-03-18"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date("2026-03-20"), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/lp/massage`, lastModified: new Date("2026-03-20"), changeFrequency: "monthly", priority: 0.8 },
  ];
}
