import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nqzavluxxtebshjkeast.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Ywl72s_RrdNfpypyN-_F5w_1-7mp9wu';

// Export a single, reusable Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
