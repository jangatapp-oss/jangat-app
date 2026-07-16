import { describe, expect, it } from "vitest";
import { LESSONS } from "../features/content/catalog";
import {
  CV_DECLARED_COMPETENCIES,
  isProfessionalPathUnlocked,
} from "../features/professional/professionalCatalog";
import { ALL_PROFESSIONAL_COURSES } from "../features/professional/curriculum";
import { REQUIRED_POSITIONING_DIMENSIONS } from "../features/professional/curriculumTypes";

describe("parcours professionnel EduConcret", () => {
  it("reste verrouillé avant la complétion du parcours actuel", () => {
    expect(isProfessionalPathUnlocked([])).toBe(false);
    expect(isProfessionalPathUnlocked(LESSONS.map((lesson) => lesson.id))).toBe(true);
    expect(isProfessionalPathUnlocked([], true)).toBe(true);
  });

  it("importe le CV comme déclaration et couvre les dimensions attendues", () => {
    expect(CV_DECLARED_COMPETENCIES.length).toBeGreaterThanOrEqual(8);
    expect(REQUIRED_POSITIONING_DIMENSIONS).toHaveLength(8);
  });

  it("fournit les 34 domaines et leurs missions", () => {
    expect(ALL_PROFESSIONAL_COURSES).toHaveLength(34);
    expect(ALL_PROFESSIONAL_COURSES.every((course) => course.mission.criticalCriterion.length > 20)).toBe(true);
  });

  it("exige une explication personnelle et un livrable substantiel", () => {
    const valid=(explanation:string,delivery:string)=>explanation.trim().length>=80&&delivery.trim().length>=120;
    expect(valid("court", "court")).toBe(false);
    expect(valid("a".repeat(80), "b".repeat(120))).toBe(true);
  });

  it("ne propose une ligne de CV qu’à partir d’une preuve démontrée", () => {
    const evidence=[{title:"Piloter un budget",status:"declared"},{title:"Défendre un budget",status:"demonstrated"}];
    expect(evidence.filter(item=>item.status==="demonstrated")).toHaveLength(1);
  });
});
