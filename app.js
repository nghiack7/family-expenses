/**
 * Family Expense Tracker — Frontend SPA
 * Hash routing: #dashboard, #add-expense, #history, #family
 */

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
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return new Date(+y, +m - 1, +d).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
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
}

function showApp() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('app-shell').style.display = 'flex';
  document.getElementById('app-shell').style.flexDirection = 'column';
  renderNavUser();
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
    toast('Welcome, ' + state.user.name + '!', 'success');
  } catch (err) {
    toast('Sign-in failed: ' + err.message, 'error');
  }
}

// Expose to global scope so GSI data-callback attribute can reach it
if (typeof window !== 'undefined') window.handleGoogleCredential = handleGoogleCredential;

// ── Email auth ─────────────────────────────────────────────────────────────
function initAuthTabs() {
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });

  document.getElementById('email-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('email-login-btn');
    const errEl = document.getElementById('email-login-error');
    errEl.style.display = 'none';
    btn.disabled = true;
    btn.textContent = 'Signing in...';
    try {
      const data = await api('/api/auth', {
        method: 'POST',
        body: JSON.stringify({
          action: 'login',
          email: document.getElementById('login-email').value,
          password: document.getElementById('login-password').value,
        }),
      });
      state.user = data.user;
      sessionStorage.setItem('user', JSON.stringify(data.user));
      showApp();
      toast('Welcome back, ' + state.user.name + '!', 'success');
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Sign In';
    }
  });

  document.getElementById('email-register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('email-register-btn');
    const errEl = document.getElementById('email-register-error');
    errEl.style.display = 'none';
    btn.disabled = true;
    btn.textContent = 'Creating account...';
    try {
      const data = await api('/api/auth', {
        method: 'POST',
        body: JSON.stringify({
          action: 'register',
          name: document.getElementById('register-name').value,
          email: document.getElementById('register-email').value,
          password: document.getElementById('register-password').value,
        }),
      });
      state.user = data.user;
      sessionStorage.setItem('user', JSON.stringify(data.user));
      showApp();
      toast('Account created! Welcome, ' + state.user.name + '!', 'success');
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Create Account';
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
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
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
      toast('Failed to load dashboard: ' + err.message, 'error');
    }
  }
}

function renderStats(s) {
  document.getElementById('stat-total').textContent = formatMoney(s.total);
  document.getElementById('stat-count').textContent = `${s.count} expense${s.count !== 1 ? 's' : ''}`;

  const changeEl = document.getElementById('stat-change');
  if (s.prev_total > 0) {
    const pct = ((s.total - s.prev_total) / s.prev_total * 100).toFixed(0);
    if (pct > 0) {
      changeEl.textContent = `▲ ${pct}% vs last month`;
      changeEl.className = 'stat-change up';
    } else if (pct < 0) {
      changeEl.textContent = `▼ ${Math.abs(pct)}% vs last month`;
      changeEl.className = 'stat-change down';
    } else {
      changeEl.textContent = 'Same as last month';
      changeEl.className = 'stat-change neutral';
    }
  } else {
    changeEl.textContent = '';
  }

  // Daily average across days that had spending
  const daysWithSpend = s.daily ? s.daily.length : 0;
  const avg = daysWithSpend > 0 ? s.total / daysWithSpend : 0;
  document.getElementById('stat-avg').textContent = formatMoney(avg);
  document.getElementById('stat-days').textContent = `${daysWithSpend} day${daysWithSpend !== 1 ? 's' : ''} with spending`;

  // Top category
  const topCat = s.by_category && s.by_category.find(c => c.total > 0);
  if (topCat) {
    document.getElementById('stat-top-cat').textContent = `${topCat.icon} ${topCat.name}`;
    const pct = s.total > 0 ? (topCat.total / s.total * 100).toFixed(0) : 0;
    document.getElementById('stat-top-cat-pct').textContent = `${formatMoney(topCat.total)} (${pct}%)`;
  } else {
    document.getElementById('stat-top-cat').textContent = '—';
    document.getElementById('stat-top-cat-pct').textContent = 'No expenses yet';
  }

  // Category bars
  const barsEl = document.getElementById('category-bars');
  const categoriesWithSpend = s.by_category ? s.by_category.filter(c => c.total > 0) : [];
  if (categoriesWithSpend.length === 0) {
    barsEl.innerHTML = `<div class="empty-state"><div class="empty-icon">📊</div><h3>No spending yet</h3><p>Add your first expense to see breakdown</p></div>`;
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
    chipsEl.innerHTML = '<span style="color:var(--text-muted);font-size:0.875rem">No members yet</span>';
  }

  // Daily sparkline
  if (s.daily && s.daily.length > 0) {
    document.getElementById('sparkline-card').style.display = 'block';
    const sparkEl = document.getElementById('sparkline');
    const maxDay = Math.max(...s.daily.map(d => d.total));
    sparkEl.innerHTML = s.daily.map(d => {
      const h = maxDay > 0 ? Math.max(4, (d.total / maxDay * 48)) : 4;
      return `<div class="spark-bar" style="height:${h}px" title="${formatDate(d.expense_date)}: ${formatMoney(d.total)}"></div>`;
    }).join('');
  }
}

