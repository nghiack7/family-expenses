// GET /api/export?from=YYYY-MM-DD&to=YYYY-MM-DD&category_id=&user_id=
// Returns ALL expenses (no pagination) for export

import {
  ensurePersonalFamilyMembership,
  getFamilyDisplayName,
} from './_family-utils.js';

function jsonResp(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function jsonError(msg, status = 400) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestGet(context) {
  const { request, env, data } = context;
  const user = data.user;
  const url = new URL(request.url);

  const membership = await ensurePersonalFamilyMembership(env, user);

  if (!membership) return jsonError('Not in a family', 404);

  const familyId = membership.family_id;
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');
  const categoryId = url.searchParams.get('category_id') || null;
  const filterUserId = url.searchParams.get('user_id') || null;

  if (!from || !to) return jsonError('from and to are required', 400);

  let query = `
    SELECT e.amount, e.description, e.expense_date,
           u.name as user_name,
           c.name as category_name, c.icon as category_icon
    FROM expenses e
    JOIN users u ON u.id = e.user_id
    JOIN categories c ON c.id = e.category_id
    WHERE e.family_id = ?
      AND e.expense_date >= ?
      AND e.expense_date <= ?
  `;
  const params = [familyId, from, to];

  if (categoryId) {
    query += ' AND e.category_id = ?';
    params.push(categoryId);
  }
  if (filterUserId) {
    query += ' AND e.user_id = ?';
    params.push(filterUserId);
  }

  query += ' ORDER BY e.expense_date ASC, e.amount DESC';

  const result = await env.DB.prepare(query).bind(...params).all();

  // Also get family info for the header
  const family = await env.DB.prepare(
    `SELECT name, currency FROM families WHERE id = ?`
  ).bind(familyId).first();

  return jsonResp({
    expenses: result.results,
    family_name: getFamilyDisplayName(family?.name || '', user.name),
    currency: family?.currency || 'VND',
  });
}
