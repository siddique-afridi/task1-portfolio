class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.lightBtn = document.getElementById('lightMode');
        this.darkBtn = document.getElementById('darkMode');
        this.body = document.body;
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.applyTheme(this.currentTheme);
        this.updateButtonStates();
        
        // Add event listeners
        this.lightBtn.addEventListener('click', () => this.switchTheme('light'));
        this.darkBtn.addEventListener('click', () => this.switchTheme('dark'));
    }
    
    switchTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        this.updateButtonStates();
        localStorage.setItem('theme', theme);
    }
    
    applyTheme(theme) {
        if (theme === 'dark') {
            this.body.classList.add('dark-theme');
        } else {
            this.body.classList.remove('dark-theme');
        }
    }
    
    updateButtonStates() {
        this.lightBtn.classList.toggle('active', this.currentTheme === 'light');
        this.darkBtn.classList.toggle('active', this.currentTheme === 'dark');
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.section');
        this.activeSection = 'home';
        
        this.init();
    }
    
    init() {
        // Add click listeners to navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
        
        // Set up intersection observer for active section tracking
        this.setupIntersectionObserver();
        
        // Set up scroll spy
        window.addEventListener('scroll', () => this.updateActiveNavLink());
    }
    
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.setActiveNavLink(sectionId);
            }
        });
    }
    
    setActiveNavLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.animatedElements = [];
        this.init();
    }
    
    init() {
        // Set up intersection observer for animations
        this.setupAnimationObserver();
        
        // Animate hobby cards with stagger
        this.animateHobbyCards();
        
        // Animate project cards with stagger
        this.animateProjectCards();
    }
    
    setupAnimationObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }
    
    triggerAnimation(element) {
        element.classList.add('in-view');
    }
    
    animateHobbyCards() {
        const hobbyCards = document.querySelectorAll('.hobby-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 150);
                }
            });
        }, { threshold: 0.3 });
        
        hobbyCards.forEach(card => observer.observe(card));
    }
    
    animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });
        
        projectCards.forEach(card => observer.observe(card));
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Enhanced Theme Switching with Style Manipulation
function switchThemeWithStyles(theme) {
    const elements = {
        body: document.body,
        navbar: document.querySelector('.navbar'),
        sections: document.querySelectorAll('.section'),
        cards: document.querySelectorAll('.hobby-card, .project-card, .about-card')
    };
    
    if (theme === 'dark') {
        // Direct style manipulation for dark theme
        elements.body.style.backgroundColor = '#0f172a';
        elements.body.style.color = '#f8fafc';
        
        elements.navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        
        elements.sections.forEach(section => {
            if (section.classList.contains('about-section') || section.classList.contains('projects-section')) {
                section.style.backgroundColor = '#1e293b';
            } else {
                section.style.backgroundColor = '#0f172a';
            }
        });
        
        elements.cards.forEach(card => {
            card.style.backgroundColor = '#334155';
            card.style.borderColor = '#475569';
        });
    } else {
        // Reset to light theme
        elements.body.style.backgroundColor = '';
        elements.body.style.color = '';
        elements.navbar.style.background = '';
        
        elements.sections.forEach(section => {
            section.style.backgroundColor = '';
        });
        
        elements.cards.forEach(card => {
            card.style.backgroundColor = '';
            card.style.borderColor = '';
        });
    }
}

// Smooth Scroll Enhancement
function enhanceSmoothScroll() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax Effect for Hero Section
function setupParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Loading Animation
function showLoadingAnimation() {
    const cards = document.querySelectorAll('.hobby-card, .project-card');
    
    cards.forEach(card => {
        card.classList.add('loading');
        
        setTimeout(() => {
            card.classList.remove('loading');
        }, 1000);
    });
}

// Performance Optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize managers
    const themeManager = new ThemeManager();
    const navigationManager = new NavigationManager();
    const animationManager = new AnimationManager();
    
    // Setup additional features
    enhanceSmoothScroll();
    setupParallaxEffect();
    optimizePerformance();
    
    // Add some initial loading animation
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🚀 Personal Bio Website Loaded Successfully!');
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Recalculate positions if needed
    const activeNavLink = document.querySelector('.nav-link.active');
    if (activeNavLink) {
        const sectionId = activeNavLink.getAttribute('href').substring(1);
        // Update scroll position calculations
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.switchThemeWithStyles = switchThemeWithStyles;