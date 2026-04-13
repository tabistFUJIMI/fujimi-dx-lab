'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronLeft, BarChart3, Users, Eye, Clock, ArrowUpRight, Monitor, Smartphone, Tablet,
  RefreshCw, ExternalLink, Globe, MapPin, Globe2, Cpu, LogIn, Sparkles, ChevronDown, ChevronUp,
  MousePointerClick, UserCheck, Route, HelpCircle, X, Search, TrendingUp
} from 'lucide-react'

// --- 型定義 ---
interface AnalyticsData {
  period: number
  overview: {
    activeUsers: number; pageViews: number; sessions: number
    avgSessionDuration: number; bounceRate: number; newUsers: number
    engagedSessions: number; pagesPerSession: number; eventCount: number
  }
  pages: { path: string; title: string; views: number; users: number; avgDuration: number; bounceRate: number }[]
  sources: { channel: string; sessions: number; users: number; engagedSessions: number }[]
  devices: { device: string; sessions: number; users: number }[]
  countries: { country: string; sessions: number; users: number }[]
  cities: { city: string; country: string; sessions: number; users: number }[]
  browsers: { browser: string; sessions: number; users: number }[]
  os: { os: string; sessions: number; users: number }[]
  landing: { page: string; sessions: number; bounceRate: number; avgDuration: number }[]
  hourly: { hour: number; users: number; sessions: number }[]
  daily: { date: string; users: number; pageViews: number; sessions: number; newUsers: number }[]
  userType: { type: string; sessions: number; users: number; avgDuration: number }[]
  events: { name: string; count: number; users: number }[]
  ageGender: { age: string; gender: string; users: number; sessions: number }[]
  pageFlow: { from: string; to: string; views: number }[]
}

interface SearchConsoleData {
  summary: { totalClicks: number; totalImpressions: number; avgCtr: number; avgPosition: number }
  queries: { query: string; clicks: number; impressions: number; ctr: number; position: number }[]
  pages: { page: string; clicks: number; impressions: number; ctr: number; position: number }[]
}

// --- ラベル ---
const CHANNEL_LABELS: Record<string, string> = {
  'Organic Search': '自然検索', 'Direct': '直接アクセス', 'Organic Social': 'SNS',
  'Referral': '外部サイト', 'Paid Search': '有料検索', 'Email': 'メール',
  'Display': 'ディスプレイ広告', 'Unassigned': 'その他',
}
const DEVICE_ICONS: Record<string, any> = { desktop: Monitor, mobile: Smartphone, tablet: Tablet }
const DEVICE_LABELS: Record<string, string> = { desktop: 'PC', mobile: 'スマホ', tablet: 'タブレット' }
const COUNTRY_LABELS: Record<string, string> = {
  'Japan': '日本', 'United States': 'アメリカ', 'China': '中国', 'South Korea': '韓国',
  'Taiwan': '台湾', 'Hong Kong': '香港', 'Thailand': 'タイ', 'Singapore': 'シンガポール',
  'Australia': 'オーストラリア', 'United Kingdom': 'イギリス', 'France': 'フランス',
  'Germany': 'ドイツ', 'Canada': 'カナダ', 'India': 'インド', 'Indonesia': 'インドネシア',
  'Malaysia': 'マレーシア', 'Philippines': 'フィリピン', 'Vietnam': 'ベトナム', '(not set)': '不明',
}
const USER_TYPE_LABELS: Record<string, string> = { 'new': '新規', 'returning': 'リピーター' }
const EVENT_LABELS: Record<string, string> = {
  'page_view': 'ページ表示', 'scroll': 'スクロール', 'click': 'クリック',
  'session_start': 'セッション開始', 'first_visit': '初回訪問',
  'user_engagement': 'ユーザーエンゲージメント', 'scroll_depth': 'スクロール深度',
}
const GENDER_LABELS: Record<string, string> = { 'male': '男性', 'female': '女性', 'unknown': '不明' }
const AGE_LABELS: Record<string, string> = {
  '18-24': '18〜24歳', '25-34': '25〜34歳', '35-44': '35〜44歳',
  '45-54': '45〜54歳', '55-64': '55〜64歳', '65+': '65歳以上', 'unknown': '不明',
}

