import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";
import RelatedProducts from "../../components/RelatedProducts";

export const metadata: Metadata = {
  title: "Social Navi | SNS一元管理",
  description: "SNS一元管理ツール Social Navi。X・Instagram・TikTok・Facebookを一括管理。AIが投稿文を自動生成。FUJIMI DX Lab",
  openGraph: {
    title: "Social Navi | SNS一元管理 - FUJIMI DX Lab",
    description: "SNS一元管理ツール Social Navi。X・Instagram・TikTok・Facebookを一括管理。AIが投稿文を自動生成。FUJIMI DX Lab",
    images: [{ url: "/images/social-navi.jpg", width: 1200, height: 630, alt: "Social Navi SNS一元管理" }],
  },
};

const FEATURES = [
  { icon: "📱", title: "マルチSNS一元管理", description: "X・Instagram・TikTok・Facebookをひとつの画面で管理。各SNSにログインする手間がなくなります。" },
  { icon: "✍️", title: "AI投稿文生成", description: "写真をアップするだけで、AIがキャプションを自動生成。「何を書こう…」の悩みが消えます。" },
  { icon: "⏰", title: "予約投稿", description: "投稿を事前に予約。最適な時間帯にAIが自動投稿します。" },
  { icon: "📥", title: "統合受信トレイ", description: "各SNSのコメント・DMをひとつの受信トレイで確認。返信漏れを防ぎます。" },
  { icon: "📊", title: "AI週次レポート", description: "フォロワー推移・エンゲージメントをAIが分析。改善ポイントを自動で提案。" },
  { icon: "#️⃣", title: "ハッシュタグ管理", description: "業種や投稿内容に合わせて、効果的なハッシュタグをAIが提案します。" },
];

