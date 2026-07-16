# Parcours professionnel EduConcret — MVP

## Place dans JÀNGAT

Le parcours « Directeur de formation et ingénieur pédagogique augmenté par l’IA » prolonge le cursus « Réactualiser ses compétences… ». Il ne le remplace pas.

L’accès est accordé lorsque toutes les leçons actuellement publiées du cursus préalable sont terminées, ou lorsqu’un responsable autorisé positionne `profiles.current_course_validated` à `true`. Cette colonne n’est pas modifiable par l’utilisateur authentifié.

## Modèle de preuve

- Le CV 2026 alimente uniquement des compétences au statut `déclaré`.
- Le positionnement distingue dix dimensions et trois niveaux d’autonomie IA.
- Une mission exige une explication personnelle avant IA et un livrable opérationnel.
- Les résultats critériés, l’usage déclaré de l’IA et la preuve sont stockés séparément.
- Une suggestion de CV n’est produite qu’à partir d’une preuve `demonstrated` ou `confirmed`.
- `confirmed` est réservé à une future revue humaine ; le MVP ne l’attribue pas automatiquement.

## Blocs opérationnels

Le MVP rend utilisables les blocs Qualiopi, RNCP/RS, OPCO, budget, stratégie, management et ingénierie pédagogique augmentée par l’IA. Chaque bloc fournit une notion, une méthode, un exemple EduConcret, des sources datées et une mission.

## Blocs préparatoires

Le développement commercial et l’analyse du marché de l’emploi disposent d’une structure, d’une mission et de tables dédiées. Ils sont explicitement signalés comme préparatoires tant que des données réelles et des connecteurs de collecte ne sont pas disponibles.

## Sécurité Supabase

Les tables de catalogue sont en lecture seule pour les utilisateurs authentifiés. Toutes les tables de positionnement, missions, critères, preuves, IA, marché de l’emploi, CV et revues utilisent une politique RLS fondée sur `user_id = auth.uid()`.

La migration `202607160002_professional_path_mvp.sql` est additive et ne supprime aucune donnée existante.

## Limites du MVP

- Pas de validation humaine, de signature ni de workflow évaluateur.
- Pas d’import automatique d’offres d’emploi.
- Pas de génération de fichiers bureautiques pour les livrables.
- Pas de benchmark dynamique : les sources sont enregistrées et datées, mais leur révision reste un processus éditorial.
- Pas de calcul financier certifié ni de décision automatique sur l’éligibilité OPCO.
