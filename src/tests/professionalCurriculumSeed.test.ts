import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ALL_PROFESSIONAL_COURSES } from "../features/professional/curriculum";

const migration=readFileSync(new URL("../../supabase/migrations/202607160004_professional_course_catalog.sql",import.meta.url),"utf8").toLowerCase();
const seed=readFileSync(new URL("../../supabase/seed_professional_curriculum.sql",import.meta.url),"utf8");

describe("catalogue Supabase des 34 cours",()=>{
  it("est versionné, publié en lecture seule et protégé par RLS",()=>{
    expect(migration).toContain("create table if not exists public.professional_course_catalog");
    expect(migration).toContain("enable row level security");
    expect(migration).toContain("publication_status = 'published'");
    expect(migration).toContain("revoke insert, update, delete");
  });

  it("reste aligné avec le catalogue applicatif",()=>{
    expect((seed.match(/'b1000000-0000-4000-8000-/g)??[])).toHaveLength(34);
    for(const course of ALL_PROFESSIONAL_COURSES){
      expect(seed).toContain(`'${course.id}'`);
      expect(seed).toContain(`'course-${String(course.order).padStart(2,"0")}-20260716'`);
    }
    expect(seed).toMatch(/on conflict\(id\) do update/i);
  });
});
