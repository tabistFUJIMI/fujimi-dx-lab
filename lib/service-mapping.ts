/**
 * FUJIMI DX Lab サービス一覧とコラム記事タグのマッピング。
 *
 * コラム記事の末尾に「この記事に関連するサービス」として
 * 自動表示するためのマスタ定義。
 *
 * matchTags: コラム記事の tags と重なれば関連候補として浮上
 * priority: 複数マッチした時の優先順位（低いほど上位）
 */

export interface Service {
  id: string;
  name: string;
  href: string;
  tagline: string; // 短いキャッチ（20-30字）
  pitch: string; // 説明文（40-60字）
  emoji: string;
  matchTags: string[];
  priority?: number; // デフォルト 100
}

export const SERVICES: Service[] = [
  {
    id: "ai-checker",
    name: "AI対策チェッカー",
    href: "/tools/ai-checker",
    tagline: "あなたのサイトのAI可視性を無料診断",
    pitch:
      "SEO・GEO・LLMOスコアを30秒で計測。ChatGPTやGemini に引用される可能性を数値化。",
    emoji: "🔍",
    matchTags: [
      "AI検索",
      "AI対策",
      "GEO",
      "LLMO",
      "AEO",
      "ChatGPT",
      "Gemini",
      "Perplexity",
      "AI Overview",
      "AI引用",
      "AI citation",
    ],
    priority: 10,
  },
  {
    id: "reserve-navi",
    name: "Reserve Navi",
    href: "/products/reserve-navi",
    tagline: "手数料ゼロの自社予約システム",
    pitch:
      "OTA手数料から脱却。LINEだけに頼らない、Web予約の入口を作る。AI時代に見つけてもらう第一歩。",
    emoji: "📅",
    matchTags: [
      "予約",
      "予約システム",
      "Web予約",
      "OTA",
      "LINE予約",
      "OTA手数料",
      "じゃらん",
      "楽天トラベル",
      "食べログ",
      "ホットペッパー",
      "店舗集客",
    ],
    priority: 20,
  },
  {
    id: "ask-navi",
    name: "Ask Navi",
    href: "/products/ask-navi",
    tagline: "AIがお客様の質問に24時間対応",
    pitch:
      "FAQの自動応答で、深夜や繁忙期もお客様を逃さない。LINE公式アカウントにも連携可能。",
    emoji: "💬",
    matchTags: [
      "AI接客",
      "FAQ",
      "チャットボット",
      "LINE",
      "自動応答",
      "接客DX",
      "問い合わせ",
    ],
    priority: 30,
  },
  {
    id: "rule-navi",
    name: "Rule Navi",
    href: "/products/rule-navi",
    tagline: "就業規則をAIがサポート",
    pitch:
      "複雑な就業規則をAIが整理。従業員からの質問に自動で正確な回答を返します。",
    emoji: "📋",
    matchTags: ["就業規則", "労務", "従業員", "人事", "規定", "コンプライアンス"],
    priority: 40,
  },
  {
    id: "shift-navi",
    name: "Shift Navi",
    href: "/products/shift-navi",
    tagline: "シフト管理をラクに",
    pitch:
      "手書き・エクセル管理から卒業。従業員の希望を集めて最適なシフトを自動作成。",
    emoji: "🗓",
    matchTags: [
      "シフト",
      "シフト管理",
      "従業員",
      "勤怠",
      "人手不足",
      "スタッフ管理",
    ],
    priority: 50,
  },
  {
    id: "social-navi",
    name: "Social Navi",
    href: "/products/social-navi",
    tagline: "SNS運用をAIで効率化",
    pitch:
      "Instagram・X・LINEへの投稿を一括管理。AIが投稿文やハッシュタグも提案。",
    emoji: "📱",
    matchTags: [
      "SNS",
      "Instagram",
      "X",
      "Twitter",
      "SNS運用",
      "投稿",
      "ハッシュタグ",
    ],
    priority: 60,
  },
  {
    id: "fujimin-pass",
    name: "FUJIMIN PASS",
    href: "/products/fujimin-pass",
    tagline: "FUJIMI シリーズの SaaS 基盤",
    pitch:
      "Reserve Navi / Ask Navi / Shift Navi 等のサービスを1つのアカウントで横断利用。",
    emoji: "🎫",
    matchTags: ["FUJIMIN PASS", "SaaS", "認証", "SSO", "ポイント", "共通アカウント"],
    priority: 70,
  },
  {
    id: "forproject",
    name: "ForProject",
    href: "/products/forproject",
    tagline: "プロジェクト管理PWA",
    pitch:
      "個人・小チーム向けのシンプルなプロジェクト管理。月額ワンコインで使える。",
    emoji: "✅",
    matchTags: [
      "プロジェクト管理",
      "タスク管理",
      "PWA",
      "個人事業主",
      "フリーランス",
    ],
    priority: 80,
  },
];

/**
 * コラム記事のタグから、関連度の高いサービスを取得する。
 *
 * @param articleTags 記事のタグ配列
 * @param limit 最大表示数（デフォルト 2）
 * @returns 関連度順のサービス配列
 */
export function getRelatedServices(
  articleTags: string[],
  limit = 2
): Service[] {
  if (!articleTags || articleTags.length === 0) return [];

  const scored = SERVICES.map((service) => {
    const overlap = service.matchTags.filter((tag) =>
      articleTags.some(
        (articleTag) =>
          articleTag.toLowerCase() === tag.toLowerCase() ||
          articleTag.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(articleTag.toLowerCase())
      )
    ).length;

    return {
      service,
      score: overlap,
      priority: service.priority ?? 100,
    };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => {
      // スコア降順 → 優先度昇順
      if (b.score !== a.score) return b.score - a.score;
      return a.priority - b.priority;
    })
    .slice(0, limit)
    .map((s) => s.service);
}
