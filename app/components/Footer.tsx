export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-white">FUJIMI DX Lab</p>
            <p className="mt-2 text-sm text-slate-500">
              ふじみ企業有限会社 FUJIMI DX Lab事業部
            </p>
            <p className="mt-1 text-sm text-slate-500">
              小さなお店のDXを、現場から。
            </p>
            <p className="mt-3 text-xs text-slate-500">
              〒417-0043 静岡県富士市新田島町3-20
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-wider text-slate-300 uppercase">
              サービス
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { name: "ReserveNavi", href: "/products/reserve-navi" },
                { name: "AskNavi", href: "/products/ask-navi" },
                { name: "ShiftNavi（無料）", href: "/products/shift-navi" },
                { name: "RuleNavi", href: "/products/rule-navi" },
                { name: "SocialNavi", href: "/products/social-navi" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-slate-500 transition-colors hover:text-slate-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-wider text-slate-300 uppercase">
              業種別プラン
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { name: "マッサージ・整体", href: "/plan/sejutsu" },
                { name: "ネイル・エステ", href: "/plan/salon" },
                { name: "美容室・ヘアサロン", href: "/plan/hair" },
                { name: "パーソナルジム", href: "/plan/gym" },
                { name: "ペットサロン", href: "/plan/pet" },
                { name: "カウンセリング", href: "/plan/counseling" },
                { name: "写真スタジオ", href: "/plan/photo" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-slate-500 transition-colors hover:text-slate-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-wider text-slate-300 uppercase">
              その他
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/pricing" className="text-slate-500 transition-colors hover:text-slate-300">
                  料金プラン
                </a>
              </li>
              <li>
                <a href="/news" className="text-slate-500 transition-colors hover:text-slate-300">
                  お知らせ
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@mail.fujimin-pass.com"
                  className="text-slate-500 transition-colors hover:text-slate-300"
                >
                  support@mail.fujimin-pass.com
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-slate-500 transition-colors hover:text-slate-300">
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a href="/tokusho" className="text-slate-500 transition-colors hover:text-slate-300">
                  特定商取引法に基づく表記
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
