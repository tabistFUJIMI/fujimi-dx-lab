import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";
import FadeIn from "../../components/FadeIn";
import RelatedProducts from "../../components/RelatedProducts";

export const metadata: Metadata = {
  title: "Shift Navi | AIシフト管理",
  description: "AIシフト自動作成 Shift Navi。スタッフの休み希望をスマホで収集、AIがワンタッチでシフト生成。宿泊施設・飲食店・サロン向け。FUJIMI DX Lab",
  openGraph: {
    title: "Shift Navi | AIシフト管理 - FUJIMI DX Lab",
    description: "AIシフト自動作成 Shift Navi。スタッフの休み希望をスマホで収集、AIがワンタッチでシフト生成。宿泊施設・飲食店・サロン向け。FUJIMI DX Lab",
    images: [{ url: "/images/shift-navi.jpg", width: 1200, height: 630, alt: "Shift Navi AIシフト管理" }],
  },
};

const FEATURES = [
  { icon: "🤖", title: "AIワンタッチ作成", description: "条件を伝えるだけで、AIが最適なシフトを自動生成。何時間もかかっていた作業が数秒に。" },
  { icon: "📱", title: "スマホで休み希望", description: "スタッフはスマホから休み希望を入力。紙の回収・集計はもう不要です。" },
  { icon: "✋", title: "ドラッグ&ドロップ", description: "AIが作ったシフトを手動で微調整。直感的な操作でサッと修正できます。" },
  { icon: "🖨️", title: "A4印刷対応", description: "完成したシフトはA4用紙にきれいに印刷。紙で掲示したいお店にも対応。" },
  { icon: "📋", title: "バージョン管理", description: "修正履歴を自動保存。「前のシフトに戻したい」もワンクリック。" },
  { icon: "👑", title: "リーダー設定", description: "各シフトにリーダーを設定。責任者が一目で分かる表示に。" },
];

