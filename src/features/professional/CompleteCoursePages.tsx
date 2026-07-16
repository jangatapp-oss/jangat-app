import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ALL_PROFESSIONAL_COURSES } from "./curriculum";
import { findSource } from "./sourceRegistry";
import { recommendTrack, REQUIRED_POSITIONING_DIMENSIONS, type PositioningDimension, type TrackRecommendation } from "./curriculumTypes";
import { loadCourseProgress, markCourseViewed, saveAssessmentAttempt, saveCoursePositioning, saveDefense } from "./professionalService";

const TRACK_LABELS:Record<TrackRecommendation,string>={
  direct_validation:"Validation directe sur preuve",
  short_update:"Mise à jour courte",
  consolidation:"Consolidation ciblée",
  full_course:"Parcours complet",
  advanced_mission:"Mission de niveau supérieur",
};

const DIMENSION_LABELS:Record<PositioningDimension,string>={
  know:"Je connais",
  do_without_ai:"Je sais faire sans IA",
  do_with_ai:"Je sais faire avec IA",
  control:"Je sais contrôler",
  explain:"Je sais expliquer",
  direct:"Je sais diriger",
  transmit:"Je sais transmettre",
  prove:"Je peux le prouver",
};

function ContentSection({title,children,open=false}:{title:string;children:React.ReactNode;open?:boolean}) {
  return <details className="course-section card" open={open}><summary>{title}</summary><div className="course-section-body">{children}</div></details>;
}

