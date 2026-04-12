import type { SeoResult, GeoResult, AnalysisResult } from "./types";

export function calculateOverallScore(
  seo: SeoResult,
  geo: GeoResult
): number {
  // SEO is out of 100 (already scaled), GEO is out of 100
  // Overall = weighted average: SEO 40% + GEO 60% (GEO-focused tool)
  return Math.round(seo.score * 0.4 + geo.score * 0.6);
}

export function buildAnalysisResult(
  url: string,
  seo: SeoResult,
  geo: GeoResult
): AnalysisResult {
  return {
    url,
    analyzedAt: new Date().toISOString(),
    seo,
    geo,
    overallScore: calculateOverallScore(seo, geo),
  };
}

export function getScoreColor(score: number): "green" | "amber" | "red" {
  if (score >= 80) return "green";
  if (score >= 50) return "amber";
  return "red";
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return "優秀";
  if (score >= 80) return "良好";
  if (score >= 60) return "改善の余地あり";
  if (score >= 40) return "要改善";
  return "対策が必要";
}
