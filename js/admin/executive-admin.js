import { adminFormRequest, adminJsonRequest } from './auth.js';

export function initExecutiveAdmin() {
    const form = document.getElementById('executiveForm');
    const tableBody = document.getElementById('executiveTableBody');
    const status = document.getElementById('executiveStatus');
    const resetBtn = document.getElementById('executiveResetBtn');
    const submitBtn = document.getElementById('executiveSubmitBtn');

    if (!form || !tableBody || !status || !resetBtn || !submitBtn) {
        return { refresh: async () => { } };
    }

    const setStatus = (message, type = '') => {
        status.textContent = message;
        status.classList.remove('success', 'error');
        if (type) status.classList.add(type);
    };

    const resetForm = () => {
        form.reset();
        document.getElementById('executiveId').value = '';
        document.getElementById('executivePhotoPath').value = '';
        document.getElementById('executiveActive').checked = true;
        submitBtn.textContent = 'Create Member';
    };

    const fillForm = (row) => {
        document.getElementById('executiveId').value = String(row.id);
        document.getElementById('executiveName').value = row.full_name || '';
        document.getElementById('executiveRole').value = row.role_title || '';
        document.getElementById('executiveOrder').value = String(row.display_order ?? 0);
        document.getElementById('executivePhotoPath').value = row.photo_path || '';
        document.getElementById('executiveActive').checked = Number(row.is_active) === 1;
        submitBtn.textContent = 'Update Member';
    };

    const refresh = async () => {
        try {
            const rows = await adminJsonRequest('api/admin/executive-list.php');
            tableBody.innerHTML = rows.map((row) => `
				<tr>
					<td>${escapeHtml(String(row.display_order ?? ''))}</td>
					<td>${escapeHtml(row.full_name)}</td>
					<td>${escapeHtml(row.role_title)}</td>
					<td>${escapeHtml(row.photo_path || '-')}</td>
					<td>${Number(row.is_active) === 1 ? 'Active' : 'Inactive'}</td>
					<td>
						<div class="row-actions">
							<button class="row-btn" data-action="edit" data-id="${row.id}">Edit</button>
							<button class="row-btn delete" data-action="delete" data-id="${row.id}">Delete</button>
						</div>
					</td>
				</tr>
			`).join('');

            tableBody.querySelectorAll('button[data-action="edit"]').forEach((button) => {
                button.addEventListener('click', () => {
                    const id = Number(button.getAttribute('data-id'));
                    const selected = rows.find((r) => Number(r.id) === id);
                    if (selected) fillForm(selected);
                });
            });

            tableBody.querySelectorAll('button[data-action="delete"]').forEach((button) => {
                button.addEventListener('click', async () => {
                    const id = Number(button.getAttribute('data-id'));
                    if (!window.confirm('Delete this executive member?')) return;
                    try {
                        await adminJsonRequest('api/admin/executive-delete.php', 'POST', { id });
                        setStatus('Executive member deleted successfully.', 'success');
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

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const isUpdate = String(formData.get('id') || '') !== '';
        try {
            await adminFormRequest(
                isUpdate ? 'api/admin/executive-update.php' : 'api/admin/executive-create.php',
                formData
            );
            setStatus(isUpdate ? 'Executive member updated successfully.' : 'Executive member created successfully.', 'success');
            resetForm();
            await refresh();
        } catch (error) {
            setStatus(error.message, 'error');
        }
    });

    resetBtn.addEventListener('click', () => {
        resetForm();
        setStatus('');
    });

    resetForm();
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

