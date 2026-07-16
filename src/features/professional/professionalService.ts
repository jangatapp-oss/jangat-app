import { requireSupabase } from "../../config/supabase";

export type PositioningPayload = {
  competencyId: string;
  dimensions: Record<string, number>;
  status: string;
  aiLevel: string;
};

export type MissionPayload = {
  missionId: string;
  operationalDelivery: string;
  personalExplanation: string;
  criteria: Record<string, string>;
  aiUsage: string[];
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

export async function saveMission(payload: MissionPayload) {
  const client = requireSupabase();
  const userId = await currentUserId();
  const { data, error } = await client.from("mission_submissions").insert({
    user_id: userId,
    mission_key: payload.missionId,
    operational_delivery: payload.operationalDelivery,
    personal_explanation: payload.personalExplanation,
    status: "submitted",
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
    title: `Livrable — ${payload.missionId}`,
    status: "demonstrated",
    evidence_type: "mission_submission",
  });
  if (evidenceResult.error) throw evidenceResult.error;
  return submissionId;
}

export async function loadEvidence() {
  const { data, error } = await requireSupabase().from("evidence_items")
    .select("id,mission_key,title,status,created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
