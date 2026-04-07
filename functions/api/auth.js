// POST /api/auth
// Receives Google credential JWT, verifies it, creates/gets user, issues session cookie

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid request body', 400);
  }

  const { credential } = body;
  if (!credential) return jsonError('Missing credential', 400);

  // Verify Google JWT
  let googlePayload;
  try {
    googlePayload = await verifyGoogleJWT(credential, env.GOOGLE_CLIENT_ID);
  } catch (err) {
    return jsonError(`Invalid Google credential: ${err.message}`, 401);
  }

  const { sub, email, name, picture } = googlePayload;

  // Upsert user in D1
  try {
    await env.DB.prepare(
      `INSERT INTO users (id, email, name, avatar) VALUES (?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET name=excluded.name, avatar=excluded.avatar`
    ).bind(sub, email, name, picture || null).run();
  } catch (err) {
    return jsonError(`Database error: ${err.message}`, 500);
  }

  // Check if user has a pending invite and auto-accept it
  try {
    const pendingInvite = await env.DB.prepare(
      `SELECT fi.*, f.id as fam_id FROM family_invites fi
       JOIN families f ON f.id = fi.family_id
       WHERE fi.email = ? AND fi.status = 'pending'
       ORDER BY fi.created_at ASC LIMIT 1`
    ).bind(email).first();

    if (pendingInvite) {
      await env.DB.prepare(
        `INSERT OR IGNORE INTO family_members (family_id, user_id, role) VALUES (?, ?, 'member')`
      ).bind(pendingInvite.family_id, sub).run();

      await env.DB.prepare(
        `UPDATE family_invites SET status = 'accepted' WHERE id = ?`
      ).bind(pendingInvite.id).run();
    }
  } catch {
    // Non-fatal: invite auto-accept failure shouldn't block login
  }

  // Issue session JWT (24h)
  const sessionToken = await signJWT(
    { sub, email, name, avatar: picture || null },
    env.JWT_SECRET,
    86400 // 24 hours
  );

  const isProduction = !request.url.includes('localhost') && !request.url.includes('127.0.0.1');
  const cookieFlags = isProduction
    ? 'HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400'
    : 'HttpOnly; SameSite=Strict; Path=/; Max-Age=86400';

  return new Response(
    JSON.stringify({ ok: true, user: { id: sub, email, name, avatar: picture || null } }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `session=${sessionToken}; ${cookieFlags}`,
      },
    }
  );
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

// Verify Google's JWT using their public keys
async function verifyGoogleJWT(token, clientId) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Malformed JWT');

  const [headerB64, payloadB64, sigB64] = parts;
  const header = JSON.parse(atob(headerB64.replace(/-/g, '+').replace(/_/g, '/')));
  const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));

  // Validate claims
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) throw new Error('Token expired');
  if (payload.aud !== clientId) throw new Error('Wrong audience');
  if (!['accounts.google.com', 'https://accounts.google.com'].includes(payload.iss)) {
    throw new Error('Wrong issuer');
  }

  // Fetch Google public keys
  const keysRes = await fetch('https://www.googleapis.com/oauth2/v3/certs');
  if (!keysRes.ok) throw new Error('Failed to fetch Google keys');
  const { keys } = await keysRes.json();

  const jwk = keys.find(k => k.kid === header.kid);
  if (!jwk) throw new Error('Key not found');

  // Import key and verify
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

async function signJWT(payload, secret, expiresIn) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const now = Math.floor(Date.now() / 1000);
  const fullPayload = btoa(JSON.stringify({ ...payload, iat: now, exp: now + expiresIn }))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

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

  const sig = btoa(String.fromCharCode(...new Uint8Array(sigBytes)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

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
