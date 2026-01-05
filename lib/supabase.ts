
import { createClient } from 'https://jspm.dev/@supabase/supabase-js';

/**
 * IMPORTANTE: No GitHub, estas chaves devem ser configuradas nos 'Secrets' 
 * do seu repositório ou no painel da Hostinger/Vercel.
 */
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Atenção: Supabase URL ou Anon Key não configurados. Verifique as variáveis de ambiente.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
