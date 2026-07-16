-- Soumissions professionnelles atomiques et validation indépendante.
-- L'apprenant peut soumettre son travail, mais ne peut plus s'attribuer lui-même
-- les statuts demonstrated/confirmed.

create unique index if not exists uq_mission_submission_version
  on public.mission_submissions(user_id, mission_key, version);

revoke insert, update, delete on public.criterion_results from authenticated;
revoke insert, update, delete on public.ai_usage_records from authenticated;
revoke insert, update, delete on public.professional_explanations from authenticated;
revoke insert, update, delete on public.evidence_items from authenticated;
revoke insert, update, delete on public.mission_submissions from authenticated;
revoke insert, update, delete on public.professional_defense_submissions from authenticated;

create or replace function public.submit_professional_mission(
  p_course_key text,
  p_mission_key text,
  p_mission_title text,
  p_operational_delivery text,
  p_personal_explanation text,
  p_criteria jsonb,
  p_ai_usage text[] default '{}'
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_status text;
  v_version integer;
  v_submission uuid;
begin
  if v_user is null then raise exception 'Session expirée'; end if;
  if length(trim(p_operational_delivery)) < 500 then raise exception 'Livrable trop court'; end if;
  if length(trim(p_personal_explanation)) < 300 then raise exception 'Explication personnelle trop courte'; end if;

  select status into v_status
  from public.professional_course_progress
  where user_id=v_user and course_key=p_course_key
  for update;
  if v_status not in ('assessment_passed','mission_submitted','completed') then
    raise exception 'Évaluation du domaine non réussie';
  end if;

  select coalesce(max(version),0)+1 into v_version
  from public.mission_submissions
  where user_id=v_user and mission_key=p_mission_key;

  insert into public.mission_submissions(
    user_id,mission_key,operational_delivery,personal_explanation,status,version
  ) values (
    v_user,p_mission_key,p_operational_delivery,p_personal_explanation,'submitted',v_version
  ) returning id into v_submission;

  insert into public.criterion_results(user_id,submission_id,criterion,result)
  select v_user,v_submission,key,value#>>'{}'
  from jsonb_each(p_criteria);

  insert into public.ai_usage_records(user_id,submission_id,declared_uses,human_control_note)
  values(v_user,v_submission,coalesce(p_ai_usage,'{}'),p_personal_explanation);

  insert into public.professional_explanations(user_id,submission_id,explanation,written_before_ai)
  values(v_user,v_submission,p_personal_explanation,true);

  insert into public.evidence_items(
    user_id,mission_key,submission_id,title,status,evidence_type
  ) values (
    v_user,p_mission_key,v_submission,'Livrable — '||p_mission_title,'in_progress','mission_submission'
  );

  update public.professional_course_progress
  set status='mission_submitted',updated_at=now()
  where user_id=v_user and course_key=p_course_key;

  return jsonb_build_object('submissionId',v_submission,'version',v_version,'demonstrated',false);
end;
$$;

grant execute on function public.submit_professional_mission(text,text,text,text,text,jsonb,text[]) to authenticated;

create or replace function public.submit_professional_defense(
  p_dossier jsonb,
  p_presentation_text text,
  p_contradictory_answers jsonb,
  p_ai_contribution text,
  p_human_decisions text,
  p_team_direction text,
  p_transmission_plan text,
  p_criterion_results jsonb
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_version integer;
  v_id uuid;
begin
  if v_user is null then raise exception 'Session expirée'; end if;
  if length(trim(p_presentation_text)) < 200 then raise exception 'Présentation trop courte'; end if;

  select coalesce(max(version),0)+1 into v_version
  from public.professional_defense_submissions where user_id=v_user;

  insert into public.professional_defense_submissions(
    user_id,version,dossier,presentation_text,contradictory_answers,
    ai_contribution,human_decisions,team_direction,transmission_plan,
    criterion_results,status
  ) values (
    v_user,v_version,p_dossier,p_presentation_text,p_contradictory_answers,
    p_ai_contribution,p_human_decisions,p_team_direction,p_transmission_plan,
    p_criterion_results,'submitted'
  ) returning id into v_id;

  return jsonb_build_object('id',v_id,'version',v_version,'demonstrated',false);
end;
$$;

grant execute on function public.submit_professional_defense(jsonb,text,jsonb,text,text,text,text,jsonb) to authenticated;
