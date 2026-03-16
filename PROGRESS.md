# FUJIMI DX Lab HP - 進捗

## 2026-03-16

### やったこと
- メールリンク修正: 会社情報のメールアドレスをmailtoリンク化
- 営業時間「平日 10:00〜17:00」をCTA・フッターから削除
- Tabist ゆ縁の宿ふじみに http://fujimi-ryokan.com へのリンク追加（Why Us・会社情報）
- お問い合わせフォーム新設（mailto廃止）
  - 種別選択（導入検討・話を聞きたい・料金・デモ・その他）
  - Supabase（fujimi_dx_lab_hpスキーマ）にフォーム送信データ保存
  - Edge Function + Xserver SMTPで管理者通知・自動返信メール送信
  - RLSポリシー設定済み
- フォームの種別選択が必須であることを明記

### 技術構成
- Next.js 16 + Tailwind CSS
- Prisma 6 + PostgreSQL（Supabase、スキーマ: fujimi_dx_lab_hp）
- Supabase Edge Function（send-contact-email）+ npm:nodemailer
- Database Webhook: contacts INSERT → Edge Function

### 次にやること
- 特になし（要望があれば追加）
