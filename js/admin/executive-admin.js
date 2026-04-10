import { adminFormRequest, adminJsonRequest } from './auth.js';
import { closeModal, openModal } from './modal.js';

export function initExecutiveAdmin() {
    const tableBody = document.getElementById('executiveTableBody');
    const status = document.getElementById('executiveStatus');
    const addBtn = document.getElementById('executiveAddBtn');

    if (!tableBody || !status || !addBtn) {
        return { refresh: async () => { } };
    }

    const setStatus = (message, type = '') => {
        status.textContent = message;
        status.classList.remove('success', 'error');
        if (type) status.classList.add(type);
    };

    const setLoadingRow = () => {
        tableBody.innerHTML = '<tr class="table-empty"><td colspan="6">Loading executive members...</td></tr>';
    };

    const buildFormHtml = (row = null) => {
        const isUpdate = row !== null;
        return `
            <form id="executiveForm" class="admin-form" enctype="multipart/form-data" novalidate>
                <input type="hidden" id="executiveId" name="id" value="${isUpdate ? escapeAttr(String(row.id || '')) : ''}" />
                <input type="hidden" id="executivePhotoPath" name="photo_path" value="${isUpdate ? escapeAttr(String(row.photo_path || '')) : ''}" />
                <div>
                    <label for="executiveName">Full Name</label>
                    <input id="executiveName" name="full_name" type="text" required value="${isUpdate ? escapeAttr(row.full_name || '') : ''}" />
                </div>
                <div>
                    <label for="executiveRole">Role</label>
                    <input id="executiveRole" name="role_title" type="text" required value="${isUpdate ? escapeAttr(row.role_title || '') : ''}" />
                </div>
                <div>
                    <label for="executiveOrder">Display Order</label>
                    <input id="executiveOrder" name="display_order" type="number" required value="${isUpdate ? escapeAttr(String(row.display_order ?? 0)) : '1'}" />
                </div>
                <div>
                    <label for="executivePhoto">Photo ${isUpdate ? '(optional for update)' : ''}</label>
                    <input id="executivePhoto" name="photo" type="file" accept="image/png,image/jpeg,image/webp" />
                </div>
                <div>
                    <label class="check-row">
                        <input id="executiveActive" name="is_active" type="checkbox" ${isUpdate ? (Number(row.is_active) === 1 ? 'checked' : '') : 'checked'} />
                        Active
                    </label>
                </div>
                <div class="modal-actions">
                    <button class="admin-btn" type="submit">${isUpdate ? 'Update Member' : 'Create Member'}</button>
                    <button class="row-btn" type="button" data-action="close">Cancel</button>
                </div>
                <p id="executiveFormStatus" class="status" aria-live="polite"></p>
            </form>
        `;
    };

    const bindFormSubmit = (isUpdate) => {
        const form = document.getElementById('executiveForm');
        const formStatus = document.getElementById('executiveFormStatus');
        if (!form || !formStatus) return;

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            try {
                await adminFormRequest(
                    isUpdate ? 'api/admin/executive-update.php' : 'api/admin/executive-create.php',
                    formData
                );
                setStatus(isUpdate ? 'Executive member updated successfully.' : 'Executive member created successfully.', 'success');
                closeModal();
                await refresh();
            } catch (error) {
                formStatus.textContent = error.message;
                formStatus.classList.add('error');
            }
        });
    };

    const openCreateModal = () => {
        openModal({
            title: 'Add Executive Member',
            content: buildFormHtml()
        });
        bindFormSubmit(false);
    };

    const openEditModal = (row) => {
        openModal({
            title: 'Edit Executive Member',
            content: buildFormHtml(row)
        });
        bindFormSubmit(true);
    };

    const openDeleteModal = (id) => {
        openModal({
            title: 'Delete Executive Member',
            content: `
                <p>This action will permanently remove this executive member.</p>
                <div class="modal-actions">
                    <button id="confirmExecutiveDelete" class="admin-btn" type="button">Delete</button>
                    <button class="row-btn" type="button" data-action="close">Cancel</button>
                </div>
                <p id="executiveDeleteStatus" class="status" aria-live="polite"></p>
            `
        });

        const confirmBtn = document.getElementById('confirmExecutiveDelete');
        const deleteStatus = document.getElementById('executiveDeleteStatus');

        confirmBtn?.addEventListener('click', async () => {
            try {
                await adminJsonRequest('api/admin/executive-delete.php', 'POST', { id });
                setStatus('Executive member deleted successfully.', 'success');
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
            const rows = await adminJsonRequest('api/admin/executive-list.php');
            if (!Array.isArray(rows) || rows.length === 0) {
                tableBody.innerHTML = '<tr class="table-empty"><td colspan="6">No executive members yet. Use Add Member to create one.</td></tr>';
                return;
            }

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
                    if (selected) openEditModal(selected);
                });
            });

            tableBody.querySelectorAll('button[data-action="delete"]').forEach((button) => {
                button.addEventListener('click', () => {
                    const id = Number(button.getAttribute('data-id'));
                    openDeleteModal(id);
                });
            });
        } catch (error) {
            setStatus(error.message, 'error');
            tableBody.innerHTML = '<tr class="table-empty"><td colspan="6">Unable to load executive members right now.</td></tr>';
        }
    };

    addBtn.addEventListener('click', openCreateModal);

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

function escapeAttr(value) {
    return escapeHtml(value).replaceAll('`', '&#096;');
}

