#!/bin/bash

# Vercel Environment Variables Setup Script
# Run this after: vercel login

SUPABASE_URL="https://xpodwpaozumpdvayyrfu.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwb2R3cGFvenVtcGR2YXl5cmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMzY5MDQsImV4cCI6MjA3NzYxMjkwNH0.SsoEJ9ckftY-YNfYUGOXg7jSR-P-IFKh2q12YSb7ybs"

echo "Setting up Vercel environment variables..."

# Set NEXT_PUBLIC_SUPABASE_URL for all environments
echo "$SUPABASE_URL" | vercel env add NEXT_PUBLIC_SUPABASE_URL production --force
echo "$SUPABASE_URL" | vercel env add NEXT_PUBLIC_SUPABASE_URL preview --force
echo "$SUPABASE_URL" | vercel env add NEXT_PUBLIC_SUPABASE_URL development --force

# Set NEXT_PUBLIC_SUPABASE_ANON_KEY for all environments
echo "$SUPABASE_ANON_KEY" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --force
echo "$SUPABASE_ANON_KEY" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview --force
echo "$SUPABASE_ANON_KEY" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development --force

echo "Environment variables set successfully!"
echo "Triggering a new deployment..."

# Trigger a new deployment
vercel --prod

echo "Done!"
