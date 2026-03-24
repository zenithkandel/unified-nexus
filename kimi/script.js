/**
 * Unified Nexus - Modern Website JavaScript
 * Interactive features and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initCustomCursor();
    initScrollAnimations();
    initCounters();
    initFormHandler();
    initSmoothScroll();
});

/**
 * Navigation Module
 * Handles navbar scroll effects and mobile menu
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile menu toggle
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

/**
 * Custom Cursor Module
 * Creates smooth, animated custom cursor
 */
function initCustomCursor() {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows mouse directly
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        // Follower follows with delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursor.style.transform = `translate(${cursorX - 6}px, ${cursorY - 6}px)`;
        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .club-card, .team-card, .benefit-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = `translate(${cursorX - 6}px, ${cursorY - 6}px) scale(1.5)`;
            follower.style.transform = `translate(${followerX - 30}px, ${followerY - 30}px) scale(1.5)`;
            follower.style.borderColor = 'rgba(102, 126, 234, 0.8)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = `translate(${cursorX - 6}px, ${cursorY - 6}px) scale(1)`;
            follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(1)`;
            follower.style.borderColor = 'rgba(102, 126, 234, 0.5)';
        });
    });
}

/**
 * Scroll Animations Module
 * Intersection Observer for scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Handle staggered children
                const staggerChildren = entry.target.querySelectorAll('[data-aos-delay]');
                staggerChildren.forEach((child, index) => {
                    const delay = child.dataset.aosDelay || index * 100;
                    child.style.transitionDelay = `${delay}ms`;
                    child.classList.add('aos-animate');
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with data-aos
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        el.classList.add('aos-init');
        observer.observe(el);
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('.club-card, .benefit-card, .team-card, .feature');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

/**
 * Counter Animation Module
 * Animates numbers counting up
 */
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(startValue + (target - startValue) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}

/**
 * Form Handler Module
 * Handles contact form submission with validation
 */
function initFormHandler() {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        if (!name || !email || !message) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showToast('Message sent successfully!', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('i');
    
    toastMessage.textContent = message;
    
    if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
        toastIcon.style.color = '#f5576c';
    } else {
        toastIcon.className = 'fas fa-check-circle';
        toastIcon.style.color = '#4ade80';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Smooth Scroll Module
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax Effect (Optional enhancement)
 */
function initParallax() {
    const heroOrbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        heroOrbs.forEach((orb, index) => {
            const speed = 0.1 * (index + 1);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, { passive: true });
}

// Initialize parallax if not on mobile
if (!window.matchMedia('(pointer: coarse)').matches) {
    initParallax();
}

/**
 * Typing Effect for Hero Title
 */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let index = 0;
    const speed = 100;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    // Start typing after a delay
    setTimeout(type, 500);
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', initTypingEffect);
