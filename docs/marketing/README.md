# Marketing Kit — Family Expenses v1.4.0

Bộ tài liệu để ra một video demo gia đình + đăng Facebook trong ~1 giờ.

| File | Dùng để |
|---|---|
| [`video-storyboard.md`](./video-storyboard.md) | Kịch bản 85–90s, shot-list từng cảnh, hướng dẫn quay & edit |
| [`facebook-post.md`](./facebook-post.md) | 3 bản caption (story / listicle / technical), hashtag pool, lịch đăng, template reply |
| [`screenshots/`](./screenshots/) | Bộ ảnh auto-capture từ production để ghép reel/slideshow |
| [`videos/family-expenses-family-demo-reel.mp4`](./videos/family-expenses-family-demo-reel.mp4) | Video slideshow dọc 1080×1920, 83s, có caption overlay |

## Quy trình đề xuất

1. **Chuẩn bị** (15 phút)
   - Login production bằng account demo đã tạo: `family.demo.bodemo+58141639@example.com`
   - Demo household: **Nhà Demo 3 người** gồm **Bố Demo**, **Mẹ Linh**, **Bé Bông**
   - Data mẫu đã có chi tiêu của từng người, bill lặp, ngân sách, thu nhập tháng và lịch sử tháng trước
   - In sẵn 1 hoá đơn siêu thị để chụp ở cảnh AI receipt
   - Bật DND

2. **Quay** (20 phút)
   - iOS: Screen Recording từ Control Center
   - Quay từng cảnh theo storyboard, mỗi cảnh dài hơn 2s

3. **Edit** (30 phút)
   - CapCut: cắt theo timing, thêm sub, nhạc nền lo-fi 20% volume
   - Nếu làm slideshow/reel không quay màn hình: dùng ảnh trong `screenshots/` theo thứ tự `01` → `12`
   - Nếu cần đăng nhanh: dùng sẵn `videos/family-expenses-family-demo-reel.mp4`
   - Export 9:16, 1080×1920, 30fps

4. **Đăng** (5 phút)
   - Mở `facebook-post.md`, chọn **Version A** (đề xuất)
   - Dùng thumbnail: `screenshots/thumbnail-facebook-forecast.png`
   - Upload reel, bật share-to-Reels + Story
   - Pin comment đầu có link

## Auto-capture production

Nguồn capture: `https://finance-expenses.pages.dev/`

| File | Cảnh dùng trong reel |
|---|---|
| `screenshots/01-login-demo-email.png` | Login demo bằng email/password |
| `screenshots/02-dashboard-family-hook.png` | Hook dashboard, tổng chi tháng của cả nhà |
| `screenshots/03-weekly-digest.png` | Weekly digest / recap |
| `screenshots/04-family-spending-by-person.png` | Breakdown theo Bố/Mẹ/Con |
| `screenshots/05-family-members-settings.png` | Family settings, thành viên và vai trò |
| `screenshots/06-voice-batch-entry.png` | Voice batch entry, 3 draft |
| `screenshots/07-ai-receipt-extract.png` | AI extract hoá đơn |
| `screenshots/08-cashflow-forecast.png` | Cashflow forecast / budget guardrail |
| `screenshots/09-recurring-radar.png` | Recurring bills radar |
| `screenshots/10-ai-advisor-family-question.png` | AI advisor trả lời câu hỏi theo dữ liệu cả nhà |
| `screenshots/11-history-member-timeline.png` | Timeline chi tiêu có người chi |
| `screenshots/12-dark-english-dashboard.png` | Bilingual + dark mode |
| `screenshots/thumbnail-facebook-forecast.png` | Thumbnail 4:5 cho Facebook feed |

Lưu ý: flow demo dùng account email/password tự tạo, không dùng Facebook login. Facebook app chưa cấu hình thì bỏ cảnh Facebook khỏi video để tránh mất thời gian setup.

## Pain point → cảnh demo

| Pain point gia đình | Cảnh xử lý |
|---|---|
| Không biết Bố/Mẹ/Con ai đang chi nhiều | `04-family-spending-by-person.png`, `11-history-member-timeline.png` |
| Ghi chi tiêu thủ công mất thời gian | `06-voice-batch-entry.png`, `07-ai-receipt-extract.png` |
| Cuối tháng mới biết vượt ngân sách | `08-cashflow-forecast.png`, `03-weekly-digest.png` |
| Quên bill cố định như điện, internet, học phí | `09-recurring-radar.png` |
| Không muốn tự phân tích bảng số | `10-ai-advisor-family-question.png` |

## Lưu ý

- **KHÔNG** quay screen có thông tin nhạy cảm (số tiền lương thật, tên người thật) → dùng data mẫu/seed
- **KHÔNG** show OTP, email magic link, hoặc browser dev-tools
- **Test rate-limit AI fallback** trước khi quay cảnh AI advisor — nếu vượt limit, AI sẽ trả lỗi
- Đăng vào **20:30–22:00 T3/T5/CN** để max reach
