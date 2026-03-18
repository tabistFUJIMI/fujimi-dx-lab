import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";

export const metadata: Metadata = {
  title: "Rule Navi | 社内規則AI検索",
  description: "就業規則・マニュアルをAIが検索。PDFをアップロードするだけで、スタッフがチャットで質問できます。月額¥550〜。",
  openGraph: {
    title: "Rule Navi | 社内規則AI検索 - FUJIMI DX Lab",
    description: "PDFをアップするだけ。AIが就業規則・マニュアルから回答。月額¥550〜。",
    images: [{ url: "/images/rule-navi.jpg", width: 1200, height: 630, alt: "Rule Navi 社内規則AI検索" }],
  },
};

const FEATURES = [
  { icon: "🔍", title: "AIチャット検索", description: "「有給って何日前に申請？」と聞くだけ。AIが就業規則から該当箇所を見つけて回答します。" },
  { icon: "📄", title: "PDF自動取り込み", description: "就業規則やマニュアルのPDFをアップするだけ。AIが中身を読み取って検索可能にします。" },
  { icon: "❓", title: "FAQ自動生成", description: "よく聞かれる質問をAIが自動でFAQ化。新人教育の手間がぐっと減ります。" },
  { icon: "📮", title: "匿名質問箱", description: "「聞きづらいこと」も匿名で質問OK。風通しの良い職場づくりをサポート。" },
  { icon: "💓", title: "パルスチェック", description: "スタッフの声を定期的に収集。組織の健康状態を見える化します。" },
  { icon: "🏢", title: "理念・バリュー管理", description: "会社の理念や経営メッセージをAIが文脈に応じて回答に反映。" },
];

const PLANS = [
  {
    name: "ライト", price: "¥550", period: "/月", description: "小規模チームに", color: "#9333ea", bgColor: "#faf5ff",
    features: [
      { label: "ナレッジ（登録情報）", value: "100件" }, { label: "FUJIMINポイント", value: "月200pt（目安 約65回分）" }, { label: "AI検索", value: "✓" },
      { label: "FAQ自動生成", value: "✓" }, { label: "匿名質問箱", value: "✓" }, { label: "パルスチェック", value: "✓" },
      { label: "会話ログ", value: "未回答のみ・1ヶ月" }, { label: "CSVエクスポート", value: "—" }, { label: "利用人数目安", value: "〜10名" },
    ],
  },
  {
    name: "スタンダード", price: "¥1,100", period: "/月", description: "しっかり活用", recommended: true, color: "#a855f7", bgColor: "#faf5ff",
    features: [
      { label: "ナレッジ（登録情報）", value: "無制限" }, { label: "FUJIMINポイント", value: "月500pt（目安 約165回分）" }, { label: "AI検索", value: "✓" },
      { label: "FAQ自動生成", value: "✓" }, { label: "匿名質問箱", value: "✓" }, { label: "パルスチェック", value: "✓" },
      { label: "会話ログ", value: "全履歴・無制限" }, { label: "CSVエクスポート", value: "✓" }, { label: "利用人数目安", value: "〜50名" },
    ],
  },
  {
    name: "プロ", price: "¥2,200", period: "/月", description: "大きなチームに", color: "#7e22ce", bgColor: "#faf5ff",
    features: [
      { label: "ナレッジ（登録情報）", value: "無制限" }, { label: "FUJIMINポイント", value: "月1,500pt（目安 約500回分）" }, { label: "AI検索", value: "✓" },
      { label: "FAQ自動生成", value: "✓" }, { label: "匿名質問箱", value: "✓" }, { label: "パルスチェック", value: "✓" },
      { label: "会話ログ", value: "全履歴・無制限" }, { label: "CSVエクスポート", value: "✓" }, { label: "利用人数目安", value: "〜150名" },
    ],
  },
  {
    name: "エンタープライズ", price: "¥5,500", period: "/月", description: "大規模組織に", color: "#581c87", bgColor: "#faf5ff",
    features: [
      { label: "ナレッジ（登録情報）", value: "無制限" }, { label: "FUJIMINポイント", value: "月5,000pt（目安 約1,650回分）" }, { label: "AI検索（RAG）", value: "✓" },
      { label: "FAQ自動生成", value: "✓" }, { label: "匿名質問箱", value: "✓" }, { label: "パルスチェック", value: "✓" },
      { label: "会話ログ", value: "全履歴・無制限" }, { label: "CSVエクスポート", value: "✓" }, { label: "利用人数目安", value: "〜300名" },
    ],
  },
];

