import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FadeIn from "./components/FadeIn";
import ContactForm from "./components/ContactForm";
import LatestNews from "./components/LatestNews";

const TARGET_INDUSTRIES = [
  { icon: "🏨", label: "宿泊施設" },
  { icon: "💇", label: "サロン" },
  { icon: "🍽️", label: "飲食店" },
  { icon: "💆", label: "リラクゼーション" },
  { icon: "🏥", label: "クリニック" },
  { icon: "🏋️", label: "フィットネス" },
];

const SOLUTIONS = [
  {
    name: "Reserve Navi", tagline: "LINE予約管理", icon: "📅", color: "#f97316",
    href: "/products/reserve-navi", imageSrc: "/images/reserve-navi.jpg",
    pain: "予約の電話に出られない。紙のノートでダブルブッキング。予約システムは高すぎる…",
    solution: "LINEからかんたん予約。無料プランあり。月額¥980〜で始められます。",
    price: "無料〜¥5,500/月",
    badge: "まずはここから",
  },
  {
    name: "Ask Navi", tagline: "LINE AI自動応答", icon: "💬", color: "#14b8a6",
    href: "/products/ask-navi", imageSrc: "/images/ask-navi.jpg",
    pain: "同じ質問に何度も手動で返信。施術中にLINEを返せない。営業時間外は対応できない…",
    solution: "ナレッジを登録するだけ。AIが公式LINEやWebサイトで24時間自動応答します。",
    price: "¥550〜¥5,500/月",
  },
  {
    name: "Shift Navi", tagline: "AIシフト管理", icon: "📊", color: "#3b82f6",
    href: "/products/shift-navi", imageSrc: "/images/shift-navi.jpg",
    pain: "紙で休み希望を集めて手動で集計。Excelでシフト作成に毎回2〜3時間…",
    solution: "スタッフの休み希望をスマホで自動収集。AIがシフトをワンタッチで自動作成。",
    price: "お問い合わせ",
  },
  {
    name: "Rule Navi", tagline: "社内規則AI検索", icon: "📖", color: "#a855f7",
    href: "/products/rule-navi", imageSrc: "/images/rule-navi.jpg",
    pain: "PDFのどこに書いてあったっけ？新人に毎回同じ説明。マニュアルがバラバラ…",
    solution: "PDFをアップするだけ。スタッフがチャットで聞けば、AIが該当箇所を即回答。",
    price: "¥550〜¥5,500/月",
  },
  {
    name: "Social Navi", tagline: "SNS一元管理", icon: "📣", color: "#f43f5e",
    href: "/products/social-navi", imageSrc: "/images/social-navi.jpg",
    pain: "各SNSに別々にログイン。投稿文が思いつかない。効果が見えない…",
    solution: "写真をアップするだけでAIが投稿文を生成。X・Instagram・TikTok・Facebookをまとめて管理。",
    price: "開発中",
    badge: "Coming Soon",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[100vh] overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28" style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)" }}>
          <h1 className="sr-only">FUJIMI DX Lab — 小規模事業者のためのDXツール</h1>
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <FadeIn>
                  <p className="mb-5 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur-sm">
                    ひとつからはじめられるDX
                  </p>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl" style={{ lineHeight: 1.1 }}>
                    「この時間、もっと
                    <br />
                    お客様に使えないかな？」
                  </p>
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
                <p className="mt-2 inline-block rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-orange-300">
                    2025年4月上旬 サービス開始予定｜事前相談受付中
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
                    <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-600">
                      📅 まずは気軽に相談する
                    </a>
                    <a href="#solutions" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                      すべてのツールを見る
                    </a>
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={0.2} className="mt-8 w-full max-w-md mx-auto lg:mt-0 lg:max-w-none">
                <div className="relative">
                  <Image src="/images/hero-illustration.jpg" alt="小規模事業者のDXイメージ" width={600} height={400} className="rounded-2xl" priority />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FUJIMI DX Labとは */}
        <section className="bg-white px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">FUJIMI DX Labとは</h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-8 text-[15px] leading-relaxed text-gray-600">
                FUJIMI DX Labは、ふじみ企業有限会社が運営するDX事業部です。静岡県富士市でビジネスホテルを運営する中で生まれた、小さなお店のための業務改善ツールを開発・提供しています。
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-8 rounded-2xl border-2 p-8 shadow-sm" style={{ borderColor: "#e0e7ff", backgroundColor: "#eef2ff" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ backgroundColor: "#4f46e5" }}>
                    <span className="text-white">🔑</span>
                  </span>
                  <h3 className="text-lg font-bold" style={{ color: "#4f46e5" }}>FUJIMIN PASS</h3>
                </div>
                <p className="text-[15px] leading-relaxed text-gray-600">
                  私たちが提供する統合DXサービスです。予約管理・AI応答・シフト管理・社内規則検索・SNS管理を、<strong className="text-gray-800">ひとつのアカウントで必要なものだけ選んで</strong>使えます。
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <a href="/products/fujimin-pass" className="inline-flex items-center justify-center rounded-xl px-8 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: "#4f46e5" }}>
                    FUJIMIN PASSとは →
                  </a>
                  <span className="inline-flex items-center justify-center rounded-xl border-2 px-8 py-3 text-sm font-bold" style={{ borderColor: "#4f46e5", color: "#4f46e5", backgroundColor: "#eef2ff" }}>
                    4月上旬サービス開始予定
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 導入実績 */}
        <section style={{ backgroundColor: "#f8fafc" }} className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">開発者自身が、毎日使っています</h2>
                <div className="mx-auto mt-6 flex items-center justify-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg" style={{ backgroundColor: "#eef2ff" }}>🏨</div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-gray-800">Tabist ゆ縁の宿ふじみ</p>
                    <p className="text-xs text-gray-500">静岡県富士市のビジネスホテル</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "💬",
                  name: "Ask Navi",
                  color: "#14b8a6",
                  text: "お客様からの問い合わせにAIが24時間対応。スタッフは接客に集中できるようになりました",
                },
                {
                  icon: "📊",
                  name: "Shift Navi",
                  color: "#3b82f6",
                  text: "Excel作業が大幅に短縮。AIがシフトを自動作成し、スタッフの休み希望もスマホで収集",
                },
                {
                  icon: "📖",
                  name: "Rule Navi",
                  color: "#a855f7",
                  text: "就業規則やマニュアルをAIが検索。新人からベテランまで、いつでも即座に確認できます",
                },
              ].map((item, i) => (
                <FadeIn key={item.name} delay={i * 0.1}>
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className="font-bold" style={{ color: item.color }}>{item.name}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">{item.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.3}>
              <p className="mt-12 text-center text-[15px] font-medium text-gray-800">
                同じ悩みを持つお店に、この仕組みを届けたい。それがFUJIMI DX Labの原点です。
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">たとえば、こんな課題ありませんか？</h2>
                <p className="mx-auto mt-4 max-w-lg text-gray-500">FUJIMI DX Labは、現場の「困った」から生まれたツールです。<br /><strong className="text-gray-700">ひとつからはじめられます。</strong></p>
              </div>
            </FadeIn>
            <div className="mt-16 space-y-8">
              {SOLUTIONS.map((s, i) => (
                <FadeIn key={s.name} delay={i * 0.05}>
                  <a href={s.href} className="group block rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-5">
                      <div className="md:col-span-2 relative h-48 md:h-auto">
                        <Image src={s.imageSrc} alt={s.name} fill className="object-cover" />
                      </div>
                      <div className="md:col-span-3 p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{s.icon}</span>
                          <div>
                            <h3 className="font-bold text-lg" style={{ color: s.color }}>{s.name}</h3>
                            <p className="text-xs text-gray-400">{s.tagline}</p>
                          </div>
                          {s.badge && <span className="rounded-full px-3 py-0.5 text-xs font-bold text-white" style={{ backgroundColor: s.color }}>{s.badge}</span>}
                        </div>
                        <div className="rounded-xl p-4 mb-3" style={{ backgroundColor: "#fef2f2" }}>
                          <p className="text-xs font-bold text-red-400 mb-1">😥 こんな悩み</p>
                          <p className="text-sm text-gray-700">{s.pain}</p>
                        </div>
                        <div className="rounded-xl p-4" style={{ backgroundColor: `${s.color}08` }}>
                          <p className="text-xs font-bold mb-1" style={{ color: s.color }}>😊 {s.name}なら</p>
                          <p className="text-sm text-gray-700">{s.solution}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm font-semibold" style={{ color: s.color }}>{s.price}</span>
                          <span className="text-sm font-semibold text-gray-400 group-hover:translate-x-1 transition-transform">詳細を見る →</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section style={{ backgroundColor: "#f8fafc" }} className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">なんで私たちが作っているの？</h2>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-gray-100 bg-white p-8 md:p-10 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl" style={{ backgroundColor: "#eef2ff" }}>🏨</div>
                  <div>
                    <h3 className="text-lg font-bold">Tabist ゆ縁の宿ふじみ</h3>
                    <p className="mt-1 text-sm text-gray-500">静岡県富士市のビジネスホテル</p>
                  </div>
                </div>
                <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-gray-600">
                  <p>私たちは静岡県富士市で小さなビジネスホテルを運営しています。</p>
                  <p>少人数で回しているからこそ、<strong className="text-gray-800">「この時間、もっとお客様に使えないかな」</strong>の連続でした。</p>
                  <p>既存のDXツールを探しても、大企業向けで高すぎたり、機能が多すぎたり。<strong className="text-gray-800">「ちょうどいい」がなかった</strong>んです。</p>
                  <p>だから、自分たちで作りました。</p>
                  <p className="text-gray-800 font-medium">同じ悩みを持つお店に、この仕組みを届けたい。それがFUJIMI DX Labです。</p>
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
                  <div key={item.title} className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="text-3xl">{item.emoji}</span>
                    <p className="mt-3 text-sm font-bold">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{item.description}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Company */}
        <section id="company" className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">会社情報</h2></div></FadeIn>
            <FadeIn>
              <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <dl className="divide-y divide-gray-100">
                  {([
                    ["会社名", "ふじみ企業有限会社"],
                    ["事業部", "FUJIMI DX Lab事業部"],
                    ["所在地", "静岡県富士市"],
                    ["事業内容", "小規模事業者向けDXツールの開発・提供"],
                    ["運営施設", <a key="f" href="https://fujimi-ryokan.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: "#4f46e5" }}>Tabist ゆ縁の宿ふじみ（ビジネスホテル）</a>],
                    ["メール", <a key="e" href="mailto:support@mail.fujimin-pass.com" className="hover:underline" style={{ color: "#4f46e5" }}>support@mail.fujimin-pass.com</a>],
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

        {/* CTA */}
        <section id="contact" className="relative overflow-hidden px-4 py-24 text-white md:py-32" style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)" }}>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                「うちでも使えるかな？」
                <br />
                <span className="text-slate-300">まずは気軽にご相談ください</span>
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-slate-400">
                「1つだけ試したい」「まずは話を聞きたい」<br />なんでもお気軽にどうぞ。
              </p>
              <div className="mt-10"><ContactForm /></div>
            </FadeIn>
          </div>
        </section>
      </main>
      <LatestNews />
      <Footer />
    </>
  );
}
