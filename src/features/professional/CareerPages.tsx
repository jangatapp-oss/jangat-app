import { useEffect, useMemo, useState } from "react";
import { ALL_PROFESSIONAL_COURSES } from "./curriculum";
import { buildCareerDocuments, type EvidenceSummary } from "./careerDocuments";
import { loadEvidence, saveCareerDocument } from "./professionalService";

const DOCUMENT_LABELS:Record<string,string>={
  cv_training_manager:"CV Responsable de formation",
  cv_training_director:"CV Directeur de formation",
  cv_pedagogy_ai:"CV Responsable pédagogique et transformation IA",
  cv_senior_ld_consultant:"CV Consultant senior Learning & Development",
  portfolio:"Portfolio de preuves",
  progress_report:"Rapport de progression",
  interview_case:"Argumentaire d’entretien",
  professional_presentation:"Présentation professionnelle",
  remaining_gaps:"Compétences encore insuffisamment démontrées",
};

export function CareerDocumentsPage() {
  const [evidence,setEvidence]=useState<EvidenceSummary[]>([]);const [notice,setNotice]=useState("");const [error,setError]=useState("");
  useEffect(()=>{loadEvidence().then(rows=>setEvidence(rows as EvidenceSummary[])).catch(caught=>setError(caught instanceof Error?caught.message:String(caught)))},[]);
  const documents=useMemo(()=>buildCareerDocuments(evidence,ALL_PROFESSIONAL_COURSES),[evidence]);
  const saveAll=async()=>{for(const document of documents){const ids=evidence.filter(item=>item.status==="demonstrated"||item.status==="confirmed").map(item=>item.id);await saveCareerDocument(document.documentType,document.content,ids)}setNotice("Les neuf documents probatoires ont été enregistrés dans votre espace sécurisé.")};
  return <><section className="course-intro"><p className="eyebrow">Professionnalisation finale</p><h1>CV et documents fondés sur les preuves</h1><p>Aucune ligne nouvelle n’est générée à partir d’une simple déclaration. Les lacunes restent visibles jusqu’à démonstration.</p></section>{error&&<div className="feedback error">{error}</div>}<section className="card career-summary"><strong>{evidence.filter(item=>item.status==="demonstrated"||item.status==="confirmed").length}</strong><span>preuves démontrées ou confirmées</span><button className="primary" onClick={saveAll}>Enregistrer tous les documents</button>{notice&&<p role="status">{notice}</p>}</section><div className="career-documents">{documents.map(document=><details className="card" key={document.documentType}><summary>{DOCUMENT_LABELS[document.documentType]||document.documentType}</summary><pre>{JSON.stringify(document.content,null,2)}</pre></details>)}</div></>;
}