// --- 用語説明 ---
const GLOSSARY: Record<string, string> = {
  'ユーザー数': 'サイトを訪れた人の数（同じ人が複数回来ても1カウント）',
  '新規ユーザー': '初めてサイトを訪れた人の数',
  'PV数': 'ページが表示された合計回数（1人が3ページ見たら3PV）',
  'セッション': 'サイトへの訪問回数。30分操作がないと新しいセッションとしてカウント',
  '平均滞在': '1回の訪問でサイトに滞在した平均時間',
  '直帰率': '1ページだけ見て離脱した訪問の割合。低いほど良い（目安: 50〜70%が平均）',
  'エンゲージ率': '10秒以上滞在、または2ページ以上閲覧した訪問の割合。高いほど良い',
  'ページ/セッション': '1回の訪問で平均何ページ見たか。多いほどサイト内を回遊している',
  'イベント数': 'ボタンクリック・スクロールなどのユーザーアクションの合計回数',
  '新規率': '全ユーザーのうち初めて来た人の割合',
}

// --- 用語説明ボタン ---
function HelpTip({ term }: { term: string }) {
  const [show, setShow] = useState(false)
  const desc = GLOSSARY[term]
  if (!desc) return null
  return (
    <>
      <button onClick={() => setShow(true)} className="inline-flex items-center ml-1 text-gray-400 hover:text-[#4a90e2] transition">
        <HelpCircle size={12} />
      </button>
      {show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40" onClick={() => setShow(false)}>
          <div className="bg-white rounded-2xl p-5 max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[#8b6f47]">{term}</h3>
              <button onClick={() => setShow(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
          </div>
        </div>
      )}
    </>
  )
}

// --- ユーティリティ ---
function fmt(n: number) { return n.toLocaleString() }
function fmtDur(s: number) { const m = Math.floor(s / 60); return m > 0 ? `${m}分${Math.round(s % 60)}秒` : `${Math.round(s)}秒` }
function fmtPct(v: number) { return `${(v * 100).toFixed(1)}%` }

// --- 汎用バーチャート ---
function BarList({ items, color = 'from-[#4a90e2] to-[#5ba3f5]' }: { items: { label: string; value: number; sub?: string }[]; color?: string }) {
  const max = Math.max(...items.map(i => i.value), 1)
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-28 text-sm text-gray-600 truncate" title={item.label}>{item.label}</div>
          <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${color} rounded-full flex items-center justify-end pr-2`}
              style={{ width: `${Math.max((item.value / max) * 100, 8)}%` }}
            >
              <span className="text-xs text-white font-medium">{fmt(item.value)}</span>
            </div>
          </div>
          {item.sub && <span className="text-xs text-gray-400 w-16 text-right">{item.sub}</span>}
        </div>
      ))}
    </div>
  )
}

// --- 日別チャート ---
function DailyChart({ data }: { data: AnalyticsData['daily'] }) {
  if (!data.length) return <p className="text-gray-400 text-center py-8">データなし</p>
  const maxPV = Math.max(...data.map(d => d.pageViews), 1)
  const maxU = Math.max(...data.map(d => d.users), 1)
  const H = 160
  return (
    <div className="overflow-x-auto">
      <div className="flex items-end gap-1 min-w-[400px]" style={{ height: H + 40 }}>
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-end gap-[2px]" style={{ height: H }}>
              <div className="w-3 bg-[#4a90e2] rounded-t opacity-70" style={{ height: (d.pageViews / maxPV) * H }} title={`PV: ${d.pageViews}`} />
              <div className="w-3 bg-[#e86c3a] rounded-t opacity-70" style={{ height: (d.users / maxU) * H }} title={`ユーザー: ${d.users}`} />
            </div>
            <span className="text-[10px] text-gray-400 -rotate-45 origin-top-left whitespace-nowrap">{d.date.slice(5)}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 justify-center mt-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#4a90e2] rounded opacity-70" /> PV</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#e86c3a] rounded opacity-70" /> ユーザー</span>
      </div>
    </div>
  )
}

// --- 時間帯チャート ---
function HourlyChart({ data }: { data: AnalyticsData['hourly'] }) {
  if (!data.length) return null
  const max = Math.max(...data.map(d => d.sessions), 1)
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 100 }}>
      {Array.from({ length: 24 }, (_, h) => {
        const d = data.find(x => x.hour === h)
        const v = d?.sessions || 0
        return (
          <div key={h} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-gradient-to-t from-[#8b5cf6] to-[#a78bfa] rounded-t opacity-70"
              style={{ height: Math.max((v / max) * 80, 2) }}
              title={`${h}時: ${v}セッション`}
            />
            {h % 3 === 0 && <span className="text-[9px] text-gray-400 mt-1">{h}</span>}
          </div>
        )
      })}
    </div>
  )
}

// --- セクションコンポーネント ---
function Section({ title, icon: Icon, children, defaultOpen = true }: { title: string; icon: any; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-3xl shadow-lg border-2 border-[#f5f1e8] overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition">
        <h2 className="text-xl font-bold text-[#8b6f47] flex items-center gap-2">
          <Icon size={20} className="text-[#4a90e2]" /> {title}
        </h2>
        {open ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  )
}

// --- メインページ ---
export default function AnalyticsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-[#fffef9] to-[#f5f1e8] flex items-center justify-center"><RefreshCw size={40} className="text-[#4a90e2] animate-spin" /></div>}>
      <AnalyticsContent />
    </Suspense>
  )
}

function AnalyticsContent() {
  const searchParams = useSearchParams()
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [scData, setScData] = useState<SearchConsoleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [needsAuth, setNeedsAuth] = useState(false)
  const [period, setPeriod] = useState('7')
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)

  const success = searchParams.get('success')
  const authError = searchParams.get('error')

  useEffect(() => {
    if (authError) {
      setError(authError === 'auth_denied' ? 'Google認証が拒否されました' : '認証エラーが発生しました')
      setLoading(false)
      return
    }
    fetchData()
  }, [period, success])

  async function fetchData() {
    setLoading(true); setError(null)
    try {
      const res = await fetch(`/api/admin/analytics?period=${period}`)
      if (res.status === 401) {
        const body = await res.json()
        if (body.error === 'not_connected' || body.error === 'token_expired') { setNeedsAuth(true); setLoading(false); return }
      }
      if (!res.ok) { const body = await res.json(); throw new Error(body.message || 'データ取得に失敗しました') }
      setData(await res.json()); setNeedsAuth(false)
      // Search Consoleデータも取得（エラーでも無視）
      try {
        const scRes = await fetch(`/api/admin/analytics/search-console?period=${period}`)
        if (scRes.ok) setScData(await scRes.json())
      } catch {}
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  async function runAnalysis() {
    if (!data) return
    setAnalyzing(true); setAnalysis(null)
    try {
      const res = await fetch('/api/admin/analytics/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analyticsData: data, searchConsoleData: scData }),
      })
      if (!res.ok) throw new Error('AI分析に失敗しました')
      const result = await res.json()
      setAnalysis(result.analysis)
    } catch (e: any) { setError(e.message) }
    finally { setAnalyzing(false) }
  }

  // --- 未連携画面 ---
  if (needsAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fffef9] to-[#f5f1e8] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <BarChart3 size={64} className="mx-auto text-[#4a90e2] mb-6" />
          <h1 className="text-3xl font-bold text-[#8b6f47] mb-4">Google Analytics 連携</h1>
          <p className="text-gray-600 mb-8">アクセス解析データを表示するには、Googleアカウントとの連携が必要です。</p>
          <a href="/api/admin/analytics/auth" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4a90e2] to-[#5ba3f5] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition text-lg">
            <ExternalLink size={20} /> Googleアカウントで連携する
          </a>
          <div className="mt-8"><Link href="/admin" className="text-[#8b6f47] hover:text-[#4a90e2] transition"><ChevronLeft size={14} className="inline" /> 管理画面に戻る</Link></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffef9] to-[#f5f1e8] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold text-[#8b6f47] font-serif flex items-center gap-3">
              <BarChart3 size={36} className="text-[#4a90e2]" /> アクセス解析
            </h1>
            <p className="text-gray-500 mt-1">Google Analytics レポート</p>
          </div>
          <div className="flex items-center gap-3">
            <select value={period} onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 rounded-xl border-2 border-[#f5f1e8] bg-white text-[#8b6f47] font-medium focus:border-[#4a90e2] outline-none">
              <option value="7">過去7日</option><option value="14">過去14日</option>
              <option value="30">過去30日</option><option value="90">過去90日</option>
            </select>
            <button onClick={fetchData} disabled={loading}
              className="p-2 rounded-xl bg-white border-2 border-[#f5f1e8] hover:border-[#4a90e2] transition disabled:opacity-50">
              <RefreshCw size={20} className={`text-[#8b6f47] ${loading ? 'animate-spin' : ''}`} />
            </button>
            {data && (
              <button onClick={runAnalysis} disabled={analyzing}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] text-white font-medium rounded-xl shadow hover:shadow-lg transition disabled:opacity-50">
                <Sparkles size={16} className={analyzing ? 'animate-spin' : ''} /> {analyzing ? 'AI分析中...' : 'AI分析'}
              </button>
            )}
          </div>
        </div>

        {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700">Google Analytics連携が完了しました</div>}
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700">{error}</div>}

        {/* AI分析結果 */}
        {analysis && (
          <div className="mb-6 bg-white rounded-3xl shadow-lg border-2 border-purple-200 p-6">
            <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2 mb-4">
              <Sparkles size={20} /> AI分析レポート
            </h2>
            <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{
              __html: analysis.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/## (.*?)(?:<br>|$)/g, '<h3 class="text-lg font-bold text-[#8b6f47] mt-4 mb-2">$1</h3>')
            }} />
          </div>
        )}

        {loading && (
          <div className="text-center py-20">
            <RefreshCw size={40} className="mx-auto text-[#4a90e2] animate-spin mb-4" />
            <p className="text-gray-500">データを取得中...</p>
          </div>
        )}

        {data && !loading && (
          <div className="space-y-6">
            {/* 概要カード */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: 'ユーザー数', value: fmt(data.overview.activeUsers), icon: Users, color: 'text-[#4a90e2]' },
                { label: '新規ユーザー', value: fmt(data.overview.newUsers), icon: ArrowUpRight, color: 'text-[#22c55e]' },
                { label: 'PV数', value: fmt(data.overview.pageViews), icon: Eye, color: 'text-[#e86c3a]' },
                { label: 'セッション', value: fmt(data.overview.sessions), icon: BarChart3, color: 'text-[#8b5cf6]' },
                { label: '平均滞在', value: fmtDur(data.overview.avgSessionDuration), icon: Clock, color: 'text-[#f59e0b]' },
                { label: '直帰率', value: fmtPct(data.overview.bounceRate), icon: ArrowUpRight, color: 'text-[#ec4899]' },
                { label: 'エンゲージ率', value: data.overview.sessions > 0 ? fmtPct(data.overview.engagedSessions / data.overview.sessions) : '0%', icon: Users, color: 'text-[#14b8a6]' },
                { label: 'ページ/セッション', value: data.overview.pagesPerSession.toFixed(1), icon: Eye, color: 'text-[#6366f1]' },
                { label: 'イベント数', value: fmt(data.overview.eventCount), icon: BarChart3, color: 'text-[#f97316]' },
                { label: '新規率', value: data.overview.activeUsers > 0 ? fmtPct(data.overview.newUsers / data.overview.activeUsers) : '0%', icon: ArrowUpRight, color: 'text-[#06b6d4]' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-lg border-2 border-[#f5f1e8]">
                  <div className="flex items-center gap-1 mb-2">
                    <item.icon size={16} className={item.color} />
                    <span className="text-xs text-gray-500">{item.label}</span>
                    <HelpTip term={item.label} />
                  </div>
                  <div className="text-2xl font-bold text-[#8b6f47]">{item.value}</div>
                </div>
              ))}
            </div>

            {/* 日別推移 */}
            <Section title="日別推移" icon={BarChart3}>
              <DailyChart data={data.daily} />
            </Section>

            {/* 時間帯別 */}
            <Section title="時間帯別アクセス" icon={Clock} defaultOpen={false}>
              <HourlyChart data={data.hourly} />
              <p className="text-xs text-gray-400 mt-2 text-center">横軸: 0〜23時 / 縦軸: セッション数</p>
            </Section>

            {/* 新規 vs リピーター */}
            {data.userType.length > 0 && (
              <Section title="新規 vs リピーター" icon={Users} defaultOpen={false}>
                <div className="grid grid-cols-2 gap-4">
                  {data.userType.map((ut, i) => {
                    const total = data.userType.reduce((s, x) => s + x.sessions, 0)
                    const pct = total > 0 ? ((ut.sessions / total) * 100).toFixed(1) : '0'
                    return (
                      <div key={i} className="text-center p-4 bg-gray-50 rounded-2xl">
                        <div className="text-2xl font-bold text-[#8b6f47]">{pct}%</div>
                        <div className="text-sm text-gray-600 font-medium">{USER_TYPE_LABELS[ut.type] || ut.type}</div>
                        <div className="text-xs text-gray-400 mt-1">{fmt(ut.sessions)}セッション / 平均{fmtDur(ut.avgDuration)}</div>
                      </div>
                    )
                  })}
                </div>
              </Section>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ページ別 */}
              <Section title="人気ページ TOP20" icon={Eye}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="text-gray-500 border-b">
                      <th className="text-left py-2 font-medium">ページ</th>
                      <th className="text-right py-2 font-medium">PV</th>
                      <th className="text-right py-2 font-medium">ユーザー</th>
                      <th className="text-right py-2 font-medium hidden md:table-cell">直帰率</th>
                    </tr></thead>
                    <tbody>
                      {data.pages.map((p, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2 max-w-[200px]">
                            <div className="truncate text-[#8b6f47] font-medium" title={p.title}>{p.title || p.path}</div>
                            <div className="text-xs text-gray-400 truncate">{p.path}</div>
                          </td>
                          <td className="text-right py-2 font-bold text-[#4a90e2]">{p.views}</td>
                          <td className="text-right py-2 text-gray-600">{p.users}</td>
                          <td className="text-right py-2 text-gray-600 hidden md:table-cell">{fmtPct(p.bounceRate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              {/* ランディングページ */}
              <Section title="ランディングページ" icon={LogIn}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="text-gray-500 border-b">
                      <th className="text-left py-2 font-medium">ページ</th>
                      <th className="text-right py-2 font-medium">流入</th>
                      <th className="text-right py-2 font-medium">直帰率</th>
                      <th className="text-right py-2 font-medium hidden md:table-cell">滞在</th>
                    </tr></thead>
                    <tbody>
                      {data.landing.map((l, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2 max-w-[200px]"><div className="truncate text-[#8b6f47]">{l.page}</div></td>
                          <td className="text-right py-2 font-bold text-[#4a90e2]">{l.sessions}</td>
                          <td className="text-right py-2 text-gray-600">{fmtPct(l.bounceRate)}</td>
                          <td className="text-right py-2 text-gray-600 hidden md:table-cell">{fmtDur(l.avgDuration)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 流入元 */}
              <Section title="流入元" icon={ArrowUpRight}>
                <BarList items={data.sources.map(s => ({
                  label: CHANNEL_LABELS[s.channel] || s.channel,
                  value: s.sessions,
                  sub: `${s.users}人`,
                }))} />
              </Section>

              {/* デバイス */}
              <Section title="デバイス別" icon={Monitor}>
                <div className="grid grid-cols-3 gap-4">
                  {data.devices.map((d, i) => {
                    const Icon = DEVICE_ICONS[d.device] || Monitor
                    const total = data.devices.reduce((s, x) => s + x.sessions, 0)
                    const pct = total > 0 ? ((d.sessions / total) * 100).toFixed(1) : '0'
                    return (
                      <div key={i} className="text-center p-4 bg-gray-50 rounded-2xl">
                        <Icon size={28} className="mx-auto text-[#4a90e2] mb-2" />
                        <div className="text-lg font-bold text-[#8b6f47]">{pct}%</div>
                        <div className="text-xs text-gray-500">{DEVICE_LABELS[d.device] || d.device}</div>
                        <div className="text-xs text-gray-400 mt-1">{fmt(d.sessions)}セッション</div>
                      </div>
                    )
                  })}
                </div>
              </Section>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 国別 */}
              <Section title="国別アクセス" icon={Globe}>
                <BarList
                  items={data.countries.map(c => ({
                    label: COUNTRY_LABELS[c.country] || c.country,
                    value: c.sessions,
                    sub: `${c.users}人`,
                  }))}
                  color="from-[#22c55e] to-[#4ade80]"
                />
              </Section>

              {/* 都市別 */}
              <Section title="都市別アクセス" icon={MapPin}>
                <BarList
                  items={data.cities.map(c => ({
                    label: c.city === '(not set)' ? '不明' : c.city,
                    value: c.sessions,
                    sub: COUNTRY_LABELS[c.country] || c.country,
                  }))}
                  color="from-[#f59e0b] to-[#fbbf24]"
                />
              </Section>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ブラウザ */}
              <Section title="ブラウザ" icon={Globe2} defaultOpen={false}>
                <BarList
                  items={data.browsers.map(b => ({ label: b.browser, value: b.sessions }))}
                  color="from-[#ec4899] to-[#f472b6]"
                />
              </Section>

              {/* OS */}
              <Section title="OS" icon={Cpu} defaultOpen={false}>
                <BarList
                  items={data.os.map(o => ({ label: o.os, value: o.sessions }))}
                  color="from-[#6366f1] to-[#818cf8]"
                />
              </Section>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* イベント別 */}
              <Section title="イベント（ユーザー行動）" icon={MousePointerClick} defaultOpen={false}>
                <p className="text-xs text-gray-400 mb-3">※ ユーザーのクリック・スクロールなどの行動を記録</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="text-gray-500 border-b">
                      <th className="text-left py-2 font-medium">イベント</th>
                      <th className="text-right py-2 font-medium">回数</th>
                      <th className="text-right py-2 font-medium">ユーザー</th>
                    </tr></thead>
                    <tbody>
                      {(data.events || []).map((e, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2 text-[#8b6f47] font-medium">{EVENT_LABELS[e.name] || e.name}</td>
                          <td className="text-right py-2 font-bold text-[#4a90e2]">{fmt(e.count)}</td>
                          <td className="text-right py-2 text-gray-600">{fmt(e.users)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>

              {/* ユーザー属性 */}
              <Section title="ユーザー属性（年齢・性別）" icon={UserCheck} defaultOpen={false}>
                <p className="text-xs text-gray-400 mb-3">※ Googleにログイン中のユーザーのみ。データが溜まると表示されます</p>
                {(data.ageGender || []).length === 0 ? (
                  <p className="text-gray-400 text-center py-8">まだデータが十分にありません</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="text-gray-500 border-b">
                        <th className="text-left py-2 font-medium">年齢層</th>
                        <th className="text-left py-2 font-medium">性別</th>
                        <th className="text-right py-2 font-medium">ユーザー</th>
                        <th className="text-right py-2 font-medium">セッション</th>
                      </tr></thead>
                      <tbody>
                        {(data.ageGender || []).filter(ag => ag.age !== '(not set)' && ag.gender !== '(not set)').map((ag, i) => (
                          <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="py-2 text-[#8b6f47]">{AGE_LABELS[ag.age] || ag.age}</td>
                            <td className="py-2 text-gray-600">{GENDER_LABELS[ag.gender] || ag.gender}</td>
                            <td className="text-right py-2 font-bold text-[#4a90e2]">{fmt(ag.users)}</td>
                            <td className="text-right py-2 text-gray-600">{fmt(ag.sessions)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Section>
            </div>

            {/* ページ遷移経路 */}
            <Section title="ページ遷移経路" icon={Route} defaultOpen={false}>
              <p className="text-xs text-gray-400 mb-3">※ どのページから次にどのページへ移動したかの記録</p>
              {(data.pageFlow || []).length === 0 ? (
                <p className="text-gray-400 text-center py-8">まだデータが十分にありません</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="text-gray-500 border-b">
                      <th className="text-left py-2 font-medium">参照元</th>
                      <th className="text-center py-2 font-medium">→</th>
                      <th className="text-left py-2 font-medium">表示ページ</th>
                      <th className="text-right py-2 font-medium">PV</th>
                    </tr></thead>
                    <tbody>
                      {(data.pageFlow || []).slice(0, 15).map((pf, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-2 max-w-[150px]"><div className="truncate text-gray-600 text-xs">{pf.from || '(直接)'}</div></td>
                          <td className="text-center py-2 text-gray-300">→</td>
                          <td className="py-2 max-w-[150px]"><div className="truncate text-[#8b6f47] font-medium text-xs">{pf.to}</div></td>
                          <td className="text-right py-2 font-bold text-[#4a90e2]">{fmt(pf.views)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Section>

            {/* Search Console */}
            {scData && (
              <>
                <div className="mt-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                  <h2 className="text-lg font-bold text-green-700 flex items-center gap-2 mb-3">
                    <Search size={20} /> Google検索パフォーマンス
                    <span className="text-xs font-normal text-gray-500">（Search Console / データは2-3日遅れ）</span>
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: 'クリック数', value: fmt(scData.summary.totalClicks), desc: '検索結果からHPがクリックされた回数' },
                      { label: '表示回数', value: fmt(scData.summary.totalImpressions), desc: '検索結果にHPが表示された回数' },
                      { label: 'CTR', value: fmtPct(scData.summary.avgCtr), desc: '表示されたうちクリックされた割合（高いほど良い）' },
                      { label: '平均掲載順位', value: scData.summary.avgPosition.toFixed(1) + '位', desc: '検索結果での平均表示位置（低いほど上位）' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-xs text-gray-500">{item.label}</span>
                          <button onClick={() => alert(item.desc)} className="text-gray-400 hover:text-green-600"><HelpCircle size={11} /></button>
                        </div>
                        <div className="text-xl font-bold text-green-700">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Section title="検索キーワード TOP20" icon={Search}>
                    <p className="text-xs text-gray-400 mb-3">※ ユーザーがGoogleで何と検索してHPに来たか</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="text-gray-500 border-b">
                          <th className="text-left py-2 font-medium">キーワード</th>
                          <th className="text-right py-2 font-medium">クリック</th>
                          <th className="text-right py-2 font-medium">表示</th>
                          <th className="text-right py-2 font-medium hidden md:table-cell">順位</th>
                        </tr></thead>
                        <tbody>
                          {scData.queries.map((q, i) => (
                            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                              <td className="py-2 text-[#8b6f47] font-medium max-w-[200px]"><div className="truncate">{q.query}</div></td>
                              <td className="text-right py-2 font-bold text-green-600">{q.clicks}</td>
                              <td className="text-right py-2 text-gray-600">{fmt(q.impressions)}</td>
                              <td className="text-right py-2 text-gray-600 hidden md:table-cell">{q.position.toFixed(1)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Section>

                  <Section title="検索流入ページ" icon={TrendingUp}>
                    <p className="text-xs text-gray-400 mb-3">※ 検索結果からどのページにランディングしたか</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead><tr className="text-gray-500 border-b">
                          <th className="text-left py-2 font-medium">ページ</th>
                          <th className="text-right py-2 font-medium">クリック</th>
                          <th className="text-right py-2 font-medium">表示</th>
                          <th className="text-right py-2 font-medium hidden md:table-cell">CTR</th>
                        </tr></thead>
                        <tbody>
                          {scData.pages.map((p, i) => (
                            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                              <td className="py-2 max-w-[200px]"><div className="truncate text-[#8b6f47]">{p.page || '/'}</div></td>
                              <td className="text-right py-2 font-bold text-green-600">{p.clicks}</td>
                              <td className="text-right py-2 text-gray-600">{fmt(p.impressions)}</td>
                              <td className="text-right py-2 text-gray-600 hidden md:table-cell">{fmtPct(p.ctr)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Section>
                </div>
              </>
            )}
          </div>
        )}

        {/* フッター */}
        <div className="text-center mt-8">
          <Link href="/admin" className="inline-block px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition text-[#8b6f47] font-medium">
            <ChevronLeft size={14} className="inline" /> 管理画面に戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
