-- AI使用量ログテーブル
CREATE TABLE IF NOT EXISTS fujimi_dx_lab_hp.ai_usage_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  feature TEXT NOT NULL,
  model TEXT NOT NULL,
  input_tokens INTEGER NOT NULL,
  output_tokens INTEGER NOT NULL,
  cost_usd DOUBLE PRECISION NOT NULL,
  target_url TEXT,
  duration_ms INTEGER,
  success BOOLEAN NOT NULL DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ai_usage_logs_feature ON fujimi_dx_lab_hp.ai_usage_logs (feature);
CREATE INDEX idx_ai_usage_logs_created_at ON fujimi_dx_lab_hp.ai_usage_logs (created_at);

-- RLS
ALTER TABLE fujimi_dx_lab_hp.ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE fujimi_dx_lab_hp.ai_usage_logs FORCE ROW LEVEL SECURITY;

CREATE POLICY "ai_usage_logs_all_service_role"
  ON fujimi_dx_lab_hp.ai_usage_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
