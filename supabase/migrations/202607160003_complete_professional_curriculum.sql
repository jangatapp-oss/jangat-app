-- Parcours professionnel complet — progression adaptative, évaluations et livrables finaux.

create table if not exists public.professional_course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_key text not null,
  positioning_scores jsonb not null default '{}'::jsonb,
  recommended_track text check (recommended_track in (
    'direct_validation','short_update','consolidation','full_course','advanced_mission'
  )),
  status text not null default 'not_started' check (status in (
    'not_started','positioned','in_progress','assessment_passed','mission_submitted','completed'
  )),
  content_viewed_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (user_id, course_key)
);

create table if not exists public.professional_assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_key text not null,
  attempt_number integer not null check (attempt_number between 1 and 10),
  answers jsonb not null,
  score integer not null check (score between 0 and 100),
  passed boolean not null,
  detailed_corrections jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, course_key, attempt_number)
);

create table if not exists public.professional_defense_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  version integer not null default 1,
  dossier jsonb not null,
  presentation_text text not null,
  contradictory_answers jsonb not null default '{}'::jsonb,
  ai_contribution text not null,
  human_decisions text not null,
  team_direction text not null,
  transmission_plan text not null,
  criterion_results jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in (
    'draft','submitted','revision_requested','demonstrated','confirmed'
  )),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, version)
);

create table if not exists public.professional_career_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  document_type text not null check (document_type in (
    'cv_training_manager','cv_training_director','cv_pedagogy_ai',
    'cv_senior_ld_consultant','portfolio','progress_report',
    'interview_case','professional_presentation','remaining_gaps'
  )),
  content jsonb not null,
  evidence_item_ids uuid[] not null default '{}',
  status text not null default 'provisional' check (status in ('provisional','reviewed','approved')),
  generated_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, document_type)
);

create index if not exists idx_professional_course_progress_user
  on public.professional_course_progress(user_id, course_key);
create index if not exists idx_professional_assessment_user_course
  on public.professional_assessment_attempts(user_id, course_key, attempt_number desc);
create index if not exists idx_professional_defense_user
  on public.professional_defense_submissions(user_id, version desc);
create index if not exists idx_professional_career_documents_user
  on public.professional_career_documents(user_id);

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'professional_course_progress','professional_defense_submissions',
    'professional_career_documents'
  ] loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    execute format(
      'create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name, table_name
    );
  end loop;
end $$;

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'professional_course_progress','professional_assessment_attempts',
    'professional_defense_submissions','professional_career_documents'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('drop policy if exists professional_own_data on public.%I', table_name);
    execute format(
      'create policy professional_own_data on public.%I for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()))',
      table_name
    );
    execute format('grant select, insert, update, delete on public.%I to authenticated', table_name);
  end loop;
end $$;

