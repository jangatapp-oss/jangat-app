export type DiagnosticQuestion={id:string;domain:string;prompt:string;choices:string[];correct:string};
export const DIAGNOSTIC_QUESTIONS:DiagnosticQuestion[]=[
["d1","Objectifs pédagogiques","Parmi ces formulations, laquelle correspond à un objectif pédagogique observable ?",["Comprendre le fonctionnement d’un LMS.","Savoir utiliser un outil auteur.","Configurer une restriction d’accès sur Moodle.","Apprécier l’importance de l’accessibilité."],"Configurer une restriction d’accès sur Moodle."],
["d2","Analyse de la demande","La demande exprimée par un commanditaire est toujours identique au besoin réel.",["Vrai","Faux"],"Faux"],
["d3","Analyse du besoin","Quelle action vient en premier pour analyser un besoin ?",["Choisir un outil auteur","Recueillir des données auprès des parties prenantes","Produire les supports","Planifier l’évaluation finale"],"Recueillir des données auprès des parties prenantes"],
["d4","Scénarisation","Une séquence pédagogique cohérente relie en priorité…",["Objectifs, activités et évaluation","Budget, logo et plateforme","Durée et nombre de diapositives","Formateur et salle"],"Objectifs, activités et évaluation"],
["d5","Évaluation","Quelle évaluation aide à ajuster l’apprentissage en cours de route ?",["Sommative","Certificative","Formative","Administrative"],"Formative"],
["d6","Digital learning","Le blended learning désigne…",["Une formation uniquement en visioconférence","Une combinaison articulée de modalités","Un cours sans accompagnement","Un logiciel LMS"],"Une combinaison articulée de modalités"],
["d7","Vocabulaire professionnel","Qui est le stakeholder d’un projet ?",["Une partie prenante","Un objectif","Un outil auteur","Une modalité"],"Une partie prenante"],
["d8","Analyse de la demande","Dans le cas Logix Forma, qui formule initialement la demande ?",["Les bénéficiaires","Le commanditaire","Le LMS","L’évaluateur"],"Le commanditaire"],
["d9","Analyse du besoin","Un entretien, un questionnaire et l’observation sont…",["Des modalités d’évaluation uniquement","Des méthodes de recueil","Des objectifs","Des livrables"],"Des méthodes de recueil"],
["d10","Objectifs pédagogiques","Quel verbe est le plus directement observable ?",["Comprendre","Connaître","Identifier","Apprécier"],"Identifier"],
["d11","Scénarisation","Une activité doit être choisie avant de définir l’objectif.",["Vrai","Faux"],"Faux"],
["d12","Évaluation","Une grille critériée rend les attentes explicites.",["Vrai","Faux"],"Vrai"],
["d13","Digital learning","Asynchrone signifie…",["Au même moment","À des moments différents","Toujours en salle","Sans interaction"],"À des moments différents"],
["d14","Vocabulaire professionnel","Learning outcomes se traduit le mieux par…",["Parcours apprenant","Résultats attendus de l’apprentissage","Analyse du besoin","Parties prenantes"],"Résultats attendus de l’apprentissage"],
["d15","Analyse de la demande","Quelle question cadre une contrainte ?",["Quel est le délai disponible ?","Quelle couleur préférez-vous ?","Qui a conçu le logo ?","Combien de slides souhaitez-vous ?"],"Quel est le délai disponible ?"],
].map(([id,domain,prompt,choices,correct])=>({id:id as string,domain:domain as string,prompt:prompt as string,choices:choices as string[],correct:correct as string}));

