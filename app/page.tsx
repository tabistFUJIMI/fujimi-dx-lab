import Header from "./components/Header";
import Footer from "./components/Footer";

/* ─── アイコンSVG ─── */
function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  );
}
function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  );
}
function IconDocument({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
  );
}
function IconShare({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
  );
}
function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
  );
}
function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  );
}
function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
  );
}

/* ─── プロダクトデータ ─── */
const PRODUCTS = [
  {
    name: "Reserve Navi",
    tagline: "予約管理",
    description: "LINE Mini App対応の予約システム。顧客ログイン不要でWeb+LINEから即予約。自動通知・リマインダーで無断キャンセルを削減。",
    features: ["LINE Mini App対応", "メニュー・リソース指名", "自動通知・リマインド", "AI月次レポート"],
    icon: IconCalendar,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
    status: "本番稼働中",
  },
  {
    name: "ShiftNavi",
    tagline: "シフト管理",
    description: "ドラッグ&ドロップで直感的にシフト作成。AIが過去の実績から最適なシフトを提案。印刷・PDF出力にも対応。",
    features: ["D&Dカレンダー操作", "AIシフト自動生成", "休み希望申請", "PDF印刷出力"],
    icon: IconClock,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    status: "ベータ版運用中",
  },
  {
    name: "RuleNavi",
    tagline: "社内規則AI検索",
    description: "就業規則やマニュアルをPDFから取込み、AIが自然言語で検索・回答。従業員は「聞くだけ」で必要な情報に到達。",
    features: ["PDF自動取込", "AIチャット応答", "FAQ自動生成", "会話ログ分析"],
    icon: IconDocument,
    color: "bg-violet-500",
    lightColor: "bg-violet-50",
    textColor: "text-violet-600",
    status: "本番稼働中",
  },
  {
    name: "SocialNavi",
    tagline: "SNS一元管理",
    description: "Instagram・TikTok・Xへの投稿を一括管理。AIキャプション生成・スケジュール投稿・分析ダッシュボードで運用効率を最大化。",
    features: ["マルチSNS同時投稿", "AIキャプション生成", "スケジュール投稿", "分析ダッシュボード"],
    icon: IconShare,
    color: "bg-pink-500",
    lightColor: "bg-pink-50",
    textColor: "text-pink-600",
    status: "リリース準備中",
  },
  {
    name: "AskNavi",
    tagline: "LINE AI応答",
    description: "LINE公式アカウントにAI FAQ機能を追加。顧客からの問い合わせにAIが自動応答し、セグメント配信でリピーターを育成。",
    features: ["AI自動応答", "セグメント配信", "顧客タグ管理", "予約連携"],
    icon: IconChat,
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
    textColor: "text-amber-600",
    status: "開発中",
  },
];

