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
  if (score >= 90) return "トップクラス";
  if (score >= 80) return "優秀";
  if (score >= 70) return "良好";
  if (score >= 50) return "改善の余地あり";
  if (score >= 30) return "要改善";
  return "対策が必要";
}

/**
 * スコアの現実的な上限を説明するメッセージ
 * AI検索は発展途上のため、100点は理論上も到達困難
 */
export function getScoreContext(score: number): string {
  if (score >= 85)
    return "業界トップレベルの対策です。AI検索の仕様は常に変化するため、継続的な改善が重要です。";
  if (score >= 70)
    return "基本的な対策はできています。あと数項目の改善で大きくスコアアップできます。";
  if (score >= 50)
    return "いくつかの重要な対策が不足しています。優先度の高い項目から取り組みましょう。";
  return "AI検索対策がほぼ未着手です。基本項目から始めることをおすすめします。";
}
