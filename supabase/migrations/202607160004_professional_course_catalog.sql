-- Catalogue versionné des 34 cours. Le contenu détaillé est livré dans le bundle
-- applicatif versionné ; Supabase conserve la publication et les révisions.

create table if not exists public.professional_course_catalog (
  id uuid primary key,
  path_id uuid not null references public.professional_paths(id) on delete cascade,
  app_id text not null unique,
  display_order integer not null check (display_order between 1 and 34),
  phase integer not null check (phase between 1 and 5),
  title text not null,
  duration_hours integer not null check (duration_hours > 0),
  content_revision integer not null default 1,
  content_hash text not null,
  content_manifest jsonb not null default '{}'::jsonb,
  publication_status public.publication_status not null default 'draft',
  updated_at timestamptz not null default now(),
  unique (path_id, display_order)
);

drop trigger if exists set_professional_course_catalog_updated_at on public.professional_course_catalog;
create trigger set_professional_course_catalog_updated_at
before update on public.professional_course_catalog
for each row execute function public.set_updated_at();

alter table public.professional_course_catalog enable row level security;
drop policy if exists professional_course_catalog_read on public.professional_course_catalog;
create policy professional_course_catalog_read
on public.professional_course_catalog for select to authenticated
using (publication_status = 'published');

revoke insert, update, delete on public.professional_course_catalog from authenticated;
grant select on public.professional_course_catalog to authenticated;
