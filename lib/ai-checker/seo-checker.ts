import * as cheerio from "cheerio";
import type {
  PageData,
  SeoResult,
  SeoCheckItem,
  JsonLdData,
  ExternalChecks,
  SitemapAnalysis,
} from "./types";

// Known AI crawlers to check in robots.txt
const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "ClaudeBot",
  "anthropic-ai",
  "Amazonbot",
  "CCBot",
  "PerplexityBot",
];

// Blog-like URL patterns
const BLOG_PATTERNS = [
  /\/blog\//i,
  /\/news\//i,
  /\/article/i,
  /\/post/i,
  /\/journal/i,
  /\/column/i,
  /\/magazine/i,
  /\/media\//i,
  /\/stories\//i,
];

// Extract page data from HTML
export function extractPageData(url: string, html: string): PageData {
  const $ = cheerio.load(html);

  const title = $("title").first().text().trim();
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() ?? "";

  const ogTags: Record<string, string> = {};
  $('meta[property^="og:"]').each((_, el) => {
    const prop = $(el).attr("property");
    const content = $(el).attr("content");
    if (prop && content) ogTags[prop] = content;
  });

  const twitterTags: Record<string, string> = {};
  $('meta[name^="twitter:"]').each((_, el) => {
    const name = $(el).attr("name");
    const content = $(el).attr("content");
    if (name && content) twitterTags[name] = content;
  });

  const headings: { level: number; text: string }[] = [];
  $("h1, h2, h3, h4, h5, h6").each((_, el) => {
    const tag = $(el).prop("tagName")?.toLowerCase() ?? "";
    const level = parseInt(tag.replace("h", ""), 10);
    const text = $(el).text().trim();
    if (text) headings.push({ level, text });
  });

  const jsonLd: JsonLdData[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const raw = JSON.parse($(el).html() ?? "{}");
      const type = raw["@type"] ?? "Unknown";
      if (Array.isArray(raw["@graph"])) {
        for (const item of raw["@graph"]) {
          jsonLd.push({ type: item["@type"] ?? "Unknown", raw: item });
        }
      } else {
        jsonLd.push({ type, raw });
      }
    } catch {
      // ignore invalid JSON-LD
    }
  });

  const canonical = $('link[rel="canonical"]').attr("href") ?? null;
  const robotsMeta = $('meta[name="robots"]').attr("content") ?? null;

  const images: { src: string; alt: string | null }[] = [];
  $("img").each((_, el) => {
    images.push({
      src: $(el).attr("src") ?? "",
      alt: $(el).attr("alt") ?? null,
    });
  });

  const hasViewport = $('meta[name="viewport"]').length > 0;
  const isHttps = url.startsWith("https://");

  const semanticElements = {
    article: $("article").length,
    section: $("section").length,
    nav: $("nav").length,
    main: $("main").length,
    aside: $("aside").length,
    details: $("details").length,
  };

  const textContent = $("body").text().replace(/\s+/g, " ").trim().slice(0, 3000);

  const entityDefinitions: string[] = [];
  $("p, li, dd").each((_, el) => {
    const text = $(el).text().trim();
    if (
      text.match(/は.{2,30}(です|である|の|を提供)/) ||
      text.match(/is\s+a\s+/i)
    ) {
      if (text.length < 200) entityDefinitions.push(text);
    }
  });

  const questionHeadings = headings
    .filter(
      (h) =>
        h.level >= 2 &&
        (h.text.includes("？") ||
          h.text.includes("?") ||
          h.text.includes("とは") ||
          h.text.includes("方法") ||
          h.text.includes("なぜ") ||
          h.text.includes("どう") ||
          h.text.match(/^(What|How|Why|When|Where|Who|Which)/i))
    )
    .map((h) => h.text);

  return {
    url,
    html,
    title,
    metaDescription,
    ogTags,
    twitterTags,
    headings,
    jsonLd,
    canonical,
    robotsMeta,
    images,
    hasViewport,
    isHttps,
    semanticElements,
    textContent,
    entityDefinitions,
    questionHeadings,
  };
}

