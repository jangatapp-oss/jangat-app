create extension if not exists pgcrypto;
do $$ begin create type publication_status as enum ('draft','published','deprecated'); exception when duplicate_object then null; end $$;
do $$ begin create type open_response_status as enum ('draft','submitted','self_reviewed','revised'); exception when duplicate_object then null; end $$;

create table if not exists public.courses(id uuid primary key,title text not null,description text,content_revision int not null default 1,content_hash text not null,publication_status publication_status not null default 'draft',updated_at timestamptz not null default now(),deprecated_at timestamptz);
create table if not exists public.course_sections(id uuid primary key,course_id uuid not null references courses on delete cascade,title text not null,display_order int not null,content_revision int not null default 1,content_hash text not null,publication_status publication_status not null default 'draft',updated_at timestamptz not null default now());
create table if not exists public.course_units(id uuid primary key,section_id uuid not null references course_sections on delete cascade,title text not null,description text,display_order int not null,content_revision int not null default 1,content_hash text not null,publication_status publication_status not null default 'draft',updated_at timestamptz not null default now());
create table if not exists public.lessons(id uuid primary key,unit_id uuid not null references course_units on delete cascade,title text not null,objective text,duration_minutes int not null default 5,display_order int not null,content_revision int not null default 1,content_hash text not null,publication_status publication_status not null default 'draft',updated_at timestamptz not null default now());
create table if not exists public.lesson_steps(id uuid primary key,lesson_id uuid not null references lessons on delete cascade,step_type text not null,content jsonb not null default '{}',display_order int not null,content_revision int not null default 1,content_hash text not null,publication_status publication_status not null default 'draft',updated_at timestamptz not null default now());
create table if not exists public.questions(id uuid primary key,lesson_step_id uuid references lesson_steps on delete cascade,domain text,question_type text not null,prompt text not null,correct_answer jsonb,publication_status publication_status not null default 'draft',updated_at timestamptz not null default now());
create table if not exists public.question_choices(id uuid primary key,question_id uuid not null references questions on delete cascade,label text not null,value text not null,display_order int not null,publication_status publication_status not null default 'published');
create table if not exists public.enrollments(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users on delete cascade,course_id uuid not null references courses,created_at timestamptz not null default now(),unique(user_id,course_id));
create table if not exists public.lesson_attempts(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users on delete cascade,lesson_id uuid not null references lessons,status text not null default 'in_progress',current_step int not null default 0,score int,xp_awarded int not null default 0,updated_at timestamptz not null default now());
create table if not exists public.step_attempts(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users on delete cascade,lesson_attempt_id uuid not null references lesson_attempts on delete cascade,step_id uuid not null references lesson_steps,answer jsonb,is_correct boolean,created_at timestamptz not null default now());
create table if not exists public.open_responses(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users on delete cascade,step_id uuid not null references lesson_steps,first_version text not null default '',revised_version text,status open_response_status not null default 'draft',updated_at timestamptz not null default now(),unique(user_id,step_id));
create table if not exists public.self_assessments(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users on delete cascade,open_response_id uuid not null references open_responses on delete cascade,criteria jsonb not null,created_at timestamptz not null default now());
create table if not exists public.diagnostic_results(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users on delete cascade,global_score int not null check(global_score between 0 and 100),domain_scores jsonb not null,created_at timestamptz not null default now());
create table if not exists public.user_unit_progress(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users on delete cascade,unit_id uuid not null references course_units,status text not null default 'locked',progress int not null default 0 check(progress between 0 and 100),updated_at timestamptz not null default now(),unique(user_id,unit_id));
create table if not exists public.user_gamification(user_id uuid primary key references auth.users on delete cascade,xp int not null default 0,current_streak int not null default 0,best_streak int not null default 0,hearts int not null default 5 check(hearts between 0 and 5),last_active_date date,updated_at timestamptz not null default now());
create table if not exists public.user_daily_activity(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users on delete cascade,activity_date date not null default current_date,xp int not null default 0,minutes int not null default 0,unique(user_id,activity_date));
create table if not exists public.vocabulary_terms(id uuid primary key,term text not null,language text not null,translation text not null,definition text,example text,pronunciation text,publication_status publication_status not null default 'published',updated_at timestamptz not null default now());
create table if not exists public.user_vocabulary_progress(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users on delete cascade,term_id uuid not null references vocabulary_terms,level int not null default 0,last_reviewed_at timestamptz,unique(user_id,term_id));

