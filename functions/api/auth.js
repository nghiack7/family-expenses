// POST /api/auth
// Handles Google SSO, email/password registration, and email/password login

import { ensurePersonalFamilyMembership } from './_family-utils.js';

const GOOGLE_CLIENT_ID = '96712291758-care9g3k805ii70ndqd5dtfh07b613ua.apps.googleusercontent.com';

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid request body', 400);
  }

  const action = body.action || 'google';

  if (action === 'register') {
    return handleEmailRegister(body, env, request);
  }
  if (action === 'login') {
    return handleEmailLogin(body, env, request);
  }
  if (action === 'facebook') {
    return handleFacebookSSO(body, env, request);
  }
  if (action === 'magic_link_request') {
    return handleMagicLinkRequest(body, env, request);
  }
  if (action === 'magic_link_verify') {
    return handleMagicLinkVerify(body, env, request);
  }
  // Default: Google SSO
  return handleGoogleSSO(body, env, request);
}

export async function onRequestPut(context) {
  const { request, env } = context;
  const userId = context.data?.user?.sub;
  if (!userId) return jsonError('Not authenticated', 401);

  let body;
  try { body = await request.json(); } catch { return jsonError('Invalid body', 400); }

  const action = body.action;

  // ── Update display name (one-time) ──
  if (action === 'update_name') {
    const newName = (body.name || '').trim();
    if (!newName || newName.length < 1 || newName.length > 100) {
      return jsonError('Name must be 1-100 characters', 400);
    }
    const user = await env.DB.prepare('SELECT name_edited FROM users WHERE id = ?').bind(userId).first();
    if (!user) return jsonError('User not found', 404);
    if (user.name_edited) return jsonError('Name can only be changed once', 403);

    await env.DB.prepare('UPDATE users SET name = ?, name_edited = 1 WHERE id = ?').bind(newName, userId).run();

    // Re-issue session with updated name
    const full = await env.DB.prepare('SELECT id, email, name, avatar FROM users WHERE id = ?').bind(userId).first();
    return issueSession({ sub: full.id, email: full.email, name: full.name, avatar: full.avatar }, env, request);
  }

  // ── Update username (one-time) ──
  if (action === 'update_username') {
    const username = (body.username || '').trim().toLowerCase();
    if (!username) return jsonError('Username cannot be empty', 400);
    if (username.length < 3 || username.length > 30) return jsonError('Username must be 3-30 characters', 400);
    if (!/^[a-z0-9_]+$/.test(username)) return jsonError('Username can only contain letters, numbers, and underscores', 400);

    const user = await env.DB.prepare('SELECT username, username_edited FROM users WHERE id = ?').bind(userId).first();
    if (!user) return jsonError('User not found', 404);
    if (user.username && user.username_edited) return jsonError('Username can only be set once', 403);

    try {
      await env.DB.prepare('UPDATE users SET username = ?, username_edited = 1 WHERE id = ?').bind(username, userId).run();
    } catch (err) {
      if (err.message && err.message.includes('UNIQUE')) {
        return jsonError('Username already taken', 409);
      }
      return jsonError(`Database error: ${err.message}`, 500);
    }
    return new Response(JSON.stringify({ ok: true, username }), { headers: { 'Content-Type': 'application/json' } });
  }

  // ── Link Google account ──
  if (action === 'link_google') {
    const { credential } = body;
    if (!credential) return jsonError('Missing Google credential', 400);

    const clientId = env.GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID;
    let googlePayload;
    try {
      googlePayload = await verifyGoogleJWT(credential, clientId);
    } catch (err) {
      return jsonError(`Invalid Google credential: ${err.message}`, 401);
    }

    const { sub, email: googleEmail, picture } = googlePayload;

    // Check if this Google account is already linked to another user
    const existingGoogle = await env.DB.prepare('SELECT id FROM users WHERE google_sub = ? AND id != ?').bind(sub, userId).first();
    if (existingGoogle) return jsonError('This Google account is already linked to another user', 409);

    await env.DB.prepare(
      'UPDATE users SET google_sub = ?, avatar = COALESCE(avatar, ?), auth_provider = CASE WHEN auth_provider = \'email\' THEN \'email+google\' ELSE auth_provider END WHERE id = ?'
    ).bind(sub, picture || null, userId).run();

    const full = await env.DB.prepare('SELECT id, email, name, avatar FROM users WHERE id = ?').bind(userId).first();
    return issueSession({ sub: full.id, email: full.email, name: full.name, avatar: full.avatar }, env, request);
  }

  // ── Change password ──
  if (action === 'change_password') {
    const { current_password, new_password } = body;
    if (!new_password || new_password.length < 8) {
      return jsonError('New password must be at least 8 characters', 400);
    }

    const user = await env.DB.prepare(
      'SELECT id, password_hash, password_salt, auth_provider FROM users WHERE id = ?'
    ).bind(userId).first();
    if (!user) return jsonError('User not found', 404);

    if (user.password_hash) {
      // Has existing password — verify current password before changing
      if (!current_password) return jsonError('Current password is required', 400);
      const currentHash = await hashPassword(current_password, user.password_salt);
      if (currentHash !== user.password_hash) {
        return jsonError('Current password is incorrect', 401);
      }
    }
    // If no password_hash, this is a Google-only user setting password for the first time — allowed

    const newSalt = generateSalt();
    const newHash = await hashPassword(new_password, newSalt);
    await env.DB.prepare(
      'UPDATE users SET password_hash = ?, password_salt = ? WHERE id = ?'
    ).bind(newHash, newSalt, userId).run();

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return jsonError('Unknown action', 400);
}

export async function onRequestDelete(context) {
  // Logout: clear cookie
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'session=; HttpOnly; Path=/; Max-Age=0',
    },
  });
}

