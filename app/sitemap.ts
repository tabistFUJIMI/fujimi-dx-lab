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
    { url: `${BASE_URL}/pricing`, lastModified: new Date("2026-04-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date("2026-03-20"), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/tokusho`, lastModified: new Date("2026-04-01"), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/security`, lastModified: new Date("2026-04-04"), changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${BASE_URL}/lp/massage`, lastModified: new Date("2026-03-20"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/lp/reserve-navi`, lastModified: new Date("2026-03-20"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/plan/salon`, lastModified: new Date("2026-03-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/plan/sejutsu`, lastModified: new Date("2026-03-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/plan/gym`, lastModified: new Date("2026-03-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/plan/hair`, lastModified: new Date("2026-03-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/plan/pet`, lastModified: new Date("2026-03-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/plan/photo`, lastModified: new Date("2026-03-20"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/plan/counseling`, lastModified: new Date("2026-03-20"), changeFrequency: "monthly", priority: 0.7 },
  ];
}
