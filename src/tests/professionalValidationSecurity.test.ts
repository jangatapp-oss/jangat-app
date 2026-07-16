import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const sql=readFileSync(new URL("../../supabase/migrations/202607160005_professional_validation_security.sql",import.meta.url),"utf8").toLowerCase();

describe("sécurité des validations professionnelles",()=>{
  it("interdit à l’utilisateur de s’auto-confirmer",()=>{
    expect(sql).toContain("status <> 'confirmed'");
    expect(sql).toContain("status <> 'confirmé'");
    expect(sql).toContain("reviewer_id is null");
    expect(sql).toContain("status <> 'approved'");
  });

  it("conserve la lecture propriétaire des validations humaines",()=>{
    for(const table of ["user_competencies","mission_submissions","evidence_items","professional_defense_submissions","professional_career_documents"]){
      expect(sql).toContain(`on public.${table}`);
    }
    expect(sql).toContain("user_id = (select auth.uid())");
  });
});
