-- JÀNGAT V1 — schéma autonome pour un projet Supabase neuf.

create extension if not exists pgcrypto;

do $$ begin
  create type public.publication_status as enum ('draft', 'published', 'deprecated');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.open_response_status as enum ('draft', 'submitted', 'self_reviewed', 'revised');
exception when duplicate_object then null;
end $$;

-- 1. Identité utilisateur. Doit précéder toute donnée ou fonction utilisateur.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  email text not null,
  current_job text,
  professional_goal text,
  declared_level text,
  daily_minutes integer not null default 15 check (daily_minutes between 1 and 1440),
  available_days text[] not null default '{}',
  voice_enabled boolean not null default true,
  speech_rate numeric(3,2) not null default 1 check (speech_rate between 0.5 and 2),
  theme text not null default 'light' check (theme in ('light', 'dark')),
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Catalogue pédagogique, dans l’ordre de ses clés étrangères.
create table if not exists public.courses (
  id uuid primary key,
  title text not null,
  description text,
  content_revision integer not null default 1,
  content_hash text not null,
  publication_status public.publication_status not null default 'draft',
  updated_at timestamptz not null default now(),
  deprecated_at timestamptz
);

create table if not exists public.course_sections (
  id uuid primary key,
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  display_order integer not null,
  content_revision integer not null default 1,
  content_hash text not null,
  publication_status public.publication_status not null default 'draft',
  updated_at timestamptz not null default now(),
  unique (course_id, display_order)
);

create table if not exists public.course_units (
  id uuid primary key,
  section_id uuid not null references public.course_sections(id) on delete cascade,
  title text not null,
  description text,
  display_order integer not null,
  content_revision integer not null default 1,
  content_hash text not null,
  publication_status public.publication_status not null default 'draft',
  updated_at timestamptz not null default now(),
  unique (section_id, display_order)
);

create table if not exists public.lessons (
  id uuid primary key,
  unit_id uuid not null references public.course_units(id) on delete cascade,
  app_id text not null unique,
  title text not null,
  objective text,
  duration_minutes integer not null default 5 check (duration_minutes > 0),
  display_order integer not null,
  content_revision integer not null default 1,
  content_hash text not null,
  publication_status public.publication_status not null default 'draft',
  updated_at timestamptz not null default now(),
  unique (unit_id, display_order)
);

create table if not exists public.lesson_steps (
  id uuid primary key,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  step_key text not null unique,
  step_type text not null,
  content jsonb not null default '{}'::jsonb,
  display_order integer not null,
  content_revision integer not null default 1,
  content_hash text not null,
  publication_status public.publication_status not null default 'draft',
  updated_at timestamptz not null default now(),
  unique (lesson_id, display_order)
);

create table if not exists public.questions (
  id uuid primary key,
  lesson_step_id uuid references public.lesson_steps(id) on delete cascade,
  app_id text unique,
  domain text,
  question_type text not null,
  prompt text not null,
  correct_answer jsonb,
  feedback_correct text,
  feedback_incorrect text,
  publication_status public.publication_status not null default 'draft',
  updated_at timestamptz not null default now()
);

create table if not exists public.question_choices (
  id uuid primary key,
  question_id uuid not null references public.questions(id) on delete cascade,
  label text not null,
  value text not null,
  display_order integer not null,
  publication_status public.publication_status not null default 'published',
  unique (question_id, display_order)
);

create table if not exists public.vocabulary_terms (
  id uuid primary key,
  term text not null,
  language text not null,
  translation text not null,
  definition text,
  example text,
  pronunciation text,
  publication_status public.publication_status not null default 'published',
  updated_at timestamptz not null default now(),
  unique (term, language)
);

-- 3. Données utilisateur. Chaque table suit ses dépendances.
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table if not exists public.lesson_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  status text not null default 'in_progress' check (status in ('in_progress', 'completed', 'abandoned')),
  current_step integer not null default 0 check (current_step >= 0),
  score integer,
  xp_awarded integer not null default 0 check (xp_awarded >= 0),
  completion_key text,
  updated_at timestamptz not null default now()
);

create table if not exists public.step_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_attempt_id uuid not null references public.lesson_attempts(id) on delete cascade,
  step_id uuid not null references public.lesson_steps(id) on delete cascade,
  answer jsonb,
  is_correct boolean,
  idempotency_key text not null,
  created_at timestamptz not null default now(),
  unique (user_id, idempotency_key)
);

