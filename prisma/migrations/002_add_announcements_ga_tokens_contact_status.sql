-- contacts テーブルに status, updated_at カラム追加
ALTER TABLE fujimi_dx_lab_hp.contacts
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- announcements テーブル作成
CREATE TABLE IF NOT EXISTS fujimi_dx_lab_hp.announcements (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title        TEXT NOT NULL,
  content      TEXT NOT NULL,
  excerpt      TEXT,
  category     TEXT NOT NULL DEFAULT 'info',
  event_date   TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_announcements_published
  ON fujimi_dx_lab_hp.announcements (is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_announcements_category
  ON fujimi_dx_lab_hp.announcements (category);
CREATE INDEX IF NOT EXISTS idx_announcements_event_date
  ON fujimi_dx_lab_hp.announcements (event_date);

-- ga_tokens テーブル作成
CREATE TABLE IF NOT EXISTS fujimi_dx_lab_hp.ga_tokens (
  id            TEXT PRIMARY KEY DEFAULT 'ga_oauth',
  access_token  TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at    TIMESTAMPTZ NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS 有効化
ALTER TABLE fujimi_dx_lab_hp.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE fujimi_dx_lab_hp.ga_tokens ENABLE ROW LEVEL SECURITY;

-- announcements RLS
CREATE POLICY "announcements_select_anon"
  ON fujimi_dx_lab_hp.announcements FOR SELECT TO anon
  USING (is_published = true);

CREATE POLICY "announcements_all_service_role"
  ON fujimi_dx_lab_hp.announcements FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- ga_tokens RLS
CREATE POLICY "ga_tokens_all_service_role"
  ON fujimi_dx_lab_hp.ga_tokens FOR ALL TO service_role
  USING (true) WITH CHECK (true);
