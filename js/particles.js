export function initParticles() {
    const layer = document.getElementById('particles');
    if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const positions = [
        'p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-7',
        'p-8', 'p-9', 'p-10', 'p-11', 'p-12', 'p-13', 'p-14'
    ];
    const count = positions.length;

    for (let i = 0; i < count; i += 1) {
        const dot = document.createElement('span');
        dot.className = `particle ${positions[i]}`;
        layer.appendChild(dot);
    }
}

