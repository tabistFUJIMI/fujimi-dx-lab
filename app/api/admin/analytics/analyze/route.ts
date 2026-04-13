import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { requireAdmin } from '../../../../../lib/admin-auth'
import { prisma } from '../../../../../lib/prisma'

const anthropic = new Anthropic()

export async function GET() {
  const authError = await requireAdmin()
  if (authError) return authError

  const reports = await prisma.analyticsReport.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
    select: { id: true, period: true, createdAt: true },
  })

  return NextResponse.json({ reports })
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin()
  if (authError) return authError

  try {
    const { analyticsData, searchConsoleData } = await request.json()

    // 過去のレポートを取得して比較材料に
    const previousReports = await prisma.analyticsReport.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: { period: true, analysis: true, createdAt: true },
    })

    const previousContext = previousReports.length > 0
      ? previousReports.map(r => `--- ${r.createdAt.toISOString().slice(0, 10)} (${r.period}日間) ---\n${r.analysis.slice(0, 500)}...`).join('\n\n')
      : ''

    const prompt = `あなたはWebサイトのアクセス解析の専門家です。
以下は「ふじみDXラボ」のGoogle Analyticsデータです。
データに基づいた具体的で実践的な分析を行ってください。

## サイト概要
- サイト名: ふじみDXラボ
- 業態: DX支援・コンサルティング

## アクセス解析データ（過去${analyticsData.period}日間）
${JSON.stringify(analyticsData, null, 2)}

${searchConsoleData ? `## Google Search Console データ（検索パフォーマンス）
${JSON.stringify(searchConsoleData, null, 2)}` : ''}

${previousContext ? `## 過去のAI分析レポート（比較用）\n${previousContext}\n` : ''}

以下の構成で分析レポートを作成してください。

## 1. 現状サマリー
数値に基づいた現在の状況を3行以内で。前回レポートがある場合は変化も述べる。

## 2. 良い点・成長の兆し
データから読み取れるポジティブな傾向。具体的な数値を引用して。

## 3. 課題・改善ポイント
直帰率、滞在時間、流入元バランス、ページ遷移など数値から見える課題。
- /admin系のアクセスはスタッフのものなので除外して考えること

## 4. アクションプラン（優先度順・3〜5個）
具体的かつ実践的な施策。各項目に：
- 何をするか（具体的な手順レベル）
- 期待される効果（数値目標）
- 実施の難易度と所要時間

## 5. コンバージョン分析
イベントデータから、コンバージョンの状況と改善点を分析。

## 6. ユーザー行動分析
スクロール深度、ページ遷移経路、ユーザー属性のデータがあれば分析。

## 7. SEO分析（Search Consoleデータがある場合）
検索キーワード・掲載順位・CTRから見えるSEOの状況。

## 8. 来週の注目KPI
次回レポート時に確認すべき指標3つと、各指標の目標値。

マークダウン形式で分かりやすく日本語で回答してください。
数値を引用する際は太字で強調してください。`

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    // レポートをDBに保存
    const report = await prisma.analyticsReport.create({
      data: {
        period: analyticsData.period,
        analyticsData: JSON.stringify(analyticsData),
        analysis: text,
      },
    })

    return NextResponse.json({ analysis: text, reportId: report.id })
  } catch (e: any) {
    console.error('AI Analysis error:', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
