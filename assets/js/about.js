// =========================================================
// REGIS INNOVATION CENTER - ABOUT PAGE JAVASCRIPT
// Beautiful Animations and Interactive Elements
// ========================================================= 

document.addEventListener('DOMContentLoaded', function() {
    initializeAboutPage();
});

// Initialize the about page
function initializeAboutPage() {
    setupScrollAnimations();
    setupInteractiveElements();
    setupCountingAnimations();
    setupSmoothScrolling();
    setupParallaxEffects();
    setupLetterAnimations();
    setupHeroVideoInteractions();
    initializeSimpleTestimonials();
    initImpactCounters();
    console.log('Beautiful About page initialized with animations');
}

// Setup scroll-triggered animations for all sections
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    
                    // Special handling for cards in grids
                    if (entry.target.classList.contains('program-card') || 
                        entry.target.classList.contains('success-card')) {
                        animateCardGrid(entry.target);
                    }
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(`
        .section-header,
        .letter-content,
        .director-image,
        .impact-text,
        .impact-visual,
        .facilities-text,
        .facilities-visual,
        .program-card,
        .success-card,
        .cta-title,
        .cta-description,
        .cta-actions
    `);
    
    animatableElements.forEach(element => {
        observer.observe(element);
    });
}

// Animate cards in grid with beautiful stagger effect
function animateCardGrid(triggerCard) {
    const parentGrid = triggerCard.parentElement;
    const cards = parentGrid.querySelectorAll('.program-card, .success-card');
    
    cards.forEach((card, index) => {
        if (!card.classList.contains('animate-in')) {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 150);
        }
    });
}

// Setup counting animations for statistics
function setupCountingAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        countObserver.observe(stat);
    });
}

// Animate counter with smooth counting effect
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const hasKSuffix = element.textContent.includes('K+');
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    
    const counter = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        
        const displayValue = Math.floor(current);
        element.textContent = hasKSuffix ? displayValue + 'K+' : displayValue;
    }, stepDuration);
    
    // Add a beautiful pulse effect when counting starts
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}

// Setup interactive elements and hover effects
function setupInteractiveElements() {
    // Enhanced hover effects for highlight cards
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(241, 196, 0, 0.2)';
            
            // Animate the icon
            const icon = this.querySelector('.highlight-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.08)';
            
            const icon = this.querySelector('.highlight-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Enhanced program card interactions
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.background = 'rgba(241, 196, 0, 0.15)';
            
            // Animate the icon with a bounce
            const icon = this.querySelector('.program-icon');
            icon.style.animation = 'iconBounce 0.6s ease-out';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.05)';
            
            const icon = this.querySelector('.program-icon');
            icon.style.animation = '';
        });
    });
    
    // Success card interactions with image zoom
    const successCards = document.querySelectorAll('.success-card');
    successCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.success-image img');
            img.style.transform = 'scale(1.15)';
            
            // Add a subtle glow effect
            this.style.boxShadow = '0 25px 80px rgba(241, 196, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.success-image img');
            img.style.transform = 'scale(1)';
            
            this.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Button ripple effects
    const buttons = document.querySelectorAll('.primary-button, .secondary-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Create beautiful ripple effect for buttons
function createRippleEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(${x}px, ${y}px) scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    // Ensure button has relative positioning
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup parallax effects for floating elements
function setupParallaxEffects() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${rate * speed}px) scale(${1 + scrolled * 0.0001})`;
        });
    }, 10));
    
    // Parallax effect for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            heroContent.style.transform = `translateY(${rate}px)`;
        }, 10));
    }
}

// Create beautiful loading animation for page
function createPageLoadAnimation() {
    const hero = document.querySelector('.about-hero');
    const heroTitle = document.querySelector('.hero-title');
    const heroDesc = document.querySelector('.hero-description');
    const heroStats = document.querySelector('.hero-stats');
    
    // Reset initial states
    if (heroTitle) heroTitle.style.opacity = '0';
    if (heroDesc) heroDesc.style.opacity = '0';
    if (heroStats) heroStats.style.opacity = '0';
    
    // Animate in sequence
    setTimeout(() => {
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'slideUpFade 1.2s ease-out forwards';
        }
    }, 300);
    
    setTimeout(() => {
        if (heroDesc) {
            heroDesc.style.opacity = '1';
            heroDesc.style.animation = 'slideUpFade 1.2s ease-out forwards';
        }
    }, 600);
    
    setTimeout(() => {
        if (heroStats) {
            heroStats.style.opacity = '1';
            heroStats.style.animation = 'slideUpFade 1.2s ease-out forwards';
        }
    }, 900);
}

// Add custom CSS animations via JavaScript
function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes iconBounce {
            0%, 100% { transform: scale(1) rotate(0deg); }
            25% { transform: scale(1.1) rotate(-5deg); }
            50% { transform: scale(1.2) rotate(5deg); }
            75% { transform: scale(1.1) rotate(-3deg); }
        }
        
        @keyframes ripple {
            to {
                transform: translate(var(--x), var(--y)) scale(2);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .pulse-animation {
            animation: pulse 2s infinite ease-in-out;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #F1C400, #e6b800);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(241, 196, 0, 0.3);
    `;
    document.body.appendChild(progressBar);
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', debounce(updateProgress, 10));
}

