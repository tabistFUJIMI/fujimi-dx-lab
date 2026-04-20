import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '../../../../../../lib/admin-auth'
import { prisma } from '../../../../../../lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin()
  if (authError) return authError

  const { id } = await params

  const report = await prisma.analyticsReport.findUnique({
    where: { id },
  })

  if (!report) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  // DBに保存されている analyticsData は JSON 文字列。
  // 壊れた JSON が保存されていた場合にサーバー全体をクラッシュさせないよう保護。
  let analyticsData: unknown = null
  try {
    analyticsData = JSON.parse(report.analyticsData)
  } catch (error) {
    console.error('[analytics/analyze] JSON parse failed for report', report.id, error)
    analyticsData = null
  }

  return NextResponse.json({
    id: report.id,
    period: report.period,
    analyticsData,
    analysis: report.analysis,
    createdAt: report.createdAt,
  })
}