export function CompleteCoursePage() {
  const {courseId}=useParams();const course=ALL_PROFESSIONAL_COURSES.find(item=>item.id===courseId);
  const [scores,setScores]=useState<Record<PositioningDimension,number>>(()=>Object.fromEntries(REQUIRED_POSITIONING_DIMENSIONS.map(d=>[d,1])) as Record<PositioningDimension,number>);
  const [track,setTrack]=useState<TrackRecommendation|null>(null);const [showFull,setShowFull]=useState(false);const [assessmentPassed,setAssessmentPassed]=useState(false);const [notice,setNotice]=useState("");const [error,setError]=useState("");
  const [answers,setAnswers]=useState<Record<string,string>>({});const [corrections,setCorrections]=useState<string[]>([]);const [assessmentNotice,setAssessmentNotice]=useState("");
  useEffect(()=>{if(!course)return;loadCourseProgress().then(rows=>{const row=rows.find(item=>item.course_key===course.id);if(row?.recommended_track){setTrack(row.recommended_track as TrackRecommendation);setScores(row.positioning_scores as Record<PositioningDimension,number>);setAssessmentPassed(["assessment_passed","mission_submitted","completed"].includes(row.status))}}).catch(caught=>setError(caught instanceof Error?caught.message:String(caught)))},[course]);
  useEffect(()=>{if(course&&track&&showFull)markCourseViewed(course.id).catch(()=>undefined)},[course,showFull,track]);
  if(!course)return <Navigate to="/professional"/>;
  const position=async(e:FormEvent)=>{e.preventDefault();const recommendation=recommendTrack(scores);await saveCoursePositioning(course.id,scores,recommendation);setTrack(recommendation);setShowFull(recommendation==="full_course"||recommendation==="consolidation");setNotice(`Diagnostic enregistré : ${TRACK_LABELS[recommendation]}.`)};
  const assess=async(e:FormEvent)=>{e.preventDefault();const details=course.knowledgeCheck.map(question=>({question,answer:answers[question.id],ok:answers[question.id]===question.correct}));const score=Math.round(100*details.filter(item=>item.ok).length/details.length);const nextCorrections=details.filter(item=>!item.ok).map(item=>`${item.question.prompt} — ${item.question.correction}`);const result=await saveAssessmentAttempt(course.id,answers,score,nextCorrections);setCorrections(nextCorrections);setAssessmentPassed(result.passed);setAssessmentNotice(result.passed?`Évaluation réussie avec ${score} %. Vous pouvez réaliser la mission autonome.`:`Tentative ${result.attemptNumber} : ${score} %. Consultez la correction puis effectuez une seconde tentative.`)};
  return <><Link className="back" to="/professional">← Parcours complet</Link><section className="course-intro"><p className="eyebrow">Phase {course.phase} · Domaine {course.order}/34</p><h1>{course.title}</h1><p>{course.objective}</p><div className="course-meta"><span>{course.durationHours} h indicatives</span><span>Mise à jour : {course.lastUpdated}</span><span>Cible : {course.targetRole}</span></div></section>
    {error&&<div className="feedback error">{error}</div>}
    {!track?<form className="card professional-form" onSubmit={position}><h2>Positionnement obligatoire avant ce domaine</h2><p>Notez chaque capacité de 1 « non démontré » à 7 « maîtrise transmissible ». Le contenu complet restera consultable quelle que soit la recommandation.</p><div className="course-positioning">{course.positioning.map(question=><label key={question.dimension}><span><strong>{DIMENSION_LABELS[question.dimension]}</strong>{question.prompt}<small>{question.evidenceHint}</small></span><input type="range" min="1" max="7" value={scores[question.dimension]} onChange={event=>setScores({...scores,[question.dimension]:Number(event.target.value)})}/><b>{scores[question.dimension]}/7</b></label>)}</div><button className="primary">Obtenir mon diagnostic personnalisé</button></form>:<><section className="card recommendation"><span className="status-chip operational">Parcours recommandé</span><h2>{TRACK_LABELS[track]}</h2><p>{course.diagnosticAdvice[track]}</p><div className="professional-actions"><button className="primary" onClick={()=>setShowFull(true)}>Consulter le cours complet</button>{assessmentPassed?<Link className="secondary-button" to={`/professional/mission/${course.mission.id}`}>Passer à la mission</Link>:<span className="form-hint">Réussissez d’abord l’évaluation avec au moins 80 %.</span>}</div>{notice&&<p role="status">{notice}</p>}</section>
    {showFull&&<div className="complete-course-content">
      <ContentSection title="1. Notions essentielles" open><ul>{course.essentials.map(item=><li key={item}>{item}</li>)}</ul></ContentSection>
      <ContentSection title="2. Vocabulaire professionnel"><dl>{course.vocabulary.map(item=><div key={item.term}><dt>{item.term}</dt><dd>{item.definition}</dd></div>)}</dl></ContentSection>
      <ContentSection title="3. Méthode détaillée, points de contrôle et outils"><ol className="method-list">{course.methodSteps.map(step=><li key={step.title}><h3>{step.title}</h3><p>{step.detail}</p><small>Contrôle : {step.control}</small></li>)}</ol><h3>Outils</h3><ul>{course.tools.map(tool=><li key={tool.name}><strong>{tool.name} :</strong> {tool.use}</li>)}</ul></ContentSection>
      <ContentSection title="4. Modèles et matrices"><div className="template-grid">{course.templates.map(template=><article key={template.name}><h3>{template.name}</h3><p>{template.structure}</p></article>)}</div><h3>Structure du livrable</h3><ol>{course.deliverableTemplate.map(item=><li key={item}>{item}</li>)}</ol></ContentSection>
      <ContentSection title="5. Contrôles, erreurs et risques"><h3>Points de contrôle</h3><ul>{course.checkpoints.map(item=><li key={item}>{item}</li>)}</ul><h3>Erreurs fréquentes</h3><ul>{course.commonErrors.map(item=><li key={item}>{item}</li>)}</ul><h3>Risques et prévention</h3>{course.risks.map(item=><p key={item.risk}><strong>{item.risk} :</strong> {item.prevention}</p>)}</ContentSection>
      <ContentSection title="6. Exemple professionnel complet"><p><strong>Contexte :</strong> {course.example.context}</p><p><strong>Démarche :</strong> {course.example.approach}</p><p><strong>Résultat :</strong> {course.example.result}</p><p><strong>Application LOGIX FORMA :</strong> {course.logixApplication}</p></ContentSection>
      <ContentSection title="7. Pratique guidée"><p>{course.guidedPractice.prompt}</p><ol>{course.guidedPractice.steps.map(step=><li key={step}>{step}</li>)}</ol></ContentSection>
      <ContentSection title="8. Sans IA, avec IA et audit d’une production IA"><h3>Situation sans IA</h3><p>{course.withoutAi}</p><h3>Situation avec IA contrôlée</h3><p>{course.withAi}</p><h3>Audit obligatoire</h3><ul>{course.aiAuditChecklist.map(item=><li key={item}>{item}</li>)}</ul></ContentSection>
      <ContentSection title="9. Expliquer, défendre et transmettre"><h3>Explication simple</h3><p>{course.explanations.simple}</p><h3>Explication professionnelle</h3><p>{course.explanations.professional}</p><h3>Défense devant une direction, un client ou un auditeur</h3><p>{course.explanations.defense}</p><h3>Transmission à un collaborateur</h3><p>{course.transmissionActivity}</p></ContentSection>
      <ContentSection title="10. Fiche réflexe"><ul>{course.reflexCard.map(item=><li key={item}>{item}</li>)}</ul></ContentSection>
      <ContentSection title="11. Évaluation et correction détaillée"><form className="knowledge-check" onSubmit={assess}>{course.knowledgeCheck.map(question=><fieldset key={question.id}><legend>{question.prompt}</legend>{question.choices.map(choice=><label key={choice}><input type="radio" name={question.id} value={choice} checked={answers[question.id]===choice} onChange={()=>setAnswers({...answers,[question.id]:choice})}/>{choice}</label>)}</fieldset>)}<button className="primary" disabled={course.knowledgeCheck.some(question=>!answers[question.id])}>Corriger ma tentative</button></form>{assessmentNotice&&<div className={corrections.length?"feedback error":"feedback ok"} role="status"><p>{assessmentNotice}</p>{corrections.map(item=><p key={item}>{item}</p>)}{corrections.length>0&&<><h3>Guide de seconde tentative</h3><ol>{course.correctionGuide.map(item=><li key={item}>{item}</li>)}</ol><button onClick={()=>{setAnswers({});setCorrections([]);setAssessmentNotice("")}}>Commencer la seconde tentative</button></>}</div>}</ContentSection>
      <ContentSection title="12. Sources et compétences validables"><div>{course.sourceIds.map(id=>{const source=findSource(id);return source?<a className="source-link" href={source.url} target="_blank" rel="noreferrer" key={id}>{source.authority} · {source.title}<small>Vérifiée le {source.checkedAt}</small></a>:<p className="source-missing" key={id}>Source à enregistrer : {id}</p>})}</div><h3>Compétences visées</h3><ul>{course.competencies.map(item=><li key={item}>{item}</li>)}</ul></ContentSection>
      <section className="card mission-summary"><span className="status-chip operational">Mission autonome</span><h2>{course.mission.title}</h2><p>{course.mission.context}</p><p><strong>Livrable :</strong> {course.mission.deliverable}</p><p><strong>Critère critique :</strong> {course.mission.criticalCriterion}</p><Link className="primary" to={`/professional/mission/${course.mission.id}`}>Produire le livrable et la preuve</Link></section>
    </div>}</>}</>;
}

