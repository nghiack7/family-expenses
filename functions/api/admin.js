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

  // Public: check if registration is open
  if (url.searchParams.get('check') === 'registration') {
    try {
      let dbSize = null;
      try {
        const [pcRows, psRows] = await Promise.all([
          env.DB.prepare("PRAGMA page_count").raw(),
          env.DB.prepare("PRAGMA page_size").raw(),
        ]);
        dbSize = { size: (pcRows?.[0]?.[0] || 0) * (psRows?.[0]?.[0] || 0) };
      } catch {
        try {
          dbSize = await env.DB.prepare(
            "SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size()"
          ).first();
        } catch {
          dbSize = { size: 0 };
        }
      }
      const usedMB = (dbSize?.size || 0) / (1024 * 1024);
      const open = usedMB < 2048;
      return jsonResp({ registration_open: open });
    } catch {
      return jsonResp({ registration_open: true }); // fail open
    }
  }

  if (!verifyAdminCookie(request)) {
    return jsonError('Unauthorized', 401);
  }

  try {
    const [usersResult, familiesResult, expensesResult] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) as count FROM users').first(),
      env.DB.prepare('SELECT COUNT(*) as count FROM families').first(),
      env.DB.prepare('SELECT COUNT(*) as count FROM expenses').first(),
    ]);

    // D1 may restrict pragma access — query DB size separately so it doesn't break everything
    let dbSizeResult = null;
    try {
      // D1 supports PRAGMA via prepare — use .raw() for reliable column access
      const [pcRows, psRows] = await Promise.all([
        env.DB.prepare("PRAGMA page_count").raw(),
        env.DB.prepare("PRAGMA page_size").raw(),
      ]);
      const pageCount = pcRows?.[0]?.[0] || 0;
      const pageSize = psRows?.[0]?.[0] || 0;
      dbSizeResult = { size: pageCount * pageSize };
    } catch {
      // fallback: table-valued function syntax
      try {
        dbSizeResult = await env.DB.prepare(
          "SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size()"
        ).first();
      } catch {
        // DB size unavailable
      }
    }

    const totalUsers = usersResult?.count || 0;
    const totalFamilies = familiesResult?.count || 0;
    const totalExpenses = expensesResult?.count || 0;
    const dbSizeBytes = dbSizeResult?.size || 0;
    const dbSizeMB = (dbSizeBytes / (1024 * 1024)).toFixed(2);
    const dbLimitMB = 5120; // 5GB in MB
    const dbUsedPct = ((dbSizeBytes / (1024 * 1024)) / dbLimitMB * 100).toFixed(2);
    const dbRemainingMB = (dbLimitMB - dbSizeBytes / (1024 * 1024)).toFixed(2);

    // Waitlist threshold: 3GB remaining = 2GB used
    const waitlistThresholdMB = 2048; // when used > 2GB (remaining < 3GB)
    const registrationOpen = (dbSizeBytes / (1024 * 1024)) < waitlistThresholdMB;

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
      users: totalUsers,
      families: totalFamilies,
      expenses: totalExpenses,
      db: {
        size_mb: parseFloat(dbSizeMB),
        limit_mb: dbLimitMB,
        used_pct: parseFloat(dbUsedPct),
        remaining_mb: parseFloat(dbRemainingMB),
      },
      registration_open: registrationOpen,
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

// GET /api/admin?action=registration_status — public, no auth needed
// Used by registration form to check if registration is open
