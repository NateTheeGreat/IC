// =========================================================
// BEAUTIFUL STORIES PAGE WITH SCROLL ANIMATIONS
// ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    initializeStoriesPage();
});

// Initialize the stories page
function initializeStoriesPage() {
    setupScrollAnimations();
    setupInteractiveElements();
    initializeSlideshow();
    setupScrollIndicator();
    console.log('Beautiful Stories page with scroll animations initialized');
}

// Setup scroll-triggered animations
function setupScrollAnimations() {
    // Create intersection observer with sophisticated options
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple sections
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
            } else {
                // Optional: Remove animation class when scrolling back up for re-animation
                // entry.target.classList.remove('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        observer.observe(section);
        
        // Add a small initial delay for the first section
        if (index === 0) {
            setTimeout(() => {
                section.classList.add('animate-in');
            }, 300);
        }
    });
    
    // Advanced scroll progress indicator
    createScrollProgressIndicator();
}

// Setup interactive elements
function setupInteractiveElements() {
    // Video overlay interactions
    const videoOverlays = document.querySelectorAll('.video-overlay');
    videoOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                showVideoModal();
            }, 150);
        });
        
        // Enhanced hover effects
        overlay.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 0, 0, 0.8)';
            this.querySelector('.play-button').style.transform = 'scale(1.2)';
        });
        
        overlay.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(0, 0, 0, 0.5)';
            this.querySelector('.play-button').style.transform = 'scale(1)';
        });
    });
    
    // Learn button interactions - just visual effects, no modal
    const learnButtons = document.querySelectorAll('.learn-btn');
    learnButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Allow default navigation behavior - do NOT prevent default
            
            // Beautiful click animation
            this.style.transform = 'scale(0.95)';
            
            // Create ripple effect
            createRippleEffect(this, e);
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
        
        // Enhanced hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 12px 30px rgba(241, 196, 0, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 24px rgba(241, 196, 0, 0.3)';
        });
        
        // Add focus effects for accessibility
        button.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(241, 196, 0, 0.5)';
        });
        
        button.addEventListener('blur', function() {
            this.style.boxShadow = '0 8px 24px rgba(241, 196, 0, 0.3)';
        });
    });
    
    // Image hover effects with parallax
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1.05)';
            img.style.filter = 'brightness(1.1)';
        });
        
        container.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1)';
            img.style.filter = 'brightness(1)';
        });
    });
}

// Create ripple effect for buttons
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(${x}px, ${y}px) scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    // Add ripple animation CSS if not already added
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: translate(${x}px, ${y}px) scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Create scroll progress indicator
function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #007bff, #0056b3);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateProgress);
}

// Show video modal
function showVideoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: all 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="video-content" style="
            background: white;
            border-radius: 12px;
            padding: 40px;
            max-width: 700px;
            width: 90%;
            text-align: center;
            transform: scale(0.8);
            transition: all 0.3s ease;
        ">
            <h2 style="margin: 0 0 20px 0; color: #1b1b1b;">David's Research Lab</h2>
            <div style="
                width: 100%;
                height: 300px;
                background: #f0f0f0;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 0 20px 0;
                font-size: 48px;
                color: #999;
            ">▶</div>
            <p style="color: #666; margin: 0 0 30px 0;">
                Video player would be embedded here showcasing David Liu's groundbreaking genetic research.
            </p>
            <button onclick="this.closest('.video-modal').remove()" style="
                background: #007bff;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 1rem;
            ">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.video-content').style.transform = 'scale(1)';
    }, 10);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Utility functions
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Performance optimization
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

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate animations on resize
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.add('animate-in');
        }
    });
}, 250));

// Export functions for external use
window.BeautifulStories = {
    smoothScrollTo,
    showVideoModal
};

// Initialize smooth slideshow
function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 6000; // 6 seconds per slide
    
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.classList.add('fade-out');
        });
        
        // Add active class to current slide
        setTimeout(() => {
            slides[index].classList.remove('fade-out');
            slides[index].classList.add('active');
        }, 100);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Start the slideshow
    setInterval(nextSlide, slideInterval);
    
    // Initialize first slide
    showSlide(0);
    
    console.log('Smooth slideshow initialized with', slides.length, 'slides');
}

// Setup scroll indicator functionality
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const contentSection = document.querySelector('.content-section');
    
    if (scrollIndicator && contentSection) {
        scrollIndicator.addEventListener('click', () => {
            contentSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}