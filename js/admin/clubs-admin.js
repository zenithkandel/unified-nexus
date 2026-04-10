/**
 * clubs-admin.js
 * 
 * Controller for the admin Clubs panel. Provides workflows (create, update, delete)
 * to alter the dynamic list of clubs rendered on the main site.
 */
import { adminFormRequest, adminJsonRequest } from './auth.js';
import { closeModal, openModal } from './modal.js';

export function initClubsAdmin() {
    const tableBody = document.getElementById('clubsTableBody');
    const status = document.getElementById('clubStatus');
    const addBtn = document.getElementById('clubAddBtn');

    if (!tableBody || !status || !addBtn) {
        return { refresh: async () => { } };
    }

    const setStatus = (message, type = '') => {
        status.textContent = message;
        status.classList.remove('success', 'error');
        if (type) status.classList.add(type);
    };

    const setLoadingRow = () => {
        tableBody.innerHTML = '<tr class="table-empty"><td colspan="5">Loading clubs...</td></tr>';
    };

    const buildFormHtml = (row = null) => {
        const isUpdate = row !== null;
        return `
            <form id="clubForm" class="admin-form" enctype="multipart/form-data" novalidate>
                <input type="hidden" id="clubId" name="id" value="${isUpdate ? escapeAttr(String(row.id || '')) : ''}" />
                <input type="hidden" id="clubImagePath" name="hero_image_path" value="${isUpdate ? escapeAttr(row.hero_image_path || '') : ''}" />
                <div>
                    <label for="clubName">Name</label>
                    <input id="clubName" name="name" type="text" required value="${isUpdate ? escapeAttr(row.name || '') : ''}" />
                </div>
                <div>
                    <label for="clubPresident">President</label>
                    <input id="clubPresident" name="president_name" type="text" required value="${isUpdate ? escapeAttr(row.president_name || '') : ''}" />
                </div>
                <div>
                    <label for="clubOrder">Display Order</label>
                    <input id="clubOrder" name="display_order" type="number" required value="${isUpdate ? escapeAttr(String(row.display_order ?? 0)) : '1'}" />
                </div>
                <div>
                    <label for="clubImage">Hero Image ${isUpdate ? '(optional for update)' : '(optional)'}</label>
                    <input id="clubImage" name="hero_image" type="file" accept="image/png,image/jpeg,image/webp" />
                </div>
                <div>
                    <label for="clubDescription">Description</label>
                    <textarea id="clubDescription" name="description" required>${isUpdate ? escapeHtml(row.description || '') : ''}</textarea>
                </div>
                <div>
                    <label for="clubMotive">Theme/Motive</label>
                    <textarea id="clubMotive" name="theme_motive" required>${isUpdate ? escapeHtml(row.theme_motive || '') : ''}</textarea>
                </div>
                <div>
                    <label class="check-row">
                        <input id="clubActive" name="is_active" type="checkbox" ${isUpdate ? (Number(row.is_active) === 1 ? 'checked' : '') : 'checked'} />
                        Active
                    </label>
                </div>
                <div class="modal-actions">
                    <button class="admin-btn" type="submit">${isUpdate ? 'Update Club' : 'Create Club'}</button>
                    <button class="row-btn" type="button" data-action="close">Cancel</button>
                </div>
                <p id="clubFormStatus" class="status" aria-live="polite"></p>
            </form>
        `;
    };

    const bindFormSubmit = (isUpdate) => {
        const form = document.getElementById('clubForm');
        const formStatus = document.getElementById('clubFormStatus');
        if (!form || !formStatus) return;

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            try {
                await adminFormRequest(
                    isUpdate ? 'api/admin/clubs-update.php' : 'api/admin/clubs-create.php',
                    formData
                );
                setStatus(isUpdate ? 'Club updated successfully.' : 'Club created successfully.', 'success');
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
            title: 'Add Club',
            content: buildFormHtml()
        });
        bindFormSubmit(false);
    };

    const openEditModal = (row) => {
        openModal({
            title: 'Edit Club',
            content: buildFormHtml(row)
        });
        bindFormSubmit(true);
    };

    const openDeleteModal = (id) => {
        openModal({
            title: 'Delete Club',
            content: `
                <p>This action will permanently remove this club.</p>
                <div class="modal-actions">
                    <button id="confirmClubDelete" class="admin-btn" type="button">Delete</button>
                    <button class="row-btn" type="button" data-action="close">Cancel</button>
                </div>
                <p id="clubDeleteStatus" class="status" aria-live="polite"></p>
            `
        });

        const confirmBtn = document.getElementById('confirmClubDelete');
        const deleteStatus = document.getElementById('clubDeleteStatus');

        confirmBtn?.addEventListener('click', async () => {
            try {
                await adminJsonRequest('api/admin/clubs-delete.php', 'POST', { id });
                setStatus('Club deleted successfully.', 'success');
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
            const rows = await adminJsonRequest('api/admin/clubs-list.php');
            if (!Array.isArray(rows) || rows.length === 0) {
                tableBody.innerHTML = '<tr class="table-empty"><td colspan="5">No clubs yet. Use Add Club to create one.</td></tr>';
                return;
            }

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
            tableBody.innerHTML = '<tr class="table-empty"><td colspan="5">Unable to load clubs right now.</td></tr>';
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

