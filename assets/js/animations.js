/* ==========================================================================
   Unified Nexus — GSAP Animations
   ========================================================================== */

class Animations {
  constructor() {
    this.initOnLoad();
  }

  initOnLoad() {
    // Wait for loader to complete
    window.addEventListener('loaderComplete', () => {
      this.init();
    });

    // Fallback if loader doesn't exist
    if (!document.querySelector('.loader')) {
      this.init();
    }
  }

  init() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded. Animations disabled.');
      return;
    }

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.disableAnimations();
      return;
    }

    this.animateHero();
    this.animateSectionHeadings();
    this.animateParagraphs();
    this.animateCards();
    this.animateImages();
    this.animateRuledLines();
    this.animateNavigation();
    this.animateScrollProgress();
  }

  disableAnimations() {
    // Make all elements visible without animation
    gsap.set('.hero__title-word, .section-title, .section-subtitle, p, .card, .club-card, .member-card', {
      opacity: 1,
      y: 0,
      clearProps: 'all'
    });
  }

  animateHero() {
    const heroTitle = document.querySelector('.hero__title');
    const heroDescription = document.querySelector('.hero__description');
    const heroCTA = document.querySelector('.hero__cta');
    const heroImage = document.querySelector('.hero__image');
    const heroLabel = document.querySelector('.hero__label');

    const tl = gsap.timeline({ delay: 0.2 });

    // Animate label
    if (heroLabel) {
      tl.fromTo(heroLabel,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      );
    }

    // Animate title words
    if (heroTitle) {
      const words = heroTitle.querySelectorAll('.hero__title-word');
      if (words.length > 0) {
        tl.fromTo(words,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
          },
          '-=0.3'
        );
      }
    }

    // Animate description
    if (heroDescription) {
      tl.fromTo(heroDescription,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }

    // Animate CTA
    if (heroCTA) {
      tl.fromTo(heroCTA,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
    }

    // Animate image with clip-path reveal
    if (heroImage) {
      tl.to(heroImage,
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power2.inOut'
        },
        '-=0.6'
      );
      heroImage.classList.add('revealed');
    }
  }

  animateSectionHeadings() {
    const headings = document.querySelectorAll('.section-title');

    headings.forEach(heading => {
      // Split into words if not already
      const text = heading.textContent;
      const words = text.split(' ');
      heading.innerHTML = words.map(word =>
        `<span class="word-wrapper"><span class="word">${word}</span></span>`
      ).join(' ');

      const wordElements = heading.querySelectorAll('.word');

      gsap.fromTo(wordElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  animateParagraphs() {
    const paragraphs = document.querySelectorAll('.section-subtitle, .about p, .card__description');

    paragraphs.forEach(p => {
      gsap.fromTo(p,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  animateCards() {
    const cards = document.querySelectorAll('.card, .club-card, .member-card');

    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: (index % 4) * 0.1, // Stagger within row
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  animateImages() {
    const images = document.querySelectorAll('.about__image, .card__image');

    images.forEach(img => {
      const wrapper = img.closest('.card__image-wrapper, .about__visual');
      if (!wrapper) return;

      gsap.fromTo(img,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  animateRuledLines() {
    const lines = document.querySelectorAll('.ruled-line');

    lines.forEach(line => {
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: line,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  animateNavigation() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    // Add scrolled class on scroll
    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 80) {
          nav.classList.add('scrolled');
        } else if (self.scroll() <= 80) {
          nav.classList.remove('scrolled');
        }
      }
    });
  }

  animateScrollProgress() {
    const folio = document.querySelector('.scroll-folio');
    if (!folio) return;

    const sections = document.querySelectorAll('.section');
    const total = sections.length;

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          folio.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
        },
        onEnterBack: () => {
          folio.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
        }
      });
    });
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Animations();
});