// Extract navigation links from a page (for site-wide analysis)
export function extractNavLinks(html: string, baseUrl: string): string[] {
  const $ = cheerio.load(html);
  const origin = new URL(baseUrl).origin;
  const links = new Set<string>();

  // Get links from <nav> elements first
  $("nav a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (href) addLink(href, origin, links);
  });

  // If nav has too few links, also get header/footer links
  if (links.size < 3) {
    $("header a[href], footer a[href]").each((_, el) => {
      const href = $(el).attr("href");
      if (href) addLink(href, origin, links);
    });
  }

  // Remove the current page itself
  links.delete(baseUrl);
  links.delete(baseUrl.replace(/\/$/, ""));

  return [...links].slice(0, 10); // max 10 candidates
}

function addLink(href: string, origin: string, links: Set<string>) {
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;
  try {
    const url = new URL(href, origin);
    // Same origin only, no hash, no query params for simplicity
    if (url.origin === origin && !url.hash) {
      links.add(url.origin + url.pathname);
    }
  } catch {
    // ignore invalid URLs
  }
}

// Quick SEO score for a page (lightweight version for multi-page analysis)
export function quickSeoScore(html: string, url: string): { score: number; pageScore: number; geoScore: number; title: string } {
  const page = extractPageData(url, html);
  // Simplified scoring without external checks
  const dummyExternal: ExternalChecks = {
    sitemapExists: true, robotsTxtExists: true, llmsTxtExists: false,
    aiCrawlersBlocked: [], sitemap: null,
  };
  const result = runSeoChecks(page, dummyExternal);
  const pageScore = result.pageSeo.reduce((s, i) => s + i.score, 0);
  const geoScore = result.geoSeo.reduce((s, i) => s + i.score, 0);
  return { score: result.score, pageScore, geoScore, title: page.title };
}

// Parse sitemap.xml and analyze site structure
async function parseSitemap(origin: string): Promise<SitemapAnalysis | null> {
  try {
    const res = await fetch(`${origin}/sitemap.xml`, {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "AITaisakuChecker/1.0 (FUJIMI DX Lab)" },
    });
    if (!res.ok) return null;

    const xml = await res.text();
    const $ = cheerio.load(xml, { xmlMode: true });

    // Handle sitemap index (multiple sitemaps)
    const sitemapUrls: string[] = [];
    const lastmods: string[] = [];

    // Check if it's a sitemap index
    const sitemapLocs = $("sitemapindex > sitemap > loc");
    if (sitemapLocs.length > 0) {
      // Fetch first 3 child sitemaps
      const childUrls: string[] = [];
      sitemapLocs.each((i, el) => {
        if (i < 3) childUrls.push($(el).text().trim());
      });

      for (const childUrl of childUrls) {
        try {
          const childRes = await fetch(childUrl, {
            signal: AbortSignal.timeout(5000),
            headers: { "User-Agent": "AITaisakuChecker/1.0 (FUJIMI DX Lab)" },
          });
          if (childRes.ok) {
            const childXml = await childRes.text();
            const child$ = cheerio.load(childXml, { xmlMode: true });
            child$("url > loc").each((_, el) => {
              sitemapUrls.push(child$(el).text().trim());
            });
            child$("url > lastmod").each((_, el) => {
              const val = child$(el).text().trim();
              if (val) lastmods.push(val);
            });
          }
        } catch {
          // skip child sitemap errors
        }
      }
    } else {
      // Regular sitemap
      $("url > loc").each((_, el) => {
        sitemapUrls.push($(el).text().trim());
      });
      $("url > lastmod").each((_, el) => {
        const val = $(el).text().trim();
        if (val) lastmods.push(val);
      });
    }

    if (sitemapUrls.length === 0) return null;

    // Analyze URLs
    const totalPages = sitemapUrls.length;
    const blogPages = sitemapUrls.filter((u) =>
      BLOG_PATTERNS.some((p) => p.test(u))
    );
    const hasBlog = blogPages.length > 0;
    const blogPageCount = blogPages.length;

    // URL patterns (unique path segments)
    const patterns = new Set<string>();
    for (const u of sitemapUrls.slice(0, 100)) {
      try {
        const path = new URL(u).pathname;
        const firstSegment = path.split("/").filter(Boolean)[0];
        if (firstSegment) patterns.add("/" + firstSegment + "/");
      } catch {
        // skip
      }
    }
    const urlPatterns = [...patterns].slice(0, 10);

    // Freshness analysis
    const now = Date.now();
    const ninetyDaysAgo = now - 90 * 24 * 60 * 60 * 1000;
    let recentlyUpdated = 0;
    let lastModified: string | null = null;
    let oldestUpdate: string | null = null;

    const sortedMods = lastmods
      .map((d) => ({ raw: d, ts: new Date(d).getTime() }))
      .filter((d) => !isNaN(d.ts))
      .sort((a, b) => b.ts - a.ts);

    if (sortedMods.length > 0) {
      lastModified = sortedMods[0].raw;
      oldestUpdate = sortedMods[sortedMods.length - 1].raw;
      recentlyUpdated = sortedMods.filter((d) => d.ts >= ninetyDaysAgo).length;
    }

    const freshnessPct =
      sortedMods.length > 0
        ? Math.round((recentlyUpdated / sortedMods.length) * 100)
        : 0;

    return {
      totalPages,
      hasBlog,
      blogPageCount,
      urlPatterns,
      lastModified,
      recentlyUpdated,
      oldestUpdate,
      freshnessPct,
    };
  } catch {
    return null;
  }
}

