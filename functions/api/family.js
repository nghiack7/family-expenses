// /api/family
// GET: get user's family info
// POST: create a new family
// PUT: invite a member by email

const DEFAULT_CATEGORIES = [
  { name: 'Food', icon: '🍜' },
  { name: 'Transport', icon: '🚗' },
  { name: 'Bills', icon: '💡' },
  { name: 'Shopping', icon: '🛍️' },
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Education', icon: '📚' },
  { name: 'Entertainment', icon: '🎬' },
  { name: 'Other', icon: '📦' },
];

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

function randomId() {
  return crypto.randomUUID();
}

// GET /api/family — get current user's family
export async function onRequestGet(context) {
  const { env, data } = context;
  const user = data.user;

  const membership = await env.DB.prepare(
    `SELECT fm.family_id, fm.role, f.name, f.created_by, f.created_at
     FROM family_members fm
     JOIN families f ON f.id = fm.family_id
     WHERE fm.user_id = ?
     LIMIT 1`
  ).bind(user.sub).first();

  if (!membership) {
    return jsonResp({ family: null });
  }

  const members = await env.DB.prepare(
    `SELECT u.id, u.email, u.name, u.avatar, fm.role, fm.joined_at
     FROM family_members fm
     JOIN users u ON u.id = fm.user_id
     WHERE fm.family_id = ?`
  ).bind(membership.family_id).all();

  const invites = await env.DB.prepare(
    `SELECT id, email, status, created_at FROM family_invites
     WHERE family_id = ? AND status = 'pending'`
  ).bind(membership.family_id).all();

  // Get family currency
  const familyRow = await env.DB.prepare(
    `SELECT currency FROM families WHERE id = ?`
  ).bind(membership.family_id).first();

  return jsonResp({
    family: {
      id: membership.family_id,
      name: membership.name,
      currency: familyRow?.currency || 'VND',
      created_by: membership.created_by,
      created_at: membership.created_at,
      role: membership.role,
      members: members.results,
      pending_invites: invites.results,
    },
  });
}

// POST /api/family — create a new family
export async function onRequestPost(context) {
  const { request, env, data } = context;
  const user = data.user;

  // Check if user already belongs to a family
  const existing = await env.DB.prepare(
    `SELECT family_id FROM family_members WHERE user_id = ? LIMIT 1`
  ).bind(user.sub).first();

  if (existing) {
    return jsonError('You already belong to a family. Leave it first.', 409);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON', 400);
  }

  const name = (body.name || '').trim();
  if (!name) return jsonError('Family name is required', 400);

  const familyId = randomId();

  // Insert family
  await env.DB.prepare(
    `INSERT INTO families (id, name, created_by) VALUES (?, ?, ?)`
  ).bind(familyId, name, user.sub).run();

  // Add creator as owner
  await env.DB.prepare(
    `INSERT INTO family_members (family_id, user_id, role) VALUES (?, ?, 'owner')`
  ).bind(familyId, user.sub).run();

  // Seed default categories
  const inserts = DEFAULT_CATEGORIES.map(cat =>
    env.DB.prepare(
      `INSERT INTO categories (id, family_id, name, icon, is_default) VALUES (?, ?, ?, ?, 1)`
    ).bind(randomId(), familyId, cat.name, cat.icon)
  );
  await env.DB.batch(inserts);

  return jsonResp({ ok: true, family_id: familyId }, 201);
}

