import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "./prisma";

// モデル別の料金（USD per 1M tokens）
const MODEL_PRICING: Record<string, { input: number; output: number }> = {
  "claude-haiku-4-5-20251001": { input: 1.0, output: 5.0 },
  "claude-sonnet-4-6": { input: 3.0, output: 15.0 },
  "claude-opus-4-6": { input: 15.0, output: 75.0 },
};

function calculateCost(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const pricing = MODEL_PRICING[model] ?? { input: 3.0, output: 15.0 };
  return (
    (inputTokens / 1_000_000) * pricing.input +
    (outputTokens / 1_000_000) * pricing.output
  );
}

const client = new Anthropic();

/**
 * Claude APIを呼び出し、使用量をDBに記録するラッパー
 */
export async function callClaudeWithLogging(params: {
  feature: string;
  model: string;
  system?: string;
  messages: Anthropic.MessageParam[];
  max_tokens: number;
  targetUrl?: string;
}): Promise<Anthropic.Message> {
  const start = Date.now();
  let response: Anthropic.Message;
  try {
    response = await client.messages.create({
      model: params.model,
      max_tokens: params.max_tokens,
      system: params.system,
      messages: params.messages,
    });
  } catch (error) {
    // エラー時もログを残す（fire-and-forget）
    prisma.aiUsageLog
      .create({
        data: {
          feature: params.feature,
          model: params.model,
          inputTokens: 0,
          outputTokens: 0,
          costUsd: 0,
          targetUrl: params.targetUrl,
          durationMs: Date.now() - start,
          success: false,
          errorMessage:
            error instanceof Error ? error.message : String(error),
        },
      })
      .catch((logErr) => {
        // DB書き込みが失敗してもメイン処理をブロックしないが、観測できるようにログは残す
        console.error("[ai-cost-logger] failed to record error log:", logErr);
      });
    throw error;
  }

  const durationMs = Date.now() - start;
  const inputTokens = response.usage.input_tokens;
  const outputTokens = response.usage.output_tokens;
  const costUsd = calculateCost(params.model, inputTokens, outputTokens);

  // fire-and-forget でログ記録
  prisma.aiUsageLog
    .create({
      data: {
        feature: params.feature,
        model: params.model,
        inputTokens,
        outputTokens,
        costUsd,
        targetUrl: params.targetUrl,
        durationMs,
        success: true,
      },
    })
    .catch((err) => {
      console.error("AI usage log failed:", err);
    });

  return response;
}
