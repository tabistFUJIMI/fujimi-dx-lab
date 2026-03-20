# FUJIMI DX Lab HP - 進捗

## 2026-03-20

### やったこと（HPレビュー+改善実装）

#### レビュー実施
- 全7観点（UI/UX/セキュリティ/SEO/MEO/AI検索対策/ユーザー目線）×2巡 = 計16レビュー
- 累計指摘: 🔴3 / 🟡32 / 🟢9件
- レビュー結果: `docs/hp-review/fujimi-dx-lab/` に15ファイル蓄積

#### Critical対応（2/3件修正済み）
- 送信完了メッセージ修正（「確認メール」→「受け付けました」）
- APIレート制限+バリデーション追加
- ※OGP画像・faviconは未対応（デザイン素材待ち）

#### トップページ再構成
- Hero改修: sr-only h1、モバイルHero画像表示
- 「FUJIMI DX Labとは」セクション新設
- 「導入実績」セクション新設（自社ホテル活用事例）

#### プロダクトページ強化
- RelatedProductsコンポーネント → 全6ページに横ナビ追加
- 全6ページにJSON-LD構造化データ追加
- 料金テーブルモバイル横スクロール対応
- h1サブタイトル追加（SEOキーワード）

#### SEO/AI検索
- 全7ページ description最適化
- llms.txt FAQ追加
- Social Navi descriptionから「開発中」削除

#### その他改善
- プライバシーポリシーページ新規作成（/privacy）
- フッター改善（リンク追加+名前統一）
- CSP/Permissions-Policyヘッダー追加
- ナビ重複削除、HTTP→HTTPS、sitemap修正
- フォームlabel+maxLength追加
- Social Navi FAQ追加、Rule Navi FAQ修正
- Shift Naviベータ無料明示、FUJIMIN PASS利用料無料明示

### 次にやること
- ローカルで目視確認 → 正式版化
- OGP画像・favicon・apple-touch-icon 作成・配置
- GitHubにpush → Vercelプレビューで確認
- 導入実績の数値を具体化（オーナー確認後）

## 2026-03-16

### やったこと
- メールリンク修正: 会社情報のメールアドレスをmailtoリンク化
- 営業時間「平日 10:00〜17:00」をCTA・フッターから削除
- お問い合わせフォーム新設（Supabase + Edge Function）
- RLSポリシー設定済み

### 技術構成
- Next.js 16 + Tailwind CSS
- Prisma 6 + PostgreSQL（Supabase、スキーマ: fujimi_dx_lab_hp）
- Supabase Edge Function（send-contact-email）+ npm:nodemailer
