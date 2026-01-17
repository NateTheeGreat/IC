// Main JavaScript for Regis Innovation Center

// ====== Performance: Debounce Function ======
function debounce(func, wait = 10) {
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

// ====== Performance: Throttle Function ======
function throttle(func, limit = 10) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ====== Dropdown Menu Accessibility & Mobile Support ======
function initDropdownMenu() {
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const menu = item.querySelector('.dropdown-menu');
        
        if (!link || !menu) return;
        
        // Handle keyboard navigation
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.classList.toggle('dropdown-open');
            }
            if (e.key === 'Escape') {
                item.classList.remove('dropdown-open');
            }
        });
        
        // Handle click for mobile/touch devices
        if ('ontouchstart' in window) {
            link.addEventListener('click', (e) => {
                if (!item.classList.contains('dropdown-open')) {
                    e.preventDefault();
                    // Close other dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('dropdown-open');
                        }
                    });
                    item.classList.add('dropdown-open');
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!item.contains(e.target)) {
                    item.classList.remove('dropdown-open');
                }
            });
        }
    });
}

// ====== Video Autoplay on Scroll ======
function initVideoAutoplay() {
    const video = document.getElementById('about-video');
    const aboutSection = document.getElementById('about');
    
    if (!video || !aboutSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start playing the video when section comes into view
                video.play().catch(err => {
                    console.log('Autoplay prevented:', err);
                });
            } else {
                // Pause the video when section goes out of view
                video.pause();
            }
        });
    }, {
        threshold: 0.5 // Video starts playing when 50% of section is visible
    });
    
    observer.observe(aboutSection);
}

// ====== Beautiful Metrics Count-Up Animation ======
function initMetricsCountUp() {
    const metricsContainer = document.querySelector('.impact-metrics');
    
    if (!metricsContainer) return;
    
    const metrics = metricsContainer.querySelectorAll('.metric-number');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                
                // Start animations with delays
                metrics.forEach((metric, index) => {
                    setTimeout(() => {
                        animateMetricCounter(metric);
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.6,
        rootMargin: '0px 0px -20px 0px'
    });
    
    observer.observe(metricsContainer);
}

function animateMetricCounter(element) {
    const targetText = element.getAttribute('data-target') || element.textContent;
    const hasPlus = targetText.includes('+');
    const hasDollar = targetText.includes('$');
    const hasK = targetText.includes('K');
    
    // Extract the number
    let targetNumber = parseInt(targetText.replace(/[^\d]/g, ''));
    
    // Handle special cases
    if (targetText.includes('275K')) {
        targetNumber = 275;
    }
    
    let currentNumber = 0;
    const duration = 2500; // 2.5 seconds for smooth animation
    const steps = 100;
    const increment = targetNumber / steps;
    const stepDuration = duration / steps;
    
    // Add animation class for visual effects
    element.classList.add('counting');
    
    const timer = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
            element.classList.remove('counting');
            element.classList.add('count-complete');
            
            // Add a subtle bounce effect when complete
            setTimeout(() => {
                element.classList.add('bounce-effect');
                setTimeout(() => {
                    element.classList.remove('bounce-effect');
                }, 600);
            }, 100);
        }
        
        // Format the display number
        let displayNumber = Math.floor(currentNumber);
        let displayText = '';
        
        if (hasDollar) {
            displayText = '$' + displayNumber;
            if (hasK) {
                displayText += 'K';
            }
        } else {
            displayText = displayNumber.toString();
            if (hasPlus && currentNumber >= targetNumber) {
                displayText += '+';
            }
        }
        
        element.textContent = displayText;
        
        // Add subtle scale effect during counting
        const progress = currentNumber / targetNumber;
        const scale = 1 + (Math.sin(progress * Math.PI * 4) * 0.05);
        element.style.transform = `scale(${scale})`;
        
    }, stepDuration);
    
    // Reset transform after animation
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, duration + 500);
}

