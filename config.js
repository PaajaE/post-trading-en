// Configuration for dual-language repository setup
// This file manages language-specific settings for Czech and English versions

const CONFIG = {
    // Language detection and settings
    language: detectLanguage(),
    
    // Czech configuration
    cs: {
        lang: 'cs',
        title: 'Účtování aktivního tradingu - Profesionální účetní služby pro kapitálové trhy',
        description: 'Specializované účetní služby pro aktivní trading na kapitálových trzích. Účtování transakcí, reporting a konzultace pro investory a obchodníky s cennými papíry.',
        gaTrackingId: 'G-LLNL3TVW1L',
        cookieConsent: {
            title: '🍪 Soubory cookies',
            description: 'Používáme soubory cookies k analýze návštěvnosti webu a zlepšení uživatelské zkušenosti. Můžete si vybrat, které cookies chcete povolit.',
            necessary: 'Nezbytné cookies (vždy aktivní)',
            analytics: 'Analytické cookies (Google Analytics)',
            acceptAll: 'Přijmout vše',
            acceptSelected: 'Přijmout vybrané',
            reject: 'Odmítnout'
        },
        navigation: {
            services: 'Služby',
            targetAudience: 'Cílová skupina',
            references: 'Reference',
            contact: 'Kontakt',
            languageSwitch: 'EN'
        },
        form: {
            name: 'Vaše jméno',
            email: 'Váš email',
            company: 'Název společnosti',
            service: 'Vyberte službu',
            message: 'Vaše zpráva',
            submit: 'Odeslat zprávu',
            submitting: 'Odesílám...',
            success: 'Děkujeme za vaši zprávu! Budeme vás kontaktovat co nejdříve.',
            error: 'Omlouváme se, při odesílání zprávy došlo k chybě. Zkuste to prosím znovu.',
            validation: {
                required: 'Prosím vyplňte všechna povinná pole.',
                email: 'Prosím zadejte platný email.',
                recaptcha: 'Prosím dokončete reCAPTCHA ověření.'
            }
        },
        services: {
            accounting: 'Účtování transakcí',
            reporting: 'Reporting a výkaznictví',
            tax: 'Daňové služby',
            consulting: 'Konzultace',
            other: 'Jiné'
        },
        cta: {
            consultation: 'Konzultace zdarma',
            scheduleConsultation: 'Domluvit konzultaci',
            needHelp: 'Potřebujete pomoc s účtováním tradingu?',
            moreDetails: 'Více detailů mohu poskytnout na osobním setkání. Rád se s Vámi sejdu a proberu možnosti spolupráce.'
        }
    },
    
    // English configuration
    en: {
        lang: 'en',
        title: 'Active Trading Accounting - Professional Accounting Services for Capital Markets',
        description: 'Specialized accounting services for active trading on capital markets. Transaction accounting, reporting and consulting for investors and securities traders.',
        gaTrackingId: 'G-S53VQ14VEK',
        cookieConsent: {
            title: '🍪 Cookies',
            description: 'We use cookies to analyze website traffic and improve user experience. You can choose which cookies to allow.',
            necessary: 'Necessary cookies (always active)',
            analytics: 'Analytics cookies (Google Analytics)',
            acceptAll: 'Accept All',
            acceptSelected: 'Accept Selected',
            reject: 'Reject'
        },
        navigation: {
            services: 'Services',
            targetAudience: 'Target Audience',
            references: 'References',
            contact: 'Contact',
            languageSwitch: 'CS'
        },
        form: {
            name: 'Your name',
            email: 'Your email',
            company: 'Company name',
            service: 'Select service',
            message: 'Your message',
            submit: 'Send Message',
            submitting: 'Sending...',
            success: 'Thank you for your message! We will contact you as soon as possible.',
            error: 'Sorry, there was an error sending the message. Please try again.',
            validation: {
                required: 'Please fill in all required fields.',
                email: 'Please enter a valid email.',
                recaptcha: 'Please complete the reCAPTCHA verification.'
            }
        },
        services: {
            accounting: 'Transaction Accounting',
            reporting: 'Reporting and Statements',
            tax: 'Tax Services',
            consulting: 'Consulting',
            other: 'Other'
        },
        cta: {
            consultation: 'Free Consultation',
            scheduleConsultation: 'Schedule Consultation',
            needHelp: 'Need help with trading accounting?',
            moreDetails: 'I can provide more details at a personal meeting. I would be happy to meet with you and discuss cooperation possibilities.'
        }
    }
};

// Language detection function
function detectLanguage() {
    // Check URL path
    if (window.location.pathname.includes('/en/')) {
        return 'en';
    }
    
    // Check HTML lang attribute
    const htmlLang = document.documentElement.lang;
    if (htmlLang === 'en') {
        return 'en';
    }
    
    // Check browser language preference
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('en')) {
        return 'en';
    }
    
    // Default to Czech
    return 'cs';
}

// Get current language configuration
function getCurrentConfig() {
    return CONFIG[CONFIG.language];
}

// Get configuration for specific language
function getConfigForLanguage(lang) {
    return CONFIG[lang];
}

// Check if current page is English version
function isEnglishVersion() {
    return CONFIG.language === 'en';
}

// Check if current page is Czech version
function isCzechVersion() {
    return CONFIG.language === 'cs';
}

// Get language-specific URL
function getLanguageUrl(lang) {
    if (lang === 'en') {
        return isEnglishVersion() ? window.location.href : 'https://post-trading.com';
    } else {
        return isCzechVersion() ? window.location.href : 'https://uctujtrading.cz';
    }
}

// Export for use in other scripts
window.CONFIG = CONFIG;
window.getCurrentConfig = getCurrentConfig;
window.getConfigForLanguage = getConfigForLanguage;
window.isEnglishVersion = isEnglishVersion;
window.isCzechVersion = isCzechVersion;
window.getLanguageUrl = getLanguageUrl;
