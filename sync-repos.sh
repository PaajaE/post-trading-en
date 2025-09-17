#!/bin/bash

# Dual Repository Synchronization Script
# This script helps keep the Czech and English repositories in sync

# Configuration
CZECH_REPO="/Users/smoulinka/Desktop/devel/post-trading"
ENGLISH_REPO="/Users/smoulinka/Desktop/devel/post-trading-en"
BACKUP_DIR="/Users/smoulinka/Desktop/devel/post-trading-backup"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Function to create backup
create_backup() {
    local source_dir=$1
    local backup_name=$2
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    
    print_status "Creating backup of $source_dir..."
    
    if [ ! -d "$BACKUP_DIR" ]; then
        mkdir -p "$BACKUP_DIR"
    fi
    
    cp -r "$source_dir" "$BACKUP_DIR/${backup_name}_${timestamp}"
    print_success "Backup created: $BACKUP_DIR/${backup_name}_${timestamp}"
}

# Function to sync files (excluding language-specific content)
sync_common_files() {
    print_status "Syncing common files between repositories..."
    
    # Files to sync (excluding language-specific content and CNAME)
    COMMON_FILES=(
        "styles.css"
        "script.js"
        "cookie-consent.js"
        "config.js"
        "assets/"
        "README.md"
        "EMAILJS_SETUP.md"
        "AUTO_REPLY_SETUP.md"
        "auto_reply_template_czech.html"
        "auto_reply_template_english.html"
        "robots.txt"
    )
    
    for file in "${COMMON_FILES[@]}"; do
        if [ -e "$CZECH_REPO/$file" ]; then
            print_status "Syncing $file..."
            cp -r "$CZECH_REPO/$file" "$ENGLISH_REPO/"
            print_success "Synced $file"
        else
            print_warning "File $file not found in Czech repo"
        fi
    done
}

# Function to update English version with Czech changes
update_english_version() {
    print_status "Updating English version with Czech changes..."
    
    # Copy English index.html to English repo root
    if [ -f "$CZECH_REPO/en/index.html" ]; then
        cp "$CZECH_REPO/en/index.html" "$ENGLISH_REPO/index.html"
        print_success "Updated English index.html"
    else
        print_error "English index.html not found in Czech repo"
        return 1
    fi
    
    # Update asset paths in English version
    sed -i '' 's|../assets/|assets/|g' "$ENGLISH_REPO/index.html"
    sed -i '' 's|../styles.css|styles.css|g' "$ENGLISH_REPO/index.html"
    sed -i '' 's|../script.js|script.js|g' "$ENGLISH_REPO/index.html"
    sed -i '' 's|../cookie-consent.js|cookie-consent.js|g' "$ENGLISH_REPO/index.html"
    sed -i '' 's|../config.js|config.js|g' "$ENGLISH_REPO/index.html"
    
    # Copy and update sitemap for English version
    if [ -f "$CZECH_REPO/en/sitemap.xml" ]; then
        cp "$CZECH_REPO/en/sitemap.xml" "$ENGLISH_REPO/sitemap.xml"
        print_success "Updated English sitemap.xml"
    else
        print_warning "English sitemap.xml not found, creating default..."
        create_english_sitemap
    fi
    
    print_success "Updated asset paths in English version"
}

# Function to create English sitemap
create_english_sitemap() {
    cat > "$ENGLISH_REPO/sitemap.xml" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Main English page -->
  <url>
    <loc>https://www.post-trading.com/</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="cs" href="https://www.uctujtrading.cz/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.post-trading.com/"/>
  </url>
  
  <!-- English page sections -->
  <url>
    <loc>https://www.post-trading.com/#services</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.post-trading.com/#target-audience</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://www.post-trading.com/#references</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.post-trading.com/#contact</loc>
    <lastmod>2024-12-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
</urlset>
EOF
    print_success "Created English sitemap.xml"
}

# Function to update Czech version with English changes
update_czech_version() {
    print_status "Updating Czech version with English changes..."
    
    # Copy Czech index.html to Czech repo root
    if [ -f "$CZECH_REPO/index.html" ]; then
        print_success "Czech index.html is already in place"
    else
        print_error "Czech index.html not found"
        return 1
    fi
}

# Function to validate repositories
validate_repositories() {
    print_status "Validating repositories..."
    
    # Check if Czech repo exists
    if [ ! -d "$CZECH_REPO" ]; then
        print_error "Czech repository not found at $CZECH_REPO"
        return 1
    fi
    
    # Check if English repo exists
    if [ ! -d "$ENGLISH_REPO" ]; then
        print_error "English repository not found at $ENGLISH_REPO"
        print_status "Creating English repository directory..."
        mkdir -p "$ENGLISH_REPO"
    fi
    
    # Check for required files
    REQUIRED_FILES=("index.html" "styles.css" "script.js" "config.js")
    
    for file in "${REQUIRED_FILES[@]}"; do
        if [ ! -f "$CZECH_REPO/$file" ]; then
            print_error "Required file $file not found in Czech repo"
            return 1
        fi
    done
    
    print_success "Repositories validated successfully"
    return 0
}

# Function to show help
show_help() {
    echo "Dual Repository Synchronization Script"
    echo ""
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  sync-common     Sync common files between repositories"
    echo "  update-en       Update English version with Czech changes"
    echo "  update-cs       Update Czech version with English changes"
    echo "  full-sync       Perform full synchronization"
    echo "  validate        Validate repository structure"
    echo "  backup          Create backup of both repositories"
    echo "  help            Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 sync-common    # Sync common files only"
    echo "  $0 full-sync       # Full synchronization"
    echo "  $0 backup          # Create backups"
}

# Main function
main() {
    local command=${1:-help}
    
    case $command in
        "sync-common")
            validate_repositories && sync_common_files
            ;;
        "update-en")
            validate_repositories && update_english_version
            ;;
        "update-cs")
            validate_repositories && update_czech_version
            ;;
        "full-sync")
            validate_repositories && create_backup "$CZECH_REPO" "czech_repo" && create_backup "$ENGLISH_REPO" "english_repo" && sync_common_files && update_english_version
            ;;
        "validate")
            validate_repositories
            ;;
        "backup")
            create_backup "$CZECH_REPO" "czech_repo"
            create_backup "$ENGLISH_REPO" "english_repo"
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# Run main function with all arguments
main "$@"
