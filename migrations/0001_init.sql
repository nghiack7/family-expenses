-- Family Expense Tracker - D1 Schema

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- Google sub ID
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS families (
  id TEXT PRIMARY KEY, -- UUID
  name TEXT NOT NULL,
  created_by TEXT NOT NULL REFERENCES users(id),
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS family_members (
  family_id TEXT REFERENCES families(id),
  user_id TEXT REFERENCES users(id),
  role TEXT DEFAULT 'member', -- 'owner' or 'member'
  joined_at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (family_id, user_id)
);

CREATE TABLE IF NOT EXISTS family_invites (
  id TEXT PRIMARY KEY,
  family_id TEXT REFERENCES families(id),
  email TEXT NOT NULL, -- invited Gmail
  invited_by TEXT REFERENCES users(id),
  status TEXT DEFAULT 'pending', -- pending, accepted, declined
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  family_id TEXT REFERENCES families(id),
  name TEXT NOT NULL,
  icon TEXT,
  is_default INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  family_id TEXT REFERENCES families(id),
  user_id TEXT REFERENCES users(id),
  category_id TEXT REFERENCES categories(id),
  amount REAL NOT NULL,
  description TEXT,
  expense_date TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_expenses_family ON expenses(family_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(expense_date);
CREATE INDEX IF NOT EXISTS idx_expenses_user ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_family_members_user ON family_members(user_id);
CREATE INDEX IF NOT EXISTS idx_categories_family ON categories(family_id);
CREATE INDEX IF NOT EXISTS idx_invites_email ON family_invites(email);
CREATE INDEX IF NOT EXISTS idx_invites_family ON family_invites(family_id);
