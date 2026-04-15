-- Add monthly budget settings to families
ALTER TABLE families ADD COLUMN budget_settings TEXT DEFAULT NULL;
