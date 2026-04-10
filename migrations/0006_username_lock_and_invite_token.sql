-- Username one-time edit lock + invite link tokens
ALTER TABLE users ADD COLUMN username_edited INTEGER DEFAULT 0;

-- Invite token for shareable invite links
ALTER TABLE family_invites ADD COLUMN invite_token TEXT;
