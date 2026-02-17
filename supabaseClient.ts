import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gikprfhefzmyjizvdllt.supabase.co';
const supabaseKey = 'sb_publishable_l3jRInIL4YmubMY5QEF3gQ_NmUi-QBR';

// Create a single instance of the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // Enabled to keep anonymous session active across reloads if needed
    autoRefreshToken: true,
  }
});