import { describe, expect, it } from "vitest";
import { LESSONS, MODULES } from "../features/content/catalog";
import { isProfessionalPathUnlocked } from "../features/professional/professionalCatalog";

describe("parcours fondamental complet", () => {
  it("associe au moins une leçon à chaque module pédagogique", () => {
    const learningModules = MODULES.filter((module) => module.order > 0);
    expect(learningModules).toHaveLength(21);
    for (const module of learningModules) {
      expect(module.lessonIds.length, module.id).toBeGreaterThan(0);
      for (const lessonId of module.lessonIds) {
        expect(LESSONS.some((lesson) => lesson.id === lessonId), lessonId).toBe(true);
      }
    }
  });

  it("contient les 84 leçons du parcours complet", () => {
    expect(LESSONS).toHaveLength(84);
    expect(MODULES.filter((module) => module.order > 0).every((module) => module.lessonIds.length === 4)).toBe(true);
  });

  it("ne déverrouille EduConcret qu'après toutes les leçons", () => {
    const allButLast = LESSONS.slice(0, -1).map((lesson) => lesson.id);
    expect(isProfessionalPathUnlocked(allButLast, false)).toBe(false);
    expect(isProfessionalPathUnlocked(LESSONS.map((lesson) => lesson.id), false)).toBe(true);
  });
});