alter table public.lessons add column if not exists app_id text unique;
alter table public.lesson_steps add column if not exists step_key text unique;
alter table public.questions add column if not exists app_id text unique;
alter table public.questions add column if not exists feedback_correct text;
alter table public.questions add column if not exists feedback_incorrect text;
alter table public.open_responses add column if not exists idempotency_key text;
alter table public.step_attempts add column if not exists idempotency_key text unique;
alter table public.lesson_attempts add column if not exists completion_key text;
create table if not exists public.rpc_idempotency(user_id uuid not null references auth.users on delete cascade,idempotency_key text not null,operation text not null,created_at timestamptz not null default now(),primary key(user_id,idempotency_key));
alter table public.rpc_idempotency enable row level security;

alter table public.profiles add column if not exists current_job text,add column if not exists professional_goal text,add column if not exists declared_level text,add column if not exists daily_minutes int default 15,add column if not exists available_days text[] default '{}',add column if not exists voice_enabled boolean default true,add column if not exists speech_rate numeric default 1,add column if not exists theme text default 'light',add column if not exists onboarding_completed boolean default false;
alter table public.profiles alter column organization_id drop not null;
alter table public.profiles alter column last_name set default '';

do $$ declare t text; begin foreach t in array array['courses','course_sections','course_units','lessons','lesson_steps','questions','question_choices','enrollments','lesson_attempts','step_attempts','open_responses','self_assessments','diagnostic_results','user_unit_progress','user_gamification','user_daily_activity','vocabulary_terms','user_vocabulary_progress'] loop execute format('alter table public.%I enable row level security',t); end loop; end $$;
do $$ declare t text; begin foreach t in array array['courses','course_sections','course_units','lessons','lesson_steps','questions','question_choices','vocabulary_terms'] loop execute format('drop policy if exists catalogue_read on public.%I',t); execute format('create policy catalogue_read on public.%I for select to authenticated using (publication_status = ''published'')',t); end loop; end $$;
do $$ declare t text; begin foreach t in array array['enrollments','lesson_attempts','step_attempts','open_responses','self_assessments','diagnostic_results','user_unit_progress','user_gamification','user_daily_activity','user_vocabulary_progress'] loop execute format('drop policy if exists own_data on public.%I',t); execute format('create policy own_data on public.%I for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())',t); end loop; end $$;
revoke insert,update,delete on public.courses,public.course_sections,public.course_units,public.lessons,public.lesson_steps,public.questions,public.question_choices,public.vocabulary_terms from authenticated;

drop policy if exists profiles_select on public.profiles;
drop policy if exists profiles_insert on public.profiles;
drop policy if exists profiles_update on public.profiles;
create policy profiles_own_select on public.profiles for select to authenticated using(id=auth.uid());
create policy profiles_own_update on public.profiles for update to authenticated using(id=auth.uid()) with check(id=auth.uid());

revoke update(global_score,domain_scores) on public.diagnostic_results from authenticated;
revoke update(status,progress) on public.user_unit_progress from authenticated;
revoke insert,update,delete on public.user_gamification from authenticated;
revoke update(status,xp_awarded) on public.lesson_attempts from authenticated;

create or replace function public.ensure_jangat_profile()
returns jsonb language plpgsql security definer set search_path=public,auth as $$
declare u auth.users; p public.profiles;
begin
  select * into u from auth.users where id=auth.uid();
  if u.id is null then raise exception 'authentication_required'; end if;
  insert into public.profiles(id,first_name,last_name,email)
  values(u.id,coalesce(u.raw_user_meta_data->>'first_name',''),'',u.email)
  on conflict(id) do update set email=excluded.email
  returning * into p;
  insert into public.user_gamification(user_id) values(u.id) on conflict(user_id) do nothing;
  insert into public.enrollments(user_id,course_id)
  values(u.id,'10000000-0000-4000-8000-000000000001') on conflict(user_id,course_id) do nothing;
  insert into public.user_unit_progress(user_id,unit_id,status,progress)
  select u.id,cu.id,case when cu.display_order=0 then 'available' else 'locked' end,0
  from public.course_units cu join public.course_sections cs on cs.id=cu.section_id
  where cs.course_id='10000000-0000-4000-8000-000000000001'
  on conflict(user_id,unit_id) do nothing;
  return jsonb_build_object('profile_id',p.id);
