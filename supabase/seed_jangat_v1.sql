insert into public.courses(id,title,description,content_revision,content_hash,publication_status)
values('10000000-0000-4000-8000-000000000001','Réactualiser ses compétences d’ingénieur pédagogique et concevoir un parcours multimodal professionnel','Parcours recommandé pour réactiver et actualiser votre profil d’ingénieur pédagogique.',1,'jangat-course-v1','published')
on conflict(id) do update set title=excluded.title,description=excluded.description,content_hash=excluded.content_hash,updated_at=now();

insert into public.course_sections(id,course_id,title,display_order,content_hash,publication_status) values
('20000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001','Les fondations',1,'section-1-v1','published'),
('20000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000001','Analyser et structurer',2,'section-2-v1','published'),
('20000000-0000-4000-8000-000000000003','10000000-0000-4000-8000-000000000001','Concevoir le parcours',3,'section-3-v1','published'),
('20000000-0000-4000-8000-000000000004','10000000-0000-4000-8000-000000000001','Évaluer et accompagner',4,'section-4-v1','published'),
('20000000-0000-4000-8000-000000000005','10000000-0000-4000-8000-000000000001','Digital learning et innovation',5,'section-5-v1','published'),
('20000000-0000-4000-8000-000000000006','10000000-0000-4000-8000-000000000001','Professionnalisation',6,'section-6-v1','published')
on conflict(id) do update set title=excluded.title,content_hash=excluded.content_hash,updated_at=now();

insert into public.course_units(id,section_id,title,description,display_order,content_hash,publication_status) values
('30000000-0000-4000-8000-000000000000','20000000-0000-4000-8000-000000000001','Diagnostic et repositionnement','Situer les acquis.',0,'unit-0-v1','published'),
('30000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001','Actualiser le métier d’ingénieur pédagogique','Clarifier le rôle actuel.',1,'unit-1-v1','published'),
('30000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000001','Analyser une demande de formation','Cadrer Logix Forma.',2,'unit-2-v1','published'),
('30000000-0000-4000-8000-000000000003','20000000-0000-4000-8000-000000000002','Analyser les besoins','À venir.',3,'unit-3-v1','published'),
('30000000-0000-4000-8000-000000000004','20000000-0000-4000-8000-000000000002','Définir les publics et personas','À venir.',4,'unit-4-v1','published'),
('30000000-0000-4000-8000-000000000005','20000000-0000-4000-8000-000000000002','Construire un référentiel de compétences','À venir.',5,'unit-5-v1','published'),
('30000000-0000-4000-8000-000000000006','20000000-0000-4000-8000-000000000002','Formuler les objectifs pédagogiques','À venir.',6,'unit-6-v1','published'),
('30000000-0000-4000-8000-000000000007','20000000-0000-4000-8000-000000000003','Construire l’architecture','À venir.',7,'unit-7-v1','published'),
('30000000-0000-4000-8000-000000000008','20000000-0000-4000-8000-000000000003','Concevoir un dispositif multimodal','À venir.',8,'unit-8-v1','published'),
('30000000-0000-4000-8000-000000000009','20000000-0000-4000-8000-000000000003','Scénariser les séquences','À venir.',9,'unit-9-v1','published'),
('30000000-0000-4000-8000-000000000010','20000000-0000-4000-8000-000000000003','Concevoir des activités actives','À venir.',10,'unit-10-v1','published'),
('30000000-0000-4000-8000-000000000011','20000000-0000-4000-8000-000000000004','Concevoir l’évaluation','À venir.',11,'unit-11-v1','published'),
('30000000-0000-4000-8000-000000000012','20000000-0000-4000-8000-000000000004','Organiser le tutorat','À venir.',12,'unit-12-v1','published'),
('30000000-0000-4000-8000-000000000013','20000000-0000-4000-8000-000000000004','Accessibilité et inclusion','À venir.',13,'unit-13-v1','published'),
('30000000-0000-4000-8000-000000000014','20000000-0000-4000-8000-000000000005','Digital learning','À venir.',14,'unit-14-v1','published'),
('30000000-0000-4000-8000-000000000015','20000000-0000-4000-8000-000000000005','Moodle, H5P, LMS et LXP','À venir.',15,'unit-15-v1','published'),
('30000000-0000-4000-8000-000000000016','20000000-0000-4000-8000-000000000005','Intelligence artificielle appliquée','À venir.',16,'unit-16-v1','published'),
('30000000-0000-4000-8000-000000000017','20000000-0000-4000-8000-000000000005','Learning analytics','À venir.',17,'unit-17-v1','published'),
('30000000-0000-4000-8000-000000000018','20000000-0000-4000-8000-000000000006','Gérer un projet pédagogique','À venir.',18,'unit-18-v1','published'),
('30000000-0000-4000-8000-000000000019','20000000-0000-4000-8000-000000000006','Vocabulaire métier et anglais professionnel','À venir.',19,'unit-19-v1','published'),
('30000000-0000-4000-8000-000000000020','20000000-0000-4000-8000-000000000006','Préparer les entretiens','À venir.',20,'unit-20-v1','published'),
('30000000-0000-4000-8000-000000000021','20000000-0000-4000-8000-000000000006','Projet final Logix Forma','À venir.',21,'unit-21-v1','published')
on conflict(id) do update set title=excluded.title,description=excluded.description,content_hash=excluded.content_hash,updated_at=now();

