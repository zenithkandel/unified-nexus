/**
 * loader.js
 * 
 * Utility for dynamically loading configuration or external script assets 
 * asynchronously throughout the front-end.
 */
export function hideLoader(delayMs = 320) {
    const loader = document.getElementById('loader');
    if (!loader) {
        return;
    }

    window.setTimeout(() => {
        loader.classList.add('hidden');
    }, delayMs);
}

