import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dmrsgefrazouahgjfblx.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtcnNnZWZyYXpvdWFoZ2pmYmx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MzE2MDQsImV4cCI6MjA4OTMwNzYwNH0.CC80RAtPhFs14498m_DtAIlxS40vJdzUMtQ9XFi7IKI';

// Export a single, reusable Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
