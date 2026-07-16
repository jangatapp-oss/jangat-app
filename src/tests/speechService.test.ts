// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { speechService } from "../features/speech/speechService";

describe("service vocal",()=>{
  beforeEach(()=>{
    const synthesis={cancel:vi.fn(),speak:vi.fn((u:SpeechSynthesisUtterance)=>u.onend?.({} as SpeechSynthesisEvent)),pause:vi.fn(),resume:vi.fn(),getVoices:vi.fn(()=>[
      {lang:"fr-FR",name:"Français"} as SpeechSynthesisVoice,
      {lang:"en-GB",name:"English"} as SpeechSynthesisVoice,
    ])};
    Object.defineProperty(window,"speechSynthesis",{value:synthesis,configurable:true});
    Object.defineProperty(window,"SpeechSynthesisUtterance",{value:class{lang="";rate=1;volume=1;voice:SpeechSynthesisVoice|null=null;onend:((e:SpeechSynthesisEvent)=>void)|null=null;onerror=null;constructor(public text:string){}},configurable:true});
  });
  it("sélectionne la langue et la vitesse",async()=>{await speechService.speak("Bonjour",{lang:"fr-FR",rate:1.2});expect(window.speechSynthesis.speak).toHaveBeenCalled();const utterance=vi.mocked(window.speechSynthesis.speak).mock.calls[0][0];expect(utterance.lang).toBe("fr-FR");expect(utterance.rate).toBe(1.2)});
  it("pause, reprend et arrête",()=>{speechService.pause();speechService.resume();speechService.stop();expect(window.speechSynthesis.pause).toHaveBeenCalled();expect(window.speechSynthesis.resume).toHaveBeenCalled();expect(window.speechSynthesis.cancel).toHaveBeenCalled()});
});