create table if not exists public.open_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  step_id uuid not null references public.lesson_steps(id) on delete cascade,
  first_version text not null default '',
  revised_version text,
  status public.open_response_status not null default 'draft',
  idempotency_key text,
  updated_at timestamptz not null default now(),
  unique (user_id, step_id)
);

create table if not exists public.self_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  open_response_id uuid not null references public.open_responses(id) on delete cascade,
  criteria jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.diagnostic_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  global_score integer not null check (global_score between 0 and 100),
  domain_scores jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_unit_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  unit_id uuid not null references public.course_units(id) on delete cascade,
  status text not null default 'locked' check (status in ('locked', 'available', 'in_progress', 'completed', 'review')),
  progress integer not null default 0 check (progress between 0 and 100),
  updated_at timestamptz not null default now(),
  unique (user_id, unit_id)
);

create table if not exists public.user_gamification (
  user_id uuid primary key references auth.users(id) on delete cascade,
  xp integer not null default 0 check (xp >= 0),
  current_streak integer not null default 0 check (current_streak >= 0),
  best_streak integer not null default 0 check (best_streak >= 0),
  hearts integer not null default 5 check (hearts between 0 and 5),
  last_active_date date,
  updated_at timestamptz not null default now()
);

create table if not exists public.user_daily_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_date date not null default current_date,
  xp integer not null default 0 check (xp >= 0),
  minutes integer not null default 0 check (minutes >= 0),
  unique (user_id, activity_date)
);

create table if not exists public.user_vocabulary_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  term_id uuid not null references public.vocabulary_terms(id) on delete cascade,
  level integer not null default 0 check (level between 0 and 5),
  last_reviewed_at timestamptz,
  unique (user_id, term_id)
);

create table if not exists public.rpc_idempotency (
  user_id uuid not null references auth.users(id) on delete cascade,
  idempotency_key text not null,
  operation text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, idempotency_key)
);

-- 4. Index après création de toutes les tables concernées.
create index if not exists idx_course_sections_course on public.course_sections(course_id);
create index if not exists idx_course_units_section on public.course_units(section_id);
create index if not exists idx_lessons_unit on public.lessons(unit_id);
create index if not exists idx_lesson_steps_lesson on public.lesson_steps(lesson_id);
create index if not exists idx_questions_step on public.questions(lesson_step_id);
create index if not exists idx_enrollments_user on public.enrollments(user_id);
create index if not exists idx_lesson_attempts_user_lesson on public.lesson_attempts(user_id, lesson_id);
create index if not exists idx_step_attempts_user on public.step_attempts(user_id);
create index if not exists idx_diagnostic_results_user_created on public.diagnostic_results(user_id, created_at desc);
create index if not exists idx_user_unit_progress_user on public.user_unit_progress(user_id);

-- 5. Fonctions utilitaires puis triggers.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  insert into public.profiles(id, first_name, last_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    coalesce(new.email, '')
  )
  on conflict (id) do update set email = excluded.email;

  insert into public.user_gamification(user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'profiles', 'courses', 'course_sections', 'course_units', 'lessons',
    'lesson_steps', 'questions', 'vocabulary_terms', 'lesson_attempts',
    'open_responses', 'user_unit_progress', 'user_gamification'
  ] loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    execute format(
      'create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name, table_name
    );
  end loop;
end $$;

-- 6. RLS seulement après création de toutes les tables.
do $$
declare table_name text;
begin
  foreach table_name in array array[
    'profiles', 'courses', 'course_sections', 'course_units', 'lessons',
    'lesson_steps', 'questions', 'question_choices', 'vocabulary_terms',
    'enrollments', 'lesson_attempts', 'step_attempts', 'open_responses',
    'self_assessments', 'diagnostic_results', 'user_unit_progress',
    'user_gamification', 'user_daily_activity', 'user_vocabulary_progress',
    'rpc_idempotency'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'courses', 'course_sections', 'course_units', 'lessons',
    'lesson_steps', 'questions', 'question_choices', 'vocabulary_terms'
  ] loop
    execute format('drop policy if exists catalogue_read on public.%I', table_name);
    execute format(
      'create policy catalogue_read on public.%I for select to authenticated using (publication_status = ''published'')',
      table_name
    );
  end loop;
end $$;

