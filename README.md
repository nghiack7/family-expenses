# Family Expenses

A family expense tracker built on Cloudflare Pages + D1. Google SSO, VND currency, dark theme.

## Features

- Google Sign-In (OAuth via Google Identity Services)
- Family groups — invite members by Gmail
- Expense logging with categories, date, and per-person tracking
- Dashboard: monthly totals, category breakdown, per-person spending
- History with date/category/person filters
- Vietnamese Dong (VND) formatting
- Dark/light theme toggle
- Mobile-first responsive design

## Stack

| Layer | Tech |
|---|---|
| Hosting | Cloudflare Pages |
| API | Cloudflare Pages Functions |
| Database | Cloudflare D1 (SQLite) |
| Auth | Google Identity Services (JWT) |
| Frontend | Vanilla JS SPA (hash routing) |

---

## Setup & Deploy

### 1. Prerequisites

- [Cloudflare account](https://dash.cloudflare.com/sign-up)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (installed via `npm install`)
- A Google Cloud project with OAuth 2.0 set up

### 2. Install dependencies

```bash
npm install
```

### 3. Create a Google OAuth Client ID

1. Go to [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
2. Click **Create Credentials → OAuth 2.0 Client ID**
3. Application type: **Web application**
4. Add **Authorized JavaScript origins**:
   - `http://localhost:8788` (for local dev)
   - `https://your-project.pages.dev` (your Pages URL)
   - Your custom domain if you have one
5. You do **not** need redirect URIs — Google Identity Services uses a popup/redirect handled client-side
6. Copy the **Client ID** (looks like `123456789-abc.apps.googleusercontent.com`)

### 4. Create D1 database

```bash
# Create the database
npx wrangler d1 create family-expenses

# You'll see output like:
# [[d1_databases]]
# binding = "DB"
# database_name = "family-expenses"
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

Copy the `database_id` from the output.

### 5. Configure wrangler.toml

Edit `wrangler.toml` and replace the placeholders:

```toml
[vars]
GOOGLE_CLIENT_ID = "123456789-abc.apps.googleusercontent.com"   # from step 3
JWT_SECRET = "replace-with-a-long-random-string"                # any random secret
APP_URL = "https://your-project.pages.dev"                      # your Pages URL

[[d1_databases]]
binding = "DB"
database_name = "family-expenses"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"            # from step 4
```

Generate a strong JWT secret:
```bash
openssl rand -base64 32
```

### 6. Run database migrations

```bash
# Apply to remote D1
npm run db:migrate

# For local development
npm run db:migrate:local
```

### 7. Set GOOGLE_CLIENT_ID in the frontend

The frontend needs to know the Google Client ID to render the sign-in button. Add it to `index.html` just before the closing `</head>` tag:

```html
<script>window.GOOGLE_CLIENT_ID = "123456789-abc.apps.googleusercontent.com";</script>
```

Or set it dynamically via a Cloudflare Pages Function (see optional section below).

### 8. Deploy to Cloudflare Pages

```bash
# Login to Cloudflare (first time)
npx wrangler login

# Deploy
npm run deploy
```

After deploying, Cloudflare will give you a URL like `https://family-expenses-xyz.pages.dev`.

Update `APP_URL` in `wrangler.toml` and redeploy:
```bash
npm run deploy
```

---

## Local Development

```bash
# Run locally with D1 (local SQLite)
npm run dev

# Apply migrations to local DB first
npm run db:migrate:local
```

Visit `http://localhost:8788`

**Note:** Google Sign-In won't work on `localhost` unless you add it to the authorized origins in Google Cloud Console.

---

## Optional: Inject GOOGLE_CLIENT_ID from the server

Instead of hardcoding the Client ID in `index.html`, you can create a Pages Function to serve a dynamic config:

Create `functions/config.js`:
```js
export async function onRequestGet(context) {
  return new Response(
    `window.GOOGLE_CLIENT_ID = "${context.env.GOOGLE_CLIENT_ID}";`,
    { headers: { 'Content-Type': 'application/javascript' } }
  );
}
```

Then in `index.html`, replace the hardcoded script with:
```html
<script src="/config"></script>
```

This keeps the Client ID out of your source code.

---

## Environment Variables

| Variable | Description |
|---|---|
| `GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID |
| `JWT_SECRET` | Secret for signing session JWTs (min 32 chars) |
| `APP_URL` | Your app's public URL (for CORS/cookie context) |

For production secrets, use Cloudflare's encrypted environment variables:

```bash
npx wrangler pages secret put JWT_SECRET
```

---

## Database Schema

See `migrations/0001_init.sql` for the full schema.

Key tables:
- `users` — Google accounts that have signed in
- `families` — family groups
- `family_members` — who belongs to which family
- `family_invites` — pending email invitations
- `categories` — default + custom expense categories
- `expenses` — individual expense records

---

## API Reference

All API routes require a valid session cookie except `POST /api/auth`.

| Method | Path | Description |
|---|---|---|
| POST | `/api/auth` | Exchange Google credential for session |
| DELETE | `/api/auth` | Logout (clears cookie) |
| GET | `/api/family` | Get current user's family |
| POST | `/api/family` | Create a new family |
| PUT | `/api/family` | Invite member / leave family |
| GET | `/api/expenses` | List expenses (with filters) |
| POST | `/api/expenses` | Add an expense |
| DELETE | `/api/expenses?id=` | Delete an expense |
| GET | `/api/categories` | List categories |
| POST | `/api/categories` | Add custom category |
| DELETE | `/api/categories?id=` | Delete custom category |
| GET | `/api/stats` | Monthly summary, by category, by person |

---

## How Invites Work

1. Family owner invites a Gmail address via the Family Settings page
2. An invite record is created in `family_invites`
3. When the invited person signs in with Google for the first time, the app automatically detects their pending invite and adds them to the family
4. No email is sent — you share the app URL with family members directly

---

## Security Notes

- Session cookies are `HttpOnly; Secure; SameSite=Strict` in production
- Google JWTs are verified against Google's public keys on every auth call
- Session JWTs are signed with HS256 using `JWT_SECRET`
- Sessions expire after 24 hours
- All API endpoints verify the session before accessing the database
- Expense deletion is restricted to the expense owner or family owner
