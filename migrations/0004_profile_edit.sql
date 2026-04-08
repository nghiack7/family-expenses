-- Allow one-time username edit
ALTER TABLE users ADD COLUMN name_edited INTEGER DEFAULT 0;
