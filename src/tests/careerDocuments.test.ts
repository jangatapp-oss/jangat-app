import { describe, expect, it } from "vitest";
import { buildCareerDocuments, demonstratedEvidence } from "../features/professional/careerDocuments";
import type { CompleteProfessionalCourse } from "../features/professional/curriculumTypes";

const course={id:"quality",mission:{id:"quality-mission"},competencies:["Piloter la qualité"]} as CompleteProfessionalCourse;

describe("documents de carrière fondés sur les preuves",()=>{
  it("écarte les déclarations et preuves en cours",()=>{
    expect(demonstratedEvidence([
      {id:"1",mission_key:"a",title:"Déclaré",status:"declared"},
      {id:"2",mission_key:"b",title:"Démontré",status:"demonstrated"},
    ])).toHaveLength(1);
  });

  it("produit les quatre CV et conserve les écarts",()=>{
    const documents=buildCareerDocuments([], [course]);
    expect(documents.filter(document=>document.documentType.startsWith("cv_"))).toHaveLength(4);
    expect(documents.find(document=>document.documentType==="remaining_gaps")?.content).toMatchObject({
      gaps:[{courseId:"quality"}],
    });
  });
});
