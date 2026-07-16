import {describe,expect,it} from "vitest";
import {calculateDiagnostic,calculateProgress,canUnlockModule,recoverHeart,xpFor} from "../features/progress/learning";
import {DIAGNOSTIC_QUESTIONS} from "../features/content/catalog";
import {initialState} from "../features/progress/store";
describe("moteur JÀNGAT",()=>{
 it("calcule un diagnostic parfait",()=>{const answers=Object.fromEntries(DIAGNOSTIC_QUESTIONS.map(q=>[q.id,q.correct]));expect(calculateDiagnostic(DIAGNOSTIC_QUESTIONS,answers).global).toBe(100)});
 it("calcule la progression",()=>expect(calculateProgress(3,8)).toBe(38));
 it("débloque le module 1 après diagnostic",()=>expect(canUnlockModule("module-1",{...initialState,diagnostic:{global:50,domains:{}}})).toBe(true));
 it("calcule les XP",()=>expect(xpFor(3,true,true)).toBe(85));
 it("limite les cœurs à cinq",()=>expect(recoverHeart(5)).toBe(5));
});