export default function ShiftNaviPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Shift Navi",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: "AIがシフトをワンタッチで自動作成",
        url: "https://fujimi-dx-lab.com/products/shift-navi",
        provider: { "@type": "Organization", name: "FUJIMI DX Lab" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "AIが作ったシフトは修正できますか？", acceptedAnswer: { "@type": "Answer", text: "もちろんです。ドラッグ&ドロップで直感的に修正できます。AIに再生成してもらうこともできます。" } },
          { "@type": "Question", name: "スタッフは何を操作しますか？", acceptedAnswer: { "@type": "Answer", text: "スマホから休み希望を入力するだけです。完成したシフトもスマホで確認できます。" } },
          { "@type": "Question", name: "複雑な勤務条件にも対応できますか？", acceptedAnswer: { "@type": "Answer", text: "はい。連勤制限、特定スタッフの同日回避、資格要件など、自然な言葉でAIに伝えるだけで対応します。" } },
          { "@type": "Question", name: "印刷はできますか？", acceptedAnswer: { "@type": "Answer", text: "はい。A4用紙にきれいにレイアウトされた状態で印刷できます。" } },
          { "@type": "Question", name: "料金はいくらですか？", acceptedAnswer: { "@type": "Answer", text: "現在ベータ版として無料で運用中です。正式版の料金プランは2026年内に発表予定です。お気軽にお問い合わせください。" } },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: "https://fujimi-dx-lab.com" },
          { "@type": "ListItem", position: 2, name: "Shift Navi", item: "https://fujimi-dx-lab.com/products/shift-navi" },
        ],
      }) }} />
      <Header />
      <main>
        <section className="relative min-h-[70vh] overflow-hidden px-4 pt-32 pb-20 text-white md:pt-40 md:pb-28" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)" }}>
          <div className="relative z-10 mx-auto max-w-6xl"><div className="max-w-2xl">
            <FadeIn><Link href="/" className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-blue-100 backdrop-blur-sm transition-colors hover:bg-white/20">← FUJIMI DX Lab トップ</Link></FadeIn>
            <FadeIn delay={0.05}><div className="mb-4 flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl">📊</span><span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wider text-blue-100 uppercase">AIシフト管理</span></div></FadeIn>
            <FadeIn delay={0.1}><h1 className="text-4xl font-extrabold tracking-tight md:text-5xl" style={{ lineHeight: 1.15 }}>Shift Navi<span className="mt-2 block text-lg font-medium text-blue-100 md:text-xl">AIシフト管理</span></h1></FadeIn>
            <FadeIn delay={0.15}><p className="mt-6 text-xl font-medium text-blue-100">シフト作成、まだExcelで何時間もかけてますか？</p></FadeIn>
            <FadeIn delay={0.2}><p className="mt-4 max-w-lg leading-relaxed text-blue-100/80">条件を伝えるだけで、AIがシフトを自動作成。<br />スタッフの休み希望もスマホで自動収集。<br /><span className="font-semibold text-white">面倒なシフト調整から解放されます。</span></p></FadeIn>
            <FadeIn delay={0.25}><div className="mt-8"><a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold shadow-lg transition-all duration-300 hover:scale-105" style={{ color: "#2563eb" }}>導入のご相談はこちら</a></div></FadeIn>
          </div></div>
        </section>

        <section className="px-4 py-24 md:py-32"><div className="mx-auto max-w-4xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">こんなお悩み、ありませんか？</h2><p className="mx-auto mt-4 max-w-md text-gray-500">Shift Naviなら、ぜんぶ解決します。</p></div></FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <FadeIn><div className="h-full rounded-2xl border border-red-100 bg-red-50/50 p-7"><p className="mb-5 text-sm font-bold tracking-wider text-red-400 uppercase">😥 いまの困りごと</p><ul className="space-y-3.5 text-[15px] leading-relaxed text-gray-700">{["紙やLINEで休み希望を集めて手動で集計","Excelでシフト作成に毎回2〜3時間","「この人とこの人は一緒にしないで」が複雑すぎる","急な欠勤の代わり探しが大変","完成シフトの共有がLINEグループで混乱"].map((item,i)=>(<li key={i} className="flex gap-2.5"><span className="shrink-0 text-red-300">✕</span>{item}</li>))}</ul></div></FadeIn>
            <FadeIn delay={0.1}><div className="h-full rounded-2xl border p-7" style={{borderColor:"#bfdbfe",backgroundColor:"#eff6ff"}}><p className="mb-5 text-sm font-bold tracking-wider uppercase" style={{color:"#3b82f6"}}>😊 Shift Naviなら</p><ul className="space-y-3.5 text-[15px] leading-relaxed text-gray-700">{["スマホで休み希望を自動収集・自動集計","AIがシフトを数秒で自動生成","複雑な条件もAIが考慮して最適配置","空きスタッフをすぐ確認、代わり探しも簡単","完成シフトをアプリで即共有。印刷もOK"].map((item,i)=>(<li key={i} className="flex gap-2.5"><span className="shrink-0" style={{color:"#3b82f6"}}>◎</span>{item}</li>))}</ul></div></FadeIn>
          </div>
        </div></section>

        <section className="px-4 py-24 md:py-32" style={{backgroundColor:"#eff6ff"}}><div className="mx-auto max-w-4xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">AIへの指示は、こんな感じ</h2><p className="mx-auto mt-4 max-w-md text-gray-500">自然な言葉で伝えるだけ。AIがルールを理解して最適なシフトを作ります。</p></div></FadeIn>
          <FadeIn delay={0.1}><div className="mt-10 mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-md border border-blue-100">
            <p className="text-sm text-gray-500 mb-3">💬 AIへの指示例:</p>
            <div className="space-y-2 text-[15px] text-gray-700">
              <p>「月〜金は3人以上。土日は4人。」</p>
              <p>「田中さんは水曜固定休み。」</p>
              <p>「佐藤さんと鈴木さんは同じ日にしないで。」</p>
              <p>「連勤は最大5日まで。」</p>
            </div>
            <p className="mt-4 text-xs text-gray-400">→ AIがこれらの条件を全て考慮して、最適なシフトを自動生成します。</p>
          </div></FadeIn>
        </div></section>

        <section className="px-4 py-24 md:py-32"><div className="mx-auto max-w-5xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">シフト作成が、こんなにラクに</h2><p className="mx-auto mt-4 max-w-md text-gray-500">必要な機能を、ちょうどよく。</p></div></FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{FEATURES.map((f,i)=>(<FadeIn key={f.title} delay={i*0.05}><div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"><span className="text-3xl">{f.icon}</span><h3 className="mt-4 text-base font-bold">{f.title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-500">{f.description}</p></div></FadeIn>))}</div>
        </div></section>

        <section className="px-4 py-24 md:py-32" style={{backgroundColor:"#eff6ff"}}><div className="mx-auto max-w-5xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">こんなお店に選ばれています</h2></div></FadeIn>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{[{icon:"🏨",title:"宿泊施設",description:"早番・遅番・夜勤の複雑なシフトもAIにおまかせ。"},{icon:"🍽️",title:"飲食店",description:"ランチ・ディナーの人員配置を最適化。"},{icon:"💇",title:"サロン・美容室",description:"指名予約に合わせたスタッフ配置に。"},{icon:"🏥",title:"クリニック・医療",description:"資格要件を考慮した配置をAIが自動判断。"}].map((c,i)=>(<FadeIn key={c.title} delay={i*0.06}><div className="h-full rounded-2xl bg-white p-6 text-center shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"><span className="text-4xl">{c.icon}</span><h3 className="mt-4 text-base font-bold">{c.title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-500">{c.description}</p></div></FadeIn>))}</div>
        </div></section>

        <section className="px-4 py-24 md:py-32"><div className="mx-auto max-w-3xl">
          <FadeIn><div className="text-center"><h2 className="text-3xl font-bold tracking-tight md:text-4xl">よくある質問</h2></div></FadeIn>
          <div className="mt-14 space-y-6">{[{q:"AIが作ったシフトは修正できますか？",a:"もちろんです。ドラッグ&ドロップで直感的に修正できます。AIに再生成してもらうこともできます。"},{q:"スタッフは何を操作しますか？",a:"スマホから休み希望を入力するだけです。完成したシフトもスマホで確認できます。"},{q:"複雑な勤務条件にも対応できますか？",a:"はい。連勤制限、特定スタッフの同日回避、資格要件など、自然な言葉でAIに伝えるだけで対応します。"},{q:"印刷はできますか？",a:"はい。A4用紙にきれいにレイアウトされた状態で印刷できます。"},{q:"料金はいくらですか？",a:"現在ベータ版として無料で運用中です。正式版の料金プランは2026年内に発表予定です。お気軽にお問い合わせください。"}].map((faq,i)=>(<FadeIn key={i} delay={i*0.05}><div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"><h3 className="font-bold text-gray-900">Q. {faq.q}</h3><p className="mt-2 text-sm leading-relaxed text-gray-500">A. {faq.a}</p></div></FadeIn>))}</div>
        </div></section>

        <RelatedProducts currentSlug="shift-navi" />

        <section id="contact" className="relative overflow-hidden px-4 py-24 text-white md:py-32" style={{background:"linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)"}}><div className="relative z-10 mx-auto max-w-3xl text-center"><FadeIn><h2 className="text-3xl font-bold tracking-tight md:text-4xl">まずは気軽にご相談ください</h2><p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-blue-100/80">「うちのシフトパターンでも使える？」「何人から使える？」<br />なんでもお気軽にどうぞ。無料でご相談いただけます。</p><div className="mt-10"><ContactForm /></div></FadeIn></div></section>
      </main>
      <Footer />
    </>
  );
}
