# Dual Repository Setup - Complete Guide

## Overview

Your website is now set up with a dual repository system that supports both Czech and English versions with separate GitHub Pages hosting and custom domains. Each version has its own Google Analytics tracking ID and language-specific content.

## What Has Been Implemented

### ✅ Configuration System (`config.js`)
- Automatic language detection based on URL path and HTML lang attribute
- Separate GA tracking IDs for each language
- Localized text for all UI elements
- Language-specific form validation messages

### ✅ Multi-language Cookie Consent (`cookie-consent.js`)
- Automatically displays appropriate language based on configuration
- GDPR-compliant implementation
- Separate consent tracking per language

### ✅ Updated JavaScript (`script.js`)
- Uses configuration system for all text content
- Language-aware form validation
- Dynamic CTA button behavior
- Localized success/error messages

### ✅ Repository Synchronization (`sync-repos.sh`)
- Keeps common files in sync between repositories
- Updates English version with Czech changes
- Creates backups before major changes
- Validates repository structure

### ✅ GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Automated deployment to GitHub Pages
- Triggers on push to main branch

### ✅ English Repository Setup (`setup-english-repo.sh`)
- Initializes English repository with all necessary files
- Updates asset paths for standalone deployment
- Creates proper directory structure

## Repository Structure

```
post-trading/                    # Czech repository (main)
├── index.html                  # Czech homepage
├── en/index.html              # English homepage (reference)
├── assets/                     # Shared assets
├── styles.css                  # Shared styles
├── script.js                   # Shared JavaScript
├── cookie-consent.js           # Cookie consent with i18n
├── config.js                  # Language configuration
├── sync-repos.sh              # Synchronization script
├── setup-english-repo.sh      # English repo setup script
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

## Next Steps

### 1. Initialize English Repository

```bash
cd /Users/smoulinka/Desktop/devel/post-trading-en
git init
git add .
git commit -m "Initial commit - English version"
git branch -M main
git remote add origin https://github.com/PaajaE/post-trading-en.git
git push -u origin main
```

### 2. Set Up GitHub Pages

#### Czech Repository (post-trading)
1. Go to https://github.com/PaajaE/post-trading/settings/pages
2. Source: Deploy from a branch
3. Branch: main
4. Custom domain: `uctujtrading.cz`

#### English Repository (post-trading-en)
1. Go to https://github.com/PaajaE/post-trading-en/settings/pages
2. Source: Deploy from a branch
3. Branch: main
4. Custom domain: `post-trading.com`

### 3. Configure Custom Domains

Update the CNAME files with your actual domains:

**Czech repo CNAME:**
```
uctujtrading.cz
```

**English repo CNAME:**
```
post-trading.com
```

### 4. Test the Setup

1. Visit both GitHub Pages URLs to ensure they work
2. Test language switching between versions
3. Verify cookie consent appears in correct language
4. Test contact form functionality
5. Check Google Analytics tracking

## Daily Workflow

### Making Changes

1. **Edit common files** (styles, scripts, assets):
   ```bash
   # Edit in Czech repository
   # Then sync to English
   ./sync-repos.sh sync-common
   ```

2. **Edit content**:
   ```bash
   # Edit Czech content in index.html
   # Edit English content in en/index.html
   # Update English repository
   ./sync-repos.sh update-en
   ```

3. **Full synchronization**:
   ```bash
   ./sync-repos.sh full-sync
   ```

### Deployment

Both repositories automatically deploy when you push to the main branch. No manual deployment needed.

## Google Analytics Configuration

- **Czech version**: `G-LLNL3TVW1L`
- **English version**: `G-S53VQ14VEK`

The configuration system automatically applies the correct tracking ID based on the detected language.

## Language Detection

The system detects language based on:
1. URL path (`/en/` = English)
2. HTML `lang` attribute
3. Browser language preference
4. Defaults to Czech if none match

## Troubleshooting

### Common Issues

1. **Assets not loading**: Run `./sync-repos.sh sync-common`
2. **Language not detected**: Ensure `config.js` loads first
3. **Cookie consent not showing**: Check JavaScript console for errors

### Validation

```bash
./sync-repos.sh validate
```

### Backup

```bash
./sync-repos.sh backup
```

## Files Created/Modified

### New Files
- `config.js` - Language configuration system
- `sync-repos.sh` - Repository synchronization script
- `setup-english-repo.sh` - English repository setup script
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `DUAL_REPO_SETUP.md` - Detailed setup documentation

### Modified Files
- `cookie-consent.js` - Added multi-language support
- `script.js` - Added configuration system integration
- `index.html` - Updated language switching links
- `en/index.html` - Updated language switching links

## Benefits of This Setup

1. **Separate hosting**: Each language has its own GitHub Pages deployment
2. **Custom domains**: Different domains for each language
3. **Separate analytics**: Different GA tracking IDs
4. **Easy maintenance**: Synchronization script keeps files in sync
5. **Automated deployment**: GitHub Actions handles deployment
6. **Backup system**: Easy backup creation before changes
7. **Validation**: Repository structure validation

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Run validation commands
3. Check GitHub Actions logs for deployment issues
4. Verify custom domain DNS settings

The system is now ready for production use!