// Check external resources
export async function checkExternalResources(
  url: string
): Promise<ExternalChecks> {
  const origin = new URL(url).origin;

  const [sitemapHeadRes, robotsRes, llmsRes, sitemapAnalysis] =
    await Promise.allSettled([
      fetch(`${origin}/sitemap.xml`, {
        method: "HEAD",
        signal: AbortSignal.timeout(5000),
      }),
      fetch(`${origin}/robots.txt`, { signal: AbortSignal.timeout(5000) }),
      fetch(`${origin}/llms.txt`, {
        method: "HEAD",
        signal: AbortSignal.timeout(5000),
      }),
      parseSitemap(origin),
    ]);

  const sitemapExists =
    sitemapHeadRes.status === "fulfilled" && sitemapHeadRes.value.ok;
  const robotsTxtExists =
    robotsRes.status === "fulfilled" && robotsRes.value.ok;
  const llmsTxtExists = llmsRes.status === "fulfilled" && llmsRes.value.ok;
  const sitemap =
    sitemapAnalysis.status === "fulfilled" ? sitemapAnalysis.value : null;

  const aiCrawlersBlocked: string[] = [];
  if (robotsRes.status === "fulfilled" && robotsRes.value.ok) {
    const robotsText = await robotsRes.value.text();
    for (const crawler of AI_CRAWLERS) {
      const pattern = new RegExp(
        `User-agent:\\s*${crawler}[\\s\\S]*?Disallow:\\s*/`,
        "i"
      );
      if (pattern.test(robotsText)) {
        aiCrawlersBlocked.push(crawler);
      }
    }
  }

  return {
    sitemapExists,
    robotsTxtExists,
    llmsTxtExists,
    aiCrawlersBlocked,
    sitemap,
  };
}

