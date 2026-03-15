/**
 * FUJIMI DX Lab HP用 画像生成スクリプト
 *
 * 使い方: OPENAI_API_KEY=sk-xxx node scripts/generate-images.mjs
 *
 * gpt-image-1 で以下の画像を生成:
 * 1. ヒーロー用イラスト（小規模事業者のDXイメージ）
 * 2. 各プロダクトのアイコンイラスト x5
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../public/images");

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Error: OPENAI_API_KEY が必要です");
  console.error("使い方: OPENAI_API_KEY=sk-xxx node scripts/generate-images.mjs");
  process.exit(1);
}

// 出力ディレクトリ作成
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const IMAGES = [
  {
    name: "hero-illustration",
    prompt: `A modern, clean isometric illustration for a Japanese small business DX (digital transformation) platform website hero section. Show a friendly, warm scene of a small shop owner (salon/restaurant/hotel) happily using a tablet/smartphone while their business runs smoothly in the background. Include subtle floating UI elements showing reservations, schedules, LINE messages, and charts. Color palette: soft blues, purples, and cyans with warm accents. Style: minimal, flat design with subtle gradients, NOT corporate/cold, but warm and approachable. White/transparent background. No text.`,
    size: "1536x1024",
  },
  {
    name: "reserve-navi",
    prompt: `A clean, minimal isometric illustration of a smartphone showing a LINE-based reservation booking interface. A small calendar icon and notification bell floating nearby. A happy customer tapping their phone to make a reservation. Color: blue theme (#3b82f6). Style: flat, friendly, modern. Transparent/white background. No text.`,
    size: "1024x1024",
  },
  {
    name: "ask-navi",
    prompt: `A clean, minimal isometric illustration of a LINE chat interface on a smartphone with an AI chatbot responding to customer questions. Speech bubbles showing friendly conversation. A small shop owner relaxing while AI handles inquiries. Color: amber/yellow theme (#f59e0b). Style: flat, friendly, modern. Transparent/white background. No text.`,
    size: "1024x1024",
  },
  {
    name: "shift-navi",
    prompt: `A clean, minimal isometric illustration showing a digital shift schedule calendar on a tablet. An AI sparkle icon auto-generating the schedule. A small employee using their smartphone to submit day-off requests. Color: emerald/green theme (#10b981). Style: flat, friendly, modern. Transparent/white background. No text.`,
    size: "1024x1024",
  },
  {
    name: "rule-navi",
    prompt: `A clean, minimal isometric illustration of a friendly AI assistant character emerging from a PDF/document, answering questions in natural conversation bubbles. A stack of rule books being transformed into a digital chatbot. Color: violet/purple theme (#8b5cf6). Style: flat, friendly, modern. Transparent/white background. No text.`,
    size: "1024x1024",
  },
  {
    name: "social-navi",
    prompt: `A clean, minimal isometric illustration of a unified social media dashboard showing Instagram, TikTok, X (Twitter), Facebook icons connected to one central management screen. AI generating captions. Scheduled posts on a timeline. Color: pink theme (#ec4899). Style: flat, friendly, modern. Transparent/white background. No text.`,
    size: "1024x1024",
  },
];

async function generateImage(imageConfig) {
  console.log(`Generating: ${imageConfig.name}...`);

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: imageConfig.prompt,
      n: 1,
      size: imageConfig.size,
      quality: "high",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Error generating ${imageConfig.name}:`, error);
    return;
  }

  const data = await response.json();

  // gpt-image-1 returns b64_json
  const b64 = data.data[0].b64_json;
  if (b64) {
    const buffer = Buffer.from(b64, "base64");
    const outputPath = path.join(OUTPUT_DIR, `${imageConfig.name}.png`);
    fs.writeFileSync(outputPath, buffer);
    console.log(`  Saved: ${outputPath}`);
  } else if (data.data[0].url) {
    // Fallback: download from URL
    const imgResponse = await fetch(data.data[0].url);
    const buffer = Buffer.from(await imgResponse.arrayBuffer());
    const outputPath = path.join(OUTPUT_DIR, `${imageConfig.name}.png`);
    fs.writeFileSync(outputPath, buffer);
    console.log(`  Saved: ${outputPath}`);
  }
}

async function main() {
  console.log("=== FUJIMI DX Lab 画像生成 ===\n");

  for (const img of IMAGES) {
    try {
      await generateImage(img);
    } catch (err) {
      console.error(`Failed: ${img.name}`, err.message);
    }
  }

  console.log("\n=== 完了 ===");
}

main();
