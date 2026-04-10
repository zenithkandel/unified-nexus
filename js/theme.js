const STORAGE_KEY = 'unified_nexus_theme';

export function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = saved === 'dark' || saved === 'light' ? saved : 'light';
    document.documentElement.setAttribute('data-theme', initial);
    return initial;
}

export function bindThemeToggle(onChange) {
    const toggleButton = document.getElementById('themeToggle');
    if (!toggleButton) {
        return;
    }

    toggleButton.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(STORAGE_KEY, next);
        if (typeof onChange === 'function') {
            onChange(next);
        }
    });
}

