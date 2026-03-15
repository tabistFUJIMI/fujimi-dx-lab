import Header from "./components/Header";
import Footer from "./components/Footer";
import FadeIn from "./components/FadeIn";

/* ─── アイコンSVG ─── */
function IconCalendar({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
}
function IconClock({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}
function IconDocument({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
}
function IconShare({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>;
}
function IconChat({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
}
function IconShield({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
}
function IconArrowRight({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;
}

/* ─── データ ─── */
const PRODUCTS = [
  { name: "Reserve Navi", tagline: "予約管理", description: "LINE Mini App対応。Web+LINEから即予約、自動通知でノーショー削減。", icon: IconCalendar, color: "from-blue-500 to-blue-600", lightBg: "bg-blue-500/10", textColor: "text-blue-500" },
  { name: "ShiftNavi", tagline: "シフト管理", description: "AIが最適シフトを自動提案。カレンダーUIで直感操作。", icon: IconClock, color: "from-emerald-500 to-emerald-600", lightBg: "bg-emerald-500/10", textColor: "text-emerald-500" },
  { name: "RuleNavi", tagline: "社内規則AI検索", description: "PDF取込 → AIが自然言語で回答。聞くだけで必要情報に到達。", icon: IconDocument, color: "from-violet-500 to-violet-600", lightBg: "bg-violet-500/10", textColor: "text-violet-500" },
  { name: "SocialNavi", tagline: "SNS一元管理", description: "IG・TikTok・Xを一括管理。AI投稿文とスケジュール配信。", icon: IconShare, color: "from-pink-500 to-pink-600", lightBg: "bg-pink-500/10", textColor: "text-pink-500" },
  { name: "AskNavi", tagline: "LINE AI応答", description: "LINE公式にAI FAQ機能を追加。自動応答+セグメント配信。", icon: IconChat, color: "from-amber-500 to-amber-600", lightBg: "bg-amber-500/10", textColor: "text-amber-500" },
];

const PROBLEMS = [
  { icon: "📞", title: "電話対応に追われる", description: "予約・問い合わせの電話対応に時間を奪われ、本来の業務に集中できない。" },
  { icon: "📝", title: "紙・Excel作業が残る", description: "シフト表はExcel、マニュアルは紙。更新・共有に時間がかかり、ミスが生まれる。" },
  { icon: "🔀", title: "ツールがバラバラ", description: "予約・SNS・シフト…ツールごとにログインが必要で、データも分断されたまま。" },
];

const TARGET_INDUSTRIES = [
  { icon: "🏨", label: "宿泊施設" },
  { icon: "💇", label: "サロン" },
  { icon: "🍽️", label: "飲食店" },
  { icon: "💆", label: "リラクゼーション" },
  { icon: "🏥", label: "クリニック" },
  { icon: "🏋️", label: "フィットネス" },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ═══ Hero ═══ */}
        <section className="noise relative min-h-[100vh] overflow-hidden bg-mesh-hero px-4 pt-32 pb-20 text-white md:pt-44 md:pb-32">
          <div className="relative z-10 mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-6 text-sm font-semibold tracking-[0.2em] text-blue-300 uppercase">
                小さなお店のDXを、現場から。
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-gradient text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl" style={{ lineHeight: 1.08 }}>
                あの手作業を、
                <br />
                まるごとDXする。
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
                予約・シフト・マニュアル・SNS・LINE対応——
                <br className="hidden md:block" />
                小規模事業者に必要な業務を
                <strong className="text-white"> FUJIMIN PASS </strong>
                ひとつでカバー。
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-2">
                {TARGET_INDUSTRIES.map((t) => (
                  <span key={t.label} className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur-sm">
                    {t.icon} {t.label}
                  </span>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#ecosystem"
                  className="glow-blue glow-blue-hover inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                >
                  サービスを見る
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                >
                  お問い合わせ
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Decorative elements */}
          <div className="pointer-events-none absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
        </section>

        {/* ═══ Problems ═══ */}
        <section id="problems" className="relative overflow-hidden px-4 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-primary uppercase">Problems</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  小規模事業者が抱える課題
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  人手不足の中、アナログ業務とツールの分断が現場の負担を増やし続けています。
                </p>
              </div>
            </FadeIn>
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {PROBLEMS.map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.1}>
                  <div className="group h-full rounded-2xl border border-gray-200/60 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
                    <span className="text-4xl">{p.icon}</span>
                    <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">
                      {p.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Ecosystem ═══ */}
        <section id="ecosystem" className="relative bg-slate-50 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-primary uppercase">Ecosystem</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  <span className="text-gradient-dark">FUJIMIN PASS</span> エコシステム
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  1アカウントで、すべてのNaviにアクセス。
                  <br />
                  小規模事業者のための統合DXプラットフォーム。
                </p>
              </div>
            </FadeIn>

            <div className="mt-16">
              {/* FUJIMIN PASS hub */}
              <FadeIn>
                <div className="noise relative mx-auto max-w-lg overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center text-white shadow-2xl">
                  <IconShield className="mx-auto h-10 w-10 text-blue-400" />
                  <h3 className="mt-4 text-xl font-bold">FUJIMIN PASS</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    統合認証基盤 — 1アカウントで全サービスを利用
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs">
                    {["シングルサインオン", "サブスク管理", "クーポン発行", "KPI分析"].map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Connector */}
              <div className="mx-auto flex h-12 w-px items-center justify-center bg-gradient-to-b from-slate-300 to-transparent" />

              {/* 5 Navis */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {PRODUCTS.map((p, i) => (
                  <FadeIn key={p.name} delay={i * 0.08}>
                    <div className="group h-full rounded-xl border border-gray-200/60 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${p.lightBg}`}>
                        <p.icon className={`h-5 w-5 ${p.textColor}`} />
                      </div>
                      <p className="mt-3 text-sm font-bold">{p.name}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{p.tagline}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Products (Bento Grid) ═══ */}
        <section id="products" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-primary uppercase">Products</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  5つのNaviで業務をカバー
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  必要なNaviだけ選んで導入OK。成長に合わせて追加できます。
                </p>
              </div>
            </FadeIn>

            {/* Bento grid */}
            <div className="mt-16 grid gap-4 md:grid-cols-6 lg:gap-5">
              {/* Reserve Navi - large */}
              <FadeIn className="md:col-span-4">
                <BentoCard product={PRODUCTS[0]} large />
              </FadeIn>
              {/* ShiftNavi */}
              <FadeIn delay={0.1} className="md:col-span-2">
                <BentoCard product={PRODUCTS[1]} />
              </FadeIn>
              {/* RuleNavi */}
              <FadeIn delay={0.15} className="md:col-span-2">
                <BentoCard product={PRODUCTS[2]} />
              </FadeIn>
              {/* SocialNavi */}
              <FadeIn delay={0.2} className="md:col-span-2">
                <BentoCard product={PRODUCTS[3]} />
              </FadeIn>
              {/* AskNavi */}
              <FadeIn delay={0.25} className="md:col-span-2">
                <BentoCard product={PRODUCTS[4]} />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ═══ Case Study ═══ */}
        <section id="case-study" className="bg-slate-50 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-primary uppercase">Case Study</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  導入事例
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  自社で運用しながら開発。現場の声がそのまま機能に。
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="mx-auto mt-16 max-w-4xl overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm">
                {/* Header */}
                <div className="border-b border-gray-100 bg-slate-50/50 px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
                      🏨
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Tabist ゆ縁の宿ふじみ</h3>
                      <p className="text-sm text-gray-500">静岡県富士市 / ビジネスホテル / 少人数運営</p>
                    </div>
                  </div>
                </div>

                {/* Before/After */}
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="border-b border-gray-100 p-8 md:border-b-0 md:border-r">
                    <p className="text-xs font-bold tracking-wider text-red-500 uppercase">Before</p>
                    <ul className="mt-4 space-y-3 text-sm text-gray-600">
                      {[
                        "予約は電話のみ、対応に1件5分以上",
                        "シフト表はExcelで毎月2時間",
                        "就業規則は紙ファイル、探すのに10分",
                        "SNSは思い出した時だけ更新",
                      ].map((text) => (
                        <li key={text} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs text-red-500">✕</span>
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8">
                    <p className="text-xs font-bold tracking-wider text-emerald-500 uppercase">After</p>
                    <ul className="mt-4 space-y-3 text-sm text-gray-600">
                      {[
                        "LINE予約で24時間自動受付・通知",
                        "AIがシフト案を自動生成、微調整のみ",
                        "AIに聞くだけで規則・マニュアルを即回答",
                        "AI投稿文+スケジュール配信で定期発信",
                      ].map((text) => (
                        <li key={text} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-600">✓</span>
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Quote */}
                <div className="border-t border-gray-100 bg-slate-50/50 px-8 py-6">
                  <blockquote className="text-sm italic leading-relaxed text-gray-500">
                    &ldquo;既存のDXツールは大手向けばかりで、少人数の現場には合わなかった。だから自分たちで作った。&rdquo;
                  </blockquote>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ Company ═══ */}
        <section id="company" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-primary uppercase">Company</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  会社情報
                </h2>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-gray-200/60 bg-white p-8">
                <dl className="divide-y divide-gray-100">
                  {[
                    ["会社名", "ふじみ企業有限会社"],
                    ["事業部", "FUJIMI DX Lab事業部"],
                    ["所在地", "静岡県富士市"],
                    ["事業内容", "小規模事業者向けDXプラットフォームの開発・提供"],
                    ["運営施設", "Tabist ゆ縁の宿ふじみ（ビジネスホテル）"],
                    ["メール", "support@mail.fujimin-pass.com"],
                  ].map(([dt, dd]) => (
                    <div key={dt} className="flex flex-col py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4">
                      <dt className="w-28 shrink-0 text-sm font-medium text-gray-400">{dt}</dt>
                      <dd className="text-sm text-gray-800">{dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section id="contact" className="noise relative overflow-hidden bg-gradient-cta px-4 py-24 text-white md:py-32">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                まずはお気軽にご相談ください
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-blue-100/80">
                「うちの店でも使える？」「まずは1つだけ試したい」——
                どんなご質問でもお気軽にどうぞ。
              </p>
              <div className="mt-10">
                <a
                  href="mailto:support@mail.fujimin-pass.com"
                  className="glow-blue inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                >
                  メールで問い合わせ
                  <IconArrowRight className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-8 text-sm text-blue-200/70">
                support@mail.fujimin-pass.com | 平日 10:00〜17:00
              </p>
            </FadeIn>
          </div>
          <div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-gradient-to-b from-black/10 to-transparent" />
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ─── Bento Card ─── */
function BentoCard({
  product,
  large,
}: {
  product: (typeof PRODUCTS)[number];
  large?: boolean;
}) {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border border-gray-200/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        large ? "p-8 md:p-10" : "p-6 md:p-8"
      }`}
    >
      {/* Gradient accent top */}
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${product.color}`} />

      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${product.lightBg}`}>
        <product.icon className={`h-6 w-6 ${product.textColor}`} />
      </div>
      <h3 className={`mt-5 font-bold ${large ? "text-xl" : "text-lg"}`}>
        {product.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-gray-400">{product.tagline}</p>
      <p className={`mt-3 leading-relaxed text-gray-500 ${large ? "text-base" : "text-sm"}`}>
        {product.description}
      </p>
    </div>
  );
}
