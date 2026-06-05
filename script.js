/**
 * KRISHNAJA M J - PORTFOLIO WEBSITE
 * JavaScript for Interactivity and Animations
 * Features: Navigation, Theme Toggle, Scroll Animations, Particles, Form
 */

// ===== CONFIGURATION =====
const config = {
    particleCount: 50,
    scrollOffset: 100,
    debounceDelay: 250,
};

// ===== STATE MANAGEMENT =====
let state = {
    isDarkMode: true,
    isMenuOpen: false,
    isMobileView: window.innerWidth <= 768,
};

// ===== DOM ELEMENTS =====
const elements = {
    navbar: document.getElementById('navbar'),
    navMenu: document.getElementById('navMenu'),
    hamburger: document.getElementById('hamburger'),
    themeToggle: document.getElementById('themeToggle'),
    backToTop: document.getElementById('backToTop'),
    particlesContainer: document.getElementById('particlesContainer'),
    contactForm: document.getElementById('contactForm'),
    body: document.body,
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    createParticles();
    setupEventListeners();
    setupScrollAnimations();
});

// ===== THEME MANAGEMENT =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    state.isDarkMode = savedTheme === 'dark';
    applyTheme();
}

function applyTheme() {
    if (state.isDarkMode) {
        elements.body.classList.remove('light-mode');
        elements.themeToggle.querySelector('.theme-icon').textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    } else {
        elements.body.classList.add('light-mode');
        elements.themeToggle.querySelector('.theme-icon').textContent = '☀️';
        localStorage.setItem('theme', 'light');
    }
}

function toggleTheme() {
    state.isDarkMode = !state.isDarkMode;
    applyTheme();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Theme Toggle
    elements.themeToggle.addEventListener('click', toggleTheme);

    // Mobile Menu Toggle
    elements.hamburger.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when link clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (state.isMenuOpen) {
                toggleMobileMenu();
            }
            updateActiveNavLink(link);
        });
    });

    // Back to Top Button
    elements.backToTop.addEventListener('click', scrollToTop);

    // Navbar Background on Scroll
    window.addEventListener('scroll', debounce(handleScroll, config.debounceDelay));

    // Contact Form
    elements.contactForm.addEventListener('submit', handleFormSubmit);

    // Window Resize
    window.addEventListener('resize', debounce(handleResize, config.debounceDelay));
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    elements.hamburger.classList.toggle('active');
    elements.navMenu.classList.toggle('active');
}

// ===== NAVIGATION =====
function updateActiveNavLink(currentLink) {
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    // Add active class to current link
    currentLink.classList.add('active');
}

// Update active nav link based on scroll position
function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL HANDLING =====
function handleScroll() {
    // Navbar scroll effect
    if (window.scrollY > 50) {
        elements.navbar.classList.add('scrolled');
    } else {
        elements.navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > window.innerHeight) {
        elements.backToTop.classList.add('show');
    } else {
        elements.backToTop.classList.remove('show');
    }

    // Update active nav link
    updateNavOnScroll();

    // Scroll reveal animations
    revealOnScroll();
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    // Trigger initial animations for elements already visible
    revealOnScroll();
}

function revealOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = elementTop < window.innerHeight - 100 && elementBottom > 0;

        if (isVisible && !element.classList.contains('aos-animate')) {
            // Get delay from data attribute
            const delay = element.getAttribute('data-aos-delay') || 0;
            setTimeout(() => {
                element.classList.add('aos-animate');
            }, delay);
        }
    });
}

// ===== PARTICLE ANIMATION =====
function createParticles() {
    const container = elements.particlesContainer;
    container.innerHTML = ''; // Clear existing particles

    for (let i = 0; i < config.particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = x + '%';
        particle.style.top = y + '%';

        // Random animation delay
        const delay = Math.random() * 20;
        particle.style.animationDelay = delay + 's';

        // Random animation duration
        const duration = 15 + Math.random() * 10;
        particle.style.animationDuration = duration + 's';

        container.appendChild(particle);
    }
}

// ===== FORM HANDLING =====
function handleFormSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
    };

    // Validate form
    if (!validateForm(formData)) {
        showNotification('Please fill all fields correctly', 'error');
        return;
    }

    // Show success message
    showNotification('Message sent successfully! (Demo - Configure backend for real emails)', 'success');

    // Reset form
    elements.contactForm.reset();

    // Log form data (for demonstration)
    console.log('Form Data:', formData);
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
        data.name.trim() !== '' &&
        emailRegex.test(data.email) &&
        data.subject.trim() !== '' &&
        data.message.trim() !== ''
    );
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        animation: slideUp 0.3s ease-out;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Auto-remove notification
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== UTILITY FUNCTIONS =====

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Handle window resize
 */
function handleResize() {
    const wasMobile = state.isMobileView;
    state.isMobileView = window.innerWidth <= 768;

    // If view changed from desktop to mobile or vice versa
    if (wasMobile !== state.isMobileView) {
        // Close mobile menu if opening to desktop view
        if (!state.isMobileView && state.isMenuOpen) {
            toggleMobileMenu();
        }
    }
}

/**
 * Smooth scroll to section
 * @param {string} sectionId - ID of section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Get current year for footer
 */
function getCurrentYear() {
    return new Date().getFullYear();
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape' && state.isMenuOpen) {
        toggleMobileMenu();
    }

    // Ctrl/Cmd + K for theme toggle (optional)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleTheme();
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Add keyboard navigation for buttons
document.querySelectorAll('button, a[href]').forEach(element => {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && element.tagName === 'BUTTON') {
            element.click();
        }
    });
});

// Focus visible outline
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== CONSOLE MESSAGE =====
console.log('%cWelcome to Krishnaja M J\'s Portfolio!', 'font-size: 20px; color: #b17edb; font-weight: bold;');
console.log('%cFor inquiries, contact: krishnamj2005@gmail.com', 'font-size: 14px; color: #d8bfd8;');
