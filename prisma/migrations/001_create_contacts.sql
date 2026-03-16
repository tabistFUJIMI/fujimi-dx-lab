-- Create fujimi_dx_lab_hp schema
CREATE SCHEMA IF NOT EXISTS fujimi_dx_lab_hp;

-- Create contacts table
CREATE TABLE fujimi_dx_lab_hp.contacts (
  id         TEXT PRIMARY KEY,
  type       TEXT NOT NULL,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  company    TEXT,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE fujimi_dx_lab_hp.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contacts_insert_anon"
  ON fujimi_dx_lab_hp.contacts FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "contacts_all_service_role"
  ON fujimi_dx_lab_hp.contacts FOR ALL TO service_role
  USING (true) WITH CHECK (true);
