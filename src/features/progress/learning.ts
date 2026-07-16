import type { DiagnosticQuestion } from "../content/catalog";
import type { JangatState } from "./store";
export function calculateProgress(done:number,total:number){return total?Math.round(done/total*100):0}
export function calculateDiagnostic(questions:DiagnosticQuestion[],answers:Record<string,string>){const domains:Record<string,{ok:number;total:number}>={};questions.forEach(q=>{domains[q.domain]??={ok:0,total:0};domains[q.domain].total++;if(answers[q.id]===q.correct)domains[q.domain].ok++});const scores=Object.fromEntries(Object.entries(domains).map(([k,v])=>[k,Math.round(v.ok/v.total*100)]));return {global:Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/Object.values(scores).length),domains:scores}}
export function canUnlockModule(id:string,state:JangatState){if(id==="module-1")return Boolean(state.diagnostic);if(id==="module-2")return state.completedLessons.includes("m1-l4");return false}
export function xpFor(correct:number,lesson=false,unit=false){return correct*5+(lesson?20:0)+(unit?50:0)}
export function recoverHeart(hearts:number){return Math.min(5,hearts+1)}
