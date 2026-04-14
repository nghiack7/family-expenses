// /api/family
// GET: get user's family info
// POST: create a new family
// PUT: invite a member by email
import {
  DEFAULT_CATEGORIES,
  ensurePersonalFamilyMembership,
  getFamilyDisplayName,
  getFamilyMembership,
  getPersonalFamilyTransitionState,
  isPersonalFamilyName,
  randomId,
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

// ── AES-GCM encryption for API keys ─────────────────────────────────────

async function getEncryptionKey(env) {
  const secret = env.AI_ENCRYPTION_KEY || env.JWT_SECRET;
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: new TextEncoder().encode('family-ai-settings'), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptText(plaintext, env) {
  const key = await getEncryptionKey(env);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(plaintext)
  );
  const buf = new Uint8Array(iv.length + encrypted.byteLength);
  buf.set(iv, 0);
  buf.set(new Uint8Array(encrypted), iv.length);
  return btoa(String.fromCharCode(...buf));
}

async function decryptText(cipherBase64, env) {
  const key = await getEncryptionKey(env);
  const buf = Uint8Array.from(atob(cipherBase64), c => c.charCodeAt(0));
  const iv = buf.slice(0, 12);
  const data = buf.slice(12);
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );
  return new TextDecoder().decode(decrypted);
}

// GET /api/family — get current user's family
export async function onRequestGet(context) {
  const { env, data } = context;
  const user = data.user;

  const membership = await ensurePersonalFamilyMembership(env, user);
  const userRow = await env.DB.prepare(`SELECT email FROM users WHERE id = ?`).bind(user.sub).first();
  const myInvites = userRow ? await env.DB.prepare(
    `SELECT fi.id, fi.family_id, fi.created_at, f.name as family_name, u.name as inviter_name
     FROM family_invites fi
     JOIN families f ON f.id = fi.family_id
     JOIN users u ON u.id = fi.invited_by
     WHERE fi.email = ? AND fi.status = 'pending'
     ORDER BY fi.created_at DESC`
  ).bind(userRow.email).all() : { results: [] };

  const members = await env.DB.prepare(
    `SELECT u.id, u.email, u.name, u.avatar, fm.role, fm.joined_at
     FROM family_members fm
     JOIN users u ON u.id = fm.user_id
     WHERE fm.family_id = ?`
  ).bind(membership.family_id).all();

  const invites = await env.DB.prepare(
    `SELECT id, email, status, created_at, invite_token FROM family_invites
     WHERE family_id = ? AND status = 'pending'`
  ).bind(membership.family_id).all();

  const isPersonal = isPersonalFamilyName(membership.name);

  return jsonResp({
    family: {
      id: membership.family_id,
      name: getFamilyDisplayName(membership.name, user.name),
      currency: membership.currency || 'VND',
      is_personal: isPersonal,
      created_by: membership.created_by,
      created_at: membership.created_at,
      role: membership.role,
      members: members.results,
      pending_invites: invites.results,
    },
    my_pending_invites: myInvites.results.map(invite => ({
      ...invite,
      family_name: getFamilyDisplayName(invite.family_name, invite.inviter_name),
    })),
  });
}

