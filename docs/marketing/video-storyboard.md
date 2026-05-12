# Demo Video Storyboard — Family Expenses v1.4.0

> Mục tiêu: 1 video reel dọc (9:16) 85–90 giây, đăng Facebook + Reels.
> URL: https://finance-expenses.pages.dev
> Quay bằng iPhone QuickTime / Android Scrcpy, hoặc Loom screen mirror.

---

## 🎬 Cấu trúc (85–90s)

| # | Time | Cảnh | Thao tác trên app | Voice-over / caption trên màn hình |
|---|------|------|-------------------|------------------------------------|
| 1 | 0:00–0:05 | **Hook gia đình** | Dashboard tổng tháng | "Lương về một cục, tiền đi ba hướng: bố, mẹ, con. Cuối tháng ai cũng hỏi: tiền đâu hết rồi?" |
| 2 | 0:05–0:11 | **Đăng nhập demo** | Logout → login email/password demo | "Không cần Facebook. Login demo bằng email là vào ngay dữ liệu mẫu." |
| 3 | 0:11–0:19 | **Nhà 3 người** ⭐ | Tab Gia đình → show Bố Demo, Mẹ Linh, Bé Bông | "Mỗi người một tài khoản, cùng một sổ quỹ gia đình." |
| 4 | 0:19–0:27 | **Ai chi bao nhiêu** ⭐ | Dashboard → `Theo thành viên` + recent expenses có tên người chi | "Nhìn phát biết Bé Bông, Bố hay Mẹ đang kéo tổng chi lên." |
| 5 | 0:27–0:36 | **Voice batch entry** | Tab Thêm → đọc: *"mẹ đi chợ 250 nghìn, bố đổ xăng 200 nghìn, bé mua sách 180 nghìn"* | "Đọc một hơi — app tách thành nhiều draft, đoán danh mục, sửa trước khi lưu." |
| 6 | 0:36–0:44 | **AI receipt extract** | Chụp/upload bill siêu thị → AI điền item | "Hoá đơn dài thì chụp. AI bóc từng khoản, không phải gõ lại." |
| 7 | 0:44–0:54 | **AI hỏi dữ liệu cả nhà** | Bấm FAB AI, hỏi: *"Tháng này nhà mình ai chi nhiều nhất?"* | "AI không chỉ trả lời tổng tiền, mà đọc breakdown theo người và danh mục." |
| 8 | 0:54–1:02 | **Forecast + budget guardrail** | Cuộn tới forecast | "App cộng chi tiêu hiện tại + bill sắp tới để dự báo còn buffer hay sắp hụt." |
| 9 | 1:02–1:09 | **Recurring bills radar** | Radar bill lặp | "Điện, internet, Netflix, học phí — bill cố định không còn bị quên." |
| 10 | 1:09–1:16 | **Weekly digest + history** | Weekly digest rồi history timeline | "Mỗi tuần có recap, còn timeline thì lọc được ai chi khoản nào." |
| 11 | 1:16–1:23 | **Bilingual + dark mode** | Toggle EN + dark | "Việt–Anh, dark mode, PWA cài 1 chạm." |
| 12 | 1:23–1:30 | **CTA** | URL `finance-expenses.pages.dev` + thumbnail forecast | "Family Expenses — nhìn rõ tiền của cả nhà, trước khi ví cháy." |

---

## 🎨 Hướng dẫn quay

### Trước khi quay
- [ ] **Bật Do Not Disturb** — không có pop-up Zalo/Tin nhắn cắt ngang
- [ ] **Login sẵn bằng account demo `family.demo.bodemo+58141639@example.com`**
- [ ] **Dùng family mẫu `Nhà Demo 3 người`**: Bố Demo, Mẹ Linh, Bé Bông
- [ ] **Data mẫu đã seed**: 18 giao dịch tháng này, giao dịch tháng trước, budget, income, recurring bills
- [ ] **Đặt 1 hoá đơn siêu thị** trên bàn để chụp ở cảnh AI receipt
- [ ] **Phóng to font** trong Settings hệ thống (Display zoom) để chữ rõ
- [ ] **Tắt status bar** (Airplane mode + Wi-Fi) → screenshot sạch
- [ ] **Sạc đầy pin** → biểu tượng pin đẹp

### Quay
- iPhone: `Cài đặt → Trung tâm Điều khiển → Ghi màn hình` rồi vuốt xuống bật
- Android: `Pull-down → Screen Record`
- Quay 9:16 dọc, **60fps** nếu được
- Mỗi cảnh quay **dài hơn 2 giây** so với storyboard để dễ cắt

### Edit (CapCut hoặc InShot — miễn phí)
- Cắt theo storyboard, **không giữ thao tác chờ** (loading > 1s thì speed-up 4x)
- Thêm **on-screen text** ở mỗi cảnh (font *DM Sans* hoặc *Be Vietnam Pro*)
- **Nhạc nền**: lo-fi nhẹ, volume 20% — gợi ý CapCut nhạc free *"Soft Morning"* hoặc *"Coffee Break"*
- Voice-over **không bắt buộc** — đa số người Việt xem reel **không bật tiếng**, on-screen text quan trọng hơn
- **Transition**: chỉ cross-dissolve 0.3s, đừng zoom-glitch
- **Thumbnail**: frame của cảnh forecast (bar/buffer màu cam) — đập vào mắt

