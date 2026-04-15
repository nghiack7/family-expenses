import { ensurePersonalFamilyMembership } from './_family-utils.js';

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

const VALID_CADENCES = new Set(['weekly', 'monthly', 'yearly']);

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function addCadence(dateIso, cadence) {
  const [year, month, day] = dateIso.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (cadence === 'weekly') {
    date.setDate(date.getDate() + 7);
  } else if (cadence === 'yearly') {
    date.setFullYear(date.getFullYear() + 1);
  } else {
    date.setMonth(date.getMonth() + 1);
  }
  return date.toISOString().slice(0, 10);
}

function dueStatus(dateIso) {
  const today = todayISO();
  if (dateIso < today) return 'overdue';
  const distanceDays = Math.round((new Date(`${dateIso}T00:00:00Z`) - new Date(`${today}T00:00:00Z`)) / 86400000);
  if (distanceDays <= 3) return 'due_soon';
  return 'scheduled';
}

function normalizeRecurringRow(row) {
  return {
    ...row,
    due_status: dueStatus(row.next_due_date),
  };
}

export async function onRequestGet(context) {
  const { env, data } = context;
  const user = data.user;
  const membership = await ensurePersonalFamilyMembership(env, user);
  if (!membership) return jsonError('Not in a family', 404);

  const recurring = await env.DB.prepare(
    `SELECT r.id, r.description, r.amount, r.cadence, r.next_due_date, r.is_active,
            r.category_id, c.name as category_name, c.icon as category_icon,
            u.id as user_id, u.name as user_name
     FROM recurring_expenses r
     JOIN categories c ON c.id = r.category_id
     JOIN users u ON u.id = r.user_id
     WHERE r.family_id = ?
     ORDER BY r.is_active DESC, r.next_due_date ASC, r.created_at DESC`
  ).bind(membership.family_id).all();

  const radar = recurring.results
    .filter(item => item.is_active)
    .map(normalizeRecurringRow)
    .filter(item => item.due_status !== 'scheduled' || item.next_due_date <= addCadence(todayISO(), 'weekly'))
    .sort((a, b) => a.next_due_date.localeCompare(b.next_due_date))
    .slice(0, 6);

  return jsonResp({
    recurring: recurring.results.map(normalizeRecurringRow),
    radar,
  });
}

export async function onRequestPost(context) {
  const { request, env, data } = context;
  const user = data.user;
  const membership = await ensurePersonalFamilyMembership(env, user);
  if (!membership) return jsonError('Not in a family', 404);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON', 400);
  }

  const description = (body.description || '').trim();
  const amount = Number(body.amount);
  const categoryId = body.category_id;
  const cadence = String(body.cadence || 'monthly').trim().toLowerCase();
  const nextDueDate = body.next_due_date;

  if (!description) return jsonError('Description required', 400);
  if (!amount || Number.isNaN(amount) || amount <= 0) return jsonError('Valid amount required', 400);
  if (!categoryId) return jsonError('category_id required', 400);
  if (!VALID_CADENCES.has(cadence)) return jsonError('Invalid cadence', 400);
  if (!nextDueDate || !/^\d{4}-\d{2}-\d{2}$/.test(nextDueDate)) return jsonError('next_due_date required (YYYY-MM-DD)', 400);

  const category = await env.DB.prepare(
    `SELECT id FROM categories WHERE id = ? AND family_id = ?`
  ).bind(categoryId, membership.family_id).first();
  if (!category) return jsonError('Invalid category', 400);

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO recurring_expenses (id, family_id, user_id, category_id, description, amount, cadence, next_due_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, membership.family_id, user.sub, categoryId, description, amount, cadence, nextDueDate).run();

  return jsonResp({ ok: true, id }, 201);
}