function renderNeedFamily(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = `<div class="empty-state"><div class="empty-icon">👨‍👩‍👧‍👦</div><h3>No family yet</h3><p>Go to <a href="#family">Family settings</a> to create or join one</p></div>`;
}

// ── Expense list renderer ──────────────────────────────────────────────────
function renderExpenseList(container, expenses) {
  if (!expenses || expenses.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🧾</div><h3>No expenses</h3><p>Add your first expense!</p></div>`;
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
        <button class="expense-delete" data-id="${escHtml(e.id)}" title="Delete">🗑</button>
      </div>
    </div>`
  ).join('');

  container.querySelectorAll('.expense-delete').forEach(btn => {
    btn.addEventListener('click', async (ev) => {
      ev.stopPropagation();
      if (!confirm('Delete this expense?')) return;
      try {
        await api(`/api/expenses?id=${encodeURIComponent(btn.dataset.id)}`, { method: 'DELETE' });
        btn.closest('.expense-item').remove();
        toast('Expense deleted', 'success');
        // Refresh stats silently in the background
        if (state.currentMonth) {
          const monthParam = `${state.currentMonth.year}-${String(state.currentMonth.month).padStart(2, '0')}`;
          api(`/api/stats?month=${monthParam}`)
            .then(s => { state.stats = s; renderStats(s); })
            .catch(() => {});
        }
      } catch (err) {
        toast('Delete failed: ' + err.message, 'error');
      }
    });
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
  if (amountLabel) amountLabel.textContent = `Amount (${state.currency}) *`;

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
      toast('Failed to load categories', 'error');
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
      ? '<option value="">All categories</option>'
      : '<option value="">Select category...</option>';
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
    el.innerHTML = '<p style="color:var(--text-muted);font-size:0.875rem">No custom categories yet.</p>';
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
        toast('Category deleted', 'success');
      } catch (err) {
        toast('Cannot delete: ' + err.message, 'error');
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
      toast('Failed to load history: ' + err.message, 'error');
    }
  }
}

