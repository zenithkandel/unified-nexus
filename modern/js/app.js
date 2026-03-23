/* ==========================================================================
   Modern Website — Main Application
   Clean, performant, and engaging interactions
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Loading Screen
     -------------------------------------------------------------------------- */
  class LoadingScreen {
    constructor() {
      this.loader = document.querySelector('.loader');
      this.init();
    }

    init() {
      if (!this.loader) return;

      // Simulate loading progress
      setTimeout(() => this.hide(), 1200);
    }

    hide() {
      if (!this.loader) return;
      this.loader.classList.add('hidden');

      setTimeout(() => {
        this.loader.remove();
        document.body.classList.remove('loading');
        window.dispatchEvent(new CustomEvent('loadingComplete'));
      }, 400);
    }
  }

  /* --------------------------------------------------------------------------
     Navbar Scroll Behavior
     -------------------------------------------------------------------------- */
  class NavbarScroll {
    constructor() {
      this.navbar = document.querySelector('.navbar');
      this.lastScroll = 0;
      this.init();
    }

    init() {
      if (!this.navbar) return;

      window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
          this.navbar.classList.add('scrolled');
        } else {
          this.navbar.classList.remove('scrolled');
        }

        // Hide/show on scroll direction
        if (currentScroll > this.lastScroll && currentScroll > 200) {
          this.navbar.style.transform = 'translateY(-100%)';
        } else {
          this.navbar.style.transform = 'translateY(0)';
        }

        this.lastScroll = currentScroll;
      }, { passive: true });
    }
  }

  /* --------------------------------------------------------------------------
     Scroll Reveal Animations
     -------------------------------------------------------------------------- */
  class ScrollReveal {
    constructor() {
      this.elements = document.querySelectorAll('[data-reveal]');
      this.staggerContainers = document.querySelectorAll('[data-stagger]');
      this.init();
    }

    init() {
      if (this.elements.length === 0 && this.staggerContainers.length === 0) return;

      const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      };

      // Standard reveal observer
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);

      this.elements.forEach(el => revealObserver.observe(el));

      // Stagger reveal observer
      const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            staggerObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);

      this.staggerContainers.forEach(container => staggerObserver.observe(container));
    }
  }

  /* --------------------------------------------------------------------------
     Counter Animations
     -------------------------------------------------------------------------- */
  class CounterAnimation {
    constructor() {
      this.counters = document.querySelectorAll('[data-count]');
      this.animated = new Set();
      this.init();
    }

    init() {
      if (this.counters.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animated.has(entry.target)) {
            this.animated.add(entry.target);
            this.animateCounter(entry.target);
          }
        });
      }, { threshold: 0.5 });

      this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
      const target = parseInt(element.dataset.count);
      const suffix = element.dataset.suffix || '';
      const duration = 1500;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        element.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target + suffix;
        }
      };

      requestAnimationFrame(updateCounter);
    }
  }

  /* --------------------------------------------------------------------------
     Smooth Scrolling
     -------------------------------------------------------------------------- */
  class SmoothScroll {
    constructor() {
      this.init();
    }

    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href');
          if (targetId === '#') return;

          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     Mobile Navigation
     -------------------------------------------------------------------------- */
  class MobileNav {
    constructor() {
      this.toggle = document.querySelector('.navbar__toggle');
      this.menu = document.querySelector('.navbar__menu');
      this.init();
    }

    init() {
      if (!this.toggle || !this.menu) return;

      this.toggle.addEventListener('click', () => {
        this.menu.classList.toggle('active');
        this.toggle.classList.toggle('active');
      });

      // Close menu on link click
      this.menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          this.menu.classList.remove('active');
          this.toggle.classList.remove('active');
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     Magnetic Buttons
     -------------------------------------------------------------------------- */
  class MagneticButtons {
    constructor() {
      this.buttons = document.querySelectorAll('.btn, .navbar__cta');
      this.init();
    }

    init() {
      if (window.matchMedia('(hover: none)').matches) return;

      this.buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate(0, 0)';
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     Card Tilt Effect
     -------------------------------------------------------------------------- */
  class CardTilt {
    constructor() {
      this.cards = document.querySelectorAll('.about-card, .club-card, .team-card');
      this.init();
    }

    init() {
      if (window.matchMedia('(hover: none)').matches) return;

      this.cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;

          const rotateX = (y - 0.5) * -10;
          const rotateY = (x - 0.5) * 10;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     Cursor Glow Effect
     -------------------------------------------------------------------------- */
  class CursorGlow {
    constructor() {
      this.glow = null;
      this.mouseX = 0;
      this.mouseY = 0;
      this.glowX = 0;
      this.glowY = 0;
      this.init();
    }

    init() {
      if (window.matchMedia('(hover: none)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      this.createGlow();
      this.addListeners();
      this.animate();
    }

    createGlow() {
      this.glow = document.createElement('div');
      this.glow.className = 'cursor-glow';
      this.glow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(132,169,140,0.08) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
        opacity: 0;
      `;
      document.body.appendChild(this.glow);
    }

    addListeners() {
      document.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.glow.style.opacity = '1';
      });

      document.addEventListener('mouseleave', () => {
        this.glow.style.opacity = '0';
      });
    }

    animate() {
      this.glowX += (this.mouseX - this.glowX) * 0.1;
      this.glowY += (this.mouseY - this.glowY) * 0.1;

      this.glow.style.left = `${this.glowX}px`;
      this.glow.style.top = `${this.glowY}px`;

      requestAnimationFrame(() => this.animate());
    }
  }

  /* --------------------------------------------------------------------------
     Text Scramble Effect
     -------------------------------------------------------------------------- */
  class TextScramble {
    constructor() {
      this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      this.elements = document.querySelectorAll('[data-scramble]');
      this.init();
    }

    init() {
      this.elements.forEach(el => {
        const originalText = el.textContent;

        el.addEventListener('mouseenter', () => {
          this.scramble(el, originalText);
        });
      });
    }

    scramble(element, finalText) {
      let iteration = 0;
      const interval = setInterval(() => {
        element.textContent = finalText.split('')
          .map((char, index) => {
            if (index < iteration) return finalText[index];
            if (char === ' ') return ' ';
            return this.chars[Math.floor(Math.random() * this.chars.length)];
          })
          .join('');

        if (iteration >= finalText.length) {
          clearInterval(interval);
        }
        iteration += 1 / 2;
      }, 30);
    }
  }

  /* --------------------------------------------------------------------------
     Scroll Progress Indicator
     -------------------------------------------------------------------------- */
  class ScrollProgress {
    constructor() {
      this.bar = null;
      this.init();
    }

    init() {
      this.createBar();
      window.addEventListener('scroll', () => this.update(), { passive: true });
    }

    createBar() {
      this.bar = document.createElement('div');
      this.bar.className = 'scroll-progress-bar';
      this.bar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--clr-primary, #84a98c) 0%, var(--clr-accent, #c08b6c) 100%);
        width: 0%;
        z-index: 10000;
        transition: width 0.1s linear;
      `;
      document.body.appendChild(this.bar);
    }

    update() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      this.bar.style.width = `${Math.min(100, progress)}%`;
    }
  }

  /* --------------------------------------------------------------------------
     Parallax Hero Gradients
     -------------------------------------------------------------------------- */
  class ParallaxGradients {
    constructor() {
      this.gradients = document.querySelectorAll('.hero__gradient');
      this.init();
    }

    init() {
      if (this.gradients.length === 0) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        this.gradients.forEach((gradient, index) => {
          const speed = 0.1 + index * 0.05;
          gradient.style.transform = `translateY(${scrollY * speed}px)`;
        });
      }, { passive: true });
    }
  }

  /* --------------------------------------------------------------------------
     Form Interactions
     -------------------------------------------------------------------------- */
  class FormInteractions {
    constructor() {
      this.form = document.querySelector('.contact__form');
      this.init();
    }

    init() {
      if (!this.form) return;

      // Input focus effects
      const inputs = this.form.querySelectorAll('.form__input, .form__select, .form__textarea');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          input.parentElement.classList.add('form__group--focused');
        });

        input.addEventListener('blur', () => {
          if (!input.value) {
            input.parentElement.classList.remove('form__group--focused');
          }
        });
      });

      // Form submission
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = this.form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
          btn.innerHTML = 'Sent!';
          btn.style.background = 'var(--clr-primary)';

          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            btn.style.background = '';
            this.form.reset();
          }, 2000);
        }, 1500);
      });
    }
  }

  /* --------------------------------------------------------------------------
     Section Active Indicators
     -------------------------------------------------------------------------- */
  class SectionIndicators {
    constructor() {
      this.sections = document.querySelectorAll('section[id]');
      this.navLinks = document.querySelectorAll('.navbar__link');
      this.init();
    }

    init() {
      if (this.sections.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            this.navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      }, { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' });

      this.sections.forEach(section => observer.observe(section));
    }
  }

  /* --------------------------------------------------------------------------
     Ripple Effect on Buttons
     -------------------------------------------------------------------------- */
  class RippleEffect {
    constructor() {
      this.buttons = document.querySelectorAll('.btn');
      this.init();
    }

    init() {
      // Add ripple keyframes
      if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
          @keyframes ripple {
            to {
              width: 300px;
              height: 300px;
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      this.buttons.forEach(btn => {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';

        btn.addEventListener('click', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const ripple = document.createElement('span');
          ripple.className = 'btn-ripple';
          ripple.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255,255,255,0.4);
            transform: translate(-50%, -50%);
            left: ${x}px;
            top: ${y}px;
            animation: ripple 0.6s ease-out forwards;
            pointer-events: none;
          `;

          btn.appendChild(ripple);
          setTimeout(() => ripple.remove(), 600);
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     Floating Action Elements
     -------------------------------------------------------------------------- */
  class FloatingElements {
    constructor() {
      this.init();
    }

    init() {
      // Add floating animation keyframes
      if (!document.querySelector('#float-style')) {
        const style = document.createElement('style');
        style.id = 'float-style';
        style.textContent = `
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .hero__float-card {
            animation: float 4s ease-in-out infinite;
          }

          .hero__float-card--1 { animation-delay: 0s; }
          .hero__float-card--2 { animation-delay: 1s; }
        `;
        document.head.appendChild(style);
      }
    }
  }

  /* --------------------------------------------------------------------------
     Hero Image Parallax
     -------------------------------------------------------------------------- */
  class HeroImageParallax {
    constructor() {
      this.image = document.querySelector('.hero__image-wrapper');
      this.init();
    }

    init() {
      if (!this.image) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < 800) {
          this.image.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
      }, { passive: true });
    }
  }

  /* --------------------------------------------------------------------------
     Club Card Hover Effects
     -------------------------------------------------------------------------- */
  class ClubCardEffects {
    constructor() {
      this.cards = document.querySelectorAll('.club-card');
      this.init();
    }

    init() {
      if (window.matchMedia('(hover: none)').matches) return;

      this.cards.forEach(card => {
        const icon = card.querySelector('.club-card__icon');

        card.addEventListener('mouseenter', () => {
          if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
          }
        });

        card.addEventListener('mouseleave', () => {
          if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
          }
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     Initialize All Features
     -------------------------------------------------------------------------- */
  class App {
    constructor() {
      this.features = [];
      this.init();
    }

    init() {
      // Start loading screen
      new LoadingScreen();

      // Initialize features when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initFeatures());
      } else {
        this.initFeatures();
      }
    }

    initFeatures() {
      try {
        this.features = [
          new NavbarScroll(),
          new ScrollReveal(),
          new CounterAnimation(),
          new SmoothScroll(),
          new MobileNav(),
          new MagneticButtons(),
          new CardTilt(),
          new CursorGlow(),
          new TextScramble(),
          new ScrollProgress(),
          new ParallaxGradients(),
          new FormInteractions(),
          new SectionIndicators(),
          new RippleEffect(),
          new FloatingElements(),
          new HeroImageParallax(),
          new ClubCardEffects()
        ];

        console.log('Modern site initialized with', this.features.length, 'features');
      } catch (error) {
        console.error('Error initializing features:', error);
      }
    }
  }

  // Start the app
  new App();

})();
