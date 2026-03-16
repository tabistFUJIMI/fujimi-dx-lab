-- fujimi_dx_lab_hp.contacts RLS policies
-- お問い合わせフォームからのINSERTはanon許可、SELECT/UPDATE/DELETEはservice_roleのみ

ALTER TABLE fujimi_dx_lab_hp.contacts ENABLE ROW LEVEL SECURITY;

-- anon（フロントエンド）からINSERTを許可
CREATE POLICY "contacts_insert_anon"
  ON fujimi_dx_lab_hp.contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- service_roleは全操作可能（Edge Function・管理用）
CREATE POLICY "contacts_all_service_role"
  ON fujimi_dx_lab_hp.contacts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
