/* ==========================================================================
   Unified Nexus — Interactive Features
   10 Engaging Features for a Lively User Experience
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. MAGNETIC BUTTONS
   Buttons attract toward cursor on hover
   -------------------------------------------------------------------------- */
class MagneticButtons {
  constructor() {
    this.buttons = document.querySelectorAll('.btn, .nav__cta, .cta__button');
    this.strength = 0.3;
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

      btn.addEventListener('mousemove', (e) => this.onMouseMove(e, btn));
      btn.addEventListener('mouseleave', (e) => this.onMouseLeave(e, btn));
    });
  }

  onMouseMove(e, btn) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * this.strength}px, ${y * this.strength}px)`;
  }

  onMouseLeave(e, btn) {
    btn.style.transform = 'translate(0, 0)';
  }
}

/* --------------------------------------------------------------------------
   2. TEXT REVEAL ANIMATIONS
   Words/letters animate in on scroll
   -------------------------------------------------------------------------- */
class TextReveal {
  constructor() {
    // Only target simple text elements without existing nested structure
    this.elements = document.querySelectorAll('.section-title, .vision__quote');
    this.init();
  }

  init() {
    this.elements.forEach(el => {
      // Skip if already has nested elements (like spans)
      if (el.children.length > 0) return;

      // Split text into words
      const text = el.textContent;
      const words = text.split(' ');

      el.innerHTML = words.map((word, i) =>
        `<span class="word-reveal" style="--delay: ${i * 0.05}s">${word}</span>`
      ).join(' ');

      el.classList.add('text-reveal-ready');
    });

    // Observe elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('text-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.text-reveal-ready').forEach(el => observer.observe(el));
  }
}

/* --------------------------------------------------------------------------
   3. 3D TILT EFFECT ON CARDS
   Cards tilt toward cursor position
   -------------------------------------------------------------------------- */
class TiltCards {
  constructor() {
    this.cards = document.querySelectorAll('.club-card, .member-card');
    this.maxTilt = 10;
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform 0.15s ease-out';

      card.addEventListener('mousemove', (e) => this.onMouseMove(e, card));
      card.addEventListener('mouseleave', (e) => this.onMouseLeave(e, card));
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

    // Add shine effect
    const shine = card.querySelector('.card-shine') || this.createShine(card);
    shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 50%)`;
  }

  onMouseLeave(e, card) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    const shine = card.querySelector('.card-shine');
    if (shine) shine.style.background = 'transparent';
  }

  createShine(card) {
    const shine = document.createElement('div');
    shine.className = 'card-shine';
    shine.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: inherit;
      z-index: 10;
    `;
    card.style.position = 'relative';
    card.appendChild(shine);
    return shine;
  }
}

/* --------------------------------------------------------------------------
   4. FLOATING PARTICLES
   Ambient particles floating in the background
   -------------------------------------------------------------------------- */
class FloatingParticles {
  constructor() {
    this.container = null;
    this.particleCount = 30;
    this.particles = [];
    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'particles-container';
    this.container.style.cssText = `
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;

    // Insert after main-content so particles appear above background
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.appendChild(this.container);
    } else {
      document.body.appendChild(this.container);
    }

    for (let i = 0; i < this.particleCount; i++) {
      this.createParticle();
    }

    this.animate();
  }

  createParticle() {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * -20;

    particle.className = 'floating-particle';
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: var(--color-accent-warm, #c9a87c);
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      opacity: ${Math.random() * 0.3 + 0.1};
      animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
    `;

    this.container.appendChild(particle);
    this.particles.push(particle);
  }

  animate() {
    // Add keyframes if not exists
    if (!document.querySelector('#particle-keyframes')) {
      const style = document.createElement('style');
      style.id = 'particle-keyframes';
      style.textContent = `
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(-20px, 20px) rotate(180deg); }
          75% { transform: translate(40px, 10px) rotate(270deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }
}

/* --------------------------------------------------------------------------
   5. SCROLL PROGRESS INDICATOR
   Shows reading progress at top of page
   -------------------------------------------------------------------------- */
class ScrollProgress {
  constructor() {
    this.bar = null;
    this.init();
  }

  init() {
    this.bar = document.createElement('div');
    this.bar.className = 'scroll-progress';
    this.bar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--color-accent-warm, #c9a87c), var(--color-accent-cool, #8fa5b2));
      width: 0%;
      z-index: 9999;
      transition: width 0.1s linear;
    `;
    document.body.appendChild(this.bar);

    window.addEventListener('scroll', () => this.updateProgress(), { passive: true });
  }

  updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    this.bar.style.width = `${progress}%`;
  }
}

/* --------------------------------------------------------------------------
   6. CURSOR TRAIL EFFECT
   Smooth trail following the cursor
   -------------------------------------------------------------------------- */
class CursorTrail {
  constructor() {
    this.dots = [];
    this.dotCount = 12;
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    // Create trail dots
    for (let i = 0; i < this.dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-trail-dot';
      const size = Math.max(2, 8 - i * 0.5);
      dot.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: var(--color-accent-warm, #c9a87c);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: ${1 - i * 0.08};
        transition: transform 0.1s ease-out;
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
    let x = this.mouseX;
    let y = this.mouseY;

    this.dots.forEach((dot, i) => {
      const nextX = x;
      const nextY = y;

      dot.x += (nextX - dot.x) * (0.3 - i * 0.02);
      dot.y += (nextY - dot.y) * (0.3 - i * 0.02);

      dot.el.style.transform = `translate(${dot.x - 4}px, ${dot.y - 4}px)`;

      x = dot.x;
      y = dot.y;
    });

    requestAnimationFrame(() => this.animate());
  }
}

/* --------------------------------------------------------------------------
   7. COUNTER ANIMATIONS
   Numbers count up when visible
   -------------------------------------------------------------------------- */
class CounterAnimations {
  constructor() {
    this.counters = [];
    this.init();
  }

  init() {
    // Use existing stats in the about section
    const statNumbers = document.querySelectorAll('.about__stat-number');

    statNumbers.forEach(el => {
      // Parse the text content to extract number and suffix
      const text = el.textContent.trim();
      const match = text.match(/^(\d+)(.*)$/);
      if (match) {
        el.dataset.count = match[1];
        el.dataset.suffix = match[2] || '';
        el.textContent = '0' + (match[2] || '');
      }
    });

    // Observe counters
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
  }

  animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }
}

/* --------------------------------------------------------------------------
   8. INTERACTIVE LOGO ANIMATION
   Logo responds to clicks with fun animation
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

    // Spin animation
    logo.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    logo.style.transform = `rotate(${360 * this.clickCount}deg) scale(1.1)`;

    // Create burst particles
    this.createBurst(e.clientX, e.clientY);

    // Reset after animation
    setTimeout(() => {
      logo.style.transform = `rotate(${360 * this.clickCount}deg) scale(1)`;
    }, 300);

    // Easter egg: after 5 clicks
    if (this.clickCount === 5) {
      this.triggerEasterEgg();
    }
  }

  createBurst(x, y) {
    const colors = ['#c9a87c', '#8fa5b2', '#d4c5a9', '#a69070'];

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      const angle = (i / 12) * Math.PI * 2;
      const velocity = 50 + Math.random() * 50;

      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: ${colors[i % colors.length]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
      `;

      document.body.appendChild(particle);

      // Animate particle
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity;

      particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
      ], {
        duration: 600,
        easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
      }).onfinish = () => particle.remove();
    }
  }

  triggerEasterEgg() {
    // Fun confetti burst
    const confettiCount = 50;
    const colors = ['#c9a87c', '#8fa5b2', '#d4c5a9', '#a69070', '#e8e0d5'];

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
          position: fixed;
          left: ${Math.random() * window.innerWidth}px;
          top: -20px;
          width: ${Math.random() * 10 + 5}px;
          height: ${Math.random() * 10 + 5}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          pointer-events: none;
          z-index: 10000;
          border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;

        document.body.appendChild(confetti);

        confetti.animate([
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`, opacity: 0.5 }
        ], {
          duration: 2000 + Math.random() * 1000,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
      }, i * 30);
    }

    this.clickCount = 0; // Reset for next easter egg
  }
}

/* --------------------------------------------------------------------------
   9. SECTION COLOR TRANSITIONS
   Background subtly shifts per section
   -------------------------------------------------------------------------- */
class SectionColorTransitions {
  constructor() {
    this.sections = document.querySelectorAll('section');
    this.colors = [
      { bg: '#f5f0e8', accent: '#c9a87c' }, // Default paper
      { bg: '#f0ebe3', accent: '#b89a6a' }, // Warmer
      { bg: '#e8e3db', accent: '#8fa5b2' }, // Cool accent
      { bg: '#f2ede5', accent: '#a69070' }, // Neutral
      { bg: '#ebe6de', accent: '#c9a87c' }, // Warm return
    ];
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          this.transitionTo(entry.target);
        }
      });
    }, { threshold: [0.3], rootMargin: '-10% 0px' });

    this.sections.forEach((section, i) => {
      section.dataset.colorIndex = i % this.colors.length;
      observer.observe(section);
    });
  }

  transitionTo(section) {
    const colorIndex = parseInt(section.dataset.colorIndex);
    const color = this.colors[colorIndex];

    document.documentElement.style.setProperty('--section-bg', color.bg);
    document.documentElement.style.setProperty('--section-accent', color.accent);
  }
}

/* --------------------------------------------------------------------------
   10. TYPING EFFECT
   Hero tagline types out character by character
   -------------------------------------------------------------------------- */
class TypingEffect {
  constructor() {
    this.element = document.querySelector('.hero__description');
    this.originalText = '';
    this.init();
  }

  init() {
    if (!this.element) return;

    this.originalText = this.element.textContent.trim();
    this.element.textContent = '';
    this.element.style.borderRight = '2px solid var(--color-accent-warm, #c9a87c)';
    this.element.style.minHeight = '4em';

    // Wait for loader to complete
    window.addEventListener('loaderComplete', () => {
      setTimeout(() => this.type(), 500);
    });

    // Fallback if loader already complete
    if (!document.body.classList.contains('loading')) {
      setTimeout(() => this.type(), 500);
    }
  }

  type() {
    let i = 0;
    const speed = 50;

    const typeChar = () => {
      if (i < this.originalText.length) {
        this.element.textContent += this.originalText.charAt(i);
        i++;
        setTimeout(typeChar, speed);
      } else {
        // Remove cursor after typing complete
        setTimeout(() => {
          this.element.style.borderRight = 'none';
        }, 1000);
      }
    };

    typeChar();
  }
}

/* --------------------------------------------------------------------------
   SMOOTH SCROLL ENHANCEMENT
   Adds momentum and smoothness to scrolling
   -------------------------------------------------------------------------- */
class SmoothScrollEnhanced {
  constructor() {
    // Add smooth scroll CSS
    document.documentElement.style.scrollBehavior = 'smooth';

    // Handle anchor links
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
   PARALLAX ELEMENTS
   Subtle parallax on decorative elements
   -------------------------------------------------------------------------- */
class ParallaxElements {
  constructor() {
    this.elements = document.querySelectorAll('.registration-mark, .paper-texture');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
  }

  onScroll() {
    const scrollY = window.scrollY;

    this.elements.forEach((el, i) => {
      const speed = 0.1 + (i * 0.05);
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }
}

/* --------------------------------------------------------------------------
   INITIALIZE ALL INTERACTIONS
   -------------------------------------------------------------------------- */
class InteractionsManager {
  constructor() {
    this.features = [];
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.waitForLoader());
    } else {
      this.waitForLoader();
    }
  }

  waitForLoader() {
    // Wait for loader to complete before initializing most features
    window.addEventListener('loaderComplete', () => {
      this.initFeatures();
    });

    // Fallback: if loader already complete or not present
    setTimeout(() => {
      if (this.features.length === 0) {
        this.initFeatures();
      }
    }, 2500);
  }

  initFeatures() {
    try {
      // Initialize all features
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

      console.log('Unified Nexus: All interactive features loaded');
    } catch (error) {
      console.error('Unified Nexus: Error loading interactive features', error);
    }
  }
}

// Start interactions
new InteractionsManager();
