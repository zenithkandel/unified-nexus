(function () {
    // Check if injector already exists
    if (document.getElementById('theme-injector-ui')) return;

    // Create UI Container
    const injector = document.createElement('div');
    injector.id = 'theme-injector-ui';
    injector.style.position = 'fixed';
    injector.style.top = '20px';
    injector.style.right = '20px';
    injector.style.width = '320px';
    injector.style.maxHeight = '400px';
    injector.style.backgroundColor = '#1e1e1e';
    injector.style.color = '#fff';
    injector.style.border = '1px solid #444';
    injector.style.borderRadius = '8px';
    injector.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    injector.style.fontFamily = 'monospace';
    injector.style.zIndex = '999999';
    injector.style.display = 'flex';
    injector.style.flexDirection = 'column';
    injector.style.overflow = 'hidden';

    // Dynamic Styles
    const style = document.createElement('style');
    style.textContent = `
    .theme-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; padding: 10px; overflow-y: auto; }
    .theme-item { width: 100%; aspect-ratio: 1; border-radius: 4px; cursor: pointer; transition: transform 0.2s; border: 2px solid transparent; }
    .theme-item:hover { transform: scale(1.1); border-color: #fff; z-index: 2; }
    .theme-header { background: #333; padding: 10px; cursor: move; user-select: none; font-weight: bold; border-bottom: 1px solid #444; display: flex; justify-content: space-between; }
    .theme-close { cursor: pointer; color: #ff5555; }
    .theme-label { font-size: 10px; text-align: center; color: #888; margin-top: 2px; }
  `;
    document.head.appendChild(style);

    // Header
    const header = document.createElement('div');
    header.className = 'theme-header';

    const title = document.createElement('span');
    title.innerText = 'Theme Injector';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'theme-close';
    closeBtn.innerText = '✕';
    closeBtn.onclick = () => injector.remove();

    header.appendChild(title);
    header.appendChild(closeBtn);
    injector.appendChild(header);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'theme-grid';

    // Generate 50 palettes
    // Base keys:
    // --c-57545B: bg, --c-661B28: dark accent, --c-716F75: sepia bg
    // --c-AAAAAA: text secondary, --c-7F2B3E: accent
    // --color-text-primary: text primary

    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    const themes = [];
    // 50 variations along the hue spectrum
    for (let i = 0; i < 50; i++) {
        const rH = Math.floor((i / 50) * 360);
        const palette = {
            name: `H:${rH}`,
            vars: {
                '--color-bg-base': hslToHex(rH, 15, 8),
                '--c-57545B': hslToHex(rH, 15, 8),
                '--color-charcoal': hslToHex(rH, 15, 8),

                '--color-cream': hslToHex(rH, 25, 12),
                '--c-661B28': hslToHex(rH, 25, 12),

                '--color-sepia': hslToHex(rH, 10, 18),
                '--c-716F75': hslToHex(rH, 10, 18),

                '--color-dust-gray': hslToHex(rH, 5, 50),
                '--c-959294': hslToHex(rH, 5, 50),

                '--color-text-secondary': hslToHex(rH, 15, 75),
                '--c-AAAAAA': hslToHex(rH, 15, 75),

                '--color-text-primary': '#ffffff',

                '--color-accent-terracotta': hslToHex(rH, 60, 45),
                '--c-7F2B3E': hslToHex(rH, 60, 45)
            }
        };
        themes.push(palette);
    }

    themes.forEach(t => {
        const item = document.createElement('div');
        item.className = 'theme-item';
        item.title = `Apply Theme ${t.name}`;

        // Split item to show Primary Accent and Bg Base
        item.style.background = `linear-gradient(135deg, ${t.vars['--c-7F2B3E']} 50%, ${t.vars['--c-57545B']} 50%)`;

        item.onclick = () => {
            Object.keys(t.vars).forEach(k => {
                document.documentElement.style.setProperty(k, t.vars[k]);
            });
            console.log(`[Injector] Applied theme: ${t.name}`);
        };

        grid.appendChild(item);
    });

    injector.appendChild(grid);

    // Drag logic
    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - injector.getBoundingClientRect().left;
        offsetY = e.clientY - injector.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        injector.style.left = (e.clientX - offsetX) + 'px';
        injector.style.top = (e.clientY - offsetY) + 'px';
        injector.style.right = 'auto'; // Disable right
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.body.appendChild(injector);
    console.log('[Theme Injector] Ready. Drag the panel and click a swatch to change theme variables.');
})();