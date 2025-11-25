#!/bin/bash

# Vercel Environment Variables Setup via CLI with Token
#
# Get your Vercel token from: https://vercel.com/account/tokens
#
# Usage:
# export VERCEL_TOKEN="your-token-here"
# ./setup-vercel-cli-with-token.sh

if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Error: VERCEL_TOKEN environment variable is not set"
    echo "Get your token from: https://vercel.com/account/tokens"
    echo ""
    echo "Usage:"
    echo "  export VERCEL_TOKEN=\"your-token-here\""
    echo "  ./setup-vercel-cli-with-token.sh"
    exit 1
fi

SUPABASE_URL="https://xpodwpaozumpdvayyrfu.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwb2R3cGFvenVtcGR2YXl5cmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMzY5MDQsImV4cCI6MjA3NzYxMjkwNH0.SsoEJ9ckftY-YNfYUGOXg7jSR-P-IFKh2q12YSb7ybs"

echo "🚀 Setting up Vercel environment variables via CLI..."
echo ""

# Link project if not already linked
echo "📎 Linking Vercel project..."
vercel link --token="$VERCEL_TOKEN" --yes 2>&1 || echo "Project may already be linked"

echo ""
echo "🔧 Adding NEXT_PUBLIC_SUPABASE_URL..."
echo "$SUPABASE_URL" | vercel env add NEXT_PUBLIC_SUPABASE_URL production --token="$VERCEL_TOKEN" --force 2>&1
echo "$SUPABASE_URL" | vercel env add NEXT_PUBLIC_SUPABASE_URL preview --token="$VERCEL_TOKEN" --force 2>&1
echo "$SUPABASE_URL" | vercel env add NEXT_PUBLIC_SUPABASE_URL development --token="$VERCEL_TOKEN" --force 2>&1

echo ""
echo "🔧 Adding NEXT_PUBLIC_SUPABASE_ANON_KEY..."
echo "$SUPABASE_ANON_KEY" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --token="$VERCEL_TOKEN" --force 2>&1
echo "$SUPABASE_ANON_KEY" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview --token="$VERCEL_TOKEN" --force 2>&1
echo "$SUPABASE_ANON_KEY" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development --token="$VERCEL_TOKEN" --force 2>&1

echo ""
echo "✅ Environment variables configured successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Trigger a new deployment:"
echo "   - Push a new commit to your GitHub repository, or"
echo "   - Go to Vercel dashboard and click 'Redeploy'"
echo ""
echo "2. Verify the deployment at your production URL"
echo ""
echo "🎉 Setup complete!"
