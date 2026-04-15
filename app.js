/**
 * Family Expense Tracker — Frontend SPA
 * Hash routing: #dashboard, #add-expense, #history, #family
 */

// ── i18n ──────────────────────────────────────────────────────────────────
const translations = {
  vi: {
    // Nav & tabs
    dashboard: 'Tổng quan',
    add: 'Thêm',
    history: 'Lịch sử',
    family: 'Gia đình',
    sign_out: 'Đăng xuất',

    // Login
    app_title: 'Chi tiêu gia đình',
    login_title: 'Chi tiêu gia đình',
    login_subtitle: 'Quản lý chi tiêu, biết tiền đi đâu mỗi ngày.',
    login_story_eyebrow: 'Chi tiêu gia đình',
    login_story_card_overview_title: 'Tổng quan rõ ràng',
    login_story_card_overview_body: 'Xem tháng này, danh mục lớn nhất và biến động ngay trên một màn hình.',
    login_story_card_voice_title: 'Nhập nhanh bằng giọng nói',
    login_story_card_voice_body: 'Nói một lần, app tách thành nhiều draft để bạn sửa trước khi lưu.',
    login_story_card_family_title: 'Dùng chung cho cả nhà',
    login_story_card_family_body: 'Theo dõi người chi, danh mục và lịch sử trong cùng một không gian.',
    login_card_badge: 'Sổ quỹ gia đình',
    login_card_welcome: 'Chào mừng trở lại',
    login_card_copy: 'Đăng nhập để tiếp tục quản lý chi tiêu gia đình với giao diện mới gọn và dễ dùng hơn.',
    or_continue_email: 'hoặc đăng nhập bằng email',
    full_name: 'Họ và tên',
    username: 'Tên đăng nhập',
    username_optional: '(không bắt buộc)',
    email: 'Email',
    email_or_username: 'Email hoặc tên đăng nhập',
    password: 'Mật khẩu',
    password_placeholder: 'Ít nhất 8 ký tự',
    auth_name_placeholder: 'Nguyen Van A',
    auth_username_placeholder: 'vd: nghia_nguyen',
    auth_email_placeholder: 'you@example.com',
    sign_in: 'Đăng nhập',
    create_account: 'Tạo tài khoản',
    no_account: 'Chưa có tài khoản? Đăng ký',
    have_account: 'Đã có tài khoản? Đăng nhập',
    currency_hint: 'Tiền tệ có thể cài đặt trong Cài đặt gia đình',
    creating_account: 'Đang tạo tài khoản...',
    signing_in: 'Đang đăng nhập...',

    // Dashboard
    total_this_month: 'Tổng tháng này',
    total_this_day: 'Tổng hôm nay',
    total_this_year: 'Tổng năm nay',
    daily_average: 'Trung bình ngày',
    monthly_average: 'Trung bình tháng',
    biggest_category: 'Danh mục lớn nhất',
    expenses_count: '{0} khoản chi',
    days_with_spending: '{0} ngày có chi tiêu',
    months_with_spending: '{0} tháng có chi tiêu',
    no_expenses_yet: 'Chưa có chi tiêu',
    daily_spending: 'Chi tiêu hàng ngày',
    by_category: 'Theo danh mục',
    by_person: 'Theo thành viên',
    recent_expenses: 'Chi tiêu gần đây',
    see_all: 'Xem tất cả',
    vs_last_month: 'so với tháng trước',
    vs_last_year: 'so với năm trước',
    vs_yesterday: 'so với hôm qua',
    same_as_last_month: 'Bằng tháng trước',
    view_day: 'Ngày',
    view_month: 'Tháng',
    view_year: 'Năm',
    no_spending_yet: 'Chưa có chi tiêu',
    add_first_expense_breakdown: 'Thêm khoản chi đầu tiên để xem biểu đồ',
    no_members_yet: 'Chưa có thành viên',
    no_family_yet: 'Chưa có gia đình',
    go_family_settings: 'Vào <a href="#family">Cài đặt gia đình</a> để tạo hoặc tham gia',
    nav_brand_prefix: 'Nhà',
    nav_brand_suffix: 'Flow',
    lang_toggle_title: 'Chuyển ngôn ngữ',
    theme_toggle_title: 'Đổi giao diện',
    topbar_eyebrow: 'Hệ điều hành tài chính gia đình',
    topbar_title: 'Tiền có ngữ cảnh, không có rác giao diện.',
    dashboard_eyebrow: 'Tổng quan',
    previous_period: 'Kỳ trước',
    next_period: 'Kỳ sau',
    onboarding_kicker: 'Bắt đầu',
    dashboard_hero_family_title: 'Chi tiêu gia đình trong một nhịp nhìn.',
    dashboard_hero_family_body: 'Trọng tâm là tốc độ đọc số liệu, không phải đống card vô nghĩa. Bạn biết ngay tháng này đã chi bao nhiêu, ai chi nhiều và danh mục nào đang kéo ngân sách đi lệch.',
    dashboard_hero_personal_title: 'Chi tiêu của bạn trong một nhịp nhìn.',
    dashboard_hero_personal_body: 'Bạn đang bắt đầu với không gian cá nhân. Cứ ghi lại vài khoản chi đầu tiên, dashboard sẽ tự lên nhịp và bạn có thể mời người thân sau.',
    onboarding_title: 'Bắt đầu trong 30 giây',
    onboarding_body: 'Bạn chưa có bill nào. Bắt đầu bằng 1 khoản chi thật đơn giản để app hiểu thói quen và mở ra toàn bộ dashboard.',
    onboarding_step_1_title: 'Thêm khoản đầu tiên',
    onboarding_step_1_body: 'Nhập tay một bill bất kỳ để có dữ liệu mở dashboard.',
    onboarding_step_2_title: 'Hoặc đọc một loạt bằng giọng nói',
    onboarding_step_2_body: 'Nói liền mạch, app sẽ tách thành draft để bạn sửa rồi lưu.',
    onboarding_step_3_title: 'Mời người thân sau',
    onboarding_step_3_body: 'Bạn có thể dùng một mình trước, rồi mời thêm thành viên khi cần.',
    onboarding_add_cta: 'Thêm chi tiêu đầu tiên',
    onboarding_voice_cta: 'Mở nhập giọng nói',
    budget_kicker: 'Lan can',
    budget_card_title: 'Ngân sách tháng',
    budget_spent_label: 'Đã chi',
    budget_limit_label: 'Ngân sách',
    budget_remaining_label: 'Còn lại',
    budget_status_on_track: 'Đúng nhịp',
    budget_status_at_risk: 'Cần chú ý',
    budget_status_over: 'Vượt trần',
    budget_summary_on_track: 'Bạn đang dùng {0}% ngân sách tháng. Nhịp chi tiêu hiện vẫn an toàn.',
    budget_summary_at_risk: 'Bạn đã dùng {0}% ngân sách tháng. Nên siết lại các khoản linh hoạt trước khi vượt trần.',
    budget_summary_over: 'Bạn đã vượt ngân sách tháng {0}. Ưu tiên cắt ngay danh mục đang kéo lệch ngân sách.',
    budget_no_limits: 'Chưa có ngân sách theo danh mục. Cài ở tab Gia đình để app cảnh báo sớm hơn.',
    budget_no_plan_title: 'Chưa đặt ngân sách tháng',
    budget_no_plan_body: 'Đặt một mức trần chi tiêu để app bắt đầu cảnh báo khi bạn đi lệch kế hoạch.',
    budget_set_cta: 'Đặt ngân sách',
    budget_settings: 'Ngân sách tháng',
    budget_settings_desc: 'Đặt trần chi tiêu, thu nhập tháng và limit theo danh mục để app cảnh báo sớm trước khi ngân sách hoặc sức chịu đựng bị vỡ.',
    monthly_budget_total: 'Ngân sách tổng mỗi tháng',
    monthly_budget_placeholder: 'vd: 15000000',
    category_budget_optional: 'Ngân sách theo danh mục',
    category_budget_hint: 'Để trống nếu không muốn theo dõi danh mục đó.',
    save_budget_settings: 'Lưu ngân sách',
    budget_settings_saved: 'Đã lưu ngân sách tháng!',
    budget_settings_saving: 'Đang lưu ngân sách...',
    only_owner_budget: 'Chỉ chủ không gian mới chỉnh được ngân sách',
    category_budget_invalid: 'Ngân sách danh mục phải lớn hơn hoặc bằng 0',
    category_budget_over: 'Vượt {0}',
    category_budget_left: 'Còn {0}',
    category_budget_usage: 'Đã chi {0} / {1}',
    category_budget_on_track: 'Ổn',
    category_budget_at_risk: 'Sát trần',
    category_budget_over_status: 'Vượt',
    recurring_radar_title: 'Bill lặp & subscriptions',
    recurring_manager_title: 'Bill lặp & subscriptions',
    recurring_desc_label: 'Tên bill',
    recurring_amount_label: 'Số tiền',
    recurring_category_label: 'Danh mục',
    recurring_cadence_label: 'Chu kỳ',
    recurring_next_due_label: 'Kỳ tiếp theo',
    recurring_save: 'Lưu bill lặp',
    recurring_saving: 'Đang lưu bill...',
    recurring_saved: 'Đã lưu bill lặp!',
    recurring_empty: 'Chưa có bill lặp nào. Tạo bill điện, internet, Netflix, tiền nhà... để app nhắc bạn đúng lúc.',
    recurring_radar_empty: 'Không có bill nào đến hạn sớm. Radar đang yên.',
    recurring_confirm_due: 'Ghi nhận kỳ này',
    recurring_delete: 'Xóa bill lặp',
    recurring_deleted: 'Đã xóa bill lặp',
    recurring_due_overdue: 'Quá hạn',
    recurring_due_soon: 'Sắp đến hạn',
    recurring_due_scheduled: 'Đã lên lịch',
    recurring_weekly: 'Hàng tuần',
    recurring_monthly: 'Hàng tháng',
    recurring_yearly: 'Hàng năm',
    recurring_invalid: 'Cần nhập đủ bill, số tiền, danh mục và ngày đến hạn',
    recurring_confirmed: 'Đã ghi nhận bill kỳ này',
    recurring_confirm_failed: 'Không thể ghi nhận bill: {0}',
    recurring_due_meta: 'Kỳ tới: {0}',
    recurring_owner_meta: 'Người tạo: {0}',
    recurring_load_failed: 'Không tải được bill lặp lúc này. Thử lại một lần nữa.',
    recurring_retry: 'Tải lại',
    forecast_card_title: 'Dự báo hụt tiền',
    forecast_intro: 'Ước tính 7/30 ngày tới dựa trên bill lặp, thu nhập tháng, ngân sách tháng và nhịp chi hiện tại.',
    forecast_status_safe: 'Còn dư',
    forecast_status_watch: 'Căng',
    forecast_status_deficit: 'Sắp hụt',
    forecast_window_days: '{0} ngày tới',
    forecast_budget_runway: 'Runway ngân sách',
    forecast_income_runway: 'Runway thu nhập',
    forecast_fixed_bills: 'Bill lặp',
    forecast_spend_pace: 'Nhịp chi hiện tại',
    forecast_buffer: 'Buffer còn lại',
    forecast_no_budget_title: 'Chưa đủ dữ liệu để dự báo',
    forecast_no_budget_body: 'Forecast cần ít nhất một trong hai: thu nhập tháng hoặc ngân sách tháng. Nhập một mốc vận hành trước, rồi app mới dự báo lúc nào bạn sắp hụt tiền.',
    forecast_safe_summary: 'Còn dư {0}. {1} bill lặp sắp tới chiếm {2}, nhịp chi hiện tại vẫn nằm trong runway.',
    forecast_watch_summary: 'Buffer chỉ còn {0}. {1} bill lặp sắp tới đang đẩy bạn sát trần.',
    forecast_deficit_summary: 'Nếu giữ nhịp hiện tại, bạn có thể hụt khoảng {0} vào {1}.',
    forecast_recurring_count: '{0} bill',
    forecast_set_budget: 'Đặt ngân sách',
    budget_income_hint: 'Thu nhập tháng giúp app biết 25 triệu là bình thường hay đang vượt sức chịu đựng.',
    monthly_income_invalid: 'Thu nhập tháng phải lớn hơn hoặc bằng 0',
    forecast_kicker: 'Dự báo',
    chart_pattern_kicker: 'Nhịp',
    chart_mix_kicker: 'Tỷ trọng',
    chart_ranking_kicker: 'Xếp hạng',
    people_kicker: 'Thành viên',
    latest_kicker: 'Mới nhất',
    radar_kicker: 'Radar',

    // Add expense
    add_expense: 'Thêm chi tiêu',
    amount_label: 'Số tiền ({0}) *',
    amount_placeholder: 'vd: 150000',
    description: 'Mô tả',
    desc_placeholder: 'vd: Ăn trưa Phở 24',
    category: 'Danh mục *',
    select_category: 'Chọn danh mục...',
    date: 'Ngày *',
    paid_by: 'Người chi',
    add_expense_btn: 'Thêm chi tiêu',
    adding: 'Đang thêm...',
    expense_added: 'Đã thêm chi tiêu!',
    custom_categories: 'Danh mục tùy chỉnh',
    category_name: 'Tên danh mục',
    no_custom_categories: 'Chưa có danh mục tùy chỉnh.',
    category_name_required: 'Cần nhập tên danh mục',
    category_added: 'Đã thêm danh mục',
    category_deleted: 'Đã xóa danh mục',
    add_eyebrow: 'Ghi nhận',
    hero_pill_manual: 'Thủ công',
    hero_pill_voice_batch: 'Batch giọng nói',
    hero_pill_receipt_ai: 'AI hóa đơn',
    voice_batch_kicker: 'Batch giọng nói',
    voice_batch_title: 'Nói một lần, tạo nhiều draft',
    voice_batch_helper: 'Ví dụ: “đi chợ 100k cafe 50k mua đồ chơi cho con 5k”. App sẽ tách thành từng khoản, đoán danh mục, để bạn sửa rồi mới lưu.',
    draft_review_kicker: 'Soát draft',
    draft_review_title: 'Danh sách bill tạm',
    receipt_kicker: 'Hóa đơn',
    receipt_title: 'Quét hóa đơn bằng AI',
    manual_entry_kicker: 'Nhập tay',
    manual_entry_title: 'Thêm thủ công',
    custom_taxonomy_kicker: 'Danh mục riêng',
    recurring_kicker: 'Định kỳ',
    add_label: 'Thêm',
    recurring_desc_placeholder: 'Netflix, tiền nhà, học phí...',
    recurring_amount_placeholder: '150000',
    add_hero_family_body: 'Thiết kế mới ưu tiên hai cách nhập: thủ công thật nhanh, hoặc đọc một loạt chi tiêu bằng giọng nói để app tách thành draft cho bạn rà soát trước khi lưu.',
    add_hero_personal_body: 'Bạn có thể bắt đầu rất nhẹ: nhập tay một khoản chi, hoặc đọc liền nhiều khoản bằng giọng nói để app dựng sẵn draft cho bạn xác nhận.',

    // History
    history_eyebrow: 'Lịch sử',
    expense_history: 'Lịch sử chi tiêu',
    all_categories: 'Tất cả danh mục',
    all_members: 'Tất cả thành viên',
    filter: 'Lọc',
    load_more: 'Xem thêm',
    no_expenses: 'Không có chi tiêu',
    add_first_expense: 'Thêm khoản chi đầu tiên!',
    all_time: 'Mọi thời gian',
    delete_expense_confirm: 'Xóa khoản chi tiêu này?',
    expense_deleted: 'Đã xóa chi tiêu',
    edit_expense: 'Sửa chi tiêu',
    expense_updated: 'Đã cập nhật chi tiêu!',
    history_hero_family_body: 'Mọi khoản chi đều được đặt trong một timeline sạch, lọc nhanh theo ngày, danh mục và người chi.',
    history_hero_personal_body: 'Toàn bộ khoản chi của bạn được gom vào một timeline sạch để rà lại nhanh theo ngày và danh mục.',
    reset: 'Đặt lại',
    reset_title: 'Đặt lại bộ lọc',

    // Family
    family_settings: 'Cài đặt gia đình',
    family_ops_eyebrow: 'Điều hành gia đình',
    workspace_personal_name: 'Không gian chi tiêu của bạn',
    your_profile: 'Hồ sơ của bạn',
    profile_kicker: 'Hồ sơ',
    display_name: 'Tên hiển thị',
    username_hint: '3-30 ký tự, chữ cái, số, gạch dưới',
    username_placeholder: 'Đặt tên đăng nhập',
    username_saved: 'Đã lưu tên đăng nhập!',
    username_cleared: 'Đã xóa tên đăng nhập',
    username_invalid: 'Tên đăng nhập phải 3-30 ký tự, chỉ chữ/số/gạch dưới',
    username_edit_used: 'Tên đăng nhập đã được đặt (chỉ cho phép đặt 1 lần)',
    username_set_confirm: 'Bạn chỉ có thể đặt tên đăng nhập 1 lần. Bạn chắc chứ?',
    link_google: 'Liên kết Google',
    link_google_success: 'Đã liên kết tài khoản Google!',
    google_linked: 'Đã liên kết Google',
    email_label: 'Email',
    copy_invite_link: 'Sao chép link mời',
    invite_link_copied: 'Đã sao chép link mời!',
    invite_link_join: 'Bạn được mời vào gia đình! Đang tham gia...',
    invite_link_joined: 'Đã tham gia gia đình qua link mời!',
    invite_link_invalid: 'Link mời không hợp lệ hoặc đã hết hạn',
    name_edit_used: 'Tên đã được thay đổi (chỉ cho phép sửa 1 lần)',
    name_change_confirm: 'Bạn chỉ có thể đổi tên 1 lần. Bạn chắc chứ?',
    name_updated: 'Đã cập nhật tên!',
    name_updated_hint: 'Đã cập nhật tên thành công! (đã dùng lượt sửa)',
    name_empty: 'Tên không được để trống',
    change_password: 'Đổi mật khẩu',
    set_password: 'Đặt mật khẩu',
    current_password: 'Mật khẩu hiện tại',
    current_password_placeholder: 'Nhập mật khẩu hiện tại',
    new_password: 'Mật khẩu mới',
    new_password_placeholder: 'Ít nhất 8 ký tự',
    confirm_password: 'Xác nhận mật khẩu mới',
    confirm_password_placeholder: 'Nhập lại mật khẩu mới',
    current_password_required: 'Cần nhập mật khẩu hiện tại',
    password_min_length: 'Mật khẩu mới phải có ít nhất 8 ký tự',
    passwords_not_match: 'Mật khẩu không khớp',
    changing_password: 'Đang đổi...',
    password_set_success: 'Đã đặt mật khẩu!',
    google_auth_notice: 'Đăng nhập bằng Google. Không quản lý mật khẩu được.',
    security_kicker: 'Bảo mật',
    inbox_kicker: 'Hộp thư',
    create_family_title: 'Tạo nhóm gia đình',
    create_family_desc: 'Thiết lập gia đình để theo dõi chi tiêu chung.',
    family_name_placeholder: 'Tên gia đình, vd: Nhà Nguyễn',
    create: 'Tạo',
    family_name_required: 'Cần nhập tên gia đình',
    family_created: 'Đã tạo gia đình!',
    members: 'Thành viên',
    workspace_kicker: 'Không gian',
    invite_member: 'Mời thành viên',
    invite_kicker: 'Lời mời',
    invite_placeholder: 'Email hoặc tên đăng nhập',
    invite: 'Mời',
    pending_invites: 'Lời mời đang chờ',
    you_have_invites: 'Bạn có lời mời tham gia gia đình',
    invite_from: '{0} mời bạn vào "{1}"',
    accept: 'Chấp nhận',
    reject: 'Từ chối',
    invite_accepted: 'Đã tham gia gia đình!',
    invite_rejected: 'Đã từ chối lời mời',
    pending: 'Đang chờ',
    invite_cancelled: 'Đã hủy lời mời',
    email_required: 'Cần nhập email',
    invite_sent: 'Đã gửi email mời! Họ sẽ tự động tham gia khi đăng nhập.',
    invite_no_email: 'Đã mời! Không gửi được email — chia sẻ link này: {0}',
    currency: 'Tiền tệ',
    only_owner_currency: 'Chỉ chủ gia đình mới đổi được tiền tệ',
    currency_unchanged: 'Tiền tệ không thay đổi',
    currency_change_confirm: 'Đổi tiền tệ từ {0} sang {1}?\n\nCẢNH BÁO: Tất cả số tiền chi tiêu sẽ được quy đổi theo tỷ giá hiện tại. Không thể hoàn tác.',
    converting: 'Đang quy đổi...',
    currency_changed: 'Đã đổi tiền tệ sang {0} (tỷ giá: {1})',
    leave_family: 'Rời gia đình',
    leave_family_confirm: 'Bạn chắc chắn muốn rời gia đình?',
    left_family: 'Bạn đã rời gia đình',
    danger_zone: 'Vùng nguy hiểm',
    family_hero_family_body: 'Hồ sơ, thành viên, lời mời, AI settings và vùng thao tác nhạy cảm đều được nhóm lại theo ngữ cảnh để đỡ rối mắt.',
    family_hero_personal_body: 'Bạn đang dùng app ở chế độ cá nhân. Mọi dữ liệu vẫn nằm trong cùng model family, nhưng copy được làm nhẹ hơn để không tạo cảm giác phải lập gia đình mới dùng được.',
    owner: 'Chủ',
    member: 'Thành viên',
    delete_category: 'Xóa danh mục',
    cancel_invite: 'Hủy lời mời',

    // AI
    ai_settings: 'Cài đặt AI phân tích',
    ai_kicker: 'AI',
    provider: 'Nhà cung cấp',
    model: 'Mô hình',
    api_key: 'API Key',
    api_key_placeholder: 'Dán API key của bạn ở đây',
    api_key_hint: 'Được mã hóa và lưu an toàn. Mỗi nhà cung cấp lưu 1 key riêng.',
    monthly_income: 'Thu nhập hàng tháng (tùy chọn)',
    current_savings: 'Tiết kiệm hiện tại (tùy chọn)',
    income_placeholder: 'vd: 30000000',
    savings_placeholder: 'vd: 100000000',
    save_ai_settings: 'Lưu cài đặt AI',
    api_key_required: 'Cần nhập API key',
    ai_settings_saved: 'Đã lưu cài đặt AI!',
    configure_ai_first: 'Cấu hình AI trong tab Gia đình trước',
    no_data_analyze: 'Không có dữ liệu chi tiêu để phân tích',
    analyzing: 'Đang phân tích...',
    analyze: 'Phân tích',
    ask: 'Hỏi',
    ai_advisor: 'Tư vấn tài chính AI',
    ai_powered_by: 'Hỗ trợ bởi AI bạn đã cấu hình',
    ai_fab_title: 'Hỏi AI về tài chính của bạn',
    ai_general_analysis_title: 'Phân tích tổng quát',
    ai_empty_hint: 'Đặt câu hỏi hoặc bấm <strong>Phân tích</strong> để xem đánh giá chi tiêu',
    ai_question_placeholder: 'vd: "Với 30 triệu thu nhập, tôi chi tiêu quá nhiều không?"',
    ai_healthy: 'Tốt',
    ai_fair: 'Khá',
    ai_needs_attention: 'Cần chú ý',
    key_insights: 'Nhận xét chính',
    tips: 'Gợi ý',
    ai_extract_btn: 'Quét ảnh hóa đơn bằng AI',
    ai_extracting: 'AI đang nhận dạng...',
    ai_extract_no_ai: 'Cấu hình AI trong tab Gia đình trước',
    ai_extract_found: 'AI tìm thấy {0} chi tiêu',
    ai_extract_none: 'Không nhận dạng được chi tiêu nào từ ảnh',
    ai_extract_add_all: 'Thêm tất cả',
    ai_extract_adding: 'Đang thêm...',
    ai_extract_added: 'Đã thêm {0} chi tiêu!',
    ai_extract_remove: 'Bỏ',
    voice_input: 'Nhập bằng giọng nói',
    voice_listening: 'Đang nghe...',
    voice_processing: 'Đang xử lý...',
    voice_not_supported: 'Trình duyệt không hỗ trợ nhận diện giọng nói',
    voice_no_match: 'Không nhận ra. Thử nói: "đi uống cafe hết 50k"',
    voice_filled: 'Đã điền! Kiểm tra và bấm Thêm chi tiêu.',
    voice_example: 'vd: "đi uống cafe hết 50 nghìn"',
    voice_drafts_ready: 'Đã tạo {0} draft. Kiểm tra lại rồi bấm Lưu tất cả.',
    voice_drafts_empty: 'Chưa có draft nào. Bấm mic và đọc liên tiếp nhiều khoản chi.',
    voice_save_all: 'Lưu tất cả',
    voice_saving_all: 'Đang lưu...',
    voice_saved_all: 'Đã lưu {0} khoản chi!',
    voice_partial_saved: 'Đã lưu {0} khoản, còn {1} draft cần sửa.',
    voice_cancelled: 'Đã hủy danh sách draft',
    voice_desc_label: 'Mô tả',
    voice_amount_label: 'Số tiền',
    voice_category_label: 'Danh mục',
    voice_date_label: 'Ngày',
    voice_remove_draft: 'Xóa draft',
    voice_invalid_amount: 'Draft {0} cần số tiền hợp lệ',
    voice_invalid_category: 'Draft {0} cần chọn danh mục',

    // Chart
    chart_weekly: 'Tuần',
    chart_monthly: 'Tháng',
    chart_spending: 'Chi tiêu',
    weekly_spending: 'Chi tiêu theo tuần',
    monthly_spending: 'Chi tiêu theo tháng',

    // Export
    export_excel: 'Xuất Excel',
    exporting: 'Đang xuất...',
    export_success: 'Đã xuất file Excel!',
    export_no_data: 'Không có dữ liệu để xuất',
    export_need_dates: 'Chọn khoảng thời gian để xuất',
    sheet_details: 'Chi tiết',
    sheet_by_category: 'Theo danh mục',
    sheet_by_person: 'Theo thành viên',
    sheet_by_month: 'Theo tháng',
    col_date: 'Ngày',
    col_description: 'Mô tả',
    col_category: 'Danh mục',
    col_amount: 'Số tiền',
    col_person: 'Người chi',
    col_total: 'Tổng',
    col_count: 'Số lần',
    col_percent: 'Tỷ lệ %',
    col_month: 'Tháng',

    // Common
    save: 'Lưu',
    edit: 'Sửa',
    cancel: 'Hủy',
    delete: 'Xóa',
    saving: 'Đang lưu...',
    welcome: 'Xin chào, {0}!',
    welcome_back: 'Chào mừng trở lại, {0}!',
    account_created: 'Tài khoản đã tạo! Xin chào, {0}!',
    sign_in_failed: 'Đăng nhập thất bại: {0}',
    failed: 'Thất bại: {0}',
    failed_load_dashboard: 'Không tải được tổng quan: {0}',
    failed_load_categories: 'Không tải được danh mục',
    failed_load_history: 'Không tải được lịch sử: {0}',
    failed_load_family: 'Không tải được gia đình: {0}',
    delete_failed: 'Xóa thất bại: {0}',
    cannot_delete: 'Không thể xóa: {0}',
  },
  en: {
    app_title: 'Family Expenses',
    dashboard: 'Dashboard',
    add: 'Add',
    history: 'History',
    family: 'Family',
    sign_out: 'Sign out',
    login_story_eyebrow: 'Family Expenses',
    login_story_card_overview_title: 'Clear overview',
    login_story_card_overview_body: 'See this month, the biggest category, and spending shifts on one screen.',
    login_story_card_voice_title: 'Fast voice capture',
    login_story_card_voice_body: 'Say it once and the app splits it into drafts for review before saving.',
    login_story_card_family_title: 'Shared for the household',
    login_story_card_family_body: 'Track spender, category, and history in one shared space.',
    login_card_badge: 'Household Ledger',
    login_card_welcome: 'Welcome back',
    login_card_copy: 'Sign in to continue managing household spending with the cleaner new interface.',
    login_title: 'Family Expenses',
    login_subtitle: 'Track expenses, know where your money goes every day.',
    or_continue_email: 'or continue with email',
    full_name: 'Full name',
    username: 'Username',
    username_optional: '(optional)',
    email: 'Email',
    email_or_username: 'Email or Username',
    password: 'Password',
    password_placeholder: 'At least 8 characters',
    auth_name_placeholder: 'Nguyen Van A',
    auth_username_placeholder: 'e.g. nghia_nguyen',
    auth_email_placeholder: 'you@example.com',
    sign_in: 'Sign In',
    create_account: 'Create Account',
    no_account: 'Don\'t have an account? Register',
    have_account: 'Already have an account? Sign In',
    currency_hint: 'Currency can be set in Family Settings',
    creating_account: 'Creating account...',
    signing_in: 'Signing in...',
    total_this_month: 'Total this month',
    total_this_day: 'Total today',
    total_this_year: 'Total this year',
    daily_average: 'Daily average',
    monthly_average: 'Monthly average',
    biggest_category: 'Biggest category',
    expenses_count: '{0} expenses',
    days_with_spending: '{0} days with spending',
    months_with_spending: '{0} months with spending',
    no_expenses_yet: 'No expenses yet',
    daily_spending: 'Daily spending',
    by_category: 'By category',
    by_person: 'By person',
    recent_expenses: 'Recent expenses',
    see_all: 'See all',
    vs_last_month: 'vs last month',
    vs_last_year: 'vs last year',
    vs_yesterday: 'vs yesterday',
    same_as_last_month: 'Same as last month',
    view_day: 'Day',
    view_month: 'Month',
    view_year: 'Year',
    no_spending_yet: 'No spending yet',
    add_first_expense_breakdown: 'Add your first expense to see breakdown',
    no_members_yet: 'No members yet',
    no_family_yet: 'No family yet',
    go_family_settings: 'Go to <a href="#family">Family settings</a> to create or join one',
    nav_brand_prefix: 'Household',
    nav_brand_suffix: 'Flow',
    lang_toggle_title: 'Switch language',
    theme_toggle_title: 'Toggle theme',
    topbar_eyebrow: 'Family operating system',
    topbar_title: 'Money with context, not clutter.',
    dashboard_eyebrow: 'Overview',
    previous_period: 'Previous period',
    next_period: 'Next period',
    onboarding_kicker: 'First run',
    dashboard_hero_family_title: 'Household spending in one clean glance.',
    dashboard_hero_family_body: 'The goal is reading speed, not decorative cards. You can see the month total, who spent most, and which category is pulling the budget off course.',
    dashboard_hero_personal_title: 'Your spending in one clean glance.',
    dashboard_hero_personal_body: 'You are starting in your personal space. Log a few expenses first, then invite family members later if you want to expand beyond solo use.',
    onboarding_title: 'Start in 30 seconds',
    onboarding_body: 'You do not have any bills yet. Add one simple expense first and the rest of the dashboard will come alive.',
    onboarding_step_1_title: 'Add your first expense',
    onboarding_step_1_body: 'Enter any real expense manually to unlock useful stats.',
    onboarding_step_2_title: 'Or speak a batch out loud',
    onboarding_step_2_body: 'Say multiple expenses in one go and review the generated drafts before saving.',
    onboarding_step_3_title: 'Invite others later',
    onboarding_step_3_body: 'You can start solo now and add family members once the habit sticks.',
    onboarding_add_cta: 'Add first expense',
    onboarding_voice_cta: 'Open voice input',
    budget_kicker: 'Guardrails',
    budget_card_title: 'Monthly budget',
    budget_spent_label: 'Spent',
    budget_limit_label: 'Budget',
    budget_remaining_label: 'Remaining',
    budget_status_on_track: 'On track',
    budget_status_at_risk: 'At risk',
    budget_status_over: 'Over budget',
    budget_summary_on_track: 'You have used {0}% of this month\'s budget. Spending is still under control.',
    budget_summary_at_risk: 'You have used {0}% of this month\'s budget. Tighten flexible spending before you cross the line.',
    budget_summary_over: 'You are over this month\'s budget by {0}. Cut the categories that are pulling the plan off course.',
    budget_no_limits: 'No category budgets yet. Add them in the Family tab so the app can warn you earlier.',
    budget_no_plan_title: 'No monthly budget yet',
    budget_no_plan_body: 'Set a spending ceiling and the app will start warning you before the month gets out of hand.',
    budget_set_cta: 'Set budget',
    budget_settings: 'Monthly budget',
    budget_settings_desc: 'Set a monthly ceiling, monthly income, and optional category limits so the app can warn you before the plan or carrying capacity breaks.',
    monthly_budget_total: 'Total monthly budget',
    monthly_budget_placeholder: 'e.g. 15000000',
    category_budget_optional: 'Category budgets',
    category_budget_hint: 'Leave blank if you do not want to track that category.',
    save_budget_settings: 'Save budget',
    budget_settings_saved: 'Monthly budget saved!',
    budget_settings_saving: 'Saving budget...',
    only_owner_budget: 'Only the owner can change budgets',
    category_budget_invalid: 'Category budget must be zero or higher',
    category_budget_over: 'Over by {0}',
    category_budget_left: '{0} left',
    category_budget_usage: 'Spent {0} / {1}',
    category_budget_on_track: 'OK',
    category_budget_at_risk: 'Near limit',
    category_budget_over_status: 'Over',
    recurring_radar_title: 'Recurring bills & subscriptions',
    recurring_manager_title: 'Recurring bills & subscriptions',
    recurring_desc_label: 'Bill name',
    recurring_amount_label: 'Amount',
    recurring_category_label: 'Category',
    recurring_cadence_label: 'Cadence',
    recurring_next_due_label: 'Next due',
    recurring_save: 'Save recurring bill',
    recurring_saving: 'Saving recurring bill...',
    recurring_saved: 'Recurring bill saved!',
    recurring_empty: 'No recurring bills yet. Add rent, internet, Netflix, tuition, or other fixed bills so the app can remind you on time.',
    recurring_radar_empty: 'No bills are due soon. Radar is clear.',
    recurring_confirm_due: 'Record this cycle',
    recurring_delete: 'Delete recurring bill',
    recurring_deleted: 'Recurring bill deleted',
    recurring_due_overdue: 'Overdue',
    recurring_due_soon: 'Due soon',
    recurring_due_scheduled: 'Scheduled',
    recurring_weekly: 'Weekly',
    recurring_monthly: 'Monthly',
    recurring_yearly: 'Yearly',
    recurring_invalid: 'Description, amount, category, and next due date are required',
    recurring_confirmed: 'This cycle has been recorded',
    recurring_confirm_failed: 'Could not record recurring bill: {0}',
    recurring_due_meta: 'Next due: {0}',
    recurring_owner_meta: 'Owner: {0}',
    recurring_load_failed: 'Could not load recurring bills right now. Try again.',
    recurring_retry: 'Retry',
    forecast_card_title: 'Cashflow forecast',
    forecast_intro: 'Estimated next 7 and 30 days using recurring bills, monthly income, monthly budget, and current spending pace.',
    forecast_status_safe: 'Safe',
    forecast_status_watch: 'Tight',
    forecast_status_deficit: 'Shortfall',
    forecast_window_days: 'Next {0} days',
    forecast_budget_runway: 'Budget runway',
    forecast_income_runway: 'Income runway',
    forecast_fixed_bills: 'Recurring bills',
    forecast_spend_pace: 'Current pace',
    forecast_buffer: 'Remaining buffer',
    forecast_no_budget_title: 'Forecast is not ready yet',
    forecast_no_budget_body: 'The forecast needs at least one operating reference: monthly income or monthly budget. Set one first so the app can estimate when you may run short.',
    forecast_safe_summary: '{0} of buffer remains. {1} upcoming recurring bills add up to {2}, and your current pace is still inside runway.',
    forecast_watch_summary: 'Only {0} of buffer remains. {1} upcoming recurring bills are pushing you close to the limit.',
    forecast_deficit_summary: 'If this pace holds, you may run short by about {0} on {1}.',
    forecast_recurring_count: '{0} bills',
    forecast_set_budget: 'Set budget',
    budget_income_hint: 'Monthly income tells the app whether 25M spend is normal or already beyond what the household can carry.',
    monthly_income_invalid: 'Monthly income must be zero or higher',
    forecast_kicker: 'Forecast',
    chart_pattern_kicker: 'Pattern',
    chart_mix_kicker: 'Mix',
    chart_ranking_kicker: 'Ranking',
    people_kicker: 'People',
    latest_kicker: 'Latest',
    radar_kicker: 'Radar',
    add_expense: 'Add Expense',
    amount_label: 'Amount ({0}) *',
    amount_placeholder: 'e.g. 150000',
    description: 'Description',
    desc_placeholder: 'e.g. Lunch at Pho 24',
    category: 'Category *',
    select_category: 'Select category...',
    date: 'Date *',
    paid_by: 'Paid by',
    add_expense_btn: 'Add Expense',
    adding: 'Adding...',
    expense_added: 'Expense added!',
    custom_categories: 'Custom categories',
    category_name: 'Category name',
    no_custom_categories: 'No custom categories yet.',
    category_name_required: 'Category name required',
    category_added: 'Category added',
    category_deleted: 'Category deleted',
    add_eyebrow: 'Capture',
    hero_pill_manual: 'Manual',
    hero_pill_voice_batch: 'Voice batch',
    hero_pill_receipt_ai: 'Receipt AI',
    voice_batch_kicker: 'Voice batch',
    voice_batch_title: 'Speak once, create many drafts',
    voice_batch_helper: 'Example: "groceries 100k coffee 50k toys for the kid 5k". The app splits it into items, guesses categories, and lets you review before saving.',
    draft_review_kicker: 'Draft review',
    draft_review_title: 'Draft bill list',
    receipt_kicker: 'Receipt',
    receipt_title: 'Scan receipt with AI',
    manual_entry_kicker: 'Manual entry',
    manual_entry_title: 'Add manually',
    custom_taxonomy_kicker: 'Custom taxonomy',
    recurring_kicker: 'Recurring',
    add_label: 'Add',
    recurring_desc_placeholder: 'Netflix, rent, tuition...',
    recurring_amount_placeholder: '150000',
    add_hero_family_body: 'The new flow prioritizes two input modes: fast manual entry, or one spoken batch that becomes editable drafts before anything is saved.',
    add_hero_personal_body: 'Start light: add one expense manually, or speak a batch and let the app prepare drafts for you to confirm.',
    history_eyebrow: 'History',
    expense_history: 'Expense History',
    all_categories: 'All categories',
    all_members: 'All members',
    filter: 'Filter',
    load_more: 'Load more',
    no_expenses: 'No expenses',
    add_first_expense: 'Add your first expense!',
    all_time: 'All time',
    delete_expense_confirm: 'Delete this expense?',
    expense_deleted: 'Expense deleted',
    edit_expense: 'Edit Expense',
    expense_updated: 'Expense updated!',
    history_hero_family_body: 'Every expense sits inside a clean timeline with quick filters for date, category, and spender.',
    history_hero_personal_body: 'All of your spending is kept in one clean timeline so you can review it quickly by date and category.',
    reset: 'Reset',
    reset_title: 'Reset filters',
    family_ops_eyebrow: 'Family ops',
    family_settings: 'Family Settings',
    workspace_personal_name: 'Your spending space',
    your_profile: 'Your Profile',
    profile_kicker: 'Profile',
    display_name: 'Display Name',
    email_label: 'Email',
    username_hint: '3-30 characters, letters, numbers, underscores only',
    username_placeholder: 'Set a username',
    username_saved: 'Username saved!',
    username_cleared: 'Username cleared',
    username_invalid: 'Username must be 3-30 chars, letters/numbers/underscores only',
    username_edit_used: 'Username has been set (one-time only)',
    username_set_confirm: 'You can only set your username once. Are you sure?',
    link_google: 'Link Google',
    link_google_success: 'Google account linked!',
    google_linked: 'Google linked',
    copy_invite_link: 'Copy invite link',
    invite_link_copied: 'Invite link copied!',
    invite_link_join: 'You\'ve been invited to a family! Joining...',
    invite_link_joined: 'Joined the family via invite link!',
    invite_link_invalid: 'Invite link is invalid or expired',
    name_edit_used: 'Name has already been changed (one-time edit used)',
    name_change_confirm: 'You can only change your name once. Are you sure?',
    name_updated: 'Name updated!',
    name_updated_hint: 'Name updated successfully! (one-time edit used)',
    name_empty: 'Name cannot be empty',
    change_password: 'Change Password',
    set_password: 'Set Password',
    current_password: 'Current Password',
    current_password_placeholder: 'Enter current password',
    new_password: 'New Password',
    new_password_placeholder: 'At least 8 characters',
    confirm_password: 'Confirm New Password',
    confirm_password_placeholder: 'Repeat new password',
    current_password_required: 'Current password is required',
    password_min_length: 'New password must be at least 8 characters',
    passwords_not_match: 'Passwords do not match',
    changing_password: 'Changing...',
    password_set_success: 'Password set successfully!',
    google_auth_notice: 'Signed in with Google. Password management is not available.',
    security_kicker: 'Security',
    inbox_kicker: 'Inbox',
    create_family_title: 'Create your family group',
    create_family_desc: 'Set up a family to track shared expenses together.',
    family_name_placeholder: 'Family name, e.g. The Nguyens',
    create: 'Create',
    family_name_required: 'Family name required',
    family_created: 'Family created!',
    members: 'Members',
    workspace_kicker: 'Workspace',
    invite_member: 'Invite member',
    invite_kicker: 'Invite',
    invite_placeholder: 'Email or username',
    invite: 'Invite',
    pending_invites: 'Pending invites',
    you_have_invites: 'You have family invitations',
    invite_from: '{0} invited you to "{1}"',
    accept: 'Accept',
    reject: 'Decline',
    invite_accepted: 'Joined the family!',
    invite_rejected: 'Invite declined',
    pending: 'Pending',
    invite_cancelled: 'Invite cancelled',
    email_required: 'Email required',
    invite_sent: 'Invite email sent! They\'ll join automatically on sign-in.',
    invite_no_email: 'Invited! Email couldn\'t be sent — share this link: {0}',
    currency: 'Currency',
    only_owner_currency: 'Only the owner can change currency',
    currency_unchanged: 'Currency unchanged',
    currency_change_confirm: 'Change currency from {0} to {1}?\n\nWARNING: All existing expense amounts will be converted using the current exchange rate. This cannot be undone.',
    converting: 'Converting...',
    currency_changed: 'Currency changed to {0} (rate: {1})',
    leave_family: 'Leave family',
    leave_family_confirm: 'Are you sure you want to leave this family?',
    left_family: 'You left the family',
    danger_zone: 'Danger zone',
    family_hero_family_body: 'Profile, members, invites, AI settings, and sensitive actions are grouped by context so the page stays readable.',
    family_hero_personal_body: 'You are using the app in personal mode. The data still lives in the same family model, but the copy is softened so it does not feel like setup friction for solo users.',
    owner: 'Owner',
    member: 'Member',
    delete_category: 'Delete category',
    cancel_invite: 'Cancel invite',
    ai_settings: 'AI Analysis Settings',
    ai_kicker: 'AI',
    provider: 'Provider',
    model: 'Model',
    api_key: 'API Key',
    api_key_placeholder: 'Paste your API key here',
    api_key_hint: 'Encrypted and stored securely. Each provider has its own key.',
    monthly_income: 'Monthly Income (optional)',
    current_savings: 'Current Savings (optional)',
    income_placeholder: 'e.g. 30000000',
    savings_placeholder: 'e.g. 100000000',
    save_ai_settings: 'Save AI Settings',
    api_key_required: 'API key is required',
    ai_settings_saved: 'AI settings saved!',
    configure_ai_first: 'Configure AI settings in Family tab first',
    no_data_analyze: 'No expense data to analyze',
    analyzing: 'Analyzing...',
    analyze: 'Analyze',
    ask: 'Ask',
    ai_advisor: 'AI Financial Advisor',
    ai_powered_by: 'Powered by your configured AI provider',
    ai_fab_title: 'Ask AI about your finances',
    ai_general_analysis_title: 'General analysis',
    ai_empty_hint: 'Ask a question or click <strong>Analyze</strong> for a spending review',
    ai_question_placeholder: 'e.g. "With 30M income, am I spending too much?"',
    ai_healthy: 'Healthy',
    ai_fair: 'Fair',
    ai_needs_attention: 'Needs Attention',
    key_insights: 'Key Insights',
    tips: 'Tips',
    ai_extract_btn: 'Scan receipt with AI',
    ai_extracting: 'AI is scanning...',
    ai_extract_no_ai: 'Configure AI in Family tab first',
    ai_extract_found: 'AI found {0} expenses',
    ai_extract_none: 'No expenses detected from image',
    ai_extract_add_all: 'Add all',
    ai_extract_adding: 'Adding...',
    ai_extract_added: '{0} expenses added!',
    ai_extract_remove: 'Remove',
    voice_input: 'Voice input',
    voice_listening: 'Listening...',
    voice_processing: 'Processing...',
    voice_not_supported: 'Browser does not support speech recognition',
    voice_no_match: 'Could not understand. Try: "coffee 50k"',
    voice_filled: 'Filled! Review and tap Add Expense.',
    voice_example: 'e.g. "lunch at Pho 24, 50k"',
    voice_drafts_ready: '{0} drafts created. Review them and tap Save all.',
    voice_drafts_empty: 'No drafts yet. Tap the mic and dictate multiple expenses in one go.',
    voice_save_all: 'Save all',
    voice_saving_all: 'Saving...',
    voice_saved_all: '{0} expenses saved!',
    voice_partial_saved: '{0} saved, {1} drafts still need attention.',
    voice_cancelled: 'Draft list discarded',
    voice_desc_label: 'Description',
    voice_amount_label: 'Amount',
    voice_category_label: 'Category',
    voice_date_label: 'Date',
    voice_remove_draft: 'Remove draft',
    voice_invalid_amount: 'Draft {0} needs a valid amount',
    voice_invalid_category: 'Draft {0} needs a category',
    chart_weekly: 'Week',
    chart_monthly: 'Month',
    chart_spending: 'Spending',
    weekly_spending: 'Weekly spending',
    monthly_spending: 'Monthly spending',
    export_excel: 'Export Excel',
    exporting: 'Exporting...',
    export_success: 'Excel file exported!',
    export_no_data: 'No data to export',
    export_need_dates: 'Select a date range to export',
    sheet_details: 'Details',
    sheet_by_category: 'By Category',
    sheet_by_person: 'By Person',
    sheet_by_month: 'By Month',
    col_date: 'Date',
    col_description: 'Description',
    col_category: 'Category',
    col_amount: 'Amount',
    col_person: 'Paid by',
    col_total: 'Total',
    col_count: 'Count',
    col_percent: '% Share',
    col_month: 'Month',
    save: 'Save',
    edit: 'Edit',
    cancel: 'Cancel',
    delete: 'Delete',
    saving: 'Saving...',
    welcome: 'Welcome, {0}!',
    welcome_back: 'Welcome back, {0}!',
    account_created: 'Account created! Welcome, {0}!',
    sign_in_failed: 'Sign-in failed: {0}',
    failed: 'Failed: {0}',
    failed_load_dashboard: 'Failed to load dashboard: {0}',
    failed_load_categories: 'Failed to load categories',
    failed_load_history: 'Failed to load history: {0}',
    failed_load_family: 'Failed to load family: {0}',
    delete_failed: 'Delete failed: {0}',
    cannot_delete: 'Cannot delete: {0}',
  },
};