function populatePersonFilter() {
  if (!state.family) return;
  const sel = document.getElementById('filter-person');
  const current = sel.value;
  sel.innerHTML = '<option value="">All members</option>';
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
            <div class="invite-status">Pending</div>
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
            toast('Invite cancelled', 'success');
            await loadFamily();
          } catch (err) {
            toast('Failed: ' + err.message, 'error');
          }
        });
      });
    } else {
      pendingSection.style.display = 'none';
    }

    populatePersonFilter();
  } catch (err) {
    toast('Failed to load family: ' + err.message, 'error');
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
      <span class="card-title">Currency</span>
    </div>
    <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap">
      <select id="currency-select" ${isOwner ? '' : 'disabled'} style="flex:1;min-width:120px">
        ${COMMON_CURRENCIES.map(c => `<option value="${c}" ${c === currency ? 'selected' : ''}>${c}</option>`).join('')}
      </select>
      ${isOwner ? '<button class="btn btn-primary" id="save-currency-btn">Save</button>' : '<span style="color:var(--text-muted);font-size:0.85rem">Only the owner can change currency</span>'}
    </div>`;

  if (isOwner) {
    document.getElementById('save-currency-btn').addEventListener('click', changeCurrency);
  }
}

async function changeCurrency() {
  const newCurrency = document.getElementById('currency-select').value;
  const oldCurrency = state.family.currency || 'VND';
  if (newCurrency === oldCurrency) { toast('Currency unchanged', 'info'); return; }

  const confirmed = confirm(
    `Change currency from ${oldCurrency} to ${newCurrency}?\n\n` +
    `WARNING: All existing expense amounts will be converted using the current exchange rate. This cannot be undone.`
  );
  if (!confirmed) return;

  const btn = document.getElementById('save-currency-btn');
  btn.disabled = true;
  btn.textContent = 'Converting...';

  try {
    const result = await api('/api/family', {
      method: 'PUT',
      body: JSON.stringify({ action: 'set_currency', currency: newCurrency }),
    });
    state.family.currency = newCurrency;
    updateCurrencyFormatter(newCurrency);
    toast(`Currency changed to ${newCurrency} (rate: ${result.rate.toFixed(6)})`, 'success');
    renderCurrencyUI();
    // Refresh dashboard to show new amounts
    if (state.currentMonth) loadDashboard();
  } catch (err) {
    toast('Failed: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save';
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

  // Check if name was already edited (stored in user state from session)
  const nameEdited = state.user.name_edited;
  if (nameEdited) {
    editBtn.style.display = 'none';
    hint.textContent = 'Name has already been changed (one-time edit used)';
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
    if (!newName) { toast('Name cannot be empty', 'error'); return; }
    if (newName === originalName) { cancelBtn.click(); return; }

    if (!confirm('You can only change your name once. Are you sure?')) return;

    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';
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
      hint.textContent = 'Name updated successfully! (one-time edit used)';
      hint.style.color = 'var(--success)';
      toast('Name updated!', 'success');
    } catch (err) {
      toast('Failed: ' + err.message, 'error');
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save';
    }
  };

  // Password section
  const pwCard = document.getElementById('password-card');
  const googleNotice = document.getElementById('google-auth-notice');
  const pwForm = document.getElementById('password-form-content');

  if (pwCard) {
    pwCard.style.display = 'block';
    const hasPassword = state.user.has_password;
    if (hasPassword) {
      // Has password — show change form
      pwForm.style.display = 'block';
      googleNotice.style.display = 'none';
    } else {
      // No password yet (Google-only) — show set password form
      pwForm.style.display = 'block';
      googleNotice.style.display = 'none';
      // Hide "current password" field since they don't have one
      document.getElementById('current-password').parentElement.style.display = 'none';
      document.getElementById('change-password-btn').textContent = 'Set Password';
      document.querySelector('#password-card .card-title').textContent = 'Set Password';
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

  if (!currentPw) { errEl.textContent = 'Current password is required'; errEl.style.display = 'block'; return; }
  if (newPw.length < 8) { errEl.textContent = 'New password must be at least 8 characters'; errEl.style.display = 'block'; return; }
  if (newPw !== confirmPw) { errEl.textContent = 'Passwords do not match'; errEl.style.display = 'block'; return; }

  btn.disabled = true;
  btn.textContent = 'Changing...';

  try {
    await api('/api/auth', {
      method: 'PUT',
      body: JSON.stringify({ action: 'change_password', current_password: currentPw, new_password: newPw }),
    });
    document.getElementById('current-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    toast('Password changed successfully!', 'success');
  } catch (err) {
    errEl.textContent = err.message;
    errEl.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Change Password';
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
  if (!settings.apiKey) { toast('API key is required', 'error'); return; }
  saveAISettings(settings);
  toast('AI settings saved!', 'success');
  // Show the insights card on dashboard
  const card = document.getElementById('ai-insights-card');
  if (card) card.style.display = 'block';
}

function checkAIConfigured() {
  const card = document.getElementById('ai-insights-card');
  if (card) card.style.display = 'block';
}

async function runAIAnalysis(customQuestion) {
  const settings = getAISettings();
  if (!settings.apiKey || !settings.provider || !settings.model) {
    toast('Configure AI settings in Family tab first', 'error');
    navigate('family');
    return;
  }

  if (!state.stats || state.stats.count === 0) {
    toast('No expense data to analyze', 'error');
    return;
  }

  const btn = document.getElementById('ai-analyze-btn');
  const btn2 = document.getElementById('ai-analyze-btn2');
  const content = document.getElementById('ai-insights-content');
  [btn, btn2].forEach(b => { if (b) { b.disabled = true; b.textContent = 'Analyzing...'; } });
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
    if (btn) btn.textContent = 'Analyze';
    if (btn2) btn2.textContent = 'Ask AI';
  }
}

function renderAIInsights(analysis) {
  const content = document.getElementById('ai-insights-content');

  // Score badge color
  const score = analysis.score || 0;
  let scoreColor = 'var(--danger)';
  let scoreLabel = 'Needs Attention';
  if (score >= 7) { scoreColor = 'var(--success)'; scoreLabel = 'Healthy'; }
  else if (score >= 4) { scoreColor = 'var(--warning)'; scoreLabel = 'Fair'; }

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
      <div class="ai-section-title">Key Insights</div>
      <ul class="ai-list">${insightsHtml}</ul>
    </div>
    <div class="ai-chart-container">
      <canvas id="ai-chart" width="280" height="280"></canvas>
    </div>
    <div class="ai-section">
      <div class="ai-section-title">Tips</div>
      <ul class="ai-list ai-tips">${tipsHtml}</ul>
    </div>
    ${analysis.trend ? `<div class="ai-trend">${escHtml(analysis.trend.description || '')}</div>` : ''}
  `;

  // Render doughnut chart
  if (analysis.chart && analysis.chart.labels && analysis.chart.values) {
    drawDoughnutChart('ai-chart', analysis.chart);
  }
}

