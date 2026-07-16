import { describe, expect, it } from "vitest";
import { supabaseProjectUrlSchema } from "../config/env";

describe("configuration Supabase",()=>{
  it("accepte uniquement la racine du projet",()=>{
    expect(supabaseProjectUrlSchema.safeParse("https://project.supabase.co").success).toBe(true);
    expect(supabaseProjectUrlSchema.safeParse("https://project.supabase.co/").success).toBe(true);
  });
  it("refuse les endpoints REST et Auth",()=>{
    expect(supabaseProjectUrlSchema.safeParse("https://project.supabase.co/rest/v1/").success).toBe(false);
    expect(supabaseProjectUrlSchema.safeParse("https://project.supabase.co/auth/v1").success).toBe(false);
  });
});
