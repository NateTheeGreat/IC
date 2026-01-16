// The Challenge Page - Award Counter Animations & Pitch Journey

document.addEventListener('DOMContentLoaded', () => {
    // setTimeout(initAwardCounters, 300); // Counter animation disabled
    initJourneyProgress();
    initJourneyCards();
});

function initAwardCounters() {
    const awardAmounts = document.querySelectorAll('.award-amount[data-target]');
    const awardAmountsInline = document.querySelectorAll('.award-amount-inline[data-target]');
    
    // Animate podium awards (1st, 2nd, 3rd)
    const awardCounters = [...awardAmounts, ...awardAmountsInline];
    
    if (awardCounters.length > 0) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateAwardCounter(entry.target);
                }
            });
        }, observerOptions);

        awardCounters.forEach(counter => observer.observe(counter));
    }
}

function animateAwardCounter(element) {
    const target = parseInt(element.dataset.target);
    if (isNaN(target) || target === 0) return;
    
    const numberElement = element.querySelector('.amount-number') || element.querySelector('.counter');
    if (!numberElement) return;
    
    const duration = 2000;
    let start = null;
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        
        const current = Math.floor(target * progress);
        numberElement.textContent = formatNumber(current);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            numberElement.textContent = formatNumber(target);
        }
    }
    
    requestAnimationFrame(animate);
}

function formatNumber(num) {
    return num.toLocaleString('en-US');
}

// Pitch Journey Interactive Progress
function initJourneyProgress() {
    const progressFill = document.getElementById('journeyProgress');
    const journeyCards = document.querySelectorAll('.journey-card');
    const stageDots = document.querySelectorAll('.stage-dot');
    
    if (!progressFill || journeyCards.length === 0) return;
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stage = parseInt(entry.target.dataset.stage);
                updateProgress(stage);
            }
        });
    }, observerOptions);
    
    journeyCards.forEach(card => observer.observe(card));
    
    function updateProgress(stage) {
        const percentage = (stage / 5) * 100;
        progressFill.style.width = percentage + '%';
        
        // Update stage dots
        stageDots.forEach((dot, index) => {
            const dotStage = index + 1;
            dot.classList.remove('active', 'completed');
            
            if (dotStage < stage) {
                dot.classList.add('completed');
            } else if (dotStage === stage) {
                dot.classList.add('active');
            }
        });
    }
}

// Journey Cards Stagger Animation
function initJourneyCards() {
    const journeyCards = document.querySelectorAll('.journey-card');
    
    if (journeyCards.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const delay = parseInt(entry.target.dataset.stage) * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    requestAnimationFrame(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    });
                    
                    entry.target.classList.add('animated');
                }, delay);
            }
        });
    }, observerOptions);
    
    journeyCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

