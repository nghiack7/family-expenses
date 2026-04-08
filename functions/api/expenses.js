// /api/expenses
// GET: list expenses (with filters)
// POST: add expense
// DELETE: remove expense

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

// GET /api/expenses?from=YYYY-MM-DD&to=YYYY-MM-DD&category_id=&user_id=&limit=50&offset=0
export async function onRequestGet(context) {
  const { request, env, data } = context;
  const user = data.user;
  const url = new URL(request.url);

  const membership = await env.DB.prepare(
    `SELECT family_id FROM family_members WHERE user_id = ? LIMIT 1`
  ).bind(user.sub).first();

  if (!membership) return jsonError('Not in a family', 404);

  const familyId = membership.family_id;
  const from = url.searchParams.get('from') || firstDayOfMonth();
  const to = url.searchParams.get('to') || today();
  const categoryId = url.searchParams.get('category_id') || null;
  const filterUserId = url.searchParams.get('user_id') || null;
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50', 10), 200);
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);

  let query = `
    SELECT e.id, e.amount, e.description, e.expense_date, e.created_at,
           u.id as user_id, u.name as user_name, u.avatar as user_avatar,
           c.id as category_id, c.name as category_name, c.icon as category_icon
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

  query += ' ORDER BY e.expense_date DESC, e.created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);

  const result = await env.DB.prepare(query).bind(...params).all();

  // Count total for pagination
  let countQuery = `
    SELECT COUNT(*) as total FROM expenses e
    WHERE e.family_id = ? AND e.expense_date >= ? AND e.expense_date <= ?
  `;
  const countParams = [familyId, from, to];
  if (categoryId) { countQuery += ' AND e.category_id = ?'; countParams.push(categoryId); }
  if (filterUserId) { countQuery += ' AND e.user_id = ?'; countParams.push(filterUserId); }

  const countResult = await env.DB.prepare(countQuery).bind(...countParams).first();

  return jsonResp({
    expenses: result.results,
    total: countResult.total,
    limit,
    offset,
  });
}

// POST /api/expenses
export async function onRequestPost(context) {
  const { request, env, data } = context;
  const user = data.user;

  const membership = await env.DB.prepare(
    `SELECT family_id FROM family_members WHERE user_id = ? LIMIT 1`
  ).bind(user.sub).first();

  if (!membership) return jsonError('Not in a family', 404);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON', 400);
  }

  const { amount, description, category_id, expense_date } = body;

  if (!amount || isNaN(amount) || amount <= 0) return jsonError('Valid amount required', 400);
  if (!category_id) return jsonError('category_id required', 400);
  if (!expense_date || !/^\d{4}-\d{2}-\d{2}$/.test(expense_date)) {
    return jsonError('expense_date required (YYYY-MM-DD)', 400);
  }

  // Verify category belongs to family
  const category = await env.DB.prepare(
    `SELECT id FROM categories WHERE id = ? AND family_id = ?`
  ).bind(category_id, membership.family_id).first();

  if (!category) return jsonError('Invalid category', 400);

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO expenses (id, family_id, user_id, category_id, amount, description, expense_date)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, membership.family_id, user.sub, category_id, amount, description || null, expense_date).run();

  return jsonResp({ ok: true, id }, 201);
}

// PUT /api/expenses
export async function onRequestPut(context) {
  const { request, env, data } = context;
  const user = data.user;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON', 400);
  }

  const { id, amount, description, category_id, expense_date } = body;

  if (!id) return jsonError('id required', 400);
  if (!amount || isNaN(amount) || amount <= 0) return jsonError('Valid amount required', 400);
  if (!category_id) return jsonError('category_id required', 400);
  if (!expense_date || !/^\d{4}-\d{2}-\d{2}$/.test(expense_date)) {
    return jsonError('expense_date required (YYYY-MM-DD)', 400);
  }

  const membership = await env.DB.prepare(
    `SELECT family_id, role FROM family_members WHERE user_id = ? LIMIT 1`
  ).bind(user.sub).first();

  if (!membership) return jsonError('Not in a family', 404);

  const expense = await env.DB.prepare(
    `SELECT user_id FROM expenses WHERE id = ? AND family_id = ?`
  ).bind(id, membership.family_id).first();

  if (!expense) return jsonError('Expense not found', 404);
  if (expense.user_id !== user.sub && membership.role !== 'owner') {
    return jsonError('Not authorized to edit this expense', 403);
  }

  // Verify category belongs to family
  const category = await env.DB.prepare(
    `SELECT id FROM categories WHERE id = ? AND family_id = ?`
  ).bind(category_id, membership.family_id).first();

  if (!category) return jsonError('Invalid category', 400);

  await env.DB.prepare(
    `UPDATE expenses SET amount = ?, description = ?, category_id = ?, expense_date = ? WHERE id = ?`
  ).bind(amount, description || null, category_id, expense_date, id).run();

  return jsonResp({ ok: true });
}

// DELETE /api/expenses?id=xxx
export async function onRequestDelete(context) {
  const { request, env, data } = context;
  const user = data.user;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) return jsonError('id required', 400);

  const membership = await env.DB.prepare(
    `SELECT family_id, role FROM family_members WHERE user_id = ? LIMIT 1`
  ).bind(user.sub).first();

  if (!membership) return jsonError('Not in a family', 404);

  // Only the expense owner or family owner can delete
  const expense = await env.DB.prepare(
    `SELECT user_id FROM expenses WHERE id = ? AND family_id = ?`
  ).bind(id, membership.family_id).first();

  if (!expense) return jsonError('Expense not found', 404);
  if (expense.user_id !== user.sub && membership.role !== 'owner') {
    return jsonError('Not authorized to delete this expense', 403);
  }

  await env.DB.prepare(`DELETE FROM expenses WHERE id = ?`).bind(id).run();

  return jsonResp({ ok: true });
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function firstDayOfMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
}
