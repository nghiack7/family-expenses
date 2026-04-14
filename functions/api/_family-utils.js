const PERSONAL_FAMILY_PREFIX = '__personal__:';

export const DEFAULT_CATEGORIES = [
  { name: 'Food', icon: '🍜' },
  { name: 'Transport', icon: '🚗' },
  { name: 'Bills', icon: '💡' },
  { name: 'Shopping', icon: '🛍️' },
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Education', icon: '📚' },
  { name: 'Entertainment', icon: '🎬' },
  { name: 'Other', icon: '📦' },
];

export function randomId() {
  return crypto.randomUUID();
}

export function buildPersonalFamilyId(userId) {
  return `personal:${userId}`;
}

export function buildPersonalFamilyName(userId) {
  return `${PERSONAL_FAMILY_PREFIX}${userId}`;
}

export function isPersonalFamilyName(name) {
  return typeof name === 'string' && name.startsWith(PERSONAL_FAMILY_PREFIX);
}

export function getFamilyDisplayName(name, ownerName) {
  if (!isPersonalFamilyName(name)) return name;
  if (!ownerName) return 'Personal space';
  const trimmed = String(ownerName).trim();
  if (!trimmed) return 'Personal space';
  return `${trimmed}'s space`;
}

export async function getFamilyMembership(env, userId) {
  return env.DB.prepare(
    `SELECT fm.family_id, fm.role, f.name, f.created_by, f.created_at, COALESCE(f.currency, 'VND') AS currency
     FROM family_members fm
     JOIN families f ON f.id = fm.family_id
     WHERE fm.user_id = ?
     LIMIT 1`
  ).bind(userId).first();
}

export async function ensurePersonalFamilyMembership(env, user) {
  const existingMembership = await getFamilyMembership(env, user.sub);
  if (existingMembership) return existingMembership;

  const familyId = buildPersonalFamilyId(user.sub);
  const familyName = buildPersonalFamilyName(user.sub);

  const statements = [
    env.DB.prepare(
      `INSERT OR IGNORE INTO families (id, name, created_by) VALUES (?, ?, ?)`
    ).bind(familyId, familyName, user.sub),
    env.DB.prepare(
      `INSERT OR IGNORE INTO family_members (family_id, user_id, role) VALUES (?, ?, 'owner')`
    ).bind(familyId, user.sub),
  ];

  for (const category of DEFAULT_CATEGORIES) {
    statements.push(
      env.DB.prepare(
        `INSERT INTO categories (id, family_id, name, icon, is_default)
         SELECT ?, ?, ?, ?, 1
         WHERE NOT EXISTS (
           SELECT 1 FROM categories WHERE family_id = ? AND LOWER(name) = LOWER(?)
         )`
      ).bind(randomId(), familyId, category.name, category.icon, familyId, category.name)
    );
  }

  await env.DB.batch(statements);
  return getFamilyMembership(env, user.sub);
}

export async function getPersonalFamilyTransitionState(env, familyId, userId) {
  const family = await env.DB.prepare(
    `SELECT id, name, created_by FROM families WHERE id = ?`
  ).bind(familyId).first();

  if (!family || !isPersonalFamilyName(family.name) || family.created_by !== userId) {
    return { can_auto_leave: false, reason: 'not_personal' };
  }

  const [memberCount, pendingInvites, expenseCount] = await Promise.all([
    env.DB.prepare(`SELECT COUNT(*) AS cnt FROM family_members WHERE family_id = ?`).bind(familyId).first(),
    env.DB.prepare(`SELECT COUNT(*) AS cnt FROM family_invites WHERE family_id = ? AND status = 'pending'`).bind(familyId).first(),
    env.DB.prepare(`SELECT COUNT(*) AS cnt FROM expenses WHERE family_id = ?`).bind(familyId).first(),
  ]);

  return {
    can_auto_leave: memberCount.cnt === 1 && pendingInvites.cnt === 0 && expenseCount.cnt === 0,
    has_expenses: expenseCount.cnt > 0,
    has_pending_invites: pendingInvites.cnt > 0,
    member_count: memberCount.cnt,
  };
}
