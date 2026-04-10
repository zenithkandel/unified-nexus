import { adminJsonRequest } from './auth.js';

export function initClubsAdmin() {
    const form = document.getElementById('clubForm');
    const tableBody = document.getElementById('clubsTableBody');
    const status = document.getElementById('clubStatus');
    const resetBtn = document.getElementById('clubResetBtn');
    const submitBtn = document.getElementById('clubSubmitBtn');

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
        document.getElementById('clubId').value = '';
        document.getElementById('clubActive').checked = true;
        submitBtn.textContent = 'Create Club';
    };

    const fillForm = (row) => {
        document.getElementById('clubId').value = String(row.id);
        document.getElementById('clubName').value = row.name || '';
        document.getElementById('clubPresident').value = row.president_name || '';
        document.getElementById('clubOrder').value = String(row.display_order ?? 0);
        document.getElementById('clubImage').value = row.hero_image_path || '';
        document.getElementById('clubDescription').value = row.description || '';
        document.getElementById('clubMotive').value = row.theme_motive || '';
        document.getElementById('clubActive').checked = Number(row.is_active) === 1;
        submitBtn.textContent = 'Update Club';
    };

    const refresh = async () => {
        try {
            const rows = await adminJsonRequest('api/admin/clubs-list.php');
            tableBody.innerHTML = rows.map((row) => `
				<tr>
					<td>${escapeHtml(String(row.display_order ?? ''))}</td>
					<td>${escapeHtml(row.name)}</td>
					<td>${escapeHtml(row.president_name)}</td>
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
                    if (!window.confirm('Delete this club?')) return;
                    try {
                        await adminJsonRequest('api/admin/clubs-delete.php', 'POST', { id });
                        setStatus('Club deleted successfully.', 'success');
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
        const payload = {
            id: document.getElementById('clubId').value,
            name: document.getElementById('clubName').value,
            president_name: document.getElementById('clubPresident').value,
            display_order: Number(document.getElementById('clubOrder').value),
            hero_image_path: document.getElementById('clubImage').value,
            description: document.getElementById('clubDescription').value,
            theme_motive: document.getElementById('clubMotive').value,
            is_active: document.getElementById('clubActive').checked
        };

        const isUpdate = payload.id !== '';
        try {
            await adminJsonRequest(
                isUpdate ? 'api/admin/clubs-update.php' : 'api/admin/clubs-create.php',
                'POST',
                payload
            );
            setStatus(isUpdate ? 'Club updated successfully.' : 'Club created successfully.', 'success');
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

