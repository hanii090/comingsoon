import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// Client component client (for use in client components)
export const createClientComponent = () => createClientComponentClient()

// Service role client (for admin operations - server-side only)
export const supabaseAdmin = createSupabaseClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)