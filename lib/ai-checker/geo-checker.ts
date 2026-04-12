import Anthropic from "@anthropic-ai/sdk";
import type { PageData, JsonLdData, GeoResult, GeoImprovement } from "./types";

const client = new Anthropic();

function buildSystemPrompt(): string {
  const today = new Date().toISOString().slice(0, 10);
  return `あなたはWebサイトのAI検索対策をお手伝いするアドバイザーです。
今日の日付は ${today} です。日付の判断は必ずこの日付を基準にしてください。

サイト運営者にとってわかりやすい言葉で、サイトの構造面でAI検索エンジンに引用されやすくなるために「足りていないもの」をお伝えしてください。

## 大切なルール
- 上から目線にならない。「〜してください」「〜すべきです」ではなく「〜が見つかりませんでした」「〜があるとより効果的です」のような伝え方
- 技術用語はできるだけ避け、使う場合は簡単な説明を添える
- 改善提案は構造的に足りないものだけ。コンテンツの書き方まで踏み込まない
- 日付は ${today} が現在。2026年の日付は過去や現在であり、未来ではありません

## 評価基準
1. 引用されやすさ (0-30点): 具体的なデータ・数字の有無、外部ソースへの言及、明確な説明文の有無
2. AI理解しやすさ (0-25点): 情報の整理のされ方、見出しと本文の対応、セクションごとの独立性
3. E-E-A-T要素 (0-20点): 運営者情報、専門性の表明、実績の記載
4. コンテンツ鮮度 (0-10点): 更新日の表記、情報の新しさ
5. AI検索シミュレーション (0-15点): このページの主要トピックでAIに質問した場合、引用される可能性

## 出力ルール
- 各detailsは最大2項目。やさしい言葉で簡潔に
- 改善提案は最大5個。「構造的に足りないもの」に絞る
- 改善提案のtargetは対象AIエンジン（all/chatgpt/gemini/perplexity/claude）
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
  ]
}`;

export async function runGeoCheck(
  page: PageData,
  jsonLdSummary: string
): Promise<GeoResult> {
  const userPrompt = buildUserPrompt(page, jsonLdSummary);

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

function buildUserPrompt(page: PageData, jsonLdSummary: string): string {
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

  return {
    score,
    citability,
    aiReadability,
    eeat,
    freshness,
    aiSimulation,
    improvements,
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
