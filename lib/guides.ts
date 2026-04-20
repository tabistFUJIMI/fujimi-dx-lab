/**
 * /guides セクションのデータソース。
 *
 * 製品別の使い方ガイドは content/guides/<product>/<slug>.md にMarkdownで保存する。
 * 各ファイルは先頭にYAML風の frontmatter（--- で囲む）を持つ:
 *
 *   ---
 *   title: はじめに
 *   order: 1
 *   updatedAt: 2026-04-20
 *   description: ReserveNaviを初めて使う方向けの導入ガイド
 *   ---
 *
 *   (Markdown本文)
 *
 * DB不要。ファイル追加・編集だけでガイドが増えるので、
 * マニュアル的な多数の記事管理に適している。
 */

import fs from "node:fs";
import path from "node:path";

const GUIDES_ROOT = path.join(process.cwd(), "content", "guides");

export interface ProductGuideMeta {
  productSlug: string;
  productLabel: string;
  description: string;
  disabled?: boolean;
}

/**
 * 表示する製品とそのラベル。content/guides/<slug> ディレクトリが存在する製品のみ有効。
 */
export const PRODUCT_GUIDES: ProductGuideMeta[] = [
  {
    productSlug: "reserve-navi",
    productLabel: "Reserve Navi",
    description: "LINE予約管理システムの使い方ガイド",
  },
  {
    productSlug: "shift-navi",
    productLabel: "Shift Navi",
    description: "AIシフト管理ツールの使い方ガイド",
  },
  {
    productSlug: "ask-navi",
    productLabel: "Ask Navi",
    description: "LINE AI自動応答の使い方ガイド",
  },
  {
    productSlug: "rule-navi",
    productLabel: "Rule Navi",
    description: "社内規則AI検索の使い方ガイド",
  },
  {
    productSlug: "social-navi",
    productLabel: "Social Navi",
    description: "SNS一元管理の使い方ガイド",
  },
  {
    productSlug: "fujimin-pass",
    productLabel: "FUJIMIN PASS",
    description: "統合DXプラットフォームの使い方ガイド",
  },
  {
    productSlug: "forproject",
    productLabel: "ForProject",
    description: "プロジェクト管理ツールの使い方ガイド",
  },
];

export interface GuideFrontmatter {
  title: string;
  order?: number;
  updatedAt?: string;
  description?: string;
}

export interface Guide extends GuideFrontmatter {
  slug: string;
  productSlug: string;
  productLabel: string;
  content: string; // Markdown 本文（frontmatter除去済み）
}

export interface GuideListItem extends GuideFrontmatter {
  slug: string;
  productSlug: string;
}

/**
 * 簡易 YAML frontmatter パーサー（依存を増やさないための最小実装）。
 * 想定する値は文字列・数値のみ。複雑な構造は扱わない。
 */
function parseFrontmatter(raw: string): { data: GuideFrontmatter; content: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    return { data: { title: "" }, content: raw };
  }

  const [, frontmatterBlock, body] = match;
  const data: Record<string, string | number> = {};
  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    if (!key) continue;
    // クォートを剥がす
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    const asNumber = Number(value);
    data[key] = Number.isFinite(asNumber) && value !== "" && /^-?\d+(\.\d+)?$/.test(value) ? asNumber : value;
  }

  return {
    data: {
      title: String(data.title ?? ""),
      order: typeof data.order === "number" ? data.order : undefined,
      updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
      description: data.description ? String(data.description) : undefined,
    },
    content: body,
  };
}

/**
 * 指定した製品の全ガイド一覧を order 昇順で取得。
 */
export function listGuidesForProduct(productSlug: string): GuideListItem[] {
  const productDir = path.join(GUIDES_ROOT, productSlug);
  if (!fs.existsSync(productDir)) return [];

  const files = fs.readdirSync(productDir).filter((f) => f.endsWith(".md"));
  const guides = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(productDir, file), "utf8");
    const { data } = parseFrontmatter(raw);
    return {
      slug,
      productSlug,
      title: data.title || slug,
      description: data.description,
      updatedAt: data.updatedAt,
      order: data.order,
    } as GuideListItem;
  });

  return guides.sort((a, b) => {
    const ao = a.order ?? 999;
    const bo = b.order ?? 999;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title);
  });
}

/**
 * 特定のガイド記事を取得。なければ null。
 */
export function getGuide(productSlug: string, slug: string): Guide | null {
  const productDir = path.join(GUIDES_ROOT, productSlug);
  const filePath = path.join(productDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const product = PRODUCT_GUIDES.find((p) => p.productSlug === productSlug);
  if (!product) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseFrontmatter(raw);

  return {
    slug,
    productSlug,
    productLabel: product.productLabel,
    title: data.title || slug,
    description: data.description,
    updatedAt: data.updatedAt,
    order: data.order,
    content,
  };
}

/**
 * 全製品の静的パラメータ一覧（generateStaticParams用）。
 */
export function getAllGuidePaths(): { product: string; slug: string }[] {
  const paths: { product: string; slug: string }[] = [];
  for (const product of PRODUCT_GUIDES) {
    for (const guide of listGuidesForProduct(product.productSlug)) {
      paths.push({ product: product.productSlug, slug: guide.slug });
    }
  }
  return paths;
}