// Utility function for debouncing
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

// Handle window resize and recalculate animations
window.addEventListener('resize', debounce(() => {
    // Recalculate any position-dependent animations
    console.log('Window resized, recalculating animations');
    
    // Re-trigger animations for visible elements
    const visibleElements = document.querySelectorAll('.animate-in');
    visibleElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Element is visible, ensure animation state is correct
            element.style.transform = element.style.transform || 'translateY(0)';
            element.style.opacity = '1';
        }
    });
}, 250));

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    addCustomAnimations();
    createScrollProgress();
    createPageLoadAnimation();
});

// Export functions for external use
window.AboutPage = {
    animateCounter,
    createRippleEffect,
    debounce
};

// Special effects for enhanced user experience
function addSpecialEffects() {
    // Add floating particles effect to hero
    const hero = document.querySelector('.about-hero');
    if (hero) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(241, 196, 0, 0.3);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${10 + Math.random() * 10}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            hero.appendChild(particle);
        }
    }
    
    // Add particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.3; }
            25% { transform: translateY(-20px) translateX(10px) scale(1.2); opacity: 0.6; }
            50% { transform: translateY(-40px) translateX(-10px) scale(0.8); opacity: 0.2; }
            75% { transform: translateY(-20px) translateX(15px) scale(1.1); opacity: 0.5; }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Setup beautiful staggered animations for letter paragraphs
