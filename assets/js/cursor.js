/* ==========================================================================
   Unified Nexus — Custom Cursor
   ========================================================================== */

class CustomCursor {
  constructor() {
    this.cursor = null;
    this.cursorX = 0;
    this.cursorY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.isHovering = false;
    this.lerp = 0.15;

    this.init();
  }

  init() {
    // Check for touch device
    if (this.isTouchDevice()) {
      return;
    }

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.createCursor();
    this.addEventListeners();
    this.animate();
  }

  isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  createCursor() {
    this.cursor = document.createElement('div');
    this.cursor.classList.add('cursor');
    document.body.appendChild(this.cursor);

    // Keep default cursor visible - the custom cursor is decorative only
  }

  addEventListeners() {
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;

      // Show cursor when mouse moves
      if (!this.cursor.classList.contains('active')) {
        this.cursor.classList.add('active');
      }
    });

    // Track mouse enter/leave viewport
    document.addEventListener('mouseenter', () => {
      this.cursor.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
      this.cursor.classList.remove('active');
    });

    // Track hover on interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input[type="submit"], .nav__link, .btn, .card, .club-card, .member-card, .social-link'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hovering');
      });

      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hovering');
      });
    });

    // Update cursor on DOM changes (for dynamically added elements)
    const observer = new MutationObserver(() => {
      this.updateInteractiveElements();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  updateInteractiveElements() {
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input[type="submit"], .nav__link, .btn, .card, .club-card, .member-card, .social-link'
    );

    interactiveElements.forEach((el) => {
      if (!el.hasAttribute('data-cursor-bound')) {
        el.setAttribute('data-cursor-bound', 'true');

        el.addEventListener('mouseenter', () => {
          this.cursor.classList.add('hovering');
        });

        el.addEventListener('mouseleave', () => {
          this.cursor.classList.remove('hovering');
        });
      }
    });
  }

  animate() {
    // Smooth cursor movement with lerp
    this.cursorX += (this.targetX - this.cursorX) * this.lerp;
    this.cursorY += (this.targetY - this.cursorY) * this.lerp;

    if (this.cursor) {
      this.cursor.style.left = `${this.cursorX}px`;
      this.cursor.style.top = `${this.cursorY}px`;
    }

    requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.cursor) {
      this.cursor.remove();
    }
    document.body.style.cursor = '';
  }
}

// Initialize custom cursor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CustomCursor();
});