let currentLang = localStorage.getItem('lang') || 'vi';

function t(key, ...args) {
  let str = (translations[currentLang] || translations.vi)[key] || (translations.vi)[key] || key;
  args.forEach((arg, i) => { str = str.replace(`{${i}}`, arg); });
  return str;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  applyLanguage();
}

function applyLanguage() {
  const dateLocale = currentLang === 'vi' ? 'vi-VN' : 'en-US';
  document.documentElement.lang = currentLang;
  document.title = t('app_title');

  // Update static HTML text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.innerHTML = val;
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset.i18nTitle);
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
  });

  // Update period label format
  if (state.currentMonth || state.currentDay || state.currentYear) {
    document.getElementById('month-label').textContent = getDashboardLabel();
  }

  // Update lang toggle button text
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.textContent = currentLang === 'vi' ? 'EN' : 'VI';

  const voiceSaveBtn = document.getElementById('voice-save-btn');
  if (voiceSaveBtn) voiceSaveBtn.textContent = t('voice_save_all');

  updateHistoryFiltersSummary();
  updateWorkspaceCopy();
  renderDashboardOnboarding();
  renderBudgetOverview();
  renderCashflowForecast();
  renderBudgetSettingsUI();
  renderRecurringManager();
  renderRecurringRadar();
}

