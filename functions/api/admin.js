// /api/admin
// POST: admin login (returns admin session)
// GET: system status (requires admin session)

const ADMIN_USERNAME = 'nghiann';

async function hashSHA256(str) {
  const data = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

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

function verifyAdminCookie(request) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(/admin_session=([^;]+)/);
  return match && match[1] === 'authenticated';
}

// POST /api/admin — login
export async function onRequestPost(context) {
  const { request } = context;
  let body;
  try { body = await request.json(); } catch { return jsonError('Invalid body', 400); }

  const passwordHash = await hashSHA256(body.password || '');
  const expectedHash = context.env.ADMIN_PASSWORD_HASH;
  if (!expectedHash) return jsonError('Admin not configured', 500);

  if (body.username === ADMIN_USERNAME && passwordHash === expectedHash) {
    const isProduction = !request.url.includes('localhost') && !request.url.includes('127.0.0.1');
    const flags = isProduction
      ? 'HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600'
      : 'HttpOnly; SameSite=Strict; Path=/; Max-Age=3600';

    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `admin_session=authenticated; ${flags}`,
      },
    });
  }

  return jsonError('Invalid credentials', 401);
}

// GET /api/admin — system status (admin) or registration check (public)
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Public: check if registration is open (always open now)
  if (url.searchParams.get('check') === 'registration') {
    return jsonResp({ registration_open: true });
  }

  if (!verifyAdminCookie(request)) {
    return jsonError('Unauthorized', 401);
  }

  try {
    const [usersResult, familiesResult, expensesResult, dailyUsers, dailyExpenses] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) as count FROM users').first(),
      env.DB.prepare('SELECT COUNT(*) as count FROM families').first(),
      env.DB.prepare('SELECT COUNT(*) as count FROM expenses').first(),
      env.DB.prepare(
        `SELECT DATE(created_at) as date, COUNT(*) as count
         FROM users
         WHERE created_at >= DATE('now', '-30 days')
         GROUP BY DATE(created_at)
         ORDER BY date`
      ).all(),
      env.DB.prepare(
        `SELECT DATE(created_at) as date, COUNT(*) as count
         FROM expenses
         WHERE created_at >= DATE('now', '-30 days')
         GROUP BY DATE(created_at)
         ORDER BY date`
      ).all(),
    ]);

    // Recent users
    const recentUsers = await env.DB.prepare(
      'SELECT id, email, name, created_at FROM users ORDER BY created_at DESC LIMIT 10'
    ).all();

    // Recent families
    const recentFamilies = await env.DB.prepare(
      `SELECT f.id, f.name, f.created_at, COUNT(fm.user_id) as member_count
       FROM families f
       LEFT JOIN family_members fm ON fm.family_id = f.id
       GROUP BY f.id
       ORDER BY f.created_at DESC LIMIT 10`
    ).all();

    return jsonResp({
      users: usersResult?.count || 0,
      families: familiesResult?.count || 0,
      expenses: expensesResult?.count || 0,
      daily_users: dailyUsers.results || [],
      daily_expenses: dailyExpenses.results || [],
      recent_users: recentUsers.results || [],
      recent_families: recentFamilies.results || [],
    });
  } catch (err) {
    return jsonError(`Failed to fetch stats: ${err.message}`, 500);
  }
}

// DELETE /api/admin — logout
export async function onRequestDelete(context) {
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'admin_session=; HttpOnly; Path=/; Max-Age=0',
    },
  });
}
