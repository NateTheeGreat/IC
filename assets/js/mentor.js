// Mentor Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Form submission handling
    const mentorForm = document.getElementById('mentorInterestForm');
    if (mentorForm) {
        mentorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(mentorForm);
            const data = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                if (key === 'availability') {
                    if (!data[key]) {
                        data[key] = [];
                    }
                    data[key].push(value);
                } else {
                    data[key] = value;
                }
            }
            
            // Validate required fields
            if (!data.firstName || !data.lastName || !data.email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitButton = mentorForm.querySelector('.submit-button');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<span>Submitting...</span>';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success message
                alert('Thank you for your interest in mentoring! We will contact you soon.');
                
                // Reset form
                mentorForm.reset();
                
                // Reset button
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 1500);
            
            // In a real implementation, you would send data to a server:
            /*
            fetch('/api/mentor-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                alert('Thank you for your interest in mentoring! We will contact you soon.');
                mentorForm.reset();
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            })
            .catch(error => {
                alert('An error occurred. Please try again later.');
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
            */
        });
    }

    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateNumbers(entry.target);
            }
        });
    }, observerOptions);

    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        statsObserver.observe(item);
    });

    // Animate numbers counting up
    function animateNumbers(element) {
        const numberElement = element.querySelector('.stat-number');
        if (!numberElement) return;

        const targetText = numberElement.textContent;
        const hasPlus = targetText.includes('+');
        const hasDollar = targetText.includes('$');
        const hasK = targetText.includes('K');
        
        // Extract numeric value
        let targetValue = parseInt(targetText.replace(/[^0-9]/g, ''));
        
        let currentValue = 0;
        const increment = targetValue / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }

            let displayValue = Math.floor(currentValue);
            let displayText = displayValue.toString();

            if (hasDollar) displayText = '$' + displayText;
            if (hasK) displayText += 'K';
            if (hasPlus) displayText += '+';
            
            // Handle special cases like "9th"
            if (targetText.includes('th')) {
                displayText = displayValue + 'th';
            }

            numberElement.textContent = displayText;
        }, stepTime);
    }

    // Card hover effects
    const mentorCards = document.querySelectorAll('.mentor-card');
    mentorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Highlight box animation
    const highlightBoxes = document.querySelectorAll('.highlight-box');
    const boxObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.8s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, 100);
            }
        });
    }, observerOptions);

    highlightBoxes.forEach(box => {
        boxObserver.observe(box);
    });

    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
        }
    });

    // Checkbox interaction enhancement
    const checkboxLabels = document.querySelectorAll('.checkbox-label');
    checkboxLabels.forEach(label => {
        const checkbox = label.querySelector('input[type="checkbox"]');
        
        label.addEventListener('click', function(e) {
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
            }
        });
    });
});