export default function RuleNaviPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative min-h-[70vh] overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28" style={{ background: "linear-gradient(135deg, #a855f7 0%, #9333ea 50%, #7e22ce 100%)" }}>
          <div className="relative z-10 mx-auto max-w-6xl"><div className="max-w-2xl">
            <FadeIn><Link href="/" className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-purple-100 backdrop-blur-sm transition-colors hover:bg-white/20">← FUJIMI DX Lab トップ</Link></FadeIn>
            <FadeIn delay={0.05}><div className="mb-4 flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl">📖</span><span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wider text-purple-100 uppercase">社内規則AI検索</span></div></FadeIn>
            <FadeIn delay={0.1}><h1 className="text-4xl font-extrabold tracking-tight md:text-5xl" style={{ lineHeight: 1.15 }}>Rule Navi</h1></FadeIn>
            <FadeIn delay={0.15}><p className="mt-6 text-xl font-medium text-purple-100">就業規則やマニュアル、探すのに何分かけてますか？</p></FadeIn>
            <FadeIn delay={0.2}><p className="mt-4 max-w-lg leading-relaxed text-purple-100/80">PDFをアップするだけ。スタッフはチャットで聞くだけ。<br />AIが就業規則・マニュアルから答えを見つけます。<br /><span className="font-semibold text-white">月額¥550〜。10名以下のチームにも。</span></p></FadeIn>
            <FadeIn delay={0.25}><div className="mt-8 flex flex-wrap gap-4"><a href="#pricing" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold shadow-lg transition-all duration-300 hover:scale-105" style={{ color: "#9333ea" }}>料金プランを見る</a><a href="#contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20">無料で相談する</a></div></FadeIn>
          </div></div>
        </section>

        <section className="px-4 py-24 md:py-32"><div className="mx-auto max-w-4xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">こんなお悩み、ありませんか？</h2><p className="mx-auto mt-4 max-w-md text-gray-500">Rule Naviなら、ぜんぶ解決します。</p></div></FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <FadeIn><div className="h-full rounded-2xl border border-red-100 bg-red-50/50 p-7"><p className="mb-5 text-sm font-bold tracking-wider text-red-400 uppercase">😥 いまの困りごと</p><ul className="space-y-3.5 text-[15px] leading-relaxed text-gray-700">{["「あの規則、PDFのどこに書いてあったっけ？」","新人が入るたびに同じことを何度も説明","マニュアルがバラバラで最新版がわからない","規則が変わっても全員に伝わらない","「これって聞いていいのかな…」と躊躇するスタッフ"].map((item,i)=>(<li key={i} className="flex gap-2.5"><span className="shrink-0 text-red-300">✕</span>{item}</li>))}</ul></div></FadeIn>
            <FadeIn delay={0.1}><div className="h-full rounded-2xl border p-7" style={{borderColor:"#e9d5ff",backgroundColor:"#faf5ff"}}><p className="mb-5 text-sm font-bold tracking-wider uppercase" style={{color:"#a855f7"}}>😊 Rule Naviなら</p><ul className="space-y-3.5 text-[15px] leading-relaxed text-gray-700">{["チャットで聞くだけ。AIが該当箇所を即回答","新人もベテランも、同じ品質の回答をいつでも","PDFをアップするだけ。AIが最新版を管理","更新したらすぐ反映。「知らなかった」がなくなる","匿名質問箱で、聞きづらいことも気軽に"].map((item,i)=>(<li key={i} className="flex gap-2.5"><span className="shrink-0" style={{color:"#a855f7"}}>◎</span>{item}</li>))}</ul></div></FadeIn>
          </div>
        </div></section>

        <section className="px-4 py-24 md:py-32" style={{backgroundColor:"#faf5ff"}}><div className="mx-auto max-w-4xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">かんたん3ステップで始められます</h2></div></FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-3">{[{emoji:"📄",step:"1",title:"PDFをアップロード",desc:"就業規則やマニュアルのPDFを管理画面からアップ。"},{emoji:"💬",step:"2",title:"スタッフがチャットで質問",desc:"「有給は何日前に申請？」とチャットで聞くだけ。"},{emoji:"🤖",step:"3",title:"AIが即座に回答",desc:"該当する規則の内容をAIがわかりやすく回答。"}].map((s,i)=>(<FadeIn key={s.step} delay={i*0.08}><div className="text-center rounded-2xl bg-white p-6 shadow-sm"><div className="text-4xl mb-2">{s.emoji}</div><div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{backgroundColor:"#a855f7"}}>{s.step}</div><h3 className="mt-3 text-base font-bold">{s.title}</h3><p className="mt-1 text-sm text-gray-500">{s.desc}</p></div></FadeIn>))}</div>
        </div></section>

        <section className="px-4 py-24 md:py-32"><div className="mx-auto max-w-5xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">「聞くだけ」で、すべてが分かる</h2><p className="mx-auto mt-4 max-w-md text-gray-500">規則検索だけじゃない。組織のコミュニケーションをまるごとサポート。</p></div></FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{FEATURES.map((f,i)=>(<FadeIn key={f.title} delay={i*0.05}><div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"><span className="text-3xl">{f.icon}</span><h3 className="mt-4 text-base font-bold">{f.title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-500">{f.description}</p></div></FadeIn>))}</div>
        </div></section>

        <section id="pricing" className="px-4 py-24 md:py-32" style={{backgroundColor:"#fafaf9"}}><div className="mx-auto max-w-5xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">料金プラン</h2><p className="mx-auto mt-4 max-w-md text-gray-500">月額¥550から。チームの人数に合わせて選べます。<br />すべて税込価格です。</p></div></FadeIn>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{PLANS.map((plan,i)=>(<FadeIn key={plan.name} delay={i*0.06}><div className={`relative h-full rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${plan.recommended?"shadow-md":""}`} style={{borderColor:plan.recommended?plan.color:"#e5e7eb",backgroundColor:plan.bgColor}}>{plan.recommended&&(<span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white" style={{backgroundColor:plan.color}}>おすすめ</span>)}<div className="text-center"><p className="text-sm font-semibold" style={{color:plan.color}}>{plan.name}</p><p className="mt-2 text-3xl font-extrabold text-gray-900">{plan.price}<span className="text-base font-normal text-gray-500">{plan.period}</span></p><p className="mt-1 text-xs text-gray-500">{plan.description}</p></div><div className="mt-6 space-y-2.5">{plan.features.map((f)=>(<div key={f.label} className="flex items-center justify-between text-sm"><span className="text-gray-500">{f.label}</span><span className="font-medium text-gray-900">{f.value}</span></div>))}</div><div className="mt-6"><a href="#contact" className="block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors" style={plan.recommended?{backgroundColor:plan.color,color:"#fff"}:{backgroundColor:"#f3f4f6",color:"#374151"}}>お問い合わせ</a></div></div></FadeIn>))}</div>
          <FadeIn delay={0.3}><div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center"><p className="text-sm text-gray-600"><span className="font-semibold">FUJIMINポイントとは？</span>　AIが回答するたびに消費されるポイントです。プランに含まれるポイントで足りない場合は追加購入できます。</p><p className="mt-2 text-xs text-gray-400">追加購入: 100pt / ¥550 ・ 500pt / ¥1,650 ・ 1,500pt / ¥3,850（購入から1年間有効）</p><p className="mt-1 text-xs text-gray-400">※ 回数目安はAI応答1回あたり約3ptで計算。質問の長さや登録情報の量により変動します。</p></div></FadeIn>
        </div></section>

        <section className="px-4 py-24 md:py-32"><div className="mx-auto max-w-5xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">こんな組織に選ばれています</h2></div></FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{[{icon:"🏨",title:"宿泊施設",description:"接客マニュアル、清掃手順、緊急対応…スタッフが迷わず確認。"},{icon:"🏥",title:"クリニック・医療",description:"院内規則や感染対策マニュアルをAIが即回答。"},{icon:"🏢",title:"中小企業",description:"就業規則や社内制度をスタッフが自分で確認。総務の負担軽減。"},{icon:"🏪",title:"チェーン・FC",description:"複数拠点で統一されたマニュアル運用。店舗ごとの独自ルールも対応。"}].map((c,i)=>(<FadeIn key={c.title} delay={i*0.06}><div className="h-full rounded-2xl bg-white p-6 text-center shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"><span className="text-4xl">{c.icon}</span><h3 className="mt-4 text-base font-bold">{c.title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-500">{c.description}</p></div></FadeIn>))}</div>
        </div></section>

        <section className="px-4 py-24 md:py-32" style={{backgroundColor:"#faf5ff"}}><div className="mx-auto max-w-3xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">よくある質問</h2></div></FadeIn>
          <div className="mt-14 space-y-6">{[{q:"就業規則のPDFをそのままアップするだけで使えますか？",a:"はい。PDFをアップロードすると、AIが内容を自動で読み取り・インデックス化します。特別なフォーマットは不要です。"},{q:"AIの回答は正確ですか？",a:"登録されたドキュメントの内容に基づいて回答します。回答には出典（どのドキュメントのどの部分か）も表示されるので、確認も簡単です。"},{q:"スタッフ全員のアカウントが必要ですか？",a:"いいえ。共通パスワードで全スタッフがアクセスできる仕組みなので、個別アカウント不要です。"},{q:"匿名質問箱の回答は誰がしますか？",a:"管理者が回答できます。回答は全スタッフに共有されるので、同じ疑問を持つスタッフにも届きます。"}].map((faq,i)=>(<FadeIn key={i} delay={i*0.05}><div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"><h3 className="font-bold text-gray-900">Q. {faq.q}</h3><p className="mt-2 text-sm leading-relaxed text-gray-500">A. {faq.a}</p></div></FadeIn>))}</div>
        </div></section>

        <section id="contact" className="relative overflow-hidden px-4 py-24 text-white md:py-32" style={{background:"linear-gradient(135deg, #a855f7 0%, #9333ea 50%, #7e22ce 100%)"}}><div className="relative z-10 mx-auto max-w-3xl text-center"><FadeIn><h2 className="text-3xl font-bold tracking-tight md:text-4xl">まずは気軽にご相談ください</h2><p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-purple-100/80">「うちの規模でも使える？」「どんなPDFが対応してる？」<br />なんでもお気軽にどうぞ。無料でご相談いただけます。</p><div className="mt-10"><ContactForm /></div></FadeIn></div></section>
      </main>
      <Footer />
    </>
  );
}