// ── State ──────────────────────────────────────────────────────────────────
const state = {
  user: null,         // { sub, email, name, avatar }
  family: null,       // family object from API
  categories: [],     // flat list
  currentMonth: null, // { year, month }
  currentDay: null,   // { year, month, day } for day view
  currentYear: null,  // year number for year view
  viewMode: 'month',  // 'day' | 'month' | 'year'
  stats: null,        // last fetched stats
  historyOffset: 0,
  historyTotal: 0,
  currency: 'VND',   // family currency
  voiceDrafts: [],
  voiceTranscript: '',
  recurring: [],
  recurringRadar: [],
};

function isPersonalWorkspace() {
  return !!state.family?.is_personal;
}

function isFirstRun() {
  if (typeof state.stats?.all_time_count === 'number') {
    return state.stats.all_time_count === 0;
  }
  return Number(state.stats?.count || 0) === 0;
}

function setNodeText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function recurringCadenceLabel(cadence) {
  if (cadence === 'weekly') return t('recurring_weekly');
  if (cadence === 'yearly') return t('recurring_yearly');
  return t('recurring_monthly');
}

function updateWorkspaceCopy() {
  const personal = isPersonalWorkspace();

  setNodeText('dashboard-hero-title', personal ? t('dashboard_hero_personal_title') : t('dashboard_hero_family_title'));
  setNodeText('dashboard-hero-body', personal ? t('dashboard_hero_personal_body') : t('dashboard_hero_family_body'));
  setNodeText('add-hero-body', personal ? t('add_hero_personal_body') : t('add_hero_family_body'));
  setNodeText('history-hero-body', personal ? t('history_hero_personal_body') : t('history_hero_family_body'));
  setNodeText('family-hero-title', personal ? t('workspace_personal_name') : t('family_settings'));
  setNodeText('family-hero-body', personal ? t('family_hero_personal_body') : t('family_hero_family_body'));
}

function renderDashboardOnboarding() {
  const panel = document.getElementById('dashboard-onboarding');
  if (!panel) return;

  setNodeText('onboarding-title', t('onboarding_title'));
  setNodeText('onboarding-body', t('onboarding_body'));
  setNodeText('onboarding-step-1-title', t('onboarding_step_1_title'));
  setNodeText('onboarding-step-1-body', t('onboarding_step_1_body'));
  setNodeText('onboarding-step-2-title', t('onboarding_step_2_title'));
  setNodeText('onboarding-step-2-body', t('onboarding_step_2_body'));
  setNodeText('onboarding-step-3-title', t('onboarding_step_3_title'));
  setNodeText('onboarding-step-3-body', t('onboarding_step_3_body'));
  setNodeText('onboarding-add-btn', t('onboarding_add_cta'));
  setNodeText('onboarding-voice-btn', t('onboarding_voice_cta'));

  panel.style.display = state.user && state.stats && isFirstRun() ? 'block' : 'none';
}

function getBudgetSettings() {
  const budget = state.family?.budget_settings || {};
  const monthlyTotal = Number(budget.monthly_total) || 0;
  const monthlyIncome = Number(budget.monthly_income) || 0;
  const categoryLimits = Object.fromEntries(
    Object.entries(budget.category_limits || {})
      .map(([categoryId, amount]) => [categoryId, Number(amount) || 0])
      .filter(([, amount]) => amount > 0)
  );
  return {
    monthly_total: monthlyTotal > 0 ? monthlyTotal : 0,
    monthly_income: monthlyIncome > 0 ? monthlyIncome : 0,
    category_limits: categoryLimits,
  };
}

function getBudgetStatus(spent, limit) {
  if (!limit || limit <= 0) {
    return { key: 'on_track', className: '', ratio: 0 };
  }

  const ratio = spent / limit;
  if (ratio >= 1) return { key: 'over', className: 'over', ratio };
  if (ratio >= 0.8) return { key: 'at_risk', className: 'at-risk', ratio };
  return { key: 'on_track', className: '', ratio };
}

function isCurrentMonthDashboard() {
  if (state.viewMode !== 'month' || !state.currentMonth) return false;
  const now = new Date();
  return state.currentMonth.year === now.getFullYear() && state.currentMonth.month === now.getMonth() + 1;
}

function getForecastTone(statusKey) {
  if (statusKey === 'deficit') return 'over';
  if (statusKey === 'watch') return 'at-risk';
  return '';
}

function formatOptionalMoney(amount) {
  if (amount > 0) return formatMoney(amount);
  if (amount < 0) return formatSignedMoney(amount);
  return '—';
}

function buildCashflowForecastWindow(windowDays) {
  if (!isCurrentMonthDashboard() || !state.stats || !state.family) return null;

  const settings = getBudgetSettings();
  const spent = Number(state.stats?.total || 0);
  const today = todayISO();
  const { year, month } = state.currentMonth;
  const todayDay = Number(today.slice(8, 10)) || 1;
  const monthDays = daysInMonth(year, month);
  const averageDailySpend = spent / Math.max(todayDay, 1);

  if (!settings.monthly_total && !settings.monthly_income) {
    return { windowDays, needsBudget: true };
  }

  const remainingBudget = Math.max(0, settings.monthly_total - spent);
  const remainingIncome = settings.monthly_income - spent;
  const daysUntilMonthEnd = monthDays - todayDay + 1;
  const overflowDays = Math.max(0, windowDays - daysUntilMonthEnd);
  const dailyBudgetAllowance = settings.monthly_total / monthDays;
  const dailyIncomeAllowance = settings.monthly_income / monthDays;
  const budgetRunway = settings.monthly_total > 0
    ? remainingBudget + (overflowDays * dailyBudgetAllowance)
    : 0;
  const incomeRunway = settings.monthly_income > 0
    ? remainingIncome + (overflowDays * dailyIncomeAllowance)
    : 0;
  const windowEnd = addDaysISO(today, windowDays - 1);
  const dueItems = (state.recurring || [])
    .filter(item => Number(item.is_active) && item.next_due_date >= today && item.next_due_date <= windowEnd)
    .sort((a, b) => a.next_due_date.localeCompare(b.next_due_date));
  const fixedBills = dueItems.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const spendPace = averageDailySpend * windowDays;
  const projectedOutflow = fixedBills + spendPace;
  const availableRunways = [];
  if (settings.monthly_total > 0) availableRunways.push(budgetRunway);
  if (settings.monthly_income > 0) availableRunways.push(incomeRunway);
  const operatingRunway = availableRunways.length ? Math.min(...availableRunways) : 0;
  const buffer = operatingRunway - projectedOutflow;
  const ratio = operatingRunway > 0 ? projectedOutflow / operatingRunway : 1;
  const statusKey = buffer < 0 ? 'deficit' : ratio >= 0.85 ? 'watch' : 'safe';
  const dueByDate = new Map();
  dueItems.forEach(item => {
    dueByDate.set(item.next_due_date, (dueByDate.get(item.next_due_date) || 0) + Number(item.amount || 0));
  });

  let rollingBuffer = settings.monthly_total > 0 && settings.monthly_income > 0
    ? Math.min(remainingBudget, remainingIncome)
    : (settings.monthly_total > 0 ? remainingBudget : remainingIncome);
  let shortfallDate = '';
  const monthPrefix = `${year}-${String(month).padStart(2, '0')}`;
  for (let offset = 0; offset < windowDays; offset += 1) {
    const cursor = addDaysISO(today, offset);
    if (!cursor.startsWith(monthPrefix)) {
      const overflowRunways = [];
      if (settings.monthly_total > 0) overflowRunways.push(dailyBudgetAllowance);
      if (settings.monthly_income > 0) overflowRunways.push(dailyIncomeAllowance);
      rollingBuffer += overflowRunways.length ? Math.min(...overflowRunways) : 0;
    }
    rollingBuffer -= averageDailySpend;
    rollingBuffer -= dueByDate.get(cursor) || 0;
    if (rollingBuffer < 0) {
      shortfallDate = cursor;
      break;
    }
  }

  return {
    windowDays,
    statusKey,
    className: getForecastTone(statusKey),
    budgetRunway,
    incomeRunway,
    operatingRunway,
    fixedBills,
    spendPace,
    buffer,
    dueCount: dueItems.length,
    shortfallDate,
  };
}

function forecastSummary(windowForecast) {
  if (!windowForecast) return '';
  if (windowForecast.needsBudget) return t('forecast_no_budget_body');
  if (windowForecast.statusKey === 'deficit') {
    return t(
      'forecast_deficit_summary',
      formatMoney(Math.abs(windowForecast.buffer)),
      formatDate(windowForecast.shortfallDate || addDaysISO(todayISO(), windowForecast.windowDays - 1))
    );
  }
  if (windowForecast.statusKey === 'watch') {
    return t(
      'forecast_watch_summary',
      formatMoney(Math.max(windowForecast.buffer, 0)),
      t('forecast_recurring_count', windowForecast.dueCount)
    );
  }
  return t(
    'forecast_safe_summary',
    formatMoney(Math.max(windowForecast.buffer, 0)),
    t('forecast_recurring_count', windowForecast.dueCount),
    formatMoney(windowForecast.fixedBills)
  );
}

function renderCashflowForecast() {
  const section = document.getElementById('cashflow-forecast');
  if (!section) return;

  if (!isCurrentMonthDashboard() || !state.family || !state.stats) {
    section.style.display = 'none';
    return;
  }

  const forecasts = [buildCashflowForecastWindow(7), buildCashflowForecastWindow(30)].filter(Boolean);
  if (!forecasts.length) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  setNodeText('forecast-card-title', t('forecast_card_title'));
  setNodeText('forecast-intro', t('forecast_intro'));

  const grid = document.getElementById('forecast-grid');
  const pill = document.getElementById('forecast-status-pill');
  if (forecasts.some(item => item.needsBudget)) {
    pill.textContent = t('budget_status_on_track');
    pill.className = 'budget-status-pill';
    grid.innerHTML = `
      <div class="budget-empty-note">
        <strong>${t('forecast_no_budget_title')}</strong><br />
        ${t('forecast_no_budget_body')}<br /><br />
        <button class="btn btn-secondary btn-sm" id="forecast-set-budget-btn" type="button">${t('forecast_set_budget')}</button>
      </div>`;
    document.getElementById('forecast-set-budget-btn')?.addEventListener('click', () => navigate('family'));
    return;
  }

  const worst = forecasts.find(item => item.statusKey === 'deficit')
    || forecasts.find(item => item.statusKey === 'watch')
    || forecasts[0];

  pill.textContent = t(`forecast_status_${worst.statusKey}`);
  pill.className = `budget-status-pill ${worst.className || ''}`.trim();

  grid.innerHTML = forecasts.map(item => `
    <div class="forecast-window">
      <div class="forecast-window-head">
        <div>
          <div class="forecast-window-label">${t('forecast_window_days', item.windowDays)}</div>
          <span class="budget-status-pill ${item.className || ''}">${t(`forecast_status_${item.statusKey}`)}</span>
        </div>
        <div class="forecast-window-amount ${item.buffer < 0 ? 'negative' : 'positive'}">${formatSignedMoney(item.buffer)}</div>
      </div>
      <div class="forecast-metrics">
        <div class="forecast-metric">
          <div class="forecast-metric-label">${t('forecast_budget_runway')}</div>
          <div class="forecast-metric-value">${formatOptionalMoney(item.budgetRunway)}</div>
        </div>
        <div class="forecast-metric">
          <div class="forecast-metric-label">${t('forecast_income_runway')}</div>
          <div class="forecast-metric-value">${formatOptionalMoney(item.incomeRunway)}</div>
        </div>
        <div class="forecast-metric">
          <div class="forecast-metric-label">${t('forecast_fixed_bills')}</div>
          <div class="forecast-metric-value">${formatMoney(item.fixedBills)}</div>
        </div>
        <div class="forecast-metric">
          <div class="forecast-metric-label">${t('forecast_spend_pace')}</div>
          <div class="forecast-metric-value">${formatMoney(item.spendPace)}</div>
        </div>
        <div class="forecast-metric">
          <div class="forecast-metric-label">${t('forecast_buffer')}</div>
          <div class="forecast-metric-value">${formatSignedMoney(item.buffer)}</div>
        </div>
      </div>
      <p class="forecast-window-summary">${forecastSummary(item)}</p>
    </div>
  `).join('');
}

function renderBudgetOverview() {
  const section = document.getElementById('budget-overview');
  if (!section) return;

  if (!state.family || state.viewMode !== 'month' || !state.stats) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  const settings = getBudgetSettings();
  const budgetTitle = document.getElementById('budget-card-title');
  const statusPill = document.getElementById('budget-status-pill');
  const spentEl = document.getElementById('budget-spent');
  const limitEl = document.getElementById('budget-limit');
  const remainingEl = document.getElementById('budget-remaining');
  const summaryEl = document.getElementById('budget-summary-text');
  const progressBar = document.getElementById('budget-progress-bar');
  const categoryList = document.getElementById('budget-category-list');
  const spent = Number(state.stats?.total || 0);

  budgetTitle.textContent = t('budget_card_title');
  setNodeText('budget-spent-label', t('budget_spent_label'));
  setNodeText('budget-limit-label', t('budget_limit_label'));
  setNodeText('budget-remaining-label', t('budget_remaining_label'));

  if (!settings.monthly_total) {
    statusPill.textContent = t('budget_status_on_track');
    statusPill.className = 'budget-status-pill';
    spentEl.textContent = formatMoney(spent);
    limitEl.textContent = '—';
    remainingEl.textContent = '—';
    summaryEl.textContent = t('budget_no_plan_body');
    progressBar.className = 'budget-progress-bar';
    progressBar.style.width = '0%';
    categoryList.innerHTML = `
      <div class="budget-empty-note">
        <strong>${t('budget_no_plan_title')}</strong><br />
        ${t('budget_no_plan_body')}<br /><br />
        <button class="btn btn-secondary btn-sm" id="budget-set-cta" type="button">${t('budget_set_cta')}</button>
      </div>`;
    document.getElementById('budget-set-cta')?.addEventListener('click', () => navigate('family'));
    return;
  }

  const remaining = settings.monthly_total - spent;
  const status = getBudgetStatus(spent, settings.monthly_total);
  const percent = Math.max(0, Math.round(status.ratio * 100));
  statusPill.textContent = t(`budget_status_${status.key}`);
  statusPill.className = `budget-status-pill ${status.className}`.trim();
  spentEl.textContent = formatMoney(spent);
  limitEl.textContent = formatMoney(settings.monthly_total);
  remainingEl.textContent = formatMoney(Math.max(remaining, 0));
  progressBar.className = `budget-progress-bar ${status.className}`.trim();
  progressBar.style.width = `${Math.min(percent, 100)}%`;

  if (status.key === 'over') {
    summaryEl.textContent = t('budget_summary_over', formatMoney(Math.abs(remaining)));
  } else if (status.key === 'at_risk') {
    summaryEl.textContent = t('budget_summary_at_risk', percent);
  } else {
    summaryEl.textContent = t('budget_summary_on_track', percent);
  }

  const categories = (state.stats?.by_category || [])
    .filter(cat => settings.category_limits[cat.id] > 0)
    .map(cat => {
      const limit = settings.category_limits[cat.id];
      const catSpent = Number(cat.total || 0);
      const catStatus = getBudgetStatus(catSpent, limit);
      return { ...cat, limit, catSpent, catStatus };
    })
    .sort((a, b) => {
      const score = { over: 2, at_risk: 1, on_track: 0 };
      return (score[b.catStatus.key] - score[a.catStatus.key]) || (b.catSpent / b.limit) - (a.catSpent / a.limit);
    });

  if (categories.length === 0) {
    categoryList.innerHTML = `<div class="budget-empty-note">${t('budget_no_limits')}</div>`;
    return;
  }

  categoryList.innerHTML = categories.slice(0, 4).map(cat => {
    const ratioPct = Math.max(0, Math.min(100, Math.round((cat.catSpent / cat.limit) * 100)));
    const tailText = cat.catStatus.key === 'over'
      ? t('category_budget_over', formatMoney(cat.catSpent - cat.limit))
      : t('category_budget_left', formatMoney(cat.limit - cat.catSpent));
    return `
      <div class="budget-category-row">
        <div>
          <div class="budget-category-head">
            <span class="budget-category-name">${escHtml(cat.icon || '📦')} ${escHtml(cat.name)}</span>
            <span class="budget-status-pill ${cat.catStatus.className}">${t(`category_budget_${cat.catStatus.key === 'over' ? 'over_status' : cat.catStatus.key}`)}</span>
          </div>
          <div class="budget-progress-track">
            <div class="budget-progress-bar ${cat.catStatus.className}" style="width:${ratioPct}%"></div>
          </div>
        </div>
        <div class="budget-category-meta">
          <div>${t('category_budget_usage', formatMoney(cat.catSpent), formatMoney(cat.limit))}</div>
          <div>${tailText}</div>
        </div>
      </div>`;
  }).join('');
}

function renderBudgetSettingsUI() {
  const container = document.getElementById('budget-setting');
  if (!container) return;
  if (!state.family) { container.style.display = 'none'; return; }

  const myRole = (state.family.members || []).find(m => m.id === state.user.sub)?.role;
  const isOwner = myRole === 'owner';
  const settings = getBudgetSettings();

  container.style.display = 'block';
  container.innerHTML = `
    <div class="card-header">
      <div>
        <div class="card-kicker">${t('budget_kicker')}</div>
        <span class="card-title">${t('budget_settings')}</span>
      </div>
    </div>
    <div class="budget-settings-form">
      <p class="form-hint">${t('budget_settings_desc')}</p>
      <div class="form-group">
        <label class="form-label" for="budget-monthly-total">${t('monthly_budget_total')}</label>
        <input type="number" id="budget-monthly-total" min="0" step="1" ${isOwner ? '' : 'disabled'} placeholder="${t('monthly_budget_placeholder')}" value="${settings.monthly_total || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label" for="budget-monthly-income">${t('monthly_income')}</label>
        <input type="number" id="budget-monthly-income" min="0" step="1" ${isOwner ? '' : 'disabled'} placeholder="${t('monthly_budget_placeholder')}" value="${settings.monthly_income || ''}" />
        <div class="form-hint">${t('budget_income_hint')}</div>
      </div>
      <div class="form-group">
        <div class="form-label">${t('category_budget_optional')}</div>
        <div class="form-hint">${t('category_budget_hint')}</div>
      </div>
      <div class="budget-categories-grid" id="budget-categories-grid"></div>
      ${isOwner ? `<button class="btn btn-primary btn-full" id="save-budget-settings-btn">${t('save_budget_settings')}</button>` : `<div class="form-hint">${t('only_owner_budget')}</div>`}
    </div>`;

  const categoriesGrid = document.getElementById('budget-categories-grid');
  categoriesGrid.innerHTML = state.categories.map(category => `
    <div class="budget-category-setting">
      <div class="budget-category-setting-name">${escHtml(category.icon || '📦')} ${escHtml(category.name)}</div>
      <input
        type="number"
        min="0"
        step="1"
        ${isOwner ? '' : 'disabled'}
        data-budget-category-id="${escHtml(category.id)}"
        placeholder="0"
        value="${settings.category_limits[category.id] || ''}"
      />
    </div>
  `).join('');

  if (!isOwner) return;

  document.getElementById('save-budget-settings-btn')?.addEventListener('click', async () => {
    const btn = document.getElementById('save-budget-settings-btn');
    const monthlyTotal = Number(document.getElementById('budget-monthly-total').value || 0);
    const monthlyIncome = Number(document.getElementById('budget-monthly-income').value || 0);
    const categoryLimits = {};

    if (monthlyIncome < 0) {
      toast(t('monthly_income_invalid'), 'error');
      document.getElementById('budget-monthly-income').focus();
      return;
    }

    for (const input of categoriesGrid.querySelectorAll('[data-budget-category-id]')) {
      const value = input.value.trim();
      const num = Number(value || 0);
      if (num < 0) {
        toast(t('category_budget_invalid'), 'error');
        input.focus();
        return;
      }
      if (value && num > 0) {
        categoryLimits[input.dataset.budgetCategoryId] = num;
      }
    }

    btn.disabled = true;
    btn.textContent = t('budget_settings_saving');
    try {
      const result = await api('/api/family', {
        method: 'PUT',
        body: JSON.stringify({
          action: 'save_budget_settings',
          monthly_total: monthlyTotal,
          monthly_income: monthlyIncome,
          category_limits: categoryLimits,
        }),
      });
      state.family.budget_settings = result.budget_settings;
      toast(t('budget_settings_saved'), 'success');
      renderBudgetSettingsUI();
      renderBudgetOverview();
      renderCashflowForecast();
    } catch (err) {
      toast(t('failed', err.message), 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = t('save_budget_settings');
    }
  });
}

function populateRecurringCategorySelect() {
  const select = document.getElementById('recurring-category');
  if (!select) return;
  const current = select.value;
  select.innerHTML = '<option value="">' + t('select_category') + '</option>';
  state.categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = `${category.icon || '📦'} ${category.name}`;
    if (category.id === current) option.selected = true;
    select.appendChild(option);
  });
}

