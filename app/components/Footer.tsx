export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">FUJIMI DX Lab</p>
            <p className="mt-2 text-sm text-slate-500">
              ふじみ企業有限会社 FUJIMI DX Lab事業部
            </p>
            <p className="mt-1 text-sm text-slate-500">
              小さなお店のDXを、現場から。
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold tracking-wider text-slate-300 uppercase">
              プロダクト
            </p>
            <ul className="space-y-2 text-sm">
              {[
                { name: "FUJIMIN PASS", href: "/products/fujimin-pass" },
                { name: "Reserve Navi", href: "/products/reserve-navi" },
                { name: "Shift Navi", href: "/products/shift-navi" },
                { name: "Rule Navi", href: "/products/rule-navi" },
                { name: "Social Navi", href: "/products/social-navi" },
                { name: "Ask Navi", href: "/products/ask-navi" },
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
              お問い合わせ
            </p>
            <ul className="space-y-2 text-sm">
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