insert into public.lessons(id,unit_id,app_id,title,objective,duration_minutes,display_order,content_hash,publication_status) values
('40000000-0000-4000-8000-000000000001','30000000-0000-4000-8000-000000000001','m1-l1','Le métier aujourd’hui','Identifier les missions actuelles.',6,1,'m1-l1-v1','published'),
('40000000-0000-4000-8000-000000000002','30000000-0000-4000-8000-000000000001','m1-l2','Formation ou pédagogie ?','Distinguer les deux ingénieries.',7,2,'m1-l2-v1','published'),
('40000000-0000-4000-8000-000000000003','30000000-0000-4000-8000-000000000001','m1-l3','Digital learning et multimodalité','Articuler des modalités.',7,3,'m1-l3-v1','published'),
('40000000-0000-4000-8000-000000000004','30000000-0000-4000-8000-000000000001','m1-l4','Mon positionnement professionnel','Présenter sa valeur.',10,4,'m1-l4-v1','published'),
('40000000-0000-4000-8000-000000000005','30000000-0000-4000-8000-000000000002','m2-l1','Demande exprimée et besoin réel','Distinguer demande et besoin.',7,1,'m2-l1-v1','published'),
('40000000-0000-4000-8000-000000000006','30000000-0000-4000-8000-000000000002','m2-l2','Identifier les parties prenantes','Cartographier les acteurs.',6,2,'m2-l2-v1','published'),
('40000000-0000-4000-8000-000000000007','30000000-0000-4000-8000-000000000002','m2-l3','Poser les questions de cadrage','Construire un guide utile.',7,3,'m2-l3-v1','published'),
('40000000-0000-4000-8000-000000000008','30000000-0000-4000-8000-000000000002','m2-l4','Produire une note de cadrage','Rédiger la note Logix Forma.',12,4,'m2-l4-v1','published')
on conflict(id) do update set title=excluded.title,objective=excluded.objective,content_hash=excluded.content_hash,updated_at=now();

insert into public.lesson_steps(id,lesson_id,step_key,step_type,content,display_order,content_hash,publication_status)
select ('50000000-0000-4000-8000-'||lpad(n::text,12,'0'))::uuid,('40000000-0000-4000-8000-'||lpad(n::text,12,'0'))::uuid,
case when n<=4 then 'm1-l'||n||':0' else 'm2-l'||(n-4)||':0' end,'content',jsonb_build_object('seeded',true),1,'step-'||n||'-v1','published'
from generate_series(1,8) n
on conflict(id) do update set content=excluded.content,content_hash=excluded.content_hash,updated_at=now();

insert into public.questions(id,app_id,domain,question_type,prompt,correct_answer,publication_status) values
('60000000-0000-4000-8000-000000000001','d1','Objectifs pédagogiques','single','Objectif observable','"Configurer une restriction d’accès sur Moodle."'::jsonb,'published'),
('60000000-0000-4000-8000-000000000002','d2','Analyse de la demande','boolean','Demande et besoin identiques','"Faux"'::jsonb,'published'),
('60000000-0000-4000-8000-000000000003','d3','Analyse du besoin','single','Première action','"Recueillir des données auprès des parties prenantes"'::jsonb,'published'),
('60000000-0000-4000-8000-000000000004','d4','Scénarisation','single','Cohérence','"Objectifs, activités et évaluation"'::jsonb,'published'),
('60000000-0000-4000-8000-000000000005','d5','Évaluation','single','Ajuster en cours','"Formative"'::jsonb,'published'),
('60000000-0000-4000-8000-000000000006','d6','Digital learning','single','Blended learning','"Une combinaison articulée de modalités"'::jsonb,'published'),
('60000000-0000-4000-8000-000000000007','d7','Vocabulaire professionnel','single','Stakeholder','"Une partie prenante"'::jsonb,'published'),
('60000000-0000-4000-8000-000000000008','d8','Analyse de la demande','single','Commanditaire','"Le commanditaire"'::jsonb,'published'),
('60000000-0000-4000-8000-000000000009','d9','Analyse du besoin','single','Méthodes de recueil','"Des méthodes de recueil"'::jsonb,'published'),
('60000000-0000-4000-8000-000000000010','d10','Objectifs pédagogiques','single','Verbe observable','"Identifier"'::jsonb,'published'),
('60000000-0000-4000-8000-000000000011','d11','Scénarisation','boolean','Activité avant objectif','"Faux"'::jsonb,'published'),
('60000000-0000-4000-8000-000000000012','d12','Évaluation','boolean','Grille explicite','"Vrai"'::jsonb,'published'),
('60000000-0000-4000-8000-000000000013','d13','Digital learning','single','Asynchrone','"À des moments différents"'::jsonb,'published'),
('60000000-0000-4000-8000-000000000014','d14','Vocabulaire professionnel','single','Learning outcomes','"Résultats attendus de l’apprentissage"'::jsonb,'published'),
('60000000-0000-4000-8000-000000000015','d15','Analyse de la demande','single','Contrainte','"Quel est le délai disponible ?"'::jsonb,'published')
on conflict(id) do update set prompt=excluded.prompt,correct_answer=excluded.correct_answer,updated_at=now();

