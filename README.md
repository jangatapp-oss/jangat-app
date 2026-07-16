# JÀNGAT V1

**Le professeur personnel qui transforme l’apprentissage en compétences démontrées.**

JÀNGAT est une PWA mobile-first de réactivation des compétences d’ingénierie pédagogique. La V1 propose l’onboarding, un diagnostic de 15 questions, un parcours progressif de 22 modules, les modules 1 et 2 entièrement utilisables, la lecture vocale, l’auto-évaluation des réponses ouvertes, les XP, la série quotidienne et les cœurs.

JÀNGAT inclut aussi le parcours professionnel intégral et verrouillé « Directeur de formation et ingénieur pédagogique augmenté par l’IA — Parcours professionnel EduConcret » : 34 cours, positionnement adaptatif avant chaque domaine, évaluations, missions LOGIX FORMA, portfolio, soutenance et quatre CV fondés sur les preuves.

## Lancement local

```bash
pnpm install
pnpm dev
```

Ouvrir `http://localhost:5173`. Sans variables Supabase, l’application affiche une erreur de configuration explicite. Supabase est la source de vérité ; seuls les brouillons restent temporairement sur l’appareil.

## Validation

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Supabase

Variables publiques attendues dans `.env.local` :

```text
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-anonyme
```

Ne jamais placer de clé `service_role` dans le navigateur. Appliquer les migrations dans leur ordre, puis les deux seeds configurés dans `supabase/config.toml`. Le schéma active RLS : catalogues publiés en lecture seule et données personnelles limitées à `auth.uid()`.

Les scores, XP, cœurs, séries et déblocages sont produits par des fonctions PostgreSQL sécurisées, et non par le navigateur. Voir `docs/jangat-staging.md` pour la procédure de staging et les actions externes restantes.

## Architecture

Consulter :

- `docs/jangat-v1-scope.md`
- `docs/jangat-v1-architecture.md`
- `docs/jangat-v1-content-model.md`
- `docs/educoncret-complete-curriculum.md`

Signature : **Jàng — Jëf — Xam**
