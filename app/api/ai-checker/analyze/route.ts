import { NextRequest, NextResponse } from "next/server";
import {
  extractPageData,
  checkExternalResources,
  runSeoChecks,
} from "@/lib/ai-checker/seo-checker";
import { summarizeJsonLd } from "@/lib/ai-checker/geo-checker";

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

    let html: string;
    try {
      const response = await fetch(url.href, {
        headers: {
          "User-Agent": "AITaisakuChecker/1.0 (FUJIMI DX Lab)",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "ja,en;q=0.9",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(10_000),
      });

      if (!response.ok) {
        return NextResponse.json({ error: `ページの取得に失敗しました（HTTP ${response.status}）` }, { status: 400 });
      }

      const contentLength = response.headers.get("content-length");
      if (contentLength && parseInt(contentLength) > 5_000_000) {
        return NextResponse.json({ error: "ページサイズが大きすぎます（5MB上限）" }, { status: 400 });
      }

      html = await response.text();
      if (html.length > 5_000_000) html = html.slice(0, 5_000_000);
    } catch (error) {
      const message = error instanceof Error && error.name === "TimeoutError"
        ? "ページの取得がタイムアウトしました（10秒）" : "ページの取得に失敗しました";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const pageData = extractPageData(url.href, html);
    const jsonLdSummary = summarizeJsonLd(pageData.jsonLd);
    const externalChecks = await checkExternalResources(url.href);
    const seoResult = runSeoChecks(pageData, externalChecks);

    return NextResponse.json({
      url: url.href,
      analyzedAt: new Date().toISOString(),
      seo: seoResult,
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
