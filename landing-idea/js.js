/* =====================================================
   KUSHMA ART PROJECT - GLOBAL JAVASCRIPT
   Shared utilities and functions for all pages
   ===================================================== */

'use strict';

// =====================================================
// GLOBAL UTILITIES
// =====================================================

const KAP = {
    // Debounce function for performance
    debounce(func, wait = 100) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit = 100) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
            rect.bottom >= 0
        );
    },

    // Smooth scroll to element
    scrollTo(target, offset = 0) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    },

    // Get CSS variable value
    getCSSVar(name) {
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    },

    // Set CSS variable
    setCSSVar(name, value) {
        document.documentElement.style.setProperty(name, value);
    },

    // Preload images
    preloadImages(urls) {
        return Promise.all(urls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = url;
            });
        }));
    }
};

// =====================================================
// SCROLL REVEAL ANIMATIONS
// =====================================================

class ScrollReveal {
    constructor(options = {}) {
        this.elements = document.querySelectorAll('.reveal, .reveal-stagger');
        this.options = {
            threshold: 0.15,
            ...options
        };
        this.init();
    }

    init() {
        if (!this.elements.length) return;

        // Use Intersection Observer for performance
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                { threshold: this.options.threshold }
            );

            this.elements.forEach(el => this.observer.observe(el));
        } else {
            // Fallback for older browsers
            this.elements.forEach(el => el.classList.add('revealed'));
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally unobserve after revealing
                this.observer.unobserve(entry.target);
            }
        });
    }

    // Reveal all elements immediately
    revealAll() {
        this.elements.forEach(el => el.classList.add('revealed'));
    }

    // Reset all elements
    reset() {
        this.elements.forEach(el => el.classList.remove('revealed'));
    }
}

// =====================================================
// NAVIGATION
// =====================================================

class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.toggle = document.querySelector('.nav-toggle');
        this.menu = document.querySelector('.nav-menu');
        this.overlay = document.querySelector('.nav-overlay');
        this.links = document.querySelectorAll('.nav-link');

        this.scrollThreshold = 100;
        this.isMenuOpen = false;

        this.init();
    }

    init() {
        if (!this.navbar) return;

        // Scroll handler
        window.addEventListener('scroll', KAP.throttle(() => this.handleScroll(), 50));

        // Mobile menu toggle
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
        }

        // Overlay click to close
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.closeMenu());
        }

        // Close menu on link click
        this.links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Initial scroll check
        this.handleScroll();
    }

    handleScroll() {
        if (window.scrollY > this.scrollThreshold) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.toggle.classList.toggle('active');
        this.menu.classList.toggle('active');
        if (this.overlay) {
            this.overlay.classList.toggle('active');
        }
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    closeMenu() {
        this.isMenuOpen = false;
        this.toggle?.classList.remove('active');
        this.menu?.classList.remove('active');
        this.overlay?.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// =====================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =====================================================

class SmoothScroll {
    constructor() {
        this.offset = 80; // Offset for fixed navbar
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleClick(e, anchor));
        });
    }

    handleClick(e, anchor) {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            KAP.scrollTo(target, this.offset);
        }
    }
}

// =====================================================
// PAGE LOADER
// =====================================================

class PageLoader {
    constructor() {
        this.loader = document.querySelector('.page-loader');
        this.init();
    }

    init() {
        if (!this.loader) return;

        // Hide loader when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => this.hide(), 500);
        });

        // Failsafe - hide loader after 3 seconds max
        setTimeout(() => this.hide(), 3000);
    }

    hide() {
        this.loader.classList.add('hidden');
        setTimeout(() => {
            this.loader.style.display = 'none';
        }, 500);
    }

    show() {
        this.loader.style.display = 'flex';
        this.loader.classList.remove('hidden');
    }
}

// =====================================================
// LAZY LOADING IMAGES
// =====================================================

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if (!this.images.length) return;

        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                { rootMargin: '50px 0px' }
            );

            this.images.forEach(img => this.observer.observe(img));
        } else {
            // Fallback
            this.images.forEach(img => this.loadImage(img));
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }

    loadImage(img) {
        const src = img.dataset.src;
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        }
    }
}

// =====================================================
// FORM UTILITIES
// =====================================================

