# fujimi-dx-lab.com HP改修仕様書

**Status**: Draft
**作成日**: 2026-03-30
**対象**: fujimi-dx-lab.com 全体改修

---

## 1. 改修背景

FUJIMIN PASSのブランド体系を再構築（2026-03-30確定）。
携帯キャリアモデル（個別サービス＋業種別おすすめプラン）に移行。
4月リリースに合わせてHP全体を改修する。

---

## 2. サイトマップ

```
fujimi-dx-lab.com
├── /                         ← トップ（改修）
├── /pricing                  ← 料金ページ（新規）
├── /plan/sejutsu             ← 施術プランLP（新規）★最優先
├── /plan/salon               ← サロンプランLP（新規）
├── /plan/yado                ← 宿泊プランLP（新規・4月中旬）
├── /plan/dantai              ← 団体プランLP（Coming Soon）
├── /demo/asknavi             ← AskNaviデモ体験（新規）
├── /tools/dx-check           ← 無料DX診断AI（新規）
├── /products/shift-navi      ← ShiftNavi詳細（新規・完全無料訴求）
├── /products/reserve-navi    ← 既存改修
├── /products/ask-navi        ← 既存改修
├── /products/rule-navi       ← 既存改修
├── /products/tomaru-navi     ← 新規（4月中旬）
├── /products/clean-navi      ← 新規（4月中旬）
├── /products/social-navi     ← 既存（Coming Soon維持）
├── /products/fujimin-pass    ← 既存改修
├── /news                     ← 既存維持
├── /news/[id]                ← 既存維持
├── /privacy                  ← 既存維持
├── /login                    ← 既存維持
├── /admin/*                  ← 既存維持
├── /lp/massage               → 301リダイレクト → /plan/sejutsu
└── /lp/reserve-navi          → 301リダイレクト → /products/reserve-navi
```

---

## 3. トップページ改修（`/`）

### セクション構成

```
[A] Hero
    キャッチコピー + 業種選択ボタン3つ（施術院/サロン/宿泊施設）
    + サブCTA「まずは無料のShiftNaviから試す」

[B] 業種で選ぶ（タブUI）
    タブ切替 → 業種ごとに3サービスに絞って表示
    - 施術院タブ: ReserveNavi + AskNavi + ShiftNavi(無料)
    - サロンタブ: ReserveNavi + AskNavi + ShiftNavi(無料)
    - 宿泊タブ: TomaruNavi + CleanNavi + ShiftNavi(無料)
      ※ TomaruNavi・CleanNaviに「4月中旬予定」バッジ

[C] 競合比較セクション（新規）
    「一般的な組合せ ¥17,340/月〜 → FUJIMIN PASSなら ¥550/月〜」
    ※ 競合名は匿名（「大手A社」等）

[D] 導入実績（既存改善）
    ※ ShiftNaviの「無料」は業種タブ内で自然に見せる。専用バナーは設けない
    Tabist ゆ縁の宿ふじみの実運用データ
    Before/After数値を追加

[E] 選ばれる3つの理由
    ① 現場が作った、現場のためのツール
    ② 1つから始めて、あとから追加
    ③ 請求書を見て5秒で理解できる料金

[F] 料金ざっくり
    ShiftNavi ¥0 / ReserveNavi ¥0〜 / AskNavi ¥550〜 / RuleNavi ¥550〜
    CTA: 料金の詳細を見る → /pricing

[G] お知らせ（既存維持）

[H] CTA（お問い合わせフォーム）
```

### Header改修

```typescript
const NAV_ITEMS = [
  { label: "業種で選ぶ", href: "/#industry-select" },
  { label: "サービス一覧", href: "/#solutions" },
  { label: "料金", href: "/pricing" },
  { label: "お知らせ", href: "/news" },
];
```

### Footer改修

- 左列: メインサービス（ShiftNavi, ReserveNavi, AskNavi, RuleNavi）
- 右列: 宿泊向け（TomaruNavi, CleanNavi）+ Coming Soon
- FUJIMIN PASSは「プラットフォームについて」として別項

---

## 4. 料金ページ（`/pricing`）新規作成

### セクション構成

