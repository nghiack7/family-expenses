// /api/stats
// GET: monthly summary, by category, by person
// Query params: month=YYYY-MM (default: current month)

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

  const membership = await env.DB.prepare(
    `SELECT family_id FROM family_members WHERE user_id = ? LIMIT 1`
  ).bind(user.sub).first();

  if (!membership) return jsonError('Not in a family', 404);

  const familyId = membership.family_id;

  // Parse month param (YYYY-MM), default to current month
  const monthParam = url.searchParams.get('month');
  let year, month;
  if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
    [year, month] = monthParam.split('-').map(Number);
  } else {
    const now = new Date();
    year = now.getFullYear();
    month = now.getMonth() + 1;
  }

  const from = `${year}-${String(month).padStart(2, '0')}-01`;
  // Last day of month
  const lastDay = new Date(year, month, 0).getDate();
  const to = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  // Total for month
  const totalResult = await env.DB.prepare(
    `SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count
     FROM expenses
     WHERE family_id = ? AND expense_date >= ? AND expense_date <= ?`
  ).bind(familyId, from, to).first();

  // By category
  const byCategory = await env.DB.prepare(
    `SELECT c.id, c.name, c.icon,
            COALESCE(SUM(e.amount), 0) as total,
            COUNT(e.id) as count
     FROM categories c
     LEFT JOIN expenses e ON e.category_id = c.id
       AND e.family_id = ?
       AND e.expense_date >= ?
       AND e.expense_date <= ?
     WHERE c.family_id = ?
     GROUP BY c.id, c.name, c.icon
     ORDER BY total DESC`
  ).bind(familyId, from, to, familyId).all();

  // By person
  const byPerson = await env.DB.prepare(
    `SELECT u.id, u.name, u.avatar,
            COALESCE(SUM(e.amount), 0) as total,
            COUNT(e.id) as count
     FROM family_members fm
     JOIN users u ON u.id = fm.user_id
     LEFT JOIN expenses e ON e.user_id = u.id
       AND e.family_id = ?
       AND e.expense_date >= ?
       AND e.expense_date <= ?
     WHERE fm.family_id = ?
     GROUP BY u.id, u.name, u.avatar
     ORDER BY total DESC`
  ).bind(familyId, from, to, familyId).all();

  // Daily totals for the month (for sparkline/chart)
  const daily = await env.DB.prepare(
    `SELECT expense_date, SUM(amount) as total
     FROM expenses
     WHERE family_id = ? AND expense_date >= ? AND expense_date <= ?
     GROUP BY expense_date
     ORDER BY expense_date ASC`
  ).bind(familyId, from, to).all();

  // Previous month comparison
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const prevFrom = `${prevYear}-${String(prevMonth).padStart(2, '0')}-01`;
  const prevLastDay = new Date(prevYear, prevMonth, 0).getDate();
  const prevTo = `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(prevLastDay).padStart(2, '0')}`;

  const prevTotal = await env.DB.prepare(
    `SELECT COALESCE(SUM(amount), 0) as total FROM expenses
     WHERE family_id = ? AND expense_date >= ? AND expense_date <= ?`
  ).bind(familyId, prevFrom, prevTo).first();

  return jsonResp({
    month: { year, month, from, to },
    total: totalResult.total,
    count: totalResult.count,
    prev_total: prevTotal.total,
    by_category: byCategory.results,
    by_person: byPerson.results,
    daily: daily.results,
  });
}
