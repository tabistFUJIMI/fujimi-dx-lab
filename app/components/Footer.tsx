export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">FUJIMI DX Lab</p>
            <p className="mt-2 text-sm">
              ふじみ企業有限会社 FUJIMI DX Lab事業部
            </p>
            <p className="mt-1 text-sm">宿泊業のDXを、現場から。</p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-white">
              プロダクト
            </p>
            <ul className="space-y-2 text-sm">
              <li>FUJIMIN PASS</li>
              <li>Reserve Navi</li>
              <li>ShiftNavi</li>
              <li>RuleNavi</li>
              <li>SocialNavi</li>
              <li>AskNavi</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-white">
              お問い合わせ
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:support@mail.fujimin-pass.com"
                  className="transition-colors hover:text-white"
                >
                  support@mail.fujimin-pass.com
                </a>
              </li>
              <li>平日 10:00〜17:00</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs">
          &copy; {new Date().getFullYear()} ふじみ企業有限会社 All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
