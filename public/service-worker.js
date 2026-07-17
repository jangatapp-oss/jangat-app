const CACHE_NAME = "jangat-v4-resilient-cache";
const BASE_PATH = self.location.pathname.replace(/service-worker\.js$/, "");
const INDEX_PATH = `${BASE_PATH}index.html`;

const APP_SHELL = [
  INDEX_PATH,
  `${BASE_PATH}manifest.json`,
  `${BASE_PATH}jangat-icon.svg`,
  `${BASE_PATH}jangat-apple-touch-icon.svg`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Un fichier manquant ne doit plus bloquer toute l'installation.
      await Promise.allSettled(
        APP_SHELL.map(async (url) => {
          const response = await fetch(url, { cache: "no-cache" });
          if (!response.ok) {
            console.warn(`JÀNGAT : ressource non mise en cache (${response.status})`, url);
            return;
          }
          await cache.put(url, response);
        }),
      );
    }),
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ),
    ),
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);

  // Ne jamais intercepter Supabase ni les autres domaines externes.
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        return (
          (await caches.match(event.request)) ||
          (await caches.match(INDEX_PATH)) ||
          Response.error()
        );
      }),
    );
    return;
  }

  if (!["script", "style", "image", "font"].includes(event.request.destination)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(async (cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      try {
        const response = await fetch(event.request);

        if (response.ok && response.type === "basic") {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(event.request, response.clone());
        }

        return response;
      } catch {
        return cachedResponse || Response.error();
      }
    }),
  );
});
