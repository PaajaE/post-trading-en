#!/bin/bash

# Setup script for English repository
# This script initializes the English repository with the necessary files

# Configuration
CZECH_REPO="/Users/smoulinka/Desktop/devel/post-trading"
ENGLISH_REPO="/Users/smoulinka/Desktop/devel/post-trading-en"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Create English repository directory
print_status "Creating English repository directory..."
mkdir -p "$ENGLISH_REPO"

# Copy English index.html
print_status "Copying English index.html..."
if [ -f "$CZECH_REPO/en/index.html" ]; then
    cp "$CZECH_REPO/en/index.html" "$ENGLISH_REPO/index.html"
    print_success "Copied English index.html"
else
    print_error "English index.html not found in Czech repo"
    exit 1
fi

# Copy common files
print_status "Copying common files..."
COMMON_FILES=(
    "styles.css"
    "script.js"
    "cookie-consent.js"
    "config.js"
    "assets"
    "README.md"
    "EMAILJS_SETUP.md"
    "AUTO_REPLY_SETUP.md"
    "auto_reply_template_czech.html"
    "auto_reply_template_english.html"
)

for file in "${COMMON_FILES[@]}"; do
    if [ -e "$CZECH_REPO/$file" ]; then
        cp -r "$CZECH_REPO/$file" "$ENGLISH_REPO/"
        print_success "Copied $file"
    else
        print_warning "File $file not found in Czech repo"
    fi
done

# Update asset paths in English index.html
print_status "Updating asset paths in English version..."
sed -i '' 's|../assets/|assets/|g' "$ENGLISH_REPO/index.html"
sed -i '' 's|../styles.css|styles.css|g' "$ENGLISH_REPO/index.html"
sed -i '' 's|../script.js|script.js|g' "$ENGLISH_REPO/index.html"
sed -i '' 's|../cookie-consent.js|cookie-consent.js|g' "$ENGLISH_REPO/index.html"
sed -i '' 's|../config.js|config.js|g' "$ENGLISH_REPO/index.html"

print_success "Updated asset paths in English version"

# Create .gitignore
print_status "Creating .gitignore..."
cat > "$ENGLISH_REPO/.gitignore" << EOF
# macOS
.DS_Store

# Backup files
*.backup
*.bak

# Logs
*.log

# Temporary files
*.tmp
*.temp
EOF
print_success "Created .gitignore"

print_success "English repository setup completed!"
print_status "Next steps:"
echo "1. Initialize git repository in $ENGLISH_REPO"
echo "2. Add remote origin: git remote add origin https://github.com/PaajaE/post-trading-en.git"
echo "3. Commit and push files"
echo "4. Set up GitHub Pages in repository settings"
echo "5. Configure custom domain"
