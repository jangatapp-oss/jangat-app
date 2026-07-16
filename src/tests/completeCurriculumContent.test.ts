import { describe, expect, it } from "vitest";
import { ALL_PROFESSIONAL_COURSES } from "../features/professional/curriculum";
import { validateCompleteCourse } from "../features/professional/curriculumTypes";
import { PROFESSIONAL_SOURCES } from "../features/professional/sourceRegistry";

describe("intégralité de la formation professionnelle",()=>{
  it("livre exactement les 34 domaines dans le bon ordre",()=>{
    expect(ALL_PROFESSIONAL_COURSES).toHaveLength(34);
    expect(ALL_PROFESSIONAL_COURSES.map(course=>course.order)).toEqual(Array.from({length:34},(_,index)=>index+1));
    expect(new Set(ALL_PROFESSIONAL_COURSES.map(course=>course.id)).size).toBe(34);
    expect(new Set(ALL_PROFESSIONAL_COURSES.map(course=>course.mission.id)).size).toBe(34);
  });

  it("rend chaque cours complet et positionnable sur huit dimensions",()=>{
    for(const course of ALL_PROFESSIONAL_COURSES){
      expect(validateCompleteCourse(course),course.title).toBe(true);
      expect(course.positioning.map(item=>item.dimension),course.title).toEqual([
        "know","do_without_ai","do_with_ai","control","explain","direct","transmit","prove",
      ]);
      expect(course.correctionGuide.length,course.title).toBeGreaterThanOrEqual(3);
      expect(course.aiAuditChecklist.length,course.title).toBeGreaterThanOrEqual(3);
      expect(course.transmissionActivity.length,course.title).toBeGreaterThan(40);
    }
  });

  it("référence uniquement des sources enregistrées et datées",()=>{
    const sourceIds=new Set(PROFESSIONAL_SOURCES.map(source=>source.id));
    for(const course of ALL_PROFESSIONAL_COURSES){
      for(const sourceId of course.sourceIds)expect(sourceIds,`${course.id}: ${sourceId}`).toContain(sourceId);
    }
    expect(PROFESSIONAL_SOURCES.every(source=>source.checkedAt==="2026-07-16")).toBe(true);
  });

  it("couvre en profondeur Qualiopi, RNCP/RS, OPCO et les sept niveaux IA",()=>{
    const byOrder=(order:number)=>JSON.stringify(ALL_PROFESSIONAL_COURSES.find(course=>course.order===order)).toLocaleLowerCase("fr-FR");
    const qualiopi=byOrder(12);for(const term of ["sept critères","indicateur","preuve","audit initial","surveillance","renouvellement","non-conformité","réclamation"])expect(qualiopi).toContain(term);
    const rncp=byOrder(13);for(const term of ["rncp","répertoire spécifique","certificateur","habilit","bloc","jury","vae","insertion"])expect(rncp).toContain(term);
    const opco=byOrder(14);for(const term of ["opco","convention collective","prise en charge","alternance","devis","refus","paiement"])expect(opco).toContain(term);
    const ai=[25,26,27,28].map(byOrder).join(" ");for(let level=1;level<=7;level++)expect(ai).toContain(`niveau ${level}`);
  });

  it("couvre toutes les missions opérationnelles LOGIX FORMA demandées",()=>{
    const content=JSON.stringify(ALL_PROFESSIONAL_COURSES).toLocaleLowerCase("fr-FR");
    for(const term of [
      "convention","signature","relance","circuit documentaire","système qualiopi",
      "audit blanc","preuve","opco","dossier de financement","subvention",
      "bilan pédagogique et financier","budget","trésorerie","stratégie à trois ans",
      "plan de développement des compétences","parcours multimodal","cahier des charges",
      "prestataire","appel d’offres","tableau de bord","mesurer l’impact",
      "équipe pédagogique","progresser un formateur","conduire une réunion",
      "défendre le budget","défendre une stratégie","stratégie numérique et ia",
      "assistant spécialisé","certification","répertoire spécifique",
    ])expect(content,term).toContain(term);
  });
});
