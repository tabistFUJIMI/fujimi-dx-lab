# FUJIMI DX Lab HP - 進捗

## 2026-04-23: サービス開始日を5/1にシフト・申込動線を自動ゲート化

### やったこと
- サービス開始日を 2026-04 → 2026-05-01（JST）に変更
- 共通ユーティリティ `lib/service-launch.ts` を新設（`SERVICE_LAUNCH_ISO` / `isSignupOpen()`）
- クライアントフック `app/hooks/useServiceLaunch.ts` を新設：5/1 00:00 を跨いだ瞬間に `setTimeout` で動線を自動解放
- `SignupFlowButton` を拡張：5/1 前は「受付開始予告」モーダルに切替、CTAは LINE相談へ。5/1 以降は従来の登録フローに自動復帰
- 直接リンクだった登録CTA（Header / HeroSection / PricingSection / ProductSeriesSection / ReserveNaviSpotlightSection / StickyCTA / products/reserve-navi 手順リンク）を `SignupFlowButton` 経由に統一し、一括ゲーティング
- StickyCTA に `primaryGated` オプションを追加
- 「2026年4月サービス開始」文言を plan/lp/products 全12ページで 2026年5月1日 に更新
- AboutSection の会社概要、JsonLd の description / foundingDate を 2026-05 基準に更新

### 次にやること
- 5/1 切替後の動作をブラウザ実機で確認（特にHeader/StickyCTAの見た目）
- 準備中モーダルの文言ブラッシュアップ（必要に応じて）

---

## 2026-04-20: バグ監査 + コラム4カテゴリ化 + /guides 新設

### やったこと

#### バグ監査・修正（PR #8, #9, #11, #12）
- 包括的バグ監査で27項目洗い出し → 25件修正
- **重要修正**:
  - robots.txt クローラー判定 regex バグ（自社が AI クローラーブロック中と誤判定）
  - AI分析 UI を完全廃止（構造分析のみ残す方針に）
  - CSP を nonce ベースに刷新（proxy.ts + layout.tsx、strict-dynamic + unsafe-inline フォールバック）
  - Supabase PgBouncer prepared statement 衝突を `pgbouncer=true` で回避（/column・/api/internal/bot-log の間欠500解消）
  - proxy.ts を Next.js 16 正規位置（プロジェクト直下）へ移動、bot 検知 middleware が正式動作するように
  - Google API 型定義を `googleapis` の Schema$* 型に置換
  - BASE_URL を `lib/base-url.ts` に一元化、layout/sitemap/robots/news のハードコード解消
  - INTERNAL_API_SECRET 空文字列時の認証バイパス対策
  - JSON.parse ガード、情報漏洩防止、Invalid Date 検証、OAuth null チェック 等

#### コラム4カテゴリ化（PR #10, #11）
- カテゴリを4テーマに再編: ai-geo-llmo / ai-dx / it-trends / local-business
- `lib/column-categories.ts` で一元管理、公開・管理画面で同一定義を参照
- /column にカテゴリフィルタUI追加（URL `?category=` パラメータ対応）
- 既存5記事を Supabase MCP 経由で `ai-geo-llmo` に移行（旧カテゴリ名は tags に保持）

#### /guides 新設（PR #10）
- Markdownベースの製品別ガイドセクション
- DB不要、content/guides/<product>/<slug>.md で管理
- 3階層: 全製品index → 製品別 → 個別記事
- HowTo JSON-LD・前後記事ナビ・sitemap統合
- ReserveNavi / ShiftNavi に「はじめての導入ガイド」初版作成

### 次にやること
- ai-dx / it-trends / local-business カテゴリへの初稿執筆
- 残り5製品（AskNavi / RuleNavi / SocialNavi / FUJIMIN PASS / ForProject）のガイド初稿
- CSP unsafe-inline の完全廃止（JSON-LD を nonce 対応の共通コンポーネント化）
- Google API 応答の any 型残り（app/api/admin/analytics/route.ts 内部）の型付け完成

