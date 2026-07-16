const CACHE_NAME = "jangat-v2-github-pages-1";
const BASE_PATH = self.location.pathname.replace(/service-worker\.js$/, "");
const APP_SHELL = [BASE_PATH, `${BASE_PATH}index.html`, `${BASE_PATH}manifest.json`, `${BASE_PATH}jangat-icon.svg`, `${BASE_PATH}jangat-apple-touch-icon.svg`];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)));self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  if(event.request.mode==="navigate"){event.respondWith(fetch(event.request).catch(async()=>await caches.match(BASE_PATH)||await caches.match(`${BASE_PATH}index.html`)||Response.error()));return}
  if(url.origin!==self.location.origin||!["script","style","image","font"].includes(event.request.destination))return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.status===200&&response.type==="basic")caches.open(CACHE_NAME).then(cache=>cache.put(event.request,response.clone()));return response})));
});