drop policy if exists profiles_own_select on public.profiles;
drop policy if exists profiles_own_update on public.profiles;
create policy profiles_own_select on public.profiles
for select to authenticated using (id = (select auth.uid()));
create policy profiles_own_update on public.profiles
for update to authenticated using (id = (select auth.uid()))
with check (id = (select auth.uid()));

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'enrollments', 'lesson_attempts', 'step_attempts', 'diagnostic_results',
    'user_unit_progress', 'user_gamification', 'user_daily_activity'
  ] loop
    execute format('drop policy if exists own_read on public.%I', table_name);
    execute format(
      'create policy own_read on public.%I for select to authenticated using (user_id = (select auth.uid()))',
      table_name
    );
  end loop;
end $$;

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'open_responses', 'self_assessments', 'user_vocabulary_progress'
  ] loop
    execute format('drop policy if exists own_data on public.%I', table_name);
    execute format(
      'create policy own_data on public.%I for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()))',
      table_name
    );
  end loop;
end $$;

-- La table d’idempotence n’est accessible que par les fonctions SECURITY DEFINER.
revoke all on public.rpc_idempotency from anon, authenticated;

revoke insert, update, delete on
  public.courses, public.course_sections, public.course_units, public.lessons,
  public.lesson_steps, public.questions, public.question_choices,
  public.vocabulary_terms
from authenticated;

revoke insert, update, delete on
  public.enrollments, public.lesson_attempts, public.step_attempts,
  public.diagnostic_results, public.user_unit_progress,
  public.user_gamification, public.user_daily_activity
from authenticated;

grant select on
  public.profiles, public.courses, public.course_sections, public.course_units,
  public.lessons, public.lesson_steps, public.questions, public.question_choices,
  public.vocabulary_terms, public.enrollments, public.lesson_attempts,
  public.step_attempts, public.open_responses, public.self_assessments,
  public.diagnostic_results, public.user_unit_progress, public.user_gamification,
  public.user_daily_activity, public.user_vocabulary_progress
to authenticated;

grant update on public.profiles to authenticated;
grant insert, update on public.open_responses, public.self_assessments, public.user_vocabulary_progress to authenticated;

-- 7. RPC sécurisées. search_path fixe et auth.uid() sans user_id fourni.
create or replace function public.ensure_jangat_profile()
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  uid uuid := auth.uid();
  auth_user auth.users;
  profile_row public.profiles;
begin
  if uid is null then raise exception 'authentication_required'; end if;

  select * into auth_user from auth.users where id = uid;
  if auth_user.id is null then raise exception 'authentication_required'; end if;

  insert into public.profiles(id, first_name, last_name, email)
  values (
    uid,
    coalesce(auth_user.raw_user_meta_data ->> 'first_name', ''),
    coalesce(auth_user.raw_user_meta_data ->> 'last_name', ''),
    coalesce(auth_user.email, '')
  )
  on conflict (id) do update set email = excluded.email
  returning * into profile_row;

  insert into public.user_gamification(user_id)
  values (uid)
  on conflict (user_id) do nothing;

  insert into public.enrollments(user_id, course_id)
  select uid, c.id
  from public.courses c
  where c.id = '10000000-0000-4000-8000-000000000001'
  on conflict (user_id, course_id) do nothing;

  insert into public.user_unit_progress(user_id, unit_id, status, progress)
  select
    uid,
    cu.id,
    case when cu.display_order = 0 then 'available' else 'locked' end,
    0
  from public.course_units cu
  join public.course_sections cs on cs.id = cu.section_id
  where cs.course_id = '10000000-0000-4000-8000-000000000001'
  on conflict (user_id, unit_id) do nothing;

  return jsonb_build_object('profile_id', profile_row.id);
end;
$$;

create or replace function public.update_daily_activity(p_xp integer default 0, p_minutes integer default 0)
returns public.user_gamification
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  uid uuid := auth.uid();
  game public.user_gamification;
begin
  if uid is null then raise exception 'authentication_required'; end if;

  insert into public.user_daily_activity(user_id, activity_date, xp, minutes)
  values (uid, current_date, greatest(p_xp, 0), greatest(p_minutes, 0))
  on conflict (user_id, activity_date) do update
  set xp = public.user_daily_activity.xp + excluded.xp,
      minutes = public.user_daily_activity.minutes + excluded.minutes;

  insert into public.user_gamification(user_id, xp, current_streak, best_streak, last_active_date)
  values (uid, greatest(p_xp, 0), 1, 1, current_date)
  on conflict (user_id) do update
  set xp = public.user_gamification.xp + greatest(p_xp, 0),
      current_streak = case
        when public.user_gamification.last_active_date = current_date then public.user_gamification.current_streak
        when public.user_gamification.last_active_date = current_date - 1 then public.user_gamification.current_streak + 1
        else 1
      end,
      best_streak = greatest(
        public.user_gamification.best_streak,
        case
          when public.user_gamification.last_active_date = current_date - 1 then public.user_gamification.current_streak + 1
          else 1
        end
      ),
      last_active_date = current_date
  returning * into game;

  return game;
