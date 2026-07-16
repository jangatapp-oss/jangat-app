import { z } from "zod";

export const supabaseProjectUrlSchema = z.string()
  .url("VITE_SUPABASE_URL doit être une URL valide.")
  .refine((value) => {
    const url = new URL(value);
    return (url.pathname === "" || url.pathname === "/") && !url.search && !url.hash;
  }, "VITE_SUPABASE_URL doit être l’URL racine du projet, sans /rest/v1, /auth/v1 ni autre chemin.");

const envSchema = z.object({
  VITE_SUPABASE_URL: supabaseProjectUrlSchema,
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().min(20).optional(),
  VITE_SUPABASE_ANON_KEY: z.string().min(20).optional(),
}).refine(
  value => Boolean(value.VITE_SUPABASE_PUBLISHABLE_KEY || value.VITE_SUPABASE_ANON_KEY),
  "VITE_SUPABASE_PUBLISHABLE_KEY est absente ou invalide.",
);

const parsed = envSchema.safeParse(import.meta.env);

export const env = parsed.success ? parsed.data : null;
export const envError = parsed.success
  ? null
  : parsed.error.issues.map((issue) => issue.message).join(" ");
