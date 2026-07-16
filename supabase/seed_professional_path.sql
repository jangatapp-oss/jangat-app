insert into public.professional_paths(id,app_id,title,prerequisite_course_id,publication_status)
values('a0000000-0000-4000-8000-000000000001','educoncret-director-ai','Directeur de formation et ingénieur pédagogique augmenté par l’IA — Parcours professionnel EduConcret','10000000-0000-4000-8000-000000000001','published')
on conflict(id) do update set title=excluded.title,publication_status=excluded.publication_status,updated_at=now();

insert into public.competency_domains(id,app_id,title,target_description,operational_status,publication_status) values
('a1000000-0000-4000-8000-000000000001','quality','Qualité et Qualiopi','Piloter une démarche qualité probante.','operational','published'),
('a1000000-0000-4000-8000-000000000002','certification','RNCP et Répertoire spécifique','Vérifier une certification et une habilitation.','operational','published'),
('a1000000-0000-4000-8000-000000000003','funding','OPCO et financement','Préparer un dossier sans promettre la prise en charge.','operational','published'),
('a1000000-0000-4000-8000-000000000004','budget','Budget et modèle économique','Arbitrer avec des coûts complets.','operational','published'),
('a1000000-0000-4000-8000-000000000005','strategy','Stratégie et politique compétences','Construire une feuille de route mesurable.','operational','published'),
('a1000000-0000-4000-8000-000000000006','management','Management et gouvernance','Organiser responsabilités et décisions.','operational','published'),
('a1000000-0000-4000-8000-000000000007','ai','Ingénierie pédagogique augmentée par l’IA','Piloter l’IA avec contrôle humain.','operational','published'),
('a1000000-0000-4000-8000-000000000008','commercial','Développement commercial','Structurer une offre pilote.','preparatory','published'),
('a1000000-0000-4000-8000-000000000009','hr','RH et marché de l’emploi','Relier exigences et preuves.','preparatory','published')
on conflict(id) do update set title=excluded.title,target_description=excluded.target_description,operational_status=excluded.operational_status,updated_at=now();

insert into public.competencies(id,domain_id,app_id,title,target_level,publication_status)
select ('a2000000-0000-4000-8000-'||lpad(row_number() over(order by id)::text,12,'0'))::uuid,id,app_id||'-pilot',title,4,'published'
from public.competency_domains
on conflict(app_id) do update set title=excluded.title,target_level=excluded.target_level,updated_at=now();

insert into public.professional_missions(id,domain_id,app_id,title,context,operational_deliverable,critical_criterion,publication_status) values
('a3000000-0000-4000-8000-000000000001','a1000000-0000-4000-8000-000000000001','qualiopi-audit','Réaliser un diagnostic Qualiopi à blanc','EduConcret prépare une revue interne.','Matrice de preuves et plan d’action.','Aucune conformité sans preuve identifiable.','published'),
('a3000000-0000-4000-8000-000000000002','a1000000-0000-4000-8000-000000000002','rncp-check','Vérifier une certification RNCP ou RS','EduConcret envisage une préparation externe.','Note officielle datée de vérification.','Vérifier la fiche active et l’habilitation.','published'),
('a3000000-0000-4000-8000-000000000003','a1000000-0000-4000-8000-000000000003','opco-file','Préparer un dossier OPCO','Une TPE souhaite financer une action.','Checklist, budget et pièces.','Aucune prise en charge présentée comme acquise.','published'),
('a3000000-0000-4000-8000-000000000004','a1000000-0000-4000-8000-000000000004','training-budget','Construire un budget de formation','Parcours hybride de douze participants.','Trois scénarios budgétaires.','Distinguer charges, recettes et trésorerie.','published'),
('a3000000-0000-4000-8000-000000000005','a1000000-0000-4000-8000-000000000005','strategy-note','Rédiger une note stratégique compétences','Trois priorités à douze mois.','Diagnostic et feuille de route.','Chaque priorité découle d’un besoin documenté.','published'),
('a3000000-0000-4000-8000-000000000006','a1000000-0000-4000-8000-000000000006','management-plan','Préparer un plan de management','Équipe distribuée sur huit semaines.','RACI, rituels et risques.','Chaque responsabilité critique a un propriétaire.','published'),
('a3000000-0000-4000-8000-000000000007','a1000000-0000-4000-8000-000000000007','ai-design-review','Auditer un livrable assisté par IA','Scénario proposé par une IA.','Version corrigée et journal d’usage.','L’explication personnelle précède l’IA.','published'),
('a3000000-0000-4000-8000-000000000008','a1000000-0000-4000-8000-000000000008','commercial-offer','Structurer une offre pilote','Offre sans données commerciales réelles.','Canevas et hypothèses.','Les hypothèses ne sont pas des résultats.','published'),
('a3000000-0000-4000-8000-000000000009','a1000000-0000-4000-8000-000000000009','job-market','Analyser une offre d’emploi','Comparer offre et portfolio.','Matrice exigences et preuves.','Aucune démonstration sans preuve.','published')
on conflict(id) do update set title=excluded.title,context=excluded.context,operational_deliverable=excluded.operational_deliverable,critical_criterion=excluded.critical_criterion,updated_at=now();

insert into public.source_registry(id,source_key,title,authority,url,checked_at) values
('a4000000-0000-4000-8000-000000000001','qualiopi-v9','Guide de lecture Qualiopi — version 9','Ministère du Travail','https://travail-emploi.gouv.fr/sites/travail-emploi/files/2024-07/guide_qualiopi_0.pdf','2026-07-16'),
('a4000000-0000-4000-8000-000000000002','fc-vademecum-2026','Vademecum de la certification professionnelle 2026','France compétences','https://www.francecompetences.fr/app/uploads/2026/01/20260121_FC_Vademecum.pdf','2026-07-16'),
('a4000000-0000-4000-8000-000000000003','fc-search','Rechercher une certification','France compétences','https://www.francecompetences.fr/recherche-resultats/','2026-07-16'),
('a4000000-0000-4000-8000-000000000004','service-public-opco','Contrat de professionnalisation et prise en charge OPCO','Service Public','https://entreprendre.service-public.fr/vosdroits/F15478','2026-07-16'),
('a4000000-0000-4000-8000-000000000005','service-public-contribution','Contribution à la formation professionnelle','Service Public','https://entreprendre.service-public.fr/vosdroits/F22570?language=fr','2026-07-16')
on conflict(id) do update set title=excluded.title,url=excluded.url,checked_at=excluded.checked_at,updated_at=now();

insert into public.regulatory_content_versions(source_id,subject,version_label,effective_at,review_due_at,notes)
select id,source_key,case when source_key='qualiopi-v9' then 'V9' else 'consulté-2026-07-16' end,checked_at,'2026-10-16','Revalidation trimestrielle requise avant usage décisionnel.'
from public.source_registry
on conflict(source_id,subject,version_label) do update set review_due_at=excluded.review_due_at,notes=excluded.notes;