const DEFENSE_SECTIONS=["Stratégie LOGIX FORMA","Offre","Parcours multimodal","Budget","Financement","Qualiopi","Organisation","Gestion de projet","Management","Indicateurs","Stratégie IA","Risques","Plan d’action"];
const CONTRADICTORY_QUESTIONS=[
  "Quel choix abandonneriez-vous si le budget baissait de 25 % et pourquoi ?",
  "Quelle preuve vous autorise à affirmer que le dispositif produira un impact ?",
  "Quel est le risque réglementaire le plus grave et qui en assume le contrôle ?",
  "Quelle partie a été réalisée par l’IA et comment avez-vous détecté ses erreurs ?",
  "Comment réagiriez-vous si l’équipe refusait la transformation proposée ?",
  "Quelle décision changeriez-vous après les critiques reçues ?",
];
const DEFENSE_CRITERIA=["Cohérence stratégique","Solidité économique","Conformité","Qualité pédagogique","Maîtrise des risques","Contrôle de l’IA","Défense des décisions","Capacité à diriger","Capacité à transmettre"];

export function FinalDefensePage() {
  const [dossier,setDossier]=useState<Record<string,string>>({});const [presentation,setPresentation]=useState("");const [answers,setAnswers]=useState<Record<string,string>>({});const [ai,setAi]=useState("");const [decisions,setDecisions]=useState("");const [direction,setDirection]=useState("");const [transmission,setTransmission]=useState("");const [criteria,setCriteria]=useState<Record<string,string>>({});const [notice,setNotice]=useState("");
  const complete=DEFENSE_SECTIONS.every(section=>(dossier[section]||"").trim().length>=40)&&CONTRADICTORY_QUESTIONS.every(question=>(answers[question]||"").trim().length>=40)&&presentation.length>=200&&ai.length>=80&&decisions.length>=80&&direction.length>=80&&transmission.length>=80&&DEFENSE_CRITERIA.every(criterion=>criteria[criterion]);
  const submit=async(e:FormEvent)=>{e.preventDefault();if(!complete)return;const result=await saveDefense({dossier,presentationText:presentation,contradictoryAnswers:answers,aiContribution:ai,humanDecisions:decisions,teamDirection:direction,transmissionPlan:transmission,criterionResults:criteria});setNotice(result.demonstrated?`Soutenance version ${result.version} démontrée et ajoutée au portfolio.`:`Soutenance version ${result.version} enregistrée. Une correction est requise avant démonstration.`)};
  return <><section className="course-intro"><p className="eyebrow">Épreuve intégrative finale</p><h1>Soutenance professionnelle</h1><p>Présentez, défendez, corrigez et transmettez une stratégie complète pour LOGIX FORMA.</p></section><form className="card professional-form" onSubmit={submit}><fieldset><legend>Dossier professionnel</legend>{DEFENSE_SECTIONS.map(section=><label key={section}>{section}<textarea value={dossier[section]||""} onChange={event=>setDossier({...dossier,[section]:event.target.value})}/></label>)}</fieldset><label>Présentation initiale<textarea value={presentation} onChange={event=>setPresentation(event.target.value)} placeholder="Présentez le problème, vos arbitrages et la décision attendue."/></label><fieldset><legend>Questions contradictoires</legend>{CONTRADICTORY_QUESTIONS.map(question=><label key={question}>{question}<textarea value={answers[question]||""} onChange={event=>setAnswers({...answers,[question]:event.target.value})}/></label>)}</fieldset><label>Ce que l’IA a réalisé<textarea value={ai} onChange={event=>setAi(event.target.value)}/></label><label>Ce que vous avez contrôlé et décidé<textarea value={decisions} onChange={event=>setDecisions(event.target.value)}/></label><label>Comment vous dirigeriez l’équipe<textarea value={direction} onChange={event=>setDirection(event.target.value)}/></label><label>Comment vous transmettriez la méthode<textarea value={transmission} onChange={event=>setTransmission(event.target.value)}/></label><fieldset><legend>Validation par critères</legend>{DEFENSE_CRITERIA.map(criterion=><label className="criterion" key={criterion}><span>{criterion}</span><select value={criteria[criterion]||""} onChange={event=>setCriteria({...criteria,[criterion]:event.target.value})}><option value="">À évaluer</option><option>Respecté</option><option>Partiel</option><option>Non respecté</option></select></label>)}</fieldset><button className="primary" disabled={!complete}>Enregistrer cette version de la soutenance</button>{notice&&<p role="status">{notice}</p>}</form></>;
}

export function useCourseProgressMap() {
  const [progress,setProgress]=useState<Record<string,string>>({});
  useEffect(()=>{loadCourseProgress().then(rows=>setProgress(Object.fromEntries(rows.map(row=>[row.course_key,row.status])))).catch(()=>setProgress({}))},[]);
  return useMemo(()=>progress,[progress]);
}
