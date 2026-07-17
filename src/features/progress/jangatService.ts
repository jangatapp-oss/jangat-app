import { requireSupabase } from "../../config/supabase";
import { buildAppUrl } from "../../config/appUrl";
import { debugAuthRequest } from "../auth/authErrors";
import type { JangatState } from "./store";

export const COURSE_UUID = "10000000-0000-4000-8000-000000000001";

export async function signUp(email:string,password:string,firstName:string) {
  const client=requireSupabase();
  const emailRedirectTo=buildAppUrl("/auth/callback");
  debugAuthRequest({action:"signUp",email,redirectTo:emailRedirectTo});
  const {data,error}=await client.auth.signUp({
    email,
    password,
    options:{
      data:{first_name:firstName},
      emailRedirectTo,
    },
  });
  if(error)throw error; return data;
}
export async function signIn(email:string,password:string){debugAuthRequest({action:"signInWithPassword",email});const {data,error}=await requireSupabase().auth.signInWithPassword({email,password});if(error)throw error;return data}
export async function signOut(){debugAuthRequest({action:"signOut"});const {error}=await requireSupabase().auth.signOut();if(error)throw error}
export async function resetPassword(email:string){const redirectTo=buildAppUrl("/reset-password");debugAuthRequest({action:"resetPasswordForEmail",email,redirectTo});const {error}=await requireSupabase().auth.resetPasswordForEmail(email,{redirectTo});if(error)throw error}
export async function ensureProfile(){const {data,error}=await requireSupabase().rpc("ensure_jangat_profile");if(error)throw error;return data}

export async function loadServerState():Promise<Partial<JangatState>> {
  const client=requireSupabase(); await ensureProfile();
  const [profileRes,gameRes,diagRes,attemptRes]=await Promise.all([
    client.from("profiles").select("*").single(),
    client.from("user_gamification").select("*").single(),
    client.from("diagnostic_results").select("*").order("created_at" as never,{ascending:false}).limit(1).maybeSingle(),
    client.from("lesson_attempts").select("*").eq("status","completed"),
  ]);
  if(profileRes.error)throw profileRes.error;if(gameRes.error)throw gameRes.error;
  const p=profileRes.data;const g=gameRes.data;
  const lessonIds=(attemptRes.data||[]).map(x=>x.lesson_id);
  const lessonsRes=lessonIds.length?await client.from("lessons").select("id,app_id").in("id",lessonIds):{data:[],error:null};
  if(lessonsRes.error)throw lessonsRes.error;
  return {authenticated:true,onboarded:Boolean(p.onboarding_completed),profile:{firstName:p.first_name,email:p.email,goal:p.professional_goal||"",level:p.declared_level||"À réactiver",dailyGoal:p.daily_minutes||15,voice:p.voice_enabled,speechRate:Number(p.speech_rate)||1,theme:p.theme==="dark"?"dark":"light"},xp:g.xp,streak:g.current_streak,hearts:g.hearts,lastActivity:g.last_active_date,currentCourseValidated:Boolean(p.current_course_validated),completedLessons:(lessonsRes.data||[]).map(x=>x.app_id),diagnostic:diagRes.data?{global:diagRes.data.global_score,domains:diagRes.data.domain_scores as Record<string,number>}:null};
}
export async function saveProfile(state:JangatState["profile"],onboarded=true){const {error}=await requireSupabase().from("profiles").update({first_name:state.firstName,professional_goal:state.goal,declared_level:state.level,daily_minutes:state.dailyGoal,voice_enabled:state.voice,speech_rate:state.speechRate,theme:state.theme,onboarding_completed:onboarded}).eq("id",(await requireSupabase().auth.getUser()).data.user!.id);if(error)throw error}
export async function finalizeDiagnostic(answers:Record<string,string>){const {data,error}=await requireSupabase().rpc("finalize_diagnostic",{p_answers:answers});if(error)throw error;return data as {global_score:number;domain_scores:Record<string,number>;xp:number;hearts:number;streak:number}}
export async function recordStep(lessonId:string,stepKey:string,answer:unknown){const key=crypto.randomUUID();const {data,error}=await requireSupabase().rpc("record_step_attempt",{p_lesson_id:lessonId,p_step_key:stepKey,p_answer:answer as never,p_idempotency_key:key});if(error)throw error;return data}
export async function completeLesson(lessonId:string){const key=`complete:${lessonId}`;const {data,error}=await requireSupabase().rpc("complete_lesson",{p_lesson_id:lessonId,p_idempotency_key:key});if(error)throw error;return data as {xp:number;hearts:number;streak:number}}
export async function syncDraft(stepKey:string,text:string,idempotencyKey:string){
  const client=requireSupabase();
  const {data:{user},error:userError}=await client.auth.getUser();
  if(userError)throw userError;
  if(!user)throw new Error("Session expirée");

  // open_responses.step_id est une clé UUID. L’interface manipule des clés lisibles
  // comme « m1-l4:1 » : il faut donc d’abord résoudre la vraie ligne lesson_steps.
  let {data:step,error:stepError}=await client
    .from("lesson_steps")
    .select("id")
    .eq("step_key",stepKey)
    .maybeSingle();
  if(stepError)throw stepError;

  // Les premières données Supabase ne contiennent qu’une étape serveur par leçon
  // (par exemple m2-l4:0), alors que l’interface peut enregistrer m2-l4:1 ou :2.
  // Dans ce cas, on rattache le brouillon à l’étape serveur de la même leçon.
  if(!step){
    const lessonAppId=stepKey.split(":")[0];
    const {data:lesson,error:lessonError}=await client
      .from("lessons")
      .select("id")
      .eq("app_id",lessonAppId)
      .maybeSingle();
    if(lessonError)throw lessonError;
    if(lesson){
      const fallback=await client
        .from("lesson_steps")
        .select("id")
        .eq("lesson_id",lesson.id)
        .order("display_order",{ascending:true})
        .limit(1)
        .maybeSingle();
      if(fallback.error)throw fallback.error;
      step=fallback.data;
    }
  }
  if(!step)throw new Error(`Étape introuvable sur le serveur : ${stepKey}`);

  const {data:existing,error:existingError}=await client
    .from("open_responses")
    .select("status,first_version")
    .eq("user_id",user.id)
    .eq("step_id",step.id)
    .maybeSingle();
  if(existingError)throw existingError;
  if(existing&&existing.status!=="draft"&&existing.first_version!==text)throw new Error("CONFLICT");

  const {error}=await client.from("open_responses").upsert({
    user_id:user.id,
    step_id:step.id,
    first_version:text,
    status:"draft",
    idempotency_key:idempotencyKey,
    updated_at:new Date().toISOString(),
  } as never,{onConflict:"user_id,step_id"});
  if(error)throw error;
}