// ====== Winners Section Animations ======
function initWinnersAnimations() {
    const winnerCards = document.querySelectorAll('.winner-card');
    
    if (winnerCards.length === 0) return;
    
    const animatedCards = new Set();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedCards.has(entry.target)) {
                animatedCards.add(entry.target);
                animateWinnerCard(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    winnerCards.forEach((card, index) => {
        // Reset initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.95)';
        
        // Add staggered delay data
        card.dataset.delay = index * 150;
        
        observer.observe(card);
    });
}

function animateWinnerCard(card) {
    const delay = parseInt(card.dataset.delay) || 0;
    
    setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
        
        // Add subtle bounce effect
        setTimeout(() => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
            }, 200);
        }, 400);
        
        // Animate internal elements
        const elements = card.querySelectorAll('.business-name, .business-description, .winner-meta, .explore-more-btn');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    }, delay);
}

// ====== Premium Header Functions ======e

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPremiumHeader();
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initMobileMenu();
    initScrollAnimations();
    loadEvents();
    initModals();
    initElegantShowcase(); // Add elegant showcase initialization
    initVideoAutoplay(); // Add video autoplay initialization
    initMetricsCountUp(); // Add beautiful metrics count-up animation
    initWinnersAnimations(); // Add winners section animations
    initEventsCarousel(); // Add events carousel navigation
    initDropdownMenu(); // Add dropdown menu functionality
});

// ====== Elegant Image Showcase ======
function initElegantShowcase() {
    const images = document.querySelectorAll('.showcase-image');
    const prevBtn = document.querySelector('.showcase-arrow-prev');
    const nextBtn = document.querySelector('.showcase-arrow-next');
    let currentIndex = 0;
    const transitionDuration = 7000; // 7 seconds between transitions
    let autoRotateInterval;
    
    if (images.length === 0) return;
    
    function showImage(index) {
        // Remove active class from all images
        images.forEach(img => {
            img.classList.remove('active', 'fade-out', 'fade-in');
        });
        
        // Show the selected image
        const targetImage = images[index];
        targetImage.classList.add('fade-in', 'active');
        
        // Clean up transition classes after animation completes
        setTimeout(() => {
            targetImage.classList.remove('fade-in');
        }, 1500);
    }
    
    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }
    
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }
    
    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(showNextImage, transitionDuration);
    }
    
    // Navigation button event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showNextImage();
            resetAutoRotate();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showPrevImage();
            resetAutoRotate();
        });
    }
    
    // Start the image rotation after initial page load
    setTimeout(() => {
        autoRotateInterval = setInterval(showNextImage, transitionDuration);
    }, 2000); // Wait 2 seconds before starting rotation for better UX
}

// ====== Video Autoplay on Scroll ======
function initVideoAutoplay() {
    const video = document.getElementById('youtube-video');
    const aboutSection = document.getElementById('about');
    
    if (!video || !aboutSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start playing the video when section comes into view
                video.src = video.src.replace('autoplay=0', 'autoplay=1');
            } else {
                // Pause the video when section goes out of view
                video.src = video.src.replace('autoplay=1', 'autoplay=0');
            }
        });
    }, {
        threshold: 0.5 // Video starts playing when 50% of section is visible
    });
    
    observer.observe(aboutSection);
}

