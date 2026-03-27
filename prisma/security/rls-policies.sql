-- fujimi_dx_lab_hp RLS policies
-- ==============================================

-- ■ contacts
ALTER TABLE fujimi_dx_lab_hp.contacts ENABLE ROW LEVEL SECURITY;

-- anon（フロントエンド）からINSERTを許可（入力検証付き）
CREATE POLICY "contacts_insert_anon"
  ON fujimi_dx_lab_hp.contacts
  FOR INSERT
  TO anon
  WITH CHECK (
    char_length(type) > 0 AND
    char_length(name) > 0 AND char_length(name) <= 100 AND
    char_length(email) > 0 AND char_length(email) <= 254 AND
    char_length(message) > 0
  );

-- service_roleは全操作可能（管理画面用）
CREATE POLICY "contacts_all_service_role"
  ON fujimi_dx_lab_hp.contacts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ■ announcements
ALTER TABLE fujimi_dx_lab_hp.announcements ENABLE ROW LEVEL SECURITY;

-- 公開済みのお知らせはanonから閲覧可能
CREATE POLICY "announcements_select_anon"
  ON fujimi_dx_lab_hp.announcements
  FOR SELECT
  TO anon
  USING (is_published = true);

-- service_roleは全操作可能（管理画面用）
CREATE POLICY "announcements_all_service_role"
  ON fujimi_dx_lab_hp.announcements
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ■ ga_tokens
ALTER TABLE fujimi_dx_lab_hp.ga_tokens ENABLE ROW LEVEL SECURITY;

-- service_roleのみ（管理画面用）
CREATE POLICY "ga_tokens_all_service_role"
  ON fujimi_dx_lab_hp.ga_tokens
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
