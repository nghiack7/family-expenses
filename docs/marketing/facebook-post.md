# Facebook Post — Family Expenses v1.4.0

> Copy nguyên block bạn thích nhất rồi paste vào Facebook.

---

## 📝 Version A — Câu chuyện cá nhân (recommended)

```
Tháng trước, vợ chồng mình ngồi nhìn nhau:
"Tiền đi đâu hết rồi nhỉ?"

Không chỉ vợ chồng.
Bố đổ xăng, mẹ đi chợ, con học thêm / mua sách / khám sức khoẻ.
20 triệu — biến mất.
Không phải vì tiêu hoang.
Mà vì mỗi người nhớ một mảnh, không ai thấy bức tranh chung 🥲

Nên mình build cái này — Family Expenses.

✨ Đọc một hơi 3 khoản chi, AI tự tách — không cần gõ
📸 Chụp hoá đơn, AI tự điền — không cần đọc
👨‍👩‍👧 Cả nhà cùng nhập — biết Bố/Mẹ/Con đang chi phần nào
🔮 Dự báo dòng tiền 30 ngày tới — biết trước khi cháy ví
🔔 Tự nhận diện hoá đơn cố định (Netflix, điện, internet…)
📊 Weekly digest — mỗi tuần có recap nhẹ nhàng
🆓 AI miễn phí — không cần API key của ai cả

Web app, mobile-first, PWA cài 1 chạm.
Việt–Anh, dark mode, free 100%.

👉 https://finance-expenses.pages.dev

Ai dùng thử rồi feedback giúp mình với 🙏

#PersonalFinance #FamilyExpenses #VietnameseTech #IndieHacker #SideProject #BuildInPublic #QuanLyChiTieu #AppViet
```

---

## 📝 Version B — Listicle ngắn (tốt cho reach)

```
Mình vừa ship Family Expenses v1.4 🎉

3 thứ mình muốn demo rõ hơn:
1️⃣ Một nhà nhiều người: Bố / Mẹ / Con cùng ghi chi tiêu
2️⃣ Dashboard thấy ngay ai chi nhiều, khoản nào đang kéo ngân sách
3️⃣ AI hỏi trực tiếp: "Tháng này nhà mình ai chi nhiều nhất?"

App miễn phí cho gia đình Việt:
• Đọc voice → AI tách khoản chi
• Chụp hoá đơn → AI extract
• Dự báo dòng tiền, cảnh báo vượt ngân sách
• Hoá đơn định kỳ tự nhận diện
• Weekly digest để cả nhà nhìn lại mỗi tuần

👉 https://finance-expenses.pages.dev

#BuildInPublic #IndieHacker #VN
```

---

## 📝 Version C — Founder mode (technical audience)

```
Shipped v1.4.0 — Family Expenses 🚀

Stack: Cloudflare Pages + D1 + Workers Functions, vanilla JS SPA, ~270KB total.
Auth: Google OIDC + email/password + email magic link (Resend).
AI: BYO key (Gemini / GPT / Claude / Z.AI) hoặc dùng shared fallback có rate-limit per-user + scope guard.
Mới nhất: `FALLBACK_AI_BASE_URL` để route qua gateway riêng — privacy + cost control.

Features:
✅ Voice batch entry (Web Speech API, capture multi-pause)
✅ Receipt OCR via Gemini Vision
✅ Cashflow forecast (rolling 30d)
✅ Recurring bills detector (signal: same-amount + same-day-of-month, 3+ months)
✅ Family members + by-person spending breakdown
✅ Budget guardrails với weekly digest
✅ PWA installable, offline-tolerant via SW
✅ EN/VN i18n

Live: https://finance-expenses.pages.dev
Source: github.com/nghiack7/family-expenses

Tốn ~$0/tháng để chạy. Cloudflare free tier + Resend free tier đủ cho gia đình quy mô nhỏ.

#CloudflarePages #D1 #ServerlessVN #IndieHacker
```

---

## 🏷️ Hashtag pool

**Vietnamese audience** (đăng kèm post)
```
#QuanLyChiTieu #ChiTieuGiaDinh #AppViet #TaiChinhCaNhan #PersonalFinanceVN #IndieMakerVN
```

**International / tech crowd**
```
#BuildInPublic #IndieHacker #SideProject #100DaysOfCode #CloudflareDev #SoloFounder #ShipIt
```

**Discoverability** (mix max 5–7)
```
#FamilyBudget #ExpenseTracker #FinanceApp #PWA #VanillaJS #ServerlessApp
```

---

## 🎯 Đăng lúc nào?

- **Best time VN audience**: **20:30–22:00** tối, T3/T5 hoặc CN
- **Avoid**: T2 sáng (newsfeed busy), T7 tối (mọi người đi chơi)
- **Boost option**: $5–10 boost trong 24h đầu nếu engagement organic > 10 like/giờ

## 📱 Khi đăng

1. Upload **video reel 9:16** trước, KHÔNG dùng "photo"
2. Bật **"Also share to Reels"** + **"Also share to Story"** → 3x reach
3. Tag: KHÔNG cần — tag bạn bè khiến FB nghĩ là spam, giảm reach
4. Comment đầu tiên (tự reply chính mình): **link đầy đủ + bullet features** — algorithm Facebook hiện tại ưu tiên link ở comment hơn caption
5. **Pin top comment** với link
6. Reply mọi comment trong **15 phút đầu** — đẩy reach

---

## 🖼️ Thumbnail/preview

Nếu đăng ở dạng **photo + caption** (không phải reel):
- Dùng frame **Dashboard có forecast cam** từ video
- File đã chuẩn bị: `docs/marketing/screenshots/thumbnail-facebook-forecast.png`
- Crop 4:5 (1080×1350) cho feed
- Overlay text: **"AI biết bạn chi gì — kể cả khi bạn quên"**

---

## ✉️ Reply template cho comment

**"App này free thật không?"**
> Free 100%, không có in-app purchase, mã nguồn mở luôn. Mình tự chạy trên Cloudflare free tier nên không tốn gì 💚

**"AI có cần API key không?"**
> Không bắt buộc — có sẵn key dùng chung (giới hạn nhẹ). Nếu muốn dùng nhiều, bạn cắm Gemini/OpenAI key riêng cũng được.

**"Dữ liệu mình lưu ở đâu, có an toàn không?"**
> Lưu trên Cloudflare D1 (database của Cloudflare, region SEA). Chỉ bạn và người trong family bạn invite mới đọc được. Không bán data, không tracking 🙏

**"Có app iOS/Android không?"**
> Là PWA — mở URL trên Safari/Chrome rồi "Add to Home Screen", chạy như app native, có icon riêng. Không cần qua App Store.
