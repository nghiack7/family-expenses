# Family Expenses — Mobile App Plan

## Overview

Build native mobile app từ web app hiện tại. **Local-first** — mọi data lưu trên device bằng SQLite. Sau này thêm sync server khi cần.

**Platforms:** iOS, iPadOS, macOS (Mac Catalyst), Android

## Tech Stack

| Layer | Technology | Lý do |
|-------|-----------|-------|
| Framework | **React Native + Expo SDK 52+** | Một codebase → 4 platforms. Expo managed workflow = không cần Xcode/Android Studio để dev |
| Navigation | **Expo Router** (file-based) | Tab navigation giống web app hiện tại |
| Local DB | **expo-sqlite** (SQLite 3) | Cùng schema với D1 hiện tại, offline-first |
| UI | **React Native** core components + custom theme | Port design system (Indigo palette, Be Vietnam Pro font) |
| State | **React Context + useReducer** | Đủ cho app này, không cần Redux |
| Charts | **react-native-chart-kit** hoặc **victory-native** | Dashboard charts |
| Voice | **expo-speech** + **@react-native-voice/voice** | Voice input giống web |
| Build | **EAS Build + EAS Submit** | Build cloud, submit lên stores |
| i18n | Custom (port từ web) | Đã có translations object sẵn |

## Project Structure

```
mobile/
├── app/                    # Expo Router (file-based routing)
│   ├── _layout.tsx         # Root layout (tab navigator)
│   ├── (tabs)/
│   │   ├── _layout.tsx     # Tab bar config
│   │   ├── index.tsx       # Dashboard (tổng quan)
│   │   ├── add.tsx         # Thêm chi tiêu
│   │   ├── history.tsx     # Lịch sử
│   │   └── family.tsx      # Gia đình / Settings
│   └── onboarding.tsx      # First-time setup (tên, tiền tệ)
├── components/
│   ├── ExpenseForm.tsx
│   ├── ExpenseCard.tsx
│   ├── CategoryPicker.tsx
│   ├── DashboardChart.tsx
│   ├── VoiceInput.tsx
│   └── AmountInput.tsx     # Format VND với thousand separators
├── db/
│   ├── schema.ts           # SQLite schema (port từ 0001_init.sql)
│   ├── migrations.ts       # Schema versioning
│   ├── expenses.ts         # CRUD operations
│   ├── categories.ts       # Category queries
│   ├── family.ts           # Family/member queries
│   └── stats.ts            # Dashboard aggregations
├── hooks/
│   ├── useDatabase.ts      # DB initialization & migration
│   ├── useExpenses.ts
│   ├── useStats.ts
│   └── useSync.ts          # Future: sync with server
├── i18n/
│   ├── vi.ts
│   └── en.ts
├── theme/
│   ├── colors.ts           # Port từ CSS variables
│   ├── typography.ts       # Be Vietnam Pro
│   └── index.ts
├── utils/
│   ├── currency.ts         # VND formatting, conversion
│   ├── voice-parser.ts     # Port voice parsing logic
│   └── ai.ts               # AI advisor (direct API call)
├── app.json                # Expo config
├── eas.json                # EAS Build config
└── package.json
```

## Database — Local SQLite

Schema giống D1 nhưng simplified cho single-device:

```sql
-- Không cần users table (single user trên device)
-- Không cần family_invites (local only)

CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY CHECK (id = 1),  -- singleton
  name TEXT NOT NULL,
  currency TEXT DEFAULT 'VND',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS family_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  is_default INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  member_id TEXT REFERENCES family_members(id),
  category_id TEXT REFERENCES categories(id),
  amount REAL NOT NULL,
  description TEXT,
  expense_date TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  sync_status TEXT DEFAULT 'local'  -- 'local', 'synced', 'modified'
);

-- Default categories (seeded on first launch)
-- Ăn uống, Di chuyển, Mua sắm, Hóa đơn, Giải trí, Sức khỏe, Giáo dục, Khác
```

## Features — Phase 1 (MVP cho App Store)

### 1. Onboarding (first launch)
- Nhập tên
- Chọn tiền tệ (VND default)
- Thêm thành viên gia đình (tùy chọn)
- Seed default categories

### 2. Dashboard
- Tổng chi tháng này
- Trung bình ngày
- Danh mục lớn nhất
- Chart: chi tiêu hàng ngày (bar chart)
- Chart: theo danh mục (pie/donut)
- Chart: theo thành viên
- Chi tiêu gần đây (5 items)

### 3. Thêm chi tiêu
- Amount input với thousand separators (port logic hiện tại)
- VND preview (nghìn, triệu, tỷ)
- Category picker (grid icons)
- Date picker
- Người chi (member picker)
- Mô tả
- **Voice input** — nói "đi ăn phở hết 50 nghìn" → auto fill

### 4. Lịch sử
- List chi tiêu theo tháng
- Filter: category, member, date range
- Swipe to delete
- Tap to edit
- Pull to refresh

### 5. Gia đình / Settings
- Profile (tên, tiền tệ)
- Quản lý thành viên (CRUD)
- Quản lý danh mục tùy chỉnh
- AI settings (API key, provider)
- Theme (light/dark)
- Ngôn ngữ (vi/en)
- Export data (CSV)

