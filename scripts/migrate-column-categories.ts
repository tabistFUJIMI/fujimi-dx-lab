/**
 * コラムカテゴリ再編に伴うDBマイグレーションスクリプト。
 *
 * 旧カテゴリ（basics / ai-strategy / practice / case-study）の記事は
 * すべて AI検索・GEO/LLMO 配下だったため、`ai-geo-llmo` に集約する。
 * 旧カテゴリ名は tags に保持して後で絞り込み可能にする。
 *
 * 使い方:
 *   DATABASE_URL=... npx tsx scripts/migrate-column-categories.ts
 */

import { prisma } from "../lib/prisma";

const OLD_CATEGORIES = ["basics", "ai-strategy", "practice", "case-study"];

async function main() {
  const targets = await prisma.column.findMany({
    where: { category: { in: OLD_CATEGORIES } },
    select: { id: true, slug: true, category: true, tags: true, title: true },
  });

  console.log(`[migrate] 対象記事数: ${targets.length}`);
  if (targets.length === 0) {
    console.log("[migrate] 移行対象なし");
    return;
  }

  for (const article of targets) {
    const oldCategory = article.category;
    // 旧カテゴリ名を tags に追加（既にあればスキップ）
    const newTags = Array.from(new Set([...article.tags, oldCategory]));

    await prisma.column.update({
      where: { id: article.id },
      data: {
        category: "ai-geo-llmo",
        tags: newTags,
      },
    });

    console.log(
      `[migrate] ${article.slug}: ${oldCategory} → ai-geo-llmo (tags: ${newTags.join(", ")})`
    );
  }

  console.log(`[migrate] 完了: ${targets.length}件更新`);
}

main()
  .catch((err) => {
    console.error("[migrate] エラー:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
