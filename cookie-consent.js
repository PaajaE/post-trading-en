// Cookie Consent Management
// GDPR-compliant cookie consent implementation with multi-language support

class CookieConsent {
    constructor() {
        this.consentKey = 'cookieConsent';
        this.consentVersion = '1.0';
        this.banner = document.getElementById('cookieConsent');
        this.acceptAllBtn = document.getElementById('acceptAllCookies');
        this.acceptSelectedBtn = document.getElementById('acceptSelectedCookies');
        this.rejectBtn = document.getElementById('rejectCookies');
        this.analyticsCheckbox = document.getElementById('marketingCookies');
        
        // Get current language configuration
        this.config = window.getCurrentConfig ? window.getCurrentConfig() : null;
        
        this.init();
    }

    init() {
        // Update banner text based on current language
        this.updateBannerText();
        
        // Check if consent has already been given
        if (!this.hasConsent()) {
            this.showBanner();
        } else {
            this.applyConsent();
        }

        // Add event listeners
        this.addEventListeners();
    }

    updateBannerText() {
        if (!this.config || !this.banner) return;
        
        const cookieConsent = this.config.cookieConsent;
        
        // Update title
        const titleElement = this.banner.querySelector('h4');
        if (titleElement) {
            titleElement.textContent = cookieConsent.title;
        }
        
        // Update description
        const descElement = this.banner.querySelector('p');
        if (descElement) {
            descElement.textContent = cookieConsent.description;
        }
        
        // Update checkbox labels
        const necessaryLabel = this.banner.querySelector('label:first-of-type span');
        if (necessaryLabel) {
            necessaryLabel.textContent = cookieConsent.necessary;
        }
        
        const analyticsLabel = this.banner.querySelector('label:last-of-type span');
        if (analyticsLabel) {
            analyticsLabel.textContent = cookieConsent.analytics;
        }
        
        // Update button texts
        if (this.acceptAllBtn) {
            this.acceptAllBtn.textContent = cookieConsent.acceptAll;
        }
        
        if (this.acceptSelectedBtn) {
            this.acceptSelectedBtn.textContent = cookieConsent.acceptSelected;
        }
        
        if (this.rejectBtn) {
            this.rejectBtn.textContent = cookieConsent.reject;
        }
    }

    hasConsent() {
        const consent = localStorage.getItem(this.consentKey);
        if (!consent) return false;
        
        try {
            const consentData = JSON.parse(consent);
            return consentData.version === this.consentVersion;
        } catch (e) {
            return false;
        }
    }

    showBanner() {
        if (this.banner) {
            this.banner.style.display = 'block';
            // Add body class to prevent scrolling
            document.body.classList.add('cookie-banner-open');
        }
    }

    hideBanner() {
        if (this.banner) {
            this.banner.style.display = 'none';
            document.body.classList.remove('cookie-banner-open');
        }
    }

    addEventListeners() {
        if (this.acceptAllBtn) {
            this.acceptAllBtn.addEventListener('click', () => {
                this.acceptAll();
            });
        }

        if (this.acceptSelectedBtn) {
            this.acceptSelectedBtn.addEventListener('click', () => {
                this.acceptSelected();
            });
        }

        if (this.rejectBtn) {
            this.rejectBtn.addEventListener('click', () => {
                this.rejectAll();
            });
        }
    }

    acceptAll() {
        const consent = {
            version: this.consentVersion,
            timestamp: new Date().toISOString(),
            necessary: true,
            analytics: true,
            marketing: false
        };

        this.saveConsent(consent);
        this.applyConsent();
        this.hideBanner();
    }

    acceptSelected() {
        const consent = {
            version: this.consentVersion,
            timestamp: new Date().toISOString(),
            necessary: true,
            analytics: this.analyticsCheckbox ? this.analyticsCheckbox.checked : false,
            marketing: false
        };

        this.saveConsent(consent);
        this.applyConsent();
        this.hideBanner();
    }

    rejectAll() {
        const consent = {
            version: this.consentVersion,
            timestamp: new Date().toISOString(),
            necessary: true,
            analytics: false,
            marketing: false
        };

        this.saveConsent(consent);
        this.applyConsent();
        this.hideBanner();
    }

    saveConsent(consent) {
        localStorage.setItem(this.consentKey, JSON.stringify(consent));
    }

    getConsent() {
        const consent = localStorage.getItem(this.consentKey);
        if (!consent) return null;
        
        try {
            return JSON.parse(consent);
        } catch (e) {
            return null;
        }
    }

    applyConsent() {
        const consent = this.getConsent();
        if (!consent) return;

        // Apply Google Analytics consent
        if (typeof gtag !== 'undefined') {
            if (consent.analytics) {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
                console.log('Google Analytics consent granted');
            } else {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
                console.log('Google Analytics consent denied');
            }
        }

        // Add consent status to body for CSS styling if needed
        document.body.setAttribute('data-cookie-consent', consent.analytics ? 'granted' : 'denied');
    }

    // Method to reset consent (useful for testing)
    resetConsent() {
        localStorage.removeItem(this.consentKey);
        location.reload();
    }

    // Method to check current consent status
    getConsentStatus() {
        const consent = this.getConsent();
        if (!consent) return 'no-consent';
        
        if (consent.analytics) return 'analytics-granted';
        return 'analytics-denied';
    }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cookieConsent = new CookieConsent();
});

// Add CSS for body scroll prevention when banner is open
const style = document.createElement('style');
style.textContent = `
    body.cookie-banner-open {
        padding-bottom: 200px; /* Space for banner */
    }
    
    @media (max-width: 768px) {
        body.cookie-banner-open {
            padding-bottom: 250px; /* More space on mobile */
        }
    }
`;
document.head.appendChild(style);