function setupLetterAnimations() {
    const letterContent = document.querySelector('.letter-content');
    const directorImage = document.querySelector('.director-image');
    const letterParagraphs = document.querySelectorAll('.letter-paragraph');
    const letterTitle = document.querySelector('.letter-title');
    const directorName = document.querySelector('.director-name');
    
    if (!letterContent) return;
    
    // Add initial states
    letterParagraphs.forEach(paragraph => {
        paragraph.style.opacity = '0';
        paragraph.style.transform = 'translateY(30px)';
        paragraph.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    // Intersection Observer for the letter section
    const letterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate main containers first
                setTimeout(() => {
                    letterContent.classList.add('animate-in');
                }, 200);
                
                setTimeout(() => {
                    directorImage.classList.add('animate-in');
                }, 400);
                
                // Animate header elements
                setTimeout(() => {
                    if (letterTitle) {
                        letterTitle.style.transform = 'translateY(0) scale(1)';
                        letterTitle.style.opacity = '1';
                    }
                }, 600);
                
                setTimeout(() => {
                    if (directorName) {
                        directorName.style.transform = 'translateY(0)';
                        directorName.style.opacity = '1';
                    }
                }, 800);
                
                // Stagger paragraph animations with sophisticated timing
                letterParagraphs.forEach((paragraph, index) => {
                    const delay = 1000 + (index * 150);
                    
                    setTimeout(() => {
                        paragraph.style.opacity = '1';
                        paragraph.style.transform = 'translateY(0)';
                        
                        // Add a subtle bounce effect for highlight text
                        if (paragraph.classList.contains('highlight-text')) {
                            setTimeout(() => {
                                paragraph.style.transform = 'translateY(-5px)';
                                setTimeout(() => {
                                    paragraph.style.transform = 'translateY(0)';
                                }, 150);
                            }, 200);
                        }
                    }, delay);
                });
                
                // Add floating effect to the director photo
                const directorPhoto = document.querySelector('.director-photo');
                if (directorPhoto) {
                    setTimeout(() => {
                        directorPhoto.style.animation = 'gentleFloat 6s ease-in-out infinite';
                    }, 1500);
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    letterObserver.observe(letterContent);
    
    // Add gentle floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes gentleFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
    `;
    document.head.appendChild(floatStyle);
}

// Setup hero video interactions
function setupHeroVideoInteractions() {
    const heroCtaBtn = document.querySelector('.hero-cta-btn');
    
    if (heroCtaBtn) {
        heroCtaBtn.addEventListener('click', function() {
            // Smooth scroll to the Gronowski lab section
            const labSection = document.querySelector('.gronowski-lab-section');
            if (labSection) {
                labSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    }
}

// Initialize special effects
setTimeout(addSpecialEffects, 1000);

// =========================================================
// SOPHISTICATED READ MORE FUNCTIONALITY
// ========================================================= 

let isExpanded = false;

function toggleLetterContent() {
    const letterExpandable = document.getElementById('letterExpandable');
    const secondaryExpandable = document.getElementById('secondaryExpandable');
    const readMoreBtn = document.querySelector('.read-more-btn');
    const letterContent = document.querySelector('.letter-content');
    const directorImage = document.querySelector('.director-image');
    const btnText = readMoreBtn.querySelector('.btn-text');
    
    if (!isExpanded) {
        // EXPAND ANIMATION SEQUENCE
        
        // Step 1: Button transformation
        readMoreBtn.classList.add('expanded');
        btnText.textContent = 'Show Less';
        
        // Step 2: Add expanding class for border glow effect
        letterContent.classList.add('expanding');
        directorImage.classList.add('expanding');
        
        // Step 3: Reveal primary expandable content with sophisticated timing
        setTimeout(() => {
            letterExpandable.classList.add('expanded');
        }, 200);
        
        // Step 4: Reveal secondary content with staggered delay
        setTimeout(() => {
            secondaryExpandable.classList.add('expanded');
        }, 600);
        
        // Step 5: Add subtle scale effect to containers
        setTimeout(() => {
            letterContent.style.transform = 'scale(1.01)';
            directorImage.style.transform = 'scale(1.01)';
        }, 800);
        
        // Step 6: Return to normal scale with elegant easing
        setTimeout(() => {
            letterContent.style.transform = 'scale(1)';
            directorImage.style.transform = 'scale(1)';
            letterContent.classList.remove('expanding');
            directorImage.classList.remove('expanding');
        }, 1200);
        
        // Step 7: Add reading experience enhancements
        setTimeout(() => {
            addReadingEnhancements();
        }, 1000);
        
        isExpanded = true;
        
    } else {
        // COLLAPSE ANIMATION SEQUENCE
        
        // Step 1: Button transformation
        readMoreBtn.classList.remove('expanded');
        btnText.textContent = 'Read Full Letter';
        
        // Step 2: Smooth collapse with sophisticated timing
        letterExpandable.classList.remove('expanded');
        secondaryExpandable.classList.remove('expanded');
        
        // Step 3: Remove reading enhancements
        removeReadingEnhancements();
        
        // Step 4: Gentle scroll back to section start
        setTimeout(() => {
            const letterSection = document.querySelector('.director-letter-section');
            letterSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 400);
        
        isExpanded = false;
    }
    
    // Analytics or tracking (if needed)
    trackReadMoreInteraction(isExpanded);
}

// Add sophisticated reading experience enhancements
function addReadingEnhancements() {
    const letterSection = document.querySelector('.director-letter-section');
    
    // Add reading mode background
    letterSection.style.background = `
        linear-gradient(135deg, #f8f9fb 0%, #ffffff 25%, #f6f8fa 50%, #ffffff 75%, #f8f9fb 100%),
        radial-gradient(circle at 30% 40%, rgba(241, 196, 0, 0.04) 0%, transparent 50%),
        radial-gradient(circle at 70% 60%, rgba(241, 196, 0, 0.03) 0%, transparent 50%)
    `;
    
    // Add subtle reading indicators
    const expandedParagraphs = document.querySelectorAll('.expandable-content .letter-paragraph');
    expandedParagraphs.forEach((paragraph, index) => {
        paragraph.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(241, 196, 0, 0.03)';
            this.style.borderRadius = '8px';
            this.style.padding = '15px';
            this.style.margin = '10px 0';
        });
        
        paragraph.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            this.style.padding = '0';
            this.style.margin = '22px 0';
        });
    });
    
    // Add progress indicator for reading
    createReadingProgress();
}

// Remove reading enhancements
function removeReadingEnhancements() {
    const letterSection = document.querySelector('.director-letter-section');
    
    // Reset background
    letterSection.style.background = `
        linear-gradient(135deg, #f8f9fa 0%, #ffffff 25%, #f1f3f4 50%, #ffffff 75%, #f8f9fa 100%),
        radial-gradient(circle at 20% 30%, rgba(241, 196, 0, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(241, 196, 0, 0.02) 0%, transparent 50%)
    `;
    
    // Remove reading progress indicator
    const progressIndicator = document.querySelector('.reading-progress');
    if (progressIndicator) {
        progressIndicator.remove();
    }
}

// Create reading progress indicator
function createReadingProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'reading-progress';
    progressContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: rgba(241, 196, 0, 0.1);
        border: 2px solid #F1C400;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 600;
        color: #F1C400;
        z-index: 1000;
        backdrop-filter: blur(10px);
        box-shadow: 0 8px 24px rgba(241, 196, 0, 0.2);
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateX(100px);
    `;
    
    // Animate in
    document.body.appendChild(progressContainer);
    setTimeout(() => {
        progressContainer.style.opacity = '1';
        progressContainer.style.transform = 'translateX(0)';
    }, 300);
    
    // Update reading progress
    function updateReadingProgress() {
        const letterSection = document.querySelector('.director-letter-section');
        const rect = letterSection.getBoundingClientRect();
        const sectionHeight = letterSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        let progress = 0;
        if (rect.top < 0) {
            progress = Math.min(100, Math.abs(rect.top) / (sectionHeight - viewportHeight) * 100);
        }
        
        progressContainer.textContent = Math.round(progress) + '%';
        
        // Change color based on progress
        const intensity = progress / 100;
        progressContainer.style.background = `rgba(241, 196, 0, ${0.1 + intensity * 0.2})`;
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', debounce(updateReadingProgress, 50));
    updateReadingProgress();
}

// Track read more interactions for analytics
function trackReadMoreInteraction(expanded) {
    // This is where you could add analytics tracking
    console.log(`Letter ${expanded ? 'expanded' : 'collapsed'} - User engagement tracked`);
    
    // Example: Google Analytics event
    // gtag('event', 'read_more', {
    //     'event_category': 'engagement',
    //     'event_label': expanded ? 'expand' : 'collapse'
    // });
}

// Export the toggle function for global access
window.toggleLetterContent = toggleLetterContent;

// =========================================================
// SOPHISTICATED HORIZONTAL SCROLL FOR STUDENT IMPACT
// ========================================================= 

let currentPanel = 0;
const totalPanels = 3;
let isScrolling = false;
let touchStartX = 0;
let touchEndX = 0;
let scrollDirection = 1; // 1 for forward (0→1→2), -1 for backward (2→1→0)

// Initialize horizontal scroll functionality
function initializeHorizontalScroll() {
    // setupScrollListeners(); // REMOVED: Disable trackpad/mouse wheel navigation
    setupTouchGestures();
    setupKeyboardNavigation();
    setupIntersectionObserver();
    updateScrollUI();
    
    // Trigger counting animation for the first panel after initialization
    setTimeout(() => {
        triggerCountingAnimation(0);
    }, 1500);
    
    console.log('Sophisticated horizontal scroll initialized (trackpad navigation disabled)');
}

// DISABLED: Setup scroll listeners for mouse wheel and trackpad
// This function is disabled to prevent accidental navigation and lag
// caused by trackpad/mouse wheel movements
/*
function setupScrollListeners() {
    const scrollContainer = document.querySelector('.horizontal-scroll-container');
    if (!scrollContainer) return;
    
    scrollContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (isScrolling) return;
        
        const delta = e.deltaY || e.deltaX;
        
        if (Math.abs(delta) > 10) {
            if (delta > 0 && currentPanel < totalPanels - 1) {
                scrollToPanel('next');
            } else if (delta < 0 && currentPanel > 0) {
                scrollToPanel('prev');
            }
        }
    }, { passive: false });
}
*/

// Setup touch gestures for mobile
function setupTouchGestures() {
    const scrollContainer = document.querySelector('.horizontal-scroll-container');
    if (!scrollContainer) return;
    
    scrollContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    scrollContainer.addEventListener('touchend', (e) => {
        if (isScrolling) return;
        
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchStartX - touchEndX;
        const minSwipeDistance = 50;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                scrollToPanel('next'); // Remove condition, let ping-pong handle it
            } else if (swipeDistance < 0) {
                scrollToPanel('prev'); // Remove condition, let ping-pong handle it
            }
        }
    }, { passive: true });
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (isScrolling) return;
        
        // Check if user is in the impacting students section
        const section = document.querySelector('.impacting-students-section');
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isInView) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                scrollToPanel('prev'); // Remove condition, let ping-pong handle it
                break;
            case 'ArrowRight':
                e.preventDefault();
                scrollToPanel('next'); // Remove condition, let ping-pong handle it
                break;
            case ' ': // Spacebar
                e.preventDefault();
                scrollToPanel('next'); // Remove condition, let ping-pong handle it
                break;
        }
    });
}

// Main scroll function with sophisticated animations
function scrollToPanel(direction) {
    if (isScrolling) return;
    
    const scrollTrack = document.getElementById('studentScrollTrack');
    if (!scrollTrack) return;
    
    console.log(`scrollToPanel called with direction: ${direction}, currentPanel: ${currentPanel}, scrollDirection: ${scrollDirection}`);
    
    isScrolling = true;
    
    // Calculate target panel with ping-pong behavior
    let targetPanel;
    
    if (typeof direction === 'number') {
        // Direct panel selection - ensure it's within bounds
        targetPanel = Math.max(0, Math.min(direction, totalPanels - 1));
        console.log(`Direct panel selection: ${targetPanel}`);
    } else if (direction === 'next') {
        // Ping-pong logic for next
        if (scrollDirection === 1) {
            // Moving forward
            if (currentPanel < totalPanels - 1) {
                targetPanel = currentPanel + 1;
                console.log(`Moving forward: ${currentPanel} -> ${targetPanel}`);
            } else {
                // Reached the end, reverse direction
                scrollDirection = -1;
                targetPanel = currentPanel - 1;
                console.log(`Reached end, reversing: ${currentPanel} -> ${targetPanel}, new direction: ${scrollDirection}`);
            }
        } else {
            // Moving backward
            if (currentPanel > 0) {
                targetPanel = currentPanel - 1;
                console.log(`Moving backward: ${currentPanel} -> ${targetPanel}`);
            } else {
                // Reached the beginning, reverse direction
                scrollDirection = 1;
                targetPanel = currentPanel + 1;
                console.log(`Reached beginning, reversing: ${currentPanel} -> ${targetPanel}, new direction: ${scrollDirection}`);
            }
        }
    } else if (direction === 'prev') {
        // Ping-pong logic for prev (reverse of next)
        if (scrollDirection === 1) {
            // Moving forward, so prev means reverse
            if (currentPanel > 0) {
                targetPanel = currentPanel - 1;
                scrollDirection = -1; // Set direction to backward
            } else {
                // At beginning, go forward
                targetPanel = currentPanel + 1;
                scrollDirection = 1;
            }
        } else {
            // Moving backward, so prev means continue backward
            if (currentPanel < totalPanels - 1) {
                targetPanel = currentPanel + 1;
                scrollDirection = 1; // Reverse to forward
            } else {
                // At end, continue backward
                targetPanel = currentPanel - 1;
            }
        }
    }
    
    // Ensure target panel is valid and within bounds
    if (targetPanel < 0 || targetPanel >= totalPanels) {
        isScrolling = false;
        return;
    }
    
    // Don't scroll if we're already at the target
    if (targetPanel === currentPanel) {
        isScrolling = false;
        return;
    }
    
    // Update current panel
    const previousPanel = currentPanel;
    currentPanel = targetPanel;
    
    // Calculate transform value - ensure it doesn't exceed bounds
    const translateX = -currentPanel * 100;
    
    console.log(`Final: currentPanel=${currentPanel}, translateX=${translateX}vw`);
    
    // Apply sophisticated transform with improved easing
    scrollTrack.style.transition = 'transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
    scrollTrack.style.transform = `translateX(${translateX}vw)`;
    
    // Update panel states with sophisticated timing
    updatePanelStates(previousPanel, currentPanel);
    
    // Trigger counting animation for the new active panel
    triggerCountingAnimation(currentPanel);
    
    // Update UI elements
    updateScrollUI();
    
    // Create sophisticated visual effects
    createScrollEffects(direction, previousPanel, currentPanel);
    
    // Reset scrolling lock with proper timing for the new animation duration
    setTimeout(() => {
        isScrolling = false;
    }, 1200);
    
    // Track analytics
    trackPanelView(currentPanel);
}

// Update panel active states with sophisticated timing
function updatePanelStates(previousPanel, newPanel) {
    const panels = document.querySelectorAll('.impact-panel');
    
    // Remove active state from previous panel
    if (panels[previousPanel]) {
        panels[previousPanel].classList.remove('active');
    }
    
    // Add active state to new panel with sophisticated delay
    setTimeout(() => {
        if (panels[newPanel]) {
            panels[newPanel].classList.add('active');
        }
    }, 300);
}

// Sophisticated Counting Animation for Stats
function triggerCountingAnimation(panelIndex) {
    const panels = document.querySelectorAll('.impact-panel');
    if (!panels[panelIndex]) return;
    
    const statNumber = panels[panelIndex].querySelector('.stat-number');
    if (!statNumber || !statNumber.dataset.target) return;
    
    const target = parseInt(statNumber.dataset.target);
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    // Reset to 0 before animating
    statNumber.textContent = '0';
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Sophisticated easing function (ease-out-cubic)
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = Math.floor(target * easeOutCubic);
        statNumber.textContent = currentValue.toString();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Ensure we end at the exact target
            statNumber.textContent = target.toString();
        }
    }
    
    // Start animation with a slight delay for better visual impact
    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 600);
}

