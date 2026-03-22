/* ==========================================================================
   Unified Nexus — Main JavaScript (Orchestration)
   ========================================================================== */

class UnifiedNexus {
  constructor() {
    this.init();
  }

  init() {
    this.initNavigation();
    this.initSmoothScroll();
    this.initMobileNav();
    this.initContactForm();
    this.initParallax();
  }

  initNavigation() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNav = () => {
      const scrollY = window.scrollY;

      if (scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    });
  }

  initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile nav if open
        this.closeMobileNav();
      });
    });
  }

  initMobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const mobileNav = document.querySelector('.nav__mobile');

    if (!toggle || !mobileNav) return;

    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('active');

      if (isOpen) {
        this.closeMobileNav();
      } else {
        this.openMobileNav();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileNav();
      }
    });
  }

  openMobileNav() {
    const mobileNav = document.querySelector('.nav__mobile');
    const toggle = document.querySelector('.nav__toggle');

    if (mobileNav) {
      mobileNav.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
    }
  }

  closeMobileNav() {
    const mobileNav = document.querySelector('.nav__mobile');
    const toggle = document.querySelector('.nav__toggle');

    if (mobileNav) {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  initContactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Collect form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        // For now, just simulate success (backend not implemented)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Show success message
        this.showFormMessage(form, 'Thank you! Your message has been sent.', 'success');
        form.reset();

      } catch (error) {
        this.showFormMessage(form, 'Sorry, there was an error. Please try again.', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  showFormMessage(form, message, type) {
    // Remove existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message--${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
      padding: 1rem;
      margin-top: 1rem;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      background-color: ${type === 'success' ? 'rgba(90, 94, 53, 0.1)' : 'rgba(139, 78, 53, 0.1)'};
      border: 1px solid ${type === 'success' ? 'var(--color-accent-olive)' : 'var(--color-accent-rust)'};
      color: ${type === 'success' ? 'var(--color-accent-olive)' : 'var(--color-accent-rust)'};
    `;

    form.appendChild(messageEl);

    // Remove message after 5 seconds
    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  }

  initParallax() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;

      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        const offset = scrollY * speed;
        el.style.transform = `translateY(${offset}px)`;
      });

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new UnifiedNexus();
});

// Expose to global scope for debugging
window.UnifiedNexus = UnifiedNexus;
