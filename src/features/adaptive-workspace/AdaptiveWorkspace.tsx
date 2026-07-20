import { useMemo, useState } from "react";
import "./adaptiveWorkspace.css";

type Bias = { id: string; pattern: RegExp; label: string; hint: string };
type Feedback = { kind: "success" | "warning" | "hint"; title: string; body: string } | null;

const biasCatalog: Bias[] = [
  { id: "BIAS-01", pattern: /propose you|confirm you|I propose you/i, label: "Calque francophone", hint: 'Utilisez « propose to you » ou « suggest that you ».' },
  { id: "BIAS-02", pattern: /\b(?:14|15|16)h(?:\d{2})?\b/i, label: "Format 24 h", hint: 'Utilisez le format américain : « 2 PM » ou « 3 PM ».' },
  { id: "BIAS-03", pattern: /\b(?:Hey|Cheers)\b/i, label: "Registre trop familier", hint: 'Préférez « Dear Mr. Johnson » et « Sincerely ».' },
  { id: "BIAS-04", pattern: /\bI am agree\b|\bin Friday\b/i, label: "Grammaire", hint: 'Écrivez « I agree » et « on Friday ».' },
];

const skills = [
  ["👋", "Salutations", 82],
  ["🕐", "Heures US", 45],
  ["📍", "Adresses", 71],
  ["🎩", "Politesse", 68],
  ["🎭", "Registre", 55],
  ["📝", "Grammaire", 78],
] as const;

export default function AdaptiveWorkspace() {
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [attempts, setAttempts] = useState(0);
  const [xp, setXp] = useState(33);
  const [hearts, setHearts] = useState(5);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const biases = useMemo(() => biasCatalog.filter((bias) => bias.pattern.test(text)), [text]);
  const mastery = Math.round(skills.reduce((sum, skill) => sum + skill[2], 0) / skills.length);

  function submit() {
    if (!text.trim()) return;
    setAttempts((value) => value + 1);
    if (biases.length) {
      setHearts((value) => Math.max(0, value - 1));
      setFeedback({ kind: "warning", title: "Une correction utile", body: biases.map((bias) => `${bias.label} : ${bias.hint}`).join(" ") });
      return;
    }
    if (text.trim().length < 50) {
      setFeedback({ kind: "warning", title: "Votre réponse est encore trop courte", body: "Ajoutez la salutation, le lieu, les deux horaires proposés et une formule de politesse." });
      return;
    }
    setXp((value) => value + 30);
    setFeedback({ kind: "success", title: "Mission réussie !", body: "Votre courriel est clair, poli et professionnel. Vous gagnez 30 XP." });
  }

  function showHint() {
    setFeedback({ kind: "hint", title: "Un coup de pouce", body: "Dear Mr. Johnson, I would like to confirm our meeting on Thursday afternoon at 123 Main Street, Suite 400. Please let me know whether 2 PM or 3 PM would work better for you. Sincerely, [Your name]" });
  }

  function reset() {
    setText("");
    setFeedback(null);
    setAttempts(0);
  }

  return <section className="aw-page" aria-labelledby="aw-title">
    <div className="aw-hero aw-card">
      <div className="aw-mascot" aria-hidden="true">🦉</div>
      <div>
        <p className="aw-kicker">NOUVEL ESPACE EXPÉRIMENTAL</p>
        <h1 id="aw-title">Workspace adaptatif</h1>
        <p>Une section indépendante pour tester la gamification, la remédiation linguistique et le suivi des compétences sans remplacer le parcours JÀNGAT existant.</p>
      </div>
      <div className="aw-stats"><span>🔥 7</span><span>◆ {xp} XP</span><span>♥ {hearts}</span></div>
    </div>

    <div className="aw-layout">
      <aside className="aw-column">
        <article className="aw-card">
          <p className="aw-kicker">UNITÉ 3</p><h2>Business English</h2><p>Rédaction professionnelle</p>
          <div className="aw-progress"><i style={{ width: "67%" }}/></div><small>67 % complété · 245 / 360 XP</small>
        </article>
        <article className="aw-card">
          <h2>Parcours</h2>
          <ol className="aw-path">
            <li className="done">👋 <span>Salutations</span></li><li className="done">💼 <span>Vocabulaire pro</span></li><li className="done">✉️ <span>Structure e-mail</span></li><li className="current">✍️ <span>Rédaction finale</span></li><li className="locked">🔒 <span>Validation</span></li>
          </ol>
        </article>
      </aside>

      <div className="aw-center">
        <article className="aw-card aw-mission">
          <div><span>📋</span><h2>Votre mission</h2><b>+30 XP</b></div>
          <p>M. Arthur Johnson est disponible jeudi après-midi. Confirmez son rendez-vous au <strong>123 Main Street, Suite 400</strong> et proposez précisément <strong>2 PM ou 3 PM</strong>. Restez concis, poli et professionnel.</p>
        </article>

        <article className="aw-card">
          <div className="aw-editor-head"><h2>✍️ Rédigez votre e-mail</h2><span>{words} mot{words > 1 ? "s" : ""}</span></div>
          <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder={"Dear Mr. Johnson,\n\nI would like to confirm our meeting..."}/>
          {biases.length > 0 && <div className="aw-biases"><strong>⚠️ Points détectés</strong>{biases.map((bias) => <span key={bias.id}>{bias.id} · {bias.label}</span>)}</div>}
          <div className="aw-actions"><button className="aw-secondary" onClick={showHint}>💡 Indice</button><button className="aw-secondary" onClick={reset}>↻ Recommencer</button><button className="aw-primary" onClick={submit}>Vérifier →</button></div>
        </article>

        {feedback && <article className={`aw-feedback ${feedback.kind}`} role="status"><h2>{feedback.title}</h2><p>{feedback.body}</p>{attempts > 0 && <small>Tentative {attempts}</small>}</article>}

        <article className="aw-card"><h2>Progression de la mission</h2><div className="aw-steps"><span className="done">✓ Comprendre le contexte</span><span className="done">✓ Vocabulaire professionnel</span><span className="done">✓ Structure de l’e-mail</span><span className="active">▶ Rédaction finale</span><span>○ Validation</span></div></article>
      </div>

      <aside className="aw-column">
        <article className="aw-card"><h2>🧠 État d’apprentissage</h2><Metric label="Charge" value={35}/><Metric label="Stress" value={25}/><Metric label="Motivation" value={78}/><Metric label="Confiance" value={72}/></article>
        <article className="aw-card"><h2>🎯 Compétences</h2><div className="aw-skills">{skills.map(([emoji,label,value]) => <span key={label} title={label}>{emoji} {value}%</span>)}</div><div className="aw-progress"><i style={{ width: `${mastery}%` }}/></div><small>Maîtrise globale : {mastery}%</small></article>
        <article className="aw-card"><h2>⚡ Parcours actif</h2><strong className="aw-pill">Standard</strong><p>Le moteur s’adapte progressivement aux réponses observées.</p></article>
      </aside>
    </div>
  </section>;
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="aw-metric"><div><span>{label}</span><b>{value}%</b></div><div className="aw-progress"><i style={{ width: `${value}%` }}/></div></div>;
}
