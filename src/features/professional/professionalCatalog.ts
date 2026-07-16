import { LESSONS } from "../content/catalog";

export const PROFESSIONAL_PATH = {
  id: "educoncret-director-ai",
  title: "Directeur de formation et ingénieur pédagogique augmenté par l’IA",
  subtitle: "Parcours professionnel EduConcret",
  prerequisiteCourseId: "jangat-ip-2026",
};

export const EDUCONCRET_LEVELS = [
  "Découverte",
  "Application guidée",
  "Pratique autonome",
  "Maîtrise opérationnelle",
  "Pilotage",
  "Direction",
  "Transmission et transformation",
] as const;

export const AI_LEVELS = [
  { id: "A", label: "Sans IA", description: "Je réalise et j’explique le travail sans assistance." },
  { id: "B", label: "Avec IA contrôlée", description: "J’utilise l’IA, je vérifie et je justifie chaque choix." },
  { id: "C", label: "Pilotage IA", description: "Je conçois le processus, contrôle les risques et arbitre le résultat." },
] as const;

export const COMPETENCY_STATUSES = [
  "non évalué",
  "déclaré",
  "en cours",
  "démontré",
  "confirmé",
] as const;

export const POSITIONING_DIMENSIONS = [
  "Connaissances",
  "Méthodes",
  "Outils",
  "Production",
  "Analyse",
  "Décision",
  "Conformité",
  "Communication",
  "Management",
  "Explication personnelle",
] as const;

export const CV_DECLARED_COMPETENCIES = [
  { id: "cv-planning", domain: "pilotage", title: "Planifier des formations présentielles et distancielles" },
  { id: "cv-logistics", domain: "operations", title: "Organiser la logistique, les intervenants et les ressources" },
  { id: "cv-admin", domain: "operations", title: "Assurer le suivi administratif et les tableaux de bord" },
  { id: "cv-budget", domain: "budget", title: "Suivre un budget et produire un reporting" },
  { id: "cv-quality", domain: "quality", title: "Formaliser des procédures et assurer la traçabilité documentaire" },
  { id: "cv-needs", domain: "pedagogy", title: "Analyser les besoins et concevoir des parcours" },
  { id: "cv-coordination", domain: "management", title: "Coordonner des intervenants et des parties prenantes" },
  { id: "cv-digital", domain: "digital", title: "Utiliser Moodle, Canvas, Teams et des outils de gestion de projet" },
] as const;

export type ProfessionalDomain = {
  id: string;
  title: string;
  target: string;
  notion: string;
  method: string;
  example: string;
  sourceIds: string[];
  missionId: string;
  status: "operational" | "preparatory";
};

