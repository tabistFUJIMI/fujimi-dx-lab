import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { requireAdmin } from "../../../../lib/admin-auth";
import { getAuthenticatedClient } from "../../../../lib/ga-auth";

const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID || "";

export async function GET(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const auth = await getAuthenticatedClient();
  if (!auth) {
    return NextResponse.json({ error: "GA4未連携", needsAuth: true }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const periodRaw = parseInt(searchParams.get("period") || "7", 10);
  const period = String(Number.isFinite(periodRaw) && periodRaw >= 1 && periodRaw <= 365 ? periodRaw : 7);

  try {
    const analyticsData = google.analyticsdata({ version: "v1beta", auth });
    const response = await analyticsData.properties.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate: `${period}daysAgo`, endDate: "today" }],
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" },
        ],
        dimensions: [{ name: "date" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      },
    });

    // ページ別PV
    const pageResponse = await analyticsData.properties.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate: `${period}daysAgo`, endDate: "today" }],
        metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
        dimensions: [{ name: "pagePath" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: "20",
      },
    });

    // 流入元
    const sourceResponse = await analyticsData.properties.runReport({
      property: `properties/${GA_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate: `${period}daysAgo`, endDate: "today" }],
        metrics: [{ name: "sessions" }],
        dimensions: [{ name: "sessionSource" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: "10",
      },
    });

    return NextResponse.json({
      daily: response.data.rows || [],
      pages: pageResponse.data.rows || [],
      sources: sourceResponse.data.rows || [],
    });
  } catch (error) {
    console.error("GA4 API error:", error);
    return NextResponse.json({ error: "GA4データの取得に失敗しました" }, { status: 500 });
  }
}
