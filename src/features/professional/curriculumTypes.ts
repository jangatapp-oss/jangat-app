export type PositioningDimension =
  | "know"
  | "do_without_ai"
  | "do_with_ai"
  | "control"
  | "explain"
  | "direct"
  | "transmit"
  | "prove";

export type TrackRecommendation =
  | "direct_validation"
  | "short_update"
  | "consolidation"
  | "full_course"
  | "advanced_mission";

export type PositioningQuestion = {
  dimension: PositioningDimension;
  prompt: string;
  evidenceHint: string;
};

export type KnowledgeCheck = {
  id: string;
  prompt: string;
  choices: string[];
  correct: string;
  correction: string;
};

export type CourseMission = {
  id: string;
  title: string;
  context: string;
  deliverable: string;
  criticalCriterion: string;
  criteria: string[];
};

export type CompleteProfessionalCourse = {
  id: string;
  order: number;
  phase: 1 | 2 | 3 | 4 | 5;
  title: string;
  shortTitle: string;
  objective: string;
  targetRole: string;
  durationHours: number;
  lastUpdated: string;
  sourceIds: string[];
  positioning: PositioningQuestion[];
  diagnosticAdvice: Record<TrackRecommendation, string>;
  essentials: string[];
  vocabulary: Array<{ term: string; definition: string }>;
  methodSteps: Array<{ title: string; detail: string; control: string }>;
  tools: Array<{ name: string; use: string }>;
  templates: Array<{ name: string; structure: string }>;
  checkpoints: string[];
  commonErrors: string[];
  risks: Array<{ risk: string; prevention: string }>;
  example: { context: string; approach: string; result: string };
  guidedPractice: { prompt: string; steps: string[] };
  mission: CourseMission;
  withoutAi: string;
  withAi: string;
  aiAuditChecklist: string[];
  deliverableTemplate: string[];
  explanations: { simple: string; professional: string; defense: string };
  transmissionActivity: string;
  reflexCard: string[];
  knowledgeCheck: KnowledgeCheck[];
  correctionGuide: string[];
  logixApplication: string;
  competencies: string[];
};

export type SourceReference = {
  id: string;
  title: string;
  authority: string;
  url: string;
  kind: "official" | "standard" | "research" | "executive";
  checkedAt: string;
  reviewFrequencyMonths: number;
};

export const REQUIRED_POSITIONING_DIMENSIONS: PositioningDimension[] = [
  "know",
  "do_without_ai",
  "do_with_ai",
  "control",
  "explain",
  "direct",
  "transmit",
  "prove",
];

export function recommendTrack(scores: Record<PositioningDimension, number>): TrackRecommendation {
  const values = REQUIRED_POSITIONING_DIMENSIONS.map((dimension) => scores[dimension] ?? 0);
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const proof = scores.prove ?? 0;
  const direction = scores.direct ?? 0;
  if (average >= 6 && proof >= 6 && direction >= 5) return "advanced_mission";
  if (average >= 5 && proof >= 5) return "direct_validation";
  if (average >= 4) return "short_update";
  if (average >= 2.5) return "consolidation";
  return "full_course";
}

export function validateCompleteCourse(course: CompleteProfessionalCourse) {
  return (
    course.positioning.length === REQUIRED_POSITIONING_DIMENSIONS.length &&
    course.essentials.length >= 3 &&
    course.vocabulary.length >= 4 &&
    course.methodSteps.length >= 4 &&
    course.tools.length >= 3 &&
    course.templates.length >= 2 &&
    course.checkpoints.length >= 3 &&
    course.commonErrors.length >= 3 &&
    course.risks.length >= 3 &&
    course.knowledgeCheck.length >= 3 &&
    course.mission.criteria.length >= 3 &&
    course.sourceIds.length >= 2 &&
    course.competencies.length >= 3
  );
}