export const PROFESSIONAL_DOMAINS: ProfessionalDomain[] = [
  { id:"quality", title:"Qualité et Qualiopi", target:"Passer du suivi documentaire au pilotage probant de la qualité.", notion:"Une preuve utile démontre une pratique réelle, datée, cohérente et améliorable.", method:"Cartographier indicateur, pratique, preuve, responsable, fréquence et risque.", example:"Diagnostic à blanc d’un organisme EduConcret avant audit.", sourceIds:["qualiopi-v9"], missionId:"qualiopi-audit", status:"operational" },
  { id:"certification", title:"RNCP et Répertoire spécifique", target:"Vérifier une certification avant de construire une offre.", notion:"Une formation n’est pas automatiquement une certification ; l’état de la fiche et l’habilitation doivent être vérifiés.", method:"Contrôler registre, statut actif, certificateur, échéance, blocs et habilitation.", example:"Note de décision go/no-go pour un projet de préparation certifiante.", sourceIds:["fc-vademecum-2026","fc-search"], missionId:"rncp-check", status:"operational" },
  { id:"funding", title:"OPCO et financement", target:"Construire un dossier finançable sans promettre une prise en charge.", notion:"Les critères et plafonds dépendent de l’OPCO, de la branche et du dispositif.", method:"Qualifier entreprise, public, dispositif, coûts, pièces et calendrier.", example:"Dossier de demande avec checklist et hypothèses explicites.", sourceIds:["service-public-opco"], missionId:"opco-file", status:"operational" },
  { id:"budget", title:"Budget et modèle économique", target:"Arbitrer une action à partir de coûts complets et de scénarios.", notion:"Un budget de formation distingue coûts directs, indirects, recettes, marge, trésorerie et risques.", method:"Construire trois scénarios et expliciter les hypothèses.", example:"Budget d’un parcours hybride de 12 participants.", sourceIds:["service-public-contribution"], missionId:"training-budget", status:"operational" },
  { id:"strategy", title:"Stratégie et politique compétences", target:"Relier besoins métiers, priorités et plan d’action.", notion:"Une politique compétences transforme des écarts prioritaires en portefeuille d’actions mesurables.", method:"Diagnostic, priorisation, feuille de route, indicateurs et revue.", example:"Note stratégique EduConcret sur douze mois.", sourceIds:["fc-vademecum-2026"], missionId:"strategy-note", status:"operational" },
  { id:"management", title:"Management et gouvernance", target:"Organiser la décision, la délégation et le suivi.", notion:"Le management d’un dispositif clarifie rôles, décisions, risques, rituels et escalades.", method:"RACI, objectifs, points de contrôle et retour d’expérience.", example:"Plan de management d’une équipe pédagogique distribuée.", sourceIds:["qualiopi-v9"], missionId:"management-plan", status:"operational" },
  { id:"ai", title:"Ingénierie pédagogique augmentée par l’IA", target:"Piloter l’IA sans déléguer le jugement professionnel.", notion:"L’IA assiste la recherche, la structuration et la critique ; la décision, la vérification et la responsabilité restent humaines.", method:"Cadrer, produire une première analyse personnelle, solliciter l’IA, vérifier les sources, documenter les changements.", example:"Revue critique d’un scénario généré avec journal d’usage.", sourceIds:["oecd-ai"], missionId:"ai-design-review", status:"operational" },
  { id:"commercial", title:"Développement commercial", target:"Structurer une offre et une proposition de valeur vérifiable.", notion:"Une offre crédible relie problème, public, résultat, preuve, prix et conditions.", method:"Entretien découverte, qualification, proposition et critères de succès.", example:"Offre pilote EduConcret pour une TPE.", sourceIds:["qualiopi-v9"], missionId:"commercial-offer", status:"preparatory" },
  { id:"hr", title:"RH et marché de l’emploi", target:"Relier preuves du portfolio et exigences d’un poste.", notion:"Une compétence de CV doit être soutenue par une situation, une action et un résultat.", method:"Analyser les offres, extraire les exigences, comparer aux preuves.", example:"Matrice écarts/preuves pour un poste de directeur de formation.", sourceIds:["france-travail"], missionId:"job-market", status:"preparatory" },
];

export type ProfessionalMission = {
  id: string;
  title: string;
  domainId: string;
  context: string;
  operationalDeliverable: string;
  criticalCriterion: string;
  criteria: string[];
};

