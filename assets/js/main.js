/**
 * CV Interactive Features
 * Santiago Arboleda Agudelo - Professional Resume
 */

class CVManager {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.animateSkillBars();
        this.setupSmoothScrolling();
        this.setupPrintFunctionality();
        this.setupThemeToggle();
        this.setupContactActions();
        this.setupKeyboardNavigation();
        this.addLoadingIndicators();
    }

    /**
     * Setup Intersection Observer for animations
     */
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        
                        // Trigger skill bar animation if it's a skill section
                        if (entry.target.classList.contains('skill-section')) {
                            this.animateSkillBarsInView(entry.target);
                        }
                    }
                });
            }, this.observerOptions);

            // Observe all sections
            document.querySelectorAll('section, .job-timeline, .education-card, .training-card').forEach(el => {
                observer.observe(el);
            });
        }
    }

    /**
     * Animate skill bars with staggered timing
     */
    animateSkillBars() {
        // Initial setup - hide bars
        this.skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.dataset.targetWidth = width;
            bar.style.width = '0%';
            bar.classList.add('skill-loading');
        });

        // Animate after a short delay
        setTimeout(() => {
            this.skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.classList.remove('skill-loading');
                    bar.style.width = bar.dataset.targetWidth;
                    
                    // Add completion animation
                    setTimeout(() => {
                        bar.classList.add('skill-complete');
                    }, 800);
                }, index * 150);
            });
        }, 500);
    }

    /**
     * Animate skill bars when they come into view
     */
    animateSkillBarsInView(skillSection) {
        const bars = skillSection.querySelectorAll('.skill-progress');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.width = bar.dataset.targetWidth;
            }, index * 100);
        });
    }

    /**
     * Setup smooth scrolling for internal links
     */
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Setup print functionality
     */
    setupPrintFunctionality() {
        // Add print button if it doesn't exist
        if (!document.querySelector('.print-btn')) {
            const printBtn = document.createElement('button');
            printBtn.className = 'print-btn';
            printBtn.innerHTML = '<i class="fas fa-print"></i> Imprimir CV';
            printBtn.onclick = () => this.printCV();
            
            // Add to header or create floating button
            const header = document.querySelector('.header-overlay');
            if (header) {
                printBtn.classList.add('absolute', 'top-4', 'right-4', 'bg-white', 'text-blue-600', 'px-4', 'py-2', 'rounded-lg', 'shadow-lg', 'hover:bg-gray-50', 'transition-all');
                header.appendChild(printBtn);
            }
        }

        // Optimize for printing
        window.addEventListener('beforeprint', () => {
            document.body.classList.add('printing');
        });

        window.addEventListener('afterprint', () => {
            document.body.classList.remove('printing');
        });
    }

    /**
     * Print CV with optimizations
     */
    printCV() {
        // Hide unnecessary elements
        const elementsToHide = document.querySelectorAll('.print-btn, .no-print');
        elementsToHide.forEach(el => el.style.display = 'none');

        // Expand all sections
        const collapsedSections = document.querySelectorAll('.collapsed');
        collapsedSections.forEach(section => section.classList.remove('collapsed'));

        // Print
        window.print();

        // Restore elements
        elementsToHide.forEach(el => el.style.display = '');
    }

    /**
     * Setup theme toggle functionality
     */
    setupThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Cambiar tema';
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // Save preference
            localStorage.setItem('cv-theme', isDark ? 'dark' : 'light');
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('cv-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Add to DOM
        document.body.appendChild(themeToggle);
    }

    /**
     * Setup contact actions (click to copy, etc.)
     */
    setupContactActions() {
        // Email click to copy
        const emailElement = document.querySelector('[href^="mailto:"]');
        if (emailElement) {
            emailElement.addEventListener('click', (e) => {
                e.preventDefault();
                const email = emailElement.textContent;
                this.copyToClipboard(email, 'Email copiado al portapapeles');
            });
        }

        // Phone click to copy
        const phoneElement = document.querySelector('[href^="tel:"]');
        if (phoneElement) {
            phoneElement.addEventListener('click', (e) => {
                e.preventDefault();
                const phone = phoneElement.textContent;
                this.copyToClipboard(phone, 'Teléfono copiado al portapapeles');
            });
        }
    }

    /**
     * Copy text to clipboard with notification
     */
    async copyToClipboard(text, message) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification(message, 'success');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification(message, 'success');
        }
    }

    /**
     * Show notification message
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10b981' : '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + P for print
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                this.printCV();
            }

            // Escape to close any open modals or reset focus
            if (e.key === 'Escape') {
                document.activeElement.blur();
            }
        });

        // Add tab index to interactive elements
        document.querySelectorAll('.contact-item, .tag, .job-timeline').forEach(el => {
            el.setAttribute('tabindex', '0');
            el.classList.add('focusable');
        });
    }

    /**
     * Add loading indicators and progressive enhancement
     */
    addLoadingIndicators() {
        // Add loading state to images
        document.querySelectorAll('img').forEach(img => {
            if (!img.complete) {
                img.classList.add('loading');
                img.addEventListener('load', () => {
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                });
            }
        });

        // Progressive enhancement for features
        if (!('IntersectionObserver' in window)) {
            // Fallback: animate all skill bars immediately
            this.skillBars.forEach(bar => {
                bar.style.width = bar.dataset.targetWidth;
            });
        }
    }

    /**
     * Utility method to debounce function calls
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Add scroll-triggered animations
     */
    setupScrollAnimations() {
        const handleScroll = this.debounce(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }, 10);

        window.addEventListener('scroll', handleScroll);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CVManager();
});

// Add error handling for the entire application
window.addEventListener('error', (e) => {
    console.error('CV Application Error:', e.error);
    // Optionally send to error tracking service
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
