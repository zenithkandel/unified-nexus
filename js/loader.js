export function hideLoader(delayMs = 320) {
    const loader = document.getElementById('loader');
    if (!loader) {
        return;
    }

    window.setTimeout(() => {
        loader.classList.add('hidden');
    }, delayMs);
}

