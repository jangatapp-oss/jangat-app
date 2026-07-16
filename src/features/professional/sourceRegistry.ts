import type { SourceReference } from "./curriculumTypes";
import { SUPPLEMENTAL_PROFESSIONAL_SOURCES } from "./sourceRegistrySupplement";

const CORE_PROFESSIONAL_SOURCES: SourceReference[] = [
  { id:"qualiopi-v9", title:"Guide de lecture du Référentiel national qualité — V9", authority:"Ministère du Travail", url:"https://travail-emploi.gouv.fr/sites/travail-emploi/files/2024-07/guide_qualiopi_0.pdf", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:3 },
  { id:"france-competences-vademecum-2026", title:"Vademecum de la certification professionnelle 2026", authority:"France compétences", url:"https://www.francecompetences.fr/app/uploads/2026/01/Vademecum-VF_2026.pdf", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:3 },
  { id:"france-competences-search", title:"Moteur de recherche RNCP et Répertoire spécifique", authority:"France compétences", url:"https://www.francecompetences.fr/recherche-resultats/", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:1 },
  { id:"code-travail-formation", title:"Livre III — Formation professionnelle", authority:"Légifrance", url:"https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000006145422/", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:3 },
  { id:"code-travail-organismes", title:"Titre V — Organismes de formation", authority:"Légifrance", url:"https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018498940/", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:3 },
  { id:"service-public-pdc", title:"Plan de développement des compétences", authority:"Service Public", url:"https://www.service-public.fr/particuliers/vosdroits/F11267", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:6 },
  { id:"service-public-opco", title:"Financement OPCO du contrat de professionnalisation", authority:"Service Public", url:"https://entreprendre.service-public.fr/vosdroits/F15478", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:3 },
  { id:"service-public-contribution", title:"Contribution à la formation professionnelle", authority:"Service Public", url:"https://entreprendre.service-public.fr/vosdroits/F22570", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:6 },
  { id:"bpf-cerfa", title:"Bilan pédagogique et financier — Cerfa 10443", authority:"Service Public", url:"https://www.formulaires.service-public.fr/gf/cerfa_10443.do", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:3 },
  { id:"bpf-campaign-2026", title:"Campagne BPF 2026", authority:"Mon Activité Formation", url:"https://info.monactiviteformation.emploi.gouv.fr/actualit%C3%A9s/campagne-bpf-2025/", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:1 },
  { id:"daj-public-procurement", title:"Guides de la commande publique", authority:"Direction des Affaires juridiques — Ministère de l’Économie", url:"https://www.economie.gouv.fr/daj/commande-publique", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:6 },
  { id:"dge-calls", title:"Appels à projets et manifestations d’intérêt", authority:"Direction générale des Entreprises", url:"https://www.entreprises.gouv.fr/espace-entreprises/appels-a-projets-et-appels-a-manifestation-d-interet", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:1 },
  { id:"pmi-standards", title:"Project, program and portfolio management standards", authority:"Project Management Institute", url:"https://www.pmi.org/standards/", kind:"standard", checkedAt:"2026-07-16", reviewFrequencyMonths:12 },
  { id:"cipd-profession-map", title:"The Profession Map", authority:"CIPD", url:"https://www.cipd.org/uk/the-people-profession/the-profession-map/", kind:"standard", checkedAt:"2026-07-16", reviewFrequencyMonths:12 },
  { id:"cipd-needs-analysis", title:"Learning needs analysis", authority:"CIPD", url:"https://www.cipd.org/uk/knowledge/factsheets/learning-needs-factsheet/", kind:"executive", checkedAt:"2026-07-16", reviewFrequencyMonths:12 },
  { id:"cipd-learning-impact", title:"Learning evaluation, impact and transfer", authority:"CIPD", url:"https://www.cipd.org/en/knowledge/factsheets/evaluating-learning-factsheet/", kind:"executive", checkedAt:"2026-07-16", reviewFrequencyMonths:12 },
  { id:"shrm-bask", title:"SHRM Body of Applied Skills and Knowledge", authority:"SHRM", url:"https://www.shrm.org/credentials/certification/exam-preparation/bask", kind:"standard", checkedAt:"2026-07-16", reviewFrequencyMonths:12 },
  { id:"oecd-learning-compass", title:"OECD Learning Compass 2030", authority:"OCDE", url:"https://www.oecd.org/en/data/tools/oecd-learning-compass-2030.html", kind:"research", checkedAt:"2026-07-16", reviewFrequencyMonths:12 },
  { id:"ies-learning-practice", title:"Organizing Instruction and Study to Improve Student Learning", authority:"Institute of Education Sciences", url:"https://ies.ed.gov/ncee/wwc/PracticeGuide/1", kind:"research", checkedAt:"2026-07-16", reviewFrequencyMonths:24 },
  { id:"cast-udl", title:"Universal Design for Learning Guidelines", authority:"CAST", url:"https://udlguidelines.cast.org/", kind:"standard", checkedAt:"2026-07-16", reviewFrequencyMonths:12 },
  { id:"wcag-22", title:"Web Content Accessibility Guidelines 2.2", authority:"W3C", url:"https://www.w3.org/TR/WCAG22/", kind:"standard", checkedAt:"2026-07-16", reviewFrequencyMonths:12 },
  { id:"oecd-ai-principles", title:"OECD AI Principles", authority:"OCDE", url:"https://www.oecd.org/en/topics/ai-principles.html", kind:"standard", checkedAt:"2026-07-16", reviewFrequencyMonths:6 },
  { id:"eu-ai-act", title:"Règlement (UE) 2024/1689 sur l’intelligence artificielle", authority:"EUR-Lex", url:"https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=fr", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:3 },
  { id:"cnil-ai", title:"Recommandations pour développer des systèmes d’IA conformes au RGPD", authority:"CNIL", url:"https://www.cnil.fr/fr/developpement-des-systemes-dia-les-recommandations-de-la-cnil-pour-respecter-le-rgpd", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:3 },
  { id:"anssi-generative-ai", title:"Recommandations de sécurité pour un système d’IA générative", authority:"ANSSI", url:"https://messervices.cyber.gouv.fr/documents-guides/Recommandations_de_s%C3%A9curit%C3%A9_pour_un_syst%C3%A8me_d_IA_g%C3%A9n%C3%A9rative.pdf", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:6 },
  { id:"apec-training-director", title:"Directeur de centre de formation — fiche métier", authority:"Apec", url:"https://www.apec.fr/tous-nos-metiers/ressources-humaines/directeur-centre-de-formation.html", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:6 },
  { id:"france-travail", title:"Offres et référentiels du marché du travail", authority:"France Travail", url:"https://www.francetravail.fr/", kind:"official", checkedAt:"2026-07-16", reviewFrequencyMonths:1 },
];

export const PROFESSIONAL_SOURCES: SourceReference[] = [
  ...CORE_PROFESSIONAL_SOURCES,
  ...SUPPLEMENTAL_PROFESSIONAL_SOURCES,
];

export function findSource(id: string) {
  return PROFESSIONAL_SOURCES.find((source) => source.id === id);
}
