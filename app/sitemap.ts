import type { MetadataRoute } from "next";

const BASE_URL = "https://fujimi-dx-lab.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: BASE_URL, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/products/fujimin-pass`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/products/reserve-navi`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/products/ask-navi`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/products/rule-navi`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/products/shift-navi`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/products/social-navi`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
