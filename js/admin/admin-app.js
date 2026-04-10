import { adminLogin, adminLogout, adminJsonRequest, setCsrfToken } from './auth.js';
import { initClubsAdmin } from './clubs-admin.js';
import { initExecutiveAdmin } from './executive-admin.js';
import { initApplicationsAdmin } from './applications-admin.js';

const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const loginStatus = document.getElementById('loginStatus');
const logoutBtn = document.getElementById('logoutBtn');

const clubsModule = initClubsAdmin();
const executiveModule = initExecutiveAdmin();
const applicationsModule = initApplicationsAdmin();

function setLoginStatus(message, type = '') {
    if (!loginStatus) return;
    loginStatus.textContent = message;
    loginStatus.classList.remove('success', 'error');
    if (type) loginStatus.classList.add(type);
}

function showDashboard() {
    loginSection?.classList.add('hidden');
    dashboardSection?.classList.remove('hidden');
}

function showLogin() {
    dashboardSection?.classList.add('hidden');
    loginSection?.classList.remove('hidden');
}

async function loadAllData() {
    await Promise.all([
        clubsModule.refresh(),
        executiveModule.refresh(),
        applicationsModule.refresh()
    ]);
}

async function bootstrapSession() {
    try {
        const session = await adminJsonRequest('api/admin/session.php', 'GET');
        setCsrfToken(session.csrfToken || '');
        showDashboard();
        await loadAllData();
    } catch {
        showLogin();
    }
}

loginForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const password = String(formData.get('password') || '');

    try {
        await adminLogin(password);
        setLoginStatus('Login successful.', 'success');
        showDashboard();
        await loadAllData();
    } catch (error) {
        setLoginStatus(error.message, 'error');
    }
});

logoutBtn?.addEventListener('click', async () => {
    try {
        await adminLogout();
    } finally {
        showLogin();
        setLoginStatus('Logged out successfully.', 'success');
    }
});

bootstrapSession();