function renderRecurringManager() {
  const listEl = document.getElementById('recurring-list');
  if (!listEl) return;

  setNodeText('recurring-manager-title', t('recurring_manager_title'));
  setNodeText('recurring-desc-label', t('recurring_desc_label'));
  setNodeText('recurring-amount-label', t('recurring_amount_label'));
  setNodeText('recurring-category-label', t('recurring_category_label'));
  setNodeText('recurring-cadence-label', t('recurring_cadence_label'));
  setNodeText('recurring-next-due-label', t('recurring_next_due_label'));
  setNodeText('save-recurring-btn', t('recurring_save'));

  if (!state.recurring.length) {
    listEl.innerHTML = `<div class="budget-empty-note">${t('recurring_empty')}</div>`;
    return;
  }

  listEl.innerHTML = state.recurring.map(item => `
    <div class="recurring-item">
      <div class="recurring-item-head">
        <div>
          <div class="recurring-item-title">${escHtml(item.description)}</div>
          <div class="recurring-item-meta">
            ${formatMoney(item.amount)} • ${escHtml(item.category_icon || '📦')} ${escHtml(item.category_name)} • ${recurringCadenceLabel(item.cadence)}
          </div>
        </div>
        <span class="recurring-status ${escHtml(item.due_status)}">${t(`recurring_due_${item.due_status}`)}</span>
      </div>
      <div class="recurring-item-meta">${t('recurring_due_meta', formatDate(item.next_due_date))}</div>
      <div class="recurring-item-actions">
        <button class="btn btn-secondary btn-sm recurring-confirm-btn" data-id="${escHtml(item.id)}">${t('recurring_confirm_due')}</button>
        <button class="btn btn-icon btn-sm recurring-delete-btn" data-id="${escHtml(item.id)}" title="${t('recurring_delete')}">✕</button>
      </div>
    </div>
  `).join('');

  listEl.querySelectorAll('.recurring-confirm-btn').forEach(btn => {
    btn.addEventListener('click', () => confirmRecurringDue(btn.dataset.id));
  });
  listEl.querySelectorAll('.recurring-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteRecurring(btn.dataset.id));
  });
}

function renderRecurringRadar() {
  const listEl = document.getElementById('recurring-radar-list');
  if (!listEl) return;

  setNodeText('recurring-radar-title', t('recurring_radar_title'));

  if (!state.recurringRadar.length) {
    listEl.innerHTML = `<div class="budget-empty-note">${t('recurring_radar_empty')}</div>`;
    return;
  }

  listEl.innerHTML = state.recurringRadar.map(item => `
    <div class="recurring-item">
      <div class="recurring-item-head">
        <div>
          <div class="recurring-item-title">${escHtml(item.description)}</div>
          <div class="recurring-item-meta">${formatMoney(item.amount)} • ${escHtml(item.category_icon || '📦')} ${escHtml(item.category_name)}</div>
        </div>
        <span class="recurring-status ${escHtml(item.due_status)}">${t(`recurring_due_${item.due_status}`)}</span>
      </div>
      <div class="recurring-item-meta">
        ${t('recurring_due_meta', formatDate(item.next_due_date))} • ${t('recurring_owner_meta', item.user_name)}
      </div>
      <div class="recurring-item-actions">
        <button class="btn btn-primary btn-sm recurring-confirm-btn" data-id="${escHtml(item.id)}">${t('recurring_confirm_due')}</button>
      </div>
    </div>
  `).join('');

  listEl.querySelectorAll('.recurring-confirm-btn').forEach(btn => {
    btn.addEventListener('click', () => confirmRecurringDue(btn.dataset.id));
  });
}

function renderRecurringLoadError() {
  const content = `
    <div class="budget-empty-note">
      ${t('recurring_load_failed')}<br /><br />
      <button class="btn btn-secondary btn-sm recurring-retry-btn" type="button">${t('recurring_retry')}</button>
    </div>`;
  const manager = document.getElementById('recurring-list');
  const radar = document.getElementById('recurring-radar-list');
  if (manager) manager.innerHTML = content;
  if (radar) radar.innerHTML = content;
  document.querySelectorAll('.recurring-retry-btn').forEach(btn => {
    btn.addEventListener('click', () => loadRecurring());
  });
}

async function loadRecurring() {
  if (!state.user) return;
  try {
    const data = await api('/api/recurring');
    state.recurring = data.recurring || [];
    state.recurringRadar = data.radar || [];
    renderRecurringManager();
    renderRecurringRadar();
    renderCashflowForecast();
  } catch (err) {
    state.recurring = [];
    state.recurringRadar = [];
    renderRecurringLoadError();
    renderCashflowForecast();
    if (!err.message.includes('Not in a family')) {
      toast(t('failed', err.message), 'error');
    }
  }
}

async function confirmRecurringDue(id) {
  try {
    await api('/api/recurring', {
      method: 'PUT',
      body: JSON.stringify({ action: 'confirm_due', id }),
    });
    toast(t('recurring_confirmed'), 'success');
    await loadRecurring();
    loadDashboard();
  } catch (err) {
    toast(t('recurring_confirm_failed', err.message), 'error');
  }
}

async function deleteRecurring(id) {
  try {
    await api(`/api/recurring?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    toast(t('recurring_deleted'), 'success');
    await loadRecurring();
  } catch (err) {
    toast(t('failed', err.message), 'error');
  }
}

// ── Currency formatter ────────────────────────────────────────────────────
let currencyFormatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });

function updateCurrencyFormatter(currency) {
  state.currency = currency;
  try {
    currencyFormatter = new Intl.NumberFormat(undefined, { style: 'currency', currency });
  } catch {
    currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  }
}

const formatMoney = (n) => currencyFormatter.format(Math.round(n));

// Format number input with thousand separators
function formatAmountInput(input) {
  const raw = input.value.replace(/[^\d]/g, '');
  const num = parseInt(raw, 10);
  if (!raw || isNaN(num)) {
    input.value = '';
    return;
  }
  const cursorEnd = input.selectionStart === input.value.length;
  input.value = num.toLocaleString('vi-VN');
  if (cursorEnd) input.setSelectionRange(input.value.length, input.value.length);
}

function getAmountInputValue(input) {
  return parseInt(input.value.replace(/[^\d]/g, ''), 10) || 0;
}

function setAmountInputValue(input, num) {
  input.value = Math.round(num).toLocaleString('vi-VN');
  input.dispatchEvent(new Event('input'));
}

function formatMoneyReadable(n) {
  n = Math.round(n);
  const isVND = state.currency === 'VND';
  const formatted = formatMoney(n);
  if (!isVND) return formatted;

  const abs = Math.abs(n);
  if (abs >= 1000000000) {
    const val = n / 1000000000;
    return `${formatted}  (${Number.isInteger(val) ? val : val.toFixed(1)} tỷ)`;
  }
  if (abs >= 1000000) {
    const val = n / 1000000;
    return `${formatted}  (${Number.isInteger(val) ? val : val.toFixed(1)} triệu)`;
  }
  if (abs >= 1000) {
    const val = n / 1000;
    return `${formatted}  (${Number.isInteger(val) ? val : val.toFixed(1)} nghìn)`;
  }
  return formatted;
}

// ── API helpers ────────────────────────────────────────────────────────────
async function api(path, opts = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    credentials: 'same-origin',
    ...opts,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
  return json;
}

// ── Toast ──────────────────────────────────────────────────────────────────
function toast(message, type = 'info') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  el.innerHTML = `<span>${icons[type] || 'ℹ'}</span> ${escHtml(message)}`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

// ── Escape HTML ────────────────────────────────────────────────────────────
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Date helpers ───────────────────────────────────────────────────────────
function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function monthLabel(year, month) {
  const locale = currentLang === 'vi' ? 'vi-VN' : 'en-US';
  return new Date(year, month - 1, 1).toLocaleDateString(locale, { month: 'long', year: 'numeric' });
}

function formatDate(iso) {
  if (!iso) return '';
  const locale = currentLang === 'vi' ? 'vi-VN' : 'en-US';
  const [y, m, d] = iso.split('-');
  return new Date(+y, +m - 1, +d).toLocaleDateString(locale, { day: 'numeric', month: 'short' });
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function addDaysISO(dateIso, days) {
  const [year, month, day] = dateIso.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatSignedMoney(amount) {
  const rounded = Math.round(amount || 0);
  if (rounded === 0) return formatMoney(0);
  const prefix = rounded > 0 ? '+' : '-';
  return `${prefix}${formatMoney(Math.abs(rounded))}`;
}

// ── Invite token handler ──────────────────────────────────────────────────
async function handleInviteToken(token) {
  try {
    await api('/api/family', {
      method: 'PUT',
      body: JSON.stringify({ action: 'accept_invite_token', token }),
    });
    toast(t('invite_link_joined'), 'success');
    await loadFamily();
    loadDashboard();
  } catch (err) {
    toast(t('invite_link_invalid') + ': ' + err.message, 'error');
  }
}

function checkPendingInviteToken() {
  const token = sessionStorage.getItem('pending_invite_token');
  if (token) {
    sessionStorage.removeItem('pending_invite_token');
    handleInviteToken(token);
  }
}

// ── Routing ────────────────────────────────────────────────────────────────
const VIEWS = ['dashboard', 'add-expense', 'history', 'family'];

function navigate(view) {
  if (!VIEWS.includes(view)) view = 'dashboard';
  window.location.hash = view;
}

function applyRoute() {
  const hash = window.location.hash.replace('#', '') || 'dashboard';

  // Handle invite link: #invite/TOKEN
  if (hash.startsWith('invite/')) {
    const token = hash.split('/')[1];
    if (token && state.user) {
      handleInviteToken(token);
    } else if (token) {
      // Not logged in — save token, will process after login
      sessionStorage.setItem('pending_invite_token', token);
    }
    window.location.hash = 'family';
    return;
  }

  const view = VIEWS.includes(hash) ? hash : 'dashboard';

  document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(`view-${view}`);
  if (target) target.classList.add('active');

  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });

  if (view === 'dashboard') loadDashboard();
  if (view === 'history') loadHistory(true);
  if (view === 'family') loadFamily();
  if (view === 'add-expense') prepareAddExpense();
  if (view !== 'history') setHistoryFiltersCollapsed(window.matchMedia('(max-width: 720px)').matches);
}

// ── Auth ───────────────────────────────────────────────────────────────────
function showLogin() {
  document.getElementById('login-page').style.display = 'flex';
  document.getElementById('app-shell').style.display = 'none';
  closeAIModal();
  const fab = document.getElementById('ai-fab');
  if (fab) fab.style.display = 'none';
  applyLanguage();
}

function showApp() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('app-shell').style.display = 'flex';
  document.getElementById('app-shell').style.flexDirection = 'column';
  renderNavUser();
  applyLanguage();
  applyRoute();
  checkPendingInviteToken();
  checkAIConfigured();
}

function renderNavUser() {
  const el = document.getElementById('nav-user');
  if (!state.user) { el.innerHTML = ''; return; }
  if (state.user.avatar) {
    el.innerHTML = `<img class="avatar" src="${escHtml(state.user.avatar)}" alt="${escHtml(state.user.name)}" title="${escHtml(state.user.name)}" />`;
  } else {
    el.innerHTML = `<div class="avatar-placeholder" title="${escHtml(state.user.name)}">${escHtml(state.user.name[0].toUpperCase())}</div>`;
  }
}

// Called by Google Identity Services after user picks an account
async function handleGoogleCredential(response) {
  try {
    const data = await api('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ credential: response.credential }),
    });
    state.user = data.user;
    // Cache user info in sessionStorage so we survive page refresh without re-auth
    sessionStorage.setItem('user', JSON.stringify(data.user));
    showApp();
    toast(t('welcome', state.user.name), 'success');
  } catch (err) {
    toast(t('sign_in_failed', err.message), 'error');
  }
}

// Link Google account to existing email user
async function handleLinkGoogle(response) {
  try {
    const data = await api('/api/auth', {
      method: 'PUT',
      body: JSON.stringify({ action: 'link_google', credential: response.credential }),
    });
    state.user = data.user;
    sessionStorage.setItem('user', JSON.stringify(data.user));
    renderNavUser();
    initProfileUI();
    toast(t('link_google_success'), 'success');
  } catch (err) {
    toast(t('failed', err.message), 'error');
  }
}

// Expose to global scope so GSI data-callback attribute can reach it
if (typeof window !== 'undefined') {
  window.handleGoogleCredential = handleGoogleCredential;
  window.handleLinkGoogle = handleLinkGoogle;
}

// ── Email auth ─────────────────────────────────────────────────────────────
function initAuthTabs() {
  let isRegisterMode = false;
  const form = document.getElementById('email-auth-form');
  const nameGroup = document.getElementById('auth-name-group');
  const btn = document.getElementById('email-auth-btn');
  const toggleBtn = document.getElementById('toggle-auth-mode');
  const errEl = document.getElementById('email-auth-error');

  const usernameGroup = document.getElementById('auth-username-group');
  const emailLabel = document.getElementById('auth-email-label');
  const emailInput = document.getElementById('auth-email');

  let registrationOpen = true; // assume open until checked

  toggleBtn.addEventListener('click', async () => {
    isRegisterMode = !isRegisterMode;
    nameGroup.style.display = isRegisterMode ? '' : 'none';
    usernameGroup.style.display = isRegisterMode ? '' : 'none';
    emailLabel.textContent = isRegisterMode ? t('email') : t('email_or_username');
    emailInput.type = isRegisterMode ? 'email' : 'text';
    emailInput.placeholder = isRegisterMode ? 'you@example.com' : 'you@example.com or username';
    btn.textContent = isRegisterMode ? t('create_account') : t('sign_in');
    toggleBtn.textContent = isRegisterMode ? t('have_account') : t('no_account');
    document.getElementById('auth-password').autocomplete = isRegisterMode ? 'new-password' : 'current-password';
    errEl.style.display = 'none';

    // Check waitlist when switching to register mode
    if (isRegisterMode) {
      try {
        const res = await fetch('/api/admin?check=registration');
        const d = await res.json();
        registrationOpen = d.registration_open;
        if (!registrationOpen) {
          errEl.textContent = currentLang === 'vi'
            ? 'Hệ thống đã đầy. Đăng ký tạm đóng, vui lòng liên hệ admin.'
            : 'Registration is closed. System is at capacity. Please contact the administrator.';
          errEl.style.display = 'block';
          btn.disabled = true;
        }
      } catch { /* fail open */ }
    } else {
      btn.disabled = false;
    }
  });

  // Set login mode defaults
  emailLabel.textContent = t('email_or_username');
  emailInput.type = 'text';
  emailInput.placeholder = 'you@example.com or username';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errEl.style.display = 'none';
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const origText = btn.textContent;
    btn.disabled = true;
    btn.textContent = isRegisterMode ? t('creating_account') : t('signing_in');

    if (isRegisterMode && !registrationOpen) {
      errEl.textContent = currentLang === 'vi'
        ? 'Đăng ký tạm đóng. Vui lòng liên hệ admin.'
        : 'Registration is closed. Please contact the administrator.';
      errEl.style.display = 'block';
      btn.disabled = false;
      btn.textContent = origText;
      return;
    }

    try {
      const body = isRegisterMode
        ? { action: 'register', name: document.getElementById('auth-name').value, email, password, username: document.getElementById('auth-username').value }
        : { action: 'login', email, password };
      const data = await api('/api/auth', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      state.user = data.user;
      sessionStorage.setItem('user', JSON.stringify(data.user));
      showApp();
      toast(isRegisterMode ? t('account_created', state.user.name) : t('welcome_back', state.user.name), 'success');
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.textContent = origText;
    }
  });
}

async function logout() {
  try {
    await api('/api/auth', { method: 'DELETE' });
  } catch { /* ignore network errors on logout */ }
  state.user = null;
  state.family = null;
  state.categories = [];
  sessionStorage.removeItem('user');
  showLogin();
}

// ── Theme ──────────────────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
}

function updateThemeColorMeta(theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#09120f' : '#133127');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = theme === 'dark'
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  localStorage.setItem('theme', theme);
  updateThemeColorMeta(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ── Dashboard ──────────────────────────────────────────────────────────────
function getDashboardDateRange() {
  const now = new Date();
  const mode = state.viewMode || 'month';

  if (mode === 'day') {
    if (!state.currentDay) {
      state.currentDay = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    }
    const { year, month, day } = state.currentDay;
    const ds = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return { from: ds, to: ds, monthParam: `${year}-${String(month).padStart(2, '0')}`, mode };
  } else if (mode === 'year') {
    if (!state.currentYear) state.currentYear = now.getFullYear();
    const year = state.currentYear;
    return { from: `${year}-01-01`, to: `${year}-12-31`, monthParam: null, mode };
  } else {
    if (!state.currentMonth) {
      state.currentMonth = { year: now.getFullYear(), month: now.getMonth() + 1 };
    }
    const { year, month } = state.currentMonth;
    const lastDay = new Date(year, month, 0).getDate();
    const mp = `${year}-${String(month).padStart(2, '0')}`;
    return { from: `${mp}-01`, to: `${mp}-${String(lastDay).padStart(2, '0')}`, monthParam: mp, mode };
  }
}

function getDashboardLabel() {
  const locale = currentLang === 'vi' ? 'vi-VN' : 'en-US';
  const mode = state.viewMode || 'month';
  if (mode === 'day') {
    const { year, month, day } = state.currentDay;
    return new Date(year, month - 1, day).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  } else if (mode === 'year') {
    return String(state.currentYear);
  } else {
    return monthLabel(state.currentMonth.year, state.currentMonth.month);
  }
}

function isAtCurrentPeriod() {
  const now = new Date();
  const mode = state.viewMode || 'month';
  if (mode === 'day') {
    const { year, month, day } = state.currentDay;
    return year === now.getFullYear() && month === now.getMonth() + 1 && day === now.getDate();
  } else if (mode === 'year') {
    return state.currentYear === now.getFullYear();
  } else {
    return state.currentMonth.year === now.getFullYear() && state.currentMonth.month === now.getMonth() + 1;
  }
}

async function loadDashboard() {
  const range = getDashboardDateRange();
  updateWorkspaceCopy();

  document.getElementById('month-label').textContent = getDashboardLabel();
  document.getElementById('next-month').disabled = isAtCurrentPeriod();

  // Update view mode buttons
  document.querySelectorAll('.view-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === state.viewMode);
  });
  // Update view mode button labels with i18n
  const dayBtn = document.getElementById('mode-day');
  const monthBtn = document.getElementById('mode-month');
  const yearBtn = document.getElementById('mode-year');
  if (dayBtn) dayBtn.textContent = t('view_day');
  if (monthBtn) monthBtn.textContent = t('view_month');
  if (yearBtn) yearBtn.textContent = t('view_year');

  try {
    if (range.mode === 'year') {
      // Year view: fetch all 12 months stats and aggregate
      const year = state.currentYear;
      const promises = [];
      for (let m = 1; m <= 12; m++) {
        promises.push(api(`/api/stats?month=${year}-${String(m).padStart(2, '0')}`).catch(() => null));
      }
      const monthlyStats = await Promise.all(promises);

      // Aggregate into a stats-like object
      const agg = { total: 0, count: 0, by_category: {}, by_person: {}, daily: [], prev_total: 0 };
      let monthsWithSpend = 0;
      monthlyStats.forEach(ms => {
        if (!ms) return;
        agg.total += ms.total || 0;
        agg.count += ms.count || 0;
        agg.prev_total += ms.prev_total || 0;
        if (ms.total > 0) monthsWithSpend++;
        if (ms.by_category) {
          ms.by_category.forEach(c => {
            if (!agg.by_category[c.name]) agg.by_category[c.name] = { ...c, total: 0 };
            agg.by_category[c.name].total += c.total;
          });
        }
        if (ms.by_person) {
          ms.by_person.forEach(p => {
            if (!agg.by_person[p.name]) agg.by_person[p.name] = { ...p, total: 0 };
            agg.by_person[p.name].total += p.total;
          });
        }
        if (ms.daily) agg.daily.push(...ms.daily);
      });

      // Fetch prev year total for comparison
      let prevYearTotal = 0;
      try {
        const prevPromises = [];
        for (let m = 1; m <= 12; m++) {
          prevPromises.push(api(`/api/stats?month=${year - 1}-${String(m).padStart(2, '0')}`).catch(() => null));
        }
        const prevStats = await Promise.all(prevPromises);
        prevStats.forEach(ms => { if (ms) prevYearTotal += ms.total || 0; });
      } catch {}

      const stats = {
        total: agg.total,
        count: agg.count,
        all_time_count: monthlyStats.find(ms => ms && typeof ms.all_time_count === 'number')?.all_time_count || 0,
        prev_total: prevYearTotal,
        by_category: Object.values(agg.by_category).sort((a, b) => b.total - a.total),
        by_person: Object.values(agg.by_person).sort((a, b) => b.total - a.total),
        daily: agg.daily,
      };
      state.stats = stats;
      renderStats(stats, 'year', monthsWithSpend);
    } else if (range.mode === 'day') {
      // Day view: fetch stats for specific date
      state.stats = await api(`/api/stats?date=${range.from}`);
      renderStats(state.stats, 'day');
    } else {
      // Month view
      state.stats = await api(`/api/stats?month=${range.monthParam}`);
      renderStats(state.stats, 'month');
    }

    renderDashboardOnboarding();
    renderBudgetOverview();
    renderCashflowForecast();

    const expData = await api(`/api/expenses?from=${range.from}&to=${range.to}&limit=10`);
    renderExpenseList(document.getElementById('recent-expenses'), expData.expenses);
    await loadRecurring();
  } catch (err) {
    const budgetSection = document.getElementById('budget-overview');
    const forecastSection = document.getElementById('cashflow-forecast');
    if (budgetSection) budgetSection.style.display = 'none';
    if (forecastSection) forecastSection.style.display = 'none';
    if (err.message.includes('Not in a family')) {
      renderNeedFamily('recent-expenses');
      renderNeedFamily('category-bars');
    } else {
      toast(t('failed_load_dashboard', err.message), 'error');
    }
  }
}

function renderStats(s, viewMode, monthsWithSpend) {
  viewMode = viewMode || 'month';
  document.getElementById('stat-total').textContent = formatMoney(s.total);
  document.getElementById('stat-count').textContent = t('expenses_count', s.count);

  // Total label
  const totalLabel = document.querySelector('#stats-grid .stat-card:first-child .stat-label');
  if (totalLabel) {
    totalLabel.textContent = viewMode === 'day' ? t('total_this_day') : viewMode === 'year' ? t('total_this_year') : t('total_this_month');
  }

  // Comparison
  const changeEl = document.getElementById('stat-change');
  const vsLabel = viewMode === 'day' ? t('vs_yesterday') : viewMode === 'year' ? t('vs_last_year') : t('vs_last_month');
  if (s.prev_total > 0) {
    const pct = ((s.total - s.prev_total) / s.prev_total * 100).toFixed(0);
    if (pct > 0) {
      changeEl.textContent = '▲ ' + pct + '% ' + vsLabel;
      changeEl.className = 'stat-change up';
    } else if (pct < 0) {
      changeEl.textContent = '▼ ' + Math.abs(pct) + '% ' + vsLabel;
      changeEl.className = 'stat-change down';
    } else {
      changeEl.textContent = t('same_as_last_month');
      changeEl.className = 'stat-change neutral';
    }
  } else {
    changeEl.textContent = '';
  }

  // Average label
  const avgLabel = document.querySelector('#stats-grid .stat-card:nth-child(2) .stat-label');
  if (viewMode === 'year') {
    const mws = monthsWithSpend || 0;
    const avg = mws > 0 ? s.total / mws : 0;
    document.getElementById('stat-avg').textContent = formatMoney(avg);
    if (avgLabel) avgLabel.textContent = t('monthly_average');
    document.getElementById('stat-days').textContent = t('months_with_spending', mws);
  } else {
    const daysWithSpend = s.daily ? s.daily.length : 0;
    const avg = daysWithSpend > 0 ? s.total / daysWithSpend : 0;
    document.getElementById('stat-avg').textContent = formatMoney(avg);
    if (avgLabel) avgLabel.textContent = t('daily_average');
    document.getElementById('stat-days').textContent = t('days_with_spending', daysWithSpend);
  }

  // Top category
  const topCat = s.by_category && s.by_category.find(c => c.total > 0);
  if (topCat) {
    document.getElementById('stat-top-cat').textContent = `${topCat.icon} ${topCat.name}`;
    const pct = s.total > 0 ? (topCat.total / s.total * 100).toFixed(0) : 0;
    document.getElementById('stat-top-cat-pct').textContent = `${formatMoney(topCat.total)} (${pct}%)`;
  } else {
    document.getElementById('stat-top-cat').textContent = '—';
    document.getElementById('stat-top-cat-pct').textContent = t('no_expenses_yet');
  }

  // Category bars
  const barsEl = document.getElementById('category-bars');
  const categoriesWithSpend = s.by_category ? s.by_category.filter(c => c.total > 0) : [];
  if (categoriesWithSpend.length === 0) {
    barsEl.innerHTML = `<div class="empty-state"><div class="empty-icon">📊</div><h3>${t('no_spending_yet')}</h3><p>${t('add_first_expense_breakdown')}</p></div>`;
  } else {
    const maxVal = Math.max(...categoriesWithSpend.map(c => c.total));
    barsEl.innerHTML = categoriesWithSpend.map(cat => {
      const pct = maxVal > 0 ? (cat.total / maxVal * 100).toFixed(1) : 0;
      return `
        <div class="cat-row">
          <div class="cat-icon">${escHtml(cat.icon || '📦')}</div>
          <div>
            <div class="cat-name">${escHtml(cat.name)}</div>
            <div class="cat-bar-wrap"><div class="cat-bar" style="width:${pct}%"></div></div>
          </div>
          <div class="cat-amount">${formatMoney(cat.total)}</div>
        </div>`;
    }).join('');
  }

  // Person chips
  const chipsEl = document.getElementById('person-chips');
  if (s.by_person && s.by_person.length > 0) {
    chipsEl.innerHTML = s.by_person.map(p => {
      const avatarHtml = p.avatar
        ? `<img class="chip-avatar" src="${escHtml(p.avatar)}" alt="${escHtml(p.name)}" />`
        : `<div class="avatar-placeholder" style="width:22px;height:22px;font-size:0.75rem">${escHtml(p.name[0])}</div>`;
      return `<div class="person-chip">${avatarHtml}<span class="chip-name">${escHtml(p.name)}</span><span class="chip-amount">${formatMoney(p.total)}</span></div>`;
    }).join('');
  } else {
    chipsEl.innerHTML = '<span style="color:var(--text-muted);font-size:0.875rem">' + t('no_members_yet') + '</span>';
  }

  // Daily bar chart with granularity toggle
  if (s.daily && s.daily.length > 0) {
    document.getElementById('daily-chart-card').style.display = 'block';
    currentChartDailyData = s.daily;

    const granEl = document.getElementById('chart-granularity');
    const granBtns = granEl.querySelectorAll('.chart-gran-btn');

    if (viewMode === 'year') {
      // Year: show week/month toggles, default to month
      granEl.style.display = 'flex';
      granBtns.forEach(b => b.style.display = b.dataset.gran === 'day' ? 'none' : '');
      updateChartWithGranularity('month');
    } else if (viewMode === 'month') {
      // Month: show day/week toggles, default to day
      granEl.style.display = 'flex';
      granBtns.forEach(b => b.style.display = b.dataset.gran === 'month' ? 'none' : '');
      updateChartWithGranularity('day');
    } else {
      // Day: no toggle, just show daily
      granEl.style.display = 'none';
      updateChartWithGranularity('day');
    }
  }

  // Category donut chart
  if (categoriesWithSpend.length > 0) {
    document.getElementById('category-donut-card').style.display = 'block';
    const chartColors = ['#6366F1', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#14B8A6'];
    drawDoughnutChart('category-donut', {
      labels: categoriesWithSpend.map(c => `${c.icon || '📦'} ${c.name}`),
      values: categoriesWithSpend.map(c => c.total),
      colors: categoriesWithSpend.map((_, i) => chartColors[i % chartColors.length]),
    });
  }
}

function renderNeedFamily(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = `<div class="empty-state"><div class="empty-icon">👨‍👩‍👧‍👦</div><h3>${t('no_family_yet')}</h3><p>${t('go_family_settings')}</p></div>`;
}

// ── Expense list renderer ──────────────────────────────────────────────────
function renderExpenseList(container, expenses) {
  if (!expenses || expenses.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🧾</div><h3>${t('no_expenses')}</h3><p>${t('add_first_expense')}</p></div>`;
    return;
  }

  container.innerHTML = expenses.map(e => `
    <div class="expense-item" data-expense-id="${escHtml(e.id)}">
      <div class="expense-icon">${escHtml(e.category_icon || '📦')}</div>
      <div class="expense-info">
        <div class="expense-desc">${escHtml(e.description || e.category_name)}</div>
        <div class="expense-meta">
          <span>${escHtml(e.category_name)}</span>
          <span>•</span>
          <span>${escHtml(e.user_name)}</span>
        </div>
      </div>
      <div class="expense-right">
        <div class="expense-amount">${formatMoney(e.amount)}</div>
        <div class="expense-date">${formatDate(e.expense_date)}</div>
        <div class="expense-actions">
          <button class="expense-edit" data-id="${escHtml(e.id)}" data-amount="${e.amount}" data-description="${escHtml(e.description || '')}" data-category="${escHtml(e.category_id)}" data-date="${escHtml(e.expense_date)}" title="${t('edit')}">✏️</button>
          <button class="expense-delete" data-id="${escHtml(e.id)}" title="${t('delete')}">🗑</button>
        </div>
      </div>
    </div>`
  ).join('');

  // Edit buttons
  container.querySelectorAll('.expense-edit').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      openEditExpenseModal({
        id: btn.dataset.id,
        amount: btn.dataset.amount,
        description: btn.dataset.description,
        category_id: btn.dataset.category,
        expense_date: btn.dataset.date,
      });
    });
  });

  // Delete buttons
  container.querySelectorAll('.expense-delete').forEach(btn => {
    btn.addEventListener('click', async (ev) => {
      ev.stopPropagation();
      if (!confirm(t('delete_expense_confirm'))) return;
      try {
        await api(`/api/expenses?id=${encodeURIComponent(btn.dataset.id)}`, { method: 'DELETE' });
        btn.closest('.expense-item').remove();
        toast(t('expense_deleted'), 'success');
        refreshStatsBackground();
      } catch (err) {
        toast(t('delete_failed', err.message), 'error');
      }
    });
  });
}

