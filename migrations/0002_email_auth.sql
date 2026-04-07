-- Add email/password authentication support
ALTER TABLE users ADD COLUMN password_hash TEXT;
ALTER TABLE users ADD COLUMN password_salt TEXT;
ALTER TABLE users ADD COLUMN auth_provider TEXT DEFAULT 'google';
ALTER TABLE users ADD COLUMN google_sub TEXT;
