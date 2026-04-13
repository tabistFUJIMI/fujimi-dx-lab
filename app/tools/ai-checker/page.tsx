"use client";

import { useState } from "react";
import type {
  SeoResult,
  GeoResult,
  SeoCheckItem,
  GeoImprovement,
  SiteAnalysis,
} from "@/lib/ai-checker/types";
import Link from "next/link";

// --- Icons (SVG) ---
function IconSearch({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
function IconChart({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h2v8H3zM9 8h2v13H9zM15 4h2v17h-2zM21 10h-2v11h2z" />
    </svg>
  );
}
function IconBeaker({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  );
}
function IconLightbulb({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M9.75 8.25a3 3 0 116 0 3 3 0 01-6 0z" />
    </svg>
  );
}
function IconChevron({ className = "w-5 h-5", up = false }: { className?: string; up?: boolean }) {
  return (
    <svg className={`${className} transition-transform ${up ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function IconCheck({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconWarn({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}
function IconX({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconArrow({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
function IconExternal({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}
function Spinner({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// --- FAQ ---
const faqData = [
  { q: "AI対策チェッカーとは何ですか？", a: "AI対策チェッカーは、WebサイトのURLを入力するだけでSEO（検索エンジン最適化）とGEO/LLMO（AI検索最適化）のスコアを無料で診断するツールです。ChatGPT、Gemini、Perplexity、ClaudeなどのAI検索エンジンにあなたのサイトが引用されやすいかを評価し、具体的な検証結果を提示します。" },
  { q: "GEO（Generative Engine Optimization）とは何ですか？", a: "GEOとは、ChatGPTやGeminiなどのAI検索エンジンの回答で、自社サイトが引用・推薦されるよう最適化する手法です。従来のSEOがGoogleの検索結果で上位表示を目指すのに対し、GEOはAIが回答を生成する際の引用元として選ばれることを目指します。" },
  { q: "LLMOとGEOの違いは何ですか？", a: "LLMO（Large Language Model Optimization）はAIの事前学習データに自社情報を含めることを重視し、GEOはAIがリアルタイム検索（RAG）で情報を取得する際の引用されやすさを重視します。実務上はほぼ同義で使われることが多く、AI対策チェッカーでは両方をまとめて評価しています。" },
  { q: "なぜ従来のSEO対策だけでは不十分なのですか？", a: "AI Overviewsの普及でオーガニック検索のクリック率が最大61%減少するケースが報告されています。Yext社の17.2百万件の分析では、各AIエンジンが異なる基準で引用元を選んでいます。SEOの上位表示とAIでの引用は必ずしも連動しないため、GEO/LLMO対策が別途必要です。" },
  { q: "各AI検索エンジンはどのように引用元を選んでいますか？", a: "ChatGPTはホスピタリティ業界で公式サイトを38%引用し業界により差があります。GeminiはGoogle検索インデックスと構造化データを重視します。Perplexityは業界横断で安定した引用パターンを示します。Claudeは他モデルの2〜4倍のユーザー生成コンテンツ（口コミ・レビュー）を引用する傾向があります。" },
  { q: "診断は無料ですか？", a: "AI対策チェッカーは完全無料でご利用いただけます。1日あたり3回までの利用制限がありますが、登録不要でどなたでもお使いいただけます。" },
  { q: "どのような項目をチェックしますか？", a: "SEO面では、title、meta description、OGP、見出し構造、構造化データ（JSON-LD）、画像alt属性、サイトマップ解析、ブログの有無、更新頻度等をチェックします。GEO/LLMO面では、AIによるコンテンツの引用されやすさ、AI理解しやすさ、E-E-A-T要素、コンテンツ鮮度、AI検索シミュレーションを評価します。" },
];

const faqJsonLd = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqData.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const webAppJsonLd = {
  "@context": "https://schema.org", "@type": "WebApplication",
  name: "AI対策チェッカー",
  description: "AI対策チェッカーは、WebサイトのURLを入力するだけでSEOとGEO/LLMO（AI検索最適化）のスコアを診断する無料ツールです。",
  url: "https://fujimi-dx-lab.com/tools/ai-checker",
  applicationCategory: "SEO Tool", operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
  provider: { "@type": "Organization", name: "FUJIMI DX Lab", url: "https://fujimi-dx-lab.com" },
};

// --- Main Component ---
export default function AICheckerPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [seoResult, setSeoResult] = useState<{ url: string; analyzedAt: string; seo: SeoResult; siteAnalysis?: SiteAnalysis; _pageData: Record<string, unknown> } | null>(null);
  const [geoResult, setGeoResult] = useState<GeoResult | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const analyze = async () => {
    if (!url.trim()) return;
    setLoading(true); setError(""); setSeoResult(null); setGeoResult(null); setGeoLoading(false);
    try {
      const res = await fetch("/api/ai-checker/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: url.trim() }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setSeoResult(data);
      // Auto-start GEO analysis
      setGeoLoading(true);
      try {
        const geoRes = await fetch("/api/ai-checker/analyze/geo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pageData: { ...data._pageData, url: data.url } }) });
        const geoData = await geoRes.json();
        if (geoRes.ok) setGeoResult(geoData);
      } catch { /* GEO analysis failed silently — SEO result still shown */ }
      finally { setGeoLoading(false); }
    } catch { setError("通信エラーが発生しました"); }
    finally { setLoading(false); }
  };

  const toggle = (k: string) => setExpanded((p) => ({ ...p, [k]: !p[k] }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden px-6 py-20 md:py-32 flex flex-col items-center text-center bg-gradient-to-b from-white to-[#f3f3fe]">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4cd7f6] blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b4c5ff] blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-sm font-semibold text-[#004ac6] tracking-widest mb-4 uppercase">FUJIMI DX Lab 無料ツール</p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#191b23] mb-6">AI対策チェッカー</h1>
          <p className="text-xl md:text-2xl text-[#434655] mb-12 max-w-2xl mx-auto leading-relaxed">
            あなたのサイトは、SEOの基本ができていますか？<br className="hidden md:block" />
            良いSEOはAI検索対策の土台になります。<strong className="text-[#004ac6]">無料で診断</strong>
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3 w-full max-w-2xl mx-auto bg-white p-2 rounded-3xl shadow-xl shadow-[#191b23]/5">
            <div className="relative flex-1 w-full">
              <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737686]" />
              <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !loading && analyze()}
                placeholder="https://example.com" disabled={loading}
                className="w-full bg-transparent border-none focus:ring-0 pl-12 pr-4 py-4 text-lg placeholder:text-[#737686]/50 text-[#191b23]" />
            </div>
            <button onClick={analyze} disabled={loading || !url.trim()}
              className="w-full md:w-auto bg-[#2563eb] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#004ac6] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
              {loading ? <><Spinner /> 分析中</> : <>診断する <IconChart className="w-5 h-5" /></>}
            </button>
          </div>
          {loading && <p className="mt-6 text-sm text-[#434655] animate-pulse">ページを取得してSEOをチェック中...</p>}
          {error && (
            <div className="mt-6 p-4 bg-[#ffdad6] border border-[#ba1a1a]/20 rounded-2xl text-[#ba1a1a] text-sm flex items-center gap-2">
              <IconWarn className="w-5 h-5 flex-shrink-0" />{error}
            </div>
          )}
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      {seoResult && (
        <section className="px-6 py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-sm text-[#434655] mb-1">診断結果</p>
            <p className="text-center mb-6">
              <a href={seoResult.url} target="_blank" rel="noopener noreferrer" className="text-[#004ac6] hover:underline text-sm inline-flex items-center gap-1">
                {seoResult.url} <IconExternal className="w-3.5 h-3.5" />
              </a>
            </p>

            {/* Disclaimer */}
            <div className="mb-10 p-4 bg-[#f3f3fe] rounded-2xl border border-[#e1e2ed] text-sm text-[#434655] leading-relaxed">
              <p className="font-semibold text-[#191b23] mb-1">この診断結果について</p>
              <p>AI検索（ChatGPT・Gemini・Perplexity・Claude等）はまだ発展途上の技術です。各AIの引用ロジックは非公開で、数ヶ月単位で大きく変わります。「これをやれば確実にAIに引用される」という確定的な手法は現時点では存在しません。ただし、<strong className="text-[#191b23]">良いSEO対策がそのままAI検索対策の土台になる</strong>という点は業界の専門家がほぼ一致しています。このチェッカーは「現時点で効果が期待できる構造」の目安を提示するものです。</p>
            </div>

            {/* Site-wide analysis */}
            {seoResult.siteAnalysis && seoResult.siteAnalysis.pagesAnalyzed > 1 && (
              <div className="mb-10 p-5 bg-white rounded-2xl border border-[#c3c6d7]/30">
                <p className="text-sm font-semibold text-[#191b23] mb-3">AIと同じ目線: サイト内{seoResult.siteAnalysis.pagesAnalyzed}ページを分析しました</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                  {seoResult.siteAnalysis.pages.map((p, i) => (
                    <div key={i} className={`p-3 rounded-xl text-sm ${p.url === seoResult.url ? "bg-[#dbe1ff]/30 border border-[#004ac6]/20" : "bg-[#f3f3fe]"}`}>
                      <p className="font-medium text-[#191b23] truncate text-xs">{p.title || new URL(p.url).pathname}</p>
                      <p className={`text-lg font-bold mt-1 ${p.score >= 80 ? "text-emerald-600" : p.score >= 50 ? "text-amber-600" : "text-[#ba1a1a]"}`}>{p.score}<span className="text-xs text-[#737686] font-normal">/100</span></p>
                      {p.url === seoResult.url && <p className="text-[10px] text-[#004ac6]">入力ページ</p>}
                    </div>
                  ))}
                </div>
                {seoResult.siteAnalysis.bestPage && (
                  <p className="text-sm text-[#434655]">
                    AIに最も見つけてもらいやすいページ: <strong className="text-[#191b23]">{seoResult.siteAnalysis.bestPage.title}</strong>（スコア: {seoResult.siteAnalysis.bestPage.score}/100）
                  </p>
                )}
                <p className="text-xs text-[#737686] mt-2">サイト平均: {seoResult.siteAnalysis.averageScore}/100 ・ AIは検索時にサイト内の複数ページを確認し、最も適切なページを引用します</p>
              </div>
            )}

            {/* Score Gauges */}
            {geoResult ? (
              <div className="grid grid-cols-3 gap-8 mb-14">
                <ScoreGauge label="総合スコア" score={Math.round(seoResult.seo.score * 0.4 + geoResult.score * 0.6)} color="#004ac6" />
                <ScoreGauge label="SEOスコア" score={seoResult.seo.score} color="#16a34a" />
                <ScoreGauge label="GEO/LLMOスコア" score={geoResult.score} color={geoResult.score >= 50 ? "#d97706" : "#ba1a1a"} />
              </div>
            ) : (
              <div className="flex justify-center mb-14">
                <ScoreGauge label="SEOスコア" score={seoResult.seo.score} color="#16a34a" size="lg" />
              </div>
            )}

            {/* Accordions */}
            <Accordion title="ページSEO" score={sum(seoResult.seo.pageSeo)} max={40} bg="bg-[#f3f3fe]" open={expanded["p"]} onToggle={() => toggle("p")}>
              <CheckList items={seoResult.seo.pageSeo} />
            </Accordion>
            <Accordion title="サイトSEO" score={sum(seoResult.seo.siteSeo)} max={20} bg="bg-[#f3f3fe]" open={expanded["s"]} onToggle={() => toggle("s")}>
              <CheckList items={seoResult.seo.siteSeo} />
            </Accordion>
            <Accordion title="GEO対応要素" score={sum(seoResult.seo.geoSeo)} max={40} bg="bg-[#dbe1ff]/40" accent="text-[#004ac6]" open={expanded["g"]} onToggle={() => toggle("g")}>
              <CheckList items={seoResult.seo.geoSeo} />
            </Accordion>

            {/* GEO AI Analysis */}
            {!geoResult && !geoLoading && !loading && (
              <div className="text-center p-8 mt-4 bg-[#f3f3fe] rounded-2xl">
                <p className="text-sm text-[#737686]">AI構造検証の結果はありません</p>
              </div>
            )}
            {geoLoading && (
              <div className="text-center p-8 mt-4 bg-[#e8fffe] rounded-2xl border border-[#4cd7f6]/20">
                <Spinner className="w-8 h-8 text-[#06b6d4] mx-auto mb-3" />
                <p className="text-[#434655] font-medium">AIによる構造検証を実行中...</p>
                <p className="text-xs text-[#737686] mt-1">10〜20秒ほどかかります</p>
              </div>
            )}
            {geoResult && (
              <>
                <Accordion title="GEO/LLMO AI分析" score={geoResult.score} max={100} bg="bg-[#e8fffe]" accent="text-[#06b6d4]" open={expanded["ai"]} onToggle={() => toggle("ai")}>
                  <div className="space-y-3">
                    {(["citability", "aiReadability", "eeat", "freshness", "aiSimulation"] as const).map((k) => {
                      const labels = { citability: "引用されやすさ", aiReadability: "AI理解しやすさ", eeat: "E-E-A-T要素", freshness: "コンテンツ鮮度", aiSimulation: "AI検索シミュレーション" };
                      const d = geoResult[k]; const pct = Math.round((d.score / d.maxScore) * 100);
                      return (
                        <div key={k} className="p-4 bg-white rounded-2xl border border-[#c3c6d7]/30">
                          <div className="flex justify-between mb-1.5"><span className="text-sm font-semibold text-[#191b23]">{labels[k]}</span><span className="text-sm text-[#737686]">{d.score}/{d.maxScore}</span></div>
                          <div className="w-full bg-[#e1e2ed] rounded-full h-2 mb-2"><div className={`h-2 rounded-full transition-all ${pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-[#ba1a1a]"}`} style={{ width: `${pct}%` }} /></div>
                          <ul className="text-xs text-[#434655] space-y-0.5">{d.details.map((det, i) => <li key={i} className="leading-relaxed">・{det}</li>)}</ul>
                        </div>
                      );
                    })}
                  </div>
                </Accordion>
                {geoResult.siteStructure && (
                  <div className="mt-6 p-5 bg-white rounded-2xl border border-[#c3c6d7]/30">
                    <h4 className="text-sm font-bold text-[#191b23] mb-2">AIが推測したサイト構造</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div><span className="text-[#737686]">種類:</span> <span className="font-medium">{geoResult.siteStructure.siteType}</span></div>
                      <div><span className="text-[#737686]">規模:</span> <span className="font-medium">{geoResult.siteStructure.estimatedScale}</span></div>
                      <div><span className="text-[#737686]">ブログ:</span> <span className="font-medium">{geoResult.siteStructure.hasBlog ? "あり" : "なし"}</span></div>
                      <div><span className="text-[#737686]">FAQ:</span> <span className="font-medium">{geoResult.siteStructure.hasFaq ? "あり" : "なし"}</span></div>
                    </div>
                    {geoResult.siteStructure.notes && <p className="text-xs text-[#737686] mt-2">{geoResult.siteStructure.notes}</p>}
                  </div>
                )}

                {geoResult.improvements.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-[#191b23] mb-4">検証結果</h3>
                    <div className="space-y-4">
                      {geoResult.improvements.map((imp, i) => <ImprovementCard key={i} imp={imp} />)}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* CTA */}
            <div className="mt-12 text-center p-8 bg-[#f3f3fe] rounded-3xl">
              <p className="text-[#434655] mb-3">DX推進やAI活用についてもっと知りたい方はこちら</p>
              <Link href="/" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#004ac6] text-white rounded-2xl font-bold hover:bg-[#003ea8] transition-all shadow-md shadow-[#004ac6]/20">
                FUJIMI DX Lab トップへ <IconArrow className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== ABOUT ===== */}
      <section className="px-6 py-20 bg-[#f3f3fe]">
        <article className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#191b23] mb-4">AI対策チェッカーとは？</h2>
          <p className="text-[#434655] text-center mb-12 max-w-2xl mx-auto leading-relaxed">
            AI対策チェッカーは、WebサイトのSEOの基本ができているかを診断し、その上でAI検索にも対応できる構造になっているかを確認する無料ツールです。
            業界の専門家が一致する「良いSEO = AI対策の土台」という考え方に基づいています。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard icon={<IconChart className="w-8 h-8 text-[#004ac6]" />} title="SEO診断" desc="title、構造化データ、サイトマップ、ブログの有無、更新頻度など20項目以上をチェック。良いSEOがすべての土台です" />
            <FeatureCard icon={<IconBeaker className="w-8 h-8 text-[#06b6d4]" />} title="AI対応構造チェック" desc="AIがコンテンツを見つけやすい構造になっているかを分析。ただしAI検索は発展途上であり、結果は目安です" />
            <FeatureCard icon={<IconLightbulb className="w-8 h-8 text-[#d97706]" />} title="改善のヒント" desc="構造的に足りないものをやさしい言葉でお伝えします。エビデンスの確度も併せて表示します" />
          </div>
        </article>
      </section>

      {/* ===== GEO EDUCATION ===== */}
      <section className="px-6 py-20">
        <article className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#191b23] mb-12">AI検索時代のSEOについて、正直にお伝えします</h2>
          <section className="mb-10">
            <h3 className="text-xl font-bold text-[#191b23] mb-3">AI検索のトラフィックは、まだごくわずかです</h3>
            <p className="text-[#434655] leading-relaxed">Ahrefs社の75,000サイト分析（2026年4月）によると、AI検索からのトラフィックは全体の約0.26%。日本のミエルカ社の実測でも0.1%程度です。GoogleのAI Modeでは75%のセッションが外部サイトを訪問せずに終了しています。AI検索で劇的にトラフィックが増えるという期待は、現時点では現実的ではありません。</p>
          </section>
          <section className="mb-10">
            <h3 className="text-xl font-bold text-[#191b23] mb-3">でも、良いSEOはAI対策の土台になります</h3>
            <p className="text-[#434655] leading-relaxed">業界の専門家はほぼ一致して「良いSEO対策がそのままAI検索対策の土台になる」と言っています。SEO専門家のLily Ray氏（フォロワー11.5万人）は「AI searchで効くものを調べると、結局"良いSEO"に帰結する」と述べています。Googleも公式に「基本的なSEOベストプラクティスがAI機能にも適用できる」と確認しています。</p>
          </section>
          <section className="mb-10">
            <h3 className="text-xl font-bold text-[#191b23] mb-3">AI検索は発展途上。仕組みは急速に変わります</h3>
            <p className="text-[#434655] leading-relaxed">各AI検索エンジンの引用ロジックは非公開で、数ヶ月単位で大きく変わります。2026年3月のChatGPT 5.3アップデートでは外部リンクが大幅に減少しました。「これをやれば確実にAIに引用される」という手法は存在しません。ただし、AIにブランドを認知してもらうこと（社名の言及）が、指名検索につながる間接効果は期待できます。</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-[#191b23] mb-4">各AI検索エンジンの引用傾向（参考データ）</h3>
            <p className="text-sm text-[#737686] mb-3">※ 以下は傾向データであり、各社の公式発表ではありません。ロジックは予告なく変わる可能性があります。</p>
            <div className="overflow-x-auto rounded-3xl border border-[#c3c6d7]/30">
              <table className="w-full text-sm">
                <thead><tr className="bg-[#f3f3fe]"><th className="px-5 py-3 text-left font-semibold text-[#191b23]">AI検索</th><th className="px-5 py-3 text-left font-semibold text-[#191b23]">観察されている傾向</th><th className="px-5 py-3 text-left font-semibold text-[#191b23]">重視していそうなもの</th></tr></thead>
                <tbody className="divide-y divide-[#e1e2ed]">
                  <tr><td className="px-5 py-3 font-medium">ChatGPT</td><td className="px-5 py-3 text-[#434655]">業界により異なる。ホテル業界では公式サイトの引用率が比較的高い</td><td className="px-5 py-3 text-[#434655]">公式サイト、ディレクトリ</td></tr>
                  <tr className="bg-[#faf8ff]"><td className="px-5 py-3 font-medium">Gemini</td><td className="px-5 py-3 text-[#434655]">Google検索の結果をベースに回答を生成</td><td className="px-5 py-3 text-[#434655]">Google検索での評価（SEO）</td></tr>
                  <tr><td className="px-5 py-3 font-medium">Perplexity</td><td className="px-5 py-3 text-[#434655]">業界を問わず比較的安定した引用パターン</td><td className="px-5 py-3 text-[#434655]">公式サイト＋ディレクトリ</td></tr>
                  <tr className="bg-[#faf8ff]"><td className="px-5 py-3 font-medium">Claude</td><td className="px-5 py-3 text-[#434655]">口コミやレビューの参照が他より多い傾向</td><td className="px-5 py-3 text-[#434655]">評判シグナル</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#737686] mt-2">参考: Yext社分析データ（2026年）。傾向の観察であり、各社の公式な仕様ではありません</p>
          </section>
        </article>
      </section>

      {/* ===== COLUMN CTA ===== */}
      <section className="px-6 py-14 bg-[#f3f3fe]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#191b23] mb-3">GEO/LLMO対策コラム</h2>
          <p className="text-[#434655] mb-6">AI検索最適化の実践的なノウハウを発信しています</p>
          <Link href="/column" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#004ac6] text-[#004ac6] rounded-2xl font-bold hover:bg-[#004ac6] hover:text-white transition-all">
            コラム一覧を見る <IconArrow className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#191b23] mb-10">よくある質問</h2>
          <div className="space-y-3">
            {faqData.map((f, i) => (
              <details key={i} className="bg-white rounded-2xl border border-[#c3c6d7]/30 overflow-hidden group" name="faq">
                <summary className="px-6 py-5 cursor-pointer font-semibold text-[#191b23] hover:bg-[#f3f3fe] transition-colors">{f.q}</summary>
                <p className="px-6 pb-5 text-[#434655] text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER CTA ===== */}
      <section className="relative overflow-hidden px-6 py-20 text-center bg-gradient-to-tr from-[#004ac6] to-[#2563eb] text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-20 w-64 h-64 bg-white blur-[100px] rounded-full" />
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-[#4cd7f6] blur-[100px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">まずはSEOの土台を確認しましょう</h2>
          <p className="text-white/70 mb-8 text-lg">URLを入力するだけ。登録不要・完全無料です。</p>
          <button onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => document.querySelector<HTMLInputElement>("input[type='url']")?.focus(), 500); }}
            className="bg-white text-[#004ac6] px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#f3f3fe] transition-all shadow-lg">
            診断する
          </button>
        </div>
      </section>
    </>
  );
}

// --- Sub Components ---

function ScoreGauge({ label, score, color, size = "md" }: { label: string; score: number; color: string; size?: "md" | "lg" }) {
  const r = 45; const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const dim = size === "lg" ? "w-48 h-48" : "w-36 h-36";
  const numSize = size === "lg" ? "text-5xl" : "text-4xl";
  const grade = score >= 90 ? "優秀" : score >= 80 ? "良好" : score >= 60 ? "改善の余地あり" : score >= 40 ? "要改善" : "対策が必要";
  return (
    <div className="flex flex-col items-center transition-transform hover:scale-[1.02]">
      <div className={`relative ${dim}`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#e1e2ed" strokeWidth="8" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1s ease" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${numSize} font-bold`} style={{ color }}>{score}</span>
          <span className="text-xs text-[#737686]">/ 100</span>
        </div>
      </div>
      <p className="text-sm font-semibold text-[#191b23] mt-2">{label}</p>
      <p className="text-xs" style={{ color }}>{grade}</p>
    </div>
  );
}

function Accordion({ title, score, max, bg, accent, open, onToggle, children }: {
  title: string; score: number; max: number; bg: string; accent?: string; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <button onClick={onToggle} className={`w-full flex items-center justify-between p-5 rounded-2xl transition-colors ${bg} hover:opacity-90`}>
        <h3 className={`text-base font-bold ${accent || "text-[#191b23]"}`}>{title}（{score}/{max}）</h3>
        <IconChevron up={open} />
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

function CheckList({ items }: { items: SeoCheckItem[] }) {
  const dl = { 1: "自分でできる", 2: "制作会社に依頼", 3: "専門家が必要" } as const;
  const dc = { 1: "bg-emerald-100 text-emerald-700", 2: "bg-amber-100 text-amber-700", 3: "bg-[#ffdad6] text-[#ba1a1a]" } as const;
  const el = { confirmed: "確認済み", observed: "効果が観察されている", experimental: "実験的" } as const;
  const ec = { confirmed: "bg-emerald-50 text-emerald-600 border-emerald-200", observed: "bg-blue-50 text-blue-600 border-blue-200", experimental: "bg-gray-100 text-[#737686] border-gray-200" } as const;
  return (
    <div className="space-y-1.5">
      {items.map((it, i) => (
        <div key={i} className="p-4 bg-white rounded-2xl border border-[#c3c6d7]/20">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0">
              {it.status === "good" ? <IconCheck className="w-5 h-5 text-emerald-500" /> : it.status === "warning" ? <IconWarn className="w-5 h-5 text-amber-500" /> : <IconX className="w-5 h-5 text-[#ba1a1a]" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-[#191b23]">{it.name}</span>
                <span className="text-xs text-[#737686]">{it.score}/{it.maxScore}</span>
                {it.evidence && <span className={`text-[10px] px-1.5 py-0.5 rounded border ${ec[it.evidence]}`}>{el[it.evidence]}</span>}
              </div>
              <p className="text-sm text-[#434655]">{it.message}</p>
              {it.detail && <p className="text-xs text-[#737686] mt-0.5 truncate">{it.detail}</p>}
            </div>
          </div>
          {it.action && (
            <div className="mt-3 ml-8 p-4 bg-[#dbe1ff]/20 rounded-xl border border-[#b4c5ff]/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#004ac6]">やること</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${dc[it.action.difficulty]}`}>{dl[it.action.difficulty]}</span>
              </div>
              <p className="text-sm text-[#434655] leading-relaxed">{it.action.what}</p>
              <p className="text-xs text-[#004ac6] mt-1.5 font-semibold">{it.action.impact}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ImprovementCard({ imp }: { imp: GeoImprovement }) {
  const tl: Record<string, string> = { all: "全AI共通", chatgpt: "ChatGPT", gemini: "Gemini", perplexity: "Perplexity", claude: "Claude" };
  const tc: Record<string, string> = { all: "bg-[#e1e2ed] text-[#434655]", chatgpt: "bg-emerald-100 text-emerald-700", gemini: "bg-blue-100 text-blue-700", perplexity: "bg-purple-100 text-purple-700", claude: "bg-orange-100 text-orange-700" };
  return (
    <div className="bg-white p-6 rounded-3xl border-t-4 border-[#ba1a1a] relative">
      <span className="absolute -top-3.5 left-6 bg-[#ba1a1a] text-white text-xs font-bold px-3 py-1 rounded-full">#{imp.priority}</span>
      <div className="flex items-center gap-2 mt-1 mb-2">
        <span className="font-bold text-[#191b23]">{imp.title}</span>
        {imp.target && <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${tc[imp.target] || tc.all}`}>{tl[imp.target] || imp.target}</span>}
      </div>
      <p className="text-sm text-[#434655] leading-relaxed">{imp.description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-8 bg-white rounded-3xl border border-[#c3c6d7]/30 text-center hover:shadow-lg hover:scale-[1.02] transition-all">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="font-bold text-lg text-[#191b23] mb-2">{title}</h3>
      <p className="text-sm text-[#434655] leading-relaxed">{desc}</p>
    </div>
  );
}

function sum(items: SeoCheckItem[]): number {
  return items.reduce((s, i) => s + i.score, 0);
}