const FormUtils = {
    // Validate email
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Validate phone (Nepal format)
    isValidPhone(phone) {
        return /^(\+977)?[0-9]{10}$/.test(phone.replace(/\s/g, ''));
    },

    // Sanitize input
    sanitize(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    // Show form message
    showMessage(form, message, type = 'success') {
        let msgEl = form.querySelector('.form-message');
        if (!msgEl) {
            msgEl = document.createElement('div');
            msgEl.className = 'form-message';
            form.appendChild(msgEl);
        }
        msgEl.textContent = message;
        msgEl.className = `form-message ${type}`;
        msgEl.style.display = 'block';

        setTimeout(() => {
            msgEl.style.display = 'none';
        }, 5000);
    }
};

// =====================================================
// INITIALIZE ON DOM READY
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize global components
    window.kapNavigation = new Navigation();
    window.kapSmoothScroll = new SmoothScroll();
    window.kapPageLoader = new PageLoader();
    window.kapLazyLoader = new LazyLoader();
    window.kapScrollReveal = new ScrollReveal();
});

// Export for use in other scripts
window.KAP = KAP;
window.FormUtils = FormUtils;

/* =====================================================
   KUSHMA ART PROJECT - INDEX PAGE JAVASCRIPT
   Landing page specific functionality
   ===================================================== */

'use strict';

// =====================================================
// COMPARISON SLIDER
// =====================================================

class ComparisonSlider {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            startPosition: 50,
            ...options
        };

        this.beforeImage = container.querySelector('.comparison-before');
        this.handle = container.querySelector('.slider-handle');
        this.isDragging = false;

        this.init();
    }

    init() {
        if (!this.container || !this.beforeImage || !this.handle) return;

        // Set initial position
        this.setPosition(this.options.startPosition);

        // Mouse events
        this.handle.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.endDrag());

        // Touch events
        this.handle.addEventListener('touchstart', (e) => this.startDrag(e), { passive: true });
        document.addEventListener('touchmove', (e) => this.drag(e), { passive: false });
        document.addEventListener('touchend', () => this.endDrag());

        // Click on container to move slider
        this.container.addEventListener('click', (e) => this.handleClick(e));

        // Keyboard navigation
        this.handle.setAttribute('tabindex', '0');
        this.handle.setAttribute('role', 'slider');
        this.handle.setAttribute('aria-valuemin', '0');
        this.handle.setAttribute('aria-valuemax', '100');
        this.handle.setAttribute('aria-valuenow', this.options.startPosition);
        this.handle.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    startDrag(e) {
        e.preventDefault();
        this.isDragging = true;
        this.container.style.cursor = 'ew-resize';
    }

    drag(e) {
        if (!this.isDragging) return;

        e.preventDefault();

        const rect = this.container.getBoundingClientRect();
        const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

        this.setPosition(percentage);
    }

    endDrag() {
        this.isDragging = false;
        this.container.style.cursor = 'ew-resize';
    }

    handleClick(e) {
        if (e.target.closest('.slider-handle')) return;

        const rect = this.container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

        this.animateToPosition(percentage);
    }

    handleKeydown(e) {
        const step = e.shiftKey ? 10 : 2;
        let currentPosition = parseFloat(this.handle.getAttribute('aria-valuenow'));

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.animateToPosition(Math.max(0, currentPosition - step));
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.animateToPosition(Math.min(100, currentPosition + step));
                break;
            case 'Home':
                e.preventDefault();
                this.animateToPosition(0);
                break;
            case 'End':
                e.preventDefault();
                this.animateToPosition(100);
                break;
        }
    }

    setPosition(percentage) {
        this.beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        this.handle.style.left = `${percentage}%`;
        this.handle.setAttribute('aria-valuenow', Math.round(percentage));
    }

    animateToPosition(percentage, duration = 300) {
        const start = parseFloat(this.handle.getAttribute('aria-valuenow'));
        const change = percentage - start;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (change * eased);

            this.setPosition(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}

// =====================================================
// COUNTER ANIMATION
// =====================================================

class CounterAnimation {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            duration: 2000,
            easing: 'easeOutCubic',
            ...options
        };

        this.target = parseFloat(element.dataset.target) || 0;
        this.suffix = element.dataset.suffix || '';
        this.prefix = element.dataset.prefix || '';
        this.hasAnimated = false;

        this.init();
    }

    init() {
        // Use Intersection Observer to trigger animation when visible
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !this.hasAnimated) {
                            this.animate();
                            this.hasAnimated = true;
                            this.observer.unobserve(this.element);
                        }
                    });
                },
                { threshold: 0.5 }
            );
            this.observer.observe(this.element);
        } else {
            this.animate();
        }
    }

    animate() {
        const startTime = performance.now();
        const startValue = 0;

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.options.duration, 1);

            // Easing function
            const eased = this.ease(progress);
            const current = Math.floor(startValue + (this.target - startValue) * eased);

            this.element.textContent = this.prefix + current + this.suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                this.element.textContent = this.prefix + this.target + this.suffix;
            }
        };

        requestAnimationFrame(update);
    }

    ease(t) {
        // Ease out cubic
        return 1 - Math.pow(1 - t, 3);
    }
}

