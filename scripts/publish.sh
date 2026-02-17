#!/bin/bash
#
# publish.sh - Mark a post as published and update the content library
#
# Usage: ./scripts/publish.sh <post-slug>
# Example: ./scripts/publish.sh hvac-ai-tools
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
NC='\033[0m' # No Color

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
CONTENT_LIBRARY="$PROJECT_ROOT/content-library"

# Check if slug provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: No post slug provided${NC}"
    echo ""
    echo "Usage: ./scripts/publish.sh <post-slug>"
    echo ""
    echo "Available drafts:"
    grep -l '"status": "draft"' "$CONTENT_LIBRARY"/*/metadata.json 2>/dev/null | while read -r file; do
        dir=$(dirname "$file")
        slug=$(basename "$dir")
        title=$(grep '"title"' "$file" | head -1 | sed 's/.*": "\(.*\)".*/\1/')
        echo "  - $slug"
        echo "    \"$title\""
    done
    exit 1
fi

SLUG="$1"

# Find the post directory
POST_DIR=$(find "$CONTENT_LIBRARY" -maxdepth 1 -type d -name "*-$SLUG" 2>/dev/null | head -1)

if [ -z "$POST_DIR" ]; then
    echo -e "${RED}Error: Post not found with slug '$SLUG'${NC}"
    echo ""
    echo "Looking for directory matching: *-$SLUG"
    echo ""
    echo "Available posts:"
    ls -1 "$CONTENT_LIBRARY" | grep -E "^[0-9]{4}-[0-9]{2}-[0-9]{2}-" | while read -r dir; do
        echo "  - $dir"
    done
    exit 1
fi

METADATA_FILE="$POST_DIR/metadata.json"

if [ ! -f "$METADATA_FILE" ]; then
    echo -e "${RED}Error: metadata.json not found in $POST_DIR${NC}"
    exit 1
fi

# Display current post info
echo ""
echo -e "${ORANGE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${ORANGE}  PUBLISH POST${NC}"
echo -e "${ORANGE}═══════════════════════════════════════════════════════════${NC}"
echo ""

TITLE=$(grep '"title"' "$METADATA_FILE" | head -1 | sed 's/.*": "\(.*\)".*/\1/')
CURRENT_STATUS=$(grep '"status"' "$METADATA_FILE" | head -1 | sed 's/.*": "\(.*\)".*/\1/')

echo -e "  Post: ${GREEN}$TITLE${NC}"
echo -e "  Directory: $POST_DIR"
echo -e "  Current status: $CURRENT_STATUS"
echo ""

# Check if already published
if [ "$CURRENT_STATUS" = "published" ]; then
    echo -e "${ORANGE}This post is already marked as published.${NC}"
    read -p "Update the LinkedIn URL anyway? (y/n): " UPDATE_URL
    if [ "$UPDATE_URL" != "y" ]; then
        echo "Exiting."
        exit 0
    fi
fi

# Get LinkedIn URL
echo ""
read -p "Enter the LinkedIn post URL: " LINKEDIN_URL

if [ -z "$LINKEDIN_URL" ]; then
    echo -e "${RED}Error: LinkedIn URL is required${NC}"
    exit 1
fi

# Validate URL format (basic check)
if [[ ! "$LINKEDIN_URL" =~ ^https://www.linkedin.com/ ]]; then
    echo -e "${ORANGE}Warning: URL doesn't look like a LinkedIn URL${NC}"
    read -p "Continue anyway? (y/n): " CONTINUE
    if [ "$CONTINUE" != "y" ]; then
        echo "Exiting."
        exit 1
    fi
fi

# Get today's date
PUBLISH_DATE=$(date +%Y-%m-%d)

echo ""
echo "Updating metadata..."

# Update metadata.json using node for reliable JSON manipulation
node -e "
const fs = require('fs');
const path = '$METADATA_FILE';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

data.status = 'published';
data.date_published = '$PUBLISH_DATE';
data.linkedin_url = '$LINKEDIN_URL';

// Initialize engagement metrics if not present
if (!data.engagement) {
    data.engagement = {
        views: null,
        likes: null,
        comments: null,
        shares: null,
        last_updated: null
    };
}

fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log('✅ metadata.json updated');
"

# Regenerate README
echo ""
echo "Regenerating content library README..."
node "$PROJECT_ROOT/scripts/generate-readme.js"

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ POST PUBLISHED SUCCESSFULLY${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo "  Title: $TITLE"
echo "  Status: published"
echo "  Date: $PUBLISH_DATE"
echo "  URL: $LINKEDIN_URL"
echo ""
echo -e "${ORANGE}📊 Remember to update engagement metrics in a few days:${NC}"
echo "   node scripts/update-engagement.js $SLUG"
echo ""
