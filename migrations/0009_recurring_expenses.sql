-- Recurring bills / subscription templates
CREATE TABLE IF NOT EXISTS recurring_expenses (
  id TEXT PRIMARY KEY,
  family_id TEXT NOT NULL REFERENCES families(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  category_id TEXT NOT NULL REFERENCES categories(id),
  description TEXT NOT NULL,
  amount REAL NOT NULL,
  cadence TEXT NOT NULL DEFAULT 'monthly', -- weekly, monthly, yearly
  next_due_date TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS recurring_expense_runs (
  id TEXT PRIMARY KEY,
  recurring_id TEXT NOT NULL REFERENCES recurring_expenses(id),
  due_date TEXT NOT NULL,
  expense_id TEXT REFERENCES expenses(id),
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(recurring_id, due_date)
);

CREATE INDEX IF NOT EXISTS idx_recurring_family ON recurring_expenses(family_id, is_active, next_due_date);
CREATE INDEX IF NOT EXISTS idx_recurring_runs_due ON recurring_expense_runs(recurring_id, due_date);