end $$;

create or replace function public.update_daily_activity(p_xp int default 0,p_minutes int default 0)
returns public.user_gamification language plpgsql security definer set search_path=public as $$
declare uid uuid:=auth.uid(); g public.user_gamification;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  insert into public.user_daily_activity(user_id,activity_date,xp,minutes) values(uid,current_date,greatest(p_xp,0),greatest(p_minutes,0))
  on conflict(user_id,activity_date) do update set xp=user_daily_activity.xp+excluded.xp,minutes=user_daily_activity.minutes+excluded.minutes;
  insert into public.user_gamification(user_id,xp,current_streak,best_streak,last_active_date)
  values(uid,greatest(p_xp,0),1,1,current_date)
  on conflict(user_id) do update set xp=user_gamification.xp+greatest(p_xp,0),
    current_streak=case when user_gamification.last_active_date=current_date then user_gamification.current_streak when user_gamification.last_active_date=current_date-1 then user_gamification.current_streak+1 else 1 end,
    best_streak=greatest(user_gamification.best_streak,case when user_gamification.last_active_date=current_date-1 then user_gamification.current_streak+1 else 1 end),
    last_active_date=current_date,updated_at=now()
  returning * into g; return g;
end $$;

create or replace function public.finalize_diagnostic(p_answers jsonb)
returns jsonb language plpgsql security definer set search_path=public as $$
declare uid uuid:=auth.uid(); domain_scores jsonb; global_score int; existing public.diagnostic_results; g public.user_gamification;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  if not exists(select 1 from enrollments where user_id=uid and course_id='10000000-0000-4000-8000-000000000001') then raise exception 'not_enrolled'; end if;
  select * into existing from diagnostic_results where user_id=uid order by created_at desc limit 1;
  if existing.id is not null then
    select * into g from user_gamification where user_id=uid;
    return jsonb_build_object('global_score',existing.global_score,'domain_scores',existing.domain_scores,'xp',g.xp,'hearts',g.hearts,'streak',g.current_streak);
  end if;
  select jsonb_object_agg(domain,score),round(avg(score))::int into domain_scores,global_score from (
    select domain,round(100.0*count(*) filter(where p_answers->>app_id=correct_answer#>>'{}')/count(*))::int score
    from questions where app_id like 'd%' and publication_status='published' group by domain
  ) s;
  insert into diagnostic_results(user_id,global_score,domain_scores) values(uid,global_score,domain_scores);
  perform update_daily_activity(100,8); select * into g from user_gamification where user_id=uid;
  insert into user_unit_progress(user_id,unit_id,status,progress)
  select uid,id,'available',0 from course_units where display_order=1 limit 1
  on conflict(user_id,unit_id) do update set status='available';
  return jsonb_build_object('global_score',global_score,'domain_scores',domain_scores,'xp',g.xp,'hearts',g.hearts,'streak',g.current_streak);
end $$;

create or replace function public.record_step_attempt(p_lesson_id text,p_step_key text,p_answer jsonb,p_idempotency_key text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare uid uuid:=auth.uid(); lid uuid; sid uuid; aid uuid; correct boolean; g public.user_gamification;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  select id into lid from lessons where app_id=p_lesson_id and publication_status='published'; if lid is null then raise exception 'lesson_not_found'; end if;
  if not exists(select 1 from enrollments where user_id=uid and course_id='10000000-0000-4000-8000-000000000001') then raise exception 'not_enrolled'; end if;
  if exists(select 1 from rpc_idempotency where user_id=uid and idempotency_key=p_idempotency_key) then select * into g from user_gamification where user_id=uid; return to_jsonb(g); end if;
  insert into rpc_idempotency(user_id,idempotency_key,operation) values(uid,p_idempotency_key,'record_step');
  select id into sid from lesson_steps where step_key=p_step_key and lesson_id=lid;
  if sid is null then select id into sid from lesson_steps where lesson_id=lid order by display_order limit 1; end if;
  insert into lesson_attempts(user_id,lesson_id,status) values(uid,lid,'in_progress') returning id into aid;
  select case when q.correct_answer is null then true else q.correct_answer=p_answer end into correct from questions q where q.lesson_step_id=sid limit 1;
  correct:=coalesce(correct,true);
  insert into step_attempts(user_id,lesson_attempt_id,step_id,answer,is_correct,idempotency_key) values(uid,aid,sid,p_answer,correct,p_idempotency_key);
  if not correct then update user_gamification set hearts=greatest(0,hearts-1),updated_at=now() where user_id=uid; end if;
  select * into g from user_gamification where user_id=uid; return to_jsonb(g)||jsonb_build_object('is_correct',correct);
end $$;

create or replace function public.complete_lesson(p_lesson_id text,p_idempotency_key text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare uid uuid:=auth.uid(); lid uuid; attempt public.lesson_attempts; g public.user_gamification;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  select id into lid from lessons where app_id=p_lesson_id and publication_status='published'; if lid is null then raise exception 'lesson_not_found'; end if;
  select * into attempt from lesson_attempts where user_id=uid and lesson_id=lid and status='completed' limit 1;
  if attempt.id is null and not exists(select 1 from rpc_idempotency where user_id=uid and idempotency_key=p_idempotency_key) then
    insert into rpc_idempotency(user_id,idempotency_key,operation) values(uid,p_idempotency_key,'complete_lesson');
    insert into lesson_attempts(user_id,lesson_id,status,current_step,xp_awarded,completion_key) values(uid,lid,'completed',999,20,p_idempotency_key);
    perform update_daily_activity(20,(select duration_minutes from lessons where id=lid));
    perform unlock_next_unit(p_lesson_id);
  end if;
  select * into g from user_gamification where user_id=uid;
  return jsonb_build_object('xp',g.xp,'hearts',g.hearts,'streak',g.current_streak);
end $$;

create or replace function public.unlock_next_unit(p_completed_lesson_id text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare uid uuid:=auth.uid(); next_id uuid;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  if p_completed_lesson_id='m1-l4' and exists(
    select 1 from lesson_attempts la join lessons l on l.id=la.lesson_id
    where la.user_id=uid and la.status='completed' and l.app_id in ('m1-l1','m1-l2','m1-l3','m1-l4')
    group by la.user_id having count(distinct l.app_id)=4
  ) then
    select id into next_id from course_units where display_order=2 limit 1;
    insert into user_unit_progress(user_id,unit_id,status,progress) values(uid,next_id,'available',0)
    on conflict(user_id,unit_id) do update set status='available';
  end if;
  return jsonb_build_object('unit_id',next_id,'status',case when next_id is null then 'locked' else 'available' end);
end $$;

create or replace function public.recover_heart_from_review(p_idempotency_key text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare uid uuid:=auth.uid(); g public.user_gamification;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  if not exists(select 1 from rpc_idempotency where user_id=uid and idempotency_key=p_idempotency_key) then
    insert into rpc_idempotency(user_id,idempotency_key,operation) values(uid,p_idempotency_key,'recover_heart');
    update user_gamification set hearts=least(5,hearts+1),updated_at=now() where user_id=uid;
  end if;
  select * into g from user_gamification where user_id=uid; return to_jsonb(g);
end $$;

grant execute on function public.ensure_jangat_profile() to authenticated;
grant execute on function public.finalize_diagnostic(jsonb) to authenticated;
grant execute on function public.record_step_attempt(text,text,jsonb,text) to authenticated;
grant execute on function public.complete_lesson(text,text) to authenticated;
grant execute on function public.unlock_next_unit(text) to authenticated;
grant execute on function public.update_daily_activity(int,int) to authenticated;
grant execute on function public.recover_heart_from_review(text) to authenticated;