// ====== Premium Header Functions ======
function initPremiumHeader() {
    const header = document.querySelector('.premium-header');
    const mainNav = document.querySelector('.main-navigation');
    const announcementStrip = document.querySelector('.announcement-strip');
    const dismissBtn = document.querySelector('.announcement-dismiss');
    const hamburgerToggle = document.querySelector('.hamburger-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navHighlight = document.querySelector('.nav-highlight');
    const navMenu = document.querySelector('.nav-menu');
    
    // Handle announcement strip dismissal
    if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
            announcementStrip.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                announcementStrip.style.display = 'none';
                document.body.style.paddingTop = '88px';
            }, 300);
        });
    }
    
    // Handle scroll effects
    let scrolled = false;
    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 50;
        
        if (isScrolled && !scrolled) {
            mainNav.classList.add('scrolled');
            scrolled = true;
        } else if (!isScrolled && scrolled) {
            mainNav.classList.remove('scrolled');
            scrolled = false;
        }
    });
    
    // Handle hamburger menu toggle
    if (hamburgerToggle) {
        hamburgerToggle.addEventListener('click', () => {
            const isExpanded = hamburgerToggle.getAttribute('aria-expanded') === 'true';
            
            hamburgerToggle.setAttribute('aria-expanded', !isExpanded);
            
            if (mobileMenu) {
                if (isExpanded) {
                    mobileMenu.classList.remove('active');
                } else {
                    mobileMenu.classList.add('active');
                }
            }
        });
    }
    
    // Handle nav link highlighting
    if (navMenu && navHighlight) {
        const navItems = navMenu.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            
            if (link) {
                link.addEventListener('mouseenter', () => {
                    const itemRect = item.getBoundingClientRect();
                    const menuRect = navMenu.getBoundingClientRect();
                    const left = itemRect.left - menuRect.left;
                    const width = itemRect.width;
                    
                    navHighlight.style.left = left + 'px';
                    navHighlight.style.width = width + 'px';
                });
            }
        });
        
        navMenu.addEventListener('mouseleave', () => {
            navHighlight.style.width = '0';
        });
    }
    
    // Handle search input interactions
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    // Handle search functionality here
                    console.log('Search query:', query);
                }
            }
        });
    }
    
    // Add smooth transitions to brand hover
    const brandLink = document.querySelector('.brand-link');
    if (brandLink) {
        brandLink.addEventListener('mouseenter', () => {
            const logoGlow = brandLink.querySelector('.logo-glow');
            if (logoGlow) {
                logoGlow.style.opacity = '0.6';
            }
        });
        
        brandLink.addEventListener('mouseleave', () => {
            const logoGlow = brandLink.querySelector('.logo-glow');
            if (logoGlow) {
                logoGlow.style.opacity = '0';
            }
        });
    }
}

// ====== Navigation Functions ======
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Handle nav link clicks for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.premium-header').offsetHeight;
                    const offsetTop = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileToggle = document.querySelector('.mobile-toggle');
                    const mobileMenu = document.querySelector('.mobile-menu');
                    
                    if (mobileToggle && mobileToggle.classList.contains('active')) {
                        mobileToggle.classList.remove('active');
                        mobileMenu.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Update active nav links on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                const navItem = link.closest('.nav-item');
                if (navItem) {
                    navItem.classList.remove('active');
                }
                
                if (link.getAttribute('href') === `#${sectionId}`) {
                    const navItem = link.closest('.nav-item');
                    if (navItem) {
                        navItem.classList.add('active');
                    }
                }
            });
        }
    });
}

