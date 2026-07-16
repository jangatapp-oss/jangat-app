# Correctifs issus de l’audit — 17 juillet 2026

## Réalisé

- Ajout d’un contenu pédagogique utilisable pour les modules 3 à 21 du parcours fondamental.
- Association explicite de chaque module à au moins une leçon.
- Déverrouillage EduConcret désormais dépendant de l’ensemble réel des leçons du catalogue.
- Blocage visuel de la mission tant que l’évaluation du domaine n’est pas réussie.
- Soumissions de missions et de soutenances regroupées dans des fonctions PostgreSQL transactionnelles.
- Retrait des écritures directes sur les tables sensibles liées aux preuves.
- Suppression de l’auto-attribution du statut « démontré » : les productions restent soumises ou en cours jusqu’à une revue indépendante.
- Ajout de contraintes d’unicité sur les versions de missions.
- Ajout de tests de non-régression sur la complétude du parcours et les soumissions professionnelles.

## Limite assumée

Le score des QCM professionnels est encore calculé dans le client. Il sert à orienter et débloquer une mission, mais ne doit pas être présenté comme une certification indépendante. Une future migration devra stocker les clés de correction côté serveur et calculer le score exclusivement dans PostgreSQL ou une Edge Function.
