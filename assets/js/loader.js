/* ==========================================================================
   Unified Nexus — Loading Screen Logic
   ========================================================================== */

class Loader {
  constructor() {
    this.loader = document.querySelector('.loader');
    this.leftPanel = document.querySelector('.loader__panel--left');
    this.rightPanel = document.querySelector('.loader__panel--right');
    this.content = document.querySelector('.loader__content');
    this.progressBar = document.querySelector('.loader__progress-bar');
    this.progressText = document.querySelector('.loader__percentage');
    this.statusText = document.querySelector('.loader__status');
    this.hint = document.querySelector('.loader__hint');
    this.logo = document.querySelector('.loader__logo');

    this.minDuration = 1500;
    this.autoTriggerDelay = 1500;
    this.isLoaded = false;
    this.isTriggered = false;
    this.progress = 0;
    this.startTime = Date.now();

    this.init();
  }

  init() {
    // Start progress animation
    this.animateProgress();

    // Wait for content + minimum duration
    Promise.all([
      this.waitForContent(),
      this.waitForMinDuration()
    ]).then(() => {
      this.onLoaded();
    });
  }

  waitForContent() {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve);
      }
    });
  }

  waitForMinDuration() {
    return new Promise((resolve) => {
      const elapsed = Date.now() - this.startTime;
      const remaining = Math.max(0, this.minDuration - elapsed);
      setTimeout(resolve, remaining);
    });
  }

  animateProgress() {
    const duration = this.minDuration;
    const startTime = Date.now();

    const update = () => {
      const elapsed = Date.now() - startTime;
      this.progress = Math.min(100, (elapsed / duration) * 100);

      if (this.progressBar) {
        this.progressBar.style.width = `${this.progress}%`;
      }

      if (this.progressText) {
        this.progressText.textContent = `${Math.round(this.progress)}%`;
      }

      if (elapsed < duration) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  onLoaded() {
    this.isLoaded = true;

    // Update status text
    if (this.statusText) {
      this.statusText.textContent = 'Loaded.';
      this.statusText.classList.add('loader__status--loaded');
    }

    // Show interaction hint
    if (this.hint) {
      setTimeout(() => {
        this.hint.classList.add('visible');
      }, 300);
    }

    // Add event listeners for user interaction
    this.addInteractionListeners();

    // Set auto-trigger timeout
    this.autoTriggerTimeout = setTimeout(() => {
      if (!this.isTriggered) {
        this.triggerGate();
      }
    }, this.autoTriggerDelay);
  }

  addInteractionListeners() {
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

    const handleInteraction = () => {
      if (this.isLoaded && !this.isTriggered) {
        this.triggerGate();
        // Remove all listeners
        events.forEach(event => {
          window.removeEventListener(event, handleInteraction);
        });
        // Clear auto-trigger timeout
        if (this.autoTriggerTimeout) {
          clearTimeout(this.autoTriggerTimeout);
        }
      }
    };

    events.forEach(event => {
      window.addEventListener(event, handleInteraction, { once: false });
    });
  }

  triggerGate() {
    if (this.isTriggered) return;
    this.isTriggered = true;

    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
      this.animateWithGSAP();
    } else {
      this.animateWithCSS();
    }
  }

  animateWithGSAP() {
    const tl = gsap.timeline({
      onComplete: () => {
        this.cleanup();
      }
    });

    const ease = 'power3.inOut';

    // Phase 1: Fade out logo with subtle scale
    if (this.logo) {
      tl.to(this.logo, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: ease
      }, 0);
    }

    // Fade out content
    tl.to(this.content, {
      opacity: 0,
      duration: 0.3,
      ease: ease
    }, 0);

    // Phase 2 & 3: Panels slide off (0-600ms)
    tl.to(this.leftPanel, {
      x: '-100%',
      duration: 0.6,
      ease: ease
    }, 0.1);

    tl.to(this.rightPanel, {
      x: '100%',
      duration: 0.6,
      ease: ease
    }, 0.1);

    // Phase 4: Reveal main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      tl.fromTo(mainContent,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          duration: 0.6,
          ease: ease
        },
        0.4
      );
    }

    // Remove loading class from body
    tl.add(() => {
      document.body.classList.remove('loading');
    }, 0.4);
  }

  animateWithCSS() {
    // Fallback CSS animation
    if (this.content) {
      this.content.style.transition = 'opacity 0.3s ease';
      this.content.style.opacity = '0';
    }

    if (this.leftPanel) {
      this.leftPanel.style.transition = 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)';
      this.leftPanel.style.transform = 'translateX(-100%)';
    }

    if (this.rightPanel) {
      this.rightPanel.style.transition = 'transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)';
      this.rightPanel.style.transform = 'translateX(100%)';
    }

    // Reveal main content
    setTimeout(() => {
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        mainContent.style.opacity = '1';
        mainContent.style.visibility = 'visible';
        mainContent.style.transform = 'translateY(0)';
      }
      document.body.classList.remove('loading');
    }, 400);

    // Cleanup after animation
    setTimeout(() => {
      this.cleanup();
    }, 900);
  }

  cleanup() {
    if (this.loader) {
      this.loader.classList.add('hidden');
    }

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('loaderComplete'));
  }
}

// Initialize loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Loader();
});
