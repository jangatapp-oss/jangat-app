import {
  REQUIRED_POSITIONING_DIMENSIONS,
  type CompleteProfessionalCourse,
  type PositioningDimension,
  type PositioningQuestion,
} from "./curriculumTypes";

type PositioningContent = Record<
  PositioningDimension,
  { prompt: string; evidenceHint: string }
>;

function buildPositioning(content: PositioningContent): PositioningQuestion[] {
  return REQUIRED_POSITIONING_DIMENSIONS.map((dimension) => ({
    dimension,
    ...content[dimension],
  }));
}

export const PEDAGOGY_COURSES: CompleteProfessionalCourse[] = [
  {
    id: "pedagogy-refresh",
    order: 1,
    phase: 1,
    title: "Réactualisation de l’ingénierie pédagogique",
    shortTitle: "Ingénierie pédagogique",
    objective:
      "Auditer puis refondre un dispositif existant en alignant besoin, compétences, situations d’apprentissage, évaluations et preuves d’impact.",
    targetRole: "Responsable d’ingénierie pédagogique",
    durationHours: 12,
    lastUpdated: "2026-07-16",
    sourceIds: ["iso-21001", "digcompedu", "unesco-futures-education"],
    positioning: buildPositioning({
      know: {
        prompt:
          "Distinguez objectif d’activité, objectif pédagogique et compétence professionnelle, puis donnez un exemple de chacun.",
        evidenceHint:
          "Une réponse recevable définit les trois notions et montre leur articulation dans un parcours réel.",
      },
      do_without_ai: {
        prompt:
          "À partir d’un programme que vous connaissez, réalisez sans IA un contrôle d’alignement entre besoin, objectifs, activités et évaluation.",
        evidenceHint:
          "Joindre une matrice annotée et au moins deux écarts argumentés.",
      },
      do_with_ai: {
        prompt:
          "Expliquez comment vous demanderiez à une IA de challenger un scénario déjà conçu, sans lui déléguer la décision pédagogique.",
        evidenceHint:
          "Le protocole précise contexte, données exclues, critères, vérifications et décision humaine.",
      },
      control: {
        prompt:
          "Repérez dans un programme trois formulations qui ne permettent pas de vérifier l’acquisition et proposez une correction.",
        evidenceHint:
          "Les reformulations utilisent des actions observables, des conditions et un niveau attendu.",
      },
      explain: {
        prompt:
          "Expliquez à un formateur pourquoi un contenu intéressant ne constitue pas à lui seul une situation d’apprentissage.",
        evidenceHint:
          "L’explication relie activité cognitive, feedback, entraînement et transfert.",
      },
      direct: {
        prompt:
          "Comment arbitreriez-vous entre raccourcir un programme et maintenir toutes les demandes des experts métier ?",
        evidenceHint:
          "La décision s’appuie sur les compétences critiques, le risque métier, les prérequis et les preuves.",
      },
      transmit: {
        prompt:
          "Préparez la trame d’un atelier de 30 minutes pour apprendre à une équipe à écrire des objectifs évaluables.",
        evidenceHint:
          "La trame comporte démonstration, exercice, correction et critère de réussite.",
      },
      prove: {
        prompt:
          "Quelle production antérieure prouve votre capacité à concevoir ou restructurer un parcours, et que démontre-t-elle exactement ?",
        evidenceHint:
          "Citer une production datée, votre rôle, les choix réalisés, le résultat et une limite.",
      },
    }),
    diagnosticAdvice: {
      direct_validation:
        "Présentez une matrice d’alignement récente et défendez deux arbitrages devant un pair ; le cours reste consultable.",
      short_update:
        "Concentrez-vous sur l’écriture de preuves d’acquisition, la traçabilité des décisions et la revue critique assistée par IA.",
      consolidation:
        "Travaillez les étapes d’analyse et d’alignement, puis refondez une séquence courte avant la mission complète.",
      full_course:
        "Suivez l’ensemble du cours dans l’ordre et utilisez un dispositif existant comme fil rouge.",
      advanced_mission:
        "Pilotez une revue croisée de deux dispositifs et produisez une doctrine d’ingénierie réutilisable par l’équipe.",
    },
    essentials: [
      "L’ingénierie part d’une situation de travail ou d’un changement attendu, pas d’une liste de contenus.",
      "L’alignement rend cohérents compétences visées, critères, activités, ressources et évaluations.",
      "Une conception professionnelle est itérative : prototype, test, observation, correction et décision documentée.",
      "La preuve d’acquisition doit être définie avant la production détaillée des supports.",
    ],
    vocabulary: [
      {
        term: "Alignement pédagogique",
        definition:
          "Cohérence vérifiable entre résultats attendus, situations d’apprentissage et modalités d’évaluation.",
      },
      {
        term: "Compétence",
        definition:
          "Mobilisation pertinente de ressources pour agir dans une famille de situations avec un niveau attendu.",
      },
      {
        term: "Scénario pédagogique",
        definition:
          "Organisation temporelle des activités, interactions, ressources, consignes, feedbacks et évaluations.",
      },
      {
        term: "Preuve d’acquisition",
        definition:
          "Trace observable permettant de statuer, selon des critères explicites, sur la maîtrise visée.",
      },
      {
        term: "Granularité",
        definition:
          "Niveau de découpage d’un objectif, d’une activité ou d’une ressource permettant son usage et son évaluation.",
      },
    ],
    methodSteps: [
      {
        title: "Cadrer la commande",
        detail:
          "Identifier commanditaire, public, situations de travail, problème à résoudre, contraintes, acteurs et indicateurs attendus. Séparer faits, demandes et hypothèses.",
        control:
          "Le problème est formulé en écart observable et validé par au moins un acteur métier.",
      },
      {
        title: "Définir les compétences et preuves",
        detail:
          "Décrire les actions attendues, conditions de réalisation, ressources mobilisées, critères, seuils et productions probantes.",
        control:
          "Chaque compétence possède au moins une situation d’évaluation authentique et des critères observables.",
      },
      {
        title: "Construire l’architecture",
        detail:
          "Sérier prérequis, étapes, modalités, entraînements, feedbacks et évaluations en tenant compte du temps réellement disponible.",
        control:
          "Aucune activité n’est conservée sans contribution explicite à une compétence ou à un prérequis.",
      },
      {
        title: "Prototyper et tester",
        detail:
          "Produire une séquence représentative, la faire tester par un échantillon, observer les obstacles et recueillir des traces comparables.",
        control:
          "Le test comporte scénario, observateur, critères, incidents et décision de modification.",
      },
      {
        title: "Industrialiser et réviser",
        detail:
          "Versionner le scénario, répartir les responsabilités, organiser la maintenance et fixer une revue à partir des données d’usage et de résultat.",
        control:
          "Le propriétaire, la version, les sources, les règles de mise à jour et la date de revue sont inscrits.",
      },
    ],
    tools: [
      {
        name: "Matrice d’alignement",
        use: "Relier besoin, compétence, objectif, activité, preuve, critère et indicateur sur une seule vue.",
      },
      {
        name: "Storyboard pédagogique",
        use: "Décrire écran ou séquence, consigne, action apprenant, feedback, durée et ressource avant production.",
      },
      {
        name: "Journal de décisions",
        use: "Tracer hypothèses, arbitrages, auteurs, date, preuve disponible et conséquence sur le dispositif.",
      },
      {
        name: "Protocole de test utilisateur",
        use: "Observer compréhension, navigation, charge, erreurs et transfert sur un prototype.",
      },
    ],
    templates: [
      {
        name: "Canevas de note de cadrage",
        structure:
          "Contexte | problème | publics | situations cibles | compétences | contraintes | parties prenantes | indicateurs | risques | validation.",
      },
      {
        name: "Matrice d’alignement",
        structure:
          "Compétence | condition | critère | activité d’entraînement | feedback | évaluation | preuve | décision.",
      },
      {
        name: "Fiche de revue pédagogique",
        structure:
          "Version | testeurs | constats | gravité | hypothèse causale | correction | responsable | nouvelle vérification.",
      },
    ],
    checkpoints: [
      "Le besoin de formation est distingué d’un problème d’organisation, d’outil ou de management.",
      "Les verbes des objectifs décrivent une action observable dans des conditions données.",
      "Les évaluations produisent les preuves nécessaires avant toute décision de validation.",
      "La charge prévue est compatible avec le temps apprenant et les contraintes d’exploitation.",
    ],
    commonErrors: [
      "Commencer par choisir un outil auteur ou un format avant d’avoir défini la performance attendue.",
      "Confondre exposition à l’information, participation à une activité et acquisition d’une compétence.",
      "Évaluer uniquement la satisfaction alors que l’objectif porte sur une pratique professionnelle.",
      "Multiplier les contenus pour rassurer les experts au détriment de l’entraînement et du feedback.",
    ],
    risks: [
      {
        risk: "Former sur un problème qui relève en réalité du processus ou du management.",
        prevention:
          "Valider l’écart de performance et ses causes avec des données, des observations et le commanditaire.",
      },
      {
        risk: "Produire un dispositif trop dense pour être terminé ou transféré.",
        prevention:
          "Prioriser les situations critiques, budgéter la charge et tester un prototype avec le public.",
      },
      {
        risk: "Utiliser une proposition IA plausible mais pédagogiquement incohérente.",
        prevention:
          "Exiger une matrice d’alignement, contrôler chaque source et consigner les arbitrages humains.",
      },
    ],
    example: {
      context:
        "LOGIX FORMA dispose d’un module de trois heures sur la préparation d’une session. Le support compte 94 diapositives, mais les nouveaux coordinateurs oublient encore des contrôles essentiels.",
      approach:
        "Moctar observe deux préparations, analyse quatre incidents, définit la compétence « sécuriser une session à J-7 », construit une checklist évaluée sur un dossier simulé, réduit l’exposé à 35 minutes et ajoute deux cas progressifs avec feedback. Un prototype est testé par trois bénévoles.",
      result:
        "Le parcours passe à deux heures, chaque participant produit un dossier complet, les oublis critiques du test diminuent de 7 à 1 et la version suivante renforce le contrôle des pièces financeur. Le résultat reste à confirmer en situation réelle.",
    },
    guidedPractice: {
      prompt:
        "Auditez une séquence de 45 minutes consacrée à l’accueil d’un apprenant et rendez son alignement vérifiable.",
      steps: [
        "Formuler la situation professionnelle et l’écart que la séquence doit réduire.",
        "Écrire une compétence avec action, conditions et critères.",
        "Associer une preuve, deux activités d’entraînement et un feedback.",
        "Supprimer ou justifier chaque contenu qui ne contribue pas directement à l’objectif.",
        "Faire relire la matrice par un pair et intégrer ou refuser ses remarques en les motivant.",
      ],
    },
    mission: {
      id: "mission-pedagogy-refresh",
      title: "Refondre un module existant de LOGIX FORMA",
      context:
        "La direction souhaite actualiser un module utilisé depuis plus de deux ans, sans allonger sa durée et avec une preuve claire de la compétence acquise.",
      deliverable:
        "Dossier versionné comprenant note de cadrage, matrice avant/après, scénario détaillé, évaluation critériée, prototype, protocole de test et journal des décisions.",
      criticalCriterion:
        "La refonte doit démontrer un alignement complet entre problème, compétence, activités, évaluation et preuve.",
      criteria: [
        "Les choix reposent sur des faits ou des hypothèses explicitement identifiées.",
        "Chaque activité contribue à une compétence ou à un prérequis justifié.",
        "L’évaluation observe une production professionnelle et utilise des critères discriminants.",
        "Les résultats du test entraînent des décisions documentées.",
      ],
    },
    withoutAi:
      "Réaliser seul le premier diagnostic, formuler la compétence, construire la matrice d’alignement et justifier les suppressions de contenus.",
    withAi:
      "Après le diagnostic personnel, demander à une IA trois architectures alternatives contraintes par la durée, puis comparer leurs compromis dans une grille sans transmettre de données personnelles.",
    aiAuditChecklist: [
      "Les objectifs proposés sont-ils réellement observables et adaptés au contexte fourni ?",
      "Chaque activité possède-t-elle une fonction pédagogique démontrable ?",
      "Les références annoncées existent-elles et ont-elles été consultées à la source ?",
      "L’IA a-t-elle inventé des contraintes, résultats, publics ou normes absents du cadrage ?",
      "Les décisions finales et leurs motifs sont-ils attribuables à un responsable humain ?",
    ],
    deliverableTemplate: [
      "Page de garde, version, auteur, date et commanditaire",
      "Problème, données disponibles, limites et hypothèses",
      "Compétences, situations cibles, critères et preuves",
      "Matrice d’alignement avant/après",
      "Scénario, ressources, évaluations et feedbacks",
      "Test, constats, corrections et décisions",
      "Annexes et sources datées",
    ],
    explanations: {
      simple:
        "Concevoir une formation, c’est organiser les meilleures occasions de s’entraîner et de prouver qu’on sait agir, pas seulement expliquer un sujet.",
      professional:
        "La refonte traduit un besoin de performance en compétences, preuves et expériences d’apprentissage alignées, testées puis versionnées.",
      defense:
        "Devant la direction, présenter l’écart initial, les données, les renoncements, la matrice d’alignement, les résultats du prototype et les points qui restent à confirmer.",
    },
    transmissionActivity:
      "Animer une revue d’alignement de 45 minutes : un formateur apporte une séquence, l’équipe repère collectivement les activités orphelines, réécrit un objectif et construit sa preuve.",
    reflexCard: [
      "Quel problème observable devons-nous réduire ?",
      "Qui doit savoir faire quoi, dans quelles conditions ?",
      "Quelle production prouvera la maîtrise ?",
      "Quel entraînement prépare réellement à cette production ?",
      "Quel feedback permet de progresser ?",
      "Que devons-nous tester avant généralisation ?",
    ],
    knowledgeCheck: [
      {
        id: "ped-refresh-q1",
        prompt:
          "Quel élément faut-il idéalement définir avant de détailler les supports d’un parcours ?",
        choices: [
          "La charte graphique",
          "La preuve attendue et ses critères",
          "Le nombre maximal de diapositives",
          "Le logiciel auteur",
        ],
        correct: "La preuve attendue et ses critères",
        correction:
          "La preuve et ses critères guident les activités et les ressources ; les choix de support viennent ensuite.",
      },
      {
        id: "ped-refresh-q2",
        prompt:
          "Un expert exige dix chapitres mais seuls quatre contribuent aux situations critiques. Quelle décision est la plus solide ?",
        choices: [
          "Conserver les dix sans discussion",
          "Supprimer tout contenu théorique",
          "Prioriser les quatre, documenter l’arbitrage et proposer les autres en ressources facultatives",
          "Demander à une IA de décider",
        ],
        correct:
          "Prioriser les quatre, documenter l’arbitrage et proposer les autres en ressources facultatives",
        correction:
          "La priorisation protège l’entraînement critique tout en conservant un accès raisonné aux compléments.",
      },
      {
        id: "ped-refresh-q3",
        prompt: "Quelle trace démontre le mieux qu’une refonte a été contrôlée ?",
        choices: [
          "Une impression positive du concepteur",
          "Un support plus moderne",
          "Un test documenté relié à des critères et à des corrections",
          "Un grand nombre de ressources",
        ],
        correct:
          "Un test documenté relié à des critères et à des corrections",
        correction:
          "Le contrôle exige des observations comparables et une décision traçable, pas seulement une préférence.",
      },
    ],
    correctionGuide: [
      "Reprendre chaque réponse incorrecte en citant la règle d’alignement concernée.",
      "Corriger la matrice du cas fil rouge et surligner le lien compétence-preuve-activité.",
      "Faire valider les nouveaux critères par un pair en expliquant oralement l’arbitrage.",
      "Effectuer une seconde tentative avec un autre module ; la réussite exige trois réponses justes et aucun défaut critique d’alignement.",
    ],
    logixApplication:
      "Choisir un module réellement utilisé par LOGIX FORMA, conserver sa version initiale, conduire la refonte avec un formateur et archiver la comparaison, le test et les décisions comme preuve de portfolio.",
    competencies: [
      "Diagnostiquer un besoin de développement des compétences",
      "Aligner compétences, activités, évaluations et preuves",
      "Prototyper et tester un dispositif",
      "Arbitrer et documenter une refonte pédagogique",
    ],
  },
  {
    id: "multimodal-pathways",
    order: 2,
    phase: 1,
    title: "Conception de parcours multimodaux",
    shortTitle: "Parcours multimodaux",
    objective:
      "Concevoir une expérience cohérente combinant présence, distance synchrone, asynchrone, accompagnement et activité en situation de travail.",
    targetRole: "Architecte de parcours multimodal",
    durationHours: 12,
    lastUpdated: "2026-07-16",
    sourceIds: ["digcompedu", "cast-udl", "w3c-wcag22"],
    positioning: buildPositioning({
      know: {
        prompt:
          "Expliquez la différence entre juxtaposer plusieurs modalités et concevoir un véritable parcours multimodal.",
        evidenceHint:
          "La réponse traite continuité, fonction de chaque modalité, transitions, données et accompagnement.",
      },
      do_without_ai: {
        prompt:
          "Construisez sans IA une matrice de choix de modalités pour trois objectifs de natures différentes.",
        evidenceHint:
          "Les choix sont reliés au geste attendu, au public, aux contraintes et à la preuve.",
      },
      do_with_ai: {
        prompt:
          "Décrivez un usage contrôlé de l’IA pour décliner une ressource dans plusieurs modalités accessibles.",
        evidenceHint:
          "Le scénario inclut validation éditoriale, test d’accessibilité, sources et protection des données.",
      },
      control: {
        prompt:
          "Auditez un parcours alternant classe virtuelle et capsules : quels signaux révèlent une rupture d’expérience ?",
        evidenceHint:
          "Citer transitions, consignes, charge, redondance, accès, feedback et continuité des traces.",
      },
      explain: {
        prompt:
          "Expliquez à un client pourquoi une capsule vidéo ne remplace pas automatiquement une séance présentielle.",
        evidenceHint:
          "L’explication compare les fonctions pédagogiques plutôt que les formats.",
      },
      direct: {
        prompt:
          "Comment arbitreriez-vous une demande de 100 % distanciel pour un apprentissage nécessitant observation et manipulation ?",
        evidenceHint:
          "La décision propose des alternatives, seuils de sécurité, preuves et conditions de faisabilité.",
      },
      transmit: {
        prompt:
          "Proposez une activité pour apprendre à des formateurs à choisir une modalité selon l’objectif.",
        evidenceHint:
          "L’activité utilise des cas contrastés, une matrice et une justification collective.",
      },
      prove: {
        prompt:
          "Présentez un parcours hybride déjà organisé et identifiez ce qui prouve sa cohérence au-delà du planning.",
        evidenceHint:
          "Joindre architecture, transitions, rôles, traces d’usage et résultat ou limite.",
      },
    }),
    diagnosticAdvice: {
      direct_validation:
        "Soumettez l’architecture d’un parcours réel à un test de continuité, d’accessibilité et d’alignement.",
      short_update:
        "Actualisez les principes de présence à distance, d’accessibilité et de données de continuité.",
      consolidation:
        "Travaillez la matrice de choix puis scénarisez une semaine multimodale complète.",
      full_course:
        "Suivez le parcours complet en prototypant chaque transition sur le cas LOGIX FORMA.",
      advanced_mission:
        "Concevez deux scénarios de continuité dégradée et formez les intervenants à les déclencher.",
    },
    essentials: [
      "Chaque modalité doit remplir une fonction pédagogique précise et non reproduire mécaniquement la précédente.",
      "Les transitions, consignes, échéances et canaux d’aide constituent une part du scénario.",
      "La présence pédagogique, sociale et organisationnelle doit être planifiée, y compris en asynchrone.",
      "Accessibilité, équipement, connexion, temps disponible et autonomie conditionnent les choix de modalités.",
    ],
    vocabulary: [
      {
        term: "Multimodalité",
        definition:
          "Combinaison organisée de modalités dont les fonctions et transitions forment une expérience continue.",
      },
      {
        term: "Synchrone",
        definition:
          "Interaction réalisée au même moment, en présence ou à distance, avec feedback immédiat possible.",
      },
      {
        term: "Asynchrone",
        definition:
          "Activité réalisée à des moments différents, nécessitant consignes, traces et délais de réponse explicites.",
      },
      {
        term: "AFEST",
        definition:
          "Action de formation en situation de travail articulant mises en situation et séquences réflexives selon un cadre formalisé.",
      },
      {
        term: "Continuité pédagogique",
        definition:
          "Maintien des objectifs, repères, interactions, traces et soutiens d’une modalité à l’autre.",
      },
    ],
    methodSteps: [
      {
        title: "Cartographier apprenants et contraintes",
        detail:
          "Décrire situations, équipement, compétences numériques, disponibilité, accessibilité, lieux, encadrement et aléas.",
        control:
          "Les contraintes sont issues d’entretiens ou de données, pas seulement d’un persona imaginé.",
      },
      {
        title: "Attribuer une fonction à chaque modalité",
        detail:
          "Pour chaque objectif, comparer démonstration, entraînement, collaboration, réflexion, transfert, feedback et preuve.",
        control:
          "La modalité retenue apporte une valeur identifiable et possède une solution de remplacement.",
      },
      {
        title: "Scénariser le parcours et les transitions",
        detail:
          "Décrire avant, pendant et après chaque séquence : déclencheur, consigne, durée, rôle, trace, feedback, relance et accès à l’aide.",
        control:
          "Un apprenant test peut dire à tout moment quoi faire, où, avant quand et avec quel soutien.",
      },
      {
        title: "Organiser accompagnement et présence",
        detail:
          "Planifier tutorat, communautés, permanence, feedback, détection du décrochage et escalade selon le niveau d’autonomie.",
        control:
          "Chaque alerte possède un seuil, un responsable, un délai et une action.",
      },
      {
        title: "Tester les parcours nominal et dégradé",
        detail:
          "Tester sur mobile et ordinateur, avec connexion limitée, technologie d’assistance et absence à une séance synchrone.",
        control:
          "Les défauts bloquants sont corrigés et le plan de continuité est communiqué avant lancement.",
      },
    ],
    tools: [
      {
        name: "Matrice objectif-modalité",
        use: "Comparer fonctions, contraintes, interactions, preuve, coût et solution de secours.",
      },
      {
        name: "Learner journey map",
        use: "Visualiser actions, émotions, points de contact, données, irritants et soutiens au fil du parcours.",
      },
      {
        name: "Storyboard de classe virtuelle",
        use: "Séquençer apports, interactions, consignes, production et vérification toutes les quelques minutes.",
      },
      {
        name: "Plan de continuité",
        use: "Prévoir panne, absence, débit faible, équipement incompatible et indisponibilité d’un intervenant.",
      },
    ],
    templates: [
      {
        name: "Architecture multimodale",
        structure:
          "Étape | objectif | modalité | durée | interaction | ressource | preuve | accompagnement | alternative accessible.",
      },
      {
        name: "Contrat d’accompagnement",
        structure:
          "Canaux | horaires | délai de réponse | alertes | relances | rôle tuteur | rôle manager | escalade.",
      },
      {
        name: "Plan de continuité apprenant",
        structure:
          "Incident | impact | solution immédiate | ressource de remplacement | responsable | message | rattrapage.",
      },
    ],
    checkpoints: [
      "La charge totale inclut consultation, production, interaction, évaluation et rattrapage.",
      "Chaque transition précise la prochaine action et conserve les traces nécessaires.",
      "Une alternative accessible existe pour tout contenu ou interaction indispensable.",
      "Les responsables des relances et du support connaissent leurs délais d’intervention.",
    ],
    commonErrors: [
      "Transformer huit heures de présentiel en huit heures de visioconférence.",
      "Multiplier les plateformes et canaux sans point d’entrée ni règle d’usage.",
      "Déposer des ressources asynchrones sans activité, échéance, feedback ni relance.",
      "Tester uniquement sur l’ordinateur et la connexion de l’équipe de conception.",
    ],
    risks: [
      {
        risk: "Décrochage invisible en asynchrone.",
        prevention:
          "Définir des traces précoces, seuils d’alerte, relances graduées et contact humain.",
      },
      {
        risk: "Exclusion d’un apprenant par l’équipement ou l’accessibilité.",
        prevention:
          "Recueillir les besoins, tester les alternatives et organiser prêt ou adaptation avant démarrage.",
      },
      {
        risk: "Rupture de données ou de consignes entre intervenants et plateformes.",
        prevention:
          "Définir une source de vérité, un propriétaire, des règles de synchronisation et une vérification.",
      },
    ],
    example: {
      context:
        "LOGIX FORMA doit former 18 coordinateurs répartis dans trois régions, disponibles deux heures par semaine, à la sécurisation administrative d’une session.",
      approach:
        "Le parcours combine diagnostic mobile, capsule accessible de 12 minutes, atelier synchrone de traitement d’un dossier, binôme asynchrone, mise en situation sur un dossier fictif et retour réflexif avec tuteur. Une page unique donne accès aux consignes ; les absents disposent d’un cas de rattrapage accompagné.",
      result:
        "Seize participants terminent dans les délais ; deux sont relancés dès la première trace manquante. Tous produisent une checklist exploitable. Le test révèle une consigne ambiguë sur la convention, corrigée avant la seconde cohorte.",
    },
    guidedPractice: {
      prompt:
        "Transformez une journée présentielle sur la préparation d’une session en parcours de deux semaines sans perdre la pratique ni le feedback.",
      steps: [
        "Identifier les moments qui nécessitent interaction immédiate, démonstration, entraînement ou réflexion.",
        "Construire deux architectures possibles et comparer charge, accès, coût et preuve.",
        "Scénariser précisément une transition asynchrone-synchrone.",
        "Ajouter accompagnement, alertes et scénario de rattrapage.",
        "Faire tester le parcours sur téléphone et corriger les deux irritants les plus graves.",
      ],
    },
    mission: {
      id: "mission-multimodal-path",
      title: "Créer un parcours multimodal LOGIX FORMA",
      context:
        "Une entreprise cliente souhaite former douze salariés travaillant en horaires décalés, avec seulement deux regroupements possibles.",
      deliverable:
        "Architecture complète, learner journey, scénarios des séquences, contrat d’accompagnement, plan de continuité, charge détaillée et prototype mobile.",
      criticalCriterion:
        "Chaque modalité, transition et intervention humaine doit être justifiée par une fonction et testée du point de vue apprenant.",
      criteria: [
        "La charge et les contraintes réelles du public sont prises en compte.",
        "Les activités produisent des preuves alignées sur les compétences.",
        "Le tutorat, les relances et le rattrapage sont opérationnels.",
        "Le parcours reste utilisable sur mobile et en situation dégradée.",
      ],
    },
    withoutAi:
      "Construire la première architecture, estimer la charge et rédiger le contrat d’accompagnement sans IA à partir des données du public.",
    withAi:
      "Faire générer par IA des scénarios d’incidents et des variantes de consignes, puis sélectionner seulement celles qui résistent aux tests d’alignement, d’accessibilité et de faisabilité.",
    aiAuditChecklist: [
      "La proposition confond-elle modalité et objectif pédagogique ?",
      "Les durées comprennent-elles réellement lecture, production, interaction et correction ?",
      "Les alternatives sont-elles équivalentes pour l’acquisition et non seulement pour l’accès au contenu ?",
      "Des outils, fonctionnalités ou normes inexistants ont-ils été inventés ?",
      "Les données apprenant utilisées sont-elles minimisées et protégées ?",
    ],
    deliverableTemplate: [
      "Publics, données, besoins d’adaptation et contraintes",
      "Compétences et preuves attendues",
      "Architecture et justification des modalités",
      "Parcours apprenant et transitions",
      "Accompagnement, alertes, relances et rattrapage",
      "Accessibilité, continuité et assistance",
      "Prototype, test, corrections et sources",
    ],
    explanations: {
      simple:
        "Un bon parcours multimodal donne à chaque format un rôle utile et guide la personne sans rupture du début à la preuve finale.",
      professional:
        "L’architecture articule modalités, interactions, accompagnement et traces selon les objectifs, les contraintes du public et les conditions de transfert.",
      defense:
        "Face au client, justifier le coût et la durée de chaque modalité, présenter le parcours dégradé et démontrer comment les preuves restent comparables.",
    },
    transmissionActivity:
      "Faire travailler les formateurs sur trois objectifs contrastés ; chacun choisit une modalité, défend sa fonction, puis conçoit une alternative accessible avec le groupe.",
    reflexCard: [
      "Quelle fonction pédagogique doit être remplie ?",
      "Cette modalité est-elle accessible et réaliste pour le public ?",
      "Que fait exactement l’apprenant et quelle trace reste ?",
      "Comment sait-il ce qui vient ensuite ?",
      "Qui intervient s’il bloque ou disparaît ?",
      "Quelle solution fonctionne si la modalité nominale échoue ?",
    ],
    knowledgeCheck: [
      {
        id: "multimodal-q1",
        prompt: "Qu’est-ce qui caractérise le mieux un parcours multimodal cohérent ?",
        choices: [
          "L’usage d’au moins trois technologies",
          "Une fonction et des transitions explicites pour chaque modalité",
          "La réduction maximale du présentiel",
          "La mise à disposition de nombreuses ressources",
        ],
        correct:
          "Une fonction et des transitions explicites pour chaque modalité",
        correction:
          "La diversité de formats ne suffit pas : leur contribution et leur articulation doivent être conçues.",
      },
      {
        id: "multimodal-q2",
        prompt:
          "Quelle est la première réponse pertinente lorsqu’un apprenant ne produit aucune trace asynchrone ?",
        choices: [
          "Attendre l’évaluation finale",
          "Le déclarer non motivé",
          "Déclencher l’alerte prévue et vérifier accès, compréhension et disponibilité",
          "Ajouter une nouvelle plateforme",
        ],
        correct:
          "Déclencher l’alerte prévue et vérifier accès, compréhension et disponibilité",
        correction:
          "Une alerte précoce permet de diagnostiquer la cause réelle et d’apporter un soutien proportionné.",
      },
      {
        id: "multimodal-q3",
        prompt:
          "Une vidéo non sous-titrée contient une démonstration indispensable. Quelle mesure est suffisante ?",
        choices: [
          "Indiquer que la vidéo est facultative",
          "Fournir une alternative équivalente accessible et corriger la ressource",
          "Réduire son volume sonore",
          "Envoyer les diapositives sans explication",
        ],
        correct:
          "Fournir une alternative équivalente accessible et corriger la ressource",
        correction:
          "L’accès doit porter sur la même information et la même possibilité d’apprentissage, pas sur une ressource appauvrie.",
      },
    ],
    correctionGuide: [
      "Reprendre l’architecture en inscrivant une fonction mesurable dans chaque ligne.",
      "Calculer de nouveau la charge depuis les actions réelles d’un apprenant test.",
      "Ajouter une transition, une alerte et une alternative accessible au point le plus fragile.",
      "Effectuer la seconde tentative sur un public soumis à une contrainte différente et obtenir trois réponses justes.",
    ],
    logixApplication:
      "Déployer le prototype auprès d’un petit groupe LOGIX FORMA, conserver les traces de navigation et d’accompagnement, puis produire une version corrigée accompagnée d’un plan de généralisation.",
    competencies: [
      "Choisir une modalité selon sa fonction pédagogique",
      "Scénariser transitions et accompagnement",
      "Assurer continuité et accessibilité d’un parcours",
      "Tester une expérience multimodale sur mobile et en mode dégradé",
    ],
  },
  {
    id: "learning-sciences-remediation",
    order: 3,
    phase: 1,
    title: "Sciences de l’apprentissage et remédiation pédagogique",
    shortTitle: "Apprentissage et remédiation",
    objective:
      "Transformer des résultats de recherche robustes en décisions pédagogiques prudentes et construire une remédiation ciblée à partir d’erreurs observées.",
    targetRole: "Ingénieur pédagogique expert de l’apprentissage",
    durationHours: 14,
    lastUpdated: "2026-07-16",
    sourceIds: [
      "ies-organizing-instruction",
      "deans-for-impact-science-learning",
      "cast-udl",
    ],
    positioning: buildPositioning({
      know: {
        prompt:
          "Expliquez les effets respectifs de la récupération active, de l’espacement, de l’entrelacement et du feedback.",
        evidenceHint:
          "La réponse distingue mécanismes, conditions d’usage et limites sans promettre un effet automatique.",
      },
      do_without_ai: {
        prompt:
          "Analysez sans IA cinq erreurs d’apprenants et regroupez-les selon leur cause pédagogique probable.",
        evidenceHint:
          "Produire une typologie argumentée séparant erreur de connaissance, procédure, stratégie, consigne et attention.",
      },
      do_with_ai: {
        prompt:
          "Comment utiliseriez-vous une IA pour produire des exercices de remédiation sans accepter de corrigés erronés ?",
        evidenceHint:
          "Le protocole prévoit exemples de référence, génération limitée, vérification experte et essai apprenant.",
      },
      control: {
        prompt:
          "Un concepteur affirme que les « styles d’apprentissage » imposent de donner un format différent à chaque personne. Comment contrôlez-vous cette affirmation ?",
        evidenceHint:
          "La réponse demande une source primaire, distingue préférence et efficacité, et propose une accessibilité multimodale raisonnée.",
      },
      explain: {
        prompt:
          "Expliquez simplement pourquoi relire plusieurs fois donne parfois une illusion de maîtrise.",
        evidenceHint:
          "Mentionner familiarité, effort de récupération et nécessité d’un test sans support.",
      },
      direct: {
        prompt:
          "Une cohorte échoue massivement à une étape. Comment décidez-vous entre remédiation individuelle et refonte du dispositif ?",
        evidenceHint:
          "L’arbitrage s’appuie sur fréquence, distribution, cause, criticité et données du scénario.",
      },
      transmit: {
        prompt:
          "Concevez un mini-atelier permettant à des formateurs de transformer une erreur en feedback actionnable.",
        evidenceHint:
          "L’atelier fait observer, diagnostiquer, formuler un indice et vérifier une nouvelle tentative.",
      },
      prove: {
        prompt:
          "Apportez une situation où vous avez modifié un enseignement après observation des difficultés.",
        evidenceHint:
          "Identifier données initiales, hypothèse, modification, résultat comparé et prudence d’interprétation.",
      },
    }),
    diagnosticAdvice: {
      direct_validation:
        "Analysez un jeu d’erreurs réel et démontrez que la remédiation choisie répond à la cause plutôt qu’au seul symptôme.",
      short_update:
        "Actualisez les preuves sur récupération, espacement, charge cognitive et mythes pédagogiques.",
      consolidation:
        "Entraînez-vous au diagnostic d’erreurs et à la construction de feedbacks avant la mission.",
      full_course:
        "Suivez le cours complet et collectez progressivement des erreurs anonymisées sur le cas fil rouge.",
      advanced_mission:
        "Conduisez une expérimentation contrôlée à petite échelle, documentez ses limites et formez l’équipe à la réplication.",
    },
    essentials: [
      "Apprendre exige une activité cognitive pertinente ; l’exposition et le sentiment de facilité ne prouvent pas la maîtrise.",
      "Récupération active, espacement, exemples guidés et feedback peuvent renforcer l’apprentissage lorsqu’ils correspondent à la tâche.",
      "Une erreur est une donnée à interpréter avant de choisir une remédiation.",
      "La charge cognitive se pilote en réduisant l’inutile, en guidant les novices et en augmentant progressivement l’autonomie.",
      "Une recherche informe une décision ; elle ne remplace ni l’analyse du contexte ni la mesure locale.",
    ],
    vocabulary: [
      {
        term: "Récupération active",
        definition:
          "Effort consistant à rappeler ou mobiliser une information sans l’avoir immédiatement sous les yeux.",
      },
      {
        term: "Espacement",
        definition:
          "Répartition des reprises dans le temps afin de rendre la récupération plus durable.",
      },
      {
        term: "Charge cognitive",
        definition:
          "Demande imposée aux ressources mentales limitées pendant le traitement d’une tâche.",
      },
      {
        term: "Feedback élaboré",
        definition:
          "Retour qui indique l’écart, donne une information utile pour agir et prépare une nouvelle tentative.",
      },
      {
        term: "Remédiation",
        definition:
          "Intervention ciblée visant une difficulté diagnostiquée, suivie d’une vérification de son dépassement.",
      },
    ],
    methodSteps: [
      {
        title: "Recueillir des traces d’erreur",
        detail:
          "Collecter productions, verbalisations, temps, étapes abandonnées et conditions, en anonymisant les données.",
        control:
          "Chaque constat décrit une action observable et non une étiquette comme « manque de motivation ».",
      },
      {
        title: "Émettre un diagnostic différentiel",
        detail:
          "Comparer causes possibles : prérequis, représentation, procédure, stratégie, consigne, surcharge, feedback ou contexte.",
        control:
          "Au moins deux hypothèses sont examinées et la donnée permettant de les départager est identifiée.",
      },
      {
        title: "Choisir une intervention ciblée",
        detail:
          "Associer à la cause un exemple guidé, une décomposition, une récupération, un indice, une pratique supplémentaire ou une modification de consigne.",
        control:
          "La remédiation modifie le processus responsable de l’erreur et conserve l’objectif final.",
      },
      {
        title: "Faire produire une nouvelle tentative",
        detail:
          "Donner un feedback proportionné puis proposer une tâche proche mais non identique pour vérifier le transfert.",
        control:
          "Le critère de réussite est défini avant la nouvelle tentative et comparé à la production initiale.",
      },
      {
        title: "Décider et capitaliser",
        detail:
          "Conclure prudemment, modifier si nécessaire la conception et intégrer l’erreur type dans le guide formateur.",
        control:
          "La conclusion distingue observation, interprétation, décision et limite des données.",
      },
    ],
    tools: [
      {
        name: "Taxonomie d’erreurs",
        use: "Coder les erreurs par étape, type, fréquence, criticité, cause probable et donnée manquante.",
      },
      {
        name: "Carte de charge cognitive",
        use: "Repérer informations simultanées, redondances, sauts de procédure, éléments parasites et guidage disponible.",
      },
      {
        name: "Calendrier d’espacement",
        use: "Planifier récupérations variées après la séance et jusqu’au transfert en situation de travail.",
      },
      {
        name: "Protocole avant-après",
        use: "Comparer performances sur tâches équivalentes en conservant conditions, critères et limites.",
      },
    ],
    templates: [
      {
        name: "Fiche de diagnostic d’erreur",
        structure:
          "Tâche | attendu | action observée | étape | fréquence | hypothèses | donnée de contrôle | cause retenue | remédiation.",
      },
      {
        name: "Scénario de remédiation",
        structure:
          "Erreur cible | objectif maintenu | indice | exemple | pratique | feedback | nouvelle tentative | seuil.",
      },
      {
        name: "Note d’usage d’un résultat scientifique",
        structure:
          "Question | source | population étudiée | résultat | limites | transférabilité | décision locale | mesure.",
      },
    ],
    checkpoints: [
      "Une difficulté n’est pas attribuée à la personne avant vérification des conditions et de la conception.",
      "Le feedback n’effectue pas toute la tâche à la place de l’apprenant.",
      "La nouvelle tentative mesure la même compétence dans une situation suffisamment différente.",
      "Les conclusions causales restent proportionnées au protocole et au volume de données.",
    ],
    commonErrors: [
      "Donner davantage du même contenu sans diagnostiquer le mécanisme de l’erreur.",
      "Présenter une stratégie fondée sur la recherche comme une recette valable partout.",
      "Confondre satisfaction, fluidité ou vitesse avec apprentissage durable.",
      "Révéler immédiatement la bonne réponse sans demander une nouvelle récupération.",
    ],
    risks: [
      {
        risk: "Étiqueter durablement un apprenant à partir de quelques erreurs.",
        prevention:
          "Décrire les comportements, multiplier les occasions et permettre une seconde tentative équitable.",
      },
      {
        risk: "Appliquer un neuromythe séduisant.",
        prevention:
          "Vérifier la qualité de la source, le consensus, la population et les réplications avant décision.",
      },
      {
        risk: "Collecter des traces trop identifiantes ou hors finalité.",
        prevention:
          "Minimiser, anonymiser, limiter l’accès et fixer une durée de conservation justifiée.",
      },
    ],
    example: {
      context:
        "Dans un exercice LOGIX FORMA, 9 participants sur 12 envoient une convention avant de contrôler les informations obligatoires.",
      approach:
        "L’analyse montre que la checklist est présentée après l’exemple complet et reste visible pendant le quiz, créant une reconnaissance sans récupération. La séquence est réorganisée : exemple guidé annoté, retrait progressif du guidage, deux dossiers contrastés espacés et feedback sur l’étape manquante.",
      result:
        "À la seconde tentative, 10 participants contrôlent toutes les informations ; deux reçoivent une remédiation ciblée sur la chronologie. La cohorte suivante devra confirmer que l’amélioration ne dépend pas seulement de la répétition.",
    },
    guidedPractice: {
      prompt:
        "À partir de quatre productions erronées sur une procédure, construisez une remédiation sans abaisser l’exigence finale.",
      steps: [
        "Décrire précisément l’écart à chaque étape sans interpréter la personne.",
        "Proposer deux causes concurrentes et une donnée permettant de choisir.",
        "Construire un indice minimal, un exemple guidé et un exercice de récupération.",
        "Préparer une nouvelle tentative avec critères identiques mais données différentes.",
        "Rédiger la conclusion possible et les limites avant de connaître le résultat.",
      ],
    },
    mission: {
      id: "mission-learning-remediation",
      title: "Construire et vérifier une remédiation LOGIX FORMA",
      context:
        "Une compétence critique présente un taux d’erreur élevé lors d’une simulation de préparation administrative.",
      deliverable:
        "Corpus anonymisé, typologie, diagnostic différentiel, scénario de remédiation, supports, résultats des deux tentatives et note de prudence.",
      criticalCriterion:
        "La remédiation doit répondre à une cause étayée et être suivie d’une nouvelle tentative comparable.",
      criteria: [
        "Les observations sont séparées des interprétations.",
        "Les choix pédagogiques sont reliés à des sources et au contexte.",
        "Le feedback permet une action autonome sans donner tout le résultat.",
        "La conclusion mentionne les limites et la suite de la mesure.",
      ],
    },
    withoutAi:
      "Coder personnellement un premier corpus d’erreurs, formuler les hypothèses et concevoir la remédiation avant toute assistance.",
    withAi:
      "Utiliser l’IA pour proposer des causes alternatives et générer des exercices isomorphes, puis vérifier chaque réponse et rejeter toute inférence non soutenue.",
    aiAuditChecklist: [
      "L’IA transforme-t-elle une erreur observée en trait psychologique non démontré ?",
      "Les exercices générés évaluent-ils la même compétence et ont-ils une solution exacte ?",
      "Les explications reposent-elles sur une source identifiable plutôt que sur un neuromythe ?",
      "Les données transmises sont-elles anonymisées et strictement nécessaires ?",
      "La proposition laisse-t-elle une véritable récupération et une décision humaine ?",
    ],
    deliverableTemplate: [
      "Situation, compétence et critères",
      "Corpus anonymisé et méthode de recueil",
      "Typologie, fréquences et criticité",
      "Hypothèses et données discriminantes",
      "Remédiation et justification scientifique",
      "Tentatives, résultats et interprétation",
      "Décision, limites et capitalisation",
    ],
    explanations: {
      simple:
        "Une erreur ne dit pas seulement qu’une personne ne sait pas ; elle aide à comprendre où elle bloque et quel nouvel essai lui sera utile.",
      professional:
        "La remédiation s’appuie sur des traces, un diagnostic différentiel et une intervention ciblée dont l’effet est vérifié sur une tâche comparable.",
      defense:
        "Devant un client, distinguer corrélation et causalité, présenter les données anonymisées, justifier le mécanisme visé et annoncer les limites.",
    },
    transmissionActivity:
      "Faire coder le même corpus par deux formateurs, comparer les divergences, construire un feedback commun puis simuler l’entretien de remédiation.",
    reflexCard: [
      "Qu’est-ce qui est observé, exactement ?",
      "À quelle étape l’écart apparaît-il ?",
      "Quelles causes concurrentes restent possibles ?",
      "Quelle donnée les départage ?",
      "Quelle aide minimale prépare une nouvelle tentative ?",
      "Que pouvons-nous conclure — et ne pas conclure ?",
    ],
    knowledgeCheck: [
      {
        id: "learning-science-q1",
        prompt:
          "Après une réponse erronée, quel feedback favorise le mieux une nouvelle tentative autonome ?",
        choices: [
          "Donner immédiatement tout le corrigé",
          "Indiquer seulement « faux »",
          "Nommer l’écart et fournir un indice lié à l’étape à revoir",
          "Recommander de relire tout le cours",
        ],
        correct:
          "Nommer l’écart et fournir un indice lié à l’étape à revoir",
        correction:
          "Un feedback élaboré oriente l’action sans supprimer l’effort nécessaire à la correction.",
      },
      {
        id: "learning-science-q2",
        prompt:
          "Quel constat justifie d’abord une revue du dispositif plutôt qu’une remédiation individuelle ?",
        choices: [
          "Une personne hésite",
          "La majorité échoue au même endroit dans les mêmes conditions",
          "Un participant préfère la vidéo",
          "Le formateur trouve le support ancien",
        ],
        correct:
          "La majorité échoue au même endroit dans les mêmes conditions",
        correction:
          "Une concentration d’erreurs au même point suggère un problème commun de prérequis, consigne ou conception à examiner.",
      },
      {
        id: "learning-science-q3",
        prompt: "Pourquoi espacer les récupérations ?",
        choices: [
          "Pour augmenter artificiellement la durée",
          "Pour rendre chaque exercice identique",
          "Pour solliciter de nouveau la mémoire après un délai et renforcer la disponibilité",
          "Pour éviter tout feedback",
        ],
        correct:
          "Pour solliciter de nouveau la mémoire après un délai et renforcer la disponibilité",
        correction:
          "L’espacement rend la récupération plus exigeante et aide la consolidation lorsque la pratique reste adaptée.",
      },
    ],
    correctionGuide: [
      "Reclasser chaque erreur en séparant fait observé, hypothèse et cause confirmée.",
      "Remplacer toute recette générale par une justification reliée à la tâche et à une source.",
      "Concevoir une nouvelle tentative qui conserve compétence et seuil sans reproduire les mêmes données.",
      "Effectuer une seconde analyse sur un nouveau corpus ; la réussite exige trois réponses justes et un diagnostic sans inférence personnelle abusive.",
    ],
    logixApplication:
      "Créer un registre anonymisé des erreurs récurrentes de LOGIX FORMA, former les intervenants à son codage et n’intégrer une remédiation au parcours standard qu’après un test documenté.",
    competencies: [
      "Interpréter prudemment des résultats issus des sciences de l’apprentissage",
      "Diagnostiquer des erreurs à partir de traces",
      "Concevoir feedback et remédiation ciblés",
      "Évaluer une intervention et expliciter ses limites",
    ],
  },
  {
    id: "learning-development",
    order: 4,
    phase: 2,
    title: "Learning & Development",
    shortTitle: "Learning & Development",
    objective:
      "Passer d’une logique de catalogue à une fonction L&D orientée capacités, performance, expérience collaborateur et développement continu.",
    targetRole: "Learning & Development Manager",
    durationHours: 12,
    lastUpdated: "2026-07-16",
    sourceIds: ["cipd-ld-factsheet", "iso-30422", "atd-capability-model"],
    positioning: buildPositioning({
      know: {
        prompt:
          "Distinguez formation, développement, apprentissage dans le travail et performance support.",
        evidenceHint:
          "La réponse précise quand chaque levier est pertinent et comment leurs résultats se mesurent.",
      },
      do_without_ai: {
        prompt:
          "Construisez sans IA un portefeuille L&D trimestriel reliant trois priorités métier à des capacités.",
        evidenceHint:
          "Présenter arbitrages, populations, solutions, responsables et indicateurs.",
      },
      do_with_ai: {
        prompt:
          "Décrivez comment une IA pourrait accélérer la cartographie de capacités sans figer des compétences inventées.",
        evidenceHint:
          "Le protocole combine sources métier, ateliers humains, vérification et versionnement.",
      },
      control: {
        prompt:
          "Auditez une demande « il faut former tout le monde au leadership » avant de l’accepter.",
        evidenceHint:
          "Rechercher population, situations, écart, causes, résultat attendu et alternatives.",
      },
      explain: {
        prompt:
          "Expliquez à un manager pourquoi le transfert dépend aussi de l’environnement après la formation.",
        evidenceHint:
          "Mentionner opportunité de pratique, soutien, outils, feedback et reconnaissance.",
      },
      direct: {
        prompt:
          "Comment arrêteriez-vous une action populaire dont les données ne montrent aucun usage métier ?",
        evidenceHint:
          "La réponse prévoit analyse, dialogue, option de redesign et décision transparente.",
      },
      transmit: {
        prompt:
          "Préparez un briefing pour aider les managers à soutenir l’apprentissage avant, pendant et après une action.",
        evidenceHint:
          "Le briefing attribue des actions observables et des délais aux managers.",
      },
      prove: {
        prompt:
          "Quelle réalisation prouve que vous avez relié une action pédagogique à une priorité d’organisation ?",
        evidenceHint:
          "Fournir contexte, priorité, rôle, solution, indicateur et résultat ou limite.",
      },
    }),
    diagnosticAdvice: {
      direct_validation:
        "Défendez un portefeuille L&D réel devant une direction en reliant chaque investissement à une capacité prioritaire.",
      short_update:
        "Actualisez l’approche performance consulting, écosystème d’apprentissage et gouvernance des données.",
      consolidation:
        "Travaillez la qualification des demandes et la construction d’un portefeuille avant la mission.",
      full_course:
        "Suivez toutes les étapes sur une année fictive de développement LOGIX FORMA.",
      advanced_mission:
        "Concevez un modèle opérationnel L&D complet avec offre de services, SLA, gouvernance et boucle d’impact.",
    },
    essentials: [
      "La fonction L&D développe des capacités utiles à la stratégie ; elle ne se limite pas à produire ou acheter des cours.",
      "Une demande de formation doit être qualifiée comme un problème de performance avec causes et parties prenantes.",
      "L’apprentissage formel, social, expérientiel et le soutien à la performance forment un écosystème.",
      "Managers et environnement de travail sont coproducteurs du transfert.",
      "Le portefeuille L&D doit rendre visibles choix, renoncements, risques, coûts et effets.",
    ],
    vocabulary: [
      {
        term: "Capability",
        definition:
          "Capacité collective durable d’une organisation à accomplir une activité stratégique dans ses conditions réelles.",
      },
      {
        term: "Performance consulting",
        definition:
          "Démarche de diagnostic visant la performance attendue et ses causes avant de choisir une intervention.",
      },
      {
        term: "Learning ecosystem",
        definition:
          "Ensemble coordonné de personnes, pratiques, outils, contenus, données et situations qui permettent d’apprendre.",
      },
      {
        term: "Learning in the flow of work",
        definition:
          "Accès à une aide, une pratique ou une ressource au moment où le travail l’exige.",
      },
      {
        term: "Portefeuille L&D",
        definition:
          "Ensemble priorisé des interventions d’apprentissage et de performance piloté comme un investissement.",
      },
    ],
    methodSteps: [
      {
        title: "Traduire les priorités en capacités",
        detail:
          "Interroger stratégie, risques, clients et opérations pour décrire les capacités collectives nécessaires dans un horizon donné.",
        control:
          "Chaque capacité est liée à une décision, un processus ou un résultat métier identifiable.",
      },
      {
        title: "Qualifier les demandes",
        detail:
          "Clarifier performance actuelle et attendue, population, fréquence, causes, conséquences et soutien disponible.",
        control:
          "Les causes non pédagogiques sont explicites et adressées à leur propriétaire.",
      },
      {
        title: "Composer l’écosystème",
        detail:
          "Combiner formation, pratique, communautés, mentorat, outils de travail, documentation et management selon la cause.",
        control:
          "Chaque composante possède une fonction, un propriétaire et une condition d’usage.",
      },
      {
        title: "Prioriser le portefeuille",
        detail:
          "Comparer valeur stratégique, urgence, population, faisabilité, coût, risque et capacité interne ; annoncer les renoncements.",
        control:
          "La règle de priorisation est appliquée de manière comparable à toutes les demandes.",
      },
      {
        title: "Piloter adoption et effets",
        detail:
          "Mesurer accès, progression, usage, transfert et résultat ; tenir une revue avec métiers et managers.",
        control:
          "Chaque indicateur déclenche une question ou une décision prédéfinie.",
      },
    ],
    tools: [
      {
        name: "Carte des capacités",
        use: "Relier ambition stratégique, capacités collectives, rôles, comportements et niveau actuel.",
      },
      {
        name: "Entretien de performance consulting",
        use: "Qualifier une demande en examinant attendu, actuel, causes, données, acteurs et solutions.",
      },
      {
        name: "Matrice de portefeuille",
        use: "Comparer valeur, urgence, risque, effort, réutilisabilité et maturité de chaque intervention.",
      },
      {
        name: "Contrat de transfert manager",
        use: "Organiser objectifs, occasions de pratique, feedback et revue après l’action.",
      },
    ],
    templates: [
      {
        name: "One-page L&D brief",
        structure:
          "Priorité | capacité | écart | causes | populations | intervention | rôle manager | preuve | coût | décision.",
      },
      {
        name: "Fiche portefeuille",
        structure:
          "Initiative | valeur | urgence | effort | risques | dépendances | responsable | jalons | indicateurs | statut.",
      },
      {
        name: "Offre de services L&D",
        structure:
          "Service | demande éligible | entrée | délai | rôles | livrable | qualité | donnée | escalade.",
      },
    ],
    checkpoints: [
      "Aucune action n’entre au portefeuille avec pour seul motif une préférence de format.",
      "Le rôle du manager dans le transfert est convenu avant le lancement.",
      "Les capacités stratégiques et les compétences individuelles ne sont pas confondues.",
      "Un signal d’arrêt ou de redesign est défini pour chaque initiative importante.",
    ],
    commonErrors: [
      "Traiter le volume d’heures ou le taux d’accès comme une preuve de valeur.",
      "Utiliser le modèle 70-20-10 comme une proportion obligatoire plutôt que comme une invitation à diversifier.",
      "Lancer une académie sans préciser la capacité stratégique qu’elle construit.",
      "Accumuler les demandes sans règle de sortie ni arbitrage explicite.",
    ],
    risks: [
      {
        risk: "Fonction L&D perçue comme centre de coût et preneur de commandes.",
        prevention:
          "Co-construire les priorités, publier la règle d’arbitrage et rapporter des effets métier prudents.",
      },
      {
        risk: "Intervention pédagogique sur une cause organisationnelle.",
        prevention:
          "Conduire le diagnostic de performance et faire attribuer chaque cause à un responsable.",
      },
      {
        risk: "Données L&D nombreuses mais inutilisables pour décider.",
        prevention:
          "Partir des décisions attendues, limiter les indicateurs et documenter définition et propriétaire.",
      },
    ],
    example: {
      context:
        "LOGIX FORMA reçoit six demandes simultanées : outil LMS, vente, Qualiopi, animation, conventions et management, pour une capacité de production limitée.",
      approach:
        "Moctar relie les demandes aux priorités : conformité, fiabilité opérationnelle et acquisition clients. Il diagnostique les causes, regroupe conventions et Qualiopi dans une capacité « sécuriser les dossiers », transforme la demande LMS en aide au travail et reporte le management faute de sponsor disponible.",
      result:
        "Le portefeuille retient trois interventions avec managers propriétaires, libère 30 % de capacité de conception et rend le report explicite. Les effets doivent être revus à 60 jours sur la complétude des dossiers et le temps de traitement.",
    },
    guidedPractice: {
      prompt:
        "Transformez quatre demandes de formation hétérogènes en portefeuille L&D arbitrable.",
      steps: [
        "Reformuler chaque demande en performance actuelle et attendue.",
        "Identifier causes pédagogiques et non pédagogiques.",
        "Relier les capacités à une priorité ou un risque.",
        "Composer une intervention et expliciter le rôle du manager.",
        "Prioriser avec une règle commune et annoncer une décision de report.",
      ],
    },
    mission: {
      id: "mission-ld-operating-model",
      title: "Construire le modèle opérationnel L&D de LOGIX FORMA",
      context:
        "L’activité se développe et les demandes ne peuvent plus être traitées au fil de l’eau par une seule personne.",
      deliverable:
        "Carte des capacités, processus de demande, offre de services, portefeuille à douze mois, gouvernance, contrat de transfert et tableau de décision.",
      criticalCriterion:
        "Chaque intervention doit répondre à une capacité prioritaire et attribuer les causes non pédagogiques.",
      criteria: [
        "La qualification des demandes est reproductible.",
        "La priorisation rend visibles choix et renoncements.",
        "Les rôles de L&D, des managers et des métiers sont explicites.",
        "Les indicateurs sont reliés à des décisions de poursuite, correction ou arrêt.",
      ],
    },
    withoutAi:
      "Conduire un entretien de qualification, cartographier les capacités et réaliser le premier arbitrage sans IA.",
    withAi:
      "Utiliser une IA pour challenger les regroupements de capacités et simuler les objections de trois parties prenantes, puis vérifier toutes les inférences dans les notes d’entretien.",
    aiAuditChecklist: [
      "Les capacités proposées sont-elles attestées par la stratégie et les situations de travail ?",
      "L’IA a-t-elle transformé des intitulés de cours en capacités sans analyse ?",
      "Les scores de priorité reposent-ils sur des données ou sur une fausse précision ?",
      "Des informations RH sensibles ont-elles été retirées avant traitement ?",
      "Chaque recommandation peut-elle être expliquée et contredite par un décideur humain ?",
    ],
    deliverableTemplate: [
      "Mandat et principes de la fonction L&D",
      "Priorités et carte des capacités",
      "Qualification et traitement des demandes",
      "Offre de services et niveaux d’engagement",
      "Portefeuille, arbitrages et ressources",
      "Gouvernance, transfert et données",
      "Revue, risques et feuille de route",
    ],
    explanations: {
      simple:
        "L&D aide l’organisation à mieux agir : parfois avec une formation, parfois avec de la pratique, un outil, un manager ou une meilleure organisation.",
      professional:
        "Le modèle opérationnel L&D transforme des priorités en capacités, qualifie les écarts et pilote un portefeuille d’interventions mesurables.",
      defense:
        "Devant une direction, expliciter la règle de priorité, les demandes refusées, la responsabilité des métiers et les signaux qui déclencheront un réinvestissement.",
    },
    transmissionActivity:
      "Simuler avec l’équipe un comité de portefeuille : chaque personne défend une demande, une autre joue le rôle performance consultant, puis le groupe arbitre selon la règle publiée.",
    reflexCard: [
      "Quelle priorité ou quel risque cette demande sert-elle ?",
      "Quelle performance doit changer ?",
      "Quelles causes relèvent vraiment de l’apprentissage ?",
      "Quels leviers composent la réponse ?",
      "Qui rend le transfert possible ?",
      "Quelle donnée provoquera une décision ?",
    ],
    knowledgeCheck: [
      {
        id: "ld-q1",
        prompt:
          "Quelle question doit précéder le choix d’un format de formation ?",
        choices: [
          "Quel outil est à la mode ?",
          "Quelle performance doit changer et pourquoi ne change-t-elle pas déjà ?",
          "Combien de vidéos produire ?",
          "Quel titre donner au catalogue ?",
        ],
        correct:
          "Quelle performance doit changer et pourquoi ne change-t-elle pas déjà ?",
        correction:
          "Le diagnostic de performance évite de traiter par la formation une cause qui relève d’un autre levier.",
      },
      {
        id: "ld-q2",
        prompt:
          "Que signifie piloter un portefeuille L&D plutôt qu’une liste de demandes ?",
        choices: [
          "Accepter dans l’ordre d’arrivée",
          "Comparer la valeur, les risques et les ressources puis arbitrer",
          "Choisir uniquement les actions les moins coûteuses",
          "Mesurer seulement les inscriptions",
        ],
        correct:
          "Comparer la valeur, les risques et les ressources puis arbitrer",
        correction:
          "Le portefeuille rend la décision collective explicite et adapte les investissements aux capacités disponibles.",
      },
      {
        id: "ld-q3",
        prompt:
          "Quel acteur joue un rôle déterminant dans le transfert après une formation ?",
        choices: [
          "Uniquement le concepteur",
          "Le manager qui crée les occasions et le feedback",
          "Uniquement le financeur",
          "Le fournisseur du LMS",
        ],
        correct:
          "Le manager qui crée les occasions et le feedback",
        correction:
          "Sans occasion d’appliquer, soutien et retour, une acquisition peut rester sans effet dans le travail.",
      },
    ],
    correctionGuide: [
      "Requalifier une demande choisie en performance, causes et données plutôt qu’en thème.",
      "Attribuer chaque cause non pédagogique à un acteur et obtenir son accord.",
      "Réappliquer la matrice de portefeuille avec une règle identique à toutes les initiatives.",
      "Présenter une seconde tentative de défense : trois réponses justes et un arbitrage explicite sont requis.",
    ],
    logixApplication:
      "Installer un comité L&D mensuel chez LOGIX FORMA, tester le canevas sur les demandes réelles pendant un trimestre et publier un bilan des décisions, reports et effets sans surinterpréter les données.",
    competencies: [
      "Traduire la stratégie en capacités d’organisation",
      "Conduire un diagnostic de performance",
      "Composer un écosystème d’apprentissage",
      "Prioriser et gouverner un portefeuille L&D",
    ],
  },
  {
    id: "needs-and-skills-development",
    order: 5,
    phase: 2,
    title: "Analyse des besoins et développement des compétences",
    shortTitle: "Besoins et compétences",
    objective:
      "Produire un diagnostic multi-niveaux qui transforme évolutions, situations de travail et écarts prouvés en plan de développement ciblé.",
    targetRole: "Responsable développement des compétences",
    durationHours: 12,
    lastUpdated: "2026-07-16",
    sourceIds: [
      "iso-30422",
      "cipd-learning-needs-analysis",
      "france-travail-metierscope",
    ],
    positioning: buildPositioning({
      know: {
        prompt:
          "Distinguez besoin stratégique, besoin collectif, besoin individuel et demande de formation.",
        evidenceHint:
          "Définir chaque niveau, ses données et le passage raisonné de l’un à l’autre.",
      },
      do_without_ai: {
        prompt:
          "Conduisez sans IA l’analyse d’une situation de travail et formulez trois compétences avec critères.",
        evidenceHint:
          "Joindre guide d’entretien, notes factuelles, actions, conditions et seuils.",
      },
      do_with_ai: {
        prompt:
          "Comment compareriez-vous avec une IA plusieurs fiches métier sans transformer leur fréquence en vérité locale ?",
        evidenceHint:
          "Le protocole conserve les sources, confronte au terrain et fait valider les écarts par les métiers.",
      },
      control: {
        prompt:
          "Un questionnaire déclare un fort besoin en Excel. Quelles vérifications réalisez-vous avant de proposer une formation ?",
        evidenceHint:
          "Examiner tâches, erreurs, niveau attendu, outil, population, causes et preuve de priorité.",
      },
      explain: {
        prompt:
          "Expliquez à un salarié pourquoi son souhait de formation et son besoin de compétence sont étudiés ensemble mais ne se confondent pas.",
        evidenceHint:
          "La réponse respecte l’aspiration tout en reliant décision, situation et perspectives.",
      },
      direct: {
        prompt:
          "Deux directions revendiquent la même priorité avec des données contradictoires. Comment organisez-vous l’arbitrage ?",
        evidenceHint:
          "Définir données communes, critères, atelier, décisionnaire et traçabilité.",
      },
      transmit: {
        prompt:
          "Concevez une séance pour apprendre aux managers à observer une compétence sans juger la personnalité.",
        evidenceHint:
          "Prévoir comportements, conditions, niveaux, cas et calibration inter-évaluateurs.",
      },
      prove: {
        prompt:
          "Présentez une analyse de besoins déjà conduite et distinguez données recueillies, interprétation et action décidée.",
        evidenceHint:
          "La preuve comporte personnes consultées, méthode, arbitrage, résultat et limite.",
      },
    }),
    diagnosticAdvice: {
      direct_validation:
        "Faites auditer un diagnostic récent par un métier et une personne RH, puis soutenez sa priorisation.",
      short_update:
        "Actualisez les méthodes de skills intelligence, de triangulation et de protection des données individuelles.",
      consolidation:
        "Réalisez une analyse de tâche et une matrice d’écarts avant d’aborder le plan complet.",
      full_course:
        "Suivez toutes les étapes sur un besoin réel mais circonscrit de LOGIX FORMA.",
      advanced_mission:
        "Concevez un observatoire de compétences léger avec règles de mise à jour, gouvernance et mesure des décisions.",
    },
    essentials: [
      "Une demande exprimée est un point de départ à qualifier, pas une prescription automatique.",
      "Le diagnostic triangule stratégie, travail réel, données de performance et expérience des personnes.",
      "Une compétence décrit une action contextualisée et un niveau ; une liste de connaissances ne suffit pas.",
      "La priorité combine valeur, risque, urgence, population, écart et faisabilité.",
      "Les données individuelles servent une finalité explicite et ne doivent pas devenir une notation opaque.",
    ],
    vocabulary: [
      {
        term: "Analyse du travail",
        definition:
          "Étude des activités, décisions, aléas, interactions et ressources réellement mobilisés.",
      },
      {
        term: "Écart de compétence",
        definition:
          "Différence étayée entre maîtrise actuelle et niveau requis dans une situation donnée.",
      },
      {
        term: "Référentiel de compétences",
        definition:
          "Architecture maintenable de compétences, niveaux, situations, critères et preuves pour un périmètre.",
      },
      {
        term: "Skills intelligence",
        definition:
          "Usage organisé de données internes et externes pour éclairer l’évolution des compétences, avec validation humaine.",
      },
      {
        term: "Triangulation",
        definition:
          "Confrontation de plusieurs méthodes ou points de vue afin de réduire les biais d’une source unique.",
      },
    ],
    methodSteps: [
      {
        title: "Cadrer la décision",
        detail:
          "Préciser pourquoi l’analyse est demandée, quelle décision elle doit éclairer, à quel horizon et avec quelles limites.",
        control:
          "Le commanditaire valide la question de décision et les usages autorisés des données.",
      },
      {
        title: "Analyser stratégie et travail réel",
        detail:
          "Croiser documents, indicateurs, entretiens, observations et incidents pour décrire les situations critiques.",
        control:
          "Au moins une source terrain complète la parole du commanditaire.",
      },
      {
        title: "Modéliser compétences et niveaux",
        detail:
          "Décrire actions, conditions, complexité, autonomie, critères et preuves ; faire calibrer les niveaux par des professionnels.",
        control:
          "Deux évaluateurs appliquent les critères à un cas et discutent leurs écarts.",
      },
      {
        title: "Mesurer et expliquer les écarts",
        detail:
          "Choisir auto-évaluation, observation, épreuve ou données existantes selon la compétence ; distinguer absence de preuve et absence de maîtrise.",
        control:
          "Chaque score renvoie à une trace, une méthode et une incertitude.",
      },
      {
        title: "Prioriser et construire la réponse",
        detail:
          "Comparer valeur, risque, urgence et faisabilité ; combiner recrutement, organisation, tutorat, formation ou aide au travail.",
        control:
          "Le plan nomme responsables, échéances, indicateurs et besoins non retenus.",
      },
    ],
    tools: [
      {
        name: "Guide d’analyse du travail",
        use: "Explorer objectifs, étapes, décisions, aléas, outils, interactions, erreurs et critères de réussite.",
      },
      {
        name: "Matrice compétences-écarts",
        use: "Comparer niveau requis, preuve actuelle, confiance, population, risque et action.",
      },
      {
        name: "Carte parties prenantes",
        use: "Organiser expertise, pouvoir de décision, données détenues, intérêt et modalités de consultation.",
      },
      {
        name: "Grille de priorisation",
        use: "Appliquer une règle transparente de valeur, criticité, urgence, volume et faisabilité.",
      },
    ],
    templates: [
      {
        name: "Note de cadrage besoins",
        structure:
          "Décision | périmètre | hypothèses | méthodes | participants | données | confidentialité | calendrier | validation.",
      },
      {
        name: "Fiche compétence",
        structure:
          "Intitulé | finalité | situations | actions | ressources | niveaux | critères | preuves | date de revue.",
      },
      {
        name: "Plan de développement",
        structure:
          "Écart | priorité | population | levier | responsable | coût | jalon | preuve de progression | revue.",
      },
    ],
    checkpoints: [
      "La question de décision précède la collecte et limite les données recueillies.",
      "Le niveau requis est validé par le métier et non déduit d’un intitulé de poste.",
      "L’absence de preuve est signalée comme telle plutôt que convertie en niveau zéro.",
      "Les actions non formatives nécessaires apparaissent dans le plan avec leur propriétaire.",
    ],
    commonErrors: [
      "Construire le plan à partir d’un catalogue ou d’un sondage de souhaits uniquement.",
      "Employer des compétences vagues impossibles à observer, comme « avoir le sens du client ».",
      "Créer un référentiel trop détaillé pour être compris et mis à jour.",
      "Additionner des auto-évaluations comme s’il s’agissait de mesures objectives comparables.",
    ],
    risks: [
      {
        risk: "Décision discriminatoire fondée sur des données ou proxys fragiles.",
        prevention:
          "Limiter la finalité, expliquer la méthode, permettre contradiction et faire valider toute décision humaineement.",
      },
      {
        risk: "Plan obsolète avant sa mise en œuvre.",
        prevention:
          "Dater les hypothèses, travailler par horizons et prévoir des revues déclenchées par des signaux.",
      },
      {
        risk: "Surinvestissement dans une compétence peu critique.",
        prevention:
          "Appliquer la grille commune, chiffrer le coût d’inaction et documenter le sponsor.",
      },
    ],
    example: {
      context:
        "LOGIX FORMA envisage de former tous ses intervenants à Moodle après plusieurs retards de suivi.",
      approach:
        "L’analyse de six dossiers, trois entretiens et une observation distingue trois causes : règles de saisie ambiguës, droits mal paramétrés et maîtrise inégale de deux opérations. Le niveau requis est limité à publier une activité et extraire une trace conforme.",
      result:
        "La réponse combine correction des droits, fiche réflexe, atelier de 60 minutes et tutorat pour deux personnes. Le besoin générique « maîtriser Moodle » est écarté ; la complétude des traces sera contrôlée sur quatre semaines.",
    },
    guidedPractice: {
      prompt:
        "Qualifiez une demande « former l’équipe à mieux communiquer » et rendez-la décisionnelle.",
      steps: [
        "Identifier les décisions ou situations où un écart est observé.",
        "Collecter deux traces et interroger trois rôles différents.",
        "Formuler les compétences et niveaux requis.",
        "Séparer causes de compétence, de processus, d’outil et de management.",
        "Prioriser les réponses et présenter un renoncement argumenté.",
      ],
    },
    mission: {
      id: "mission-needs-skills-plan",
      title: "Construire le plan de développement des compétences LOGIX FORMA",
      context:
        "LOGIX FORMA doit fiabiliser ses opérations et développer son offre au cours des douze prochains mois avec des ressources limitées.",
      deliverable:
        "Cadrage, cartographie de situations, référentiel ciblé, preuves, écarts, priorisation, plan multileviers et protocole de revue.",
      criticalCriterion:
        "Aucun besoin prioritaire ne doit reposer sur une seule opinion ou sur un intitulé générique.",
      criteria: [
        "Les sources de données sont triangulées et leurs limites visibles.",
        "Les compétences et niveaux sont observables dans le travail.",
        "La règle de priorité est explicite et reproductible.",
        "Les actions formatives et non formatives sont attribuées.",
      ],
    },
    withoutAi:
      "Conduire l’analyse de travail, coder les premières données et formuler les compétences sans IA.",
    withAi:
      "Faire comparer par IA des sources métier publiques et les verbatims anonymisés, puis vérifier chaque proposition avec les professionnels concernés.",
    aiAuditChecklist: [
      "La compétence proposée décrit-elle une action réelle plutôt qu’un mot fréquent ?",
      "Une fréquence textuelle est-elle présentée abusivement comme une priorité ?",
      "Le niveau déduit est-il confirmé par un métier et une preuve ?",
      "Les données personnelles ou appréciations individuelles ont-elles été supprimées ?",
      "Les désaccords et données manquantes restent-ils visibles dans la synthèse ?",
    ],
    deliverableTemplate: [
      "Décision, périmètre et gouvernance des données",
      "Méthodes, participants et limites",
      "Situations critiques et facteurs d’évolution",
      "Compétences, niveaux et preuves",
      "Écarts et causes",
      "Priorités et plan multileviers",
      "Indicateurs, revues et annexes",
    ],
    explanations: {
      simple:
        "Analyser les besoins consiste à vérifier ce que les personnes doivent réellement savoir faire, ce qui bloque aujourd’hui et quelle aide sera la plus utile.",
      professional:
        "Le diagnostic triangule stratégie et travail réel pour modéliser des écarts de compétences observables et prioriser des leviers proportionnés.",
      defense:
        "Devant le CSE ou une direction, présenter la finalité, les personnes consultées, les limites, la règle d’arbitrage et les protections appliquées aux données.",
    },
    transmissionActivity:
      "Organiser un atelier de calibration : les managers évaluent deux cas fictifs avec la fiche compétence, comparent leurs scores et réécrivent les critères divergents.",
    reflexCard: [
      "Quelle décision l’analyse doit-elle éclairer ?",
      "Que se passe-t-il dans le travail réel ?",
      "Quelles données se confirment ou se contredisent ?",
      "Quel niveau est réellement requis ?",
      "Quelle cause explique l’écart ?",
      "Quel levier et quelle preuve de progression ?",
    ],
    knowledgeCheck: [
      {
        id: "needs-q1",
        prompt:
          "Quelle donnée suffit à elle seule pour conclure à un besoin de compétence ?",
        choices: [
          "Un souhait individuel",
          "Une demande du directeur",
          "Une fréquence dans les offres d’emploi",
          "Aucune : les sources doivent être confrontées au contexte et au travail",
        ],
        correct:
          "Aucune : les sources doivent être confrontées au contexte et au travail",
        correction:
          "Chaque source éclaire une partie du besoin ; la triangulation évite de confondre signal, cause et priorité.",
      },
      {
        id: "needs-q2",
        prompt:
          "Quelle formulation est la plus exploitable comme compétence ?",
        choices: [
          "Être dynamique",
          "Connaître Moodle",
          "Publier et contrôler une activité Moodle conforme au scénario et aux droits définis",
          "Aimer le numérique",
        ],
        correct:
          "Publier et contrôler une activité Moodle conforme au scénario et aux droits définis",
        correction:
          "Elle décrit une action, un objet, des conditions et un contrôle observables.",
      },
      {
        id: "needs-q3",
        prompt:
          "Que faire lorsqu’aucune preuve n’est disponible pour le niveau actuel ?",
        choices: [
          "Attribuer automatiquement zéro",
          "Inventer une moyenne",
          "Noter « non évalué » et organiser une situation probante",
          "Utiliser l’ancienneté comme niveau",
        ],
        correct:
          "Noter « non évalué » et organiser une situation probante",
        correction:
          "L’absence de donnée ne démontre ni maîtrise ni absence de maîtrise.",
      },
    ],
    correctionGuide: [
      "Remplacer les besoins thématiques par des situations, actions et niveaux observables.",
      "Ajouter au moins une source terrain à toute conclusion reposant sur une déclaration.",
      "Recalculer les priorités avec la même règle et rendre visibles les données manquantes.",
      "Refaire la seconde tentative sur un autre métier ; trois réponses justes et aucune conclusion sans preuve sont requises.",
    ],
    logixApplication:
      "Conduire le diagnostic avec les personnes réellement concernées, publier une synthèse non nominative, faire approuver les priorités et verser au portfolio uniquement les méthodes et résultats communicables.",
    competencies: [
      "Analyser le travail et trianguler les besoins",
      "Construire un référentiel ciblé de compétences",
      "Évaluer et prioriser des écarts avec prudence",
      "Élaborer un plan de développement multileviers",
    ],
  },
  {
    id: "training-strategy",
    order: 6,
    phase: 2,
    title: "Stratégie de formation",
    shortTitle: "Stratégie de formation",
    objective:
      "Construire une stratégie de formation à trois ans, reliée aux choix d’organisation, soutenable en ressources et gouvernée par scénarios.",
    targetRole: "Directeur de la formation",
    durationHours: 14,
    lastUpdated: "2026-07-16",
    sourceIds: ["iso-30422", "cipd-ld-strategy", "oecd-skills-strategy"],
    positioning: buildPositioning({
      know: {
        prompt:
          "Distinguez ambition, objectif stratégique, axe, initiative, indicateur et cible.",
        evidenceHint:
          "La réponse montre une chaîne logique et évite de présenter un projet comme une stratégie.",
      },
      do_without_ai: {
        prompt:
          "Rédigez sans IA une page de diagnostic stratégique d’une activité de formation que vous connaissez.",
        evidenceHint:
          "Inclure données internes, environnement, capacités, contraintes, incertitudes et enjeu décisionnel.",
      },
      do_with_ai: {
        prompt:
          "Décrivez comment utiliser une IA pour tester des scénarios sans lui faire inventer les données financières ou de marché.",
        evidenceHint:
          "Séparer données validées, hypothèses, sensibilités, sources et arbitrage humain.",
      },
      control: {
        prompt:
          "Une stratégie promet de doubler l’activité en un an sans ressources supplémentaires. Comment l’auditez-vous ?",
        evidenceHint:
          "Tester hypothèses de demande, capacité, coûts, qualité, trésorerie et dépendances.",
      },
      explain: {
        prompt:
          "Expliquez à une équipe pourquoi une stratégie comporte des renoncements et des critères d’arrêt.",
        evidenceHint:
          "Relier rareté des ressources, cohérence, risque et apprentissage stratégique.",
      },
      direct: {
        prompt:
          "Comment conduisez-vous un comité qui doit choisir entre croissance commerciale, certification et digitalisation ?",
        evidenceHint:
          "Préparer options, critères, données, conflits, décisionnaire et réversibilité.",
      },
      transmit: {
        prompt:
          "Proposez un atelier pour apprendre aux responsables à traduire un axe stratégique en feuille de route.",
        evidenceHint:
          "L’atelier va d’un résultat à des capacités, initiatives, jalons, indicateurs et risques.",
      },
      prove: {
        prompt:
          "Présentez une décision pluriannuelle que vous avez préparée et les éléments qui ont permis l’arbitrage.",
        evidenceHint:
          "Fournir options, hypothèses, recommandation, décision et suivi ou limite.",
      },
    }),
    diagnosticAdvice: {
      direct_validation:
        "Présentez une stratégie existante à un comité contradictoire et répondez aux objections financières, opérationnelles et qualité.",
      short_update:
        "Actualisez scénarios, gestion des hypothèses et articulation capacités-portefeuille.",
      consolidation:
        "Travaillez diagnostic, choix stratégiques et chaîne de résultats avant le plan complet.",
      full_course:
        "Construisez progressivement les trois horizons de la stratégie LOGIX FORMA.",
      advanced_mission:
        "Pilotez un stress test complet et concevez les décisions prédéfinies pour trois scénarios de rupture.",
    },
    essentials: [
      "Une stratégie fait des choix cohérents sur les publics, la valeur, les capacités et l’allocation de ressources.",
      "Le diagnostic distingue faits, tendances, hypothèses et incertitudes.",
      "Les scénarios testent la robustesse des décisions plutôt que de prédire précisément l’avenir.",
      "La feuille de route relie capacités, initiatives, finances, risques et gouvernance.",
      "Les indicateurs avancés et retardés permettent d’adapter ou d’arrêter une initiative.",
    ],
    vocabulary: [
      {
        term: "Choix stratégique",
        definition:
          "Engagement cohérent de ressources vers une position ou une capacité, impliquant un renoncement.",
      },
      {
        term: "Scénario",
        definition:
          "Configuration plausible d’hypothèses utilisée pour tester décisions et réponses.",
      },
      {
        term: "Capacité stratégique",
        definition:
          "Combinaison de compétences, processus, outils et gouvernance nécessaire à l’exécution d’un choix.",
      },
      {
        term: "Indicateur avancé",
        definition:
          "Signal précoce susceptible d’annoncer un résultat futur et de permettre une correction.",
      },
      {
        term: "Option réelle",
        definition:
          "Décision conçue pour préserver la possibilité d’investir, d’étendre, de reporter ou d’arrêter selon les informations.",
      },
    ],
    methodSteps: [
      {
        title: "Établir le diagnostic stratégique",
        detail:
          "Analyser mission, bénéficiaires, proposition de valeur, activités, ressources, résultats, tendances, réglementation et risques.",
        control:
          "Chaque affirmation majeure est sourcée, datée ou explicitement marquée comme hypothèse.",
      },
      {
        title: "Formuler les choix et renoncements",
        detail:
          "Définir où agir, pour qui, quelle valeur créer, quelles capacités construire et ce qui ne sera pas poursuivi.",
        control:
          "Les axes ne sont ni une liste de projets existants ni des intentions incompatibles.",
      },
      {
        title: "Construire trois scénarios",
        detail:
          "Faire varier demande, financement, capacité, coût et réglementation ; identifier décisions robustes et seuils.",
        control:
          "Les hypothèses sont quantifiées quand possible et la sensibilité des décisions est visible.",
      },
      {
        title: "Déployer une feuille de route",
        detail:
          "Séquençer capacités et initiatives, estimer ressources, dépendances, jalons, responsables et impacts financiers.",
        control:
          "Aucune initiative ne démarre sans capacité minimale, sponsor, budget et résultat intermédiaire.",
      },
      {
        title: "Gouverner l’adaptation",
        detail:
          "Installer revues, indicateurs, risques, apprentissages et décisions de poursuivre, pivoter ou arrêter.",
        control:
          "Le comité dispose d’un mandat, de données définies et d’un calendrier d’arbitrage.",
      },
    ],
    tools: [
      {
        name: "Diagnostic stratégique factuel",
        use: "Structurer données internes, environnement, parties prenantes, capacités, risques et incertitudes.",
      },
      {
        name: "Matrice choix-renoncements",
        use: "Rendre explicites publics servis, valeur, capacités investies et activités non prioritaires.",
      },
      {
        name: "Table de scénarios",
        use: "Comparer hypothèses, conséquences, signaux, décisions robustes et options.",
      },
      {
        name: "Strategy-on-a-page",
        use: "Communiquer ambition, choix, résultats, initiatives, indicateurs et gouvernance sur une page.",
      },
    ],
    templates: [
      {
        name: "Note stratégique",
        structure:
          "Décision | diagnostic | enjeux | options | critères | choix | renoncements | scénarios | risques | recommandation.",
      },
      {
        name: "Feuille de route trois ans",
        structure:
          "Horizon | capacité | initiative | résultat | responsable | ressources | dépendance | indicateur | seuil | revue.",
      },
      {
        name: "Registre d’hypothèses",
        structure:
          "Hypothèse | source | confiance | sensibilité | signal | propriétaire | date de revue | décision associée.",
      },
    ],
    checkpoints: [
      "La stratégie indique ce qui ne sera pas fait et pourquoi.",
      "Les ressources et capacités sont compatibles avec le rythme de la feuille de route.",
      "Les scénarios modifient réellement des hypothèses critiques et déclenchent des réponses.",
      "Les indicateurs sont assez précoces pour permettre un arbitrage avant l’échec final.",
    ],
    commonErrors: [
      "Appeler stratégie une liste de projets sans choix ni avantage recherché.",
      "Utiliser SWOT comme conclusion sans vérifier ni hiérarchiser les éléments.",
      "Présenter un scénario central comme une prévision certaine.",
      "Fixer des objectifs de croissance sans capacité, trésorerie ni propriétaire.",
    ],
    risks: [
      {
        risk: "Surpromesse stratégique non soutenue par les capacités.",
        prevention:
          "Cartographier les capacités critiques, phaser les engagements et définir des seuils de charge.",
      },
      {
        risk: "Dépendance excessive à un financeur, client ou outil.",
        prevention:
          "Mesurer la concentration, préparer une option alternative et suivre des signaux de rupture.",
      },
      {
        risk: "Plan figé malgré un changement réglementaire ou de marché.",
        prevention:
          "Tenir un registre d’hypothèses, une veille attribuée et des revues avec décisions prédéfinies.",
      },
    ],
    example: {
      context:
        "LOGIX FORMA hésite entre vendre davantage de formations sur mesure, devenir préparateur d’une certification ou industrialiser une offre multimodale.",
      approach:
        "Le diagnostic mesure références, capacité de conception, trésorerie, exigences qualité et dépendance aux intervenants. Trois scénarios sont testés. La certification demande une habilitation et une capacité de preuve non encore acquise ; le sur-mesure est rentable mais peu scalable ; le multimodal réutilisable soutient les deux.",
      result:
        "La stratégie retient d’abord fiabilité opérationnelle et offre multimodale pilote, maintient l’option certification sous conditions et limite le sur-mesure à deux secteurs. Les seuils de marge, satisfaction, complétion et charge déclenchent la revue trimestrielle.",
    },
    guidedPractice: {
      prompt:
        "Construisez deux options stratégiques à partir d’un organisme disposant d’une bonne expertise mais de peu de trésorerie.",
      steps: [
        "Séparer données, tendances, hypothèses et inconnues.",
        "Formuler pour chaque option publics, valeur, capacités et renoncements.",
        "Tester trois scénarios de demande et de financement.",
        "Définir les jalons, le besoin maximal de trésorerie et les critères d’arrêt.",
        "Préparer une recommandation et l’objection la plus forte contre elle.",
      ],
    },
    mission: {
      id: "mission-three-year-training-strategy",
      title: "Construire la stratégie à trois ans de LOGIX FORMA",
      context:
        "La direction doit décider où investir ses moyens limités pour consolider l’activité, développer les compétences et préparer la croissance.",
      deliverable:
        "Diagnostic sourcé, options, choix et renoncements, trois scénarios, registre d’hypothèses, feuille de route chiffrée, gouvernance et support exécutif.",
      criticalCriterion:
        "Les ambitions doivent rester compatibles avec les capacités, les finances et les risques démontrés.",
      criteria: [
        "Les faits, hypothèses et inconnues sont séparés.",
        "Les choix et renoncements forment un ensemble cohérent.",
        "Les scénarios produisent des seuils et décisions différents.",
        "La gouvernance peut modifier ou arrêter la feuille de route.",
      ],
    },
    withoutAi:
      "Élaborer personnellement le diagnostic, les choix et le scénario central avant de solliciter une IA.",
    withAi:
      "Demander à une IA d’agir comme contradicteur financier, client et régulateur sur les trois scénarios, sans lui laisser créer de données manquantes.",
    aiAuditChecklist: [
      "Chaque chiffre produit par l’IA est-il issu du dossier ou clairement étiqueté comme hypothèse ?",
      "Les tendances externes sont-elles datées et reliées à une source consultée ?",
      "Les scénarios sont-ils plausibles et réellement distincts ?",
      "L’IA a-t-elle effacé un désaccord, une limite de capacité ou un risque majeur ?",
      "Le décideur humain peut-il expliquer et assumer chaque choix final ?",
    ],
    deliverableTemplate: [
      "Résumé exécutif et décision demandée",
      "Diagnostic interne et externe sourcé",
      "Enjeux, options, critères et renoncements",
      "Scénarios et analyse de sensibilité",
      "Choix stratégique et capacités",
      "Feuille de route, finances et risques",
      "Gouvernance, indicateurs et registre d’hypothèses",
    ],
    explanations: {
      simple:
        "Une stratégie décide où mettre les moyens, ce qu’on ne fera pas et comment on adaptera le plan si les hypothèses changent.",
      professional:
        "La stratégie articule diagnostic, choix de positionnement, capacités, scénarios, allocation des ressources et gouvernance adaptative.",
      defense:
        "Devant la direction, commencer par la décision, rendre visibles les renoncements et hypothèses sensibles, puis défendre le scénario et son option de repli.",
    },
    transmissionActivity:
      "Animer un atelier de stress test où chaque collaborateur représente un scénario, challenge la feuille de route et propose le signal qui déclenche une décision.",
    reflexCard: [
      "Quelle décision stratégique devons-nous prendre ?",
      "Quels faits, hypothèses et inconnues ?",
      "Pour qui créons-nous quelle valeur ?",
      "Quelles capacités et quels renoncements ?",
      "Que se passe-t-il dans trois scénarios ?",
      "Quel signal déclenche quelle décision ?",
    ],
    knowledgeCheck: [
      {
        id: "strategy-q1",
        prompt: "Quel élément distingue le plus clairement une stratégie d’un plan ?",
        choices: [
          "Le nombre de pages",
          "Les choix et renoncements qui orientent les ressources",
          "La présence d’un calendrier",
          "L’usage d’un diagramme",
        ],
        correct: "Les choix et renoncements qui orientent les ressources",
        correction:
          "Le plan séquence l’exécution ; la stratégie établit la logique des choix qui déterminent cette exécution.",
      },
      {
        id: "strategy-q2",
        prompt: "À quoi sert principalement un scénario stratégique ?",
        choices: [
          "Prédire exactement l’avenir",
          "Justifier une décision déjà prise",
          "Tester la robustesse des choix sous des hypothèses différentes",
          "Remplacer le budget",
        ],
        correct:
          "Tester la robustesse des choix sous des hypothèses différentes",
        correction:
          "Les scénarios révèlent sensibilités, options et signaux sans prétendre annoncer l’avenir.",
      },
      {
        id: "strategy-q3",
        prompt: "Que doit provoquer un indicateur stratégique utile ?",
        choices: [
          "Une collecte sans fin",
          "Une décision ou une question de gouvernance définie",
          "Une communication uniquement positive",
          "Le remplacement du jugement",
        ],
        correct:
          "Une décision ou une question de gouvernance définie",
        correction:
          "Un indicateur n’a de valeur que s’il éclaire une action, un arbitrage ou une investigation.",
      },
    ],
    correctionGuide: [
      "Transformer toute liste de projets en choix, logique de valeur et renoncements.",
      "Marquer chaque énoncé du diagnostic comme fait, hypothèse ou inconnue.",
      "Rejouer les scénarios avec au moins une hypothèse financière et une capacité critique différentes.",
      "Effectuer une seconde soutenance ; trois réponses justes et aucun engagement sans ressource sont requis.",
    ],
    logixApplication:
      "Faire valider la stratégie par les personnes responsables de l’exécution, consigner les désaccords, lancer seulement le premier horizon et réviser trimestriellement hypothèses et options.",
    competencies: [
      "Produire un diagnostic stratégique sourcé",
      "Formuler choix, renoncements et capacités",
      "Construire et tester des scénarios",
      "Gouverner une feuille de route adaptative",
    ],
  },
  {
    id: "learning-performance-impact",
    order: 22,
    phase: 4,
    title: "Mesure de la performance et de l’impact",
    shortTitle: "Performance et impact",
    objective:
      "Concevoir une chaîne de mesure proportionnée qui relie activité, acquisition, transfert et résultat sans confondre contribution et causalité.",
    targetRole: "Responsable Learning Analytics et impact",
    durationHours: 12,
    lastUpdated: "2026-07-16",
    sourceIds: ["iso-30414", "cipd-learning-evaluation", "kirkpatrick-model"],
    positioning: buildPositioning({
      know: {
        prompt:
          "Distinguez indicateur d’activité, d’apprentissage, de transfert, de performance et d’impact.",
        evidenceHint:
          "Donner pour chaque niveau une question, une donnée et une limite d’interprétation.",
      },
      do_without_ai: {
        prompt:
          "Construisez sans IA une chaîne de résultats pour une formation qui vise à réduire les dossiers incomplets.",
        evidenceHint:
          "Relier intrants, activités, productions, effets intermédiaires, résultat et hypothèses.",
      },
      do_with_ai: {
        prompt:
          "Comment utiliseriez-vous une IA pour explorer des données L&D sans lui transmettre d’identifiants ni accepter une causalité inventée ?",
        evidenceHint:
          "Décrire minimisation, agrégation, dictionnaire, analyse reproductible et validation statistique humaine.",
      },
      control: {
        prompt:
          "Après une formation, le chiffre d’affaires augmente de 8 %. Quelles vérifications précèdent toute attribution ?",
        evidenceHint:
          "Examiner temporalité, autres changements, groupe de comparaison, mécanisme, qualité des données et incertitude.",
      },
      explain: {
        prompt:
          "Expliquez à un client pourquoi 95 % de satisfaction ne démontre pas un changement de pratique.",
        evidenceHint:
          "Distinguer expérience perçue, acquisition, usage et résultat.",
      },
      direct: {
        prompt:
          "Le comité demande vingt indicateurs. Comment imposez-vous un tableau de bord décisionnel plus sobre ?",
        evidenceHint:
          "Partir des décisions, propriétaires, seuils, coût de collecte et risques de mauvais usage.",
      },
      transmit: {
        prompt:
          "Concevez une activité pour apprendre à l’équipe à lire un graphique sans surinterpréter une corrélation.",
        evidenceHint:
          "Inclure comparaison de graphiques, variables confondantes, formulation prudente et décision.",
      },
      prove: {
        prompt:
          "Présentez une mesure que vous avez utilisée pour améliorer un dispositif plutôt que seulement rendre compte.",
        evidenceHint:
          "Montrer définition, collecte, constat, décision, résultat ultérieur et limite.",
      },
    }),
    diagnosticAdvice: {
      direct_validation:
        "Auditez un tableau de bord existant, supprimez les métriques sans décision et défendez une conclusion prudente.",
      short_update:
        "Actualisez chaîne de résultats, qualité des données, contribution et confidentialité.",
      consolidation:
        "Travaillez définitions d’indicateurs et plan de mesure sur un résultat unique.",
      full_course:
        "Suivez toutes les étapes depuis la théorie du changement jusqu’à la revue d’impact.",
      advanced_mission:
        "Concevez une évaluation quasi expérimentale réaliste ou une analyse contributive approfondie.",
    },
    essentials: [
      "La mesure commence par une décision et une chaîne causale explicite, pas par les données disponibles.",
      "Activité, satisfaction, acquisition, transfert et performance répondent à des questions différentes.",
      "Une évolution après formation ne démontre pas à elle seule que la formation en est la cause.",
      "Définition, source, qualité, population et période rendent un indicateur interprétable.",
      "La collecte doit être proportionnée, utile et respectueuse des personnes.",
    ],
    vocabulary: [
      {
        term: "Théorie du changement",
        definition:
          "Chaîne explicitant comment une intervention est supposée produire des effets sous certaines hypothèses.",
      },
      {
        term: "Indicateur avancé",
        definition:
          "Signal précoce lié à un mécanisme susceptible d’annoncer un résultat.",
      },
      {
        term: "Contrefactuel",
        definition:
          "Estimation de ce qui se serait produit en l’absence de l’intervention.",
      },
      {
        term: "Contribution",
        definition:
          "Part raisonnablement étayée d’une intervention dans un résultat auquel d’autres facteurs participent.",
      },
      {
        term: "Dictionnaire de données",
        definition:
          "Définition partagée des champs, calculs, sources, règles de qualité, propriétaires et usages.",
      },
    ],
    methodSteps: [
      {
        title: "Formuler la décision et le résultat",
        detail:
          "Identifier l’arbitrage à éclairer, le changement attendu, la population, le délai et le niveau de preuve proportionné.",
        control:
          "Le commanditaire peut dire quelle décision sera prise selon chaque résultat possible.",
      },
      {
        title: "Construire la chaîne de résultats",
        detail:
          "Relier ressources, activités, acquisitions, comportements, résultats et hypothèses externes.",
        control:
          "Chaque flèche possède un mécanisme plausible et au moins un risque de rupture.",
      },
      {
        title: "Définir indicateurs et protocole",
        detail:
          "Préciser formule, source, base, fréquence, segmentation, qualité, responsable et seuil ; prévoir mesure initiale.",
        control:
          "Deux personnes calculent le même indicateur et obtiennent le même résultat.",
      },
      {
        title: "Analyser sans surattribuer",
        detail:
          "Comparer périodes ou groupes quand faisable, examiner facteurs alternatifs, incertitudes et cohérence des mécanismes.",
        control:
          "La formulation finale correspond au niveau réel de preuve : observation, association, contribution ou effet estimé.",
      },
      {
        title: "Décider et apprendre",
        detail:
          "Tenir une revue, décider poursuivre, modifier ou arrêter, puis documenter hypothèses confirmées et nouvelles questions.",
        control:
          "Chaque conclusion se termine par une décision, un responsable et une prochaine mesure.",
      },
    ],
    tools: [
      {
        name: "Chaîne de résultats",
        use: "Rendre visibles mécanismes, hypothèses et points de mesure de l’intervention au résultat.",
      },
      {
        name: "Dictionnaire d’indicateurs",
        use: "Stabiliser formule, population, source, fréquence, seuil, propriétaire et limite.",
      },
      {
        name: "Plan d’analyse",
        use: "Préenregistrer comparaisons, segments, exclusions et formulation autorisée avant de voir les résultats.",
      },
      {
        name: "Tableau de bord décisionnel",
        use: "Présenter peu de signaux, contexte, seuils, actions et qualité de données.",
      },
    ],
    templates: [
      {
        name: "Fiche indicateur",
        structure:
          "Question | formule | unité | source | population | base | fréquence | seuil | qualité | propriétaire | décision | limite.",
      },
      {
        name: "Rapport d’impact",
        structure:
          "Décision | intervention | théorie | méthode | résultats | facteurs alternatifs | conclusion prudente | action | annexes.",
      },
      {
        name: "Revue de performance",
        structure:
          "Signal | cible | écart | qualité | explications | décision | responsable | échéance | prochaine mesure.",
      },
    ],
    checkpoints: [
      "Une valeur initiale ou un point de comparaison existe avant l’interprétation.",
      "Le dénominateur, la population et les exclusions de chaque taux sont explicites.",
      "Les facteurs externes et changements concomitants sont recherchés.",
      "Les données individuelles ne sont pas utilisées au-delà de la finalité annoncée.",
    ],
    commonErrors: [
      "Additionner inscriptions, heures et satisfaction pour fabriquer un score d’impact.",
      "Changer la définition d’un indicateur entre deux périodes.",
      "Attribuer tout changement observé à la dernière formation réalisée.",
      "Présenter un retour sur investissement avec des bénéfices hypothétiques comme s’ils étaient encaissés.",
    ],
    risks: [
      {
        risk: "Décision erronée à partir d’une donnée incomplète ou non comparable.",
        prevention:
          "Documenter qualité, ruptures de série, intervalles, exclusions et limites dans chaque restitution.",
      },
      {
        risk: "Surveillance individuelle disproportionnée.",
        prevention:
          "Privilégier agrégation, minimisation, information des personnes et accès fondé sur les rôles.",
      },
      {
        risk: "Optimisation du chiffre au détriment de l’objectif.",
        prevention:
          "Associer indicateurs quantitatifs et revue qualitative, surveiller effets pervers et réviser les cibles.",
      },
    ],
    example: {
      context:
        "LOGIX FORMA veut mesurer une formation à la conformité des dossiers. Le taux de complétude est de 62 % et les délais varient fortement.",
      approach:
        "Une base de huit semaines est fixée. La chaîne prévoit acquisition sur dossier simulé, usage d’une checklist, complétude à J-2 et temps de reprise. Les changements de formulaire et de personnel sont consignés. Les résultats sont segmentés avec prudence compte tenu du faible effectif.",
      result:
        "À six semaines, l’usage de la checklist atteint 85 %, la complétude 79 % et le temps de reprise baisse. Le rapport conclut à une contribution plausible, non à une causalité prouvée, et recommande de poursuivre avec un contrôle sur une cohorte supplémentaire.",
    },
    guidedPractice: {
      prompt:
        "Transformez un tableau de bord centré sur inscriptions et satisfaction en outil de décision sur le transfert.",
      steps: [
        "Choisir une décision et formuler le résultat attendu.",
        "Construire la chaîne de résultats et ses hypothèses.",
        "Définir quatre indicateurs avec base, formule et seuil.",
        "Identifier deux facteurs alternatifs et une protection des données.",
        "Rédiger trois conclusions possibles avec la décision correspondante.",
      ],
    },
    mission: {
      id: "mission-training-impact",
      title: "Mesurer l’impact d’une action LOGIX FORMA",
      context:
        "La direction doit décider de généraliser, corriger ou arrêter un parcours pilote après une première cohorte.",
      deliverable:
        "Théorie du changement, dictionnaire, base initiale, protocole, tableau de bord, analyse prudente, décision argumentée et plan de suivi.",
      criticalCriterion:
        "Aucune relation causale ou valeur financière ne doit être affirmée au-delà des données et du protocole.",
      criteria: [
        "Les indicateurs répondent à une décision et sont reproductibles.",
        "La qualité des données et les facteurs alternatifs sont visibles.",
        "Le transfert est mesuré au-delà de la satisfaction.",
        "La recommandation est proportionnée au niveau de preuve.",
      ],
    },
    withoutAi:
      "Construire la théorie du changement, les définitions et le plan d’analyse avant toute exploration assistée.",
    withAi:
      "Utiliser une IA sur un jeu agrégé pour identifier anomalies et explications alternatives, puis reproduire les calculs et valider chaque conclusion manuellement.",
    aiAuditChecklist: [
      "L’IA a-t-elle inventé une donnée, un dénominateur ou une période ?",
      "Une corrélation est-elle formulée comme une causalité ?",
      "Les petits effectifs et données manquantes sont-ils signalés ?",
      "Les calculs peuvent-ils être reproduits hors de l’outil ?",
      "Les données sont-elles agrégées, minimisées et autorisées pour cet usage ?",
    ],
    deliverableTemplate: [
      "Question de décision et périmètre",
      "Théorie du changement et hypothèses",
      "Indicateurs, dictionnaire et base",
      "Collecte, qualité et protection",
      "Analyse, comparaisons et facteurs alternatifs",
      "Conclusion proportionnée et décision",
      "Suivi, limites et annexes reproductibles",
    ],
    explanations: {
      simple:
        "Mesurer l’impact, c’est vérifier ce qui a changé après l’apprentissage tout en recherchant ce qui pourrait aussi expliquer ce changement.",
      professional:
        "Le protocole relie théorie du changement, données de référence, transfert et performance pour estimer une contribution avec un niveau de preuve explicite.",
      defense:
        "Devant un financeur, montrer la chaîne, les définitions, les résultats et les facteurs alternatifs ; annoncer clairement ce que l’étude ne permet pas d’affirmer.",
    },
    transmissionActivity:
      "Faire relire un graphique ambigu à l’équipe : chacun écrit une conclusion, repère les surinterprétations et reformule au niveau de preuve permis.",
    reflexCard: [
      "Quelle décision devons-nous éclairer ?",
      "Quel mécanisme relie l’action au résultat ?",
      "Quelle base et quel point de comparaison ?",
      "La définition est-elle reproductible ?",
      "Quelles autres explications ?",
      "Quelle conclusion le protocole autorise-t-il ?",
    ],
    knowledgeCheck: [
      {
        id: "impact-q1",
        prompt:
          "Un taux de satisfaction élevé permet-il de conclure à un transfert élevé ?",
        choices: [
          "Oui, toujours",
          "Oui, si le questionnaire est long",
          "Non, le transfert doit être observé séparément",
          "Non, car la satisfaction est toujours inutile",
        ],
        correct: "Non, le transfert doit être observé séparément",
        correction:
          "La satisfaction décrit une perception ; elle peut être utile sans démontrer l’usage en situation de travail.",
      },
      {
        id: "impact-q2",
        prompt:
          "Quel élément rend un indicateur calculable de façon stable ?",
        choices: [
          "Un titre court",
          "Une formule, une population, une source et des exclusions définies",
          "Une couleur verte",
          "Une cible ambitieuse",
        ],
        correct:
          "Une formule, une population, une source et des exclusions définies",
        correction:
          "Ces éléments permettent la reproductibilité et la comparaison dans le temps.",
      },
      {
        id: "impact-q3",
        prompt:
          "Quel énoncé est prudent après une amélioration observée sans groupe de comparaison ?",
        choices: [
          "La formation a causé tout le gain",
          "La formation a contribué de façon plausible, sous réserve des autres changements",
          "Aucune mesure n’est possible",
          "Le ROI est nécessairement positif",
        ],
        correct:
          "La formation a contribué de façon plausible, sous réserve des autres changements",
        correction:
          "La formulation reconnaît le mécanisme et les données tout en maintenant les explications alternatives.",
      },
    ],
    correctionGuide: [
      "Réécrire chaque indicateur avec question, formule, source, population, seuil et décision.",
      "Ramener les conclusions causales au niveau réellement autorisé par le protocole.",
      "Ajouter une base, un facteur alternatif et une vérification de qualité au cas traité.",
      "Repasser sur un nouveau jeu de données ; trois réponses justes et aucun calcul non reproductible sont requis.",
    ],
    logixApplication:
      "Choisir une seule action LOGIX FORMA, obtenir l’accord sur la finalité, établir la base avant lancement et présenter une revue comportant aussi les données défavorables ou manquantes.",
    competencies: [
      "Construire une théorie du changement",
      "Définir des indicateurs fiables et décisionnels",
      "Analyser contribution, causalité et incertitude",
      "Piloter une amélioration à partir de données protégées",
    ],
  },
  {
    id: "digital-learning-lms",
    order: 23,
    phase: 4,
    title: "Digital learning et LMS",
    shortTitle: "Digital learning et LMS",
    objective:
      "Sélectionner, configurer et gouverner un écosystème digital learning interopérable, accessible, sécurisé et orienté usages.",
    targetRole: "Responsable Digital Learning",
    durationHours: 14,
    lastUpdated: "2026-07-16",
    sourceIds: ["moodle-docs", "1edtech-lti", "adlnet-xapi"],
    positioning: buildPositioning({
      know: {
        prompt:
          "Distinguez LMS, LXP, outil auteur, classe virtuelle, LRS et portail de ressources.",
        evidenceHint:
          "La réponse relie chaque système à sa fonction, ses données et ses limites.",
      },
      do_without_ai: {
        prompt:
          "Paramétrez sans IA un espace pilote avec rôles, inscription, activité, achèvement, sauvegarde et rapport.",
        evidenceHint:
          "Fournir plan de test, captures non sensibles et résultats pour trois rôles.",
      },
      do_with_ai: {
        prompt:
          "Comment utiliseriez-vous l’IA pour préparer l’import d’un catalogue sans propager des métadonnées fausses ?",
        evidenceHint:
          "Prévoir schéma, validation, échantillon, contrôle des doublons et rollback.",
      },
      control: {
        prompt:
          "Un fournisseur affirme « compatible SCORM, xAPI et LTI ». Quelles preuves techniques demandez-vous ?",
        evidenceHint:
          "Versions, cas couverts, environnement de test, données échangées, erreurs, support et réversibilité.",
      },
      explain: {
        prompt:
          "Expliquez à un formateur pourquoi le LMS n’est pas le scénario pédagogique.",
        evidenceHint:
          "Distinguer infrastructure, paramétrage, activités et expérience d’apprentissage.",
      },
      direct: {
        prompt:
          "Comment arbitrez-vous entre développement spécifique et fonctionnalité standard imparfaite ?",
        evidenceHint:
          "Comparer valeur, fréquence, dette, sécurité, maintenance, réversibilité et adoption.",
      },
      transmit: {
        prompt:
          "Concevez une habilitation interne pour les personnes autorisées à créer et publier un cours.",
        evidenceHint:
          "Prévoir rôles, environnement test, checklist, épreuve et renouvellement.",
      },
      prove: {
        prompt:
          "Présentez une configuration Moodle ou Canvas que vous avez réalisée et son test de bout en bout.",
        evidenceHint:
          "Joindre exigences, rôles, paramétrage, cas de test, incident et correction.",
      },
    }),
    diagnosticAdvice: {
      direct_validation:
        "Passez une recette complète sur un environnement test et défendez architecture, accès, données et réversibilité.",
      short_update:
        "Actualisez interopérabilité LTI/xAPI, gouvernance des données et exploitation mobile.",
      consolidation:
        "Travaillez rôles, achèvement, tests et support avant la mission d’architecture.",
      full_course:
        "Suivez le cours en construisant un espace pilote isolé et un cahier de recette.",
      advanced_mission:
        "Concevez une architecture cible avec intégrations, SSO, journalisation, plan de migration et continuité.",
    },
    essentials: [
      "Le choix d’un LMS part des parcours, rôles, volumes, données, contraintes et processus de support.",
      "Configuration, contenu et données doivent être séparés, versionnés et testés.",
      "Interopérabilité signifie un échange vérifié dans un cas réel, pas seulement un logo commercial.",
      "Rôles, moindre privilège, sauvegarde, réversibilité et continuité font partie de l’expérience.",
      "Les analytics d’usage doivent répondre à une finalité pédagogique légitime.",
    ],
    vocabulary: [
      {
        term: "LMS",
        definition:
          "Système gérant accès, activités, inscriptions, progression, évaluations et administration de formations.",
      },
      {
        term: "LTI",
        definition:
          "Standard d’intégration permettant de lancer un outil éducatif et d’échanger un contexte autorisé.",
      },
      {
        term: "xAPI",
        definition:
          "Spécification d’échange d’énoncés d’expérience structurés, généralement stockés dans un LRS.",
      },
      {
        term: "SCORM",
        definition:
          "Ensemble de spécifications historiques pour empaqueter, lancer et suivre certains contenus dans un LMS.",
      },
      {
        term: "Réversibilité",
        definition:
          "Capacité contractuelle et technique à récupérer données, contenus et configurations dans un format exploitable.",
      },
    ],
    methodSteps: [
      {
        title: "Décrire cas d’usage et exigences",
        detail:
          "Cartographier parcours, rôles, volumes, mobile, accessibilité, données, intégrations, sécurité, support et contraintes contractuelles.",
        control:
          "Chaque exigence possède un test d’acceptation et un niveau obligatoire ou souhaitable.",
      },
      {
        title: "Concevoir l’architecture et la gouvernance",
        detail:
          "Définir source de vérité, authentification, rôles, flux, environnements, sauvegardes, journaux et propriétaires.",
        control:
          "Chaque donnée critique a une source, une destination, une base d’accès et une règle de conservation.",
      },
      {
        title: "Configurer un pilote reproductible",
        detail:
          "Créer gabarits, catégories, rôles, inscriptions, achèvement, notifications et rapports dans un environnement de test.",
        control:
          "La configuration est consignée et peut être reconstruite sans mémoire individuelle.",
      },
      {
        title: "Recetter de bout en bout",
        detail:
          "Tester profils, appareils, accessibilité, intégrations, erreurs, charge, export et restauration avec données fictives.",
        control:
          "Chaque défaut possède gravité, reproductibilité, responsable, correction et retest.",
      },
      {
        title: "Déployer et exploiter",
        detail:
          "Former les rôles, publier support, surveiller incidents et adoption, gérer versions et préparer la sortie.",
        control:
          "Go-live, rollback, support et communication sont répétés avant ouverture réelle.",
      },
    ],
    tools: [
      {
        name: "Cahier des exigences LMS",
        use: "Prioriser cas d’usage, exigences non fonctionnelles et tests d’acceptation.",
      },
      {
        name: "Matrice rôles-permissions",
        use: "Appliquer le moindre privilège et contrôler les actions critiques par profil.",
      },
      {
        name: "Cahier de recette",
        use: "Exécuter des scénarios de bout en bout avec résultat attendu, obtenu et preuve.",
      },
      {
        name: "Registre d’incidents",
        use: "Tracer impact, priorité, cause, contournement, correction, délai et retour d’expérience.",
      },
    ],
    templates: [
      {
        name: "Cahier des charges LMS",
        structure:
          "Contexte | utilisateurs | parcours | fonctions | données | intégrations | sécurité | accessibilité | SLA | réversibilité | tests.",
      },
      {
        name: "Plan de recette",
        structure:
          "ID | rôle | précondition | étapes | résultat attendu | résultat | preuve | gravité | correction | retest.",
      },
      {
        name: "Runbook d’exploitation",
        structure:
          "Opération | fréquence | rôle | contrôle | journal | alerte | escalade | sauvegarde | restauration.",
      },
    ],
    checkpoints: [
      "Les comptes de test ne possèdent aucune donnée personnelle réelle.",
      "Le parcours complet est testé avec les droits exacts de chaque rôle.",
      "Exports, sauvegardes et restauration ont été exécutés, pas seulement promis.",
      "Le fonctionnement sur iPhone et avec technologie d’assistance fait partie de la recette.",
    ],
    commonErrors: [
      "Choisir une plateforme sur une démonstration commerciale sans cas de recette.",
      "Donner des droits administrateur pour contourner un problème de rôle.",
      "Confondre achèvement technique et acquisition de la compétence.",
      "Oublier coût de migration, support, maintenance et sortie dans le comparatif.",
    ],
    risks: [
      {
        risk: "Exposition ou altération de données par permissions excessives.",
        prevention:
          "Appliquer moindre privilège, tests par rôle, journaux et revue périodique des accès.",
      },
      {
        risk: "Dépendance fournisseur sans export exploitable.",
        prevention:
          "Tester réversibilité avant contrat et régulièrement pendant l’exploitation.",
      },
      {
        risk: "Échec d’adoption malgré la réussite technique.",
        prevention:
          "Concevoir avec utilisateurs, réduire les frictions, former par rôle et mesurer les tâches réussies.",
      },
    ],
    example: {
      context:
        "LOGIX FORMA utilise des fichiers partagés et souhaite déployer Moodle pour 150 apprenants et 10 formateurs.",
      approach:
        "Le cadrage limite le pilote à inscription, parcours, dépôt, quiz et preuve de complétion. Trois rôles sont configurés, vingt cas sont testés sur mobile, un paquet SCORM est comparé à des activités natives et l’export des notes et contenus est vérifié.",
      result:
        "Deux défauts bloquants sont corrigés : visibilité excessive d’un rapport et notification ambiguë. Le déploiement est autorisé sur une cohorte, avec support de niveau 1 et revue des accès à trente jours.",
    },
    guidedPractice: {
      prompt:
        "Préparez la recette d’un parcours LMS depuis l’inscription jusqu’à l’export d’une preuve.",
      steps: [
        "Définir trois rôles et les actions autorisées ou interdites.",
        "Écrire dix cas dont deux scénarios d’erreur et un besoin d’accessibilité.",
        "Créer les données fictives et exécuter sur ordinateur et téléphone.",
        "Classer les anomalies et corriger un défaut bloquant.",
        "Tester export, sauvegarde ou restauration et consigner le résultat.",
      ],
    },
    mission: {
      id: "mission-lms-pilot",
      title: "Construire et recetter le pilote LMS LOGIX FORMA",
      context:
        "LOGIX FORMA doit ouvrir un premier parcours digital à une cohorte réelle sans compromettre données, accessibilité ni continuité.",
      deliverable:
        "Cahier des charges, architecture, matrice des rôles, configuration documentée, parcours pilote, recette, runbook, support et décision go/no-go.",
      criticalCriterion:
        "Aucune ouverture ne peut être autorisée sans recette de bout en bout, droits contrôlés et solution de retour.",
      criteria: [
        "Les choix fonctionnels répondent à des cas d’usage prioritaires.",
        "Les rôles et données respectent le moindre privilège.",
        "Mobile, accessibilité, erreur et réversibilité sont testés.",
        "Les anomalies bloquantes sont fermées avant le go-live.",
      ],
    },
    withoutAi:
      "Rédiger exigences, architecture, matrice de droits et cas de recette à partir des processus réels.",
    withAi:
      "Utiliser une IA pour générer des cas limites et reformuler des messages d’aide, puis exécuter chaque test et vérifier la documentation officielle.",
    aiAuditChecklist: [
      "L’IA invente-t-elle une fonction ou un niveau de conformité non documenté ?",
      "Les configurations proposées correspondent-elles à la version déployée ?",
      "Les scripts ou réglages respectent-ils sécurité et moindre privilège ?",
      "Aucune donnée, URL privée, clé ou compte réel n’a-t-il été transmis ?",
      "Chaque test généré possède-t-il un résultat attendu vérifiable ?",
    ],
    deliverableTemplate: [
      "Périmètre, utilisateurs et cas d’usage",
      "Exigences et critères d’acceptation",
      "Architecture, rôles, données et sécurité",
      "Configuration et contenus du pilote",
      "Recette, anomalies et retests",
      "Exploitation, support et continuité",
      "Décision go/no-go et annexes",
    ],
    explanations: {
      simple:
        "Un LMS est l’infrastructure du parcours : il faut régler les bons accès, tester chaque étape et prévoir l’aide comme pour un service numérique.",
      professional:
        "La gouvernance LMS relie exigences, architecture, paramétrage, recette, sécurité, interopérabilité, exploitation et réversibilité.",
      defense:
        "Devant la direction, démontrer les cas testés, les défauts fermés, les limites acceptées, le coût total et le plan de retour.",
    },
    transmissionActivity:
      "Faire passer aux futurs éditeurs une habilitation : créer un espace à partir du gabarit, appliquer les droits, publier, tester comme apprenant et corriger une anomalie.",
    reflexCard: [
      "Quel cas d’usage et quel rôle ?",
      "Quelle donnée circule et pourquoi ?",
      "Quel droit minimal ?",
      "Quel résultat de test attendu ?",
      "Que se passe-t-il en cas d’erreur ?",
      "Comment récupérer et restaurer ?",
    ],
    knowledgeCheck: [
      {
        id: "lms-q1",
        prompt:
          "Quelle preuve est la plus solide pour une exigence d’interopérabilité ?",
        choices: [
          "Le logo du standard sur une brochure",
          "Un test du cas réel avec données échangées et erreurs documentées",
          "La promesse orale du vendeur",
          "Une capture d’écran",
        ],
        correct:
          "Un test du cas réel avec données échangées et erreurs documentées",
        correction:
          "La conformité annoncée ne garantit ni version, ni périmètre, ni fonctionnement dans l’architecture cible.",
      },
      {
        id: "lms-q2",
        prompt:
          "Quelle pratique applique correctement le moindre privilège ?",
        choices: [
          "Tous administrateurs",
          "Droits minimaux par tâche, revus et testés",
          "Un compte partagé",
          "Aucun journal",
        ],
        correct: "Droits minimaux par tâche, revus et testés",
        correction:
          "Chaque rôle reçoit seulement les actions nécessaires, ce qui réduit erreur et exposition.",
      },
      {
        id: "lms-q3",
        prompt: "Que prouve un statut technique « terminé » dans un LMS ?",
        choices: [
          "Toujours une compétence",
          "Seulement la condition d’achèvement configurée",
          "Un transfert métier",
          "Une satisfaction élevée",
        ],
        correct: "Seulement la condition d’achèvement configurée",
        correction:
          "La condition peut porter sur une consultation ou un score ; sa signification doit être précisée.",
      },
    ],
    correctionGuide: [
      "Transformer toute exigence vague en cas d’usage, critère d’acceptation et preuve.",
      "Retirer les droits excessifs puis exécuter de nouveau les tests par rôle.",
      "Ajouter au plan un cas mobile, un cas accessible, un incident et une sortie de données.",
      "Effectuer une seconde recette ; trois réponses justes et aucun défaut critique non traité sont requis.",
    ],
    logixApplication:
      "Travailler dans un environnement distinct, conserver les exports de configuration et les preuves de recette, puis limiter le lancement à une cohorte avec canal de support identifié.",
    competencies: [
      "Formaliser des exigences digital learning",
      "Concevoir rôles, flux et gouvernance d’un LMS",
      "Recetter sécurité, accessibilité et interopérabilité",
      "Organiser déploiement, support et réversibilité",
    ],
  },
  {
    id: "digital-accessibility",
    order: 24,
    phase: 4,
    title: "Accessibilité numérique appliquée à la formation",
    shortTitle: "Accessibilité numérique",
    objective:
      "Intégrer l’accessibilité dès la conception, produire des ressources utilisables et piloter une amélioration fondée sur tests et retours.",
    targetRole: "Référent accessibilité des dispositifs de formation",
    durationHours: 12,
    lastUpdated: "2026-07-16",
    sourceIds: ["rgaa-4-1-2", "w3c-wcag22", "cast-udl"],
    positioning: buildPositioning({
      know: {
        prompt:
          "Expliquez les principes perceptible, utilisable, compréhensible et robuste avec un exemple de formation pour chacun.",
        evidenceHint:
          "Les exemples portent sur des obstacles réels et non sur la seule conformité visuelle.",
      },
      do_without_ai: {
        prompt:
          "Auditez sans IA au clavier une page de cours, sa structure de titres, ses champs et ses messages d’erreur.",
        evidenceHint:
          "Joindre étapes, résultat attendu, constat, impact, référence et correction.",
      },
      do_with_ai: {
        prompt:
          "Comment utiliseriez-vous une IA pour proposer des textes alternatifs sans lui faire décrire incorrectement la fonction pédagogique ?",
        evidenceHint:
          "Prévoir contexte d’usage, brouillon IA, contrôle humain, test et cas d’image décorative.",
      },
      control: {
        prompt:
          "Une vidéo possède des sous-titres automatiques. Quels contrôles restent nécessaires ?",
        evidenceHint:
          "Exactitude, synchronisation, locuteurs, sons utiles, transcription, navigation et équivalence.",
      },
      explain: {
        prompt:
          "Expliquez à un client pourquoi l’accessibilité bénéficie aussi aux personnes sans handicap déclaré.",
        evidenceHint:
          "Relier situations temporaires, mobiles, environnement, langue, clarté et autonomie sans diluer les besoins spécifiques.",
      },
      direct: {
        prompt:
          "Un défaut critique est découvert la veille du lancement. Comment décidez-vous entre correction, alternative et report ?",
        evidenceHint:
          "Arbitrer impact, fréquence, activité essentielle, alternative équivalente, délai, information et responsabilité.",
      },
      transmit: {
        prompt:
          "Construisez une revue de ressource où un formateur apprend à corriger titres, liens, contrastes et alternatives.",
        evidenceHint:
          "Prévoir démonstration avec technologie d’assistance, correction et vérification.",
      },
      prove: {
        prompt:
          "Présentez une ressource rendue plus accessible et les tests prouvant l’amélioration.",
        evidenceHint:
          "Conserver version avant/après, défaut, référence, test manuel, retour utilisateur et limite.",
      },
    }),
    diagnosticAdvice: {
      direct_validation:
        "Auditez une séquence complète avec tests automatiques et manuels, puis faites vérifier la correction par un utilisateur.",
      short_update:
        "Actualisez WCAG 2.2, RGAA, documents bureautiques, vidéo et mobile.",
      consolidation:
        "Travaillez structure sémantique, clavier, médias et formulaires avant l’audit complet.",
      full_course:
        "Suivez le cours sur un module réel, de l’inventaire des obstacles à la publication corrigée.",
      advanced_mission:
        "Concevez le schéma pluriannuel, la gouvernance des dérogations et une campagne de tests utilisateurs.",
    },
    essentials: [
      "L’accessibilité se conçoit depuis les besoins, contenus, interactions et outils ; elle ne se corrige pas uniquement à la fin.",
      "Les quatre principes WCAG structurent des critères testables, mais la conformité ne remplace pas l’usage réel.",
      "Les tests automatiques détectent certains défauts ; clavier, lecteur d’écran, zoom, médias et compréhension exigent des contrôles humains.",
      "Une alternative doit permettre d’atteindre le même objectif pédagogique, pas seulement fournir davantage de texte.",
      "Les défauts sont priorisés selon blocage, fréquence, activité critique et population concernée.",
    ],
    vocabulary: [
      {
        term: "WCAG",
        definition:
          "Recommandations internationales organisant des critères d’accessibilité des contenus web.",
      },
      {
        term: "RGAA",
        definition:
          "Référentiel français proposant une méthode de vérification de l’accessibilité des services numériques.",
      },
      {
        term: "Technologie d’assistance",
        definition:
          "Matériel ou logiciel facilitant l’accès, comme lecteur d’écran, commande vocale ou plage braille.",
      },
      {
        term: "Alternative équivalente",
        definition:
          "Autre moyen accessible permettant d’obtenir l’information ou d’accomplir l’activité avec une finalité comparable.",
      },
      {
        term: "Conception universelle",
        definition:
          "Démarche visant des options de perception, d’action et d’engagement utiles à une diversité de personnes.",
      },
    ],
    methodSteps: [
      {
        title: "Recueillir besoins et usages",
        detail:
          "Identifier tâches essentielles, appareils, technologies d’assistance, contraintes sensorielles, motrices, cognitives et situationnelles.",
        control:
          "Des personnes concernées ou des données d’usage participent au cadrage, sans exiger de diagnostic médical.",
      },
      {
        title: "Concevoir structure et alternatives",
        detail:
          "Organiser titres, ordre de lecture, consignes, liens, composants, médias, documents et options équivalentes.",
        control:
          "Chaque information et action essentielle reste disponible sans dépendre d’une seule perception ou manipulation.",
      },
      {
        title: "Produire avec des gabarits contrôlés",
        detail:
          "Utiliser composants accessibles, styles structurés, contraste, sous-titres corrigés, descriptions utiles et langage clair.",
        control:
          "La checklist de publication est appliquée au fichier source et au rendu final.",
      },
      {
        title: "Tester automatiquement et manuellement",
        detail:
          "Combiner outil automatique, clavier seul, zoom, lecteur d’écran, mobile, compréhension et erreurs de formulaire.",
        control:
          "Chaque test est reproductible avec page, étape, résultat attendu, résultat obtenu et preuve.",
      },
      {
        title: "Corriger et gouverner",
        detail:
          "Prioriser, corriger, retester, documenter limites temporaires, solution alternative, responsable et date.",
        control:
          "Aucun défaut bloquant n’est clos sans retest ; les limites sont communiquées et suivies.",
      },
    ],
    tools: [
      {
        name: "Checklist RGAA/WCAG",
        use: "Structurer les contrôles par contenu, navigation, formulaire, média et compatibilité.",
      },
      {
        name: "Lecteur d’écran et navigation clavier",
        use: "Vérifier ordre, nom accessible, annonces, focus, erreur et accomplissement de la tâche.",
      },
      {
        name: "Test contraste et zoom",
        use: "Contrôler lisibilité, redimensionnement, réorganisation et absence de perte d’information.",
      },
      {
        name: "Registre des obstacles",
        use: "Prioriser impact, fréquence, critère, correction, responsable, échéance et retest.",
      },
    ],
    templates: [
      {
        name: "Fiche d’audit",
        structure:
          "Page | composant | tâche | critère | test | constat | impact | priorité | correction | preuve | retest.",
      },
      {
        name: "Brief ressource accessible",
        structure:
          "Objectif | public | structure | média | alternatives | interaction | langue | tests | responsable | version.",
      },
      {
        name: "Plan d’amélioration",
        structure:
          "Obstacle | criticité | volume | solution immédiate | correction durable | propriétaire | date | statut.",
      },
    ],
    checkpoints: [
      "Toute action essentielle est réalisable au clavier avec un focus visible et logique.",
      "Les titres, listes, tableaux, champs et liens portent une structure ou un nom utile.",
      "Les sous-titres automatiques ont été relus et les informations visuelles essentielles décrites.",
      "Le test mobile inclut zoom, orientation et absence de défilement bloquant.",
    ],
    commonErrors: [
      "Considérer qu’un score automatique élevé prouve la conformité complète.",
      "Écrire « cliquez ici » ou coder une information uniquement par la couleur.",
      "Ajouter un texte alternatif qui répète le nom du fichier sans expliquer la fonction de l’image.",
      "Fournir un PDF non structuré comme unique alternative à une page inaccessible.",
    ],
    risks: [
      {
        risk: "Exclusion d’un participant d’une activité ou d’une évaluation essentielle.",
        prevention:
          "Tester les parcours critiques, offrir une alternative équivalente et organiser le signalement accessible.",
      },
      {
        risk: "Déclaration de conformité infondée.",
        prevention:
          "Définir périmètre, méthode, échantillon, résultats, dérogations et date de l’audit.",
      },
      {
        risk: "Régression lors d’une mise à jour.",
        prevention:
          "Intégrer tests aux gabarits, habiliter les éditeurs et retester les composants critiques à chaque version.",
      },
    ],
    example: {
      context:
        "Le module d’accueil LOGIX FORMA comporte une vidéo, un PDF, un formulaire et un quiz. Un participant utilisant le clavier ne peut pas valider le quiz.",
      approach:
        "L’audit révèle focus invisible, ordre incohérent, champs sans étiquette, PDF sans titres et sous-titres inexacts. L’équipe corrige le composant, produit une page HTML structurée, relit les sous-titres et teste les tâches avec clavier, lecteur d’écran et iPhone.",
      result:
        "Le parcours complet devient réalisable sans souris. Deux défauts mineurs restent documentés avec date de correction. Un gabarit et une habilitation éditeur évitent leur reproduction.",
    },
    guidedPractice: {
      prompt:
        "Auditez puis corrigez une leçon comprenant image informative, vidéo, tableau et question de formulaire.",
      steps: [
        "Définir les quatre tâches essentielles de l’apprenant.",
        "Exécuter outil automatique, clavier, zoom et lecture de structure.",
        "Classer les défauts selon blocage et fréquence.",
        "Corriger structure, alternatives, média et formulaire.",
        "Faire retester par une autre personne et archiver avant/après.",
      ],
    },
    mission: {
      id: "mission-accessible-course",
      title: "Rendre accessible un module LOGIX FORMA",
      context:
        "Un module existant doit accueillir une nouvelle cohorte sur mobile et ordinateur, avec des besoins d’accès variés.",
      deliverable:
        "Inventaire, audit reproductible, ressources corrigées, alternatives, tests utilisateurs, registre des écarts, plan d’amélioration et kit éditeur.",
      criticalCriterion:
        "Toutes les activités et évaluations indispensables doivent être accomplissables par une voie accessible équivalente.",
      criteria: [
        "L’audit combine références, outils et tests manuels.",
        "Les défauts bloquants sont corrigés et retestés.",
        "Les alternatives conservent l’objectif et le niveau d’exigence.",
        "La prévention des régressions est intégrée au processus de publication.",
      ],
    },
    withoutAi:
      "Effectuer l’inventaire, les parcours clavier et le diagnostic initial sans IA afin de comprendre directement les obstacles.",
    withAi:
      "Utiliser une IA pour proposer brouillons d’alternatives et versions en langage clair, puis contrôler fonction, exactitude, contexte et équivalence.",
    aiAuditChecklist: [
      "Le texte alternatif décrit-il la fonction de l’image dans cette activité ?",
      "La simplification préserve-t-elle les notions, consignes et critères nécessaires ?",
      "Les sous-titres respectent-ils termes métier, locuteurs et sons informatifs ?",
      "L’IA a-t-elle déclaré une conformité sans exécuter les tests requis ?",
      "Les besoins ou données de santé d’une personne ont-ils été exclus de la requête ?",
    ],
    deliverableTemplate: [
      "Périmètre, usages et tâches critiques",
      "Références et méthode d’audit",
      "Constats, impacts et priorités",
      "Corrections et alternatives",
      "Tests automatiques, manuels et utilisateurs",
      "Limites, dérogations et plan d’amélioration",
      "Kit de production et prévention des régressions",
    ],
    explanations: {
      simple:
        "Rendre un cours accessible, c’est permettre à chacun de comprendre et d’agir, même s’il ne voit pas, n’entend pas ou n’utilise pas la souris comme prévu.",
      professional:
        "L’accessibilité articule conception inclusive, critères techniques, tests de tâches avec technologies d’assistance et gouvernance des corrections.",
      defense:
        "Devant un client ou auditeur, annoncer le périmètre exact, démontrer les tâches testées, montrer les preuves avant/après et reconnaître les écarts restants.",
    },
    transmissionActivity:
      "Faire corriger par chaque formateur une ressource réelle avec la checklist, puis organiser un test croisé au clavier avant autorisation de publication.",
    reflexCard: [
      "Quelle tâche essentielle doit rester possible ?",
      "L’information dépend-elle d’un seul sens ?",
      "La structure est-elle sémantique et compréhensible ?",
      "Le clavier et le focus fonctionnent-ils ?",
      "L’alternative est-elle vraiment équivalente ?",
      "Qui reteste et prévient la régression ?",
    ],
    knowledgeCheck: [
      {
        id: "accessibility-q1",
        prompt:
          "Pourquoi un outil automatique ne suffit-il pas pour un audit d’accessibilité ?",
        choices: [
          "Il ne détecte jamais rien",
          "De nombreux critères exigent contexte, interaction et jugement humain",
          "Il est toujours payant",
          "Le RGAA interdit les outils",
        ],
        correct:
          "De nombreux critères exigent contexte, interaction et jugement humain",
        correction:
          "Les outils repèrent certains motifs ; équivalence, ordre, compréhension et accomplissement demandent des tests humains.",
      },
      {
        id: "accessibility-q2",
        prompt:
          "Quelle alternative convient à une image purement décorative ?",
        choices: [
          "Une description très longue",
          "Un nom de fichier",
          "Une alternative vide afin qu’elle soit ignorée",
          "Le mot « image »",
        ],
        correct: "Une alternative vide afin qu’elle soit ignorée",
        correction:
          "Une image sans information utile ne doit pas interrompre inutilement la lecture assistée.",
      },
      {
        id: "accessibility-q3",
        prompt:
          "Quel défaut doit être traité en premier ?",
        choices: [
          "Une nuance de style non bloquante",
          "L’impossibilité de soumettre l’évaluation au clavier",
          "Une préférence de couleur interne",
          "Un espacement légèrement différent",
        ],
        correct: "L’impossibilité de soumettre l’évaluation au clavier",
        correction:
          "Le défaut bloque une activité essentielle et produit une exclusion directe.",
      },
    ],
    correctionGuide: [
      "Reprendre les défauts depuis les tâches essentielles et non depuis le seul score automatique.",
      "Corriger un défaut de structure, de clavier, de média et de formulaire puis retester.",
      "Remplacer toute alternative appauvrie par une voie permettant la même compétence.",
      "Réaliser une seconde tentative sur une nouvelle leçon ; trois réponses justes et aucun blocage critique sont requis.",
    ],
    logixApplication:
      "Intégrer la checklist au bon à publier LOGIX FORMA, désigner un référent, organiser un canal accessible de signalement et planifier une revue trimestrielle des gabarits.",
    competencies: [
      "Concevoir des contenus et interactions accessibles",
      "Auditer selon WCAG et RGAA avec tests manuels",
      "Prioriser et corriger des obstacles",
      "Piloter une prévention durable des régressions",
    ],
  },
  {
    id: "professional-english-ld",
    order: 30,
    phase: 5,
    title: "Anglais professionnel Learning & Development",
    shortTitle: "Professional English for L&D",
    objective:
      "Communiquer avec précision en anglais dans les situations clés d’un responsable L&D, selon un parcours adapté au positionnement CECRL.",
    targetRole: "International Learning & Development Manager",
    durationHours: 18,
    lastUpdated: "2026-07-16",
    sourceIds: [
      "cefr-companion-2020",
      "british-council-business-english",
      "cipd-ld-factsheet",
    ],
    positioning: buildPositioning({
      know: {
        prompt:
          "Define in English the terms learning outcome, capability, stakeholder, evidence and transfer, then use each in context.",
        evidenceHint:
          "Definitions are accurate, natural and connected to L&D decisions.",
      },
      do_without_ai: {
        prompt:
          "Write without AI a 180-word executive summary recommending a learning intervention.",
        evidenceHint:
          "Assess structure, precision, tone, grammar, terminology and decision requested.",
      },
      do_with_ai: {
        prompt:
          "Explain in English how you would use AI to edit a proposal while preserving your meaning and confidential information.",
        evidenceHint:
          "The workflow includes personal draft, anonymisation, tracked edits, verification and ownership.",
      },
      control: {
        prompt:
          "Review a short supplier proposal in English and identify ambiguity in scope, evidence and commitments.",
        evidenceHint:
          "Mark exact phrases, explain the risk and propose clearer wording.",
      },
      explain: {
        prompt:
          "Explain in plain English to a non-specialist how learning transfer will be supported.",
        evidenceHint:
          "The explanation is understandable, concrete and free of unnecessary jargon.",
      },
      direct: {
        prompt:
          "Chair in English a five-minute decision meeting with disagreement on budget and timeline.",
        evidenceHint:
          "Set purpose, invite views, summarise, decide, assign actions and check understanding.",
      },
      transmit: {
        prompt:
          "Teach a colleague five English phrases for giving precise but constructive feedback on a course design.",
        evidenceHint:
          "Model pronunciation or usage, contrast weak/strong phrasing and verify reuse.",
      },
      prove: {
        prompt:
          "Provide an English-language professional artifact and identify what level of independent performance it proves.",
        evidenceHint:
          "Include original version, context, assistance used, correction history and limits.",
      },
    }),
    diagnosticAdvice: {
      direct_validation:
        "Complete the final mission and live defence; use the course as an optional reference bank.",
      short_update:
        "Focus on L&D terminology, executive concision, negotiation and correction of persistent errors.",
      consolidation:
        "Complete targeted writing and meeting drills before the integrated mission.",
      full_course:
        "Follow the full sequence: controlled language, writing, meetings, suppliers, data and executive defence.",
      advanced_mission:
        "Lead a bilingual workshop and produce a publication-ready strategy pack with peer coaching.",
    },
    essentials: [
      "Professional effectiveness depends on task, audience and precision, not on imitating a native accent.",
      "A clear L&D message states context, evidence, recommendation, limits and action expected.",
      "Terminology must remain consistent across brief, budget, evaluation and supplier discussion.",
      "AI editing follows a personal draft and tracked review; the author remains able to explain every sentence.",
      "The CEFR position guides practice intensity but does not replace evidence from authentic L&D tasks.",
    ],
    vocabulary: [
      {
        term: "Learning needs analysis",
        definition:
          "A structured investigation of required performance, current capability, causes and suitable responses.",
      },
      {
        term: "Learning transfer",
        definition:
          "The use and adaptation of learning in the relevant work setting.",
      },
      {
        term: "Statement of work",
        definition:
          "A document defining scope, deliverables, responsibilities, milestones, acceptance and commercial conditions.",
      },
      {
        term: "Evidence-based recommendation",
        definition:
          "A proposed decision supported by relevant data, professional judgement and explicit limitations.",
      },
      {
        term: "Mitigation",
        definition:
          "An action designed to reduce the likelihood or impact of a risk.",
      },
      {
        term: "Capability gap",
        definition:
          "A substantiated difference between the organisational capability required and currently available.",
      },
    ],
    methodSteps: [
      {
        title: "Position by professional task",
        detail:
          "Assess listening, interaction, reading, writing and mediation through L&D briefs, meetings, data commentary and defence.",
        control:
          "The learning plan names specific tasks, recurring errors, target conditions and evidence, not only a global CEFR label.",
      },
      {
        title: "Build controlled professional language",
        detail:
          "Create phrase banks for clarification, evidence, uncertainty, recommendation, disagreement, risk, action and follow-up.",
        control:
          "Each phrase is used in a new authentic sentence and checked for register and meaning.",
      },
      {
        title: "Draft and revise key documents",
        detail:
          "Write briefs, emails, agenda, minutes, supplier questions, budget commentary and executive summaries using message-first structure.",
        control:
          "Revision checks meaning, evidence, scope, tone, terminology, grammar and requested action separately.",
      },
      {
        title: "Lead spoken interactions",
        detail:
          "Rehearse opening, turn-taking, clarification, respectful challenge, synthesis, decision and closing under time pressure.",
        control:
          "A listener can accurately restate the decision, owner, deadline and unresolved issue.",
      },
      {
        title: "Defend and transfer",
        detail:
          "Present a recommendation, answer objections without bluffing, reformulate for different audiences and coach a colleague.",
        control:
          "Unknown information is acknowledged, corrected later and never replaced by fabricated certainty.",
      },
    ],
    tools: [
      {
        name: "CEFR task evidence grid",
        use: "Map professional tasks to independence, range, accuracy, interaction, mediation and proof.",
      },
      {
        name: "L&D phrase bank",
        use: "Store verified language by function: clarify, qualify, challenge, recommend, mitigate, agree and close.",
      },
      {
        name: "Executive writing checklist",
        use: "Control message, evidence, concision, paragraph logic, terminology, tone and call to action.",
      },
      {
        name: "Meeting observation grid",
        use: "Record clarity, listening, turn management, synthesis, decision, follow-up and language repair.",
      },
    ],
    templates: [
      {
        name: "Executive L&D brief",
        structure:
          "Decision required | context | evidence | options | recommendation | cost | risk | next step.",
      },
      {
        name: "Supplier meeting pack",
        structure:
          "Purpose | participants | agenda | requirements | questions | assumptions | decisions | actions | follow-up.",
      },
      {
        name: "Language learning log",
        structure:
          "Task | first attempt | feedback | recurring error | correction rule | second attempt | independent reuse.",
      },
    ],
    checkpoints: [
      "The main decision or request appears before background detail.",
      "Facts, estimates and assumptions use distinct language.",
      "Terms, numbers, dates, owners and conditions are consistent across documents.",
      "AI changes are tracked and every retained sentence can be explained without the tool.",
    ],
    commonErrors: [
      "Translating French administrative expressions word for word without checking their function.",
      "Hiding uncertainty behind vague corporate language.",
      "Writing long background paragraphs before stating the requested decision.",
      "Accepting fluent AI wording that changes scope, commitment or evidence.",
    ],
    risks: [
      {
        risk: "Commercial or contractual misunderstanding caused by ambiguous English.",
        prevention:
          "Use defined terms, acceptance criteria, written recap and explicit confirmation of commitments.",
      },
      {
        risk: "Loss of credibility through invented fluency or unverified claims.",
        prevention:
          "Use repair phrases, acknowledge unknowns, verify terms and follow up in writing.",
      },
      {
        risk: "Dependence on AI that prevents live explanation.",
        prevention:
          "Draft first, retain tracked changes, rehearse without AI and maintain a personal error log.",
      },
    ],
    example: {
      context:
        "LOGIX FORMA meets an English-speaking LMS supplier. The initial email asks for a « complete solution » but does not define users, integrations, accessibility or evidence.",
      approach:
        "Moctar rewrites the brief with 150 users, three roles, mobile and accessibility tests, export, support and acceptance criteria. During the meeting he distinguishes mandatory requirements from options, asks for a sandbox, summarises unresolved points and assigns dates.",
      result:
        "The supplier corrects two assumptions and provides a test environment instead of an immediate quote. The written recap prevents a costly misunderstanding about data migration and becomes portfolio evidence.",
    },
    guidedPractice: {
      prompt:
        "Turn a vague French request for a digital learning provider into a clear English brief and a ten-minute meeting.",
      steps: [
        "Write the decision required, audience and five verified facts in English.",
        "Draft scope, exclusions, deliverables and acceptance criteria without AI.",
        "Prepare clarification, challenge and uncertainty phrases.",
        "Run the meeting with a peer and record the decisions and misunderstandings.",
        "Use AI for a tracked language review, accept or reject each change, then redeliver without assistance.",
      ],
    },
    mission: {
      id: "mission-professional-english-ld",
      title: "Defend an L&D recommendation in English",
      context:
        "LOGIX FORMA must recommend a multimodal learning solution to an international partner and negotiate scope, evidence, budget and risks.",
      deliverable:
        "English executive brief, five-slide presentation, supplier questions, meeting minutes, glossary, personal error log, recorded defence and corrected second version.",
      criticalCriterion:
        "The recommendation, evidence, limits, commitments and requested decision must remain accurate and explainable without AI.",
      criteria: [
        "Written and spoken messages are structured for the audience.",
        "L&D terminology, figures and conditions are precise and consistent.",
        "Questions, disagreement and uncertainty are handled professionally.",
        "The second attempt corrects identified errors and shows independent reuse.",
      ],
    },
    withoutAi:
      "Draft the brief, glossary and first oral defence independently under a time limit, preserving the original as evidence.",
    withAi:
      "Use AI to identify unclear language, simulate stakeholder objections and suggest alternatives; track every change and verify technical terms in authoritative sources.",
    aiAuditChecklist: [
      "Did the revision change scope, price, evidence, responsibility or degree of certainty?",
      "Can every technical term be defined and used in a new sentence?",
      "Are quoted facts and standards verified at their source?",
      "Were names, contacts, commercial data and confidential documents removed?",
      "Can the author defend the final version live without reading an AI script?",
    ],
    deliverableTemplate: [
      "Decision required and audience",
      "Context, verified evidence and assumptions",
      "Options and recommendation",
      "Scope, deliverables and acceptance",
      "Cost, risks and mitigations",
      "Questions, decisions and actions",
      "Language log, AI changes and second attempt",
    ],
    explanations: {
      simple:
        "Professional English means making the right message clear enough for another person to decide and act safely.",
      professional:
        "The learner mediates L&D evidence, recommendations and commitments across languages with appropriate register, precision and repair strategies.",
      defense:
        "Open with the decision required, support it with verified evidence, state assumptions, answer directly, acknowledge unknowns and close with owners and dates.",
    },
    transmissionActivity:
      "Coach a colleague through a supplier role-play: teach five functional phrases, observe their use, give specific feedback and ask for a second, unscripted attempt.",
    reflexCard: [
      "What decision or action do I need?",
      "What is fact, estimate or assumption?",
      "Is the terminology precise for this audience?",
      "What could be misunderstood contractually?",
      "How will I clarify, challenge or repair?",
      "Can I explain every sentence without AI?",
    ],
    knowledgeCheck: [
      {
        id: "english-ld-q1",
        prompt: "Which opening is most effective for an executive brief?",
        choices: [
          "Here is some background information about learning.",
          "We recommend a six-week pilot and request approval for a €12,000 cap by 30 September.",
          "Learning is very important nowadays.",
          "Please find a long document attached.",
        ],
        correct:
          "We recommend a six-week pilot and request approval for a €12,000 cap by 30 September.",
        correction:
          "It states the recommendation, decision, amount and deadline before supporting detail.",
      },
      {
        id: "english-ld-q2",
        prompt:
          "A supplier claims the tool is fully accessible. What is the strongest response?",
        choices: [
          "Great, we trust you.",
          "Can you provide the conformance scope and let us test our critical user journeys?",
          "Accessibility is optional.",
          "Please add the word accessible to the contract.",
        ],
        correct:
          "Can you provide the conformance scope and let us test our critical user journeys?",
        correction:
          "The response asks for evidence and a task-based test instead of accepting an undefined claim.",
      },
      {
        id: "english-ld-q3",
        prompt:
          "What should you do when you do not know an answer during a negotiation?",
        choices: [
          "Invent a plausible answer",
          "Change the subject",
          "State what you can confirm, record the question and commit to a verified follow-up",
          "Ask AI silently and repeat the first result",
        ],
        correct:
          "State what you can confirm, record the question and commit to a verified follow-up",
        correction:
          "Professional credibility depends on accurate commitments and disciplined follow-up, not pretended certainty.",
      },
    ],
    correctionGuide: [
      "Mark meaning, structure, terminology and language errors separately in the first attempt.",
      "Rewrite the decision sentence and every ambiguous commitment before correcting minor grammar.",
      "Rehearse recurring errors through three new L&D sentences and a live clarification.",
      "Complete a second brief and defence on a new scenario; three correct answers and no material ambiguity are required.",
    ],
    logixApplication:
      "Use non-confidential LOGIX FORMA scenarios, preserve first and corrected versions, invite an English-speaking peer for feedback and record only material that participants have agreed may enter the portfolio.",
    competencies: [
      "Write concise and accurate L&D documents in English",
      "Lead meetings, clarification and negotiation in English",
      "Explain evidence, uncertainty, budget and risk",
      "Control AI-assisted language while retaining independent performance",
    ],
  },
];

export const PEDAGOGY_SOURCE_IDS = [
  "iso-21001",
  "digcompedu",
  "unesco-futures-education",
  "cast-udl",
  "w3c-wcag22",
  "ies-organizing-instruction",
  "deans-for-impact-science-learning",
  "cipd-ld-factsheet",
  "iso-30422",
  "atd-capability-model",
  "cipd-learning-needs-analysis",
  "france-travail-metierscope",
  "cipd-ld-strategy",
  "oecd-skills-strategy",
  "iso-30414",
  "cipd-learning-evaluation",
  "kirkpatrick-model",
  "moodle-docs",
  "1edtech-lti",
  "adlnet-xapi",
  "rgaa-4-1-2",
  "cefr-companion-2020",
  "british-council-business-english",
] as const;
