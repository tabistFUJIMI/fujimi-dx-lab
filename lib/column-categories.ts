/**
 * コラムカテゴリーの単一ソース定義。
 *
 * 以前は GEO/LLMO サブカテゴリ4種 (basics / ai-strategy / practice / case-study) で
 * 運用していたが、AI・DX・時事IT・地方中小ビジネスにも展開するため、
 * トップレベルを4つのテーマに整理。GEO/LLMO 内部の粒度は tags で管理する。
 */

export type ColumnCategoryValue =
  | "ai-geo-llmo"
  | "ai-dx"
  | "it-trends"
  | "local-business";

export interface ColumnCategory {
  value: ColumnCategoryValue;
  label: string;
  description: string;
  color: string; // Tailwind classes
}

export const COLUMN_CATEGORIES: ColumnCategory[] = [
  {
    value: "ai-geo-llmo",
    label: "AI検索・GEO/LLMO",
    description: "ChatGPT・Gemini・Perplexity・Claude等のAI検索に引用されるための対策",
    color: "bg-violet-100 text-violet-700",
  },
  {
    value: "ai-dx",
    label: "AI・DX推進",
    description: "AI活用による業務効率化・DX推進の実践知",
    color: "bg-blue-100 text-blue-700",
  },
  {
    value: "it-trends",
    label: "時事IT・業界ニュース",
    description: "最新IT動向・業界ニュースを中小事業者視点で解説",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    value: "local-business",
    label: "地方・中小事業者",
    description: "地方・中小事業者ならではのデジタル活用と成功事例",
    color: "bg-amber-100 text-amber-700",
  },
];

export const CATEGORY_LABEL_MAP: Record<string, string> = Object.fromEntries(
  COLUMN_CATEGORIES.map((c) => [c.value, c.label])
);

export const CATEGORY_COLOR_MAP: Record<string, string> = Object.fromEntries(
  COLUMN_CATEGORIES.map((c) => [c.value, c.color])
);

/**
 * 旧カテゴリ（basics / ai-strategy / practice / case-study）からの後方互換マッピング。
 * これら旧カテゴリは全て AI検索・GEO/LLMO 配下の記事だったので ai-geo-llmo に集約する。
 */
export function resolveCategory(raw: string): ColumnCategoryValue {
  if (["ai-geo-llmo", "ai-dx", "it-trends", "local-business"].includes(raw)) {
    return raw as ColumnCategoryValue;
  }
  return "ai-geo-llmo";
}
