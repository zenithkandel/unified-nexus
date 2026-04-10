export function renderClubs(target, clubs) {
    if (!target) {
        return;
    }

    if (!clubs || clubs.length === 0) {
        target.innerHTML = '<p>No clubs available right now.</p>';
        return;
    }

    target.innerHTML = clubs.map((club, index) => `
        <article class="card club-card" data-reveal data-reveal-delay="${index % 2 === 0 ? '1' : '2'}">
            <p class="section-label">Club ${String(index + 1).padStart(2, '0')}</p>
            <h3>${escapeHtml(club.name)}</h3>
            <p>${escapeHtml(club.description)}</p>
            <p class="meta"><strong>Theme:</strong> ${escapeHtml(club.theme_motive)}</p>
            <p class="meta"><strong>President:</strong> ${escapeHtml(club.president_name || 'TBD')}</p>
        </article>
    `).join('');
}

export function populateClubSelect(target, clubs) {
    if (!target) {
        return;
    }

    const options = clubs.map((club) => `
		<option value="${String(club.id)}">${escapeHtml(club.name)}</option>
	`).join('');

    target.innerHTML = '<option value="">Choose a club</option>' + options;
}

function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