// ====== Sophisticated Header ======
function initSophisticatedHeader(){
    const header = document.querySelector('.main-header');
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.getElementById('mobileNav');
    const activeIndicator = document.querySelector('.active-indicator');
    const navLinks = document.querySelectorAll('.primary-nav .nav-link');
    const announcementClose = document.querySelector('.annc-close');
    const announcementBar = document.querySelector('.top-announcement');
    const hero = document.querySelector('.hero');

    // Compute header offset for hero spacing
    if(hero && header){
        const recalcOffset = ()=>{
            const annH = announcementBar? announcementBar.offsetHeight : 0;
            const headH = header.offsetHeight;
            const total = annH + headH;
            hero.style.marginTop = total + 'px';
        };
        window.addEventListener('resize', debounce(recalcOffset,100));
        setTimeout(recalcOffset,50);
    }

    // Replace old navbar logic if present
    if(header){
        window.addEventListener('scroll', debounce(()=>{
            if(window.scrollY>30){
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
            updateActiveIndicator();
        },50));
    }

    // Mobile toggle
    if(toggle && mobileNav){
        toggle.addEventListener('click',()=>{
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            toggle.classList.toggle('is-active');
            if(expanded){
                mobileNav.hidden = true;
            } else {
                mobileNav.hidden = false;
            }
        });
    }

    // Enhanced active indicator logic for sophisticated layout
    function updateActiveIndicator(){
        if(!activeIndicator) return;
        let currentLink = null;
        // Determine section in view by matching href hash
        const sections = [...document.querySelectorAll('section[id]')];
        const scrollPos = window.scrollY + 160; // adjusted offset for new header
        for(const sec of sections){
            if(scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight){
                currentLink = document.querySelector('.primary-nav .nav-link[href="#'+sec.id+'"]');
                break;
            }
        }
        if(!currentLink){
            currentLink = document.querySelector('.primary-nav .nav-link[data-nav="about"]');
        }
        if(currentLink){
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            currentLink.classList.add('active');
            
            // Position indicator under active link (centered)
            const rect = currentLink.getBoundingClientRect();
            const parentRect = currentLink.closest('.primary-nav').getBoundingClientRect();
            const centerOffset = (rect.left - parentRect.left) + (rect.width / 2) - 20; // center under link
            activeIndicator.style.transform = `translateX(${centerOffset}px)`;
            activeIndicator.style.width = '40px';
        }
    }
    window.addEventListener('resize', debounce(updateActiveIndicator, 150));
    setTimeout(updateActiveIndicator, 400);

    // Enhanced hover preview movement
    navLinks.forEach(link=>{
        link.addEventListener('mouseenter',()=>{
            if(activeIndicator){
                const rect = link.getBoundingClientRect();
                const parentRect = link.closest('.primary-nav').getBoundingClientRect();
                const centerOffset = (rect.left - parentRect.left) + (rect.width / 2) - 20;
                activeIndicator.style.transform = `translateX(${centerOffset}px)`;
                activeIndicator.style.width = '40px';
            }
        });
    });
    const nav = document.querySelector('.primary-nav');
    if(nav){
        nav.addEventListener('mouseleave',()=>{
            updateActiveIndicator();
        });
    }

    // Announcement dismiss
    if(announcementClose && announcementBar){
        announcementClose.addEventListener('click',()=>{
            announcementBar.style.height = announcementBar.offsetHeight+'px';
            requestAnimationFrame(()=>{
                announcementBar.style.transition='height .5s, opacity .4s';
                announcementBar.style.opacity='0';
                announcementBar.style.height='0';
                setTimeout(()=> announcementBar.remove(),600);
            });
        });
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ====== Mobile Menu ======
function initMobileMenu() {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            toggleButton.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                toggleButton.classList.remove('active');
            });
        });
    }
}

