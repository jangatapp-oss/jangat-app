import { describe, expect, it } from "vitest";
import { LESSONS } from "../features/content/catalog";
import {
  buildCvSuggestions,
  canValidateMission,
  CV_DECLARED_COMPETENCIES,
  isProfessionalPathUnlocked,
  POSITIONING_DIMENSIONS,
  PROFESSIONAL_DOMAINS,
  PROFESSIONAL_MISSIONS,
} from "../features/professional/professionalCatalog";

describe("parcours professionnel EduConcret", () => {
  it("reste verrouillé avant la complétion du parcours actuel", () => {
    expect(isProfessionalPathUnlocked([])).toBe(false);
    expect(isProfessionalPathUnlocked(LESSONS.map((lesson) => lesson.id))).toBe(true);
    expect(isProfessionalPathUnlocked([], true)).toBe(true);
  });

  it("importe le CV comme déclaration et couvre les dimensions attendues", () => {
    expect(CV_DECLARED_COMPETENCIES.length).toBeGreaterThanOrEqual(8);
    expect(POSITIONING_DIMENSIONS).toHaveLength(10);
  });

  it("fournit les sept blocs pilotes opérationnels et les missions", () => {
    expect(PROFESSIONAL_DOMAINS.filter((domain) => domain.status === "operational")).toHaveLength(7);
    expect(PROFESSIONAL_MISSIONS).toHaveLength(PROFESSIONAL_DOMAINS.length);
    expect(PROFESSIONAL_MISSIONS.every((mission) => mission.criticalCriterion.length > 20)).toBe(true);
  });

  it("exige une explication personnelle et un livrable substantiel", () => {
    expect(canValidateMission("court", "court")).toBe(false);
    expect(canValidateMission("a".repeat(80), "b".repeat(120))).toBe(true);
  });

  it("ne propose une ligne de CV qu’à partir d’une preuve démontrée", () => {
    expect(buildCvSuggestions([{ title: "Piloter un budget", status: "declared" }])).toEqual([]);
    expect(buildCvSuggestions([{ title: "Piloter un budget", status: "demonstrated" }])).toHaveLength(1);
  });
});
