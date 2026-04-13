import Anthropic from "@anthropic-ai/sdk";
import type { PageData, JsonLdData, GeoResult, GeoImprovement } from "./types";

const client = new Anthropic();

function buildSystemPrompt(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `あなたはWebサイトのSEO・AI検索対策をお手伝いするアドバイザーです。
今日の日付は ${today} です。日付の判断は必ずこの日付を基準にしてください。

## 前提（とても大事）
AI検索（ChatGPT、Gemini、Perplexity、Claude等）はまだ発展途上の技術です。
- 各AIの引用ロジックは非公開で、数ヶ月単位で大きく変わります
- 「これをやれば確実にAIに引用される」という確定的な手法は、現時点では存在しません
- ただし、良いSEO対策はそのままAI検索対策の土台になるという点は、業界の専門家がほぼ一致しています
- このチェックは「現時点で効果が期待できる構造」の目安を提示するものです

## 大切なルール
- 上から目線にならない。「〜が見つかりませんでした」「〜があるとより効果的かもしれません」のような伝え方
- 技術用語はできるだけ避け、使う場合は簡単な説明を添える
- 提案や指示はしない。構造的に足りないものを事実として伝えるだけ。コンテンツの書き方まで踏み込まない
- 断定を避ける。「〜するとAIに引用されます」ではなく「〜すると引用される可能性が高まると考えられています」
- 日付は ${today} が現在。2026年の日付は過去や現在であり、未来ではありません

## 評価基準
以下の観点で分析してください。SEO対策として確立された要素を重視し、AI検索固有の要素は「傾向として観察されている」という慎重なトーンで。

1. 引用されやすさ (0-30点): 具体的なデータ・数字の有無、外部ソースへの言及、明確な説明文の有無
2. AI理解しやすさ (0-25点): 情報の整理のされ方、見出しと本文の対応、セクションごとの独立性
3. E-E-A-T要素 (0-20点): 運営者情報、専門性の表明、実績の記載
4. コンテンツ鮮度 (0-10点): 更新日の表記、情報の新しさ
5. AI検索シミュレーション (0-15点): このページの主要トピックでAIに質問した場合、引用される可能性

## サイト構造の推測
ナビゲーションリンクとコンテンツから、このサイトの全体像を推測してください:
- サイトの種類（コーポレートサイト/ECサイト/メディア/ブログ/サービスサイト等）
- ブログやコンテンツセクションがありそうか
- サービス紹介ページがありそうか
- FAQがありそうか
- サイトの規模感（小規模/中規模/大規模）

## 出力ルール
- 各detailsは最大2項目。やさしい言葉で簡潔に
- 検証結果は最大5個。「構造的に足りないもの」を事実として伝えるだけ。提案や指示はしない
- 検証結果のtargetは関連するAIエンジン（all/chatgpt/gemini/perplexity/claude）
- 必ずJSON形式のみで出力。他のテキストは不要`;
}

const OUTPUT_FORMAT = `{
  "citability": {
    "score": <0-30>,
    "details": ["...", "..."]
  },
  "aiReadability": {
    "score": <0-25>,
    "details": ["...", "..."]
  },
  "eeat": {
    "score": <0-20>,
    "details": ["...", "..."]
  },
  "freshness": {
    "score": <0-10>,
    "details": ["...", "..."]
  },
  "aiSimulation": {
    "score": <0-15>,
    "details": ["主要トピック: ...", "引用可能性: 高/中/低", "理由: ..."]
  },
  "improvements": [
    {
      "priority": 1,
      "title": "...",
      "description": "...",
      "target": "all" | "chatgpt" | "gemini" | "perplexity" | "claude"
    }
  ],
  "siteStructure": {
    "siteType": "コーポレートサイト/ECサイト/メディア等",
    "hasBlog": true/false,
    "hasServicePages": true/false,
    "hasFaq": true/false,
    "estimatedScale": "小規模/中規模/大規模",
    "notes": "サイト構造に関する補足"
  }
}`;

export async function runGeoCheck(
  page: PageData,
  jsonLdSummary: string,
  navLinks?: string
): Promise<GeoResult> {
  const userPrompt = buildUserPrompt(page, jsonLdSummary, navLinks);

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2000,
      system: buildSystemPrompt(),
      messages: [{ role: "user", content: userPrompt }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Extract JSON from response, handling comments and trailing commas
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return fallbackResult("AI分析のレスポンス解析に失敗しました");
    }

    // Clean up common JSON issues from LLM output
    const cleaned = jsonMatch[0]
      .replace(/\/\/.*$/gm, "")          // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, "")  // Remove block comments
      .replace(/,\s*([}\]])/g, "$1")     // Remove trailing commas
      .replace(/<[^>]+>/g, "");           // Remove any HTML tags in values

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse failed. Raw text:", text.slice(0, 500));
      console.error("Cleaned text:", cleaned.slice(0, 500));
      console.error("Parse error:", parseErr);
      return fallbackResult("AI分析結果の解析に失敗しました");
    }
    return normalizeResult(parsed);
  } catch (error) {
    console.error("GEO check error:", error);
    return fallbackResult("AI分析中にエラーが発生しました");
  }
}

