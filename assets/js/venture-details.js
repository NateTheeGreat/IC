/* =========================================================
   VENTURE DETAILS - SMOOTH SCROLL REVEAL ANIMATIONS
   ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll-based reveal animation system
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    // Intersection Observer for smooth scroll-triggered animations
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add reveal class with a slight delay for smoother appearance
                setTimeout(() => {
                    entry.target.classList.add('reveal-visible');
                }, 50);
                
                // Stop observing this element once it's revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });

    // Advanced reveal observer for paragraphs with staggered timing
    const paragraphRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get all paragraph siblings in the same container
                const container = entry.target.closest('.details-content');
                if (container) {
                    const paragraphs = container.querySelectorAll('.reveal-paragraph');
                    
                    // Add staggered reveals to all paragraphs in the section
                    paragraphs.forEach((paragraph, index) => {
                        if (!paragraph.classList.contains('reveal-visible')) {
                            setTimeout(() => {
                                paragraph.classList.add('reveal-visible');
                            }, index * 100); // 100ms delay between each paragraph
                        }
                    });
                }
                
                // Stop observing once triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    // Enhanced reveal for headings that trigger paragraph reveals
    const headingRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal the heading first
                entry.target.classList.add('reveal-visible');
                
                // Then reveal following paragraphs with stagger
                let nextElement = entry.target.nextElementSibling;
                let delay = 200; // Start after heading animation
                
                while (nextElement && (nextElement.tagName === 'P' || nextElement.tagName === 'UL')) {
                    if (nextElement.classList.contains('scroll-reveal')) {
                        setTimeout(() => {
                            nextElement.classList.add('reveal-visible');
                        }, delay);
                        delay += 150; // Stagger each following element
                    }
                    nextElement = nextElement.nextElementSibling;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
    });

    // Apply observers to different element types
    scrollRevealElements.forEach(element => {
        if (element.classList.contains('reveal-image')) {
            // Image gets special treatment with scale effect
            revealObserver.observe(element);
        } else if (element.classList.contains('reveal-content')) {
            // Content containers get standard reveal
            revealObserver.observe(element);
        } else if (element.classList.contains('reveal-meta')) {
            // Meta elements get quick reveal
            revealObserver.observe(element);
        } else if (element.tagName === 'H3' && element.classList.contains('reveal-text')) {
            // Headings trigger cascade reveals
            headingRevealObserver.observe(element);
        } else if (element.classList.contains('reveal-text')) {
            // Regular text elements
            revealObserver.observe(element);
        } else if (element.classList.contains('reveal-paragraph')) {
            // Paragraphs handled individually
            revealObserver.observe(element);
        } else {
            // Default behavior for any other scroll-reveal elements
            revealObserver.observe(element);
        }
    });

    // Smooth scrolling enhancement for back link
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('click', function(e) {
            // Add a subtle loading state
            this.style.transform = 'translateX(-4px)';
            this.style.opacity = '0.8';
            
            // Navigate after brief delay for smooth UX
            setTimeout(() => {
                window.location.href = this.href;
            }, 150);
        });
    }

    // Progressive loading enhancement
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });

    // Smooth image loading animation
    const style = document.createElement('style');
    style.textContent = `
        img {
            opacity: 0;
            transition: opacity 0.4s ease;
        }
        img.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

/* =========================================================
   PERFORMANCE OPTIMIZATIONS
   ========================================================= */

// Debounce function for scroll performance
function debounce(func, wait) {
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

// Passive scroll listener for better performance
window.addEventListener('scroll', debounce(() => {
    // Any additional scroll-based enhancements can go here
}, 10), { passive: true });