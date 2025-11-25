#!/bin/bash

# Vercel Environment Variables Setup via API
#
# Get your Vercel token from: https://vercel.com/account/tokens
# Get your Project ID from: https://vercel.com/vortex-9191s-projects/aga-portal/settings
#
# Usage:
# export VERCEL_TOKEN="your-token-here"
# export VERCEL_PROJECT_ID="your-project-id"
# ./setup-vercel-api.sh

if [ -z "$VERCEL_TOKEN" ]; then
    echo "Error: VERCEL_TOKEN environment variable is not set"
    echo "Get your token from: https://vercel.com/account/tokens"
    exit 1
fi

if [ -z "$VERCEL_PROJECT_ID" ]; then
    echo "Error: VERCEL_PROJECT_ID environment variable is not set"
    echo "Get your project ID from Vercel dashboard project settings"
    exit 1
fi

SUPABASE_URL="https://xpodwpaozumpdvayyrfu.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwb2R3cGFvenVtcGR2YXl5cmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMzY5MDQsImV4cCI6MjA3NzYxMjkwNH0.SsoEJ9ckftY-YNfYUGOXg7jSR-P-IFKh2q12YSb7ybs"

echo "Setting up Vercel environment variables via API..."

# Function to add environment variable
add_env_var() {
    local key=$1
    local value=$2
    local target=$3  # production, preview, or development

    echo "Adding $key to $target environment..."

    response=$(curl -s -X POST \
        "https://api.vercel.com/v10/projects/$VERCEL_PROJECT_ID/env" \
        -H "Authorization: Bearer $VERCEL_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{
            \"key\": \"$key\",
            \"value\": \"$value\",
            \"type\": \"encrypted\",
            \"target\": [\"$target\"]
        }")

    if echo "$response" | grep -q "error"; then
        echo "Error adding $key to $target: $response"
    else
        echo "✓ Successfully added $key to $target"
    fi
}

# Add NEXT_PUBLIC_SUPABASE_URL to all environments
add_env_var "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL" "production"
add_env_var "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL" "preview"
add_env_var "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL" "development"

# Add NEXT_PUBLIC_SUPABASE_ANON_KEY to all environments
add_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY" "production"
add_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY" "preview"
add_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY" "development"

echo ""
echo "✅ Environment variables configured!"
echo ""
echo "Next steps:"
echo "1. Trigger a new deployment by pushing to your main branch, or"
echo "2. Go to https://vercel.com/vortex-9191s-projects/aga-portal and click 'Redeploy'"
