import { LEADERSHIP_AI_COURSES } from "./curriculumLeadershipAi";
import { OPERATIONS_COURSES } from "./curriculumOperations";
import { PEDAGOGY_COURSES } from "./curriculumPedagogy";

export const ALL_PROFESSIONAL_COURSES = [
  ...PEDAGOGY_COURSES,
  ...OPERATIONS_COURSES,
  ...LEADERSHIP_AI_COURSES,
].sort((a,b)=>a.order-b.order);

export const PROFESSIONAL_PHASES = [
  { id:1, title:"Phase 1 — Consolidation du métier", description:"Renforcer l’ingénierie, les sciences de l’apprentissage, le multimodal, le digital et la mesure de l’impact." },
  { id:2, title:"Phase 2 — Responsable de formation", description:"Piloter besoins, compétences, administration, droit, qualité, financements, budget, projet et reporting." },
  { id:3, title:"Phase 3 — Direction", description:"Construire la stratégie, le modèle économique, le management, le leadership, la négociation et le développement." },
  { id:4, title:"Phase 4 — Certification et transformation", description:"Maîtriser RNCP/RS, professionnalisation des équipes et transformation par l’intelligence artificielle." },
  { id:5, title:"Phase 5 — Professionnalisation finale", description:"Réaliser les missions complexes, soutenir, prouver, cibler les postes et réactualiser les outils de carrière." },
] as const;
