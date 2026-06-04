// ============================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// ============================================

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-link');
const particlesContainer = document.getElementById('particles');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    createParticles();
    setupEventListeners();
});

// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon();
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
});

function updateThemeIcon() {
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
}

// ============================================
// HAMBURGER MENU FUNCTIONALITY
// ============================================

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    updateHamburgerIcon();
});

nav**Links.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        updateHamburgerIcon();
    });
});

function updateHamburgerIcon() {
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// ============================================
// ANIMATED PARTICLES BACKGROUND
// ============================================

function createParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = Math.random() * 100 + '%';
        
        // Random animation duration
        const duration = Math.random() * 20 + 15;
        particle.style.animationDuration = duration + 's';
        
        // Random animation delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// SETUP EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Add scroll animations to elements
    observeElements();
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInScale 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const elements = document.querySelectorAll(
        '.about-card, .project-card, .achievement-card, .skill-category, .education-card, .timeline-item'
    );
    
    elements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================

nav**Links.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    nav**Links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// DYNAMIC FEATURES
// ============================================

// Disable links with # only
const allLinks = document.querySelectorAll('a[href="#"]');
allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Add your project/social links here!');
    });
});

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .link-btn, .contact-card');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Initialize ripple effect after DOM loads
addRippleEffect();

// ============================================
// ADD ACTIVE NAV LINK STYLING
// ============================================

const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// CONSOLE MESSAGES
// ============================================

console.log('%cWelcome to Krishnaja M J\'s Portfolio!', 'color: #e0c3fc; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to explore and connect!', 'color: #8ec5fc; font-size: 14px;');

// ============================================
// PERFORMANCE: Lazy load background particles
// ============================================

if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Initialize additional animations or tracking here
    });
} else {
    setTimeout(() => {
        // Fallback for older browsers
    }, 1);
}

// ============================================
// END OF SCRIPT
// ============================================