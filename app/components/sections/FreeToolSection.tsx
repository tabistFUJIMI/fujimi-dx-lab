import Link from "next/link";
import FadeIn from "../FadeIn";

export default function FreeToolSection() {
  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 p-6 md:flex-row md:justify-between md:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                FREE TOOL
              </p>
              <h2 className="mt-2 text-lg font-bold text-slate-900 md:text-xl">
                AI対策チェッカー
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                あなたのサイトはAI検索に引用される？ URLを入力するだけで無料診断
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link
                href="/tools/ai-checker"
                className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                診断する
              </Link>
              <Link
                href="/column"
                className="inline-flex items-center rounded-xl border-2 border-blue-600 px-6 py-3 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50"
              >
                コラム
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
