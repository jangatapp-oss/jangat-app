import { z } from "zod";

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url("VITE_SUPABASE_URL doit être une URL valide."),
  VITE_SUPABASE_ANON_KEY: z.string().min(20, "VITE_SUPABASE_ANON_KEY est absente ou invalide."),
});

const parsed = envSchema.safeParse(import.meta.env);

export const env = parsed.success ? parsed.data : null;
export const envError = parsed.success
  ? null
  : parsed.error.issues.map((issue) => issue.message).join(" ");