export const PROFESSIONAL_MISSIONS: ProfessionalMission[] = [
  { id:"qualiopi-audit", domainId:"quality", title:"Réaliser un diagnostic Qualiopi à blanc", context:"EduConcret prépare une revue interne avant une première démarche de certification.", operationalDeliverable:"Matrice indicateurs, pratiques, preuves, écarts, risques et plan d’action.", criticalCriterion:"Aucune conformité ne peut être affirmée sans preuve identifiable.", criteria:["Chaque constat renvoie à une preuve ou indique son absence.","Les écarts sont priorisés par risque.","Le plan d’action nomme responsable, délai et résultat attendu."] },
  { id:"rncp-check", domainId:"certification", title:"Vérifier une certification RNCP ou RS", context:"EduConcret envisage une préparation à une certification externe.", operationalDeliverable:"Note de vérification datée avec URL officielle, statut, échéance, certificateur et habilitation.", criticalCriterion:"La fiche officielle et son statut actif doivent être vérifiés à la date de la décision.", criteria:["La différence formation/certification est explicite.","La date d’échéance est relevée.","L’habilitation à préparer est vérifiée ou signalée absente."] },
  { id:"opco-file", domainId:"funding", title:"Préparer un dossier OPCO", context:"Une TPE souhaite financer une action EduConcret.", operationalDeliverable:"Checklist de recevabilité, budget, calendrier, pièces et questions à confirmer auprès de l’OPCO.", criticalCriterion:"Aucune prise en charge ne doit être présentée comme acquise.", criteria:["L’OPCO et la branche restent à confirmer si non prouvés.","Les coûts et pièces sont listés.","Les hypothèses sont séparées des faits."] },
  { id:"training-budget", domainId:"budget", title:"Construire un budget de formation", context:"Un parcours hybride est prévu pour douze participants.", operationalDeliverable:"Budget complet avec hypothèses et scénarios prudent, central et ambitieux.", criticalCriterion:"Le calcul doit distinguer charges, recettes et trésorerie.", criteria:["Les coûts directs et indirects sont séparés.","Les hypothèses sont modifiables.","Un risque et une mesure de maîtrise sont documentés."] },
  { id:"strategy-note", domainId:"strategy", title:"Rédiger une note stratégique compétences", context:"EduConcret doit choisir trois priorités de développement à douze mois.", operationalDeliverable:"Diagnostic, arbitrages, feuille de route et tableau de pilotage.", criticalCriterion:"Chaque priorité doit découler d’un besoin documenté.", criteria:["Les choix et renoncements sont explicites.","Les indicateurs mesurent des effets.","Une revue de décision est planifiée."] },
  { id:"management-plan", domainId:"management", title:"Préparer un plan de management", context:"Une équipe pédagogique distribuée doit produire un parcours en huit semaines.", operationalDeliverable:"RACI, rituels, règles de décision, risques et boucle de retour.", criticalCriterion:"Les responsabilités critiques ne doivent pas rester sans propriétaire.", criteria:["Les rôles sont non ambigus.","Les points de contrôle sont datés.","Les escalades et arbitrages sont définis."] },
  { id:"ai-design-review", domainId:"ai", title:"Auditer un livrable pédagogique assisté par IA", context:"Un scénario de module a été proposé par une IA générative.", operationalDeliverable:"Version corrigée, journal des prompts, vérifications, sources et décisions humaines.", criticalCriterion:"Une explication personnelle doit précéder l’aide de l’IA.", criteria:["Les informations sensibles sont exclues.","Les affirmations sont vérifiées.","Les modifications humaines sont justifiées."] },
  { id:"commercial-offer", domainId:"commercial", title:"Structurer une offre pilote", context:"Préparer une offre EduConcret sans données commerciales réelles.", operationalDeliverable:"Canevas d’offre, hypothèses de prix et questions de découverte.", criticalCriterion:"Les hypothèses ne doivent pas être présentées comme des résultats de marché.", criteria:["Le problème client est formulé.","La valeur est mesurable.","Les limites du pilote sont explicites."] },
  { id:"job-market", domainId:"hr", title:"Analyser une offre d’emploi", context:"Comparer une offre réelle avec le portfolio démontré.", operationalDeliverable:"Matrice exigences, preuves, écarts et plan de progression.", criticalCriterion:"Aucune compétence ne peut être déclarée démontrée sans preuve associée.", criteria:["Les exigences sont citées fidèlement.","Chaque preuve est reliée à une réalisation.","Les écarts restent visibles."] },
];

export const SOURCE_REGISTRY = [
  { id:"qualiopi-v9", title:"Guide de lecture Qualiopi — version 9", authority:"Ministère du Travail", url:"https://travail-emploi.gouv.fr/sites/travail-emploi/files/2024-07/guide_qualiopi_0.pdf", checkedAt:"2026-07-16" },
  { id:"fc-vademecum-2026", title:"Vademecum de la certification professionnelle 2026", authority:"France compétences", url:"https://www.francecompetences.fr/app/uploads/2026/01/20260121_FC_Vademecum.pdf", checkedAt:"2026-07-16" },
  { id:"fc-search", title:"Rechercher une certification", authority:"France compétences", url:"https://www.francecompetences.fr/recherche-resultats/", checkedAt:"2026-07-16" },
  { id:"service-public-opco", title:"Contrat de professionnalisation et prise en charge OPCO", authority:"Service Public", url:"https://entreprendre.service-public.fr/vosdroits/F15478", checkedAt:"2026-07-16" },
  { id:"service-public-contribution", title:"Contribution à la formation professionnelle", authority:"Service Public", url:"https://entreprendre.service-public.fr/vosdroits/F22570?language=fr", checkedAt:"2026-07-16" },
  { id:"oecd-ai", title:"Principes de l’OCDE sur l’intelligence artificielle", authority:"OCDE", url:"https://oecd.ai/en/ai-principles", checkedAt:"2026-07-16" },
  { id:"france-travail", title:"Marché du travail et offres d’emploi", authority:"France Travail", url:"https://www.francetravail.fr/", checkedAt:"2026-07-16" },
] as const;

export function isProfessionalPathUnlocked(completedLessons: string[], explicitlyValidated = false) {
  return explicitlyValidated || LESSONS.every((lesson) => completedLessons.includes(lesson.id));
}

export function canValidateMission(personalExplanation: string, operationalDelivery: string) {
  return personalExplanation.trim().length >= 80 && operationalDelivery.trim().length >= 120;
}

export function buildCvSuggestions(evidence: Array<{ title: string; status: string }>) {
  return evidence
    .filter((item) => item.status === "demonstrated" || item.status === "confirmed")
    .map((item) => `A démontré sa capacité à ${item.title.toLocaleLowerCase("fr-FR")} dans une production évaluée et traçable.`);
}