end;
$$;

create or replace function public.unlock_next_unit(p_completed_lesson_id text)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  uid uuid := auth.uid();
  next_unit_id uuid;
begin
  if uid is null then raise exception 'authentication_required'; end if;

  if p_completed_lesson_id = 'm1-l4' and exists (
    select 1
    from public.lesson_attempts la
    join public.lessons l on l.id = la.lesson_id
    where la.user_id = uid
      and la.status = 'completed'
      and l.app_id in ('m1-l1', 'm1-l2', 'm1-l3', 'm1-l4')
    group by la.user_id
    having count(distinct l.app_id) = 4
  ) then
    select cu.id into next_unit_id
    from public.course_units cu
    where cu.display_order = 2
    order by cu.id
    limit 1;

    if next_unit_id is not null then
      insert into public.user_unit_progress(user_id, unit_id, status, progress)
      values (uid, next_unit_id, 'available', 0)
      on conflict (user_id, unit_id) do update set status = 'available';
    end if;
  end if;

  return jsonb_build_object(
    'unit_id', next_unit_id,
    'status', case when next_unit_id is null then 'locked' else 'available' end
  );
end;
$$;

create or replace function public.finalize_diagnostic(p_answers jsonb)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  uid uuid := auth.uid();
  scores jsonb;
  total_score integer;
  existing_result public.diagnostic_results;
  game public.user_gamification;
begin
  if uid is null then raise exception 'authentication_required'; end if;
  if not exists (
    select 1 from public.enrollments
    where user_id = uid and course_id = '10000000-0000-4000-8000-000000000001'
  ) then raise exception 'not_enrolled'; end if;

  select * into existing_result
  from public.diagnostic_results
  where user_id = uid
  order by created_at desc
  limit 1;

  if existing_result.id is not null then
    select * into game from public.user_gamification where user_id = uid;
    return jsonb_build_object(
      'global_score', existing_result.global_score,
      'domain_scores', existing_result.domain_scores,
      'xp', game.xp, 'hearts', game.hearts, 'streak', game.current_streak
    );
  end if;

  select jsonb_object_agg(domain, score), round(avg(score))::integer
  into scores, total_score
  from (
    select
      domain,
      round(100.0 * count(*) filter (
        where p_answers ->> app_id = correct_answer #>> '{}'
      ) / count(*))::integer as score
    from public.questions
    where app_id like 'd%' and publication_status = 'published'
    group by domain
  ) calculated;

  if total_score is null then raise exception 'diagnostic_catalogue_empty'; end if;

  insert into public.diagnostic_results(user_id, global_score, domain_scores)
  values (uid, total_score, scores);

  perform public.update_daily_activity(100, 8);
  select * into game from public.user_gamification where user_id = uid;

  insert into public.user_unit_progress(user_id, unit_id, status, progress)
  select uid, id, 'available', 0
  from public.course_units
  where display_order = 1
  order by id
  limit 1
  on conflict (user_id, unit_id) do update set status = 'available';

  return jsonb_build_object(
    'global_score', total_score, 'domain_scores', scores,
    'xp', game.xp, 'hearts', game.hearts, 'streak', game.current_streak
  );
end;
$$;

