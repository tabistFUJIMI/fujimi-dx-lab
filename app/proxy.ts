import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { detectBot } from '../lib/bot-detector'

const STATIC_PATTERN = /^\/_next\/|^\/favicon\.ico|^\/images\/|^\/fonts\//

export function proxy(request: NextRequest, event: { waitUntil: (promise: Promise<unknown>) => void }) {
  const pathname = request.nextUrl.pathname

  if (STATIC_PATTERN.test(pathname)) {
    return NextResponse.next()
  }

  const userAgent = request.headers.get('user-agent')
  const bot = detectBot(userAgent)

  if (bot) {
    const logData = {
      botName: bot.name,
      botTier: bot.tier,
      url: pathname,
      method: request.method,
      userAgent: userAgent?.slice(0, 500) || '',
      ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '',
      referer: request.headers.get('referer') || '',
    }

    const url = new URL('/api/internal/bot-log', request.url)
    const promise = fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-secret': process.env.INTERNAL_API_SECRET || '',
      },
      body: JSON.stringify(logData),
    }).catch(() => {})

    if (event?.waitUntil) {
      event.waitUntil(promise)
    }
  }

  return NextResponse.next()
}