// PUT /api/family — invite a member
export async function onRequestPut(context) {
  const { request, env, data } = context;
  const user = data.user;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON', 400);
  }

  const action = body.action;

  if (action === 'invite') {
    const email = (body.email || '').trim().toLowerCase();
    if (!email || !email.includes('@')) return jsonError('Valid email required', 400);

    // Get user's family
    const membership = await env.DB.prepare(
      `SELECT family_id, role FROM family_members WHERE user_id = ? LIMIT 1`
    ).bind(user.sub).first();

    if (!membership) return jsonError('You are not in a family', 404);

    // Check if already a member
    const existingUser = await env.DB.prepare(
      `SELECT u.id FROM users u
       JOIN family_members fm ON fm.user_id = u.id
       WHERE u.email = ? AND fm.family_id = ?`
    ).bind(email, membership.family_id).first();

    if (existingUser) return jsonError('User is already a member', 409);

    // Check if already invited
    const existingInvite = await env.DB.prepare(
      `SELECT id FROM family_invites
       WHERE email = ? AND family_id = ? AND status = 'pending'`
    ).bind(email, membership.family_id).first();

    if (existingInvite) return jsonError('Already invited', 409);

    const inviteId = randomId();
    await env.DB.prepare(
      `INSERT INTO family_invites (id, family_id, email, invited_by) VALUES (?, ?, ?, ?)`
    ).bind(inviteId, membership.family_id, email, user.sub).run();

    // Get family name for the email
    const family = await env.DB.prepare(
      `SELECT name FROM families WHERE id = ?`
    ).bind(membership.family_id).first();

    // Send invite email via Resend (best-effort, don't fail the invite if email fails)
    const appUrl = new URL(request.url).origin;
    await sendInviteEmail(env, {
      to: email,
      inviterName: user.name,
      familyName: family?.name || 'a family',
      appUrl,
    }).catch(() => {});

    return jsonResp({ ok: true, invite_id: inviteId });
  }

  if (action === 'leave') {
    const membership = await env.DB.prepare(
      `SELECT family_id, role FROM family_members WHERE user_id = ? LIMIT 1`
    ).bind(user.sub).first();

    if (!membership) return jsonError('Not in a family', 404);

    if (membership.role === 'owner') {
      // Check if there are other members
      const otherMembers = await env.DB.prepare(
        `SELECT COUNT(*) as cnt FROM family_members WHERE family_id = ? AND user_id != ?`
      ).bind(membership.family_id, user.sub).first();

      if (otherMembers.cnt > 0) {
        return jsonError('Transfer ownership before leaving', 409);
      }

      // Owner alone — delete family and all related data
      await env.DB.batch([
        env.DB.prepare(`DELETE FROM expenses WHERE family_id = ?`).bind(membership.family_id),
        env.DB.prepare(`DELETE FROM categories WHERE family_id = ?`).bind(membership.family_id),
        env.DB.prepare(`DELETE FROM family_invites WHERE family_id = ?`).bind(membership.family_id),
        env.DB.prepare(`DELETE FROM family_members WHERE family_id = ?`).bind(membership.family_id),
        env.DB.prepare(`DELETE FROM families WHERE id = ?`).bind(membership.family_id),
      ]);
    } else {
      await env.DB.prepare(
        `DELETE FROM family_members WHERE family_id = ? AND user_id = ?`
      ).bind(membership.family_id, user.sub).run();
    }

    return jsonResp({ ok: true });
  }

  if (action === 'set_currency') {
    const currency = (body.currency || '').trim().toUpperCase();
    if (!currency || currency.length !== 3) return jsonError('Valid 3-letter currency code required', 400);

    const membership = await env.DB.prepare(
      `SELECT family_id, role FROM family_members WHERE user_id = ? LIMIT 1`
    ).bind(user.sub).first();
    if (!membership) return jsonError('Not in a family', 404);
    if (membership.role !== 'owner') return jsonError('Only the owner can change currency', 403);

    const oldCurrency = (await env.DB.prepare(
      `SELECT currency FROM families WHERE id = ?`
    ).bind(membership.family_id).first())?.currency || 'VND';

    if (oldCurrency === currency) return jsonResp({ ok: true, message: 'Currency unchanged' });

    // Fetch conversion rate from free API
    let rate = 1;
    try {
      const rateRes = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${oldCurrency.toLowerCase()}.json`
      );
      if (rateRes.ok) {
        const rateData = await rateRes.json();
        rate = rateData[oldCurrency.toLowerCase()]?.[currency.toLowerCase()];
        if (!rate || isNaN(rate)) return jsonError(`Cannot convert ${oldCurrency} to ${currency}`, 400);
      } else {
        return jsonError('Failed to fetch exchange rate', 502);
      }
    } catch {
      return jsonError('Failed to fetch exchange rate', 502);
    }

    // Convert all existing expenses
    await env.DB.prepare(
      `UPDATE expenses SET amount = ROUND(amount * ?, 2) WHERE family_id = ?`
    ).bind(rate, membership.family_id).run();

    // Update family currency
    await env.DB.prepare(
      `UPDATE families SET currency = ? WHERE id = ?`
    ).bind(currency, membership.family_id).run();

    return jsonResp({ ok: true, old_currency: oldCurrency, new_currency: currency, rate });
  }

  if (action === 'remove_invite') {
    const { invite_id } = body;
    if (!invite_id) return jsonError('invite_id required', 400);

    const membership = await env.DB.prepare(
      `SELECT family_id FROM family_members WHERE user_id = ? LIMIT 1`
    ).bind(user.sub).first();

    if (!membership) return jsonError('Not in a family', 404);

    await env.DB.prepare(
      `DELETE FROM family_invites WHERE id = ? AND family_id = ?`
    ).bind(invite_id, membership.family_id).run();

    return jsonResp({ ok: true });
  }

  return jsonError('Unknown action', 400);
}

// ── Email via Resend ──────────────────────────────────────────────────────

async function sendInviteEmail(env, { to, inviterName, familyName, appUrl }) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) return; // Skip if not configured

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:480px;margin:0 auto;padding:2rem">
      <h2 style="color:#1a1a1a;margin-bottom:0.5rem">You're invited! 🎉</h2>
      <p style="color:#444;line-height:1.6">
        <strong>${escHtml(inviterName)}</strong> has invited you to join
        <strong>${escHtml(familyName)}</strong> on Family Expenses — a simple tool
        to track shared spending together.
      </p>
      <a href="${appUrl}" style="display:inline-block;background:#3b82f6;color:#fff;padding:0.75rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:600;margin:1.5rem 0">
        Join now
      </a>
      <p style="color:#888;font-size:0.875rem;line-height:1.5">
        Sign in with <strong>${escHtml(to)}</strong> and you'll automatically join the family.
        No extra steps needed.
      </p>
      <hr style="border:none;border-top:1px solid #eee;margin:1.5rem 0" />
      <p style="color:#aaa;font-size:0.75rem">Family Expenses — Track spending together</p>
    </div>`;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Family Expenses <onboarding@resend.dev>',
      to: [to],
      subject: `${inviterName} invited you to ${familyName} on Family Expenses`,
      html,
    }),
  });
}

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
