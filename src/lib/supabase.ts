import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserType = 'client' | 'bank';

export interface Profile {
  id: string;
  email: string;
  user_type: UserType;
  full_name: string;
  created_at: string;
  updated_at: string;
  // Client-specific fields
  phone_number?: string;
  date_of_birth?: string;
  // Bank-specific fields
  bank_name?: string;
  bank_code?: string;
  contact_person?: string;
  business_address?: string;
}

export interface CreditScore {
  id: string;
  user_id: string;
  score: number;
  factors: Record<string, number>;
  created_at: string;
}