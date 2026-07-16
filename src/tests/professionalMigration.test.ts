import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const migration = readFileSync(new URL("../../supabase/migrations/202607160002_professional_path_mvp.sql", import.meta.url), "utf8").toLowerCase();
const seed = readFileSync(new URL("../../supabase/seed_professional_path.sql", import.meta.url), "utf8").toLowerCase();

describe("migration du parcours professionnel", () => {
  it("crée les tables de référence avant les tables utilisateur dépendantes", () => {
    expect(migration.indexOf("create table if not exists public.competency_domains")).toBeLessThan(migration.indexOf("create table if not exists public.competencies"));
    expect(migration.indexOf("create table if not exists public.professional_missions")).toBeLessThan(migration.indexOf("create table if not exists public.mission_submissions"));
    expect(migration.indexOf("create table if not exists public.mission_submissions")).toBeLessThan(migration.indexOf("create table if not exists public.evidence_items"));
  });

  it("active une politique propriétaire sur chaque donnée utilisateur", () => {
    for (const table of ["positioning_assessments","user_competencies","mission_submissions","criterion_results","ai_usage_records","evidence_items","professional_explanations","job_market_offers","job_market_skill_requirements","cv_skill_suggestions","progress_reviews"]) {
      expect(migration).toContain(`'${table}'`);
    }
    expect(migration).toContain("user_id = (select auth.uid())");
  });

  it("seed les blocs pilotes, missions et sources datées", () => {
    expect((seed.match(/'operational'/g) ?? []).length).toBeGreaterThanOrEqual(7);
    expect(seed).toContain("'qualiopi-v9'");
    expect(seed).toContain("'2026-07-16'");
  });
});
