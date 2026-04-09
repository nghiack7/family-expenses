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
    login_title: 'Chi tiêu gia đình',
    login_subtitle: 'Quản lý chi tiêu, biết tiền đi đâu mỗi ngày.',
    or_continue_email: 'hoặc đăng nhập bằng email',
    full_name: 'Họ và tên',
    username: 'Tên đăng nhập',
    username_optional: '(không bắt buộc)',
    email: 'Email',
    email_or_username: 'Email hoặc tên đăng nhập',
    password: 'Mật khẩu',
    password_placeholder: 'Ít nhất 8 ký tự',
    sign_in: 'Đăng nhập',
    create_account: 'Tạo tài khoản',
    no_account: 'Chưa có tài khoản? Đăng ký',
    have_account: 'Đã có tài khoản? Đăng nhập',
    currency_hint: 'Tiền tệ có thể cài đặt trong Cài đặt gia đình',
    creating_account: 'Đang tạo tài khoản...',
    signing_in: 'Đang đăng nhập...',

    // Dashboard
    total_this_month: 'Tổng tháng này',
    daily_average: 'Trung bình ngày',
    biggest_category: 'Danh mục lớn nhất',
    expenses_count: '{0} khoản chi',
    days_with_spending: '{0} ngày có chi tiêu',
    no_expenses_yet: 'Chưa có chi tiêu',
    daily_spending: 'Chi tiêu hàng ngày',
    by_category: 'Theo danh mục',
    by_person: 'Theo thành viên',
    recent_expenses: 'Chi tiêu gần đây',
    see_all: 'Xem tất cả',
    vs_last_month: 'so với tháng trước',
    same_as_last_month: 'Bằng tháng trước',
    no_spending_yet: 'Chưa có chi tiêu',
    add_first_expense_breakdown: 'Thêm khoản chi đầu tiên để xem biểu đồ',
    no_members_yet: 'Chưa có thành viên',
    no_family_yet: 'Chưa có gia đình',
    go_family_settings: 'Vào <a href="#family">Cài đặt gia đình</a> để tạo hoặc tham gia',

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

    // History
    expense_history: 'Lịch sử chi tiêu',
    all_categories: 'Tất cả danh mục',
    all_members: 'Tất cả thành viên',
    filter: 'Lọc',
    load_more: 'Xem thêm',
    no_expenses: 'Không có chi tiêu',
    add_first_expense: 'Thêm khoản chi đầu tiên!',
    delete_expense_confirm: 'Xóa khoản chi tiêu này?',
    expense_deleted: 'Đã xóa chi tiêu',
    edit_expense: 'Sửa chi tiêu',
    expense_updated: 'Đã cập nhật chi tiêu!',

    // Family
    family_settings: 'Cài đặt gia đình',
    your_profile: 'Hồ sơ của bạn',
    display_name: 'Tên hiển thị',
    username_hint: '3-30 ký tự, chữ cái, số, gạch dưới',
    username_saved: 'Đã lưu tên đăng nhập!',
    username_cleared: 'Đã xóa tên đăng nhập',
    username_invalid: 'Tên đăng nhập phải 3-30 ký tự, chỉ chữ/số/gạch dưới',
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
    create_family_title: 'Tạo nhóm gia đình',
    create_family_desc: 'Thiết lập gia đình để theo dõi chi tiêu chung.',
    family_name_placeholder: 'Tên gia đình, vd: Nhà Nguyễn',
    create: 'Tạo',
    family_name_required: 'Cần nhập tên gia đình',
    family_created: 'Đã tạo gia đình!',
    members: 'Thành viên',
    invite_by_gmail: 'Mời qua Gmail',
    invite_placeholder: 'ban@gmail.com',
    invite: 'Mời',
    pending_invites: 'Lời mời đang chờ',
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

    // AI
    ai_settings: 'Cài đặt AI phân tích',
    provider: 'Nhà cung cấp',
    model: 'Mô hình',
    api_key: 'API Key',
    api_key_placeholder: 'Dán API key của bạn ở đây',
    api_key_hint: 'Chỉ lưu trên thiết bị. Không gửi đến máy chủ.',
    monthly_income: 'Thu nhập hàng tháng (tùy chọn)',
    current_savings: 'Tiết kiệm hiện tại (tùy chọn)',
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
    ai_empty_hint: 'Đặt câu hỏi hoặc bấm <strong>Phân tích</strong> để xem đánh giá chi tiêu',
    ai_question_placeholder: 'vd: "Với 30 triệu thu nhập, tôi chi tiêu quá nhiều không?"',
    ai_healthy: 'Tốt',
    ai_fair: 'Khá',
    ai_needs_attention: 'Cần chú ý',
    key_insights: 'Nhận xét chính',
    tips: 'Gợi ý',
    voice_input: 'Nhập bằng giọng nói',
    voice_listening: 'Đang nghe...',
    voice_processing: 'Đang xử lý...',
    voice_not_supported: 'Trình duyệt không hỗ trợ nhận diện giọng nói',
    voice_no_match: 'Không nhận ra. Thử nói: "đi uống cafe hết 50k"',
    voice_filled: 'Đã điền! Kiểm tra và bấm Thêm chi tiêu.',
    voice_example: 'vd: "đi uống cafe hết 50 nghìn"',

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
    dashboard: 'Dashboard',
    add: 'Add',
    history: 'History',
    family: 'Family',
    sign_out: 'Sign out',
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
    sign_in: 'Sign In',
    create_account: 'Create Account',
    no_account: "Don't have an account? Register",
    have_account: 'Already have an account? Sign In',
    currency_hint: 'Currency can be set in Family Settings',
    creating_account: 'Creating account...',
    signing_in: 'Signing in...',
    total_this_month: 'Total this month',
    daily_average: 'Daily average',
    biggest_category: 'Biggest category',
    expenses_count: '{0} expenses',
    days_with_spending: '{0} days with spending',
    no_expenses_yet: 'No expenses yet',
    daily_spending: 'Daily spending',
    by_category: 'By category',
    by_person: 'By person',
    recent_expenses: 'Recent expenses',
    see_all: 'See all',
    vs_last_month: 'vs last month',
    same_as_last_month: 'Same as last month',
    no_spending_yet: 'No spending yet',
    add_first_expense_breakdown: 'Add your first expense to see breakdown',
    no_members_yet: 'No members yet',
    no_family_yet: 'No family yet',
    go_family_settings: 'Go to <a href="#family">Family settings</a> to create or join one',
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
    expense_history: 'Expense History',
    all_categories: 'All categories',
    all_members: 'All members',
    filter: 'Filter',
    load_more: 'Load more',
    no_expenses: 'No expenses',
    add_first_expense: 'Add your first expense!',
    delete_expense_confirm: 'Delete this expense?',
    expense_deleted: 'Expense deleted',
    edit_expense: 'Edit Expense',
    expense_updated: 'Expense updated!',
    family_settings: 'Family Settings',
    your_profile: 'Your Profile',
    display_name: 'Display Name',
    username_hint: '3-30 characters, letters, numbers, underscores only',
    username_saved: 'Username saved!',
    username_cleared: 'Username cleared',
    username_invalid: 'Username must be 3-30 chars, letters/numbers/underscores only',
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
    create_family_title: 'Create your family group',
    create_family_desc: 'Set up a family to track shared expenses together.',
    family_name_placeholder: "Family name, e.g. The Nguyens",
    create: 'Create',
    family_name_required: 'Family name required',
    family_created: 'Family created!',
    members: 'Members',
    invite_by_gmail: 'Invite by Gmail',
    invite_placeholder: 'friend@gmail.com',
    invite: 'Invite',
    pending_invites: 'Pending invites',
    pending: 'Pending',
    invite_cancelled: 'Invite cancelled',
    email_required: 'Email required',
    invite_sent: "Invite email sent! They'll join automatically on sign-in.",
    invite_no_email: "Invited! Email couldn't be sent — share this link: {0}",
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
    ai_settings: 'AI Analysis Settings',
    provider: 'Provider',
    model: 'Model',
    api_key: 'API Key',
    api_key_placeholder: 'Paste your API key here',
    api_key_hint: 'Stored locally on your device only. Never sent to our server for storage.',
    monthly_income: 'Monthly Income (optional)',
    current_savings: 'Current Savings (optional)',
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
    ai_empty_hint: 'Ask a question or click <strong>Analyze</strong> for a spending review',
    ai_question_placeholder: "e.g. 'With 30M income, am I spending too much?'",
    ai_healthy: 'Healthy',
    ai_fair: 'Fair',
    ai_needs_attention: 'Needs Attention',
    key_insights: 'Key Insights',
    tips: 'Tips',
    voice_input: 'Voice input',
    voice_listening: 'Listening...',
    voice_processing: 'Processing...',
    voice_not_supported: 'Browser does not support speech recognition',
    voice_no_match: 'Could not understand. Try: "coffee 50k"',
    voice_filled: 'Filled! Review and tap Add Expense.',
    voice_example: 'e.g. "lunch at Pho 24, 50k"',
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

  // Update month label format
  if (state.currentMonth) {
    document.getElementById('month-label').textContent = monthLabel(state.currentMonth.year, state.currentMonth.month);
  }

  // Update lang toggle button text
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.textContent = currentLang === 'vi' ? 'EN' : 'VI';
}

