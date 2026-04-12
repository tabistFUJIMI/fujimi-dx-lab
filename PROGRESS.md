# FUJIMI DX Lab HP - 進捗

## 2026-04-13

### やったこと: AI対策チェッカー + コラム記事システム構築

#### AI対策チェッカー（/tools/ai-checker）完成
- SEOチェッカー（ルールベース20項目+、100点満点）: ページSEO(40) + サイトSEO(20) + GEO対応要素(40)
- サイトSEO: sitemap.xml解析（ページ数、ブログ有無、更新頻度、URL構造）
- GEO/LLMO AI分析（Claude Haiku API、100点満点）: ボタン押下で実行（コスト最適化）
- エビデンスレベル表示: 確認済み / 効果が観察されている / 実験的
- アクションガイド: 各項目に素人向け「やること」「難易度」「効果」
- ディスクレーマー: 「AI検索は発展途上。良いSEOが土台」
- レートリミット: IP単位1日3回
- デザイン: Stitch デザインA準拠, SVGアイコン

#### コラム記事システム（/column）完成
- DB管理型（Prisma + Supabase `columns`テーブル + RLS）
- 管理画面CRUD（/admin/columns）
- 初期記事5本投入済み（ファクトチェック済み・自然な文章）
- 全記事冒頭に「AI検索は発展途上」注意書き

#### GEO/LLMO知見の徹底調査
- X MCP + Web検索で海外・国内専門家の見解を収集
- Lily Ray, Tim Soulo, Amsive社, ミエルカ社等のデータ
- エビデンスレベル分類を体系化 → docs/geo-llmo-knowledge.md
- 結論: 「良いSEO ≒ AI対策の土台」「AI検索トラフィックは0.26%」「有料化しない」

#### インフラ
- API Route: /api/ai-checker/analyze, /api/ai-checker/analyze/geo, /api/columns, /api/admin/columns
- sitemap.ts: コラム記事を動的に含む
- llms.txt更新, next.config.ts turbopack.root設定
- Vercel環境変数 ANTHROPIC_API_KEY設定済み
- Supabase: columnsテーブルマイグレーション + RLS適用

#### トップページ
- 「AI対策チェッカー」セクション追加（/tools/ai-checker + /column への導線）

### 次にやること（次回セッション最優先）

#### HPトップページのリデザイン
- **課題**: 「ごちゃごちゃしすぎて何があるかわからない」
- **方針**: 「課題解決ナビ型」（freee/Square方式）
- **調査完了済み**: デザイントレンド、構成案、参考企業分析
- **構成案**:
  1. ヒーロー: 課題ベースのメッセージ（プロダクト名はファーストビュー外）
  2. 課題共感セクション
  3. Bentoグリッド: 主力3〜4プロダクト（課題ベースのラベル）
  4. 数字で見る成果 / 導入事例
  5. 料金（シンプル） / 無料ツール紹介
  6. CTA（「無料で相談する」に一本化）
- **設計ポイント**:
  - Bentoグリッドは最大4つに絞る
  - 実際のプロダクト画面スクリーンショットを使う
  - Stitchでデザイン案生成 → 実装
- **参考**: HP-LP/docs/design-research.md, docs/geo-llmo-knowledge.md

#### チェッカーのスコアリング改善（要対応）
- **問題**: 大手サイトが低スコアになる。原因は①単一ページのみ評価②sitemap依存が重い
- **対処1**: 「このページの診断です（サイト全体の評価ではありません）」を明確に表示
- **対処2**: sitemapがない場合はサイトSEO（20点）を「判定不可」として除外し、ページSEO+GEO要素のみでスコア算出
- **対処3**: 注釈「トップページよりサービス詳細ページやブログ記事のほうが高スコアになるのが一般的です」を追加

#### AI対策チェッカーのスタンス（確定方針）
- 有料化しない。完全無料。FUJIMI DX Lab認知度向上目的
- 「AI検索でトラフィックが増える」とは言わない
- 「良いSEOの土台ができているか」+「AIにブランドを認知してもらう構造か」
- 業界の現実を正直に伝える。誇張しない

---

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
