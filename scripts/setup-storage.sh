#!/bin/bash
# Configure Supabase Storage Buckets
# Run this after setting SUPABASE_SERVICE_ROLE_KEY

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

# Create Storage RLS Policies
echo "Setting up storage RLS policies..."

# Allow public read on product-images
curl -s -X POST \
    -H "apikey: $SERVICE_ROLE_KEY" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Public product-images read access",
        "allowed_operation": "SELECT",
        "bucket_id": "product-images",
        "policy": {
            "statement": [{
                "effect": "allow",
                "actor_id": "public",
                "query": {
                    "bucket_id": "product-images"
                },
                "resource": {
                    "bucket_id": "product-images"
                }
            }]
        }
    }' \
    "$SUPABASE_URL/storage/buckets/product-images/policy" || true

# Allow authenticated upload to product-images
curl -s -X POST \
    -H "apikey: $SERVICE_ROLE_KEY" \
    -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "name": "Authenticated upload to product-images",
        "allowed_operation": "INSERT",
        "bucket_id": "product-images",
        "policy": {
            "statement": [{
                "effect": "allow",
                "actor_id": "authenticated",
                "query": {
                    "bucket_id": "product-images"
                },
                "resource": {
                    "bucket_id": "product-images"
                }
            }]
        }
    }' \
    "$SUPABASE_URL/storage/buckets/product-images/policy" || true

echo "Storage buckets configured successfully!"
echo ""
echo "Bucket URLs:"
echo "  Product Images: $SUPABASE_URL/storage/v1/object/public/product-images/"
echo "  Avatars: $SUPABASE_URL/storage/v1/object/public/avatars/"
