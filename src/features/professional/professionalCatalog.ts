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

export function isProfessionalPathUnlocked(completedLessons: string[], explicitlyValidated = false) {
  return explicitlyValidated || LESSONS.every((lesson) => completedLessons.includes(lesson.id));
}
