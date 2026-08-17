#!/bin/bash
# Configure Supabase Storage Buckets for product images
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="$(dirname "$SCRIPT_DIR")"
CREDS_FILE="$WORKSPACE/scripts/creds.json"

if [ ! -f "$CREDS_FILE" ]; then
    echo "Error: credentials file not found at $CREDS_FILE"
    exit 1
fi

SUPABASE_URL=$(python3 -c "import json; print(json.load(open('$CREDS_FILE'))['SUPABASE_URL'])")
SERVICE_ROLE_KEY=$(python3 -c "import json; print(json.load(open('$CREDS_FILE'))['SUPABASE_SERVICE_ROLE_KEY'])")

echo "Configuring storage buckets for Supabase project..."
echo "URL: $SUPABASE_URL"

# Create product-images bucket
echo "Creating bucket: product-images"
curl -s -X POST \
    -H "apikey: $SERVICE_ROLE_KEY" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "id": "product-images",
        "name": "product-images",
        "public": true,
        "file_size_limit": 5242880,
        "allowed_mime_types": ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]
    }' \
    "$SUPABASE_URL/storage/buckets" || echo "Bucket may already exist"

# Create avatar bucket
echo "Creating bucket: avatars"
curl -s -X POST \
    -H "apikey: $SERVICE_ROLE_KEY" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "id": "avatars",
        "name": "avatars",
        "public": true,
        "file_size_limit": 2097152,
        "allowed_mime_types": ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    }' \
    "$SUPABASE_URL/storage/buckets" || echo "Bucket may already exist"

echo "Storage buckets configured successfully!"
echo "Product Images URL: $SUPABASE_URL/storage/v1/object/public/product-images/"
echo "Avatars URL: $SUPABASE_URL/storage/v1/object/public/avatars/"
