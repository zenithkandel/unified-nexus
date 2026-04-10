export function initParticles() {
	const layer = document.getElementById('particles');
	if (!layer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return;
	}

	const count = 14;
	for (let i = 0; i < count; i += 1) {
		const dot = document.createElement('span');
		dot.style.position = 'absolute';
		dot.style.width = '6px';
		dot.style.height = '6px';
		dot.style.borderRadius = '2px';
		dot.style.background = 'var(--accent)';
		dot.style.opacity = '0.2';
		dot.style.left = `${Math.random() * 100}%`;
		dot.style.top = `${Math.random() * 100}%`;
		dot.style.animation = `floatY ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 3}s infinite alternate`;
		layer.appendChild(dot);
	}

	if (!document.getElementById('particles-style')) {
		const style = document.createElement('style');
		style.id = 'particles-style';
		style.textContent = `
			@keyframes floatY {
				from { transform: translateY(0px); }
				to { transform: translateY(-20px); }
			}
		`;
		document.head.appendChild(style);
	}
}

