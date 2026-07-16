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
  const client = requireSupabase();
  const userId = await currentUserId();
  const progressCheck=await client.from("professional_course_progress").select("status").eq("user_id",userId).eq("course_key",payload.courseKey).maybeSingle();
  if(progressCheck.error)throw progressCheck.error;
  const assessmentPassed=["assessment_passed","completed"].includes(progressCheck.data?.status??"");
  const criteriaMet=Object.values(payload.criteria).length>0&&Object.values(payload.criteria).every(result=>result==="Respecté");
  const substantiveDelivery=payload.operationalDelivery.trim().length>=500;
  const substantiveExplanation=payload.personalExplanation.trim().length>=300;
  const demonstrated=assessmentPassed&&criteriaMet&&substantiveDelivery&&substantiveExplanation;
  const countResult=await client.from("mission_submissions").select("id",{count:"exact",head:true}).eq("user_id",userId).eq("mission_key",payload.missionId);
  if(countResult.error)throw countResult.error;
  const version=(countResult.count??0)+1;
  const { data, error } = await client.from("mission_submissions").insert({
    user_id: userId,
    mission_key: payload.missionId,
    operational_delivery: payload.operationalDelivery,
    personal_explanation: payload.personalExplanation,
    status: demonstrated?"demonstrated":"revision_requested",
    version,
  }).select("id").single();
  if (error) throw error;
  const submissionId = String(data.id);
  const criterionRows = Object.entries(payload.criteria).map(([criterion, result]) => ({
    user_id: userId, submission_id: submissionId, criterion, result,
  }));
  if (criterionRows.length) {
    const criteriaResult = await client.from("criterion_results").insert(criterionRows);
    if (criteriaResult.error) throw criteriaResult.error;
  }
  const aiResult = await client.from("ai_usage_records").insert({
    user_id: userId,
    submission_id: submissionId,
    declared_uses: payload.aiUsage,
    human_control_note: payload.personalExplanation,
  });
  if (aiResult.error) throw aiResult.error;
  const explanationResult = await client.from("professional_explanations").insert({
    user_id: userId,
    submission_id: submissionId,
    explanation: payload.personalExplanation,
    written_before_ai: true,
  });
  if (explanationResult.error) throw explanationResult.error;
  const evidenceResult = await client.from("evidence_items").insert({
    user_id: userId,
    mission_key: payload.missionId,
    submission_id: submissionId,
    title: `Livrable — ${payload.missionTitle}`,
    status: demonstrated?"demonstrated":"in_progress",
    evidence_type: "mission_submission",
  });
  if (evidenceResult.error) throw evidenceResult.error;
  const progressResult=await client.from("professional_course_progress").upsert({
    user_id:userId,course_key:payload.courseKey,status:demonstrated?"completed":"mission_submitted",
    completed_at:demonstrated?new Date().toISOString():null,updated_at:new Date().toISOString(),
  },{onConflict:"user_id,course_key"});
  if(progressResult.error)throw progressResult.error;
  return {submissionId,demonstrated,version};
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
  const client=requireSupabase();const userId=await currentUserId();
  const countResult=await client.from("professional_defense_submissions").select("id",{count:"exact",head:true}).eq("user_id",userId);
  if(countResult.error)throw countResult.error;
  const version=(countResult.count??0)+1;
  const demonstrated=Object.values(payload.criterionResults).length>=5&&Object.values(payload.criterionResults).every(value=>value==="Respecté");
  const {data,error}=await client.from("professional_defense_submissions").insert({
    user_id:userId,version,dossier:payload.dossier,presentation_text:payload.presentationText,
    contradictory_answers:payload.contradictoryAnswers,ai_contribution:payload.aiContribution,
    human_decisions:payload.humanDecisions,team_direction:payload.teamDirection,
    transmission_plan:payload.transmissionPlan,criterion_results:payload.criterionResults,
    status:demonstrated?"demonstrated":"revision_requested",
  }).select("id").single();
  if(error)throw error;
  if(demonstrated){
    const evidenceResult=await client.from("evidence_items").insert({
      user_id:userId,mission_key:"final-defense",title:"Soutenance professionnelle finale",
      status:"demonstrated",evidence_type:"professional_defense",
    });
    if(evidenceResult.error)throw evidenceResult.error;
  }
  return {id:String(data.id),version,demonstrated};
}

export async function saveCareerDocument(documentType:string,content:Record<string,unknown>,evidenceItemIds:string[]) {
  const userId=await currentUserId();
  const {error}=await requireSupabase().from("professional_career_documents").upsert({
    user_id:userId,document_type:documentType,content,evidence_item_ids:evidenceItemIds,
    status:"provisional",generated_at:new Date().toISOString(),updated_at:new Date().toISOString(),
  },{onConflict:"user_id,document_type"});
  if(error)throw error;
}
