import { NextRequest, NextResponse } from "next/server";
import {
  extractPageData,
  extractNavLinks,
  checkExternalResources,
  runSeoChecks,
  quickSeoScore,
} from "@/lib/ai-checker/seo-checker";
import { summarizeJsonLd } from "@/lib/ai-checker/geo-checker";
import type { SitePageScore, SiteAnalysis } from "@/lib/ai-checker/types";

export const maxDuration = 60;

const PRIVATE_IP_PATTERNS = [
  /^127\./, /^10\./, /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./, /^0\./, /^169\.254\./,
  /^::1$/, /^fc00:/, /^fe80:/, /^localhost$/i,
];

function isPrivateHost(hostname: string): boolean {
  return PRIVATE_IP_PATTERNS.some((p) => p.test(hostname));
}

function validateUrl(input: string): URL | null {
  try {
    const url = new URL(input);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (isPrivateHost(url.hostname)) return null;
    return url;
  } catch {
    return null;
  }
}

async function fetchPage(pageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(pageUrl, {
      headers: {
        "User-Agent": "AITaisakuChecker/1.0 (FUJIMI DX Lab)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ja,en;q=0.9",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    return html.length > 5_000_000 ? html.slice(0, 5_000_000) : html;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawUrl = body?.url;

    if (!rawUrl || typeof rawUrl !== "string") {
      return NextResponse.json({ error: "URLを入力してください" }, { status: 400 });
    }

    let urlStr = rawUrl.trim();
    if (!urlStr.startsWith("http://") && !urlStr.startsWith("https://")) {
      urlStr = "https://" + urlStr;
    }

    const url = validateUrl(urlStr);
    if (!url) {
      return NextResponse.json({ error: "有効なURLを入力してください" }, { status: 400 });
    }

    // Step 1: Fetch the input page
    const html = await fetchPage(url.href);
    if (!html) {
      return NextResponse.json({ error: "ページの取得に失敗しました" }, { status: 400 });
    }

    // Step 2: Analyze the input page (full analysis)
    const pageData = extractPageData(url.href, html);
    const jsonLdSummary = summarizeJsonLd(pageData.jsonLd);
    const externalChecks = await checkExternalResources(url.href);
    const seoResult = runSeoChecks(pageData, externalChecks);

    // Step 3: Extract nav links for site-wide analysis
    const navLinks = extractNavLinks(html, url.href);

    // Step 4: Fetch & score up to 4 additional pages in parallel
    const pagesToCheck = navLinks.slice(0, 4);
    const sitePages: SitePageScore[] = [{
      url: url.href,
      title: pageData.title || url.href,
      score: seoResult.score,
      pageScore: seoResult.pageSeo.reduce((s, i) => s + i.score, 0),
      geoScore: seoResult.geoSeo.reduce((s, i) => s + i.score, 0),
    }];

    if (pagesToCheck.length > 0) {
      const results = await Promise.allSettled(
        pagesToCheck.map(async (pageUrl) => {
          const pageHtml = await fetchPage(pageUrl);
          if (!pageHtml) return null;
          const { score, pageScore, geoScore, title } = quickSeoScore(pageHtml, pageUrl);
          return { url: pageUrl, title: title || pageUrl, score, pageScore, geoScore } as SitePageScore;
        })
      );

      for (const r of results) {
        if (r.status === "fulfilled" && r.value) {
          sitePages.push(r.value);
        }
      }
    }

    // Step 5: Build site analysis
    const bestPage = sitePages.reduce((best, p) => p.score > best.score ? p : best, sitePages[0]);
    const averageScore = Math.round(sitePages.reduce((s, p) => s + p.score, 0) / sitePages.length);

    const siteAnalysis: SiteAnalysis = {
      pagesAnalyzed: sitePages.length,
      bestPage: bestPage.url !== url.href ? bestPage : null, // only show if different from input
      pages: sitePages,
      averageScore,
    };

    return NextResponse.json({
      url: url.href,
      analyzedAt: new Date().toISOString(),
      seo: seoResult,
      siteAnalysis,
      _pageData: {
        textContent: pageData.textContent,
        title: pageData.title,
        metaDescription: pageData.metaDescription,
        headings: pageData.headings,
        semanticElements: pageData.semanticElements,
        entityDefinitions: pageData.entityDefinitions.slice(0, 5),
        questionHeadings: pageData.questionHeadings.slice(0, 10),
        jsonLdSummary,
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "分析中にエラーが発生しました" }, { status: 500 });
  }
}