type Step={type:"content"|"quiz"|"vocabulary"|"open";title:string;body?:string;prompt?:string;choices?:string[];correct?:string;feedbackCorrect?:string;feedbackIncorrect?:string;term?:string;translation?:string;pronunciation?:string;lang?:string;criteria?:string[]};
export type Lesson={id:string;moduleId:string;title:string;objective:string;duration:number;steps:Step[]};
const content=(title:string,body:string):Step=>({type:"content",title,body});
const quiz=(title:string,choices:string[],correct:string,why:string):Step=>({type:"quiz",title,choices,correct,feedbackCorrect:why,feedbackIncorrect:`La réponse attendue est « ${correct} ». ${why}`});
const vocab=(term:string,translation:string,pronunciation:string):Step=>({type:"vocabulary",title:"Carte de vocabulaire",term,translation,pronunciation,lang:"en-GB",body:`Écoutez, puis répétez : ${term}. ${translation}`});
export const LESSONS:Lesson[]=[
{id:"m1-l1",moduleId:"module-1",title:"Le métier aujourd’hui",objective:"Identifier les missions actuelles de l’ingénieur pédagogique.",duration:6,steps:[
content("Un métier d’interface","L’ingénieur pédagogique transforme un enjeu professionnel en expérience d’apprentissage. Il analyse, conçoit, coordonne, accompagne, évalue et améliore en continu."),
quiz("Quelle mission relève pleinement du métier ?",["Produire uniquement des diapositives","Articuler besoins, activités et évaluation","Administrer la paie"],"Articuler besoins, activités et évaluation","Le métier relie stratégie, pédagogie, expérience apprenante et mesure des résultats."),
vocab("Instructional design","Conception pédagogique structurée","in-stru-que-cheu-neul di-zaïne"),
content("À retenir","La valeur du métier n’est pas l’outil utilisé, mais la cohérence construite entre le besoin, les objectifs, les modalités et l’évaluation.")
]},
{id:"m1-l2",moduleId:"module-1",title:"Formation ou pédagogie ?",objective:"Distinguer ingénierie de formation et ingénierie pédagogique.",duration:7,steps:[
content("Deux niveaux complémentaires","L’ingénierie de formation organise la réponse globale à un besoin : politique, dispositif, moyens et acteurs. L’ingénierie pédagogique conçoit les situations d’apprentissage : objectifs, séquences, activités et évaluations."),
quiz("Où classer la construction d’une progression d’activités ?",["Ingénierie de formation","Ingénierie pédagogique"],"Ingénierie pédagogique","La progression des activités décrit directement l’expérience d’apprentissage."),
quiz("Où classer l’arbitrage du budget et du calendrier global ?",["Ingénierie de formation","Ingénierie pédagogique"],"Ingénierie de formation","Ces arbitrages structurent le dispositif dans son ensemble."),
content("Le bon réflexe","Ne les opposez pas : une formation robuste nécessite un cadrage de formation solide et une conception pédagogique cohérente.")
]},
{id:"m1-l3",moduleId:"module-1",title:"Digital learning et multimodalité",objective:"Choisir et articuler des modalités adaptées.",duration:7,steps:[
content("Une modalité au service d’un usage","Présentiel, distanciel, synchrone et asynchrone ne sont pas des objectifs. Leur valeur dépend de l’activité, du public, des contraintes et de l’accompagnement."),
vocab("Blended learning","Formation combinant plusieurs modalités articulées","blèn-did leur-ning"),
quiz("Quel scénario est réellement multimodal ?",["Un PDF déposé en ligne","Une classe virtuelle puis une mise en pratique tutorée et un retour différé","Un cours magistral filmé"],"Une classe virtuelle puis une mise en pratique tutorée et un retour différé","La multimodalité repose sur une articulation intentionnelle des temps et interactions."),
vocab("Learning experience","Expérience d’apprentissage vécue par l’apprenant","leur-ning ex-pi-ri-eunce")
]},
{id:"m1-l4",moduleId:"module-1",title:"Mon positionnement professionnel",objective:"Présenter votre valeur professionnelle aujourd’hui.",duration:10,steps:[
content("Une présentation démontrable","Un bon positionnement nomme votre rôle, les problèmes que vous résolvez, vos méthodes et la valeur produite. Évitez la simple liste d’outils."),
{type:"open",title:"Comment présenteriez-vous aujourd’hui votre profil d’ingénieur pédagogique ?",body:"Rédigez une première version de 80 à 150 mots. Elle sera conservée avant votre auto-évaluation.",criteria:["Je nomme clairement mon rôle.","Je relie mes compétences à des besoins professionnels.","Je cite au moins une méthode ou réalisation concrète.","J’explique la valeur produite pour les apprenants ou l’organisation."]},
content("Exemple de structure","Je conçois des parcours à partir de besoins vérifiés. J’articule objectifs observables, activités actives, modalités et évaluations. Je coordonne les parties prenantes et améliore les dispositifs à partir des retours et des données."),
content("Votre livrable","Votre texte constitue la première version de « Mon profil d’ingénieur pédagogique en 2026 ». Vous pourrez le réviser après de nouvelles mises en pratique.")
]},
{id:"m2-l1",moduleId:"module-2",title:"Demande exprimée et besoin réel",objective:"Distinguer la demande initiale du besoin à vérifier.",duration:7,steps:[
content("Le cas Logix Forma","Logix Forma souhaite créer une formation pour des parents et adultes rencontrant des difficultés avec les démarches numériques, administratives ou professionnelles."),
quiz("Quelle est la meilleure première réaction ?",["Choisir immédiatement un LMS","Reformuler la demande et investiguer les situations réelles","Produire le programme"],"Reformuler la demande et investiguer les situations réelles","La demande ouvre l’enquête ; elle ne remplace pas l’analyse du besoin."),
vocab("Skill gap","Écart entre compétences requises et compétences actuelles","skill gap"),
content("La distinction clé","La demande est ce qui est formulé. Le besoin résulte de l’écart constaté entre une situation actuelle et une situation attendue.")
]},
{id:"m2-l2",moduleId:"module-2",title:"Identifier les parties prenantes",objective:"Cartographier commanditaire, bénéficiaires et contributeurs.",duration:6,steps:[
content("Plusieurs regards","Le commanditaire porte l’intention et les contraintes. Les bénéficiaires vivent les difficultés. Les accompagnateurs, experts et responsables techniques influencent aussi la réussite."),
vocab("Stakeholder","Partie prenante influençant ou subissant le projet","stéïk-hol-deur"),
quiz("Qui faut-il consulter pour comprendre les obstacles d’usage ?",["Uniquement le commanditaire","Des bénéficiaires et les personnes qui les accompagnent","Uniquement le fournisseur LMS"],"Des bénéficiaires et les personnes qui les accompagnent","Croiser les regards limite les suppositions et révèle les contraintes concrètes.")
]},
{id:"m2-l3",moduleId:"module-2",title:"Poser les questions de cadrage",objective:"Construire un guide de cadrage utile.",duration:7,steps:[
content("Cadrer avant de concevoir","Interrogez les résultats attendus, les situations problématiques, les publics, les prérequis, les contraintes, les ressources, les délais et les preuves de réussite."),
quiz("Quelle question explore le résultat attendu ?",["Quel changement observable souhaitez-vous après la formation ?","Quel outil auteur préférez-vous ?","Quelle police faut-il utiliser ?"],"Quel changement observable souhaitez-vous après la formation ?","Elle déplace la discussion du livrable vers la performance attendue."),
content("Une pratique exigeante","Une bonne question de cadrage ne confirme pas seulement la demande : elle teste les hypothèses qui la sous-tendent.")
]},
{id:"m2-l4",moduleId:"module-2",title:"Produire une note de cadrage",objective:"Rédiger une première note de cadrage pour Logix Forma.",duration:12,steps:[
content("Votre structure","Organisez la note en six parties : contexte, demande, besoin à confirmer, publics et parties prenantes, contraintes, méthode d’analyse et prochaines décisions."),
{type:"open",title:"Rédigez votre note de cadrage synthétique",body:"JÀNGAT vous guide, mais ne rédige pas à votre place. Visez 250 à 400 mots.",criteria:["La demande initiale est reformulée sans être confondue avec le besoin.","Les bénéficiaires et parties prenantes sont identifiés.","Les contraintes et inconnues sont explicites.","Des questions ou méthodes de recueil sont proposées.","La prochaine décision attendue est claire."]},
content("Checklist finale","Votre note doit permettre à une autre personne de comprendre ce qui est certain, ce qui reste à vérifier et comment l’équipe décidera de la suite.")
]}
];

