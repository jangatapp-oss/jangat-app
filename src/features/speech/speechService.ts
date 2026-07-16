export type SpeechOptions={lang?:string;rate?:number;volume?:number};
export interface SpeechProvider{speak(text:string,options?:SpeechOptions):Promise<void>;pause():void;resume():void;stop():void;isSupported():boolean}
class BrowserSpeechProvider implements SpeechProvider{
  private last={text:"",options:{} as SpeechOptions};
  isSupported(){return typeof window!=="undefined"&&"speechSynthesis"in window}
  speak(text:string,options:SpeechOptions={}){this.last={text,options};return new Promise<void>((resolve)=>{if(!this.isSupported()){resolve();return}window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=options.lang||"fr-FR";u.rate=options.rate||1;u.volume=options.volume??1;const voices=window.speechSynthesis.getVoices();u.voice=voices.find(v=>v.lang.startsWith(u.lang.slice(0,2)))||null;u.onend=()=>resolve();u.onerror=()=>resolve();window.speechSynthesis.speak(u)})}
  pause(){if(this.isSupported())window.speechSynthesis.pause()} resume(){if(this.isSupported())window.speechSynthesis.resume()} stop(){if(this.isSupported())window.speechSynthesis.cancel()} repeat(){return this.speak(this.last.text,this.last.options)}
}
export const speechService=new BrowserSpeechProvider();
