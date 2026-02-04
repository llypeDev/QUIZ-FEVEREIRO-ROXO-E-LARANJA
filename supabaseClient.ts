
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gikprfhefzmyjizvdllt.supabase.co';
const supabaseKey = 'sb_publishable_l3jRInIL4YmubMY5QEF3gQ_NmUi-QBR';

export const supabase = createClient(supabaseUrl, supabaseKey);
