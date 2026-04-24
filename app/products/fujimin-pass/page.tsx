import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import SignupFlowButton from "../../components/SignupFlowButton";
import FadeIn from "../../components/FadeIn";
import RelatedProducts from "../../components/RelatedProducts";
import { ProductBreadcrumb } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "FUJIMIN PASS | 統合DXプラットフォーム",
  description: "小規模事業者向け統合DXプラットフォーム FUJIMIN PASS。予約管理・AI応答・シフト管理・社内規則検索を1アカウントで。月額550円から、必要なツールだけ選べる。FUJIMI DX Lab",
  alternates: { canonical: "https://www.fujimi-dx-lab.com/fujimin-pass" },
  openGraph: {
    title: "FUJIMIN PASS | 統合DXプラットフォーム - FUJIMI DX Lab",
    description: "小規模事業者向け統合DXプラットフォーム FUJIMIN PASS。予約管理・AI応答・シフト管理・社内規則検索を1アカウントで。月額550円から、必要なツールだけ選べる。FUJIMI DX Lab",
    images: [{ url: "/images/ogp.jpg", width: 1200, height: 630, alt: "FUJIMIN PASS 統合DXプラットフォーム" }],
  },
};

const NAVI_TOOLS = [
  { slug: "reserve-navi", name: "Reserve Navi", desc: "LINE予約管理", icon: "📅", color: "#f97316", price: "¥980〜¥4,980/月" },
  { slug: "ask-navi", name: "Ask Navi", desc: "LINE AI自動応答", icon: "💬", color: "#14b8a6", price: "¥550〜¥5,500/月" },
  { slug: "rule-navi", name: "Rule Navi", desc: "社内規則AI検索", icon: "📖", color: "#a855f7", price: "¥550〜¥5,500/月" },
  { slug: "shift-navi", name: "Shift Navi", desc: "AIシフト管理", icon: "📊", color: "#3b82f6", price: "完全無料" },
  { slug: "social-navi", name: "Social Navi", desc: "SNS一元管理", icon: "📣", color: "#f43f5e", price: "開発中", badge: "Coming Soon" },
];

const BENEFITS = [
  { icon: "🔑", title: "ひとつのアカウント", description: "ログインは1回だけ。全てのNaviツールにシームレスにアクセス。" },
  { icon: "1️⃣", title: "ひとつから始められる", description: "まずは必要なツールだけ。後から追加も簡単です。" },
  { icon: "🔗", title: "つなげるともっと便利", description: "Reserve NaviとAsk Naviを連携すれば、予約もAI応答も一元管理。" },
  { icon: "💴", title: "シンプルな料金", description: "使うツールの分だけ。不要なツールの料金はかかりません。" },
  { icon: "📱", title: "スマホでどこからでも", description: "管理画面はスマホ対応。外出先でもお店の状況を確認。" },
  { icon: "🔒", title: "安心のセキュリティ", description: "テナント分離・データ暗号化。お店のデータは厳重に保護。" },
];

