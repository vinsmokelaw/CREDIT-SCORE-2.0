import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. The app will run in demo mode.');
  console.warn('To enable full functionality, copy .env.example to .env and add your Supabase credentials.');
}

// Use placeholder values for demo mode if environment variables are missing
const fallbackUrl = 'https://demo.supabase.co';
const fallbackKey = 'demo-key';

export const supabase = createClient(
  supabaseUrl || fallbackUrl, 
  supabaseAnonKey || fallbackKey, 
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

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