import { adminJsonRequest } from './auth.js';

export function initApplicationsAdmin() {
    const tableBody = document.getElementById('applicationsTableBody');
    const status = document.getElementById('applicationsStatus');

    if (!tableBody || !status) {
        return { refresh: async () => { } };
    }

    const setStatus = (message, type = '') => {
        status.textContent = message;
        status.classList.remove('success', 'error');
        if (type) status.classList.add(type);
    };

    const refresh = async () => {
        try {
            const rows = await adminJsonRequest('api/admin/applications-list.php');
            tableBody.innerHTML = rows.map((row) => `
				<tr>
					<td>${escapeHtml(row.submitted_at || '')}</td>
					<td>${escapeHtml(row.applicant_name)}</td>
					<td>${escapeHtml(row.contact_email)}</td>
					<td>${escapeHtml(row.club_name || '-')}</td>
					<td>${escapeHtml(row.message || '')}</td>
					<td>
						<button class="row-btn delete" data-action="delete" data-id="${row.id}">Delete</button>
					</td>
				</tr>
			`).join('');

            tableBody.querySelectorAll('button[data-action="delete"]').forEach((button) => {
                button.addEventListener('click', async () => {
                    const id = Number(button.getAttribute('data-id'));
                    if (!window.confirm('Delete this application?')) return;
                    try {
                        await adminJsonRequest('api/admin/applications-delete.php', 'POST', { id });
                        setStatus('Application deleted successfully.', 'success');
                        await refresh();
                    } catch (error) {
                        setStatus(error.message, 'error');
                    }
                });
            });
        } catch (error) {
            setStatus(error.message, 'error');
        }
    };

    return { refresh };
}

function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