---

## 🖼️ Shot-list chi tiết (cảnh có UI rõ)

### Auto-capture assets

Bộ ảnh đã capture từ production `https://finance-expenses.pages.dev/` nằm ở `docs/marketing/screenshots/`.

| Cảnh | File |
|---|---|
| Login demo email | `01-login-demo-email.png` |
| Dashboard family hook | `02-dashboard-family-hook.png` |
| Weekly digest | `03-weekly-digest.png` |
| Family spending by person | `04-family-spending-by-person.png` |
| Family members/settings | `05-family-members-settings.png` |
| Voice batch | `06-voice-batch-entry.png` |
| AI receipt extract | `07-ai-receipt-extract.png` |
| Forecast | `08-cashflow-forecast.png` |
| Recurring radar | `09-recurring-radar.png` |
| AI advisor | `10-ai-advisor-family-question.png` |
| History member timeline | `11-history-member-timeline.png` |
| EN + dark mode | `12-dark-english-dashboard.png` |

Nếu ghép slideshow trong CapCut, dùng mỗi ảnh 4–6 giây, thêm zoom-in nhẹ 103–106%, rồi overlay caption từ bảng storyboard phía trên.

### Cảnh 2 — Login screen
- Khung: full screen
- Dùng account demo tự tạo, không dùng Facebook
- Nhập email/password demo → nhấn **"Đăng nhập"**
- Nếu muốn tiết kiệm thời lượng, cắt cảnh gõ password và chỉ giữ đoạn từ form login sang dashboard

### Cảnh 3 — Nhà 3 người ⭐ FAMILY SHOT
- Tab **Gia đình**
- Dừng ở card **Nhà Demo 3 người**
- Show đủ 3 người: **Bố Demo**, **Mẹ Linh**, **Bé Bông**
- On-screen text: *"Một sổ chung, mỗi người vẫn có dấu vết chi tiêu riêng"*

### Cảnh 4 — Theo thành viên ⭐ PAINPOINT SHOT
- Dashboard → cuộn tới **Theo thành viên**
- Dừng 1 giây ở số tiền của từng người
- Cuộn nhẹ xuống **Chi tiêu gần đây** để thấy mỗi bill có tên người chi
- On-screen text: *"Không còn đoán: ai chi, chi vào đâu, ngày nào"*

### Cảnh 5 — Voice batch ⭐ HERO SHOT
- Bấm FAB tròn giữa bottom-nav
- Bấm icon **micro**
- Đọc **rõ chậm**: *"Mẹ Linh đi chợ hai trăm năm mươi nghìn, bố đổ xăng hai trăm nghìn, Bé Bông mua sách một trăm tám mươi nghìn"*
- Đợi app nhận diện xong
- App hiện **3 thẻ rời** với category emoji, số tiền, danh mục
- Bấm **"Lưu tất cả"** → toast confirm

### Cảnh 6 — Receipt photo
- Tab **Thêm** → nút **Quét ảnh hóa đơn bằng AI**
- Camera permission allow
- Chụp 1 hoá đơn (chuẩn bị trước: hoá đơn siêu thị có tổng tiền rõ)
- AI loading spinner 1–2s
- Preview hiện các dòng chi tiêu đã extract, highlight nút **Thêm tất cả**

### Cảnh 7 — AI chat (fallback key)
- Bấm FAB **AI** nổi ở góc dưới
- Type hoặc voice-input: *"Tháng này nhà mình ai chi nhiều nhất và khoản nào đang kéo ngân sách?"*
- AI trả lời theo breakdown gia đình, ví dụ: **Bé Bông** chi nhiều nhất, **Ăn uống/Giáo dục** là khoản cần xem lại
- ⚠️ Nhớ check rate-limit trước khi quay, fallback key giới hạn per-user

### Cảnh 8 — Forecast
- Cuộn Dashboard
- Stop ở **Cashflow forecast** card
- Highlight bar màu cam (vượt ngân sách)
- Hover/tap show tooltip

### Cảnh 9 — Recurring radar
- Dashboard → cuộn tới card **Bill lặp & subscriptions**
- List: Netflix, Tiền điện, Internet, Gym
- Mỗi item có badge **"3 ngày tới"** / **"Đã trả"**

### Cảnh 11 — Bilingual + dark
- Menu → Settings
- Toggle EN ↔ VN — quay đúng lúc text label đổi
- Toggle theme — quay đúng lúc fade từ light → dark
- ✨ **Money shot**: dark mode + tiếng Anh, look pro

### Cảnh 12 — CTA
- Static slide: logo + URL + QR
- Tạo QR ở https://www.qr-code-generator.com (free) trỏ tới `https://finance-expenses.pages.dev`

---

## ⏱️ Pacing tip

- **3 giây đầu phải hook** — nếu cảnh 1 không níu được, ai cũng vuốt qua
- **Mỗi cảnh ≤ 8 giây** — não Gen Z không kiên nhẫn hơn
- **Subtitle 100%** — Facebook auto-mute, không có sub thì zero engagement
- **Loop**: cảnh cuối bắt đầu giống cảnh 1 để Reels tự loop mượt
