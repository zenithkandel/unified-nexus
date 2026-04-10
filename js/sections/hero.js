export function initHero() {
    const heading = document.querySelector('#hero h1');
    if (!heading) {
        return;
    }
    heading.setAttribute('data-ready', 'true');
}