export const MODULES=[
["module-0",0,"Diagnostic et repositionnement","Situer vos acquis et définir votre point de départ.","s1",[]],
["module-1",1,"Actualiser le métier d’ingénieur pédagogique","Clarifier le rôle, les pratiques actuelles et votre positionnement.","s1",["m1-l1","m1-l2","m1-l3","m1-l4"]],
["module-2",2,"Analyser une demande de formation","Cadrer le cas Logix Forma et produire une note de cadrage.","s1",["m2-l1","m2-l2","m2-l3","m2-l4"]],
["module-3",3,"Analyser les besoins","Transformer les données recueillies en besoins prioritaires.","s2",[]],["module-4",4,"Définir les publics et personas","Décrire les apprenants sans stéréotypes.","s2",[]],["module-5",5,"Construire un référentiel de compétences","Structurer les capacités attendues.","s2",[]],["module-6",6,"Formuler les objectifs pédagogiques","Rendre les résultats observables.","s2",[]],
["module-7",7,"Construire l’architecture","Organiser la progression du parcours.","s3",[]],["module-8",8,"Concevoir un dispositif multimodal","Articuler les modalités.","s3",[]],["module-9",9,"Scénariser les séquences","Construire des séquences cohérentes.","s3",[]],["module-10",10,"Concevoir des activités actives","Faire agir pour apprendre.","s3",[]],
["module-11",11,"Concevoir l’évaluation","Aligner preuves et objectifs.","s4",[]],["module-12",12,"Organiser le tutorat","Soutenir la progression.","s4",[]],["module-13",13,"Accessibilité et inclusion","Concevoir pour la diversité.","s4",[]],
["module-14",14,"Digital learning","Maîtriser les formats numériques.","s5",[]],["module-15",15,"Moodle, H5P, LMS et LXP","Choisir et utiliser l’écosystème.","s5",[]],["module-16",16,"Intelligence artificielle appliquée","Employer l’IA avec discernement.","s5",[]],["module-17",17,"Learning analytics","Lire les données d’apprentissage.","s5",[]],
["module-18",18,"Gérer un projet pédagogique","Piloter acteurs, risques et livrables.","s6",[]],["module-19",19,"Vocabulaire métier et anglais professionnel","Travailler dans un contexte international.","s6",[]],["module-20",20,"Préparer les entretiens","Démontrer ses compétences.","s6",[]],["module-21",21,"Projet final Logix Forma","Assembler une proposition professionnelle.","s6",[]],
].map(([id,order,title,description,section,lessonIds])=>({id:id as string,order:order as number,title:title as string,description:description as string,section:section as string,lessonIds:lessonIds as string[]}));
export const COURSES={id:"jangat-ip-2026",title:"Réactualiser ses compétences d’ingénieur pédagogique et concevoir un parcours multimodal professionnel",description:"Un parcours pratique pour remettre vos méthodes à jour et produire des preuves concrètes.",sections:[{id:"s1",title:"Section 1 — Les fondations"},{id:"s2",title:"Section 2 — Analyser et structurer"},{id:"s3",title:"Section 3 — Concevoir le parcours"},{id:"s4",title:"Section 4 — Évaluer et accompagner"},{id:"s5",title:"Section 5 — Digital learning et innovation"},{id:"s6",title:"Section 6 — Professionnalisation"}]};
