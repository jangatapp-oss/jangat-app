-- Parcours professionnel EduConcret — extension non destructive de JÀNGAT V1.

alter table public.profiles
  add column if not exists current_course_validated boolean not null default false;

create table if not exists public.professional_paths (
  id uuid primary key,
  app_id text not null unique,
  title text not null,
  prerequisite_course_id uuid not null references public.courses(id),
  publication_status public.publication_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.competency_domains (
  id uuid primary key,
  app_id text not null unique,
  title text not null,
  target_description text not null,
  operational_status text not null check (operational_status in ('operational','preparatory')),
  publication_status public.publication_status not null default 'draft',
  updated_at timestamptz not null default now()
);

create table if not exists public.competencies (
  id uuid primary key,
  domain_id uuid not null references public.competency_domains(id) on delete cascade,
  app_id text not null unique,
  title text not null,
  target_level integer not null default 4 check (target_level between 1 and 7),
  publication_status public.publication_status not null default 'draft',
  updated_at timestamptz not null default now()
);

create table if not exists public.professional_missions (
  id uuid primary key,
  domain_id uuid not null references public.competency_domains(id) on delete cascade,
  app_id text not null unique,
  title text not null,
  context text not null,
  operational_deliverable text not null,
  critical_criterion text not null,
  publication_status public.publication_status not null default 'draft',
  updated_at timestamptz not null default now()
);

create table if not exists public.mission_criteria (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references public.professional_missions(id) on delete cascade,
  criterion text not null,
  is_critical boolean not null default false,
  display_order integer not null,
  unique (mission_id, display_order)
);

create table if not exists public.source_registry (
  id uuid primary key,
  source_key text not null unique,
  title text not null,
  authority text not null,
  url text not null,
  checked_at date not null,
  publication_status public.publication_status not null default 'published',
  updated_at timestamptz not null default now()
);

create table if not exists public.regulatory_content_versions (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.source_registry(id) on delete cascade,
  subject text not null,
  version_label text not null,
  effective_at date,
  review_due_at date not null,
  notes text,
  unique (source_id, subject, version_label)
);

create table if not exists public.positioning_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  competency_key text not null,
  dimensions jsonb not null default '{}'::jsonb,
  competency_status text not null check (competency_status in ('non évalué','déclaré','en cours','démontré','confirmé')),
  ai_level text not null check (ai_level in ('A','B','C')),
  updated_at timestamptz not null default now(),
  unique (user_id, competency_key)
);

create table if not exists public.user_competencies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  competency_id uuid references public.competencies(id) on delete set null,
  competency_key text not null,
  source_kind text not null check (source_kind in ('cv_declared','positioning','mission','manual_review')),
  status text not null check (status in ('non évalué','déclaré','en cours','démontré','confirmé')),
  educoncret_level integer not null default 1 check (educoncret_level between 1 and 7),
  ai_level text not null default 'A' check (ai_level in ('A','B','C')),
  updated_at timestamptz not null default now(),
  unique (user_id, competency_key)
);

create table if not exists public.mission_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mission_id uuid references public.professional_missions(id) on delete set null,
  mission_key text not null,
  operational_delivery text not null,
  personal_explanation text not null,
  status text not null default 'draft' check (status in ('draft','submitted','revision_requested','demonstrated','confirmed')),
  version integer not null default 1 check (version > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.criterion_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  submission_id uuid not null references public.mission_submissions(id) on delete cascade,
  criterion text not null,
  result text not null check (result in ('Respecté','Partiel','Non respecté')),
  reviewer_note text,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_usage_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  submission_id uuid not null references public.mission_submissions(id) on delete cascade,
  declared_uses text[] not null default '{}',
  human_control_note text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.evidence_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  submission_id uuid references public.mission_submissions(id) on delete cascade,
  mission_key text not null,
  title text not null,
  evidence_type text not null,
  status text not null check (status in ('declared','in_progress','demonstrated','confirmed')),
  reviewer_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.professional_explanations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  submission_id uuid not null references public.mission_submissions(id) on delete cascade,
  explanation text not null,
  written_before_ai boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.job_market_offers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  organization text,
  source_url text,
  captured_at date not null default current_date,
  raw_requirements text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.job_market_skill_requirements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  offer_id uuid not null references public.job_market_offers(id) on delete cascade,
  requirement text not null,
  evidence_item_id uuid references public.evidence_items(id) on delete set null,
  gap_status text not null default 'gap' check (gap_status in ('covered','partial','gap'))
);

create table if not exists public.cv_skill_suggestions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  evidence_item_id uuid not null references public.evidence_items(id) on delete cascade,
  suggested_text text not null,
  status text not null default 'provisional' check (status in ('provisional','accepted','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.progress_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  review_period daterange not null,
  summary jsonb not null default '{}'::jsonb,
  next_actions jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_positioning_user on public.positioning_assessments(user_id);
create index if not exists idx_mission_submissions_user on public.mission_submissions(user_id, created_at desc);
create index if not exists idx_evidence_items_user on public.evidence_items(user_id, created_at desc);
create index if not exists idx_job_market_offers_user on public.job_market_offers(user_id);

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'professional_paths','competency_domains','competencies','professional_missions',
    'source_registry','positioning_assessments','user_competencies',
    'mission_submissions','evidence_items'
  ] loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    execute format('create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
  end loop;
end $$;

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'professional_paths','competency_domains','competencies','professional_missions',
    'mission_criteria','source_registry','regulatory_content_versions',
    'positioning_assessments','user_competencies','mission_submissions',
    'criterion_results','ai_usage_records','evidence_items','professional_explanations',
    'job_market_offers','job_market_skill_requirements','cv_skill_suggestions','progress_reviews'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'professional_paths','competency_domains','competencies','professional_missions',
    'mission_criteria','source_registry','regulatory_content_versions'
  ] loop
    execute format('drop policy if exists professional_catalogue_read on public.%I', table_name);
    execute format('create policy professional_catalogue_read on public.%I for select to authenticated using (true)', table_name);
    execute format('revoke insert, update, delete on public.%I from authenticated', table_name);
    execute format('grant select on public.%I to authenticated', table_name);
  end loop;
end $$;

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'positioning_assessments','user_competencies','mission_submissions',
    'criterion_results','ai_usage_records','evidence_items','professional_explanations',
    'job_market_offers','job_market_skill_requirements','cv_skill_suggestions','progress_reviews'
  ] loop
    execute format('drop policy if exists professional_own_data on public.%I', table_name);
    execute format(
      'create policy professional_own_data on public.%I for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()))',
      table_name
    );
    execute format('grant select, insert, update, delete on public.%I to authenticated', table_name);
  end loop;
end $$;

-- Un utilisateur ne peut pas s’auto-attribuer une validation explicite du prérequis.
revoke update on public.profiles from authenticated;
grant update (
  first_name,last_name,current_job,professional_goal,declared_level,daily_minutes,
  available_days,voice_enabled,speech_rate,theme,onboarding_completed,updated_at
) on public.profiles to authenticated;
