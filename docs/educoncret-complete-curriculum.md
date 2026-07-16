# Parcours professionnel EduConcret — formation intégrale

## Architecture

Le parcours « Directeur de formation et ingénieur pédagogique augmenté par l’IA » prolonge le cursus « Réactualiser ses compétences… ». Il reste verrouillé jusqu’à la complétion de toutes les leçons publiées du prérequis ou à une validation explicite par un responsable autorisé.

Le contenu est organisé en cinq phases et 34 domaines. Chaque domaine comprend :

- huit questions de positionnement : connaître, faire sans IA, faire avec IA, contrôler, expliquer, diriger, transmettre et prouver ;
- un diagnostic qui recommande validation directe, mise à jour courte, consolidation, parcours complet ou mission avancée ;
- au moins trois notions, quatre termes professionnels et quatre étapes de méthode ;
- outils, modèles, contrôles, erreurs, risques et exemple complet ;
- pratique guidée et mission autonome ;
- situation sans IA, situation avec IA contrôlée et audit d’une production IA ;
- explications simple et professionnelle, défense contradictoire et transmission ;
- fiche réflexe, trois questions évaluées, correction détaillée et seconde tentative ;
- application LOGIX FORMA, sources datées, compétences et preuve enregistrable.

Le contenu complet reste accessible quelle que soit la recommandation.

## Les 34 cours

1. Réactualisation de l’ingénierie pédagogique.
2. Conception de parcours multimodaux.
3. Sciences de l’apprentissage et remédiation pédagogique.
4. Learning & Development.
5. Analyse des besoins et développement des compétences.
6. Stratégie de formation.
7. Direction d’un organisme ou service formation.
8. Gestion de projet, programme et portefeuille.
9. Budget, finance et contrôle de gestion appliqués à la formation.
10. Gestion administrative de la formation.
11. Droit de la formation professionnelle.
12. Qualiopi — système qualité complet et audits.
13. RNCP et Répertoire spécifique.
14. OPCO et financements de la formation.
15. Bilan pédagogique et financier.
16. Appels d’offres et appels à projets.
17. Développement commercial et partenariats.
18. Ressources humaines et gestion des compétences.
19. Management et leadership.
20. Formation de formateurs.
21. Négociation et communication exécutive.
22. Mesure de la performance et de l’impact.
23. Digital learning et LMS.
24. Accessibilité numérique.
25. Intelligence artificielle appliquée — niveaux 1 à 3.
26. Assistants IA spécialisés — niveau 4.
27. Agents IA et orchestration — niveau 5.
28. Transformation numérique et IA — niveaux 6 et 7.
29. Veille réglementaire, technologique et métier.
30. Anglais professionnel Learning & Development.
31. Positionnement sur les postes à 60 000 € et plus.
32. Portfolio professionnel.
33. Soutenance professionnelle finale.
34. Réactualisation complète du CV.

## Volumétrie fonctionnelle

- 34 cours complets.
- 272 situations de positionnement.
- 102 questions évaluées avec correction.
- 34 pratiques guidées.
- 34 missions autonomes.
- 34 productions initiales sans IA.
- 34 productions assistées par IA.
- 34 audits de production IA.
- 34 activités de transmission.
- Une soutenance intégrative avec 13 parties, 6 questions contradictoires et 9 critères.
- Neuf documents de carrière : quatre CV, portfolio, rapport, argumentaire, présentation et liste des écarts.

## Missions

Les missions couvrent notamment la refonte pédagogique, le parcours multimodal, la remédiation, le modèle L&D, le plan de développement des compétences, la stratégie à trois ans, l’impact, le LMS, l’accessibilité, l’anglais L&D, le pilotage trimestriel, le portefeuille de transformation, le budget, le circuit documentaire, le droit, le système Qualiopi et son audit blanc, l’opportunité RNCP/RS, le dossier OPCO, le BPF, les appels d’offres, les RH, le commercial, le management, la formation de formateurs, la défense exécutive, les assistants et agents IA, la transformation, la veille, le positionnement 60K+, le portfolio, la soutenance et le dossier complet de candidature.

## Preuves et validation

- Le CV initial alimente uniquement le statut `déclaré`.
- Une mission comportant un critère `Partiel` ou `Non respecté` produit une preuve `in_progress`.
- Une mission dont tous les critères sont respectés produit une preuve `demonstrated`.
- Le statut `confirmed` demeure réservé à une revue humaine future.
- Les quatre CV finaux et les autres documents de carrière ne peuvent reprendre que des preuves `demonstrated` ou `confirmed`.

## Données et sécurité

Les migrations `202607160003_complete_professional_curriculum.sql`, `202607160004_professional_course_catalog.sql` et `202607160005_professional_validation_security.sql` ajoutent la progression, les tentatives, la soutenance versionnée, les documents de carrière, le catalogue publié des 34 cours et la protection des statuts réservés à une validation humaine.

Toutes les données utilisateur utilisent RLS avec `user_id = auth.uid()`. Le catalogue est en lecture seule pour les utilisateurs authentifiés et uniquement lorsqu’il est publié. La validation explicite du prérequis ne peut pas être accordée par l’utilisateur lui-même.

## Actualisation

Les sources enregistrent une date de vérification et une fréquence de revue. Les contenus Qualiopi, droit de la formation, RNCP/RS, OPCO, BPF, appels d’offres, IA, cybersécurité et marché de l’emploi doivent être revus en priorité selon leur échéance.

## Limites honnêtes

- `confirmed` nécessite encore un évaluateur humain ou un workflow d’administration.
- Les dossiers OPCO, BPF, RNCP/RS et appels d’offres sont des productions guidées ; JÀNGAT ne remplace pas l’autorité compétente ni un conseil juridique.
- Le ciblage 60K+ fournit une méthode et une preuve de positionnement, jamais une garantie de rémunération.
- Les documents de carrière sont probatoires et doivent être relus avant envoi.
