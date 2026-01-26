
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mivkzzwicjrrejhrcwuy.supabase.co';
const supabaseAnonKey = 'sb_publishable_BOSNj3pdyRb4hAsNI0DYzQ_6pkDiIyI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