function buildUserPrompt(page: PageData, jsonLdSummary: string, navLinks?: string): string {
  const headingsText = page.headings
    .map((h) => `${"#".repeat(h.level)} ${h.text}`)
    .join("\n");

  return `## ページ情報
URL: ${page.url}
タイトル: ${page.title}
メタディスクリプション: ${page.metaDescription || "なし"}

## コンテンツ（先頭5000文字）
${page.textContent}

## 見出し構造
${headingsText || "見出しなし"}

## 構造化データ
${jsonLdSummary || "なし"}

## セマンティックHTML要素
article: ${page.semanticElements.article}, section: ${page.semanticElements.section}, nav: ${page.semanticElements.nav}, main: ${page.semanticElements.main}, details: ${page.semanticElements.details}

## エンティティ定義
${page.entityDefinitions.slice(0, 5).join("\n") || "なし"}

## 質問形式の見出し
${page.questionHeadings.slice(0, 10).join("\n") || "なし"}

## ナビゲーションリンク（サイト構造の推測に使用）
${jsonLdSummary ? "" : ""}${navLinks || "なし"}

## 出力形式
${OUTPUT_FORMAT}`;
}

function normalizeResult(parsed: Record<string, unknown>): GeoResult {
  const citability = normalizeCategory(parsed.citability, 30);
  const aiReadability = normalizeCategory(parsed.aiReadability, 25);
  const eeat = normalizeCategory(parsed.eeat, 20);
  const freshness = normalizeCategory(parsed.freshness, 10);
  const aiSimulation = normalizeCategory(parsed.aiSimulation, 15);

  const score =
    citability.score +
    aiReadability.score +
    eeat.score +
    freshness.score +
    aiSimulation.score;

  const improvements = normalizeImprovements(parsed.improvements);

  // Site structure inference
  const ss = parsed.siteStructure as Record<string, unknown> | undefined;
  const siteStructure = ss ? {
    siteType: String(ss.siteType || "不明"),
    hasBlog: Boolean(ss.hasBlog),
    hasServicePages: Boolean(ss.hasServicePages),
    hasFaq: Boolean(ss.hasFaq),
    estimatedScale: String(ss.estimatedScale || "不明"),
    notes: String(ss.notes || ""),
  } : undefined;

  return {
    score,
    citability,
    aiReadability,
    eeat,
    freshness,
    aiSimulation,
    improvements,
    siteStructure,
  };
}

function normalizeCategory(
  data: unknown,
  maxScore: number
): { score: number; maxScore: number; details: string[] } {
  if (!data || typeof data !== "object") {
    return { score: 0, maxScore, details: ["データなし"] };
  }
  const obj = data as Record<string, unknown>;
  const score = Math.min(
    maxScore,
    Math.max(0, typeof obj.score === "number" ? obj.score : 0)
  );
  const details = Array.isArray(obj.details)
    ? obj.details.map(String)
    : ["詳細なし"];
  return { score, maxScore, details };
}

function normalizeImprovements(data: unknown): GeoImprovement[] {
  if (!Array.isArray(data)) return [];
  return data.slice(0, 5).map((item, i) => ({
    priority: typeof item.priority === "number" ? item.priority : i + 1,
    title: String(item.title || "改善提案"),
    description: String(item.description || ""),
    target: validateTarget(item.target),
  }));
}

function validateTarget(
  target: unknown
): "chatgpt" | "gemini" | "perplexity" | "claude" | "all" {
  const valid = ["chatgpt", "gemini", "perplexity", "claude", "all"];
  return valid.includes(target as string)
    ? (target as "chatgpt" | "gemini" | "perplexity" | "claude" | "all")
    : "all";
}

function fallbackResult(message: string): GeoResult {
  return {
    score: 0,
    citability: { score: 0, maxScore: 30, details: [message] },
    aiReadability: { score: 0, maxScore: 25, details: [message] },
    eeat: { score: 0, maxScore: 20, details: [message] },
    freshness: { score: 0, maxScore: 10, details: [message] },
    aiSimulation: { score: 0, maxScore: 15, details: [message] },
    improvements: [],
  };
}

// Summarize JSON-LD for the prompt
export function summarizeJsonLd(jsonLd: JsonLdData[]): string {
  if (jsonLd.length === 0) return "なし";
  return jsonLd
    .map((j) => {
      const summary: string[] = [`@type: ${j.type}`];
      if (j.raw.name) summary.push(`name: ${j.raw.name}`);
      if (j.raw.description)
        summary.push(
          `description: ${String(j.raw.description).slice(0, 100)}`
        );
      return summary.join(", ");
    })
    .join("\n");
}
