export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          isPro: boolean
          stripe_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          isPro?: boolean
          stripe_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          isPro?: boolean
          stripe_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      plans: {
        Row: {
          id: string
          user_id: string
          title: string
          sections: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          sections: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          sections?: Json
          created_at?: string
          updated_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          user_id: string
          business_name: string
          data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_name: string
          data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_name?: string
          data?: Json
          created_at?: string
          updated_at?: string
        }
      }
      pitch_decks: {
        Row: {
          id: string
          user_id: string
          title: string
          data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          data?: Json
          created_at?: string
          updated_at?: string
        }
      }
      research: {
        Row: {
          id: string
          user_id: string
          topic: string
          data: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          topic: string
          data: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          topic?: string
          data?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}