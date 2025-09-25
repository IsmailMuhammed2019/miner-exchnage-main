import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug environment variables
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Not set');
console.log('All env vars:', import.meta.env);

// Fallback for testing - replace with your actual Supabase URL
const fallbackUrl = 'https://pfsttrrbqsnzhvurchxp.supabase.co';

// Validate environment variables
if (!supabaseUrl || supabaseUrl === 'VITE_SUPABASE_URL') {
  console.warn('Using fallback URL for testing');
  // For now, use the fallback URL
  const finalUrl = fallbackUrl;
  const finalKey = supabaseAnonKey;
  
  if (!finalKey) {
    throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
  }
  
  export const supabase = createClient(finalUrl, finalKey);
} else {
  if (!supabaseAnonKey) {
    throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
  }
  
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
}