// ====== Smooth Scrolling ======
function initSmoothScrolling() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 122;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====== Contact Form ======
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                const response = await fetch('api/contact.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showAlert('Message sent successfully! We\'ll get back to you soon.', 'success');
                    form.reset();
                } else {
                    showAlert('Failed to send message. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert('An error occurred. Please try again later.', 'error');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
}

// ====== Alert System ======
function showAlert(message, type = 'info') {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type}`;
    alertContainer.textContent = message;
    
    // Insert at the top of the page
    document.body.insertBefore(alertContainer, document.body.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertContainer.parentNode) {
            alertContainer.parentNode.removeChild(alertContainer);
        }
    }, 5000);
    
    // Allow manual removal
    alertContainer.addEventListener('click', () => {
        if (alertContainer.parentNode) {
            alertContainer.parentNode.removeChild(alertContainer);
        }
    });
}

// ====== Scroll Animations ======
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate stats counters
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.program-card, .resource-item, .stat-number, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ====== Counter Animation ======
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
            element.textContent = element.textContent.replace(/\d+/, target);
            clearInterval(timer);
        } else {
            element.textContent = element.textContent.replace(/\d+/, Math.floor(current));
        }
    }, duration / steps);
}

// ====== Events Loading ======
async function loadEvents() {
    const eventsContainer = document.getElementById('events-container');
    
    if (eventsContainer) {
        try {
            // Show loading spinner
            eventsContainer.innerHTML = '<div class="spinner"></div>';
            
            const response = await fetch('api/events.php');
            const events = await response.json();
            
            if (events && events.length > 0) {
                eventsContainer.innerHTML = events.slice(0, 3).map(event => `
                    <div class="event-card">
                        <div class="event-date">
                            <span class="day">${new Date(event.date).getDate()}</span>
                            <span class="month">${new Date(event.date).toLocaleDateString('en', {month: 'short'})}</span>
                        </div>
                        <div class="event-info">
                            <h3>${event.title}</h3>
                            <p>${event.description}</p>
                            <small>📍 ${event.location} • 🕐 ${event.time}</small>
                        </div>
                        <a href="events.php?id=${event.id}" class="event-link">Learn More</a>
                    </div>
                `).join('');
            } else {
                eventsContainer.innerHTML = '<p class="text-center">No upcoming events at this time.</p>';
            }
        } catch (error) {
            console.error('Error loading events:', error);
            eventsContainer.innerHTML = '<p class="text-center">Unable to load events at this time.</p>';
        }
    }
}

// ====== Modal System ======
function initModals() {
    // Close modal when clicking outside or on close button
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
            closeModal(e.target.closest('.modal'));
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ====== Utility Functions ======

// Debounce function for performance optimization
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

// Format date helper
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add loading state to buttons
function setButtonLoading(button, isLoading = true) {
    if (isLoading) {
        button.dataset.originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;
    } else {
        button.textContent = button.dataset.originalText || button.textContent;
        button.disabled = false;
    }
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ====== Events Carousel Navigation ======
function initEventsCarousel() {
    const carousel = document.getElementById('eventsCarousel');
    const leftArrow = document.getElementById('eventsArrowLeft');
    const rightArrow = document.getElementById('eventsArrowRight');
    
    if (!carousel || !leftArrow || !rightArrow) return;
    
    const cards = carousel.querySelectorAll('.harvard-event-card');
    if (cards.length === 0) return;
    
    // Scroll to the 7th event (index 6 - Team Meet & Greet, the first current event)
    const scrollToIndex = 6;
    const cardWidth = cards[0].offsetWidth;
    const gap = 40;
    const scrollAmount = (cardWidth + gap) * scrollToIndex;
    
    // Set initial scroll position after a short delay to ensure layout is complete
    setTimeout(() => {
        carousel.scrollLeft = scrollAmount;
        updateArrowStates();
    }, 100);
    
    // Function to scroll the carousel by 3 cards (or 1 card on mobile)
    function scrollCarousel(direction) {
        const cardWidth = cards[0].offsetWidth;
        const gap = window.innerWidth <= 768 ? 35 : 40; // matches CSS gap
        const cardsToScroll = window.innerWidth <= 768 ? 1 : 3; // Scroll 1 card on mobile, 3 on desktop
        const scrollAmount = (cardWidth + gap) * cardsToScroll;
        const currentScroll = carousel.scrollLeft;
        
        if (direction === 'left') {
            carousel.scrollLeft = currentScroll - scrollAmount;
        } else {
            carousel.scrollLeft = currentScroll + scrollAmount;
        }
    }
    
    // Function to update arrow states
    function updateArrowStates() {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        // Disable left arrow if at start
        if (carousel.scrollLeft <= 0) {
            leftArrow.disabled = true;
        } else {
            leftArrow.disabled = false;
        }
        
        // Disable right arrow if at end
        if (carousel.scrollLeft >= maxScroll - 1) {
            rightArrow.disabled = true;
        } else {
            rightArrow.disabled = false;
        }
    }
    
    // Touch support for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartTime = Date.now();
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeTime = Date.now() - touchStartTime;
        const swipeDistance = touchEndX - touchStartX;
        
        // Only trigger swipe if it was fast enough (under 300ms) or long enough (over threshold)
        if (swipeTime < 300 || Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > swipeThreshold) {
                scrollCarousel('left');
            } else if (swipeDistance < -swipeThreshold) {
                scrollCarousel('right');
            }
        }
    }
    
    // Event listeners
    leftArrow.addEventListener('click', () => scrollCarousel('left'));
    rightArrow.addEventListener('click', () => scrollCarousel('right'));
    carousel.addEventListener('scroll', updateArrowStates);
    
    // Update arrow states on window resize
    window.addEventListener('resize', () => {
        updateArrowStates();
    });
    
    // Initial state
    updateArrowStates();
}

// Export functions for external use
window.RegisIC = {
    openModal,
    closeModal,
    showAlert,
    setButtonLoading,
    isValidEmail,
    formatDate
};