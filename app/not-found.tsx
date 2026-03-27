import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center" style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)" }}>
      <p className="text-6xl font-extrabold text-white">404</p>
      <h1 className="mt-4 text-xl font-bold text-slate-300">
        ページが見つかりません
      </h1>
      <p className="mt-3 text-sm text-slate-400">
        お探しのページは移動または削除された可能性があります。
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-gray-900 shadow-lg transition-all duration-300 hover:scale-105"
      >
        トップページへ戻る
      </Link>
    </div>
  );
}
