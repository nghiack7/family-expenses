// Auth middleware for all /api/* routes
// Verifies session JWT cookie and injects user into request context

const PUBLIC_PATHS = ['/api/auth'];

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Allow public paths through without auth
  if (PUBLIC_PATHS.some(p => url.pathname.startsWith(p))) {
    return next();
  }

  // Extract session cookie
  const cookie = request.headers.get('Cookie') || '';
  const sessionMatch = cookie.match(/session=([^;]+)/);
  if (!sessionMatch) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const payload = await verifyJWT(sessionMatch[1], env.JWT_SECRET);
    // Inject user into context
    context.data.user = payload;
    return next();
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid session' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Minimal JWT verification (HS256)
async function verifyJWT(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT');

  const [header, payload, signature] = parts;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const sigBytes = base64UrlDecode(signature);
  const data = new TextEncoder().encode(`${header}.${payload}`);

  const valid = await crypto.subtle.verify('HMAC', key, sigBytes, data);
  if (!valid) throw new Error('Invalid signature');

  const decoded = JSON.parse(new TextDecoder().decode(base64UrlDecode(payload)));

  if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }

  return decoded;
}

function base64UrlDecode(str) {
  // Pad to multiple of 4
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  const bin = atob(str);
  return Uint8Array.from(bin, c => c.charCodeAt(0));
}

// Export for use in other functions
export { verifyJWT, base64UrlDecode };
