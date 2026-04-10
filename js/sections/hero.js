/**
 * hero.js
 * 
 * Micro-script dedicated to animating text reveals, float-up motions, and 
 * scroll events specifically for the main Hero landing section.
 */
export function initHero() {
    const heading = document.querySelector('#hero h1');
    if (!heading) {
        return;
    }
    heading.setAttribute('data-ready', 'true');
}

