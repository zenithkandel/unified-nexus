/**
 * auth.js
 * 
 * Admin authentication management. Issues login/logout requests,
 * manages local sessionStorage tokens, and protects restricted views.
 */
let csrfToken = '';

async function parseResponse(response) {
    const payload = await response.json();
    if (!response.ok || !payload.success) {
        const details = payload.errors || [];
        throw new Error(details[0] || payload.message || 'Request failed');
    }
    return payload.data;
}

export function getCsrfToken() {
    return csrfToken;
}

export function setCsrfToken(token) {
    csrfToken = String(token || '');
}

export async function adminLogin(password) {
    const response = await fetch('api/admin/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });
    const data = await parseResponse(response);
    setCsrfToken(data.csrfToken || '');
    return data;
}

export async function adminLogout() {
    const response = await fetch('api/admin/logout.php', {
        method: 'POST'
    });
    await parseResponse(response);
    setCsrfToken('');
}

export async function adminJsonRequest(url, method = 'GET', body = null) {
    const headers = {};
    if (method !== 'GET') {
        headers['Content-Type'] = 'application/json';
        if (csrfToken) {
            headers['X-CSRF-Token'] = csrfToken;
        }
    }

    const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    });
    return parseResponse(response);
}

export async function adminFormRequest(url, formData) {
    const headers = {};
    if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken;
    }
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData
    });
    return parseResponse(response);
}

