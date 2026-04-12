import Anthropic from "@anthropic-ai/sdk";
import type { PageData, JsonLdData, GeoResult, GeoImprovement } from "./types";

const client = new Anthropic();

const SYSTEM_PROMPT = `あなたはSEO/GEO/LLMO専門のWebコンテンツアナリストです。
WebページのコンテンツをGEO（Generative Engine Optimization）とLLMO（Large Language Model Optimization）の観点から分析し、
AI検索エンジン（ChatGPT、Perplexity、Gemini、Claude等）での引用されやすさを評価してください。

評価基準:
1. 引用されやすさ (0-30点): 統計・数値データの具体性、外部ソースの引用、明確な定義文の有無
2. AI理解しやすさ (0-25点): 逆ピラミッド構造（冒頭に結論）、代名詞の回避、論理的な情報の流れ、1000文字チャンクで独立して意味が通るか（RAG対策）
3. E-E-A-T要素 (0-20点): 著者情報、専門性の表明、経験の記述、資格・肩書き
4. コンテンツ鮮度 (0-10点): 最終更新日の有無、日付付きデータの新しさ
5. AI検索シミュレーション (0-15点): 主要トピックについてAIに質問された場合、このページが引用される可能性

各detailsは最大2項目に簡潔に。改善提案は最大3個、優先度順に。各AI検索エンジン別の対策を含めてください:
- ChatGPT: 公式サイトの信頼性（38%が公式サイトを引用）
- Gemini: Google検索インデックス・構造化データ重視
- Perplexity: 公式サイト＋ディレクトリの混合から安定的に引用
- Claude: UGC・レビュー・評判シグナルを2〜4倍重視

必ず以下のJSON形式で出力してください。JSONのみ、他のテキストは不要です。`;

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
      system: SYSTEM_PROMPT,
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