// ── Google SSO ────────────────────────────────────────────────────────────────

async function handleGoogleSSO(body, env, request) {
  const { credential } = body;
  if (!credential) return jsonError('Missing credential', 400);

  const clientId = env.GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID;

  let googlePayload;
  try {
    googlePayload = await verifyGoogleJWT(credential, clientId);
  } catch (err) {
    return jsonError(`Invalid Google credential: ${err.message}`, 401);
  }

  const { sub, email: rawEmail, name, picture } = googlePayload;
  const email = rawEmail.trim().toLowerCase();

  // Upsert user — if email already exists (email/password account), link Google sub
  try {
    const existing = await env.DB.prepare(
      `SELECT id FROM users WHERE email = ?`
    ).bind(email).first();

    if (existing) {
      // Update the existing user's google_sub and avatar; keep their id
      await env.DB.prepare(
        `UPDATE users SET google_sub = ?, name = ?, avatar = ?, auth_provider = 'google'
         WHERE email = ?`
      ).bind(sub, name, picture || null, email).run();

      const userId = existing.id;
      await ensurePersonalFamilyMembership(env, { sub: userId, name });
      return issueSession({ sub: userId, email, name, avatar: picture || null }, env, request);
    }

    // Waitlist gate for new Google users
    try {
      const dbSize = await env.DB.prepare(
        "SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size()"
      ).first();
      if ((dbSize?.size || 0) / (1024 * 1024) >= 2048) {
        return jsonError('Registration is currently closed. The system is at capacity.', 503);
      }
    } catch { /* fail open */ }

    // New user via Google: use sub as id
    await env.DB.prepare(
      `INSERT INTO users (id, email, name, avatar, auth_provider, google_sub)
       VALUES (?, ?, ?, ?, 'google', ?)
       ON CONFLICT(id) DO UPDATE SET name=excluded.name, avatar=excluded.avatar, google_sub=excluded.google_sub`
    ).bind(sub, email, name, picture || null, sub).run();
    await ensurePersonalFamilyMembership(env, { sub, name });
  } catch (err) {
    return jsonError(`Database error: ${err.message}`, 500);
  }

  return issueSession({ sub, email, name, avatar: picture || null }, env, request);
}

// ── Email Registration ─────────────────────────────────────────────────────────