function drawDoughnutChart(canvasId, chartData) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = 280;
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
  const outerR = 120;
  const innerR = 70;
  let startAngle = -Math.PI / 2;

  const defaultColors = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

  values.forEach((val, i) => {
    const sliceAngle = (val / total) * Math.PI * 2;
    const color = (colors && colors[i]) || defaultColors[i % defaultColors.length];

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, startAngle + sliceAngle);
    ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // Label
    const midAngle = startAngle + sliceAngle / 2;
    const labelR = outerR - 25;
    const pct = ((val / total) * 100).toFixed(0);
    if (pct >= 5) {
      const lx = cx + Math.cos(midAngle) * labelR;
      const ly = cy + Math.sin(midAngle) * labelR;
      ctx.fillStyle = '#fff';
      ctx.font = `bold ${11 * 1}px 'Nunito Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${pct}%`, lx, ly);
    }

    startAngle += sliceAngle;
  });

  // Legend below (rendered as HTML after canvas)
  const legendEl = document.createElement('div');
  legendEl.className = 'ai-chart-legend';
  legendEl.innerHTML = labels.map((label, i) => {
    const color = (colors && colors[i]) || defaultColors[i % defaultColors.length];
    const pct = ((values[i] / total) * 100).toFixed(1);
    return `<div class="ai-legend-item">
      <span class="ai-legend-dot" style="background:${color}"></span>
      <span class="ai-legend-label">${escHtml(label)}</span>
      <span class="ai-legend-pct">${pct}%</span>
    </div>`;
  }).join('');

  canvas.parentElement.appendChild(legendEl);
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
    btn.textContent = 'Adding...';

    const amount = parseFloat(document.getElementById('exp-amount').value);
    const description = document.getElementById('exp-desc').value.trim();
    const category_id = document.getElementById('exp-category').value;
    const expense_date = document.getElementById('exp-date').value;

    try {
      await api('/api/expenses', {
        method: 'POST',
        body: JSON.stringify({ amount, description, category_id, expense_date }),
      });
      toast('Expense added!', 'success');
      document.getElementById('add-expense-form').reset();
      document.getElementById('exp-date').value = todayISO();
      document.getElementById('exp-amount-preview').textContent = '';
      navigate('dashboard');
    } catch (err) {
      toast('Failed: ' + err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Add Expense';
    }
  });

  // Live currency preview while typing amount
  document.getElementById('exp-amount').addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    document.getElementById('exp-amount-preview').textContent = val > 0 ? formatMoney(val) : '';
  });

  // Add custom category
  document.getElementById('add-cat-btn').addEventListener('click', async () => {
    const name = document.getElementById('new-cat-name').value.trim();
    const icon = document.getElementById('new-cat-icon').value.trim() || '📦';
    if (!name) { toast('Category name required', 'error'); return; }
    try {
      await api('/api/categories', {
        method: 'POST',
        body: JSON.stringify({ name, icon }),
      });
      document.getElementById('new-cat-name').value = '';
      document.getElementById('new-cat-icon').value = '';
      await loadCategories();
      populateCategorySelects();
      toast('Category added', 'success');
    } catch (err) {
      toast('Failed: ' + err.message, 'error');
    }
  });

  // Create family
  document.getElementById('create-family-btn').addEventListener('click', async () => {
    const name = document.getElementById('new-family-name').value.trim();
    if (!name) { toast('Family name required', 'error'); return; }
    try {
      await api('/api/family', {
        method: 'POST',
        body: JSON.stringify({ name }),
      });
      toast('Family created!', 'success');
      await loadFamily();
    } catch (err) {
      toast('Failed: ' + err.message, 'error');
    }
  });

  // Invite member
  document.getElementById('invite-btn').addEventListener('click', async () => {
    const email = document.getElementById('invite-email').value.trim();
    if (!email) { toast('Email required', 'error'); return; }
    try {
      await api('/api/family', {
        method: 'PUT',
        body: JSON.stringify({ action: 'invite', email }),
      });
      document.getElementById('invite-email').value = '';
      toast('Invite sent! They\'ll receive an email and join automatically on sign-in.', 'success');
      await loadFamily();
    } catch (err) {
      toast('Failed: ' + err.message, 'error');
    }
  });

  // Leave family
  document.getElementById('leave-family-btn').addEventListener('click', async () => {
    if (!confirm('Are you sure you want to leave this family?')) return;
    try {
      await api('/api/family', {
        method: 'PUT',
        body: JSON.stringify({ action: 'leave' }),
      });
      state.family = null;
      toast('You left the family', 'info');
      await loadFamily();
    } catch (err) {
      toast('Failed: ' + err.message, 'error');
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
  document.getElementById('save-ai-settings-btn').addEventListener('click', handleSaveAISettings);
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
