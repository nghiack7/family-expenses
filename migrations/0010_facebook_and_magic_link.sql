-- Add Facebook SSO + email magic link

ALTER TABLE users ADD COLUMN facebook_id TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_facebook_id ON users(facebook_id) WHERE facebook_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS magic_link_tokens (
  token_hash TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_magic_link_email ON magic_link_tokens(email);
CREATE INDEX IF NOT EXISTS idx_magic_link_expires ON magic_link_tokens(expires_at);
