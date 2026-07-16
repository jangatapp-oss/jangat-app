# Rapport de livraison locale — parcours professionnel intégral

Date : 16 juillet 2026

## Lots réalisés

1. Modèle exhaustif, positionnement, progression, sources et RLS.
2. Ingénierie pédagogique, multimodal, sciences de l’apprentissage, L&D, impact, digital, accessibilité et anglais.
3. Direction, administratif, droit, Qualiopi, RNCP/RS, OPCO, financements, BPF et RH.
4. Budget, stratégie, projet, programme, portefeuille, management, leadership et reporting.
5. Appels d’offres, appels à projets, commercial et partenariats.
6. IA niveaux 1 à 7, assistants, agents, orchestration, sécurité et transformation.
7. Missions complexes, portfolio, soutenance, positionnement 60K+ et quatre CV fondés sur les preuves.

## Volumétrie vérifiée automatiquement

- 34 cours.
- 272 situations de positionnement.
- 102 questions évaluées avec correction.
- 34 missions autonomes.
- 34 pratiques guidées.
- 34 situations sans IA.
- 34 situations avec IA contrôlée.
- 34 audits de production IA.
- 34 activités de transmission.
- 51 tests unitaires et de structure réussis.

## Migrations

- `202607160003_complete_professional_curriculum.sql`
- `202607160004_professional_course_catalog.sql`
- `202607160005_professional_validation_security.sql`

Les migrations sont additives. Elles ne suppriment aucune donnée et n’ont pas été appliquées à distance pendant cette mission.

## RLS

- Les progressions, tentatives, missions, critères, preuves, soutenances et documents de carrière sont limités à `user_id = auth.uid()`.
- Le catalogue des 34 cours est publié en lecture seule.
- Un utilisateur ne peut pas s’accorder `confirmed`, `confirmé` ou `approved`.
- La validation explicite du prérequis reste inaccessible à l’utilisateur.

## Contrôles locaux

- `pnpm lint` : réussi.
- `pnpm typecheck` : réussi.
- `pnpm test` : 18 fichiers, 51 tests réussis.
- `pnpm build` : réussi.
- Audit des secrets : aucun secret réel ni `.env` ajouté.
- Audit d’héritage : aucune référence VTC, Cap 4000, Uber ou Bolt dans le périmètre JÀNGAT.

## Contrôle mobile

Le code utilise des grilles responsives, des formulaires tactiles et un chargement différé du parcours professionnel. La suite Playwright prévoit sept formats, dont six configurations iPhone et le paysage.

L’exécution navigateur finale a été bloquée par l’environnement : le serveur local était interdit dans le bac à sable (`listen EPERM`) et l’autorisation renforcée Playwright a été refusée à cause de la limite d’usage Codex. Le résultat mobile automatisé ne doit donc pas être déclaré réussi dans ce rapport.

## État Git

Le lot 1 est commité localement sous `1220676`. Les lots 2 à 7 sont présents et validés dans l’arbre de travail, mais leur création de commits et le push ont été bloqués par la limite d’usage des autorisations renforcées Codex. Aucun push partiel de ces lots n’a été effectué.
