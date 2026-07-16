import { describe, expect, it } from "vitest";
import { recommendTrack, REQUIRED_POSITIONING_DIMENSIONS } from "../features/professional/curriculumTypes";

describe("modèle du parcours professionnel complet",()=>{
  it("positionne les huit capacités avant chaque domaine",()=>{
    expect(REQUIRED_POSITIONING_DIMENSIONS).toEqual([
      "know","do_without_ai","do_with_ai","control","explain","direct","transmit","prove",
    ]);
  });

  it("adapte le parcours sans supprimer le contenu",()=>{
    expect(recommendTrack({know:1,do_without_ai:1,do_with_ai:1,control:1,explain:1,direct:1,transmit:1,prove:1})).toBe("full_course");
    expect(recommendTrack({know:4,do_without_ai:4,do_with_ai:4,control:4,explain:4,direct:4,transmit:4,prove:4})).toBe("short_update");
    expect(recommendTrack({know:7,do_without_ai:7,do_with_ai:7,control:7,explain:7,direct:7,transmit:7,prove:7})).toBe("advanced_mission");
  });
});
