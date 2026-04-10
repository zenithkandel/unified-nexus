/**
 * clubs.js
 * 
 * Fetches club data from the backend and dynamically generates the Club Cards 
 * matrix within the public frontend.
 */
export function renderClubs(target, clubs) {
    if (!target) {
        return;
    }

    if (!clubs || clubs.length === 0) {
        target.innerHTML = '<div class="empty-block">No club chapters are published right now.</div>';
        return;
    }

    target.innerHTML = clubs.map((club, index) => `
        <article class="club-story" data-reveal data-reveal-delay="${index % 2 === 0 ? '1' : '2'}">
            <figure class="club-media">
                <img src="${resolveClubImage(club.hero_image_path, index)}" alt="${escapeHtml(club.name)} chapter visual" loading="lazy" />
            </figure>
            <div class="club-story-copy">
                <p class="section-label">Chapter ${String(index + 1).padStart(2, '0')}</p>
                <h3>${escapeHtml(club.name)}</h3>
                <p>${escapeHtml(club.description)}</p>
                <div class="club-meta">
                    <span>Theme ${escapeHtml(club.theme_motive || 'Shared Vision')}</span>
                    <span>Lead ${escapeHtml(club.president_name || 'TBD')}</span>
                </div>
            </div>
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

function resolveClubImage(path, index) {
    const fallback = [
        'https://images.unsplash.com/photo-1462233195645-ed706cfc2eb8?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80'
    ];

    const source = String(path || '').trim();
    if (source.length > 0) {
        return source;
    }

    return fallback[index % fallback.length];
}