function refreshStatsBackground() {
  // Only quick-refresh in month mode; day/year reload fully
  if (state.viewMode === 'month' && state.currentMonth) {
    const monthParam = `${state.currentMonth.year}-${String(state.currentMonth.month).padStart(2, '0')}`;
    api(`/api/stats?month=${monthParam}`)
      .then(s => {
        state.stats = s;
        renderStats(s, 'month');
        renderBudgetOverview();
        renderCashflowForecast();
      })
      .catch(() => {});
  } else {
    loadDashboard();
  }
}

// ── Edit Expense Modal ────────────────────────────────────────────────────
function openEditExpenseModal(expense) {
  // Ensure categories are loaded
  if (state.categories.length === 0) {
    loadCategories().then(() => openEditExpenseModal(expense));
    return;
  }

  // Remove existing modal if any
  const existing = document.getElementById('edit-expense-overlay');
  if (existing) existing.remove();

  const categoryOptions = state.categories.map(c =>
    `<option value="${escHtml(c.id)}" ${c.id === expense.category_id ? 'selected' : ''}>${escHtml(c.icon || '📦')} ${escHtml(c.name)}</option>`
  ).join('');

  const overlay = document.createElement('div');
  overlay.id = 'edit-expense-overlay';
  overlay.className = 'ai-modal-overlay open';
  overlay.innerHTML = `
    <div class="ai-modal" style="max-width:420px">
      <div class="ai-modal-header">
        <div><div class="ai-modal-header-title">${t('edit_expense')}</div></div>
        <button class="ai-modal-close" id="edit-expense-close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="ai-modal-body" style="padding:1rem">
        <form id="edit-expense-form">
          <div class="form-group">
            <label class="form-label">${t('amount_label', state.currency)}</label>
            <input type="number" id="edit-exp-amount" min="1" step="1" value="${expense.amount}" required />
          </div>
          <div class="form-group">
            <label class="form-label">${t('description')}</label>
            <input type="text" id="edit-exp-desc" value="${escHtml(expense.description)}" maxlength="200" />
          </div>
          <div class="form-group">
            <label class="form-label">${t('category')}</label>
            <select id="edit-exp-category" required>${categoryOptions}</select>
          </div>
          <div class="form-group">
            <label class="form-label">${t('date')}</label>
            <input type="date" id="edit-exp-date" value="${expense.expense_date}" required />
          </div>
          <button type="submit" class="btn btn-primary btn-full" id="edit-expense-btn">${t('save')}</button>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById('edit-expense-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  document.getElementById('edit-expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('edit-expense-btn');
    btn.disabled = true;
    btn.textContent = t('saving');

    try {
      await api('/api/expenses', {
        method: 'PUT',
        body: JSON.stringify({
          id: expense.id,
          amount: parseFloat(document.getElementById('edit-exp-amount').value),
          description: document.getElementById('edit-exp-desc').value.trim(),
          category_id: document.getElementById('edit-exp-category').value,
          expense_date: document.getElementById('edit-exp-date').value,
        }),
      });
      toast(t('expense_updated'), 'success');
      overlay.remove();
      // Refresh current view
      const hash = window.location.hash.replace('#', '') || 'dashboard';
      if (hash === 'dashboard') loadDashboard();
      else if (hash === 'history') loadHistory(true);
    } catch (err) {
      toast(t('failed', err.message), 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = t('save');
    }
  });
}

// ── Add Expense ────────────────────────────────────────────────────────────
async function prepareAddExpense() {
  updateWorkspaceCopy();
  const dateInput = document.getElementById('exp-date');
  if (!dateInput.value) dateInput.value = todayISO();

  if (state.user) {
    document.getElementById('exp-paid-by').value = state.user.name;
  }

  // Update amount label with current currency
  const amountLabel = document.querySelector('label[for="exp-amount"]');
  if (amountLabel) amountLabel.textContent = t('amount_label', state.currency);

  await loadCategories();
  populateCategorySelects();
  populateRecurringCategorySelect();
  renderVoiceDrafts();
  setVoiceTranscript(state.voiceTranscript);
  if (!document.getElementById('recurring-next-due').value) {
    document.getElementById('recurring-next-due').value = todayISO();
  }
  loadRecurring();
}

async function loadCategories() {
  try {
    const data = await api('/api/categories');
    state.categories = data.categories || [];
    renderCustomCategoriesList();
    renderBudgetSettingsUI();
    populateRecurringCategorySelect();
  } catch (err) {
    if (!err.message.includes('Not in a family')) {
      toast(t('failed_load_categories'), 'error');
    }
  }
}

function populateCategorySelects() {
  const selects = [
    document.getElementById('exp-category'),
    document.getElementById('filter-category'),
  ];
  selects.forEach(sel => {
    if (!sel) return;
    const current = sel.value;
    const isFilter = sel.id === 'filter-category';
    sel.innerHTML = isFilter
      ? '<option value="">' + t('all_categories') + '</option>'
      : '<option value="">' + t('select_category') + '</option>';
    state.categories.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.icon || '📦'} ${c.name}`;
      if (c.id === current) opt.selected = true;
      sel.appendChild(opt);
    });
  });
  updateHistoryFiltersSummary();
}

function renderCustomCategoriesList() {
  const el = document.getElementById('custom-categories-list');
  if (!el) return;
  const custom = state.categories.filter(c => !c.is_default);
  if (custom.length === 0) {
    el.innerHTML = '<p style="color:var(--text-muted);font-size:0.875rem">' + t('no_custom_categories') + '</p>';
    return;
  }
  el.innerHTML = custom.map(c =>
    `<div style="display:flex;align-items:center;gap:0.5rem;padding:0.4rem 0;border-bottom:1px solid var(--border)">
      <span>${escHtml(c.icon || '📦')}</span>
      <span style="flex:1">${escHtml(c.name)}</span>
      <button class="btn btn-icon btn-sm delete-cat" data-id="${escHtml(c.id)}" title="${escHtml(t('delete_category'))}">🗑</button>
    </div>`
  ).join('');

  el.querySelectorAll('.delete-cat').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await api(`/api/categories?id=${encodeURIComponent(btn.dataset.id)}`, { method: 'DELETE' });
        await loadCategories();
        populateCategorySelects();
        toast(t('category_deleted'), 'success');
      } catch (err) {
        toast(t('cannot_delete', err.message), 'error');
      }
    });
  });
}

// ── History ────────────────────────────────────────────────────────────────
async function loadHistory(reset = false) {
  updateWorkspaceCopy();
  if (reset) {
    state.historyOffset = 0;
    state.historyTotal = 0;
    // Ensure filter dropdowns are populated
    if (state.categories.length === 0) await loadCategories();
    populateCategorySelects();
    if (!state.family) {
      try {
        const data = await api('/api/family');
        state.family = data.family;
      } catch (_) {}
    }
    populatePersonFilter();
    updateHistoryFiltersSummary();
  }

  const from = document.getElementById('filter-from').value || '';
  const to = document.getElementById('filter-to').value || '';
  const categoryId = document.getElementById('filter-category').value || '';
  const personId = document.getElementById('filter-person').value || '';
  const limit = 20;

  const params = new URLSearchParams({ limit, offset: state.historyOffset });
  if (from) params.set('from', from);
  if (to) params.set('to', to);
  if (categoryId) params.set('category_id', categoryId);
  if (personId) params.set('user_id', personId);

  const listEl = document.getElementById('history-list');
  if (reset) listEl.innerHTML = '<div class="spinner"></div>';

  try {
    const data = await api(`/api/expenses?${params}`);
    state.historyTotal = data.total;

    if (reset) {
      renderExpenseList(listEl, data.expenses);
    } else {
      // Append new items to existing list
      const tmp = document.createElement('div');
      renderExpenseList(tmp, data.expenses);
      if (data.expenses.length > 0) {
        // Remove the empty state if it was rendered in tmp
        tmp.querySelectorAll('.empty-state').forEach(e => e.remove());
        listEl.append(...tmp.children);
      }
    }

    state.historyOffset += data.expenses.length;
    const pagEl = document.getElementById('history-pagination');
    pagEl.style.display = state.historyOffset < state.historyTotal ? 'block' : 'none';
    updateHistoryFiltersSummary();
    if (reset && window.matchMedia('(max-width: 720px)').matches) {
      setHistoryFiltersCollapsed(true);
    }
  } catch (err) {
    if (err.message.includes('Not in a family')) {
      renderNeedFamily('history-list');
    } else {
      toast(t('failed_load_history', err.message), 'error');
    }
  }
}

// ── Export to Excel ───────────────────────────────────────────────────────
async function exportToExcel() {
  const from = document.getElementById('filter-from').value;
  const to = document.getElementById('filter-to').value;

  // Default: current year if no dates selected
  const now = new Date();
  const exportFrom = from || `${now.getFullYear()}-01-01`;
  const exportTo = to || todayISO();

  const btn = document.getElementById('export-excel-btn');
  const origText = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = t('exporting');

  try {
    const params = new URLSearchParams({ from: exportFrom, to: exportTo });
    const categoryId = document.getElementById('filter-category').value;
    const personId = document.getElementById('filter-person').value;
    if (categoryId) params.set('category_id', categoryId);
    if (personId) params.set('user_id', personId);

    const data = await api(`/api/export?${params}`);
    if (!data.expenses || data.expenses.length === 0) {
      toast(t('export_no_data'), 'info');
      return;
    }

    const wb = XLSX.utils.book_new();
    const currency = data.currency || state.currency;

    // ── Sheet 1: Details ──
    const detailRows = data.expenses.map(e => ({
      [t('col_date')]: e.expense_date,
      [t('col_category')]: `${e.category_icon || ''} ${e.category_name}`.trim(),
      [t('col_description')]: e.description || '',
      [t('col_amount')]: Math.round(e.amount),
      [t('col_person')]: e.user_name,
    }));
    const wsDetails = XLSX.utils.json_to_sheet(detailRows);
    // Set column widths
    wsDetails['!cols'] = [
      { wch: 12 }, { wch: 18 }, { wch: 30 }, { wch: 15 }, { wch: 15 },
    ];
    XLSX.utils.book_append_sheet(wb, wsDetails, t('sheet_details'));

    // ── Sheet 2: By Category ──
    const catMap = {};
    let grandTotal = 0;
    for (const e of data.expenses) {
      const key = e.category_name;
      if (!catMap[key]) catMap[key] = { icon: e.category_icon || '', total: 0, count: 0 };
      catMap[key].total += e.amount;
      catMap[key].count++;
      grandTotal += e.amount;
    }
    const catRows = Object.entries(catMap)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([name, d]) => ({
        [t('col_category')]: `${d.icon} ${name}`.trim(),
        [t('col_total')]: Math.round(d.total),
        [t('col_count')]: d.count,
        [t('col_percent')]: Math.round(d.total / grandTotal * 10000) / 100,
      }));
    // Add total row
    catRows.push({
      [t('col_category')]: t('col_total'),
      [t('col_total')]: Math.round(grandTotal),
      [t('col_count')]: data.expenses.length,
      [t('col_percent')]: 100,
    });
    const wsCat = XLSX.utils.json_to_sheet(catRows);
    wsCat['!cols'] = [{ wch: 20 }, { wch: 15 }, { wch: 10 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(wb, wsCat, t('sheet_by_category'));

    // ── Sheet 3: By Person ──
    const personMap = {};
    for (const e of data.expenses) {
      if (!personMap[e.user_name]) personMap[e.user_name] = { total: 0, count: 0 };
      personMap[e.user_name].total += e.amount;
      personMap[e.user_name].count++;
    }
    const personRows = Object.entries(personMap)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([name, d]) => ({
        [t('col_person')]: name,
        [t('col_total')]: Math.round(d.total),
        [t('col_count')]: d.count,
        [t('col_percent')]: Math.round(d.total / grandTotal * 10000) / 100,
      }));
    personRows.push({
      [t('col_person')]: t('col_total'),
      [t('col_total')]: Math.round(grandTotal),
      [t('col_count')]: data.expenses.length,
      [t('col_percent')]: 100,
    });
    const wsPerson = XLSX.utils.json_to_sheet(personRows);
    wsPerson['!cols'] = [{ wch: 20 }, { wch: 15 }, { wch: 10 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(wb, wsPerson, t('sheet_by_person'));

    // ── Sheet 4: By Month ──
    const monthMap = {};
    for (const e of data.expenses) {
      const m = e.expense_date.slice(0, 7); // YYYY-MM
      if (!monthMap[m]) monthMap[m] = { total: 0, count: 0, categories: {} };
      monthMap[m].total += e.amount;
      monthMap[m].count++;
      const cat = e.category_name;
      monthMap[m].categories[cat] = (monthMap[m].categories[cat] || 0) + e.amount;
    }
    // Get all category names for columns
    const allCats = [...new Set(data.expenses.map(e => e.category_name))].sort();
    const monthRows = Object.entries(monthMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, d]) => {
        const row = {
          [t('col_month')]: month,
          [t('col_total')]: Math.round(d.total),
          [t('col_count')]: d.count,
        };
        for (const cat of allCats) {
          row[cat] = Math.round(d.categories[cat] || 0);
        }
        return row;
      });
    // Add total row
    const totalRow = { [t('col_month')]: t('col_total'), [t('col_total')]: Math.round(grandTotal), [t('col_count')]: data.expenses.length };
    for (const cat of allCats) {
      totalRow[cat] = Math.round(catMap[cat]?.total || 0);
    }
    monthRows.push(totalRow);
    const wsMonth = XLSX.utils.json_to_sheet(monthRows);
    wsMonth['!cols'] = [{ wch: 10 }, { wch: 15 }, { wch: 8 }, ...allCats.map(() => ({ wch: 14 }))];
    XLSX.utils.book_append_sheet(wb, wsMonth, t('sheet_by_month'));

    // Download
    const familyName = data.family_name || 'Family';
    const fileName = `${familyName}_${exportFrom}_${exportTo}.xlsx`;
    XLSX.writeFile(wb, fileName);
    toast(t('export_success'), 'success');
  } catch (err) {
    toast(t('failed', err.message), 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = origText;
  }
}

function populatePersonFilter() {
  if (!state.family) return;
  const sel = document.getElementById('filter-person');
  const current = sel.value;
  sel.innerHTML = '<option value="">' + t('all_members') + '</option>';
  (state.family.members || []).forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = m.name;
    if (m.id === current) opt.selected = true;
    sel.appendChild(opt);
  });
  updateHistoryFiltersSummary();
}

