#!/usr/bin/env bash
# Usage:
#   ./build-site.sh <site-slug> [payload-url] [site-url]
#
# Examples:
#   ./build-site.sh asus
#   ./build-site.sh asus http://localhost:3000 https://asus.example.com
#   ./build-site.sh samsung https://admin.mysite.com https://samsung.example.com
#
# Output: ./sites/<site-slug>/  (static HTML ready to deploy)
#
set -e

SITE_SLUG="${1:?Usage: $0 <site-slug> [payload-url] [site-url]}"
PAYLOAD_URL="${2:-http://localhost:3000}"
SITE_URL="${3:-}"

OUTPUT_DIR="$(pwd)/sites/${SITE_SLUG}"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Building site: $SITE_SLUG"
echo "  Payload URL:   $PAYLOAD_URL"
echo "  Output:        $OUTPUT_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

export SITE_SLUG="$SITE_SLUG"
export PAYLOAD_URL="$PAYLOAD_URL"
export SITE_URL="${SITE_URL:-http://localhost:4321}"

# Build
./node_modules/.bin/astro build --outDir "./sites/${SITE_SLUG}"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅  Done!  Static files → sites/${SITE_SLUG}/"
echo ""
echo "  To preview:"
echo "    npx serve sites/${SITE_SLUG}"
echo ""
echo "  To deploy (Netlify CLI):"
echo "    netlify deploy --dir sites/${SITE_SLUG} --prod"
echo ""
echo "  To deploy (Vercel):"
echo "    cd sites/${SITE_SLUG} && vercel --prod"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
