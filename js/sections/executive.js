export function renderExecutive(target, members) {
    if (!target) {
        return;
    }

    if (!members || members.length === 0) {
        target.innerHTML = '<p>Executive team information will be available soon.</p>';
        return;
    }

    target.innerHTML = members.map((member, index) => `
        <article class="card executive-card" data-reveal data-reveal-delay="${index % 2 === 0 ? '1' : '2'}">
            <p class="section-label">Position ${String(index + 1).padStart(2, '0')}</p>
            <h3>${escapeHtml(member.full_name)}</h3>
            <p class="meta">${escapeHtml(member.role_title)}</p>
        </article>
    `).join('');
}

function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

