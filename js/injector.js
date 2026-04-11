(function () {
    // Check if injector already exists
    if (document.getElementById('theme-injector-ui')) return;

    // Create UI Container
    const injector = document.createElement('div');
    injector.id = 'theme-injector-ui';
    injector.style.position = 'fixed';
    injector.style.top = '20px';
    injector.style.right = '20px';
    injector.style.width = '340px';
    injector.style.maxHeight = '450px';
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
    .theme-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; padding: 12px; overflow-y: auto; overflow-x: hidden; max-height: calc(450px - 90px); }
    .theme-item { width: 100%; aspect-ratio: 1; border-radius: 50%; cursor: pointer; transition: transform 0.2s; border: 2px solid transparent; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
    .theme-item:hover { transform: scale(1.15); border-color: #fff; z-index: 2; }
    .theme-header { background: #333; padding: 12px; cursor: move; user-select: none; font-weight: bold; border-bottom: 1px solid #444; display: flex; justify-content: space-between; align-items: center;}
    .theme-close { cursor: pointer; color: #ff5555; padding: 0 5px; font-size: 16px; line-height: 1;}
    .theme-controls { padding: 10px; border-bottom: 1px solid #444; background: #2a2a2a; display: flex; gap: 5px; font-size: 12px; justify-content: space-around;}
    .t-btn { background: #444; border: none; color: white; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
    .t-btn:hover { background: #666; }
    .t-btn.active { background: #BA7883; font-weight: bold; }
  `;
    document.head.appendChild(style);

    // Header & Controls mapping
    const header = document.createElement('div');
    header.className = 'theme-header';
    const title = document.createElement('span');
    title.innerText = 'Nexus Theme Engine';
    const closeBtn = document.createElement('span');
    closeBtn.className = 'theme-close';
    closeBtn.innerText = '✕';
    closeBtn.onclick = () => injector.remove();
    header.appendChild(title);
    header.appendChild(closeBtn);
    injector.appendChild(header);

    const controls = document.createElement('div');
    controls.className = 'theme-controls';
    const modes = ['All', 'Dark', 'Light', 'Vibrant', 'Pastel'];
    const btns = {};
    modes.forEach(mode => {
        const btn = document.createElement('button');
        btn.className = 't-btn' + (mode === 'All' ? ' active' : '');
        btn.innerText = mode;
        btn.onclick = () => filterThemes(mode, btn);
        controls.appendChild(btn);
        btns[mode] = btn;
    });
    injector.appendChild(controls);

    const grid = document.createElement('div');
    grid.className = 'theme-grid';

    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        return "#" + f(0) + f(8) + f(4);
    }

    const themes = [];

    function createTheme(name, group, h, bgS, bgL, txtL, accS, accL) {
        const isDarkBg = bgL < 50;
        const bg1 = hslToHex(h, bgS, bgL);
        const bg2 = hslToHex(h, bgS, Math.max(0, bgL - 5));
        const bg3 = hslToHex(h, bgS, Math.max(0, bgL - 10));
        const bg4 = hslToHex(h, bgS, Math.min(100, bgL + 15));

        // Light themes need dark text. Dark themes need light text.
        const textBright = isDarkBg ? hslToHex(h, Math.min(100, bgS / 2), txtL) : hslToHex(h, bgS, Math.max(0, 100 - txtL));
        const textMuted = isDarkBg ? hslToHex(h, bgS, txtL - 25) : hslToHex(h, bgS, Math.max(0, 100 - txtL + 25));
        const accPrimary = hslToHex((h + 30) % 360, accS, accL);

        themes.push({
            name: name,
            group: group,
            vars: {
                '--color-bg-base': bg1,
                '--color-charcoal': bg1,
                '--c-57545B': bg1,
                '--color-cream': bg3,
                '--c-661B28': bg3,
                '--color-sepia': bg2,
                '--c-716F75': bg2,
                '--color-dust-gray': bg4,
                '--c-959294': bg4,
                '--color-text-primary': textBright,
                '--color-text-secondary': textMuted,
                '--c-AAAAAA': textMuted,
                '--color-accent-terracotta': accPrimary,
                '--c-7F2B3E': accPrimary
            }
        });
    }

    for (let i = 0; i < 20; i++) {
        const h = Math.floor((i / 20) * 360);
        // Dark: low lightness bg, high lightness text
        createTheme("Dark-" + h, "Dark", h, 20, 10, 95, 60, 50);
        // Light: high lightness bg, low lightness text
        createTheme("Light-" + h, "Light", h, 15, 95, 90, 50, 45);
        // Vibrant: saturated bg, high contrast
        createTheme("Vibrant-" + h, "Vibrant", h, 80, 40, 95, 90, 60);
        // Pastel: soft bg, soft accents
        createTheme("Pastel-" + h, "Pastel", h, 40, 85, 90, 60, 70);
    }

    function renderGrid(filter) {
        grid.innerHTML = '';
        themes.forEach(t => {
            if (filter !== 'All' && t.group !== filter) return;
            const item = document.createElement('div');
            item.className = 'theme-item';
            item.title = `${t.name} - Click to apply`;
            item.style.background = `linear-gradient(135deg, ${t.vars['--c-7F2B3E']} 50%, ${t.vars['--c-57545B']} 50%)`;
            item.onclick = () => {
                Object.keys(t.vars).forEach(k => document.documentElement.style.setProperty(k, t.vars[k]));
                console.log(`[Injector] Applied theme: ${t.name}`);
            };
            grid.appendChild(item);
        });
    }

    function filterThemes(mode, activeBtn) {
        Object.values(btns).forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
        renderGrid(mode);
    }

    renderGrid('All');
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
        injector.style.right = 'auto';
    });

    document.addEventListener('mouseup', () => isDragging = false);

    document.body.appendChild(injector);
    console.log('[Theme Injector] Overhauled with 80 palettes across Dark, Light, Vibrant, and Pastel styles.');
})();