import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Server-side Supabase client
 * Creates a new client instance for server components
 */
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    console.error('Missing Supabase environment variables')
    throw new Error('Supabase configuration missing')
  }
  
  return createSupabaseClient(url, key)
}
