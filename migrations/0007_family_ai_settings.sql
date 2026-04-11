-- Add AI settings to families (encrypted API key stored here)
ALTER TABLE families ADD COLUMN ai_settings TEXT DEFAULT NULL;