// ── Family ─────────────────────────────────────────────────────────────────
function renderIncomingInvites(invites) {
  const myInvitesSection = document.getElementById('my-invites-section');
  const list = document.getElementById('my-invites-list');
  if (!myInvitesSection || !list) return;

  if (!invites || invites.length === 0) {
    myInvitesSection.style.display = 'none';
    list.innerHTML = '';
    return;
  }

  myInvitesSection.style.display = 'block';
  list.innerHTML = invites.map(inv => `
    <div class="invite-item" style="flex-wrap:wrap;gap:0.5rem">
      <div style="flex:1;min-width:150px">
        <div style="font-weight:600">${escHtml(inv.family_name)}</div>
        <div style="font-size:0.8125rem;color:var(--text-muted)">${t('invite_from', inv.inviter_name, inv.family_name)}</div>
      </div>
      <div style="display:flex;gap:0.5rem">
        <button class="btn btn-primary btn-sm accept-invite" data-id="${escHtml(inv.id)}">${t('accept')}</button>
        <button class="btn btn-secondary btn-sm reject-invite" data-id="${escHtml(inv.id)}">${t('reject')}</button>
      </div>
    </div>`
  ).join('');

  list.querySelectorAll('.accept-invite').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await api('/api/family', { method: 'PUT', body: JSON.stringify({ action: 'accept_invite', invite_id: btn.dataset.id }) });
        toast(t('invite_accepted'), 'success');
        await loadFamily();
        loadDashboard();
      } catch (err) { toast(t('failed', err.message), 'error'); }
    });
  });

  list.querySelectorAll('.reject-invite').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await api('/api/family', { method: 'PUT', body: JSON.stringify({ action: 'reject_invite', invite_id: btn.dataset.id }) });
        toast(t('invite_rejected'), 'info');
        await loadFamily();
      } catch (err) { toast(t('failed', err.message), 'error'); }
    });
  });
}

async function loadFamily() {
  const noFam = document.getElementById('no-family-setup');
  const hasFam = document.getElementById('has-family');

  try {
    const data = await api('/api/family');
    state.family = data.family;
    updateWorkspaceCopy();
    const myInvites = data.my_pending_invites || [];
    if (state.family && state.categories.length === 0) {
      await loadCategories();
    }

    if (!state.family) {
      noFam.style.display = 'block';
      hasFam.style.display = 'none';
      renderIncomingInvites(myInvites);
      renderBudgetSettingsUI();
      return;
    }

    renderIncomingInvites(state.family.is_personal ? myInvites : []);
    noFam.style.display = 'none';
    hasFam.style.display = 'block';

    // Apply family currency
    updateCurrencyFormatter(state.family.currency || 'VND');
    renderCurrencyUI();
    renderBudgetSettingsUI();
    renderBudgetOverview();
    renderCashflowForecast();

    document.getElementById('family-name-heading').textContent = state.family.is_personal ? t('workspace_personal_name') : state.family.name;

    const myRole = (state.family.members || []).find(m => m.id === state.user.sub)?.role || 'member';
    const roleBadge = document.getElementById('my-role-badge');
    roleBadge.textContent = t(myRole);
    roleBadge.className = `role-badge ${myRole}`;
    document.getElementById('leave-family-btn').style.display = state.family.is_personal ? 'none' : '';

    document.getElementById('member-list').innerHTML = (state.family.members || []).map(m => {
      const avatarHtml = m.avatar
        ? `<img class="avatar" src="${escHtml(m.avatar)}" alt="${escHtml(m.name)}" />`
        : `<div class="avatar-placeholder">${escHtml(m.name[0])}</div>`;
      return `
        <div class="member-item">
          ${avatarHtml}
          <div class="member-info">
            <div class="member-name">${escHtml(m.name)}</div>
            <div class="member-email">${escHtml(m.email)}</div>
          </div>
          <span class="role-badge ${escHtml(m.role)}">${escHtml(t(m.role))}</span>
        </div>`;
    }).join('');

    const pendingInvites = state.family.pending_invites || [];
    const pendingSection = document.getElementById('pending-invites-section');
    const pendingList = document.getElementById('pending-invites-list');

    if (pendingInvites.length > 0) {
      pendingSection.style.display = 'block';
      const appOrigin = window.location.origin + window.location.pathname;
      pendingList.innerHTML = pendingInvites.map(inv =>
        `<div class="invite-item">
          <div style="flex:1;min-width:0">
            <div class="invite-email">${escHtml(inv.email)}</div>
            <div class="invite-status">${t('pending')}</div>
          </div>
          <div style="display:flex;gap:0.25rem">
            ${inv.invite_token ? `<button class="btn btn-secondary btn-sm copy-invite-link" data-link="${escHtml(appOrigin)}#invite/${escHtml(inv.invite_token)}" title="${t('copy_invite_link')}">📋</button>` : ''}
            <button class="btn btn-icon btn-sm cancel-invite" data-id="${escHtml(inv.id)}" title="${escHtml(t('cancel_invite'))}">✕</button>
          </div>
        </div>`
      ).join('');

      pendingList.querySelectorAll('.copy-invite-link').forEach(btn => {
        btn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(btn.dataset.link);
            toast(t('invite_link_copied'), 'success');
          } catch { toast(btn.dataset.link, 'info'); }
        });
      });
      pendingList.querySelectorAll('.cancel-invite').forEach(btn => {
        btn.addEventListener('click', async () => {
          try {
            await api('/api/family', {
              method: 'PUT',
              body: JSON.stringify({ action: 'remove_invite', invite_id: btn.dataset.id }),
            });
            toast(t('invite_cancelled'), 'success');
            await loadFamily();
          } catch (err) {
            toast(t('failed', err.message), 'error');
          }
        });
      });
    } else {
      pendingSection.style.display = 'none';
    }

    populatePersonFilter();
  } catch (err) {
    toast(t('failed_load_family', err.message), 'error');
  }

  // Always init profile UI (works without family too)
  initProfileUI();
}

// ── Currency Setting ──────────────────────────────────────────────────
const COMMON_CURRENCIES = ['VND', 'USD', 'EUR', 'JPY', 'KRW', 'THB', 'SGD', 'AUD', 'GBP', 'CNY'];

function renderCurrencyUI() {
  const container = document.getElementById('currency-setting');
  if (!container) return;
  if (!state.family) { container.style.display = 'none'; return; }

  const myRole = (state.family.members || []).find(m => m.id === state.user.sub)?.role;
  const isOwner = myRole === 'owner';
  const currency = state.family.currency || 'VND';

  container.style.display = 'block';
  container.innerHTML = `
    <div class="card-header">
      <span class="card-title">${t('currency')}</span>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap">
      <select id="currency-select" ${isOwner ? '' : 'disabled'} style="flex:1;min-width:120px">
        ${COMMON_CURRENCIES.map(c => `<option value="${c}" ${c === currency ? 'selected' : ''}>${c}</option>`).join('')}
      </select>
      ${isOwner ? `<button class="btn btn-primary" id="save-currency-btn">${t('save')}</button>` : `<span style="color:var(--text-muted);font-size:0.85rem">${t('only_owner_currency')}</span>`}
    </div>`;

  if (isOwner) {
    document.getElementById('save-currency-btn').addEventListener('click', changeCurrency);
  }
}

async function changeCurrency() {
  const newCurrency = document.getElementById('currency-select').value;
  const oldCurrency = state.family.currency || 'VND';
  if (newCurrency === oldCurrency) { toast(t('currency_unchanged'), 'info'); return; }

  const confirmed = confirm(t('currency_change_confirm', oldCurrency, newCurrency));
  if (!confirmed) return;

  const btn = document.getElementById('save-currency-btn');
  btn.disabled = true;
  btn.textContent = t('converting');

  try {
    const result = await api('/api/family', {
      method: 'PUT',
      body: JSON.stringify({ action: 'set_currency', currency: newCurrency }),
    });
    state.family.currency = newCurrency;
    updateCurrencyFormatter(newCurrency);
    toast(t('currency_changed', newCurrency, result.rate.toFixed(6)), 'success');
    renderCurrencyUI();
    // Refresh dashboard to show new amounts
    loadDashboard();
  } catch (err) {
    toast(t('failed', err.message), 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = t('save');
  }
}

// ── Profile (Name edit + Password) ────────────────────────────────────────
function initProfileUI() {
  if (!state.user) return;
  const nameInput = document.getElementById('profile-name');
  const emailInput = document.getElementById('profile-email');
  const editBtn = document.getElementById('edit-name-btn');
  const saveBtn = document.getElementById('save-name-btn');
  const cancelBtn = document.getElementById('cancel-name-btn');
  const hint = document.getElementById('name-edit-hint');

  if (!nameInput) return;

  nameInput.value = state.user.name || '';
  emailInput.value = state.user.email || '';

  // Username (one-time set)
  const usernameInput = document.getElementById('profile-username');
  const saveUsernameBtn = document.getElementById('save-username-btn');
  const usernameHint = document.getElementById('username-hint');
  if (usernameInput) {
    usernameInput.value = state.user.username || '';
    const usernameEdited = state.user.username && state.user.username_edited;
    if (usernameEdited) {
      usernameInput.disabled = true;
      saveUsernameBtn.style.display = 'none';
      usernameHint.textContent = t('username_edit_used');
      usernameHint.style.color = 'var(--text-muted)';
    } else {
      saveUsernameBtn.onclick = async () => {
        const val = usernameInput.value.trim();
        if (!val) { toast(t('username_invalid'), 'error'); return; }
        if (val.length < 3 || val.length > 30 || !/^[a-zA-Z0-9_]+$/.test(val)) {
          toast(t('username_invalid'), 'error');
          return;
        }
        if (!confirm(t('username_set_confirm'))) return;
        saveUsernameBtn.disabled = true;
        saveUsernameBtn.textContent = t('saving');
        try {
          await api('/api/auth', {
            method: 'PUT',
            body: JSON.stringify({ action: 'update_username', username: val }),
          });
          state.user.username = val;
          state.user.username_edited = 1;
          sessionStorage.setItem('user', JSON.stringify(state.user));
          usernameInput.disabled = true;
          saveUsernameBtn.style.display = 'none';
          usernameHint.textContent = t('username_saved');
          usernameHint.style.color = 'var(--success)';
          toast(t('username_saved'), 'success');
        } catch (err) {
          toast(t('failed', err.message), 'error');
        } finally {
          saveUsernameBtn.disabled = false;
          saveUsernameBtn.textContent = t('save');
        }
      };
    }
  }

  // Google account linking
  const linkGoogleBtn = document.getElementById('link-google-btn');
  const googleLinkedBadge = document.getElementById('google-linked-badge');
  if (linkGoogleBtn && googleLinkedBadge) {
    if (state.user.google_linked) {
      linkGoogleBtn.style.display = 'none';
      googleLinkedBadge.style.display = '';
    } else {
      linkGoogleBtn.style.display = '';
      googleLinkedBadge.style.display = 'none';
      linkGoogleBtn.onclick = () => {
        google.accounts.id.initialize({
          client_id: '96712291758-care9g3k805ii70ndqd5dtfh07b613ua.apps.googleusercontent.com',
          callback: handleLinkGoogle,
          auto_select: false,
        });
        google.accounts.id.prompt();
      };
    }
  }

  // Check if name was already edited (stored in user state from session)
  const nameEdited = state.user.name_edited;
  if (nameEdited) {
    editBtn.style.display = 'none';
    hint.textContent = t('name_edit_used');
    hint.style.color = 'var(--text-muted)';
  } else {
    editBtn.style.display = '';
  }

  let originalName = nameInput.value;

  editBtn.onclick = () => {
    nameInput.disabled = false;
    nameInput.focus();
    editBtn.style.display = 'none';
    saveBtn.style.display = '';
    cancelBtn.style.display = '';
    originalName = nameInput.value;
  };

  cancelBtn.onclick = () => {
    nameInput.value = originalName;
    nameInput.disabled = true;
    editBtn.style.display = '';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
  };

  saveBtn.onclick = async () => {
    const newName = nameInput.value.trim();
    if (!newName) { toast(t('name_empty'), 'error'); return; }
    if (newName === originalName) { cancelBtn.click(); return; }

    if (!confirm(t('name_change_confirm'))) return;

    saveBtn.disabled = true;
    saveBtn.textContent = t('saving');
    try {
      const data = await api('/api/auth', {
        method: 'PUT',
        body: JSON.stringify({ action: 'update_name', name: newName }),
      });
      state.user.name = newName;
      state.user.name_edited = 1;
      sessionStorage.setItem('user', JSON.stringify(state.user));
      renderNavUser();
      nameInput.disabled = true;
      saveBtn.style.display = 'none';
      cancelBtn.style.display = 'none';
      editBtn.style.display = 'none';
      hint.textContent = t('name_updated_hint');
      hint.style.color = 'var(--success)';
      toast(t('name_updated'), 'success');
    } catch (err) {
      toast(t('failed', err.message), 'error');
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = t('save');
    }
  };

  // Password section
  const pwCard = document.getElementById('password-card');
  const googleNotice = document.getElementById('google-auth-notice');
  const pwForm = document.getElementById('password-form-content');

  if (pwCard) {
    const hasPassword = state.user.has_password;
    const isGoogleUser = state.user.auth_provider === 'google';

    if (!hasPassword) {
      // No password yet (Google-only user) — show set password form
      pwCard.style.display = 'block';
      pwForm.style.display = 'block';
      googleNotice.style.display = 'none';
      document.getElementById('current-password').parentElement.style.display = 'none';
      document.getElementById('change-password-btn').textContent = t('set_password');
      document.querySelector('#password-card .card-title').textContent = t('set_password');
    } else {
      // Has password — allow change
      pwCard.style.display = 'block';
      pwForm.style.display = 'block';
      googleNotice.style.display = 'none';
      document.getElementById('current-password').parentElement.style.display = '';
      document.getElementById('change-password-btn').textContent = t('change_password');
      document.querySelector('#password-card .card-title').textContent = t('change_password');
    }
  }
}

async function handleChangePassword() {
  const currentPw = document.getElementById('current-password').value;
  const newPw = document.getElementById('new-password').value;
  const confirmPw = document.getElementById('confirm-password').value;
  const errEl = document.getElementById('password-error');
  const btn = document.getElementById('change-password-btn');

  errEl.style.display = 'none';

  const hasPassword = state.user.has_password;
  if (hasPassword && !currentPw) { errEl.textContent = t('current_password_required'); errEl.style.display = 'block'; return; }
  if (newPw.length < 8) { errEl.textContent = t('password_min_length'); errEl.style.display = 'block'; return; }
  if (newPw !== confirmPw) { errEl.textContent = t('passwords_not_match'); errEl.style.display = 'block'; return; }

  btn.disabled = true;
  btn.textContent = t('changing_password');

  try {
    await api('/api/auth', {
      method: 'PUT',
      body: JSON.stringify({ action: 'change_password', current_password: currentPw, new_password: newPw }),
    });
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    state.user.has_password = true;
    sessionStorage.setItem('user', JSON.stringify(state.user));
    initProfileUI();
    toast(t('password_set_success'), 'success');
  } catch (err) {
    errEl.textContent = err.message;
    errEl.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = t('change_password');
  }
}

// ── AI Analysis ───────────────────────────────────────────────────────────
const AI_MODELS = {
  gemini: ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash'],
  openai: ['gpt-4o-mini', 'gpt-4o', 'gpt-4.1-mini', 'gpt-4.1-nano'],
  anthropic: ['claude-sonnet-4-20250514', 'claude-haiku-4-5-20251001'],
  zai: ['claude-sonnet-4-20250514', 'claude-haiku-4-5-20251001'],
};

function getAISettings() {
  try {
    return JSON.parse(localStorage.getItem('ai_settings') || '{}');
  } catch { return {}; }
}

function saveAISettingsLocal(settings) {
  localStorage.setItem('ai_settings', JSON.stringify(settings));
}

async function loadAISettingsFromServer() {
  try {
    const res = await api('/api/family', {
      method: 'PUT',
      body: JSON.stringify({ action: 'get_ai_settings' }),
    });
    if (res.settings) {
      // Flatten: set apiKey for current provider from apiKeys map
      const s = res.settings;
      s.apiKey = s.apiKeys?.[s.provider] || '';
      saveAISettingsLocal(s);
      return s;
    }
  } catch { /* fallback to local */ }
  return getAISettings();
}

async function saveAISettingsToServer(settings) {
  try {
    await api('/api/family', {
      method: 'PUT',
      body: JSON.stringify({
        action: 'save_ai_settings',
        provider: settings.provider,
        model: settings.model,
        apiKey: settings.apiKey,
        income: settings.income,
        savings: settings.savings,
      }),
    });
    // Update local cache with the new key in apiKeys map
    const local = getAISettings();
    const apiKeys = local.apiKeys || {};
    if (settings.apiKey) apiKeys[settings.provider] = settings.apiKey;
    saveAISettingsLocal({ ...settings, apiKeys });
  } catch (err) {
    saveAISettingsLocal(settings);
    throw err;
  }
}

async function initAISettingsUI() {
  const providerSel = document.getElementById('ai-provider');
  const modelSel = document.getElementById('ai-model');
  const apiKeyInput = document.getElementById('ai-api-key');
  if (!providerSel || !modelSel) return;

  // Load from server (falls back to localStorage)
  const saved = await loadAISettingsFromServer();
  const apiKeys = saved.apiKeys || {};

  function populateModels() {
    const provider = providerSel.value;
    const models = AI_MODELS[provider] || [];
    modelSel.innerHTML = models.map(m =>
      `<option value="${m}" ${m === saved.model && provider === saved.provider ? 'selected' : ''}>${m}</option>`
    ).join('');
  }

  function updateApiKeyForProvider() {
    const provider = providerSel.value;
    const key = apiKeys[provider] || '';
    apiKeyInput.value = key;
    apiKeyInput.placeholder = key ? '' : (saved.providersWithKeys?.includes(provider) ? '••••••••  (saved)' : t('api_key_placeholder'));
  }

  providerSel.addEventListener('change', () => {
    populateModels();
    updateApiKeyForProvider();
  });

  if (saved.provider) providerSel.value = saved.provider;
  populateModels();
  updateApiKeyForProvider();
  if (saved.model) modelSel.value = saved.model;
  if (saved.income) document.getElementById('ai-income').value = saved.income;
  if (saved.savings) document.getElementById('ai-savings').value = saved.savings;
}

async function handleSaveAISettings() {
  const settings = {
    provider: document.getElementById('ai-provider').value,
    model: document.getElementById('ai-model').value,
    apiKey: document.getElementById('ai-api-key').value.trim(),
    income: document.getElementById('ai-income').value || '',
    savings: document.getElementById('ai-savings').value || '',
  };
  const local = getAISettings();
  const hasExistingKey = !!(local.apiKeys?.[settings.provider]);
  if (!settings.apiKey && !hasExistingKey) { toast(t('api_key_required'), 'error'); return; }
  try {
    await saveAISettingsToServer(settings);
    toast(t('ai_settings_saved'), 'success');
  } catch {
    toast(t('ai_settings_saved'), 'success'); // saved locally as fallback
  }
  const fab = document.getElementById('ai-fab');
  if (fab) fab.style.display = 'flex';
}

function checkAIConfigured() {
  const fab = document.getElementById('ai-fab');
  if (!fab) return;
  const isAuthenticated = !!state.user && document.getElementById('app-shell')?.style.display !== 'none';
  fab.style.display = isAuthenticated ? 'flex' : 'none';
}

function openAIModal() {
  document.getElementById('ai-modal-overlay').classList.add('open');
  document.getElementById('ai-question').focus();
}

function closeAIModal() {
  document.getElementById('ai-modal-overlay').classList.remove('open');
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    let hasRefreshed = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (hasRefreshed) return;
      hasRefreshed = true;
      window.location.reload();
    });

    navigator.serviceWorker.register('/sw.js')
      .then(registration => registration.update())
      .catch(() => {});
  });
}

function initKeyboardAwareUI() {
  const formSelector = 'input, select, textarea';
  document.addEventListener('focusin', (event) => {
    if (event.target && event.target.matches && event.target.matches(formSelector)) {
      document.body.classList.add('keyboard-open');
    }
  });
  document.addEventListener('focusout', () => {
    setTimeout(() => {
      const active = document.activeElement;
      if (!active || !active.matches || !active.matches(formSelector)) {
        document.body.classList.remove('keyboard-open');
      }
    }, 50);
  });
}

function updateHistoryFiltersSummary() {
  const summary = document.getElementById('history-filters-summary');
  if (!summary) return;

  const from = document.getElementById('filter-from')?.value || '';
  const to = document.getElementById('filter-to')?.value || '';
  const categorySelect = document.getElementById('filter-category');
  const personSelect = document.getElementById('filter-person');

  const timeText = from || to
    ? `${from || '...'} → ${to || todayISO()}`
    : t('all_time');
  const categoryText = categorySelect?.selectedOptions?.[0]?.textContent?.trim() || t('all_categories');
  const personText = personSelect?.selectedOptions?.[0]?.textContent?.trim() || t('all_members');

  summary.textContent = `${timeText} · ${categoryText} · ${personText}`;
}

function setHistoryFiltersCollapsed(collapsed) {
  const panel = document.getElementById('history-filters-panel');
  const toggle = document.getElementById('history-filters-toggle');
  if (!panel || !toggle) return;
  panel.classList.toggle('collapsed', collapsed);
  toggle.setAttribute('aria-expanded', String(!collapsed));
}

function initHistoryFiltersUI() {
  const toggle = document.getElementById('history-filters-toggle');
  if (!toggle) return;

  const isMobile = () => window.matchMedia('(max-width: 720px)').matches;
  const syncCollapsed = () => setHistoryFiltersCollapsed(isMobile());

  toggle.addEventListener('click', () => {
    if (!isMobile()) return;
    const panel = document.getElementById('history-filters-panel');
    setHistoryFiltersCollapsed(!panel.classList.contains('collapsed'));
  });

  ['filter-from', 'filter-to', 'filter-category', 'filter-person'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', updateHistoryFiltersSummary);
  });

  window.addEventListener('resize', syncCollapsed);
  syncCollapsed();
  updateHistoryFiltersSummary();
}