// POST /api/family — create a new family
export async function onRequestPost(context) {
  const { request, env, data } = context;
  const user = data.user;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON', 400);
  }

  const name = (body.name || '').trim();
  if (!name) return jsonError('Family name is required', 400);

  const existing = await getFamilyMembership(env, user.sub);
  if (existing) {
    if (existing.role === 'owner' && isPersonalFamilyName(existing.name)) {
      await env.DB.prepare(
        `UPDATE families SET name = ? WHERE id = ?`
      ).bind(name, existing.family_id).run();

      return jsonResp({ ok: true, family_id: existing.family_id, converted_from_personal: true }, 201);
    }
    return jsonError('You already belong to a family. Leave it first.', 409);
  }

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
    const input = (body.email || '').trim().toLowerCase();
    if (!input) return jsonError('Email or username required', 400);

    // Get user's family
    const membership = await ensurePersonalFamilyMembership(env, user);

    if (!membership) return jsonError('You are not in a family', 404);

    // Resolve input: email or username
    let email = input;
    if (!input.includes('@')) {
      // Lookup by username
      const userByUsername = await env.DB.prepare(
        `SELECT email FROM users WHERE username = ?`
      ).bind(input).first();
      if (!userByUsername) return jsonError('Username not found', 404);
      email = userByUsername.email;
    }

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
    const inviteToken = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
    await env.DB.prepare(
      `INSERT INTO family_invites (id, family_id, email, invited_by, invite_token) VALUES (?, ?, ?, ?, ?)`
    ).bind(inviteId, membership.family_id, email, user.sub, inviteToken).run();

    // Get family name for the email
    const family = await env.DB.prepare(
      `SELECT name FROM families WHERE id = ?`
    ).bind(membership.family_id).first();

    // Send invite email via Resend (best-effort, don't fail the invite if email fails)
    const appUrl = new URL(request.url).origin;
    let emailSent = false;
    try {
      emailSent = await sendInviteEmail(env, {
        to: email,
        inviterName: user.name,
        familyName: getFamilyDisplayName(family?.name || 'a family', user.name),
        appUrl,
      });
    } catch { /* non-fatal */ }

    const inviteLink = `${appUrl}#invite/${inviteToken}`;
    return jsonResp({ ok: true, invite_id: inviteId, email_sent: emailSent, app_url: appUrl, invite_link: inviteLink });
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

    const membership = await ensurePersonalFamilyMembership(env, user);
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

  if (action === 'accept_invite') {
    const { invite_id } = body;
    if (!invite_id) return jsonError('invite_id required', 400);

    // Verify this invite belongs to the current user's email
    const userRow = await env.DB.prepare(`SELECT email FROM users WHERE id = ?`).bind(user.sub).first();
    if (!userRow) return jsonError('User not found', 404);

    const invite = await env.DB.prepare(
      `SELECT id, family_id FROM family_invites WHERE id = ? AND email = ? AND status = 'pending'`
    ).bind(invite_id, userRow.email).first();

    if (!invite) return jsonError('Invite not found or already handled', 404);

    const existingMembership = await getFamilyMembership(env, user.sub);

    try {
      await joinInvitedFamily(env, user.sub, invite.family_id, invite_id, existingMembership);
    } catch (err) {
      return jsonError(err.message, 409);
    }

    return jsonResp({ ok: true });
  }

  if (action === 'reject_invite') {
    const { invite_id } = body;
    if (!invite_id) return jsonError('invite_id required', 400);

    const userRow = await env.DB.prepare(`SELECT email FROM users WHERE id = ?`).bind(user.sub).first();
    if (!userRow) return jsonError('User not found', 404);

    const invite = await env.DB.prepare(
      `SELECT id FROM family_invites WHERE id = ? AND email = ? AND status = 'pending'`
    ).bind(invite_id, userRow.email).first();

    if (!invite) return jsonError('Invite not found or already handled', 404);

    await env.DB.prepare(`UPDATE family_invites SET status = 'declined' WHERE id = ?`).bind(invite_id).run();

    return jsonResp({ ok: true });
  }

  if (action === 'remove_invite') {
    const { invite_id } = body;
    if (!invite_id) return jsonError('invite_id required', 400);

    const membership = await ensurePersonalFamilyMembership(env, user);

    if (!membership) return jsonError('Not in a family', 404);

    await env.DB.prepare(
      `DELETE FROM family_invites WHERE id = ? AND family_id = ?`
    ).bind(invite_id, membership.family_id).run();

    return jsonResp({ ok: true });
  }

  if (action === 'accept_invite_token') {
    const { token } = body;
    if (!token) return jsonError('Token required', 400);

    const invite = await env.DB.prepare(
      `SELECT id, family_id, email FROM family_invites WHERE invite_token = ? AND status = 'pending'`
    ).bind(token).first();

    if (!invite) return jsonError('Invite not found or already used', 404);

    const existingMembership = await getFamilyMembership(env, user.sub);

    try {
      await joinInvitedFamily(env, user.sub, invite.family_id, invite.id, existingMembership);
    } catch (err) {
      return jsonError(err.message, 409);
    }

    return jsonResp({ ok: true });
  }

  if (action === 'save_ai_settings') {
    const membership = await ensurePersonalFamilyMembership(env, user);
    if (!membership) return jsonError('Not in a family', 404);

    const { provider, model, apiKey, income, savings } = body;
    if (!provider || !model) return jsonError('Provider and model are required', 400);

    // Load existing settings to preserve other providers' keys
    const existing = (await env.DB.prepare(
      `SELECT ai_settings FROM families WHERE id = ?`
    ).bind(membership.family_id).first())?.ai_settings;

    let prevSettings = {};
    if (existing) {
      try { prevSettings = JSON.parse(existing); } catch { /* ignore */ }
    }

    // Migrate old format (single encryptedApiKey) to per-provider apiKeys
    const apiKeys = prevSettings.apiKeys || {};
    if (prevSettings.encryptedApiKey && prevSettings.provider && !apiKeys[prevSettings.provider]) {
      apiKeys[prevSettings.provider] = prevSettings.encryptedApiKey;
    }

    // Encrypt and store the new key for the current provider
    if (apiKey) {
      apiKeys[provider] = await encryptText(apiKey, env);
    }

    const settings = { provider, model, apiKeys, income: income || '', savings: savings || '' };

    await env.DB.prepare(
      `UPDATE families SET ai_settings = ? WHERE id = ?`
    ).bind(JSON.stringify(settings), membership.family_id).run();

    return jsonResp({ ok: true });
  }

  if (action === 'get_ai_settings') {
    const membership = await ensurePersonalFamilyMembership(env, user);
    if (!membership) return jsonError('Not in a family', 404);

    const row = await env.DB.prepare(
      `SELECT ai_settings FROM families WHERE id = ?`
    ).bind(membership.family_id).first();

    if (!row?.ai_settings) return jsonResp({ settings: null });

    try {
      const settings = JSON.parse(row.ai_settings);

      // Migrate old format
      const apiKeys = settings.apiKeys || {};
      if (settings.encryptedApiKey && settings.provider && !apiKeys[settings.provider]) {
        apiKeys[settings.provider] = settings.encryptedApiKey;
      }

      // Decrypt all provider keys
      const decryptedKeys = {};
      const providersWithKeys = [];
      for (const [p, enc] of Object.entries(apiKeys)) {
        try {
          decryptedKeys[p] = await decryptText(enc, env);
          providersWithKeys.push(p);
        } catch { /* skip corrupted keys */ }
      }

      return jsonResp({
        settings: {
          provider: settings.provider,
          model: settings.model,
          income: settings.income || '',
          savings: settings.savings || '',
          apiKeys: decryptedKeys,
          providersWithKeys,
        },
      });
    } catch {
      return jsonResp({ settings: null });
    }
  }

  return jsonError('Unknown action', 400);
}