// Run all SEO checks
// Score: Page SEO (40) + Site SEO (20) + GEO Elements (40) = 100
export function runSeoChecks(
  page: PageData,
  external: ExternalChecks
): SeoResult {
  const pageSeo: SeoCheckItem[] = [];
  const siteSeo: SeoCheckItem[] = [];
  const geoSeo: SeoCheckItem[] = [];

  // === Page SEO (40 points) ===

  // Title (5 points)
  if (!page.title) {
    pageSeo.push(item("title", 0, 5, "bad", "titleタグがありません"));
  } else if (page.title.length < 30 || page.title.length > 60) {
    pageSeo.push(
      item("title", 3, 5, "warning", `titleの文字数: ${page.title.length}文字（推奨: 30〜60文字）`, page.title)
    );
  } else {
    pageSeo.push(item("title", 5, 5, "good", `title: ${page.title.length}文字`, page.title));
  }

  // Meta description (5 points)
  if (!page.metaDescription) {
    pageSeo.push(item("meta description", 0, 5, "bad", "meta descriptionがありません"));
  } else if (page.metaDescription.length < 70 || page.metaDescription.length > 160) {
    pageSeo.push(
      item("meta description", 3, 5, "warning", `meta descriptionの文字数: ${page.metaDescription.length}文字（推奨: 70〜160文字）`)
    );
  } else {
    pageSeo.push(item("meta description", 5, 5, "good", `meta description: ${page.metaDescription.length}文字`));
  }

  // OGP (4 points)
  const requiredOg = ["og:title", "og:description", "og:image", "og:url"];
  const ogCount = requiredOg.filter((k) => page.ogTags[k]).length;
  pageSeo.push(
    item("OGP", Math.round((ogCount / 4) * 4), 4, ogCount === 4 ? "good" : ogCount >= 2 ? "warning" : "bad",
      `OGPタグ: ${ogCount}/4 設定済み`, requiredOg.filter((k) => !page.ogTags[k]).join(", ") || undefined)
  );

  // Twitter Card (2 points)
  const hasTwitter = !!page.twitterTags["twitter:card"];
  pageSeo.push(item("Twitter Card", hasTwitter ? 2 : 0, 2, hasTwitter ? "good" : "warning",
    hasTwitter ? "Twitter Card設定あり" : "Twitter Cardが未設定"));

  // Heading structure (5 points)
  const h1Count = page.headings.filter((h) => h.level === 1).length;
  let headingScore = 5;
  const headingMessages: string[] = [];
  if (h1Count === 0) { headingScore -= 3; headingMessages.push("H1タグがありません"); }
  else if (h1Count > 1) { headingScore -= 1; headingMessages.push(`H1タグが${h1Count}個あります（推奨: 1個）`); }
  let prevLevel = 0;
  let skipFound = false;
  for (const h of page.headings) {
    if (h.level > prevLevel + 1 && prevLevel > 0 && !skipFound) {
      headingScore -= 1; headingMessages.push(`見出し階層スキップ: H${prevLevel} → H${h.level}`); skipFound = true;
    }
    prevLevel = h.level;
  }
  pageSeo.push(item("見出し構造", Math.max(0, headingScore), 5,
    headingScore >= 4 ? "good" : headingScore >= 2 ? "warning" : "bad",
    headingMessages.length > 0 ? headingMessages.join("、") : `H1: ${h1Count}個、見出し階層正常`));

  // Canonical (2 points)
  pageSeo.push(item("canonical", page.canonical ? 2 : 0, 2, page.canonical ? "good" : "warning",
    page.canonical ? "canonical設定あり" : "canonicalが未設定"));

  // Robots meta (2 points)
  const robotsOk = !page.robotsMeta || !page.robotsMeta.includes("noindex");
  pageSeo.push(item("robots meta", robotsOk ? 2 : 0, 2, robotsOk ? "good" : "bad",
    robotsOk ? "インデックス可能" : "noindex設定あり"));

  // Image alt (4 points)
  const totalImages = page.images.length;
  const imagesWithAlt = page.images.filter((img) => img.alt && img.alt.trim().length > 0).length;
  const altRatio = totalImages > 0 ? imagesWithAlt / totalImages : 1;
  pageSeo.push(item("画像alt属性", Math.round(altRatio * 4), 4,
    altRatio >= 0.8 ? "good" : altRatio >= 0.5 ? "warning" : "bad",
    totalImages > 0 ? `${imagesWithAlt}/${totalImages}の画像にalt属性あり（${Math.round(altRatio * 100)}%）` : "画像なし"));

  // Viewport (2 points)
  pageSeo.push(item("モバイル対応", page.hasViewport ? 2 : 0, 2, page.hasViewport ? "good" : "bad",
    page.hasViewport ? "viewport設定あり" : "viewportが未設定"));

  // HTTPS (2 points)
  pageSeo.push(item("HTTPS", page.isHttps ? 2 : 0, 2, page.isHttps ? "good" : "bad",
    page.isHttps ? "HTTPS通信" : "HTTPのみ（HTTPS推奨）"));

  // SSR/Static (3 points)
  const jsHeavy = page.textContent.length < 200 && !page.html.includes("<noscript");
  pageSeo.push(item("SSR/静的HTML", jsHeavy ? 0 : 3, 3, jsHeavy ? "warning" : "good",
    jsHeavy ? "JavaScript依存の可能性" : "サーバーサイドレンダリング/静的HTML"));

  // Semantic HTML (4 points) — moved from GEO to page SEO
  const sem = page.semanticElements;
  const semCount = (sem.article > 0 ? 1 : 0) + (sem.section > 0 ? 1 : 0) + (sem.nav > 0 ? 1 : 0) + (sem.main > 0 ? 1 : 0) + (sem.aside > 0 ? 1 : 0);
  const semScore = Math.min(4, semCount);
  pageSeo.push(item("セマンティックHTML", semScore, 4,
    semScore >= 3 ? "good" : semScore >= 2 ? "warning" : "bad",
    `検出: ${[sem.main > 0 ? "main" : null, sem.article > 0 ? "article" : null, sem.section > 0 ? `section(${sem.section})` : null, sem.nav > 0 ? "nav" : null, sem.aside > 0 ? "aside" : null].filter(Boolean).join(", ") || "セマンティック要素なし"}`));

  // === Site SEO (20 points) — Sitemap Analysis ===

  const sm = external.sitemap;

  // sitemap.xml existence (3 points)
  siteSeo.push(item("sitemap.xml", external.sitemapExists ? 3 : 0, 3,
    external.sitemapExists ? "good" : "warning",
    external.sitemapExists ? "sitemap.xml検出" : "sitemap.xmlが見つかりません"));

  // robots.txt existence (2 points)
  siteSeo.push(item("robots.txt", external.robotsTxtExists ? 2 : 0, 2,
    external.robotsTxtExists ? "good" : "warning",
    external.robotsTxtExists ? "robots.txt検出" : "robots.txtが見つかりません"));

  // Page count (4 points)
  if (sm) {
    let pageCountScore = 0;
    if (sm.totalPages >= 50) pageCountScore = 4;
    else if (sm.totalPages >= 20) pageCountScore = 3;
    else if (sm.totalPages >= 10) pageCountScore = 2;
    else if (sm.totalPages >= 3) pageCountScore = 1;
    siteSeo.push(item("サイト規模", pageCountScore, 4,
      pageCountScore >= 3 ? "good" : pageCountScore >= 2 ? "warning" : "bad",
      `${sm.totalPages}ページ検出${sm.urlPatterns.length > 0 ? `（構成: ${sm.urlPatterns.join(", ")}）` : ""}`));
  } else {
    siteSeo.push(item("サイト規模", 0, 4, "warning", "sitemap解析不可（ページ数不明）"));
  }

  // Blog/Content section (4 points)
  if (sm) {
    siteSeo.push(item("ブログ/コンテンツ", sm.hasBlog ? 4 : 0, 4,
      sm.hasBlog ? "good" : "bad",
      sm.hasBlog
        ? `ブログ/コンテンツセクション検出（${sm.blogPageCount}ページ）`
        : "ブログやコンテンツセクションが見つかりません（GEO/LLMO対策にはコンテンツ発信が重要）"));
  } else {
    siteSeo.push(item("ブログ/コンテンツ", 0, 4, "warning", "sitemap解析不可"));
  }

  // Update freshness (4 points)
  if (sm && sm.lastModified) {
    let freshnessScore = 0;
    if (sm.freshnessPct >= 50) freshnessScore = 4;
    else if (sm.freshnessPct >= 30) freshnessScore = 3;
    else if (sm.freshnessPct >= 10) freshnessScore = 2;
    else if (sm.recentlyUpdated > 0) freshnessScore = 1;

    const lastDate = sm.lastModified.slice(0, 10);
    siteSeo.push(item("更新頻度", freshnessScore, 4,
      freshnessScore >= 3 ? "good" : freshnessScore >= 1 ? "warning" : "bad",
      `最終更新: ${lastDate}、直近90日に${sm.recentlyUpdated}ページ更新（${sm.freshnessPct}%）`,
      sm.freshnessPct < 30 ? "GEO対策では90日以内のコンテンツ更新が推奨されています" : undefined));
  } else {
    siteSeo.push(item("更新頻度", 0, 4, "warning",
      "lastmod情報なし（sitemapに更新日が記載されていません）",
      "sitemapにlastmodを追加すると検索エンジン・AIクローラーに更新頻度を伝えられます"));
  }

  // URL structure quality (3 points)
  if (sm) {
    const hasCleanStructure = sm.urlPatterns.length >= 2;
    siteSeo.push(item("URL構造", hasCleanStructure ? 3 : 1, 3,
      hasCleanStructure ? "good" : "warning",
      `${sm.urlPatterns.length}カテゴリ検出: ${sm.urlPatterns.slice(0, 5).join(", ")}`));
  } else {
    siteSeo.push(item("URL構造", 0, 3, "warning", "sitemap解析不可"));
  }

  // === GEO Elements (40 points) ===
  // Each item includes an actionable guide + evidence level for non-technical users
  // Evidence levels:
  //   "confirmed"    = Google公式発表 or 大規模データで確定
  //   "observed"     = 効果が観察されているが公式未確認
  //   "experimental" = 実務者の経験則。効果未確認

  // JSON-LD structured data (10 points)
  const jsonLdTypes = page.jsonLd.map((j) => j.type);
  const geoSchemaTypes = ["Organization", "Article", "BlogPosting", "FAQPage", "Product", "BreadcrumbList", "Person", "WebApplication", "HowTo", "ItemList"];
  const foundTypes = geoSchemaTypes.filter((t) => jsonLdTypes.some((jt) => jt === t));
  let jsonLdScore = Math.min(10, foundTypes.length * 2);
  const hasTripleStack = jsonLdTypes.includes("Article") && jsonLdTypes.includes("FAQPage") &&
    (jsonLdTypes.includes("ItemList") || jsonLdTypes.includes("BreadcrumbList"));
  if (hasTripleStack) jsonLdScore = 10;
  geoSeo.push({
    ...item("構造化データ", jsonLdScore, 10,
      jsonLdScore >= 8 ? "good" : jsonLdScore >= 4 ? "warning" : "bad",
      foundTypes.length > 0
        ? `検出: ${foundTypes.join(", ")}${hasTripleStack ? "（トリプルスタッキング!）" : ""}`
        : "AIがサイトの内容を正しく理解するためのデータがありません"),
    action: jsonLdScore < 8 ? {
      what: "サイトの種類（会社情報・記事・FAQ）をAIに伝えるための「構造化データ」をページに追加してください。Web制作会社に「JSON-LDの構造化データを入れてほしい」と伝えればOKです。",
      difficulty: 2,
      impact: "Geminiが特に重視。AIがサイトの情報を正確に理解・引用できるようになります",
    } : undefined,
  });

  // Question-style headings (6 points)
  const qhCount = page.questionHeadings.length;
  const qhScore = Math.min(6, qhCount * 2);
  geoSeo.push({
    ...item("質問形式の見出し", qhScore, 6,
      qhScore >= 4 ? "good" : qhScore >= 2 ? "warning" : "bad",
      qhCount > 0 ? `${qhCount}個の質問形式見出し検出` : "お客様が検索しそうな質問形式の見出しがありません",
      qhCount > 0 ? page.questionHeadings.slice(0, 3).join(" / ") : undefined),
    action: qhScore < 4 ? {
      what: "ページの見出しを「〜とは？」「〜の方法」「〜の料金は？」のような質問形式に変えてください。例：「客室紹介」→「どんな客室がありますか？」。AIはユーザーの質問に答える形で情報を探すため、質問形式の見出しがあるとそのまま引用されやすくなります。",
      difficulty: 1,
      impact: "自分でできる最も効果的な対策の一つ。全AI検索エンジンに効果あり",
    } : undefined,
  });

  // FAQ/Q&A section (5 points)
  const hasFaqSchema = jsonLdTypes.includes("FAQPage");
  const hasDetails = page.semanticElements.details > 0;
  const faqScore = (hasFaqSchema ? 3 : 0) + (hasDetails ? 2 : 0);
  geoSeo.push({
    ...item("よくある質問（FAQ）", faqScore, 5,
      faqScore >= 3 ? "good" : faqScore >= 1 ? "warning" : "bad",
      faqScore >= 3 ? "FAQセクションが適切に設置されています"
        : "よくある質問のセクションがないか、AIが認識できる形式になっていません"),
    action: faqScore < 3 ? {
      what: "お客様からよく聞かれる質問と回答をまとめた「よくある質問」セクションをページに追加してください。5〜10問程度が目安です。開閉式（アコーディオン）にするとさらに効果的です。制作会社には「FAQセクションをJSON-LD付きで追加してほしい」と伝えてください。",
      difficulty: 1,
      impact: "AIが質問に対する回答としてあなたのサイトを引用する確率が大幅に上がります",
    } : undefined,
  });

  // llms.txt (5 points)
  geoSeo.push({
    ...item("llms.txt（AI向け案内）", external.llmsTxtExists ? 5 : 0, 5,
      external.llmsTxtExists ? "good" : "warning",
      external.llmsTxtExists
        ? "AI向けの案内ファイルが設置されています"
        : "AIに「このサイトは何か」を伝える案内ファイルがありません"),
    action: !external.llmsTxtExists ? {
      what: "サイトのルートに「llms.txt」というテキストファイルを置いてください。内容は、サイトの名前・何をしている会社か・どんなサービスを提供しているかを簡潔に書くだけです。AIクローラーがこのファイルを読んで、あなたのサイトを理解します。",
      difficulty: 1,
      impact: "設置するだけで「AIに配慮しているサイト」というシグナルになります。5分で対応可能",
    } : undefined,
  });

  // AI crawlers not blocked (5 points)
  const blocked = external.aiCrawlersBlocked;
  const aiCrawlerScore = blocked.length === 0 ? 5 : Math.max(0, 5 - blocked.length);
  geoSeo.push({
    ...item("AIクローラーの許可", aiCrawlerScore, 5,
      blocked.length === 0 ? "good" : blocked.length <= 2 ? "warning" : "bad",
      blocked.length === 0
        ? "ChatGPT・Gemini・Claude等のAIがサイトを読み取れる状態です"
        : `${blocked.join("・")}のAIがサイトを読み取れない設定になっています`),
    action: blocked.length > 0 ? {
      what: `robots.txtファイルで${blocked.join("・")}がブロックされています。制作会社に「AIクローラー（${blocked.join(", ")}）のブロックを解除してほしい」と伝えてください。`,
      difficulty: 2,
      impact: "ブロックされているAIの検索結果にあなたのサイトが表示されなくなります。解除は必須です",
    } : undefined,
  });

  // Entity definition (5 points)
  const entityScore = Math.min(5, page.entityDefinitions.length * 2);
  geoSeo.push({
    ...item("自己紹介文", entityScore, 5,
      entityScore >= 4 ? "good" : entityScore >= 2 ? "warning" : "bad",
      page.entityDefinitions.length > 0
        ? `AIが理解できる自己紹介が${page.entityDefinitions.length}か所あります`
        : "AIが「このサイトは何か」を理解するための説明文がありません",
      page.entityDefinitions.length > 0 ? page.entityDefinitions[0].slice(0, 100) : undefined),
    action: entityScore < 4 ? {
      what: "ページの目立つ場所に「〇〇は、△△を提供する□□です」という一文を入れてください。例：「当館は、静岡県富士市にあるビジネスホテル・宿泊施設です」。AIはこの形式の文章を見つけると、あなたの会社やサービスを正確に分類できます。",
      difficulty: 1,
      impact: "AIがあなたのサイトを「何の会社/サービスか」正しく認識できるようになります",
    } : undefined,
  });

  // Content depth indicator (4 points)
  const wordCount = page.textContent.split(/\s+/).length;
  let depthScore = 0;
  if (wordCount >= 1000) depthScore = 4;
  else if (wordCount >= 500) depthScore = 3;
  else if (wordCount >= 200) depthScore = 2;
  else if (wordCount >= 100) depthScore = 1;
  geoSeo.push({
    ...item("コンテンツの充実度", depthScore, 4,
      depthScore >= 3 ? "good" : depthScore >= 2 ? "warning" : "bad",
      depthScore >= 3
        ? `十分な情報量があります（約${wordCount}語）`
        : `情報量が少なめです（約${wordCount}語）`),
    action: depthScore < 3 ? {
      what: "ページの文章量を増やしてください。サービスの詳細、料金、特徴、お客様の声、アクセス方法など、具体的な情報を追加しましょう。数字やデータ（「駅から徒歩5分」「満足度95%」等）があるとAIに引用されやすくなります。",
      difficulty: 1,
      impact: "AIは薄いページより、具体的で詳細な情報があるページを優先的に引用します",
    } : undefined,
  });

  // Assign evidence levels to GEO items
  const evidenceMap: Record<string, "confirmed" | "observed" | "experimental"> = {
    "構造化データ": "observed",
    "質問形式の見出し": "observed",
    "よくある質問（FAQ）": "observed",
    "llms.txt（AI向け案内）": "experimental",
    "AIクローラーの許可": "confirmed",
    "自己紹介文": "observed",
    "コンテンツの充実度": "confirmed",
  };
  for (const g of geoSeo) {
    g.evidence = evidenceMap[g.name] || "observed";
  }

  const allItems = [...pageSeo, ...siteSeo, ...geoSeo];
  const totalScore = allItems.reduce((sum, i) => sum + i.score, 0);

  return { score: totalScore, items: allItems, pageSeo, siteSeo, geoSeo };
}

function item(
  name: string, score: number, maxScore: number,
  status: "good" | "warning" | "bad", message: string, detail?: string
): SeoCheckItem {
  return { name, score, maxScore, status, message, detail };
}
