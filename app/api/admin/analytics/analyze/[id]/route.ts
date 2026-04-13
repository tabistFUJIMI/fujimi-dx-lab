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

  return NextResponse.json({
    id: report.id,
    period: report.period,
    analyticsData: JSON.parse(report.analyticsData),
    analysis: report.analysis,
    createdAt: report.createdAt,
  })
}
