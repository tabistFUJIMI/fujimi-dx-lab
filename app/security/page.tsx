import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";

export const metadata: Metadata = {
  title: "セキュリティ - FUJIMI DX Lab",
  description:
    "FUJIMIN PASSのセキュリティ対策について。お客様のデータを守るための7つの取り組みをご紹介します。",
};

function getAuditInfo(): { lastAuditDate: string; summary: string } {
  try {
    const raw = readFileSync(join(process.cwd(), "public", "security-audit.json"), "utf-8");
    return JSON.parse(raw);
  } catch {
    return { lastAuditDate: "2026-04-04", summary: "全5アプリ横断セキュリティ監査実施済み" };
  }
}

export const dynamic = "force-dynamic";

export default function SecurityPage() {
  const audit = getAuditInfo();
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-slate-900 pb-16 pt-32 text-center">
        <FadeIn>
          <div className="mx-auto max-w-2xl px-4">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20">
              <svg
                className="h-8 w-8 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              セキュリティへの取り組み
            </h1>
            <p className="mt-4 text-base text-slate-400">
              お客様の大切なデータを守ることは、私たちの最も重要な責務です。
            </p>
          </div>
        </FadeIn>
      </section>

      {/* 導入メッセージ */}
      <section className="bg-white py-16">
        <FadeIn>
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <div className="mb-12 rounded-xl border border-emerald-100 bg-emerald-50/50 p-6">
              <p className="text-sm leading-relaxed text-slate-700">
                FUJIMIN
                PASSは、小規模店舗のオーナー様が安心してご利用いただけるよう、業界標準のセキュリティ技術を採用しています。
                「ITに詳しくないけど大丈夫？」というご不安にお応えするため、どのような対策を行っているかをわかりやすくご説明します。
              </p>
            </div>

            {/* 7つの取り組み */}
            <div className="space-y-10 text-sm leading-relaxed text-slate-700">
              {/* 1 */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700">
                    1
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    不正ログインの防止
                  </h2>
                </div>
                <p>
                  すべてのログインは暗号化された認証トークン（JWT）で管理されています。
                  パスワードは元に戻せない形式（ハッシュ化）で保存しており、万が一データベースが流出しても、パスワードそのものを読み取ることはできません。
                </p>
                <p className="mt-2">
                  また、短時間に何度もログインを試みるような不正なアクセスは自動的にブロックされます。
                </p>
              </div>

              {/* 2 */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-sm font-bold text-violet-700">
                    2
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    お客様のデータは他のお店から見えません
                  </h2>
                </div>
                <p>
                  データベースの仕組みとして「行レベルセキュリティ（RLS）」を採用しています。
                  これはデータベースそのものが「このデータはこのお店のもの」と自動的に判断し、他のお店のデータを一切表示しない仕組みです。
                </p>
                <p className="mt-2">
                  アプリケーション側の不具合が仮に発生しても、データベース層で確実にブロックされるため、他のお店にデータが見えることはありません。
                </p>
              </div>

              {/* 3 */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-700">
                    3
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    通信はすべて暗号化されています
                  </h2>
                </div>
                <p>
                  お客様のブラウザと当社サーバー間の通信は、すべてSSL/TLS（HTTPS）で暗号化されています。
                  これはインターネットバンキングや大手ECサイトと同じ技術です。
                  第三者が通信の中身を盗み見ることはできません。
                </p>
              </div>

              {/* 4 */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-sm font-bold text-orange-700">
                    4
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    クレジットカード情報は当社では保管しません
                  </h2>
                </div>
                <p>
                  決済処理はすべてStripe社（国際的なセキュリティ認証
                  PCI DSS Level 1
                  を取得）に委託しています。当社のサーバーにカード番号が保存されることはありません。
                </p>
              </div>

              {/* 5 */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-sm font-bold text-cyan-700">
                    5
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    AI機能の利用量を管理しています
                  </h2>
                </div>
                <p>
                  AIによるチャット応答やシフト自動生成などの機能は、ご契約プランに応じた利用上限が設定されています。
                  意図しない大量利用や不正利用が発生しない仕組みになっています。
                </p>
              </div>

              {/* 6 */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-sm font-bold text-rose-700">
                    6
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    操作の記録を残しています
                  </h2>
                </div>
                <p>
                  「いつ・誰が・何をしたか」を監査ログとして記録しています。
                  万が一トラブルが発生した場合でも、原因を迅速に特定し対応できる体制を整えています。
                </p>
              </div>

              {/* 7 */}
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-sm font-bold text-slate-700">
                    7
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    定期的なセキュリティ点検を実施しています
                  </h2>
                </div>
                <p>
                  使用しているソフトウェアの脆弱性チェックを定期的に実施し、問題が見つかった場合は速やかに対応しています。
                  また、全アプリケーションのセキュリティ設定を横断的に確認する監査を行っています。
                </p>
              </div>
            </div>

            {/* 技術仕様（折りたたみ） */}
            <details className="mt-14 rounded-xl border border-slate-200">
              <summary className="cursor-pointer px-6 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                技術的な詳細（エンジニア・IT担当者向け）
              </summary>
              <div className="border-t border-slate-200 px-6 py-5">
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <table className="w-full text-left text-sm text-slate-700">
                    <tbody className="divide-y divide-slate-200">
                      <Row label="認証方式" value="NextAuth.js v5 + JWT（HS256署名）/ FUJIMIN PASS SSO統合" />
                      <Row label="パスワード" value="bcrypt（12ラウンド）によるハッシュ化" />
                      <Row label="テナント分離" value="PostgreSQL Row Level Security（FORCE RLS）" />
                      <Row label="通信" value="TLS 1.3 / HSTS（max-age=31536000）" />
                      <Row label="セキュリティヘッダー" value="CSP / X-Frame-Options: DENY / X-Content-Type-Options / Referrer-Policy / Permissions-Policy" />
                      <Row label="ORM" value="Prisma（パラメータ化クエリによるSQLインジェクション対策）" />
                      <Row label="レートリミット" value="認証・チャット等の重要APIにIP単位の制限を適用" />
                      <Row label="決済" value="Stripe（PCI DSS Level 1）/ Webhook署名検証（HMAC-SHA256）" />
                      <Row label="LINE Token" value="AES-256-GCM暗号化保存" />
                      <Row label="監視" value="Sentry（エラートラッキング）/ 監査ログ（AnalyticsAuditLog）" />
                      <Row label="ホスティング" value="Vercel（SOC 2 Type II準拠）/ Supabase PostgreSQL（AWS上、SSL強制）" />
                      <Row label="最終監査日" value={`${audit.lastAuditDate.replace(/-/g, "年").replace(/年(\d+)$/, "月$1日")}（${audit.summary}）`} />
                    </tbody>
                  </table>
                </div>
              </div>
            </details>

            {/* お問い合わせ */}
            <div className="mt-14 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
              <p className="text-sm font-semibold text-slate-900">
                セキュリティに関するご質問・ご不安がございましたら
              </p>
              <p className="mt-2 text-sm text-slate-600">
                お気軽にお問い合わせください。技術的なご質問にもお答えいたします。
              </p>
              <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="mailto:support@mail.fujimin-pass.com"
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  support@mail.fujimin-pass.com
                </a>
                <span className="hidden text-slate-300 sm:inline">|</span>
                <a
                  href="https://lin.ee/UPArZn9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  LINEで相談する
                </a>
              </div>
            </div>

            <p className="mt-12 text-right text-xs text-slate-500">
              最終監査: {audit.lastAuditDate}
            </p>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <th className="w-40 whitespace-nowrap bg-slate-50 px-5 py-3 align-top text-xs font-medium text-slate-900">
        {label}
      </th>
      <td className="px-5 py-3 text-xs">{value}</td>
    </tr>
  );
}
