// JavaScript for Post Trading Landing Page

document.addEventListener('DOMContentLoaded', function() {
    
    // Get current language configuration
    const config = window.getCurrentConfig ? window.getCurrentConfig() : null;
    
    // Check if EmailJS is available
    if (typeof window.emailjs === 'undefined') {
        console.error('EmailJS not loaded. Please check the CDN link.');
        return;
    }
    
    // Initialize EmailJS after DOM is loaded
    window.emailjs.init('Dsc380ZTi-XwJa8kT');
    
    // Smooth scrolling for navigation links
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling with EmailJS
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const company = formData.get('company');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !message) {
                const message = config && config.form && config.form.validation ? 
                    config.form.validation.required : 'Please fill in all required fields.';
                showNotification(message, 'error');
                return;
            }
            
            // reCAPTCHA validation
            // const recaptchaResponse = grecaptcha.getResponse();
            // if (!recaptchaResponse) {
            //     const message = config && config.form && config.form.validation ? 
            //         config.form.validation.recaptcha : 'Please complete the reCAPTCHA verification.';
            //     showNotification(message, 'error');
            //     return;
            // }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                const message = config && config.form && config.form.validation ? 
                    config.form.validation.email : 'Please enter a valid email.';
                showNotification(message, 'error');
                return;
            }
            
            // Update button state
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            const submittingText = config && config.form && config.form.submitting ? 
                config.form.submitting : 'Sending...';
            submitButton.textContent = submittingText;
            submitButton.disabled = true;
            
            // Prevent rapid submissions
            if (this.dataset.submitting === 'true') {
                return;
            }
            this.dataset.submitting = 'true';
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                company: company || 'Neuvedeno',
                service: service || 'Neuvedeno',
                message: message,
                to_name: 'JASPER Systems'
            };
            
            // Send email using EmailJS
            window.emailjs.send('service_9nsxp5c', 'template_7nmscfu', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    const successMessage = config && config.form && config.form.success ? 
                        config.form.success : 'Thank you for your message! We will contact you as soon as possible.';
                    showNotification(successMessage, 'success');
                    contactForm.reset();
                    // grecaptcha.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    const errorMessage = config && config.form && config.form.error ? 
                        config.form.error : 'Sorry, there was an error sending the message. Please try again.';
                    showNotification(errorMessage, 'error');
                })
                .finally(function() {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    contactForm.dataset.submitting = 'false';
                });
        });
    }

    // CTA button functionality
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Use #contact for both versions
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = contactSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.error('Contact section not found');
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .logo-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });

    // Image loading animation
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('show');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = mobileMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('show');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        document.body.appendChild(notification);
    }

    // Add CSS for notification animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);

    // Add some interactive hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Counter animation for statistics (if needed)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    // Observe lazy images
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));

    console.log('Post Trading landing page loaded successfully!');
});
