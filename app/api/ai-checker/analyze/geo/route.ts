import { NextRequest, NextResponse } from "next/server";
import { runGeoCheck } from "@/lib/ai-checker/geo-checker";
import type { PageData } from "@/lib/ai-checker/types";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageData } = body;

    if (!pageData) {
      return NextResponse.json({ error: "ページデータがありません" }, { status: 400 });
    }

    const page: PageData = {
      url: pageData.url || "",
      html: "",
      title: pageData.title || "",
      metaDescription: pageData.metaDescription || "",
      ogTags: {},
      twitterTags: {},
      headings: pageData.headings || [],
      jsonLd: [],
      canonical: null,
      robotsMeta: null,
      images: [],
      hasViewport: false,
      isHttps: false,
      semanticElements: pageData.semanticElements || {
        article: 0, section: 0, nav: 0, main: 0, aside: 0, details: 0,
      },
      textContent: pageData.textContent || "",
      entityDefinitions: pageData.entityDefinitions || [],
      questionHeadings: pageData.questionHeadings || [],
    };

    const geoResult = await runGeoCheck(page, pageData.jsonLdSummary || "");
    return NextResponse.json(geoResult);
  } catch (error) {
    console.error("GEO analysis error:", error);
    return NextResponse.json({ error: "AI分析中にエラーが発生しました" }, { status: 500 });
  }
}
