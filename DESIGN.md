# FUJIMI DX Lab デザインシステム

## ブランド概要

- **プロダクト**: FUJIMI DX Lab コーポレートサイト
- **ターゲット**: 小規模事業者（施術院・サロン・非営利団体・個人）
- **トーン**: 信頼感・誠実・シンプル。派手さより明快さ
- **参考**: Stitch — タイポグラフィ主体、余白のリズム、モノクロ+アクセントカラー

## カラートークン

### ブランドカラー

| トークン | 値 | Tailwind | 用途 |
|---------|-----|---------|------|
| `--foreground` | `#0f172a` | slate-900 | メインテキスト |
| `--background` | `#fafbfc` | — | ページ背景 |
| `--accent` | `#f97316` | orange-500 | CTA・アクセント・パートナー募集 |
| `--accent-hover` | `#ea580c` | orange-600 | CTAホバー |

### 中性色

| トークン | 値 | 用途 |
|---------|-----|------|
| `--surface` | `#f8fafc` | セクション交互背景（白の次） |
| `--surface-alt` | `#f1f5f9` | カード背景・入力フィールド |
| `--border` | `#e2e8f0` | ボーダー・区切り線 |
| `--text-secondary` | `#475569` | 副テキスト（slate-600） |
| `--text-tertiary` | `#94a3b8` | 補足テキスト（slate-400） |

### シリーズカラー

| シリーズ | 色 | Tailwind |
|---------|-----|---------|
| FUJIMIN PASS | `#4f46e5` | indigo-600 |
| ForProject | `#FF6B4A` | — |
| TASUKI PASS | `#059669` | emerald-600 |
| 宿泊業向け | `#0891b2` | cyan-600 |

## タイポグラフィ

- **フォント**: Noto Sans JP（`--font-sans`）
- **スケール**: Perfect Fourth（比率 1.333）
- **ウェイト**: 400（本文）/ 700（見出し）/ 800（Hero h1）

| 要素 | デスクトップ | モバイル | line-height |
|------|------------|---------|-------------|
| h1 | 3rem (48px) | 2rem (32px) | 1.1 |
| h2 | 2.25rem (36px) | 1.75rem (28px) | 1.2 |
| h3 | 1.5rem (24px) | 1.25rem (20px) | 1.3 |
| body | 1rem (16px) | 1rem (16px) | 1.6 |
| caption | 0.875rem (14px) | 0.875rem | 1.5 |
| small | 0.75rem (12px) | 0.75rem | 1.5 |

## スペーシング（8pxグリッド）

| トークン | サイズ | 用途 |
|---------|--------|------|
| xs | 4px | アイコンとラベル間 |
| sm | 8px | リスト項目間 |
| md | 16px | 段落間・カード内パディング |
| lg | 24px | ブロック間 |
| xl | 32px | セクション内グループ間 |
| 2xl | 48px | — |
| 3xl | 64px | モバイルセクション間 |
| section | 96px | デスクトップセクション間（py-24） |

## コンポーネントパターン

### カード
```
rounded-2xl border border-slate-200 bg-white shadow-sm
hover: -translate-y-1 shadow-md transition-all duration-300
padding: p-6 md:p-8
```

### Bentoグリッド
```
grid gap-4 md:grid-cols-2
最初のカード（FUJIMIN PASS）: md:col-span-2（大きく表示）
残り: 1x1 の等サイズカード
各カードに異なるシリーズカラーのアクセント（左ボーダー or 背景グラデーション）
```

### ボタン
```
Primary:   rounded-xl bg-accent px-8 py-4 font-bold text-white hover:bg-accent-hover
Secondary: rounded-xl border-2 border-slate-200 px-8 py-4 font-bold hover:bg-slate-50
Text:      text-sm font-semibold text-accent hover:underline
```

### セクション
```
交互背景: bg-white → bg-surface → bg-white → ...
各セクションに id 属性（ページ内リンク用）
セクション見出し: 上部にカテゴリラベル（text-xs uppercase tracking-widest）
```

### バッジ
```
提供中:  bg-indigo-50 text-indigo-700 border border-indigo-200
開発中:  bg-slate-100 text-slate-500 border border-slate-200
募集中:  bg-orange-50 text-orange-700 border border-orange-200（アニメーション付き）
```

## SEO/GEO/LLMO原則

- 全ページの冒頭40-60語は結論ファーストの要約文
- h1 > h2 > h3 の論理的階層を厳守（スキップしない）
- FAQPageスキーマを全ページに設置
- 各セクションに id 属性を付与（ページ内リンク + アンカー対応）
- 150-200語ごとに具体的な数値・統計データを含める
- 出典がある場合は必ず明記
- dateModified を表示（コラム・製品ページ）

## レスポンシブ

- モバイルファースト設計
- ブレークポイント: sm(640px) / md(768px) / lg(1024px)
- Bentoグリッド: モバイルは1カラム縦積み
- セクション間余白: モバイル 64px / デスクトップ 96px
- タップターゲット: 最小 44x44px