### 6. AI Advisor
- Phân tích chi tiêu tháng
- Hỏi đáp tự do
- Dùng API key user cấu hình (giống web)

## Features — Phase 2 (Sync Server)

### Home Server Setup
Server chạy trên PC ở nhà, expose qua Cloudflare Tunnel hoặc Tailscale.

```
home-server/
├── cmd/server/main.go      # Go HTTP server
├── internal/
│   ├── handler/            # REST API handlers
│   ├── service/            # Business logic
│   ├── repository/         # SQLite repository
│   └── sync/               # Sync engine
├── migrations/
└── Dockerfile
```

**Tech stack server:**
- **Go** + **net/http** (lightweight, chạy tốt trên PC cũ)
- **SQLite** (file-based, không cần setup DB server)
- **Cloudflare Tunnel** hoặc **Tailscale** để expose an toàn
- **JWT auth** (simple, stateless)

### Sync Protocol
- **Last-write-wins** per record (simple, đủ cho gia đình)
- Mỗi record có `updated_at` + `sync_status`
- Client gửi changes → server merge → trả về server state
- Conflict resolution: timestamp-based, latest wins

### Sync API

```
POST /api/v1/auth/register    — tạo account
POST /api/v1/auth/login       — login, nhận JWT
POST /api/v1/sync/push        — push local changes
POST /api/v1/sync/pull        — pull server changes
GET  /api/v1/sync/status      — check sync status
```

### Sync Flow
```
1. User bật sync trong Settings
2. Nhập server URL (e.g., https://expenses.nghia.tunnel.dev)
3. Register/Login → nhận JWT
4. Background sync mỗi 5 phút + khi có thay đổi
5. Nếu offline → queue changes → sync khi có mạng
```

### Multi-device sync
- Mỗi device có local SQLite
- Sync qua server khi online
- Offline-first: luôn đọc/ghi local trước

## App Store Publishing

### iOS / iPadOS / macOS (App Store)
- **Apple Developer Account** ($99/year)
- **EAS Build** → `.ipa` file
- **EAS Submit** → upload lên App Store Connect
- macOS via **Mac Catalyst** (Expo hỗ trợ)
- App Review: ~1-2 ngày
- Cần: screenshots, description, privacy policy, app icon

### Android (Google Play)
- **Google Play Developer Account** ($25 one-time)
- **EAS Build** → `.aab` file
- **EAS Submit** → upload lên Google Play Console
- Review: ~1-3 ngày
- Cần: screenshots, description, privacy policy, app icon

### App Store Metadata
```
App Name: Chi tiêu gia đình (Family Expenses)
Subtitle: Quản lý chi tiêu, biết tiền đi đâu
Category: Finance
Price: Free (hoặc $0.99-$2.99 nếu muốn bán)
Languages: Vietnamese, English
```

### Privacy Policy (required)
- Data stored locally on device only
- No data collected or transmitted (Phase 1)
- AI feature: user provides own API key, data sent to their chosen provider
- Phase 2: data synced to user's own server only

## Implementation Order

```
Week 1: Setup + Core
  ├── Expo project init
  ├── SQLite schema + migrations
  ├── Theme system (port CSS vars)
  ├── Tab navigation
  ├── Onboarding flow
  └── CRUD expenses (no UI polish)

Week 2: UI + Features  
  ├── Dashboard with charts
  ├── Amount input (VND formatting)
  ├── Category picker
  ├── History with filters
  ├── Swipe actions (edit/delete)
  └── i18n (vi/en)

Week 3: Advanced + Polish
  ├── Voice input
  ├── AI advisor
  ├── Dark mode
  ├── Family member management
  ├── Export CSV
  ├── App icon + splash screen
  └── Haptic feedback, animations

Week 4: Ship
  ├── Testing on real devices
  ├── Screenshots for stores
  ├── Privacy policy page
  ├── EAS Build (iOS + Android)
  ├── Submit to App Store
  └── Submit to Google Play

Future: Sync Server
  ├── Go server setup
  ├── Sync API
  ├── Cloudflare Tunnel
  ├── Mobile sync feature
  └── Multi-device testing
```

## Monetization Options

| Model | Pros | Cons |
|-------|------|------|
| **Free** | Max downloads, dùng cho gia đình | Không revenue |
| **Paid ($1.99)** | Simple, one-time | Ít người mua app finance |
| **Freemium** | Free basic + paid pro (AI, sync, export) | Cần implement IAP |
| **Tip jar** | Goodwill, voluntary | Rất ít người tip |

**Recommend:** Free download + optional tip jar. Nếu có sync server → freemium (sync = paid feature).

## Notes

- Expo managed workflow = không cần touch Xcode/Android Studio trực tiếp
- EAS Build chạy trên cloud = không cần Mac để build iOS (nhưng cần Mac để test trên simulator)
- Be Vietnam Pro font cần bundle vào app (expo-font)
- Voice input trên iOS dùng Speech framework, Android dùng SpeechRecognizer
- SQLite trên mobile rất nhanh, đủ cho millions of records
