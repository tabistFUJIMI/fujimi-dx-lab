export type BotInfo = { name: string; tier: 'search' | 'ai' | 'sns' | 'seo' | 'other' }

const BOT_PATTERNS: { pattern: RegExp; name: string; tier: BotInfo['tier'] }[] = [
  // Tier 1: 検索エンジン
  { pattern: /Googlebot-Image/i, name: 'Googlebot-Image', tier: 'search' },
  { pattern: /Googlebot/i, name: 'Googlebot', tier: 'search' },
  { pattern: /bingbot/i, name: 'Bingbot', tier: 'search' },
  { pattern: /YandexBot/i, name: 'YandexBot', tier: 'search' },
  { pattern: /Baiduspider/i, name: 'Baiduspider', tier: 'search' },

  // Tier 2: AI検索（GEO/LLMO効果測定の核心）
  { pattern: /ChatGPT-User/i, name: 'ChatGPT-User', tier: 'ai' },
  { pattern: /OAI-SearchBot/i, name: 'OAI-SearchBot', tier: 'ai' },
  { pattern: /GPTBot/i, name: 'GPTBot', tier: 'ai' },
  { pattern: /ClaudeBot/i, name: 'ClaudeBot', tier: 'ai' },
  { pattern: /Claude-User/i, name: 'Claude-User', tier: 'ai' },
  { pattern: /Claude-SearchBot/i, name: 'Claude-SearchBot', tier: 'ai' },
  { pattern: /PerplexityBot/i, name: 'PerplexityBot', tier: 'ai' },
  { pattern: /Perplexity-User/i, name: 'Perplexity-User', tier: 'ai' },
  { pattern: /Google-Extended/i, name: 'Google-Extended', tier: 'ai' },
  { pattern: /Meta-ExternalAgent/i, name: 'Meta-ExternalAgent', tier: 'ai' },
  { pattern: /Bytespider/i, name: 'Bytespider', tier: 'ai' },
  { pattern: /Amazonbot/i, name: 'Amazonbot', tier: 'ai' },
  { pattern: /YouBot/i, name: 'YouBot', tier: 'ai' },
  { pattern: /cohere-ai/i, name: 'Cohere-ai', tier: 'ai' },
  { pattern: /CCBot/i, name: 'CCBot', tier: 'ai' },

  // Tier 3: SNS/プレビュー
  { pattern: /Twitterbot/i, name: 'Twitterbot', tier: 'sns' },
  { pattern: /facebookexternalhit/i, name: 'FacebookBot', tier: 'sns' },
  { pattern: /LinkedInBot/i, name: 'LinkedInBot', tier: 'sns' },
  { pattern: /Slackbot/i, name: 'Slackbot', tier: 'sns' },
  { pattern: /Discordbot/i, name: 'Discordbot', tier: 'sns' },
  { pattern: /Line\//i, name: 'LINEBot', tier: 'sns' },

  // Tier 4: SEOツール
  { pattern: /AhrefsBot/i, name: 'AhrefsBot', tier: 'seo' },
  { pattern: /SemrushBot/i, name: 'SemrushBot', tier: 'seo' },
  { pattern: /DotBot/i, name: 'DotBot', tier: 'seo' },
  { pattern: /Applebot/i, name: 'Applebot', tier: 'seo' },
]

const GENERIC_BOT = /bot|crawler|spider|scraper|fetch|wget|curl|python-requests/i

export function detectBot(userAgent: string | null): BotInfo | null {
  if (!userAgent) return null
  for (const { pattern, name, tier } of BOT_PATTERNS) {
    if (pattern.test(userAgent)) return { name, tier }
  }
  if (GENERIC_BOT.test(userAgent)) return { name: 'unknown-bot', tier: 'other' }
  return null
}
