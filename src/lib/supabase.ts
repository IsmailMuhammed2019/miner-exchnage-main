import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


// Fallback for testing - replace with your actual Supabase URL
const fallbackUrl = 'https://pfsttrrbqsnzhvurchxp.supabase.co';

// Determine final URL and key
let finalUrl: string;
let finalKey: string;

if (!supabaseUrl || supabaseUrl === 'VITE_SUPABASE_URL') {
  finalUrl = fallbackUrl;
  finalKey = supabaseAnonKey || '';
} else {
  finalUrl = supabaseUrl;
  finalKey = supabaseAnonKey || '';
}

// Validate final key
if (!finalKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

// Create and export the client
export const supabase = createClient(finalUrl, finalKey);