import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Server-side Supabase client
 * Creates a new client instance for server components
 */
export async function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
