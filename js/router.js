export function initRouter() {
    const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function setActive() {
        const scrollMid = window.scrollY + window.innerHeight * 0.35;
        let activeId = sections[0]?.id || '';
        sections.forEach((section) => {
            if (scrollMid >= section.offsetTop) {
                activeId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const target = link.getAttribute('href') || '';
            link.classList.toggle('is-active', target === `#${activeId}`);
        });
    }

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
}

