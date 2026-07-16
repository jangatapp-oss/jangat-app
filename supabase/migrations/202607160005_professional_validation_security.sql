-- Empêche l’auto-attribution des statuts réservés à une revue humaine.

drop policy if exists professional_own_data on public.user_competencies;
create policy professional_competencies_read on public.user_competencies
for select to authenticated using (user_id = (select auth.uid()));
create policy professional_competencies_insert on public.user_competencies
for insert to authenticated with check (
  user_id = (select auth.uid()) and status <> 'confirmé'
);
create policy professional_competencies_update on public.user_competencies
for update to authenticated using (
  user_id = (select auth.uid()) and status <> 'confirmé'
) with check (
  user_id = (select auth.uid()) and status <> 'confirmé'
);
create policy professional_competencies_delete on public.user_competencies
for delete to authenticated using (
  user_id = (select auth.uid()) and status <> 'confirmé'
);

drop policy if exists professional_own_data on public.mission_submissions;
create policy professional_missions_own_read on public.mission_submissions
for select to authenticated using (user_id = (select auth.uid()));
create policy professional_missions_own_insert on public.mission_submissions
for insert to authenticated with check (
  user_id = (select auth.uid()) and status <> 'confirmed'
);
create policy professional_missions_own_update on public.mission_submissions
for update to authenticated using (
  user_id = (select auth.uid()) and status <> 'confirmed'
) with check (
  user_id = (select auth.uid()) and status <> 'confirmed'
);
create policy professional_missions_own_delete on public.mission_submissions
for delete to authenticated using (
  user_id = (select auth.uid()) and status <> 'confirmed'
);

drop policy if exists professional_own_data on public.evidence_items;
create policy professional_evidence_own_read on public.evidence_items
for select to authenticated using (user_id = (select auth.uid()));
create policy professional_evidence_own_insert on public.evidence_items
for insert to authenticated with check (
  user_id = (select auth.uid())
  and status <> 'confirmed'
  and reviewer_id is null
);
create policy professional_evidence_own_update on public.evidence_items
for update to authenticated using (
  user_id = (select auth.uid())
  and status <> 'confirmed'
  and reviewer_id is null
) with check (
  user_id = (select auth.uid())
  and status <> 'confirmed'
  and reviewer_id is null
);
create policy professional_evidence_own_delete on public.evidence_items
for delete to authenticated using (
  user_id = (select auth.uid())
  and status <> 'confirmed'
  and reviewer_id is null
);

drop policy if exists professional_own_data on public.professional_defense_submissions;
create policy professional_defense_own_read on public.professional_defense_submissions
for select to authenticated using (user_id = (select auth.uid()));
create policy professional_defense_own_insert on public.professional_defense_submissions
for insert to authenticated with check (
  user_id = (select auth.uid()) and status <> 'confirmed'
);
create policy professional_defense_own_update on public.professional_defense_submissions
for update to authenticated using (
  user_id = (select auth.uid()) and status <> 'confirmed'
) with check (
  user_id = (select auth.uid()) and status <> 'confirmed'
);

drop policy if exists professional_own_data on public.professional_career_documents;
create policy professional_career_own_read on public.professional_career_documents
for select to authenticated using (user_id = (select auth.uid()));
create policy professional_career_own_insert on public.professional_career_documents
for insert to authenticated with check (
  user_id = (select auth.uid()) and status <> 'approved'
);
create policy professional_career_own_update on public.professional_career_documents
for update to authenticated using (
  user_id = (select auth.uid()) and status <> 'approved'
) with check (
  user_id = (select auth.uid()) and status <> 'approved'
);

