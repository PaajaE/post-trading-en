# Post Trading - Dual Language Website

This project consists of two separate GitHub repositories for hosting Czech and English versions of the website on GitHub Pages with custom domains.

## Repository Structure

- **Czech Repository**: `post-trading` (main repository)
- **English Repository**: `post-trading-en` (English version)

## Features

- ✅ Dual language support (Czech/English)
- ✅ Separate Google Analytics tracking IDs
- ✅ GDPR-compliant cookie consent
- ✅ Responsive design
- ✅ Contact form with EmailJS integration
- ✅ Automated deployment with GitHub Actions

## Configuration System

The website uses a centralized configuration system (`config.js`) that automatically detects the language and applies appropriate settings:

- Language detection based on URL path and HTML lang attribute
- Separate GA tracking IDs for each language
- Localized cookie consent messages
- Language-specific form validation messages
- Dynamic navigation and CTA button text

## Setup Instructions

### 1. Initial Setup

1. Clone both repositories:
   ```bash
   git clone https://github.com/PaajaE/post-trading.git
   git clone https://github.com/PaajaE/post-trading-en.git
   ```

2. Set up the English repository:
   ```bash
   cd post-trading-en
   # Copy files from Czech repo (see sync instructions below)
   ```

### 2. Synchronization

Use the provided sync script to keep repositories in sync:

```bash
# Make script executable
chmod +x sync-repos.sh

# Sync common files
./sync-repos.sh sync-common

# Update English version with Czech changes
./sync-repos.sh update-en

# Full synchronization
./sync-repos.sh full-sync

# Create backups
./sync-repos.sh backup
```

### 3. GitHub Pages Setup

#### Czech Repository (post-trading)
1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Custom domain: `uctujtrading.cz`

#### English Repository (post-trading-en)
1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Custom domain: `post-trading.com`

### 4. Custom Domain Configuration

Create a `CNAME` file in each repository root with your domain:

**Czech repo CNAME:**
```
www.uctujtrading.cz
```

**English repo CNAME:**
```
www.post-trading.com
```

## File Structure

```
post-trading/                    # Czech repository
├── index.html                  # Czech homepage
├── en/
│   └── index.html             # English homepage (for reference)
├── assets/                     # Shared assets
├── styles.css                  # Shared styles
├── script.js                   # Shared JavaScript
├── cookie-consent.js           # Cookie consent with i18n
├── config.js                  # Language configuration
├── sync-repos.sh              # Synchronization script
├── .github/workflows/
│   └── deploy.yml             # GitHub Actions
└── CNAME                      # Custom domain

post-trading-en/               # English repository
├── index.html                 # English homepage
├── assets/                    # Shared assets (synced)
├── styles.css                 # Shared styles (synced)
├── script.js                  # Shared JavaScript (synced)
├── cookie-consent.js          # Cookie consent (synced)
├── config.js                 # Language configuration (synced)
└── CNAME                     # Custom domain
```

## Google Analytics Configuration

Each language version uses a separate GA tracking ID:

- **Czech**: `G-LLNL3TVW1L`
- **English**: `G-S53VQ14VEK`

The configuration system automatically applies the correct tracking ID based on the detected language.

## Cookie Consent

The cookie consent system supports multiple languages and automatically displays the appropriate text based on the current language configuration.

## Development Workflow

### Making Changes

1. **Common files** (styles, scripts, assets):
   - Edit in the Czech repository
   - Run `./sync-repos.sh sync-common` to sync to English repo

2. **Content changes**:
   - Edit Czech content in `index.html`
   - Edit English content in `en/index.html`
   - Run `./sync-repos.sh update-en` to update English repo

3. **New features**:
   - Develop in Czech repository
   - Test both languages
   - Sync changes to English repository

### Deployment

Both repositories are automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Language Switching

The language switching is handled through external links:

- **From Czech to English**: Links to `https://paajae.github.io/post-trading-en/`
- **From English to Czech**: Links to `https://paajae.github.io/post-trading/`

## Troubleshooting

### Common Issues

1. **Assets not loading in English version**:
   - Run `./sync-repos.sh sync-common` to sync assets
   - Check asset paths in English `index.html`

2. **Language detection not working**:
   - Ensure `config.js` is loaded before other scripts
   - Check HTML `lang` attribute

3. **Cookie consent not showing**:
   - Verify `cookie-consent.js` is loaded
   - Check console for JavaScript errors

### Validation

Use the validation command to check repository structure:

```bash
./sync-repos.sh validate
```

## Contributing

1. Make changes in the Czech repository
2. Test both language versions
3. Sync changes to English repository
4. Commit and push to both repositories

## License

This project is proprietary software. All rights reserved.
