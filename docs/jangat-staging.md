# Déploiement staging JÀNGAT

Le dépôt possède un remote GitHub et un workflow GitHub Pages. Aucun projet Supabase n’est configuré dans le workspace. Le démon Docker n’est pas actif, donc `supabase db reset` ne peut pas être exécuté localement.

## Actions manuelles restantes

1. Créer ou sélectionner un projet Supabase de staging.
2. Appliquer `supabase/migrations/202607160001_jangat_v1.sql`.
3. Exécuter `supabase/seed_jangat_v1.sql` deux fois.
4. Ajouter `STAGING_SUPABASE_URL` et `STAGING_SUPABASE_ANON_KEY` aux secrets GitHub.
5. Configurer dans Supabase Auth la Site URL du staging, `<staging>/dashboard` pour la confirmation et `<staging>/settings` pour la récupération.
6. Créer deux comptes de test et relancer Playwright avec les identifiants E2E.

Ne jamais ajouter de clé `service_role` aux variables utilisées par Vite.

## Contrôle après migration

```sql
select count(*) from courses;          -- 1
select count(*) from course_sections;  -- 6
select count(*) from course_units;     -- 22
select count(*) from lessons;          -- 8
select count(*) from questions where app_id like 'd%'; -- 15
```

Les lectures croisées entre les deux comptes doivent renvoyer zéro ligne. Les mises à jour directes de `user_gamification`, du catalogue et des résultats calculés doivent être refusées.
