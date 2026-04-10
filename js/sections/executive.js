/**
 * executive.js
 * 
 * Fetches and renders the Leadership/Executive team member cards within the 
 * 'Direction' section of the public site.
 */
export function renderExecutive(target, members) {
    if (!target) {
        return;
    }

    if (!members || members.length === 0) {
        target.innerHTML = '<div class="empty-block">Executive editorial is being updated. Check back soon.</div>';
        return;
    }

    target.innerHTML = members.map((member, index) => `
        <article class="leader-strip" data-reveal data-reveal-delay="${index % 2 === 0 ? '1' : '2'}">
            <figure class="leader-photo">
                <img src="${resolveExecutivePhoto(member.photo_path, index)}" alt="Portrait of ${escapeHtml(member.full_name)}" loading="lazy" />
            </figure>
            <div class="leader-copy">
                <p class="section-label">Position ${String(index + 1).padStart(2, '0')}</p>
                <h3>${escapeHtml(member.full_name)}</h3>
                <p class="leader-role">${escapeHtml(member.role_title)}</p>
                <p class="leader-note">Leading with clarity, accountability, and collaborative direction.</p>
            </div>
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

function resolveExecutivePhoto(path, index) {
    const fallback = [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80'
    ];

    const source = String(path || '').trim();
    if (source.length > 0) {
        return source;
    }

    return fallback[index % fallback.length];
}