async function handleEmailRegister(body, env, request) {
  const { email: rawEmail, password, name, username } = body;
  if (!rawEmail || !password || !name) return jsonError('Missing email, password, or name', 400);
  if (password.length < 8) return jsonError('Password must be at least 8 characters', 400);
  const email = rawEmail.trim().toLowerCase();

  // Waitlist gate: block new registrations when DB usage > 2GB (remaining < 3GB of 5GB)
  try {
    const dbSize = await env.DB.prepare(
      "SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size()"
    ).first();
    const usedMB = (dbSize?.size || 0) / (1024 * 1024);
    if (usedMB >= 2048) {
      return jsonError('Registration is currently closed. The system is at capacity. Please try again later or contact the administrator.', 503);
    }
  } catch { /* fail open — allow registration if check fails */ }

  // Validate username if provided
  const cleanUsername = username ? username.trim().toLowerCase() : null;
  if (cleanUsername) {
    if (cleanUsername.length < 3 || cleanUsername.length > 30) return jsonError('Username must be 3-30 characters', 400);
    if (!/^[a-z0-9_]+$/.test(cleanUsername)) return jsonError('Username can only contain letters, numbers, and underscores', 400);
    const existing = await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(cleanUsername).first();
    if (existing) return jsonError('Username already taken', 409);
  }

  // Check if email already exists
  try {
    const existing = await env.DB.prepare(
      `SELECT id FROM users WHERE email = ?`
    ).bind(email).first();

    if (existing) {
      // If Google-only account, allow setting password
      const full = await env.DB.prepare(
        `SELECT id, password_hash FROM users WHERE email = ?`
      ).bind(email).first();
      if (full && !full.password_hash) {
        const salt = generateSalt();
        const hash = await hashPassword(password, salt);
        await env.DB.prepare(
          `UPDATE users SET password_hash = ?, password_salt = ?, name = ? WHERE id = ?`
        ).bind(hash, salt, name, full.id).run();
        await ensurePersonalFamilyMembership(env, { sub: full.id, name });
        return issueSession({ sub: full.id, email, name, avatar: null }, env, request);
      }
      return jsonError('Email already registered', 409);
    }
  } catch (err) {
    return jsonError(`Database error: ${err.message}`, 500);
  }

  const salt = generateSalt();
  const hash = await hashPassword(password, salt);
  const userId = generateUUID();

  try {
    await env.DB.prepare(
      `INSERT INTO users (id, email, name, avatar, auth_provider, password_hash, password_salt, username)
       VALUES (?, ?, ?, NULL, 'email', ?, ?, ?)`
    ).bind(userId, email, name, hash, salt, cleanUsername).run();
    await ensurePersonalFamilyMembership(env, { sub: userId, name });
  } catch (err) {
    return jsonError(`Database error: ${err.message}`, 500);
  }

  return issueSession({ sub: userId, email, name, avatar: null }, env, request);
}

// ── Facebook SSO ──────────────────────────────────────────────────────────────