update public.questions
set feedback_correct='Réponse correcte. Votre raisonnement s’appuie sur un critère observable.',
    feedback_incorrect='Une erreur utile vaut mieux qu’une réponse devinée. Relisez le principe associé.'
where app_id like 'd%';

insert into public.vocabulary_terms(id,term,language,translation,pronunciation,definition) values
('90000000-0000-4000-8000-000000000001','instructional design','en','conception pédagogique structurée','in-stru-que-cheu-neul di-zaïne','Processus systématique de conception pédagogique.'),
('90000000-0000-4000-8000-000000000002','learning outcomes','en','résultats attendus de l’apprentissage','leur-ning aoute-comez','Résultats observables attendus.'),
('90000000-0000-4000-8000-000000000003','blended learning','en','formation multimodale articulée','blèn-did leur-ning','Combinaison intentionnelle de modalités.'),
('90000000-0000-4000-8000-000000000004','stakeholder','en','partie prenante','stéïk-hol-deur','Acteur concerné ou influent.'),
('90000000-0000-4000-8000-000000000005','learning design','en','conception de l’apprentissage','leur-ning di-zaïne','Conception centrée sur l’expérience apprenante.'),
('90000000-0000-4000-8000-000000000006','learning experience','en','expérience d’apprentissage','leur-ning ex-pi-ri-eunce','Expérience vécue par l’apprenant.'),
('90000000-0000-4000-8000-000000000007','learner journey','en','parcours apprenant','leur-neur djeur-ni','Enchaînement des étapes vécues.'),
('90000000-0000-4000-8000-000000000008','learning objectives','en','objectifs pédagogiques','leur-ning ob-djek-tivz','Actions observables visées.'),
('90000000-0000-4000-8000-000000000009','skill gap','en','écart de compétences','skill gap','Écart entre niveau actuel et attendu.'),
('90000000-0000-4000-8000-000000000010','feedback','en','retour pédagogique','fid-bak','Information utile à la progression.'),
('90000000-0000-4000-8000-000000000011','ingénierie de formation','fr','training engineering',null,'Conception du dispositif global.'),
('90000000-0000-4000-8000-000000000012','ingénierie pédagogique','fr','instructional design',null,'Conception des situations d’apprentissage.'),
('90000000-0000-4000-8000-000000000013','analyse de la demande','fr','request analysis',null,'Clarification de la demande exprimée.'),
('90000000-0000-4000-8000-000000000014','analyse du besoin','fr','needs analysis',null,'Vérification de l’écart à traiter.'),
('90000000-0000-4000-8000-000000000015','commanditaire','fr','sponsor',null,'Acteur qui porte la demande.'),
('90000000-0000-4000-8000-000000000016','partie prenante','fr','stakeholder',null,'Acteur concerné par le projet.'),
('90000000-0000-4000-8000-000000000017','public cible','fr','target audience',null,'Population prioritairement concernée.'),
('90000000-0000-4000-8000-000000000018','objectif pédagogique','fr','learning objective',null,'Résultat observable visé.'),
('90000000-0000-4000-8000-000000000019','modalité','fr','learning modality',null,'Condition de réalisation pédagogique.'),
('90000000-0000-4000-8000-000000000020','scénarisation','fr','learning scenario design',null,'Organisation cohérente des séquences.'),
('90000000-0000-4000-8000-000000000021','évaluation formative','fr','formative assessment',null,'Évaluation qui soutient la progression.')
on conflict(id) do update set translation=excluded.translation,pronunciation=excluded.pronunciation,updated_at=now();
