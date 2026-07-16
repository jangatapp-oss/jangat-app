# Architecture JÀNGAT V1

- `src/config`: identité centralisée.
- `src/features/content`: catalogue versionné de la formation.
- `src/features/progress`: calculs déterministes et persistance.
- `src/features/speech`: fournisseur vocal interchangeable basé sur Web Speech.
- `src/App.tsx`: routes, écrans et moteur de leçons V1.
- `supabase/migrations`: schéma relationnel, fonctions sensibles et RLS.
- `supabase/seed_jangat_v1.sql`: seed idempotent à UUID stables.

La V1 sauvegarde les brouillons après chaque saisie. Les données locales facilitent la démonstration; Supabase devient la source de vérité dès son branchement en production.