/* ─── 課題カード ─── */
const PROBLEMS = [
  {
    icon: "📞",
    title: "電話対応に追われる",
    description: "予約・問い合わせの電話が鳴り止まない。少人数運営では接客と電話対応の両立が困難。",
  },
  {
    icon: "📝",
    title: "紙・Excel作業が残る",
    description: "シフト表はExcel、マニュアルは紙のファイル。情報の更新・共有に時間がかかり、ミスも発生。",
  },
  {
    icon: "🔀",
    title: "ツールがバラバラ",
    description: "予約は〇〇、SNSは△△、シフトは□□。ツールごとにログインが必要で、データも分断。",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* ═══ Hero ═══ */}
        <section className="bg-gradient-hero relative overflow-hidden px-4 py-24 text-white md:py-36">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-semibold tracking-wider text-blue-200 uppercase">
                宿泊業のDXを、現場から。
              </p>
              <h1 className="text-3xl font-extrabold leading-tight md:text-5xl md:leading-tight">
                "あの手作業"を
                <br />
                まるごとDXする。
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-blue-100 md:text-xl">
                ビジネスホテル「ゆ縁の宿ふじみ」が自ら開発した
                <br className="hidden md:block" />
                宿泊業向けDXプラットフォーム
                <span className="font-bold text-white"> FUJIMIN PASS</span>
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#products"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-primary-dark transition-transform hover:scale-105 active:scale-[0.98]"
                >
                  サービスを見る
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
                >
                  お問い合わせ
                </a>
              </div>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-white/5" />
        </section>

        {/* ═══ Problems ═══ */}
        <section id="problems" className="bg-surface px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Problems</p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                宿泊業が抱える3つの課題
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-500">
                人手不足の中、アナログ業務とツールの分断が現場の負担を増やし続けています。
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {PROBLEMS.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-border bg-white p-8 transition-shadow hover:shadow-lg"
                >
                  <span className="text-4xl">{p.icon}</span>
                  <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Ecosystem ═══ */}
        <section id="ecosystem" className="px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Ecosystem</p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                FUJIMIN PASSエコシステム
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-500">
                1つのアカウントで、すべてのNaviにアクセス。
                <br />
                認証・課金・顧客管理を統合した宿泊業専用プラットフォーム。
              </p>
            </div>

            {/* Ecosystem diagram */}
            <div className="mt-14">
              {/* FUJIMIN PASS central */}
              <div className="mx-auto max-w-lg rounded-2xl bg-gradient-cta p-6 text-center text-white shadow-xl">
                <IconShield className="mx-auto h-10 w-10" />
                <h3 className="mt-3 text-xl font-bold">FUJIMIN PASS</h3>
                <p className="mt-1 text-sm text-blue-100">
                  統合認証基盤 — SSO・サブスク管理・マルチテナント
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
                  <span className="rounded-full bg-white/20 px-3 py-1">シングルサインオン</span>
                  <span className="rounded-full bg-white/20 px-3 py-1">サブスク管理</span>
                  <span className="rounded-full bg-white/20 px-3 py-1">クーポン発行</span>
                  <span className="rounded-full bg-white/20 px-3 py-1">KPI分析</span>
                </div>
              </div>

              {/* Connection lines (visual) */}
              <div className="mx-auto my-4 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 w-px bg-gray-300" />
                ))}
              </div>

              {/* 5 Navis */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {PRODUCTS.map((p) => (
                  <div
                    key={p.name}
                    className={`rounded-xl border border-border bg-white p-4 text-center transition-shadow hover:shadow-md`}
                  >
                    <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-lg ${p.lightColor}`}>
                      <p.icon className={`h-5 w-5 ${p.textColor}`} />
                    </div>
                    <p className="mt-2 text-sm font-bold">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.tagline}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Products ═══ */}
        <section id="products" className="bg-surface px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Products</p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                5つのNaviで業務をカバー
              </h2>
            </div>

            <div className="mt-14 space-y-8">
              {PRODUCTS.map((product, i) => (
                <div
                  key={product.name}
                  className="overflow-hidden rounded-2xl border border-border bg-white md:flex"
                >
                  {/* Color side */}
                  <div className={`flex items-center justify-center ${product.color} p-8 text-white md:w-64 md:shrink-0`}>
                    <div className="text-center">
                      <product.icon className="mx-auto h-12 w-12" />
                      <p className="mt-3 text-xl font-bold">{product.name}</p>
                      <p className="text-sm opacity-80">{product.tagline}</p>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full ${product.lightColor} ${product.textColor} px-3 py-1 text-xs font-semibold`}>
                        {product.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {product.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.features.map((f) => (
                        <span
                          key={f}
                          className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Case Study ═══ */}
        <section id="case-study" className="px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Case Study</p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                導入事例
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-500">
                自社ホテルで実際に運用しながら開発。現場の声がそのまま機能になっています。
              </p>
            </div>

            <div className="mx-auto mt-14 max-w-4xl">
              {/* Hotel info */}
              <div className="rounded-2xl border border-border bg-white p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                    🏨
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Tabist ゆ縁の宿ふじみ</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      静岡県富士市のビジネスホテル。少人数運営でありながら、DXにより業務効率を大幅に改善。
                    </p>
                  </div>
                </div>

                {/* Before/After */}
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl bg-red-50 p-6">
                    <p className="text-sm font-bold text-red-700">Before</p>
                    <ul className="mt-3 space-y-2 text-sm text-red-600">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-red-400">✕</span>
                        予約は電話のみ、対応に1件5分以上
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-red-400">✕</span>
                        シフト表はExcelで毎月2時間かけて作成
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-red-400">✕</span>
                        就業規則は紙ファイル、探すのに10分
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-red-400">✕</span>
                        SNSは思い出した時だけ更新
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-green-50 p-6">
                    <p className="text-sm font-bold text-green-700">After</p>
                    <ul className="mt-3 space-y-2 text-sm text-green-600">
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-green-500">✓</span>
                        LINE予約で24時間自動受付・通知
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-green-500">✓</span>
                        AIがシフト案を自動生成、微調整のみ
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-green-500">✓</span>
                        AIに聞くだけで規則・マニュアルを即回答
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-0.5 text-green-500">✓</span>
                        AIキャプション+スケジュール投稿で定期発信
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="mt-8 rounded-xl bg-surface-alt p-6">
                  <p className="text-sm italic leading-relaxed text-gray-600">
                    「既存のDXツールは大規模施設向けばかりで、少人数運営の現場には合わなかった。だから自分たちで作った。同じ悩みを持つ宿泊施設に、この仕組みを届けたい。」
                  </p>
                  <p className="mt-3 text-sm font-semibold text-gray-800">
                    — FUJIMI DX Lab
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Company ═══ */}
        <section id="company" className="bg-surface px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">Company</p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                会社情報
              </h2>
            </div>

            <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-white p-8">
              <dl className="space-y-5">
                {[
                  ["会社名", "ふじみ企業有限会社"],
                  ["事業部", "FUJIMI DX Lab事業部"],
                  ["所在地", "静岡県富士市"],
                  ["事業内容", "宿泊業向けDXプラットフォームの開発・提供"],
                  ["運営施設", "Tabist ゆ縁の宿ふじみ（ビジネスホテル）"],
                  ["メール", "support@mail.fujimin-pass.com"],
                ].map(([dt, dd]) => (
                  <div key={dt} className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="w-28 shrink-0 text-sm font-semibold text-gray-500">
                      {dt}
                    </dt>
                    <dd className="text-sm text-gray-800">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ═══ CTA / Contact ═══ */}
        <section id="contact" className="bg-gradient-cta px-4 py-20 text-white md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              まずはお気軽にご相談ください
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-blue-100">
              「うちの施設でも使える？」「まずは1つだけ試したい」など、
              どんなご質問でもお気軽にどうぞ。
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:support@mail.fujimin-pass.com"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-primary-dark transition-transform hover:scale-105 active:scale-[0.98]"
              >
                メールで問い合わせ
                <IconArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-6 text-sm text-blue-200">
              support@mail.fujimin-pass.com | 平日 10:00〜17:00
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