// ── State ──────────────────────────────────────────────────────────────────
const state = {
  user: null,         // { sub, email, name, avatar }
  family: null,       // family object from API
  categories: [],     // flat list
  currentMonth: null, // { year, month }
  stats: null,        // last fetched stats
  historyOffset: 0,
  historyTotal: 0,
  currency: 'VND',   // family currency
};

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

// ── Routing ────────────────────────────────────────────────────────────────
const VIEWS = ['dashboard', 'add-expense', 'history', 'family'];

function navigate(view) {
  if (!VIEWS.includes(view)) view = 'dashboard';
  window.location.hash = view;
}

function applyRoute() {
  const hash = window.location.hash.replace('#', '') || 'dashboard';
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
}

// ── Auth ───────────────────────────────────────────────────────────────────
function showLogin() {
  document.getElementById('login-page').style.display = 'flex';
  document.getElementById('app-shell').style.display = 'none';
  applyLanguage();
}

function showApp() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('app-shell').style.display = 'flex';
  document.getElementById('app-shell').style.flexDirection = 'column';
  renderNavUser();
  applyLanguage();
  applyRoute();
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

// Expose to global scope so GSI data-callback attribute can reach it
if (typeof window !== 'undefined') window.handleGoogleCredential = handleGoogleCredential;

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

  toggleBtn.addEventListener('click', () => {
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

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = theme === 'dark'
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ── Dashboard ──────────────────────────────────────────────────────────────
async function loadDashboard() {
  if (!state.currentMonth) {
    const now = new Date();
    state.currentMonth = { year: now.getFullYear(), month: now.getMonth() + 1 };
  }

  document.getElementById('month-label').textContent = monthLabel(
    state.currentMonth.year, state.currentMonth.month
  );

  const now = new Date();
  const isCurrentMonth =
    state.currentMonth.year === now.getFullYear() &&
    state.currentMonth.month === now.getMonth() + 1;
  document.getElementById('next-month').disabled = isCurrentMonth;

  try {
    const monthParam = `${state.currentMonth.year}-${String(state.currentMonth.month).padStart(2, '0')}`;
    state.stats = await api(`/api/stats?month=${monthParam}`);
    renderStats(state.stats);

    const from = `${state.currentMonth.year}-${String(state.currentMonth.month).padStart(2, '0')}-01`;
    const lastDay = new Date(state.currentMonth.year, state.currentMonth.month, 0).getDate();
    const to = `${state.currentMonth.year}-${String(state.currentMonth.month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
    const expData = await api(`/api/expenses?from=${from}&to=${to}&limit=10`);
    renderExpenseList(document.getElementById('recent-expenses'), expData.expenses);
  } catch (err) {
    if (err.message.includes('Not in a family')) {
      renderNeedFamily('recent-expenses');
      renderNeedFamily('category-bars');
    } else {
      toast(t('failed_load_dashboard', err.message), 'error');
    }
  }
}

function renderStats(s) {
  document.getElementById('stat-total').textContent = formatMoney(s.total);
  document.getElementById('stat-count').textContent = t('expenses_count', s.count);

  const changeEl = document.getElementById('stat-change');
  if (s.prev_total > 0) {
    const pct = ((s.total - s.prev_total) / s.prev_total * 100).toFixed(0);
    if (pct > 0) {
      changeEl.textContent = '▲ ' + pct + '% ' + t('vs_last_month');
      changeEl.className = 'stat-change up';
    } else if (pct < 0) {
      changeEl.textContent = '▼ ' + Math.abs(pct) + '% ' + t('vs_last_month');
      changeEl.className = 'stat-change down';
    } else {
      changeEl.textContent = t('same_as_last_month');
      changeEl.className = 'stat-change neutral';
    }
  } else {
    changeEl.textContent = '';
  }

  // Daily average across days that had spending
  const daysWithSpend = s.daily ? s.daily.length : 0;
  const avg = daysWithSpend > 0 ? s.total / daysWithSpend : 0;
  document.getElementById('stat-avg').textContent = formatMoney(avg);
  document.getElementById('stat-days').textContent = t('days_with_spending', daysWithSpend);

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

  // Daily bar chart
  if (s.daily && s.daily.length > 0) {
    document.getElementById('daily-chart-card').style.display = 'block';
    drawDailyBarChart('daily-chart', s.daily);
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
  if (state.currentMonth) {
    const monthParam = `${state.currentMonth.year}-${String(state.currentMonth.month).padStart(2, '0')}`;
    api(`/api/stats?month=${monthParam}`)
      .then(s => { state.stats = s; renderStats(s); })
      .catch(() => {});
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
}

async function loadCategories() {
  try {
    const data = await api('/api/categories');
    state.categories = data.categories || [];
    renderCustomCategoriesList();
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
      <button class="btn btn-icon btn-sm delete-cat" data-id="${escHtml(c.id)}" title="Delete category">🗑</button>
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
  if (reset) {
    state.historyOffset = 0;
    state.historyTotal = 0;
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
  } catch (err) {
    if (err.message.includes('Not in a family')) {
      renderNeedFamily('history-list');
    } else {
      toast(t('failed_load_history', err.message), 'error');
    }
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
}

// ── Family ─────────────────────────────────────────────────────────────────
async function loadFamily() {
  const noFam = document.getElementById('no-family-setup');
  const hasFam = document.getElementById('has-family');

  try {
    const data = await api('/api/family');
    state.family = data.family;

    if (!state.family) {
      noFam.style.display = 'block';
      hasFam.style.display = 'none';
      return;
    }

    noFam.style.display = 'none';
    hasFam.style.display = 'block';

    // Apply family currency
    updateCurrencyFormatter(state.family.currency || 'VND');
    renderCurrencyUI();

    document.getElementById('family-name-heading').textContent = state.family.name;

    const myRole = (state.family.members || []).find(m => m.id === state.user.sub)?.role || 'member';
    const roleBadge = document.getElementById('my-role-badge');
    roleBadge.textContent = myRole;
    roleBadge.className = `role-badge ${myRole}`;

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
          <span class="role-badge ${escHtml(m.role)}">${escHtml(m.role)}</span>
        </div>`;
    }).join('');

    const pendingInvites = state.family.pending_invites || [];
    const pendingSection = document.getElementById('pending-invites-section');
    const pendingList = document.getElementById('pending-invites-list');

    if (pendingInvites.length > 0) {
      pendingSection.style.display = 'block';
      pendingList.innerHTML = pendingInvites.map(inv =>
        `<div class="invite-item">
          <div>
            <div class="invite-email">${escHtml(inv.email)}</div>
            <div class="invite-status">${t('pending')}</div>
          </div>
          <button class="btn btn-icon btn-sm cancel-invite" data-id="${escHtml(inv.id)}" title="Cancel invite">✕</button>
        </div>`
      ).join('');

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
    if (state.currentMonth) loadDashboard();
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

  // Username
  const usernameInput = document.getElementById('profile-username');
  const saveUsernameBtn = document.getElementById('save-username-btn');
  const usernameHint = document.getElementById('username-hint');
  if (usernameInput) {
    usernameInput.value = state.user.username || '';
    saveUsernameBtn.onclick = async () => {
      const val = usernameInput.value.trim();
      if (val && (val.length < 3 || val.length > 30 || !/^[a-zA-Z0-9_]+$/.test(val))) {
        toast(t('username_invalid'), 'error');
        return;
      }
      saveUsernameBtn.disabled = true;
      saveUsernameBtn.textContent = t('saving');
      try {
        await api('/api/auth', {
          method: 'PUT',
          body: JSON.stringify({ action: 'update_username', username: val }),
        });
        state.user.username = val || null;
        sessionStorage.setItem('user', JSON.stringify(state.user));
        usernameHint.textContent = val ? t('username_saved') : t('username_cleared');
        usernameHint.style.color = 'var(--success)';
        toast(val ? t('username_saved') : t('username_cleared'), 'success');
      } catch (err) {
        toast(t('failed', err.message), 'error');
      } finally {
        saveUsernameBtn.disabled = false;
        saveUsernameBtn.textContent = t('save');
      }
    };
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
};

function getAISettings() {
  try {
    return JSON.parse(localStorage.getItem('ai_settings') || '{}');
  } catch { return {}; }
}

function saveAISettings(settings) {
  localStorage.setItem('ai_settings', JSON.stringify(settings));
}

function initAISettingsUI() {
  const providerSel = document.getElementById('ai-provider');
  const modelSel = document.getElementById('ai-model');
  if (!providerSel || !modelSel) return;

  function populateModels() {
    const provider = providerSel.value;
    const models = AI_MODELS[provider] || [];
    const saved = getAISettings();
    modelSel.innerHTML = models.map(m =>
      `<option value="${m}" ${m === saved.model ? 'selected' : ''}>${m}</option>`
    ).join('');
  }

  providerSel.addEventListener('change', populateModels);

  // Restore saved settings
  const saved = getAISettings();
  if (saved.provider) providerSel.value = saved.provider;
  populateModels();
  if (saved.model) modelSel.value = saved.model;
  if (saved.apiKey) document.getElementById('ai-api-key').value = saved.apiKey;
  if (saved.income) document.getElementById('ai-income').value = saved.income;
  if (saved.savings) document.getElementById('ai-savings').value = saved.savings;
}

function handleSaveAISettings() {
  const settings = {
    provider: document.getElementById('ai-provider').value,
    model: document.getElementById('ai-model').value,
    apiKey: document.getElementById('ai-api-key').value.trim(),
    income: document.getElementById('ai-income').value || '',
    savings: document.getElementById('ai-savings').value || '',
  };
  if (!settings.apiKey) { toast(t('api_key_required'), 'error'); return; }
  saveAISettings(settings);
  toast(t('ai_settings_saved'), 'success');
  // Show the AI FAB
  const fab = document.getElementById('ai-fab');
  if (fab) fab.style.display = 'flex';
}

function checkAIConfigured() {
  const fab = document.getElementById('ai-fab');
  if (fab) fab.style.display = 'flex';
}

function openAIModal() {
  document.getElementById('ai-modal-overlay').classList.add('open');
  document.getElementById('ai-question').focus();
}

function closeAIModal() {
  document.getElementById('ai-modal-overlay').classList.remove('open');
}

async function runAIAnalysis(customQuestion) {
  const settings = getAISettings();
  if (!settings.apiKey || !settings.provider || !settings.model) {
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
    const ml = state.currentMonth
      ? monthLabel(state.currentMonth.year, state.currentMonth.month)
      : 'this month';

    const res = await api('/api/ai-analyze', {
      method: 'POST',
      body: JSON.stringify({
        provider: settings.provider,
        model: settings.model,
        apiKey: settings.apiKey,
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

function drawDailyBarChart(canvasId, dailyData) {
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

    // Date label (show every few days to avoid overlap)
    const showLabel = dailyData.length <= 15 || i % Math.ceil(dailyData.length / 10) === 0 || i === dailyData.length - 1;
    if (showLabel && d.expense_date) {
      const day = d.expense_date.split('-')[2];
      ctx.fillStyle = textColor;
      ctx.font = '10px "Nunito Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(day, x + barW / 2, padTop + chartH + 6);
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
  food: ['ăn', 'an', 'cơm', 'com', 'phở', 'pho', 'bún', 'bun', 'bánh', 'banh', 'uống', 'uong', 'cafe', 'cà phê', 'ca phe', 'trà', 'tra', 'bia', 'nhậu', 'nhau', 'lunch', 'dinner', 'breakfast', 'food', 'drink', 'coffee', 'rau', 'thịt', 'thit', 'trái cây', 'trai cay', 'chợ', 'cho', 'siêu thị', 'sieu thi'],
  transport: ['xăng', 'xang', 'grab', 'taxi', 'xe', 'đổ xăng', 'do xang', 'gửi xe', 'gui xe', 'parking', 'gas', 'fuel', 'bus', 'vé', 've'],
  shopping: ['mua', 'shopping', 'quần', 'quan', 'áo', 'ao', 'giày', 'giay', 'dép', 'dep', 'clothes', 'shoes', 'máy giặt', 'may giat', 'tủ lạnh', 'tu lanh', 'máy', 'may', 'điện thoại', 'dien thoai', 'laptop', 'iphone', 'samsung'],
  health: ['thuốc', 'thuoc', 'bệnh viện', 'benh vien', 'khám', 'kham', 'doctor', 'medicine', 'hospital', 'pharmacy'],
  education: ['học', 'hoc', 'sách', 'sach', 'khóa', 'khoa', 'course', 'book', 'school', 'tuition'],
  entertainment: ['phim', 'game', 'chơi', 'choi', 'karaoke', 'movie', 'cinema', 'giải trí', 'giai tri'],
  bills: ['điện', 'dien', 'nước', 'nuoc', 'wifi', 'internet', 'bill', 'tiền nhà', 'tien nha', 'thuê', 'thue', 'rent'],
  other: [],
};

function parseVoiceExpense(text) {
  let lower = text.toLowerCase().trim();

  // Normalize: convert written numbers to digits
  const wordToNum = {
    'không': '0', 'một': '1', 'hai': '2', 'ba': '3', 'bốn': '4', 'bón': '4',
    'năm': '5', 'nam': '5', 'sáu': '6', 'sau': '6', 'bảy': '7', 'bay': '7',
    'tám': '8', 'tam': '8', 'chín': '9', 'chin': '9',
    'mười': '10', 'muoi': '10', 'mươi': '10', 'muoi': '10',
  };

  // Handle "mười X" → 1X, "X mươi" → X0
  lower = lower.replace(/(?:mười|muời|muoi)\s*(một|hai|ba|bốn|bón|năm|nam|sáu|sau|bảy|bay|tám|tam|chín|chin)/gi, (_, d) => '1' + wordToNum[d.toLowerCase()]);
  lower = lower.replace(/(một|hai|ba|bốn|bón|năm|nam|sáu|sau|bảy|bay|tám|tam|chín|chin)\s*(?:mươi|muoi)/gi, (_, d) => wordToNum[d.toLowerCase()] + '0');

  // Simple word → digit: "mười" → "10", "một" → "1" etc (only before triệu/nghìn/k)
  for (const [word, digit] of Object.entries(wordToNum)) {
    const re = new RegExp(`\\b${word}\\s*(?=triệu|trieu|tr\\b|nghìn|nghin|ngàn|ngan|k\\b)`, 'gi');
    lower = lower.replace(re, digit + ' ');
  }

  // Normalize "10.000.000" or "10,000,000" → "10000000"
  lower = lower.replace(/(\d{1,3}(?:[.,]\d{3})+)/g, (match) => match.replace(/[.,]/g, ''));

  // Extract amount
  let amount = null;
  let amountMatch = null;

  const patterns = [
    // "1 triệu 5" or "1 triệu rưỡi"
    { re: /(\d+(?:[.,]\d+)?)\s*(?:triệu|trieu|tr)\s*(?:rưỡi|ruoi|ruỡi)/i, fn: m => parseFloat(m[1].replace(',', '.')) * 1000000 + 500000 },
    { re: /(\d+(?:[.,]\d+)?)\s*(?:triệu|trieu|tr)\s*(\d+)/i, fn: m => parseFloat(m[1].replace(',', '.')) * 1000000 + parseFloat(m[2]) * (m[2].length <= 3 ? 1000 : 1) },
    // "1 triệu", "1tr"
    { re: /(\d+(?:[.,]\d+)?)\s*(?:triệu|trieu|tr)\b/i, fn: m => parseFloat(m[1].replace(',', '.')) * 1000000 },
    // "50k", "50K"
    { re: /(\d+(?:[.,]\d+)?)\s*k\b/i, fn: m => parseFloat(m[1].replace(',', '.')) * 1000 },
    // "50 nghìn", "50 ngàn"
    { re: /(\d+(?:[.,]\d+)?)\s*(?:nghìn|nghin|ngàn|ngan)\b/i, fn: m => parseFloat(m[1].replace(',', '.')) * 1000 },
    // "200000" (bare number >= 1000)
    { re: /(\d{4,})/i, fn: m => parseInt(m[1], 10) },
    // Small number that might be spoken as just "10" meaning 10 triệu context-dependent — skip, too ambiguous
  ];

  for (const { re, fn } of patterns) {
    const m = lower.match(re);
    if (m) {
      amount = fn(m);
      amountMatch = m[0];
      break;
    }
  }

  // Extract description — everything except the amount part and filler words
  let desc = lower;
  if (amountMatch) {
    desc = desc.replace(amountMatch, '');
  }
  // Remove filler words
  desc = desc.replace(/\b(hết|het|mất|mat|tốn|ton|khoảng|khoang|là|la|được|duoc|tầm|tam)\b/g, '').trim();
  // Clean up punctuation and extra spaces
  desc = desc.replace(/[,.\-]+/g, ' ').replace(/\s+/g, ' ').trim();
  // Capitalize first letter
  if (desc) desc = desc[0].toUpperCase() + desc.slice(1);

  // Match category
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

  return { amount, description: desc || null, categoryKey: matchedCategory };
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

function processVoiceResult(text, statusEl) {
  const parsed = parseVoiceExpense(text);

  if (parsed.amount) {
    document.getElementById('exp-amount').value = parsed.amount;
    document.getElementById('exp-amount').dispatchEvent(new Event('input'));
  }
  if (parsed.description) {
    document.getElementById('exp-desc').value = parsed.description;
  }
  if (parsed.categoryKey) {
    const catId = findCategoryByKeyword(parsed.categoryKey);
    if (catId) document.getElementById('exp-category').value = catId;
  }
  document.getElementById('exp-date').value = todayISO();

  if (parsed.amount) {
    statusEl.textContent = `${t('voice_filled')} → ${formatMoney(parsed.amount)}`;
    statusEl.classList.add('voice-success');
    toast(t('voice_filled'), 'success');
  } else {
    statusEl.textContent = t('voice_no_match');
    statusEl.classList.add('voice-error');
  }
  setTimeout(() => { statusEl.classList.remove('voice-success', 'voice-error'); }, 3000);
}

function initVoiceInput() {
  const voiceBtn = document.getElementById('voice-btn');
  const statusEl = document.getElementById('voice-status');
  const transcriptEl = document.getElementById('voice-transcript');

  if (!voiceBtn) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    voiceBtn.title = t('voice_not_supported');
    return;
  }

  let isListening = false;
  let recognition = null;

  voiceBtn.addEventListener('click', () => {
    if (isListening) {
      isListening = false;
      recognition.stop();
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let hasResult = false;
    let stopTimeout = null;

    isListening = true;
    voiceBtn.classList.add('listening');
    statusEl.style.display = 'block';
    statusEl.textContent = t('voice_listening');
    transcriptEl.style.display = 'none';

    // Auto-stop after 10 seconds if no final result
    const maxTimeout = setTimeout(() => {
      if (isListening) recognition.stop();
    }, 10000);

    recognition.onresult = (event) => {
      // Reset idle timer on every result
      if (stopTimeout) clearTimeout(stopTimeout);

      let finalText = '';
      let interimText = '';
      for (let i = 0; i < event.results.length; i++) {
        const r = event.results[i];
        if (r.isFinal) {
          finalText += r[0].transcript;
        } else {
          interimText += r[0].transcript;
        }
      }

      const displayText = finalText || interimText;
      transcriptEl.style.display = 'block';
      transcriptEl.textContent = `"${displayText}"`;

      if (finalText) {
        hasResult = true;
        // Wait 1.5s after final result in case user continues speaking
        stopTimeout = setTimeout(() => {
          recognition.stop();
          processVoiceResult(finalText, statusEl);
        }, 1500);
      }
    };

    recognition.onerror = (event) => {
      // Ignore no-speech and aborted — just restart to keep listening
      if (event.error === 'no-speech' || event.error === 'aborted') {
        // Don't show error, will auto-restart in onend
        return;
      }
      clearTimeout(maxTimeout);
      statusEl.textContent = t('voice_no_match');
      statusEl.classList.add('voice-error');
      setTimeout(() => { statusEl.classList.remove('voice-error'); }, 3000);
    };

    recognition.onend = () => {
      // If we got a result and it's being processed, just clean up
      if (hasResult) {
        clearTimeout(maxTimeout);
        isListening = false;
        voiceBtn.classList.remove('listening');
        return;
      }
      // If still within timeout and no result yet, restart recognition
      if (isListening) {
        try {
          recognition.start();
        } catch {
          // Browser may reject rapid restarts
          clearTimeout(maxTimeout);
          isListening = false;
          voiceBtn.classList.remove('listening');
        }
        return;
      }
      clearTimeout(maxTimeout);
      voiceBtn.classList.remove('listening');
    };

    recognition.start();
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

  // Month navigation on dashboard
  document.getElementById('prev-month').addEventListener('click', () => {
    if (!state.currentMonth) return;
    let { year, month } = state.currentMonth;
    month--;
    if (month < 1) { month = 12; year--; }
    state.currentMonth = { year, month };
    loadDashboard();
  });

  document.getElementById('next-month').addEventListener('click', () => {
    if (!state.currentMonth) return;
    let { year, month } = state.currentMonth;
    const now = new Date();
    if (year >= now.getFullYear() && month >= now.getMonth() + 1) return;
    month++;
    if (month > 12) { month = 1; year++; }
    state.currentMonth = { year, month };
    loadDashboard();
  });

  // Add expense form submit
  document.getElementById('add-expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('add-expense-btn');
    btn.disabled = true;
    btn.textContent = t('adding');

    const amount = parseFloat(document.getElementById('exp-amount').value);
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

  // Live currency preview while typing amount
  document.getElementById('exp-amount').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    document.getElementById('exp-amount-preview').textContent = val > 0 ? formatMoney(val) : '';
  });

  // Amount shortcut buttons
  document.querySelectorAll('.amt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const amtInput = document.getElementById('exp-amount');
      const appendVal = btn.dataset.append;
      const setVal = btn.dataset.set;
      if (appendVal) {
        amtInput.value = (amtInput.value || '') + appendVal;
      } else if (setVal) {
        amtInput.value = setVal;
      }
      amtInput.focus();
      amtInput.dispatchEvent(new Event('input'));
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
      if (inviteRes.email_sent) {
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

  // Profile & password
  document.getElementById('change-password-btn').addEventListener('click', handleChangePassword);

  // AI settings & analysis
  initAISettingsUI();
  initVoiceInput();
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