async function handleFacebookSSO(body, env, request) {
  const { accessToken } = body;
  if (!accessToken) return jsonError('Missing Facebook access token', 400);

  const appId = env.FACEBOOK_APP_ID;
  const appSecret = env.FACEBOOK_APP_SECRET;
  if (!appId || !appSecret) {
    return jsonError('Facebook login is not configured on this deployment', 503);
  }

  // Validate the user-issued token belongs to OUR app (prevents token confusion)
  let debug;
  try {
    const debugRes = await fetch(
      `https://graph.facebook.com/debug_token?input_token=${encodeURIComponent(accessToken)}&access_token=${encodeURIComponent(appId)}%7C${encodeURIComponent(appSecret)}`
    );
    if (!debugRes.ok) throw new Error(`debug_token status ${debugRes.status}`);
    const debugJson = await debugRes.json();
    debug = debugJson.data;
    if (!debug || !debug.is_valid) throw new Error('Invalid Facebook token');
    if (String(debug.app_id) !== String(appId)) throw new Error('Token issued for a different app');
    if (debug.expires_at && debug.expires_at < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired');
    }
  } catch (err) {
    return jsonError(`Facebook token rejected: ${err.message}`, 401);
  }

  let profile;
  try {
    const meRes = await fetch(
      `https://graph.facebook.com/v19.0/me?fields=id,name,email,picture.width(200)&access_token=${encodeURIComponent(accessToken)}`
    );
    if (!meRes.ok) throw new Error(`Graph /me status ${meRes.status}`);
    profile = await meRes.json();
  } catch (err) {
    return jsonError(`Facebook profile lookup failed: ${err.message}`, 401);
  }

  const fbId = String(profile.id || '').trim();
  const name = (profile.name || '').trim() || 'Friend';
  const email = (profile.email || '').trim().toLowerCase();
  const picture = profile.picture?.data?.url || null;
  if (!fbId) return jsonError('Facebook did not return a user id', 400);

  try {
    let existing = await env.DB.prepare('SELECT id, email, name, avatar FROM users WHERE facebook_id = ?').bind(fbId).first();
    if (existing) {
      await ensurePersonalFamilyMembership(env, { sub: existing.id, name: existing.name });
      return issueSession({ sub: existing.id, email: existing.email, name: existing.name, avatar: existing.avatar }, env, request);
    }

    if (email) {
      const byEmail = await env.DB.prepare('SELECT id, email, name, avatar FROM users WHERE email = ?').bind(email).first();
      if (byEmail) {
        await env.DB.prepare(
          `UPDATE users SET facebook_id = ?, avatar = COALESCE(avatar, ?),
           auth_provider = CASE WHEN auth_provider LIKE '%facebook%' THEN auth_provider ELSE auth_provider || '+facebook' END
           WHERE id = ?`
        ).bind(fbId, picture, byEmail.id).run();
        await ensurePersonalFamilyMembership(env, { sub: byEmail.id, name: byEmail.name });
        return issueSession({ sub: byEmail.id, email: byEmail.email, name: byEmail.name, avatar: byEmail.avatar }, env, request);
      }
    }

    try {
      const dbSize = await env.DB.prepare(
        "SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size()"
      ).first();
      if ((dbSize?.size || 0) / (1024 * 1024) >= 2048) {
        return jsonError('Registration is currently closed. The system is at capacity.', 503);
      }
    } catch { /* fail open */ }

    const userId = generateUUID();
    const fallbackEmail = email || `fb_${fbId}@facebook.local`;
    await env.DB.prepare(
      `INSERT INTO users (id, email, name, avatar, auth_provider, facebook_id)
       VALUES (?, ?, ?, ?, 'facebook', ?)`
    ).bind(userId, fallbackEmail, name, picture, fbId).run();
    await ensurePersonalFamilyMembership(env, { sub: userId, name });
    return issueSession({ sub: userId, email: fallbackEmail, name, avatar: picture }, env, request);
  } catch (err) {
    return jsonError(`Database error: ${err.message}`, 500);
  }
}

// ── Email Magic Link ──────────────────────────────────────────────────────────

const MAGIC_LINK_TTL_SECONDS = 15 * 60;

async function handleMagicLinkRequest(body, env, request) {
  const rawEmail = (body.email || '').trim().toLowerCase();
  if (!rawEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
    return jsonError('Please enter a valid email', 400);
  }

  if (!env.RESEND_API_KEY) {
    return jsonError('Email login is not configured on this deployment', 503);
  }

  const rawToken = generateRawToken();
  const tokenHash = await sha256Hex(rawToken);
  const expiresAt = new Date(Date.now() + MAGIC_LINK_TTL_SECONDS * 1000).toISOString();

  try {
    await env.DB.prepare(
      `INSERT INTO magic_link_tokens (token_hash, email, expires_at) VALUES (?, ?, ?)`
    ).bind(tokenHash, rawEmail, expiresAt).run();
  } catch (err) {
    return jsonError(`Could not start magic link flow: ${err.message}`, 500);
  }

  const origin = new URL(request.url).origin;
  const verifyUrl = `${origin}/?magic_token=${encodeURIComponent(rawToken)}&magic_email=${encodeURIComponent(rawEmail)}`;

  const subject = 'Đăng nhập Family Expenses';
  const html = renderMagicLinkEmail(verifyUrl, rawEmail);
  const from = env.MAIL_FROM || 'Family Expenses <noreply@family-expenses.app>';

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: rawEmail, subject, html }),
    });
    if (!res.ok) {
      const errText = await res.text();
      return jsonError(`Could not send email: ${res.status} ${errText}`, 502);
    }
  } catch (err) {
    return jsonError(`Could not send email: ${err.message}`, 502);
  }

  return jsonResponse({ ok: true, ttl_seconds: MAGIC_LINK_TTL_SECONDS });
}

