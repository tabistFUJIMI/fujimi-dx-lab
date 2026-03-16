import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FadeIn from "./components/FadeIn";

/* ─── Icons ─── */
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
function IconArrowRight({ className }: { className?: string }) {
  return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>;
}

/* ─── 対象業種 ─── */
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
        <section className="noise relative min-h-[100vh] overflow-hidden bg-mesh-hero px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28">
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left: Copy */}
              <div>
                <FadeIn>
                  <p className="mb-5 inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 backdrop-blur-sm">
                    ひとつからはじめられるDX
                  </p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h1 className="text-gradient text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl" style={{ lineHeight: 1.1 }}>
                    「この時間、もっと
                    <br />
                    お客様に使えないかな？」
                  </h1>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="mt-8 max-w-lg text-lg leading-relaxed text-slate-300">
                    予約の電話、シフト調整、マニュアル探し、SNS更新——
                    <br />
                    <strong className="text-white">ぜんぶ、ひとつずつ解決できます。</strong>
                  </p>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <p className="mt-3 text-base text-slate-400">
                    必要なものだけ、1つから。あなたのペースではじめるDX。
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {TARGET_INDUSTRIES.map((t) => (
                      <span key={t.label} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm backdrop-blur-sm">
                        {t.icon} {t.label}
                      </span>
                    ))}
                  </div>
                </FadeIn>
                <FadeIn delay={0.35}>
                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#solutions"
                      className="glow-blue glow-blue-hover inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 transition-all duration-300 hover:scale-105 active:scale-[0.98]"
                    >
                      こんな課題、ありませんか？
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
              {/* Right: Hero illustration */}
              <FadeIn delay={0.2} className="hidden lg:block">
                <div className="relative">
                  <Image
                    src="/images/hero-illustration.jpg"
                    alt="小規模事業者のDXイメージ"
                    width={600}
                    height={400}
                    className="rounded-2xl"
                    priority
                  />
                  {/* Glow behind image */}
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-blue-500/20 blur-3xl" />
                </div>
              </FadeIn>
            </div>
          </div>
          <div className="pointer-events-none absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
        </section>

        {/* ═══ Solutions ═══ */}
        <section id="solutions" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-primary uppercase">Solutions</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  たとえば、こんな課題ありませんか？
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">
                  FUJIMI DX Labは、現場の「困った」から生まれたツールです。
                  <br />
                  <strong className="text-gray-700">ひとつからはじめられます。</strong>
                </p>
              </div>
            </FadeIn>

            <div className="mt-20 space-y-28">
              {/* ── Reserve Navi ── */}
              <FadeIn>
                <SolutionSection
                  icon={<IconCalendar className="h-7 w-7" />}
                  name="Reserve Navi"
                  tagline="予約管理"
                  accentColor="blue"
                  imageSrc="/images/reserve-navi.jpg"
                  imageAlt="Reserve Navi 予約管理イメージ"
                  reverse={false}
                  detailHref="/products/reserve-navi"
                  pain={
                    <>
                      予約システム、、、<strong>高すぎる。</strong>
                      <br />
                      こんなに機能いらないのに、、、
                    </>
                  }
                  solution={
                    <>
                      <p>
                        シンプルにLINEから予約。スマホで確認。次回予約もスマホから。
                      </p>
                      <p className="mt-3">
                        とにかく<strong>シンプル</strong>。そして<strong>徹底的に業界対応</strong>。
                      </p>
                      <p className="mt-3 text-sm text-gray-500">
                        業界の方の要望から作成しているから、現場にフィット。業種ごとのフォーマットで、さらにアップデート予定！
                      </p>
                    </>
                  }
                />
              </FadeIn>

              {/* ── AskNavi ── */}
              <FadeIn>
                <SolutionSection
                  icon={<IconChat className="h-7 w-7" />}
                  name="AskNavi"
                  tagline="LINE AI応答"
                  accentColor="amber"
                  imageSrc="/images/ask-navi.jpg"
                  imageAlt="AskNavi LINE AI応答イメージ"
                  reverse={true}
                  detailHref="/products/ask-navi"
                  pain={
                    <>
                      公式LINEの運用をしたい！
                      <br />
                      可能なら最近予約してくれた人とか、、、
                      <br />
                      <strong>3ヶ月いらっしゃっていない方にだけ送れないかな？</strong>
                    </>
                  }
                  solution={
                    <>
                      <p>
                        予約システムと連動した公式LINE運用を、<strong>手軽に、お得に</strong>。
                        AIに考えてもらうこともできる！
                      </p>
                      <p className="mt-3 text-sm text-gray-500">
                        接客中・施術中のお問い合わせ電話にも、<strong className="text-gray-700">AIが公式LINEで代わりに答えてくれる。</strong>
                      </p>
                    </>
                  }
                />
              </FadeIn>

              {/* ── ShiftNavi ── */}
              <FadeIn>
                <SolutionSection
                  icon={<IconClock className="h-7 w-7" />}
                  name="ShiftNavi"
                  tagline="シフト管理"
                  accentColor="emerald"
                  imageSrc="/images/shift-navi.jpg"
                  imageAlt="ShiftNavi シフト管理イメージ"
                  reverse={false}
                  detailHref="/products/shift-navi"
                  pain={
                    <>
                      シフト調整って<strong>すごく時間かかる。</strong>
                      <br />
                      従業員さんの休み希望も手書きでもらって、転記して、Excelで、、、
                    </>
                  }
                  solution={
                    <>
                      <p>
                        <strong>まるごとデジタルに！</strong>休み希望は従業員さんからスマホで簡単に。
                      </p>
                      <p className="mt-3">
                        シフト作成もまずは<strong>AIでワンタッチ作成！</strong>
                      </p>
                      <p className="mt-3 text-sm text-gray-500">
                        シフト公開も簡単！もちろんA4で印刷だってできちゃう！
                      </p>
                    </>
                  }
                />
              </FadeIn>

              {/* ── RuleNavi ── */}
              <FadeIn>
                <SolutionSection
                  icon={<IconDocument className="h-7 w-7" />}
                  name="RuleNavi"
                  tagline="社内規則AI検索"
                  accentColor="violet"
                  imageSrc="/images/rule-navi.jpg"
                  imageAlt="RuleNavi 社内規則AI検索イメージ"
                  reverse={true}
                  detailHref="/products/rule-navi"
                  pain={
                    <>
                      就業規則。マニュアル。
                      <br />
                      紙やPDFではあるけど、<strong>私だってそんなに完璧に把握しているわけじゃない。</strong>
                      <br />
                      毎回聞かれるたびにそれを開いて確認。
                    </>
                  }
                  solution={
                    <>
                      <p>
                        AIがあなたの会社の規則やマニュアルを<strong>わかりやすく答えます</strong>。
                        自然な会話で教えてくれる。
                      </p>
                      <p className="mt-3 text-sm text-gray-500">
                        答えられなかった質問は管理者が簡単に知識追加。
                        <strong className="text-gray-700">どんどん頼れる相棒に</strong>なっていきます。
                      </p>
                    </>
                  }
                />
              </FadeIn>

              {/* ── SocialNavi ── */}
              <FadeIn>
                <SolutionSection
                  icon={<IconShare className="h-7 w-7" />}
                  name="SocialNavi"
                  tagline="SNS一元管理"
                  accentColor="pink"
                  imageSrc="/images/social-navi.jpg"
                  imageAlt="SocialNavi SNS一元管理イメージ"
                  reverse={false}
                  detailHref="/products/social-navi"
                  pain={
                    <>
                      SNSは大切！更新も返信もしっかりやらなくちゃ！
                      <br />
                      わかるんです。<strong>やらなきゃいけないってことは。</strong>
                      <br />
                      でもなかなか手が動かない。担当者なんてつけられないし。
                    </>
                  }
                  solution={
                    <>
                      <p>
                        <strong>だからこそDX。</strong>
                        X、Facebook、Instagram、Threads、TikTokを<strong>まとめて管理</strong>。
                      </p>
                      <p className="mt-3 text-sm text-gray-500">
                        コメント返信や投稿もここからかんたんに。AIの力で自動化も可能！
                      </p>
                    </>
                  }
                />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ═══ Why Us ═══ */}
        <section className="bg-slate-50 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <p className="text-sm font-semibold tracking-[0.15em] text-primary uppercase">Why Us</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  なんで私たちが作っているの？
                </h2>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gray-200/60 bg-white p-8 md:p-10">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xl">
                    🏨
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">
                      <a href="http://fujimi-ryokan.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        Tabist ゆ縁の宿ふじみ
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">静岡県富士市のビジネスホテル</p>
                  </div>
                </div>

                <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-gray-600">
                  <p>
                    私たちは静岡県富士市で小さなビジネスホテルを運営しています。
                  </p>
                  <p>
                    少人数で回しているからこそ、<strong className="text-gray-800">「この時間、もっとお客様に使えないかな」</strong>の連続でした。
                  </p>
                  <p>
                    既存のDXツールを探しても、大企業向けで高すぎたり、機能が多すぎたり。
                    <strong className="text-gray-800">「ちょうどいい」がなかった</strong>んです。
                  </p>
                  <p>
                    だから、自分たちで作りました。
                  </p>
                  <p className="text-gray-800 font-medium">
                    同じ悩みを持つお店に、この仕組みを届けたい。
                    それがFUJIMI DX Labです。
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="mx-auto mt-8 grid max-w-3xl gap-4 md:grid-cols-3">
                {[
                  { emoji: "🎯", title: "必要なものだけ", description: "1つからはじめてOK。成長に合わせて追加。" },
                  { emoji: "💬", title: "現場の声から開発", description: "業界の方の要望をもとに機能を作成。" },
                  { emoji: "🤖", title: "AIがお手伝い", description: "シフト作成、LINE応答、投稿文…AIがサポート。" },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-gray-200/60 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <span className="text-3xl">{item.emoji}</span>
                    <p className="mt-3 text-sm font-bold">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{item.description}</p>
                  </div>
                ))}
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
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">会社情報</h2>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-gray-200/60 bg-white p-8">
                <dl className="divide-y divide-gray-100">
                  {([
                    ["会社名", "ふじみ企業有限会社"],
                    ["事業部", "FUJIMI DX Lab事業部"],
                    ["所在地", "静岡県富士市"],
                    ["事業内容", "小規模事業者向けDXツールの開発・提供"],
                    ["運営施設", <a key="facility" href="http://fujimi-ryokan.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Tabist ゆ縁の宿ふじみ（ビジネスホテル）</a>],
                    ["メール", <a key="email" href="mailto:support@mail.fujimin-pass.com" className="text-primary hover:underline">support@mail.fujimin-pass.com</a>],
                  ] as [string, React.ReactNode][]).map(([dt, dd]) => (
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
                「うちでも使えるかな？」
                <br />
                <span className="text-blue-200">まずは気軽にご相談ください</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-blue-100/80">
                「1つだけ試したい」「まずは話を聞きたい」
                <br />
                なんでもお気軽にどうぞ。
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
                support@mail.fujimin-pass.com
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

/* ─── Solution Section（画像付き左右交互レイアウト） ─── */
const ACCENT_MAP: Record<string, { text: string; iconBg: string; painBg: string; painBorder: string }> = {
  blue:    { text: "text-blue-600", iconBg: "bg-blue-500/10", painBg: "bg-orange-50", painBorder: "border-orange-200/60" },
  amber:   { text: "text-amber-600", iconBg: "bg-amber-500/10", painBg: "bg-orange-50", painBorder: "border-orange-200/60" },
  emerald: { text: "text-emerald-600", iconBg: "bg-emerald-500/10", painBg: "bg-orange-50", painBorder: "border-orange-200/60" },
  violet:  { text: "text-violet-600", iconBg: "bg-violet-500/10", painBg: "bg-orange-50", painBorder: "border-orange-200/60" },
  pink:    { text: "text-pink-600", iconBg: "bg-pink-500/10", painBg: "bg-orange-50", painBorder: "border-orange-200/60" },
};

function SolutionSection({
  icon,
  name,
  tagline,
  accentColor,
  imageSrc,
  imageAlt,
  reverse,
  pain,
  solution,
  detailHref,
}: {
  icon: React.ReactNode;
  name: string;
  tagline: string;
  accentColor: string;
  imageSrc: string;
  imageAlt: string;
  reverse: boolean;
  pain: React.ReactNode;
  solution: React.ReactNode;
  detailHref?: string;
}) {
  const a = ACCENT_MAP[accentColor] || ACCENT_MAP.blue;

  return (
    <div className={`grid items-center gap-10 lg:grid-cols-2 ${reverse ? "lg:direction-rtl" : ""}`}>
      {/* Image side */}
      <div className={`${reverse ? "lg:order-2" : ""}`}>
        <div className="relative overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={560}
            height={560}
            className="h-auto w-full"
          />
        </div>
      </div>

      {/* Content side */}
      <div className={`${reverse ? "lg:order-1" : ""}`}>
        {/* Product badge */}
        <div className="mb-5 flex items-center gap-3">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.iconBg} ${a.text}`}>
            {icon}
          </div>
          <div>
            <p className="text-lg font-bold">{name}</p>
            <p className="text-sm text-gray-400">{tagline}</p>
          </div>
        </div>

        {/* Pain */}
        <div className={`rounded-2xl border ${a.painBorder} ${a.painBg} p-5 mb-4`}>
          <p className="mb-2 text-xs font-bold tracking-wider text-orange-500 uppercase">こんな悩み、ありませんか？</p>
          <p className="text-[15px] leading-relaxed text-gray-700">{pain}</p>
        </div>

        {/* Solution */}
        <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm">
          <p className={`mb-2 text-xs font-bold tracking-wider uppercase ${a.text}`}>{name}なら</p>
          <div className="text-[15px] leading-relaxed text-gray-700">{solution}</div>
        </div>

        {/* 詳細ページリンク */}
        {detailHref && (
          <a
            href={detailHref}
            className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors ${a.text} hover:opacity-80`}
          >
            {name}の詳細を見る →
          </a>
        )}
      </div>
    </div>
  );
}
