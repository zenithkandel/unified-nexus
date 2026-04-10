import re
import os

html_path = 'index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Fix Nav
old_nav = """    <nav class="navbar anim-slide-down" id="navbar">
      <div class="container">
        <a href="#" class="nav-brand">
          <img src="images/branding/logo-icon.png" alt="Unified Nexus Logo" />
        </a>
        <ul class="nav-menu">"""
        
new_nav = """    <nav class="navbar anim-slide-down" id="navbar">
      <div class="container nav-container">
        <a href="#" class="nav-brand">
          <img src="images/branding/logo-icon.png" alt="Unified Nexus Logo" />
        </a>
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-menu" id="navMenu">"""

if old_nav in html:
    html = html.replace(old_nav, new_nav)
else:
    print("WARNING: Could not find old nav html")

# Add menu toggle JS
js_logic = """      // Mobile Menu Logic
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const navMenu = document.getElementById('navMenu');
      const navLinks = document.querySelectorAll('.nav-link, .btn');
      
      if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
          mobileMenuBtn.classList.toggle('active');
          navMenu.classList.toggle('active');
        });
      }
      
      if (navLinks) {
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
              mobileMenuBtn.classList.remove('active');
              navMenu.classList.remove('active');
            }
          });
        });
      }
    </script>"""

if "// Mobile Menu Logic" not in html:
    html = html.replace("</script>", js_logic)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)


css_path = os.path.join('css', 'app.css')
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Responsive Media Queries
responsive_css = """

/* Responsive Media Queries */
@media (max-width: 991px) {
    .hero-title-large {
        font-size: 4rem;
    }
    
    .section {
        padding: 5rem 0;
    }
}

.mobile-menu-btn {
    display: none;
}

@media (max-width: 768px) {
    .nav-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        position: relative;
    }
    
    .nav-menu {
        position: fixed;
        top: 76px;
        left: 0;
        right: 0;
        background-color: var(--color-bg-base);
        backdrop-filter: blur(10px);
        flex-direction: column;
        align-items: center;
        padding: 2rem 0;
        gap: 1.5rem;
        transform: translateY(-200%);
        transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s;
        opacity: 0;
        border-bottom: 1px solid var(--c-7F2B3E);
        z-index: 99;
        pointer-events: none;
    }
    
    .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
    }
    
    .mobile-menu-btn {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 30px;
        height: 24px;
        background: transparent;
        border: none;
        cursor: pointer;
        z-index: 100;
        padding: 0;
    }
    
    .mobile-menu-btn span {
        width: 100%;
        height: 2px;
        background-color: #FFFFFF;
        border-radius: 10px;
        transition: all 0.3s linear;
        position: relative;
        transform-origin: 1px;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
        transform: translateX(20px);
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg);
    }
    
    .hero-title-large {
        font-size: 3.5rem;
    }
    
    .hero-subtitle {
        font-size: 1.1rem;
        padding: 0 1rem;
    }
    
    .section-title {
        font-size: 2.2rem;
    }
    
    /* Make into 2 columns on mobile devices instead of 1 */
    .clubs-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
    
    .leader-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
    
    .club-image-wrapper {
        height: 160px;
    }
    
    .leader-image-wrapper {
        height: 180px;
    }
    
    .club-card h3 {
        font-size: 1.25rem;
    }
    
    .club-card p {
        font-size: 0.85rem;
    }
    
    .club-content {
        padding: 1.5rem 1rem;
    }
    
    .leader-name {
        font-size: 1.1rem;
    }
    
    .leader-role {
        font-size: 0.75rem;
    }
    
    .leader-info {
        padding: 1rem;
    }
    
    .form-container {
        padding: 2rem 1.5rem;
    }
}

@media (max-width: 480px) {
    /* If really really small, keep them in 2 columns but with even smaller gap/font */
    .clubs-grid {
        gap: 1rem;
        grid-template-columns: repeat(1, 1fr); /* Fallback to 1 col only if extremely small to avoid breaking content */
    }
    .leader-grid {
        gap: 1rem;
        grid-template-columns: repeat(1, 1fr);
    }
    
    .hero-title-large {
        font-size: 2.8rem;
    }
}
"""

if "/* Responsive Media Queries */" not in css:
    css += responsive_css
    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(css)
    print("Appended responsive css")

import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix 1: Particles
if 'z-index: 1;' in html: # Ah wait particles CSS is in app.css
    pass

# Fix 2: Hamburger Menu
old_nav = '''      <nav class="navbar anim-slide-down" id="navbar">
        <div class="container">
          <a href="#" class="nav-brand">
            <img src="images/branding/logo-icon.png" alt="Unified Nexus Logo" />
          </a>
          <ul class="nav-menu">'''
new_nav = '''      <nav class="navbar anim-slide-down" id="navbar">
        <div class="container nav-container">
          <a href="#" class="nav-brand">
            <img src="images/branding/logo-icon.png" alt="Unified Nexus Logo" />
          </a>
          <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation">
            <span></span><span></span><span></span>
          </button>
          <ul class="nav-menu" id="navMenu">'''

# replace quotes properly!
