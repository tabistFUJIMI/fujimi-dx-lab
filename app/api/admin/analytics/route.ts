import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { requireAdmin } from '../../../../lib/admin-auth'
import { getAuthenticatedClient } from '../../../../lib/ga-auth'

const PROPERTY_ID = process.env.GA_PROPERTY_ID || ''

async function runReport(analyticsData: any, params: {
  dateRanges: { startDate: string; endDate: string }[]
  dimensions?: { name: string }[]
  metrics: { name: string }[]
  orderBys?: any[]
  limit?: number
}) {
  const res = await analyticsData.properties.runReport({
    property: `properties/${PROPERTY_ID}`,
    requestBody: params,
  })
  return res.data
}

function parseRows(data: any, dimCount: number) {
  return (data.rows || []).map((row: any) => ({
    dims: Array.from({ length: dimCount }, (_, i) => row.dimensionValues?.[i]?.value || ''),
    vals: (row.metricValues || []).map((v: any) => v.value || '0'),
  }))
}

export async function GET(request: NextRequest) {
  const authError = await requireAdmin()
  if (authError) return authError

  const period = request.nextUrl.searchParams.get('period') || '7'
  const days = parseInt(period, 10)

  try {
    const oauth2Client = await getAuthenticatedClient()
    if (!oauth2Client) {
      return NextResponse.json({ error: 'not_connected', message: 'Google Analytics未連携' }, { status: 401 })
    }

    const analyticsData = google.analyticsdata({ version: 'v1beta', auth: oauth2Client })
    const dateRanges = [{ startDate: `${days}daysAgo`, endDate: 'today' }]

    const [
      overview, pages, sources, devices, countries, cities,
      browsers, os, landing, hourly, daily, userType,
      events, ageGender, pageFlow
    ] = await Promise.all([
      // 概要
      runReport(analyticsData, {
        dateRanges,
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
          { name: 'newUsers' },
          { name: 'engagedSessions' },
          { name: 'screenPageViewsPerSession' },
          { name: 'eventCount' },
        ],
      }),
      // ページ別
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'activeUsers' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
        ],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 20,
      }),
      // 流入元
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'engagedSessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),
      // デバイス
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
      }),
      // 国別
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 15,
      }),
      // 都市別
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'city' }, { name: 'country' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 15,
      }),
      // ブラウザ
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'browser' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),
      // OS
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'operatingSystem' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),
      // ランディングページ
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'landingPagePlusQueryString' }],
        metrics: [{ name: 'sessions' }, { name: 'bounceRate' }, { name: 'averageSessionDuration' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10,
      }),
      // 時間帯別
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'hour' }],
        metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
        orderBys: [{ dimension: { dimensionName: 'hour' } }],
      }),
      // 日別
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'newUsers' },
        ],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),
      // 新規 vs リピーター
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'newVsReturning' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'averageSessionDuration' }],
      }),
      // イベント別
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
        limit: 20,
      }),
      // ユーザー属性（年齢x性別）
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'userAgeBracket' }, { name: 'userGender' }],
        metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 20,
      }),
      // ページ遷移経路
      runReport(analyticsData, {
        dateRanges,
        dimensions: [{ name: 'pageReferrer' }, { name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 20,
      }),
    ])

    const ov = overview.rows?.[0]
    const overviewData = {
      activeUsers: parseInt(ov?.metricValues?.[0]?.value || '0'),
      pageViews: parseInt(ov?.metricValues?.[1]?.value || '0'),
      sessions: parseInt(ov?.metricValues?.[2]?.value || '0'),
      avgSessionDuration: parseFloat(ov?.metricValues?.[3]?.value || '0'),
      bounceRate: parseFloat(ov?.metricValues?.[4]?.value || '0'),
      newUsers: parseInt(ov?.metricValues?.[5]?.value || '0'),
      engagedSessions: parseInt(ov?.metricValues?.[6]?.value || '0'),
      pagesPerSession: parseFloat(ov?.metricValues?.[7]?.value || '0'),
      eventCount: parseInt(ov?.metricValues?.[8]?.value || '0'),
    }

    const pagesData = parseRows(pages, 2).map((r: any) => ({
      path: r.dims[0], title: r.dims[1],
      views: parseInt(r.vals[0]), users: parseInt(r.vals[1]),
      avgDuration: parseFloat(r.vals[2]), bounceRate: parseFloat(r.vals[3]),
    }))

    const sourcesData = parseRows(sources, 1).map((r: any) => ({
      channel: r.dims[0], sessions: parseInt(r.vals[0]),
      users: parseInt(r.vals[1]), engagedSessions: parseInt(r.vals[2]),
    }))

    const devicesData = parseRows(devices, 1).map((r: any) => ({
      device: r.dims[0], sessions: parseInt(r.vals[0]), users: parseInt(r.vals[1]),
    }))

    const countriesData = parseRows(countries, 1).map((r: any) => ({
      country: r.dims[0], sessions: parseInt(r.vals[0]), users: parseInt(r.vals[1]),
    }))

    const citiesData = parseRows(cities, 2).map((r: any) => ({
      city: r.dims[0], country: r.dims[1],
      sessions: parseInt(r.vals[0]), users: parseInt(r.vals[1]),
    }))

    const browsersData = parseRows(browsers, 1).map((r: any) => ({
      browser: r.dims[0], sessions: parseInt(r.vals[0]), users: parseInt(r.vals[1]),
    }))

    const osData = parseRows(os, 1).map((r: any) => ({
      os: r.dims[0], sessions: parseInt(r.vals[0]), users: parseInt(r.vals[1]),
    }))

    const landingData = parseRows(landing, 1).map((r: any) => ({
      page: r.dims[0], sessions: parseInt(r.vals[0]),
      bounceRate: parseFloat(r.vals[1]), avgDuration: parseFloat(r.vals[2]),
    }))

    const hourlyData = parseRows(hourly, 1).map((r: any) => ({
      hour: parseInt(r.dims[0]), users: parseInt(r.vals[0]), sessions: parseInt(r.vals[1]),
    }))

    const dailyData = parseRows(daily, 1).map((r: any) => {
      const d = r.dims[0]
      return {
        date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`,
        users: parseInt(r.vals[0]), pageViews: parseInt(r.vals[1]),
        sessions: parseInt(r.vals[2]), newUsers: parseInt(r.vals[3]),
      }
    })

    const userTypeData = parseRows(userType, 1).map((r: any) => ({
      type: r.dims[0], sessions: parseInt(r.vals[0]),
      users: parseInt(r.vals[1]), avgDuration: parseFloat(r.vals[2]),
    }))

    const eventsData = parseRows(events, 1).map((r: any) => ({
      name: r.dims[0], count: parseInt(r.vals[0]), users: parseInt(r.vals[1]),
    }))

    const ageGenderData = parseRows(ageGender, 2).map((r: any) => ({
      age: r.dims[0], gender: r.dims[1],
      users: parseInt(r.vals[0]), sessions: parseInt(r.vals[1]),
    }))

    const pageFlowData = parseRows(pageFlow, 2).map((r: any) => ({
      from: r.dims[0], to: r.dims[1], views: parseInt(r.vals[0]),
    }))

    return NextResponse.json({
      period: days,
      overview: overviewData,
      pages: pagesData,
      sources: sourcesData,
      devices: devicesData,
      countries: countriesData,
      cities: citiesData,
      browsers: browsersData,
      os: osData,
      landing: landingData,
      hourly: hourlyData,
      daily: dailyData,
      userType: userTypeData,
      events: eventsData,
      ageGender: ageGenderData,
      pageFlow: pageFlowData,
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    console.error('GA Data API error:', message)
    if (message.includes('invalid_grant') || message.includes('Token has been expired')) {
      return NextResponse.json({ error: 'token_expired', message: '再認証が必要です' }, { status: 401 })
    }
    return NextResponse.json({ error: 'api_error', message: 'アナリティクスデータの取得に失敗しました' }, { status: 500 })
  }
}
