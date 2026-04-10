const modalRoot = document.getElementById('adminModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.getElementById('modalCloseBtn');

let onCloseHandler = null;

function closeModal() {
    if (!modalRoot) return;
    modalRoot.classList.add('hidden');
    modalRoot.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modalBody) {
        modalBody.innerHTML = '';
    }
    if (typeof onCloseHandler === 'function') {
        onCloseHandler();
    }
    onCloseHandler = null;
}

function openModal({ title, content, onClose }) {
    if (!modalRoot || !modalTitle || !modalBody) {
        return;
    }

    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    onCloseHandler = onClose || null;
    modalRoot.classList.remove('hidden');
    modalRoot.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function bindModalEvents() {
    if (!modalRoot) return;

    modalRoot.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        if (target.getAttribute('data-action') === 'close') {
            closeModal();
        }
    });

    closeBtn?.addEventListener('click', closeModal);

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modalRoot.classList.contains('hidden')) {
            closeModal();
        }
    });
}

bindModalEvents();

export { openModal, closeModal };
