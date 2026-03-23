/* ==========================================================================
   Unified Nexus — Interactive Features
   10 Engaging Features for a Lively User Experience
   OPTIMIZED: Faster, snappier animations
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. MAGNETIC BUTTONS
   -------------------------------------------------------------------------- */
class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll('.btn, .nav__cta, .cta__button');
    this.strength = 0.25;
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      btn.addEventListener('mousemove', (e) => this.onMouseMove(e, btn));
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  onMouseMove(e, btn) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * this.strength}px, ${y * this.strength}px)`;
  }
}

/* --------------------------------------------------------------------------
   2. TEXT REVEAL ANIMATIONS - FASTER
   -------------------------------------------------------------------------- */
class TextReveal {
  constructor() {
    this.elements = document.querySelectorAll('.section-title, .vision__quote');
    this.init();
  }

  init() {
    this.elements.forEach(el => {
      if (el.children.length > 0) return;

      const text = el.textContent;
      const words = text.split(' ');

      el.innerHTML = words.map((word, i) =>
        `<span class="word-reveal" style="--delay: ${i * 0.025}s">${word}</span>`
      ).join(' ');

      el.classList.add('text-reveal-ready');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('text-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.text-reveal-ready').forEach(el => observer.observe(el));
  }
}

/* --------------------------------------------------------------------------
   3. 3D TILT EFFECT ON CARDS - SNAPPIER
   -------------------------------------------------------------------------- */
class TiltCards {
  constructor() {
    this.cards = document.querySelectorAll('.club-card, .member-card');
    this.maxTilt = 8;
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform 0.1s ease-out';

      card.addEventListener('mousemove', (e) => this.onMouseMove(e, card));
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        const shine = card.querySelector('.card-shine');
        if (shine) shine.style.background = 'transparent';
      });
    });
  }

  onMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -this.maxTilt;
    const rotateY = ((x - centerX) / centerX) * this.maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    let shine = card.querySelector('.card-shine');
    if (!shine) {
      shine = document.createElement('div');
      shine.className = 'card-shine';
      shine.style.cssText = 'position:absolute;inset:0;pointer-events:none;border-radius:inherit;z-index:10;';
      card.style.position = 'relative';
      card.appendChild(shine);
    }
    shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.12) 0%, transparent 50%)`;
  }
}

/* --------------------------------------------------------------------------
   4. FLOATING PARTICLES - FASTER MOVEMENT
   -------------------------------------------------------------------------- */
class FloatingParticles {
  constructor() {
    this.container = null;
    this.particleCount = 20;
    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'particles-container';
    this.container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden;';
    document.body.appendChild(this.container);

    for (let i = 0; i < this.particleCount; i++) {
      this.createParticle();
    }

    if (!document.querySelector('#particle-keyframes')) {
      const style = document.createElement('style');
      style.id = 'particle-keyframes';
      style.textContent = `
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -25px); }
          50% { transform: translate(-15px, 15px); }
          75% { transform: translate(25px, 8px); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  createParticle() {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 2;
    const duration = Math.random() * 8 + 8;

    particle.className = 'floating-particle';
    particle.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      background:var(--color-accent-warm,#c9a87c);
      border-radius:50%;
      left:${Math.random() * 100}%;top:${Math.random() * 100}%;
      opacity:${Math.random() * 0.25 + 0.08};
      animation:floatParticle ${duration}s ease-in-out ${Math.random() * -10}s infinite;
    `;
    this.container.appendChild(particle);
  }
}

/* --------------------------------------------------------------------------
   5. SCROLL PROGRESS INDICATOR
   -------------------------------------------------------------------------- */
class ScrollProgress {
  constructor() {
    this.bar = document.createElement('div');
    this.bar.className = 'scroll-progress';
    this.bar.style.cssText = `
      position:fixed;top:0;left:0;height:3px;
      background:linear-gradient(90deg,var(--color-accent-warm,#c9a87c),var(--color-accent-cool,#8fa5b2));
      width:0%;z-index:9999;transition:width 0.05s linear;
    `;
    document.body.appendChild(this.bar);
    window.addEventListener('scroll', () => this.update(), { passive: true });
    this.update();
  }

