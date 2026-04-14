// /api/categories
// GET: list categories for user's family
// POST: add a custom category

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

// GET /api/categories
export async function onRequestGet(context) {
  const { env, data } = context;
  const user = data.user;

  const membership = await ensurePersonalFamilyMembership(env, user);

  if (!membership) return jsonError('Not in a family', 404);

  const result = await env.DB.prepare(
    `SELECT id, name, icon, is_default FROM categories
     WHERE family_id = ?
     ORDER BY is_default DESC, name ASC`
  ).bind(membership.family_id).all();

  return jsonResp({ categories: result.results });
}

// POST /api/categories
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

  const name = (body.name || '').trim();
  if (!name) return jsonError('Category name required', 400);
  if (name.length > 50) return jsonError('Name too long (max 50 chars)', 400);

  const icon = (body.icon || '📦').trim();

  // Check for duplicate name in family
  const existing = await env.DB.prepare(
    `SELECT id FROM categories WHERE family_id = ? AND LOWER(name) = LOWER(?)`
  ).bind(membership.family_id, name).first();

  if (existing) return jsonError('Category already exists', 409);

  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO categories (id, family_id, name, icon, is_default) VALUES (?, ?, ?, ?, 0)`
  ).bind(id, membership.family_id, name, icon).run();

  return jsonResp({ ok: true, id, name, icon, is_default: 0 }, 201);
}

// DELETE /api/categories?id=xxx
export async function onRequestDelete(context) {
  const { request, env, data } = context;
  const user = data.user;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) return jsonError('id required', 400);

  const membership = await ensurePersonalFamilyMembership(env, user);

  if (!membership) return jsonError('Not in a family', 404);

  const cat = await env.DB.prepare(
    `SELECT id, is_default FROM categories WHERE id = ? AND family_id = ?`
  ).bind(id, membership.family_id).first();

  if (!cat) return jsonError('Category not found', 404);
  if (cat.is_default) return jsonError('Cannot delete default categories', 400);

  // Check if any expenses use this category
  const inUse = await env.DB.prepare(
    `SELECT COUNT(*) as cnt FROM expenses WHERE category_id = ?`
  ).bind(id).first();

  if (inUse.cnt > 0) return jsonError('Category has expenses, cannot delete', 409);

  await env.DB.prepare(`DELETE FROM categories WHERE id = ?`).bind(id).run();

  return jsonResp({ ok: true });
}
