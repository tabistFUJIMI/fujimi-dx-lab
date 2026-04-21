export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          <div>
            <p className="text-lg font-bold text-white">FUJIMI DX Lab</p>
            <p className="mt-1 text-xs text-slate-500">
              （ふじみDXラボ／fujimidxlab）
            </p>
            <p className="mt-2 text-sm text-slate-500">
              ふじみ企業有限会社 FUJIMI DX Lab事業部
            </p>
            <p className="mt-1 text-sm text-slate-500">
              小さな組織の困ったを、テクノロジーで。
            </p>
            <p className="mt-3 text-xs text-slate-500">
              〒417-0043 静岡県富士市新田島町3-20
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-wider text-slate-300 uppercase">
              プロダクト
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { name: "FUJIMIN PASS", href: "/fujimin-pass" },
                { name: "ForProject", href: "/products/forproject" },
                { name: "TASUKI PASS (開発中)", href: null },
              ].map((item) => (
                <li key={item.name}>
                  {item.href ? (
                    <a href={item.href} className="text-slate-500 transition-colors hover:text-slate-300">
                      {item.name}
                    </a>
                  ) : (
                    <span className="text-slate-600">{item.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-wider text-slate-300 uppercase">
              リソース
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { name: "コラム", href: "/column" },
                { name: "AI対策チェッカー", href: "/tools/ai-checker" },
                { name: "お知らせ", href: "/news" },
                { name: "LINEで気軽に相談", href: "https://lin.ee/UPArZn9", external: true },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    {...("external" in item ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-slate-500 transition-colors hover:text-slate-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-wider text-slate-300 uppercase">
              会社情報
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { name: "セキュリティ", href: "/security" },
                { name: "プライバシーポリシー", href: "/privacy" },
                { name: "特定商取引法に基づく表記", href: "/tokusho" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-slate-500 transition-colors hover:text-slate-300">
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="mailto:support@mail.fujimin-pass.com" className="text-slate-500 transition-colors hover:text-slate-300">
                  support@mail.fujimin-pass.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800/50 pt-6 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} ふじみ企業有限会社 All rights reserved.
        </div>
      </div>
    </footer>
  );
}