  update() {
    const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    this.bar.style.width = `${Math.min(100, progress)}%`;
  }
}

/* --------------------------------------------------------------------------
   6. CURSOR TRAIL - FASTER & LIGHTER
   -------------------------------------------------------------------------- */
class CursorTrail {
  constructor() {
    this.dots = [];
    this.dotCount = 8;
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    for (let i = 0; i < this.dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      const size = Math.max(2, 6 - i * 0.5);
      dot.style.cssText = `
        position:fixed;width:${size}px;height:${size}px;
        background:var(--color-accent-warm,#c9a87c);border-radius:50%;
        pointer-events:none;z-index:9998;opacity:${0.6 - i * 0.07};
      `;
      document.body.appendChild(dot);
      this.dots.push({ el: dot, x: 0, y: 0 });
    }

    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    this.animate();
  }

  animate() {
    let x = this.mouseX, y = this.mouseY;

    this.dots.forEach((dot, i) => {
      dot.x += (x - dot.x) * (0.4 - i * 0.03);
      dot.y += (y - dot.y) * (0.4 - i * 0.03);
      dot.el.style.transform = `translate(${dot.x - 3}px, ${dot.y - 3}px)`;
      x = dot.x;
      y = dot.y;
    });

    requestAnimationFrame(() => this.animate());
  }
}

/* --------------------------------------------------------------------------
   7. COUNTER ANIMATIONS - FASTER & FIXED
   -------------------------------------------------------------------------- */
class CounterAnimations {
  constructor() {
    this.animated = new Set();
    this.init();
  }