// =====================================================
// GALLERY LIGHTBOX (Simple)
// =====================================================

class SimpleLightbox {
    constructor() {
        this.overlay = null;
        this.image = null;
        this.isOpen = false;

        this.init();
    }

    init() {
        // Create lightbox elements
        this.createElements();

        // Attach click events to gallery items
        document.querySelectorAll('.gallery-item, .polaroid').forEach(item => {
            item.addEventListener('click', (e) => {
                const img = item.querySelector('img');
                if (img) {
                    this.open(img.src, img.alt);
                }
            });
        });

        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    createElements() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'lightbox-overlay';
        this.overlay.innerHTML = `
            <button class="lightbox-close" aria-label="Close lightbox">
                <svg viewBox="0 0 24 24" width="32" height="32">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" fill="none"/>
                </svg>
            </button>
            <div class="lightbox-content">
                <img class="lightbox-image" src="" alt="">
            </div>
        `;

        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(26, 22, 20, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            cursor: pointer;
        `;

        const closeBtn = this.overlay.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 10px;
            z-index: 10;
        `;
        closeBtn.addEventListener('click', () => this.close());

        this.image = this.overlay.querySelector('.lightbox-image');
        this.image.style.cssText = `
            max-width: 90vw;
            max-height: 90vh;
            object-fit: contain;
            border: 10px solid white;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            cursor: default;
        `;

        document.body.appendChild(this.overlay);
    }

    open(src, alt = '') {
        this.image.src = src;
        this.image.alt = alt;
        this.overlay.style.opacity = '1';
        this.overlay.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
    }

    close() {
        this.overlay.style.opacity = '0';
        this.overlay.style.visibility = 'hidden';
        document.body.style.overflow = '';
        this.isOpen = false;
    }
}

// =====================================================
// INITIALIZE PAGE COMPONENTS
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize comparison sliders
    const heroSlider = document.querySelector('.hero .comparison-slider');
    if (heroSlider) {
        window.heroComparisonSlider = new ComparisonSlider(heroSlider, { startPosition: 50 });
    }

    // Initialize mini comparison sliders (Shatabdi section)
    document.querySelectorAll('.mini-comparison').forEach((slider, index) => {
        new ComparisonSlider(slider, { startPosition: 50 });
    });

    // Initialize counter animations
    document.querySelectorAll('.stat-number').forEach(counter => {
        new CounterAnimation(counter);
    });

    // Initialize lightbox
    window.lightbox = new SimpleLightbox();

    // Hide slider hint after interaction
    const sliderHint = document.querySelector('.slider-hint');
    if (sliderHint && heroSlider) {
        heroSlider.addEventListener('mousedown', () => {
            sliderHint.style.display = 'none';
        });
        heroSlider.addEventListener('touchstart', () => {
            sliderHint.style.display = 'none';
        });
    }

    // Parallax effect for hero (subtle)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', KAP.throttle(() => {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;

            if (scrolled < heroHeight) {
                const parallaxValue = scrolled * 0.3;
                heroSection.style.transform = `translateY(${parallaxValue}px)`;
            }
        }, 16));
    }

    // Animate gallery items on scroll
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length) {
        galleryItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.05}s`;
        });
    }

    console.log('Kushma Art Project - Landing page initialized');
});

// =====================================================
// SMOOTH LOAD ANIMATION
// =====================================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger hero elements animation
    setTimeout(() => {
        document.querySelectorAll('.hero .comparison-label').forEach((label, index) => {
            label.style.opacity = '1';
            label.style.transform = 'translateY(0)';
        });
    }, 500);
});
