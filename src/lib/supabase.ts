import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export type UserType = 'client' | 'bank';

export interface Profile {
  id: string;
  email: string;
  user_type: UserType;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface CreditScore {
  id: string;
  user_id: string;
  score: number;
  factors: Record<string, any>;
  created_at: string;
}