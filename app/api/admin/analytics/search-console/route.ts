import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { requireAdmin } from '../../../../../lib/admin-auth'
import { getAuthenticatedClient } from '../../../../../lib/ga-auth'

const SITE_URL = process.env.SEARCH_CONSOLE_SITE_URL || 'https://fujimi-dx-lab.com'

export async function GET(request: NextRequest) {
  const authError = await requireAdmin()
  if (authError) return authError

  const period = request.nextUrl.searchParams.get('period') || '7'
  const days = parseInt(period, 10)

  try {
    const oauth2Client = await getAuthenticatedClient()
    if (!oauth2Client) {
      return NextResponse.json({ error: 'not_connected' }, { status: 401 })
    }

    const searchconsole = google.searchconsole({ version: 'v1', auth: oauth2Client })

    const endDate = new Date()
    // Search Consoleのデータは2-3日遅れるので、3日前までを取得
    endDate.setDate(endDate.getDate() - 3)
    const startDate = new Date(endDate)
    startDate.setDate(startDate.getDate() - days)

    const fmt = (d: Date) => d.toISOString().slice(0, 10)

    // 並行で取得
    const [queryData, pageData, deviceData, countryData, dailyData] = await Promise.all([
      // 検索キーワード
      searchconsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: fmt(startDate),
          endDate: fmt(endDate),
          dimensions: ['query'],
          rowLimit: 20,
          dataState: 'all',
        },
      }),
      // ページ別
      searchconsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: fmt(startDate),
          endDate: fmt(endDate),
          dimensions: ['page'],
          rowLimit: 20,
          dataState: 'all',
        },
      }),
      // デバイス別
      searchconsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: fmt(startDate),
          endDate: fmt(endDate),
          dimensions: ['device'],
          dataState: 'all',
        },
      }),
      // 国別
      searchconsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: fmt(startDate),
          endDate: fmt(endDate),
          dimensions: ['country'],
          rowLimit: 15,
          dataState: 'all',
        },
      }),
      // 日別推移
      searchconsole.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate: fmt(startDate),
          endDate: fmt(endDate),
          dimensions: ['date'],
          dataState: 'all',
        },
      }),
    ])

    const mapRow = (row: any) => ({
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    })

    const queries = (queryData.data.rows || []).map(row => ({
      query: row.keys?.[0] || '',
      ...mapRow(row),
    }))

    const pages = (pageData.data.rows || []).map(row => ({
      page: (row.keys?.[0] || '').replace(SITE_URL, ''),
      ...mapRow(row),
    }))

    const devices = (deviceData.data.rows || []).map(row => ({
      device: row.keys?.[0] || '',
      ...mapRow(row),
    }))

    const countries = (countryData.data.rows || []).map(row => ({
      country: row.keys?.[0] || '',
      ...mapRow(row),
    }))

    const daily = (dailyData.data.rows || []).map(row => ({
      date: row.keys?.[0] || '',
      ...mapRow(row),
    }))

    // 全体サマリー
    const totalClicks = queries.reduce((s, q) => s + q.clicks, 0)
    const totalImpressions = queries.reduce((s, q) => s + q.impressions, 0)
    const avgCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0
    const avgPosition = queries.length > 0
      ? queries.reduce((s, q) => s + q.position * q.impressions, 0) / totalImpressions
      : 0

    return NextResponse.json({
      period: days,
      summary: { totalClicks, totalImpressions, avgCtr, avgPosition },
      queries,
      pages,
      devices,
      countries,
      daily,
    })
  } catch (e: any) {
    console.error('Search Console API error:', e)
    if (e.message?.includes('is not a verified site')) {
      return NextResponse.json({
        error: 'not_verified',
        message: 'Search Consoleでサイトが未登録です。Google Search Consoleでサイトを登録してください。',
      }, { status: 400 })
    }
    return NextResponse.json({ error: 'api_error', message: e.message }, { status: 500 })
  }
}