async function runAIAnalysis(customQuestion) {
  const settings = getAISettings();
  const apiKey = settings.apiKeys?.[settings.provider] || settings.apiKey;
  if (!apiKey || !settings.provider || !settings.model) {
    toast(t('configure_ai_first'), 'error');
    navigate('family');
    return;
  }

  if (!state.stats || state.stats.count === 0) {
    toast(t('no_data_analyze'), 'error');
    return;
  }

  const btn = document.getElementById('ai-analyze-btn');
  const btn2 = document.getElementById('ai-analyze-btn2');
  const content = document.getElementById('ai-insights-content');
  [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = t('analyzing'); } });
  content.innerHTML = '<div class="spinner"></div>';

  try {
    const ml = (state.currentMonth || state.currentDay || state.currentYear)
      ? getDashboardLabel()
      : 'this month';

    const res = await api('/api/ai-analyze', {
      method: 'POST',
      body: JSON.stringify({
        provider: settings.provider,
        model: settings.model,
        apiKey: apiKey,
        stats: state.stats,
        monthLabel: ml,
        currency: state.currency,
        income: settings.income || null,
        savings: settings.savings || null,
        question: customQuestion || null,
      }),
    });

    renderAIInsights(res.analysis);
  } catch (err) {
    content.innerHTML = `<div class="form-error">${escHtml(err.message)}</div>`;
    toast('AI analysis failed: ' + err.message, 'error');
  } finally {
    [btn, btn2].forEach(b => { if (b) { b.disabled = false; } });
    if (btn) btn.textContent = t('analyze');
    if (btn2) btn2.textContent = t('ask');
  }
}

function renderAIInsights(analysis) {
  const content = document.getElementById('ai-insights-content');

  // Score badge color
  const score = analysis.score || 0;
  let scoreColor = 'var(--danger)';
  let scoreLabel = t('ai_needs_attention');
  if (score >= 7) { scoreColor = 'var(--success)'; scoreLabel = t('ai_healthy'); }
  else if (score >= 4) { scoreColor = 'var(--warning)'; scoreLabel = t('ai_fair'); }

  const insightsHtml = (analysis.insights || []).map(i =>
    `<li>${escHtml(i)}</li>`
  ).join('');

  const warningsHtml = (analysis.warnings || []).map(w =>
    `<div class="ai-warning">${escHtml(w)}</div>`
  ).join('');

  const tipsHtml = (analysis.tips || []).map(t =>
    `<li>${escHtml(t)}</li>`
  ).join('');

  content.innerHTML = `
    <div class="ai-score-row">
      <div class="ai-score-badge" style="background:${scoreColor}">
        <span class="ai-score-num">${score}</span><span class="ai-score-max">/10</span>
      </div>
      <div class="ai-score-info">
        <div class="ai-score-label" style="color:${scoreColor}">${scoreLabel}</div>
        <div class="ai-summary">${escHtml(analysis.summary || '')}</div>
      </div>
    </div>
    ${warningsHtml ? `<div class="ai-warnings">${warningsHtml}</div>` : ''}
    <div class="ai-section">
      <div class="ai-section-title">${t('key_insights')}</div>
      <ul class="ai-list">${insightsHtml}</ul>
    </div>
    <div class="ai-chart-container">
      <canvas id="ai-chart" width="280" height="280"></canvas>
    </div>
    <div class="ai-section">
      <div class="ai-section-title">${t('tips')}</div>
      <ul class="ai-list ai-tips">${tipsHtml}</ul>
    </div>
    ${analysis.trend ? `<div class="ai-trend">${escHtml(analysis.trend.description || '')}</div>` : ''}
  `;

  // Render doughnut chart
  if (analysis.chart && analysis.chart.labels && analysis.chart.values) {
    drawDoughnutChart('ai-chart', analysis.chart);
  }
}

// ── AI Expense Extraction ─────────────────────────────────────────────────

async function handleAIExtract(file) {
  const settings = getAISettings();
  const apiKey = settings.apiKeys?.[settings.provider] || settings.apiKey;
  if (!apiKey || !settings.provider || !settings.model) {
    toast(t('ai_extract_no_ai'), 'error');
    return;
  }

  const btn = document.getElementById('ai-extract-btn');
  const preview = document.getElementById('ai-extract-preview');
  btn.disabled = true;
  btn.innerHTML = `<div class="spinner" style="width:18px;height:18px;display:inline-block;vertical-align:middle;margin-right:6px"></div> ${t('ai_extracting')}`;
  preview.style.display = 'none';

  try {
    const formData = new FormData();
    formData.append('provider', settings.provider);
    formData.append('model', settings.model);
    formData.append('apiKey', apiKey);
    formData.append('currency', state.currency || 'VND');
    formData.append('file', file);

    const res = await fetch('/api/ai-extract', {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'AI extraction failed');

    if (!data.expenses || data.expenses.length === 0) {
      toast(t('ai_extract_none'), 'error');
      preview.style.display = 'none';
      return;
    }

    toast(t('ai_extract_found', data.expenses.length), 'success');
    renderExtractedExpenses(data.expenses, data.categories || []);
  } catch (err) {
    toast(err.message, 'error');
    preview.style.display = 'none';
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span class="material-symbols-outlined" style="font-size:20px;vertical-align:middle;margin-right:4px">photo_camera</span> ${t('ai_extract_btn')}`;
  }
}

function renderExtractedExpenses(expenses, categories) {
  const preview = document.getElementById('ai-extract-preview');
  let items = [...expenses];

  function render() {
    if (items.length === 0) {
      preview.style.display = 'none';
      return;
    }
    preview.style.display = 'block';
    preview.innerHTML = `
      <div style="margin-top:0.75rem">
        <div style="font-weight:600;margin-bottom:0.5rem;font-size:0.9rem">${t('ai_extract_found', items.length)}</div>
        <div class="ai-extract-list">
          ${items.map((e, i) => `
            <div class="ai-extract-item" style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--border)">
              <div style="flex:1;min-width:0">
                <div style="font-weight:500;font-size:0.85rem">${escHtml(e.description || '')}</div>
                <div style="font-size:0.75rem;color:var(--text-muted)">${escHtml(e.category_name || '')} · ${e.expense_date}</div>
              </div>
              <div style="font-weight:600;margin:0 0.75rem;white-space:nowrap">${formatMoney(e.amount)}</div>
              <button type="button" class="btn btn-danger" style="padding:0.25rem 0.5rem;font-size:0.7rem" data-remove-idx="${i}">${t('ai_extract_remove')}</button>
            </div>
          `).join('')}
        </div>
        <button type="button" class="btn btn-primary btn-full" id="ai-extract-add-all" style="margin-top:0.75rem">${t('ai_extract_add_all')}</button>
      </div>
    `;

    // Remove buttons
    preview.querySelectorAll('[data-remove-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        items.splice(parseInt(btn.dataset.removeIdx), 1);
        render();
      });
    });

    // Add all button
    document.getElementById('ai-extract-add-all').addEventListener('click', () => addAllExtracted(items));
  }

  render();
}

async function addAllExtracted(items) {
  const btn = document.getElementById('ai-extract-add-all');
  btn.disabled = true;
  btn.textContent = t('ai_extract_adding');

  let added = 0;
  for (const item of items) {
    try {
      await api('/api/expenses', {
        method: 'POST',
        body: JSON.stringify({
          amount: item.amount,
          description: item.description || '',
          category_id: item.category_id,
          expense_date: item.expense_date,
        }),
      });
      added++;
    } catch { /* skip failed items */ }
  }

  toast(t('ai_extract_added', added), 'success');
  document.getElementById('ai-extract-preview').style.display = 'none';
  document.getElementById('ai-extract-preview').innerHTML = '';

  // Refresh dashboard
  if (typeof loadDashboard === 'function') loadDashboard();
}

// ── Chart data aggregation ────────────────────────────────────────────────
function aggregateByWeek(dailyData) {
  const weeks = {};
  for (const d of dailyData) {
    const date = new Date(d.expense_date + 'T00:00:00');
    // Get Monday of the week
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date);
    monday.setDate(diff);
    const key = monday.toISOString().slice(0, 10);
    if (!weeks[key]) weeks[key] = { expense_date: key, total: 0 };
    weeks[key].total += d.total;
  }
  return Object.values(weeks).sort((a, b) => a.expense_date.localeCompare(b.expense_date));
}

function aggregateByMonth(dailyData) {
  const months = {};
  for (const d of dailyData) {
    const key = d.expense_date.slice(0, 7); // YYYY-MM
    if (!months[key]) months[key] = { expense_date: key + '-01', label: key, total: 0 };
    months[key].total += d.total;
  }
  return Object.values(months).sort((a, b) => a.expense_date.localeCompare(b.expense_date));
}

let currentChartGranularity = 'day';
let currentChartDailyData = [];

function updateChartWithGranularity(gran) {
  currentChartGranularity = gran;
  document.querySelectorAll('.chart-gran-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.gran === gran);
  });

  let chartData, titleKey;
  if (gran === 'week') {
    chartData = aggregateByWeek(currentChartDailyData);
    titleKey = 'weekly_spending';
  } else if (gran === 'month') {
    chartData = aggregateByMonth(currentChartDailyData);
    titleKey = 'monthly_spending';
  } else {
    chartData = currentChartDailyData;
    titleKey = 'daily_spending';
  }

  document.getElementById('chart-title').textContent = t(titleKey);
  drawDailyBarChart('daily-chart', chartData, gran);
}

function drawDailyBarChart(canvasId, dailyData, granularity) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  const container = canvas.parentElement;
  const width = container.clientWidth;
  const height = 200;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.scale(dpr, dpr);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#94A3B8' : '#64748B';
  const gridColor = isDark ? 'rgba(148,163,184,0.1)' : 'rgba(100,116,139,0.08)';

  const maxVal = Math.max(...dailyData.map(d => d.total), 1);
  const padLeft = 10;
  const padRight = 10;
  const padTop = 10;
  const padBottom = 28;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const barGap = Math.max(1, Math.floor(chartW / dailyData.length * 0.2));
  const barW = Math.max(3, (chartW - barGap * dailyData.length) / dailyData.length);

  // Grid lines
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 3; i++) {
    const y = padTop + (chartH / 3) * i;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();
  }

  // Gradient for bars
  const gradient = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
  gradient.addColorStop(0, '#6366F1');
  gradient.addColorStop(1, '#818CF8');

  // Bars
  dailyData.forEach((d, i) => {
    const barH = maxVal > 0 ? (d.total / maxVal) * chartH : 0;
    const x = padLeft + i * (barW + barGap) + barGap / 2;
    const y = padTop + chartH - barH;

    // Bar with rounded top
    const radius = Math.min(barW / 2, 4);
    ctx.fillStyle = d.total > 0 ? gradient : 'transparent';
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.arcTo(x, y, x + barW, y, radius);
    ctx.arcTo(x + barW, y, x + barW, y + barH, radius);
    ctx.lineTo(x + barW, padTop + chartH);
    ctx.lineTo(x, padTop + chartH);
    ctx.closePath();
    ctx.fill();

    // Date label
    const showLabel = dailyData.length <= 15 || i % Math.ceil(dailyData.length / 10) === 0 || i === dailyData.length - 1;
    if (showLabel && d.expense_date) {
      let label;
      if (granularity === 'month') {
        label = d.label || d.expense_date.slice(5, 7);
      } else if (granularity === 'week') {
        const dd = d.expense_date.split('-');
        label = dd[2] + '/' + dd[1];
      } else {
        label = d.expense_date.split('-')[2];
      }
      ctx.fillStyle = textColor;
      ctx.font = '10px "Nunito Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(label, x + barW / 2, padTop + chartH + 6);
    }
  });

  // Hover tooltip
  canvas.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const idx = Math.floor((mx - padLeft) / (barW + barGap));
    if (idx >= 0 && idx < dailyData.length) {
      const d = dailyData[idx];
      canvas.title = `${formatDate(d.expense_date)}: ${formatMoney(d.total)}`;
    }
  };
}

function drawDoughnutChart(canvasId, chartData) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = Math.min(canvas.width || 220, canvas.parentElement.clientWidth, 280);
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';
  ctx.scale(dpr, dpr);

  const { labels, values, colors } = chartData;
  const total = values.reduce((a, b) => a + b, 0);
  if (total === 0) return;

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.43;
  const innerR = size * 0.25;
  let startAngle = -Math.PI / 2;

  const defaultColors = ['#6366F1', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

  // Draw total in center
  ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? '#E2E8F0' : '#1E293B';
  ctx.font = `bold ${Math.round(size * 0.07)}px 'Nunito Sans', sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(formatMoney(total), cx, cy);

  values.forEach((val, i) => {
    const sliceAngle = (val / total) * Math.PI * 2;
    const color = (colors && colors[i]) || defaultColors[i % defaultColors.length];

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, startAngle + sliceAngle);
    ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // Percentage label on slice
    const midAngle = startAngle + sliceAngle / 2;
    const labelR = outerR - (outerR - innerR) * 0.45;
    const pct = ((val / total) * 100).toFixed(0);
    if (pct >= 5) {
      const lx = cx + Math.cos(midAngle) * labelR;
      const ly = cy + Math.sin(midAngle) * labelR;
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${Math.round(size * 0.04)}px 'Nunito Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${pct}%`, lx, ly);
    }

    startAngle += sliceAngle;
  });

  // Legend — use existing sibling element or create one
  const legendId = canvasId + '-legend';
  let legendEl = document.getElementById(legendId);
  if (!legendEl) {
    legendEl = document.createElement('div');
    legendEl.id = legendId;
    legendEl.className = 'ai-chart-legend';
    canvas.parentElement.appendChild(legendEl);
  }
  legendEl.innerHTML = labels.map((label, i) => {
    const color = (colors && colors[i]) || defaultColors[i % defaultColors.length];
    const pct = ((values[i] / total) * 100).toFixed(1);
    return `<div class="ai-legend-item">
      <span class="ai-legend-dot" style="background:${color}"></span>
      <span class="ai-legend-label">${escHtml(label)}</span>
      <span class="ai-legend-pct">${pct}%</span>
    </div>`;
  }).join('');
}

// ── Voice Input ───────────────────────────────────────────────────────────
const CATEGORY_KEYWORDS = {
  food: ['ăn', 'an', 'cơm', 'com', 'phở', 'pho', 'bún', 'bun', 'bánh', 'banh', 'uống', 'uong', 'cafe', 'cà phê', 'ca phe', 'trà', 'tra', 'bia', 'nhậu', 'nhau', 'lunch', 'dinner', 'breakfast', 'food', 'drink', 'coffee', 'rau', 'thịt', 'thit', 'trái cây', 'trai cay', 'đi chợ', 'di cho', 'chợ', 'siêu thị', 'sieu thi'],
  transport: ['xăng', 'xang', 'grab', 'taxi', 'xe', 'đổ xăng', 'do xang', 'gửi xe', 'gui xe', 'parking', 'gas', 'fuel', 'bus', 'vé', 've'],
  shopping: ['mua', 'shopping', 'quần', 'quan', 'áo', 'ao', 'giày', 'giay', 'dép', 'dep', 'clothes', 'shoes', 'máy giặt', 'may giat', 'tủ lạnh', 'tu lanh', 'máy', 'may', 'điện thoại', 'dien thoai', 'laptop', 'iphone', 'samsung', 'đồ chơi', 'do choi', 'toy', 'toys'],
  health: ['thuốc', 'thuoc', 'bệnh viện', 'benh vien', 'khám', 'kham', 'doctor', 'medicine', 'hospital', 'pharmacy'],
  education: ['học', 'hoc', 'sách', 'sach', 'khóa', 'khoa', 'course', 'book', 'school', 'tuition'],
  entertainment: ['phim', 'game', 'chơi', 'choi', 'karaoke', 'movie', 'cinema', 'giải trí', 'giai tri'],
  bills: ['điện', 'dien', 'nước', 'nuoc', 'wifi', 'internet', 'bill', 'tiền nhà', 'tien nha', 'thuê', 'thue', 'rent'],
  other: [],
};

const VOICE_AMOUNT_REGEX = /(\d+(?:[.,]\d+)?)\s*(?:triệu|trieu|tr)\s*(?:rưỡi|ruoi|ruỡi|\d+)?|(\d+(?:[.,]\d+)?)\s*(?:nghìn|nghin|ngàn|ngan|k)\b|\d{4,}/gi;

function normalizeVoiceText(text) {
  let lower = String(text || '').toLowerCase().trim();

  const wordToNum = {
    'không': '0', 'một': '1', 'hai': '2', 'ba': '3', 'bốn': '4', 'bón': '4',
    'năm': '5', 'nam': '5', 'sáu': '6', 'sau': '6', 'bảy': '7', 'bay': '7',
    'tám': '8', 'tam': '8', 'chín': '9', 'chin': '9',
    'mười': '10', 'muoi': '10', 'mươi': '10', 'muoi': '10',
  };

  lower = lower.replace(/(?:mười|muời|muoi)\s*(một|hai|ba|bốn|bón|năm|nam|sáu|sau|bảy|bay|tám|tam|chín|chin)/gi, (_, d) => '1' + wordToNum[d.toLowerCase()]);
  lower = lower.replace(/(một|hai|ba|bốn|bón|năm|nam|sáu|sau|bảy|bay|tám|tam|chín|chin)\s*(?:mươi|muoi)/gi, (_, d) => wordToNum[d.toLowerCase()] + '0');

  for (const [word, digit] of Object.entries(wordToNum)) {
    const re = new RegExp(`\\b${word}\\s*(?=triệu|trieu|tr\\b|nghìn|nghin|ngàn|ngan|k\\b)`, 'gi');
    lower = lower.replace(re, digit + ' ');
  }

  lower = lower.replace(/(\d{1,3}(?:[.,]\d{3})+)/g, (match) => match.replace(/[.,]/g, ''));
  lower = lower.replace(/[;|/]+/g, ' ');
  lower = lower.replace(/\s+/g, ' ').trim();
  return lower;
}

function parseVoiceAmount(raw) {
  if (!raw) return null;
  const value = raw.trim();

  const patterns = [
    { re: /(\d+(?:[.,]\d+)?)\s*(?:triệu|trieu|tr)\s*(?:rưỡi|ruoi|ruỡi)/i, fn: m => parseFloat(m[1].replace(',', '.')) * 1000000 + 500000 },
    { re: /(\d+(?:[.,]\d+)?)\s*(?:triệu|trieu|tr)\s*(\d+)/i, fn: m => parseFloat(m[1].replace(',', '.')) * 1000000 + parseFloat(m[2]) * (m[2].length <= 3 ? 1000 : 1) },
    { re: /(\d+(?:[.,]\d+)?)\s*(?:triệu|trieu|tr)\b/i, fn: m => parseFloat(m[1].replace(',', '.')) * 1000000 },
    { re: /(\d+(?:[.,]\d+)?)\s*k\b/i, fn: m => parseFloat(m[1].replace(',', '.')) * 1000 },
    { re: /(\d+(?:[.,]\d+)?)\s*(?:nghìn|nghin|ngàn|ngan)\b/i, fn: m => parseFloat(m[1].replace(',', '.')) * 1000 },
    { re: /(\d{4,})/i, fn: m => parseInt(m[1], 10) },
  ];

  for (const { re, fn } of patterns) {
    const m = value.match(re);
    if (m) {
      const amount = Math.round(fn(m));
      return Number.isFinite(amount) && amount > 0 ? amount : null;
    }
  }
  return null;
}

function inferVoiceCategoryKey(text) {
  const lower = String(text || '').toLowerCase();
  let matchedCategory = null;
  let bestScore = 0;
  for (const [catKey, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const kw of keywords) {
      if (lower.includes(kw) && kw.length > bestScore) {
        matchedCategory = catKey;
        bestScore = kw.length;
      }
    }
  }

  return matchedCategory;
}

function cleanupVoiceDescription(text) {
  let desc = String(text || '')
    .replace(/^[,.\-:]+|[,.\-:]+$/g, ' ')
    .replace(/\b(và|va|rồi|roi|xong|hết|het|mất|mat|tốn|ton|là|la|khoảng|khoang|tầm|tam)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!desc) return '';
  return desc[0].toUpperCase() + desc.slice(1);
}

function buildVoiceDraft(description, amount) {
  return {
    id: crypto.randomUUID(),
    description: cleanupVoiceDescription(description) || '',
    amount: Math.round(amount),
    category_id: findCategoryIdByDescription(description),
    expense_date: todayISO(),
  };
}

function parseVoiceExpenseBatch(text) {
  const normalized = normalizeVoiceText(text);
  const matches = [];
  let match;

  VOICE_AMOUNT_REGEX.lastIndex = 0;
  while ((match = VOICE_AMOUNT_REGEX.exec(normalized)) !== null) {
    const amount = parseVoiceAmount(match[0]);
    if (!amount) continue;
    matches.push({
      raw: match[0],
      start: match.index,
      end: match.index + match[0].length,
      amount,
    });
  }

  if (!matches.length) return [];

  const drafts = [];
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const prevEnd = i === 0 ? 0 : matches[i - 1].end;
    const nextStart = i + 1 < matches.length ? matches[i + 1].start : normalized.length;
    let description = cleanupVoiceDescription(normalized.slice(prevEnd, current.start));

    if (!description && i === 0) {
      description = cleanupVoiceDescription(normalized.slice(current.end, nextStart));
    }

    const draft = buildVoiceDraft(description || 'Chi tiêu', current.amount);
    drafts.push(draft);
  }

  return drafts.filter(draft => draft.amount > 0);
}

function findCategoryByKeyword(catKey) {
  if (!catKey || state.categories.length === 0) return null;
  // Try matching category name (lowercase) with the keyword group name
  const nameMap = {
    food: ['food', 'ăn uống', 'an uong', 'ăn', 'food & drink', 'đồ ăn', 'do an'],
    transport: ['transport', 'di chuyển', 'di chuyen', 'transportation', 'xăng', 'xang'],
    shopping: ['shopping', 'mua sắm', 'mua sam'],
    health: ['health', 'sức khỏe', 'suc khoe', 'y tế', 'y te'],
    education: ['education', 'giáo dục', 'giao duc', 'học', 'hoc'],
    entertainment: ['entertainment', 'giải trí', 'giai tri'],
    bills: ['bills', 'hóa đơn', 'hoa don', 'tiện ích', 'tien ich', 'utilities'],
  };

  const keywords = nameMap[catKey] || [catKey];
  for (const cat of state.categories) {
    const catName = cat.name.toLowerCase();
    for (const kw of keywords) {
      if (catName.includes(kw) || kw.includes(catName)) return cat.id;
    }
  }
  return null;
}