export default function FujiminPassPage() {
  return (
    <>
      <ProductBreadcrumb name="FUJIMIN PASS" slug="fujimin-pass" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "FUJIMIN PASS",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "小規模事業者向け統合DXプラットフォーム",
        url: "https://www.fujimi-dx-lab.com/fujimin-pass",
        offers: { "@type": "AggregateOffer", lowPrice: "0", highPrice: "5500", priceCurrency: "JPY" },
        provider: { "@type": "Organization", name: "FUJIMI DX Lab" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "FUJIMIN PASSだけの契約は必要ですか？", acceptedAnswer: { "@type": "Answer", text: "いいえ。FUJIMIN PASSはプラットフォームなので、個別のNaviツールを契約すれば自動でアカウントが発行されます。" } },
          { "@type": "Question", name: "1つのツールだけでも使えますか？", acceptedAnswer: { "@type": "Answer", text: "はい。必要なツールだけ選んで始められます。後から追加するのも簡単です。" } },
          { "@type": "Question", name: "データは安全ですか？", acceptedAnswer: { "@type": "Answer", text: "テナント完全分離・データ暗号化・アクセスログ監視を実施しています。セキュリティは最優先事項です。" } },
          { "@type": "Question", name: "解約したらデータはどうなりますか？", acceptedAnswer: { "@type": "Answer", text: "解約後30日間はデータを保持します。その間にエクスポートも可能です。" } },
          { "@type": "Question", name: "導入のサポートはありますか？", acceptedAnswer: { "@type": "Answer", text: "はい。初期設定から運用まで、無料でサポートいたします。" } },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: "https://www.fujimi-dx-lab.com" },
          { "@type": "ListItem", position: 2, name: "FUJIMIN PASS", item: "https://www.fujimi-dx-lab.com/fujimin-pass" },
        ],
      }) }} />
      <Header />
      <main>
        <section className="relative min-h-[70vh] overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28" style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)" }}>
          <div className="relative z-10 mx-auto max-w-6xl"><div className="max-w-2xl">
            <FadeIn><Link href="/" className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-indigo-100 backdrop-blur-sm transition-colors hover:bg-white/20">← FUJIMI DX Lab トップ</Link></FadeIn>
            <FadeIn delay={0.05}><div className="mb-4 flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl">🔑</span><span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wider text-indigo-100 uppercase">統合DXプラットフォーム</span></div></FadeIn>
            <FadeIn delay={0.1}><h1 className="text-4xl font-extrabold tracking-tight md:text-5xl" style={{ lineHeight: 1.15 }}>FUJIMIN PASS<span className="mt-2 block text-lg font-medium text-indigo-100 md:text-xl">統合DXプラットフォーム</span></h1></FadeIn>
            <FadeIn delay={0.15}><p className="mt-6 text-xl font-medium text-indigo-100">お店のDX、ひとつのアカウントでまるごとカバー。</p></FadeIn>
            <FadeIn delay={0.2}><p className="mt-4 max-w-lg leading-relaxed text-indigo-100/80">予約管理、AI応答、シフト管理、社内規則検索…<br />バラバラのツールをFUJIMIN PASSでひとつに。<br /><span className="font-semibold text-white">必要なものだけ選んで始められます。</span></p><p className="mt-3 inline-block rounded-full border border-indigo-300/30 bg-indigo-400/10 px-4 py-1.5 text-sm font-semibold text-indigo-200">2026年5月1日サービス開始｜お気軽にご相談ください</p></FadeIn>
            <FadeIn delay={0.25}><div className="mt-8 flex flex-wrap gap-4"><SignupFlowButton label="申し込む" accentColor="#4f46e5" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold shadow-lg transition-all duration-300 hover:scale-105" style={{ color: "#4f46e5" }} /><a href="#contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20">相談する</a></div></FadeIn>
          </div></div>
        </section>

        {/* Ecosystem */}
        <section className="px-4 py-24 md:py-32"><div className="mx-auto max-w-5xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">5つのNaviツール</h2><p className="mx-auto mt-4 max-w-lg text-gray-500">お店に必要なツールだけ選んでスタート。<br />後から追加・連携することで、もっと便利に。</p>
            <p className="mx-auto mt-2 text-sm font-semibold" style={{ color: "#4f46e5" }}>
              FUJIMIN PASSのプラットフォーム利用料は無料です。各Naviツールの月額料金だけでご利用いただけます。
            </p></div></FadeIn>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {NAVI_TOOLS.map((tool, i) => (
              <FadeIn key={tool.slug} delay={i * 0.06}>
                <Link href={`/products/${tool.slug}`} className="block h-full rounded-2xl border-2 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ borderColor: tool.color }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{tool.icon}</span>
                    <div>
                      <h3 className="font-bold" style={{ color: tool.color }}>{tool.name}</h3>
                      {tool.badge && <span className="text-xs font-semibold text-white rounded-full px-2 py-0.5" style={{ backgroundColor: tool.color }}>{tool.badge}</span>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{tool.desc}</p>
                  <p className="mt-3 text-xs font-semibold" style={{ color: tool.color }}>{tool.price}</p>
                </Link>
              </FadeIn>
            ))}
            <FadeIn delay={0.3}>
              <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center">
                <div>
                  <p className="text-2xl mb-2">🚀</p>
                  <p className="text-sm font-semibold text-gray-500">さらに拡張予定</p>
                  <p className="mt-1 text-xs text-gray-400">新しいNaviツールを順次開発中</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div></section>

        {/* Benefits */}
        <section className="px-4 py-24 md:py-32" style={{backgroundColor:"#eef2ff"}}><div className="mx-auto max-w-5xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">FUJIMIN PASSが選ばれる理由</h2></div></FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{BENEFITS.map((b,i)=>(<FadeIn key={b.title} delay={i*0.05}><div className="h-full rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"><span className="text-3xl">{b.icon}</span><h3 className="mt-4 text-base font-bold">{b.title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-500">{b.description}</p></div></FadeIn>))}</div>
        </div></section>

        {/* Getting Started */}
        <section className="px-4 py-24 md:py-32"><div className="mx-auto max-w-4xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">はじめかた</h2><p className="mx-auto mt-4 max-w-md text-gray-500">4ステップで、今日から使えます。</p></div></FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{[{emoji:"💬",step:"1",title:"ご相談",desc:"お店の課題やご要望をお聞かせください"},{emoji:"🔑",step:"2",title:"アカウント作成",desc:"FUJIMIN PASSのアカウントを発行"},{emoji:"🛠️",step:"3",title:"Naviを選ぶ",desc:"必要なNaviツールを選んで設定"},{emoji:"🎉",step:"4",title:"運用開始！",desc:"初期設定のサポートもおまかせください"}].map((s,i)=>(<FadeIn key={s.step} delay={i*0.08}><div className="text-center rounded-2xl bg-white p-6 shadow-sm border border-gray-100"><div className="text-4xl mb-2">{s.emoji}</div><div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{backgroundColor:"#4f46e5"}}>{s.step}</div><h3 className="mt-3 text-base font-bold">{s.title}</h3><p className="mt-1 text-sm text-gray-500">{s.desc}</p></div></FadeIn>))}</div>
        </div></section>

        {/* FUJIMINポイント */}
        <section className="px-4 py-24 md:py-32" style={{backgroundColor:"#eef2ff"}}><div className="mx-auto max-w-3xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">FUJIMINポイント</h2><p className="mx-auto mt-4 max-w-md text-gray-500">全アプリ共通のAI利用ポイント。プランに含まれるポイントで足りない場合は追加購入できます。</p></div></FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">{[{name:"パック S",points:"100pt",price:"¥550"},{name:"パック M",points:"500pt",price:"¥1,650",popular:true},{name:"パック L",points:"1,500pt",price:"¥3,850"}].map((pack,i)=>(<FadeIn key={pack.name} delay={i*0.06}><div className={`rounded-2xl bg-white p-6 text-center shadow-sm border ${pack.popular?"border-indigo-300 shadow-md":"border-gray-100"} relative`}>{pack.popular&&<span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-bold text-white" style={{backgroundColor:"#4f46e5"}}>人気</span>}<p className="text-xs text-gray-500">{pack.name}</p><p className="text-2xl font-extrabold text-gray-900 mt-1">{pack.points}</p><p className="text-lg font-semibold mt-1" style={{color:"#4f46e5"}}>{pack.price}</p></div></FadeIn>))}</div>
          <FadeIn delay={0.2}><p className="mt-6 text-center text-xs text-gray-400">購入ポイントは購入日から1年間有効です。すべて税込価格です。</p></FadeIn>
        </div></section>

        {/* FAQ */}
        <section className="px-4 py-24 md:py-32"><div className="mx-auto max-w-3xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">よくある質問</h2></div></FadeIn>
          <div className="mt-14 space-y-6">{[{q:"FUJIMIN PASSだけの契約は必要ですか？",a:"いいえ。FUJIMIN PASSはプラットフォームなので、個別のNaviツールを契約すれば自動でアカウントが発行されます。"},{q:"1つのツールだけでも使えますか？",a:"はい。必要なツールだけ選んで始められます。後から追加するのも簡単です。"},{q:"データは安全ですか？",a:"テナント完全分離・データ暗号化・アクセスログ監視を実施しています。セキュリティは最優先事項です。"},{q:"解約したらデータはどうなりますか？",a:"解約後30日間はデータを保持します。その間にエクスポートも可能です。"},{q:"導入のサポートはありますか？",a:"はい。初期設定から運用まで、無料でサポートいたします。"}].map((faq,i)=>(<FadeIn key={i} delay={i*0.05}><div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"><h3 className="font-bold text-gray-900">Q. {faq.q}</h3><p className="mt-2 text-sm leading-relaxed text-gray-500">A. {faq.a}</p></div></FadeIn>))}</div>
        </div></section>

        <RelatedProducts currentSlug="fujimin-pass" />

        <section id="contact" className="relative overflow-hidden px-4 py-24 text-white md:py-32" style={{background:"linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)"}}>
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">今すぐ無料で始められます</h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-indigo-100/80">メール認証のみ・クレジットカード不要。1分で登録が完了します。</p>

              <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-left">
                <p className="font-bold text-white text-base mb-2">📦 登録後にできること</p>
                <ul className="space-y-1.5 text-xs text-indigo-100/90">
                  <li className="flex items-start gap-2"><span className="shrink-0">✓</span><span>管理画面から<strong className="text-white">必要なアプリだけ</strong>を選んでご契約</span></li>
                  <li className="flex items-start gap-2"><span className="shrink-0">✓</span><span>初回登録で<strong className="text-white">500ポイントプレゼント</strong>（90日有効・AI機能で使える）</span></li>
                  <li className="flex items-start gap-2"><span className="shrink-0">✓</span><span>アプリごとに無料プランあり（ShiftNavi フリー / ReserveNavi 無料）</span></li>
                </ul>
              </div>

              <div className="mt-8">
                <SignupFlowButton label="申し込む" accentColor="#4f46e5" className="inline-flex items-center gap-2 rounded-xl bg-white px-10 py-4 text-lg font-bold shadow-xl transition-all duration-300 hover:scale-105 active:scale-[0.98]" style={{ color: "#4f46e5" }} />
                <p className="mt-3 text-xs text-indigo-100/80">3ステップで完了（ボタンを押すと詳しい流れが表示されます）</p>
              </div>

              <div className="mt-14 pt-10 border-t border-white/20">
                <p className="text-sm text-indigo-100/80 mb-4">「どのツールから始めればいい？」などのご相談はこちら</p>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