async function handleMagicLinkVerify(body, env, request) {
  const token = (body.token || '').trim();
  const email = (body.email || '').trim().toLowerCase();
  if (!token || !email) return jsonError('Missing token or email', 400);

  const tokenHash = await sha256Hex(token);

  let row;
  try {
    row = await env.DB.prepare(
      `SELECT token_hash, email, expires_at, used_at FROM magic_link_tokens WHERE token_hash = ? AND email = ?`
    ).bind(tokenHash, email).first();
  } catch (err) {
    return jsonError(`Database error: ${err.message}`, 500);
  }

  if (!row) return jsonError('Magic link is invalid or has been used', 401);
  if (row.used_at) return jsonError('Magic link has already been used', 401);
  if (new Date(row.expires_at).getTime() < Date.now()) return jsonError('Magic link has expired', 401);

  try {
    await env.DB.prepare(
      `UPDATE magic_link_tokens SET used_at = datetime('now') WHERE token_hash = ?`
    ).bind(tokenHash).run();
  } catch (err) {
    return jsonError(`Database error: ${err.message}`, 500);
  }

  // Upsert user
  try {
    let user = await env.DB.prepare('SELECT id, email, name, avatar FROM users WHERE email = ?').bind(email).first();
    if (!user) {
      try {
        const dbSize = await env.DB.prepare(
          "SELECT page_count * page_size as size FROM pragma_page_count(), pragma_page_size()"
        ).first();
        if ((dbSize?.size || 0) / (1024 * 1024) >= 2048) {
          return jsonError('Registration is currently closed. The system is at capacity.', 503);
        }
      } catch { /* fail open */ }

      const userId = generateUUID();
      const fallbackName = nameFromEmail(email);
      await env.DB.prepare(
        `INSERT INTO users (id, email, name, avatar, auth_provider) VALUES (?, ?, ?, NULL, 'email')`
      ).bind(userId, email, fallbackName).run();
      user = { id: userId, email, name: fallbackName, avatar: null };
    }
    await ensurePersonalFamilyMembership(env, { sub: user.id, name: user.name });
    return issueSession({ sub: user.id, email: user.email, name: user.name, avatar: user.avatar }, env, request);
  } catch (err) {
    return jsonError(`Database error: ${err.message}`, 500);
  }
}

function generateRawToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(input) {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function nameFromEmail(email) {
  const local = email.split('@')[0] || 'Friend';
  const cleaned = local.replace(/[._-]+/g, ' ').trim() || 'Friend';
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function renderMagicLinkEmail(verifyUrl, email) {
  const safeUrl = String(verifyUrl).replace(/"/g, '&quot;');
  const safeEmail = String(email).replace(/</g, '&lt;');
  return `<!doctype html><html><body style="margin:0;background:#F4EFE5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1E2A22;padding:32px 20px">
  <div style="max-width:480px;margin:0 auto;background:#FFFFFF;border-radius:22px;padding:28px 24px;box-shadow:0 10px 24px -18px rgba(0,0,0,0.18)">
    <div style="font-family:'Instrument Serif',Georgia,serif;font-size:28px;line-height:1.1;letter-spacing:-0.02em;margin:0 0 6px">Đăng nhập Family Expenses</div>
    <p style="font-size:14px;color:#42514A;line-height:1.5;margin:0 0 22px">Bạn vừa yêu cầu link đăng nhập cho <b>${safeEmail}</b>. Nhấn nút bên dưới trong vòng 15 phút để vào app.</p>
    <a href="${safeUrl}" style="display:inline-block;background:#3F6F4A;color:#FFFFFF;text-decoration:none;padding:14px 22px;border-radius:999px;font-weight:600;font-size:14px">Mở Family Expenses</a>
    <p style="font-size:12px;color:#6F7D76;line-height:1.5;margin:22px 0 0">Nếu bạn không yêu cầu link này, có thể bỏ qua email — không có gì xảy ra trên tài khoản.</p>
    <p style="font-size:11px;color:#98A49D;line-height:1.5;margin:18px 0 0;font-family:'JetBrains Mono',ui-monospace,monospace;word-break:break-all">${safeUrl}</p>
  </div></body></html>`;
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// ── Email Login ───────────────────────────────────────────────────────────────

async function handleEmailLogin(body, env, request) {
  const { email, password } = body;
  if (!email || !password) return jsonError('Missing email/username or password', 400);

  // Login by email or username
  const identifier = email.trim().toLowerCase();
  const isEmail = identifier.includes('@');

  let user;
  try {
    user = isEmail
      ? await env.DB.prepare(
          `SELECT id, email, name, avatar, password_hash, password_salt FROM users WHERE email = ?`
        ).bind(identifier).first()
      : await env.DB.prepare(
          `SELECT id, email, name, avatar, password_hash, password_salt FROM users WHERE username = ?`
        ).bind(identifier).first();
  } catch (err) {
    return jsonError(`Database error: ${err.message}`, 500);
  }

  if (!user) {
    return jsonError('Invalid email/username or password', 401);
  }
  if (!user.password_hash) {
    return jsonError('This account uses Google Sign-In. Please sign in with Google, or register with a password first.', 401);
  }

  const hash = await hashPassword(password, user.password_salt);
  if (hash !== user.password_hash) {
    return jsonError('Invalid email or password', 401);
  }

  await ensurePersonalFamilyMembership(env, { sub: user.id, name: user.name });

  return issueSession(
    { sub: user.id, email: user.email, name: user.name, avatar: user.avatar },
    env,
    request
  );
}

// ── Shared helpers ─────────────────────────────────────────────────────────────

async function issueSession(user, env, request) {
  // Fetch extra profile fields for the client
  let nameEdited = 0;
  let authProvider = user.auth_provider || 'google';
  let hasPassword = false;
  let username = null;
  let usernameEdited = 0;
  let googleLinked = false;
  try {
    const row = await env.DB.prepare('SELECT name_edited, auth_provider, password_hash, username, username_edited, google_sub FROM users WHERE id = ?').bind(user.sub).first();
    if (row) {
      nameEdited = row.name_edited || 0;
      authProvider = row.auth_provider || 'google';
      hasPassword = !!row.password_hash;
      username = row.username || null;
      usernameEdited = row.username_edited || 0;
      googleLinked = !!row.google_sub;
    }
  } catch { /* non-fatal */ }

  const sessionToken = await signJWT(
    { sub: user.sub, email: user.email, name: user.name, avatar: user.avatar },
    env.JWT_SECRET,
    86400
  );

  const isProduction = !request.url.includes('localhost') && !request.url.includes('127.0.0.1');
  const cookieFlags = isProduction
    ? 'HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400'
    : 'HttpOnly; SameSite=Strict; Path=/; Max-Age=86400';

  return new Response(
    JSON.stringify({ ok: true, user: { id: user.sub, email: user.email, name: user.name, avatar: user.avatar, username, name_edited: nameEdited, username_edited: usernameEdited, auth_provider: authProvider, has_password: hasPassword, google_linked: googleLinked } }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `session=${sessionToken}; ${cookieFlags}`,
      },
    }
  );
}

function generateSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateUUID() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}

async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Google JWT verification ───────────────────────────────────────────────────

async function verifyGoogleJWT(token, clientId) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Malformed JWT');

  const [headerB64, payloadB64, sigB64] = parts;
  const header = JSON.parse(new TextDecoder().decode(base64UrlDecode(headerB64)));
  const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64)));

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) throw new Error('Token expired');
  if (payload.aud !== clientId) throw new Error('Wrong audience');
  if (!['accounts.google.com', 'https://accounts.google.com'].includes(payload.iss)) {
    throw new Error('Wrong issuer');
  }

  const keysRes = await fetch('https://www.googleapis.com/oauth2/v3/certs');
  if (!keysRes.ok) throw new Error('Failed to fetch Google keys');
  const { keys } = await keysRes.json();

  const jwk = keys.find(k => k.kid === header.kid);
  if (!jwk) throw new Error('Key not found');

  const key = await crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const sigBytes = base64UrlDecode(sigB64);
  const data = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, sigBytes, data);
  if (!valid) throw new Error('Invalid signature');

  return payload;
}

function base64UrlEncode(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function signJWT(payload, secret, expiresIn) {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));

  const now = Math.floor(Date.now() / 1000);
  const fullPayload = base64UrlEncode(JSON.stringify({ ...payload, iat: now, exp: now + expiresIn }));

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const sigBytes = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`${header}.${fullPayload}`)
  );

  let binary = '';
  for (const b of new Uint8Array(sigBytes)) binary += String.fromCharCode(b);
  const sig = btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${header}.${fullPayload}.${sig}`;
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Uint8Array.from(atob(str), c => c.charCodeAt(0));
}

function jsonError(message, status) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