// ── Email via EmailJS ─────────────────────────────────────────────────────

async function sendInviteEmail(env, { to, inviterName, familyName, appUrl }) {
  const publicKey = env.EMAILJS_PUBLIC_KEY;
  const privateKey = env.EMAILJS_PRIVATE_KEY;
  const serviceId = env.EMAILJS_SERVICE_ID;
  const templateId = env.EMAILJS_TEMPLATE_ID;

  if (!publicKey || !serviceId || !templateId) return false;

  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        to_email: to,
        inviter_name: inviterName,
        family_name: familyName,
        app_url: appUrl,
        message: `${inviterName} has invited you to join "${familyName}" on Family Expenses. Sign in with ${to} at ${appUrl} and you'll automatically join the family.`,
      },
    }),
  });
  return res.ok;
}

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function joinInvitedFamily(env, userId, targetFamilyId, inviteId, existingMembership) {
  const statements = [];

  if (existingMembership) {
    if (existingMembership.family_id === targetFamilyId) {
      await env.DB.prepare(`UPDATE family_invites SET status = 'accepted' WHERE id = ?`).bind(inviteId).run();
      return;
    }

    const transition = await getPersonalFamilyTransitionState(env, existingMembership.family_id, userId);
    if (!transition.can_auto_leave) {
      if (transition.reason === 'not_personal') {
        throw new Error('You already belong to a family. Leave it first.');
      }

      const blockers = [];
      if (transition.member_count > 1) blockers.push('more than one member');
      if (transition.has_pending_invites) blockers.push('pending invites');
      if (transition.has_expenses) blockers.push('saved expenses');
      const detail = blockers.length > 0 ? ` (${blockers.join(', ')})` : '';
      throw new Error(`Your personal space must be empty before joining another family${detail}.`);
    }

    statements.push(
      env.DB.prepare(`DELETE FROM categories WHERE family_id = ?`).bind(existingMembership.family_id),
      env.DB.prepare(`DELETE FROM family_members WHERE family_id = ? AND user_id = ?`).bind(existingMembership.family_id, userId),
      env.DB.prepare(`DELETE FROM family_invites WHERE family_id = ?`).bind(existingMembership.family_id),
      env.DB.prepare(`DELETE FROM families WHERE id = ?`).bind(existingMembership.family_id)
    );
  }

  statements.push(
    env.DB.prepare(`INSERT OR IGNORE INTO family_members (family_id, user_id, role) VALUES (?, ?, 'member')`).bind(targetFamilyId, userId),
    env.DB.prepare(`UPDATE family_invites SET status = 'accepted' WHERE id = ?`).bind(inviteId)
  );

  await env.DB.batch(statements);
}
