import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration=readFileSync(new URL("../../supabase/migrations/202607160003_complete_professional_curriculum.sql",import.meta.url),"utf8").toLowerCase();

describe("migration du parcours complet",()=>{
  it("stocke progression, tentatives, soutenance et documents de carrière",()=>{
    for(const table of ["professional_course_progress","professional_assessment_attempts","professional_defense_submissions","professional_career_documents"]){
      expect(migration).toContain(`create table if not exists public.${table}`);
    }
  });

  it("protège chaque table utilisateur par RLS",()=>{
    expect(migration).toContain("alter table public.%i enable row level security");
    expect(migration).toContain("user_id = (select auth.uid())");
    expect(migration).not.toContain("security definer");
  });
});