  init() {
    const statNumbers = document.querySelectorAll('.about__stat-number');
    if (statNumbers.length === 0) return;

    // Store original values and reset to 0
    statNumbers.forEach(el => {
      const text = el.textContent.trim();
      const match = text.match(/^(\d+)(.*)$/);
      if (match) {
        el.dataset.target = match[1];
        el.dataset.suffix = match[2] || '';
        el.textContent = '0' + (match[2] || '');
      }
    });

    // Create observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated.has(entry.target)) {
          this.animated.add(entry.target);
          this.animateCounter(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(el => observer.observe(el));

    // Also check if already visible (for page refresh scenarios)
    setTimeout(() => {
      statNumbers.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !this.animated.has(el)) {
          this.animated.add(el);
          this.animateCounter(el);
        }
      });
    }, 100);
  }

  animateCounter(el) {
    const target = parseInt(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
}

/* --------------------------------------------------------------------------
   8. INTERACTIVE LOGO - FASTER SPIN
   -------------------------------------------------------------------------- */
class InteractiveLogo {
  constructor() {
    this.logos = document.querySelectorAll('.nav__logo, .footer__logo');
    this.clickCount = 0;
    this.init();
  }

  init() {
    this.logos.forEach(logo => {
      logo.style.cursor = 'pointer';
      logo.addEventListener('click', (e) => this.onClick(e, logo));
    });
  }

  onClick(e, logo) {
    e.preventDefault();
    this.clickCount++;

    logo.style.transition = 'transform 0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    logo.style.transform = `rotate(${360 * this.clickCount}deg) scale(1.15)`;

    this.createBurst(e.clientX, e.clientY);

    setTimeout(() => {
      logo.style.transform = `rotate(${360 * this.clickCount}deg) scale(1)`;
    }, 200);

    if (this.clickCount === 5) {
      this.triggerEasterEgg();
      this.clickCount = 0;
    }
  }

  createBurst(x, y) {
    const colors = ['#c9a87c', '#8fa5b2', '#d4c5a9', '#a69070'];

    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      const angle = (i / 10) * Math.PI * 2;
      const velocity = 40 + Math.random() * 40;

      particle.style.cssText = `
        position:fixed;left:${x}px;top:${y}px;width:6px;height:6px;
        background:${colors[i % colors.length]};border-radius:50%;
        pointer-events:none;z-index:10000;
      `;
      document.body.appendChild(particle);

      particle.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`, opacity: 0 }
      ], { duration: 400, easing: 'cubic-bezier(0,0.5,0.5,1)' }).onfinish = () => particle.remove();
    }
  }

  triggerEasterEgg() {
    const colors = ['#c9a87c', '#8fa5b2', '#d4c5a9', '#a69070', '#e8e0d5'];

    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
          position:fixed;left:${Math.random() * window.innerWidth}px;top:-20px;
          width:${Math.random() * 8 + 4}px;height:${Math.random() * 8 + 4}px;
          background:${colors[Math.floor(Math.random() * colors.length)]};
          pointer-events:none;z-index:10000;
          border-radius:${Math.random() > 0.5 ? '50%' : '0'};
        `;
        document.body.appendChild(confetti);

        confetti.animate([
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 540}deg)`, opacity: 0.4 }
        ], { duration: 1200 + Math.random() * 600, easing: 'ease-in' }).onfinish = () => confetti.remove();
      }, i * 20);
    }
  }
}

/* --------------------------------------------------------------------------
   9. SECTION COLOR TRANSITIONS
   -------------------------------------------------------------------------- */
class SectionColorTransitions {
  constructor() {
    this.sections = document.querySelectorAll('section');
    this.colors = [
      { bg: '#f5f0e8', accent: '#c9a87c' },
      { bg: '#f0ebe3', accent: '#b89a6a' },
      { bg: '#e8e3db', accent: '#8fa5b2' },
      { bg: '#f2ede5', accent: '#a69070' },
      { bg: '#ebe6de', accent: '#c9a87c' },
    ];
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
          const colorIndex = parseInt(entry.target.dataset.colorIndex) || 0;
          const color = this.colors[colorIndex];
          document.documentElement.style.setProperty('--section-bg', color.bg);
          document.documentElement.style.setProperty('--section-accent', color.accent);
        }
      });
    }, { threshold: [0.25] });

    this.sections.forEach((section, i) => {
      section.dataset.colorIndex = i % this.colors.length;
      observer.observe(section);
    });
  }
}

/* --------------------------------------------------------------------------
   10. TYPING EFFECT - FASTER
   -------------------------------------------------------------------------- */
class TypingEffect {
  constructor() {
    this.element = document.querySelector('.hero__description');
    this.originalText = '';
    this.started = false;
    this.init();
  }

  init() {
    if (!this.element) return;

    this.originalText = this.element.textContent.trim();
    this.element.textContent = '';
    this.element.style.borderRight = '2px solid var(--color-accent-warm, #c9a87c)';
    this.element.style.minHeight = '4em';

    window.addEventListener('loaderComplete', () => {
      if (!this.started) {
        this.started = true;
        setTimeout(() => this.type(), 200);
      }
    });

    // Fallback
    setTimeout(() => {
      if (!this.started) {
        this.started = true;
        this.type();
      }
    }, 2000);
  }

  type() {
    let i = 0;
    const speed = 20; // Faster typing

    const typeChar = () => {
      if (i < this.originalText.length) {
        this.element.textContent += this.originalText.charAt(i);
        i++;
        setTimeout(typeChar, speed);
      } else {
        setTimeout(() => {
          this.element.style.borderRight = 'none';
        }, 500);
      }
    };

    typeChar();
  }
}

/* --------------------------------------------------------------------------
   SMOOTH SCROLL
   -------------------------------------------------------------------------- */
class SmoothScrollEnhanced {
  constructor() {
    document.documentElement.style.scrollBehavior = 'smooth';

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   PARALLAX - SUBTLE
   -------------------------------------------------------------------------- */
class ParallaxElements {
  constructor() {
    this.elements = document.querySelectorAll('.registration-mark');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      this.elements.forEach((el, i) => {
        el.style.transform = `translateY(${scrollY * (0.05 + i * 0.02)}px)`;
      });
    }, { passive: true });
  }
}

/* --------------------------------------------------------------------------
   INITIALIZE
   -------------------------------------------------------------------------- */
class InteractionsManager {
  constructor() {
    this.features = [];

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    window.addEventListener('loaderComplete', () => this.initFeatures());

    // Fallback
    setTimeout(() => {
      if (this.features.length === 0) this.initFeatures();
    }, 2000);
  }

  initFeatures() {
    if (this.features.length > 0) return;

    try {
      this.features = [
        new MagneticButtons(),
        new TextReveal(),
        new TiltCards(),
        new FloatingParticles(),
        new ScrollProgress(),
        new CursorTrail(),
        new CounterAnimations(),
        new InteractiveLogo(),
        new SectionColorTransitions(),
        new TypingEffect(),
        new SmoothScrollEnhanced(),
        new ParallaxElements()
      ];
      console.log('Unified Nexus: Interactive features loaded');
    } catch (err) {
      console.error('Unified Nexus: Error loading features', err);
    }
  }
}

new InteractionsManager();
