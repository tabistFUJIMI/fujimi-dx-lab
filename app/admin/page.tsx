import Link from "next/link";

const MENU_ITEMS = [
  {
    href: "/admin/announcements",
    title: "お知らせ管理",
    description: "お知らせの作成・編集・公開管理",
    color: "from-orange-400 to-orange-500",
    icon: "📢",
  },
  {
    href: "/admin/inquiries",
    title: "お問い合わせ",
    description: "お問い合わせの確認・ステータス管理",
    color: "from-blue-400 to-blue-500",
    icon: "💬",
  },
  {
    href: "/admin/analytics",
    title: "アクセス解析",
    description: "GA4連携・PV/ユーザー数の確認",
    color: "from-emerald-400 to-emerald-500",
    icon: "📊",
  },
  {
    href: "/admin/ai-costs",
    title: "AIコストモニター",
    description: "AI API使用量・コストの確認",
    color: "from-violet-400 to-violet-500",
    icon: "💰",
  },
  {
    href: "/",
    title: "サイトを表示",
    description: "公開サイトのトップページを開く",
    color: "from-gray-400 to-gray-500",
    icon: "🌐",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">ダッシュボード</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-2xl`}
            >
              {item.icon}
            </div>
            <h2 className="text-base font-bold text-gray-900 group-hover:text-blue-600">
              {item.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
