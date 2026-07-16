import React, { FormEvent, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { BRAND } from "./config/brand";
import { COURSES, DIAGNOSTIC_QUESTIONS, LESSONS, MODULES } from "./features/content/catalog";
import { canUnlockModule, calculateProgress } from "./features/progress/learning";
import { loadState, type JangatState } from "./features/progress/store";
import { speechService } from "./features/speech/speechService";
import { envError } from "./config/env";
import { supabase } from "./config/supabase";
import { completeLesson, finalizeDiagnostic, loadServerState, recordStep, resetPassword, saveProfile, signIn, signOut, signUp, syncDraft } from "./features/progress/jangatService";
import { deleteDraft, readDraft, writeDraft } from "./features/offline/draftStore";
import { AuthErrorPanel } from "./features/auth/AuthErrorPanel";
import { classifyAuthError, debugAuthError, type AuthUiError } from "./features/auth/authErrors";
import { isProfessionalPathUnlocked } from "./features/professional/professionalCatalog";
import { CvEvidencePage, DomainPage, MissionPage, PortfolioPage, PositioningPage, ProfessionalHub } from "./features/professional/ProfessionalPages";

type AppStore = { state: JangatState; setState: React.Dispatch<React.SetStateAction<JangatState>> };
const StoreContext = React.createContext<AppStore | null>(null);
function useStore() { const value = React.useContext(StoreContext); if (!value) throw new Error("Store absent"); return value; }

function Mascot({ small = false }: { small?: boolean }) {
  return <div className={`mascot ${small ? "small" : ""}`} aria-label="Sàmm, le guide JÀNGAT"><span>✦</span><div className="mascot-trunk"/><i/><b/></div>;
}

function Shell({ children }: { children: React.ReactNode }) {
  const { state, setState } = useStore(); const nav=useNavigate(); const location=useLocation();
  useEffect(()=>{speechService.stop()},[location.pathname]);
  useEffect(()=>{const stop=()=>speechService.stop();document.addEventListener("visibilitychange",stop);window.addEventListener("pagehide",stop);return()=>{document.removeEventListener("visibilitychange",stop);window.removeEventListener("pagehide",stop)}},[]);
  return <div className={`app ${state.profile.theme}`}>
    <header><Link to="/dashboard" className="brand"><Mascot small/><span>JÀNGAT<small>Jàng · Jëf · Xam</small></span></Link>
      <div className="stats" aria-label="Progression"><span>🔥 {state.streak}</span><span>◆ {state.xp} XP</span><span>♥ {state.hearts}</span><button title="Se déconnecter" onClick={async()=>{await signOut();setState(loadState());nav("/login")}}>↪</button></div>
    </header>
    <main>{children}</main>
    {state.authenticated && <nav aria-label="Navigation principale"><Link to="/dashboard">Accueil</Link><Link to={`/course/${COURSES.id}`}>Parcours</Link><Link to="/professional">EduConcret</Link><Link to="/profile">Profil</Link><Link to="/settings">Réglages</Link></nav>}
  </div>;
}

function AuthCallback() {
  const nav=useNavigate();const {setState}=useStore();const [error,setError]=useState<AuthUiError|null>(null);
  useEffect(()=>{if(!supabase)return;supabase.auth.getSession().then(async({data,error:sessionError})=>{try{if(sessionError)throw sessionError;if(!data.session)throw {code:"session_missing",message:"Aucune session n’a été créée à partir du lien reçu."};const remote=await loadServerState();setState(s=>({...s,...remote}));nav(remote.onboarded?"/dashboard":"/onboarding",{replace:true})}catch(caught){const classified=classifyAuthError(caught,"callback");debugAuthError(classified,{action:"authCallback",redirectTo:window.location.href});setError(classified)}})},[nav,setState]);
  return <div className="configuration-error" role="status"><Mascot/>{error?<AuthErrorPanel error={error}/>:<p>Validation de votre lien sécurisé…</p>}<Link to="/login">Retour à la connexion</Link></div>;
}

function ResetPassword() {
  const nav=useNavigate();const [error,setError]=useState<AuthUiError|null>(null);const submit=async(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();setError(null);const password=String(new FormData(e.currentTarget).get("password"));const result=await supabase?.auth.updateUser({password});if(result?.error){const classified=classifyAuthError(result.error,"callback");debugAuthError(classified,{action:"updatePassword"});setError(classified)}else nav("/dashboard")};
  return <div className="auth-page"><section className="auth-hero"><Mascot/><h1>JÀNGAT</h1><p>Choisissez un nouveau mot de passe.</p></section><form className="card auth-card" onSubmit={submit}><h2>Nouveau mot de passe</h2><label>Mot de passe<input name="password" type="password" minLength={8} autoComplete="new-password" required/></label><button className="primary">Enregistrer</button>{error&&<AuthErrorPanel error={error}/>}</form></div>;
}

function Auth({ mode }: { mode: "login" | "signup" | "forgot" }) {
  const { setState } = useStore(); const nav = useNavigate(); const [error,setError]=useState<AuthUiError|null>(null);const [busy,setBusy]=useState(false);const [notice,setNotice]=useState("");
  const submit = async(e: FormEvent<HTMLFormElement>) => { e.preventDefault();setBusy(true);setError(null);const data=new FormData(e.currentTarget);const email=String(data.get("email"));const password=String(data.get("password")||"");let phase:"auth"|"profile"="auth";try{
    if(mode==="forgot"){await resetPassword(email);setNotice("Un lien de récupération vient d’être envoyé.");return}
    if(mode==="signup"){const result=await signUp(email,password,String(data.get("firstName")));if(!result.session){setNotice("Compte créé. Confirmez votre adresse e-mail avant de vous connecter.");return}}
    else await signIn(email,password);
    phase="profile";const remote=await loadServerState();setState(s=>({...s,...remote}));nav(mode==="signup"?"/onboarding":remote.onboarded?"/dashboard":"/onboarding");
  }catch(err){const classified=classifyAuthError(err,phase);debugAuthError(classified,{action:mode,email});setError(classified)}finally{setBusy(false)}};
  return <div className="auth-page"><section className="auth-hero"><Mascot/><p className="eyebrow">{BRAND.signature}</p><h1>{BRAND.name}</h1><p>{BRAND.subtitle}</p></section>
    <form onSubmit={submit} className="card auth-card"><h2>{mode === "login" ? "Heureux de vous revoir" : mode === "signup" ? "Créer mon espace" : "Réinitialiser mon mot de passe"}</h2>
      {mode === "signup" && <label>Prénom<input name="firstName" required autoComplete="given-name"/></label>}
      <label>Adresse e-mail<input name="email" type="email" required autoComplete="email"/></label>
      {mode !== "forgot" && <label>Mot de passe<input name="password" type="password" minLength={8} required autoComplete={mode === "login" ? "current-password" : "new-password"}/></label>}
      <button className="primary" disabled={busy}>{busy?"Connexion…":mode === "login" ? "Se connecter" : mode === "signup" ? "Commencer" : "Envoyer le lien"}</button>
      {error&&<AuthErrorPanel error={error}/>} {notice&&<p className="form-notice" role="status">{notice}</p>}
      {mode === "login" && <><Link to="/forgot-password">Mot de passe oublié ?</Link><p>Pas encore de compte ? <Link to="/signup">S’inscrire</Link></p></>}
      {mode === "signup" && <p>Déjà inscrit ? <Link to="/login">Se connecter</Link></p>}
      {mode === "forgot" && <p>Si ce compte existe, un lien sera envoyé. <Link to="/login">Retour</Link></p>}
    </form></div>;
}

function Onboarding() {
  const { state, setState } = useStore(); const nav = useNavigate(); const [step,setStep]=useState(0);
  const [profile,setProfile]=useState(state.profile);
  const screens = [
    <><Mascot/><p className="eyebrow">Bienvenue dans JÀNGAT</p><h1>Transformez l’apprentissage en compétences démontrées.</h1><p>Jàng pour apprendre. Jëf pour agir. Xam pour maîtriser.</p></>,
    <><p className="eyebrow">Votre cap</p><h1>Pourquoi vous remettre à niveau ?</h1><label>Objectif professionnel<textarea value={profile.goal} onChange={e=>setProfile({...profile,goal:e.target.value})} placeholder="Ex. concevoir un parcours multimodal"/></label><label>Niveau de confiance<select value={profile.level} onChange={e=>setProfile({...profile,level:e.target.value})}><option>À réactiver</option><option>Intermédiaire</option><option>Confirmé</option></select></label></>,
    <><p className="eyebrow">Votre rythme</p><h1>Un objectif réaliste tient dans la durée.</h1><div className="choices">{[15,30,45].map(n=><button key={n} className={profile.dailyGoal===n?"selected":""} onClick={()=>setProfile({...profile,dailyGoal:n})}>{n} minutes par jour</button>)}</div></>,
    <><p className="eyebrow">Vos préférences</p><h1>Apprenez dans vos conditions.</h1><label className="toggle"><input type="checkbox" checked={profile.voice} onChange={e=>setProfile({...profile,voice:e.target.checked})}/> Voix activée</label><label>Vitesse de lecture<input type="range" min=".7" max="1.4" step=".1" value={profile.speechRate} onChange={e=>setProfile({...profile,speechRate:Number(e.target.value)})}/></label><label>Affichage<select value={profile.theme} onChange={e=>setProfile({...profile,theme:e.target.value as "light"|"dark"})}><option value="light">Clair</option><option value="dark">Sombre</option></select></label></>,
    <><Mascot/><p className="eyebrow">Diagnostic initial</p><h1>Prêt à situer vos acquis ?</h1><p>Environ 8 minutes · 7 domaines · résultat immédiat. Ce diagnostic adapte le point de départ, il ne vous juge pas.</p></>
  ];
  const next=async()=>{ if(step<4)setStep(step+1); else {await saveProfile(profile,true);setState(s=>({...s,profile,onboarded:true})); nav("/diagnostic");}};
  return <Shell><section className="onboarding card">{screens[step]}<div className="dots" aria-label={`Étape ${step+1} sur 5`}>{[0,1,2,3,4].map(i=><i className={i<=step?"active":""} key={i}/>)}</div><button className="primary" onClick={next}>{step===4?"Commencer mon diagnostic":"Continuer"}</button></section></Shell>;
}

function Dashboard() {
  const {state}=useStore(); const completed=state.completedLessons.length; const next=LESSONS.find(l=>!state.completedLessons.includes(l.id));const professionalUnlocked=isProfessionalPathUnlocked(state.completedLessons,state.currentCourseValidated);
  return <Shell><section className="welcome"><div><p className="eyebrow">Bonjour {state.profile.firstName || "à vous"}</p><h1>Une petite avancée aujourd’hui ?</h1><p>Parcours recommandé pour réactiver et actualiser votre profil d’ingénieur pédagogique.</p></div><Mascot/></section>
    <div className="metric-grid"><article><span>Objectif</span><strong>{Math.min(completed*5,state.profile.dailyGoal)} / {state.profile.dailyGoal} min</strong></article><article><span>Série</span><strong>{state.streak} jour{state.streak>1?"s":""}</strong></article><article><span>Énergie</span><strong>{state.hearts} / 5 cœurs</strong></article></div>
    <section className="card recommended"><div><p className="eyebrow">Séance recommandée</p><h2>{state.diagnostic ? next?.title || "Réviser vos acquis" : "Diagnostic de positionnement"}</h2><p>{state.diagnostic ? "Une microleçon ciblée de 5 à 8 minutes." : "Identifiez vos points forts et votre premier axe de progression."}</p></div><Link className="primary" to={state.diagnostic ? next ? `/lesson/${next.id}` : `/course/${COURSES.id}` : "/diagnostic"}>Continuer</Link></section>
    <h2>Votre progression</h2><div className="progress"><i style={{width:`${calculateProgress(completed,LESSONS.length)}%`}}/></div><Link className="text-link" to={`/course/${COURSES.id}`}>Voir le parcours complet →</Link>
    <section className="card recommended"><div><p className="eyebrow">Après ce parcours</p><h2>Directeur de formation et ingénieur pédagogique augmenté par l’IA</h2><p>{professionalUnlocked?"Votre parcours professionnel EduConcret est ouvert.":"Il s’ouvrira après la complétion ou la validation explicite du parcours actuel."}</p></div><Link className="primary" to="/professional">{professionalUnlocked?"Ouvrir":"Voir le prérequis"}</Link></section></Shell>;
}

function Diagnostic() {
  const {state,setState}=useStore(); const nav=useNavigate(); const [index,setIndex]=useState(0); const [answers,setAnswers]=useState<Record<string,string>>({});
  const q=DIAGNOSTIC_QUESTIONS[index]; const answer=answers[q.id];
  const next=async()=>{ if(index<DIAGNOSTIC_QUESTIONS.length-1)setIndex(index+1); else {const server=await finalizeDiagnostic(answers);const result={global:server.global_score,domains:server.domain_scores};setState(s=>({...s,diagnostic:result,xp:server.xp,hearts:server.hearts,unlockedModules:["module-1"],streak:server.streak})); nav("/diagnostic/result");}};
  return <Shell><section className="lesson-head"><span>Diagnostic</span><div className="progress"><i style={{width:`${((index+1)/DIAGNOSTIC_QUESTIONS.length)*100}%`}}/></div><strong>{index+1}/{DIAGNOSTIC_QUESTIONS.length}</strong></section>
    <section className="card question"><div className="question-title"><h1>{q.prompt}</h1><button className="speak" disabled={!state.profile.voice||!speechService.isSupported()} onClick={()=>speechService.speak(q.prompt,{rate:1})}>🔊 Écouter</button></div><div className="answers">{q.choices.map(c=><button key={c} className={answer===c?"selected":""} onClick={()=>setAnswers({...answers,[q.id]:c})}>{c}</button>)}</div><button disabled={!answer} className="primary" onClick={next}>{index===DIAGNOSTIC_QUESTIONS.length-1?"Voir mon résultat":"Valider"}</button></section></Shell>;
}

function DiagnosticResult() {
  const {state}=useStore(); if(!state.diagnostic)return <Navigate to="/diagnostic"/>;
  return <Shell><section className="result-hero"><Mascot/><p className="eyebrow">Positionnement terminé</p><h1>{state.diagnostic.global}%</h1><p>Votre base est là. Nous allons maintenant la rendre plus actuelle, structurée et démontrable.</p></section><section className="card"><h2>Vos résultats par domaine</h2>{Object.entries(state.diagnostic.domains).map(([k,v])=><div className="domain" key={k}><span>{k}</span><div className="progress"><i style={{width:`${v}%`}}/></div><strong>{v}%</strong></div>)}<h3>Recommandation</h3><p>Commencez par actualiser votre vision du métier, puis entraînez-vous à analyser une demande réelle.</p><Link className="primary" to={`/course/${COURSES.id}`}>Découvrir mon parcours</Link></section></Shell>;
}

function Course() {
  const {state}=useStore();
  return <Shell><section className="course-intro"><p className="eyebrow">Votre parcours</p><h1>{COURSES.title}</h1><p>{COURSES.description}</p></section>
    {COURSES.sections.map(section=><section key={section.id} className="path-section"><h2>{section.title}</h2><div className="path">{MODULES.filter(m=>m.section===section.id).map((m,i)=>{const unlocked=m.id==="module-0" || canUnlockModule(m.id,state); const done=m.lessonIds.every(id=>state.completedLessons.includes(id)); return <article key={m.id} className={`${unlocked?"available":"locked"} ${done?"done":""} side-${i%2}`}><div className="node">{done?"✓":unlocked?m.order:"🔒"}</div><div className="card"><span>Module {m.order}</span><h3>{m.title}</h3><p>{unlocked?`${m.lessonIds.length} microleçons · ${done?"Terminé":"Disponible"}`:"Disponible dans une prochaine étape de développement"}</p>{unlocked && m.lessonIds.length>0 && <Link to={`/unit/${m.id}`}>{done?"Revoir":"Ouvrir le module"} →</Link>}</div></article>})}</div></section>)}</Shell>;
}

function Unit() {
  const {unitId}=useParams(); const {state}=useStore(); const module=MODULES.find(m=>m.id===unitId); if(!module)return <Navigate to="/dashboard"/>;
  return <Shell><Link className="back" to={`/course/${COURSES.id}`}>← Parcours</Link><section className="course-intro"><p className="eyebrow">Module {module.order}</p><h1>{module.title}</h1><p>{module.description}</p></section><div className="lesson-list">{module.lessonIds.map((id,i)=>{const lesson=LESSONS.find(l=>l.id===id)!; const locked=i>0&&!state.completedLessons.includes(module.lessonIds[i-1]); return <article className={`card ${locked?"muted":""}`} key={id}><span>{state.completedLessons.includes(id)?"✓ Terminée":locked?"🔒 Verrouillée":`${lesson.duration} min`}</span><h2>{lesson.title}</h2><p>{lesson.objective}</p>{!locked&&<Link className="primary small-button" to={`/lesson/${id}`}>{state.completedLessons.includes(id)?"Revoir":"Commencer"}</Link>}</article>})}</div></Shell>;
}

function Lesson() {
  const {lessonId}=useParams(); const {state,setState}=useStore(); const nav=useNavigate(); const selectedLesson=LESSONS.find(l=>l.id===lessonId);const lesson=selectedLesson??LESSONS[0]; const [index,setIndex]=useState(0); const [answer,setAnswer]=useState(""); const [feedback,setFeedback]=useState<null|{ok:boolean;text:string}>(null); const [draft,setDraft]=useState("");const [syncState,setSyncState]=useState("Enregistré sur cet iPhone");
  const step=lesson.steps[index];
  const draftKey=`jangat-draft-${lessonId}-${index}`;const syncCurrent=async()=>{if(step.type!=="open"||!draft.trim()||!navigator.onLine)return;setSyncState("Synchronisation en cours");try{await syncDraft(`${lesson.id}:${index}`,draft,`${lesson.id}:${index}:draft`);setSyncState("Synchronisé");}catch(e){setSyncState(e instanceof Error&&e.message==="CONFLICT"?"Conflit à résoudre":"Échec de synchronisation")}};
  useEffect(()=>{if(step.type!=="open")return;readDraft(draftKey).then(value=>{if(value)setDraft(value)});const online=async()=>{if(!navigator.onLine)return;const saved=await readDraft(draftKey);if(!saved.trim())return;setSyncState("Synchronisation en cours");try{await syncDraft(`${lesson.id}:${index}`,saved,`${lesson.id}:${index}:draft`);setSyncState("Synchronisé")}catch{setSyncState("Échec de synchronisation")}};window.addEventListener("online",online);return()=>window.removeEventListener("online",online)},[draftKey,index,lesson.id,step.type]);
  const validate=async()=>{if(step.type==="content"||step.type==="vocabulary"){await recordStep(lesson.id,`${lesson.id}:${index}`,{viewed:true});setFeedback({ok:true,text:"Bien joué. Vous venez de consolider une notion importante."});return} if(step.type==="open"){if(!draft.trim())return;await writeDraft(draftKey,draft);await syncCurrent();setFeedback({ok:true,text:"Votre première version est conservée. Comparez-la maintenant aux critères proposés."});return}const result=await recordStep(lesson.id,`${lesson.id}:${index}`,answer);const ok=answer===step.correct;setFeedback({ok,text:ok?step.feedbackCorrect||"Exact.":step.feedbackIncorrect||"Ce n’est pas encore acquis. Relisez l’explication et réessayez."});if(!ok&&typeof result==="object")setState(s=>({...s,hearts:Math.max(0,s.hearts-1)}));};
  const next=async()=>{if(index<lesson.steps.length-1){setIndex(index+1);setAnswer("");setFeedback(null)}else{const result=await completeLesson(lesson.id);setState(s=>({...s,completedLessons:Array.from(new Set([...s.completedLessons,lesson.id])),xp:result.xp,hearts:result.hearts,streak:result.streak,lastActivity:new Date().toISOString().slice(0,10),unlockedModules:lesson.moduleId==="module-1"&&lesson.id==="m1-l4"?Array.from(new Set([...s.unlockedModules,"module-2"])):s.unlockedModules}));await deleteDraft(draftKey);nav(`/unit/${lesson.moduleId}`)}};
  if(!selectedLesson)return <Navigate to="/dashboard"/>;
  return <Shell><section className="lesson-head"><button aria-label="Fermer la leçon" onClick={()=>nav(-1)}>×</button><div className="progress"><i style={{width:`${((index+1)/lesson.steps.length)*100}%`}}/></div><span>♥ {state.hearts}</span></section><section className="card lesson-card"><p className="eyebrow">{lesson.title} · Étape {index+1}/{lesson.steps.length}</p><div className="question-title"><h1>{step.title}</h1><button className="speak" disabled={!state.profile.voice||!speechService.isSupported()} onClick={()=>speechService.speak(`${step.title}. ${step.body||step.prompt||""}`,{lang:step.lang||"fr-FR",rate:state.profile.speechRate})}>🔊 Écouter</button></div>{step.body&&<p className="lesson-body">{step.body}</p>}
    {step.type==="vocabulary"&&<div className="vocab"><strong>{step.term}</strong><span>{step.pronunciation}</span><p>{step.translation}</p></div>}
    {step.choices&&<div className="answers">{step.choices.map(c=><button className={answer===c?"selected":""} onClick={()=>setAnswer(c)} key={c}>{c}</button>)}</div>}
    {step.type==="open"&&<><textarea className="open-answer" value={draft} onFocus={e=>setTimeout(()=>e.currentTarget.scrollIntoView({behavior:"smooth",block:"center"}),250)} onChange={e=>{const value=e.target.value;setDraft(value);setSyncState("Enregistré sur cet iPhone");void writeDraft(draftKey,value)}} placeholder="Rédigez votre première version ici…"/><small className="sync-state" role="status">{syncState}</small>{feedback&&<div className="rubric"><h3>Auto-évaluation critériée</h3>{(step.criteria||[]).map(c=><label key={c}><span>{c}</span><select><option>Je ne sais pas</option><option>Respecté</option><option>Partiellement respecté</option><option>Non respecté</option></select></label>)}</div>}</>}
    {feedback&&<div className={`feedback ${feedback.ok?"ok":"error"}`} role="status"><strong>{feedback.ok?"✓ Bonne progression":"! Une erreur utile"}</strong><p>{feedback.text}</p><button className="speak" disabled={!state.profile.voice||!speechService.isSupported()} onClick={()=>speechService.speak(feedback.text)}>🔊 Écouter l’explication</button></div>}
    {!feedback?<button className="primary" disabled={step.choices&&!answer || step.type==="open"&&!draft.trim()} onClick={validate}>Valider</button>:<button className="primary" onClick={next}>{index===lesson.steps.length-1?"Terminer la leçon (+20 XP)":"Continuer"}</button>}</section></Shell>;
}

function Profile({settings=false}:{settings?:boolean}) { const {state,setState}=useStore(); const p=state.profile; return <Shell><section className="course-intro"><p className="eyebrow">{settings?"Préférences":"Votre profil"}</p><h1>{settings?"Réglez votre expérience":"Votre cap professionnel"}</h1></section><section className="card form-grid">
  {!settings&&<><label>Prénom<input value={p.firstName} onChange={e=>setState(s=>({...s,profile:{...s.profile,firstName:e.target.value}}))}/></label><label>Objectif<textarea value={p.goal} onChange={e=>setState(s=>({...s,profile:{...s.profile,goal:e.target.value}}))}/></label><label>Niveau déclaré<select value={p.level} onChange={e=>setState(s=>({...s,profile:{...s.profile,level:e.target.value}}))}><option>À réactiver</option><option>Intermédiaire</option><option>Confirmé</option></select></label></>}
  {settings&&<><label className="toggle"><input type="checkbox" checked={p.voice} onChange={e=>{if(!e.target.checked)speechService.stop();setState(s=>({...s,profile:{...s.profile,voice:e.target.checked}}));}}/> Activer la lecture vocale</label><label>Vitesse<input type="range" min=".7" max="1.4" step=".1" value={p.speechRate} onChange={e=>setState(s=>({...s,profile:{...s.profile,speechRate:Number(e.target.value)}}))}/></label><div className="voice-actions"><button onClick={()=>speechService.pause()}>Pause</button><button onClick={()=>speechService.resume()}>Reprendre</button><button onClick={()=>speechService.repeat()}>Répéter</button><button onClick={()=>speechService.stop()}>Arrêter</button></div><details className="install-help"><summary>Installer JÀNGAT sur mon iPhone</summary><ol><li>Ouvrez JÀNGAT dans Safari.</li><li>Touchez le bouton Partager.</li><li>Choisissez « Sur l’écran d’accueil ».</li><li>Confirmez avec « Ajouter ».</li><li>Ouvrez ensuite JÀNGAT depuis son icône.</li></ol><p>L’installation doit être confirmée manuellement dans Safari.</p></details></>}
  <p className="saved">Les modifications sont sauvegardées automatiquement.</p></section></Shell>}

function Protected({children}:{children:React.ReactNode}) { const {state}=useStore(); return state.authenticated?<>{children}</>:<Navigate to="/login" replace/>; }
function ProfessionalRoute({page}:{page:"hub"|"positioning"|"domain"|"mission"|"portfolio"|"cv"}){const {state}=useStore();const unlocked=isProfessionalPathUnlocked(state.completedLessons,state.currentCourseValidated);if(page==="positioning")return <Shell><PositioningPage unlocked={unlocked}/></Shell>;if(page==="domain")return <Shell><DomainPage unlocked={unlocked}/></Shell>;if(page==="mission")return <Shell><MissionPage unlocked={unlocked}/></Shell>;if(page==="portfolio")return <Shell><PortfolioPage unlocked={unlocked}/></Shell>;if(page==="cv")return <Shell><CvEvidencePage unlocked={unlocked}/></Shell>;return <Shell><ProfessionalHub unlocked={unlocked}/></Shell>}
function AppRoutes(){return <Routes><Route path="/" element={<Navigate to="/login"/>}/><Route path="/login" element={<Auth mode="login"/>}/><Route path="/signup" element={<Auth mode="signup"/>}/><Route path="/forgot-password" element={<Auth mode="forgot"/>}/><Route path="/auth/callback" element={<AuthCallback/>}/><Route path="/auth/confirm" element={<AuthCallback/>}/><Route path="/reset-password" element={<ResetPassword/>}/>{[
  ["/onboarding",<Onboarding/>],["/dashboard",<Dashboard/>],["/diagnostic",<Diagnostic/>],["/diagnostic/result",<DiagnosticResult/>],["/course/:courseId",<Course/>],["/unit/:unitId",<Unit/>],["/lesson/:lessonId",<Lesson/>],["/profile",<Profile/>],["/settings",<Profile settings/>]
].map(([path,el])=><Route key={path as string} path={path as string} element={<Protected>{el}</Protected>}/>)}<Route path="/professional" element={<Protected><ProfessionalRoute page="hub"/></Protected>}/><Route path="/professional/positioning" element={<Protected><ProfessionalRoute page="positioning"/></Protected>}/><Route path="/professional/domain/:domainId" element={<Protected><ProfessionalRoute page="domain"/></Protected>}/><Route path="/professional/mission/:missionId" element={<Protected><ProfessionalRoute page="mission"/></Protected>}/><Route path="/portfolio" element={<Protected><ProfessionalRoute page="portfolio"/></Protected>}/><Route path="/cv" element={<Protected><ProfessionalRoute page="cv"/></Protected>}/><Route path="*" element={<Navigate to="/dashboard"/>}/></Routes>}

export default function App(){const [state,setState]=useState(loadState);const [ready,setReady]=useState(!supabase);useEffect(()=>{document.title=BRAND.name;const client=supabase;if(!client)return;client.auth.getSession().then(async({data})=>{if(data.session){try{const remote=await loadServerState();setState(s=>({...s,...remote}))}catch{await client.auth.signOut()}}setReady(true)});const {data:{subscription}}=client.auth.onAuthStateChange(event=>{if(event==="SIGNED_OUT")setState(loadState())});return()=>subscription.unsubscribe()},[]);const store=useMemo(()=>({state,setState}),[state]);if(envError)return <div className="configuration-error"><h1>Configuration Supabase requise</h1><p>{envError}</p><code>VITE_SUPABASE_URL<br/>VITE_SUPABASE_PUBLISHABLE_KEY</code></div>;if(!ready)return <div className="configuration-error"><p>Connexion sécurisée à JÀNGAT…</p></div>;return <StoreContext.Provider value={store}><BrowserRouter basename={import.meta.env.BASE_URL}><AppRoutes/></BrowserRouter></StoreContext.Provider>}
