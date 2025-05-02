import { createClient } from '@supabase/supabase-js';

// Supabase URL ve anon key için çevre değişkenlerini alıyoruz
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Supabase client oluşturuyoruz
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