function findCategoryIdByDescription(description) {
  const normalizedDesc = normalizeVoiceText(description);
  if (!normalizedDesc) return '';

  for (const cat of state.categories) {
    const normalizedName = normalizeVoiceText(cat.name);
    if (normalizedName && normalizedDesc.includes(normalizedName)) {
      return cat.id;
    }
  }

  const categoryKey = inferVoiceCategoryKey(description);
  return findCategoryByKeyword(categoryKey) || '';
}

function setVoiceStatus(message, type = '') {
  const statusEl = document.getElementById('voice-status');
  if (!statusEl) return;
  statusEl.style.display = message ? 'block' : 'none';
  statusEl.textContent = message || '';
  statusEl.classList.remove('voice-success', 'voice-error');
  if (type === 'success') statusEl.classList.add('voice-success');
  if (type === 'error') statusEl.classList.add('voice-error');
}

function setVoiceTranscript(text) {
  const transcriptEl = document.getElementById('voice-transcript');
  if (!transcriptEl) return;
  const content = String(text || '').trim();
  transcriptEl.style.display = content ? 'block' : 'none';
  transcriptEl.textContent = content ? `"${content}"` : '';
}

function formatDraftAmountValue(amount) {
  return Number.isFinite(amount) && amount > 0 ? Math.round(amount).toLocaleString('vi-VN') : '';
}

function getVoiceDraftCategoryOptions(selectedId) {
  const placeholder = `<option value="">${escHtml(t('select_category'))}</option>`;
  const options = state.categories.map(cat => {
    const selected = cat.id === selectedId ? 'selected' : '';
    return `<option value="${escHtml(cat.id)}" ${selected}>${escHtml(cat.icon || '📦')} ${escHtml(cat.name)}</option>`;
  }).join('');
  return placeholder + options;
}

function renderVoiceDrafts() {
  const panel = document.getElementById('voice-draft-panel');
  const list = document.getElementById('voice-draft-list');
  const summary = document.getElementById('voice-draft-summary');
  const saveBtn = document.getElementById('voice-save-btn');

  if (!panel || !list || !summary || !saveBtn) return;

  saveBtn.textContent = t('voice_save_all');

  if (!state.voiceDrafts.length) {
    panel.style.display = 'none';
    list.innerHTML = '';
    summary.textContent = '0 draft';
    return;
  }

  panel.style.display = 'grid';

  const total = state.voiceDrafts.reduce((sum, draft) => sum + (draft.amount || 0), 0);
  summary.textContent = `${state.voiceDrafts.length} draft · ${formatMoney(total)}`;

  list.innerHTML = state.voiceDrafts.map((draft, index) => `
    <div class="voice-draft-item" data-index="${index}">
      <div class="voice-draft-head">
        <div style="display:flex;align-items:center;gap:0.75rem">
          <span class="voice-draft-index">${index + 1}</span>
          <div>
            <div class="voice-draft-title" style="font-weight:700">${escHtml(draft.description || `Draft ${index + 1}`)}</div>
            <div class="draft-summary">${formatMoney(draft.amount || 0)}</div>
          </div>
        </div>
        <button type="button" class="voice-draft-remove" data-remove-index="${index}" title="${escHtml(t('voice_remove_draft'))}">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
      <div class="draft-grid">
        <div class="draft-field">
          <label>${escHtml(t('voice_desc_label'))}</label>
          <input type="text" value="${escHtml(draft.description || '')}" data-field="description" data-index="${index}" maxlength="200" />
        </div>
        <div class="draft-field">
          <label>${escHtml(t('voice_amount_label'))}</label>
          <input type="text" value="${escHtml(formatDraftAmountValue(draft.amount))}" inputmode="numeric" data-field="amount" data-index="${index}" />
        </div>
        <div class="draft-field">
          <label>${escHtml(t('voice_category_label'))}</label>
          <select data-field="category_id" data-index="${index}">
            ${getVoiceDraftCategoryOptions(draft.category_id)}
          </select>
        </div>
        <div class="draft-field">
          <label>${escHtml(t('voice_date_label'))}</label>
          <input type="date" value="${escHtml(draft.expense_date || todayISO())}" data-field="expense_date" data-index="${index}" />
        </div>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('[data-remove-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.voiceDrafts.splice(Number(btn.dataset.removeIndex), 1);
      renderVoiceDrafts();
    });
  });

  list.querySelectorAll('[data-field="description"]').forEach(input => {
    input.addEventListener('input', () => {
      const draft = state.voiceDrafts[Number(input.dataset.index)];
      if (!draft) return;
      draft.description = input.value.trimStart();
      const row = input.closest('.voice-draft-item');
      const titleEl = row && row.querySelector('.voice-draft-title');
      if (titleEl) titleEl.textContent = draft.description || `Draft ${Number(input.dataset.index) + 1}`;
    });
  });

  list.querySelectorAll('[data-field="amount"]').forEach(input => {
    input.addEventListener('input', () => {
      formatAmountInput(input);
      const draft = state.voiceDrafts[Number(input.dataset.index)];
      if (!draft) return;
      draft.amount = getAmountInputValue(input);
      const row = input.closest('.voice-draft-item');
      const summaryEl = row && row.querySelector('.draft-summary');
      if (summaryEl) summaryEl.textContent = draft.amount ? formatMoney(draft.amount) : '—';
      const total = state.voiceDrafts.reduce((sum, item) => sum + (item.amount || 0), 0);
      summary.textContent = `${state.voiceDrafts.length} draft · ${formatMoney(total)}`;
    });
  });

  list.querySelectorAll('[data-field="category_id"]').forEach(select => {
    select.addEventListener('change', () => {
      const draft = state.voiceDrafts[Number(select.dataset.index)];
      if (!draft) return;
      draft.category_id = select.value;
    });
  });

  list.querySelectorAll('[data-field="expense_date"]').forEach(input => {
    input.addEventListener('change', () => {
      const draft = state.voiceDrafts[Number(input.dataset.index)];
      if (!draft) return;
      draft.expense_date = input.value;
    });
  });
}

function resetVoiceDrafts(options = {}) {
  state.voiceDrafts = [];
  state.voiceTranscript = '';
  renderVoiceDrafts();
  setVoiceTranscript('');
  if (!options.keepStatus) setVoiceStatus('');
}

function validateVoiceDrafts() {
  for (let i = 0; i < state.voiceDrafts.length; i++) {
    const draft = state.voiceDrafts[i];
    if (!draft.amount || Number.isNaN(draft.amount) || draft.amount <= 0) {
      return t('voice_invalid_amount', i + 1);
    }
    if (!draft.category_id) {
      return t('voice_invalid_category', i + 1);
    }
  }
  return null;
}

async function saveVoiceDrafts() {
  const saveBtn = document.getElementById('voice-save-btn');
  if (!saveBtn || !state.voiceDrafts.length) return;

  const validationError = validateVoiceDrafts();
  if (validationError) {
    setVoiceStatus(validationError, 'error');
    toast(validationError, 'error');
    return;
  }

  saveBtn.disabled = true;
  saveBtn.textContent = t('voice_saving_all');

  let savedCount = 0;
  let firstError = null;
  const remaining = [];

  for (const draft of state.voiceDrafts) {
    try {
      await api('/api/expenses', {
        method: 'POST',
        body: JSON.stringify({
          amount: Math.round(draft.amount),
          description: (draft.description || '').trim(),
          category_id: draft.category_id,
          expense_date: draft.expense_date || todayISO(),
        }),
      });
      savedCount++;
    } catch (err) {
      remaining.push(draft);
      if (!firstError) firstError = err;
    }
  }

  state.voiceDrafts = remaining;
  renderVoiceDrafts();

  if (savedCount > 0) {
    refreshStatsBackground();
  }

  if (remaining.length === 0 && savedCount > 0) {
    setVoiceStatus(t('voice_saved_all', savedCount), 'success');
    toast(t('voice_saved_all', savedCount), 'success');
    setVoiceTranscript('');
    state.voiceTranscript = '';
  } else if (savedCount > 0) {
    const message = t('voice_partial_saved', savedCount, remaining.length);
    setVoiceStatus(firstError ? `${message} ${firstError.message}` : message, 'error');
    toast(message, 'error');
  } else if (firstError) {
    setVoiceStatus(firstError.message, 'error');
    toast(firstError.message, 'error');
  }

  saveBtn.disabled = false;
  saveBtn.textContent = t('voice_save_all');
}

function processVoiceResult(text) {
  state.voiceTranscript = String(text || '').trim();
  setVoiceTranscript(state.voiceTranscript);

  const drafts = parseVoiceExpenseBatch(state.voiceTranscript);
  if (!drafts.length) {
    setVoiceStatus(t('voice_no_match'), 'error');
    return;
  }

  state.voiceDrafts = drafts;
  renderVoiceDrafts();
  setVoiceStatus(t('voice_drafts_ready', drafts.length), 'success');
  toast(t('voice_drafts_ready', drafts.length), 'success');
}

function initVoiceInput() {
  const voiceBtn = document.getElementById('voice-btn');

  if (!voiceBtn) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    voiceBtn.addEventListener('click', () => toast(t('voice_not_supported'), 'error'));
    return;
  }

  let isListening = false;
  let recognition = null;
  let maxTimer = null;
  let gotResult = false;
  let listenStartTime = 0;

  function stopListening() {
    isListening = false;
    if (maxTimer) { clearTimeout(maxTimer); maxTimer = null; }
    voiceBtn.classList.remove('listening');
    if (recognition) { try { recognition.stop(); } catch {} }
    recognition = null;
  }

  function startRecognition() {
    recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const text = result[0].transcript;
      gotResult = true;
      setVoiceTranscript(text);

      if (result.isFinal) {
        stopListening();
        processVoiceResult(text);
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech' || event.error === 'aborted' || event.error === 'audio-capture') {
        return;
      }
      const elapsed = Date.now() - listenStartTime;
      if (elapsed < 3000) {
        return;
      }
      stopListening();
      setVoiceStatus(t('voice_no_match'), 'error');
    };

    recognition.onend = () => {
      if (!isListening) return;
      try {
        recognition.start();
      } catch {
        const elapsed = Date.now() - listenStartTime;
        if (elapsed < 3000 && !gotResult) {
          setTimeout(() => {
            if (!isListening) return;
            try { startRecognition(); } catch { stopListening(); }
          }, 300);
        } else {
          stopListening();
        }
      }
    };

    recognition.start();
  }

  voiceBtn.addEventListener('click', () => {
    if (isListening) {
      stopListening();
      return;
    }

    isListening = true;
    listenStartTime = Date.now();
    voiceBtn.classList.add('listening');
    setVoiceStatus(t('voice_listening'));
    setVoiceTranscript('');

    gotResult = false;

    maxTimer = setTimeout(() => {
      if (isListening) {
        stopListening();
        if (!gotResult) {
          setVoiceStatus(t('voice_no_match'), 'error');
        }
      }
    }, 15000);

    startRecognition();
  });
}

// ── Init ───────────────────────────────────────────────────────────────────
async function init() {
  initTheme();

  // Restore user from sessionStorage to avoid re-auth on refresh.
  // The HttpOnly session cookie will still be validated server-side on every API call.
  const cachedUser = sessionStorage.getItem('user');
  if (cachedUser) {
    try {
      state.user = JSON.parse(cachedUser);
    } catch {
      sessionStorage.removeItem('user');
    }
  }

  if (state.user) {
    // Validate session is still alive by hitting a protected endpoint
    try {
      const famData = await api('/api/family');
      if (famData.family) {
        state.family = famData.family;
        updateCurrencyFormatter(famData.family.currency || 'VND');
      }
      showApp();
      applyLanguage();
    } catch (err) {
      // Session expired or invalid
      state.user = null;
      sessionStorage.removeItem('user');
      showLogin();
      initGoogleSignIn();
    }
  } else {
    showLogin();
    initGoogleSignIn();
  }
}

function initGoogleSignIn() {
  const clientId = window.GOOGLE_CLIENT_ID || '';
  if (!clientId) {
    document.getElementById('google-signin-btn').innerHTML =
      '<p style="color:var(--danger);font-size:0.85rem;padding:1rem 0">Google Client ID not configured.<br>See README for setup instructions.</p>';
    return;
  }

  if (typeof google === 'undefined' || !google.accounts) {
    // GSI library not loaded yet — retry
    setTimeout(initGoogleSignIn, 300);
    return;
  }

  google.accounts.id.initialize({
    client_id: clientId,
    callback: handleGoogleCredential,
    auto_select: false,
  });

  google.accounts.id.renderButton(
    document.getElementById('google-signin-btn'),
    { theme: 'outline', size: 'large', text: 'signin_with', shape: 'rectangular', width: 280 }
  );
}

// ── Event listeners ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('hashchange', applyRoute);

  initAuthTabs();
  initKeyboardAwareUI();
  initHistoryFiltersUI();
  registerServiceWorker();

  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.view));
  });

  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('lang-toggle').addEventListener('click', () => {
    setLang(currentLang === 'vi' ? 'en' : 'vi');
    // Re-render current view to apply translations
    applyRoute();
  });
  document.getElementById('logout-btn').addEventListener('click', logout);

  // View mode toggle
  document.querySelectorAll('.view-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.viewMode = btn.dataset.mode;
      // Initialize date state for new mode if needed
      const now = new Date();
      if (state.viewMode === 'day' && !state.currentDay) {
        state.currentDay = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
      } else if (state.viewMode === 'year' && !state.currentYear) {
        state.currentYear = now.getFullYear();
      }
      loadDashboard();
    });
  });

  // Period navigation on dashboard
  document.getElementById('prev-month').addEventListener('click', () => {
    const mode = state.viewMode || 'month';
    if (mode === 'day') {
      if (!state.currentDay) return;
      const d = new Date(state.currentDay.year, state.currentDay.month - 1, state.currentDay.day - 1);
      state.currentDay = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    } else if (mode === 'year') {
      if (!state.currentYear) return;
      state.currentYear--;
    } else {
      if (!state.currentMonth) return;
      let { year, month } = state.currentMonth;
      month--;
      if (month < 1) { month = 12; year--; }
      state.currentMonth = { year, month };
    }
    loadDashboard();
  });

  document.getElementById('next-month').addEventListener('click', () => {
    if (isAtCurrentPeriod()) return;
    const mode = state.viewMode || 'month';
    if (mode === 'day') {
      const d = new Date(state.currentDay.year, state.currentDay.month - 1, state.currentDay.day + 1);
      state.currentDay = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    } else if (mode === 'year') {
      state.currentYear++;
    } else {
      let { year, month } = state.currentMonth;
      month++;
      if (month > 12) { month = 1; year++; }
      state.currentMonth = { year, month };
    }
    loadDashboard();
  });

  // AI Extract from image
  document.getElementById('ai-extract-btn').addEventListener('click', () => {
    document.getElementById('ai-extract-file').click();
  });
  document.getElementById('ai-extract-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleAIExtract(file);
    e.target.value = ''; // reset so same file can be selected again
  });

  // Add expense form submit
  document.getElementById('add-expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('add-expense-btn');
    btn.disabled = true;
    btn.textContent = t('adding');

    const amount = getAmountInputValue(document.getElementById('exp-amount'));
    const description = document.getElementById('exp-desc').value.trim();
    const category_id = document.getElementById('exp-category').value;
    const expense_date = document.getElementById('exp-date').value;

    try {
      await api('/api/expenses', {
        method: 'POST',
        body: JSON.stringify({ amount, description, category_id, expense_date }),
      });
      toast(t('expense_added'), 'success');
      document.getElementById('add-expense-form').reset();
      document.getElementById('exp-date').value = todayISO();
      document.getElementById('exp-amount-preview').textContent = '';
      navigate('dashboard');
    } catch (err) {
      toast(t('failed', err.message), 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = t('add_expense_btn');
    }
  });

  // Live formatting + currency preview while typing amount
  document.getElementById('exp-amount').addEventListener('input', (e) => {
    formatAmountInput(e.target);
    const val = getAmountInputValue(e.target);
    document.getElementById('exp-amount-preview').textContent = val > 0 ? formatMoneyReadable(val) : '';
  });

  // Amount shortcut buttons
  document.querySelectorAll('.amt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const amtInput = document.getElementById('exp-amount');
      const appendVal = btn.dataset.append;
      const setVal = btn.dataset.set;
      if (appendVal) {
        const current = getAmountInputValue(amtInput) || 0;
        const raw = current.toString() + appendVal;
        setAmountInputValue(amtInput, parseInt(raw, 10));
      } else if (setVal) {
        setAmountInputValue(amtInput, parseInt(setVal, 10));
      }
      amtInput.focus();
    });
  });

  // Add custom category
  document.getElementById('add-cat-btn').addEventListener('click', async () => {
    const name = document.getElementById('new-cat-name').value.trim();
    const icon = document.getElementById('new-cat-icon').value.trim() || '📦';
    if (!name) { toast(t('category_name_required'), 'error'); return; }
    try {
      await api('/api/categories', {
        method: 'POST',
        body: JSON.stringify({ name, icon }),
      });
      document.getElementById('new-cat-name').value = '';
      document.getElementById('new-cat-icon').value = '';
      await loadCategories();
      populateCategorySelects();
      toast(t('category_added'), 'success');
    } catch (err) {
      toast(t('failed', err.message), 'error');
    }
  });

  // Create family
  document.getElementById('create-family-btn').addEventListener('click', async () => {
    const name = document.getElementById('new-family-name').value.trim();
    if (!name) { toast(t('family_name_required'), 'error'); return; }
    try {
      await api('/api/family', {
        method: 'POST',
        body: JSON.stringify({ name }),
      });
      toast(t('family_created'), 'success');
      await loadFamily();
    } catch (err) {
      toast(t('failed', err.message), 'error');
    }
  });

  // Invite member
  document.getElementById('invite-btn').addEventListener('click', async () => {
    const email = document.getElementById('invite-email').value.trim();
    if (!email) { toast(t('email_required'), 'error'); return; }
    try {
      const inviteRes = await api('/api/family', {
        method: 'PUT',
        body: JSON.stringify({ action: 'invite', email }),
      });
      document.getElementById('invite-email').value = '';
      if (inviteRes.invite_link) {
        await navigator.clipboard.writeText(inviteRes.invite_link).catch(() => {});
        toast(t('invite_link_copied'), 'success');
      } else if (inviteRes.email_sent) {
        toast(t('invite_sent'), 'success');
      } else {
        toast(t('invite_no_email', inviteRes.app_url), 'info');
      }
      await loadFamily();
    } catch (err) {
      toast(t('failed', err.message), 'error');
    }
  });

  // Leave family
  document.getElementById('leave-family-btn').addEventListener('click', async () => {
    if (!confirm(t('leave_family_confirm'))) return;
    try {
      await api('/api/family', {
        method: 'PUT',
        body: JSON.stringify({ action: 'leave' }),
      });
      state.family = null;
      toast(t('left_family'), 'info');
      await loadFamily();
    } catch (err) {
      toast(t('failed', err.message), 'error');
    }
  });

  // History filters
  document.getElementById('filter-apply').addEventListener('click', () => loadHistory(true));
  document.getElementById('filter-reset').addEventListener('click', () => {
    document.getElementById('filter-from').value = '';
    document.getElementById('filter-to').value = '';
    document.getElementById('filter-category').value = '';
    document.getElementById('filter-person').value = '';
    loadHistory(true);
  });
  document.getElementById('load-more-btn').addEventListener('click', () => loadHistory(false));
  document.getElementById('export-excel-btn').addEventListener('click', exportToExcel);

  // Chart granularity toggle
  document.querySelectorAll('.chart-gran-btn').forEach(btn => {
    btn.addEventListener('click', () => updateChartWithGranularity(btn.dataset.gran));
  });

  // Enter key shortcuts
  document.getElementById('invite-email').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('invite-btn').click();
  });
  document.getElementById('new-cat-name').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('add-cat-btn').click();
  });
  document.getElementById('new-family-name').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('create-family-btn').click();
  });
  document.getElementById('onboarding-add-btn').addEventListener('click', () => navigate('add-expense'));
  document.getElementById('onboarding-voice-btn').addEventListener('click', () => {
    navigate('add-expense');
    setTimeout(() => {
      const voiceBtn = document.getElementById('voice-btn');
      voiceBtn?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      voiceBtn?.focus();
    }, 120);
  });
  document.getElementById('save-recurring-btn').addEventListener('click', async () => {
    const btn = document.getElementById('save-recurring-btn');
    const description = document.getElementById('recurring-desc').value.trim();
    const amount = Number(document.getElementById('recurring-amount').value);
    const categoryId = document.getElementById('recurring-category').value;
    const cadence = document.getElementById('recurring-cadence').value;
    const nextDueDate = document.getElementById('recurring-next-due').value;

    if (!description || !amount || !categoryId || !nextDueDate) {
      toast(t('recurring_invalid'), 'error');
      return;
    }

    btn.disabled = true;
    btn.textContent = t('recurring_saving');
    try {
      await api('/api/recurring', {
        method: 'POST',
        body: JSON.stringify({
          description,
          amount,
          category_id: categoryId,
          cadence,
          next_due_date: nextDueDate,
        }),
      });
      document.getElementById('recurring-desc').value = '';
      document.getElementById('recurring-amount').value = '';
      document.getElementById('recurring-category').value = '';
      document.getElementById('recurring-cadence').value = 'monthly';
      document.getElementById('recurring-next-due').value = todayISO();
      toast(t('recurring_saved'), 'success');
      await loadRecurring();
    } catch (err) {
      toast(t('failed', err.message), 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = t('recurring_save');
    }
  });

  // Profile & password
  document.getElementById('change-password-btn').addEventListener('click', handleChangePassword);

  // AI settings & analysis
  initAISettingsUI();
  initVoiceInput();
  document.getElementById('voice-save-btn').addEventListener('click', saveVoiceDrafts);
  document.getElementById('voice-cancel-btn').addEventListener('click', () => {
    resetVoiceDrafts();
    toast(t('voice_cancelled'), 'info');
  });
  document.getElementById('save-ai-settings-btn').addEventListener('click', handleSaveAISettings);
  document.getElementById('ai-fab').addEventListener('click', openAIModal);
  document.getElementById('ai-modal-close').addEventListener('click', closeAIModal);
  document.getElementById('ai-modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeAIModal();
  });
  document.getElementById('ai-analyze-btn').addEventListener('click', () => runAIAnalysis());
  document.getElementById('ai-analyze-btn2').addEventListener('click', () => {
    const q = document.getElementById('ai-question').value.trim();
    runAIAnalysis(q || null);
  });
  document.getElementById('ai-question').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('ai-analyze-btn2').click();
  });
  checkAIConfigured();

  init();
});