export async function onRequestPut(context) {
  const { request, env, data } = context;
  const user = data.user;
  const membership = await ensurePersonalFamilyMembership(env, user);
  if (!membership) return jsonError('Not in a family', 404);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON', 400);
  }

  const action = body.action || 'update';

  if (action === 'confirm_due') {
    const recurringId = body.id;
    if (!recurringId) return jsonError('id required', 400);

    const recurring = await env.DB.prepare(
      `SELECT id, family_id, user_id, category_id, description, amount, cadence, next_due_date, is_active
       FROM recurring_expenses
       WHERE id = ? AND family_id = ?`
    ).bind(recurringId, membership.family_id).first();
    if (!recurring) return jsonError('Recurring bill not found', 404);
    if (!recurring.is_active) return jsonError('Recurring bill is inactive', 409);

    const existingRun = await env.DB.prepare(
      `SELECT id, expense_id FROM recurring_expense_runs WHERE recurring_id = ? AND due_date = ?`
    ).bind(recurring.id, recurring.next_due_date).first();
    if (existingRun?.expense_id) {
      return jsonResp({ ok: true, expense_id: existingRun.expense_id, already_created: true });
    }

    const expenseId = crypto.randomUUID();
    const runId = existingRun?.id || crypto.randomUUID();
    const nextDueDate = addCadence(recurring.next_due_date, recurring.cadence);

    const statements = [];
    if (!existingRun) {
      statements.push(
        env.DB.prepare(
          `INSERT INTO recurring_expense_runs (id, recurring_id, due_date, expense_id) VALUES (?, ?, ?, ?)`
        ).bind(runId, recurring.id, recurring.next_due_date, expenseId)
      );
    } else {
      statements.push(
        env.DB.prepare(
          `UPDATE recurring_expense_runs SET expense_id = ? WHERE id = ?`
        ).bind(expenseId, existingRun.id)
      );
    }
    statements.push(
      env.DB.prepare(
        `INSERT INTO expenses (id, family_id, user_id, category_id, amount, description, expense_date)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(expenseId, recurring.family_id, recurring.user_id, recurring.category_id, recurring.amount, recurring.description, recurring.next_due_date),
      env.DB.prepare(
        `UPDATE recurring_expenses
         SET next_due_date = ?, updated_at = datetime('now')
         WHERE id = ?`
      ).bind(nextDueDate, recurring.id)
    );

    await env.DB.batch(statements);
    return jsonResp({ ok: true, expense_id: expenseId, next_due_date: nextDueDate });
  }

  const recurringId = body.id;
  if (!recurringId) return jsonError('id required', 400);

  const existing = await env.DB.prepare(
    `SELECT id, user_id FROM recurring_expenses WHERE id = ? AND family_id = ?`
  ).bind(recurringId, membership.family_id).first();
  if (!existing) return jsonError('Recurring bill not found', 404);
  if (existing.user_id !== user.sub && membership.role !== 'owner') {
    return jsonError('Not authorized to update this recurring bill', 403);
  }

  const description = (body.description || '').trim();
  const amount = Number(body.amount);
  const categoryId = body.category_id;
  const cadence = String(body.cadence || 'monthly').trim().toLowerCase();
  const nextDueDate = body.next_due_date;
  const isActive = body.is_active ? 1 : 0;

  if (!description) return jsonError('Description required', 400);
  if (!amount || Number.isNaN(amount) || amount <= 0) return jsonError('Valid amount required', 400);
  if (!categoryId) return jsonError('category_id required', 400);
  if (!VALID_CADENCES.has(cadence)) return jsonError('Invalid cadence', 400);
  if (!nextDueDate || !/^\d{4}-\d{2}-\d{2}$/.test(nextDueDate)) return jsonError('next_due_date required (YYYY-MM-DD)', 400);

  const category = await env.DB.prepare(
    `SELECT id FROM categories WHERE id = ? AND family_id = ?`
  ).bind(categoryId, membership.family_id).first();
  if (!category) return jsonError('Invalid category', 400);

  await env.DB.prepare(
    `UPDATE recurring_expenses
     SET category_id = ?, description = ?, amount = ?, cadence = ?, next_due_date = ?, is_active = ?, updated_at = datetime('now')
     WHERE id = ?`
  ).bind(categoryId, description, amount, cadence, nextDueDate, isActive, recurringId).run();

  return jsonResp({ ok: true });
}

export async function onRequestDelete(context) {
  const { request, env, data } = context;
  const user = data.user;
  const membership = await ensurePersonalFamilyMembership(env, user);
  if (!membership) return jsonError('Not in a family', 404);

  const id = new URL(request.url).searchParams.get('id');
  if (!id) return jsonError('id required', 400);

  const existing = await env.DB.prepare(
    `SELECT id, user_id FROM recurring_expenses WHERE id = ? AND family_id = ?`
  ).bind(id, membership.family_id).first();
  if (!existing) return jsonError('Recurring bill not found', 404);
  if (existing.user_id !== user.sub && membership.role !== 'owner') {
    return jsonError('Not authorized to delete this recurring bill', 403);
  }

  await env.DB.batch([
    env.DB.prepare(`DELETE FROM recurring_expense_runs WHERE recurring_id = ?`).bind(id),
    env.DB.prepare(`DELETE FROM recurring_expenses WHERE id = ?`).bind(id),
  ]);

  return jsonResp({ ok: true });
}
