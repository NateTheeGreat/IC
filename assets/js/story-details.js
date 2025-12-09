// =========================================================
// STORY DETAILS PAGE JAVASCRIPT
// ========================================================= */

document.addEventListener('DOMContentLoaded', function() {
    initializeStoryDetailsPage();
});

// Initialize the story details page
function initializeStoryDetailsPage() {
    setupScrollAnimations();
    setupInteractiveElements();
    setupShareButtons();
    setupSmoothScrolling();
    console.log('Story Details page initialized');
}

// Setup scroll-triggered animations for content sections
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe content sections
    const contentSections = document.querySelectorAll('.content-section, .sidebar-section');
    contentSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(section);
    });
    
    // Animate stats on scroll
    const statItems = document.querySelectorAll('.stat-item');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumbers(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach(item => {
        statsObserver.observe(item);
    });
}

// Animate stat numbers counting up
function animateStatNumbers(statItem) {
    const numberElement = statItem.querySelector('.stat-number');
    const finalNumber = numberElement.textContent;
    const isPercentage = finalNumber.includes('%');
    const isCurrency = finalNumber.includes('$');
    const hasPlus = finalNumber.includes('+');
    
    // Extract numeric value
    let numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
    
    // Handle different formats
    if (finalNumber.includes('M')) {
        numericValue = numericValue; // Keep as is for millions
    }
    
    let currentNumber = 0;
    const increment = numericValue / 50; // 50 steps
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(currentNumber);
        
        // Format based on original format
        if (isCurrency && finalNumber.includes('M')) {
            numberElement.textContent = `$${displayValue}M${hasPlus ? '+' : ''}`;
        } else if (isPercentage) {
            numberElement.textContent = `${displayValue}%`;
        } else if (finalNumber.includes('M')) {
            numberElement.textContent = `${displayValue}M${hasPlus ? '+' : ''}`;
        } else {
            numberElement.textContent = `${displayValue}${hasPlus ? '+' : ''}`;
        }
    }, stepTime);
}

// Setup interactive elements
function setupInteractiveElements() {
    // Enhanced navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            if (this.classList.contains('back-btn')) {
                e.preventDefault();
                // Add smooth transition effect
                document.body.style.opacity = '0.8';
                setTimeout(() => {
                    window.location.href = 'stories.html';
                }, 300);
            }
        });
    });
    
    // Related stories hover effects
    const relatedStories = document.querySelectorAll('.related-story');
    relatedStories.forEach(story => {
        story.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 24px rgba(241, 196, 0, 0.2)';
        });
        
        story.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Highlight box interactions
    const highlightBoxes = document.querySelectorAll('.highlight-box');
    highlightBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 40px rgba(241, 196, 0, 0.15)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Meta items hover effects
    const metaItems = document.querySelectorAll('.meta-item');
    metaItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(241, 196, 0, 0.2)';
            this.style.borderColor = 'rgba(241, 196, 0, 0.5)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(0, 0, 0, 0.3)';
            this.style.borderColor = 'rgba(241, 196, 0, 0.3)';
        });
    });
}

// Setup share functionality
function setupShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('linkedin') ? 'linkedin' :
                           this.classList.contains('twitter') ? 'twitter' : 'email';
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            handleShare(platform);
        });
        
        // Enhanced hover effects
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 30px rgba(241, 196, 0, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
}

// Handle sharing functionality
function handleShare(platform) {
    const url = window.location.href;
    const title = document.querySelector('.story-title').textContent;
    const description = document.querySelector('.lead-paragraph').textContent.substring(0, 200) + '...';
    
    let shareUrl = '';
    
    switch(platform) {
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`;
            break;
    }
    
    if (shareUrl) {
        if (platform === 'email') {
            window.location.href = shareUrl;
        } else {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }
    
    // Show success message
    showShareSuccess(platform);
}

// Show share success message
function showShareSuccess(platform) {
    const message = document.createElement('div');
    message.className = 'share-success';
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #F1C400, #e6b800);
        color: #1b1b1b;
        padding: 15px 25px;
        border-radius: 50px;
        font-weight: 600;
        font-size: 0.9rem;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(241, 196, 0, 0.3);
    `;
    
    message.textContent = `Shared via ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`;
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, 3000);
}

// Setup smooth scrolling for internal links
function setupSmoothScrolling() {
    // Smooth scroll to content when clicking breadcrumb
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    breadcrumbLinks.forEach(link => {
        if (link.getAttribute('href') === 'stories.html') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                // Add smooth transition effect
                document.body.style.opacity = '0.8';
                setTimeout(() => {
                    window.location.href = 'stories.html';
                }, 300);
            });
        }
    });
    
    // Add reading progress indicator
    createReadingProgress();
}

// Create reading progress indicator
function createReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #F1C400, #e6b800);
        z-index: 9999;
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

// Enhanced parallax effect for hero
function setupHeroParallax() {
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            heroImage.style.transform = `translateY(${parallax}px) scale(1.1)`;
        });
    }
}

// Initialize hero parallax
setupHeroParallax();

// Utility functions
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
    // Recalculate any position-dependent elements
    console.log('Window resized, recalculating positions');
}, 250));

// Export functions for external use
window.StoryDetails = {
    handleShare,
    showShareSuccess
};