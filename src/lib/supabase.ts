import { createClient } from '@supabase/supabase-js'
import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// For client-side usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For client components
export const createSupabaseBrowserClient = () =>
  createBrowserClient(supabaseUrl, supabaseAnonKey)

// For server components
export const createSupabaseServerClient = () => {
  const cookieStore = cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })
}

// Types for our database
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          is_pro: boolean
          stripe_customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          is_pro?: boolean
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          is_pro?: boolean
          stripe_customer_id?: string | null
          updated_at?: string
        }
      }
      plans: {
        Row: {
          id: string
          user_id: string
          title: string
          content: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: any
          updated_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          user_id: string
          name: string
          tone: string
          values: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          tone: string
          values: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          tone?: string
          values?: string[]
          updated_at?: string
        }
      }
      pitch_decks: {
        Row: {
          id: string
          user_id: string
          title: string
          slides: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          slides: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          slides?: any
          updated_at?: string
        }
      }
      research: {
        Row: {
          id: string
          user_id: string
          industry: string
          data: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          industry: string
          data: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          industry?: string
          data?: any
          updated_at?: string
        }
      }
      competitors: {
        Row: {
          id: string
          user_id: string
          industry: string
          list: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          industry: string
          list: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          industry?: string
          list?: any
          updated_at?: string
        }
      }
    }
  }
}