export default function SocialNaviPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Social Navi",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "X・Instagram・TikTok・Facebookを一元管理",
        url: "https://fujimi-dx-lab.com/products/social-navi",
        provider: { "@type": "Organization", name: "FUJIMI DX Lab" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: "https://fujimi-dx-lab.com" },
          { "@type": "ListItem", position: 2, name: "Social Navi", item: "https://fujimi-dx-lab.com/products/social-navi" },
        ],
      }) }} />
      <Header />
      <main>
        <section className="relative min-h-[70vh] overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28" style={{ background: "linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #be123c 100%)" }}>
          <div className="relative z-10 mx-auto max-w-6xl"><div className="max-w-2xl">
            <FadeIn><Link href="/" className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-rose-100 backdrop-blur-sm transition-colors hover:bg-white/20">← FUJIMI DX Lab トップ</Link></FadeIn>
            <FadeIn delay={0.05}><div className="mb-4 flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl">📣</span><span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wider text-rose-100 uppercase">SNS一元管理</span><span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{backgroundColor:"rgba(255,255,255,0.3)"}}>開発中</span></div></FadeIn>
            <FadeIn delay={0.1}><h1 className="text-4xl font-extrabold tracking-tight md:text-5xl" style={{ lineHeight: 1.15 }}>Social Navi<span className="mt-2 block text-lg font-medium text-rose-100 md:text-xl">SNS一元管理ツール</span></h1></FadeIn>
            <FadeIn delay={0.15}><p className="mt-6 text-xl font-medium text-rose-100">SNS投稿、やらなきゃいけないのは分かってる。<br />でも、手が回らない…</p></FadeIn>
            <FadeIn delay={0.2}><p className="mt-4 max-w-lg leading-relaxed text-rose-100/80">写真をアップするだけで、AIが投稿文を自動作成。<br />X・Instagram・TikTok・Facebookをまとめて管理。<br /><span className="font-semibold text-white">現在開発中です。リリースをお楽しみに。</span></p></FadeIn>
            <FadeIn delay={0.25}><div className="mt-8"><a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold shadow-lg transition-all duration-300 hover:scale-105" style={{ color: "#e11d48" }}>リリースのお知らせを受け取る</a></div></FadeIn>
          </div></div>
        </section>

        {/* 対応SNS */}
        <section className="px-4 py-16"><div className="mx-auto max-w-3xl">
          <FadeIn><div className="flex flex-wrap justify-center gap-4">{[{name:"X (Twitter)",color:"#000"},{name:"Instagram",color:"#E1306C"},{name:"TikTok",color:"#000"},{name:"Facebook",color:"#1877F2"}].map((sns)=>(<span key={sns.name} className="rounded-full px-5 py-2 text-sm font-semibold text-white" style={{backgroundColor:sns.color}}>{sns.name}</span>))}</div></FadeIn>
        </div></section>

        <section className="px-4 py-24 md:py-32"><div className="mx-auto max-w-4xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">こんなお悩み、ありませんか？</h2><p className="mx-auto mt-4 max-w-md text-gray-500">Social Naviなら、ぜんぶ解決します。</p></div></FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <FadeIn><div className="h-full rounded-2xl border border-red-100 bg-red-50/50 p-7"><p className="mb-5 text-sm font-bold tracking-wider text-red-400 uppercase">😥 いまの困りごと</p><ul className="space-y-3.5 text-[15px] leading-relaxed text-gray-700">{["各SNSに別々にログインして投稿している","投稿文が思いつかず、結局やらない","コメントやDMの返信が追いつかない","効果が数字で見えず、やる意味があるのか分からない","SNS担当者を置く余裕がない"].map((item,i)=>(<li key={i} className="flex gap-2.5"><span className="shrink-0 text-red-300">✕</span>{item}</li>))}</ul></div></FadeIn>
            <FadeIn delay={0.1}><div className="h-full rounded-2xl border p-7" style={{borderColor:"#fecdd3",backgroundColor:"#fff1f2"}}><p className="mb-5 text-sm font-bold tracking-wider uppercase" style={{color:"#f43f5e"}}>😊 Social Naviなら</p><ul className="space-y-3.5 text-[15px] leading-relaxed text-gray-700">{["ひとつの画面から全SNSに同時投稿","写真をアップするだけ。AIがキャプションを生成","全SNSのコメント・DMを統合受信トレイで管理","AIが週次レポートで効果を可視化・改善提案","1日5分で運用可能。専任担当不要"].map((item,i)=>(<li key={i} className="flex gap-2.5"><span className="shrink-0" style={{color:"#f43f5e"}}>◎</span>{item}</li>))}</ul></div></FadeIn>
          </div>
        </div></section>

        <section className="px-4 py-24 md:py-32" style={{backgroundColor:"#fff1f2"}}><div className="mx-auto max-w-4xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">投稿は、たった4ステップ</h2></div></FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{[{emoji:"📸",step:"1",title:"写真をアップ",desc:"お料理、施術、お店の雰囲気…撮った写真をアップ"},{emoji:"✍️",step:"2",title:"AIがキャプション生成",desc:"写真に合ったキャプションをAIが自動作成"},{emoji:"📱",step:"3",title:"SNSを選ぶ",desc:"投稿先のSNSをチェック。複数同時OK"},{emoji:"🚀",step:"4",title:"投稿 or 予約",desc:"今すぐ投稿、または最適な時間に予約投稿"}].map((s,i)=>(<FadeIn key={s.step} delay={i*0.08}><div className="text-center rounded-2xl bg-white p-6 shadow-sm"><div className="text-4xl mb-2">{s.emoji}</div><div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{backgroundColor:"#f43f5e"}}>{s.step}</div><h3 className="mt-3 text-base font-bold">{s.title}</h3><p className="mt-1 text-sm text-gray-500">{s.desc}</p></div></FadeIn>))}</div>
        </div></section>

        <section className="px-4 py-24 md:py-32"><div className="mx-auto max-w-5xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">SNS運用を、もっとラクに</h2><p className="mx-auto mt-4 max-w-md text-gray-500">投稿作成から分析まで、これひとつ。</p></div></FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{FEATURES.map((f,i)=>(<FadeIn key={f.title} delay={i*0.05}><div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"><span className="text-3xl">{f.icon}</span><h3 className="mt-4 text-base font-bold">{f.title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-500">{f.description}</p></div></FadeIn>))}</div>
        </div></section>

        <section className="px-4 py-24 md:py-32" style={{backgroundColor:"#fff1f2"}}><div className="mx-auto max-w-5xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">こんなお店に最適です</h2></div></FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{[{icon:"💇",title:"サロン・美容室",description:"ビフォーアフター写真をAIが魅力的に紹介。"},{icon:"🍽️",title:"飲食店・カフェ",description:"料理写真にぴったりのキャプションを自動生成。"},{icon:"🏨",title:"宿泊施設",description:"客室や景色の魅力をAIが発信。多言語にも対応予定。"},{icon:"🏋️",title:"フィットネス・スクール",description:"レッスン風景や生徒の声をAIが投稿に。"}].map((c,i)=>(<FadeIn key={c.title} delay={i*0.06}><div className="h-full rounded-2xl bg-white p-6 text-center shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"><span className="text-4xl">{c.icon}</span><h3 className="mt-4 text-base font-bold">{c.title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-500">{c.description}</p></div></FadeIn>))}</div>
        </div></section>

        {/* FAQ */}
        <section className="px-4 py-24 md:py-32" style={{ backgroundColor: "#fff1f2" }}>
          <div className="mx-auto max-w-3xl">
            <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">よくある質問</h2></div></FadeIn>
            <div className="mt-14 space-y-6">
              {[
                { q: "いつリリースされますか？", a: "2026年内のリリースを目指して開発中です。リリース日が決まり次第、お知らせいたします。" },
                { q: "どのSNSに対応しますか？", a: "X（Twitter）・Instagram・TikTok・Facebookの4つに対応予定です。" },
                { q: "リリース通知を受け取るには？", a: "ページ下部のお問い合わせフォームからご連絡ください。リリース時に優先的にご案内いたします。" },
              ].map((faq, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900">Q. {faq.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">A. {faq.a}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <RelatedProducts currentSlug="social-navi" />

        <section id="contact" className="relative overflow-hidden px-4 py-24 text-white md:py-32" style={{background:"linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #be123c 100%)"}}><div className="relative z-10 mx-auto max-w-3xl text-center"><FadeIn>
          <div className="mb-4"><span className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold">🚧 開発中</span></div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">リリース時にお知らせします</h2><p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-rose-100/80">Social Naviは現在開発中です。<br />リリース時のお知らせをご希望の方は、以下からご登録ください。</p><div className="mt-10"><ContactForm /></div>
        </FadeIn></div></section>
      </main>
      <Footer />
    </>
  );
}
