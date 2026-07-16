import { createClient } from "@supabase/supabase-js";
import { env } from "./env";
export const supabase = env
  ? createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY || env.VITE_SUPABASE_ANON_KEY!, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;

export function requireSupabase() {
  if (!supabase) throw new Error("JÀNGAT n’est pas configuré. Ajoutez les deux variables Supabase.");
  return supabase;
}
