-- Add currency setting to families (default VND)
ALTER TABLE families ADD COLUMN currency TEXT DEFAULT 'VND';
