/**
 * applications-admin.js
 * 
 * Logic for the admin Applications panel. Fetches user applications, populates the table,
 * handles approval/rejection actions, and toggles applicant details modals.
 */
import { adminJsonRequest } from './auth.js';
import { closeModal, openModal } from './modal.js';

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

    const setLoadingRow = () => {
        tableBody.innerHTML = '<tr class="table-empty"><td colspan="6">Loading applications...</td></tr>';
    };

    const openDeleteModal = (id) => {
        openModal({
            title: 'Delete Application',
            content: `
                <p>This action will permanently remove this application.</p>
                <div class="modal-actions">
                    <button id="confirmApplicationDelete" class="admin-btn" type="button">Delete</button>
                    <button class="row-btn" type="button" data-action="close">Cancel</button>
                </div>
                <p id="applicationDeleteStatus" class="status" aria-live="polite"></p>
            `
        });

        const confirmBtn = document.getElementById('confirmApplicationDelete');
        const deleteStatus = document.getElementById('applicationDeleteStatus');
        confirmBtn?.addEventListener('click', async () => {
            try {
                await adminJsonRequest('api/admin/applications-delete.php', 'POST', { id });
                setStatus('Application deleted successfully.', 'success');
                closeModal();
                await refresh();
            } catch (error) {
                if (deleteStatus) {
                    deleteStatus.textContent = error.message;
                    deleteStatus.classList.add('error');
                }
            }
        });
    };

    const refresh = async () => {
        setLoadingRow();
        try {
            const rows = await adminJsonRequest('api/admin/applications-list.php');
            if (!Array.isArray(rows) || rows.length === 0) {
                tableBody.innerHTML = '<tr class="table-empty"><td colspan="6">No applications yet.</td></tr>';
                return;
            }

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
                button.addEventListener('click', () => {
                    const id = Number(button.getAttribute('data-id'));
                    openDeleteModal(id);
                });
            });
        } catch (error) {
            setStatus(error.message, 'error');
            tableBody.innerHTML = '<tr class="table-empty"><td colspan="6">Unable to load applications right now.</td></tr>';
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

