import type { CompleteProfessionalCourse } from "./curriculumTypes";

export type EvidenceSummary = {
  id: string;
  mission_key: string;
  title: string;
  status: string;
  created_at?: string;
};

const ROLE_VARIANTS = {
  cv_training_manager: "Responsable de formation",
  cv_training_director: "Directeur de formation",
  cv_pedagogy_ai: "Responsable pédagogique et transformation IA",
  cv_senior_ld_consultant: "Consultant senior Learning & Development",
} as const;

export function demonstratedEvidence(evidence:EvidenceSummary[]) {
  return evidence.filter(item=>item.status==="demonstrated"||item.status==="confirmed");
}

export function buildCareerDocuments(evidence:EvidenceSummary[],courses:CompleteProfessionalCourse[]) {
  const demonstrated=demonstratedEvidence(evidence);
  const provenLines=demonstrated.map(item=>({
    evidenceId:item.id,
    statement:`A produit et défendu « ${item.title} », avec une trace conservée dans le portfolio.`,
  }));
  const missionKeys=new Set(demonstrated.map(item=>item.mission_key));
  const gaps=courses.filter(course=>!missionKeys.has(course.mission.id)).map(course=>({
    courseId:course.id,
    competency:course.competencies[0],
    reason:"Aucune preuve démontrée n’est encore enregistrée pour la mission de ce domaine.",
  }));
  const cvs=Object.entries(ROLE_VARIANTS).map(([documentType,role])=>({
    documentType,
    content:{
      title:role,
      profile:provenLines.length
        ? `Professionnel de la formation disposant de ${provenLines.length} preuve${provenLines.length>1?"s":""} démontrée${provenLines.length>1?"s":""} dans JÀNGAT.`
        : "Profil en cours de démonstration : aucune compétence nouvelle n’est ajoutée sans preuve.",
      demonstratedAchievements:provenLines,
      evidenceCount:provenLines.length,
      warning:"Version probatoire à relire. Toute formulation dépend exclusivement des preuves listées.",
    },
  }));
  return [
    ...cvs,
    {documentType:"portfolio",content:{evidence:demonstrated}},
    {documentType:"progress_report",content:{demonstratedCount:demonstrated.length,remainingCount:gaps.length,gaps}},
    {documentType:"interview_case",content:{stories:provenLines.map(line=>`${line.statement} Préparer le contexte, les décisions, le résultat et les limites.`)}},
    {documentType:"professional_presentation",content:{headline:"Jàng — Jëf — Xam",proofs:provenLines}},
    {documentType:"remaining_gaps",content:{gaps}},
  ];
}
