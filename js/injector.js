(function () {
    if (document.getElementById('theme-injector-ui')) return;

    const injector = document.createElement('div');
    injector.id = 'theme-injector-ui';
    injector.style.position = 'fixed';
    injector.style.top = '20px';
    injector.style.right = '20px';
    injector.style.width = '360px';
    injector.style.maxHeight = '500px';
    injector.style.backgroundColor = '#111';
    injector.style.color = '#fff';
    injector.style.borderRadius = '10px';
    injector.style.boxShadow = '0 15px 40px rgba(0,0,0,0.6)';
    injector.style.fontFamily = 'monospace';
    injector.style.zIndex = '999999';
    injector.style.display = 'flex';
    injector.style.flexDirection = 'column';
    injector.style.border = '1px solid #333';

    const style = document.createElement('style');
    style.textContent = `
    .t-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; padding: 15px; overflow-y: auto; max-height: 380px; }
    .t-item { aspect-ratio: 1; border-radius: 50%; cursor: pointer; transition: 0.2s; border: 2px solid transparent; box-shadow: 0 4px 8px rgba(0,0,0,0.3); }
    .t-item:hover { transform: scale(1.2); border-color: #fff; z-index: 2; box-shadow: 0 6px 15px rgba(0,0,0,0.5);}
    .t-head { background: #222; padding: 15px; cursor: move; font-weight: bold; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center;}
    .t-close { cursor: pointer; color: #ff4444; font-size: 16px; font-weight: bold; }
    .t-ctrls { padding: 10px; background: #1a1a1a; display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; border-bottom: 1px solid #333; }
    .t-btn { background: #333; border: 1px solid #444; color: #ccc; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 11px;}
    .t-btn:hover { background: #444; color: #fff; }
    .t-btn.active { background: #661B28; color: #fff; border-color: #BA7883; }
  `;
    document.head.appendChild(style);

    const header = document.createElement('div');
    header.className = 't-head';
    header.innerHTML = '<span>Nexus Theme Engine (200+)</span><span class="t-close">✕</span>';
    header.querySelector('.t-close').onclick = () => injector.remove();
    injector.appendChild(header);

    const controls = document.createElement('div');
    controls.className = 't-ctrls';
    const groups = ['All', 'Professional', 'Energetic', 'MinimalLight', 'Dark', 'Neon', 'Cyberpunk', 'Pastel'];
    const btns = {};
    groups.forEach(g => {
        const btn = document.createElement('button');
        btn.className = 't-btn' + (g === 'All' ? ' active' : '');
        btn.innerText = g;
        btn.onclick = () => { Object.values(btns).forEach(b => b.classList.remove('active')); btn.classList.add('active'); renderGrid(g); };
        btns[g] = btn;
        controls.appendChild(btn);
    });
    injector.appendChild(controls);

    const grid = document.createElement('div');
    grid.className = 't-grid';
    injector.appendChild(grid);

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
    function add(name, group, h, bgS, bgL, txtL, accS, accL) {
        const isLight = bgL > 60;
        const bg = hslToHex(h, bgS, bgL);
        const bgD = hslToHex(h, bgS, Math.max(0, bgL - 8));
        const bgLg = hslToHex(h, bgS, Math.min(100, bgL + 8));
        const textBright = hslToHex(h, bgS * 0.3, isLight ? txtL * 0.2 : txtL);
        const textMuted = hslToHex(h, bgS * 0.4, isLight ? txtL * 0.4 : txtL * 0.7);
        const acc = hslToHex((h + 35) % 360, accS, accL);

        themes.push({
            name, group, vars: {
                '--color-bg-base': bg,
                '--color-charcoal': bg,
                '--c-57545B': bg,
                '--color-cream': bgD,
                '--c-661B28': bgD,
                '--color-sepia': bgLg,
                '--c-716F75': bgLg,
                '--color-dust-gray': bgLg,
                '--c-959294': bgLg,
                '--color-text-primary': textBright,
                '--color-text-secondary': textMuted,
                '--c-AAAAAA': textMuted,
                '--color-accent-terracotta': acc,
                '--c-7F2B3E': acc,
                '--logo-filter': isLight ? 'brightness(0)' : 'brightness(0) invert(1)'
            }
        });
    }

    // Generate massive 200+
    for (let i = 0; i < 30; i++) {
        const h = Math.floor((i / 30) * 360);
        add('Prof-' + h, 'Professional', h, 15, 15, 95, 40, 50); // Professional Deep
        add('Dark-' + h, 'Dark', h, 10, 8, 90, 50, 50); // Standard Dark
        add('MinL-' + h, 'MinimalLight', h, 10, 95, 90, 40, 45); // Minimal Light
        add('Ene-' + h, 'Energetic', h, 85, 45, 95, 95, 55); // Highly Energetic 
        add('Neon-' + h, 'Neon', h, 100, 5, 100, 100, 50); // Pitch black bg, neon acc
        add('CyB-' + h, 'Cyberpunk', h, 90, 15, 90, 100, 60); // Cyberpunkish Dark
        add('Pst-' + h, 'Pastel', h, 50, 90, 80, 70, 70); // Pastel
    }

    // Shuffle themes to make the "All" view aesthetic
    themes.sort(() => 0.5 - Math.random());

    function renderGrid(filter) {
        grid.innerHTML = '';
        themes.forEach(t => {
            if (filter !== 'All' && t.group !== filter) return;
            const item = document.createElement('div');
            item.className = 't-item';
            item.title = t.name + ' - Click to apply';
            item.style.background = `linear-gradient(135deg, ${t.vars['--c-7F2B3E']} 50%, ${t.vars['--c-57545B']} 50%)`;
            item.onclick = () => {
                Object.keys(t.vars).forEach(k => document.documentElement.style.setProperty(k, t.vars[k]));
                console.log(`[Injector] Applied ${t.name}`);
            };
            grid.appendChild(item);
        });
    }
    renderGrid('All');

    let drg = false, ox, oy;
    header.onmousedown = e => { drg = true; ox = e.clientX - injector.getBoundingClientRect().left; oy = e.clientY - injector.getBoundingClientRect().top; };
    document.onmousemove = e => { if (drg) { injector.style.left = (e.clientX - ox) + 'px'; injector.style.top = (e.clientY - oy) + 'px'; injector.style.right = 'auto'; } };
    document.onmouseup = () => drg = false;

    document.body.appendChild(injector);
    console.log('[Theme Engine] Booted. Enjoy 200+ elite presets.');
})();