```
[1] ShiftNavi（最上部・最大表示）
    「ずっと無料 ¥0」
    全機能無料。AI一括シフト生成のみFUJIMINポイント消費。

[2] ReserveNavi
    4プラン横並びカード: 無料/ライト¥980/スタンダード¥2,980★/プロ¥5,500

[3] AskNavi・RuleNavi（共通料金）
    4プラン横並びカード: ライト¥550/スタンダード¥1,100/プロ¥2,200/エンタープライズ¥5,500

[4] おすすめプラン（まとめてポイント増量）
    施術プラン / サロンプラン: 単品合計と同額＋毎月ボーナスptプレゼント
    宿泊プラン: 4月中旬リリース予定
    団体プラン: Coming Soon

[5] FUJIMINポイント
    S(100pt/¥550) / M(500pt/¥1,650) / L(1,500pt/¥3,850)
    有効期限1年。月間ポイント繰り越し最大3ヶ月。

[6] FAQ
    Q. 最低契約期間は？ → なし
    Q. 解約は？ → ワンクリック
    Q. プラン変更は？ → いつでもOK
    Q. 支払い方法は？ → クレジットカード

[7] CTA
```

---

## 5. 301リダイレクト設定

`next.config.ts` に追加:

```typescript
redirects: async () => [
  { source: '/lp/massage', destination: '/plan/sejutsu', permanent: true },
  { source: '/lp/reserve-navi', destination: '/products/reserve-navi', permanent: true },
],
```

---

## 6. 既存ページの改修

### /products/fujimin-pass
- ブランド体系を新版に更新
- サービス一覧にSlideNavi, MeishiNavi, TomaruNavi, CleanNaviを追加
- 価格表を新体系に更新

### /products/reserve-navi
- 料金を正確な値に統一（ライト¥980/スタンダード¥2,980/プロ¥5,500）
- 施術プランへの誘導CTAを追加

### /products/ask-navi, /products/rule-navi
- エンタープライズプラン（¥5,500/月・5,000pt・店舗数無制限）を追加
- 料金確認・統一

### /products/social-navi
- Coming Soon維持

---

## 7. 新規ページ

### /demo/asknavi — AskNaviデモ体験
- サンプル店舗（架空の施術院）のナレッジを登録
- HP上でAIに質問できるインタラクティブUI
- レート制限: 1IP 10回/日、1セッション5回まで
- Haiku固定、max_tokens: 300
- CTA: 「このAIをあなたのお店でも」→ 問い合わせフォーム

### /tools/dx-check — 無料DX診断AI
- 5問の選択式（業種/シフト管理方法/予約管理方法/問い合わせ対応/スタッフ数）
- AIが診断結果＋おすすめサービスを生成
- メールアドレス入力で詳細レポート送信 → リード獲得

---

## 8. 共通ルール

### CTA統一

| CTA種別 | テキスト | 遷移先 | スタイル |
|---------|---------|--------|---------|
| Primary | 「無料で始める」 | ShiftNaviサインアップ or FUJIMIN PASSアカウント作成 | オレンジ(#ea580c) |
| Secondary | 「まずは相談する」 | #contact | 白枠 |
| Tertiary | 「詳しく見る →」 | 各詳細ページ | テキストリンク |

### マイクロコピー

- Primary CTA下: 「クレジットカード不要・3分で開始・いつでも解約OK」
- 最終CTA下: 「メールアドレスだけで始められます。営業電話は一切しません。」

### モバイル固定CTAバー

- スクロール深度30%以降で表示
- 高さ60px、背景白＋上方向シャドウ
- テキスト: 「無料で始める」＋「月額¥0から」

---

## 9. 実装優先順位

### Phase 1（4/1-7）— 必須

| # | タスク | 工数目安 |
|---|--------|---------|
| 1 | `/plan/sejutsu` 施術プランLP新規作成 | 4h |
| 2 | トップページ改修（業種タブUI + ShiftNavi訴求） | 4h |
| 3 | `/pricing` 料金ページ新規作成 | 3h |
| 4 | Header/Footer改修 | 1h |
| 5 | 301リダイレクト設定 | 0.5h |
| 6 | 既存プロダクトページの料金・名称更新 | 2h |

### Phase 2（4/8-14）

| # | タスク | 工数目安 |
|---|--------|---------|
| 7 | `/plan/salon` サロンプランLP | 2h |
| 8 | `/demo/asknavi` デモ体験ページ | 4h |
| 9 | `/tools/dx-check` DX診断AI | 3h |
| 10 | `/products/shift-navi` 詳細ページ | 2h |

### Phase 3（4/15-21）

| # | タスク | 工数目安 |
|---|--------|---------|
| 11 | `/plan/yado` 宿泊プランLP | 3h |
| 12 | `/products/tomaru-navi` 詳細ページ | 2h |
| 13 | `/products/clean-navi` 詳細ページ | 2h |
| 14 | OGP画像・構造化データ更新 | 2h |

### Phase 4（4/22-30）

| # | タスク |
|---|--------|
| 15 | Coming Soonページ群（SlideNavi, MeishiNavi等） |
| 16 | ShiftNaviバイラル設計（共有シフト表にブランド露出） |
| 17 | GA4イベント設定・計測整備 |