create or replace function public.record_step_attempt(
  p_lesson_id text,
  p_step_key text,
  p_answer jsonb,
  p_idempotency_key text
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  uid uuid := auth.uid();
  lesson_uuid uuid;
  step_uuid uuid;
  attempt_uuid uuid;
  answer_correct boolean;
  game public.user_gamification;
begin
  if uid is null then raise exception 'authentication_required'; end if;

  select id into lesson_uuid
  from public.lessons
  where app_id = p_lesson_id and publication_status = 'published';
  if lesson_uuid is null then raise exception 'lesson_not_found'; end if;

  if not exists (
    select 1 from public.enrollments
    where user_id = uid and course_id = '10000000-0000-4000-8000-000000000001'
  ) then raise exception 'not_enrolled'; end if;

  if exists (
    select 1 from public.rpc_idempotency
    where user_id = uid and idempotency_key = p_idempotency_key
  ) then
    select * into game from public.user_gamification where user_id = uid;
    return to_jsonb(game);
  end if;

  select id into step_uuid
  from public.lesson_steps
  where step_key = p_step_key and lesson_id = lesson_uuid;

  if step_uuid is null then
    select id into step_uuid
    from public.lesson_steps
    where lesson_id = lesson_uuid
    order by display_order
    limit 1;
  end if;
  if step_uuid is null then raise exception 'lesson_step_not_found'; end if;

  insert into public.rpc_idempotency(user_id, idempotency_key, operation)
  values (uid, p_idempotency_key, 'record_step');

  insert into public.lesson_attempts(user_id, lesson_id, status)
  values (uid, lesson_uuid, 'in_progress')
  returning id into attempt_uuid;

  select case when q.correct_answer is null then true else q.correct_answer = p_answer end
  into answer_correct
  from public.questions q
  where q.lesson_step_id = step_uuid
  limit 1;
  answer_correct := coalesce(answer_correct, true);

  insert into public.step_attempts(
    user_id, lesson_attempt_id, step_id, answer, is_correct, idempotency_key
  )
  values (uid, attempt_uuid, step_uuid, p_answer, answer_correct, p_idempotency_key);

  if not answer_correct then
    update public.user_gamification
    set hearts = greatest(0, hearts - 1)
    where user_id = uid;
  end if;

  select * into game from public.user_gamification where user_id = uid;
  return to_jsonb(game) || jsonb_build_object('is_correct', answer_correct);
end;
$$;

create or replace function public.complete_lesson(p_lesson_id text, p_idempotency_key text)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  uid uuid := auth.uid();
  lesson_uuid uuid;
  completed_attempt public.lesson_attempts;
  game public.user_gamification;
begin
  if uid is null then raise exception 'authentication_required'; end if;

  select id into lesson_uuid
  from public.lessons
  where app_id = p_lesson_id and publication_status = 'published';
  if lesson_uuid is null then raise exception 'lesson_not_found'; end if;

  select * into completed_attempt
  from public.lesson_attempts
  where user_id = uid and lesson_id = lesson_uuid and status = 'completed'
  limit 1;

  if completed_attempt.id is null and not exists (
    select 1 from public.rpc_idempotency
    where user_id = uid and idempotency_key = p_idempotency_key
  ) then
    insert into public.rpc_idempotency(user_id, idempotency_key, operation)
    values (uid, p_idempotency_key, 'complete_lesson');

    insert into public.lesson_attempts(
      user_id, lesson_id, status, current_step, xp_awarded, completion_key
    )
    values (uid, lesson_uuid, 'completed', 999, 20, p_idempotency_key);

    perform public.update_daily_activity(
      20,
      (select duration_minutes from public.lessons where id = lesson_uuid)
    );
    perform public.unlock_next_unit(p_lesson_id);
  end if;

  select * into game from public.user_gamification where user_id = uid;
  return jsonb_build_object(
    'xp', game.xp, 'hearts', game.hearts, 'streak', game.current_streak
  );
end;
$$;

create or replace function public.recover_heart_from_review(p_idempotency_key text)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  uid uuid := auth.uid();
  game public.user_gamification;
begin
  if uid is null then raise exception 'authentication_required'; end if;

  if not exists (
    select 1 from public.rpc_idempotency
    where user_id = uid and idempotency_key = p_idempotency_key
  ) then
    insert into public.rpc_idempotency(user_id, idempotency_key, operation)
    values (uid, p_idempotency_key, 'recover_heart');

    update public.user_gamification
    set hearts = least(5, hearts + 1)
    where user_id = uid;
  end if;

  select * into game from public.user_gamification where user_id = uid;
  return to_jsonb(game);
end;
$$;

revoke all on function public.ensure_jangat_profile() from public, anon;
revoke all on function public.update_daily_activity(integer, integer) from public, anon;
revoke all on function public.unlock_next_unit(text) from public, anon;
revoke all on function public.finalize_diagnostic(jsonb) from public, anon;
revoke all on function public.record_step_attempt(text, text, jsonb, text) from public, anon;
revoke all on function public.complete_lesson(text, text) from public, anon;
revoke all on function public.recover_heart_from_review(text) from public, anon;

grant execute on function public.ensure_jangat_profile() to authenticated;
grant execute on function public.update_daily_activity(integer, integer) to authenticated;
grant execute on function public.unlock_next_unit(text) to authenticated;
grant execute on function public.finalize_diagnostic(jsonb) to authenticated;
grant execute on function public.record_step_attempt(text, text, jsonb, text) to authenticated;
grant execute on function public.complete_lesson(text, text) to authenticated;
grant execute on function public.recover_heart_from_review(text) to authenticated;