// Update UI elements (edge navigation, progress)
function updateScrollUI() {
    // Update edge navigation visibility
    const leftEdge = document.getElementById('leftEdge');
    const rightEdge = document.getElementById('rightEdge');
    
    if (leftEdge) {
        if (currentPanel === 0) {
            leftEdge.classList.add('disabled');
        } else {
            leftEdge.classList.remove('disabled');
        }
    }
    
    if (rightEdge) {
        if (currentPanel === totalPanels - 1) {
            rightEdge.classList.add('disabled');
        } else {
            rightEdge.classList.remove('disabled');
        }
    }
    
    // Update progress bar
    const progressFill = document.getElementById('scrollProgress');
    if (progressFill) {
        const progress = ((currentPanel + 1) / totalPanels) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

// Create sophisticated visual effects during scroll
function createScrollEffects(direction, previousPanel, newPanel) {
    // Create particle effects
    createScrollParticles(direction);
    
    // Update background elements
    updateBackgroundEffects(newPanel);
    
    // Create transition overlays
    createTransitionOverlay(direction);
}

// Create beautiful particle effects during transitions
function createScrollParticles(direction) {
    const container = document.querySelector('.horizontal-scroll-container');
    if (!container) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(241, 196, 0, 0.7);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${direction === 'next' ? '0%' : '100%'};
            z-index: 50;
            pointer-events: none;
            animation: particleTrail 0.8s ease-out forwards;
            animation-delay: ${i * 0.05}s;
        `;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
    
    // Add particle trail animation
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleTrail {
                0% {
                    transform: translateX(0) scale(0);
                    opacity: 0;
                }
                20% {
                    transform: translateX(${direction === 'next' ? '200px' : '-200px'}) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateX(${direction === 'next' ? '400px' : '-400px'}) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Update background effects based on current panel
function updateBackgroundEffects(panelIndex) {
    const section = document.querySelector('.impacting-students-section');
    if (!section) return;
    
    // Different background effects for each panel
    const effects = [
        'linear-gradient(135deg, #1b1b1b 0%, #2d2d2d 100%)',
        'linear-gradient(135deg, #1b1b1b 0%, #1f2937 100%)',
        'linear-gradient(135deg, #1f2937 0%, #1b1b1b 100%)',
        'linear-gradient(135deg, #2d2d2d 0%, #1b1b1b 100%)'
    ];
    
    // Smooth background transition
    section.style.background = effects[panelIndex] || effects[0];
}

// Create transition overlay effect
function createTransitionOverlay(direction) {
    const container = document.querySelector('.horizontal-scroll-container');
    if (!container) return;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: ${direction === 'next' ? '0%' : '100%'};
        width: 100%;
        height: 100%;
        background: linear-gradient(
            ${direction === 'next' ? '90deg' : '-90deg'},
            rgba(241, 196, 0, 0.1) 0%,
            transparent 50%,
            rgba(241, 196, 0, 0.1) 100%
        );
        z-index: 30;
        pointer-events: none;
        opacity: 0;
        animation: transitionSweep 0.8s ease-out forwards;
    `;
    
    container.appendChild(overlay);
    
    // Remove overlay after animation
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, 800);
    
    // Add transition sweep animation
    if (!document.querySelector('#transition-styles')) {
        const style = document.createElement('style');
        style.id = 'transition-styles';
        style.textContent = `
            @keyframes transitionSweep {
                0% {
                    opacity: 0;
                    transform: translateX(${direction === 'next' ? '-100%' : '100%'});
                }
                50% {
                    opacity: 0.8;
                    transform: translateX(0);
                }
                100% {
                    opacity: 0;
                    transform: translateX(${direction === 'next' ? '100%' : '-100%'});
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Setup intersection observer for auto-play and performance
function setupIntersectionObserver() {
    const section = document.querySelector('.impacting-students-section');
    if (!section) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is visible, enable interactions
                startAutoPlayTimer();
            } else {
                // Section is not visible, pause interactions
                clearAutoPlayTimer();
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(section);
}

// Auto-play functionality (optional)
let autoPlayTimer;

function startAutoPlayTimer() {
    // Auto-advance every 10 seconds when not interacting
    clearAutoPlayTimer();
    autoPlayTimer = setTimeout(() => {
        if (!isScrolling) {
            scrollToPanel('next'); // This will now handle smooth looping
            startAutoPlayTimer(); // Continue auto-play
        }
    }, 10000);
}

function clearAutoPlayTimer() {
    if (autoPlayTimer) {
        clearTimeout(autoPlayTimer);
        autoPlayTimer = null;
    }
}

// Track panel views for analytics
function trackPanelView(panelIndex) {
    const panelNames = [
        'Innovation Engineering Fundamentals',
        'Blockchain for Social Impact',
        'Alumni Co-Teaching Program',
        'Executive Speaker Series'
    ];
    
    console.log(`Panel viewed: ${panelNames[panelIndex]} (${panelIndex + 1}/${totalPanels})`);
    
    // Example: Google Analytics event
    // gtag('event', 'panel_view', {
    //     'event_category': 'student_impact',
    //     'event_label': panelNames[panelIndex],
    //     'panel_index': panelIndex
    // });
}

// Initialize horizontal scroll when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeHorizontalScroll, 1000);
});

// =========================================================
// FOUNDERS TESTIMONIALS - CLEAN SIMPLE IMPLEMENTATION
// =========================================================

let currentTestimonial = 0;
let testimonialTimer = null;
const totalTestimonials = 2;

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonials.length === 0) return;
    
    console.log(`Showing testimonial ${index}`);
    
    // Hide all testimonials
    testimonials.forEach((item, i) => {
        item.style.display = i === index ? 'flex' : 'none';
        item.classList.toggle('active', i === index);
    });
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentTestimonial = index;
}

function nextTestimonial() {
    const next = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(next);
}

function startTestimonialAutoplay() {
    if (testimonialTimer) clearInterval(testimonialTimer);
    
    testimonialTimer = setInterval(() => {
        nextTestimonial();
    }, 5000);
}

function initTestimonials() {
    console.log('Initializing testimonials...');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    // Set up dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            console.log(`Dot ${index} clicked`);
            clearInterval(testimonialTimer);
            showTestimonial(index);
            startTestimonialAutoplay();
        });
    });
    
    // Initialize first testimonial
    showTestimonial(0);
    startTestimonialAutoplay();
    
    console.log('Testimonials initialized successfully');
}

// Initialize when DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonials);
} else {
    initTestimonials();
}

// =========================================================
// STUDENT RUN PROGRAMME CAROUSEL
// =========================================================

let currentCarouselSlide = 0;
let carouselAutoplayTimer = null;

function initStudentCarousel() {
    const track = document.getElementById('studentCarouselTrack');
    const slides = document.querySelectorAll('.carousel-slide-new');
    const prevBtn = document.querySelector('.carousel-prev-new');
    const nextBtn = document.querySelector('.carousel-next-new');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!track || slides.length === 0) return;
    
    const totalSlides = slides.length;
    
    // Create indicators
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator';
        indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentCarouselSlide = index;
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update track position
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Update indicators
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Reset autoplay
        resetCarouselAutoplay();
    }
    
    function nextSlide() {
        goToSlide(currentCarouselSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentCarouselSlide - 1);
    }
    
    function startCarouselAutoplay() {
        if (carouselAutoplayTimer) clearInterval(carouselAutoplayTimer);
        carouselAutoplayTimer = setInterval(nextSlide, 4000);
    }
    
    function resetCarouselAutoplay() {
        if (carouselAutoplayTimer) clearInterval(carouselAutoplayTimer);
        startCarouselAutoplay();
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Pause on hover
    const viewport = document.querySelector('.carousel-viewport');
    if (viewport) {
        viewport.addEventListener('mouseenter', () => {
            if (carouselAutoplayTimer) clearInterval(carouselAutoplayTimer);
        });
        
        viewport.addEventListener('mouseleave', startCarouselAutoplay);
    }
    
    // Start autoplay
    startCarouselAutoplay();
    
    console.log('Student carousel initialized with', totalSlides, 'slides');
}

// Initialize carousel when DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStudentCarousel);
} else {
    initStudentCarousel();
}

// =========================================================
// IMPACT SECTION - PHONE MOCKUP WITH AUTO-SCROLLING VIDEOS
// =========================================================

let currentVideoIndex = 0;
let videoAutoplayTimer = null;

function initImpactCounters() {
    initPhoneMockupVideos();
    console.log('Phone mockup video showcase initialized');
}

function initPhoneMockupVideos() {
    const videoFeed = document.getElementById('studentVideoFeed');
    const videoItems = document.querySelectorAll('.video-item');
    const infoCards = document.querySelectorAll('.info-card');
    
    if (videoItems.length === 0) return;
    
    const totalVideos = videoItems.length;
    
    function showVideo(index) {
        // Hide all videos and info cards
        videoItems.forEach((item, i) => {
            const video = item.querySelector('.student-video');
            item.classList.toggle('active', i === index);
            
            if (i === index) {
                video.play().catch(e => console.log('Video autoplay prevented:', e));
            } else {
                video.pause();
            }
        });
        
        infoCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        
        currentVideoIndex = index;
    }
    
    function nextVideo() {
        const nextIndex = (currentVideoIndex + 1) % totalVideos;
        showVideo(nextIndex);
    }
    
    function startAutoplay() {
        if (videoAutoplayTimer) clearInterval(videoAutoplayTimer);
        videoAutoplayTimer = setInterval(nextVideo, 5000);
    }
    
    // Initialize first video
    showVideo(0);
    
    // Start autoplay
    startAutoplay();
    
    // Pause on hover
    const phoneShowcase = document.querySelector('.phone-showcase-container');
    if (phoneShowcase) {
        phoneShowcase.addEventListener('mouseenter', () => {
            if (videoAutoplayTimer) clearInterval(videoAutoplayTimer);
        });
        
        phoneShowcase.addEventListener('mouseleave', startAutoplay);
    }
    
    // Add click navigation to info cards
    infoCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            showVideo(index);
            if (videoAutoplayTimer) clearInterval(videoAutoplayTimer);
            startAutoplay();
        });
    });
    
    console.log('Phone video showcase initialized with', totalVideos, 'videos');
}

// Export functions for global access
window.scrollToPanel = scrollToPanel;
window.StudentImpactScroll = {
    currentPanel: () => currentPanel,
    totalPanels: () => totalPanels,
    goToPanel: scrollToPanel,
    isScrolling: () => isScrolling
};

window.TestimonialsCarousel = {
    goToSlide: showTestimonial,
    currentSlide: () => currentTestimonial,
    totalSlides: () => totalTestimonials
};