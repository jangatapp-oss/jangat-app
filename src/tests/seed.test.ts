import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { DIAGNOSTIC_QUESTIONS, LESSONS, MODULES } from "../features/content/catalog";

describe("seed JÀNGAT V1",()=>{
  const seed=readFileSync(new URL("../../supabase/seed_jangat_v1.sql",import.meta.url),"utf8");
  it("contient les quantités pédagogiques attendues",()=>{expect(MODULES).toHaveLength(22);expect(LESSONS).toHaveLength(8);expect(DIAGNOSTIC_QUESTIONS).toHaveLength(15);expect((seed.match(/30000000-0000-4000-8000-/g)||[]).length).toBeGreaterThanOrEqual(22)});
  it("est idempotent et utilise des UUID stables",()=>{expect(seed).toMatch(/on conflict\(id\) do update/gi);expect(seed).toContain("10000000-0000-4000-8000-000000000001")});
});
