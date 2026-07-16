import { requireSupabase } from "../../config/supabase";

export type PositioningPayload = {
  competencyId: string;
  dimensions: Record<string, number>;
  status: string;
  aiLevel: string;
};

export type MissionPayload = {
  missionId: string;
  missionTitle: string;
  courseKey: string;
  operationalDelivery: string;
  personalExplanation: string;
  criteria: Record<string, string>;
  aiUsage: string[];
};

export type CourseProgress = {
  course_key: string;
  positioning_scores: Record<string, number>;
  recommended_track: string | null;
  status: string;
  content_viewed_at: string | null;
  completed_at: string | null;
};

async function currentUserId() {
  const user = (await requireSupabase().auth.getUser()).data.user;
  if (!user) throw new Error("Session expirée");
  return user.id;
}

export async function savePositioning(payload: PositioningPayload) {
  const userId = await currentUserId();
  const { error } = await requireSupabase().from("positioning_assessments").upsert({
    user_id: userId,
    competency_key: payload.competencyId,
    dimensions: payload.dimensions,
    competency_status: payload.status,
    ai_level: payload.aiLevel,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,competency_key" });
  if (error) throw error;
}

export async function saveCoursePositioning(courseKey:string,scores:Record<string,number>,recommendedTrack:string) {
  const userId=await currentUserId();
  const {error}=await requireSupabase().from("professional_course_progress").upsert({
    user_id:userId,
    course_key:courseKey,
    positioning_scores:scores,
    recommended_track:recommendedTrack,
    status:"positioned",
    updated_at:new Date().toISOString(),
  },{onConflict:"user_id,course_key"});
  if(error)throw error;
}

export async function markCourseViewed(courseKey:string) {
  const userId=await currentUserId();
  const {error}=await requireSupabase().from("professional_course_progress").upsert({
    user_id:userId,
    course_key:courseKey,
    status:"in_progress",
    content_viewed_at:new Date().toISOString(),
    updated_at:new Date().toISOString(),
  },{onConflict:"user_id,course_key"});
  if(error)throw error;
}

export async function loadCourseProgress():Promise<CourseProgress[]> {
  const {data,error}=await requireSupabase().from("professional_course_progress")
    .select("course_key,positioning_scores,recommended_track,status,content_viewed_at,completed_at");
  if(error)throw error;
  return (data??[]) as CourseProgress[];
}

export async function saveAssessmentAttempt(courseKey:string,answers:Record<string,string>,score:number,corrections:string[]) {
  const client=requireSupabase();const userId=await currentUserId();
  const countResult=await client.from("professional_assessment_attempts").select("id",{count:"exact",head:true}).eq("user_id",userId).eq("course_key",courseKey);
  if(countResult.error)throw countResult.error;
  const attemptNumber=(countResult.count??0)+1;const passed=score>=80;
  const {error}=await client.from("professional_assessment_attempts").insert({
    user_id:userId,course_key:courseKey,attempt_number:attemptNumber,answers,score,passed,detailed_corrections:corrections,
  });
  if(error)throw error;
  const progressResult=await client.from("professional_course_progress").upsert({
    user_id:userId,course_key:courseKey,status:passed?"assessment_passed":"in_progress",updated_at:new Date().toISOString(),
  },{onConflict:"user_id,course_key"});
  if(progressResult.error)throw progressResult.error;
  return {attemptNumber,passed};
}

export async function saveMission(payload: MissionPayload) {
  const { data, error } = await requireSupabase().rpc("submit_professional_mission", {
    p_course_key: payload.courseKey,
    p_mission_key: payload.missionId,
    p_mission_title: payload.missionTitle,
    p_operational_delivery: payload.operationalDelivery,
    p_personal_explanation: payload.personalExplanation,
    p_criteria: payload.criteria,
    p_ai_usage: payload.aiUsage,
  });
  if (error) throw error;
  return data as { submissionId: string; demonstrated: boolean; version: number };
}

export async function loadEvidence() {
  const { data, error } = await requireSupabase().from("evidence_items")
    .select("id,mission_key,title,status,created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function saveDefense(payload:{
  dossier:Record<string,string>;presentationText:string;contradictoryAnswers:Record<string,string>;
  aiContribution:string;humanDecisions:string;teamDirection:string;transmissionPlan:string;
  criterionResults:Record<string,string>;
}) {
  const { data, error } = await requireSupabase().rpc("submit_professional_defense", {
    p_dossier: payload.dossier,
    p_presentation_text: payload.presentationText,
    p_contradictory_answers: payload.contradictoryAnswers,
    p_ai_contribution: payload.aiContribution,
    p_human_decisions: payload.humanDecisions,
    p_team_direction: payload.teamDirection,
    p_transmission_plan: payload.transmissionPlan,
    p_criterion_results: payload.criterionResults,
  });
  if (error) throw error;
  return data as { id: string; version: number; demonstrated: boolean };
}

export async function saveCareerDocument(documentType:string,content:Record<string,unknown>,evidenceItemIds:string[]) {
  const userId=await currentUserId();
  const {error}=await requireSupabase().from("professional_career_documents").upsert({
    user_id:userId,document_type:documentType,content,evidence_item_ids:evidenceItemIds,
    status:"provisional",generated_at:new Date().toISOString(),updated_at:new Date().toISOString(),
  },{onConflict:"user_id,document_type"});
  if(error)throw error;
}
