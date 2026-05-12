-- Track fallback AI usage per user per day so we can rate-limit
-- the shared house key without tracking it in memory.

CREATE TABLE IF NOT EXISTS ai_fallback_usage (
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  count_analyze INTEGER NOT NULL DEFAULT 0,
  count_extract INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_ai_fallback_date ON ai_fallback_usage(date);
