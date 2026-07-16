import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const sql = readFileSync(
  new URL("../../supabase/migrations/202607160006_professional_submission_transactions.sql", import.meta.url),
  "utf8",
).toLowerCase();

describe("soumissions professionnelles transactionnelles", () => {
  it("centralise la mission dans une fonction security definer", () => {
    expect(sql).toContain("submit_professional_mission");
    expect(sql).toContain("security definer");
    expect(sql).toContain("'submitted'");
    expect(sql).toContain("'in_progress'");
  });

  it("retire les écritures directes sur les tables sensibles", () => {
    for (const table of [
      "mission_submissions",
      "criterion_results",
      "ai_usage_records",
      "professional_explanations",
      "evidence_items",
      "professional_defense_submissions",
    ]) {
      expect(sql).toContain(`revoke insert, update, delete on public.${table}`);
    }
  });

  it("ne permet pas l'auto-démonstration", () => {
    expect(sql).toContain("'demonstrated',false");
    expect(sql).not.toContain("status='demonstrated'");
  });
});
