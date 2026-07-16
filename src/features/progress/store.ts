export type DiagnosticResult={global:number;domains:Record<string,number>};
export type JangatState={authenticated:boolean;profile:{firstName:string;email:string;goal:string;level:string;dailyGoal:number;voice:boolean;speechRate:number;theme:"light"|"dark"};onboarded:boolean;diagnostic:DiagnosticResult|null;xp:number;streak:number;hearts:number;completedLessons:string[];unlockedModules:string[];lastActivity:string|null};
export const initialState:JangatState={authenticated:false,profile:{firstName:"",email:"",goal:"",level:"À réactiver",dailyGoal:15,voice:true,speechRate:1,theme:"light"},onboarded:false,diagnostic:null,xp:0,streak:0,hearts:5,completedLessons:[],unlockedModules:[],lastActivity:null};
export function loadState():JangatState{return initialState}