---

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
- **対処4（重要・方針確定）**: AIと同じ目線でサイト全体を評価する
  - 入力URLだけでなく、sitemapまたはナビゲーションから主要ページを3〜5件自動取得
  - 各ページのSEOスコアを計算
  - 「このサイトで最もAIに見つけてもらいやすいページ」を特定して表示
  - 個別ページスコア + サイト全体の傾向スコアの両方を提示
  - AIの実際の動き（検索→複数URL fetch→総合判断）に近い評価になる
  - Vercel 60秒制限内で3〜5ページが限界。主要ページの選定ロジックが重要
  - 実装: ナビ内リンク抽出 or sitemap上位ページから選定 → 並列fetch → 各ページでSEOチェック → ベストページを特定

#### AI対策チェッカーのスタンス（確定方針）
- 有料化しない。完全無料。FUJIMI DX Lab認知度向上目的
- 「AI検索でトラフィックが増える」とは言わない
- 「良いSEOの土台ができているか」+「AIにブランドを認知してもらう構造か」
- 業界の現実を正直に伝える。誇張しない

---

## 2026-04-13（セッション2）

### やったこと: チェッカーの精度・信頼性の大幅改善

#### エビデンス徹底調査
- X MCP + Web検索で50以上のソースからGEO/LLMOのエビデンスを収集
- Lily Ray, Tim Soulo, Amsive社, ミエルカ社, Princeton論文等を精査
- 結論:「良いSEO ≒ AI対策の土台」「AI検索トラフィックは0.26%」
- docs/geo-llmo-knowledge.md に体系的に記録

#### チェッカーのスタンス変更
- 「AI検索に引用される？」→「SEOの基本ができていますか？」
- 全ページに「AI検索は発展途上の技術」ディスクレーマー追加
- 「改善提案」→「検証結果」（提案しない、事実を伝えるだけ）
- AI分析を自動実行に変更（ボタン押下不要）
- エビデンスレベル表示: 確認済み / 効果が観察されている / 実験的

#### スコアリング精度の大幅改善
- 致命的バグ修正: isLikelySpaの演算子優先度
- microdata/RDFaの構造化データ検出追加
- OGP: name属性版も検出
- Twitter Card: OGP完備なら満点
- ブログ検出: WordPress検出、大規模サイト検出、URLパターン21種
- FAQ検出: class/id属性のfaq/accordionも検出
- エンティティ定義: パターン拡張
- sitemap取得失敗時: 0点→中間スコア
- 更新頻度: 絶対数でも評価（大規模サイト対応）
- title/meta: ページ種別で判定調整

#### 配点リバランス（GEO要素40点）
- コンテンツ充実度: 4→8（確定エビデンス、最重要）
- AIクローラー許可: 5→7（確定、ブロック=不可視）
- 質問形式見出し: 6→3（サイトの種類によっては不要）
- FAQ: 5→3（サイトの種類によっては不要）
- llms.txt: 5→3（experimental）
- メッセージを「必須ではないがあると差別化」トーンに統一

#### AI目線のサイト全体評価
- ナビリンクから主要ページ3件を自動取得→各ページスコア計算
- 「AIに最も見つけてもらいやすいページ」を特定・表示
- AIによるサイト構造推測（種類・規模・ブログ有無・FAQ有無）

#### VPSプロキシ
- XサーバーVPSにfetchプロキシ設置（日本国内IPからfetch）
- systemdサービスで永続化（自動起動・再起動）
- HTMLページ: プロキシとdirectを並列→コンテンツが多い方を採用
- リソースファイル: プロキシ優先→失敗時direct

#### コラム記事
- 5記事を自然な文章にリライト
- 全記事に「AI検索は発展途上」注意書き追加
- 断定表現を修正（Princeton論文が古いことを明記等）

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
